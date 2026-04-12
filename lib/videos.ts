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
  tags: string[];
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
