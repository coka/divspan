# Divspan Incremental Roadmap

Each step introduces 1-2 new Effect features on top of the previous step.

## ~~Step 1 — Simplest Playable Game~~ ✓

- 1 player, 26 turns, play birds or activate habitats
- 3 habitats with distinct effects (food / eggs / draw)
- Game ends when hand is empty, score = sum of bird points

## ~~Step 2 — Typed Errors~~ ✓

**Effect features:** `Data.TaggedError`, `Effect.fail`, `catchTag`, `Effect.either`

- Birds have habitat restrictions; `playBird` validates and fails with `InvalidHabitat`
- CLI catches error and re-prompts
- Tests verify invalid moves via `Effect.either`

## ~~Step 3 — Shuffle Service~~ ✓

**Effect features:** `Context.Tag`, `Effect.provideService`

- `Shuffle` service extracts randomness from `newGame`
- Live implementation uses Fisher-Yates; tests inject identity/reverse shuffles
- Remaining: `PlayerInputService` for readline (deferred to when it's needed)

## Step 4 — Ref for State Management

**Effect features:** `Ref`, `Ref.get`, `Ref.update`

- Replace passing GameState around with `Ref<GameState>`
- Engine functions read/write state through Ref

## Step 5 — Food Costs & Bird Feeder

**Effect features:** Custom service, `Option`

- Birds have food costs
- FoodType enum, food supply per player
- Bird feeder: 5 dice with food faces
- New action: "gain food"
- `InsufficientFood` typed error

## Step 6 — Eggs & Drawing Cards

**Effect features:** Deeper Ref patterns, complex state

- Birds have egg capacity, eggs worth 1 point
- Actions: play bird, gain food, lay eggs, draw cards
- Round structure: 4 rounds with 8/7/6/5 turns

## Step 7 — Habitat Row Activation & Brown Powers

**Effect features:** Pattern matching, composing small effects

- Taking a habitat action activates bird powers right-to-left in that row
- Brown powers as Effect functions (~10 initial powers)

## Step 8+ — Full Wingspan

- White powers (when-played)
- Pink powers (between-turns triggers)
- Bonus cards & end-of-round goals
- Full 170-card set with Schema validation
- Multi-player support
- Save/load with Schema encode/decode
- Game event stream with `Stream`
