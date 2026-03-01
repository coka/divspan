# Divspan Incremental Roadmap

Each step introduces 1-2 new Effect features on top of the previous step.

## Step 2 — Typed Errors
**Effect features:** `Data.TaggedError`, `Effect.fail`, `catchTag`, `Effect.either`
- `playBird` returns Effect and validates: habitat must have open slot, bird must be in hand
- Errors: `HabitatFull`, `BirdNotInHand`
- CLI catches errors and re-prompts
- Tests verify invalid moves produce expected errors

## Step 3 — Services & Dependency Injection
**Effect features:** `Context.Tag`, `Effect.provideService`, `Layer`
- Extract player input into `PlayerInputService` (chooseBird, chooseHabitat)
- Extract randomness into `RandomService` (for deterministic tests)
- CLI implements services with readline
- Tests use mock services with scripted inputs

## Step 4 — Ref for State Management
**Effect features:** `Ref`, `Ref.get`, `Ref.update`
- Replace passing GameState around with `Ref<GameState>`
- Engine functions read/write state through Ref service

## Step 5 — Food Costs & Bird Feeder
**Effect features:** Custom service (RandomService), `Option`
- Birds have food costs
- FoodType enum, food supply per player
- Bird feeder: 5 dice with food faces
- New action: "gain food" (in addition to "play a bird")
- `InsufficientFood` typed error

## Step 6 — Eggs & Drawing Cards
**Effect features:** Deeper Ref patterns, complex state
- Birds have egg capacity, eggs worth 1 point
- Actions: play bird, gain food, lay eggs, draw cards
- Round structure: 4 rounds with 8/7/6/5 turns

## Step 7 — Habitat Row Activation & Brown Powers
**Effect features:** Pattern matching, composing small effects, `pipe`
- Taking a habitat action activates bird powers right-to-left in that row
- Brown powers as Effect functions (~10 initial powers)
- Power dispatch via pattern matching

## Step 8+ — Full Wingspan
- White powers (when-played)
- Pink powers (between-turns triggers)
- Bonus cards & end-of-round goals
- Full 170-card set with Schema validation
- Multi-player support
- Save/load with Schema encode/decode
- Game event stream with `Stream`
