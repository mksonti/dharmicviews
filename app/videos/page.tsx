import { getAllVideos } from '@/lib/videos';
import { Metadata } from 'next';
import VideosClient from '@/components/VideosClient';

const baseUrl = process.env.APP_URL || 'https://dharmicviews.com';

export const metadata: Metadata = {
  title: 'Videos on Vedic Wisdom & Hindu Culture',
  description: 'Curated videos on Vedic wisdom, Hindu culture, and dharmic principles from leading scholars and teachers.',
  alternates: {
    canonical: `${baseUrl}/videos`,
  },
  openGraph: {
    title: 'Videos on Vedic Wisdom & Hindu Culture',
    description: 'Curated videos on Vedic wisdom, Hindu culture, and dharmic principles from leading scholars and teachers.',
    url: `${baseUrl}/videos`,
    type: 'website',
  },
};

export default function VideosPage() {
  const videos = getAllVideos();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Videos on Vedic Wisdom & Hindu Culture',
    description: 'Curated videos on Vedic wisdom, Hindu culture, and dharmic principles from leading scholars and teachers.',
    url: `${baseUrl}/videos`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: videos.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${baseUrl}/videos/${v.videoId}`,
        name: v.title,
      })),
    },
  };

  return (
    <main className="py-12 px-6 lg:px-12 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VideosClient initialVideos={videos} />
    </main>
  );
}
