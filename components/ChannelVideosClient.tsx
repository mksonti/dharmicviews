'use client';

import React, { useState, useMemo } from 'react';
import { Search, PlayCircle, Calendar, User, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import type { VideoData } from '@/lib/videos';

export default function ChannelVideosClient({ channelName, channelId, videos }: { channelName: string; channelId: string; videos: VideoData[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    videos.forEach(v => v.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [videos]);

  const filtered = useMemo(() => {
    let result = [...videos];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(v =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
      );
    }
    if (selectedTag) {
      result = result.filter(v => v.tags?.includes(selectedTag));
    }
    return result.sort((a, b) => a.title.localeCompare(b.title));
  }, [videos, searchQuery, selectedTag]);

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        href="/videos"
        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-orange-600 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        All Videos
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="font-serif italic text-4xl lg:text-5xl text-orange-950 mb-2">{channelName}</h1>
          <p className="text-stone-500">{videos.length} video{videos.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-stone-800 text-sm"
          />
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedTag === null
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                : 'bg-white border border-stone-200 text-stone-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map(video => (
              <motion.div
                key={video.videoId}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/videos/${video.videoId}`} className="group block h-full">
                  <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                    <div className="relative w-full aspect-video bg-stone-100 overflow-hidden">
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
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded-md">
                        <span className="text-white text-xs font-medium tracking-wider">
                          {video.duration.replace('PT', '').toLowerCase()}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      {video.tags && video.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap mb-3">
                          {video.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-bold uppercase tracking-wider rounded border border-orange-100/50">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-stone-500 mb-4 line-clamp-2 flex-1">
                        {video.description}
                      </p>

                      <div className="flex flex-col gap-1.5 pt-4 border-t border-stone-100 mt-auto">
                        <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                          <User className="w-3.5 h-3.5 text-stone-400" />
                          <span className="truncate">{video.publisher || video.channelName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-stone-400">
                          <Calendar className="w-3.5 h-3.5 text-stone-300" />
                          <span>
                            {new Date(video.publishDate).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-20 text-center bg-stone-50/50 rounded-3xl border border-stone-100 border-dashed">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-sm">
            <Search className="w-6 h-6 text-stone-300" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-2">No videos found</h3>
          <p className="text-stone-500">Try adjusting your search query or removing filters.</p>
        </div>
      )}
    </div>
  );
}
