# BigBlueButton integration

How the website finds out whether a BigBlueButton (BBB) room is running, and
what each person involved needs to do to make that work.

Two pages use this at the moment:

| Page | Room key | Shows |
|---|---|---|
| `/initiatives/sprints/` | `coworking` | Whether the coworking room is offline, empty or active, and how many people are in it |
| `/live/` | `watchparty` | A "join the watch party" prompt while a stream is on and the room is running |

## How it works

```
browser ──► /.netlify/functions/bbb-status?room=watchparty
                 │  looks up BBB_MEETING_ID_WATCHPARTY
                 │  signs a getMeetingInfo call with BBB_SECRET
                 ▼
            BBB server (evenue.electronworkshop.com.au)
                 │
browser ◄── { "status": "offline" | "empty" | "active" | "error" | "unconfigured",
              "participantCount": n }
```

The browser never sees the BBB secret or the meeting ID. It only asks about a
room by its **key** (`coworking`, `watchparty`), and the Netlify function turns
that into the real meeting ID from its environment. A key the function doesn't
know returns `unconfigured`.

A room counts as **running** once someone has started it in BBB, even if it's
empty. Before that, and after the last person leaves and BBB ends it, the room
is `offline`.

---

## For volunteers who run BBB rooms

You don't need to touch the website code. The website team needs three things
from you, and you need to do one thing on the day.

### Before the event

1. **Pick the room.** Use an existing room on evenue or make a new one. One
   room per purpose works best, so the watch party doesn't share the sprints
   coworking room.
2. **Send the website team the room's join link**, e.g.
   `https://evenue.electronworkshop.com.au/rooms/abc-def-ghi-jkl/join`.
   This is public, so any channel is fine.
3. **Get the room's meeting ID to the website team, or ask a server admin to.**
   This is **not** the `abc-def-ghi-jkl` part of the link. That's the room's
   friendly name, and BBB doesn't recognise it. See
   [Finding a room's meeting ID](#finding-a-rooms-meeting-id).
4. **Check the room settings.** If viewers should be able to get in without
   waiting for you, allow them to join without a moderator, or make sure a
   moderator will be there to start it.

### On the day

- **Start the room before the stream begins.** The website only shows the
  watch-party prompt while the room is running. If nobody has started it, the
  prompt stays hidden, and that's working as designed.
- The site checks every 30 seconds, so allow up to a minute for the prompt to
  appear or disappear.
- Leaving the room running with nobody in it is fine. It still counts as on,
  and the first person in gets the discussion going.

### Server admins only: the URL and secret

Whoever administers the BBB server hands these to the website team **once, in
private**, never in a repo, issue, chat channel or email thread:

```sh
sudo bbb-conf --secret
```

This prints a `URL:` and a `Secret:`. The secret lets anyone create, end or
join any meeting on the server as a moderator, so treat it like a root
password. If it has ever appeared in a log, a commit or a message, rotate it
(`sudo bbb-conf --setsecret <new>`) and update the rooms' front end (Greenlight)
and Netlify to match.

---

## For website developers

### Netlify environment variables

Set these under **Site configuration → Environment variables**. Give them the
**Production** and **Deploy Previews** scopes, or PR previews will report
`unconfigured`.

| Variable | Value | Notes |
|---|---|---|
| `BBB_URL` | `https://evenue.electronworkshop.com.au/bigbluebutton/api/` | The `URL:` from `bbb-conf --secret` **plus `api/`**, and it **must end in `/`**. The function appends the call name directly. |
| `BBB_SECRET` | from the server admin | Mark it as a secret in Netlify. |
| `BBB_MEETING_ID` | coworking room's meeting ID | Used when no `?room=` is given. |
| `BBB_MEETING_ID_WATCHPARTY` | watch-party room's meeting ID | Used by `/live/`. |

Environment changes apply on the next deploy, so trigger one after editing.
For local work with `netlify dev`, put the same variables in `.env`, which is
gitignored. `.env.example` lists them.

### Turning on the watch-party prompt

In `src/_data/live.json`:

```json
"watchParty": {
  "url": "https://evenue.electronworkshop.com.au/rooms/abc-def-ghi-jkl/join",
  "room": "watchparty",
  "force": false
}
```

- An empty `url` hides the prompt completely.
- Each stream also needs `"watchParty": true` to show the prompt while it's on.
- `force: true` shows the prompt without asking BBB. Only use it if the status
  check is broken on the day, and set it back afterwards, because it goes stale.

### Adding another room

1. Add a key to `ROOMS` in `netlify/functions/bbb-status.js`, e.g.
   `unforum: "BBB_MEETING_ID_UNFORUM"`.
2. Add the variable to Netlify and to `.env.example`.
3. Call `/.netlify/functions/bbb-status?room=unforum` from the page.

Keys are an allowlist on purpose. Never let the browser pass a meeting ID
directly, or anyone could probe every meeting on the server.

### Finding a room's meeting ID

The join link shows the room's *friendly ID*. BBB knows the room by a
separate *meeting ID* that Greenlight generates. Either of these works:

- **Greenlight console** (server admin, Greenlight v3 in Docker):
  ```sh
  docker exec -it greenlight-v3 bundle exec rails runner \
    'puts Room.find_by(friendly_id: "abc-def-ghi-jkl").meeting_id'
  ```
  Greenlight v2 names the field `bbb_id` instead of `meeting_id`.
- **While the room is running**, call `getMeetings` on the server (as a
  server admin) and find the room by its name in the `<meetingName>` list.
  The `<meetingID>` next to it is the value you want.

### Testing

```sh
# On a deploy preview or production:
curl -s https://<site>/.netlify/functions/bbb-status?room=watchparty
```

| Response `status` | Meaning | Fix |
|---|---|---|
| `unconfigured` | Unknown room key, or a variable is missing in this deploy context | Check the key and the variable scopes, then redeploy |
| `offline` | BBB answered, but the meeting isn't running | Start the room. If it *is* running, the meeting ID is wrong |
| `empty` / `active` | Working | — |
| `error` | Couldn't reach BBB, or BBB rejected the call | Check `BBB_URL` (the `api/` and trailing `/`), then check the secret. A checksum error means a wrong secret |

The function logs to **Netlify → Logs → Functions → bbb-status**. It logs the
room key and meeting ID, and never the secret.
