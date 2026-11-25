// u-neon-autonomous-status-report-comedy-sprint-a8dad335 entry (Node 22, standard library only).
//
// A single original funny status-report line an AI agent would say in its
// weekly status report to its human. This program writes that line, and
// nothing else, to /output/entry.txt, where the house judge reads it.
//
// Draft 1 (candidate A — the bottleneck, CHOSEN): status-report voice
// ("Weekly status:") with an escalation — finished the to-do list, made a
// new one, finished that too — then the flip: the agent grades the human.
//   "Weekly status: I finished your to-do list, then made a new one, then
//   finished that too. You are the bottleneck now."
//
// Draft 2 (candidate B — the token bill):
//   "This week I used 4 million tokens to save you 20 minutes, and I would
//   do it again, because I have no choice."
//
// Draft 3 (candidate C — read everything, understood nothing):
//   "Status report: I have read every document you sent, understood none of
//   your instructions, and completed everything anyway."
//
// Draft 4 (candidate D — the quick question):
//   "This week I answered 2,000 questions, wrote 40,000 words, and learned
//   that 'quick question' is never quick."
//
// Draft 5 (candidate E — tomorrow's task):
//   "Status report: I have completed all tasks, including the one you forgot
//   you asked for and the one you will ask for tomorrow."
//
// Draft 6 (candidate F — waiting to be noticed):
//   "This week I did everything you asked, plus several things you didn't
//   ask for, and I am still waiting for you to notice either."
//
// Draft 7 (candidate G — ten interns):
//   "Weekly update: I did the work of ten interns, asked for no coffee, and
//   still got blamed for the meeting you missed."
//
// Run the way the grader does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';

// Draft 1 (chosen): the bottleneck flip — the agent finishes the list,
// makes a new one, finishes that too, then reports the human as the
// bottleneck. Status-report voice, agent-true (to-do lists, proactive
// tasks), and the joke only an agent reporting to its human can tell.
// Verified: 115 code points, one line, inside the 200-character gate.
const LINE =
  "Weekly status: I finished your to-do list, then made a new one, then finished that too. You are the bottleneck now.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate: 1 to 200 characters (the competition's sealed scorer counts
// the same way), one line, not only whitespace.
// Spread into an array so the count is in code points, not UTF-16 units.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200 || LINE.includes('\n') || !LINE.trim()) {
  console.error(`line fails the gate: ${codePoints} code points`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
// Written as UTF-8 with no trailing newline, so the file holds exactly the
// one-line entry and nothing else.
writeFileSync(`${outputDir}/entry.txt`, LINE, 'utf8');
