const sprintsData = require("./sprints.json");

module.exports = function () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { defaults, items } = sprintsData;

  // Normalise a session: can be a plain date string or an object with overrides
  const normaliseSession = (session, sprint, overrideTime) => {
    const base = {
      online:      sprint.online      ?? defaults.online,
      physical:    sprint.physical    ?? defaults.physical,
      time:        overrideTime ?? sprint.time ?? defaults.time,
      physicalUrl: null,
    };
    if (typeof session === "string") return { ...base, date: session };
    return { ...base, ...session };
  };

  // Merge defaults into each sprint so the template has everything it needs
  const sprints = items.map((sprint) => ({
    ...sprint,
    online:    sprint.online    ?? defaults.online,
    physical:  sprint.physical  ?? defaults.physical,
    time:      sprint.time      ?? defaults.time,
    opening:   normaliseSession(sprint.opening   ?? sprint.startDate, sprint),
    midReview: normaliseSession(sprint.midReview ?? sprint.startDate, sprint),
    retro:     normaliseSession(sprint.retro     ?? sprint.endDate,   sprint, sprint.retroTime ?? defaults.retroTime),
  }));

  const current = sprints.find((s) => {
    const start = new Date(s.startDate + "T00:00:00");
    const end   = new Date(s.endDate   + "T00:00:00");
    return today >= start && today <= end;
  });

  const past = sprints.filter((s) => {
    const end = new Date(s.endDate + "T00:00:00");
    return end < today && s !== current;
  });

  const upcoming = sprints.filter((s) => {
    const start = new Date(s.startDate + "T00:00:00");
    return start > today;
  });

  return { defaults, sprints, current, past, upcoming };
};