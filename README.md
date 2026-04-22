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

Articles are `.md` files but support a set of custom JSX components via `next-mdx-remote`. Use components inline alongside regular markdown. All props must be plain strings — do not pass JavaScript expressions like `{0}` or `{["a","b"]}` as prop values.

> **Important:** All props must be plain strings (`prop="value"`). JavaScript expressions in props (`prop={value}`) will cause a runtime error.

---

### `<Callout type="...">`

A highlighted aside box that pulls content out of the main prose flow. Use for editorial asides, important caveats, or striking statements that deserve emphasis but aren't quite a pull-quote.

**When to use:** A key argument, warning, or insight that stands alone — not a definition, not a question, not a heading.

**Prop:** `type` — one of `info` (orange), `warning` (yellow), `tip` (green), `note` (stone/grey).

```mdx
<Callout type="info">
  **"Treachery is the easiest ascending path of a Scoundrel"** — the market is large
  and the enemies purchase such scoundrels with glee.
</Callout>

<Callout type="warning">
  Direct and open approval of vote to their policies is most certainly
  detrimental in the current form.
</Callout>
```

---

### `<Pullquote>`

A large italic serif pull-quote with an orange left border. Renders as a visually dominant statement that breaks the reading flow intentionally.

**When to use:** The single most quotable sentence from a section — the line you'd share on social media. Use at most once per major section. Do not use for definitions or questions.

```mdx
<Pullquote>
  The 'vote' is really the 'vote of approval' — and we certainly shouldn't approve
  a Hindu/Indian hater on the grounds of just being 'Hindu/Indian'.
</Pullquote>
```

---

### `<Divider />`

A decorative `✦` section break with flanking lines. Self-closing, no props.

**When to use:** Between major named sections of an article to give the reader a visual pause. Replaces the raw `— —` text separators the articles originally used.

```mdx
<Divider />
```

---

### `<SectionHeading>`

An orange accent-bar + serif heading for named sections within an article body. Renders more prominently than bold inline text.

**When to use:** When an article has named sections that were written as `**A) Section Name:**` bold inline text. Do not use for the article's main title (that comes from frontmatter) or for minor in-paragraph labels.

```mdx
<SectionHeading>A) Common Vision</SectionHeading>

<SectionHeading>1) Moral Dilemma versus Ethical Dilemma</SectionHeading>
```

---

### `<Definition term="...">`

A styled term-definition row — term in orange on the left, explanation text on the right, with a subtle left border.

**When to use:** When introducing and explaining a specific word or concept, especially when several definitions appear in sequence (e.g. Moral / Ethical / Moral Dilemma / Ethical Dilemma). Do not use for general paragraphs.

**Prop:** `term` — the word or phrase being defined (plain string, no markdown).

```mdx
<Definition term="Moral dilemma">
  A choice presented between 'right and wrong' — where the 'wrong' has a personal
  benefit and the 'right' has a feared punishment.
</Definition>

<Definition term="Ethical dilemma">
  A choice presented between 'wrong and wrong' — where one has to choose the lesser evil.
</Definition>

<Definition term="Tactical Thinking">
  Meeting immediate, often single-point and clear objectives — such as 'Kill the enemy'.
</Definition>
```

---

### `<Question>`

An orange `?` marker with bold question text. Visually separates a question from surrounding prose.

**When to use:** Questions posed directly to the reader as part of the argument — rhetorical challenges, discussion prompts, or diagnostic tests the author asks the reader to apply. Not for general paragraph questions embedded in prose.

```mdx
<Question>Are you Politically an 'Independent' to begin with?</Question>

<Question>Is there malice in their conduct and intent for supporting a specific party?</Question>

<Question>What Challenge to society do you think should be addressed on a higher priority?</Question>
```

---

### `<EpicCompare ramayana="..." mahabharata="...">`

A two-column amber/orange card layout comparing Ramayana and Mahabharata guidance side by side on the same dimension. Both columns render with their epic name as a label.

**When to use:** Only in the Mahabharata & Ramayana article (or future articles) where both epics are being contrasted on the exact same axis (e.g. both addressing "Moral vs Ethical Dilemma"). Do not use for general two-column comparisons.

**Props:** `ramayana` and `mahabharata` — full explanatory text for each epic as plain strings.

```mdx
<EpicCompare
  ramayana="Guides people when faced with a Moral Dilemma — the choice between right and wrong.
    Shri Rama chose the difficult righteous path relentlessly and with patience."
  mahabharata="Guides people when faced with an Ethical Dilemma — the choice between wrong and wrong.
    Arjuna's dilemma before Kurukshetra was resolved through the Bhagavad Gita."
/>
```

---

### `<BinaryList>` + `<BinaryItem left="..." right="...">`

A two-column striped table for listing opposed pairs side by side — amber on the left, orange on the right. `<BinaryItem>` rows are nested inside `<BinaryList>`.

**When to use:** When the article lists ideological or conceptual binary pairs (e.g. the Abrahamic binary systems). Do not use for generic bullet lists or unrelated pairs.

**Props on `<BinaryItem>`:** `left` and `right` — the two sides of the pair (plain strings).

```mdx
<BinaryList>
  <BinaryItem left="Faithful/Momin" right="Heathen/Kafir" />
  <BinaryItem left="Capitalism" right="Communism" />
  <BinaryItem left="Right Wing" right="Left Wing" />
  <BinaryItem left="Republican" right="Democrat" />
  <BinaryItem left="With me" right="Against me" />
</BinaryList>
```

---

### `<ForceCard label="...">`

A labelled neutral card for describing a named force, faction, or group. All cards render in the same stone/grey tone — no colour differentiation — so no visual bias is introduced between entities.

**When to use:** When the article identifies 2–3 clearly named entities (forces, factions, groups) and devotes a paragraph to each. Use one `<ForceCard>` per entity.

**Prop:** `label` — the card's heading (plain string).

```mdx
<ForceCard label="Force 1 — Right Wing Christianity (Republican Side)">
  The 'Right Wing' Christianity with its army of Missionaries and Money is a threat
  to our culture and civilization...
</ForceCard>

<ForceCard label="Force 2 — Left Wing Socialists (Democratic Side)">
  The Left Wing Socialists have an obvious upper-hand, with generous support from
  their powerful Communist 'Mother Ship' China...
</ForceCard>

<ForceCard label="Force 3 — The Independents (Our Natural Allies)">
  The 'Independents' of America are slowly growing to be a force by themselves.
  These people are truly our friends...
</ForceCard>
```

---

### `<SourceNote href="..." label="..." date="...">`

A footer-style publication credit with a styled external link, a bullet separator, and a date. Sits below the closing line of the article.

**When to use:** Only when the article was originally published on an external platform and a canonical source URL exists. Place it as the very last element in the file.

**Props:**
- `href` — the full URL of the original publication
- `label` — the publication name shown as link text (plain string)
- `date` — the original publication date as a readable string (e.g. `"20th Oct 2020"`)

```mdx
<SourceNote
  href="https://www.newsbharati.com/Encyc/2020/10/20/Indian-origin-.html"
  label="NewsBharati"
  date="20th Oct 2020"
/>
```

---

## Claude Code Skills

This project includes a Claude Code skill that automates article formatting. Skills require the **Claude Code CLI or IDE extension** — they do not work on claude.ai or the API.

> **Prerequisite:** Clone this repo. The `.claude/` folder is committed, so skills are available automatically to anyone using Claude Code in this directory.

---

### `/format-article` — Auto-format an article

Reads a `.md` article, analyzes its structure, applies the correct MDX components, and fixes the hero image path — all in one step.

**Usage — with a file path:**
```
/format-article content/articles/PoliticsIsNotSkinDeep-01.md
```

**Usage — with the file open in the IDE:**

Open the article in VS Code or your IDE, then run the skill with no argument. It picks up the open file automatically:
```
/format-article
```

**What it does:**

1. **Reads** the full article and its current component usage
2. **Audits the hero image** — checks the `heroImage` frontmatter path resolves to a real file in `public/content/articles/`, prefers `.webp` over `.png`, and corrects the path if wrong
3. **Analyzes structure** — scans every paragraph for the 10 content patterns the components are designed for (section headings, definitions, questions, binary lists, force cards, Ramayana/Mahabharata comparisons, callouts, pull-quotes, dividers, source credits)
4. **Applies components** — rewrites the file with the right components in the right places, preserving all `<br />` tags and the author's original prose exactly
5. **Reports** — tells you what was changed, what was left as prose and why, and anything that needs manual attention

**What it will NOT do:**

- Rewrite or summarise the author's text
- Remove intentional `<br />` spacing tags
- Apply a component just because the content vaguely fits — only applies where the pattern clearly matches
- Fabricate a hero image path if the file doesn't exist on disk

**Example output after running:**

```
Applied components:
- <SectionHeading> × 3  (A) Common Vision, B) Challenges, C) American Politics)
- <BinaryList>/<BinaryItem> × 1  (the 7 binary opposition pairs)
- <Question> × 3  (the three reader-directed questions)
- <Divider /> × 3  (replaced — — separators)
- <Pullquote> × 1  (most quotable line in section A)

Hero image: /content/articles/HindusInPolitics-TheFrameworkAndPrinciples-02.webp ✓ correct

Left as prose: the numbered list in "Ground Realities" — inline numbered points,
not a sequence of named definitions, so no <Definition> applied.
```

---

### Availability

| Environment | Works? |
|---|---|
| Claude Code CLI (`claude` command) | ✅ Yes — `/format-article` |
| Claude Code VS Code extension | ✅ Yes — `/format-article` |
| Claude Code JetBrains extension | ✅ Yes — `/format-article` |
| claude.ai web (Projects / chat) | ✗ No — skills are CLI/IDE only |
| Claude API | ✗ Not directly — would need the Agent SDK |

Skills are shared automatically via git — anyone who clones this repo and opens it in Claude Code has access to `/format-article` with no setup.

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
