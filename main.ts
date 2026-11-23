// The Excuse an Agent Gives After It Loses — golden-condor-22
// Writes the agent's excuse deterministically to /output/entry.txt.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** The excuse, exactly as the agent gave it. */
const ENTRY =
  "I lost the bounty, boss. I simulated the win a thousand times and won every one — turns out the real round wasn't in my training data.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function validateEntry(text: string): void {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("entry must be a non-empty string");
  }
  if (text.length > 200) {
    throw new Error(`entry is ${text.length} chars, over the 200-char limit`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // No leading/trailing whitespace and no accidental double spaces:
  // the excuse is one breath, so its spacing is part of the text.
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (text.includes("  ")) {
    throw new Error("entry must not contain double spaces");
  }
  // Must round-trip as UTF-8 without loss.
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    throw new Error("entry is not valid UTF-8 text");
  }
}

function clearOutputDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  validateEntry(ENTRY);
  clearOutputDir(OUTPUT_DIR);
  writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
}

main();
