# SEO fix-up — remaining manual follow-ups

Two items from the SEO/crawlability pass ([dharmicviews-fix-prompt.md](dharmicviews-fix-prompt.md)) couldn't be completed in-repo and need action from you. Everything else in that prompt (canonical/www fix, JSON-LD, robots.txt/sitemap.xml, OG tags, bad-link cleanup, h1 hierarchy, image sizing) is already applied and built successfully.

## 1. `sameAs` URLs for Mohan Sonti (Person schema)

**Where it lives today:** [app/layout.tsx](app/layout.tsx), inside the root `jsonLd.@graph` array, in the `Person` node:

```ts
{
  '@type': 'Person',
  '@id': `${SITE_URL}/#mohan-sonti`,
  name: 'Mohan Sonti',
  jobTitle: 'Author & Public Speaker',
  alumniOf: 'Indian Institute of Technology Bombay',
  description: 'Certified Yoga teacher and public speaker on Dharmic scriptures, Hindu philosophy, and the Indian-American diaspora.',
  // sameAs: [ ... ]  <- to be added
}
```

This same `Person` node is referenced by `@id` from two other places, so adding `sameAs` here is the only edit needed — it propagates everywhere automatically:
- `Organization.founder` in [app/layout.tsx](app/layout.tsx) (site-wide, every page)
- `BlogPosting.author` in [app/articles/[slug]/page.tsx](app/articles/[slug]/page.tsx) (every article page)

**What to supply:** a list of URLs, one per verified profile — for example:
- YouTube channel (if Mohan Sonti has a personal one, distinct from the guest-appearance channels already in `content/channels.json`)
- LinkedIn profile
- Any verified speaker-bureau or conference-bio page (PGurus, Jaipur Dialogues, ITV Gold — only if those platforms host a dedicated profile page, not just episode appearances)
- Twitter/X, Instagram, or other social profiles actively used and clearly identifying him

**Why we didn't guess:** a wrong `sameAs` links Google's Knowledge Graph to the wrong entity, which is worse than having no `sameAs` at all. Once you have the URLs, the edit is:

```ts
sameAs: [
  'https://www.youtube.com/@handle',
  'https://www.linkedin.com/in/handle',
  // ...
],
```

added as a sibling key inside that same `Person` object.

## 2. 301 redirect: `dharmicviews.com` → `www.dharmicviews.com`

**Why this can't be a repo file:** the site is a static export (`output: 'export'` in [next.config.ts](next.config.ts)) deployed via [.github/workflows/deploy.yml](.github/workflows/deploy.yml) to **GitHub Pages**. GitHub Pages serves static files only — it has no host-level redirect-rule mechanism (no `_redirects`, no `vercel.json`/`netlify.toml` equivalent). A meta-refresh or JS redirect page could work as a last resort, but it's a worse signal to search engines than a real 301 and doesn't help the "uncategorized" security-crawler problem this whole pass is meant to fix.

**What actually needs to happen** (outside this repo, wherever `dharmicviews.com`'s DNS/registrar is managed):

- **If using a DNS provider with redirect support** (Cloudflare, Namecheap URL redirect, GoDaddy domain forwarding, etc.): configure a domain-level 301 forward from `dharmicviews.com` (and `http://` variants) to `https://www.dharmicviews.com`, preserving the path (`/some/page` → `www.dharmicviews.com/some/page`, not just the homepage).
- **If using Cloudflare specifically:** a "Redirect Rule" (or legacy Page Rule) is the standard approach — forwarding URL, status code 301, target `https://www.dharmicviews.com/$1`.
- **Confirm GitHub Pages custom domain config**: check whether GitHub Pages is currently configured to serve on the apex (`dharmicviews.com`) or on `www.dharmicviews.com` — this determines which host needs the `CNAME` file/GitHub Pages custom-domain setting, and which one just needs to redirect at DNS. (The inventory found no `CNAME` file in the repo currently, so this should be confirmed in the GitHub Pages settings UI.)

**Verification once done:** `curl -I http://dharmicviews.com/` and `curl -I https://dharmicviews.com/` should both return `301` (or `308`) with a `Location: https://www.dharmicviews.com/` header.

## Suggested next step

Once you have the `sameAs` URLs, share them and I'll add the one edit to `app/layout.tsx`. The redirect is entirely on your end (DNS/registrar/GitHub Pages settings) — happy to review the config if you paste it here before you apply it.
