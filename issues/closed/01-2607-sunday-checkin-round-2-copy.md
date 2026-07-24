---
title: Update site copy for Sunday Check-in Round 2 (open source / community projects focus)
status: closed
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
- ~~`src/_data/homeCards.json`~~ **Done 2026-07-13** — both engage cards and the quick-access card reframed around the weekly Sunday check-in and open source / community projects; "fortnightly" removed.
- ~~`src/about.njk`~~ **Done 2026-07-13** — blurb now describes the weekly Sunday check-in format.
- ~~`src/_data/initiatives.json`~~ **Done 2026-07-13** — Sprints description filled in (was empty).
- ~~`src/index.njk`~~ **Done 2026-07-13** — "Electron Sprints" card updated to weekly check-ins; button now "Join a Check-in".

## Expected behaviour

All pages describing the Sunday Check-in present the current Round 2 focus (open source and/or community projects), with Round 1 shown as completed history.

## Actual behaviour

Copy across the site describes the Round 1 format and, in places, the older fortnightly-sprint model; `sprints.json` has no Round 2 data.
