# Component Decision Rules

All components are used inside `.md` files rendered via `next-mdx-remote`. All props must be plain strings — no JavaScript expressions.

---

## `<Divider />`

**Apply when:** Raw `— —`, `— — —`, or `---` text is used as a visual break between major sections.

**Do not apply:** Inside paragraphs, between every paragraph, or where `<br />` is used for spacing within a section.

**Syntax:**
```
<Divider />
```

---

## `<SectionHeading>`

**Apply when:** A section has a title written as bold inline text — e.g. `**A) Common Vision:**`, `**Hindu Survival:**`, `**1) Moral Dilemma versus Ethical Dilemma**`. These look like headings but are formatted as bold paragraphs.

**Do not apply:** For minor labels inside prose, for `**Ramayana:**` or `**Mahabharata:**` inline labels (those belong in `<EpicCompare>`), or for the article's main title (that stays in frontmatter).

**Syntax:**
```
<SectionHeading>A) Common Vision</SectionHeading>
```
Strip trailing colons from the heading text.

---

## `<Definition term="...">`

**Apply when:** A bold term is followed by a dash and an explanation, and this pattern appears for 2 or more terms in sequence. Examples: `**Moral** — Derived from...`, `**Tactical Thinking** — Meeting immediate...`

**Do not apply:** For a single isolated bold term in prose. Only use when there is a clear vocabulary-building sequence.

**Syntax:**
```
<Definition term="Moral dilemma">A choice between right and wrong — where the wrong has personal benefit.</Definition>
```
The `term` prop is the word/phrase only — no markdown, no colon.

---

## `<Question>`

**Apply when:** A bold question is posed directly to the reader as a discussion prompt or diagnostic — formatted as `**1. Question: Is there malice...?**` or `**Question: Are you politically...?**`

**Do not apply:** For rhetorical questions embedded naturally in flowing prose paragraphs. Only apply when the question is deliberately set apart as a challenge or prompt.

**Syntax:**
```
<Question>Are you Politically an 'Independent' to begin with?</Question>
```
Strip the `Question:` or `1. Question:` prefix — just the question text goes inside.

---

## `<Callout type="...">`

**Apply when:** A single striking insight, warning, or editorial aside needs to stand out from the prose flow. The content should be a complete thought that works on its own outside of the surrounding text.

**Do not apply:** For general summaries, transition sentences, or content that naturally belongs in the prose.

**Types:** `info` (orange), `warning` (yellow), `tip` (green), `note` (stone/grey).

**Syntax:**
```
<Callout type="info">
  **"Treachery is the easiest ascending path of a Scoundrel"** — the market is large.
</Callout>
```

---

## `<Pullquote>`

**Apply when:** There is one sentence in a section that is the most quotable — the line that crystallises the argument. Use at most once per major section.

**Do not apply:** More than once per section. Do not apply to definitions, questions, or callouts.

**Syntax:**
```
<Pullquote>The 'vote' is really the 'vote of approval'.</Pullquote>
```

---

## `<BinaryList>` + `<BinaryItem left="..." right="...">`

**Apply when:** The article lists ideological or conceptual opposition pairs line by line using `<br />` — e.g. `Faithful/Momin — Heathen/Kafir<br />`, `Theist — Atheist<br />`, etc. Must be at least 3 pairs to warrant a `<BinaryList>`.

**Do not apply:** For a single opposition, for general bullet lists, or for `Ramayana vs Mahabharata` (use `<EpicCompare>` instead).

**Syntax — use child components, never array props:**
```
<BinaryList>
  <BinaryItem left="Faithful/Momin" right="Heathen/Kafir" />
  <BinaryItem left="Theist" right="Atheist" />
  <BinaryItem left="Capitalism" right="Communism" />
</BinaryList>
```

---

## `<ForceCard label="...">`

**Apply when:** The article explicitly identifies 2–3 named forces, factions, or groups and devotes a separate paragraph to each — structured as "The first is X... The second is Y... The third is Z..."

**Do not apply:** When entities are discussed inline in the same paragraph, or when there are more than 3. No `color` prop — all cards are neutral stone to avoid political colour bias.

**Syntax:**
```
<ForceCard label="Force 1 — Right Wing Christianity (Republican Side)">
  Description of this force...
</ForceCard>
```

---

## `<EpicCompare ramayana="..." mahabharata="...">`

**Apply when:** Ramayana and Mahabharata are being contrasted on the exact same dimension — same question, opposite answers. The two paragraphs starting with `**Ramayana:**` and `**Mahabharata:**` in sequence.

**Do not apply:** When only one epic is mentioned, or when the contrast is not on the same axis.

**Syntax — both props are plain strings, no markdown inside:**
```
<EpicCompare
  ramayana="Guides people when faced with a Moral Dilemma..."
  mahabharata="Guides people when faced with an Ethical Dilemma..."
/>
```

---

## `<SourceNote href="..." label="..." date="...">`

**Apply when:** The article ends with a raw publication URL and date — e.g. `Published: https://... Date: 20th Oct 2020`.

**Placement:** Must be the very last element in the file, after the closing line.

**Syntax:**
```
<SourceNote
  href="https://www.newsbharati.com/..."
  label="NewsBharati"
  date="20th Oct 2020"
/>
```

---

## Props safety rule

**Never use JavaScript expressions as prop values.** These will cause a runtime error in `next-mdx-remote`:

```
✗ <ForceCard color={0}>          — numeric expression
✗ <BinaryList pairs={["a","b"]}> — array expression
✓ <ForceCard label="Force 1">    — plain string
✓ <BinaryItem left="A" right="B" /> — plain strings
```
