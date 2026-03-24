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
| Offering | `/offering/` | No |
| Calendar | `/calendar/` | Yes |
| About | `/about/` | Yes |
| Connect | `/connect/` | Yes |
| Chainference | `/chainference/` | Yes |

### Full Page Map

```
/                           Homepage
/offering/                  Services & tools offered by EW
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
