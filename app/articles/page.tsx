import { getSortedArticlesData } from '@/lib/articles';
import { Metadata } from 'next';
import ArticlesClient from '@/components/ArticlesClient';

export const metadata: Metadata = {
  title: 'Articles on Dharmic Living & Hindu Identity',
  description: 'Essays on Vedic wisdom, Hindu political identity, and dharmic principles for the diaspora — by Mohan Sonti.',
};

export default function ArticlesPage() {
  const articles = getSortedArticlesData();

  return (
    <main className="py-12 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <ArticlesClient articles={articles} />
      </div>
    </main>
  );
}
