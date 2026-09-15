import { getSortedArticlesData } from '@/lib/articles';
import { Metadata } from 'next';
import ArticlesClient from '@/components/ArticlesClient';
import { SITE_URL } from '@/lib/site';

const baseUrl = SITE_URL;

export const metadata: Metadata = {
  title: 'Articles on Dharmic Living & Hindu Identity',
  description: 'Essays on Vedic wisdom, Hindu political identity, and dharmic principles for the diaspora — by Mohan Sonti.',
  alternates: {
    canonical: `${baseUrl}/articles`,
  },
  openGraph: {
    title: 'Articles on Dharmic Living & Hindu Identity',
    description: 'Essays on Vedic wisdom, Hindu political identity, and dharmic principles for the diaspora — by Mohan Sonti.',
    url: `${baseUrl}/articles`,
    siteName: 'Dharmic Views',
    images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Dharmic Views' }],
    type: 'website',
  },
};

export default function ArticlesPage() {
  const articles = getSortedArticlesData()
    .map(a => ({
      ...a,
      href: `/articles/${a.slug}`,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Articles on Dharmic Living & Hindu Identity',
    description: 'Essays on Vedic wisdom, Hindu political identity, and dharmic principles for the diaspora — by Mohan Sonti.',
    url: `${baseUrl}/articles`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${baseUrl}${a.href}`,
        name: a.title,
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
        <ArticlesClient articles={articles} />
      </div>
    </main>
  );
}
