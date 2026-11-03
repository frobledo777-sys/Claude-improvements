/* Genera index.html (autocontenido), evento.ics y pdf.html a partir de src/. */
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const ART = require('./art.js');

const ROOT = path.join(__dirname, '..');
const SITE_URL = process.env.SITE_URL || ''; // p. ej. https://usuario.github.io/baby-shower-elian/

const EVENT = {
  title: 'Baby Shower de Elián Marcelo',
  place: 'Salón La Candelaria',
  address: 'Carretera a Matehuala #9902, Soledad de Graciano Sánchez, San Luis Potosí, México',
  startUTC: '20261128T210000Z', // 28/11/2026 15:00 hora del centro de México (UTC-6)
};
const LINKS = {
  AMAZON_URL: 'https://www.amazon.com.mx/baby-reg/felipe-robledo-enero-2027-sanluispotosi/1IVRNCMB5WUXX?ref_=cm_sw_r_apann_dp_J8EFERJZDVHEWV6DS5D6&language=en-US',
  LIVERPOOL_URL: 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/60069407',
};
const location = `${EVENT.place}, ${EVENT.address}`;
const details = 'Hora de inicio: 3:00 p. m. (hora del centro de México).\n¡Te esperamos con muchísimo cariño! 💚';
LINKS.MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(location);
// Sin hora oficial de finalización: el evento se guarda con la hora de inicio.
LINKS.GCAL_URL = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  + '&text=' + encodeURIComponent(EVENT.title)
  + '&dates=' + EVENT.startUTC + '/' + EVENT.startUTC
  + '&details=' + encodeURIComponent(details)
  + '&location=' + encodeURIComponent(location);

const HALF_EGG = `<svg class="halfegg" viewBox="0 0 200 150" aria-hidden="true" focusable="false">
  <ellipse cx="100" cy="144" rx="72" ry="6" fill="#2f4d2a" opacity=".14"/>
  <path d="M16 60 L36 44 L52 64 L72 40 L92 62 L112 38 L130 60 L150 42 L168 62 L184 50 C 188 64, 186 84, 184 96 C 178 128, 146 142, 100 142 C 54 142, 22 128, 16 96 C 14 84, 13 72, 16 60 Z" fill="url(#eggShell)"/>
  <g fill="#8fbf7c" opacity=".85"><circle cx="58" cy="96" r="8"/><circle cx="120" cy="112" r="7"/><circle cx="150" cy="84" r="5"/><circle cx="90" cy="128" r="4"/><circle cx="36" cy="80" r="4"/></g>
</svg>`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const b64 = (f) => fs.readFileSync(path.join(ROOT, 'fonts', f)).toString('base64');
const FONTS_CSS = `@font-face{font-family:'Fredoka';font-style:normal;font-weight:300 700;font-display:swap;src:url(data:font/woff2;base64,${b64('fredoka.woff2')}) format('woff2')}
@font-face{font-family:'Dancing Script';font-style:normal;font-weight:700;font-display:swap;src:url(data:font/woff2;base64,${b64('dancing.woff2')}) format('woff2')}`;

const FAVICON = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="34" r="26" fill="#6cbb57"/><circle cx="22" cy="18" r="10" fill="#6cbb57"/><circle cx="42" cy="16" r="10" fill="#6cbb57"/><circle cx="22" cy="18" r="7" fill="#fff"/><circle cx="42" cy="16" r="7" fill="#fff"/><circle cx="23" cy="18" r="3.5" fill="#1f2b20"/><circle cx="43" cy="16" r="3.5" fill="#1f2b20"/><path d="M18 38 Q32 50 46 36" stroke="#2c5a2f" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>');

async function qr(url) {
  const svg = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'M', margin: 1, color: { dark: '#1f3d26', light: '#ffffff' } });
  return svg.replace('<?xml version="1.0" encoding="utf-8"?>', '').replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
}

function render(tpl, vars) {
  return tpl
    .replace(/\{\{=\s*([\s\S]+?)\s*\}\}/g, (_, expr) => Function('ART', 'HALF_EGG', `return (${expr});`)(ART, HALF_EGG))
    .replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => {
      if (!(k in vars)) throw new Error('Falta variable ' + k);
      return vars[k];
    });
}

function ics() {
  const fold = (line) => { // RFC 5545: líneas de máx. 75 octetos
    const out = []; let buf = Buffer.from(line, 'utf8');
    while (buf.length > 75) {
      let cut = 75; while ((buf[cut] & 0xc0) === 0x80) cut--;
      out.push(buf.slice(0, cut).toString('utf8')); buf = Buffer.concat([Buffer.from(' '), buf.slice(cut)]);
    }
    out.push(buf.toString('utf8')); return out.join('\r\n');
  };
  const t = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Invitacion Elian Marcelo//Baby Shower//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:baby-shower-elian-marcelo-20261128@invitacion',
    'DTSTAMP:20261103T120000Z',
    'DTSTART:' + EVENT.startUTC,
    'SUMMARY:' + t(EVENT.title),
    'LOCATION:' + t(location),
    'DESCRIPTION:' + t(details + '\nCómo llegar: ' + LINKS.MAPS_URL),
    'URL:' + LINKS.MAPS_URL,
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:-P1D', 'DESCRIPTION:' + t('Mañana es el Baby Shower de Elián Marcelo 💚'), 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR', '',
  ].map(fold).join('\r\n');
}

(async () => {
  const vars = {
    SITE_URL, FAVICON, FONTS_CSS,
    AMAZON_URL: esc(LINKS.AMAZON_URL), LIVERPOOL_URL: esc(LINKS.LIVERPOOL_URL),
    MAPS_URL: esc(LINKS.MAPS_URL), GCAL_URL: esc(LINKS.GCAL_URL),
    QR_AMAZON: await qr(LINKS.AMAZON_URL), QR_LIVERPOOL: await qr(LINKS.LIVERPOOL_URL),
  };
  fs.writeFileSync(path.join(ROOT, 'index.html'), render(fs.readFileSync(path.join(__dirname, 'index.src.html'), 'utf8'), vars));
  fs.writeFileSync(path.join(ROOT, 'evento.ics'), ics());
  for (const f of ['pdf.src.html', 'og.src.html']) {
    const src = path.join(__dirname, f);
    if (fs.existsSync(src)) fs.writeFileSync(path.join(__dirname, f.replace('.src', '.out')), render(fs.readFileSync(src, 'utf8'), vars));
  }
  fs.writeFileSync(path.join(__dirname, 'links.json'), JSON.stringify(LINKS, null, 2));
  console.log('OK: index.html', (fs.statSync(path.join(ROOT, 'index.html')).size / 1024).toFixed(0) + ' KB');
})();
