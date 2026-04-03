import Link from 'next/link';
import Image from 'next/image';
import { getSortedArticlesData } from '@/lib/articles';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Read the latest articles on Vedic wisdom and culture.',
};

export default function ArticlesPage() {
  const articles = getSortedArticlesData();

  return (
    <main className="py-12 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif italic text-4xl lg:text-5xl text-orange-950 mb-8">Articles</h1>
        <div className="grid gap-8">
          {articles.map(({ slug, date, title, description, heroImage }) => (
            <article key={slug} className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image 
                  src={heroImage} 
                  alt={title} 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 md:w-2/3 flex flex-col justify-center">
                <p className="text-sm text-stone-500 mb-2">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <Link href={`/articles/${slug}`}>
                  <h2 className="text-2xl font-bold text-stone-900 mb-3 hover:text-orange-600 transition-colors">{title}</h2>
                </Link>
                <p className="text-stone-600 mb-4">{description}</p>
                <Link href={`/articles/${slug}`} className="text-orange-600 font-medium hover:text-orange-700">
                  Read more &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
