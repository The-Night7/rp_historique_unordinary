(() => {
"use strict";
const ST = window.STATS, CU = window.CURATED;
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const T = d => Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10));
const DAY = 864e5;
const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const fd = d => { const x = new Date(T(d)); return `${x.getUTCDate()} ${MONTHS[x.getUTCMonth()]}`; };
const fdr = (a, b) => (!b || b === a) ? fd(a) : `${fd(a)} → ${fd(b)}`;
const START = "2026-08-12", END = "2026-11-08";
const KINDS = {
  combat: ["Combat", "var(--combat)"], rencontre: ["Rencontre", "var(--rencontre)"], plot: ["Intrigue", "var(--plot)"],
  vigilante: ["Justiciers", "var(--vigilante)"], lien: ["Lien / relation", "var(--lien)"], tournant: ["Tournant", "var(--tournant)"],
  evo: ["Évolution", "var(--evo)"], arc: ["Arc", "var(--arc)"], fight: ["Combat", "var(--fight)"], bond: ["Lien", "var(--bond)"]
};
const kcol = k => (KINDS[k] || ["", "var(--accent)"])[1];
const klab = k => (KINDS[k] || [k])[0];
const EV = CU.EVENTS, ACTS = CU.ACTS, ARCS = CU.ARCS, FICHES = CU.FICHES;
const CH = ST.chars;
const hue = n => { let h = 0; for (const c of n) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
const ccol = n => `hsl(${hue(n)} 52% 46%)`;
const initial = n => n.trim()[0].toUpperCase();
const slug = n => encodeURIComponent(n);
const imgsOf = n => { const v = (CU.IMAGES || {})[n]; return !v ? [] : Array.isArray(v) ? v : [v]; };
const imgOf = n => imgsOf(n)[0] || "";
const imgTags = (n, cls) => imgsOf(n).map(u => `<img${cls ? ` class="${cls}"` : ""} src="${esc(u)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`).join("");
const avImg = n => imgTags(n);
const av = (n, lg) => `<span class="av${lg ? " lg" : ""}${imgsOf(n).length > 1 ? " two" : ""}" style="background:${ccol(n)}" aria-hidden="true">${esc(initial(n))}${avImg(n)}</span>`;
const clink = n => CH[n] ? `<a class="cl" href="#/perso/${slug(n)}">${esc(n)}</a>` : `<span class="cl" style="background:var(--surface2);color:var(--muted)">${esc(n)}</span>`;
const tierOf = l => l < 2 ? (l <= 1 ? "Cripple" : "Low Tier") : l < 3.5 ? "Mid Tier" : l < 5 ? "Elite Tier" : l < 6 ? "High Tier" : "God Tier";
const actOf = d => ACTS.find(a => d >= a.from && d <= a.to) || ACTS[0];

// ---------- tooltip ----------
const tip = $("#tip");
document.addEventListener("pointerover", e => {
  const t = e.target.closest("[data-tip]");
  if (!t) return;
  tip.innerHTML = t.getAttribute("data-tip"); tip.hidden = false; place(e);
});
document.addEventListener("pointermove", e => { if (!tip.hidden) place(e); });
document.addEventListener("pointerout", e => { if (e.target.closest("[data-tip]")) tip.hidden = true; });
function place(e) {
  const w = tip.offsetWidth, h = tip.offsetHeight;
  let x = e.clientX + 14, y = e.clientY + 14;
  if (x + w > innerWidth - 8) x = e.clientX - w - 14;
  if (y + h > innerHeight - 8) y = e.clientY - h - 14;
  tip.style.left = Math.max(8, x) + "px"; tip.style.top = Math.max(8, y) + "px";
}
const tp = (title, sub, body) => esc(`<b>${esc(title)}</b>${sub ? `<span style="opacity:.75">${esc(sub)}</span>` : ""}${body ? `<br>${esc(body)}` : ""}`);

// ---------- charts ----------
function activityChart({ series, markers = [], acts = false, h = 220, color = "var(--accent)", id = "x" }) {
  const W = 1000, padL = 34, padR = 10, padT = markers.length ? 34 : 12, padB = 26;
  const t0 = T(START), t1 = T(END) + DAY;
  const X = d => padL + (T(d) - t0) / (t1 - t0) * (W - padL - padR);
  const max = Math.max(1, ...series.map(s => s[1]));
  const nice = max <= 10 ? Math.ceil(max / 2) * 2 : Math.ceil(max / 20) * 20;
  const Y = v => h - padB - v / nice * (h - padB - padT);
  const bw = Math.max(2, (W - padL - padR) / ((t1 - t0) / DAY) - 1.5);
  let s = `<svg viewBox="0 0 ${W} ${h}" role="img" aria-label="Activité par jour">`;
  if (acts) ACTS.forEach(a => {
    const x0 = X(a.from), x1 = X(a.to) + bw;
    s += `<rect x="${x0}" y="${padT - 6}" width="${x1 - x0}" height="${h - padB - padT + 6}" fill="${a.color}" opacity=".08"/>`;
    s += `<text x="${x0 + 6}" y="${padT + 8}" style="fill:${a.color};font-weight:700">${esc(a.name.split(" — ")[0])}</text>`;
  });
  for (let i = 0; i <= 4; i++) {
    const v = nice * i / 4, y = Y(v);
    s += `<line x1="${padL}" x2="${W - padR}" y1="${y}" y2="${y}" stroke="var(--line)"/><text x="${padL - 6}" y="${y + 4}" text-anchor="end">${Math.round(v)}</text>`;
  }
  for (const [d, n] of series) s += `<rect x="${X(d)}" y="${Y(n)}" width="${bw}" height="${Math.max(1, h - padB - Y(n))}" rx="1.5" fill="${color}" opacity=".85" data-tip="${tp(fd(d), n + " messages")}"/>`;
  for (let m = 0; m < 4; m++) {
    const d = new Date(Date.UTC(2026, 7 + m, 1)); const ds = d.toISOString().slice(0, 10);
    if (ds < START) continue;
    s += `<text x="${X(ds)}" y="${h - 6}">${MONTHS[d.getUTCMonth()]}</text><line x1="${X(ds)}" x2="${X(ds)}" y1="${h - padB}" y2="${h - padB + 4}" stroke="var(--muted)"/>`;
  }
  markers.forEach(m => {
    const x = X(m.d) + bw / 2, c = kcol(m.k);
    const ex = m.e && m.e > m.d ? `<line x1="${x}" x2="${X(m.e) + bw / 2}" y1="${padT - 12}" y2="${padT - 12}" stroke="${c}" stroke-width="3" opacity=".5" stroke-linecap="round"/>` : "";
    s += `<g data-tip="${tp(m.t, fdr(m.d, m.e), m.s)}">${ex}<path d="M${x} ${padT - 4} l-6 -12 l12 0z" fill="${c}" ${m.big ? 'stroke="var(--tournant)" stroke-width="2"' : ""}/><line x1="${x}" x2="${x}" y1="${padT - 4}" y2="${h - padB}" stroke="${c}" stroke-dasharray="2 4" opacity=".4"/></g>`;
  });
  return s + "</svg>";
}

function palierChart(rows) {
  const W = 520, h = 210, padL = 28, padR = 52, padT = 12, padB = 26;
  const n = rows.length; if (n < 1) return "";
  const names = ["Power", "Defense", "Recovery", "Trick", "Speed"], cols = ["#d6453d", "#3a74d8", "#1f9c7a", "#8b52d6", "#d98a0b"];
  const max = Math.max(4, ...rows.flatMap(r => r[1]));
  const X = i => n === 1 ? padL + (W - padL - padR) / 2 : padL + i / (n - 1) * (W - padL - padR);
  const Y = v => h - padB - v / max * (h - padB - padT);
  let s = `<svg viewBox="0 0 ${W} ${h}" role="img" aria-label="Statistiques par palier">`;
  for (let i = 0; i <= 4; i++) { const v = max * i / 4; s += `<line x1="${padL}" x2="${W - padR}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${padL - 5}" y="${Y(v) + 4}" text-anchor="end">${Math.round(v * 10) / 10}</text>`; }
  rows.forEach((r, i) => s += `<text x="${X(i)}" y="${h - 8}" text-anchor="middle">${r[0].toFixed(1)}</text>`);
  const lab = names.map((nm, k) => ({ k, y: Y(rows[n - 1][1][k]) })).sort((u, v) => u.y - v.y);
  for (let i = 1; i < lab.length; i++) if (lab[i].y - lab[i - 1].y < 13) lab[i].y = lab[i - 1].y + 13;
  names.forEach((nm, k) => {
    const pts = rows.map((r, i) => [X(i), Y(r[1][k])]);
    s += `<polyline fill="none" stroke="${cols[k]}" stroke-width="2.2" points="${pts.map(p => p.join(",")).join(" ")}"/>`;
    pts.forEach((p, i) => s += `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${cols[k]}" data-tip="${tp(nm + " — " + rows[i][0].toFixed(1), "", "valeur " + rows[i][1][k])}"/>`);
    s += `<text x="${W - padR + 8}" y="${lab.find(l => l.k === k).y + 4}" style="fill:${cols[k]};font-weight:700">${nm}</text>`;
  });
  return s + "</svg>";
}

function radar(v0, color) {
  // ordre d'affichage du radar : Power, Speed, Trick, Recovery, Defense (valeurs de l'unodex : P, D, R, T, S)
  const ORD = [0, 4, 3, 2, 1], labels = ORD.map(i => ["Power", "Defense", "Recovery", "Trick", "Speed"][i]), vals = ORD.map(i => v0[i]), R = 90, cx = 130, cy = 120;
  const max = Math.max(10, ...vals);
  const pt = (i, v) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [cx + Math.cos(a) * R * v / max, cy + Math.sin(a) * R * v / max]; };
  let s = `<svg viewBox="0 0 260 245" role="img" aria-label="Radar des statistiques" style="max-width:300px;margin:auto">`;
  [.25, .5, .75, 1].forEach(f => s += `<polygon fill="none" stroke="var(--line)" points="${labels.map((_, i) => pt(i, max * f).join(",")).join(" ")}"/>`);
  labels.forEach((l, i) => { const p = pt(i, max * 1.17); s += `<line x1="${cx}" y1="${cy}" x2="${pt(i, max)[0]}" y2="${pt(i, max)[1]}" stroke="var(--line)"/><text x="${p[0]}" y="${p[1] + 4}" text-anchor="middle">${l} ${vals[i]}</text>`; });
  s += `<polygon fill="${color}" fill-opacity=".25" stroke="${color}" stroke-width="2.2" points="${vals.map((v, i) => pt(i, v).join(",")).join(" ")}"/>`;
  return s + "</svg>";
}

function levelLines(list, h = 380) {
  const W = 1000, padL = 34, padR = 110, padT = 14, padB = 28;
  const t0 = T(START), t1 = T(END);
  const X = d => padL + (T(d) - t0) / (t1 - t0) * (W - padL - padR);
  const all = list.flatMap(c => c.pts.map(p => p[1]));
  const lo = Math.floor(Math.min(...all)) - .5, hi = Math.ceil(Math.max(...all)) + .5;
  const Y = v => h - padB - (v - lo) / (hi - lo) * (h - padB - padT);
  let s = `<svg viewBox="0 0 ${W} ${h}" role="img" aria-label="Évolution des niveaux">`;
  ACTS.forEach(a => s += `<rect x="${X(a.from)}" y="${padT}" width="${X(a.to) - X(a.from)}" height="${h - padB - padT}" fill="${a.color}" opacity=".07"/>`);
  for (let v = Math.ceil(lo); v <= hi; v++) s += `<line x1="${padL}" x2="${W - padR}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${padL - 6}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`;
  for (let m = 0; m < 4; m++) { const d = new Date(Date.UTC(2026, 7 + m, 1)).toISOString().slice(0, 10); if (d >= START) s += `<text x="${X(d)}" y="${h - 8}">${MONTHS[(7 + m) % 12]}</text>`; }
  // label collision avoidance
  const ends = list.map(c => ({ c, y: Y(c.pts[c.pts.length - 1][1]) })).sort((a, b) => a.y - b.y);
  for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 13) ends[i].y = ends[i - 1].y + 13;
  list.forEach(c => {
    const col = ccol(c.name); let pts = [], prev = null;
    c.pts.forEach(([d, v]) => { const x = X(d), y = Y(v); if (prev) pts.push([x, prev]); pts.push([x, y]); prev = y; });
    pts.push([X(END), prev]);
    s += `<polyline fill="none" stroke="${col}" stroke-width="2.4" stroke-linejoin="round" points="${pts.map(p => p.join(",")).join(" ")}"/>`;
    c.pts.forEach(([d, v]) => s += `<circle cx="${X(d)}" cy="${Y(v)}" r="4.5" fill="${col}" stroke="var(--surface)" stroke-width="1.5" data-tip="${tp(c.name + " — " + v.toFixed(1), fd(d), tierOf(v))}"/>`);
    const e = ends.find(x => x.c === c);
    s += `<a href="#/perso/${slug(c.name)}"><text x="${W - padR + 8}" y="${e.y + 4}" style="fill:${col};font-weight:700">${esc(c.name)} ${c.pts[c.pts.length - 1][1].toFixed(1)}</text></a>`;
  });
  return s + "</svg>";
}

function debChart(pts) {
  const W = 700, h = 230, padL = 38, padR = 14, padT = 16, padB = 30;
  const t0 = T(pts[0][0]), t1 = T(pts[pts.length - 1][0]) + 2 * DAY;
  const X = d => padL + (T(d) - t0) / (t1 - t0) * (W - padL - padR), Y = v => h - padB - v / 100 * (h - padB - padT);
  let s = `<svg viewBox="0 0 ${W} ${h}" role="img" aria-label="Récupération de la capacité">`;
  for (let v = 0; v <= 100; v += 25) s += `<line x1="${padL}" x2="${W - padR}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${padL - 6}" y="${Y(v) + 4}" text-anchor="end">${v}%</text>`;
  const line = []; pts.forEach((p, i) => { const mid = (p[1] + p[2]) / 2, x = X(p[0]); if (i) line.push([x, line[line.length - 1][1]]); line.push([x, Y(mid)]); });
  s += `<polyline fill="none" stroke="var(--accent)" stroke-width="2.5" points="${line.map(p => p.join(",")).join(" ")}"/>`;
  pts.forEach(p => { const x = X(p[0]); if (p[2] > p[1]) s += `<rect x="${x - 6}" y="${Y(p[2])}" width="12" height="${Y(p[1]) - Y(p[2])}" rx="3" fill="var(--accent)" opacity=".25"/>`;
    s += `<circle cx="${x}" cy="${Y((p[1] + p[2]) / 2)}" r="5.5" fill="var(--accent)" stroke="var(--surface)" stroke-width="2" data-tip="${tp(fd(p[0]) + " — " + (p[1] === p[2] ? p[1] + " %" : p[1] + " à " + p[2] + " %"), "", p[3])}"/><text x="${x}" y="${h - 10}" text-anchor="middle">${fd(p[0])}</text>`; });
  return s + "</svg>";
}
function bars(items, { max, href, color = "var(--accent)", fmt = v => v } = {}) {
  max = max || Math.max(1, ...items.map(i => i[1]));
  return items.map(([n, v]) => `<div class="bar"><${href && href(n) ? `a href="${href(n)}"` : "span"} title="${esc(n)}">${esc(n)}</${href && href(n) ? "a" : "span"}><div class="t"><i style="width:${Math.max(2, v / max * 100)}%;background:${color}"></i></div><span class="n">${fmt(v)}</span></div>`).join("");
}

// ---------- views ----------
const daily = ST.daily;
function eventCard(e, { showChars = true } = {}) {
  const c = kcol(e.k), big = e.t.startsWith("★");
  return `<article class="ev${big ? " big" : ""}" style="--c:${c}" id="e-${e.d}-${esc(e.t.slice(0, 8))}">
    <time>${fdr(e.d, e.e)} · ${esc(e.p || "")}</time>
    <h3>${esc(e.t)}</h3><p>${esc(e.s)}</p>
    <div class="meta"><span class="chip k-${e.k}"><i></i>${klab(e.k)}</span>${showChars ? (e.c || []).map(clink).join("") : ""}<a class="cl bd-open" href="#/evenement/${evId(e)}">🧵 Tableau</a></div></article>`;
}
const bigEvents = EV.filter(e => e.t.startsWith("★"));
const evMarkers = list => list.map(e => ({ d: e.d, e: e.e, t: e.t.replace("★ ", ""), s: e.p || "", k: e.k, big: e.t.startsWith("★") }));

function viewHome() {
  const nPlaces = ST.places.length, nChars = Object.keys(CH).length;
  const topChars = Object.entries(CH).sort((a, b) => b[1].msgs - a[1].msgs).slice(0, 12).map(([n, c]) => [n, c.msgs]);
  const kinds = {}; EV.forEach(e => kinds[e.k] = (kinds[e.k] || 0) + 1);
  return `
  <h1>L'histoire du RP, de la rentrée à l'attaque de Spectre</h1>
  <p class="lead">Quatre actes, ${EV.length} événements marquants, ${nChars} personnages à suivre. Les barres montrent l'activité des salons jour par jour ; les triangles colorés sont les événements (survolez-les).</p>
  <div class="grid g4">
    <div class="card stat"><b>${ST.total.toLocaleString("fr-FR")}</b><span>messages RP analysés</span></div>
    <div class="card stat"><b>${nChars}</b><span>personnages (≥ 8 messages ou points d'évolution)</span></div>
    <div class="card stat"><b>${nPlaces}</b><span>salons & fils de discussion</span></div>
    <div class="card stat"><b>${Math.round((T(END) - T(START)) / DAY)}</b><span>jours de RP (12 août → 8 nov.)</span></div>
  </div>
  <h2>Activité & événements</h2>
  <div class="card">${activityChart({ series: daily, markers: evMarkers(bigEvents), acts: true, h: 250 })}
    <div class="legend">${Object.entries({ tournant: 0 }).map(() => `<span><i style="background:var(--tournant)"></i>Grands tournants (★)</span>`).join("")}<span>Survol : titre, dates, résumé</span></div></div>
  <h2>Les quatre actes</h2>
  <div class="grid g2">${ACTS.map(a => `<div class="card" style="border-left:6px solid ${a.color}"><h3>${esc(a.name)}</h3><p class="sub">${fdr(a.from, a.to)}</p><p>${esc(a.text)}</p><a href="#/chronologie?act=${a.id}">Voir la chronologie de l'acte →</a></div>`).join("")}</div>
  <h2>Grands tournants</h2>
  <div class="tl">${bigEvents.map(e => eventCard(e)).join("")}</div>
  <h2>Qui parle le plus ?</h2>
  <div class="grid g2"><div class="card"><h3>Messages RP par personnage</h3>${bars(topChars, { href: n => "#/perso/" + slug(n) })}</div>
  <div class="card"><h3>Types d'événements</h3>${bars(Object.entries(kinds).map(([k, v]) => [klab(k), v]), { color: "var(--plot)" })}<p class="sub" style="margin-top:12px">Les personnages joués par un même joueur (ex. Telemachus et Arlequin) restent comptés séparément.</p></div></div>`;
}

function viewChrono(q) {
  const kinds = ["tournant", "combat", "rencontre", "plot", "vigilante", "lien"];
  const state = { k: "all", c: "", q: "", act: q.get("act") || "all" };
  const chars = [...new Set(EV.flatMap(e => e.c || []))].sort();
  const render = () => {
    const list = EV.filter(e => (state.k === "all" || e.k === state.k) && (!state.c || (e.c || []).includes(state.c)) &&
      (!state.q || (e.t + e.s + e.p).toLowerCase().includes(state.q.toLowerCase())) && (state.act === "all" || actOf(e.d).id === state.act));
    $("#tl").innerHTML = ACTS.filter(a => state.act === "all" || a.id === state.act).map(a => {
      const l = list.filter(e => actOf(e.d).id === a.id); if (!l.length) return "";
      return `<section class="act" style="--c:${a.color}"><h2>${esc(a.name)}</h2><p>${fdr(a.from, a.to)} · ${esc(a.text)}</p></section><div class="tl">${l.map(e => eventCard(e)).join("")}</div>`;
    }).join("") || `<p class="sub">Aucun événement ne correspond.</p>`;
    $("#cnt").textContent = list.length + " événement(s)";
    document.querySelectorAll("[data-k]").forEach(b => b.classList.toggle("on", b.dataset.k === state.k));
    document.querySelectorAll("[data-a]").forEach(b => b.classList.toggle("on", b.dataset.a === state.act));
  };
  setTimeout(() => {
    document.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { state.k = b.dataset.k; render(); });
    document.querySelectorAll("[data-a]").forEach(b => b.onclick = () => { state.act = b.dataset.a; render(); });
    $("#fc").onchange = e => { state.c = e.target.value; render(); };
    $("#fq").oninput = e => { state.q = e.target.value; render(); };
    render();
  });
  return `<h1>Chronologie complète</h1><p class="lead">Les événements regroupés par acte. Filtrez par type, par personnage ou cherchez un mot.</p>
  <div class="card" style="margin-bottom:12px">${activityChart({ series: daily, markers: evMarkers(EV), acts: true, h: 230 })}</div>
  <div class="filters"><button data-a="all">Tous les actes</button>${ACTS.map(a => `<button data-a="${a.id}">${esc(a.name.split(" — ")[0])}</button>`).join("")}</div>
  <div class="filters"><button data-k="all">Tous types</button>${kinds.map(k => `<button data-k="${k}">${klab(k)}</button>`).join("")}
    <select id="fc" aria-label="Personnage"><option value="">Tous les personnages</option>${chars.map(c => `<option>${esc(c)}</option>`).join("")}</select>
    <input id="fq" type="search" placeholder="Rechercher…" aria-label="Rechercher"><span class="sub" id="cnt"></span></div>
  <div id="tl"></div>`;
}

const mainChars = () => Object.entries(CH).filter(([n, c]) => ARCS[n] || FICHES[n] || c.msgs >= 30).map(([n]) => n);
function viewPersos(q) {
  const state = { all: false, s: "", sort: "msgs", school: "" };
  const lvl = n => { const f = FICHES[n]; return f && f.rows.length ? f.rows[f.rows.length - 1][0] : -1; };
  const schools = [...new Set(Object.values(FICHES).map(f => f.ecole.split(" (")[0]).filter(x => x !== "—"))].sort();
  const render = () => {
    let names = state.all ? Object.keys(CH) : mainChars();
    names = names.filter(n => n.toLowerCase().includes(state.s.toLowerCase()) && (!state.school || (FICHES[n] || { ecole: "" }).ecole.startsWith(state.school)));
    names.sort((a, b) => state.sort === "msgs" ? CH[b].msgs - CH[a].msgs : state.sort === "lvl" ? lvl(b) - lvl(a) : a.localeCompare(b));
    $("#pg").innerHTML = names.map(n => {
      const f = FICHES[n], a = ARCS[n];
      return `<a class="pc" href="#/perso/${slug(n)}">${av(n)}<span><b>${esc(n)}</b><small>${esc(a ? a.tag : f && f.ecole !== "—" ? f.ecole + " · " + f.ability : f ? f.ability : "Personnage secondaire")}</small><br><small>${CH[n].msgs} msg${f && f.rows.length ? " · niv " + lvl(n).toFixed(1) : ""}</small></span></a>`;
    }).join("") || "<p class='sub'>Aucun résultat.</p>";
    $("#tg").textContent = state.all ? "Afficher seulement les principaux" : "Afficher tous les personnages (" + Object.keys(CH).length + ")";
  };
  setTimeout(() => {
    $("#ps").oninput = e => { state.s = e.target.value; render(); };
    $("#po").onchange = e => { state.sort = e.target.value; render(); };
    $("#psc").onchange = e => { state.school = e.target.value; render(); };
    $("#tg").onclick = () => { state.all = !state.all; render(); };
    render();
  });
  return `<h1>Personnages</h1><p class="lead">Chaque fiche regroupe l'historique, les arcs, les évolutions de niveau et les statistiques tirées de l'unodex.</p>
  <div class="filters"><input id="ps" type="search" placeholder="Chercher un personnage…" aria-label="Chercher">
  <select id="po" aria-label="Tri"><option value="msgs">Tri : messages</option><option value="lvl">Tri : niveau</option><option value="az">Tri : A → Z</option></select>
  <select id="psc" aria-label="École"><option value="">Toutes les écoles</option>${schools.map(s => `<option>${esc(s)}</option>`).join("")}</select>
  <button id="tg"></button></div><div class="grid g3" id="pg"></div>`;
}

function viewPerso(name) {
  const c = CH[name]; if (!c) return `<h1>Introuvable</h1><p><a href="#/personnages">← Retour aux personnages</a></p>`;
  const f = FICHES[name], a = ARCS[name];
  const myEv = EV.filter(e => (e.c || []).includes(name));
  const beats = (a ? a.beats : []).map(b => ({ d: b[0], kind: b[1], t: b[2] }));
  const series = Object.entries(c.days).sort();
  const markers = [...beats.map(b => ({ d: b.d, t: klab(b.kind), s: "", k: b.kind, _s: b.t })).map(m => ({ ...m, s: m._s })), ...evMarkers(myEv)].map(m => ({ ...m, t: m.t, s: m.s }));
  // completer les jours manquants dans la serie
  const have = new Set(series.map(s => s[0])); const full = [...series];
  for (let t = T(START); t <= T(END); t += DAY) { const d = new Date(t).toISOString().slice(0, 10); if (!have.has(d)) full.push([d, 0]); }
  full.sort((x, y) => x[0] < y[0] ? -1 : 1);
  const journey = [...beats.map(b => ({ d: b.d, k: b.kind, t: b.t, src: "arc" })), ...myEv.map(e => ({ d: e.d, e: e.e, k: e.k, t: e.t, s: e.s, p: e.p, src: "ev" }))].sort((x, y) => x.d < y.d ? -1 : 1);
  const lv = c.levels;
  const lvChart = lv.length > 1 ? levelLines([{ name, pts: lv.map(l => [l[0], +l[1]]) }], 230) : "";
  const rows = f ? f.rows : [];
  const pe = c.pe || {}, peTot = pe.total || 0;
  const peParts = [["training", "Entraînement"], ["fight", "Combat"]].filter(([k]) => pe[k]);
  const sc = [...c.scenes].sort((x, y) => x[0] < y[0] ? 1 : -1);
  const weeks = {};
  return `<p><a href="#/personnages">← Tous les personnages</a></p>
  <div class="hero">${av(name, true)}<div><h1>${esc(name)}</h1><p class="sub">${esc(a ? a.tag : f ? f.ecole : "")} · ${c.msgs} messages · vu du ${fd(c.first)} au ${fd(c.last)}</p></div></div>
  ${a ? `<p class="lead"><b>${esc(a.title)}.</b> ${esc(a.summary)}</p>` : ""}
  <div class="grid g2">
   ${f ? `<div class="card fiche"><h3>Fiche (unodex)</h3><dl><dt>École</dt><dd>${esc(f.ecole)}</dd><dt>Taille</dt><dd>${esc(f.taille)}</dd><dt>Type</dt><dd>${esc(f.type)}</dd><dt>Capacité</dt><dd>${esc(f.ability)}</dd><dt>Nature</dt><dd>${esc(f.nature)}</dd>${rows.length ? `<dt>Niveau</dt><dd>${rows[0][0].toFixed(1)} → ${rows[rows.length - 1][0].toFixed(1)} · ${tierOf(rows[rows.length - 1][0])}</dd>` : ""}${peTot ? `<dt>Points d'évolution</dt><dd>${peTot} (${peParts.map(([k, l]) => l + " " + pe[k]).join(", ")})</dd>` : ""}</dl>${f.note ? `<div class="note">${esc(f.note)}</div>` : ""}</div>` :
   `<div class="card fiche"><h3>Fiche</h3><p class="sub">Pas de fiche dans l'unodex pour ce personnage (ou personnage secondaire).${peTot ? ` Points d'évolution : ${peTot}.` : ""}</p></div>`}
   ${rows.length ? `<div class="card"><h3>Statistiques par palier</h3>${rows.length > 1 && rows.some(r => r[1].some((v, i) => v !== rows[0][1][i])) ? palierChart(rows) : ""}<div class="sel" id="rsel">${rows.map((r, i) => `<button data-i="${i}" class="${i === rows.length - 1 ? "on" : ""}">${r[0].toFixed(1)}</button>`).join("")}</div><div id="rad">${radar(rows[rows.length - 1][1], ccol(name))}</div></div>` : `<div class="card"><h3>Partenaires de scène <span class="sub">(messages échangés)</span></h3>${bars(c.partners.slice(0, 8), { href: n => CH[n] ? "#/perso/" + slug(n) : "" })}</div>`}
  </div>
  <h2>Activité & moments clés</h2>
  <div class="card">${activityChart({ series: full, markers, acts: true, h: 230, color: ccol(name) })}
  <div class="legend"><span><i style="background:var(--tournant)"></i>Tournant</span><span><i style="background:var(--fight)"></i>Combat</span><span><i style="background:var(--bond)"></i>Lien / rencontre</span><span><i style="background:var(--plot)"></i>Arc / intrigue</span><span><i style="background:var(--evo)"></i>Évolution</span></div></div>
  ${lv.length > 1 ? `<h2>Niveau dans le temps</h2><div class="card">${lvChart}<p class="sub">Niveaux relevés dans les pseudos Discord du personnage (les libellés « 1.0 », qui désignent le compte joueur, sont ignorés).</p></div>` : ""}
  ${CU.DEBLOCAGE && CU.DEBLOCAGE[name] ? `<h2>Récupération de la capacité</h2><div class="card">${debChart(CU.DEBLOCAGE[name])}<p class="sub">Part de capacité disponible après l'attaque du 20 octobre ; estimation tirée des logs et de la fiche du personnage.</p></div>` : ""}
  ${CU.FICHE_CHRONO && CU.FICHE_CHRONO[name] ? `<h2>Chronologie de sa fiche</h2><div class="card">${CU.FICHE_CHRONO[name].map(c => `<div class="beat"><time>${esc(c[1])}</time><div><b>${esc(c[0])}</b><br>${esc(c[2])}</div></div>`).join("")}</div>` : ""}
  <h2>Son tableau d'enquête</h2><p class="sub" style="margin:0 0 10px">Ses partenaires, ses événements clés, les pistes où il est mêlé et les moments d'évolution ou d'arc de sa fiche.</p><div id="bdperso">${bdHTML("bd-pe", boardForPerso(name))}</div>
  <h2>Parcours</h2>
  <div class="card">${journey.length ? journey.map(j => `<div class="beat"><time>${fdr(j.d, j.e)}</time><div><span class="tag k-${j.k}">${j.src === "ev" ? "Événement · " : ""}${klab(j.k)}</span><br>${j.src === "ev" ? `<b>${esc(j.t)}</b> — ${esc(j.s)}` : esc(j.t)}</div></div>`).join("") : "<p class='sub'>Aucun événement documenté pour l'instant.</p>"}</div>
  <div class="grid g2" style="margin-top:14px">
   <div class="card"><h3>Lieux les plus fréquentés <span class="sub">(messages)</span></h3>${bars(c.places.slice(0, 8))}</div>
   <div class="card"><h3>Partenaires de scène</h3>${bars(c.partners.slice(0, 8), { href: n => CH[n] ? "#/perso/" + slug(n) : "", color: "var(--lien)" })}</div></div>
  <h2>Toutes les scènes (${sc.length})</h2>
  <div class="card scroll"><details><summary>Afficher la liste complète</summary><table><thead><tr><th>Date</th><th>Lieu</th><th>Ville</th><th>Msgs</th><th>Avec</th></tr></thead><tbody>${sc.map(s => `<tr><td>${fd(s[0])}</td><td>${esc(s[1])}</td><td>${esc(s[2])}</td><td>${s[3]}</td><td>${s[4].map(n => esc(n)).join(", ")}</td></tr>`).join("")}</tbody></table></details></div>`;
}
function afterPerso(name) {
  bdMount("bd-pe");
  const f = FICHES[name]; if (!f || !f.rows.length) return;
  const sel = $("#rsel"); if (!sel) return;
  sel.querySelectorAll("button").forEach(b => b.onclick = () => {
    sel.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
    $("#rad").innerHTML = radar(f.rows[+b.dataset.i][1], ccol(name));
  });
}

function viewEvo() {
  const lines = Object.entries(CH).map(([n, c]) => ({ name: n, pts: c.levels.map(l => [l[0], +l[1]]) })).filter(x => x.pts.length >= 2);
  const peList = Object.entries(CH).filter(([, c]) => (c.pe.total || 0) > 0).sort((a, b) => b[1].pe.total - a[1].pe.total).slice(0, 18);
  const maxPE = peList[0][1].pe.total;
  const ladder = Object.entries(FICHES).filter(([n]) => n !== "Arlequin").map(([n, f]) => [n, f.rows.filter(r => r[0] > 1)]).filter(([, r]) => r.length > 1).map(([n, r]) => [n, r[0][0], r[r.length - 1][0]]).filter(r => r[2] > r[1]).sort((a, b) => (b[2] - b[1]) - (a[2] - a[1]));
  return `<h1>Évolutions & montées de niveau</h1><p class="lead">Les niveaux sont relevés dans les pseudos Discord datés, et les paliers dans l'unodex-rp. Les points d'évolution viennent des embeds du bot uru-chan.</p>
  <h2>Niveaux au fil du temps</h2>
  <div class="card">${levelLines(lines)}<p class="sub">Seuls les personnages dont le niveau change au moins une fois dans les logs figurent ici. Bandes colorées : actes I à IV.</p></div>
  <div class="grid g2" style="margin-top:14px">
   <div class="card"><h3>Paliers de fiche (unodex)</h3><div class="scroll"><table><thead><tr><th>Perso</th><th>1er palier</th><th>Actuel</th><th>Gain</th></tr></thead><tbody>${ladder.map(([n, a, b]) => `<tr><td><a href="#/perso/${slug(n)}">${esc(n)}</a></td><td>${a.toFixed(1)}</td><td>${b.toFixed(1)} <span class="sub">${tierOf(b)}</span></td><td>+${(b - a).toFixed(1)}</td></tr>`).join("")}</tbody></table></div></div>
   <div class="card"><h3>Points d'évolution gagnés</h3>${peList.map(([n, c]) => `<div class="bar"><a href="#/perso/${slug(n)}">${esc(n)}</a><div class="t" style="display:flex"><i style="width:${(c.pe.training || 0) / maxPE * 100}%;background:var(--lien);border-radius:999px 0 0 999px"></i><i style="width:${(c.pe.fight || 0) / maxPE * 100}%;background:var(--combat);border-radius:0 999px 999px 0"></i></div><span class="n">${c.pe.total}</span></div>`).join("")}<div class="legend"><span><i style="background:var(--lien)"></i>Entraînement</span><span><i style="background:var(--combat)"></i>Combat</span></div></div></div>`;
}

function viewLieux(q) {
  const towns = [...new Set(ST.places.map(p => p.town))];
  const state = { town: "" };
  const render = () => {
    const l = ST.places.filter(p => !state.town || p.town === state.town);
    $("#pl").innerHTML = l.map(p => `<tr><td><b>${esc(p.name)}</b></td><td>${esc(p.town)}</td><td>${p.msgs}</td><td>${fdr(p.first, p.last)}</td><td>${p.chars.map(([n]) => CH[n] ? clink(n) : esc(n)).join(" ")}</td></tr>`).join("");
    document.querySelectorAll("[data-t]").forEach(b => b.classList.toggle("on", b.dataset.t === state.town));
  };
  setTimeout(() => { document.querySelectorAll("[data-t]").forEach(b => b.onclick = () => { state.town = b.dataset.t; render(); }); render(); });
  const byTown = {}; ST.places.forEach(p => byTown[p.town] = (byTown[p.town] || 0) + p.msgs);
  return `<h1>Lieux</h1><p class="lead">Où s'est déroulé le RP : villes, lycées, quartiers.</p>
  <div class="grid g2"><div class="card"><h3>Messages par ville</h3>${bars(Object.entries(byTown).sort((a, b) => b[1] - a[1]), { color: "var(--rencontre)" })}</div>
  <div class="card"><h3>Salons les plus actifs</h3>${bars(ST.places.slice(0, 10).map(p => [p.name, p.msgs]), { color: "var(--plot)" })}</div></div>
  <div class="filters" style="margin-top:18px"><button data-t="">Toutes</button>${towns.map(t => `<button data-t="${esc(t)}">${esc(t)}</button>`).join("")}</div>
  <div class="card scroll"><table><thead><tr><th>Salon</th><th>Ville</th><th>Msgs</th><th>Période</th><th>Principaux personnages</th></tr></thead><tbody id="pl"></tbody></table></div>`;
}


// ---------- tableaux d'enquête (liège, punaises, fils rouges) ----------
const BSTAT = { perdue: "#d6453d", partielle: "#e0a21a", complète: "#2fb58c", inconnue: "#9c98ad" };
const BDS = {};
const MYST = CU.MYSTERIES || [];
const evId = e => EV.indexOf(e);
function bdStatus(n) { const t = (CU.TRACKER || []).find(x => x.n.trim() === n); return t ? t.st : null; }
const mystOf = e => MYST.filter(m => (e.c || []).some(c => (m.pp || []).includes(c)) && new RegExp(m.rx).test(e.t + " " + e.s));
const evsOfMyst = m => EV.filter(e => new RegExp(m.rx).test(e.t + " " + e.s) && (e.c || []).some(c => (m.pp || []).includes(c) || true));
function bdCard(nd, idx) {
  const r = (((idx * 37) % 9) - 4) * 0.8;
  const st = nd.p ? bdStatus(nd.p) : null;
  const dot = st ? `<i class="bd-st" style="background:${BSTAT[st]}" title="capacité ${st}"></i>` : "";
  let body;
  if (nd.k === "perso") body = `<div class="bd-photo${imgOf(nd.ik || nd.p || nd.n) ? " has" : ""}">${av(nd.p || nd.n, true)}${imgTags(nd.ik || nd.p || nd.n, "bd-img" + (imgsOf(nd.ik || nd.p || nd.n).length > 1 ? " two" : ""))}${dot}</div><b>${esc(nd.n)}</b><small>${esc(nd.s || "")}</small>`;
  else if (nd.k === "inconnu") body = `<div class="bd-photo dark"><span class="bd-q">?</span></div><b>${esc(nd.n)}</b><small>${esc(nd.s || "")}</small>${nd.st ? `<span class="bd-stamp">${esc(nd.st)}</span>` : ""}`;
  else if (nd.k === "event") body = `<em style="color:${nd.col}">${esc(nd.lab || "")}</em><b>${esc(nd.n)}</b><small>${esc(nd.s || "")}</small>`;
  else body = `${nd.k === "objet" ? `<em>PIÈCE</em>` : nd.k === "lieu" ? `<em>LIEU</em>` : nd.k === "evo" ? `<em style="color:var(--evo)">ÉVOLUTION</em>` : nd.k === "arc" ? `<em style="color:var(--arc)">ARC</em>` : ""}<b>${esc(nd.n)}</b><small>${esc(nd.s || "")}</small>`;
  const tape = nd.k === "note" || nd.k === "event" || nd.k === "evo" || nd.k === "arc" ? `<span class="bd-tape"></span>` : `<span class="bd-pin"></span>`;
  return `<div class="bd-card k-${nd.k}${nd.focus ? " focus" : ""}" data-id="${nd.id}" style="left:${nd.x}%;top:${nd.y}%;--r:${r}deg;${nd.col ? `--kc:${nd.col}` : ""}" tabindex="0" role="button" aria-label="${esc(nd.n)}">${tape}${body}${nd.dt ? `<time>${esc(nd.dt)}</time>` : ""}</div>`;
}
function bdHTML(id, B) {
  BDS[id] = { B, sel: B.nodes.find(n => n.focus && !B.free) ? B.nodes.find(n => n.focus).id : null };
  return `<div class="bd-scroll"><div class="board" id="${id}" style="height:${B.h || 820}px${B.w ? `;width:${B.w}px` : ""}">${B.deco || ""}${B.nodes.map(bdCard).join("")}<svg class="bd-svg" aria-hidden="true"></svg><svg class="bd-svg bd-top" aria-hidden="true"></svg></div></div>
  <div class="card bd-info" id="${id}-info"></div>
  <div class="legend"><span><i style="background:var(--string)"></i>fil établi</span><span><i style="background:transparent;border:1.5px dashed #c8281e"></i>hypothèse / inconnu</span><span><i style="background:${BSTAT.perdue}"></i>capacité perdue</span><span><i style="background:${BSTAT.partielle}"></i>partielle</span><span><i style="background:${BSTAT.complète}"></i>retrouvée</span></div>`;
}
function bdDraw(id) {
  const S = BDS[id], bd = $("#" + id); if (!S || !bd || !bd.clientWidth) return;
  const svg = bd.querySelector("svg"), svgTop = bd.querySelector(".bd-top"), B = S.B, W = bd.clientWidth, H = bd.clientHeight, sel = S.sel;
  const pt = {}, boxes = [];
  bd.querySelectorAll(".bd-card").forEach(c => { const n = B.nodes.find(x => x.id === c.dataset.id); if (n) { pt[n.id] = [n.x * W / 100, n.y * H / 100 - c.offsetHeight / 2 + 7]; boxes.push([n.x * W / 100 - c.offsetWidth / 2, n.y * H / 100 - c.offsetHeight / 2, n.x * W / 100 + c.offsetWidth / 2, n.y * H / 100 + c.offsetHeight / 2]); } });
  const placed = [];
  const hit = (r, list, m) => list.some(b => r[0] < b[2] + m && r[2] > b[0] - m && r[1] < b[3] + m && r[3] > b[1] - m);
  let paths = "", labels = "", pins = "";
  B.edges.forEach(([a, b, lab, hyp]) => {
    const p = pt[a], q = pt[b]; if (!p || !q) return;
    const on = sel && (a === sel || b === sel), dim = sel && !on;
    const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, len = Math.hypot(q[0] - p[0], q[1] - p[1]);
    const cy = my + 10 + len * 0.07;
    const d = `M${p[0].toFixed(1)},${p[1].toFixed(1)} Q${mx.toFixed(1)},${cy.toFixed(1)} ${q[0].toFixed(1)},${q[1].toFixed(1)}`;
    const dash = hyp ? ' stroke-dasharray="8 6"' : "";
    paths += `<g class="bd-th${dim ? " dim" : ""}${on ? " on" : ""}"><path d="${d}" class="bd-sh" transform="translate(2,4)"${dash}/><path d="${d}" class="bd-str"${dash}/><path d="${d}" class="bd-hl"${dash}/></g>`;
    if (lab && on) {
      const w = lab.length * 6 + 14, h = 18; let best = null;
      for (const t of [.5, .42, .58, .34, .66, .26, .74, .18, .82, .12, .88]) {
        const u = 1 - t, lx = u * u * p[0] + 2 * u * t * mx + t * t * q[0], ly = u * u * p[1] + 2 * u * t * cy + t * t * q[1];
        const r = [lx - w / 2, ly - h / 2, lx + w / 2, ly + h / 2];
        const bad = (hit(r, boxes, 2) ? 2 : 0) + (hit(r, placed, 3) ? 1 : 0) + (r[0] < 0 || r[2] > W || r[1] < 0 || r[3] > H ? 3 : 0);
        if (!best || bad < best.bad) best = { bad, lx, ly, r };
        if (!bad) break;
      }
      placed.push(best.r);
      labels += `<g class="bd-lab"><rect x="${best.r[0].toFixed(1)}" y="${best.r[1].toFixed(1)}" width="${w}" height="${h}" rx="3"/><text x="${best.lx.toFixed(1)}" y="${(best.ly + 4).toFixed(1)}" text-anchor="middle">${esc(lab)}</text></g>`;
    }
  });
  svg.setAttribute("width", W); svg.setAttribute("height", H); svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.innerHTML = paths;
  svgTop.setAttribute("width", W); svgTop.setAttribute("height", H); svgTop.setAttribute("viewBox", `0 0 ${W} ${H}`); svgTop.innerHTML = labels;
  const conn = new Set(sel ? [sel] : []);
  if (sel) B.edges.forEach(([a, b]) => { if (a === sel) conn.add(b); if (b === sel) conn.add(a); });
  bd.querySelectorAll(".bd-card").forEach(c => { c.classList.toggle("sel", c.dataset.id === sel); c.classList.toggle("dim", S.hl ? !S.hl.has(c.dataset.id) : !!sel && !conn.has(c.dataset.id)); });
}
function bdInfo(id) {
  const S = BDS[id], box = $("#" + id + "-info"); if (!S || !box) return;
  const B = S.B, nd = B.nodes.find(x => x.id === S.sel);
  if (!nd) { box.innerHTML = `<span class="sub">Cliquez une carte pour suivre ses fils.</span>`; return; }
  const rel = [];
  B.edges.forEach(([a, b, lab, hyp]) => { if (a === nd.id || b === nd.id) { const o = B.nodes.find(x => x.id === (a === nd.id ? b : a)); if (o) rel.push(`<li><button class="bd-go" data-id="${o.id}">${esc(o.n)}</button> <span class="sub">${lab ? "· " + esc(lab) : ""}${hyp ? " (hypothèse)" : ""}</span></li>`); } });
  const st = nd.p ? bdStatus(nd.p) : null;
  box.innerHTML = `<h3>${esc(nd.n)}${nd.dt ? ` <span class="sub">· ${esc(nd.dt)}</span>` : ""}</h3><p style="margin:4px 0 8px">${esc(nd.d || nd.s || "")}</p>
  ${st ? `<p class="sub" style="margin:0 0 8px">Capacité : <b style="color:${BSTAT[st]}">${st}</b></p>` : ""}
  <p style="margin:0 0 8px;display:flex;gap:14px;flex-wrap:wrap">${nd.p && CH[nd.p] ? `<a href="#/perso/${slug(nd.p)}">Sa page →</a>` : ""}${nd.href ? `<a href="${nd.href}">Ouvrir ce tableau →</a>` : ""}</p>
  <ul class="bd-rel">${rel.join("")}</ul>`;
  box.querySelectorAll(".bd-go").forEach(b => b.onclick = () => { S.sel = b.dataset.id; bdDraw(id); bdInfo(id); });
}
function bdMount(id) {
  const S = BDS[id], bd = $("#" + id); if (!S || !bd) return;
  const B = S.B;
  bd.querySelectorAll(".bd-card").forEach(c => {
    c.onpointerdown = e => {
      const nd = B.nodes.find(x => x.id === c.dataset.id), r = bd.getBoundingClientRect();
      const sx = e.clientX, sy = e.clientY, ox = nd.x, oy = nd.y; let moved = false;
      try { c.setPointerCapture(e.pointerId); } catch (_) {}
      c.onpointermove = ev => {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moved && Math.hypot(dx, dy) < 5) return; moved = true; c.classList.add("drag");
        nd.x = Math.max(5, Math.min(95, ox + dx / r.width * 100)); nd.y = Math.max(6, Math.min(94, oy + dy / r.height * 100));
        c.style.left = nd.x + "%"; c.style.top = nd.y + "%"; bdDraw(id);
      };
      c.onpointerup = () => { c.onpointermove = c.onpointerup = null; c.classList.remove("drag"); if (!moved) { S.sel = S.sel === nd.id ? null : nd.id; bdDraw(id); bdInfo(id); } };
    };
    c.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); S.sel = c.dataset.id; bdDraw(id); bdInfo(id); } };
  });
  bd.onclick = e => { if (e.target === bd || e.target.tagName === "svg") { S.sel = null; bdDraw(id); bdInfo(id); } };
  bdDraw(id); bdInfo(id);
  if (!window.__bdResize) { window.__bdResize = true; addEventListener("resize", () => Object.keys(BDS).forEach(bdDraw)); }
}
// disposition en deux anneaux autour du centre
function bdLayout(center, inner, outer) {
  const out = [{ ...center, x: 50, y: 50, focus: true }];
  const ring = (arr, rx, ry, off) => arr.forEach((n, i) => { const a = -Math.PI / 2 + off + i * 2 * Math.PI / arr.length; out.push({ ...n, x: +(50 + rx * Math.cos(a)).toFixed(1), y: +(50 + ry * Math.sin(a)).toFixed(1) }); });
  ring(inner, 24, 25, Math.PI / (inner.length || 1)); ring(outer, 41, 41, 0);
  return out;
}
const personNode = (n, extra = {}) => ({ id: "p:" + n, k: "perso", p: CH[n] ? n : null, n, s: CH[n] ? "" : "", d: CH[n] ? "" : "Personnage secondaire, sans page propre.", ...extra });
function eventNode(e, extra = {}) { return { id: "e" + evId(e), k: "event", col: ccolK(e.k), lab: klab(e.k).toUpperCase(), n: e.t.replace("★ ", ""), s: e.p || "", dt: fdr(e.d, e.e), d: e.s, href: "#/evenement/" + evId(e), ...extra }; }
function ccolK(k) { return ({ combat: "#d6453d", rencontre: "#3a74d8", plot: "#8b52d6", vigilante: "#c27a00", lien: "#1f9c7a", tournant: "#b58900", ecole: "#6a6675" })[k] || "#6a6675"; }
const mystNode = (m, extra = {}) => ({ id: "m:" + m.id, k: "inconnu", n: m.short || m.t, s: "", st: m.st, d: m.sum, href: "#/mystere/" + m.id, ...extra });

function boardForEvent(e) {
  const i = evId(e), chars = (e.c || []).filter(c => c);
  const peopleAll = chars.map(c => personNode(c));
  const inner = peopleAll.slice(0, 6);
  const outer = [...peopleAll.slice(6, 10)];
  if (e.p) outer.push({ id: "pl", k: "lieu", n: e.p, s: "", d: "Lieu de l'événement." });
  const ms = mystOf(e); ms.forEach(m => outer.push(mystNode(m)));
  const sc = x => { const sh = (x.c || []).filter(c => chars.includes(c)).length; return sh * 2 + (x.p && x.p === e.p ? 1 : 0) - Math.min(3, Math.abs(+new Date(x.d) - +new Date(e.d)) / 864e5 / 20); };
  const rel = EV.filter(x => x !== e && (x.c || []).some(c => chars.includes(c))).sort((a, b) => sc(b) - sc(a)).slice(0, 4);
  if (rel.length < 3) EV.filter(x => x !== e && !rel.includes(x) && (x.p === e.p || Math.abs(+new Date(x.d) - +new Date(e.d)) < 864e5 * 9)).sort((a, b) => Math.abs(+new Date(a.d) - +new Date(e.d)) - Math.abs(+new Date(b.d) - +new Date(e.d))).slice(0, 3 - rel.length).forEach(x => rel.push(x));
  rel.forEach(x => outer.push(eventNode(x)));
  const nodes = bdLayout(eventNode(e, { href: null }), inner, outer);
  const edges = [];
  peopleAll.slice(0, 10).forEach(p => edges.push([nodes[0].id, p.id, "présent"]));
  if (e.p) edges.push([nodes[0].id, "pl", "se passe à"]);
  ms.forEach(m => { edges.push([nodes[0].id, "m:" + m.id, "alimente la piste", true]); (m.pp || []).filter(c => chars.includes(c)).slice(0, 2).forEach(c => edges.push(["m:" + m.id, "p:" + c, "impliqué"])); });
  rel.forEach(x => {
    const sh = (x.c || []).filter(c => chars.includes(c));
    edges.push([nodes[0].id, "e" + evId(x), (x.d < e.d ? "avant · " : x.d > e.d ? "après · " : "") + sh.slice(0, 2).join(", ")]);
    sh.slice(0, 2).forEach(c => { if (peopleAll.slice(0, 10).some(p => p.n === c)) edges.push(["p:" + c, "e" + evId(x), ""]); });
  });
  return { nodes, edges, h: nodes.length > 10 ? 880 : nodes.length > 6 ? 700 : 600 };
}
function boardForMyst(m) {
  const evs = evsOfMyst(m).map(e => ({ e, n: (new RegExp(m.rx, "g").exec(e.t + " " + e.s) ? 1 : 0) + (e.t.startsWith("★") ? 2 : 0) + (e.c || []).filter(c => (m.pp || []).includes(c)).length })).sort((a, b) => b.n - a.n).slice(0, 8).map(x => x.e).sort((a, b) => a.d < b.d ? -1 : 1);
  const inner = (m.pp || []).slice(0, 7).map(n => personNode(n));
  const outer = evs.map(e => eventNode(e));
  const nodes = bdLayout(mystNode(m, { href: null }), inner, outer);
  const edges = [];
  inner.forEach(p => edges.push([nodes[0].id, p.id, "impliqué"]));
  outer.forEach((o, i) => { edges.push([nodes[0].id, o.id, "indice"]); if (i) edges.push([outer[i - 1].id, o.id, "puis"]); });
  evs.forEach(e => (e.c || []).filter(c => inner.some(p => p.n === c)).slice(0, 2).forEach(c => edges.push(["p:" + c, "e" + evId(e), ""])));
  return { nodes, edges, h: nodes.length > 10 ? 900 : 720 };
}
function boardForPerso(name) {
  const c = CH[name], A = ARCS[name];
  const evs = EV.filter(e => (e.c || []).includes(name)).sort((a, b) => (b.t.startsWith("★") ? 1 : 0) - (a.t.startsWith("★") ? 1 : 0) || (b.s.length - a.s.length)).slice(0, 7).sort((a, b) => a.d < b.d ? -1 : 1);
  const partners = c.partners.filter(x => CH[x[0]] && x[0] !== name).slice(0, 4);
  const ms = MYST.filter(m => (m.pp || []).includes(name)).slice(0, 2);
  const beats = A ? A.beats.filter(b => b[1] === "evo" || b[1] === "arc").slice(0, 3) : [];
  const nodes = [{ id: "me", k: "perso", p: name, n: name, s: A ? A.title : "", d: A ? A.summary : "", x: 11, y: 50, focus: true }];
  const edges = [];
  // frise des événements, en quinconce, de gauche à droite
  const X0 = 31, X1 = 91, n = evs.length;
  const evx = i => n < 2 ? 60 : X0 + i * (X1 - X0) / (n - 1);
  evs.forEach((e, i) => { const nd = eventNode(e, { x: +evx(i).toFixed(1), y: i % 2 ? 62 : 38 }); nodes.push(nd); edges.push([i ? "e" + evId(evs[i - 1]) : "me", nd.id, i ? "puis" : "premier événement"]); });
  // évolutions / arcs : accrochés à l'événement le plus proche dans le temps
  beats.forEach((b, i) => {
    let bi = 0; evs.forEach((e, k) => { if (Math.abs(+new Date(e.d) - +new Date(b[0])) < Math.abs(+new Date(evs[bi].d) - +new Date(b[0]))) bi = k; });
    const id = "b" + i;
    nodes.push({ id, k: b[1], n: b[1] === "evo" ? "Évolution" : "Arc", s: b[2].length > 90 ? b[2].slice(0, 88) + "…" : b[2], dt: fd(b[0]), d: b[2], x: +Math.min(92, Math.max(30, evx(bi) + (i - 1) * 4)).toFixed(1), y: 13 });
    if (evs.length) edges.push([id, "e" + evId(evs[bi]), "à ce moment"]); edges.push(["me", id, b[1] === "evo" ? "évolution" : "arc"]);
  });
  // partenaires en bas, reliés aux événements qu'ils partagent
  partners.forEach(([pn, v], i) => {
    const nd = personNode(pn, { s: v + " messages échangés", x: +(46 + i * (46 / Math.max(1, partners.length - 1))).toFixed(1), y: 88 });
    if (partners.length === 1) nd.x = 60;
    nodes.push(nd);
    const sh = evs.filter(e => (e.c || []).includes(pn)).slice(0, 3);
    if (!sh.length) edges.push(["me", nd.id, "échanges en scène"]);
    sh.forEach(e => edges.push([nd.id, "e" + evId(e), "présent"]));
  });
  // mystères en bas à gauche, reliés aux événements qui les alimentent
  ms.forEach((m, i) => {
    nodes.push(mystNode(m, { x: 9 + i * 15, y: 87 })); edges.push(["me", "m:" + m.id, "mêlé à la piste", true]);
    evs.filter(e => mystOf(e).includes(m)).slice(0, 2).forEach(e => edges.push(["m:" + m.id, "e" + evId(e), "alimente", true]));
  });
  return { nodes, edges, h: 880, free: true };
}
function viewEvenement(i) {
  const e = EV[+i]; if (!e) return `<h1>Introuvable</h1>`;
  return `<p class="sub"><a href="#/chronologie">← Chronologie</a></p><h1>${esc(e.t)}</h1><p class="sub">${fdr(e.d, e.e)} · ${esc(e.p || "")} · ${klab(e.k)}</p><p class="lead" style="margin-top:10px">${esc(e.s)}</p>
  <h2>Le tableau de l'événement</h2><p class="sub" style="margin:0 0 10px">Les fils relient l'événement à ses personnages, à son lieu, aux pistes qu'il alimente et aux événements proches.</p>${bdHTML("bd-ev", boardForEvent(e))}`;
}
function viewMystere(id) {
  const m = MYST.find(x => x.id === id); if (!m) return `<h1>Introuvable</h1>`;
  return `<p class="sub"><a href="#/dossiers">← Fils rouges</a></p><h1>${esc(m.t)}</h1><p class="sub">Statut : <b>${esc(m.st)}</b></p><p class="lead" style="margin-top:10px">${esc(m.sum)}</p>
  <h2>Le tableau de la piste</h2>${bdHTML("bd-my", boardForMyst(m))}`;
}
// ---------- le grand tableau de tous les événements ----------
function boardTout() {
  // échelle « à colonnes » : une colonne par date, élargie quand le calendrier saute des jours ; les événements d'un même jour s'empilent
  const ROW = 172, TOP = 70;
  const dates = [...new Set(EV.map(e => e.d))].sort();
  const X = {}; let cx = 110;
  dates.forEach((d, i) => { if (i) cx += 150 + Math.min(10, Math.max(0, Math.round((+new Date(d) - +new Date(dates[i - 1])) / 864e5) - 1)) * 14; X[d] = cx; });
  const W = cx + 150;
  const tx = d => { const dd = dates.find(x => x >= d); return dd ? X[dd] - 78 : cx + 78; };
  const cnt = {}, pos = {};
  [...EV].sort((a, b) => a.d < b.d ? -1 : 1).forEach(e => { const r = cnt[e.d] = (cnt[e.d] || 0) + 1; pos[evId(e)] = { r: r - 1, x: X[e.d] }; });
  const nr = Math.max(...Object.values(cnt)), H = TOP + nr * ROW + 60;
  const nodes = EV.map(e => { const p = pos[evId(e)]; return eventNode(e, { x: +(p.x / W * 100).toFixed(3), y: +((TOP + p.r * ROW + ROW / 2 + (dates.indexOf(e.d) % 2 ? 24 : 0)) / H * 100).toFixed(3) }); });
  let deco = "";
  [["2026-08-12", "Août"], ["2026-09-01", "Septembre"], ["2026-10-01", "Octobre"], ["2026-11-01", "Novembre"]].forEach(([d, l]) => { deco += `<div class="bd-month" style="left:${tx(d)}px"><span>${l}</span></div>`; });
  ACTS.forEach(a => { deco += `<div class="bd-actlab" style="left:${tx(a.from)}px;width:${tx(a.to) - tx(a.from)}px;border-color:${a.color}"><b style="color:${a.color}">${esc(a.name)}</b></div>`; });
  const B = { nodes, edges: [], h: H, w: W, deco, free: true };
  B.mystEdges = id => {
    const out = [];
    MYST.filter(m => !id || m.id === id).forEach(m => { const l = EV.filter(e => mystOf(e).includes(m)).sort((a, b) => a.d < b.d ? -1 : 1); l.forEach((e, i) => { if (i) out.push(["e" + evId(l[i - 1]), "e" + evId(e), m.short || m.t]); }); });
    return out;
  };
  B.persEdges = n => { const l = EV.filter(e => (e.c || []).includes(n)).sort((a, b) => a.d < b.d ? -1 : 1); return l.slice(1).map((e, i) => ["e" + evId(l[i]), "e" + evId(e), n]); };
  return B;
}
function viewTableau() {
  const ppl = {}; EV.forEach(e => (e.c || []).forEach(c => ppl[c] = (ppl[c] || 0) + 1));
  const names = Object.entries(ppl).filter(([n, v]) => v >= 3).sort((a, b) => b[1] - a[1]).map(x => x[0]);
  return `<h1>Le tableau des événements</h1><p class="lead">Les ${EV.length} événements, du 12 août au 6 novembre, épinglés par date et classés par type. Les fils relient, dans l'ordre, les événements de chaque mystère ; choisissez un mystère ou un personnage pour ne suivre que son fil. Faites glisser la souris ou la barre de défilement pour parcourir le tableau.</p>
  <div class="legend" style="margin:0 0 10px">${[...new Set(EV.map(e => e.k))].map(k => `<span><i style="background:${ccolK(k)}"></i>${esc(klab(k))}</span>`).join("")}</div>
  <div class="filters"><label>Suivre le fil de&nbsp;<select id="tfil"><option value="">Tous les mystères</option>${MYST.map(m => `<option value="m:${m.id}">Mystère · ${esc(m.t)}</option>`).join("")}<optgroup label="Personnages">${names.map(n => `<option value="p:${esc(n)}">${esc(n)} (${ppl[n]})</option>`).join("")}</optgroup></select></label></div>
  <div id="tboard">${bdHTML("bd-tout", boardTout())}</div>`;
}
function afterTableau() {
  const S = BDS["bd-tout"]; if (!S) return;
  S.B.edges = S.B.mystEdges();
  const sel = $("#tfil");
  if (sel) sel.onchange = () => {
    const v = sel.value; S.sel = null; S.hl = null;
    if (!v) S.B.edges = S.B.mystEdges();
    else if (v.startsWith("m:")) { S.B.edges = S.B.mystEdges(v.slice(2)); S.hl = new Set(S.B.edges.flatMap(e => [e[0], e[1]])); }
    else { S.B.edges = S.B.persEdges(v.slice(2)); S.hl = new Set(S.B.edges.flatMap(e => [e[0], e[1]])); }
    bdDraw("bd-tout"); bdInfo("bd-tout");
    const first = S.hl && [...S.hl][0], c = first && $("#bd-tout").querySelector(`[data-id="${first}"]`); if (c && c.scrollIntoView) c.scrollIntoView({ inline: "center", block: "nearest" });
  };
  bdMount("bd-tout");
}

let BDI = 0;
function afterDossiers() {
  const tabs = $("#bdtabs"); if (!tabs) return;
  tabs.querySelectorAll("button").forEach(b => b.onclick = () => { BDI = +b.dataset.i; $("#bdwrap").innerHTML = bdHTML("bd-" + CU.BOARDS[BDI].id, CU.BOARDS[BDI]); tabs.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); bdMount("bd-" + CU.BOARDS[BDI].id); });
  bdMount("bd-" + CU.BOARDS[BDI].id);
}

function viewDossiers() {
  const stc = { perdue: "var(--combat)", partielle: "var(--vigilante)", complète: "var(--lien)", inconnue: "var(--muted)" };
  const TR = CU.TRACKER, TH = CU.THREADS;
  const cnt = k => TR.filter(t => t.st === k).length;
  return `<h1>Fils rouges</h1><p class="lead">Trois pistes parcourent tout le RP : les amplificateurs d'Ember, l'attaque de Spectre avec ses injections, et le masque partagé d'Arlequin. Le tableau d'enquête relie les protagonistes ; en dessous, la trace de chaque piste date par date, puis l'état de chaque victime.</p>
  <h2>Les mystères</h2><div class="grid g3">${MYST.map(m => `<a class="card myst" href="#/mystere/${m.id}"><span class="chip">${esc(m.st)}</span><h3 style="margin:8px 0 4px">${esc(m.t)}</h3><p class="sub" style="margin:0">${esc(m.sum.length > 140 ? m.sum.slice(0, 138) + "…" : m.sum)}</p><b style="display:block;margin-top:8px;color:var(--accent);font-size:14px">Ouvrir le tableau →</b></a>`).join("")}</div>
  <h2>Les grandes affaires</h2><div class="sel" id="bdtabs">${CU.BOARDS.map((b, i) => `<button data-i="${i}" class="${i === BDI ? "on" : ""}">${esc(b.t)}</button>`).join("")}</div><p class="sub" style="margin:0 0 10px">${esc(CU.BOARDS[BDI].intro)}</p>
  <div id="bdwrap">${bdHTML("bd-" + CU.BOARDS[BDI].id, CU.BOARDS[BDI])}</div><h2>Les pistes, date par date</h2>
  ${TH.map(t => `<section class="act" style="--c:${t.c}"><h2>${esc(t.t)}</h2><p>${esc(t.intro)}</p></section><div class="tl">${t.steps.map(([d, x]) => `<article class="ev" style="--c:${t.c}"><time>${fd(d)}</time><p style="margin:2px 0 0">${esc(x)}</p></article>`).join("")}</div>`).join("")}
  <h2>Suivi des capacités après l'attaque</h2>
  <div class="grid g4" style="margin-bottom:14px">${["perdue", "partielle", "complète", "inconnue"].map(k => `<div class="card stat"><b style="color:${stc[k]}">${cnt(k)}</b><span>capacité ${k}</span></div>`).join("")}</div>
  <div class="card scroll"><table><thead><tr><th>Personnage</th><th>Effet subi</th><th>Statut</th><th>Récupération documentée</th></tr></thead><tbody>${TR.map(t => `<tr><td>${CH[t.n.trim()] ? `<a href="#/perso/${slug(t.n.trim())}">${esc(t.n)}</a>` : esc(t.n)}</td><td>${esc(t.eff)}</td><td><span class="chip" style="color:${stc[t.st]}"><i></i>${esc(t.st)}</span></td><td>${esc(t.rec)}</td></tr>`).join("")}</tbody></table></div>
  <p class="sub" style="margin-top:10px">« Inconnue » signifie que les logs ne disent pas ce qui s'est passé ensuite, pas que la capacité n'est pas revenue.</p>`;
}

// ---------- router ----------
function route() {
  const raw = location.hash.slice(1) || "/"; const [path, qs] = raw.split("?"); const q = new URLSearchParams(qs || "");
  const seg = path.split("/").filter(Boolean);
  let html, key = "home", after;
  if (!seg.length) html = viewHome();
  else if (seg[0] === "chronologie") { key = "chrono"; html = viewChrono(q); }
  else if (seg[0] === "personnages") { key = "persos"; html = viewPersos(q); }
  else if (seg[0] === "perso") { key = "persos"; const n = decodeURIComponent(seg[1] || ""); html = viewPerso(n); after = () => afterPerso(n); }
  else if (seg[0] === "evolutions") { key = "evo"; html = viewEvo(); }
  else if (seg[0] === "tableau") { key = "tab"; html = viewTableau(); after = afterTableau; }
  else if (seg[0] === "evenement") { key = "chrono"; html = viewEvenement(seg[1]); after = () => bdMount("bd-ev"); }
  else if (seg[0] === "mystere") { key = "dos"; html = viewMystere(seg[1]); after = () => bdMount("bd-my"); }
  else if (seg[0] === "dossiers") { key = "dos"; { if (q.has("b") && +q.get("b") >= 0 && +q.get("b") < CU.BOARDS.length) BDI = +q.get("b"); html = viewDossiers(); after = afterDossiers; } }
  else if (seg[0] === "lieux") { key = "lieux"; html = viewLieux(q); }
  else html = viewHome();
  $("#app").innerHTML = html;
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("on", a.dataset.r === key));
  if (after) after();
  window.scrollTo(0, 0);
}
addEventListener("hashchange", route);
route();
})();
