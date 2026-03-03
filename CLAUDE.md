# Divspan — Wingspan Board Game Clone

A Wingspan board game clone built incrementally to learn Effect.

## Tech Stack

- **Runtime / tests / package manager:** Bun
- **Game engine:** Effect
- **Terminal UI:** React + Ink

## File Structure

- `src/engine.ts` — pure game logic (Game, step, newGame, isGameOver, calculateScore)
- `src/types.ts` — shared types (Bird, Habitat) and domain errors (InvalidHabitat)
- `src/birds.ts` — bird card data
- `src/shuffling.ts` — Shuffle service tag + implementations (random, identity, reverse)
- `src/ui.tsx` — Ink/React terminal UI components
- `src/main.ts` — entry point (renders Ink app)
- `src/engine.test.ts` — Bun tests for the engine
- `docs/adr-001-react-effect.md` — proposed architecture for Effect-React glue layer

## Conventions

- Pipes for simple chains, generators for complex control flow
- `Effect.runSync` in tests (not async/runPromise)
- Reusable service providers as test constants (e.g. `identityShuffle`, `reverseShuffle`)
- Engine must stay UI-independent — no rendering, no I/O, no React
- Single-file modules until they feel cramped
- Show code proposals without editing files; the user edits generated code themselves

## Running

- `bun start` — run the game
- `bun test` — run tests
