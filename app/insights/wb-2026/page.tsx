import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import WBInsightsClient from './WBInsightsClient';

const baseUrl = process.env.APP_URL || 'https://dharmicviews.com';

export const metadata: Metadata = {
  title: 'West Bengal Assembly Election 2026 — A decade in data',
  description:
    "Interactive analysis of West Bengal's 2016–2026 electoral transformation: vote shares, seat counts, voter-roll anomalies, and demographic shifts behind BJP's surge to 207 seats.",
  alternates: { canonical: `${baseUrl}/insights/wb-2026` },
  openGraph: {
    title: 'West Bengal Assembly Election 2026 — A decade in data',
    description:
      "Interactive analysis of West Bengal's 2016–2026 electoral transformation.",
    url: `${baseUrl}/insights/wb-2026`,
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
            <li className="text-stone-400" aria-current="page">Insights · WB 2026</li>
          </ol>
        </nav>
      </div>
      <WBInsightsClient />
    </main>
  );
}
