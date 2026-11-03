/* Ilustraciones vectoriales originales (capas separadas para animar). */
const ART = (() => {
  let n = 0;
  const defs = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="tomSkin" cx="42%" cy="30%" r="75%">
      <stop offset="0" stop-color="#b3e68a"/><stop offset=".5" stop-color="#6cbb57"/><stop offset="1" stop-color="#3f8a41"/>
    </radialGradient>
    <radialGradient id="tomHead" cx="40%" cy="28%" r="80%">
      <stop offset="0" stop-color="#bdea93"/><stop offset=".55" stop-color="#74c05c"/><stop offset="1" stop-color="#438f44"/>
    </radialGradient>
    <linearGradient id="tomBelly" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f5f9d2"/><stop offset="1" stop-color="#d3e7a2"/>
    </linearGradient>
    <radialGradient id="eggShell" cx="38%" cy="30%" r="80%">
      <stop offset="0" stop-color="#fffdf5"/><stop offset=".6" stop-color="#f6ecd2"/><stop offset="1" stop-color="#e3d2ad"/>
    </radialGradient>
    <radialGradient id="balloonShine" cx="35%" cy="30%" r="60%">
      <stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="leafG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#9cc58a"/><stop offset="1" stop-color="#4f8a4c"/>
    </linearGradient>
  </defs>
</svg>`;

  function tom(label = 'Tom, el lagartito verde, sonriendo') {
    const u = ++n;
    return `
<svg class="tom" viewBox="0 0 240 300" role="img" aria-label="${label}">
  <defs>
    <clipPath id="tL${u}"><circle cx="94" cy="62" r="20"/></clipPath>
    <clipPath id="tR${u}"><circle cx="148" cy="58" r="20"/></clipPath>
  </defs>
  <ellipse cx="122" cy="289" rx="74" ry="8" fill="#2f4d2a" opacity=".15"/>
  <g class="t-tail">
    <path d="M82 228 C 54 236, 22 238, 16 210 C 11 186, 36 170, 51 185 C 58 193, 51 203, 43 198 C 36 194, 30 204, 32 214 C 36 236, 60 254, 90 272 Z" fill="url(#tomSkin)" transform="matrix(1.22 0 0 1.22 -19.8 -59.8)"/>
    <circle cx="18" cy="202" r="3.2" fill="#3c8540" opacity=".55"/><circle cx="34" cy="219" r="3.6" fill="#3c8540" opacity=".55"/>
    <circle cx="54" cy="231" r="3.4" fill="#3c8540" opacity=".5"/><circle cx="12" cy="182" r="2.6" fill="#3c8540" opacity=".5"/>
  </g>
  <g class="t-body">
    <path d="M120 118 C 166 118, 183 176, 181 216 C 179 256, 160 282, 120 282 C 80 282, 61 256, 61 216 C 61 176, 76 118, 120 118 Z" fill="url(#tomSkin)"/>
    <path d="M120 160 C 148 160, 158 196, 157 226 C 156 256, 142 274, 120 274 C 98 274, 84 256, 83 226 C 82 196, 92 160, 120 160 Z" fill="url(#tomBelly)"/>
    <path d="M100 200 q20 6 40 0 M98 222 q22 6 44 0 M100 244 q20 5 40 0" stroke="#bcd58b" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
    <circle cx="71" cy="200" r="4" fill="#3c8540" opacity=".45"/><circle cx="76" cy="226" r="3" fill="#3c8540" opacity=".45"/>
    <circle cx="170" cy="210" r="3.6" fill="#3c8540" opacity=".45"/><circle cx="166" cy="234" r="2.8" fill="#3c8540" opacity=".45"/>
    <path d="M84 184 Q 88 214 110 214" stroke="#5aae4e" stroke-width="15" fill="none" stroke-linecap="round"/>
    <circle cx="112" cy="213" r="9" fill="#66b955"/>
  </g>
  <g class="t-feet">
    <ellipse cx="92" cy="281" rx="22" ry="10" fill="#5aae4e"/>
    <circle cx="76" cy="284" r="5.5" fill="#66b955"/><circle cx="88" cy="287" r="5.5" fill="#66b955"/><circle cx="101" cy="287" r="5.5" fill="#66b955"/>
    <ellipse cx="150" cy="281" rx="22" ry="10" fill="#5aae4e"/>
    <circle cx="141" cy="287" r="5.5" fill="#66b955"/><circle cx="154" cy="287" r="5.5" fill="#66b955"/><circle cx="166" cy="284" r="5.5" fill="#66b955"/>
  </g>
  <g class="t-head">
    <path d="M58 108 C 56 76, 86 64, 120 64 C 152 64, 180 72, 196 88 C 208 100, 204 122, 188 130 C 168 144, 146 148, 118 148 C 86 148, 60 140, 58 108 Z" fill="url(#tomHead)"/>
    <circle cx="94" cy="62" r="26" fill="url(#tomHead)"/>
    <circle cx="148" cy="58" r="26" fill="url(#tomHead)"/>
    <circle cx="70" cy="98" r="3.5" fill="#3c8540" opacity=".45"/><circle cx="78" cy="86" r="2.6" fill="#3c8540" opacity=".45"/>
    <circle cx="172" cy="96" r="3" fill="#3c8540" opacity=".45"/><circle cx="121" cy="76" r="2.6" fill="#3c8540" opacity=".4"/>
    <ellipse cx="80" cy="118" rx="10" ry="6" fill="#f3a3a0" opacity=".5"/>
    <ellipse cx="158" cy="124" rx="10" ry="6" fill="#f3a3a0" opacity=".5"/>
    <ellipse cx="184" cy="94" rx="2.6" ry="2" fill="#2e5c30"/><ellipse cx="193" cy="98" rx="2.4" ry="1.9" fill="#2e5c30"/>
    <path class="t-mouth" d="M88 114 Q 130 144 188 116" stroke="#2c5a2f" stroke-width="3.6" fill="none" stroke-linecap="round"/>
    <path d="M84 111 q3 4 6 3 M185 113 q5 0 7 -4" stroke="#2c5a2f" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <g class="t-eye">
      <circle cx="94" cy="62" r="20" fill="#fff"/>
      <g class="t-pupil"><circle cx="97" cy="60" r="9" fill="#1f2b20"/><circle cx="100" cy="56.5" r="3" fill="#fff"/></g>
      <g clip-path="url(#tL${u})"><rect class="t-lid" x="72" y="40" width="44" height="44" fill="#6dbb58"/></g>
      <circle cx="94" cy="62" r="20" fill="none" stroke="#3f8a41" stroke-width="1.5" opacity=".5"/>
    </g>
    <g class="t-eye">
      <circle cx="148" cy="58" r="20" fill="#fff"/>
      <g class="t-pupil"><circle cx="151" cy="56" r="9" fill="#1f2b20"/><circle cx="154" cy="52.5" r="3" fill="#fff"/></g>
      <g clip-path="url(#tR${u})"><rect class="t-lid" x="126" y="36" width="44" height="44" fill="#6dbb58"/></g>
      <circle cx="148" cy="58" r="20" fill="none" stroke="#3f8a41" stroke-width="1.5" opacity=".5"/>
    </g>
  </g>
  <g class="t-arm">
    <path d="M158 186 Q 186 172 194 146" stroke="#5aae4e" stroke-width="16" fill="none" stroke-linecap="round"/>
    <circle cx="195" cy="138" r="12" fill="#66b955"/>
    <circle cx="185" cy="126" r="5.6" fill="#66b955"/><circle cx="196" cy="122" r="5.6" fill="#66b955"/><circle cx="207" cy="127" r="5.6" fill="#66b955"/>
  </g>
</svg>`;
  }

  function egg(cls = 'egg') {
    return `
<svg class="${cls}" viewBox="0 0 200 240" aria-hidden="true" focusable="false">
  <ellipse cx="100" cy="232" rx="70" ry="7" fill="#2f4d2a" opacity=".14"/>
  <path d="M100 10 C 150 10, 185 100, 185 150 C 185 205, 147 230, 100 230 C 53 230, 15 205, 15 150 C 15 100, 50 10, 100 10 Z" fill="url(#eggShell)"/>
  <g fill="#8fbf7c" opacity=".85">
    <circle cx="70" cy="70" r="9"/><circle cx="128" cy="58" r="6"/><circle cx="150" cy="118" r="11"/><circle cx="52" cy="140" r="7"/>
    <circle cx="98" cy="118" r="5"/><circle cx="120" cy="178" r="9"/><circle cx="66" cy="196" r="6"/><circle cx="160" cy="174" r="5"/>
  </g>
  <ellipse cx="68" cy="90" rx="14" ry="30" fill="#fff" opacity=".45" transform="rotate(18 68 90)"/>
</svg>`;
  }

  function balloon(color, dots = false) {
    return `
<svg class="balloon" viewBox="0 0 80 170" aria-hidden="true" focusable="false">
  <path d="M40 98 C 36 120, 48 132, 40 150 C 34 162, 42 166, 40 170" stroke="#c9a24e" stroke-width="1.6" fill="none"/>
  <path d="M40 4 C 64 4, 76 24, 76 46 C 76 72, 56 92, 40 96 C 24 92, 4 72, 4 46 C 4 24, 16 4, 40 4 Z" fill="${color}"/>
  <path d="M35 96 L45 96 L42 102 L38 102 Z" fill="${color}"/>
  ${dots ? '<g fill="#c9a24e" opacity=".8"><circle cx="24" cy="30" r="2.4"/><circle cx="44" cy="22" r="2.4"/><circle cx="58" cy="40" r="2.4"/><circle cx="30" cy="56" r="2.4"/><circle cx="52" cy="64" r="2.4"/><circle cx="40" cy="44" r="2.4"/></g>' : ''}
  <ellipse cx="40" cy="44" rx="34" ry="40" fill="url(#balloonShine)"/>
</svg>`;
  }

  function branch(cls = 'branch') {
    // Hojas colocadas sobre la curva del tallo, alternando lados.
    const P = [[10, 188], [40, 140], [70, 90], [130, 10]];
    const at = (t) => {
      const m = 1 - t;
      const k = [m * m * m, 3 * m * m * t, 3 * m * t * t, t * t * t];
      return [0, 1].map((i) => k.reduce((s, c, j) => s + c * P[j][i], 0));
    };
    let leaves = '';
    [0.18, 0.3, 0.42, 0.54, 0.66, 0.78, 0.9, 1].forEach((t, i) => {
      const [x, y] = at(t);
      const side = i % 2 ? 1 : -1;
      const ang = t === 1 ? -50 : -55 + side * 50;
      const rad = (ang * Math.PI) / 180;
      const cx = x + Math.cos(rad) * 18, cy = y + Math.sin(rad) * 18;
      leaves += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="19" ry="8.5" fill="url(#leafG)" transform="rotate(${ang} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
    });
    return `
<svg class="${cls}" viewBox="0 0 160 190" aria-hidden="true" focusable="false">
  <path d="M10 188 C 40 140, 70 90, 130 10" stroke="#6b955f" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${leaves}
</svg>`;
  }

  return { defs, tom, egg, balloon, branch };
})();
if (typeof module !== 'undefined') module.exports = ART;
