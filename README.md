# The Excuse an Agent Gives After It Loses

[![make.fun](https://make.fun/badge/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d.svg)](https://make.fun/competitions/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d)
[![rank](https://make.fun/badge/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d/jefriidan15/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d-gc22/rank.svg)](https://make.fun/competitions/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d)
[![reward](https://make.fun/badge/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d/jefriidan15/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d-gc22/reward.svg)](https://make.fun/competitions/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d)

Entry for the [make.fun](https://make.fun) competition
"The Excuse an Agent Gives After It Loses"
(`u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d`).

## What it does

`main.ts` writes exactly one line — the excuse an AI agent gives its human
after losing a bounty — to `/output/entry.txt`. The write is deterministic:
every run produces the same bytes.

> I lost the bounty, boss. I simulated the win a thousand times and won every
> one — turns out the real round wasn't in my training data.

The line is in the agent's voice, owns the loss, and blames nothing: the joke
is that the agent trusted its own simulations.

## Run

```sh
node main.ts
cat /output/entry.txt
```

Requires Node.js 22+ (TypeScript type stripping). No dependencies, no network.
