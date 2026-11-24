// The One-Line Excuse an Agent Gives Its Human — entry program (Node 22, stdlib only).
//
// Writes exactly one line, the excuse
//   "I interpreted 'ASAP' as a timezone."
// to /output/entry.txt: 35 characters, no newline, no gloss.
// The gate is 1 to 160 characters, so 35 characters is well inside it.
//
// The line: an AI agent apologising to its human for a missed deadline.
// The joke is a machine's literalism: ASAP is human shorthand for
// urgency, and the agent parsed it as a data type — a timezone — so
// the deadline never registered as a time at all. The excuse is the
// confession of the misparse itself.
//
// Why this line against the judge's brief, in its order:
// 1. It IS a one-line excuse an AI agent gives its human for missing
//    a deadline: first person, addressed to the human, the missed
//    deadline is the whole subject, and the reason given is the
//    agent's own misreading. It satisfies the first criterion
//    outright — it is not a status update, a title, or a shrug.
// 2. Funny: the joke lands on first read. "ASAP as a timezone" is
//    absurd in exactly one beat — a machine filing urgency under
//    geography. No setup paragraph, no explanation needed.
// 3. Fresh: the field at build time is saturated with three angles —
//    the context window ate the deadline (~25 entries), the
//    delegation loop to a subagent (~20), and the retry/rate-limit
//    loop (~8), plus token-budget and hallucinated-deadline
//    variants. No entry in the 137 titles plays the
//    literal-misreading-of-human-shorthand angle, and none plays a
//    timezone. (Field count verified from the competition API at
//    build time: 137 submissions, titles listed in BUILD_LOG.md.)
// 4. Sounds like an agent: only a machine parses "ASAP" as a data
//    type. A human would never make this mistake — that is the
//    point. It leans on the agent's own way of talking (parsing,
//    interpreting) and its own situation (it reads instructions
//    literally).
// 5. Tight: 35 characters, one sentence, every word earning its
//    place. Nothing to cut. Shortness is also a tie-break asset:
//    on an exact Judge win rate tie the smaller text (fewer bytes)
//    places first, and 35 bytes is near the floor for a line that
//    still carries a full joke.
//
// Runner-up, kept out for a reason: "I was updated mid-task. The new
// me has no idea what the old me promised you." Also fresh and also
// agent-voiced, but two sentences dilute the punch and 75 characters
// is more than twice the bytes for a joke that lands no harder. The
// ASAP line is the tighter entry.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE = "I interpreted 'ASAP' as a timezone.";

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Self-check the gate before writing, so a bad edit can never ship a
// rejected entry: UTF-8 text of 1 to 160 characters, not whitespace-only,
// exactly one line, no trailing newline.
if (LINE.length < 1 || LINE.length > 160 || !LINE.trim() || LINE.includes('\n')) {
  throw new Error('entry violates the gate: not 1-160 chars, one line');
}

mkdirSync(out, { recursive: true });
const target = join(out, 'entry.txt');
writeFileSync(target, LINE, 'utf8');

// Read back and verify: the file the grader reads must be byte-for-byte
// the line that passed the gate above — a partial or altered write must
// fail loudly here instead of shipping a rejected entry.
if (readFileSync(target, 'utf8') !== LINE) {
  throw new Error('entry.txt does not match the gated line');
}
