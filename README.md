# Bristol Formula Student AI Website

[![Deploy](https://img.shields.io/github/deployments/Formula-Student-AI/website/Production?label=vercel&logo=vercel&style=for-the-badge)](https://bristol-fsai-website.vercel.app)

<p align="center">
  <img src="/public/favicon.png" width="50%" />
</p>

This is the official website for the Bristol Formula Student AI (FSAI) team, built with **Next.js**, **TypeScript**, and **TailwindCSS**. The site showcases our team, projects, events, and blog posts.

## Project Structure

* **`_posts/`** → Blog/news posts (Markdown).
* **`_events/`** → Upcoming & past events.
* **`_sponsors/`** → Sponsor cards, logos and optional sponsorship tiers.
* **`_teams/`** → Academic year team rosters and roles.
* **`_subteams/`** → Sub-team descriptions (e.g. Perception, Planning).
* **`lib/`** → API helpers for loading content (posts, events, teams, subteams).
* **`interfaces/`** → TypeScript interfaces for strongly-typed content.
* **`app/`** → Next.js App Router pages and components.
* **`public/`** → Static assets like images, sponsor logos, and icons.

## Editing sponsor cards

Add or edit a `.md` file in `_sponsors/`. Put the sponsor details in the
front matter and write the card description below it using Markdown:

```markdown
---
name: "Sponsor name"
logo: "/sponsors/sponsor-logo.png"
tier: "Gold"
website_link: "https://example.com/"
spotlight_text: "A short description of how they support us"
spotlight_visible: true
---

About the sponsor.

How they support Bristol FSAI.
```

Store logo images in `public/sponsors/`. The tier can be `Gold`, `Silver` or
`Bronze`; omit it to show no tag. Cards are sorted in that order, followed by
sponsors without a tier. Sponsors within the same tier are sorted by name.
`website_link` adds a website link to the sponsor card on the sponsors page.
Homepage spotlight cards link to the sponsors page. `spotlight_text` supplies the short homepage description.
Set `spotlight_visible` to `true` to show a sponsor in the spotlight, or `false`
to hide them (omitting it also hides them). These files control the sponsor
cards and homepage spotlight; the homepage scrolling logo strip is configured separately.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Build for production: `npm run build`
