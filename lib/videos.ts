import fs from 'fs';
import path from 'path';

const videosFilePath = path.join(process.cwd(), 'content', 'videos.json');

export interface VideoData {
  videoId: string;
  url: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  publishDate: string;
}

export function getAllVideos(): VideoData[] {
  if (!fs.existsSync(videosFilePath)) {
    return [];
  }
  const fileContents = fs.readFileSync(videosFilePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getVideoData(videoId: string): VideoData | undefined {
  const videos = getAllVideos();
  return videos.find(v => v.videoId === videoId);
}
