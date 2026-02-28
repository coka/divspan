import { Console, Effect } from "effect";

const main = Console.log("hello, world");

Effect.runSync(main);
