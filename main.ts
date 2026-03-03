import { Console, Effect } from "effect";
import { createInterface } from "readline/promises";
import birds from "./birds";
import { type Bird } from "./types";

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

const habitats = ["forest", "grassland", "wetland"] as const;

type Habitat = (typeof habitats)[number];

export interface Game {
  deck: Bird[];
  hand: Bird[];
  board: Record<Habitat, Bird[]>;
}

function newGame(): Game {
  const deck = shuffle([...birds]);
  const hand = draw(deck, 5);
  return {
    deck,
    hand,
    board: { forest: [], grassland: [], wetland: [] },
  };
}

function playBird(state: Game, bird: Bird, habitat: Habitat): Game {
  return {
    ...state,
    hand: state.hand.filter((b) => b !== bird),
    board: {
      ...state.board,
      [habitat]: [...state.board[habitat], bird],
    },
  };
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

function renderBird(bird: Bird): string {
  return `${bird.name} (${bird.points})`;
}

function renderHabitat(birds: Bird[]): string {
  return birds.map(renderBird).join(", ") || "(empty)";
}

function render(game: Game): void {
  console.log(
    [
      "\n--- Current board ---\n",
      `Forest: ${renderHabitat(game.board.forest)}`,
      `Grassland: ${renderHabitat(game.board.grassland)}`,
      `Wetland: ${renderHabitat(game.board.wetland)}`,
      `\nHand: ${game.hand.map((b, i) => `[${i + 1}] ${renderBird(b)}`).join(", ") || "(empty)"}`,
    ].join("\n"),
  );
}

const loop = (state: Game): Effect.Effect<Game> =>
  Effect.gen(function* () {
    if (isGameOver(state)) return state;
    render(state);
    const bird = yield* chooseBird(state.hand);
    const habitat = yield* chooseHabitat;
    return yield* loop(playBird(state, bird, habitat));
  });

const main = Effect.gen(function* () {
  yield* Console.log("=== Welcome to Divspan! ===");
  yield* Console.log("\nPlay all 5 birds into habitats. Score = sum of bird points.");
  const finalState = yield* loop(newGame());
  render(finalState);
  yield* Console.log(`\nGame over! Final score: ${calculateScore(finalState)}`);
});

Effect.runPromise(main);
