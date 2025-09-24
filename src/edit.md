---
layout: base.njk
title: Edit Electron Workshop
description: An outline on how to contribute to the Electron Workshop Website
permalink: "/edit/"
---

# How to contribute to the Electron Workshop Website

The Electron Workshop website is built with **[Eleventy](https://www.11ty.dev/)**, a fast and flexible static site generator.  
It is deployed on **[Netlify](https://www.netlify.com/)**, which handles builds, previews, and hosting.  
For layout and styling we use **[Bootstrap](https://getbootstrap.com/)**, providing responsive design, grid layouts, and common UI components.  

Together, this stack keeps the site lightweight, easy to maintain, and friendly for contributors of all levels.

<br>

## GitHub & Contributions

The Electron Workshop website is managed through our repository <https://github.com/electron-workshop/ew-website>.  
All changes—whether fixing a typo, updating events, or adding new pages, are made through **pull requests (PRs)**.

A pull request is a way to propose edits: you make changes on your own branch, then open a PR so others can review, test, and merge them into the site. Each PR automatically creates a **Netlify Deploy Preview**, which lets everyone see your edits live before they go public. Clear titles, short commit messages, and screenshots (if relevant) make reviews much easier.

<br>

### Editing Content

The majority of pages are designed to make content easy to edit by storing it in _data while the design remains in the HTML and CSS page.

#### Simple Editing:

1. Go to  /src/_data
2. Find the file that contains the information you want to add to, edit and/or remove
3. After making the changes, follow git procedure to have your PR approved and merged

#### Advanced Editing:

This section dives deeper into where everything is stored and what data to include, or leave out, and the effect it will have on how the data is displayed on the website.

##### Navbar (Navigation Bar) and Footer
/src/_data/navbar.json



##### Home Page
/src/_data/homeCards.json