'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpDown } from 'lucide-react';

interface ArticleData {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  heroImage?: string;
}

type SortKey = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc',  label: 'Oldest first' },
  { value: 'title-asc', label: 'Title A → Z' },
  { value: 'title-desc', label: 'Title Z → A' },
];

export default function ArticlesClient({ articles }: { articles: ArticleData[] }) {
  const [sort, setSort] = useState<SortKey>('date-desc');

  const sorted = useMemo(() => {
    return [...articles].sort((a, b) => {
      switch (sort) {
        case 'date-desc': return b.date.localeCompare(a.date);
        case 'date-asc':  return a.date.localeCompare(b.date);
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
      }
    });
  }, [articles, sort]);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif italic text-4xl lg:text-5xl text-orange-950">Articles</h1>
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

      <div className="grid gap-8">
        {sorted.map(({ slug, date, title, description, heroImage }) => (
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
              <p className="text-sm text-stone-500 mb-2">
                {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <Link href={`/articles/${slug}`}>
                <h2 className="text-2xl font-bold text-stone-900 mb-3 hover:text-orange-600 transition-colors">{title}</h2>
              </Link>
              <p className="text-stone-600 mb-4">{description}</p>
              <Link href={`/articles/${slug}`} className="text-orange-600 font-medium hover:text-orange-700">
                Read more &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
