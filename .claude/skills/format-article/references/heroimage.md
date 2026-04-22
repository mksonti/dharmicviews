# Hero Image Rules

## Where images live on disk

All hero images are stored in:
```
public/content/articles/
```

The files available follow this naming pattern:
```
<ArticleFilename>.webp    ← preferred format
<ArticleFilename>.png     ← fallback if .webp does not exist
```

Example — for article file `PoliticsIsNotSkinDeep-01.md`:
```
public/content/articles/PoliticsIsNotSkinDeep-01.webp   ✓ exists
public/content/articles/PoliticsIsNotSkinDeep-01.png    ✓ exists
```

## What the frontmatter should reference

The `heroImage` field must be a **URL path** (not a filesystem path), rooted at `/`:
```yaml
heroImage: "/content/articles/PoliticsIsNotSkinDeep-01.webp"
```

Next.js serves `public/` as `/`, so `/content/articles/X.webp` resolves to `public/content/articles/X.webp`.

## Validation steps

1. Read the `heroImage` value from frontmatter.
2. Strip the leading `/` and prepend `public/` to get the filesystem path.
   - e.g. `/content/articles/Foo.webp` → `public/content/articles/Foo.webp`
3. Check whether that file exists using Bash or Glob.
4. Apply corrections:

| Situation | Action |
|---|---|
| Path is correct and file exists | No change needed |
| Extension is `.png` but `.webp` exists | Update to `.webp` |
| Extension is `.webp` but only `.png` exists | Update to `.png` |
| Base name doesn't match the `.md` filename | Fix the base name to match |
| File does not exist at all | Report to user — do not fabricate a path |
| `heroImage` field is missing | Report to user — suggest the expected path based on the filename |

## Naming convention

The base name of the image **must exactly match** the base name of the `.md` file:

| Article file | Correct heroImage |
|---|---|
| `PoliticsIsNotSkinDeep-01.md` | `/content/articles/PoliticsIsNotSkinDeep-01.webp` |
| `HindusInPolitics-TheFrameworkAndPrinciples-02.md` | `/content/articles/HindusInPolitics-TheFrameworkAndPrinciples-02.webp` |
| `HindusInPolitics-BattleOfWillAndSurvival-03.md` | `/content/articles/HindusInPolitics-BattleOfWillAndSurvival-03.webp` |
| `FutureOfHindusInAmerica-04.md` | `/content/articles/FutureOfHindusInAmerica-04.webp` |
| `PracticalApplication-MahabharataAndRamayana-05.md` | `/content/articles/PracticalApplication-MahabharataAndRamayana-05.webp` |

## Preferred format

Always prefer `.webp` over `.png` when both exist. `.webp` is smaller and Next.js serves it with better performance.
