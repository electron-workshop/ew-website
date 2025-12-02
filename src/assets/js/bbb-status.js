async function updateCoworkingStatus() {
  console.log("Fetching /bbb-status …");

  try {
    const res = await fetch('/.netlify/functions/bbb-status');

    console.log("Response status:", res.status);

    const data = await res.json();

    console.log("BBB-STATUS JSON:", data);

    const statusEl = document.getElementById('coworking-status');
    const countEl = document.getElementById('participant-count');

    switch (data.status) {
      case "offline":
        console.log("Status displayed: OFFLINE");
        statusEl.innerHTML = '<i class="bi bi-circle-fill text-danger"></i> Room Offline';
        countEl.textContent = 'The coworking room is not running.';
        break;

      case "empty":
        console.log("Status displayed: EMPTY");
        statusEl.innerHTML = '<i class="bi bi-circle-fill text-secondary"></i> Room Empty';
        countEl.textContent = 'Be the first to join!';
        break;

      case "active":
        console.log("Status displayed: ACTIVE");
        statusEl.innerHTML = '<i class="bi bi-circle-fill text-success"></i> Room Active';
        countEl.textContent = `${data.participantCount} ${data.participantCount === 1 ? "person" : "people"} in room`;
        break;

      case "error":
      default:
        console.log("Status displayed: ERROR");
        statusEl.innerHTML = '<i class="bi bi-exclamation-circle text-warning"></i> Status unavailable';
        countEl.textContent = 'Unable to contact server.';
        break;
    }

  } catch (e) {
    console.error("Browser error fetching BBB status:", e);

    document.getElementById('coworking-status').innerHTML =
      '<i class="bi bi-exclamation-circle text-warning"></i> Status unavailable';
  }
}

updateCoworkingStatus();
setInterval(updateCoworkingStatus, 30000);
