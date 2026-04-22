import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');

export function getSortedArticlesData() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.filter(fileName => fileName.endsWith('.md')).map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as { title: string; date: string; description: string; author: string; heroImage: string; featured?: boolean; draft?: boolean }),
    };
  }).filter(a => !a.draft);

  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getFeaturedArticles(limit = 3) {
  const all = getSortedArticlesData();
  const featured = all.filter(a => a.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  const rest = all.filter(a => !a.featured);
  return [...featured, ...rest].slice(0, limit);
}

export function getAllArticleSlugs() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(articlesDirectory).filter(f => f.endsWith('.md'));
  return fileNames
    .filter(fileName => {
      const fileContents = fs.readFileSync(path.join(articlesDirectory, fileName), 'utf8');
      const { data } = matter(fileContents);
      return !data.draft;
    })
    .map((fileName) => ({ params: { slug: fileName.replace(/\.md$/, '') } }));
}

export function getArticleData(slug: string) {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as { title: string; date: string; description: string; author: string; heroImage: string }),
  };
}
