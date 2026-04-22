import { getSortedArticlesData } from '@/lib/articles';
import { Metadata } from 'next';
import ArticlesClient from '@/components/ArticlesClient';

const baseUrl = process.env.APP_URL || 'https://dharmicviews.com';

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
    type: 'website',
  },
};

export default function ArticlesPage() {
  const articles = getSortedArticlesData();

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
        url: `${baseUrl}/articles/${a.slug}`,
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
