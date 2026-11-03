/* Genera og-image.jpg (vista previa WhatsApp) e Invitacion-Elian-Marcelo.pdf. Ejecutar después de build. */
const path = require('path'); const fs = require('fs');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto('file://' + path.join(__dirname, 'og.out.html')); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(ROOT, 'og-image.jpg'), type: 'jpeg', quality: 86 });
  const q = await b.newPage();
  await q.goto('file://' + path.join(__dirname, 'pdf.out.html')); await q.waitForTimeout(300);
  await q.pdf({ path: path.join(ROOT, 'Invitacion-Elian-Marcelo.pdf'), preferCSSPageSize: true, printBackground: true });
  await b.close();
  for (const f of ['og.out.html', 'pdf.out.html']) fs.unlinkSync(path.join(__dirname, f));
  console.log('OK: og-image.jpg, Invitacion-Elian-Marcelo.pdf');
})();
