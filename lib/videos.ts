import fs from 'fs';
import path from 'path';

const videosFilePath = path.join(process.cwd(), 'content', 'videos.json');
const thumbnailsDir = path.join(process.cwd(), 'public', 'thumbnails');

export interface VideoData {
  videoId: string;
  url: string;
  title: string;
  description: string;
  duration: string;
  /** The stored thumbnail value from the JSON (may be a placeholder or real URL). */
  thumbnail: string;
  publishDate: string;
  publisher: string;
  channelName: string;
  channelId: string;
  tags: string[];
  featured?: boolean;
  /** Resolved at load time: local file if available, otherwise live YouTube CDN URL. */
  thumbnailSrc: string;
}

/**
 * Returns the best thumbnail src for a video:
 * 1. Local file at public/thumbnails/<videoId>.(jpg|png|webp) if it exists
 * 2. Live YouTube maxresdefault CDN URL derived from the videoId
 */
function resolveThumbnail(videoId: string): string {
  const extensions = ['jpg', 'png', 'webp'];
  for (const ext of extensions) {
    const localPath = path.join(thumbnailsDir, `${videoId}.${ext}`);
    if (fs.existsSync(localPath)) {
      return `/thumbnails/${videoId}.${ext}`;
    }
  }
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function enrichVideo(raw: Omit<VideoData, 'thumbnailSrc'>): VideoData {
  return { ...raw, thumbnailSrc: resolveThumbnail(raw.videoId) };
}

export function getAllVideos(): VideoData[] {
  if (!fs.existsSync(videosFilePath)) {
    return [];
  }
  const fileContents = fs.readFileSync(videosFilePath, 'utf8');
  const raw: Omit<VideoData, 'thumbnailSrc'>[] = JSON.parse(fileContents);
  return raw.map(enrichVideo);
}

export function getVideoData(videoId: string): VideoData | undefined {
  const videos = getAllVideos();
  return videos.find(v => v.videoId === videoId);
}

export interface ChannelInfo {
  channelId: string;
  channelName: string;
}

export function getChannels(): ChannelInfo[] {
  const videos = getAllVideos();
  const seen = new Map<string, string>();
  for (const v of videos) {
    if (v.channelId && !seen.has(v.channelId)) {
      seen.set(v.channelId, v.channelName);
    }
  }
  return Array.from(seen.entries())
    .map(([channelId, channelName]) => ({ channelId, channelName }))
    .sort((a, b) => a.channelName.localeCompare(b.channelName));
}

export function getVideosByChannel(): Record<string, VideoData[]> {
  const videos = getAllVideos();
  const byChannel: Record<string, VideoData[]> = {};
  for (const video of videos) {
    const key = video.channelId || 'other';
    if (!byChannel[key]) byChannel[key] = [];
    byChannel[key].push(video);
  }
  for (const key of Object.keys(byChannel)) {
    byChannel[key].sort((a, b) => a.title.localeCompare(b.title));
  }
  return byChannel;
}

export function getVideosByChannelId(channelId: string): VideoData[] {
  return getAllVideos()
    .filter(v => v.channelId === channelId)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getFeaturedVideos(limit = 3): VideoData[] {
  const all = getAllVideos();
  const featured = all.filter(v => v.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  const rest = all.filter(v => !v.featured);
  return [...featured, ...rest].slice(0, limit);
}
