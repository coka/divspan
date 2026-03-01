import { describe, expect, test } from "bun:test";
import { calculateScore, Game, isGameOver } from "./main";

const emptyBoard = { forest: [], grassland: [], wetland: [] };

describe("isGameOver", () => {
  test("true when hand is empty", () => {
    const state: Game = {
      hand: [],
      board: emptyBoard,
    };
    expect(isGameOver(state)).toBeTrue();
  });

  test("false when hand has birds", () => {
    const state: Game = {
      hand: [{ name: "Robin", points: 1 }],
      board: emptyBoard,
    };
    expect(isGameOver(state)).toBeFalse();
  });
});

describe("calculateScore", () => {
  test("sums points of all birds on board", () => {
    const state: Game = {
      hand: [],
      board: {
        forest: [{ name: "Robin", points: 1 }],
        grassland: [{ name: "Hawk", points: 4 }],
        wetland: [{ name: "Eagle", points: 5 }],
      },
    };
    expect(calculateScore(state)).toBe(10);
  });
});
