const fs = require('fs');
const f = fs.readdirSync('.').find(x => x.includes('scraper_payload_readable'));
let c = fs.readFileSync(f, 'utf8');

// Find the checkLicense function's URL construction
const start = c.indexOf('const _H = [');
if (start === -1) { console.log('Not found'); process.exit(1); }

// Find the end - pattern: ].map(item4 => String.fromCharCode(item4)).join('');
// But since there are 3 blocks joined with +, find the final join
let depth = 0;
let inString = false;
let end = -1;
for (let i = start; i < c.length; i++) {
    const ch = c[i];
    if (ch === "'" || ch === '"') {
        if (i > 0 && c[i-1] !== '\\') inString = !inString;
    }
    if (!inString) {
        if (ch === '[') depth++;
        else if (ch === ']') depth--;
        else if (ch === ';' && depth === 0) { end = i; break; }
    }
}

if (end === -1) { console.log('Could not find end'); process.exit(1); }

const oldExpr = c.substring(start, end);
const newUrl = 'https://your-server.com/keys.json';
const replacement = `const _H = '${newUrl}'`;

c = c.replace(oldExpr, replacement);
fs.writeFileSync(f, c);
console.log('Replaced! New URL:', newUrl);
