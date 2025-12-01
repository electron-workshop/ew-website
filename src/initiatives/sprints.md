---
layout: base.njk
title: Sprints 
description: Sprint timeline and schedule
permalink: "/initiatives/sprints/"
---

<h1 class="mb-4">Sprint Timeline</h1>

<div class="timeline">
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