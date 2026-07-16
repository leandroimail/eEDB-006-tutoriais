/* =========================================================================
   PECE Poli-USP — Design System para os decks de "Ecossistema de Big Data"
   Identidade: Azul Poli #12107E (dominante) + Amarelo USP #FCF101 (acento)
   Motivo visual: brasão / medalhão da Minerva (Escola Politécnica)
   ========================================================================= */
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const Fa = require("react-icons/fa6");

const ASSETS = path.join(__dirname, "assets");

// ---- Paleta -------------------------------------------------------------
const C = {
  navy:      "12107E", // azul Poli (primário)
  navyDeep:  "0A0942", // navy escuro para profundidade
  navyMid:   "232195", // navy intermediário (cards sobre escuro)
  yellow:    "FCF101", // amarelo USP (acento)
  amber:     "E0B400", // amarelo escurecido p/ texto sobre claro
  ink:       "16162B", // texto sobre claro
  slate:     "5A5B77", // texto secundário
  cloud:     "F3F4FB", // painel claro
  cloud2:    "E8EAF7", // painel claro 2
  line:      "DEE0EF", // hairline
  ice:       "C7D0F7", // texto/apoio sobre escuro
  ice2:      "9AA6E8", // apoio sobre escuro mais suave
  white:     "FFFFFF",
  green:     "18B27A",
};

// ---- Tipografia ---------------------------------------------------------
const F = {
  head: "Georgia",        // títulos: gravidade acadêmica
  body: "Calibri",        // corpo
  mono: "Consolas",       // código
};

// ---- Layout (LAYOUT_WIDE = 13.333 x 7.5) --------------------------------
const PAGE = { w: 13.333, h: 7.5 };
const MX = 0.75;                 // margem lateral padrão

// ---- Sombras (fábrica: nunca reutilizar objeto) -------------------------
const soft   = () => ({ type: "outer", color: "0A0942", blur: 10, offset: 3, angle: 90, opacity: 0.16 });
const softLo = () => ({ type: "outer", color: "0A0942", blur: 7,  offset: 2, angle: 90, opacity: 0.10 });
const lift   = () => ({ type: "outer", color: "000000", blur: 14, offset: 5, angle: 90, opacity: 0.22 });

// =========================================================================
//  ÍCONES  (react-icons -> PNG base64, com cache)
// =========================================================================
const _iconCache = {};
async function icon(name, hex = C.navy, size = 256) {
  const key = `${name}_${hex}_${size}`;
  if (_iconCache[key]) return _iconCache[key];
  const Comp = Fa[name];
  if (!Comp) throw new Error("Ícone inexistente: " + name);
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color: "#" + hex, size: String(size) })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const data = "image/png;base64," + png.toString("base64");
  _iconCache[key] = data;
  return data;
}

// =========================================================================
//  PRIMITIVOS DE SLIDE
// =========================================================================

// Rodapé institucional para slides de conteúdo (claro)
function footer(slide, { code = "eEDB-006", n, total, module = "" } = {}) {
  slide.addImage({ path: path.join(ASSETS, "circular-navy.png"), x: MX, y: 7.02, w: 0.30, h: 0.30 });
  slide.addText("PECE Poli-USP  ·  Ecossistema de Big Data", {
    x: MX + 0.4, y: 7.0, w: 6, h: 0.34, fontFace: F.body, fontSize: 9.5, color: C.slate, valign: "middle", margin: 0,
  });
  const right = module ? `${module}` : code;
  slide.addText(right, {
    x: 6.4, y: 7.0, w: 4.85, h: 0.34, fontFace: F.body, fontSize: 9.5, color: C.slate,
    align: "right", valign: "middle", margin: 0,
  });
  if (n) {
    slide.addText(`${n}${total ? " / " + total : ""}`, {
      x: PAGE.w - MX - 1.1, y: 7.0, w: 1.1, h: 0.34, fontFace: F.body, fontSize: 9.5, bold: true,
      color: C.navy, align: "right", valign: "middle", margin: 0,
    });
  }
}

// Cabeçalho padrão (kicker amarelo + título) para slides claros
function header(slide, { kicker, title, titleColor = C.navy }) {
  let y = 0.62;
  if (kicker) {
    slide.addShape("rect", { x: MX, y: y, w: 0.22, h: 0.30, fill: { color: C.yellow } });
    slide.addText(kicker.toUpperCase(), {
      x: MX + 0.34, y: y - 0.02, w: 11, h: 0.34, fontFace: F.body, fontSize: 12, bold: true,
      color: C.slate, charSpacing: 2, valign: "middle", margin: 0,
    });
    y += 0.46;
  }
  slide.addText(title, {
    x: MX, y: y, w: PAGE.w - 2 * MX, h: 0.9, fontFace: F.head, fontSize: 30, bold: true,
    color: titleColor, valign: "top", margin: 0,
  });
}

// =========================================================================
//  1) CAPA (dark)
// =========================================================================
function cover(pres, { eyebrow, title, subtitle, meta = [], badge }) {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  // faixa profunda à esquerda
  s.addShape("rect", { x: 0, y: 0, w: PAGE.w, h: PAGE.h, fill: { color: C.navy } });
  s.addShape("rect", { x: 0, y: 0, w: 0.28, h: PAGE.h, fill: { color: C.yellow } });
  // brasão gigante, discreto, à direita
  s.addImage({ path: path.join(ASSETS, "brasao-white.png"), x: 8.35, y: 0.55, w: 5.3, h: 6.03, transparency: 82 });
  // wordmark POLI USP
  s.addImage({ path: path.join(ASSETS, "wordmark-poliusp.png"), x: MX, y: 0.62, w: 2.5, h: 0.448 });
  s.addText("Programa de Educação Continuada em Engenharia  ·  Escola Politécnica da USP", {
    x: MX, y: 1.22, w: 10.5, h: 0.32, fontFace: F.body, fontSize: 11.5, color: C.ice, margin: 0,
  });

  if (eyebrow) {
    s.addShape("rect", { x: MX, y: 2.32, w: 3.2, h: 0.44, fill: { color: C.yellow } });
    s.addText(eyebrow.toUpperCase(), {
      x: MX, y: 2.32, w: 3.2, h: 0.44, fontFace: F.body, fontSize: 12.5, bold: true, color: C.navy,
      align: "center", valign: "middle", charSpacing: 1, margin: 0,
    });
  }
  s.addText(title, {
    x: MX, y: 2.95, w: 8.6, h: 2.0, fontFace: F.head, fontSize: 46, bold: true, color: C.white,
    lineSpacingMultiple: 0.98, valign: "top", margin: 0,
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: MX, y: 4.95, w: 8.2, h: 0.7, fontFace: F.body, fontSize: 17, color: C.ice, italic: true, margin: 0,
    });
  }
  // meta em baixo
  if (meta.length) {
    s.addShape("line", { x: MX, y: 5.95, w: 7.6, h: 0, line: { color: C.navyMid, width: 1 } });
    s.addText(
      meta.map((m, i) => ({ text: m + (i < meta.length - 1 ? "" : ""), options: { breakLine: true, color: C.ice, fontSize: 12.5 } })),
      { x: MX, y: 6.08, w: 8.2, h: 1.1, fontFace: F.body, valign: "top", paraSpaceAfter: 3, margin: 0 }
    );
  }
  if (badge) {
    s.addText(badge, {
      x: PAGE.w - MX - 3.2, y: 6.85, w: 3.2, h: 0.4, fontFace: F.body, fontSize: 11, color: C.ice2,
      align: "right", margin: 0,
    });
  }
  return s;
}

// =========================================================================
//  2) DIVISOR DE SEÇÃO (dark)
// =========================================================================
function divider(pres, { number, title, subtitle }) {
  const s = pres.addSlide();
  s.background = { color: C.navyDeep };
  s.addShape("rect", { x: 0, y: 0, w: PAGE.w, h: PAGE.h, fill: { color: C.navyDeep } });
  // medalhão à direita
  s.addImage({ path: path.join(ASSETS, "circular-white.png"), x: 9.7, y: 1.9, w: 3.7, h: 3.7, transparency: 84 });
  s.addShape("rect", { x: 0, y: 0, w: 0.28, h: PAGE.h, fill: { color: C.yellow } });
  if (number) {
    s.addText(String(number).padStart(2, "0"), {
      x: MX, y: 1.7, w: 4, h: 1.7, fontFace: F.head, fontSize: 120, bold: true, color: C.navyMid, margin: 0,
    });
  }
  s.addShape("rect", { x: MX + 0.02, y: 3.75, w: 0.7, h: 0.12, fill: { color: C.yellow } });
  s.addText(title, {
    x: MX, y: 3.95, w: 9, h: 1.5, fontFace: F.head, fontSize: 40, bold: true, color: C.white, valign: "top", margin: 0,
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: MX, y: 5.35, w: 8.6, h: 1.2, fontFace: F.body, fontSize: 15, color: C.ice, valign: "top", margin: 0,
      lineSpacingMultiple: 1.05,
    });
  }
  return s;
}

// =========================================================================
//  3) SLIDE DE BULLETS + PAINEL LATERAL
// =========================================================================
function bullets(pres, { kicker, title, intro, points = [], aside, foot }) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  header(s, { kicker, title });
  let y = 2.15;
  if (intro) {
    s.addText(intro, { x: MX, y: y, w: 7.7, h: 0.7, fontFace: F.body, fontSize: 14.5, color: C.slate, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
    y += 0.75;
  }
  const items = points.map((p, i) => {
    if (typeof p === "string") p = { t: p };
    const runs = [{ text: p.t, options: { bold: !!p.b, color: C.ink } }];
    if (p.d) runs.push({ text: "  — " + p.d, options: { color: C.slate } });
    return { text: runs.map(r => r.text).join(""), options: { bullet: { code: "2022", indent: 18 }, color: C.ink, breakLine: true, paraSpaceAfter: 10 } };
  });
  // render rich (bold lead) manually
  const rich = [];
  points.forEach((p, i) => {
    if (typeof p === "string") p = { t: p };
    rich.push({ text: p.t, options: { bullet: { code: "2022", indent: 18 }, bold: true, color: C.navy, breakLine: true, paraSpaceAfter: p.d ? 2 : 11, fontSize: 15.5 } });
    if (p.d) rich.push({ text: p.d, options: { bullet: false, indentLevel: 1, color: C.slate, breakLine: true, paraSpaceAfter: 11, fontSize: 13.5 } });
  });
  s.addText(rich, { x: MX, y: y, w: 7.55, h: 4.3, fontFace: F.body, valign: "top", margin: 0 });

  // painel lateral
  if (aside) {
    s.addShape("rect", { x: 8.7, y: 2.05, w: 3.88, h: 4.55, fill: { color: C.navy }, shadow: soft() });
    s.addShape("rect", { x: 8.7, y: 2.05, w: 3.88, h: 0.12, fill: { color: C.yellow } });
    s.addText(aside.title.toUpperCase(), {
      x: 9.0, y: 2.35, w: 3.3, h: 0.4, fontFace: F.body, fontSize: 12, bold: true, color: C.yellow, charSpacing: 1, margin: 0,
    });
    const ar = [];
    aside.lines.forEach((l) => {
      ar.push({ text: l, options: { bullet: { code: "2022", indent: 14 }, color: C.white, breakLine: true, paraSpaceAfter: 9, fontSize: 13 } });
    });
    s.addText(ar, { x: 9.0, y: 2.9, w: 3.3, h: 3.5, fontFace: F.body, valign: "top", margin: 0 });
  }
  footer(s, foot);
  return s;
}

// =========================================================================
//  4) CARDS EM GRADE (2x2 / 3x2) com ícone em círculo
// =========================================================================
async function cards(pres, { kicker, title, intro, items = [], cols = 3, foot, accentEvery = false }) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  header(s, { kicker, title });
  let top = 2.15;
  if (intro) {
    s.addText(intro, { x: MX, y: 1.95, w: 11.8, h: 0.5, fontFace: F.body, fontSize: 14, color: C.slate, margin: 0 });
    top = 2.5;
  }
  const gap = 0.28;
  const w = (PAGE.w - 2 * MX - gap * (cols - 1)) / cols;
  const rows = Math.ceil(items.length / cols);
  const availH = 6.85 - top;
  const h = rows === 1 ? Math.min(availH, 3.55) : (availH - gap * (rows - 1)) / rows;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const r = Math.floor(i / cols), c = i % cols;
    const x = MX + c * (w + gap);
    const y = top + r * (h + gap);
    const dark = accentEvery && it.accent;
    s.addShape("rect", { x, y, w, h, fill: { color: dark ? C.navy : C.cloud }, line: { color: dark ? C.navy : C.line, width: 1 }, shadow: softLo() });
    s.addShape("rect", { x, y, w: 0.10, h, fill: { color: C.yellow } });
    // ícone em círculo
    if (it.icon) {
      s.addShape("ellipse", { x: x + 0.28, y: y + 0.26, w: 0.6, h: 0.6, fill: { color: dark ? C.yellow : C.navy } });
      s.addImage({ data: dark ? (it._iconDataDark || it._iconData) : it._iconData, x: x + 0.28 + 0.15, y: y + 0.26 + 0.15, w: 0.3, h: 0.3 });
    }
    s.addText(it.title, {
      x: x + 0.28, y: y + 0.95, w: w - 0.5, h: 0.44, fontFace: F.head, fontSize: 15.5, bold: true,
      color: dark ? C.white : C.navy, valign: "top", margin: 0,
    });
    s.addText(it.desc, {
      x: x + 0.28, y: y + 1.4, w: w - 0.52, h: h - 1.52, fontFace: F.body, fontSize: 12.5,
      color: dark ? C.ice : C.slate, valign: "top", margin: 0, lineSpacingMultiple: 1.03,
    });
  }
  footer(s, foot);
  return s;
}

// =========================================================================
//  5) STATS (grandes números)
// =========================================================================
function stats(pres, { kicker, title, items = [], note, foot }) {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape("rect", { x: 0, y: 0, w: PAGE.w, h: PAGE.h, fill: { color: C.navy } });
  s.addImage({ path: path.join(ASSETS, "brasao-white.png"), x: 10.2, y: 4.4, w: 2.7, h: 3.07, transparency: 88 });
  // kicker + título claros
  if (kicker) {
    s.addShape("rect", { x: MX, y: 0.7, w: 0.22, h: 0.30, fill: { color: C.yellow } });
    s.addText(kicker.toUpperCase(), { x: MX + 0.34, y: 0.68, w: 11, h: 0.34, fontFace: F.body, fontSize: 12, bold: true, color: C.ice, charSpacing: 2, valign: "middle", margin: 0 });
  }
  s.addText(title, { x: MX, y: 1.15, w: 11.8, h: 0.9, fontFace: F.head, fontSize: 30, bold: true, color: C.white, margin: 0 });
  const n = items.length;
  const gap = 0.3;
  const w = (PAGE.w - 2 * MX - gap * (n - 1)) / n;
  items.forEach((it, i) => {
    const x = MX + i * (w + gap);
    const y = 2.65;
    s.addText(it.value, { x, y, w, h: 1.3, fontFace: F.head, fontSize: 60, bold: true, color: C.yellow, align: "left", valign: "middle", margin: 0 });
    s.addShape("rect", { x: x + 0.02, y: y + 1.35, w: 0.5, h: 0.08, fill: { color: C.navyMid } });
    s.addText(it.label, { x, y: y + 1.5, w: w - 0.1, h: 1.4, fontFace: F.body, fontSize: 14, color: C.ice, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  });
  if (note) s.addText(note, { x: MX, y: 6.5, w: 11, h: 0.5, fontFace: F.body, fontSize: 12, italic: true, color: C.ice2, margin: 0 });
  return s;
}

// =========================================================================
//  6) DUAS COLUNAS: texto + bloco de código/painel
// =========================================================================
function twoCol(pres, { kicker, title, left = [], code, codeTitle, rightNote, foot }) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  header(s, { kicker, title });
  // esquerda: bullets
  const rich = [];
  left.forEach((p) => {
    if (typeof p === "string") p = { t: p };
    rich.push({ text: p.t, options: { bullet: { code: "2022", indent: 16 }, bold: true, color: C.navy, breakLine: true, paraSpaceAfter: p.d ? 2 : 12, fontSize: 15 } });
    if (p.d) rich.push({ text: p.d, options: { bullet: false, indentLevel: 1, color: C.slate, breakLine: true, paraSpaceAfter: 12, fontSize: 13 } });
  });
  s.addText(rich, { x: MX, y: 2.2, w: 5.8, h: 4.4, fontFace: F.body, valign: "top", margin: 0 });
  // direita: painel de código escuro
  const cx = 6.95, cw = 5.63;
  s.addShape("rect", { x: cx, y: 2.05, w: cw, h: 4.55, fill: { color: C.navyDeep }, shadow: soft() });
  s.addShape("rect", { x: cx, y: 2.05, w: cw, h: 0.42, fill: { color: C.navy } });
  // "semáforo"
  ["FF5F57", "FEBC2E", "28C840"].forEach((cc, k) =>
    s.addShape("ellipse", { x: cx + 0.22 + k * 0.24, y: 2.20, w: 0.13, h: 0.13, fill: { color: cc } }));
  s.addText(codeTitle || "terminal", { x: cx + 1.2, y: 2.05, w: cw - 1.3, h: 0.42, fontFace: F.mono, fontSize: 11, color: C.ice, valign: "middle", margin: 0 });
  s.addText(code, { x: cx + 0.28, y: 2.62, w: cw - 0.5, h: 3.8, fontFace: F.mono, fontSize: 12.5, color: C.white, valign: "top", margin: 0, lineSpacingMultiple: 1.15 });
  if (rightNote) s.addText(rightNote, { x: cx, y: 6.68, w: cw, h: 0.3, fontFace: F.body, fontSize: 10.5, italic: true, color: C.slate, margin: 0 });
  footer(s, foot);
  return s;
}

// =========================================================================
//  7) TIMELINE / PIPELINE horizontal numerada
// =========================================================================
async function timeline(pres, { kicker, title, steps = [], foot }) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  header(s, { kicker, title });
  const n = steps.length;
  const gap = 0.3;
  const w = (PAGE.w - 2 * MX - gap * (n - 1)) / n;
  const y = 2.9;
  // linha de conexão
  s.addShape("line", { x: MX + w / 2, y: y + 0.33, w: (PAGE.w - 2 * MX) - w, h: 0, line: { color: C.cloud2, width: 3 } });
  steps.forEach((st, i) => {
    const x = MX + i * (w + gap);
    // bolha numerada
    s.addShape("ellipse", { x: x + w / 2 - 0.33, y: y, w: 0.66, h: 0.66, fill: { color: C.navy }, shadow: softLo() });
    s.addText(String(i + 1), { x: x + w / 2 - 0.33, y: y, w: 0.66, h: 0.66, fontFace: F.head, fontSize: 22, bold: true, color: C.yellow, align: "center", valign: "middle", margin: 0 });
    // card
    const cy = y + 1.15;
    s.addShape("rect", { x, y: cy, w, h: 2.7, fill: { color: C.cloud }, line: { color: C.line, width: 1 } });
    s.addShape("rect", { x, y: cy, w, h: 0.09, fill: { color: C.yellow } });
    s.addText(st.title, { x: x + 0.2, y: cy + 0.22, w: w - 0.4, h: 0.8, fontFace: F.head, fontSize: 14.5, bold: true, color: C.navy, valign: "top", margin: 0 });
    s.addText(st.desc, { x: x + 0.2, y: cy + 1.0, w: w - 0.4, h: 1.6, fontFace: F.body, fontSize: 12, color: C.slate, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  });
  footer(s, foot);
  return s;
}

// =========================================================================
//  8) TABELA estilizada
// =========================================================================
function table(pres, { kicker, title, head = [], rows = [], colW, note, foot }) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  header(s, { kicker, title });
  const headRow = head.map((h) => ({ text: h, options: { fill: { color: C.navy }, color: C.white, bold: true, fontFace: F.body, fontSize: 13, align: "left", valign: "middle" } }));
  const body = rows.map((r, ri) =>
    r.map((cell, ci) => ({
      text: String(cell),
      options: {
        fill: { color: ri % 2 ? C.cloud : C.white },
        color: ci === 0 ? C.navy : C.ink, bold: ci === 0,
        fontFace: F.body, fontSize: 12.5, align: "left", valign: "middle",
      },
    }))
  );
  s.addTable([headRow, ...body], {
    x: MX, y: 2.15, w: PAGE.w - 2 * MX, colW,
    border: { type: "solid", pt: 1, color: C.line },
    rowH: 0.5, margin: [3, 8, 3, 8], autoPage: false, valign: "middle",
  });
  if (note) s.addText(note, { x: MX, y: 6.6, w: 11.8, h: 0.35, fontFace: F.body, fontSize: 11, italic: true, color: C.slate, margin: 0 });
  footer(s, foot);
  return s;
}

// =========================================================================
//  9) CITAÇÃO / MANCHETE (dark)
// =========================================================================
function quote(pres, { text, source, kicker }) {
  const s = pres.addSlide();
  s.background = { color: C.navyDeep };
  s.addShape("rect", { x: 0, y: 0, w: PAGE.w, h: PAGE.h, fill: { color: C.navyDeep } });
  s.addImage({ path: path.join(ASSETS, "circular-white.png"), x: 10.3, y: 4.9, w: 2.6, h: 2.6, transparency: 86 });
  s.addText("“", { x: 0.45, y: 0.5, w: 3, h: 2.2, fontFace: F.head, fontSize: 200, bold: true, color: C.navyMid, margin: 0 });
  if (kicker) s.addText(kicker.toUpperCase(), { x: MX, y: 2.1, w: 11, h: 0.4, fontFace: F.body, fontSize: 12, bold: true, color: C.yellow, charSpacing: 2, margin: 0 });
  s.addText(text, { x: MX, y: 2.55, w: 11.5, h: 2.6, fontFace: F.head, fontSize: 32, bold: true, color: C.white, italic: true, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  if (source) {
    s.addShape("rect", { x: MX, y: 5.55, w: 0.5, h: 0.08, fill: { color: C.yellow } });
    s.addText(source, { x: MX, y: 5.7, w: 11, h: 0.5, fontFace: F.body, fontSize: 14, color: C.ice, margin: 0 });
  }
  return s;
}

// =========================================================================
//  10) BIBLIOGRAFIA (duas colunas: padrão / estendida)
// =========================================================================
function biblio(pres, { title = "Bibliografia", kicker = "Referências", left, right, foot }) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  header(s, { kicker, title });
  function col(x, spec) {
    s.addShape("rect", { x, y: 2.1, w: 5.75, h: 0.5, fill: { color: C.navy } });
    s.addShape("rect", { x, y: 2.1, w: 0.1, h: 0.5, fill: { color: C.yellow } });
    s.addText(spec.heading.toUpperCase(), { x: x + 0.25, y: 2.1, w: 5.35, h: 0.5, fontFace: F.body, fontSize: 12.5, bold: true, color: C.yellow, charSpacing: 1, valign: "middle", margin: 0 });
    const rich = [];
    spec.items.forEach((it) => {
      rich.push({ text: it.a + " ", options: { bold: true, color: C.ink, breakLine: false, fontSize: 11.5 } });
      rich.push({ text: it.t, options: { color: C.slate, italic: true, breakLine: false, fontSize: 11.5 } });
      if (it.y) rich.push({ text: " " + it.y, options: { color: C.slate, breakLine: true, fontSize: 11.5, paraSpaceAfter: 8 } });
      else rich[rich.length - 1].options.breakLine = true, rich[rich.length - 1].options.paraSpaceAfter = 8;
    });
    s.addText(rich, { x: x + 0.05, y: 2.78, w: 5.7, h: 3.9, fontFace: F.body, valign: "top", margin: 0, lineSpacingMultiple: 1.0 });
  }
  col(MX, left);
  col(6.95, right);
  footer(s, foot);
  return s;
}

// =========================================================================
//  11) ENCERRAMENTO (dark)
// =========================================================================
function closing(pres, { title, lines = [], contact }) {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape("rect", { x: 0, y: 0, w: PAGE.w, h: PAGE.h, fill: { color: C.navy } });
  s.addShape("rect", { x: 0, y: 0, w: 0.28, h: PAGE.h, fill: { color: C.yellow } });
  s.addImage({ path: path.join(ASSETS, "brasao-white.png"), x: 9.1, y: 1.0, w: 4.4, h: 5.0, transparency: 84 });
  s.addText(title, { x: MX, y: 2.35, w: 8.3, h: 1.7, fontFace: F.head, fontSize: 40, bold: true, color: C.white, valign: "top", margin: 0, lineSpacingMultiple: 0.98 });
  if (lines.length) s.addText(lines.map((l, i) => ({ text: l, options: { breakLine: true, paraSpaceAfter: 6 } })), { x: MX, y: 4.25, w: 8, h: 1.5, fontFace: F.body, fontSize: 15, color: C.ice, valign: "top", margin: 0 });
  if (contact) {
    s.addShape("rect", { x: MX, y: 5.95, w: 0.5, h: 0.08, fill: { color: C.yellow } });
    s.addText(contact, { x: MX, y: 6.1, w: 8, h: 0.5, fontFace: F.body, fontSize: 14, bold: true, color: C.yellow, margin: 0 });
  }
  return s;
}

module.exports = {
  C, F, PAGE, MX, icon, ASSETS,
  cover, divider, bullets, cards, stats, twoCol, timeline, table, quote, biblio, closing,
  newPres: () => {
    const pptxgen = require("pptxgenjs");
    const p = new pptxgen();
    p.defineLayout({ name: "WIDE", width: PAGE.w, height: PAGE.h });
    p.layout = "WIDE";
    p.author = "Leandro Mendes Ferreira";
    p.company = "PECE Poli-USP";
    return p;
  },
};
