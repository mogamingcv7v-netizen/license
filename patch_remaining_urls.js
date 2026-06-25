const fs = require('fs');
const base = process.cwd();

const files = [
  'ig_payload_readable.js',
  'iglite_payload_readable.js',
  'meta_payload_readable.js',
  'vp_payload_readable.js', 
  'azamtv_payload_readable.js',
  'titanfx_payload_readable.js'
];

const ourUrl = "'https://raw.githubusercontent.com/mogamingcv7v-netizen/license/refs/heads/main/keys.json'";

// Each file has a different pattern like: arr7/arr8/arr9 or arr8/arr9/arr10 etc.
// The pattern is: const arrX = [...], arrY = [...], arrZ = [...], VAR = arrX.map(...) + arrY.map(...) + arrZ.map(...)

for (const f of files) {
  let code = fs.readFileSync(base + '/' + f, 'utf8');

  // Match the URL construction block: multiple consecutive const arr arrays followed by a map/join to a variable
  // Pattern: const arrXX = [...], arrYY = [...], ..., VAR = arrXX.map(...) + arrYY.map(...) + ...
  code = code.replace(
    /const arr\d+\s*=\s*\[[\s\S]*?\],\s*arr\d+\s*=\s*\[[\s\S]*?\],\s*arr\d+\s*=\s*\[[\s\S]*?\],\s*\w+\s*=\s*arr\d+\.map\([\s\S]*?\)\s*\+\s*arr\d+\.map\([\s\S]*?\)\s*\+\s*arr\d+\.map\([\s\S]*?\)/g,
    (match) => {
      // Extract the variable name being assigned (the URL var)
      const varMatch = match.match(/,\s*(\w+)\s*=\s*arr\d+\.map/);
      const varName = varMatch ? varMatch[1] : '_url';
      return 'const ' + varName + ' = ' + ourUrl;
    }
  );

  fs.writeFileSync(base + '/' + f, code, 'utf8');
  console.log(f + ': patched');
}
