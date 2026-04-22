import { MetadataRoute } from 'next';
import { getSortedArticlesData } from '@/lib/articles';
import { getAllVideos, getChannels } from '@/lib/videos';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'https://dharmicviews.com';

  const articles = getSortedArticlesData();
  const videos = getAllVideos();
  const channels = getChannels();

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const videoUrls = videos.map((video) => ({
    url: `${baseUrl}/videos/${video.videoId}`,
    lastModified: new Date(video.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const channelUrls = channels.map((channel) => ({
    url: `${baseUrl}/videos/channel/${channel.channelId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...channelUrls,
    ...articleUrls,
    ...videoUrls,
  ];
}
