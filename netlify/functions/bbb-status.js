const crypto = require("crypto");

// Rooms the browser may ask about, by key (?room=<key>). The key maps to an
// env var holding the real meetingID, so callers can never probe arbitrary
// meetings on the server. No ?room → the sprints coworking room, as before.
const ROOMS = {
  coworking: "BBB_MEETING_ID",
  watchparty: "BBB_MEETING_ID_WATCHPARTY",
};

exports.handler = async function (event) {
  const BBB_URL = process.env.BBB_URL;
  const BBB_SECRET = process.env.BBB_SECRET;

  const room = (event && event.queryStringParameters && event.queryStringParameters.room) || "coworking";
  const envKey = Object.hasOwn(ROOMS, room) ? ROOMS[room] : null;
  const MEETING_ID = envKey && process.env[envKey];
  if (!BBB_URL || !BBB_SECRET || !MEETING_ID) {
    return json({ status: "unconfigured", running: false, participantCount: 0 });
  }

  console.log("=== BBB STATUS DEBUG START ===");
  console.log("BBB_URL:", BBB_URL);
  console.log("room:", room, "MEETING_ID:", MEETING_ID);

  const apiCall = "getMeetingInfo";
  const queryString = `meetingID=${encodeURIComponent(MEETING_ID)}`;
  const checksumString = `${apiCall}${queryString}${BBB_SECRET}`;

  const checksum = crypto
    .createHash("sha1")
    .update(checksumString)
    .digest("hex");

  console.log("Generated checksum:", checksum);

  const url = `${BBB_URL}${apiCall}?${queryString}&checksum=${checksum}`;

  try {
    const response = await fetch(url);
    const xml = await response.text();

    // EXACT checks so we can see what's happening
    const containsNotFound = xml.includes("<messageKey>notFound</messageKey>");
    const containsFailed = xml.includes("<returncode>FAILED</returncode>");
    const containsRunning = xml.includes("<running>true</running>");

    console.log("containsNotFound:", containsNotFound);
    console.log("containsFailed:", containsFailed);
    console.log("containsRunning:", containsRunning);

    const match = xml.match(/<participantCount>(\d+)<\/participantCount>/);
    console.log("participantCount raw match:", match);

    const participantCount = match ? parseInt(match[1]) : 0;
    console.log("Parsed participantCount:", participantCount);

    // Determine status
    let status;
    if (containsNotFound) status = "offline";
    else if (containsFailed) status = "error";
    else if (containsRunning && participantCount === 0) status = "empty";
    else if (containsRunning && participantCount > 0) status = "active";
    else status = "error";

    console.log("Final computed status:", status);

    console.log("=== BBB STATUS DEBUG END ===");

    return json({
      status,
      running: containsRunning,
      participantCount
    });

  } catch (err) {
    console.error("Netlify Function Error:", err);

    return json({
      status: "error",
      detail: "Network or parsing error"
    });
  }
};

function json(obj) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify(obj)
  };
}
