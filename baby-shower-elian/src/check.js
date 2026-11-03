/* Control de calidad: enlaces, QR, intro omitible, movimiento reducido y datos del evento. */
const path = require('path');
const fs = require('fs');
const { chromium, devices } = require('playwright');
const jsQR = require('jsqr');
const { PNG } = require('pngjs');
const LINKS = require('./links.json');
const FILE = 'file://' + path.join(__dirname, '..', 'index.html');
let fail = 0;
const ok = (c, m) => { console.log((c ? '✔ ' : '✘ ') + m); if (!c) fail++; };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['Pixel 7'] });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(FILE);
  ok(await p.isVisible('#intro'), 'La intro aparece al abrir');
  await p.click('#skip');
  await p.waitForTimeout(1000);
  ok(await p.isHidden('#intro'), 'El botón "Saltar intro" la cierra');

  const hrefs = await p.$$eval('a[href^="http"]', (as) => as.map((a) => [a.textContent.trim(), a.href, a.target]));
  const has = (u) => hrefs.some((h) => h[1] === u);
  ok(has(LINKS.AMAZON_URL), 'Botón Amazon → enlace exacto');
  ok(has(LINKS.LIVERPOOL_URL), 'Botón Liverpool → enlace exacto');
  ok(has(LINKS.MAPS_URL), 'Botón Cómo llegar → Google Maps');
  ok(has(LINKS.GCAL_URL), 'Google Calendar → plantilla de evento');
  ok(hrefs.every((h) => h[1].startsWith('https://') && h[2] === '_blank'), 'Todos los enlaces externos son HTTPS y abren en pestaña nueva');
  ok(LINKS.GCAL_URL.includes('dates=20261128T210000Z/20261128T210000Z'), 'Calendario: 28/11/2026 15:00 (UTC-6) sin hora de fin inventada');

  const body = await p.textContent('main');
  for (const t of ['Sábado 28 de noviembre de 2026', '3:00 p. m.', 'Salón La Candelaria',
    'Carretera a Matehuala #9902, Soledad de Graciano Sánchez, San Luis Potosí, México',
    'Compartimos estas listas únicamente como sugerencias. Cualquier detalle, deseo o bendición para Elián será recibido con muchísimo amor y gratitud. 🤍',
    '¡Gracias por acompañarnos en esta hermosa espera!', '¿Nos acompañarás en esta aventura?', '¡Te esperamos con muchísimo cariño!',
    'Elián Marcelo 🤍', '¡Una pequeña gran aventura está por comenzar!', 'Un detalle para nuestro pequeño Elián'])
    ok(body.includes(t), 'Texto presente: ' + t.slice(0, 60));

  for (const [sel, url, name] of [['#g-amz ~ .qr', LINKS.AMAZON_URL, 'Amazon'], ['#g-lvp ~ .qr', LINKS.LIVERPOOL_URL, 'Liverpool']]) {
    const el = await p.$(sel); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(900);
    const png = PNG.sync.read(await el.screenshot());
    const res = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
    ok(res && res.data === url, `QR ${name} decodifica exactamente el enlace`);
  }

  await p.click('#rsvpBtn');
  ok(await p.isVisible('#rsvpAlt'), 'Sin número configurado: muestra copiar mensaje / elegir contacto');
  const wa = await p.getAttribute('#waShare', 'href');
  ok(decodeURIComponent(wa.split('text=')[1]) === '¡Hola! Confirmo mi asistencia al Baby Shower de Elián Marcelo del 28 de noviembre. 💚', 'Mensaje de WhatsApp correcto');
  await p.click('#calBtn');
  ok(await p.isVisible('a[href="evento.ics"]'), 'Opción .ics (iPhone/Outlook) visible');
  await p.click('#replayBtn'); await p.waitForTimeout(300);
  ok(await p.isVisible('#intro'), 'Botón "Repetir intro" funciona');
  const ics = fs.readFileSync(path.join(__dirname, '..', 'evento.ics'), 'utf8');
  ok(/DTSTART:20261128T210000Z/.test(ics) && !/DTEND/.test(ics) && ics.includes('\r\n'), 'evento.ics válido (inicio 3:00 p. m., sin fin inventado)');

  const rm = await b.newContext({ ...devices['iPhone 13'], reducedMotion: 'reduce' });
  const p2 = await rm.newPage(); await p2.goto(FILE); await p2.waitForTimeout(300);
  ok(await p2.isHidden('#intro'), 'Con "reducir movimiento" no se reproduce la intro automáticamente');
  ok(await p2.isVisible('#h-detalles'), 'Con "reducir movimiento" el contenido es visible de inmediato');
  const ow = await p2.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
  ok(ow, 'Sin desplazamiento horizontal en móvil');

  ok(errs.length === 0, 'Sin errores de JavaScript ' + (errs.join(' | ')));
  await b.close();
  console.log(fail ? `\n${fail} verificación(es) fallida(s)` : '\nTodo correcto ✔');
  process.exit(fail ? 1 : 0);
})();
