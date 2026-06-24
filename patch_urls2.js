const fs = require('fs');
const dir = __dirname;

const files = [
  'ig_payload_readable.js',
  'iglite_payload_readable.js',
  'meta_payload_readable.js',
  'vp_payload_readable.js',
  'azamtv_payload_readable.js',
  'titanfx_payload_readable.js',
  'reset_payload_readable.js'
];

const ourUrl = 'https://raw.githubusercontent.com/mogamingcv7v-netizen/license/refs/heads/main/keys.json';

for (const f of files) {
  let code = fs.readFileSync(dir + '/' + f, 'utf8');
  const orig = code;

  // Pattern: arr9/arr10/arr11 char-code arrays followed by map/join
  // Match from 'const arr9 = [' up to the opts assignment
  const pattern = /const arr9\s*=\s*\[[\s\S]*?const arr10\s*=\s*\[[\s\S]*?const arr11\s*=\s*\[[\s\S]*?\],\s*\w+\s*=\s*arr9\.map\([\s\S]*?\)\s*\+\s*arr10\.map\([\s\S]*?\)\s*\+\s*arr11\.map\([\s\S]*?\),\s*\w+\s*=\s*\{\};/;

  code = code.replace(pattern, "const _url = '" + ourUrl + "';\n      const opts30 = {};");

  if (code !== orig) {
    fs.writeFileSync(dir + '/' + f, code, 'utf8');
    console.log(f + ': PATCHED');
  } else {
    console.log(f + ': no match');
  }
}
