# Content How-To Guide

This guide is for adding and editing content on the site: **Articles**, **Videos**, and **Video Write-ups**. No coding knowledge required — just editing text files in a specific format.

Every piece of content lives in the `content/` folder. After you save your changes, the site rebuilds automatically and picks them up.

---

## 1. Categories

Every article (and video write-up) must have a `category`. There are exactly three:

| Category | Use for |
|---|---|
| `Ādhyatmik` | Spiritual/philosophical content — scripture, dharma concepts, calendars, Puranas, Itihasas, practices |
| `Cultural` | Community, politics, identity, current affairs, diaspora life |
| `Videos` | Write-ups that accompany a YouTube video |

The category shows as a badge on the article card and lets visitors filter the Articles page by it.

---

## 2. Adding a new Article

**Location:** `content/articles/`

1. Create a new file, e.g. `content/articles/MyNewArticle.md`.
2. Add frontmatter (the `---` block at the top) followed by your content in Markdown:

```markdown
---
title: "Your Article Title"
description: "A one- or two-sentence summary shown on the article card and in search results."
date: "2026-07-26"
author: "Your Name"
heroImage: "/content/articles/MyNewArticle.webp"
category: "Ādhyatmik"
---

Your article content goes here, written in normal Markdown.

## A section heading

More text...
```

### Frontmatter fields

| Field | Required? | Notes |
|---|---|---|
| `title` | Yes | Plain text, no Markdown |
| `description` | Yes | 1–2 sentences; used for previews and SEO |
| `date` | Yes | Must be `YYYY-MM-DD` format |
| `author` | Yes | Plain text |
| `heroImage` | No | Either a full URL (`https://...`) or a local path starting with `/` (e.g. an image placed in `public/content/articles/`) |
| `category` | Yes | One of `Ādhyatmik`, `Cultural`, `Videos` |
| `featured` | No | `true` to feature it on the homepage |
| `draft` | No | `true` to hide it from the live site until it's ready |

**Important:** the site validates this frontmatter before every build. If a required field is missing or `date` isn't in `YYYY-MM-DD` format, the build will fail with an error telling you exactly which file and field is wrong.

### Writing the body

The body is standard Markdown (`#`/`##` headings, **bold**, *italic*, links, lists, etc.) plus some special components you can drop in for richer formatting:

| Component | Purpose | Example |
|---|---|---|
| `<SectionHeading>Text</SectionHeading>` | A styled section heading (use instead of `##` for a fancier look) | `<SectionHeading>Core Concepts</SectionHeading>` |
| `<Pullquote>Text</Pullquote>` | A large styled quote pulled out of the text | `<Pullquote>We're not a Divided Community</Pullquote>` |
| `<Callout type="tip">Text</Callout>` | A highlighted box; `type` can be `info`, `warning`, `tip`, or `note` | `<Callout type="tip">Remember this...</Callout>` |
| `<Divider />` | A decorative section break (✦) | `<Divider />` |
| `<Definition term="Word">Explanation</Definition>` | Inline glossary-style definition | `<Definition term="Dharma">Righteous living...</Definition>` |
| `<Question>Text</Question>` | A highlighted rhetorical/discussion question | `<Question>What does this mean for us?</Question>` |
| `<EpicCompare ramayana="..." mahabharata="..." />` | Side-by-side comparison box for the two epics | — |
| `<ForceCard label="Label">Text</ForceCard>` | A labeled callout card | `<ForceCard label="Force 1">...</ForceCard>` |
| `<SourceNote href="url" label="Site Name" date="2020-01-01" />` | "Originally published on..." footer note | — |
| `<LangTag lang="R" />` | Small colored language tag: R (red), L (amber), G (green), N (violet), O (blue) | — |
| `<BinaryList>` / `<BinaryItem left="A" right="B" />` | Two-column comparison list | See existing articles for examples |

You can mix these freely with plain Markdown. When in doubt, open an existing file in `content/articles/` and copy the pattern.

### Hero images

Place the image file under `public/content/articles/` and reference it as `/content/articles/YourImage.webp` in `heroImage`. Or use any external image URL directly.

---

## 3. Adding a new raw Video

**Location:** `content/videos.json`

This is a single JSON file — a list of video entries. To add a video, add a new object to the array:

```json
{
  "videoId": "dQw4w9WgXcQ",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "title": "Video Title Here",
  "description": "A description of the video.",
  "duration": "PT15M30S",
  "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  "publishDate": "2026-07-26T00:00:00-07:00",
  "publisher": "Publisher Name",
  "channelName": "Channel Name",
  "channelId": "somechannelid",
  "tags": ["Philosophy", "History"],
  "featured": false
}
```

Notes:
- `videoId` is the part after `v=` in the YouTube URL. It must be unique and is used as the page slug (`/videos/dQw4w9WgXcQ`).
- `duration` uses ISO 8601 format: `PT{hours}H{minutes}M{seconds}S` (e.g. 1h 5m = `PT1H5M`).
- `channelId` should match an entry in `content/channels.json` (see below) so the channel name/avatar show up correctly. If it's a new channel, add it there too.
- Don't forget the trailing comma if you're adding an entry in the middle of the list — the file must remain valid JSON.
- A local thumbnail can be dropped into `public/thumbnails/<videoId>.jpg` (or `.png`/`.webp`) to override the YouTube-hosted one.

### Adding a new channel

**Location:** `content/channels.json`

```json
{
  "channelId": "somechannelid",
  "channelName": "Channel Name",
  "avatar": "https://url-to-avatar-image.jpg"
}
```

---

## 4. Adding a Video Write-up

A "video write-up" is an optional article-style commentary that accompanies a video and appears on that video's page (and in the Articles list, tagged `Videos`).

**Location:** `content/video_articles/`

1. Create a file named exactly after the video's ID: `content/video_articles/<videoId>.md` (the video must already exist in `content/videos.json`).
2. Frontmatter + body, same Markdown/components as articles above:

```markdown
---
title: "Write-up Title"
description: "Summary of the write-up."
date: "2026-07-26"
author: "Your Name"
videoId: "dQw4w9WgXcQ"
category: "Videos"
---

Your commentary/write-up content in Markdown here.
```

Video write-ups always use `category: "Videos"`.

---

## 5. Quick checklist before publishing

- [ ] `category` is set and is exactly one of `Ādhyatmik`, `Cultural`, `Videos`
- [ ] `date` is `YYYY-MM-DD`
- [ ] `title`, `description`, `author` are filled in
- [ ] Hero image path/URL loads correctly
- [ ] If not ready to publish yet, set `draft: true` (articles only) instead of deleting the file
- [ ] For videos, `videoId` is correct and unique, and `channelId` matches `content/channels.json`

If the build fails after adding content, the error message will name the exact file and field that needs fixing — check `npm run build` output.
