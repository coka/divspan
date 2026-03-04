# ADR-001: React-Effect Glue Layer

## Status

Proposed

## Context

Divspan uses **Effect** for game logic and **Ink (React)** for terminal UI. Currently,
game state lives in React `useState`, and the engine is called synchronously at the
React boundary via `Effect.runSync`. This works, but React owns the state while the
engine is stateless — pure functions in, new state out.

As the game grows (concurrent fibers for multiplayer, timers, background effects, event
streams for replay/undo), we'll want **Effect to own the state** via `SubscriptionRef`.
The problem: React doesn't know when a `SubscriptionRef` changes. We need a glue
layer — analogous to `react-redux` — that subscribes React components to Effect state
changes.

## Decision Drivers

- **Single source of truth** — game state lives in one place, not duplicated
- **Idiomatic on both sides** — `SubscriptionRef` (Effect-native),
  `useSyncExternalStore` (React 18+)
- **Minimal API surface** — a Provider and 1-2 hooks, not a framework
- **Testable** — engine tests stay pure Effect with `runSync`, no React involved

## Considered Options

### A. Manual sync (status quo)

React `useState` holds game state. After running an Effect that produces new state,
manually call `setState`.

- (+) No abstraction, obvious control flow
- (-) Two copies of truth (easy to desync), doesn't scale to concurrent/background effects

### B. `useSyncExternalStore` + `SubscriptionRef`

Effect's `SubscriptionRef` emits a `changes: Stream<A>` on every update. A React hook
bridges this to `useSyncExternalStore`. An Effect `Runtime` is provided via React context.

- (+) Single source of truth, both sides use their native primitives, automatic rerenders
- (-) Requires Effect Runtime in React context, subscription fiber lifecycle management

### C. `useReducer` with Effect as reducer

Model game updates as `(state, action) => Effect<state>` inside `useReducer`.

- (+) Familiar React mental model
- (-) `useReducer` expects a synchronous pure reducer; shoehorning Effect in loses its
  error channel and service requirements

### D. EventEmitter bridge

Wrap `SubscriptionRef` updates with a Node `EventEmitter`. React subscribes via `useEffect`.

- (+) Simple, well-known pattern
- (-) Bypasses Effect's type-safe streaming, introduces a parallel primitive

## Decision

**Option B** — `useSyncExternalStore` + `SubscriptionRef`.

The mapping is natural:

| `useSyncExternalStore` contract     | Effect primitive                                                       |
| ----------------------------------- | ---------------------------------------------------------------------- |
| `subscribe(callback)`               | Fork a fiber consuming `ref.changes`, call `callback` on each emission |
| `getSnapshot()`                     | `Runtime.runSync(SubscriptionRef.get(ref))`                            |
| unsubscribe (returned by subscribe) | `Fiber.interrupt(fiber)`                                               |

## Implementation Sketch

### 1. EffectProvider — makes a Runtime available to React

```tsx
import { ManagedRuntime } from "effect";
import { createContext, useContext, type ReactNode } from "react";

type AnyRuntime = ManagedRuntime.ManagedRuntime<any, never>;
const RuntimeContext = createContext<AnyRuntime | null>(null);

export function EffectProvider<R>({
  runtime,
  children,
}: {
  runtime: ManagedRuntime.ManagedRuntime<R, never>;
  children: ReactNode;
}) {
  return (
    <RuntimeContext.Provider value={runtime as AnyRuntime}>{children}</RuntimeContext.Provider>
  );
}

export function useRuntime<R>(): ManagedRuntime.ManagedRuntime<R, never> {
  const rt = useContext(RuntimeContext);
  if (!rt) throw new Error("useRuntime must be used within EffectProvider");
  return rt as ManagedRuntime.ManagedRuntime<R, never>;
}
```

### 2. useSubscriptionRef — subscribes a component to a SubscriptionRef

```tsx
import { Effect, Fiber, Stream, SubscriptionRef } from "effect";
import { useSyncExternalStore } from "react";

export function useSubscriptionRef<A>(ref: SubscriptionRef.SubscriptionRef<A>): A {
  const runtime = useRuntime();

  return useSyncExternalStore(
    (onStoreChange) => {
      const fiber = runtime.runFork(
        ref.changes.pipe(Stream.runForEach(() => Effect.sync(onStoreChange))),
      );
      return () => {
        runtime.runFork(Fiber.interrupt(fiber));
      };
    },
    () => runtime.runSync(SubscriptionRef.get(ref)),
  );
}
```

### 3. Wiring in Divspan

```tsx
// main.ts
const ShuffleLayer = Layer.succeed(Shuffle, { shuffle: fisherYatesShuffle });
const runtime = ManagedRuntime.make(ShuffleLayer);
const gameRef = runtime.runSync(newGame().pipe(Effect.andThen(SubscriptionRef.make)));

render(
  <EffectProvider runtime={runtime}>
    <App gameRef={gameRef} />
  </EffectProvider>,
);
```

```tsx
// ui.tsx
export function App({ gameRef }: { gameRef: SubscriptionRef.SubscriptionRef<Game> }) {
  const game = useSubscriptionRef(gameRef); // rerenders automatically
  const runtime = useRuntime();
  const [error, setError] = useState<string | null>(null);

  function dispatch(action: Action) {
    const result = runtime.runSync(
      SubscriptionRef.get(gameRef).pipe(
        Effect.andThen((g) => step(g, action)),
        Effect.andThen((next) => SubscriptionRef.set(gameRef, next)),
        Effect.either,
      ),
    );
    if (result._tag === "Left") {
      setError(/* ... */); // UI-only state stays in React
    }
  }
  // ...
}
```

## State Ownership Boundary

| State                     | Owner                       | Rationale                                |
| ------------------------- | --------------------------- | ---------------------------------------- |
| Game (domain)             | `SubscriptionRef` in Effect | Single source of truth for engine logic  |
| Phase, error message (UI) | React `useState`            | Local to the view, not an engine concern |

This mirrors the Redux convention: shared/domain state in the store, local UI state
in components.

## Consequences

### Positive

- Game state has a single owner (Effect); React is a pure subscriber
- Engine tests don't change — still `Effect.runSync` with mock services
- Natural path to multiplayer: multiple fibers reading/writing the same `SubscriptionRef`
- `SubscriptionRef.changes` gives a free event stream for logging, replay, undo

### Negative

- Adds an Effect Runtime lifecycle to manage (create, potentially dispose)
- The subscription fiber runs for the lifetime of the component — must clean up on unmount
- `useSyncExternalStore` requires referential stability; immutable updates (already the
  pattern) satisfy this

### Risks

- `runSync` on `SubscriptionRef.get` assumes the get is always synchronous. True for
  in-memory refs, could break with exotic custom implementations.
- React strict mode double-invokes effects. The subscribe/unsubscribe cycle must be
  idempotent (it is — each subscribe forks a fresh fiber, each unsubscribe interrupts it).

## Open Questions

1. Should `useSubscriptionRef` accept a **selector** `(a: A) => B` to avoid rerenders on
   unrelated state changes? (Like `useSelector` in react-redux.)
2. Should the Runtime be created with a `Layer` providing all services, or should services
   be provided at individual call sites?
3. Is `ManagedRuntime` the right abstraction, or would a plain `Runtime.Runtime` suffice
   for synchronous-only usage?
