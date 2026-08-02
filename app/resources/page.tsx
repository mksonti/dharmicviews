import { Metadata } from 'next';
import ResourcesClient from '@/components/ResourcesClient';
import { resourceData } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

const baseUrl = SITE_URL;

export const metadata: Metadata = {
  title: 'Hinduism Resources — Vedic Wisdom & Hindu Culture',
  description: 'A curated directory of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.',
  alternates: {
    canonical: `${baseUrl}/resources`,
  },
  openGraph: {
    title: 'Hinduism Resources — Vedic Wisdom & Hindu Culture',
    description: 'A curated directory of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.',
    url: `${baseUrl}/resources`,
    siteName: 'Dharmic Views',
    images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Dharmic Views' }],
    type: 'website',
  },
};

export default function ResourcesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Hinduism Resources — Vedic Wisdom & Hindu Culture',
    description: 'A curated directory of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.',
    url: `${baseUrl}/resources`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: resourceData.map((category, i) => ({
        '@type': 'ItemList',
        position: i + 1,
        name: category.title,
        url: `${baseUrl}/resources#${category.id}`,
      })),
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResourcesClient initialData={resourceData} />
    </main>
  );
}
