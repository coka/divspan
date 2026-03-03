# Divspan — Wingspan Board Game in Effect

## Tech Stack

- **Runtime/package manager/test runner:** Bun
- **Game engine:** Effect 3.19.19
- **Terminal UI:** React 19 + Ink 6
- **Formatter:** Prettier (printWidth: 100)

## File Structure

- `src/engine.ts` — pure game logic (Game, step, newGame, isGameOver, calculateScore)
- `src/types.ts` — shared types (`Bird`, `Habitat`) and domain errors (`InvalidHabitat`)
- `src/birds.ts` — all bird data; 3 named exports, rest inline
- `src/shuffling.ts` — `Shuffle` service tag + implementations (random, identity, reverse)
- `src/ui.tsx` — Ink/React terminal UI (state machine with phases)
- `src/main.ts` — entry point (renders Ink app)
- `src/engine.test.ts` — Bun tests with `testGame()` factory and `simulate()` helper
- `docs/adr-001-react-effect.md` — proposed React-Effect glue layer architecture

## Code Style Preferences

- **Pipes for simple chains, generators for complex control flow**
- **`Effect.runSync` in tests** (not `runPromise`/async) — all test effects are synchronous
- **Reusable service providers as constants** in tests (e.g. `identityShuffle`, `reverseShuffle`)
- **User edits generated code to taste** — don't expect output to match plans exactly
- **Engine stays UI-independent** — no rendering, no I/O, no React imports

## Effect Features Used

- `Effect.gen` + `yield*` — newGame
- `pipe`, `Effect.map`, `Effect.andThen` — pipelines
- `Effect.runSync` (tests + React boundary)
- `Data.TaggedError` — `InvalidHabitat` domain error
- `Effect.fail` / `Effect.succeed` — typed error flow
- `Effect.either` — inspecting errors in tests and UI
- `Context.Tag` — `Shuffle` service for DI
- `Effect.provideService` — wiring live and test implementations
