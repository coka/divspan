import { Effect } from "effect";
import { Box, Text, useApp, useInput } from "ink";
import { useState } from "react";
import { calculateScore, isGameOver, newGame, step } from "./engine";
import { randomShuffle } from "./shuffling";
import { Bird, habitats } from "./types";

function renderBird(bird: Bird): string {
  return `${bird.name} (${bird.points})`;
}

const habitatColors = { forest: "green", grassland: "yellow", wetland: "blue" } as const;

type Phase =
  | { tag: "chooseAction" }
  | { tag: "chooseBird" }
  | { tag: "chooseHabitat"; for: "play" | "activate"; birdIndex?: number }
  | { tag: "error"; message: string }
  | { tag: "gameOver" };

export function App() {
  const [game, setGame] = useState(newGame().pipe(randomShuffle, Effect.runSync));
  const [phase, setPhase] = useState<Phase>({ tag: "chooseAction" });
  const { exit } = useApp();
  useInput((input, key) => {
    if (key.ctrl && input === "c") {
      exit();
    }
    switch (phase.tag) {
      case "chooseAction":
        if (input === "p" && game.hand.length > 0) setPhase({ tag: "chooseBird" });
        else if (input === "a") setPhase({ tag: "chooseHabitat", for: "activate" });
        return;
      case "chooseBird": {
        const idx = parseInt(input, 10) - 1;
        if (idx >= 0 && idx < game.hand.length) {
          setPhase({ tag: "chooseHabitat", for: "play", birdIndex: idx });
        }
        return;
      }
      case "chooseHabitat":
        const idx = parseInt(input, 10) - 1;
        if (idx < 0 || idx >= habitats.length) return;
        const habitat = habitats[idx];
        const action =
          phase.for === "play"
            ? { type: "PLAY_BIRD" as const, bird: game.hand[phase.birdIndex!], habitat }
            : { type: "ACTIVATE_HABITAT" as const, habitat };

        const result = step(game, action).pipe(Effect.either, Effect.runSync);
        if (result._tag === "Right") {
          const next = result.right;
          setGame(next);
          setPhase(isGameOver(next) ? { tag: "gameOver" } : { tag: "chooseAction" });
        } else {
          const e = result.left;
          setPhase({
            tag: "error",
            message: `${e.bird.name} can't live in ${e.habitat}. Valid: ${e.bird.habitats.join(", ")}`,
          });
        }
        return;
    }
  });
  const turn = 27 - game.turnsLeft;
  return (
    <Box flexDirection="column" borderStyle="round" borderColor="green" paddingX={2}>
      <Text bold color="cyan">
        DIVSPAN — Turn {turn}/26
      </Text>

      {/* Board */}
      <Box flexDirection="column" marginTop={1}>
        {habitats.map((h) => (
          <Text key={h}>
            <Text color={habitatColors[h]} bold>
              {h.padEnd(10)}
            </Text>
            {game.board[h].length > 0 ? game.board[h].map(renderBird).join(", ") : "(empty)"}
          </Text>
        ))}
      </Box>

      {/* Stats */}
      <Box marginTop={1} gap={2}>
        <Text>
          Food: <Text bold>{game.food}</Text>
        </Text>
        <Text>
          Eggs: <Text bold>{game.eggs}</Text>
        </Text>
        <Text>
          Deck: <Text bold>{game.deck.length}</Text>
        </Text>
      </Box>

      {/* Hand */}
      <Box flexDirection="column" marginTop={1}>
        <Text bold>Hand:</Text>
        {game.hand.map((bird, i) => (
          <Text key={bird.name}>
            <Text color="white" dimColor>
              [{i + 1}]
            </Text>{" "}
            {renderBird(bird)}
          </Text>
        ))}
        {game.hand.length === 0 && <Text dimColor>(empty)</Text>}
      </Box>

      {/* Prompt */}
      <Box marginTop={1}>
        {phase.tag === "chooseAction" && (
          <Text>
            <Text bold color="cyan">
              &gt;{" "}
            </Text>
            {game.hand.length > 0 && <Text>[p] Play bird </Text>}
            <Text>[a] Activate habitat</Text>
          </Text>
        )}
        {phase.tag === "chooseBird" && (
          <Text>
            <Text bold color="cyan">
              &gt;{" "}
            </Text>
            Pick a bird [1-{game.hand.length}] <Text dimColor>(esc to go back)</Text>
          </Text>
        )}
        {phase.tag === "chooseHabitat" && (
          <Text>
            <Text bold color="cyan">
              &gt;{" "}
            </Text>
            [1] Forest [2] Grassland [3] Wetland <Text dimColor>(esc to go back)</Text>
          </Text>
        )}
        {phase.tag === "error" && (
          <Text color="red">
            {phase.message} <Text dimColor>(any key)</Text>
          </Text>
        )}
        {phase.tag === "gameOver" && (
          <Text bold color="yellow">
            Game over! Score: {calculateScore(game)} <Text dimColor>(q to quit)</Text>
          </Text>
        )}
      </Box>
    </Box>
  );
}
