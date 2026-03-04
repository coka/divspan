import { Context, Data } from "effect";

export const habitats = ["forest", "grassland", "wetland"] as const;

export type Habitat = (typeof habitats)[number];

export interface Bird {
  name: string;
  habitats: readonly Habitat[];
  points: number;
}

export class InvalidHabitat extends Data.TaggedError("InvalidHabitat")<{
  bird: Bird;
  habitat: Habitat;
}> {}

export const habitatSymbol = "●";

export function displayHabitats(bird: Bird): readonly Habitat[] {
  return [...bird.habitats].reverse();
}

export class Shuffle extends Context.Tag("ShuffleService")<
  Shuffle,
  { readonly shuffle: <T>(array: T[]) => T[] }
>() {}
