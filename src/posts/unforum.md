---
layout: base.njk
title: Un-forum
description: Discussions and hands-on workshops on AI and open technology for the everyday people
preview_image: "https://electronworkshop.org/assets/images/banners/Canberra-Unforum-2025-Banner-Preview-V102.webp"

form:
  heading: "Subscribe to Un-forum Updates"
  description: "Want to follow along and get updates about the Un-forum? Enter your email below, and you will be notified of developments"
  formName: "canberraUnforumForm"
  formId: "canberraUnforumForm"
  emailId: "canberraUnforumEmail"
  buttonText: "Subscribe"
---

<style>
.dashed-border {
  border-bottom-style: dashed !important;
  
}
.banner-container {
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.banner-container img {
    height: 200px;
    width: auto;
    max-width: none;
}
</style>

<h1 class="text-primary">{{title}}</h1>

<p class="mb-1">
  <a href="/posts/un-forum-2025-december/" class="text-primary">
    <i class="bi bi-arrow-left-circle" aria-hidden="true"></i>
    Previous Un-forum: 2025-December
  </a>
</p>
<p class="mb-1">
  <i class="bi bi-calendar3" aria-hidden="true"></i> Saturday to Monday, 21st March to 23rd March 2026
</p>
<p class="mb-3">
  <i class="bi bi-broadcast-pin" aria-hidden="true"></i> Online and in person in different locations
</p>


<div class="banner-container my-2 rounded">
    <img src="/assets/images/banners/Canberra-Unforum-2025-Banner-Page-V102.svg" 
         alt="Canberra Un-forum 2025 Banner" 
         class="img-fluid">
</div>

<p class="mb-3">Session titles and descriptions are TBC and will be updated as we go.</p>

<div class="row g-4 mb-4 mt-1">
  
  <div class="col-12 col-lg-4">
    <div class="card h-100 bg-light overflow-hidden">
      <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-1">Day 1</h5>
      </div>
      <div class="card-body p-0">
        <div class="p-3 border-bottom dashed-border bg-light">
          <div class="fw-bold text-primary mb-0">
            <h5 class="card-title mb-0"><i class="bi bi-calendar3" aria-hidden="true"></i> Saturday 21st March 2026</h5>
          </div>
        </div>
        <div class="p-3 border-bottom dashed-border bg-light">
          <h6 class="fw-bold mb-2">Session 1 (Morning)</h6>
        </div>
        <div class="p-3 border-bottom dashed-border bg-light">
          <h6 class="fw-bold mb-2">Session 2 (Afternoon)</h6>
        </div>
        <div class="p-3 bg-light">
          <h6 class="fw-bold mb-2">Session 3 (Night)</h6>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 col-lg-4">
    <div class="card h-100 bg-light overflow-hidden">
      <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-1">Day 2</h5>
      </div>
        <div class="p-3 border-bottom dashed-border bg-light">
          <div class="fw-bold text-primary mb-0">
            <h5 class="card-title mb-0"><i class="bi bi-calendar3" aria-hidden="true"></i> Sunday 22nd March 2026</h5>
          </div>
        </div>
      <div class="card-body p-0 bg-light">
        <div class="p-3 border-bottom dashed-border bg-light">
          <h6 class="fw-bold mb-2">Session 1 (Morning)</h6>
        </div>
        <div class="p-3 border-bottom dashed-border bg-light">
          <h6 class="fw-bold mb-2">Session 2 (Afternoon)</h6>
        </div>
        <div class="p-3 bg-light">
          <h6 class="fw-bold mb-2">Session 3 (Night)</h6>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col-12 col-lg-4">
    <div class="card h-100 bg-light overflow-hidden">
      <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-1">Day 3</h5>
      </div>
      <div class="p-3 border-bottom dashed-border bg-light">
        <div class="fw-bold text-primary mb-0">
          <h5 class="card-title mb-0"><i class="bi bi-calendar3" aria-hidden="true"></i> Monday 23rd March 2026</h5>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="p-3 border-bottom dashed-border bg-light">
          <h6 class="fw-bold mb-2">Session 1 (Morning)</h6>
        </div>
        <div class="p-3 border-bottom dashed-border bg-light">
          <h6 class="fw-bold mb-2">Session 2 (Afternoon)</h6>
        </div>
        <div class="p-3 bg-light">
          <h6 class="fw-bold mb-2">Session 3 (Night)</h6>
        </div>
      </div>
    </div>
  </div>
</div>

<p class="mb-4">Topics will be curated as we go, keep posted.</p>

{% include "partials/updatesForm.njk" %}
