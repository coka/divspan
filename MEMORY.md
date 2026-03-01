# Divspan — Wingspan Board Game in Effect

## Project Overview
Learning the Effect TypeScript library by building a faithful CLI recreation of the board game Wingspan. Incremental approach: start with simplest playable game, layer complexity one mechanic at a time.

## Tech Stack
- **Runtime/package manager/test runner:** Bun
- **Core dependency:** Effect 3.19.19
- **No tsconfig.json yet** — needs to be added
- **Single-file structure** — `main.ts` + `main.test.ts` at project root (no src/ dir)

## Current State (Step 1 complete)
The simplest playable game is implemented:
- 1 player, 5 birds in hand (point values 1-5), free to play
- Player chooses a bird, habitat is randomly assigned
- 3 habitats (forest, grassland, wetland)
- Game ends when hand is empty, score = sum of bird points

## Code Style Preferences
- **Mix of pipes and generators**: Pipes for simple linear chains, generators for complex control flow
- **Pure functions stay pure**: `playBird`, `calculateScore`, `isGameOver` are plain functions, NOT wrapped in Effect
- **Single file is fine** for now — user prefers organic growth over premature file splitting
- **User modifies plans to taste** — don't expect code to match plans exactly

## Effect Features Used So Far
- `Effect.gen` + `yield*` — game loop, main program
- `Effect.promise` — wrapping readline
- `pipe` + `Effect.map` + `Effect.andThen` — chooseBird pipeline
- `Console.log` — program output
- `Effect.runPromise` — running the program

## Pending Review Items
- Typo: `initalState` → `initialState`
- Consider exporting `playBird`, `Bird`, `Habitat` for testability

## Incremental Roadmap (see [roadmap.md](./roadmap.md) for details)
1. ~~Simplest playable game~~ ✓
2. Typed errors (`TaggedError`, validation)
3. Services & DI (`Context.Tag`, `Layer`) — PlayerInputService, RandomService
4. Ref for state management
5. Food costs & bird feeder
6. Eggs & drawing cards
7. Habitat row activation & brown powers
8. Full Wingspan: white/pink powers, bonus cards, 170-card set, multiplayer
