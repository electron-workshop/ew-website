module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // ── Awareness day date helpers ───────────────────────────────────────────
  const MONTH_IDX = {
    January:0, February:1, March:2, April:3, May:4, June:5,
    July:6, August:7, September:8, October:9, November:10, December:11
  };
  const DAY_IDX = {
    Sunday:0, Monday:1, Tuesday:2, Wednesday:3, Thursday:4, Friday:5, Saturday:6
  };

  function calcAwarenessDate(rule, year) {
    if (!rule) return null;
    if (rule.type === "fixed") {
      return new Date(year, MONTH_IDX[rule.month], rule.day);
    }
    // nth weekday of month
    const m = MONTH_IDX[rule.month];
    const firstDow = new Date(year, m, 1).getDay();
    const target = DAY_IDX[rule.weekday];
    let diff = target - firstDow;
    if (diff < 0) diff += 7;
    const nthDay = 1 + diff + (rule.week - 1) * 7;
    return new Date(year, m, nthDay);
  }

  function nextOccurrence(rule) {
    if (!rule) return null;
    const now = new Date();
    const year = now.getFullYear();
    let date = calcAwarenessDate(rule, year);
    if (date < now) date = calcAwarenessDate(rule, year + 1);
    return date;
  }

  // Returns a formatted date string for the next occurrence of an awareness day
  eleventyConfig.addFilter("awarenessDate", function(rule) {
    const date = nextOccurrence(rule);
    if (!date) return "Date TBC";
    return date.toLocaleDateString("en-AU", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  });

  // Returns true if the awareness day falls within the next `days` days
  eleventyConfig.addFilter("awarenessIsUpcoming", function(rule, days) {
    const date = nextOccurrence(rule);
    if (!date) return false;
    const ms = date - new Date();
    const cutoff = (days || 60) * 24 * 60 * 60 * 1000;
    return ms >= 0 && ms <= cutoff;
  });

  // Filter an array of objects by a property value
  eleventyConfig.addFilter("filterByProp", function(arr, prop, value) {
    return (arr || []).filter(item => item[prop] === value);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};