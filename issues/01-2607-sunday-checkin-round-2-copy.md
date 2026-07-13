---
title: Update site copy for Sunday Check-in Round 2 (open source / community projects focus)
status: open
type: enhancement
created: 2026-07-13
author: cael
---

## Description

The Sunday Check-in has moved into its second round, and the site copy still reflects Round 1.

- **Round 1 (completed)** — 2026-01-04 to 2026-06-28 (26 weeks). Focus: giving people working on a project space to demo it, share a progress report, and find collaborators.
- **Round 2 (current)** — from 2026-07-05. Focus: **open source and/or community projects**.

The README now documents the rounds (see "Sunday Check-in (Sprints) — rounds"). The pages need to catch up.

## Pages to update

- ~~`src/initiatives/sprints.njk`~~ **Done 2026-07-13** — Round 2 banner added, "How it works" cards reframed around open source / community projects, history card renamed to "Past Rounds" with Round 1 marked completed.
- ~~`src/_data/sprints.json`~~ **Done 2026-07-13** — added a `rounds` array (Round 1 completed, Round 2 current with 2026-07-05 → 2026-12-27); `sprintHelpers.js` now exposes `currentRound` / `pastRounds`. A round with no `endDate` is treated as ongoing.
- `src/_data/homeCards.json` — "Bring Your Project to a Sprint" and "Contribute Skills to Sprints" cards: check copy against the Round 2 focus (the "Contribute Skills" card also still says "fortnightly sprint" rather than weekly Sunday check-in).
- `src/about.njk` — Sprints blurb mentions "time-boxed collaborative work cycles"; align with the weekly check-in format and Round 2 focus.
- `src/_data/initiatives.json` — check the Sprints initiative description.
- `src/index.njk` — "Electron Sprints" section; check copy.

## Expected behaviour

All pages describing the Sunday Check-in present the current Round 2 focus (open source and/or community projects), with Round 1 shown as completed history.

## Actual behaviour

Copy across the site describes the Round 1 format and, in places, the older fortnightly-sprint model; `sprints.json` has no Round 2 data.
