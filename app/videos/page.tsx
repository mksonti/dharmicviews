import Link from 'next/link';
import Image from 'next/image';
import { getAllVideos } from '@/lib/videos';
import { Metadata } from 'next';
import { PlayCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Watch curated videos on Vedic wisdom and culture.',
};

export default function VideosPage() {
  const videos = getAllVideos();

  return (
    <main className="py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif italic text-4xl lg:text-5xl text-orange-950 mb-8">Video Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Link key={video.videoId} href={`/videos/${video.videoId}`} className="group">
              <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                <div className="relative w-full aspect-video bg-stone-100">
                  <Image 
                    src={video.thumbnailSrc} 
                    alt={video.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-lg font-bold text-stone-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">{video.title}</h2>
                  <p className="text-sm text-stone-500 mb-4 line-clamp-2 flex-1">{video.description}</p>
                  <div className="flex items-center justify-between text-xs font-medium text-stone-400">
                    <span>{new Date(video.publishDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
