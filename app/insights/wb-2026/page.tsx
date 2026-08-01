import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import WBInsightsClient from './WBInsightsClient';
import { SITE_URL } from '@/lib/site';

const baseUrl = SITE_URL;

export const metadata: Metadata = {
  title: 'TN & WB 2026: Bizarre, shocking data from the polls',
  description:
    "Interactive analysis of West Bengal's 2016–2026 transformation alongside Tamil Nadu's 2026 anomalies — vote shares, seat counts, voter-roll inflation, IUML seat-efficiency, and the demographic forces behind both stories.",
  alternates: { canonical: `${baseUrl}/insights/wb-2026` },
  openGraph: {
    title: 'TN & WB 2026: Bizarre, shocking data from the polls',
    description: "Interactive analysis of WB's decade-long realignment and TN's 2026 anomalies.",
    url: `${baseUrl}/insights/wb-2026`,
    siteName: 'Dharmic Views',
    images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Dharmic Views' }],
    type: 'article',
  },
};

export default function Page() {
  return (
    <main>
      <div className="px-6 lg:px-12 pt-6 max-w-6xl mx-auto">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-stone-500">
            <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-stone-300" /></li>
            <li><Link href="/insights" className="hover:text-orange-600 transition-colors">Insights</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-stone-300" /></li>
            <li className="text-stone-400" aria-current="page">TN &amp; WB 2026</li>
          </ol>
        </nav>
      </div>
      <WBInsightsClient />
    </main>
  );
}
