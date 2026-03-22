const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

async function checkUrl(urlStr) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 7000); // 7 second timeout
    
    // Using a common User-Agent to avoid 403 Forbidden errors from strict hosts
    const response = await fetch(urlStr, { 
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    clearTimeout(id);
    
    // Accept standard success or redirect codes
    // Also treat 401 (Unauthorized) and 403 (Forbidden) as active,
    // because it means the server is online and actively refusing access
    if ((response.status >= 200 && response.status < 400) || 
        response.status === 401 || response.status === 403 || response.status === 405) {
      return true;
    }
    
    return false;
  } catch (err) {
    // Treat any network-level failure or timeout as inactive
    return false;
  }
}

async function main() {
  const tasks = [];
  
  // Find all URLs in the data.ts file
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const urlMatch = line.match(/url:\s*"([^"]+)"/);
    if (urlMatch) {
      tasks.push({ index: i, url: urlMatch[1] });
    }
  }

  console.log(`Analyzing ${tasks.length} URLs...`);
  
  // Process them in chunks to avoid overwhelming the network
  const concurrency = 15;
  let activeCount = 0;
  let inactiveCount = 0;
  
  for (let i = 0; i < tasks.length; i += concurrency) {
    const chunk = tasks.slice(i, i + concurrency);
    
    await Promise.all(chunk.map(async (task) => {
      const isActive = await checkUrl(task.url);
      
      if (isActive) activeCount++;
      else inactiveCount++;
      
      console.log(`[${task.index}] ${isActive ? 'ACTIVE' : 'INACTIVE'} - ${task.url}`);
      
      let line = lines[task.index];
      
      // Strip out any existing isActive boolean so we avoid duplicates
      line = line.replace(/,\s*isActive:\s*(true|false)/g, '');
      
      // Append the fresh isActive flag directly after the URL string
      line = line.replace(/(url:\s*"[^"]+")/, `$1, isActive: ${isActive}`);
      
      lines[task.index] = line;
    }));
  }

  fs.writeFileSync(filePath, lines.join('\n'));
  console.log(`\nSuccessfully updated src/data.ts`);
  console.log(`Summary: ${activeCount} Active, ${inactiveCount} Inactive.`);
}

main();
