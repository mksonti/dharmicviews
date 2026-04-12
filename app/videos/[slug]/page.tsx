import { getVideoData, getAllVideos } from '@/lib/videos';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const videoData = getVideoData(slug);
  
  if (!videoData) {
    return { title: 'Video Not Found' };
  }

  return {
    title: videoData.title,
    description: videoData.description,
    openGraph: {
      title: videoData.title,
      description: videoData.description,
      images: [videoData.thumbnail],
      type: 'video.other',
      url: videoData.url,
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: videoData.title,
    description: videoData.description,
    thumbnailUrl: [videoData.thumbnail],
    uploadDate: videoData.publishDate,
    duration: videoData.duration,
    contentUrl: videoData.url,
    embedUrl: `https://www.youtube.com/embed/${videoData.videoId}`
  };

  return (
    <main className="py-12 px-6 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <h1 className="font-serif italic text-2xl md:text-3xl text-stone-900 mb-4">{videoData.title}</h1>
            <div className="flex items-center text-stone-500 text-sm gap-4 mb-6 pb-6 border-b border-stone-100">
              <span>Published on {new Date(videoData.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="prose prose-orange max-w-none text-stone-700">
              <p className="whitespace-pre-wrap">{videoData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
