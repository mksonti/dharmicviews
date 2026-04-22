---
name: format-article
description: Use this skill when the user asks to "format article", "apply components to article", "enrich article", "format markdown", or provides a path to a file in content/articles/. Reads the article, analyzes its structure, and rewrites it with the correct MDX components in place.
disable-model-invocation: true
allowed-tools: Read, Write, Glob, Bash
---

# Article Formatter

Format the article at: $ARGUMENTS

If no path is provided, check the currently open file from the IDE context (look for `ide_opened_file` in the conversation). If still unclear, ask the user which article to format.

## Step 1 — Read the article

Read the full content of the target `.md` file. Also read [references/components.md](references/components.md) and [references/heroimage.md](references/heroimage.md) before making any changes.

## Step 2 — Audit the hero image

Follow the rules in [references/heroimage.md](references/heroimage.md):

- Check the `heroImage` frontmatter field.
- Verify the file actually exists at the path it references.
- The correct pattern is `/content/articles/<ArticleFilename>.webp` — the base name must match the `.md` filename exactly (no suffix changes).
- If the file does not exist on disk, note it clearly but do not fabricate a path.
- If the path is wrong (typo, extension mismatch, wrong folder), fix it in the frontmatter.

## Step 3 — Analyze the content structure

Read every paragraph and identify which of the following structural patterns exist in the article. Do NOT apply a component just because the pattern vaguely fits — only apply it when the content clearly matches the definition in [references/components.md](references/components.md).

Patterns to look for:

1. **Named section titles** written as bold inline text — e.g. `**A) Common Vision:**`, `**Hindu Investment:**`, `**1) Moral Dilemma versus...**`
2. **Term-definition blocks** — a bold term followed by a dash and explanation, repeated for several terms in sequence
3. **Reader-directed questions** — bold `**Question:**` or `**1. Question:**` prompts posed directly to the reader
4. **Binary opposition lists** — multiple `Left — Right` or `Term A / Term B` pairs listed line by line with `<br />`
5. **Named force/faction paragraphs** — 2–3 clearly labelled entities each described in their own paragraph
6. **Ramayana vs Mahabharata comparisons** — the two epics being contrasted on the same dimension back to back
7. **Standalone callout-worthy statements** — single striking insights that stand apart from prose flow
8. **The most quotable sentence in a section** — one line that would stand alone as a pull-quote
9. **Section breaks** — raw `— —` or `---` text used as separators between major sections
10. **Published source credit** — a raw URL + date at the bottom referencing original publication

## Step 4 — Apply components

Rewrite the article applying the components as described in [references/components.md](references/components.md). Follow these rules strictly:

- **Preserve all `<br />` tags** — they are intentional and must not be removed.
- **Preserve all existing prose** — do not rewrite, summarise, or omit any of the author's text.
- **All props must be plain strings** — never use `{expression}` syntax in props.
- **Do not over-component** — if content is just prose, leave it as prose. Components only go where the pattern genuinely matches.
- **One `<Pullquote>` per major section** at most — pick the single strongest quotable sentence.
- **`<Divider />`** replaces `— —` or `---` separators between major sections only.
- **`<ForceCard>`** — all cards must use the same neutral styling (no `color` prop).
- **`<BinaryList>`/`<BinaryItem>`** — use child syntax only, never array props.
- **`<EpicCompare>`** — only when Ramayana and Mahabharata are contrasted on the exact same dimension.
- **`<SourceNote>`** — only if a published URL exists at the bottom; place it as the last element.

## Step 5 — Write the file

Write the complete reformatted article back to the same file path. Do not change the frontmatter except to correct the `heroImage` path if needed.

## Step 6 — Report

Tell the user:
- Which components were applied and where
- Whether the hero image was correct or corrected
- Any patterns found but intentionally left as prose (and why)
- Anything that needs manual attention (e.g. missing hero image file on disk)
