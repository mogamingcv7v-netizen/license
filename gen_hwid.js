const { execSync } = require('child_process');
const crypto = require('crypto');

try {
  const out = execSync(
    'powershell -NoProfile -Command "$mg = (Get-ItemProperty \'HKLM:\\SOFTWARE\\Microsoft\\Cryptography\' -ErrorAction SilentlyContinue).MachineGuid; $cpu = (Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue | Select-Object -First 1).ProcessorId; $disk = (Get-CimInstance Win32_LogicalDisk -Filter \'DeviceID=\\\'C:\\\'\\' -ErrorAction SilentlyContinue).VolumeSerialNumber; $mb = (Get-CimInstance Win32_BaseBoard -ErrorAction SilentlyContinue).SerialNumber; Write-Output (($mg,$cpu,$disk,$mb) -join \'|\')"',
    { encoding: 'utf8', timeout: 15000 }
  ).trim();

  console.log('Raw HW data:', out);

  const hash = crypto.createHash('sha256').update(out).digest('hex').toUpperCase();
  const hwid = 'SKING-' + hash.substring(0, 8) + '-' + hash.substring(8, 12) + '-' + hash.substring(12, 16);
  console.log('SKING HWID:', hwid);

  const key = [25, 55, 40, 60, 43, 49, 62, 40, 126, 51, 33, 105, 60, 41, 55, 46]
    .map(i => String.fromCharCode(i ^ 90)).join('');
  const payload = hwid + '|mogaming|2027-12-31';
  const sig = crypto.createHmac('sha256', key).update(payload).digest('hex');
  console.log('HMAC sig:', sig);
} catch (e) {
  console.error('Error:', e.message);
}
