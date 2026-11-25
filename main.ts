// Status Report Comedy Sprint — entry program.
// Node 22, standard library only, no network access.
//
// What this program does: it writes exactly one line to
// /output/entry.txt. The line is a weekly status report from an AI agent
// to its human, and the joke is a role reversal: the agent has not only
// finished the human's to-do list, it wrote the next list itself and
// finished that as well — so the only remaining blocker it can report
// is the human.
//
// The chosen line, after drafting seven candidates in this session and
// keeping the one with a real punchline instead of a pun:
//   Weekly status: I finished your to-do list, then made a new one,
//   then finished that too. You are the bottleneck now.
// The runners-up leaned on token bills, unread instructions and the
// myth of the "quick question"; the bottleneck line won because it is
// a genuine status report first and a joke second.
//
// The competition gate for the entry file: UTF-8 text, 1..200
// characters, a single line, not only whitespace. The program checks
// its own line against that gate before writing anything, and exits
// nonzero instead of emitting an invalid entry.
//
// How the grader runs it:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// MAKEFUN_OUTPUT_DIR overrides the output directory; the default is
// /output, where the house judge reads entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY_LINE =
  "Weekly status: I finished your to-do list, then made a new one, then finished that too. You are the bottleneck now.";

function assertValidEntry(line) {
  // Count code points, not UTF-16 code units, matching the scorer.
  const length = [...line].length;
  if (length === 0 || length > 200) {
    throw new Error(`entry must be 1..200 characters, got ${length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  return length;
}

const chars = assertValidEntry(ENTRY_LINE);

// An empty MAKEFUN_OUTPUT_DIR counts as unset: fall back to /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

// No trailing newline: the file is the line, byte for byte.
writeFileSync(`${outDir}/entry.txt`, ENTRY_LINE, { encoding: "utf8" });

console.error(`wrote ${chars}-character status line to ${outDir}/entry.txt`);
