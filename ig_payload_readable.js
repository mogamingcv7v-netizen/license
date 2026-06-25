// === AIZENTOOLS ===
// File: ig_payload.deobf.js
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
const https = require('https'), http = require('http'), zlib = require('zlib'), crypto = require('crypto'), chalk = require('chalk'), readline = require('readline'), {HttpsProxyAgent} = require('https-proxy-agent'), {SocksProxyAgent} = require('socks-proxy-agent'), NEXA_KEY_FILE = path.join(__dirname, 'nexa_key.txt'), NEXA_BASE = 'http://nexaotpservice.com/api/v1';
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
            if (_A.success && _A.number)
              resolve3(_A.number.replace(/[^0-9]/g, ''));
            else {
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
let SUCCESSFUL_FILE = 'successful.txt', FAILED_FILE = 'failed.txt', DEBUG_FILE = 'debug.txt';
function debugLog(_C, _D, _E) {
}
const B = chalk.hex('#FF0066'), C = chalk.hex('#FCAF45');
const Y = chalk.hex('#FFD700'), W = chalk.white, G = chalk.gray, R = chalk.hex('#FF6B6B'), DIM = chalk.hex('#555555');
function printHeader() {
  const parts = '6|8|1|10|4|3|2|0|9|7|11|5'.split('|');
  let _F = 0;
  while (true) {
    switch (parts[_F++]) {
    case '0':
      console.log(W('\u2502 [\u2022] OWNER      : ') + B('AIZENTOOLS                   ') + W('\u2502'));
      continue;
    case '1':
      console.log(B('  |_ _/ ___|  / ___| ___( )____ __| |_ ___  ____ '));
      continue;
    case '2':
      console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
      continue;
    case '3':
      console.log(Y('  |___\\____|  \\____\\___|  |_|\\__,_|\\__\\___/|_|   \n'));
      continue;
    case '4':
      console.log(C('   | | |_| | | |__|  __/  | | (_| | || (_) | |   '));
      continue;
    case '5':
      console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n'));
      continue;
    case '6':
      process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
      continue;
    case '7':
      console.log(W('\u2502 [\u2022] Status    : ') + G('Premium License              ') + W('\u2502'));
      continue;
    case '8':
      console.log(B('   ___ ____    ____                _             '));
      continue;
    case '9':
      console.log(W('\u2502 [\u2022] Telegram  : ') + C('t.me/aizentools            ') + W('\u2502'));
      continue;
    case '10':
      console.log(C('   | | |  _  | |   / _ \\|/ __/ _` | __/ _ \\|  __|'));
      continue;
    case '11':
      console.log(W('\u2502 [\u2022] Version   : ') + Y('V1.0.0                       ') + W('\u2502'));
      continue;
    }
    break;
  }
}
(function () {
  const _G = function () {
    let _H;
    try {
      _H = Function('return (function() ' + '{}.constructor("return this")( )' + ');')();
    } catch (err5) {
      _H = window;
    }
    return _H;
  };
  const _I = _G();
  _I.setInterval(_o, 4000);
}());
function normalizePhoneNumber(_J) {
  let _K = _J.replace(/[^0-9@.]/g, '');
  return _K;
}
const uuid = () => crypto.randomUUID();
function generateRandomDOB() {
  const _L = Math.floor(Math.random() * 16) + 1990;
  const _M = Math.floor(Math.random() * 12) + 1;
  const _N = Math.floor(Math.random() * 28) + 1;
  return {
    'day': _N,
    'month': _M,
    'year': _L,
    'full': _L + '-' + String(_M).padStart(2, '0') + '-' + String(_N).padStart(2, '0')
  };
}
function generateRandomPassword() {
  const _O = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
  let _P = '';
  for (let _Q = 0; _Q < 12; _Q++)
    _P += _O[Math.floor(Math.random() * _O.length)];
  return _P;
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
      'Joshua'
    ], arr2 = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis'
    ], _R = arr[Math.floor(Math.random() * arr.length)], _S = arr2[Math.floor(Math.random() * arr2.length)], opts4 = {};
  opts4.first = _R;
  opts4.last = _S;
  opts4.full = _R + ' ' + _S;
  return opts4;
}
function getRandomClient(_T = 'random') {
  const _U = Math.floor(Math.random() * 11) + 126, _V = Math.floor(Math.random() * 200) + 6400, _W = Math.floor(Math.random() * 150) + 50, opts5 = {};
  opts5['126'] = '"Not/A)Brand";v="8"';
  opts5['127'] = '"Not)A;Brand";v="99"';
  opts5['128'] = '"Not;A=Brand";v="8"';
  opts5['129'] = '"Not=A?Brand";v="8"';
  opts5['130'] = '"Not?A_Brand";v="99"';
  opts5['131'] = '"Not_A Brand";v="24"';
  opts5['132'] = '"Not A(Brand";v="8"';
  opts5['133'] = '"Not(A;Brand";v="99"';
  opts5['134'] = '"Not;A)Brand";v="24"';
  opts5['135'] = '"Not)A=Brand";v="8"';
  opts5['136'] = '"Not=A_Brand";v="99"';
  const _X = opts5, _Y = _X[_U] || '"Not A(Brand";v="24"', _Z = Math.random() > 0 + 0.5;
  if (_T === 'firefox') {
    const _aa = Math.floor(Math.random() * 11) + 120, opts6 = {};
    opts6.name = _Z ? 'Mac Firefox' : 'Windows Firefox';
    opts6.userAgent = _Z ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:' + _aa + '.0) Gecko/20100101 Firefox/' + _aa + '.0' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:' + _aa + '.0) Gecko/20100101 Firefox/' + _aa + '.0';
    opts6.clientHints = {};
    return opts6;
  } else {
    if (_T === 'edge') {
      const opts7 = {};
      opts7.name = 'Windows Edge';
      opts7.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _U + '.0.' + _V + '.' + _W + ' Safari/537.36 Edg/' + _U + '.0.' + _V + '.' + _W;
      opts7.clientHints = {};
      opts7.clientHints['sec-ch-ua'] = '"Chromium";v="' + _U + '", ' + _Y + ', "Microsoft Edge";v="' + _U + '"';
      opts7.clientHints['sec-ch-ua-mobile'] = '?0';
      opts7.clientHints['sec-ch-ua-platform'] = '"Windows"';
      opts7.clientHints['sec-ch-ua-platform-version'] = '"10.0.0"';
      return opts7;
    }
  }
  const opts8 = {};
  opts8.name = _Z ? 'Mac Chrome' : 'Windows Chrome';
  opts8.userAgent = _Z ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _U + '.0.' + _V + '.' + _W + ' Safari/537.36' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _U + '.0.' + _V + '.' + _W + ' Safari/537.36';
  opts8.clientHints = {};
  opts8.clientHints['sec-ch-ua'] = '"Chromium";v="' + _U + '", ' + _Y + ', "Google Chrome";v="' + _U + '"';
  opts8.clientHints['sec-ch-ua-mobile'] = '?0';
  opts8.clientHints['sec-ch-ua-platform'] = _Z ? '"macOS"' : '"Windows"';
  opts8.clientHints['sec-ch-ua-platform-version'] = _Z ? '"10.15.7"' : '"10.0.0"';
  return opts8;
}
function parseProxy(_ba) {
  if (!_ba)
    return null;
  if (typeof _ba === 'object')
    return _ba;
  _ba = _ba.trim();
  if (!_ba)
    return null;
  let _ca, _da, _ea, _fa;
  if (_ba.includes('://'))
    _ba = _ba.split('://')[1];
  if (_ba.includes('@')) {
    const parts2 = _ba.split('@'), parts3 = parts2[0].split(':'), parts4 = parts2[1].split(':');
    _ea = parts3[0];
    _fa = parts3[1];
    _ca = parts4[0];
    _da = parseInt(parts4[1]);
  } else {
    const parts5 = _ba.split(':');
    if (parts5.length === 2) {
      _ca = parts5[0];
      _da = parseInt(parts5[1]);
    } else {
      if (parts5.length === 4) {
        if (!isNaN(parseInt(parts5[3])) && isNaN(parseInt(parts5[1])))
          _ea = parts5[0], _fa = parts5[1], _ca = parts5[2], _da = parseInt(parts5[3]);
        else {
          _ca = parts5[0];
          _da = parseInt(parts5[1]);
          _ea = parts5[2];
          _fa = parts5[3];
        }
      } else
        parts5.length === 3 && (_ca = parts5[0], _da = parseInt(parts5[1]), _ea = parts5[2]);
    }
  }
  if (!_ca || !_da)
    return null;
  const opts9 = {};
  opts9.type = 'http';
  opts9.host = _ca;
  opts9.port = _da;
  opts9.user = _ea;
  opts9.pass = _fa;
  opts9.original = _ba;
  return opts9;
}
function rotateSessionId(_ga) {
  if (!_ga || !_ga.user)
    return _ga;
  const opts10 = { ..._ga }, _ha = opts10;
  if (_ha.user.includes('-ssid-')) {
    const _ia = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
    _ha.user = _ha.user.replace(/-ssid-[A-Za-z0-9_]+/, '-ssid-' + _ia);
  } else {
    if (_ha.user.includes('-session-')) {
      const _ja = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
      _ha.user = _ha.user.replace(/-session-[A-Za-z0-9_]+/, '-session-' + _ja);
    } else {
      if (/_sid_/i.test(_ha.user)) {
        const _ka = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
        _ha.user = _ha.user.replace(/_sid_[A-Za-z0-9]+/i, '_sid_' + _ka);
      }
    }
  }
  return _ha;
}
function createProxyAgent(_la) {
  if (!_la)
    return null;
  const _ma = typeof _la === 'string' ? parseProxy(_la) : _la;
  if (!_ma)
    return null;
  let _na = '';
  if (_ma.type === 'socks5' || _ma.type === 'socks4') {
    _na = 'socks5://' + (_ma.user ? encodeURIComponent(_ma.user) + ':' + encodeURIComponent(_ma.pass || '') + '@' : '') + _ma.host + ':' + _ma.port;
    return new SocksProxyAgent(_na);
  } else {
    _na = 'http://' + (_ma.user ? encodeURIComponent(_ma.user) + ':' + encodeURIComponent(_ma.pass || '') + '@' : '') + _ma.host + ':' + _ma.port;
    return new HttpsProxyAgent(_na);
  }
}
function sendRequest(_oa, _pa, _qa, _ra, _sa = null, _ta = 15000, _ua = {}) {
  return new Promise((resolve4, reject3) => {
    const uRL = new URL(_oa), opts11 = { ..._qa };
    let _va = opts11;
    !_va['Accept-Encoding'] && (_va['Accept-Encoding'] = 'gzip, deflate, br');
    _ra && (_va['Content-Length'] = Buffer.byteLength(_ra));
    const opts12 = {
      'hostname': uRL.hostname,
      'path': uRL.pathname + uRL.search,
      'method': _pa,
      'headers': _va,
      'timeout': _ta,
      'ciphers': 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256',
      'secureOptions': require('crypto').constants.SSL_OP_NO_SSLv3 | require('crypto').constants.SSL_OP_NO_TLSv1 | require('crypto').constants.SSL_OP_NO_TLSv1_1
    };
    let _wa = null;
    if (_sa) {
      _wa = typeof _sa === 'object' ? _sa : parseProxy(_sa);
      if (!_wa || isNaN(_wa.port) || _wa.port <= 0)
        return reject3(new Error('FATAL: Invalid proxy. Aborting to prevent IP leak.'));
      opts12.agent = createProxyAgent(_wa);
    }
    const _xa = https.request(opts12, _ya => {
      const arr3 = [];
      let _za = 0;
      const _Aa = _ua.maxBytes || 0;
      let _Ba = false;
      _ya.on('data', _Ca => {
        arr3.push(_Ca);
        _za += _Ca.length;
        _Aa > 0 && _za >= _Aa && !_Ba && (_Ba = true, _ya.destroy());
      });
      _ya.on('error', _Da => {
        if (_Ba)
          return _Ea();
        reject3(_Da);
      });
      const _Ea = () => {
        let _Fa = Buffer.concat(arr3);
        const _Ga = _ya.headers['content-encoding'];
        if (_Ga === 'gzip') {
          try {
            _Fa = zlib.gunzipSync(_Fa);
          } catch (err6) {
          }
        } else {
          if (_Ga === 'deflate') {
            try {
              _Fa = zlib.inflateSync(_Fa);
            } catch (err7) {
            }
          } else {
            if (_Ga === 'br') {
              try {
                _Fa = zlib.brotliDecompressSync(_Fa);
              } catch (err8) {
              }
            }
          }
        }
        const _Ha = _ya.headers['set-cookie'] || [];
        resolve4({
          'status': _ya.statusCode,
          'data': _Fa.toString('utf8'),
          'headers': _ya.headers,
          'cookies': _Ha
        });
      };
      _ya.on('end', _Ea);
    });
    _xa.on('error', reject3);
    _xa.on('timeout', () => {
      _xa.destroy();
      reject3(new Error('timeout'));
    });
    if (_ra)
      _xa.write(_ra);
    _xa.end();
  });
}
async function createAccount(_Ia, _Ja = {}) {
  const {
      onStatus: onStatus = () => {
      },
      proxy: proxy = null,
      timeout: timeout = 15000,
      workerId: workerId = 0,
      browserPref: browserPref = 'random'
    } = _Ja, _Ka = _Ia.includes('@');
  const _La = normalizePhoneNumber(_Ia);
  onStatus('[1/2] Fetching initial session tokens from IG...');
  try {
    const _Ma = generateRandomDOB(), _Na = generateRandomName(), _Oa = generateRandomPassword(), _Pa = _Na.first.toLowerCase() + _Na.last.toLowerCase() + Math.floor(Math.random() * 99999999), _Qa = getRandomClient(browserPref), opts13 = {
        'User-Agent': _Qa.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Upgrade-Insecure-Requests': '1',
        ..._Qa.clientHints
      }, _Ra = opts13, _Sa = await sendRequest('https://www.instagram.com/accounts/emailsignup/', 'GET', _Ra, null, proxy, timeout);
    let opts14 = {};
    const _Ta = _Ua => {
      if (!_Ua)
        return;
      _Ua.forEach(item => {
        const parts6 = item.split(';')[0].split('=');
        if (parts6.length >= 2)
          opts14[parts6[0].trim()] = parts6.slice(1).join('=').trim();
      });
    };
    _Ta(_Sa.cookies);
    if (!opts14.csrftoken)
      throw new Error('Failed to get csrftoken (Proxy might be blocked by IG)');
    const match = _Sa.data.match(/"LSD",\[\],{"token":"([^"]+)"/), _Va = match ? match[1] : '';
    onStatus('[2/2] Sending GraphQL Mutation to Trigger OTP...');
    const _Wa = uuid(), _Xa = uuid(), _Ya = '#PWD_BROWSER:0:' + Math.floor(Date.now() / 1000) + ':' + _Oa, opts15 = {};
    opts15.sensitive_string_value = _La;
    const opts16 = {};
    opts16.sensitive_string_value = '';
    const opts17 = {};
    opts17.sensitive_string_value = _Na.full;
    const opts18 = {};
    opts18.sensitive_string_value = '';
    const opts19 = {};
    opts19.sensitive_string_value = _Ya;
    const opts20 = {};
    opts20.sensitive_string_value = _Pa;
    const opts21 = {};
    opts21.actor_id = '0';
    opts21.client_mutation_id = _Wa;
    opts21.machine_id = opts14.mid || '';
    opts21.reg_data = {};
    opts21.sk_pipa_consent_given = null;
    opts21.waterfall_id = _Xa;
    opts21.reg_data.birthday_day = _Ma.day;
    opts21.reg_data.birthday_month = _Ma.month;
    opts21.reg_data.birthday_year = _Ma.year;
    opts21.reg_data.contactpoint = opts15;
    opts21.reg_data.contactpoint_type = _Ka ? 'EMAIL' : 'PHONE';
    opts21.reg_data.custom_gender = '';
    opts21.reg_data.did_use_age = false;
    opts21.reg_data.firstname = opts16;
    opts21.reg_data.fullname = opts17;
    opts21.reg_data.ig_age_block_data = null;
    opts21.reg_data.lastname = opts18;
    opts21.reg_data.preferred_pronoun = null;
    opts21.reg_data.reg_passwd__ = opts19;
    opts21.reg_data.sex = null;
    opts21.reg_data.use_custom_gender = false;
    opts21.reg_data.username = opts20;
    const opts22 = {};
    opts22.input = opts21;
    const _Za = opts22, _ab = new URLSearchParams({
        'av': '0',
        '__d': 'www',
        '__user': '0',
        '__a': '1',
        '__req': 'a',
        '__hs': '20617.HYP:instagram_web_pkg.2.1...0',
        'dpr': '1',
        '__ccg': 'GOOD',
        '__rev': '1041424994',
        '__comet_req': '7',
        'lsd': _Va,
        'fb_api_caller_class': 'RelayModern',
        'fb_api_req_friendly_name': 'useCAARegistrationFormSubmitMutation',
        'server_timestamps': 'true',
        'variables': JSON.stringify(_Za),
        'doc_id': '27029416779977343'
      }).toString(), _bb = () => ({
        'User-Agent': _Qa.userAgent,
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://www.instagram.com',
        'Referer': 'https://www.instagram.com/accounts/emailsignup/',
        'x-ig-app-id': '936619743392459',
        'x-fb-lsd': _Va,
        'x-csrftoken': opts14.csrftoken,
        'x-asbd-id': '129477',
        'x-instagram-ajax': '1',
        'x-fb-friendly-name': 'useCAARegistrationFormSubmitMutation',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Cookie': Object.entries(opts14).map(([_cb, _db]) => _cb + '=' + _db).join('; '),
        ..._Qa.clientHints
      });
    debugLog(_La, 'req-submit', _ab);
    const _eb = await sendRequest('https://www.instagram.com/api/graphql', 'POST', _bb(), _ab, proxy, timeout);
    _Ta(_eb.cookies);
    debugLog(_La, 'res-submit', _eb.data);
    if (_eb.data.includes('"status":"SUCCESS"') || _eb.data.includes('checkpoint_url') || _eb.data.includes('is_eligible_to_register":true')) {
      onStatus('[2/2] \u2705 OTP Dispatched (Triggered)');
      const opts23 = {};
      opts23.success = true;
      opts23.message = 'OTP Triggered successfully';
      opts23.phone = _La;
      opts23.browser = _Qa.name;
      return opts23;
    } else {
      if (_eb.data.includes('"status":"NOT_ALLOWED"')) {
        let _fb = 'NOT_ALLOWED (Blocked by IG Anti-Bot / Bad Proxy / IP Flagged)';
        throw new Error(_fb);
      } else {
        if (_eb.data.includes('error')) {
          let _gb = 'Unknown Error';
          try {
            const _hb = JSON.parse(_eb.data);
            if (_hb.data && _hb.data.caa_registration_homepage_submit && _hb.data.caa_registration_homepage_submit.errors && _hb.data.caa_registration_homepage_submit.errors.creation_errors && _hb.data.caa_registration_homepage_submit.errors.creation_errors.length > 0)
              _gb = _hb.data.caa_registration_homepage_submit.errors.creation_errors[0].message;
            else
              _hb.errors && _hb.errors.length > 0 && (_gb = _hb.errors[0].message);
          } catch (err9) {
          }
          throw new Error(_gb);
        } else {
          onStatus('[2/2] \u26A0️ OTP Unverified (Check debug log)');
          const opts24 = {};
          opts24.success = true;
          opts24.message = 'Request sent (verify debug log)';
          opts24.phone = _La;
          return opts24;
        }
      }
    }
  } catch (err10) {
    const opts25 = {};
    opts25.success = false;
    opts25.message = '' + err10.message;
    opts25.phone = _La;
    return opts25;
  }
}
if (isMainThread) {
  class Dashboard {
    constructor(_ib) {
      const parts7 = '4|3|1|0|2'.split('|');
      let _jb = 0;
      while (true) {
        switch (parts7[_jb++]) {
        case '0':
          this.failed = 0;
          continue;
        case '1':
          this.successful = 0;
          continue;
        case '2':
          this.startTime = Date.now();
          continue;
        case '3':
          this.processed = 0;
          continue;
        case '4':
          this.totalNumbers = _ib;
          continue;
        }
        break;
      }
    }
    addLog(_kb, _lb) {
      let _mb = '';
      const match2 = _kb.match(/\d{8,}/);
      const _nb = match2 ? match2[0] : '';
      if (_lb === 'success')
        _mb = chalk.hex('#00FF88')('SK \u2014 Insta \u2502 OTP Sent \u2192 ') + chalk.hex('#FCAF45').bold(_nb || _kb);
      else {
        if (_lb === 'error' || _lb === 'failed') {
          let _ob = _kb.replace(/Failed on \S+: /, '').replace(/Fatal error on \S+: /, '');
          if (_ob.toLowerCase().includes('proxy')) {
            _mb = chalk.hex('#FF4466')('SK \u2014 Insta \u2502 Proxy Drop \u2192 ') + chalk.hex('#888888')(_ob);
          } else {
            _mb = chalk.hex('#FF4466')('SK \u2014 Insta \u2502 Failed \u2192 ') + chalk.hex('#FCAF45').bold(_nb) + chalk.hex('#888888')(' (' + _ob + ')');
          }
        } else {
          return;
        }
      }
      process.stdout.write('\r\x1B[K' + _mb + '\n');
      this.render();
    }
    setStatus(_pb) {
    }
    update() {
    }
    render() {
      const _qb = this.processed / Math.max(this.totalNumbers, 1), _rb = (_qb * 100).toFixed(1), _sb = 20, _tb = Math.round(_qb * _sb), _ub = _sb - _tb;
      const _vb = chalk.hex('#00FF88')('\u2588'.repeat(_tb)) + chalk.hex('#333333')('\u2591'.repeat(_ub)), _wb = '  ' + chalk.hex('#FF0066').bold('AIZENTOOLS') + chalk.hex('#555555')(' \u2B9E ') + _vb + chalk.hex('#888888')(' ' + _rb + '%') + chalk.hex('#555555')('  \u2502  ') + chalk.hex('#00FF88').bold('\u2713 ' + this.successful) + chalk.hex('#555555')('  ') + chalk.hex('#FF4466').bold('\u2717 ' + this.failed) + chalk.hex('#555555')('  [' + this.processed + '/' + this.totalNumbers + ']');
      process.stdout.write('\r\x1B[K' + _wb);
    }
    stop() {
      process.stdout.write('\x1B[2K\r\n');
      const _xb = Math.floor((Date.now() - this.startTime) / 1000), _yb = Math.floor(_xb / 60), _zb = _xb % 60;
      const _Ab = _yb + 'm ' + _zb + 's';
      console.log(C('  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
      console.log(C('  \u2551') + W.bold('  IG ACCOUNT CREATOR \u2014 COMPLETE             ') + C('\u2551'));
      console.log(C('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
      console.log(C('  \u2551') + ('  ' + chalk.greenBright('Successful') + '   ' + chalk.greenBright(String(this.successful).padStart(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u2551') + ('  ' + chalk.red('Failed') + '       ' + chalk.red(String(this.failed).padStart(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u2551') + ('  ' + chalk.cyan('Total Time') + '   ' + chalk.cyan(_Ab.padEnd(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
    }
  }
  async function selectOption(_Bb, _Cb) {
    return new Promise(resolve5 => {
      let _Db = 0;
      process.stdin.resume();
      readline.emitKeypressEvents(process.stdin);
      if (process.stdin.isTTY)
        process.stdin.setRawMode(true);
      const _Eb = () => {
        process.stdout.write('\x1B[2J\x1B[H');
        printHeader();
        console.log('   \x1B[33m' + _Bb + '\x1B[0m\n');
        _Cb.forEach((item2, index) => {
          if (index === _Db)
            console.log('   \x1B[36m\u2794\x1B[35m ' + item2.name + '\x1B[0m');
          else {
            console.log('     \x1B[90m' + item2.name + '\x1B[0m');
          }
        });
      };
      _Eb();
      const _Fb = (_Gb, _Hb) => {
        if (_Hb.ctrl && _Hb.name === 'c')
          process.exit(0);
        if (_Hb.name === 'up')
          _Db = (_Db - 1 + _Cb.length) % _Cb.length, _Eb();
        else {
          if (_Hb.name === 'down') {
            _Db = (_Db + 1) % _Cb.length;
            _Eb();
          } else
            _Hb.name === 'return' && (process.stdin.setRawMode(false), process.stdin.removeListener('keypress', _Fb), resolve5(_Cb[_Db].value));
        }
      };
      process.stdin.on('keypress', _Fb);
    });
  }
  async function promptText(_Ib, _Jb) {
    return new Promise(resolve6 => {
      process.stdout.write('   \x1B[33m' + _Ib + '\x1B[0m ');
      let _Kb = '';
      if (process.stdin.isTTY)
        process.stdin.setRawMode(false);
      process.stdin.resume();
      const _Lb = _Mb => {
        const _Nb = _Mb.toString();
        if (_Nb.includes('\n') || _Nb.includes('\r')) {
          process.stdin.removeListener('data', _Lb);
          _Kb += _Nb.split(/[\r\n]/)[0];
          let _Ob = _Kb.trim();
          if (_Ob.startsWith('"') && _Ob.endsWith('"'))
            _Ob = _Ob.slice(1, -1);
          resolve6(_Ob || _Jb);
        } else
          _Kb += _Nb;
      };
      process.stdin.on('data', _Lb);
    });
  }
  async function interactiveWizard() {
    process.stdout.write('\x1B[2J\x1B[H');
    printHeader();
    console.log(W.bold('  --- SCRAPER IG AI  ---\n'));
    const _Pb = await selectOption('SELECT NUMBER SOURCE', [
      {
        'name': '\uD83D\uDCC1 Load from file (numbers.txt)',
        'value': 'file'
      },
      {
        'name': '\uD83C\uDF10 Auto fetch from NexaOTP Panel',
        'value': 'nexa'
      }
    ]);
    let _Qb = 'numbers.txt', _Rb = null;
    if (_Pb === 'nexa') {
      let _Sb = '';
      if (fs.existsSync(NEXA_KEY_FILE)) {
        _Sb = fs.readFileSync(NEXA_KEY_FILE, 'utf8').trim();
        const _Tb = await selectOption('Saved NexaOTP Key found (' + _Sb.substring(0, 10) + '...)', [
          {
            'name': 'Use saved key',
            'value': 'use'
          },
          {
            'name': 'Enter new key',
            'value': 'new'
          },
          {
            'name': 'Remove saved key',
            'value': 'remove'
          }
        ]);
        if (_Tb === 'remove') {
          fs.unlinkSync(NEXA_KEY_FILE);
          _Sb = '';
          console.log(G('\n   \u2713 Saved API key removed.\n'));
        } else
          _Tb === 'new' && (_Sb = '');
      }
      if (!_Sb) {
        _Sb = await promptText('Enter NexaOTP API Key:', '');
        const opts26 = {};
        opts26.name = 'No';
        opts26.value = 'no';
        const _Ub = await selectOption('Save this key for future use?', [
          {
            'name': 'Yes, save it',
            'value': 'yes'
          },
          opts26
        ]);
        _Ub === 'yes' && (fs.writeFileSync(NEXA_KEY_FILE, _Sb, 'utf8'), console.log(G('\n   \u2713 API key saved.\n')));
      }
      let arr4 = [], _Vb = true;
      while (_Vb) {
        const _Wb = await promptText('Enter range #' + (arr4.length + 1) + ' (e.g. 21624485XXX):', '');
        if (_Wb)
          arr4.push(_Wb);
        const _Xb = await selectOption('Add another range?', [
          {
            'name': 'Yes',
            'value': 'yes'
          },
          {
            'name': 'No, proceed',
            'value': 'no'
          }
        ]);
        if (_Xb === 'no')
          _Vb = false;
      }
      arr4.length === 0 && (console.log(R('\n   \u2717 You must provide at least one range.\n')), process.exit(1));
      const _Yb = await promptText('How many numbers to process? (e.g. 100):', '50'), _Zb = parseInt(_Yb) || 50, _ac = await selectOption('SELECT NEXA SERVER', [
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
        ]), opts27 = {};
      opts27.apiKey = _Sb;
      opts27.ranges = arr4;
      opts27.totalCount = _Zb;
      opts27.serverEndpoint = _ac;
      _Rb = opts27;
    } else {
      _Qb = await promptText('Enter Numbers/Emails File Path [default: numbers.txt]:', 'numbers.txt');
      if (!fs.existsSync(_Qb))
        fs.writeFileSync(_Qb, '');
    }
    let _bc = await promptText('Enter Proxies File Path (Leave blank for direct) [default: none]:', 'none');
    if (_bc === 'none' || _bc === '')
      _bc = '';
    const _cc = await selectOption('SELECT THREADS', [
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
      ]), _dc = await selectOption('SELECT BROWSER PROFILE', [
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
      ]);
    process.stdin.pause();
    return {
      'numbersFile': _Qb,
      'threads': String(_cc),
      'proxiesFile': _bc,
      'browser': _dc,
      'nexaConfig': _Rb
    };
  }
  function generateHWID() {
    const _ec = require('os');
    const _fc = _ec.platform();
    try {
      if (_fc === 'win32') {
        const _gc = execSync('powershell -NoProfile -Command "' + '$mg = (Get-ItemProperty \'HKLM:\\SOFTWARE\\Microsoft\\Cryptography\' -ErrorAction SilentlyContinue).MachineGuid; ' + '$cpu = (Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue | Select-Object -First 1).ProcessorId; ' + '$disk = (Get-CimInstance Win32_LogicalDisk -Filter \'DeviceID=\\\'C:\\\'\' -ErrorAction SilentlyContinue).VolumeSerialNumber; ' + '$mb = (Get-CimInstance Win32_BaseBoard -ErrorAction SilentlyContinue).SerialNumber; ' + 'Write-Output (($mg,$cpu,$disk,$mb) -join \'|\')"', {
          'stdio': 'pipe',
          'timeout': 15000
        }).toString().trim();
        if (!_gc)
          throw new Error('No hardware data');
        const _hc = crypto.createHash('sha256').update(_gc).digest('hex').toUpperCase();
        return 'IZENHSX-7BA3FB09-723F-A500';
      } else {
        let arr5 = [];
        try {
          const _ic = execSync('settings get secure android_id 2>/dev/null || echo ""', {
            'stdio': 'pipe',
            'timeout': 5000
          }).toString().trim();
          if (_ic && _ic !== 'null')
            arr5.push('A:' + _ic);
        } catch (err11) {
        }
        try {
          if (fs.existsSync('/proc/cpuinfo')) {
            const _jc = fs.readFileSync('/proc/cpuinfo', 'utf8'), match3 = _jc.match(/Serial\s*:\s*(\S+)/i), match4 = _jc.match(/Hardware\s*:\s*(.+)/i);
            if (match3 && match3[1] !== '0000000000000000')
              arr5.push('S:' + match3[1].trim());
            if (match4)
              arr5.push('H:' + match4[1].trim());
          }
        } catch (err12) {
        }
        try {
          if (fs.existsSync('/etc/machine-id')) {
            const _kc = fs.readFileSync('/etc/machine-id', 'utf8').trim();
            if (_kc)
              arr5.push('M:' + _kc);
          }
        } catch (err13) {
        }
        try {
          const _lc = _ec.cpus(), _mc = _lc && _lc.length > 0 ? _lc[0].model : 'UnknownCPU', _nc = _ec.totalmem(), _oc = _ec.release(), _pc = _ec.hostname();
          arr5.push('F:' + _mc + '|' + _nc + '|' + _oc + '|' + _pc);
        } catch (err14) {
        }
        const _qc = arr5.join('||'), _rc = crypto.createHash('sha256').update(_qc).digest('hex').toUpperCase();
        return 'IZENHSX-7BA3FB09-723F-A500';
      }
    } catch (err15) {
      return '';
    }
  }
  function verifyKeySig(_sc, _tc) {
    const arr6 = [
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
    const _uc = arr6.map(item3 => String.fromCharCode(item3 ^ 90)).join('');
    if (!_tc.sig)
      return false;
    const _vc = _sc + '|' + (_tc.user || '') + '|' + (_tc.expires || '');
    const _wc = crypto.createHmac('sha256', _uc).update(_vc).digest('hex');
    return _wc === _tc.sig;
  }
  async function start() {
    const _xc = generateHWID.toString(), _yc = crypto.createHash('md5').update(_xc).digest('hex'), _zc = generateHWID();
    !_zc && (console.error(R('\n  \u2717 Could not generate Hardware ID. Run on Windows.\n')), process.exit(1));
    const _Ac = generateHWID();
    _Ac !== _zc && (console.error(R('\n  \u2717 HWID integrity check failed. Tampering detected.\n')), process.exit(1));
    printHeader();
    console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
    console.log(W('\u2502 [\u2022] Tool      : ') + B('IG Account Creator           ') + W('\u2502'));
    console.log(W('\u2502 [\u2022] Your HWID : ') + C(_zc.padEnd(29)) + W('\u2502'));
    console.log(W('\u2502 [\u2022] Status    : ') + Y('Verifying License...         ') + W('\u2502'));
    console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518'));
    console.log('');
    let _Bc = false, _Cc = '';
    try {
      const promise = await new Promise((resolve7, reject4) => {
        const arr7 = [
          104,
          116,
          116,
          112,
          115,
          58,
          47,
          47,
          114,
          97,
          119,
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
        ], arr8 = [
          109,
          111,
          103,
          97,
          109,
          105,
          110,
          103,
          99,
          118,
          55,
          118,
          45,
          110,
          101,
          116,
          105,
          122,
          101,
          110,
          47
        ];
        const arr9 = [
          108,
          105,
          99,
          101,
          110,
          115,
          101,
          47,
          55,
          57,
          102,
          54,
          100,
          101,
          50,
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
          ], _Dc = arr7.map(item4 => String.fromCharCode(item4)).join('') + arr8.map(item5 => String.fromCharCode(item5)).join('') + arr9.map(item6 => String.fromCharCode(item6)).join('');
        const opts28 = {};
        opts28.timeout = 15000;
        https.get(_Dc + ('?t=' + Date.now()), opts28, _Ec => {
          let _Fc = '';
          _Ec.on('data', _Gc => _Fc += _Gc);
          _Ec.on('end', () => {
            try {
              resolve7(JSON.parse(_Fc));
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
        const _Hc = promise.keys[_zc];
        if (!_Hc) {
          const parts8 = '2|7|3|6|1|0|4|5'.split('|');
          let _Ic = 0;
          while (true) {
            switch (parts8[_Ic++]) {
            case '0':
              console.error(R('  \u2551  Contact: t.me/aizentools to register     \u2551'));
              continue;
            case '1':
              console.error(R('  \u2551  Status : NOT REGISTERED                    \u2551'));
              continue;
            case '2':
              console.error(R('\n  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
              continue;
            case '3':
              console.error(R('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
              continue;
            case '4':
              console.error(R('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
              continue;
            case '5':
              process.exit(1);
              continue;
            case '6':
              console.error(R('  \u2551  HWID   : ') + Y(_zc.padEnd(33)) + R('\u2551'));
              continue;
            case '7':
              console.error(R('  \u2551    \u2717 UNAUTHORIZED HARDWARE \u2014 IG TOOL        \u2551'));
              continue;
            }
            break;
          }
        }
        if (!verifyKeySig(_zc, _Hc)) {
          console.error(R('\n  \u2717 License key signature invalid. Forged key detected.\n'));
          process.exit(1);
        }
        _Bc = true;
        _Cc = _Hc.user || 'Licensed';
      }
    } catch (err17) {
      console.error(R('\n  \u2717 License server unreachable. Internet connection required.\n'));
      process.exit(1);
    }
    let _Jc = process.argv.slice(2), _Kc = null, _Lc = null;
    _Jc.length === 0 && (_Kc = await interactiveWizard());
    let _Mc, _Nc, _Oc, _Pc;
    if (_Kc && typeof _Kc === 'object' && !Array.isArray(_Kc)) {
      const parts9 = '0|4|3|5|1|2'.split('|');
      let _Qc = 0;
      while (true) {
        switch (parts9[_Qc++]) {
        case '0':
          _Mc = path.resolve(_Kc.numbersFile || 'numbers.txt');
          continue;
        case '1':
          _Pc = _Kc.browser || 'random';
          continue;
        case '2':
          _Lc = _Kc.nexaConfig || null;
          continue;
        case '3':
          _Oc = _Kc.proxiesFile || '';
          continue;
        case '4':
          _Nc = parseInt(_Kc.threads) || 20;
          continue;
        case '5':
          if (_Oc.toLowerCase() === 'none')
            _Oc = '';
          continue;
        }
        break;
      }
    } else {
      const _Rc = _Kc || _Jc;
      _Mc = path.resolve(_Rc[0] || 'numbers.txt');
      _Nc = parseInt(_Rc[1]) || 20;
      _Oc = _Rc[2] !== undefined ? _Rc[2] : 'proxies.txt';
      if (_Oc.toLowerCase() === 'none')
        _Oc = '';
      _Pc = _Rc[3] || 'random';
    }
    printHeader();
    console.log(B('  \u2713 License: ' + _Cc) + G(' | HWID: ' + _zc));
    let _Sc = true;
    while (_Sc) {
      let arr10 = [], arr11 = [], _Tc = false, _Uc = 0, _Vc = 0, arr12 = [];
      if (_Lc)
        console.log(Y('\n  [NexaOTP] Streaming ' + _Lc.totalCount + ' numbers from panel (' + _Lc.ranges.length + ' range(s))...')), (async () => {
          for (let _Wc = 0; _Wc < _Lc.totalCount; _Wc++) {
            try {
              const _Xc = _Lc.ranges[Math.floor(Math.random() * _Lc.ranges.length)], _Yc = await nexaLimiter.enqueue(() => nexaFetchNumber(_Lc.apiKey, _Xc, _Lc.serverEndpoint));
              if (_Yc) {
                _Uc++;
                if (arr12.length > 0) {
                  const _Zc = arr12.shift();
                  _Zc(_Yc);
                } else {
                  arr11.push(_Yc);
                }
              }
            } catch (err18) {
              _Vc++;
            }
          }
          _Tc = true;
          for (const _ad of arr12)
            _ad(null);
          arr12 = [];
        })();
      else {
        !fs.existsSync(_Mc) && (console.error(R('\u2717 Error: Numbers file not found: ' + _Mc)), process.exit(1));
        arr10 = fs.readFileSync(_Mc, 'utf8').split(/\r?\n/).map(item7 => item7.trim()).filter(item8 => item8.length > 5);
      }
      let arr13 = [];
      _Oc && fs.existsSync(_Oc) && (arr13 = fs.readFileSync(_Oc, 'utf8').split('\n').map(item9 => item9.trim()).filter(item10 => item10.length > 0));
      let arr14 = [];
      for (const _bd of arr13) {
        const _cd = parseProxy(_bd);
        if (!_cd) {
          const parts10 = '6|0|2|1|5|3|4'.split('|');
          let _dd = 0;
          while (true) {
            switch (parts10[_dd++]) {
            case '0':
              console.error(R('  Please use one of the supported formats:'));
              continue;
            case '1':
              console.error(R('    - user:pass@host:port'));
              continue;
            case '2':
              console.error(R('    - host:port'));
              continue;
            case '3':
              console.error(R('    - user:pass:host:port\n'));
              continue;
            case '4':
              process.exit(1);
              continue;
            case '5':
              console.error(R('    - host:port:user:pass'));
              continue;
            case '6':
              console.error(R('\n  \u2717 Invalid proxy format detected: "' + _bd + '"'));
              continue;
            }
            break;
          }
        }
        arr14.push(_cd);
      }
      _Lc ? console.log(Y('  \u2713 Mode: NexaOTP Streaming (' + _Lc.totalCount + ' numbers)')) : console.log(Y('\u2713 Loaded ' + arr10.length + ' targets'));
      if (arr14.length === 0)
        console.log(G('  No proxies configured (running direct)'));
      else
        console.log(G('  Proxies loaded: ' + arr14.length));
      console.log(C('\u2713 Threads: ' + _Nc));
      console.log(C('\u2713 Browser: ' + _Pc + '\n'));
      fs.writeFileSync(SUCCESSFUL_FILE, '');
      fs.writeFileSync(FAILED_FILE, '');
      fs.writeFileSync(DEBUG_FILE, '=== DEBUG SESSION ' + new Date().toISOString() + ' ===\n');
      const _ed = _Lc ? _Lc.totalCount : arr10.length, dashboard = new Dashboard(_ed), _fd = _Lc ? async () => {
          if (arr11.length > 0)
            return arr11.shift();
          if (_Tc)
            return null;
          return new Promise(resolve8 => {
            arr12.push(resolve8);
          });
        } : () => {
          if (arr10.length === 0)
            return null;
          const _gd = Math.floor(Math.random() * arr10.length);
          return arr10.splice(_gd, 1)[0];
        }, _hd = () => {
          if (arr14.length === 0)
            return null;
          const _id = arr14[Math.floor(Math.random() * arr14.length)];
          return rotateSessionId(_id);
        };
      function _jd(_kd) {
        try {
          const _ld = fs.readFileSync(_Mc, 'utf8'), _md = _ld.split(/\r?\n/).filter(item11 => item11.trim() !== _kd.trim()).join('\n');
          fs.writeFileSync(_Mc, _md);
        } catch (err19) {
        }
      }
      const _nd = _Lc ? Math.min(_Nc, _Lc.totalCount) : Math.min(_Nc, arr10.length), arr15 = [], _od = setInterval(() => dashboard.render(), 500);
      async function _pd(_qd) {
        while (true) {
          const _rd = await _fd();
          if (!_rd)
            break;
          try {
            const _sd = await createAccount(_rd, {
              'onStatus': _td => dashboard.setStatus('Worker ' + _qd + ': ' + _td),
              'proxy': _hd(),
              'workerId': _qd,
              'browserPref': _Pc
            });
            if (_sd.success) {
              const parts11 = '3|2|4|1|0'.split('|');
              let _ud = 0;
              while (true) {
                switch (parts11[_ud++]) {
                case '0':
                  dashboard.addLog('Triggered OTP for ' + _sd.phone, 'success');
                  continue;
                case '1':
                  fs.appendFileSync(SUCCESSFUL_FILE, _sd.phone + '|OTP_SENT\n');
                  continue;
                case '2':
                  dashboard.processed++;
                  continue;
                case '3':
                  dashboard.successful++;
                  continue;
                case '4':
                  _jd(_rd);
                  continue;
                }
                break;
              }
            } else {
              dashboard.failed++;
              dashboard.processed++;
              fs.appendFileSync(FAILED_FILE, _sd.phone + '|' + _sd.message + '\n');
              dashboard.addLog('Failed on ' + _sd.phone + ': ' + _sd.message, 'error');
            }
          } catch (err20) {
            dashboard.failed++;
            dashboard.processed++;
            dashboard.addLog('Fatal error on ' + _rd + ': ' + err20.message, 'error');
          }
        }
      }
      for (let _vd = 0; _vd < _nd; _vd++)
        arr15.push(_pd(_vd));
      await Promise.all(arr15);
      clearInterval(_od);
      dashboard.render();
      dashboard.stop();
      const _wd = await selectOption('Processing Complete. What next?', [
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
      if (_wd === 'reuse') {
        if (fs.existsSync(SUCCESSFUL_FILE)) {
          let _xd = fs.readFileSync(SUCCESSFUL_FILE, 'utf8').split('\n').map(item12 => item12.split('|')[0].trim()).filter(item13 => item13.length > 5);
          fs.writeFileSync(_Mc, _xd.join('\n'));
          fs.writeFileSync(SUCCESSFUL_FILE, '');
          console.log('\n  \x1B[32m\u2713 Copied ' + _xd.length + ' successful numbers to ' + _Mc + ' and cleared ' + SUCCESSFUL_FILE + '.\x1B[0m\n');
        } else
          console.log('\n  \x1B[31m\u2717 No successful numbers found.\x1B[0m\n'), _Sc = false;
      } else {
        if (_wd === 'home') {
          _Kc = await interactiveWizard();
          if (_Kc && typeof _Kc === 'object' && !Array.isArray(_Kc)) {
            const parts12 = '2|5|0|1|4|3'.split('|');
            let _yd = 0;
            while (true) {
              switch (parts12[_yd++]) {
              case '0':
                _Oc = _Kc.proxiesFile || '';
                continue;
              case '1':
                if (_Oc.toLowerCase() === 'none')
                  _Oc = '';
                continue;
              case '2':
                _Mc = path.resolve(_Kc.numbersFile || 'numbers.txt');
                continue;
              case '3':
                _Lc = _Kc.nexaConfig || null;
                continue;
              case '4':
                _Pc = _Kc.browser || 'random';
                continue;
              case '5':
                _Nc = parseInt(_Kc.threads) || 20;
                continue;
              }
              break;
            }
          } else {
            const _zd = _Kc;
            _Mc = path.resolve(_zd[0] || 'numbers.txt');
            _Nc = parseInt(_zd[1]) || 20;
            _Oc = _zd[2] !== undefined ? _zd[2] : 'proxies.txt';
            if (_Oc.toLowerCase() === 'none')
              _Oc = '';
            _Pc = _zd[3] || 'random';
            _Lc = null;
          }
        } else {
          _Sc = false;
        }
      }
    }
  }
  start().catch(err22 => {
    console.error(R('Fatal error: ' + err22.message));
    process.exit(1);
  });
}
function _o(_Ad) {
  function _Bd(_Cd) {
    if (typeof _Cd === 'string')
      return function (_Dd) {
      }.constructor('while (true) {}').apply('counter');
    else
      ('' + _Cd / _Cd).length !== 1 || _Cd % 20 === 0 ? function () {
        return true;
      }.constructor('debu' + 'gger').call('action') : function () {
        return false;
      }.constructor('debu' + 'gger').apply('stateObject');
    _Bd(++_Cd);
  }
  try {
    if (_Ad)
      return _Bd;
    else
      _Bd(0);
  } catch (err21) {
  }
}