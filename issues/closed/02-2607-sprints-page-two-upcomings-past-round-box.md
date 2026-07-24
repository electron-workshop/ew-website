---
title: Sprints page — show only two upcoming Sundays; show Round 1 in a Past box
status: closed
type: enhancement
created: 2026-07-13
author: cael
---

## Description

Two layout improvements to `/initiatives/sprints/` requested by Alexar (2026-07-13):

1. **Show only two upcoming Sundays.** The "Upcoming" list currently renders seven later check-ins (`sprintHelpers.laterCheckins` — next 8 Sundays minus the "Next Check-in"). Trim it to two.
2. **Add a visible "Past" section showing Round 1 in a box.** Round 1 is currently tucked inside the collapsed "Past Rounds" card. It should be presented in its own box (card) on the page — title, date range (2026-01-04 → 2026-06-28), and focus (demo projects, progress reports, finding collaborators).

## Files involved

- `src/_data/sprintHelpers.js` — reduce `laterCheckins` from 7 to 2 (change `nextSundays(8, today)` to `nextSundays(3, today)`).
- `src/initiatives/sprints.njk` — replace or rework the collapsed "Past Rounds" card into a visible "Past" section rendering each past round (from `sprintHelpers.pastRounds`) as a box; decide what happens to the Round 1 sprint-arcs list (keep collapsed inside the box, or drop).

## Expected behaviour

The Upcoming list shows exactly two future Sundays after the "Next Check-in" card, and a Past section displays Round 1 as a distinct box with its dates and focus.

## Actual behaviour

Seven upcoming Sundays are listed, and Round 1 is only visible after expanding the collapsed "Past Rounds" card.
