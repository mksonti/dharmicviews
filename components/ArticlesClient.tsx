'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpDown } from 'lucide-react';

interface ArticleData {
  slug: string;
  href: string;
  title: string;
  date: string;
  description: string;
  author: string;
  heroImage?: string;
  readingTime?: number;
  category?: string;
}

type SortKey = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc',  label: 'Oldest first' },
  { value: 'title-asc', label: 'Title A → Z' },
  { value: 'title-desc', label: 'Title Z → A' },
];

const CATEGORIES = ['All', 'Videos', 'Ādhyatmik', 'Cultural'] as const;
type Category = typeof CATEGORIES[number];

export default function ArticlesClient({ articles }: { articles: ArticleData[] }) {
  const [sort, setSort] = useState<SortKey>('date-desc');
  const [category, setCategory] = useState<Category>('All');

  const filtered = useMemo(() => {
    if (category === 'All') return articles;
    return articles.filter(a => a.category === category);
  }, [articles, category]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'date-desc': return b.date.localeCompare(a.date);
        case 'date-asc':  return a.date.localeCompare(b.date);
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
      }
    });
  }, [filtered, sort]);

  return (
    <>
      <div className="flex flex-col gap-4 mb-8 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="font-serif italic text-4xl lg:text-5xl text-orange-950">Articles</h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  category === c
                    ? 'bg-orange-600 border-orange-600 text-white'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-orange-300 hover:text-orange-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <ArrowUpDown className="w-4 h-4 text-stone-400" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="border border-stone-200 rounded-xl px-3 py-2 bg-white text-stone-700 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        {sorted.map(({ slug, href, date, title, description, heroImage, readingTime, category }) => (
          <article key={slug} className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
            {heroImage && (
              <div className="md:w-2/5 relative h-56 md:h-auto shrink-0">
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className={`p-8 flex flex-col justify-center ${heroImage ? 'md:w-3/5' : 'w-full'}`}>
              <div className="flex items-center gap-3 text-sm text-stone-500 mb-2">
                {category && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                    {category}
                  </span>
                )}
                <span>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                {readingTime && (
                  <>
                    <span>&bull;</span>
                    <span>{readingTime} min read</span>
                  </>
                )}
              </div>
              <Link href={href}>
                <h2 className="text-2xl font-bold text-stone-900 mb-3 hover:text-orange-600 transition-colors">{title}</h2>
              </Link>
              <p className="text-stone-600 mb-4">{description}</p>
              <Link href={href} className="text-orange-600 font-medium hover:text-orange-700">
                Read more &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
