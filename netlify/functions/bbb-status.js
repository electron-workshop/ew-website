const crypto = require("crypto");

exports.handler = async function () {
  const BBB_URL = process.env.BBB_URL;
  const BBB_SECRET = process.env.BBB_SECRET;
  const MEETING_ID = process.env.BBB_MEETING_ID;

  console.log("=== BBB STATUS DEBUG START ===");
  console.log("BBB_URL:", BBB_URL);
  console.log("MEETING_ID:", MEETING_ID);

  const apiCall = "getMeetingInfo";
  const queryString = `meetingID=${MEETING_ID}`;
  const checksumString = `${apiCall}${queryString}${BBB_SECRET}`;

  console.log("Checksum string:", checksumString);

  const checksum = crypto
    .createHash("sha1")
    .update(checksumString)
    .digest("hex");

  console.log("Generated checksum:", checksum);

  const url = `${BBB_URL}${apiCall}?${queryString}&checksum=${checksum}`;
  console.log("Final BBB URL:", url);

  try {
    const response = await fetch(url);
    const xml = await response.text();

    console.log("BBB RAW XML RESPONSE:");
    console.log(xml);

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
      participantCount,
      rawXML: xml // optional: you can remove this later
    });

  } catch (err) {
    console.error("Netlify Function Error:", err);

    return json({
      status: "error",
      detail: "Network or parsing error",
      error: err.toString()
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
