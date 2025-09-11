# Bristol Formula Student AI Website

[![Deploy](https://img.shields.io/github/deployments/Formula-Student-AI/website/Production?label=vercel&logo=vercel&style=for-the-badge)](https://bristol-fsai-website.vercel.app)

<p align="center">
  <img src="/public/favicon.png" width="50%" />
</p>

This is the official website for the Bristol Formula Student AI (FSAI) team, built with **Next.js**, **TypeScript**, and **TailwindCSS**. The site showcases our team, projects, events, and blog posts.

## Project Structure

* **`_posts/`** → Blog/news posts (Markdown).
* **`_events/`** → Upcoming & past events.
* **`_teams/`** → Academic year team rosters and roles.
* **`_subteams/`** → Sub-team descriptions (e.g. Perception, Planning).
* **`lib/`** → API helpers for loading content (posts, events, teams, subteams).
* **`interfaces/`** → TypeScript interfaces for strongly-typed content.
* **`app/`** → Next.js App Router pages and components.
* **`public/`** → Static assets like images, sponsor logos, and icons.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Build for production: `npm run build`
