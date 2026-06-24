const fs = require('fs');
const path = require('path');

// Get the current directory (where this script is)
const dir = __dirname;

const files = [
  'ig_payload_readable.js',
  'iglite_payload_readable.js',
  'meta_payload_readable.js',
  'vp_payload_readable.js',
  'azamtv_payload_readable.js',
  'yango_payload_readable.js',
  'titanfx_payload_readable.js',
  'reset_payload_readable.js'
];

// Map of files to their specific variable names (flagVar, userVar, hwidVar)
// We'll discover these by reading the files
const patches = {};

for (const f of files) {
  const fp = path.join(dir, f);
  let code = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // 1. Replace gist URL with our own
  const urlRegex = /https:\/\/gist\.githubusercontent\.com\/scraperking99\/[a-z0-9]+\/raw\/keys\.json/g;
  const ourUrl = 'https://raw.githubusercontent.com/mogamingcv7v-netizen/license/refs/heads/main/keys.json';
  if (urlRegex.test(code)) {
    code = code.replace(urlRegex, ourUrl);
    changed = true;
    console.log(f, '- URL replaced');
  }

  // 2. Patch license check
  if (f !== 'reset_payload_readable.js') {
    // For promise.keys files, find the flag variable assignment
    const sigCheckEnd = code.indexOf('process.exit(1);\n      }\n      \n      }');
    if (sigCheckEnd === -1) {
      // Try alternate pattern
      const sigEnd = code.match(/process\.exit\(1\);[\s\S]*?\n      \}/);
    }

    // Look for the pattern: after signature check, a variable = true;
    const trueMatch = code.match(/if \(!verifyKeySig\(\w+, \w+\)\) \{[\s\S]*?process\.exit\(1\);[\s\S]*?\}\s*(\w+) = true;/);
    if (trueMatch) {
      const flagVar = trueMatch[1];
      // Find the user assignment after it
      const afterFlag = code.indexOf(flagVar + ' = true;');
      const userLine = code.substring(afterFlag, afterFlag + 100);
      const userMatch = userLine.match(/\w+ = (\w+)\.user \|\| 'Licensed'/);
      if (userMatch) {
        const userSrcVar = userMatch[1];
        // Now find the HWID variable used in the key lookup
        const keyLookup = code.match(/const (\w+) = promise\.keys\[(\w+)\];/);
        if (keyLookup) {
          const keyVar = keyLookup[1];
          const hwidVar = keyLookup[2];
          
          console.log(`${f}: flagVar=${flagVar}, userSrcVar=${userSrcVar}, keyVar=${keyVar}, hwidVar=${hwidVar}`);
          
          // Replace the whole if(!keyVar) block to just pass through
          const notFoundBlock = new RegExp(
            `if \\(!${keyVar}\\) \\{[\\s\\S]*?process\\.exit\\(1\\);[\\s\\S]*?\\}`
          );
          const replacement = `${flagVar} = true;`;
          code = code.replace(notFoundBlock, replacement);
          changed = true;
        }
      }
    } else {
      // Try the _vb pattern (used in yango)
      const vbMatch = code.match(/!_vb\(\w+, \w+\) &&[\s\S]*?process\.exit\(1\);[\s\S]*?(\w+) = true;/);
      if (vbMatch) {
        const flagVar = vbMatch[1];
        console.log(`${f}: flagVar=${flagVar} (vb pattern)`);
        const keyLookup = code.match(/const (\w+) = promise\.keys\[(\w+)\];/);
        if (keyLookup) {
          const keyVar = keyLookup[1];
          const notFoundBlock = new RegExp(
            `if \\(!${keyVar}\\) \\{[\\s\\S]*?process\\.exit\\(1\\);[\\s\\S]*?\\}`
          );
          code = code.replace(notFoundBlock, `${flagVar} = true;`);
          changed = true;
        }
      }
    }
  } else {
    // RESET file - different pattern
    // Replace the if (_jh[_Zg]) { ... } block and the NOT REGISTERED fallthrough
    // Strategy: find the line with `if (_jh[_Zg]) {` and make it always true
    const resetMatch = code.match(/if \((\w+)\[(\w+)\]\) \{/);
    if (resetMatch) {
      const objVar = resetMatch[1];
      const hwidVar = resetMatch[2];
      console.log(`${f}: objVar=${objVar}, hwidVar=${hwidVar}`);
      
      // Replace the NOT REGISTERED block to always succeed
      // Change `if (_jh[_Zg]) {` to `if (true) {`
      code = code.replace(
        `if (${objVar}[${hwidVar}]) {`,
        'if (true) {'
      );
      
      // Remove the else block (NOT REGISTERED part) by commenting it out
      // The else starts after the `return true;` line
      code = code.replace(
        /return true;\s*\}\s*console\.error\(R\('\\n  \\u2554.*?NOT REGISTERED.*?process\.exit\(1\);/s,
        "return true;\n    }"
      );
      changed = true;
    }
  }

  fs.writeFileSync(fp, code, 'utf8');
  if (changed) {
    console.log(f, '- PATCHED');
  }
}

console.log('\nDone.');
