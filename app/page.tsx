import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';
import { resourceData } from '@/lib/data';
import { getFeaturedVideos } from '@/lib/videos';
import { getFeaturedArticles } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Dharmic Views - For Dharma... Now and Forever.',
  description: 'Perspectives on Dharmic principles, Hindu identity in America, and Vedic wisdom for the modern world. Articles, videos, and curated resources by Mohan Sonti.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Dharmic Views - For Dharma... Now and Forever.',
    description: 'Perspectives on Dharmic principles, Hindu identity in America, and Vedic wisdom for the modern world. Articles, videos, and curated resources by Mohan Sonti.',
    url: SITE_URL,
    siteName: 'Dharmic Views',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Dharmic Views' }],
    type: 'website',
  },
};

export default function HomePage() {
  const videos = getFeaturedVideos(3);
  const articles = getFeaturedArticles(3);

  return (
    <main>
      <HomeClient initialData={resourceData} featuredVideos={videos} featuredArticles={articles} />
    </main>
  );
}
