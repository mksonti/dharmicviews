// Insights are bespoke interactive pages, not markdown content. Each entry below
// must correspond to a route under app/insights/<slug>/page.tsx.

export type Insight = {
  slug: string;
  title: string;
  description: string;
  date: string;
  heroImage?: string;
  tags: string[];
  featured?: boolean;
};

export const insights: Insight[] = [
  {
    slug: 'wb-2026',
    title: 'TN & WB 2026: Bizarre, shocking data from the polls',
    description:
      "An interactive breakdown of West Bengal's 2016 → 2026 electoral transformation alongside Tamil Nadu's anomalous 2026 numbers — vote shares, seat counts, voter-roll inflation, IUML seat-efficiency, and the demographic forces behind both stories.",
    date: '2026-05-06',
    tags: ['West Bengal', 'Tamil Nadu', 'Elections 2026', 'Demographics'],
    featured: true,
  },
];

export function getSortedInsights(): Insight[] {
  return [...insights].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find(i => i.slug === slug);
}
