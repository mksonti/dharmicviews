# Dharmic Views

A curated resource site for Vedic wisdom, Hindu identity, and Dharmic culture — featuring articles, videos, and organized links for the Hindu diaspora. Built with Next.js 15 and deployed as a static site.

## Tech Stack

- **Framework:** Next.js 15 (App Router, static export)
- **Content:** Markdown with YAML frontmatter (articles), JSON (videos)
- **Styling:** Tailwind CSS 4 + `@tailwindcss/typography`
- **MDX rendering:** `next-mdx-remote` with `remark-gfm`
- **Deployment:** Firebase Hosting (static export)

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. Start the dev server:
   ```
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Build

```
npm run build
```

The `prebuild` step automatically validates all article frontmatter before compiling. The build will fail if any required fields are missing or malformed.

## Content

### Articles

Articles live in `content/articles/` as `.md` files with YAML frontmatter.

**Required fields:**
```yaml
---
title: "Your Article Title"
date: "YYYY-MM-DD"
description: "One or two sentence summary (keep under 155 characters for SEO)."
author: "Author Name"
---
```

**Optional fields:**
```yaml
heroImage: "/content/articles/your-image.webp"  # or a full URL
featured: true   # show this article in the homepage featured section
draft: true      # hide from all listings, sitemap, and static generation
```

**Featured articles:** Mark up to 3 articles with `featured: true` to pin them to the homepage. If fewer than 3 are marked, the remaining slots are filled by the most recent non-featured articles.

**Draft articles:** Add `draft: true` to hide an article everywhere — it will not appear in the articles list, the homepage, the sitemap, or generate a static page at build time. Useful for work-in-progress or template files.

### Videos

Videos live in `content/videos.json` as an array of objects.

**Required fields:**
```json
{
  "videoId": "YouTube video ID",
  "url": "https://www.youtube.com/watch?v=...",
  "title": "Video Title",
  "description": "Description text",
  "duration": "PT1H23M45S",
  "thumbnail": "https://...",
  "publishDate": "2024-01-15T00:00:00Z",
  "publisher": "Publisher Name",
  "channelName": "Channel Name",
  "channelId": "channel-slug",
  "tags": ["Tag1", "Tag2"]
}
```

**Optional fields:**
```json
{
  "featured": true
}
```

**Featured videos:** Same logic as articles — mark up to 3 videos with `"featured": true` to pin them to the homepage featured section.

## SEO

Each article and video page generates:
- Dynamic `title`, `description`, OpenGraph, and Twitter Card metadata
- `NewsArticle` / `VideoObject` JSON-LD structured data
- `BreadcrumbList` JSON-LD (e.g. Home › Articles › Article Title)

The site also generates a `sitemap.xml`, `robots.txt`, and an RSS feed at `/feed.xml` automatically from the content files.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Validate content then build static site |
| `npm run lint` | Run ESLint |
| `npm run clean` | Clean Next.js build cache |
