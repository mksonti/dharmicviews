import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { getSortedInsights } from '@/lib/insights';

const baseUrl = process.env.APP_URL || 'https://dharmicviews.com';

export const metadata: Metadata = {
  title: 'Insights — Data-driven analyses',
  description:
    'Interactive, data-driven analyses on Indian elections, demographics, and political trends — bespoke pages built around primary numbers and source video discussions.',
  alternates: { canonical: `${baseUrl}/insights` },
  openGraph: {
    title: 'Insights — Data-driven analyses',
    description:
      'Interactive, data-driven analyses on Indian elections, demographics, and political trends.',
    url: `${baseUrl}/insights`,
    type: 'website',
  },
};

export default function InsightsIndexPage() {
  const items = getSortedInsights();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Insights — Data-driven analyses',
    url: `${baseUrl}/insights`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((i, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${baseUrl}/insights/${i.slug}`,
        name: i.title,
      })),
    },
  };

  return (
    <main className="py-12 px-6 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest border border-orange-100">
            <BarChart3 className="w-3.5 h-3.5" />
            Interactive Analyses
          </div>
          <h1 className="font-serif italic text-4xl lg:text-5xl text-orange-950 mt-4">Insights</h1>
          <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
            Each insight is a bespoke interactive page built around a specific question — election results, demographic shifts, or geopolitical realignments — paired with the primary source discussion.
          </p>
        </header>

        {items.length === 0 ? (
          <p className="text-stone-500">No insights published yet.</p>
        ) : (
          <div className="grid gap-8">
            {items.map(insight => (
              <article
                key={insight.slug}
                className="group bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid md:grid-cols-[1fr,1.6fr]">
                  <div className="relative bg-gradient-to-br from-orange-50 via-white to-stone-50 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-orange-100">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {insight.tags.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] uppercase tracking-wider font-bold text-orange-700 bg-orange-100/70 rounded-full px-2 py-0.5">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-stone-500 text-xs font-medium">
                        {new Date(insight.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="hidden md:block mt-6">
                      <p className="font-serif italic text-orange-950/40 text-6xl leading-none">{String(items.indexOf(insight) + 1).padStart(2, '0')}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <Link href={`/insights/${insight.slug}`}>
                      <h2 className="font-serif italic text-2xl md:text-3xl text-stone-900 leading-tight group-hover:text-orange-700 transition-colors">
                        {insight.title}
                      </h2>
                    </Link>
                    <p className="text-stone-600 mt-3 leading-relaxed">{insight.description}</p>
                    <Link
                      href={`/insights/${insight.slug}`}
                      className="inline-flex items-center gap-1.5 mt-5 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                    >
                      Explore the analysis
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
