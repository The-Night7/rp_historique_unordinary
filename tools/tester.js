#!/usr/bin/env node
// Affiche (sans navigateur) toutes les pages du site et signale celles qui plantent.
//   node tools/tester.js
const fs = require("fs"), path = require("path");
const { root, loadAll } = require("./lib");
const { STATS, CURATED } = loadAll();
global.window = global;
const noop = () => {};
let maxLen = 0;
const el = { classList: { toggle: noop, add: noop, remove: noop }, addEventListener: noop, querySelectorAll: () => [], querySelector: () => el, style: {}, hidden: true, getAttribute: noop, setAttribute: noop, closest: () => null, textContent: "", clientWidth: 0, offsetHeight: 0 };
Object.defineProperty(el, "innerHTML", { set(v) { this._v = v; if (v.length > maxLen) maxLen = v.length; }, get() { return this._v || ""; } });
global.document = { querySelector: () => el, querySelectorAll: () => [], addEventListener: noop };
global.location = { hash: "" }; global.addEventListener = noop; global.scrollTo = noop; global.innerWidth = 1200; global.innerHeight = 800; global.setTimeout = () => 0;
global.STATS = STATS; global.CURATED = CURATED;
const code = fs.readFileSync(path.join(root, "site", "app.js"), "utf8");
const routes = ["", "chronologie", "tableau", "personnages", "dossiers", "dossiers?b=0", "dossiers?b=1", "dossiers?b=2", "evolutions", "lieux",
  ...CURATED.EVENTS.map((_, i) => "evenement/" + i), ...CURATED.MYSTERIES.map(m => "mystere/" + m.id), ...Object.keys(STATS.chars).map(n => "perso/" + encodeURIComponent(n))];
let bad = 0;
for (const r of routes) {
  location.hash = "#/" + r; maxLen = 0;
  try { (0, eval)(code); if (maxLen < 300 || /Introuvable/.test(el.innerHTML)) { console.log("  page vide ou introuvable :", r); bad++; } }
  catch (e) { console.log("  ✗ " + r + " : " + e.message); bad++; }
}
console.log(routes.length + " pages testées, " + bad + " en erreur.");
process.exit(bad ? 1 : 0);
