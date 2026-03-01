import { Console, Effect } from "effect";
import { createInterface } from "readline/promises";

interface Bird {
  name: string;
  points: number;
}

const habitats = ["forest", "grassland", "wetland"] as const;

type Habitat = (typeof habitats)[number];

function randomHabitat(): Habitat {
  return habitats[Math.floor(Math.random() * habitats.length)];
}

export interface Game {
  hand: Bird[];
  board: Record<Habitat, Bird[]>;
}

const initialState: Game = {
  hand: [
    { name: "Bird A", points: 1 },
    { name: "Bird B", points: 2 },
    { name: "Bird C", points: 3 },
    { name: "Bird D", points: 4 },
    { name: "Bird E", points: 5 },
  ],
  board: { forest: [], grassland: [], wetland: [] },
};

function playBird(state: Game, bird: Bird, habitat: Habitat): Game {
  return {
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

const chooseBird = (hand: Bird[]): Effect.Effect<Bird> =>
  Effect.promise(async () => {
    const readline = createInterface({ input: process.stdin, output: process.stdout });
    const answer = await readline.question(`\nChoose a bird (1-${hand.length}): `);
    readline.close();
    return answer;
  }).pipe(
    Effect.map((input) => parseInt(input, 10) - 1),
    Effect.andThen((index) =>
      index >= 0 && index < hand.length
        ? Effect.succeed(hand[index])
        : Console.log("Invalid choice, try again.").pipe(Effect.andThen(() => chooseBird(hand))),
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
    return yield* loop(playBird(state, bird, randomHabitat()));
  });

const main = Effect.gen(function* () {
  yield* Console.log("=== Welcome to Divspan! ===");
  yield* Console.log("\nPlay all 5 birds into habitats. Score = sum of bird points.");
  const finalState = yield* loop(initialState);
  render(finalState);
  yield* Console.log(`\nGame over! Final score: ${calculateScore(finalState)}`);
});

Effect.runPromise(main);
