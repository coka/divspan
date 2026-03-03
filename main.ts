import { Console, Effect } from "effect";
import { createInterface } from "readline/promises";
import birds from "./birds";
import { type Bird, type Habitat, InvalidHabitat, habitats } from "./types";

/**
 * In-place Fisher-Yates shuffle.
 */
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function draw<T>(from: T[], count: number): T[] {
  return from.splice(0, count);
}

export interface Game {
  deck: Bird[];
  hand: Bird[];
  board: Record<Habitat, Bird[]>;
  food: number;
  eggs: number;
  turnsLeft: number;
}

function newGame(): Game {
  const deck = shuffle([...birds]);
  const hand = draw(deck, 5);
  return {
    deck,
    hand,
    board: { forest: [], grassland: [], wetland: [] },
    food: 0,
    eggs: 0,
    turnsLeft: 26,
  };
}

function playBird(state: Game, bird: Bird, habitat: Habitat): Effect.Effect<Game, InvalidHabitat> {
  if (!bird.habitats.includes(habitat)) {
    return Effect.fail(new InvalidHabitat({ bird, habitat }));
  }
  return Effect.succeed({
    ...state,
    hand: state.hand.filter((b) => b !== bird),
    board: {
      ...state.board,
      [habitat]: [...state.board[habitat], bird],
    },
  });
}

function activateHabitat(state: Game, habitat: Habitat): Game {
  switch (habitat) {
    case "forest":
      return { ...state, food: state.food + 1 };
    case "grassland":
      return { ...state, eggs: state.eggs + 2 };
    case "wetland":
      return { ...state, hand: state.hand.concat(draw(state.deck, 1)) };
  }
}

export function isGameOver(game: Game): boolean {
  return game.hand.length === 0;
}

export function calculateScore({ board }: Game): number {
  return [...board.forest, ...board.grassland, ...board.wetland].reduce(
    (sum, bird) => sum + bird.points,
    0,
  );
}

async function ask(question: string): Promise<string> {
  const readline = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await readline.question(question);
  readline.close();
  return answer;
}

const chooseBird = (hand: Bird[]): Effect.Effect<Bird> =>
  Effect.promise(() => ask(`\nChoose a bird (1-${hand.length}): `)).pipe(
    Effect.map((input) => parseInt(input, 10) - 1),
    Effect.andThen((index) =>
      index >= 0 && index < hand.length
        ? Effect.succeed(hand[index])
        : Console.log("Invalid choice, try again.").pipe(Effect.andThen(() => chooseBird(hand))),
    ),
  );

const chooseHabitat: Effect.Effect<Habitat> = Effect.promise(() =>
  ask(`Choose a habitat ([1] Forest, [2] Grassland, [3] Wetland): `),
).pipe(
  Effect.map((input) => parseInt(input, 10) - 1),
  Effect.andThen((index) =>
    index >= 0 && index < habitats.length
      ? Effect.succeed(habitats[index])
      : Console.log("Invalid choice, try again.").pipe(Effect.andThen(() => chooseHabitat)),
  ),
);

export type PlayBirdAction = {
  type: "PLAY_BIRD";
  bird: Bird;
  habitat: Habitat;
};

export type ActivateHabitatAction = {
  type: "ACTIVATE_HABITAT";
  habitat: Habitat;
};

export type Action = PlayBirdAction | ActivateHabitatAction;

const chooseActionType: Effect.Effect<Pick<Action, "type">> = Effect.promise(() =>
  ask(`Choose an action ([1] Play bird, [2] Activate habitat): `),
).pipe(
  Effect.map((input) => parseInt(input, 10)),
  Effect.andThen((choice) => {
    switch (choice) {
      case 1:
        return Effect.succeed<Pick<Action, "type">>({ type: "PLAY_BIRD" });
      case 2:
        return Effect.succeed<Pick<Action, "type">>({ type: "ACTIVATE_HABITAT" });
      default:
        return Console.log("Invalid choice, try again.").pipe(
          Effect.andThen(() => chooseActionType),
        );
    }
  }),
);

function renderBird(bird: Bird): string {
  return `${bird.name} (${bird.points})`;
}

function renderHabitat(birds: Bird[]): string {
  return birds.map(renderBird).join(", ") || "(empty)";
}

function render(game: Game): void {
  console.log(
    [
      `\n--- Turn ${27 - game.turnsLeft} of 26 ---\n`,
      `Forest: ${renderHabitat(game.board.forest)}`,
      `Grassland: ${renderHabitat(game.board.grassland)}`,
      `Wetland: ${renderHabitat(game.board.wetland)}`,
      `\nFood: ${game.food} seed | Eggs: ${game.eggs} | Deck: ${game.deck.length} birds`,
      `\nHand: ${game.hand.map((b, i) => `[${i + 1}] ${renderBird(b)}`).join(", ") || "(empty)"}`,
    ].join("\n"),
  );
}

export function step(state: Game, action: Action): Effect.Effect<Game, InvalidHabitat> {
  return (() => {
    switch (action.type) {
      case "PLAY_BIRD":
        return playBird(state, action.bird, action.habitat);
      case "ACTIVATE_HABITAT":
        return Effect.succeed(activateHabitat(state, action.habitat));
    }
  })().pipe(Effect.map((state) => ({ ...state, turnsLeft: state.turnsLeft - 1 })));
}

const loop = (state: Game): Effect.Effect<Game> =>
  Effect.gen(function* () {
    if (isGameOver(state)) return state;
    render(state);
    const actionType = yield* chooseActionType;
    let action: Action;
    switch (actionType.type) {
      case "PLAY_BIRD": {
        const bird = yield* chooseBird(state.hand);
        const habitat = yield* chooseHabitat;
        action = { type: "PLAY_BIRD", bird, habitat };
        break;
      }
      case "ACTIVATE_HABITAT": {
        const habitat = yield* chooseHabitat;
        action = { type: "ACTIVATE_HABITAT", habitat };
        break;
      }
    }
    return yield* step(state, action).pipe(
      Effect.andThen((next) => loop(next)),
      Effect.catchTag("InvalidHabitat", (e) =>
        Console.log(
          `${e.bird.name} can't live in the ${e.habitat}.`,
          `\nValid habitats are: ${e.bird.habitats.join(", ")}.`,
        ).pipe(Effect.andThen(() => loop(state))),
      ),
    );
  });

const main = Effect.gen(function* () {
  yield* Console.log("=== Welcome to Divspan! ===");
  yield* Console.log("\nPlay birds or activate habitats across 26 turns.");
  const finalState = yield* loop(newGame());
  render(finalState);
  yield* Console.log(`\nGame over! Final score: ${calculateScore(finalState)}`);
});

if (import.meta.main) {
  Effect.runPromise(main);
}
