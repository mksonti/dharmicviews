import { getVideoData, getAllVideos } from '@/lib/videos';
import { getVideoArticleData } from '@/lib/video-articles';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
import BinaryList, { BinaryItem } from '@/components/BinaryList';
import ForceCard from '@/components/ForceCard';
import SourceNote from '@/components/SourceNote';
import LangTag from '@/components/LangTag';
import { ChevronRight, Clock } from 'lucide-react';

const mdxComponents = { Callout, Pullquote, Divider, SectionHeading, Definition, Question, EpicCompare, BinaryList, BinaryItem, ForceCard, SourceNote, LangTag };

const baseUrl = process.env.APP_URL || 'https://dharmicviews.com';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const videoData = getVideoData(slug);
  
  if (!videoData) {
    return { title: 'Video Not Found' };
  }

  return {
    title: videoData.title,
    description: videoData.description,
    alternates: {
      canonical: `${baseUrl}/videos/${slug}`,
    },
    openGraph: {
      title: videoData.title,
      description: videoData.description,
      url: `${baseUrl}/videos/${slug}`,
      images: [{ url: videoData.thumbnail, width: 1280, height: 720, alt: videoData.title }],
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title: videoData.title,
      description: videoData.description,
      images: [videoData.thumbnail],
    }
  };
}

export async function generateStaticParams() {
  const videos = getAllVideos();
  return videos.map((video) => ({
    slug: video.videoId,
  }));
}

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const videoData = getVideoData(slug);

  if (!videoData) {
    notFound();
  }

  const articleData = getVideoArticleData(slug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: videoData.title,
      description: videoData.description,
      thumbnailUrl: [videoData.thumbnail],
      uploadDate: videoData.publishDate,
      duration: videoData.duration,
      contentUrl: videoData.url,
      embedUrl: `https://www.youtube.com/embed/${videoData.videoId}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Videos', item: `${baseUrl}/videos` },
        { '@type': 'ListItem', position: 3, name: videoData.channelName, item: `${baseUrl}/videos/channel/${videoData.channelId}` },
        { '@type': 'ListItem', position: 4, name: videoData.title, item: `${baseUrl}/videos/${videoData.videoId}` },
      ],
    },
  ];

  return (
    <main className="py-12 px-6 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto mb-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-stone-500">
            <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-stone-300" /></li>
            <li><Link href="/videos" className="hover:text-orange-600 transition-colors">Videos</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-stone-300" /></li>
            <li><Link href={`/videos/channel/${videoData.channelId}`} className="hover:text-orange-600 transition-colors">{videoData.channelName}</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-stone-300" /></li>
            <li className="text-stone-400 truncate max-w-[200px] sm:max-w-xs" aria-current="page">{videoData.title}</li>
          </ol>
        </nav>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-orange-100 overflow-hidden shadow-sm">
          <div className="relative w-full aspect-video bg-black">
            <iframe 
              src={`https://www.youtube.com/embed/${videoData.videoId}`} 
              title={videoData.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            />
          </div>
          <div className="p-8">
            <h1 className="font-serif italic text-2xl md:text-3xl text-stone-900 mb-6 pb-6 border-b border-stone-100">{videoData.title}</h1>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-orange-600 mb-3">Overview</h2>
            <div className="prose prose-orange max-w-none text-stone-700">
              <p className="whitespace-pre-wrap">{videoData.description}</p>
            </div>
            {articleData && (
              <div className="mt-10 pt-8 border-t border-stone-100">
                <div className="flex flex-wrap items-center text-stone-500 text-sm gap-3 mb-6">
                  <span>{new Date(videoData.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>&bull;</span>
                  <span>By {articleData.author}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {articleData.readingTime} min read
                  </span>
                </div>
                <div className="prose prose-orange prose-lg max-w-none text-stone-700">
                  <MDXRemote source={articleData.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={mdxComponents} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
