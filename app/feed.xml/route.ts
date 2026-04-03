import { Feed } from 'feed';
import { getSortedArticlesData } from '@/lib/articles';

export async function GET() {
  const baseUrl = process.env.APP_URL || 'https://dharmicviews.com';
  
  const feed = new Feed({
    title: "Dharmic Views",
    description: "A curated collection of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    image: `${baseUrl}/logo.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Dharmic Views`,
    updated: new Date(),
    generator: "Next.js using Feed for Node.js",
    feedLinks: {
      rss2: `${baseUrl}/feed.xml`,
    },
    author: {
      name: "Admin",
      email: "dharmicviews@gmail.com",
      link: baseUrl
    }
  });

  const articles = getSortedArticlesData();

  articles.forEach((article) => {
    feed.addItem({
      title: article.title,
      id: `${baseUrl}/articles/${article.slug}`,
      link: `${baseUrl}/articles/${article.slug}`,
      description: article.description,
      content: article.description, // In a real app, you might want to include full HTML content here
      author: [
        {
          name: article.author,
        }
      ],
      date: new Date(article.date),
      image: article.heroImage
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
