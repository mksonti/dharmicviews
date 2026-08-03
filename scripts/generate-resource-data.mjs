import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'lib', 'data.ts');
const OUT_DIR = path.join(process.cwd(), 'public', 'data', 'resources');
const PREVIEW_COUNT = 6;

function extractArray(raw, exportName) {
  const marker = `export const ${exportName}`;
  const idx = raw.indexOf(marker);
  if (idx === -1) throw new Error(`Could not find export ${exportName} in ${DATA_PATH}`);
  const eqIdx = raw.indexOf('=', idx);
  const arrStart = raw.indexOf('[', eqIdx);
  let depth = 0, end = -1, inString = null;
  for (let i = arrStart; i < raw.length; i++) {
    const ch = raw[i], prev = raw[i - 1];
    if (inString) { if (ch === inString && prev !== '\\') inString = null; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { inString = ch; continue; }
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end === -1) throw new Error(`Could not find matching bracket for ${exportName}`);
  const arrText = raw.slice(arrStart, end + 1);
  const fn = new Function(`return ${arrText};`);
  return fn();
}

const raw = fs.readFileSync(DATA_PATH, 'utf8');
const resourceData = extractArray(raw, 'resourceData');

fs.mkdirSync(OUT_DIR, { recursive: true });

const index = [];
for (const category of resourceData) {
  fs.writeFileSync(
    path.join(OUT_DIR, `${category.id}.json`),
    JSON.stringify(category.links)
  );
  index.push({
    id: category.id,
    title: category.title,
    count: category.links.length,
    preview: category.links.slice(0, PREVIEW_COUNT),
  });
}

fs.writeFileSync(path.join(OUT_DIR, 'index.json'), JSON.stringify(index));

console.log(`Generated ${resourceData.length} category files + index.json in public/data/resources/`);
