---
layout: base.njk
title: Shared Hosting & Maintenance
permalink: "/offering/hosting/"
---

<p class="mb-1"><a href="/network/" class="text-decoration-none small"><i class="bi bi-arrow-left me-1"></i>Back to Network</a></p>

<h1 class="h3 fw-bold mt-3 mb-2">Shared Hosting &amp; Maintenance</h1>
<p class="lead text-secondary mb-4">We patch and monitor the stack, handle backups, and keep services running — so your group doesn't have to.</p>

<p>Hosting for network members is provided through infrastructure partners. We manage the relationship, handle day-to-day maintenance, and stay across security advisories — you get a stable service without the overhead of running it yourself.</p>

---

<h2 class="h5 fw-semibold mt-5 mb-3">Provider Updates</h2>
<p class="text-secondary mb-4">When infrastructure providers publish advisories or maintenance notices relevant to EW-hosted services, they appear here. Each entry links to the full notice.</p>

{% if providerUpdates.length %}
<div class="d-flex flex-column gap-3 mb-5">
  {% for update in providerUpdates %}
  <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 p-3 rounded border border-primary border-opacity-25 bg-light">
    <div class="d-flex flex-column gap-1">
      <div class="d-flex align-items-center gap-2 flex-wrap">
        <span class="fw-semibold small text-primary">{{ update.vendor }}</span>
        <span class="badge {% if update.type == 'Security' %}text-bg-warning text-dark{% else %}text-bg-secondary{% endif %}">{{ update.type }}</span>
        <span class="badge {% if update.status == 'Resolved' %}text-bg-success{% elif update.status == 'Active' %}text-bg-danger{% else %}text-bg-secondary{% endif %}">{{ update.status }}</span>
        <span class="text-secondary small">{{ update.date }}</span>
      </div>
      <p class="mb-0 small">
        <a href="{{ update.url }}" class="text-decoration-none fw-semibold">{{ update.title }}</a>
      </p>
      <p class="mb-0 text-secondary small">{{ update.summary }}</p>
    </div>
    <a href="{{ update.url }}" class="btn btn-outline-primary btn-sm flex-shrink-0 align-self-start align-self-sm-center">Read more</a>
  </div>
  {% endfor %}
</div>
{% else %}
<p class="text-secondary small mb-5">No current updates.</p>
{% endif %}
