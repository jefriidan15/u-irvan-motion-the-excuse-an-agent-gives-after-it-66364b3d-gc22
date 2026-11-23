import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse an agent gives after it loses — one line, 134 chars.
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
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
  // Must round-trip cleanly as UTF-8 (the em-dash must survive).
  const roundTripped = Buffer.from(text, "utf8").toString("utf8");
  if (roundTripped !== text) {
    throw new Error("entry is not valid UTF-8 text");
  }
}

// Determinism note: the output depends only on the ENTRY constant above.
// No timestamps, randomness, environment reads, or network calls are
// involved, so every run writes byte-identical output to /output/entry.txt.
function clearOutputDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

validateEntry(ENTRY);
clearOutputDir(OUTPUT_DIR);
writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${OUTPUT_FILE}`);
