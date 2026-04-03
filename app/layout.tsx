import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Dharmic Views',
    template: '%s | Dharmic Views',
  },
  description: 'A curated collection of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.',
  openGraph: {
    title: 'Dharmic Views',
    description: 'A curated collection of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.',
    url: process.env.APP_URL || 'https://dharmicviews.com',
    siteName: 'Dharmic Views',
    images: [
      {
        url: 'https://picsum.photos/seed/dharmicviews/1200/630',
        width: 1200,
        height: 630,
        alt: 'Dharmic Views',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dharmic Views',
    description: 'A curated collection of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.',
    images: ['https://picsum.photos/seed/dharmicviews/1200/630'],
  },
  alternates: {
    canonical: process.env.APP_URL || 'https://dharmicviews.com',
    types: {
      'application/rss+xml': `${process.env.APP_URL || 'https://dharmicviews.com'}/feed.xml`,
    },
  },
};

import Navigation from '@/components/Navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${process.env.APP_URL || 'https://dharmicviews.com'}#organization`,
        name: 'Dharmic Views',
        url: process.env.APP_URL || 'https://dharmicviews.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://picsum.photos/seed/dharmicviews-logo/512/512',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${process.env.APP_URL || 'https://dharmicviews.com'}#website`,
        url: process.env.APP_URL || 'https://dharmicviews.com',
        name: 'Dharmic Views',
        publisher: {
          '@id': `${process.env.APP_URL || 'https://dharmicviews.com'}#organization`,
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Navigation>
          {children}
        </Navigation>
      </body>
    </html>
  );
}
