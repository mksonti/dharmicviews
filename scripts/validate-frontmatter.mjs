import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const articlesDir = path.join(process.cwd(), 'content', 'articles');

const frontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  description: z.string().min(1, "Description is required"),
  author: z.string().min(1, "Author is required"),
  heroImage: z.string().url("Hero image must be a valid URL").optional()
});

function validateArticles() {
  if (!fs.existsSync(articlesDir)) {
    console.log('No articles directory found. Skipping validation.');
    return;
  }

  const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md'));
  let hasErrors = false;

  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    try {
      frontmatterSchema.parse(data);
      console.log(`\u2705 Validated ${file}`);
    } catch (error) {
      console.error(`\u274C Validation failed for ${file}:`);
      error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error('Frontmatter validation failed. Build aborted.');
    process.exit(1);
  } else {
    console.log('All articles validated successfully.');
  }
}

validateArticles();
