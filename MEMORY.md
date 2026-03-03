# Divspan — Wingspan Board Game in Effect

## Tech Stack

- **Runtime/package manager/test runner:** Bun
- **Core dependency:** Effect 3.19.19
- **Formatter:** Prettier (printWidth: 100)

## File Structure

- `src/types.ts` — shared types (`Bird`, `Habitat`, `Shuffle` service) and domain errors (`InvalidHabitat`)
- `src/birds.ts` — all bird data (name, habitats, points); 3 named exports (`acornWoodpecker`, `americanAvocet`, `americanBittern`), rest inline
- `src/main.ts` — game engine, CLI loop, rendering, live service wiring
- `src/main.test.ts` — Bun tests with `testGame()` factory and `simulate()` helper

## Code Style Preferences

- **Pipes for simple chains, generators for complex control flow**
- **`Effect.runSync` in tests** (not `runPromise`/async) — all test effects are synchronous
- **Reusable service providers as constants** in tests (e.g. `const identityShuffle = Effect.provideService(Shuffle, { ... })`)
- **User edits generated code to taste** — don't expect output to match plans exactly
- **Single file is fine** for now — organic growth over premature splitting

## Effect Features Used

- `Effect.gen` + `yield*` — game loop, main, newGame
- `Effect.promise` — wrapping readline
- `pipe`, `Effect.map`, `Effect.andThen` — pipelines
- `Console.log` — program output
- `Effect.runPromise` (production) / `Effect.runSync` (tests)
- `Data.TaggedError` — `InvalidHabitat` domain error
- `Effect.fail` / `Effect.succeed` — typed error flow
- `Effect.catchTag` — recovering from specific errors in game loop
- `Effect.either` — inspecting errors in tests
- `Context.Tag` — `Shuffle` service for DI
- `Effect.provideService` — wiring live and test implementations
