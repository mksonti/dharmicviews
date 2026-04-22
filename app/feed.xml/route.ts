import { Feed } from 'feed';
import { getSortedArticlesData } from '@/lib/articles';

// GET is supported in static export via route handlers only when the route
// has no dynamic segments AND returns a static Response. Next.js will call
// this once at build time and write the result to out/feed.xml.
export const dynamic = 'force-static';

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
      content: article.description,
      author: [
        {
          name: article.author,
        }
      ],
      date: new Date(article.date),
      image: article.heroImage
        ? article.heroImage.startsWith('http')
          ? article.heroImage
          : `${baseUrl}${article.heroImage}`
        : undefined
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
