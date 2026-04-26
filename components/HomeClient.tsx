'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ExternalLink,
  BookOpen,
  Globe,
  Users,
  GraduationCap,
  MapPin,
  Heart,
  Newspaper,
  MessageSquare,
  AlertTriangle,
  History,
  ChevronRight,
  Play,
  Clock,
  Calendar,
  ArrowRight,
  Quote,
  Mic,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import type { VideoData } from '@/lib/videos';

const categoryIcons: Record<string, React.ReactNode> = {
  'vedic-wisdom': <BookOpen className="w-5 h-5" />,
  'international-vedic': <Globe className="w-5 h-5" />,
  'vedic-intellectuals-indian': <Users className="w-5 h-5" />,
  'vedic-intellectuals-western': <Users className="w-5 h-5" />,
  'vedic-universities': <GraduationCap className="w-5 h-5" />,
  'vedic-townships': <MapPin className="w-5 h-5" />,
  'sustaining-vedic-culture': <Heart className="w-5 h-5" />,
  'communities': <Users className="w-5 h-5" />,
  'political-ideologues': <Users className="w-5 h-5" />,
  'organizations': <Users className="w-5 h-5" />,
  'news-magazines': <Newspaper className="w-5 h-5" />,
  'opinions-articles': <MessageSquare className="w-5 h-5" />,
  'threats-challenges': <AlertTriangle className="w-5 h-5" />,
  'hindu-holocaust': <History className="w-5 h-5" />,
};

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const h = match[1] ? `${match[1]}h ` : '';
  const m = match[2] ? `${match[2]}m` : '';
  return `${h}${m}`.trim();
}

interface ArticleData {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  heroImage?: string;
}

interface HomeClientProps {
  initialData: any[];
  featuredVideos?: VideoData[];
  featuredArticles?: ArticleData[];
}

export default function HomeClient({ initialData, featuredVideos = [], featuredArticles = [] }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setShowInactive(
        window.location.pathname.includes('showInactive') || window.location.hash.includes('showInactive')
      );
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const filteredData = useMemo(() => {
    return initialData.map(category => ({
      ...category,
      links: category.links.filter((link: any) => {
        const isActiveLink = link.isActive !== false;
        const isStatusMatch = showInactive ? !isActiveLink : isActiveLink;

        if (!isStatusMatch) return false;
        if (!searchQuery) return true;

        return link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               link.url.toLowerCase().includes(searchQuery.toLowerCase());
      })
    })).filter(category => category.links.length > 0);
  }, [searchQuery, showInactive, initialData]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white border-b border-orange-50 px-6 py-14 lg:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-orange-50/50 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif italic text-4xl lg:text-6xl text-orange-950 mb-6 leading-tight">
              {showInactive ? (
                <>Archived <span className="text-orange-600">Resources</span>.</>
              ) : (
                <>For <span className="text-orange-600">Dharma...</span> Now and Forever.</>

              )}
            </h2>
            <p className="text-stone-500 text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed">
              {showInactive
                ? "A historical collection of digital resources and websites that are currently offline or unavailable."
                : "A curated collection of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage."}
            </p>

            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources, scriptures, or organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-orange-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-stone-800 placeholder:text-stone-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Parichay — Introduction Section */}
      {!showInactive && (
        <section className="bg-gradient-to-br from-orange-950 via-stone-900 to-stone-900 text-white px-6 py-16 lg:py-20 overflow-hidden relative">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_50%,_#f97316_0%,_transparent_60%)]" />
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px flex-1 bg-orange-800/50" />
                <span className="px-4 py-1 border border-orange-700/50 rounded-full text-orange-400 text-[11px] uppercase tracking-[0.25em] font-bold">
                  Parichay
                </span>
                <div className="h-px flex-1 bg-orange-800/50" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                {/* Avatar / Monogram */}
                <div className="lg:col-span-1 flex lg:flex-col items-center gap-6">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-serif italic font-bold text-3xl lg:text-4xl shadow-xl shadow-orange-900/50 flex-shrink-0">
                    MS
                  </div>
                  <div className="lg:text-center">
                    <p className="text-orange-400 text-[10px] uppercase tracking-widest font-bold mb-1">About the Author</p>
                    <h3 className="font-serif italic text-xl font-bold text-white">Mohan Sonti</h3>
                  </div>
                </div>

                {/* Bio */}
                <div className="lg:col-span-4 space-y-5">
                  <p className="text-stone-300 text-lg leading-relaxed">
                    Born in Andhra Pradesh and raised across the vibrant cultural landscapes of Delhi, Chennai, and Mumbai, <span className="text-white font-semibold">Mohan Sonti</span> embodies a Pan-Indian heritage. An alumnus of <span className="text-orange-400 font-semibold">IIT Bombay</span>, he pursued his Master&apos;s degree in the United States, where he built a distinguished professional career spanning decades.
                  </p>

                  <p className="text-stone-300 leading-relaxed">
                    A certified Yoga teacher, Mohan&apos;s life is defined by a commitment to <em className="text-orange-400">Seva</em> (selfless service) and cultural advocacy. He is a prominent voice in the Indian-American community — frequently engaging in dialogues on Dharmic Scriptures, Hindu philosophy, and their practical application in modern life.
                  </p>

                  <p className="text-stone-300 leading-relaxed">
                    As an intellectual and public speaker, he explores the <span className="text-white font-medium">logical foundations of ancient Indian Darshana</span> and its relationship with modern science — examining how ancient sages employed methodical inquiry to arrive at &quot;right knowledge&quot; and how that framework remains as vital today as ever. He has appeared on platforms such as <span className="text-orange-400">PGurus</span>, <span className="text-orange-400">Jaipur Dialogues</span>, and <span className="text-orange-400">ITV Gold</span>, speaking on Hindu American unity, geopolitics, and the evolving cultural identity of the global Indian diaspora.
                  </p>

                  {/* Highlight Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[
                      { icon: <GraduationCap className="w-3 h-3" />, label: 'IIT Bombay Alumnus' },
                      { icon: <Users className="w-3 h-3" />, label: 'Hindu American Unity' },
                      { icon: <BookOpen className="w-3 h-3" />, label: 'Dharmic Scriptures' },
                      { icon: <Mic className="w-3 h-3" />, label: 'Public Speaker' },
                      { icon: <Sparkles className="w-3 h-3" />, label: 'Darshana & Modern Science' },
                      { icon: <Sparkles className="w-3 h-3" />, label: 'Certified Yoga Teacher' },
                    ].map(tag => (
                      <span key={tag.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-stone-300 text-xs font-medium">
                        <span className="text-orange-400">{tag.icon}</span>
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  {/* Pull Quote */}
                  <blockquote className="mt-4 border-l-2 border-orange-500 pl-5 py-1">
                    <Quote className="w-4 h-4 text-orange-600 mb-2" />
                    <p className="text-stone-300 italic leading-relaxed text-sm">
                      His interests remain deeply rooted in the study of History, Politics, and the evolving cultural identity of the global Indian diaspora — bridging ancient wisdom with the urgencies of our modern world.
                    </p>
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Videos */}
      {!showInactive && featuredVideos.length > 0 && (
        <section className="px-6 py-14 lg:px-12 bg-stone-50 border-b border-stone-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                    <Play className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900">Featured Videos</h2>
                    <div className="h-1 w-12 bg-orange-500 rounded-full mt-1" />
                  </div>
                </div>
                <Link
                  href="/videos"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {featuredVideos.map((video, idx) => (
                  <motion.div
                    key={video.videoId}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={`/videos/${video.videoId}`}
                      className="group block bg-white rounded-2xl border border-stone-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all overflow-hidden"
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-stone-900 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={video.thumbnailSrc}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-orange-600 fill-orange-600 ml-0.5" />
                          </div>
                        </div>
                        {video.duration && (
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-white text-xs font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {parseDuration(video.duration)}
                          </div>
                        )}
                        {video.tags.length > 0 && (
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-0.5 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                              {video.tags[0]}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="p-4">
                        <h3 className="font-semibold text-stone-800 group-hover:text-orange-700 transition-colors line-clamp-2 text-sm mb-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-stone-400">
                          <span className="font-medium text-stone-500">{video.publisher}</span>
                          {video.publishDate && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(video.publishDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 sm:hidden">
                <Link
                  href="/videos"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  View All Videos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Articles */}
      {!showInactive && featuredArticles.length > 0 && (
        <section className="px-6 py-14 lg:px-12 bg-white border-b border-stone-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900">Latest Articles</h2>
                    <div className="h-1 w-12 bg-orange-500 rounded-full mt-1" />
                  </div>
                </div>
                <Link
                  href="/articles"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {featuredArticles.map((article, idx) => (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={`/articles/${article.slug}`}
                      className="group flex flex-col bg-white p-6 rounded-2xl border border-stone-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all h-full"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-stone-900 group-hover:text-orange-700 transition-colors mb-3 leading-snug">
                          {article.title}
                        </h3>
                        {article.description && (
                          <p className="text-sm text-stone-500 line-clamp-3 leading-relaxed mb-4">
                            {article.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-stone-50 mt-auto">
                        <div className="flex items-center gap-2">
                          {article.author && (
                            <span className="text-xs font-medium text-stone-600">{article.author}</span>
                          )}
                          {article.date && (
                            <>
                              <span className="text-stone-300 text-xs">·</span>
                              <span className="text-xs text-stone-400 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </>
                          )}
                        </div>
                        <span className="text-xs font-bold text-orange-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 sm:hidden">
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  View All Articles <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Resource Categories Grid */}
      <div className="px-6 py-12 lg:px-12 max-w-7xl mx-auto flex-1 w-full">
        {!showInactive && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-900">Hinduism Resources</h1>
                <div className="h-1 w-12 bg-orange-500 rounded-full mt-1" />
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {filteredData.length > 0 ? (
            filteredData.map((category) => (
              <motion.section
                key={category.id}
                id={category.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-20 last:mb-0 scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                    {categoryIcons[category.id] || <BookOpen className="w-6 h-6" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900">{category.title}</h2>
                    <div className="h-1 w-12 bg-orange-500 rounded-full mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {category.links.map((link: any, linkIdx: number) => (
                    <motion.a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: linkIdx * 0.05 }}
                      className="group relative bg-white p-5 rounded-2xl border border-stone-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-stone-800 group-hover:text-orange-700 transition-colors line-clamp-2">
                            {link.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-orange-400 transition-colors flex-shrink-0 mt-1" />
                        </div>
                        {link.tags && link.tags.length > 0 && (
                          <div className="flex gap-2 flex-wrap mb-2">
                            {link.tags.map((tag: string) => (
                              <span key={tag} className="px-2 py-0.5 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {link.description && (
                          <p className="text-sm text-stone-500 mb-3 line-clamp-2 group-hover:text-stone-600 transition-colors">
                            {link.description}
                          </p>
                        )}
                        <p className="text-[10px] text-stone-400 truncate font-mono">
                          {new URL(link.url).hostname}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        Visit Site <ChevronRight className="w-3 h-3" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.section>
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-stone-50 rounded-full mb-6">
                <Search className="w-8 h-8 text-stone-300" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">No resources found</h3>
              <p className="text-stone-500">Try adjusting your search terms or browse categories.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
