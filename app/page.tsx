import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';
import { resourceData } from '@/lib/data';
import { getAllVideos } from '@/lib/videos';
import { getSortedArticlesData } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Dharmic Views — Vedic Wisdom for the Hindu Diaspora',
  description: 'Perspectives on Dharmic principles, Hindu identity in America, and Vedic wisdom for the modern world. Articles, videos, and curated resources by Mohan Sonti.',
  openGraph: {
    title: 'Dharmic Views — Vedic Wisdom for the Hindu Diaspora',
    description: 'Perspectives on Dharmic principles, Hindu identity in America, and Vedic wisdom for the modern world. Articles, videos, and curated resources by Mohan Sonti.',
    type: 'website',
  },
};

export default function HomePage() {
  const videos = getAllVideos().slice(0, 3);
  const articles = getSortedArticlesData().slice(0, 3);

  return (
    <main>
      <HomeClient initialData={resourceData} featuredVideos={videos} featuredArticles={articles} />
    </main>
  );
}
