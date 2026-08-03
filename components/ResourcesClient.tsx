'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
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
  Loader2,
  Flower2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const categoryIcons: Record<string, React.ReactNode> = {
  'vedic-wisdom': <BookOpen className="w-5 h-5" />,
  'international-vedic': <Globe className="w-5 h-5" />,
  'vedic-intellectuals-indian': <Users className="w-5 h-5" />,
  'vedic-intellectuals-western': <Users className="w-5 h-5" />,
  'vedic-universities': <GraduationCap className="w-5 h-5" />,
  'vedic-townships': <MapPin className="w-5 h-5" />,
  'vedic-yoga': <Flower2 className="w-5 h-5" />,
  'sustaining-vedic-culture': <Heart className="w-5 h-5" />,
  'communities': <Users className="w-5 h-5" />,
  'political-ideologues': <Users className="w-5 h-5" />,
  'organizations': <Users className="w-5 h-5" />,
  'news-magazines': <Newspaper className="w-5 h-5" />,
  'opinions-articles': <MessageSquare className="w-5 h-5" />,
  'threats-challenges': <AlertTriangle className="w-5 h-5" />,
  'hindu-holocaust': <History className="w-5 h-5" />,
};

const categoryIconsSmall: Record<string, React.ReactNode> = {
  'vedic-wisdom': <BookOpen className="w-3.5 h-3.5" />,
  'international-vedic': <Globe className="w-3.5 h-3.5" />,
  'vedic-intellectuals-indian': <Users className="w-3.5 h-3.5" />,
  'vedic-intellectuals-western': <Users className="w-3.5 h-3.5" />,
  'vedic-universities': <GraduationCap className="w-3.5 h-3.5" />,
  'vedic-townships': <MapPin className="w-3.5 h-3.5" />,
  'vedic-yoga': <Flower2 className="w-3.5 h-3.5" />,
  'sustaining-vedic-culture': <Heart className="w-3.5 h-3.5" />,
  'communities': <Users className="w-3.5 h-3.5" />,
  'political-ideologues': <Users className="w-3.5 h-3.5" />,
  'organizations': <Users className="w-3.5 h-3.5" />,
  'news-magazines': <Newspaper className="w-3.5 h-3.5" />,
  'opinions-articles': <MessageSquare className="w-3.5 h-3.5" />,
  'threats-challenges': <AlertTriangle className="w-3.5 h-3.5" />,
  'hindu-holocaust': <History className="w-3.5 h-3.5" />,
};

interface ResourceLink {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
}

interface CategorySummary {
  id: string;
  title: string;
  count: number;
  preview: ResourceLink[];
}

interface ResourcesClientProps {
  categories: CategorySummary[];
}

const LINKS_PREVIEW_COUNT = 6;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

async function fetchCategoryLinks(id: string): Promise<ResourceLink[]> {
  const res = await fetch(`${BASE_PATH}/data/resources/${id}.json`);
  if (!res.ok) throw new Error(`Failed to load resources for ${id}`);
  return res.json();
}

export default function ResourcesClient({ categories }: ResourcesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [fullLinks, setFullLinks] = useState<Record<string, ResourceLink[]>>({});
  const [loadingCategories, setLoadingCategories] = useState<Set<string>>(new Set());
  const [searchDataReady, setSearchDataReady] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const fetchedAllRef = useRef(false);

  const isSearching = searchQuery.trim().length > 0;

  const loadCategory = useCallback(async (id: string) => {
    setLoadingCategories(prev => new Set(prev).add(id));
    try {
      const links = await fetchCategoryLinks(id);
      setFullLinks(prev => ({ ...prev, [id]: links }));
    } finally {
      setLoadingCategories(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, []);

  const loadAllForSearch = useCallback(async () => {
    if (fetchedAllRef.current) return;
    fetchedAllRef.current = true;
    setSearchLoading(true);
    try {
      const missing = categories.filter(c => !fullLinks[c.id]);
      const results = await Promise.all(missing.map(c => fetchCategoryLinks(c.id)));
      setFullLinks(prev => {
        const next = { ...prev };
        missing.forEach((c, i) => { next[c.id] = results[i]; });
        return next;
      });
      setSearchDataReady(true);
    } finally {
      setSearchLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  useEffect(() => {
    if (isSearching && !fetchedAllRef.current) {
      loadAllForSearch();
    }
  }, [isSearching, loadAllForSearch]);

  const toggleExpanded = (id: string) => {
    const willExpand = !expandedCategories.has(id);
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (willExpand && !fullLinks[id]) {
      loadCategory(id);
    }
  };

  const searchResults = useMemo(() => {
    if (!isSearching || !searchDataReady) return null;
    const q = searchQuery.toLowerCase();
    return categories
      .map(cat => {
        const links = fullLinks[cat.id] || cat.preview;
        return {
          ...cat,
          links: links.filter(l =>
            l.title.toLowerCase().includes(q) || l.url.toLowerCase().includes(q)
          ),
        };
      })
      .filter(cat => cat.links.length > 0);
  }, [isSearching, searchDataReady, searchQuery, categories, fullLinks]);

  const totalResults = useMemo(
    () => (searchResults ?? []).reduce((sum, c) => sum + c.links.length, 0),
    [searchResults]
  );

  useEffect(() => {
    if (isSearching) return;

    const handleScroll = () => {
      const sections = categories.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categories[i].id);
          return;
        }
      }
      setActiveCategory(null);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSearching, categories]);

  const handleChipClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const headerOffset = 140;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    setActiveCategory(id);
  };

  const displayCategories = isSearching
    ? (searchResults ?? [])
    : categories.map(cat => ({
        ...cat,
        links: expandedCategories.has(cat.id) && fullLinks[cat.id] ? fullLinks[cat.id] : cat.preview,
      }));

  return (
    <>
      {/* Header */}
      <section className="relative bg-white border-b border-orange-50 px-6 py-14 lg:py-16 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-orange-50/50 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif italic text-4xl lg:text-6xl text-orange-950 mb-6 leading-tight">
              Hinduism <span className="text-orange-600">Resources</span>.
            </h1>
            <p className="text-stone-500 text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed">
              A curated collection of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.
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
            {isSearching && (
              <p className="mt-3 text-sm text-stone-500 flex items-center gap-2">
                {searchLoading || !searchDataReady ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Searching all resources…
                  </>
                ) : totalResults > 0 ? (
                  `${totalResults} resource${totalResults === 1 ? '' : 's'} found across ${displayCategories.length} categor${displayCategories.length === 1 ? 'y' : 'ies'}`
                ) : (
                  'No resources found'
                )}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Category Chip Nav */}
      {!isSearching && categories.length > 1 && (
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-orange-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 overflow-x-auto">
            <div className="flex items-center gap-2 w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleChipClick(category.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    activeCategory === category.id
                      ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-orange-300 hover:text-orange-700'
                  }`}
                >
                  <span className={activeCategory === category.id ? 'text-white' : 'text-orange-600'}>
                    {categoryIconsSmall[category.id] || <BookOpen className="w-3.5 h-3.5" />}
                  </span>
                  {category.title}
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      activeCategory === category.id ? 'bg-white/20' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Resource Categories Grid */}
      <div className="px-6 py-12 lg:px-12 max-w-7xl mx-auto flex-1 w-full">
        <AnimatePresence mode="popLayout">
          {isSearching && !searchDataReady ? (
            <div className="py-20 text-center">
              <Loader2 className="w-8 h-8 text-orange-400 animate-spin mx-auto mb-4" />
              <p className="text-stone-500">Loading the full resource directory to search…</p>
            </div>
          ) : displayCategories.length > 0 ? (
            displayCategories.map((category) => {
              const isExpanded = isSearching || expandedCategories.has(category.id);
              const isLoadingMore = loadingCategories.has(category.id);
              const remaining = isSearching ? 0 : category.count - category.links.length;

              return (
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
                    {category.links.map((link: ResourceLink, linkIdx: number) => (
                      <motion.a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="nofollow noopener"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: linkIdx * 0.05 }}
                        className="group relative bg-white p-5 rounded-2xl border border-stone-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-base text-stone-900 group-hover:text-orange-700 transition-colors line-clamp-2">
                              {link.title}
                            </h3>
                            <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-orange-400 transition-colors flex-shrink-0 mt-1" />
                          </div>
                          <p className="text-[11px] text-stone-400 truncate font-mono mb-2">
                            {new URL(link.url).hostname}
                          </p>
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
                            <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed group-hover:text-stone-700 transition-colors">
                              {link.description}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-orange-600 opacity-40 group-hover:opacity-100 transition-opacity">
                          Visit Site <ChevronRight className="w-3 h-3" />
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {!isSearching && remaining > 0 && (
                    <button
                      onClick={() => toggleExpanded(category.id)}
                      disabled={isLoadingMore}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors disabled:opacity-60"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
                        </>
                      ) : (
                        <>
                          Show all {category.count} <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                  {!isSearching && isExpanded && category.count > LINKS_PREVIEW_COUNT && !isLoadingMore && (
                    <button
                      onClick={() => toggleExpanded(category.id)}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-orange-700 transition-colors"
                    >
                      Show less
                    </button>
                  )}
                </motion.section>
              );
            })
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
