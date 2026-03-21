/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { resourceData, ResourceCategory, ResourceLink } from './data';

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

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchQuery) return resourceData;
    
    return resourceData.map(category => ({
      ...category,
      links: category.links.filter(link => 
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.url.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.links.length > 0);
  }, [searchQuery]);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setActiveCategory(id);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = resourceData.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(resourceData[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Dharmic Views Logo" className="w-8 h-8 object-contain" />
          <h1 className="font-serif italic text-lg font-semibold text-orange-900">Dharmic Views</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-orange-50 rounded-full transition-colors"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-orange-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full flex flex-col p-6">
            <div className="hidden lg:flex items-center gap-3 mb-10">
              <img src="/logo.png" alt="Dharmic Views Logo" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="font-serif italic text-xl font-bold text-orange-900 leading-tight">Dharmic Views</h1>
                <p className="text-[10px] uppercase tracking-widest text-orange-600 font-bold">Wisdom & Culture</p>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveCategory(null);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${!activeCategory ? 'bg-orange-600 text-white shadow-md shadow-orange-100' : 'text-stone-500 hover:bg-orange-50 hover:text-orange-700'}`}
              >
                <Home className="w-5 h-5" />
                Overview
              </button>
              
              <div className="py-4">
                <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-2">Categories</p>
                {resourceData.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeCategory === category.id ? 'bg-orange-600 text-white shadow-md shadow-orange-100' : 'text-stone-500 hover:bg-orange-50 hover:text-orange-700'}`}
                  >
                    {categoryIcons[category.id] || <ChevronRight className="w-4 h-4" />}
                    <span className="truncate">{category.title}</span>
                  </button>
                ))}
              </div>
            </nav>

            <div className="mt-auto pt-6 border-t border-orange-50">
              <a 
                href="mailto:dharmicviews@gmail.com"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-black transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </a>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
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
                  Discover the vast wisdom of <span className="text-orange-600">Sanatan Dharma</span>.
                </h2>
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
              </motion.div>
            </div>
          </section>

          {/* Content Sections */}
          <div className="px-6 py-12 lg:px-12 max-w-7xl mx-auto">
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
                      {category.links.map((link, linkIdx) => (
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

          {/* Footer */}
          <footer className="bg-stone-900 text-white px-6 py-16 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 lg:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/logo.png" alt="Dharmic Views Logo" className="w-10 h-10 object-contain" />
                    <h2 className="font-serif italic text-2xl font-bold">Dharmic Views</h2>
                  </div>
                  <p className="text-stone-400 text-lg max-w-md mb-8">
                    Preserving and promoting the rich heritage of Vedic wisdom for the global community.
                  </p>
                  <div className="flex items-center gap-4">
                    <a href="mailto:dharmicviews@gmail.com" className="p-3 bg-stone-800 rounded-full hover:bg-orange-600 transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-orange-500">Quick Links</h4>
                  <ul className="space-y-4 text-stone-400">
                    <li><button onClick={() => scrollToCategory('vedic-wisdom')} className="hover:text-white transition-colors">Vedic Wisdom</button></li>
                    <li><button onClick={() => scrollToCategory('sustaining-vedic-culture')} className="hover:text-white transition-colors">Culture & Festivals</button></li>
                    <li><button onClick={() => scrollToCategory('organizations')} className="hover:text-white transition-colors">Organizations</button></li>
                    <li><button onClick={() => scrollToCategory('news-magazines')} className="hover:text-white transition-colors">News & Media</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-orange-500">Future Phases</h4>
                  <ul className="space-y-4 text-stone-400">
                    <li className="flex items-center gap-2 opacity-50"><div className="w-1 h-1 bg-orange-500 rounded-full" /> Phase 2: Priest Services</li>
                    <li className="flex items-center gap-2 opacity-50"><div className="w-1 h-1 bg-orange-500 rounded-full" /> Phase 3: Temple Locations</li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-sm">
                <p>© {new Date().getFullYear()} Dharmic Views. All rights reserved.</p>
                <p>Designed for Sanatan Dharma Preservation.</p>
              </div>
            </div>
          </footer>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}</style>
    </div>
  );
}
