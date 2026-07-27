import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const videoArticlesDirectory = path.join(process.cwd(), 'content', 'video_articles');

export interface VideoArticleData {
  videoId: string;
  content: string;
  readingTime: number;
  title: string;
  date: string;
  description: string;
  author: string;
  category?: string;
}

export function getVideoArticleData(videoId: string): VideoArticleData | undefined {
  const fullPath = path.join(videoArticlesDirectory, `${videoId}.md`);
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    videoId,
    content: matterResult.content,
    readingTime: calcReadingTime(matterResult.content),
    ...(matterResult.data as { title: string; date: string; description: string; author: string; category?: string }),
  };
}

export function getAllVideoArticles(): VideoArticleData[] {
  if (!fs.existsSync(videoArticlesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(videoArticlesDirectory).filter(f => f.endsWith('.md'));
  return fileNames.map((fileName) => getVideoArticleData(fileName.replace(/\.md$/, ''))!);
}
