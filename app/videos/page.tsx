import { getAllVideos, getChannelAvatarMap } from '@/lib/videos';
import { Metadata } from 'next';
import VideosClient from '@/components/VideosClient';
import { SITE_URL } from '@/lib/site';

const baseUrl = SITE_URL;

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
    siteName: 'Dharmic Views',
    images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Dharmic Views' }],
    type: 'website',
  },
};

export default function VideosPage() {
  const videos = getAllVideos();
  const avatarMap = getChannelAvatarMap();

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
      <VideosClient initialVideos={videos} avatarMap={avatarMap} />
    </main>
  );
}
