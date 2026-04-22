import HomeClient from '@/components/HomeClient';
import { resourceData } from '@/lib/data';
import { getAllVideos } from '@/lib/videos';
import { getSortedArticlesData } from '@/lib/articles';

export default function HomePage() {
  const videos = getAllVideos().slice(0, 3);
  const articles = getSortedArticlesData().slice(0, 3);

  return (
    <main>
      <HomeClient initialData={resourceData} featuredVideos={videos} featuredArticles={articles} />
    </main>
  );
}
