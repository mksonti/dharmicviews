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

## Article MDX Components

Articles support a set of custom components that can be used directly inside `.md` files alongside regular markdown. Each component targets a specific content pattern — use them only where the content genuinely fits.

---

### `<Callout type="info">`

A highlighted aside box. Use for important caveats, editorial notes, or key insights that sit outside the main flow of prose. Supported types: `info` (orange), `warning` (yellow), `tip` (green), `note` (stone).

```mdx
<Callout type="info">
  **"Treachery is the easiest ascending path of a Scoundrel"** — the market is large
  and the enemies purchase such scoundrels with glee.
</Callout>
```

---

### `<Pullquote>`

A large italic serif pull-quote with an orange left border. Use for the single most quotable sentence or argument in a section — one per major section at most.

```mdx
<Pullquote>
  The 'vote' is really the 'vote of approval' — and we certainly shouldn't approve
  a Hindu/Indian hater on the grounds of just being 'Hindu/Indian'.
</Pullquote>
```

---

### `<Divider />`

A decorative `✦` section break. Use between major sections to give the reader a visual pause — replaces the raw `— —` or `---` separators.

```mdx
<Divider />
```

---

### `<SectionHeading>`

An orange-accented serif heading for named sections within an article. Use when the article has clearly titled sections that are written as bold inline text (e.g. `**A) Common Vision:**`). Renders more prominently than a bold paragraph.

```mdx
<SectionHeading>A) Common Vision</SectionHeading>
```

---

### `<Definition term="...">`

A styled term-definition row with the term in orange and a subtle left border. Use for vocabulary blocks where a word is introduced and explained — especially when several definitions appear in sequence.

```mdx
<Definition term="Moral dilemma">
  A choice between 'right and wrong' — where the 'wrong' has a personal benefit
  and the 'right' has a feared punishment.
</Definition>

<Definition term="Ethical dilemma">
  A choice between 'wrong and wrong' — where one has to choose the lesser evil.
</Definition>
```

---

### `<Question>`

An orange `?` marker with bold question text. Use for questions posed directly to the reader — especially numbered discussion questions or rhetorical challenges that punctuate an argument.

```mdx
<Question>Are you Politically an 'Independent' to begin with?</Question>
```

---

### `<EpicCompare ramayana="..." mahabharata="...">`

A two-column amber/orange card layout for comparing Ramayana and Mahabharata guidance side by side. Use only in contexts where both epics are being contrasted on the same dimension. Pass the full explanation for each epic as a prop string.

```mdx
<EpicCompare
  ramayana="Guides people when faced with a Moral Dilemma — the choice between right
    and wrong. Shri Rama chose the difficult righteous path relentlessly and with patience."
  mahabharata="Guides people when faced with an Ethical Dilemma — the choice between
    wrong and wrong. Arjuna's dilemma before Kurukshetra, resolved through the Bhagavad Gita."
/>
```

---

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
