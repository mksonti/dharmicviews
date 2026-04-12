'use client';

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { resourceData } from '@/lib/data';

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

import Footer from './Footer';

export default function Navigation({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

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
  }, [isHomePage]);

  const handleCategoryClick = (id: string) => {
    if (isHomePage) {
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
    }
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-orange-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsSidebarOpen(false)}>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-serif italic font-bold text-xl">DV</div>
              <div>
                <h1 className="font-serif italic text-xl font-bold text-orange-900 leading-tight">Dharmic Views</h1>
                <p className="text-[10px] uppercase tracking-widest text-orange-600 font-bold">Wisdom & Culture</p>
              </div>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden ml-auto p-2 hover:bg-orange-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
            <Link 
              href="/"
              onClick={() => {
                if (isHomePage) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isHomePage && !activeCategory ? 'bg-orange-600 text-white shadow-md shadow-orange-100' : 'text-stone-500 hover:bg-orange-50 hover:text-orange-700'}`}
            >
              <Home className="w-5 h-5" />
              Overview
            </Link>
            
            <Link 
              href="/articles" 
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname.startsWith('/articles') ? 'bg-orange-600 text-white shadow-md shadow-orange-100' : 'text-stone-500 hover:bg-orange-50 hover:text-orange-700'}`}
            >
              <FileText className="w-5 h-5" />
              Articles
            </Link>

            <Link 
              href="/videos" 
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname.startsWith('/videos') ? 'bg-orange-600 text-white shadow-md shadow-orange-100' : 'text-stone-500 hover:bg-orange-50 hover:text-orange-700'}`}
            >
              <Video className="w-5 h-5" />
              Videos
            </Link>
            
            <div className="py-4">
              <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-2">Categories</p>
              {resourceData.map((category) => (
                isHomePage ? (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeCategory === category.id ? 'bg-orange-600 text-white shadow-md shadow-orange-100' : 'text-stone-500 hover:bg-orange-50 hover:text-orange-700'}`}
                  >
                    {categoryIcons[category.id] || <ChevronRight className="w-4 h-4" />}
                    <span className="truncate">{category.title}</span>
                  </button>
                ) : (
                  <Link
                    key={category.id}
                    href={`/#${category.id}`}
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-stone-500 hover:bg-orange-50 hover:text-orange-700"
                  >
                    {categoryIcons[category.id] || <ChevronRight className="w-4 h-4" />}
                    <span className="truncate">{category.title}</span>
                  </Link>
                )
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
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-orange-100 px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-serif italic font-bold text-sm">DV</div>
            <h1 className="font-serif italic text-lg font-semibold text-orange-900">Dharmic Views</h1>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-orange-50 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1">
          {children}
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
