// /live — pick the stream whose window contains "now", and show the watch-party
// prompt while its BBB room is running. Runs in the browser because the site is
// static: the build can't know what time the viewer is looking.
(function () {
  const POLL_MS = 30000;

  const streams = Array.from(document.querySelectorAll(".live-stream")).map((el) => ({
    el,
    title: el.dataset.title,
    starts: new Date(el.dataset.starts),
    ends: new Date(el.dataset.ends),
    watchParty: el.dataset.watchParty === "true",
  })).filter((s) => !isNaN(s.starts) && !isNaN(s.ends));

  const party = document.getElementById("watch-party");
  let current = null;
  let partyRunning = false;

  function fmt(d) {
    return d.toLocaleString("en-AU", {
      weekday: "long", day: "numeric", month: "long",
      hour: "numeric", minute: "2-digit", timeZoneName: "short",
    });
  }

  function render() {
    const now = new Date();
    const live = streams.find((s) => s.starts <= now && now < s.ends) || null;

    if (live !== current) {
      streams.forEach((s) => s.el.classList.toggle("d-none", s !== live));
      if (live) {
        const frame = live.el.querySelector("iframe[data-src]");
        if (frame && !frame.src) frame.src = frame.dataset.src;
      }
      streams.forEach((s) => {
        // Stop anything that just went off air so it isn't playing unseen.
        const frame = s.el.querySelector("iframe[src]");
        if (s !== live && frame) frame.removeAttribute("src");
      });
      current = live;
    }

    const empty = document.getElementById("live-empty");
    empty.classList.toggle("d-none", !!live);
    if (!live) {
      const next = streams.filter((s) => s.starts > now).sort((a, b) => a.starts - b.starts)[0];
      if (next) {
        document.getElementById("live-next").textContent = `Next up: ${next.title} — ${fmt(next.starts)}.`;
      }
    }

    if (party) {
      const show = !!live && live.watchParty && (party.dataset.force === "true" || partyRunning);
      party.classList.toggle("d-none", !show);
    }
  }

  async function checkParty() {
    if (!party || party.dataset.force === "true" || !current || !current.watchParty) return;
    try {
      const res = await fetch(`/.netlify/functions/bbb-status?room=${encodeURIComponent(party.dataset.room)}`);
      const data = await res.json();
      // "empty" still counts: the room is up and someone can be the first in.
      partyRunning = data.status === "active" || data.status === "empty";
      const n = data.participantCount || 0;
      document.getElementById("watch-party-count").textContent =
        n > 0 ? `(${n} ${n === 1 ? "person" : "people"} in the room)` : "";
    } catch (e) {
      // Can't tell → say nothing. The prompt is an invitation, not a status board.
      partyRunning = false;
    }
    render();
  }

  render();
  checkParty();
  setInterval(() => { render(); checkParty(); }, POLL_MS);
})();
