'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const scrollToCategory = (id: string) => {
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
    }
  };

  return (
    <footer className="bg-stone-900 text-white px-6 py-16 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" alt="Dharmic Views" width={40} height={40} className="rounded-full" />
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
              <li><Link href="/articles" className="hover:text-white transition-colors">Articles</Link></li>
              <li><Link href="/videos" className="hover:text-white transition-colors">Videos</Link></li>
              <li>
                {isHomePage ? (
                  <button onClick={() => scrollToCategory('vedic-wisdom')} className="hover:text-white transition-colors">Hinduism Resources</button>
                ) : (
                  <Link href="/#vedic-wisdom" className="hover:text-white transition-colors">Hinduism Resources</Link>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-sm">
          <p>© {new Date().getFullYear()} Dharmic Views. All rights reserved.</p>
          <p>Designed for Sanatana Dharma Preservation.</p>
        </div>
      </div>
    </footer>
  );
}
