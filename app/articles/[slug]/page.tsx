import { getArticleData, getAllArticleSlugs } from '@/lib/articles';
import { Metadata } from 'next';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const articleData = getArticleData(slug);
  
  return {
    title: articleData.title,
    description: articleData.description,
    openGraph: {
      title: articleData.title,
      description: articleData.description,
      images: [articleData.heroImage],
      type: 'article',
      publishedTime: articleData.date,
      authors: [articleData.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: articleData.title,
      description: articleData.description,
      images: [articleData.heroImage],
    }
  };
}

export async function generateStaticParams() {
  const paths = getAllArticleSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articleData = getArticleData(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: articleData.title,
    image: [articleData.heroImage],
    datePublished: articleData.date,
    dateModified: articleData.date,
    author: [{
      '@type': 'Person',
      name: articleData.author,
    }]
  };

  return (
    <main className="py-12 px-6 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto bg-white rounded-3xl border border-orange-100 overflow-hidden shadow-sm">
        <div className="relative w-full h-64 md:h-96">
          <Image 
            src={articleData.heroImage} 
            alt={articleData.title} 
            fill 
            className="object-cover"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        <div className="p-8 md:p-12">
          <header className="mb-8">
            <h1 className="font-serif italic text-3xl md:text-5xl text-stone-900 mb-4 leading-tight">{articleData.title}</h1>
            <div className="flex items-center text-stone-500 text-sm gap-4">
              <span>{new Date(articleData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>&bull;</span>
              <span>By {articleData.author}</span>
            </div>
          </header>
          <div className="prose prose-orange prose-lg max-w-none text-stone-700">
            <MDXRemote source={articleData.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>
        </div>
      </article>
    </main>
  );
}
