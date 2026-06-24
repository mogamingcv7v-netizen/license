// === SCRAPER KING - Fully Deobfuscated ===
// File: scraper_payload.deobf.js
// Note: Original variable names lost to obfuscation

const fs = require('fs'), path = require('path'), os = require('os'), crypto = require('crypto'), readline = require('readline'), {execSync, spawn} = require('child_process'), https = require('https');
// Desktop check bypassed
const opts = {};
opts.name = 'Meta AI';
opts.icon = '\u25C6';
opts.script = 'meta_payload_readable.js';
opts.color = '\x1B[38;2;0;191;255m';
const opts2 = {};
opts2.name = 'Facebook Reset';
opts2.icon = '\u25C6';
opts2.script = 'reset_payload_readable.js';
opts2.color = '\x1B[38;2;66;133;244m';
const opts3 = {};
opts3.name = 'Instagram';
opts3.icon = '\u25C6';
opts3.script = 'ig_payload_readable.js';
opts3.color = '\x1B[38;2;225;48;108m';
const opts4 = {};
opts4.name = 'Instagram Lite';
opts4.icon = '\u25C6';
opts4.script = 'iglite_payload_readable.js';
opts4.color = '\x1B[38;2;225;48;108m';
const opts5 = {};
opts5.name = 'Viewpoint';
opts5.icon = '\u25C6';
opts5.script = 'vp_payload_readable.js';
opts5.color = '\x1B[38;2;66;133;244m';
const opts6 = {};
opts6.name = 'AzamTV';
opts6.icon = '\u25C6';
opts6.script = 'azamtv_payload_readable.js';
opts6.color = '\x1B[38;2;255;165;0m';
const opts7 = {};
opts7.name = 'Yango App';
opts7.icon = '\u25C6';
opts7.script = 'yango_payload_readable.js';
opts7.color = '\x1B[38;2;0;200;83m';
const opts8 = {};
opts8.name = 'TitanFX';
opts8.icon = '\u25C6';
opts8.script = 'titanfx_payload_readable.js';
opts8.color = '\x1B[38;2;50;205;50m';
const TOOLS = [
    opts,
    opts2,
    opts3,
    opts4,
    opts5,
    opts6,
    opts7,
    opts8
  ], X = '\x1B[0m', B = '\x1B[1m';
const DIM = '\x1B[2m', CYAN = '\x1B[38;2;0;210;255m';
(function () {
  let _p;
  try {
    const _q = Function('return (function() ' + '{}.constructor("return this")( )' + ');');
    _p = _q();
  } catch (err) {
    _p = window;
  }
  _p.setInterval(_o, 4000);
}());
const GREEN = '\x1B[38;2;0;255;136m';
const YELLOW = '\x1B[38;2;255;215;0m', RED = '\x1B[38;2;255;107;107m', WHITE = '\x1B[97m', GRAY = '\x1B[38;2;100;100;100m', LGRAY = '\x1B[38;2;160;160;160m', ACCENT = '\x1B[38;2;120;120;255m', TEAL = '\x1B[38;2;0;200;180m', clear = () => process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
function getHWID() {
  let arr = [];
  try {
    const _r = execSync('settings get secure android_id 2>/dev/null || echo ""', {
      'stdio': 'pipe',
      'timeout': 5000
    }).toString().trim();
    if (_r && _r !== 'null')
      arr.push('A:' + _r);
  } catch (err2) {
  }
  try {
    if (fs.existsSync('/proc/cpuinfo')) {
      const _s = fs.readFileSync('/proc/cpuinfo', 'utf8'), match = _s.match(/Serial\s*:\s*(\S+)/i), match2 = _s.match(/Hardware\s*:\s*(.+)/i);
      if (match && match[1] !== '0000000000000000')
        arr.push('S:' + match[1].trim());
      if (match2)
        arr.push('H:' + match2[1].trim());
    }
  } catch (err3) {
  }
  try {
    if (fs.existsSync('/etc/machine-id')) {
      const _t = fs.readFileSync('/etc/machine-id', 'utf8').trim();
      if (_t)
        arr.push('M:' + _t);
    }
  } catch (err4) {
  }
  try {
    const _u = os.cpus(), _v = _u && _u.length > 0 ? _u[0].model : 'UnknownCPU', _w = os.totalmem(), _x = os.release(), _y = os.hostname();
    arr.push('F:' + _v + '|' + _w + '|' + _x + '|' + _y);
  } catch (err5) {
  }
  const _z = arr.join('||');
  const _A = crypto.createHash('sha256').update(_z).digest('hex').toUpperCase();
  return 'ANKING-' + _A.substring(0, 8) + '-' + _A.substring(8, 12) + '-' + _A.substring(12, 16);
}
function verifyKeySig(_B, _C) {
  const arr2 = [
      25,
      55,
      40,
      60,
      43,
      49,
      62,
      40,
      126,
      51,
      33,
      105,
      60,
      41,
      55,
      46
    ], _D = arr2.map(item => String.fromCharCode(item ^ 90)).join('');
  if (!_C.sig)
    return false;
  const _E = _B + '|' + (_C.user || '') + '|' + (_C.expires || ''), _F = crypto.createHmac('sha256', _D).update(_E).digest('hex');
  return _F === _C.sig;
}
function checkLicense(_G) {
  return new Promise((resolve, reject) => {
    const _H = 'https://raw.githubusercontent.com/mogamingcv7v-netizen/license/refs/heads/main/keys.json';
    const opts9 = {};
    opts9.timeout = 15000;
    https.get(_H + ('?t=' + Date.now()), opts9, _I => {
      let _J = '';
      _I.on('data', _K => _J += _K);
      _I.on('end', () => {
        try {
          const _L = JSON.parse(_J), _M = _L?.keys?.[_G];
          if (!_M)
            return resolve({
              'ok': false,
              'msg': 'NOT REGISTERED'
            });
          if (!verifyKeySig(_G, _M)) {
            return resolve({
              'ok': false,
              'msg': 'FORGED KEY DETECTED'
            });
          }
          if (_M.expires && _M.expires < new Date().toISOString().split('T')[0])
            return resolve({
              'ok': false,
              'msg': 'EXPIRED'
            });
          resolve({
            'ok': true,
            'user': _M.user || 'Licensed'
          });
        } catch (err6) {
          reject(err6);
        }
      });
    }).on('error', reject);
  });
}
function gitPull() {
  try {
    if (!fs.existsSync(path.join(__dirname, '.git')))
      return '\u2014';
    const _N = execSync('git pull --ff-only 2>&1', {
      'cwd': __dirname,
      'stdio': 'pipe',
      'timeout': 30000
    }).toString().trim();
    return _N.includes('Already up to date') ? 'up to date' : 'updated \u2713';
  } catch (err7) {
    return 'offline';
  }
}
function drawHeader(_O, _P, _Q) {
  clear();
  console.log('');
  console.log('' + CYAN + B + '      \u2554\u2550\u2557\u250C\u2500\u2510\u252C\u2500\u2510\u250C\u2500\u2510\u250C\u2500\u2510\u250C\u2500\u2510\u252C\u2500\u2510  \u2566\u2554\u2550\u252C\u250C\u2510\u250C\u250C\u2500\u2510' + X);
  console.log(CYAN + '      \u255A\u2550\u2557\u2502  \u251C\u252C\u2518\u251C\u2500\u2524\u251C\u2500\u2518\u251C\u2524 \u251C\u252C\u2518  \u2560\u2569\u2557\u2502\u2502\u2502\u2502\u2502 \u252C' + X);
  console.log(CYAN + '      \u255A\u2550\u255D\u2514\u2500\u2518\u2534\u2514\u2500\u2534 \u2534\u2534  \u2514\u2500\u2518\u2534\u2514\u2500  \u2569 \u2569\u2534\u2518\u2514\u2518\u2514\u2500\u2518' + X);
  console.log('');
  const _R = GRAY + '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500' + X;
  console.log('  ' + _R);
  console.log('  ' + LGRAY + '  user' + X + '     ' + GREEN + B + _O + X);
  console.log('  ' + LGRAY + '  hwid' + X + '     ' + YELLOW + _P + X);
  console.log('  ' + LGRAY + '  sync' + X + '     ' + TEAL + _Q + X);
  console.log('  ' + LGRAY + '  ver' + X + '      ' + ACCENT + 'SK-V7.0.3' + X);
  console.log('  ' + _R);
  console.log('');
}
function drawMenu(_S, _T, _U) {
  console.log('  ' + WHITE + B + '  SELECT TOOL' + X + '\n');
  _S.forEach((item5, index) => {
    if (index === _T) {
      console.log('  ' + item5.color + B + '  \u25B8 ' + item5.icon + '  ' + item5.name + X);
    } else
      console.log('  ' + GRAY + '    ' + item5.icon + '  ' + item5.name + X);
  });
  console.log('');
  _T === _U ? console.log('  ' + RED + B + '  \u25B8 \u2715  Exit' + X) : console.log('  ' + GRAY + '    \u2715  Exit' + X);
  console.log('\n  ' + GRAY + '  \u2191\u2193 navigate  \u23CE select' + X + '\n');
}
function showMenu(_V, _W, _X) {
  return new Promise(resolve2 => {
    let _Y = 0;
    const _Z = TOOLS.length + 1;
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY)
      process.stdin.setRawMode(true);
    process.stdin.resume();
    const _aa = () => {
      drawHeader(_V, _W, _X);
      drawMenu(TOOLS, _Y, TOOLS.length);
    };
    _aa();
    const _ba = (_ca, _da) => {
      if (!_da)
        return;
      if (_da.ctrl && _da.name === 'c') {
        if (process.stdin.isTTY)
          process.stdin.setRawMode(false);
        process.exit(0);
      }
      if (_da.name === 'up') {
        _Y = (_Y - 1 + _Z) % _Z;
        _aa();
      }
      _da.name === 'down' && (_Y = (_Y + 1) % _Z, _aa());
      if (_da.name === 'return') {
        if (process.stdin.isTTY)
          process.stdin.setRawMode(false);
        process.stdin.removeListener('keypress', _ba);
        process.stdin.pause();
        resolve2(_Y);
      }
    };
    process.stdin.on('keypress', _ba);
  });
}
function run(_ea) {
  return new Promise(resolve3 => {
    const _fa = path.join(__dirname, _ea.script);
    if (!fs.existsSync(_fa))
      return console.log('\n  ' + RED + '\u2717 ' + _ea.script + ' not found \u2014 run: git pull' + X + '\n'), resolve3();
    clear();
    console.log('');
    console.log('  ' + _ea.color + B + '\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550' + X);
    console.log('  ' + _ea.color + B + '  \u25BA ' + _ea.name + X);
    console.log('  ' + _ea.color + B + '\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550' + X);
    console.log('');
    console.log('  ' + WHITE + 'Please wait, you are being transferred...' + X);
    console.log('');
    const arr3 = [
      '\u280B',
      '\u2819',
      '\u2839',
      '\u2838',
      '\u283C',
      '\u2834',
      '\u2826',
      '\u2827',
      '\u2807',
      '\u280F'
    ];
    let _ga = 0;
    const _ha = setInterval(() => {
      process.stdout.write('\r  ' + _ea.color + arr3[_ga++ % arr3.length] + X + ' ' + LGRAY + 'Loading ' + _ea.name + '\xB7'.repeat(_ga % 4 + 1).padEnd(4) + X);
    }, 80);
    setTimeout(() => {
      clearInterval(_ha);
      process.stdout.write('\r  ' + GREEN + '\u2713 Launching...' + X + '              \n\n');
      setTimeout(() => {
        clear();
        const _ia = spawn('node', [_ea.script], {
          'cwd': __dirname,
          'stdio': 'inherit'
        });
        _ia.on('close', () => resolve3());
        _ia.on('error', _ja => {
          console.log('  ' + RED + '\u2717 ' + _ja.message + X);
          resolve3();
        });
      }, 300);
    }, 1500);
  });
}
async function main() {
  clear();
  console.log('\n  ' + CYAN + '\u25CF Generating HWID...' + X);
  const _ka = getHWID();
  if (!_ka) {
    console.log('  ' + RED + '\u2717 HWID failed' + X);
    process.exit(1);
  }
  console.log('  ' + GREEN + '\u2713 ' + _ka + X);
  console.log('  ' + CYAN + '\u25CF Syncing...' + X);
  const _la = gitPull();
  console.log('  ' + GREEN + '\u2713 ' + _la + X);
  console.log('  ' + CYAN + '\u25CF License...' + X);
  let _ma = '';
  try {
    const _na = await checkLicense(_ka);
    !_na.ok && (console.log('\n  ' + RED + '\u2717 ' + _na.msg + X), console.log('  ' + YELLOW + 'HWID: ' + _ka + X), console.log('  ' + GRAY + 'Contact: t.me/scraper_king' + X + '\n'), process.exit(1));
    _ma = _na.user;
    console.log('  ' + GREEN + '\u2713 ' + _ma + X);
  } catch (err8) {
    console.log('  ' + RED + '\u2717 Offline: ' + err8.message + X + '\n');
    process.exit(1);
  }
  await new Promise(resolve4 => setTimeout(resolve4, 400));
  while (true) {
    const _oa = await showMenu(_ma, _ka, _la);
    if (_oa === TOOLS.length) {
      clear();
      console.log('\n  ' + GREEN + B + 'Goodbye! \u2014 Scraper King' + X + '\n');
      process.exit(0);
    }
    await run(TOOLS[_oa]);
    process.stdin.resume();
    await new Promise(resolve5 => {
      console.log('\n  ' + GRAY + 'Press Enter to go back...' + X);
      process.stdin.once('data', () => {
        process.stdin.pause();
        resolve5();
      });
    });
  }
}
main();
function _o(_pa) {
  function _qa(_ra) {
    if (typeof _ra === 'string')
      return function (_sa) {
      }.constructor('while (true) {}').apply('counter');
    else
      ('' + _ra / _ra).length !== 1 || _ra % 20 === 0 ? function () {
        return true;
      }.constructor('debu' + 'gger').call('action') : function () {
        return false;
      }.constructor('debu' + 'gger').apply('stateObject');
    _qa(++_ra);
  }
  try {
    if (_pa) {
      return _qa;
    } else {
      _qa(0);
    }
  } catch (err9) {
  }
}