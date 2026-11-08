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
const av = (n, lg) => `<span class="av${lg ? " lg" : ""}" style="background:${ccol(n)}" aria-hidden="true">${esc(initial(n))}</span>`;
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

function radar(vals, color) {
  const labels = ["Power", "Defense", "Recovery", "Trick", "Speed"], R = 90, cx = 130, cy = 120;
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
    <div class="meta"><span class="chip k-${e.k}"><i></i>${klab(e.k)}</span>${showChars ? (e.c || []).map(clink).join("") : ""}</div></article>`;
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
   ${rows.length ? `<div class="card"><h3>Statistiques par palier</h3>${rows.length > 1 && rows.some(r => r[1].some((v, i) => v !== rows[0][1][i])) ? palierChart(rows) : ""}<div class="sel" id="rsel">${rows.map((r, i) => `<button data-i="${i}" class="${i === rows.length - 1 ? "on" : ""}">${r[0].toFixed(1)}</button>`).join("")}</div><div id="rad">${radar(rows[rows.length - 1][1], ccol(name))}</div></div>` : `<div class="card"><h3>Partenaires de scène</h3>${bars(c.partners.slice(0, 8), { href: n => CH[n] ? "#/perso/" + slug(n) : "" })}</div>`}
  </div>
  <h2>Activité & moments clés</h2>
  <div class="card">${activityChart({ series: full, markers, acts: true, h: 230, color: ccol(name) })}
  <div class="legend"><span><i style="background:var(--tournant)"></i>Tournant</span><span><i style="background:var(--fight)"></i>Combat</span><span><i style="background:var(--bond)"></i>Lien / rencontre</span><span><i style="background:var(--plot)"></i>Arc / intrigue</span><span><i style="background:var(--evo)"></i>Évolution</span></div></div>
  ${lv.length > 1 ? `<h2>Niveau dans le temps</h2><div class="card">${lvChart}<p class="sub">Niveaux relevés dans les pseudos Discord du personnage (les libellés « 1.0 », qui désignent le compte joueur, sont ignorés).</p></div>` : ""}
  <h2>Parcours</h2>
  <div class="card">${journey.length ? journey.map(j => `<div class="beat"><time>${fdr(j.d, j.e)}</time><div><span class="tag k-${j.k}">${j.src === "ev" ? "Événement · " : ""}${klab(j.k)}</span><br>${j.src === "ev" ? `<b>${esc(j.t)}</b> — ${esc(j.s)}` : esc(j.t)}</div></div>`).join("") : "<p class='sub'>Aucun événement documenté pour l'instant.</p>"}</div>
  <div class="grid g2" style="margin-top:14px">
   <div class="card"><h3>Lieux les plus fréquentés</h3>${bars(c.places.slice(0, 8))}</div>
   <div class="card"><h3>Partenaires de scène</h3>${bars(c.partners.slice(0, 8), { href: n => CH[n] ? "#/perso/" + slug(n) : "", color: "var(--lien)" })}</div></div>
  <h2>Toutes les scènes (${sc.length})</h2>
  <div class="card scroll"><details><summary>Afficher la liste complète</summary><table><thead><tr><th>Date</th><th>Lieu</th><th>Ville</th><th>Msgs</th><th>Avec</th></tr></thead><tbody>${sc.map(s => `<tr><td>${fd(s[0])}</td><td>${esc(s[1])}</td><td>${esc(s[2])}</td><td>${s[3]}</td><td>${s[4].map(n => esc(n)).join(", ")}</td></tr>`).join("")}</tbody></table></details></div>`;
}
function afterPerso(name) {
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


function viewDossiers() {
  const stc = { perdue: "var(--combat)", partielle: "var(--vigilante)", complète: "var(--lien)", inconnue: "var(--muted)" };
  const TR = CU.TRACKER, TH = CU.THREADS;
  const cnt = k => TR.filter(t => t.st === k).length;
  return `<h1>Fils rouges</h1><p class="lead">Deux histoires parcourent tout le RP : les amplificateurs d'Ember et l'attaque de Spectre avec ses injections. Voici leur trace, date par date, puis l'état de chaque victime.</p>
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
  else if (seg[0] === "dossiers") { key = "dos"; html = viewDossiers(); }
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
