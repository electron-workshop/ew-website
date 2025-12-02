---
layout: base.njk
title: Sprints 
description: Sprint timeline and schedule
permalink: "/initiatives/sprints/"
---

# Sprint Timeline

<div class="timeline mt-3 mb-5">
  {% for sprint in sprints %}
  <div class="d-flex gap-3 mb-4">
    <div class="text-primary fw-bold" style="min-width: 150px;">
      {{ sprint.start }} - {{ sprint.end }}
      <div class="small text-muted">{{ sprint.year }}</div>
    </div>
    <div class="border-start border-primary border-3 ps-3">
      <h3 class="h5">{{ sprint.title }}</h3>
      <p class="mb-0">{{ sprint.description }}</p>
    </div>
  </div>
  {% endfor %}
</div>


# Co-working

<div class="card border-primary mt-3">
  <div class="card-header bg-primary text-white">
    <h2 class="h5 mb-0"><i class="bi bi-camera-video"></i> Coworking Room</h2>
  </div>
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <div id="coworking-status" class="fw-bold mb-1">
          <i class="bi bi-circle-fill text-secondary"></i> Checking status...
        </div>
        <div id="participant-count" class="small text-muted">Loading...</div>
      </div>
      <a 
        href="YOUR_BBB_JOIN_URL" 
        id="join-coworking"
        class="btn btn-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="bi bi-box-arrow-up-right"></i> Join Room
      </a>
    </div>
  </div>
</div>

<script src="/assets/js/bbb-status.js"></script>