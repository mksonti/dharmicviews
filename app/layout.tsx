import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  robots: 'index, follow',
  openGraph: {
    title: 'Dharmic Views',
    description: 'A curated collection of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.',
    url: SITE_URL,
    siteName: 'Dharmic Views',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
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
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
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
        '@id': `${SITE_URL}/#organization`,
        name: 'Dharmic Views',
        url: SITE_URL,
        email: 'dharmicviews@gmail.com',
        description: 'A curated collection of digital resources, scriptures, and organizations dedicated to Vedic culture and heritage.',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
        },
        founder: {
          '@id': `${SITE_URL}/#mohan-sonti`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Dharmic Views',
        inLanguage: 'en',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#mohan-sonti`,
        name: 'Mohan Sonti',
        jobTitle: 'Author & Public Speaker',
        alumniOf: 'Indian Institute of Technology Bombay',
        description: 'Certified Yoga teacher and public speaker on Dharmic scriptures, Hindu philosophy, and the Indian-American diaspora.',
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
