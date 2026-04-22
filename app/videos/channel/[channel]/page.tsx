import { getChannels, getVideosByChannelId } from '@/lib/videos';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ChannelVideosClient from '@/components/ChannelVideosClient';

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
  };
}

export default async function ChannelPage({ params }: Props) {
  const { channel } = await params;
  const videos = getVideosByChannelId(channel);

  if (videos.length === 0) {
    notFound();
  }

  const channelName = videos[0].channelName;

  return (
    <main className="py-12 px-6 lg:px-12 bg-white">
      <ChannelVideosClient channelName={channelName} channelId={channel} videos={videos} />
    </main>
  );
}
