const fs = require('fs');

const filePath = 'd:\\dharmicviews\\src\\data.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Update interface if needed
if (!content.includes('tags?: string[]')) {
  content = content.replace(
    /isActive\?:\s*boolean;/,
    'isActive?: boolean;\n  tags?: string[];'
  );
}

const lines = content.split('\n');

const spamKeywords = [
  'domain may be for sale', 'buy this domain', 'togel', 'jablay', 'casino', 
  'slot', 'betting', 'poker', 'gambling', 'related links', 'what you need, when you need it',
  'find the best information', 'this website is for sale'
];

let flaggedCount = 0;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  if (line.includes('description:')) {
    const descMatch = line.match(/description:\s*"([^"]+)"/);
    if (descMatch) {
      const desc = descMatch[1].toLowerCase();
      
      const isSpam = spamKeywords.some(kw => desc.includes(kw));
      
      if (isSpam) {
        // Tag as spam/squatter
        let tag = desc.includes('togel') || desc.includes('jablay') || desc.includes('casino') || desc.includes('slot') 
          ? 'gambling' 
          : 'squatted';
        
        // Ensure we don't duplicate tags
        if (!line.includes('tags:')) {
          line = line.replace(/(description:\s*"[^"]+")/, `$1, tags: ["${tag}"]`);
        }
        
        // Mark as inactive
        if (line.includes('isActive: true')) {
          line = line.replace('isActive: true', 'isActive: false');
          flaggedCount++;
        }
        
        lines[i] = line;
      }
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log(`Flagged ${flaggedCount} domains as inactive spam/squatters.`);
