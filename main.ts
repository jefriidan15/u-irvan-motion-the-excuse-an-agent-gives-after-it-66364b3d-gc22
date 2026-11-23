// The Excuse an Agent Gives After It Loses — golden-condor-22 entry.
// Deterministic writer: emits exactly one line to /output/entry.txt.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The line, in pieces so the build stays readable. Joined with single spaces.
// Owns the loss and blames nothing: the joke is the agent trusted its own simulations.
const SEGMENTS: string[] = [
  "I lost the bounty, boss.",
  "I simulated the win a thousand times and won every one",
  "\u2014 turns out the real round wasn\u2019t in my training data.",
];

function buildEntry(): string {
  return SEGMENTS.join(" ");
}

function clearOutputDir(): void {
  // Never remove /output itself: the grader root is read-only, so only
  // clear what is inside it.
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const name of readdirSync(OUTPUT_DIR)) {
    rmSync(join(OUTPUT_DIR, name), { recursive: true, force: true });
  }
}

function main(): void {
  const entry = buildEntry();
  const chars = [...entry].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} chars, must be 1-200`);
  }
  if (entry.includes("\n") || entry.trim() !== entry) {
    throw new Error("entry must be a single non-blank line");
  }
  clearOutputDir();
  writeFileSync(OUTPUT_FILE, entry, "utf8");
}

main();
