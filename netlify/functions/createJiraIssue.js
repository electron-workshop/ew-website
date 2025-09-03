// createJiraIssue.js
// Support Areas + Group (multi-select), with honeypot + time-trap anti-spam

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" }) };
  }

  try {
    const headers = {
      "Content-Type": "application/json",
      // CORS is usually not needed for same-origin POSTs; add if calling cross-origin:
      // "Access-Control-Allow-Origin": "*",
    };

    // ---- Parse body (x-www-form-urlencoded or JSON) ----
    const contentType = (event.headers["content-type"] || event.headers["Content-Type"] || "").toLowerCase();
    let formData = {};
    let paramsForSpamCheck = null;

    if (contentType.includes("application/json")) {
      formData = JSON.parse(event.body || "{}");
    } else {
      paramsForSpamCheck = new URLSearchParams(event.body || "");
      for (const [key, value] of paramsForSpamCheck.entries()) {
        if (key === "supportAreas") {
          if (!Array.isArray(formData.supportAreas)) formData.supportAreas = [];
          formData.supportAreas.push(value);
        } else if (key === "group" || key === "groups") {
          if (!Array.isArray(formData.group)) formData.group = [];
          formData.group.push(value);
        } else if (key in formData) {
          formData[key] = Array.isArray(formData[key]) ? [...formData[key], value] : [formData[key], value];
        } else {
          formData[key] = value;
        }
      }
    }

    // ---- Anti-spam: honeypot + time-to-submit ----
    const honeypots = ["company", "bot-field", "confirmEmail"];
    const hpTripped = honeypots.some((hp) => {
      const v =
        (paramsForSpamCheck && paramsForSpamCheck.get(hp)) ??
        (typeof formData[hp] === "string" ? formData[hp] : "");
      return (v || "").trim() !== "";
    });
    if (hpTripped) {
      return { statusCode: 204, body: "" }; // silently drop
    }

    const formTsRaw =
      (paramsForSpamCheck && paramsForSpamCheck.get("form_ts")) ??
      (formData.form_ts || formData.formTs || "");
    const started = parseInt(formTsRaw, 10);
    if (!Number.isNaN(started) && Date.now() - started < 4000) {
      return { statusCode: 204, body: "" }; // too fast = likely bot
    }

    // ---- Pull common fields ----
    const name   = formData.name   || "New Volunteer";
    const email  = formData.email  || "";
    const skills = formData.skills || "";

    const supportAreas = Array.isArray(formData.supportAreas) ? formData.supportAreas : [];

    // Optional groups from the form (group or groups)
    const groupsFromForm = Array.isArray(formData.group)
      ? formData.group
      : (formData.group ? [formData.group] : []);
    // If someone used "groups" instead:
    if (Array.isArray(formData.groups)) {
      groupsFromForm.push(...formData.groups);
    }

    // ---- Env vars ----
    const jiraUrl               = process.env.JIRA_URL;
    const jiraAuth              = process.env.JIRA_AUTH;
    const projectKey            = process.env.JIRA_PROJECT_KEY;
    const issueType             = process.env.JIRA_ISSUE_TYPE;
    const emailFieldId          = process.env.JIRA_EMAIL_FIELD_ID || "customfield_10053";
    const supportAreasFieldId   = process.env.JIRA_SUPPORT_AREAS_FIELD_ID;
    const groupFieldId          = process.env.JIRA_GROUP_FIELD_ID;
    const groupValuesEnvCsv     = process.env.JIRA_GROUP_VALUES || ""; // "Electron Workshop, Another Group"

    // Resolve Group values: env (preferred) + form (fallback/extra)
    const groupsFromEnv = groupValuesEnvCsv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const groupValues = Array.from(new Set([...groupsFromEnv, ...groupsFromForm])).filter(Boolean);

    // ---- Human-readable description (Atlassian document format) ----
    const areasText  = supportAreas.length ? supportAreas.join(", ") : "—";
    const groupsText = groupValues.length  ? groupValues.join(", ")  : "—";

    const description = {
      type: "doc",
      version: 1,
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Skills / Interests" }] },
        { type: "paragraph", content: [{ type: "text", text: `${skills}` }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Support Areas" }] },
        { type: "paragraph", content: [{ type: "text", text: areasText }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Group(s)" }] },
        { type: "paragraph", content: [{ type: "text", text: groupsText }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Contact Email" }] },
        { type: "paragraph", content: [{ type: "text", text: `${email}` }] },
      ],
    };

    // ---- Build Jira fields payload ----
    const fields = {
      project:   { key: projectKey },
      issuetype: { name: issueType },
      summary:   name,
      description,
    };

    // Email -> custom field
    if (emailFieldId) fields[emailFieldId] = email;

    // Support Areas -> multi-select
    if (supportAreasFieldId && supportAreas.length) {
      fields[supportAreasFieldId] = supportAreas.map((v) => ({ value: v }));
    }

    // Group -> multi-select (from env and/or form)
    if (groupFieldId && groupValues.length) {
      fields[groupFieldId] = groupValues.map((v) => ({ value: v }));
    }

    const payload = { fields };

    // ---- Send to Jira ----
    const response = await fetch(jiraUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": jiraAuth,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const msg = data?.errorMessages?.join(", ") ||
                  data?.errors && JSON.stringify(data.errors) ||
                  "Jira issue creation failed";
      throw new Error(msg);
    }

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ message: "Thank you! Your submission has been received!", jiraKey: data.key }),
    };
  } catch (error) {
    console.error("Jira error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error creating Jira issue", error: error.message }),
    };
  }
};
