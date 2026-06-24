const fs = require('fs');
const dir = __dirname;
const files = ['ig.js','iglite.js','meta.js','reset.js','vp.js','azamtv.js','yango.js','titanfx.js'];
const urlRegex = /https:\/\/gist\.githubusercontent\.com\/scraperking99\/[a-z0-9]+\/raw\/keys\.json/g;
const ourUrl = 'https://raw.githubusercontent.com/mogamingcv7v-netizen/license/refs/heads/main/keys.json';

for (const f of files) {
  const fp = dir + '/' + f;
  let code = fs.readFileSync(fp, 'utf8');
  const matches = code.match(urlRegex);
  if (matches) {
    code = code.replace(urlRegex, ourUrl);
    fs.writeFileSync(fp, code, 'utf8');
    console.log(f + ': replaced ' + matches.length + ' URLs');
  } else {
    console.log(f + ': no gist URL found');
  }
}
