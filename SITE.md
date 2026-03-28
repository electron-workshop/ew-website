# Electron Workshop — Site Reference

> A living document describing the structure, IA, and conventions of the EW website.
> Update this document whenever pages, data files, or significant structural patterns change.

---

## Overview

Electron Workshop is a Melbourne-based open tech community organisation. The website serves as the hub for three interlocking initiatives that form the "fabric" of the open tech commons:

| Initiative | Description |
|---|---|
| **Festivals & Gatherings** | Global awareness festivals (SFD, HFD, DFD, Linux Birthday…) set yearly themes. Chainferences and Un-forum create local and flagship gatherings around them. |
| **Electron Sprints** | Fortnightly open work sessions using self-hosted tools, helping community and open projects get done while people learn skills and build connections. |
| **Electron Network** | Community groups joining forces — shared capacity, collective intelligence, coordinated action for causes in the open innovation commons. |

### Core Philosophy

**EW is an intermediary and collective enabler — not a direct service provider.**

EW does not aim to directly serve ordinary attendees or end users of services. That happens through proper service providers and community organisers. EW's role is to facilitate organisations, initiatives, active people, and thinkers to join forces and pick up heavier weights together.

This should be reflected in all copy: the audience is community organisers, ecosystem thinkers, ecosystem enablers (policy makers, funders, sponsors), and open innovators. All participation pathways are framed for people who want to *make things happen*, not consume them.

### The Shape of the Year

The calendar is structured around two types of thematic anchors:

1. **Global Awareness Festivals** — internationally recognised days (Software Freedom Day, Hardware Freedom Day, Document Freedom Day, Linux Birthday, etc.) that set focus and themes. Each has its own page at `/awareness/[slug]/` listing community events worldwide.

2. **Themed Months** — community-chosen monthly focus areas (e.g. October = Robotics, December = DAOs) that shape sprints, gatherings, and network conversations for that period. Defined in `_data/thememonths.json`.

The two together form the "shape of the year" — visible on the Calendar page as a 12-month grid.

### Sprint Contribution Pathways

There are two distinct ways to participate in Electron Sprints:

1. **Bring a project** — Bring an open project (hackathon idea, community group tool, hobby project ready to work on in the open). Work on it during sprints, mentor participants, make real progress. The project owner is the anchor.

2. **Contribute skills** — Bring time and skills to help existing open projects move forward. Work alongside project owners, learn from real use cases, no long-term commitment required.

Both pathways are equally valid and should be clearly communicated in all sprint-related copy.

**Target audience:** Community organisers, ecosystem thinkers, ecosystem enablers (policy makers, sponsors), and open innovators. Not passive visitors — active participants.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Generator | [Eleventy (11ty)](https://www.11ty.dev/) v3 |
| Templates | Nunjucks (`.njk`) |
| Markdown | Enabled with Nunjucks pre-processing (`markdownTemplateEngine: "njk"`) |
| CSS | Bootstrap 5.3 + custom styles at `src/assets/css/styles.css` |
| Icons | Bootstrap Icons 1.11 |
| Hosting | Netlify (Forms, Functions, CDN) |
| Analytics | Matomo (self-hosted at `analytics.electronworkshop.com.au`) |
| Search | Pagefind (static, client-side) |
| Forms | Netlify Forms (honeypot + time-trap spam protection) |

---

## Information Architecture

### Navigation

Defined in `src/_data/navbar.json`. Items with `"footer": true` also appear in the footer.

| Label | URL | In Footer |
|---|---|---|
| Home | `/` | No |
| Network | `/network/` | No |
| Calendar | `/calendar/` | Yes |
| About | `/about/` | Yes |
| Connect | `/connect/` | Yes |
| Chainference | `/chainference/` | Yes |

### Full Page Map

```
/                           Homepage
/network/                   The Electron Network — identity, offerings, and how to join
/offering/[slug]/           Individual offering detail pages (keep at /offering/ for now)
/calendar/                  Events calendar
/about/                     About EW — history, timeline, initiatives
/connect/                   Contact form + Get Involved / volunteer form
/chainference/              Chainference sub-brand (see branch: feature/chainference)

/awareness/                 Global awareness festivals (auto-generated from awarenessdays.json)
  /awareness/document-freedom-day/
  /awareness/hardware-freedom-day/
  /awareness/international-timebanking-day/
  /awareness/linux-birthday/
  /awareness/software-freedom-day/

/chainferences/             Individual chainference detail pages (markdown files)
  /chainferences/everything-open/
  /chainferences/pycon/
  /chainferences/sxsw/

/initiatives/
  /initiatives/sprints/     Electron Sprints programme
  /initiatives/electron-network/   Electron Network (stub)
```

### Page Generation Methods

| Method | Used for |
|---|---|
| Static `.njk` files | Homepage, About, Connect, Offering, Calendar, Chainference |
| Static `.md` files | Individual chainference pages |
| **Eleventy pagination** from JSON | Awareness day pages (`/awareness/[slug]/`) |

---

## Data Files (`src/_data/`)

| File | Purpose |
|---|---|
| `site.json` | Site title, description, domain |
| `global.js` | Dynamic globals (`currentYear`) |
| `navbar.json` | Navigation and footer links |
| `timeline.json` | About page timeline entries |
| `offerings.json` | Tools/services listing (Offering page + homepage strip) |
| `homeCards.json` | Homepage card content — see cardType reference below |
| `homeLogos.json` | Partner/logo groups on the homepage |
| `awarenessdays.json` | Global awareness festival definitions — drives `/awareness/[slug]/` pages |
| `awarenessevents.json` | Community-submitted events for each awareness day |
| `thememonths.json` | Themed monthly focus areas (e.g. October = Robotics, December = DAOs) shown on Calendar page |
| `sprints.json` | Sprint data for the Sprints initiative page |
| `sprintHelpers.js` | Computed data helpers for sprints |
| `initiatives.json` | Legacy — initiatives data (Sprints, Electron Network) |

### `homeCards.json` — cardType reference

| `cardType` | Where rendered | Notes |
|---|---|---|
| `chainference` | "What's On" section, homepage | Shows "Chainference" badge |
| `whatsOnEcosystem` | "What's On" section, homepage | General event card |
| `engage` | "Get Involved" section, homepage (blue bg) | Participation pathways |
| `quickAccess` | *(legacy — no longer rendered)* | Kept for data continuity |

Set `"featured": true` on a card + any of the event types to show it in the Featured section at the top of the homepage. Only one featured card should be active at a time.

Set `"display": false` to hide a card without deleting it.

### `awarenessdays.json` — dateRule types

```json
{ "type": "nth", "week": 3, "weekday": "Wednesday", "month": "March" }
{ "type": "fixed", "month": "August", "day": 25 }
```

Set `"dateRule": null` and use `dateRuleText` for a human-readable fallback when the date rule is unknown.

### `awarenessevents.json` — event entry shape

```json
{
  "daySlug": "software-freedom-day",
  "name": "Event Name",
  "url": "https://...",
  "date": "2026-09-19",
  "time": "14:00",
  "location": { "city": "Melbourne", "country": "Australia" },
  "timezone": "Australia/Melbourne",
  "language": "English",
  "description": "Short description."
}
```

---

## Custom Eleventy Filters (`.eleventy.js`)

| Filter | Signature | Description |
|---|---|---|
| `awarenessDate` | `rule \| awarenessDate` | Returns formatted date string for next occurrence of an awareness day rule |
| `awarenessIsUpcoming` | `rule \| awarenessIsUpcoming(days)` | Returns `true` if the next occurrence is within `days` days (default 60) |
| `filterByProp` | `array \| filterByProp("prop", value)` | Filters an array of objects by property value |

---

## Netlify Forms

| Form `name` | Page | Purpose |
|---|---|---|
| `ContactForm` | `/connect/` | General message / inquiry |
| `VolunteerForm` | `/connect/` | Volunteer / advisor sign-up |
| `awareness-event-submission` | `/awareness/[slug]/` | Community event submission for awareness days |

All forms use a honeypot field (`name="company"`, visually hidden) for basic spam protection. The `VolunteerForm` also uses a time-trap (`form_ts` hidden field set on page load).

Submitted awareness events are reviewed manually (via Netlify dashboard) and then added to `src/_data/awarenessevents.json`.

---

## How to Add Content

### Add or update a themed month
Edit `src/_data/thememonths.json`. Each entry needs a `month` (full name), `theme`, `icon` (Bootstrap icon class), `color` (Bootstrap colour name e.g. `warning`, `info`, `success`), and `description`. The month tile on the Calendar page and the themed months section are both driven from this file.

### Add a new awareness day
1. Add an entry to `src/_data/awarenessdays.json` with a unique `slug`
2. Add a banner image to `src/assets/images/awareness/[slug].jpg`
3. The page at `/awareness/[slug]/` is auto-generated at build time — no template changes needed

### Add an event to an awareness day page
Either:
- Submit via the form on the `/awareness/[slug]/` page (review via Netlify dashboard, then add to `awarenessevents.json`), or
- Add directly to `src/_data/awarenessevents.json` with the correct `daySlug`

### Add a chainference
1. Create `src/chainferences/[slug].md` with `layout: base.njk` frontmatter
2. Add a corresponding card to `homeCards.json` with `"cardType": "chainference"`

### Add or update a homepage card
Edit `src/_data/homeCards.json`. See cardType reference above.

### Update navigation
Edit `src/_data/navbar.json`. Add `"footer": true` to also show the item in the footer.

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production — deploys to `electronworkshop.org` |
| `feature/chainference` | Chainference sub-brand development (separate Claude Code session) |

> **Note:** Do not merge `feature/chainference` changes (layout, new chainference pages) into `main` without coordinating between sessions. The Chainference navbar item and `/chainference/` pages are being actively developed on that branch.

---

## Conventions

- **Bootstrap 5** utility classes throughout — avoid writing custom CSS unless necessary
- Card borders: `border-primary border-opacity-25 shadow-sm` is the standard card style
- Section headings: `fs-3 fw-semibold border-bottom border-2 border-primary d-inline-block`
- Small label above a heading: `text-primary fw-bold text-uppercase` with `letter-spacing:.08em; font-size:.8rem`
- Images: always include `alt` text; use `object-fit-cover` for banner crops
- No emojis in templates unless explicitly requested
- Banners for awareness days: `src/assets/images/awareness/[slug].jpg` — 1200×400px recommended
