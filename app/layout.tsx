import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'https://dharmicviews.com'),
  title: {
    default: 'Dharmic Views',
    template: '%s | Dharmic Views',
  },
  description: 'A curated collection of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Dharmic Views',
    description: 'A curated collection of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.',
    url: process.env.APP_URL || 'https://dharmicviews.com',
    siteName: 'Dharmic Views',
    images: [
      {
        url: `${process.env.APP_URL || 'https://dharmicviews.com'}/logo.png`,
        width: 512,
        height: 512,
        alt: 'Dharmic Views Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dharmic Views',
    description: 'A curated collection of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.',
    images: [`${process.env.APP_URL || 'https://dharmicviews.com'}/logo.png`],
  },
  alternates: {
    canonical: process.env.APP_URL || 'https://dharmicviews.com',
    types: {
      'application/rss+xml': `${process.env.APP_URL || 'https://dharmicviews.com'}/feed.xml`,
    },
  },
};

import Navigation from '@/components/Navigation';
import { getChannels } from '@/lib/videos';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const videoChannels = getChannels();
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
          url: `${process.env.APP_URL || 'https://dharmicviews.com'}/logo.png`,
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M2BQ2XGPQ9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M2BQ2XGPQ9');
          `}
        </Script>
        <Navigation videoChannels={videoChannels}>
          {children}
        </Navigation>
      </body>
    </html>
  );
}
