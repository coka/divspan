import { Context, Effect } from "effect";

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

export class Shuffle extends Context.Tag("ShuffleService")<
  Shuffle,
  { readonly shuffle: <T>(array: T[]) => T[] }
>() {}

export const randomShuffle = Effect.provideService(Shuffle, { shuffle });

export const identityShuffle = Effect.provideService(Shuffle, {
  shuffle: <T>(arr: T[]): T[] => arr,
});

export const reverseShuffle = Effect.provideService(Shuffle, {
  shuffle: <T>(arr: T[]): T[] => arr.reverse(),
});
