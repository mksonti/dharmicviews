import { getAllVideos } from '@/lib/videos';
import { Metadata } from 'next';
import VideosClient from '@/components/VideosClient';

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Watch curated videos on Vedic wisdom and culture.',
};

export default function VideosPage() {
  const videos = getAllVideos();

  return (
    <main className="py-12 px-6 lg:px-12 bg-white">
      <VideosClient initialVideos={videos} />
    </main>
  );
}
