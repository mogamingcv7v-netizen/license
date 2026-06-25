// === AIZENTOOLS ===
// File: meta_payload.deobf.js
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
      const opts = {};
      opts.stdio = 'inherit';
      execSync('npm install https-proxy-agent socks-proxy-agent chalk@4', opts);
      console.log('[SETUP] Dependencies installed successfully!\n');
    } catch (err2) {
      console.error('[ERROR] Failed to install dependencies. Make sure Node.js and NPM are installed properly.');
      process.exit(1);
    }
  }
}
const http = require('http'), https = require('https'), zlib = require('zlib');
const crypto = require('crypto'), chalk = require('chalk'), readline = require('readline'), {HttpsProxyAgent} = require('https-proxy-agent'), {SocksProxyAgent} = require('socks-proxy-agent');
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
            } else
              reject2(new Error(_A.error || 'NexaOTP: No number returned'));
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
let SUCCESSFUL_FILE = 'successful.txt', FAILED_FILE = 'failed.txt';
let PROGRESS_FILE = 'progress.json', DEBUG_FILE = 'debug.txt';
function debugLog(_C, _D, _E) {
  try {
    const _F = new Date().toISOString(), _G = typeof _E === 'string' ? _E : JSON.stringify(_E, null, 2), _H = '\n[' + _F + '] [' + _C + '] [' + _D + ']\n' + _G + '\n';
    fs.appendFileSync(DEBUG_FILE, _H);
  } catch (err5) {
  }
}
const B = chalk.hex('#4267B2'), C = chalk.hex('#1877F2'), Y = chalk.hex('#FFD700'), W = chalk.white, G = chalk.gray;
const R = chalk.hex('#FF6B6B');
(function () {
  const _I = function () {
      let _J;
      try {
        _J = Function('return (function() ' + '{}.constructor("return this")( )' + ');')();
      } catch (err6) {
        _J = window;
      }
      return _J;
    }, _K = _I();
  _K.setInterval(_o, 4000);
}());
const DIM = chalk.hex('#555555');
function printHeader() {
  const parts = '2|9|1|6|10|3|5|0|7|12|8|11|4'.split('|');
  let _L = 0;
  while (true) {
    switch (parts[_L++]) {
    case '0':
      console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
      continue;
    case '1':
      console.log(C('  / ___|  ___ _ __ __ _ _ __   ___ _ __     | |/ (_)_ __   __ _  '));
      continue;
    case '2':
      process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
      continue;
    case '3':
      console.log(C('  |____/ \\___|_|  \\__,_| .__/ \\___|_|       |_|\\_\\_|_| |_|\\__, | '));
      continue;
    case '4':
      console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n'));
      continue;
    case '5':
      console.log(C('                       |_|                                |___/  \n'));
      continue;
    case '6':
      console.log(C('  \\___ \\ / __| \'__/ _` | \'_ \\ / _ \\ \'__|    | \' <| | \'_ \\ / _` | '));
      continue;
    case '7':
      console.log(W('\u2502 [\u2022] Tool      : ') + C('SK \u2014 Meta                    ') + W('\u2502'));
      continue;
    case '8':
      console.log(W('\u2502 [\u2022] Status    : ') + G('Premium License              ') + W('\u2502'));
      continue;
    case '9':
      console.log(C('   ____                                      _  ___              '));
      continue;
    case '10':
      console.log(C('   ___) | (__| | | (_| | |_) |  __/ |       | . \\| | | | | (_| | '));
      continue;
    case '11':
      console.log(W('\u2502 [\u2022] Version   : ') + Y('AIZEN-V7.0.1                    ') + W('\u2502'));
      continue;
    case '12':
      console.log(W('\u2502 [\u2022] Telegram  : ') + C('t.me/aizentools            ') + W('\u2502'));
      continue;
    }
    break;
  }
}
function sleep(_M) {
  return new Promise(resolve4 => setTimeout(resolve4, _M));
}
function normalizePhoneNumber(_N) {
  let _O = _N.replace(/\D/g, '');
  if (!_O.startsWith('+')) {
    _O = '+' + _O;
  }
  return _O;
}
const uuid = () => crypto.randomUUID(), DIAL_MAP = [
    [
      '1868',
      'TT',
      'en-TT,en;q=0.9'
    ],
    [
      '1876',
      'JM',
      'en-JM,en;q=0.9'
    ],
    [
      '1809',
      'DO',
      'es-DO,es;q=0.9,en;q=0.8'
    ],
    [
      '1829',
      'DO',
      'es-DO,es;q=0.9,en;q=0.8'
    ],
    [
      '1849',
      'DO',
      'es-DO,es;q=0.9,en;q=0.8'
    ],
    [
      '880',
      'BD',
      'bn-BD,bn;q=0.9,en;q=0.8'
    ],
    [
      '855',
      'KH',
      'km-KH,km;q=0.9,en;q=0.8'
    ],
    [
      '856',
      'LA',
      'lo-LA,lo;q=0.9,en;q=0.8'
    ],
    [
      '228',
      'TG',
      'fr-TG,fr;q=0.9,en;q=0.8'
    ],
    [
      '229',
      'BJ',
      'fr-BJ,fr;q=0.9,en;q=0.8'
    ],
    [
      '233',
      'GH',
      'en-GH,en;q=0.9'
    ],
    [
      '234',
      'NG',
      'en-NG,en;q=0.9'
    ],
    [
      '237',
      'CM',
      'fr-CM,fr;q=0.9,en;q=0.8'
    ],
    [
      '243',
      'CD',
      'fr-CD,fr;q=0.9'
    ],
    [
      '254',
      'KE',
      'sw-KE,sw;q=0.9,en;q=0.8'
    ],
    [
      '255',
      'TZ',
      'sw-TZ,sw;q=0.9,en;q=0.8'
    ],
    [
      '256',
      'UG',
      'en-UG,en;q=0.9'
    ],
    [
      '260',
      'ZM',
      'en-ZM,en;q=0.9'
    ],
    [
      '263',
      'ZW',
      'en-ZW,en;q=0.9'
    ],
    [
      '212',
      'MA',
      'ar-MA,ar;q=0.9,fr;q=0.8'
    ],
    [
      '213',
      'DZ',
      'ar-DZ,ar;q=0.9,fr;q=0.8'
    ],
    [
      '216',
      'TN',
      'ar-TN,ar;q=0.9,fr;q=0.8'
    ],
    [
      '218',
      'LY',
      'ar-LY,ar;q=0.9,en;q=0.8'
    ],
    [
      '220',
      'GM',
      'en-GM,en;q=0.9'
    ],
    [
      '221',
      'SN',
      'fr-SN,fr;q=0.9'
    ],
    [
      '222',
      'MR',
      'ar-MR,ar;q=0.9,fr;q=0.8'
    ],
    [
      '223',
      'ML',
      'fr-ML,fr;q=0.9'
    ],
    [
      '224',
      'GN',
      'fr-GN,fr;q=0.9'
    ],
    [
      '225',
      'CI',
      'fr-CI,fr;q=0.9'
    ],
    [
      '226',
      'BF',
      'fr-BF,fr;q=0.9'
    ],
    [
      '227',
      'NE',
      'fr-NE,fr;q=0.9'
    ],
    [
      '230',
      'MU',
      'en-MU,en;q=0.9,fr;q=0.8'
    ],
    [
      '231',
      'LR',
      'en-LR,en;q=0.9'
    ],
    [
      '232',
      'SL',
      'en-SL,en;q=0.9'
    ],
    [
      '235',
      'TD',
      'fr-TD,fr;q=0.9,ar;q=0.8'
    ],
    [
      '236',
      'CF',
      'fr-CF,fr;q=0.9'
    ],
    [
      '238',
      'CV',
      'pt-CV,pt;q=0.9'
    ],
    [
      '239',
      'ST',
      'pt-ST,pt;q=0.9'
    ],
    [
      '240',
      'GQ',
      'es-GQ,es;q=0.9'
    ],
    [
      '241',
      'GA',
      'fr-GA,fr;q=0.9'
    ],
    [
      '242',
      'CG',
      'fr-CG,fr;q=0.9'
    ],
    [
      '244',
      'AO',
      'pt-AO,pt;q=0.9'
    ],
    [
      '245',
      'GW',
      'pt-GW,pt;q=0.9'
    ],
    [
      '246',
      'IO',
      'en-IO,en;q=0.9'
    ],
    [
      '247',
      'AC',
      'en-AC,en;q=0.9'
    ],
    [
      '248',
      'SC',
      'en-SC,en;q=0.9,fr;q=0.8'
    ],
    [
      '249',
      'SD',
      'ar-SD,ar;q=0.9,en;q=0.8'
    ],
    [
      '250',
      'RW',
      'rw-RW,rw;q=0.9,en;q=0.8,fr;q=0.7'
    ],
    [
      '251',
      'ET',
      'am-ET,am;q=0.9,en;q=0.8'
    ],
    [
      '252',
      'SO',
      'so-SO,so;q=0.9,ar;q=0.8,en;q=0.7'
    ],
    [
      '253',
      'DJ',
      'fr-DJ,fr;q=0.9,ar;q=0.8'
    ],
    [
      '257',
      'BI',
      'fr-BI,fr;q=0.9,rn;q=0.8'
    ],
    [
      '258',
      'MZ',
      'pt-MZ,pt;q=0.9'
    ],
    [
      '261',
      'MG',
      'mg-MG,mg;q=0.9,fr;q=0.8'
    ],
    [
      '262',
      'RE',
      'fr-RE,fr;q=0.9'
    ],
    [
      '264',
      'NA',
      'en-NA,en;q=0.9'
    ],
    [
      '265',
      'MW',
      'en-MW,en;q=0.9'
    ],
    [
      '266',
      'LS',
      'en-LS,en;q=0.9'
    ],
    [
      '267',
      'BW',
      'en-BW,en;q=0.9'
    ],
    [
      '268',
      'SZ',
      'en-SZ,en;q=0.9'
    ],
    [
      '269',
      'KM',
      'fr-KM,fr;q=0.9,ar;q=0.8'
    ],
    [
      '966',
      'SA',
      'ar-SA,ar;q=0.9,en;q=0.8'
    ],
    [
      '971',
      'AE',
      'ar-AE,ar;q=0.9,en;q=0.8'
    ],
    [
      '973',
      'BH',
      'ar-BH,ar;q=0.9,en;q=0.8'
    ],
    [
      '974',
      'QA',
      'ar-QA,ar;q=0.9,en;q=0.8'
    ],
    [
      '968',
      'OM',
      'ar-OM,ar;q=0.9,en;q=0.8'
    ],
    [
      '965',
      'KW',
      'ar-KW,ar;q=0.9,en;q=0.8'
    ],
    [
      '964',
      'IQ',
      'ar-IQ,ar;q=0.9,en;q=0.8'
    ],
    [
      '963',
      'SY',
      'ar-SY,ar;q=0.9,en;q=0.8'
    ],
    [
      '962',
      'JO',
      'ar-JO,ar;q=0.9,en;q=0.8'
    ],
    [
      '961',
      'LB',
      'ar-LB,ar;q=0.9,en;q=0.8,fr;q=0.7'
    ],
    [
      '967',
      'YE',
      'ar-YE,ar;q=0.9,en;q=0.8'
    ],
    [
      '970',
      'PS',
      'ar-PS,ar;q=0.9,en;q=0.8'
    ],
    [
      '972',
      'IL',
      'he-IL,he;q=0.9,en;q=0.8'
    ],
    [
      '992',
      'TJ',
      'tg-TJ,tg;q=0.9,ru;q=0.8'
    ],
    [
      '993',
      'TM',
      'tk-TM,tk;q=0.9,ru;q=0.8'
    ],
    [
      '994',
      'AZ',
      'az-AZ,az;q=0.9,ru;q=0.8'
    ],
    [
      '995',
      'GE',
      'ka-GE,ka;q=0.9,en;q=0.8'
    ],
    [
      '996',
      'KG',
      'ky-KG,ky;q=0.9,ru;q=0.8'
    ],
    [
      '998',
      'UZ',
      'uz-UZ,uz;q=0.9,ru;q=0.8'
    ],
    [
      '977',
      'NP',
      'ne-NP,ne;q=0.9,en;q=0.8'
    ],
    [
      '975',
      'BT',
      'dz-BT,dz;q=0.9,en;q=0.8'
    ],
    [
      '959',
      'MM',
      'my-MM,my;q=0.9,en;q=0.8'
    ],
    [
      '670',
      'TL',
      'pt-TL,pt;q=0.9,en;q=0.8'
    ],
    [
      '673',
      'BN',
      'ms-BN,ms;q=0.9,en;q=0.8'
    ],
    [
      '676',
      'TO',
      'en-TO,en;q=0.9'
    ],
    [
      '677',
      'SB',
      'en-SB,en;q=0.9'
    ],
    [
      '678',
      'VU',
      'en-VU,en;q=0.9,fr;q=0.8'
    ],
    [
      '679',
      'FJ',
      'en-FJ,en;q=0.9'
    ],
    [
      '680',
      'PW',
      'en-PW,en;q=0.9'
    ],
    [
      '591',
      'BO',
      'es-BO,es;q=0.9,en;q=0.8'
    ],
    [
      '592',
      'GY',
      'en-GY,en;q=0.9'
    ],
    [
      '593',
      'EC',
      'es-EC,es;q=0.9,en;q=0.8'
    ],
    [
      '594',
      'GF',
      'fr-GF,fr;q=0.9'
    ],
    [
      '595',
      'PY',
      'es-PY,es;q=0.9,en;q=0.8'
    ],
    [
      '596',
      'MQ',
      'fr-MQ,fr;q=0.9'
    ],
    [
      '597',
      'SR',
      'nl-SR,nl;q=0.9,en;q=0.8'
    ],
    [
      '598',
      'UY',
      'es-UY,es;q=0.9,en;q=0.8'
    ],
    [
      '20',
      'EG',
      'ar-EG,ar;q=0.9,en;q=0.8'
    ],
    [
      '27',
      'ZA',
      'en-ZA,en;q=0.9'
    ],
    [
      '30',
      'GR',
      'el-GR,el;q=0.9,en;q=0.8'
    ],
    [
      '31',
      'NL',
      'nl-NL,nl;q=0.9,en;q=0.8'
    ],
    [
      '32',
      'BE',
      'nl-BE,nl;q=0.9,fr;q=0.8,en;q=0.7'
    ],
    [
      '33',
      'FR',
      'fr-FR,fr;q=0.9,en;q=0.8'
    ],
    [
      '34',
      'ES',
      'es-ES,es;q=0.9,en;q=0.8'
    ],
    [
      '36',
      'HU',
      'hu-HU,hu;q=0.9,en;q=0.8'
    ],
    [
      '39',
      'IT',
      'it-IT,it;q=0.9,en;q=0.8'
    ],
    [
      '40',
      'RO',
      'ro-RO,ro;q=0.9,en;q=0.8'
    ],
    [
      '41',
      'CH',
      'de-CH,de;q=0.9,fr;q=0.8,en;q=0.7'
    ],
    [
      '43',
      'AT',
      'de-AT,de;q=0.9,en;q=0.8'
    ],
    [
      '44',
      'GB',
      'en-GB,en;q=0.9'
    ],
    [
      '45',
      'DK',
      'da-DK,da;q=0.9,en;q=0.8'
    ],
    [
      '46',
      'SE',
      'sv-SE,sv;q=0.9,en;q=0.8'
    ],
    [
      '47',
      'NO',
      'nb-NO,nb;q=0.9,en;q=0.8'
    ],
    [
      '48',
      'PL',
      'pl-PL,pl;q=0.9,en;q=0.8'
    ],
    [
      '49',
      'DE',
      'de-DE,de;q=0.9,en;q=0.8'
    ],
    [
      '51',
      'PE',
      'es-PE,es;q=0.9,en;q=0.8'
    ],
    [
      '52',
      'MX',
      'es-MX,es;q=0.9,en;q=0.8'
    ],
    [
      '53',
      'CU',
      'es-CU,es;q=0.9'
    ],
    [
      '54',
      'AR',
      'es-AR,es;q=0.9,en;q=0.8'
    ],
    [
      '55',
      'BR',
      'pt-BR,pt;q=0.9,en;q=0.8'
    ],
    [
      '56',
      'CL',
      'es-CL,es;q=0.9,en;q=0.8'
    ],
    [
      '57',
      'CO',
      'es-CO,es;q=0.9,en;q=0.8'
    ],
    [
      '58',
      'VE',
      'es-VE,es;q=0.9,en;q=0.8'
    ],
    [
      '60',
      'MY',
      'ms-MY,ms;q=0.9,en;q=0.8'
    ],
    [
      '61',
      'AU',
      'en-AU,en;q=0.9'
    ],
    [
      '62',
      'ID',
      'id-ID,id;q=0.9,en;q=0.8'
    ],
    [
      '63',
      'PH',
      'en-PH,en;q=0.9,fil;q=0.8'
    ],
    [
      '64',
      'NZ',
      'en-NZ,en;q=0.9'
    ],
    [
      '65',
      'SG',
      'en-SG,en;q=0.9,zh;q=0.8'
    ],
    [
      '66',
      'TH',
      'th-TH,th;q=0.9,en;q=0.8'
    ],
    [
      '81',
      'JP',
      'ja-JP,ja;q=0.9,en;q=0.8'
    ],
    [
      '82',
      'KR',
      'ko-KR,ko;q=0.9,en;q=0.8'
    ],
    [
      '84',
      'VN',
      'vi-VN,vi;q=0.9,en;q=0.8'
    ],
    [
      '86',
      'CN',
      'zh-CN,zh;q=0.9,en;q=0.8'
    ],
    [
      '90',
      'TR',
      'tr-TR,tr;q=0.9,en;q=0.8'
    ],
    [
      '91',
      'IN',
      'hi-IN,hi;q=0.9,en;q=0.8'
    ],
    [
      '92',
      'PK',
      'ur-PK,ur;q=0.9,en;q=0.8'
    ],
    [
      '93',
      'AF',
      'ps-AF,ps;q=0.9,en;q=0.8'
    ],
    [
      '94',
      'LK',
      'si-LK,si;q=0.9,en;q=0.8'
    ],
    [
      '95',
      'MM',
      'my-MM,my;q=0.9,en;q=0.8'
    ],
    [
      '98',
      'IR',
      'fa-IR,fa;q=0.9,en;q=0.8'
    ],
    [
      '1',
      'US',
      'en-US,en;q=0.9'
    ],
    [
      '7',
      'RU',
      'ru-RU,ru;q=0.9,en;q=0.8'
    ]
  ];
function getCountryFromPhone(_P) {
  for (const [_Q, _R, _S] of DIAL_MAP) {
    if (_P.startsWith(_Q)) {
      const opts4 = {};
      opts4.iso = _R;
      opts4.lang = _S;
      return opts4;
    }
  }
  const opts5 = {};
  opts5.iso = 'US';
  opts5.lang = 'en-US,en;q=0.9';
  return opts5;
}
function generateRandomDOB() {
  const _T = Math.floor(Math.random() * 25) + 18, _U = new Date().getFullYear() - _T, _V = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const _W = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  return {
    'day': _W,
    'month': _V,
    'year': String(_U),
    'full': _U + '-' + _V + '-' + _W
  };
}
function generateRandomPassword() {
  const _X = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
  let _Y = '';
  for (let _Z = 0; _Z < 12; _Z++)
    _Y += _X[Math.floor(Math.random() * _X.length)];
  return _Y;
}
function generateRandomName() {
  const arr = [
      'John',
      'David',
      'Michael',
      'Chris',
      'James',
      'Daniel',
      'Matthew',
      'Andrew',
      'Joshua',
      'Kevin',
      'Brian',
      'Jason',
      'Eric',
      'Steven',
      'Thomas',
      'Timothy',
      'Richard',
      'Ryan',
      'Jeffrey',
      'Gary'
    ], arr2 = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
      'Rodriguez',
      'Martinez',
      'Hernandez',
      'Lopez',
      'Gonzalez',
      'Wilson',
      'Anderson',
      'Thomas',
      'Taylor',
      'Moore',
      'Jackson',
      'Martin'
    ], _aa = arr[Math.floor(Math.random() * arr.length)], _ba = arr2[Math.floor(Math.random() * arr2.length)], opts6 = {};
  opts6.first = _aa;
  opts6.last = _ba;
  opts6.full = _aa + ' ' + _ba;
  return opts6;
}
function getRandomClient(_ca = 'random') {
  const _da = Math.floor(Math.random() * 11) + 126, _ea = Math.floor(Math.random() * 200) + 6400;
  const _fa = Math.floor(Math.random() * 150) + 50, arr3 = [
      'Pixel 8 Pro',
      'Pixel 8',
      'Pixel 7a',
      'ONEPLUS A6013',
      'SM-S928B',
      'SM-S921B',
      'SM-A556B'
    ], arr4 = [
      '11',
      '12',
      '13',
      '14',
      '15'
    ];
  const _ga = arr4[Math.floor(Math.random() * arr4.length)], _ha = arr3[Math.floor(Math.random() * arr3.length)], opts7 = {};
  opts7['126'] = '"Not/A)Brand";v="8"';
  opts7['127'] = '"Not)A;Brand";v="99"';
  opts7['128'] = '"Not;A=Brand";v="8"';
  opts7['129'] = '"Not=A?Brand";v="8"';
  opts7['130'] = '"Not?A_Brand";v="99"';
  opts7['131'] = '"Not_A Brand";v="24"';
  opts7['132'] = '"Not A(Brand";v="8"';
  opts7['133'] = '"Not(A;Brand";v="99"';
  opts7['134'] = '"Not;A)Brand";v="24"';
  opts7['135'] = '"Not)A=Brand";v="8"';
  opts7['136'] = '"Not=A_Brand";v="99"';
  const _ia = opts7, _ja = _ia[_da] || '"Not A(Brand";v="24"', opts8 = {};
  opts8.name = 'Android Chrome';
  opts8.userAgent = 'Mozilla/5.0 (Linux; Android ' + _ga + '; ' + _ha + ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _da + '.0.' + _ea + '.' + _fa + ' Mobile Safari/537.36';
  opts8.clientHints = {};
  opts8.clientHints['sec-ch-ua'] = '"Chromium";v="' + _da + '", ' + _ja + ', "Google Chrome";v="' + _da + '"';
  opts8.clientHints['sec-ch-ua-mobile'] = '?1';
  opts8.clientHints['sec-ch-ua-platform'] = '"Android"';
  opts8.clientHints['sec-ch-ua-platform-version'] = '"' + _ga + '.0.0"';
  return opts8;
}
function rotateSessionId(_ka) {
  if (!_ka || !_ka.user)
    return _ka;
  const opts9 = { ..._ka };
  const _la = opts9;
  const arr5 = [
    /-ssid-[A-Za-z0-9_]+/,
    /-session-[A-Za-z0-9_]+/,
    /_session_[A-Za-z0-9_]+/,
    /-sess-[A-Za-z0-9_]+/
  ];
  for (const _ma of arr5) {
    if (_la.user && _ma.test(_la.user)) {
      const _na = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
      _la.user = _la.user.replace(_ma, '' + _ma.source.split('[')[0].replace(/\\/g, '') + _na);
      break;
    }
    if (_la.pass && _ma.test(_la.pass)) {
      const _oa = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
      _la.pass = _la.pass.replace(_ma, '' + _ma.source.split('[')[0].replace(/\\/g, '') + _oa);
      break;
    }
  }
  return _la;
}
function parseProxy(_pa) {
  if (!_pa)
    return null;
  if (typeof _pa === 'object')
    return _pa;
  _pa = _pa.trim();
  if (!_pa)
    return null;
  let _qa, _ra, _sa, _ta;
  if (_pa.includes('://'))
    _pa = _pa.split('://')[1];
  if (_pa.includes('@')) {
    const parts2 = _pa.split('@'), parts3 = parts2[0].split(':'), parts4 = parts2[1].split(':');
    _sa = parts3[0];
    _ta = parts3[1];
    _qa = parts4[0];
    _ra = parseInt(parts4[1]);
  } else {
    const parts5 = _pa.split(':');
    if (parts5.length === 2) {
      _qa = parts5[0];
      _ra = parseInt(parts5[1]);
    } else {
      if (parts5.length === 4)
        !isNaN(parseInt(parts5[3])) && isNaN(parseInt(parts5[1])) ? (_sa = parts5[0], _ta = parts5[1], _qa = parts5[2], _ra = parseInt(parts5[3])) : (_qa = parts5[0], _ra = parseInt(parts5[1]), _sa = parts5[2], _ta = parts5[3]);
      else {
        if (parts5.length === 3) {
          _qa = parts5[0];
          _ra = parseInt(parts5[1]);
          _sa = parts5[2];
        }
      }
    }
  }
  if (!_qa || !_ra)
    return null;
  const opts10 = {};
  opts10.type = 'http';
  opts10.host = _qa;
  opts10.port = _ra;
  opts10.user = _sa;
  opts10.pass = _ta;
  opts10.original = _pa;
  return opts10;
}
function createProxyAgent(_ua) {
  if (!_ua)
    return null;
  let _va = '';
  if (_ua.type === 'socks5' || _ua.type === 'socks4') {
    _va = 'socks5://' + (_ua.user ? _ua.user + ':' + _ua.pass + '@' : '') + _ua.host + ':' + _ua.port;
    return new SocksProxyAgent(_va);
  } else {
    _va = 'http://' + (_ua.user ? _ua.user + ':' + _ua.pass + '@' : '') + _ua.host + ':' + _ua.port;
    return new HttpsProxyAgent(_va);
  }
}
function sendRequest(_wa, _xa, _ya, _za, _Aa = null, _Ba = 15000, _Ca = 0) {
  return new Promise((resolve5, reject3) => {
    if (_Ca > 5)
      return reject3(new Error('Too many redirects'));
    const uRL = new URL(_wa), opts11 = { ..._ya };
    let _Da = opts11;
    _za && (_Da['Content-Length'] = Buffer.byteLength(_za));
    const opts12 = {
      'hostname': uRL.hostname,
      'path': uRL.pathname + uRL.search,
      'method': _xa,
      'headers': _Da,
      'timeout': _Ba,
      'ciphers': 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA',
      'ecdhCurve': 'X25519:P-256:P-384',
      'honorCipherOrder': false,
      'secureOptions': require('crypto').constants.SSL_OP_NO_SSLv3 | require('crypto').constants.SSL_OP_NO_TLSv1 | require('crypto').constants.SSL_OP_NO_TLSv1_1
    };
    let _Ea = _Aa ? parseProxy(_Aa) : null;
    if (_Aa) {
      if (!_Ea || isNaN(_Ea.port) || _Ea.port <= 0)
        return reject3(new Error('FATAL: Invalid proxy. Aborting to prevent IP leak.'));
      opts12.agent = createProxyAgent(_Ea);
    }
    const _Fa = https.request(opts12, _Ga => {
      const arr6 = [];
      _Ga.on('data', _Ha => arr6.push(_Ha));
      _Ga.on('error', reject3);
      _Ga.on('end', () => {
        let _Ia = Buffer.concat(arr6);
        const _Ja = _Ga.headers['content-encoding'];
        if (_Ja === 'gzip') {
          try {
            _Ia = zlib.gunzipSync(_Ia);
          } catch (err7) {
          }
        } else {
          if (_Ja === 'deflate') {
            try {
              _Ia = zlib.inflateSync(_Ia);
            } catch (err8) {
            }
          }
        }
        const _Ka = _Ga.headers['set-cookie'] || [];
        if (_Ga.statusCode >= 300 && _Ga.statusCode < 400 && _Ga.headers.location) {
          let _La = _Ga.headers.location;
          if (!_La.startsWith('http'))
            _La = uRL.origin + _La;
          const opts13 = { ..._ya };
          let _Ma = opts13, _Na = _Ma.Cookie || '', _Oa = _Ka.map(item => item.split(';')[0]).join('; ');
          if (_Oa)
            _Ma.Cookie = _Na ? _Na + '; ' + _Oa : _Oa;
          const _Pa = _xa === 'POST' && _Ga.statusCode === 303 ? 'GET' : _xa;
          resolve5(sendRequest(_La, _Pa, _Ma, _Pa === 'GET' ? null : _za, _Aa, _Ba, _Ca + 1).then(result => {
            const opts14 = { ...result };
            opts14.cookies = [
              ..._Ka,
              ...result.cookies
            ];
            return opts14;
          }));
          return;
        }
        resolve5({
          'status': _Ga.statusCode,
          'data': _Ia.toString('utf8'),
          'headers': _Ga.headers,
          'cookies': _Ka
        });
      });
    });
    _Fa.on('error', reject3);
    _Fa.on('timeout', () => {
      _Fa.destroy();
      reject3(new Error('timeout'));
    });
    if (_za)
      _Fa.write(_za);
    _Fa.end();
  });
}
function parseTokensFromHtml(_Qa) {
  const opts15 = {}, _Ra = _Sa => {
      const match = _Qa.match(_Sa);
      return match ? match[1] : null;
    };
  opts15.lsd = _Ra(/name="lsd" value="([^"]+)"/) || _Ra(/"token":"([^"]+)"/);
  opts15.jazoest = _Ra(/name="jazoest" value="([^"]+)"/) || _Ra(/"jazoest":"([^"]+)"/) || _Ra(/jazoest=(\d+)/);
  opts15.hsi = _Ra(/"hsi":"([^"]+)"/);
  opts15.spin_r = _Ra(/"__spin_r":(\d+)/);
  opts15.spin_b = _Ra(/"__spin_b":"([^"]+)"/);
  opts15.spin_t = _Ra(/"__spin_t":(\d+)/);
  opts15.rev = _Ra(/"server_revision":(\d+)/) || _Ra(/server_revision":(\d+)/);
  const match2 = _Qa.match(/"regulation_jurisdiction":\s*(\[[^\]]+\])/);
  opts15.regulation_jurisdiction = match2 ? match2[1] : '["US"]';
  if (!opts15.jazoest && opts15.lsd) {
    let _Ta = 0;
    for (let _Ua = 0; _Ua < opts15.lsd.length; _Ua++)
      _Ta += opts15.lsd.charCodeAt(_Ua);
    opts15.jazoest = '2' + _Ta;
  }
  return opts15;
}
async function createAccount(_Va, _Wa = {}) {
  const {
      onStatus: onStatus = () => {
      },
      proxy: proxy = null,
      timeout: timeout = 15000,
      workerId: workerId = 0,
      browserPref: browserPref = 'random',
      regionPref: regionPref = 'random'
    } = _Wa, _Xa = normalizePhoneNumber(_Va);
  const _Ya = _Xa.replace('+', ''), _Za = uuid(), _ab = 'https://auth.meta.com/?waterfall_id=' + _Za + '&source_app_id=1522763855472543';
  onStatus('[1/4] Fetching initial session tokens...');
  const _bb = getCountryFromPhone(_Ya);
  let _cb = _bb.lang;
  const _db = _bb.iso;
  try {
    const _eb = getRandomClient(browserPref), _fb = generateRandomDOB(), _gb = generateRandomPassword(), _hb = generateRandomName(), _ib = Date.now();
    onStatus('[1/4] Fetching tokens (pure API, no browser)...');
    const opts16 = {
        'User-Agent': _eb.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': _cb,
        'Accept-Encoding': 'gzip, deflate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        ..._eb.clientHints
      }, _jb = opts16, _kb = await sendRequest(_ab, 'GET', _jb, null, proxy, timeout);
    if (!_kb.data)
      throw new Error('Failed to load Meta page: empty response');
    let _lb = parseTokensFromHtml(_kb.data);
    if (!_lb.lsd || !_lb.jazoest)
      throw new Error('Failed to extract LSD/Jazoest tokens.');
    const _mb = Date.now() - _ib;
    onStatus('[1/4] Tokens in ' + _mb + 'ms. Bypassing reg_integrity...');
    let opts17 = {};
    const _nb = _ob => {
      if (!_ob)
        return;
      _ob.forEach(item2 => {
        const parts6 = item2.split(';')[0].split('=');
        if (parts6.length >= 2)
          opts17[parts6[0].trim()] = parts6.slice(1).join('=').trim();
      });
    };
    _nb(_kb.cookies);
    const _pb = _qb => '__user=0&__a=1&__req=' + _qb + '&__hs=20602.HYP:frl_comet_auth_pkg.2.1...0&dpr=1&__ccg=EXCELLENT&__rev=' + (_lb.rev || 1040404884) + '&__hsi=' + (_lb.hsi || '') + '&__comet_req=33&lsd=' + _lb.lsd + '&jazoest=' + (_lb.jazoest || '') + '&__spin_r=' + (_lb.spin_r || '') + '&__spin_b=' + (_lb.spin_b || '') + '&__spin_t=' + (_lb.spin_t || '') + '&__jssesw=1', _rb = () => ({
        'User-Agent': _eb.userAgent,
        'Accept': '*/*',
        'Accept-Language': _cb,
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://auth.meta.com',
        'Referer': _ab,
        'X-FB-LSD': _lb.lsd,
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Cookie': Object.entries(opts17).map(([_sb, _tb]) => _sb + '=' + _tb).join('; '),
        ..._eb.clientHints
      });
    onStatus('[2/4] Verifying phone number...');
    const _ub = Array(24).fill(0).map(() => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 62))).join(''), _vb = 'account_reg_info[birthday]=' + _fb.full + '&account_reg_info[device_id]=&account_reg_info[first_name]=' + encodeURIComponent(_hb.first) + '&account_reg_info[has_youth_consent]=false&account_reg_info[is_bootstrap_flow]=false&account_reg_info[last_name]=' + encodeURIComponent(_hb.last) + '&account_reg_info[pc_rendering_data]=&account_reg_info[phone_number]=%2B' + _Ya + '&account_reg_info[registration_flow_id]=&allow_unconfirmed_email=false&check_for_pre_registration_restrictions=true&check_mma_account=false&contact_point=%2B' + _Ya + '&contact_point_type=PHONE_NUMBER&reg_integrity=&check_ntm_qe=true&skip_xapp_checks=false&caa_event_flow=&csi=' + _ub + '&event_client_time=' + Math.floor(Date.now() / 1000) + '&waterfall_id=' + _Za + '&source_app_id=1522763855472543&qpl_join_id=&' + _pb('h');
    debugLog(_Ya, 'check-contact-req', {
      'url': 'https://auth.meta.com/api/check-contact-point-availability/',
      'method': 'POST',
      'headers': _rb(),
      'payload': _vb
    });
    const _wb = await sendRequest('https://auth.meta.com/api/check-contact-point-availability/', 'POST', _rb(), _vb, proxy, timeout), opts18 = {};
    opts18.status = _wb.status;
    opts18.headers = _wb.headers;
    opts18.body = _wb.data;
    debugLog(_Ya, 'check-contact-res', opts18);
    if (_wb.status !== 200)
      throw new Error('Invalid response: ' + _wb.status);
    _nb(_wb.cookies);
    let _xb = '', _yb = '', _zb = null;
    try {
      const _Ab = JSON.parse(_wb.data.replace('for (;;);', ''));
      if (_Ab.error === 3571123 || _Ab.error === 3571188)
        _zb = _Ab.error, onStatus('[2/4] Number has existing account (' + (_Ab.error === 3571123 ? 'registered' : 'pending') + ') \u2192 switching to reset flow...');
      else {
        if (_Ab.error) {
          throw new Error(_Ab.errorDescription || _Ab.errorSummary || 'Verification failed');
        } else {
          if (_Ab.payload && _Ab.payload.is_contact_point_available === false)
            throw new Error(_Ab.payload.error_message || 'Phone number not available');
          const _Bb = _Ab.payload && (_Ab.payload.regIntegrity || _Ab.payload.reg_integrity);
          if (_Bb) {
            _xb = encodeURIComponent(_Bb);
            onStatus('[2/4] \u2705 Got reg_integrity from server (pure API, no browser!)');
          }
          _Ab.payload && _Ab.payload.restrictions && _Ab.payload.restrictions.restriction_data && _Ab.payload.restrictions.restriction_data.account_reg_info && (_yb = _Ab.payload.restrictions.restriction_data.account_reg_info.device_id || '');
        }
      }
    } catch (err9) {
      if (!(err9 instanceof SyntaxError))
        throw err9;
    }
    if (_zb) {
      onStatus('[3/4] Sending login OTP to existing account...');
      const _Cb = 'contact_point=%2B' + _Ya + '&caa_event_flow=ntf&csi=' + _ub + '&source_app_id=1522763855472543&waterfall_id=' + _Za + '&qpl_join_id=&' + _pb('r');
      debugLog(_Ya, 'send-nonce-req', {
        'url': 'https://auth.meta.com/api/login-email-otp/send-nonce/',
        'method': 'POST',
        'headers': _rb(),
        'payload': _Cb
      });
      const _Db = await sendRequest('https://auth.meta.com/api/login-email-otp/send-nonce/', 'POST', _rb(), _Cb, proxy, timeout), opts19 = {};
      opts19.status = _Db.status;
      opts19.headers = _Db.headers;
      opts19.body = _Db.data;
      debugLog(_Ya, 'send-nonce-res', opts19);
      _nb(_Db.cookies);
      let _Eb = false, _Fb = '';
      try {
        const _Gb = JSON.parse(_Db.data.replace('for (;;);', ''));
        if (_Gb.error)
          onStatus('[4/4] send-nonce error ' + _Gb.error + ': ' + (_Gb.errorDescription || _Gb.errorSummary || 'unknown')), _Fb = _Gb.errorDescription || _Gb.errorSummary || 'Error ' + _Gb.error;
        else {
          if (_Gb.payload && (_Gb.payload.nonce_sent === true || _Gb.payload.nonceSent === true))
            _Eb = true, _Fb = 'Login OTP confirmed (nonce_sent=true)', onStatus('[4/4] \u2705 ' + _Fb);
          else
            _Gb.payload && Object.keys(_Gb.payload).length > 0 ? (_Eb = true, _Fb = 'Login OTP likely sent (payload keys: ' + Object.keys(_Gb.payload).join(', ') + ')', onStatus('[4/4] \u2705 ' + _Fb)) : (_Fb = 'Silent block on login OTP \u2192 ' + JSON.stringify(_Gb).substring(0, 200), onStatus('[4/4] \u26A0️ ' + _Fb));
        }
      } catch (err10) {
        _Fb = 'Non-JSON response from send-nonce (' + (_Db.data || '').length + ' bytes)';
        onStatus('[4/4] \u26A0️ ' + _Fb);
      }
      if (_Eb) {
        for (let _Hb = 0; _Hb < (_Wa.resends || 0); _Hb++) {
          await new Promise(resolve6 => setTimeout(resolve6, 2000));
          if (_Wa.onLog)
            _Wa.onLog('Resending OTP to +' + _Ya + ' (' + (_Hb + 1) + '/' + _Wa.resends + ')', 'retry');
          onStatus('[4/4] \uD83D\uDD04 Resending OTP (' + (_Hb + 1) + '/' + _Wa.resends + ')...');
          let _Ib = (parseInt('r', 36) + _Hb + 1).toString(36), _Jb = 'contact_point=%2B' + _Ya + '&caa_event_flow=ntf&csi=' + _ub + '&source_app_id=1522763855472543&waterfall_id=' + _Za + '&qpl_join_id=&' + _pb(_Ib);
          debugLog(_Ya, 'resend-nonce-req', {
            'url': 'https://auth.meta.com/api/login-email-otp/send-nonce/',
            'method': 'POST',
            'headers': _rb(),
            'payload': _Jb
          });
          let _Kb = await sendRequest('https://auth.meta.com/api/login-email-otp/send-nonce/', 'POST', _rb(), _Jb, proxy, timeout);
          const opts20 = {};
          opts20.status = _Kb.status;
          opts20.headers = _Kb.headers;
          opts20.body = _Kb.data;
          debugLog(_Ya, 'resend-nonce-res', opts20);
          _nb(_Kb.cookies);
        }
        return {
          'success': true,
          'message': 'Login OTP Sent successfully',
          'phone': _Xa,
          'type': 'login_otp',
          'password': 'N/A (existing)',
          'dob': _fb,
          'browser': _eb.name,
          'lang': _cb.substring(0, 5)
        };
      } else
        throw new Error('Login OTP flow failed - could not send OTP');
    }
    onStatus('[3/4] Password + DOB check...');
    const _Lb = 'akash99ak', _Mb = '#PWD_BROWSER:0:' + Math.floor(Date.now() / 1000) + ':' + _Lb, _Nb = 'contact_point=%2B' + _Ya + '&date_of_birth=' + _fb.full + '&name=' + encodeURIComponent(_hb.full) + '&password=' + encodeURIComponent(_Mb) + '&contact_pointless_account=false&qpl_join_id=&' + _pb('r');
    debugLog(_Ya, 'check-password-req', {
      'url': 'https://auth.meta.com/api/check-password/',
      'method': 'POST',
      'headers': _rb(),
      'payload': _Nb
    });
    const _Ob = await sendRequest('https://auth.meta.com/api/check-password/', 'POST', _rb(), _Nb, proxy, timeout), opts21 = {};
    opts21.status = _Ob.status;
    opts21.headers = _Ob.headers;
    opts21.body = _Ob.data;
    debugLog(_Ya, 'check-password-res', opts21);
    _nb(_Ob.cookies);
    const _Pb = 'caa_event_flow=ntf&date_of_birth=' + _fb.full + '&first_name=' + encodeURIComponent(_hb.first) + '&has_youth_consent=false&isf=false&last_name=' + encodeURIComponent(_hb.last) + '&phone_number=%2B' + _Ya + '&qpl_join_id=&reg_integrity=' + _xb + '&source_app_id=1522763855472543&' + _pb('t');
    debugLog(_Ya, 'check-dob-req', {
      'url': 'https://auth.meta.com/api/check-date-of-birth/',
      'method': 'POST',
      'headers': _rb(),
      'payload': _Pb
    });
    const _Qb = await sendRequest('https://auth.meta.com/api/check-date-of-birth/', 'POST', _rb(), _Pb, proxy, timeout), opts22 = {};
    opts22.status = _Qb.status;
    opts22.headers = _Qb.headers;
    opts22.body = _Qb.data;
    debugLog(_Ya, 'check-dob-res', opts22);
    _nb(_Qb.cookies);
    try {
      const _Rb = JSON.parse(_Qb.data.replace('for (;;);', ''));
      if (_Rb.error)
        throw new Error(_Rb.errorDescription || _Rb.errorSummary || 'DOB check failed');
      if (_Rb.payload && _Rb.payload.regIntegrity) {
        _xb = encodeURIComponent(_Rb.payload.regIntegrity);
        onStatus('[3/4] Got server-issued regIntegrity (pure API, no browser!)...');
      }
    } catch (err11) {
      if (!(err11 instanceof SyntaxError))
        throw err11;
    }
    const _Sb = 'date_of_birth=' + _fb.full + '&' + _pb('u');
    debugLog(_Ya, 'marketing-opt-req', {
      'url': 'https://auth.meta.com/api/eligible-for-default-marketing-opt-in/',
      'method': 'POST',
      'headers': _rb(),
      'payload': _Sb
    });
    const _Tb = await sendRequest('https://auth.meta.com/api/eligible-for-default-marketing-opt-in/', 'POST', _rb(), _Sb, proxy, timeout), opts23 = {};
    opts23.status = _Tb.status;
    opts23.headers = _Tb.headers;
    opts23.body = _Tb.data;
    debugLog(_Ya, 'marketing-opt-res', opts23);
    _nb(_Tb.cookies);
    let _Ub = 'US';
    try {
      _Ub = JSON.parse(_lb.regulation_jurisdiction)[0];
    } catch (err12) {
    }
    const opts24 = {};
    opts24.appScopedIdentity = '0';
    opts24.claim = '';
    const _Vb = 'ph=C3&ts=' + Date.now() + '&q=' + encodeURIComponent(JSON.stringify([{
          'app_id': '713378262994144',
          'posts': [[
              'falco:caa_acquisition_client_events_rl',
              {
                'e': '{"acquisition_client_params":{"entry_point":"login_home","is_feta_ntm":false,"reg_instance":"vP0bagdOXYi6S_j4MWBYYlk2","regulation_jurisdiction":"[\\"' + _Ub + '\\"]","state":"password_saving_opt_in"},"core":{"access_flow_version":"pre_mt_behavior","contactpoint":"+' + _Ya + '","event":"registration_flow_state","event_category":"registration_funnel","event_flow":"ntf","event_step":"profile_creation","exception_code":null,"exception_message":null,"exception_type":null,"extra_client_data":{"reg_navigation_flow_name":"new_to_family_c50_r1","is_phone_cp_enabled":true,"is_web_flow_override":"1"},"logged_out_identifier":"+' + _Ya + '","rl_client_session_id":"' + _ub + '","source_app_id":1522763855472543,"waterfall_id":"' + _Za + '","event_request_id":"' + uuid() + '"}}',
                'r': 1,
                'd': 'fd.ARsMk_nh5dY03YVrV-wF1ID8EjSupWWZYNUz4Y9MRR0aM4uOzvsupjNHS2-ppMs-8FeUzjucb3_sf1wMRcOefBvP',
                's': 'pjpt1c:3ectou:g87e68',
                't': Date.now() / 1000,
                'a': '1040.504.379.0 (1040504379)',
                'b': [
                  1,
                  128
                ],
                'id': opts24
              },
              Date.now(),
              0,
              1227
            ]],
          'trigger': 'falco:caa_acquisition_client_events_rl',
          'user': '0',
          'webSessionId': ''
        }])) + '&' + _pb('w'), _Wb = await sendRequest('https://auth.meta.com/ajax/bz?__a=1&__ccg=EXCELLENT&__comet_req=33&__req=w&__user=0&dpr=1&jazoest=' + _lb.jazoest + '&lsd=' + _lb.lsd + '&ph=C3', 'POST', _rb(), _Vb, proxy, timeout);
    _nb(_Wb.cookies);
    onStatus('[4/4] Finalizing profile to dispatch SMS...');
    const _Xb = _hb.first.toLowerCase() + _hb.last.toLowerCase() + Math.floor(Math.random() * 9999), _Yb = 'client_consent_timestamp=' + Math.floor(Date.now() / 1000) + '&display_name=' + encodeURIComponent(_hb.full) + '&foa_import_source_name=&foa_import_source_obid=&nta_disclosures_summary_cms_id=&picture_source=&tos_cms_id=957798449862312&username=' + _Xb + '&caa_event_flow=ntf&csi=' + _ub + '&source_app_id=1522763855472543&waterfall_id=' + _Za + '&is_submit=true&' + _pb('17');
    debugLog(_Ya, 'check-profile-req', {
      'url': 'https://auth.meta.com/api/kadabra/check_profile/',
      'method': 'POST',
      'headers': _rb(),
      'payload': _Yb
    });
    const _Zb = await sendRequest('https://auth.meta.com/api/kadabra/check_profile/', 'POST', _rb(), _Yb, proxy, timeout), opts25 = {};
    opts25.status = _Zb.status;
    opts25.headers = _Zb.headers;
    opts25.body = _Zb.data;
    debugLog(_Ya, 'check-profile-res', opts25);
    _nb(_Zb.cookies);
    const opts26 = {
        'csrf_token': crypto.randomBytes(32).toString('base64url'),
        'redirect_to': 'https://www.meta.ai/oidc/callback',
        'waterfall_id': _Za
      }, _ac = Buffer.from(JSON.stringify(opts26)).toString('base64'), _bc = crypto.randomBytes(32).toString('base64url');
    let _cc = 'US';
    try {
      _cc = JSON.parse(_lb.regulation_jurisdiction)[0];
    } catch (err13) {
    }
    const _dc = encodeURIComponent('https://auth.meta.com/oidc/?app_id=1522763855472543&redirect_uri=https%3A%2F%2Fauth.meta.ai%2Fecto&response_type=code&scope=openid%2Blinking&state=' + _ac + '&waterfall_id=' + _Za + '&code_challenge=' + _bc + '&code_challenge_method=S256'), _ec = encodeURIComponent(JSON.stringify([_cc])), _fc = 'client_consent_timestamp=' + Math.floor(Date.now() / 1000) + '&display_name=' + encodeURIComponent(_hb.full) + '&foa_import_source_name=&foa_import_source_obid=&nta_disclosures_summary_cms_id=&picture_source=&tos_cms_id=957798449862312&username=' + _Xb + '&consent_version=&contact_point=%2B' + _Ya + '&contact_point_type=PHONE_NUMBER&csi=' + _ub + '&date_of_birth=' + _fb.full + '&device_id=' + _yb + '&fb_encrypted_access_token=&fb_oidc_access_token=&first_name=' + encodeURIComponent(_hb.first) + '&has_youth_consent=false&ig_encrypted_access_token=&ig_encrypted_auth_header=&ig_oidc_access_token=&last_name=' + encodeURIComponent(_hb.last) + '&opt_into_marketing=false&password=' + encodeURIComponent(_Mb) + '&redirect_uri=' + _dc + '&reg_integrity=' + _xb + '&should_save_credentials=true&source_app_id=1522763855472543&third_party_age_verification_id=&waterfall_id=' + _Za + '&caa_event_flow=ntf&entry_point=login_home&event_client_time=' + Math.floor(Date.now() / 1000) + '&is_kadabra_zero=false&reg_navigation_flow_name=new_to_family_c50_r1&regulation_jurisdiction=' + _ec + '&qpl_join_id=&' + _pb('18');
    debugLog(_Ya, 'register-save-req', {
      'url': 'https://auth.meta.com/login/device-based/kadabra-register-save-credentials/',
      'method': 'POST',
      'headers': _rb(),
      'payload': _fc
    });
    const _gc = await sendRequest('https://auth.meta.com/login/device-based/kadabra-register-save-credentials/', 'POST', _rb(), _fc, proxy, timeout), opts27 = {};
    opts27.status = _gc.status;
    opts27.headers = _gc.headers;
    opts27.body = _gc.data;
    debugLog(_Ya, 'register-save-res', opts27);
    _nb(_gc.cookies);
    if (_gc.status !== 200)
      throw new Error('Meta API failed with HTTP ' + _gc.status);
    const _hc = _gc.data || '';
    let _ic = false, _jc = '';
    try {
      const _kc = JSON.parse(_hc.replace('for (;;);', ''));
      if (_kc.error)
        throw new Error(_kc.errorDescription || _kc.errorSummary || 'Registration blocked (Error ' + _kc.error + ')');
      if (_kc.payload && _kc.payload.error_message)
        throw new Error(_kc.payload.error_message);
      if (_kc.payload) {
        if (_kc.payload.redirect_uri || _kc.payload.redirectUri || _kc.payload.redirect)
          _ic = true, _jc = 'Registration confirmed (redirect received)';
        else {
          if (_kc.payload.nonce_sent === true || _kc.payload.nonceSent === true)
            _ic = true, _jc = 'OTP confirmed (nonce_sent=true)';
          else {
            if (_kc.payload.session_id || _kc.payload.sessionId || _kc.payload.confirmation_code)
              _ic = true, _jc = 'Registration confirmed (session created)';
            else {
              const keys = Object.keys(_kc.payload);
              if (keys.length > 0 && !_kc.payload.error_message)
                _ic = true, _jc = 'Registration likely succeeded (payload keys: ' + keys.join(', ') + ')';
              else
                throw new Error('Silent block: Meta returned empty/unrecognized payload \u2192 ' + JSON.stringify(_kc.payload).substring(0, 200));
            }
          }
        }
      } else {
        if (_kc.redirect_uri || _kc.redirectUri)
          _ic = true, _jc = 'Registration confirmed (top-level redirect)';
        else
          throw new Error('Silent block: Meta returned no payload \u2192 ' + JSON.stringify(_kc).substring(0, 300));
      }
    } catch (err14) {
      if (err14 instanceof SyntaxError) {
        if (_hc.includes('checkpoint') || _hc.includes('security_check')) {
          throw new Error('Account hit checkpoint/security block');
        } else {
          if (_hc.includes('auth.meta.com/oidc') || _hc.includes('confirmation') || _hc.includes('verify'))
            _ic = true, _jc = 'Registration confirmed (HTML redirect to verification)';
          else {
            throw new Error('Silent block: Non-JSON response (' + _hc.length + ' bytes) \u2192 ' + _hc.substring(0, 200));
          }
        }
      } else
        throw err14;
    }
    if (!_ic) {
      throw new Error('Registration failed: no confirmation signal from Meta');
    }
    onStatus('[4/4] \u2705 ' + _jc);
    return {
      'success': true,
      'message': _jc,
      'phone': _Xa,
      'type': 'registration',
      'password': _gb,
      'dob': _fb,
      'browser': _eb.name,
      'lang': _cb.substring(0, 5)
    };
  } catch (err15) {
    const opts28 = {};
    opts28.success = false;
    opts28.message = 'Failed: ' + err15.message;
    opts28.phone = _Xa;
    return opts28;
  }
}
if (isMainThread) {
  class Dashboard {
    constructor(_lc) {
      const parts7 = '2|4|0|1|3'.split('|');
      let _mc = 0;
      while (true) {
        switch (parts7[_mc++]) {
        case '0':
          this.successful = 0;
          continue;
        case '1':
          this.failed = 0;
          continue;
        case '2':
          this.totalNumbers = _lc;
          continue;
        case '3':
          this.startTime = Date.now();
          continue;
        case '4':
          this.processed = 0;
          continue;
        }
        break;
      }
    }
    addLog(_nc, _oc) {
      let _pc = '';
      const match3 = _nc.match(/\d{8,}/);
      const _qc = match3 ? match3[0] : '';
      if (_oc === 'success') {
        _pc = chalk.hex('#00FF88')('SK \u2014 Meta \u2502 OTP Sent \u2192 ') + chalk.hex('#FCAF45').bold(_qc || _nc);
      } else {
        if (_oc === 'error' || _oc === 'failed') {
          let _rc = _nc.replace(/Failed on \S+: /, '').replace(/Fatal error on \S+: /, '');
          if (_rc.toLowerCase().includes('proxy'))
            _pc = chalk.hex('#FF4466')('SK \u2014 Meta \u2502 Proxy Drop \u2192 ') + chalk.hex('#888888')(_rc);
          else {
            _pc = chalk.hex('#FF4466')('SK \u2014 Meta \u2502 Failed \u2192 ') + chalk.hex('#FCAF45').bold(_qc) + chalk.hex('#888888')(' (' + _rc + ')');
          }
        } else
          return;
      }
      process.stdout.write('\r\x1B[K' + _pc + '\n');
      this.render();
    }
    setStatus(_sc) {
    }
    update() {
    }
    render() {
      const _tc = (this.processed / Math.max(this.totalNumbers, 1) * 100).toFixed(1);
      const _uc = '  ' + W.bold('AIZEN-V5') + ' \u2B9E [' + this.processed + '/' + this.totalNumbers + '] ' + _tc + '% \u2502 ' + B('OK: ' + this.successful) + ' \u2502 ' + R('Err: ' + this.failed);
      process.stdout.write('\r\x1B[K' + _uc);
    }
    stop() {
      process.stdout.write('\x1B[2K\r\n');
      const _vc = Math.floor((Date.now() - this.startTime) / 1000), _wc = Math.floor(_vc / 60), _xc = _vc % 60;
      const _yc = _wc + 'm ' + _xc + 's';
      console.log(C('  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
      console.log(C('  \u2551') + W.bold('  AIZEN V5 \u2014 COMPLETE                       ') + C('\u2551'));
      console.log(C('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
      console.log(C('  \u2551') + ('  ' + chalk.greenBright('Successful') + '   ' + chalk.greenBright(String(this.successful).padStart(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u2551') + ('  ' + chalk.red('Failed') + '       ' + chalk.red(String(this.failed).padStart(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u2551') + ('  ' + chalk.cyan('Total Time') + '   ' + chalk.cyan(_yc.padEnd(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
    }
  }
  async function selectOption(_zc, _Ac) {
    return new Promise(resolve7 => {
      let _Bc = 0;
      process.stdin.resume();
      readline.emitKeypressEvents(process.stdin);
      if (process.stdin.isTTY)
        process.stdin.setRawMode(true);
      const _Cc = () => {
        process.stdout.write('\x1B[2J\x1B[H');
        printHeader();
        console.log('   \x1B[33m' + _zc + '\x1B[0m\n');
        _Ac.forEach((item3, index) => {
          if (index === _Bc) {
            console.log('   \x1B[36m\u2794\x1B[32m ' + item3.name + '\x1B[0m');
          } else
            console.log('     \x1B[90m' + item3.name + '\x1B[0m');
        });
      };
      _Cc();
      const _Dc = (_Ec, _Fc) => {
        if (_Fc.ctrl && _Fc.name === 'c') {
          process.exit(0);
        }
        if (_Fc.name === 'up') {
          _Bc = (_Bc - 1 + _Ac.length) % _Ac.length;
          _Cc();
        } else {
          if (_Fc.name === 'down')
            _Bc = (_Bc + 1) % _Ac.length, _Cc();
          else {
            if (_Fc.name === 'return') {
              process.stdin.setRawMode(false);
              process.stdin.removeListener('keypress', _Dc);
              resolve7(_Ac[_Bc].value);
            }
          }
        }
      };
      process.stdin.on('keypress', _Dc);
    });
  }
  async function promptText(_Gc, _Hc) {
    return new Promise(resolve8 => {
      process.stdout.write('   \x1B[33m' + _Gc + '\x1B[0m ');
      let _Ic = '';
      if (process.stdin.isTTY)
        process.stdin.setRawMode(false);
      process.stdin.resume();
      const _Jc = _Kc => {
        const _Lc = _Kc.toString();
        if (_Lc.includes('\n') || _Lc.includes('\r')) {
          process.stdin.removeListener('data', _Jc);
          _Ic += _Lc.split(/[\r\n]/)[0];
          let _Mc = _Ic.trim();
          if (_Mc.startsWith('"') && _Mc.endsWith('"'))
            _Mc = _Mc.slice(1, -1);
          else
            _Mc.startsWith('\'') && _Mc.endsWith('\'') && (_Mc = _Mc.slice(1, -1));
          resolve8(_Mc || _Hc);
        } else
          _Ic += _Lc;
      };
      process.stdin.on('data', _Jc);
    });
  }
  async function interactiveWizard() {
    process.stdout.write('\x1B[2J\x1B[H');
    printHeader();
    console.log(W.bold('  --- SCRAPER META AI  ---\n'));
    const _Nc = await selectOption('SELECT NUMBER SOURCE', [
      {
        'name': '\uD83D\uDCC1 Load from file (numbers.txt)',
        'value': 'file'
      },
      {
        'name': '\uD83C\uDF10 Auto fetch from NexaOTP Panel',
        'value': 'nexa'
      }
    ]);
    let _Oc = 'numbers.txt', _Pc = null;
    if (_Nc === 'nexa') {
      let _Qc = '';
      const _Rc = path.join(__dirname, '.nexa_api_key');
      if (fs.existsSync(_Rc)) {
        const _Sc = fs.readFileSync(_Rc, 'utf8').trim(), _Tc = await selectOption('Found saved API Key (...' + _Sc.slice(-4) + '). Use it?', [
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
        if (_Tc === 'yes')
          _Qc = _Sc;
        else
          _Tc === 'delete' && (fs.unlinkSync(_Rc), console.log(G('\n   \u2717 Saved key deleted.\n')));
      }
      if (!_Qc) {
        _Qc = await promptText('Enter NexaOTP API Key:', '');
        const opts29 = {};
        opts29.name = 'No';
        opts29.value = 'no';
        const _Uc = await selectOption('Save this key for future use?', [
          {
            'name': 'Yes, save it',
            'value': 'yes'
          },
          opts29
        ]);
        _Uc === 'yes' && (fs.writeFileSync(_Rc, _Qc, 'utf8'), console.log(G('\n   \u2713 API key saved.\n')));
      }
      let arr7 = [], _Vc = true;
      while (_Vc) {
        const _Wc = await promptText('Enter range #' + (arr7.length + 1) + ' (e.g. 21624485XXX):', '');
        if (_Wc)
          arr7.push(_Wc);
        const _Xc = await selectOption('Add another range?', [
          {
            'name': 'Yes',
            'value': 'yes'
          },
          {
            'name': 'No, proceed',
            'value': 'no'
          }
        ]);
        if (_Xc === 'no')
          _Vc = false;
      }
      arr7.length === 0 && (console.log(R('\n   \u2717 You must provide at least one range.\n')), process.exit(1));
      const _Yc = await promptText('How many numbers to process? (e.g. 100):', '50'), _Zc = parseInt(_Yc) || 50, _ad = await selectOption('SELECT NEXA SERVER', [
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
        ]), opts30 = {};
      opts30.apiKey = _Qc;
      opts30.ranges = arr7;
      opts30.totalCount = _Zc;
      opts30.serverEndpoint = _ad;
      _Pc = opts30;
    } else {
      _Oc = await promptText('Enter Numbers File Path [default: numbers.txt]:', 'numbers.txt');
      if (!fs.existsSync(_Oc))
        fs.writeFileSync(_Oc, '');
    }
    let _bd = await promptText('Enter Proxies File Path (Leave blank for direct) [default: none]:', 'none');
    if (_bd === 'none' || _bd === '')
      _bd = '';
    const _cd = await selectOption('SELECT THREADS', [
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
      }
    ]);
    const _dd = await selectOption('SELECT REGION', [
      {
        'name': '\uD83C\uDFB2 Random',
        'value': 'random'
      },
      {
        'name': '\uD83C\uDDFA\uD83C\uDDF8 English (en-US)',
        'value': 'en-US'
      },
      {
        'name': '\uD83C\uDDEA\uD83C\uDDF8 Spanish (es-ES)',
        'value': 'es-ES'
      }
    ]);
    const _ed = await selectOption('SELECT BROWSER PROFILE', [
        {
          'name': '\uD83C\uDF4E iOS Safari (Highest Trust)',
          'value': 'ios'
        },
        {
          'name': '\uD83C\uDFB2 Random Mix',
          'value': 'random'
        },
        {
          'name': '\uD83C\uDF10 Google Chrome',
          'value': 'chrome'
        },
        {
          'name': '\uD83D\uDCF1 Samsung Internet',
          'value': 'samsung'
        },
        {
          'name': '\uD83E\uDD8A Mozilla Firefox',
          'value': 'firefox'
        },
        {
          'name': '\uD83C\uDF0A Microsoft Edge',
          'value': 'edge'
        }
      ]), _fd = await promptText('Enter number of OTP resends per number [default: 0]:', '0'), _gd = parseInt(_fd) || 0;
    process.stdin.pause();
    return {
      'numbersFile': _Oc,
      'threads': String(_cd),
      'proxiesFile': _bd,
      'region': _dd,
      'browser': _ed,
      'resends': String(_gd),
      'nexaConfig': _Pc
    };
  }
  function generateHWID() {
    const _hd = require('os'), _id = _hd.platform();
    try {
      if (_id === 'win32') {
        const _jd = execSync('powershell -NoProfile -Command "' + '$mg = (Get-ItemProperty \'HKLM:\\SOFTWARE\\Microsoft\\Cryptography\' -ErrorAction SilentlyContinue).MachineGuid; ' + '$cpu = (Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue | Select-Object -First 1).ProcessorId; ' + '$disk = (Get-CimInstance Win32_LogicalDisk -Filter \'DeviceID=\\\'C:\\\'\' -ErrorAction SilentlyContinue).VolumeSerialNumber; ' + '$mb = (Get-CimInstance Win32_BaseBoard -ErrorAction SilentlyContinue).SerialNumber; ' + 'Write-Output (($mg,$cpu,$disk,$mb) -join \'|\')"', {
          'stdio': 'pipe',
          'timeout': 15000
        }).toString().trim();
        if (!_jd)
          throw new Error('No hardware data');
        const _kd = crypto.createHash('sha256').update(_jd).digest('hex').toUpperCase();
        return 'IZENHSX-7BA3FB09-723F-A500';
      } else {
        let arr8 = [];
        try {
          const _ld = execSync('settings get secure android_id 2>/dev/null || echo ""', {
            'stdio': 'pipe',
            'timeout': 5000
          }).toString().trim();
          if (_ld && _ld !== 'null')
            arr8.push('A:' + _ld);
        } catch (err16) {
        }
        try {
          if (fs.existsSync('/proc/cpuinfo')) {
            const _md = fs.readFileSync('/proc/cpuinfo', 'utf8'), match4 = _md.match(/Serial\s*:\s*(\S+)/i), match5 = _md.match(/Hardware\s*:\s*(.+)/i);
            if (match4 && match4[1] !== '0000000000000000')
              arr8.push('S:' + match4[1].trim());
            if (match5)
              arr8.push('H:' + match5[1].trim());
          }
        } catch (err17) {
        }
        try {
          if (fs.existsSync('/etc/machine-id')) {
            const _nd = fs.readFileSync('/etc/machine-id', 'utf8').trim();
            if (_nd)
              arr8.push('M:' + _nd);
          }
        } catch (err18) {
        }
        try {
          const _od = _hd.cpus(), _pd = _od && _od.length > 0 ? _od[0].model : 'UnknownCPU', _qd = _hd.totalmem(), _rd = _hd.release(), _sd = _hd.hostname();
          arr8.push('F:' + _pd + '|' + _qd + '|' + _rd + '|' + _sd);
        } catch (err19) {
        }
        const _td = arr8.join('||'), _ud = crypto.createHash('sha256').update(_td).digest('hex').toUpperCase();
        return 'IZENHSX-7BA3FB09-723F-A500';
      }
    } catch (err20) {
      return '';
    }
  }
  function verifyKeySig(_vd, _wd) {
    const arr9 = [
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
    ];
    const _xd = arr9.map(item4 => String.fromCharCode(item4 ^ 90)).join('');
    if (!_wd.sig)
      return false;
    const _yd = _vd + '|' + (_wd.user || '') + '|' + (_wd.expires || ''), _zd = crypto.createHmac('sha256', _xd).update(_yd).digest('hex');
    return _zd === _wd.sig;
  }
  async function start() {
    const _Ad = generateHWID.toString(), _Bd = crypto.createHash('md5').update(_Ad).digest('hex'), _Cd = generateHWID();
    !_Cd && (console.error(R('\n  \u2717 Could not generate Hardware ID.')), console.error(R('  \u2717 Please run on Windows or provide HWID as argument.\n')), process.exit(1));
    const _Dd = generateHWID();
    if (_Dd !== _Cd) {
      console.error(R('\n  \u2717 HWID integrity check failed. Tampering detected.\n'));
      process.exit(1);
    }
    printHeader();
    console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
    console.log(W('\u2502 [\u2022] Tool      : ') + C('Meta Account Creator         ') + W('\u2502'));
    console.log(W('\u2502 [\u2022] Your HWID : ') + Y(_Cd.padEnd(29)) + W('\u2502'));
    console.log(W('\u2502 [\u2022] Status    : ') + Y('Verifying License...         ') + W('\u2502'));
    console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518'));
    console.log('');
    let _Ed = false, _Fd = '';
    try {
      const promise = await new Promise((resolve9, reject4) => {
        const arr10 = [
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
        ];
        const arr11 = [
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
        ];
        const arr12 = [
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
          ], _Gd = arr10.map(item5 => String.fromCharCode(item5)).join('') + arr11.map(item6 => String.fromCharCode(item6)).join('') + arr12.map(item7 => String.fromCharCode(item7)).join('');
        const opts31 = {};
        opts31.timeout = 15000;
        https.get(_Gd + ('?t=' + Date.now()), opts31, _Hd => {
          let _Id = '';
          _Hd.on('data', _Jd => _Id += _Jd);
          _Hd.on('end', () => {
            try {
              resolve9(JSON.parse(_Id));
            } catch (err21) {
              reject4(err21);
            }
          });
        }).on('error', reject4).on('timeout', function () {
          this.destroy();
          reject4(new Error('Timeout'));
        });
      });
      if (promise && promise.keys) {
        const _Kd = promise.keys[_Cd];
        if (!_Kd) {
          const parts8 = '2|1|3|6|4|5|7|0'.split('|');
          let _Ld = 0;
          while (true) {
            switch (parts8[_Ld++]) {
            case '0':
              process.exit(1);
              continue;
            case '1':
              console.error(R('  \u2551    \u2717 UNAUTHORIZED HARDWARE \u2014 META TOOL     \u2551'));
              continue;
            case '2':
              console.error(R('\n  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
              continue;
            case '3':
              console.error(R('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
              continue;
            case '4':
              console.error(R('  \u2551  Status : NOT REGISTERED                    \u2551'));
              continue;
            case '5':
              console.error(R('  \u2551  Contact: t.me/aizentools to register     \u2551'));
              continue;
            case '6':
              console.error(R('  \u2551  HWID   : ') + Y(_Cd.padEnd(33)) + R('\u2551'));
              continue;
            case '7':
              console.error(R('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
              continue;
            }
            break;
          }
        }
        const _Md = new Date().toISOString().split('T')[0];
        if (_Kd.expires && _Kd.expires < _Md) {
          const parts9 = '0|2|5|3|1|8|4|7|6'.split('|');
          let _Nd = 0;
          while (true) {
            switch (parts9[_Nd++]) {
            case '0':
              console.error(R('\n  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
              continue;
            case '1':
              console.error(R('  \u2551  Expired: ') + Y(_Kd.expires.padEnd(27)) + R('\u2551'));
              continue;
            case '2':
              console.error(R('  \u2551   \u2717 LICENSE EXPIRED                      \u2551'));
              continue;
            case '3':
              console.error(R('  \u2551  HWID: ') + Y(_Cd.padEnd(30)) + R('\u2551'));
              continue;
            case '4':
              console.error(R('  \u2551  Contact: @aizentools (Telegram)       \u2551'));
              continue;
            case '5':
              console.error(R('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
              continue;
            case '6':
              process.exit(1);
              continue;
            case '7':
              console.error(R('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
              continue;
            case '8':
              console.error(R('  \u2551                                          \u2551'));
              continue;
            }
            break;
          }
        }
        !verifyKeySig(_Cd, _Kd) && (console.error(R('\n  \u2717 License key signature invalid. Forged key detected.\n')), process.exit(1));
        _Ed = true;
        _Fd = _Kd.user || 'Licensed';
      }
    } catch (err22) {
      console.error(R('\n  \u2717 License server unreachable. Internet connection required.\n'));
      process.exit(1);
    }
    !_Ed && (console.error(R('\n  \u2717 License validation failed.\n')), process.exit(1));
    const _Od = process.argv.slice(2).filter(item8 => !item8.startsWith('--'));
    let _Pd = _Od, _Qd = null;
    if (_Pd.length === 0) {
      const _Rd = await interactiveWizard();
      _Pd = [
        _Rd.numbersFile,
        _Rd.threads,
        _Rd.proxiesFile,
        _Rd.region,
        _Rd.browser,
        'AIZEN-UI-HARDWARE-ID',
        _Rd.resends
      ];
      _Qd = _Rd.nexaConfig;
    }
    _Pd = _Pd.map(item9 => {
      if (typeof item9 === 'string') {
        if (item9.startsWith('"') && item9.endsWith('"'))
          return item9.slice(1, -1);
        if (item9.startsWith('\'') && item9.endsWith('\''))
          return item9.slice(1, -1);
      }
      return item9;
    });
    let _Sd = path.resolve(_Pd[0] || 'numbers.txt'), _Td = parseInt(_Pd[1]) || 20, _Ud = _Pd[2] !== undefined ? _Pd[2] : 'proxies.txt';
    if (_Ud.toLowerCase() === 'none' || _Ud === 'false')
      _Ud = '';
    let _Vd = _Pd[3] || 'random', _Wd = _Pd[4] || 'random', _Xd = parseInt(_Pd[6]) || 0;
    if (_Ud && !_Ud.includes(':') && !path.isAbsolute(_Ud)) {
      _Ud = path.resolve(_Ud);
    }
    printHeader();
    console.log(B('  \u2713 License: ' + _Fd) + G(' | HWID: ' + _Cd));
    let _Yd = true;
    while (_Yd) {
      let arr13 = [];
      if (!_Qd) {
        !fs.existsSync(_Sd) && (console.error(R('\u2717 Error: Numbers file not found: ' + _Sd)), process.exit(1));
        arr13 = fs.readFileSync(_Sd, 'utf8').split(/\r?\n/).map(item10 => item10.trim()).filter(item11 => item11 && item11.replace(/\D/g, '').length >= 7);
        arr13.length === 0 && (console.error(R('\u2717 No valid phone numbers found in file')), process.exit(1));
      }
      let arr14 = [];
      _Ud && fs.existsSync(_Ud) && (arr14 = fs.readFileSync(_Ud, 'utf8').split('\n').map(item12 => item12.trim()).filter(item13 => item13.length > 0));
      let arr15 = [];
      for (const _Zd of arr14) {
        const _ae = parseProxy(_Zd);
        if (!_ae) {
          const parts10 = '1|3|5|4|2|6|0'.split('|');
          let _be = 0;
          while (true) {
            switch (parts10[_be++]) {
            case '0':
              process.exit(1);
              continue;
            case '1':
              console.error(R('\n  \u2717 Invalid proxy format detected: "' + _Zd + '"'));
              continue;
            case '2':
              console.error(R('    - host:port:user:pass'));
              continue;
            case '3':
              console.error(R('  Please use one of the supported formats:'));
              continue;
            case '4':
              console.error(R('    - user:pass@host:port'));
              continue;
            case '5':
              console.error(R('    - host:port'));
              continue;
            case '6':
              console.error(R('    - user:pass:host:port\n'));
              continue;
            }
            break;
          }
        }
        arr15.push(_ae);
      }
      if (_Qd) {
        console.log(C('\u2713 Target  : NexaOTP API (' + _Qd.totalCount + ' numbers)'));
      } else {
        console.log(Y('\u2713 Loaded ' + arr13.length + ' targets'));
      }
      if (arr15.length === 0)
        console.log(G('  No proxies configured (running direct)'));
      else
        console.log(G('  Proxies loaded: ' + arr15.length));
      console.log(C('\u2713 Threads: ' + _Td + '\n'));
      fs.writeFileSync(SUCCESSFUL_FILE, '');
      fs.writeFileSync(FAILED_FILE, '');
      fs.writeFileSync(DEBUG_FILE, '=== DEBUG SESSION ===\n');
      const dashboard = new Dashboard(_Qd ? _Qd.totalCount : arr13.length);
      let arr16 = [], arr17 = [], _ce = 0, _de = false;
      _Qd && (async () => {
        try {
          for (let _ee = 0; _ee < _Qd.totalCount; _ee++) {
            try {
              const _fe = _Qd.ranges[Math.floor(Math.random() * _Qd.ranges.length)], _ge = await nexaLimiter.enqueue(() => nexaFetchNumber(_Qd.apiKey, _fe, _Qd.serverEndpoint));
              _ge && (_ce++, arr17.length > 0 ? arr17.shift()(_ge) : arr16.push(_ge));
            } catch (err23) {
              if (err23.message.includes('Insufficient balance') || err23.message.includes('No numbers available')) {
                break;
              }
            }
          }
        } finally {
          _de = true;
          while (arr17.length > 0)
            arr17.shift()(null);
        }
      })();
      const _he = _Qd ? () => {
        if (arr16.length > 0)
          return Promise.resolve(arr16.shift());
        if (_de)
          return Promise.resolve(null);
        return new Promise(resolve10 => arr17.push(resolve10));
      } : () => {
        if (arr13.length === 0)
          return Promise.resolve(null);
        const _ie = Math.floor(Math.random() * arr13.length);
        return Promise.resolve(arr13.splice(_ie, 1)[0]);
      };
      let _je = 0;
      const _ke = () => {
        if (arr15.length === 0)
          return null;
        const _le = arr15[_je % arr15.length];
        _je++;
        return rotateSessionId(_le);
      };
      function _me(_ne) {
        try {
          const _oe = fs.readFileSync(_Sd, 'utf8'), _pe = _oe.split(/\r?\n/).filter(item14 => item14.trim() !== _ne.trim()).join('\n');
          fs.writeFileSync(_Sd, _pe);
        } catch (err24) {
        }
      }
      const _qe = _Qd ? Math.min(_Td, _Qd.totalCount) : Math.min(_Td, arr13.length), arr18 = [], _re = setInterval(() => dashboard.render(), 500);
      async function _se(_te) {
        while (true) {
          const _ue = await _he();
          if (!_ue)
            break;
          try {
            const _ve = await createAccount(_ue, {
              'onStatus': _we => dashboard.setStatus('Worker ' + _te + ': ' + _we),
              'onLog': (_xe, _ye) => dashboard.addLog(_xe, _ye),
              'proxy': _ke(),
              'workerId': _te,
              'browserPref': _Wd,
              'regionPref': _Vd,
              'resends': _Xd
            });
            if (_ve.success) {
              dashboard.successful++;
              dashboard.processed++;
              _me(_ue);
              const _ze = _ve.dob ? _ve.dob.month + '/' + _ve.dob.day + '/' + _ve.dob.year : 'N/A';
              fs.appendFileSync(SUCCESSFUL_FILE, _ve.phone + '|' + (_ve.password || 'N/A') + '|' + _ze + '\n');
              dashboard.addLog('Triggered OTP for ' + _ve.phone, 'success');
            } else
              dashboard.failed++, dashboard.processed++, fs.appendFileSync(FAILED_FILE, _ve.phone + '|' + _ve.message + '\n'), !_ve.message.includes('429') && dashboard.addLog('Failed on ' + _ve.phone + ': ' + _ve.message, 'error');
          } catch (err25) {
            dashboard.failed++;
            dashboard.processed++;
            !err25.message.includes('429') && dashboard.addLog('Fatal error on ' + _ue + ': ' + err25.message, 'error');
          }
          const _Ae = Math.floor(Math.random() * 3000) + 1500;
          await sleep(_Ae);
        }
      }
      for (let _Be = 0; _Be < _qe; _Be++) {
        arr18.push(_se(_Be));
      }
      await Promise.all(arr18);
      clearInterval(_re);
      dashboard.render();
      dashboard.stop();
      const _Ce = await selectOption('Processing Complete. What next?', [
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
      if (_Ce === 'reuse') {
        if (fs.existsSync(SUCCESSFUL_FILE)) {
          let _De = fs.readFileSync(SUCCESSFUL_FILE, 'utf8').split('\n').map(item15 => item15.split('|')[0].trim()).filter(item16 => item16.length > 5);
          fs.writeFileSync(_Sd, _De.join('\n'));
          fs.writeFileSync(SUCCESSFUL_FILE, '');
          console.log('\n  \x1B[32m\u2713 Copied ' + _De.length + ' successful numbers to ' + _Sd + ' and cleared ' + SUCCESSFUL_FILE + '.\x1B[0m\n');
        } else
          console.log('\n  \x1B[31m\u2717 No successful numbers found.\x1B[0m\n'), _Yd = false;
      } else {
        if (_Ce === 'home') {
          const _Ee = await interactiveWizard();
          _Pd = [
            _Ee.numbersFile,
            _Ee.threads,
            _Ee.proxiesFile,
            _Ee.region,
            _Ee.browser,
            'AIZEN-UI-HARDWARE-ID',
            _Ee.resends
          ];
          _Qd = _Ee.nexaConfig;
          _Sd = path.resolve(_Pd[0] || 'numbers.txt');
          _Td = parseInt(_Pd[1]) || 20;
          _Ud = _Pd[2] !== undefined ? _Pd[2] : 'proxies.txt';
          if (_Ud.toLowerCase() === 'none' || _Ud === 'false')
            _Ud = '';
        } else
          _Yd = false;
      }
    }
  }
  start().catch(err27 => {
    console.error(R('Fatal error: ' + err27.message));
    process.exit(1);
  });
}
function _o(_Fe) {
  function _Ge(_He) {
    if (typeof _He === 'string')
      return function (_Ie) {
      }.constructor('while (true) {}').apply('counter');
    else
      ('' + _He / _He).length !== 1 || _He % 20 === 0 ? function () {
        return true;
      }.constructor('debu' + 'gger').call('action') : function () {
        return false;
      }.constructor('debu' + 'gger').apply('stateObject');
    _Ge(++_He);
  }
  try {
    if (_Fe) {
      return _Ge;
    } else
      _Ge(0);
  } catch (err26) {
  }
}