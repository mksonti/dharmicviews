import { getArticleData, getAllArticleSlugs } from '@/lib/articles';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Callout from '@/components/Callout';
import Pullquote from '@/components/Pullquote';
import Divider from '@/components/Divider';
import SectionHeading from '@/components/SectionHeading';
import Definition from '@/components/Definition';
import Question from '@/components/Question';
import EpicCompare from '@/components/EpicCompare';
import { ChevronRight, Clock } from 'lucide-react';

const mdxComponents = { Callout, Pullquote, Divider, SectionHeading, Definition, Question, EpicCompare };

const baseUrl = process.env.APP_URL || 'https://dharmicviews.com';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const articleData = getArticleData(slug);
  const ogImage = articleData.heroImage || `${baseUrl}/logo.png`;

  return {
    title: articleData.title,
    description: articleData.description,
    alternates: {
      canonical: `${baseUrl}/articles/${slug}`,
    },
    openGraph: {
      title: articleData.title,
      description: articleData.description,
      url: `${baseUrl}/articles/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: articleData.title }],
      type: 'article',
      publishedTime: articleData.date,
      authors: [articleData.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: articleData.title,
      description: articleData.description,
      images: [ogImage],
    },
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

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: articleData.title,
      description: articleData.description,
      url: `${baseUrl}/articles/${slug}`,
      image: [articleData.heroImage || `${baseUrl}/logo.png`],
      datePublished: articleData.date,
      dateModified: articleData.date,
      author: [{
        '@type': 'Person',
        name: articleData.author,
      }],
      publisher: {
        '@type': 'Organization',
        name: 'Dharmic Views',
        logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Articles', item: `${baseUrl}/articles` },
        { '@type': 'ListItem', position: 3, name: articleData.title, item: `${baseUrl}/articles/${slug}` },
      ],
    },
  ];

  return (
    <main className="py-12 px-6 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto mb-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-stone-500">
            <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-stone-300" /></li>
            <li><Link href="/articles" className="hover:text-orange-600 transition-colors">Articles</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-stone-300" /></li>
            <li className="text-stone-400 truncate max-w-[200px] sm:max-w-xs" aria-current="page">{articleData.title}</li>
          </ol>
        </nav>
      </div>
      <article className="max-w-3xl mx-auto bg-white rounded-3xl border border-orange-100 overflow-hidden shadow-sm">
        {articleData.heroImage && (
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            <Image
              src={articleData.heroImage}
              alt={articleData.title}
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
              priority
            />
          </div>
        )}
        <div className="p-8 md:p-12">
          <header className="mb-8">
            <h1 className="font-serif italic text-3xl md:text-5xl text-stone-900 mb-4 leading-tight">{articleData.title}</h1>
            <div className="flex flex-wrap items-center text-stone-500 text-sm gap-3">
              <span>{new Date(articleData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>&bull;</span>
              <span>By {articleData.author}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {articleData.readingTime} min read
              </span>
            </div>
          </header>
          <div className="prose prose-orange prose-lg max-w-none text-stone-700">
            <MDXRemote source={articleData.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={mdxComponents} />
          </div>
        </div>
      </article>
    </main>
  );
}
