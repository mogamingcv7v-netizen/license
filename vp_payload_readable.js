// === AIZENTOOLS ===
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
  console.log(W('\u2502 [\u2022] Telegram  : ') + C('t.me/aizentools            ') + W('\u2502'));
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
  return new Promise(async (resolve4, reject3) => {
    try {
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
        const _xc = 'https://raw.githubusercontent.com/mogamingcv7v-netizen/license/502cb5f/keys.json', opts47 = {};
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
              console.error(R('  \u2551  Contact: t.me/aizentools to register     \u2551'));
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
              console.error(R('  \u2551  Contact: t.me/aizentools to renew       \u2551'));
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
  });
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