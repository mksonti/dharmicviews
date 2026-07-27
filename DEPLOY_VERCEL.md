# Deploying to Vercel (instead of GitHub Pages)

This project currently deploys to **GitHub Pages** as a static export, driven by [.github/workflows/deploy.yml](.github/workflows/deploy.yml) and the `output: 'export'` setting in [next.config.ts](next.config.ts). Moving to **Vercel** removes the need for most of that GitHub-Pages-specific configuration, since Vercel runs Next.js natively (no static export required, though it still works if you want to keep it).

This note covers what needs to change and what Vercel requires.

---

## 1. Decide: keep static export, or switch to a normal Next.js deployment?

| | Static export (current) | Native Vercel (recommended) |
|---|---|---|
| `next.config.ts` `output: 'export'` | Required | Remove it |
| `basePath` / `assetPrefix` | Required (sub-path hosting) | Remove — Vercel serves from the domain root |
| Image optimization (`next/image`) | Disabled (`unoptimized: true`) | Can re-enable Vercel's built-in image optimizer |
| Server features (API routes, ISR, on-demand revalidation) | Not available | Available if you ever need them |

Since the site is entirely file/JSON-driven content with no server-side logic today, either option works. **Recommended:** drop the static-export mode and let Vercel build it as a normal Next.js app — it's simpler and removes the sub-path workarounds. The steps below assume this path; static-export-on-Vercel is noted as an alternative at the end.

---

## 2. Code changes required

### a) `next.config.ts`

Remove the GitHub-Pages-only settings:

```diff
- const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
-  output: 'export',
-  basePath,
-  assetPrefix: basePath,
  images: {
-    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com', port: '', pathname: '/**' },
    ],
  },
  transpilePackages: ['motion'],
};
```

With `unoptimized` removed, `next/image` will use Vercel's image optimizer. Since remote images also come from `i.ytimg.com` (video thumbnails) and `yt3.ggpht.com`/`yt3.googleusercontent.com` (channel avatars) and `picsum.photos` (the sample article), add those to `remotePatterns` too, or optimization requests for them will fail:

```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'img.youtube.com' },
    { protocol: 'https', hostname: 'i.ytimg.com' },
    { protocol: 'https', hostname: 'yt3.ggpht.com' },
    { protocol: 'https', hostname: 'yt3.googleusercontent.com' },
    { protocol: 'https', hostname: 'picsum.photos' },
  ],
},
```

### b) `package.json` scripts

No changes strictly required — Vercel runs `npm run build` (or your configured build command) automatically and detects Next.js. You can leave `"start": "next start"` as is; it will now actually work once `output: 'export'` is removed (today it errors, since `next start` doesn't support static export).

### c) `APP_URL` environment variable

Every page (`app/layout.tsx`, `app/articles/page.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/feed.xml/route.ts`, etc.) reads `process.env.APP_URL`, falling back to `https://dharmicviews.com`. Set `APP_URL` in Vercel's project environment variables to whatever domain the Vercel deployment will live at (see step 3) — otherwise canonical URLs, sitemap, RSS feed, and Open Graph tags will silently point at the old domain even though the site is served elsewhere.

### d) Remove/retire the GitHub Actions workflow (optional)

Vercel deploys via its own Git integration (see step 4), so [.github/workflows/deploy.yml](.github/workflows/deploy.yml) becomes redundant. If you're moving off GitHub Pages entirely, either delete this file or disable the GitHub Pages source in the repo settings — otherwise both platforms will build and publish on every push, which is harmless but wasteful.

---

## 3. Domain / URL

- Decide the production URL (e.g. `dharmicviews.com`, or a `*.vercel.app` subdomain if no custom domain yet).
- Set `APP_URL` (step 2c) to match exactly, including `https://` and no trailing slash.
- If moving the custom domain from GitHub Pages to Vercel, update the domain's DNS records to point at Vercel (Vercel's dashboard provides the exact `A`/`CNAME` records once you add the domain to the project) and remove the old `CNAME` file if one exists in the repo (this project doesn't have one, so nothing to remove here).

---

## 4. Vercel project setup requirements

1. **Account & repo access:** a Vercel account connected to the GitHub account/org that owns this repo.
2. **Import the project:** in the Vercel dashboard, "Add New Project" → select this GitHub repo. Vercel auto-detects Next.js and sets:
   - Build command: `npm run build` (or `next build`)
   - Output directory: auto-detected (leave default; don't set it to `out` unless you kept static export)
   - Install command: `npm install` (or `npm ci`)
3. **Node version:** the GitHub Actions workflow currently pins Node 24. Set the same in Vercel under Project Settings → General → Node.js Version, so build behavior matches what's been tested.
4. **Environment variables:** add `APP_URL` (step 2c) under Project Settings → Environment Variables, for Production (and Preview, if you want preview deployments to have correct-looking URLs — typically fine to leave as the production URL or unset there).
5. **prebuild validation script:** [scripts/validate-frontmatter.mjs](scripts/validate-frontmatter.mjs) runs automatically via the `prebuild` npm script before `next build`, so a malformed article's frontmatter will fail the Vercel build exactly as it does locally/in CI today — no extra setup needed.
6. **Automatic deployments:** once imported, Vercel deploys automatically on every push to `main` (production) and creates preview deployments for pull requests/branches — no workflow YAML needed, unlike the GitHub Actions setup.

---

## 5. If you want to keep static export instead

If there's a reason to keep `output: 'export'` (e.g. wanting an easy path back to GitHub Pages later), Vercel also supports deploying a static export directory as-is:

- Keep `output: 'export'` in `next.config.ts`, but remove `basePath`/`assetPrefix` (Vercel serves from the domain root, so the GitHub-Pages sub-path is unnecessary and would break asset URLs).
- In Vercel project settings, no special config is needed — Vercel detects the `output: 'export'` mode and serves the `out/` directory as a static site automatically.
- You lose access to Vercel's on-the-fly image optimization and any future server-rendered features, same tradeoff as today.

---

## 6. Post-migration checklist

- [ ] `next.config.ts` no longer sets `output: 'export'` / `basePath` / `assetPrefix` (unless intentionally keeping static export)
- [ ] `images.remotePatterns` includes all external image hosts actually used (YouTube thumbnails, channel avatars, any placeholder images)
- [ ] `APP_URL` environment variable set correctly in Vercel for Production
- [ ] Custom domain (if any) added in Vercel and DNS updated
- [ ] First deploy succeeds and `prebuild` frontmatter validation passes
- [ ] Spot-check `/sitemap.xml`, `/robots.txt`, and `/feed.xml` on the new URL — they should reference the new domain, not `dharmicviews.com`
- [ ] Old GitHub Pages workflow disabled/removed once Vercel is confirmed working, to avoid double-publishing
