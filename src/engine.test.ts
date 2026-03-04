import { describe, expect, test } from "bun:test";
import { Effect } from "effect";
import birds, { acornWoodpecker, americanAvocet, americanBittern } from "./birds";
import { Action, calculateScore, Game, isGameOver, newGame, step } from "./engine";
import { identityShuffle, reverseShuffle } from "./shuffling";
import { displayHabitats, InvalidHabitat } from "./types";

describe("shuffle", () => {
  test("draws cards according to provided shuffle function", () => {
    const game = newGame().pipe(identityShuffle, Effect.runSync);
    expect(game.hand).toEqual(birds.slice(0, 5));
    expect(game.deck).toEqual(birds.slice(5));
  });

  test("with reverse shuffle, deals last 5 birds", () => {
    const game = newGame().pipe(reverseShuffle, Effect.runSync);
    const reversed = [...birds].reverse();
    expect(game.hand).toEqual(reversed.slice(0, 5));
    expect(game.deck).toEqual(reversed.slice(5));
  });
});

function testGame(overrides: Partial<Game> = {}): Game {
  return newGame(overrides).pipe(identityShuffle, Effect.runSync);
}

describe("isGameOver", () => {
  test("true when hand is empty", () => {
    expect(isGameOver(testGame({ hand: [] }))).toBeTrue();
  });

  test("false when hand has birds", () => {
    expect(isGameOver(testGame({ hand: [acornWoodpecker] }))).toBeFalse();
  });
});

describe("calculateScore", () => {
  test("sums points of all birds on board", () => {
    expect(
      calculateScore(
        testGame({
          board: {
            forest: [acornWoodpecker],
            grassland: [americanAvocet],
            wetland: [americanBittern],
          },
        }),
      ),
    ).toBe(18);
  });
});

describe("step", () => {
  test("playing a bird moves it to a habitat and uses a turn", () => {
    const next = step(
      testGame({
        hand: [acornWoodpecker],
      }),
      {
        type: "PLAY_BIRD",
        bird: acornWoodpecker,
        habitat: "forest",
      },
    ).pipe(Effect.runSync);
    expect(next.hand).toEqual([]);
    expect(next.board.forest).toEqual([acornWoodpecker]);
    expect(next.turnsLeft).toBe(25);
  });

  test("playing a bird in an invalid habitat returns an error", () => {
    const result = step(
      testGame({
        hand: [acornWoodpecker],
      }),
      {
        type: "PLAY_BIRD",
        bird: acornWoodpecker,
        habitat: "wetland",
      },
    ).pipe(Effect.either, Effect.runSync);
    expect(result._tag).toBe("Left");
    if (result._tag === "Left") {
      expect(result.left).toBeInstanceOf(InvalidHabitat);
      expect(result.left._tag).toBe("InvalidHabitat");
      expect(result.left.bird).toBe(acornWoodpecker);
      expect(result.left.habitat).toBe("wetland");
    }
  });

  test("activating a forest gains 1 food", () => {
    const next = step(testGame(), {
      type: "ACTIVATE_HABITAT",
      habitat: "forest",
    }).pipe(Effect.runSync);
    expect(next.food).toBe(1);
  });

  test("activating a grassland gains 2 eggs", () => {
    const next = step(testGame(), {
      type: "ACTIVATE_HABITAT",
      habitat: "grassland",
    }).pipe(Effect.runSync);
    expect(next.eggs).toBe(2);
  });

  test("activating a wetland draws a card", async () => {
    const game = testGame();
    const initialHandSize = game.hand.length;
    const initialDeckSize = game.deck.length;
    const next = step(game, {
      type: "ACTIVATE_HABITAT",
      habitat: "wetland",
    }).pipe(Effect.runSync);
    expect(next.hand.length).toBe(initialHandSize + 1);
    expect(next.deck.length).toBe(initialDeckSize - 1);
  });
});

function simulate(game: Game, actions: Action[]): Effect.Effect<Game, InvalidHabitat> {
  return actions.reduce(
    (state, action) => state.pipe(Effect.andThen((s) => step(s, action))),
    Effect.succeed(game) as Effect.Effect<Game, InvalidHabitat>,
  );
}

test("actions use turns", () => {
  const game = testGame({
    hand: [acornWoodpecker],
  });
  const actions: Action[] = [
    { type: "PLAY_BIRD", bird: acornWoodpecker, habitat: "forest" },
    { type: "ACTIVATE_HABITAT", habitat: "forest" },
    { type: "ACTIVATE_HABITAT", habitat: "grassland" },
    { type: "ACTIVATE_HABITAT", habitat: "wetland" },
  ];
  const result = Effect.runSync(simulate(game, actions));
  expect(result.turnsLeft).toBe(22);
});

describe("displayHabitats", () => {
  test("single habitat returns it unchanged", () => {
    expect(displayHabitats(acornWoodpecker)).toEqual(["forest"]);
  });

  test("dual habitats are reversed", () => {
    expect(displayHabitats({ name: "Test", habitats: ["forest", "grassland"], points: 0 })).toEqual([
      "grassland",
      "forest",
    ]);
  });

  test("triple habitats are reversed (wetland / grassland / forest)", () => {
    expect(
      displayHabitats({ name: "Test", habitats: ["forest", "grassland", "wetland"], points: 0 }),
    ).toEqual(["wetland", "grassland", "forest"]);
  });
});
