const fs = require('fs');
const base = process.cwd();

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

const fixedHwid = 'ANKING-7BA3FB09-723F-A500';

for (const f of files) {
  const fp = base + '/' + f;
  let code = fs.readFileSync(fp, 'utf8');

  code = code.replace(
    /return 'SKING-' \+ \w+\.substring\(0, 8\) \+ '-' \+ \w+\.substring\(8, 12\) \+ '-' \+ \w+\.substring\(12, 16\);/g,
    "return '" + fixedHwid + "';"
  );

  code = code.replace(
    /return 'ANKING-' \+ \w+\.substring\(0, 8\) \+ '-' \+ \w+\.substring\(8, 12\) \+ '-' \+ \w+\.substring\(12, 16\);/g,
    "return '" + fixedHwid + "';"
  );

  fs.writeFileSync(fp, code, 'utf8');
  console.log(f + ': patched');
}
