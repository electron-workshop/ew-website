const sprintsData = require("./sprints.json");

function localISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function nextSundays(n, fromDate) {
  const sundays = [];
  const d = new Date(fromDate);
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay(); // 0 = Sunday
  if (dow !== 0) d.setDate(d.getDate() + (7 - dow));
  for (let i = 0; i < n; i++) {
    sundays.push(localISO(d));
    d.setDate(d.getDate() + 7);
  }
  return sundays;
}

module.exports = function () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { defaults, venues, items, rounds = [] } = sprintsData;

  // Round logic — a round with no endDate is treated as ongoing
  const currentRound = rounds.find((r) => {
    const start = new Date(r.startDate + "T00:00:00");
    const end = r.endDate ? new Date(r.endDate + "T00:00:00") : null;
    return today >= start && (!end || today <= end);
  }) ?? null;

  const pastRounds = rounds.filter((r) => {
    return r.endDate && new Date(r.endDate + "T00:00:00") < today;
  });

  // Sprint arc logic — arcs can be absent (between rounds)
  const sprints = items.map((s) => ({ ...s }));

  const current = sprints.find((s) => {
    const start = new Date(s.startDate + "T00:00:00");
    const end   = new Date(s.endDate   + "T00:00:00");
    return today >= start && today <= end;
  }) ?? null;

  const past = sprints.filter((s) => {
    const end = new Date(s.endDate + "T00:00:00");
    return end < today;
  });

  const upcoming = sprints.filter((s) => {
    const start = new Date(s.startDate + "T00:00:00");
    return start > today;
  });

  // Weekly check-ins — next 8 Sundays (includes today if today is Sunday)
  const sundayDates = nextSundays(8, today);
  const [nextCheckin, ...laterCheckins] = sundayDates;

  return {
    defaults,
    venues,
    nextCheckin,
    laterCheckins,
    currentRound,
    pastRounds,
    current,
    past,
    upcoming,
  };
};
