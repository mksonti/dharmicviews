'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
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
  Mail,
  ChevronRight,
  Home,
  FileText,
  Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

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

export default function HomeClient({ initialData }: { initialData: any[] }) {
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
      {/* Hero / Search Section */}
      <section className="relative bg-white border-b border-orange-50 px-6 py-12 lg:py-20 overflow-hidden">
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
                <>Discover the vast wisdom of <span className="text-orange-600">Sanatan Dharma</span>.</>
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

      {/* Content Sections */}
      <div className="px-6 py-12 lg:px-12 max-w-7xl mx-auto flex-1 w-full">
        <AnimatePresence mode="popLayout">
          {filteredData.length > 0 ? (
            filteredData.map((category, catIdx) => (
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
