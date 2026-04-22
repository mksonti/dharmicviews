import { getChannels, getVideosByChannelId } from '@/lib/videos';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ChannelVideosClient from '@/components/ChannelVideosClient';

const baseUrl = process.env.APP_URL || 'https://dharmicviews.com';

interface Props {
  params: Promise<{ channel: string }>;
}

export async function generateStaticParams() {
  const channels = getChannels();
  return channels.map(({ channelId }) => ({ channel: channelId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { channel } = await params;
  const channels = getChannels();
  const info = channels.find(c => c.channelId === channel);
  const name = info?.channelName ?? channel;
  return {
    title: `${name} Videos`,
    description: `Watch curated videos from ${name} on Vedic wisdom and culture.`,
    alternates: {
      canonical: `${baseUrl}/videos/channel/${channel}`,
    },
    openGraph: {
      title: `${name} Videos`,
      description: `Watch curated videos from ${name} on Vedic wisdom and culture.`,
      url: `${baseUrl}/videos/channel/${channel}`,
      type: 'website',
    },
  };
}

export default async function ChannelPage({ params }: Props) {
  const { channel } = await params;
  const videos = getVideosByChannelId(channel);

  if (videos.length === 0) {
    notFound();
  }

  const channelName = videos[0].channelName;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${channelName} Videos`,
    url: `${baseUrl}/videos/channel/${channel}`,
    itemListElement: videos.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${baseUrl}/videos/${v.videoId}`,
      name: v.title,
    })),
  };

  return (
    <main className="py-12 px-6 lg:px-12 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ChannelVideosClient channelName={channelName} channelId={channel} videos={videos} />
    </main>
  );
}
