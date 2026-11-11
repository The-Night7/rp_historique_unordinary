#!/usr/bin/env node
// Vérifie les fichiers de données et régénère la liste des personnages.
//   node tools/valider.js
// Sort avec un code d'erreur s'il y a un problème bloquant (utilisé aussi par le déploiement).
const fs = require("fs"), path = require("path");
const { root, dataDir, readJson } = require("./lib");
const errors = [], warns = [];
const err = m => errors.push(m), warn = m => warns.push(m);
const rel = f => path.relative(root, f);
const isDate = d => /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d));
const TYPES = ["combat", "rencontre", "plot", "vigilante", "lien", "tournant", "ecole"];
const BEAT = ["arc", "evo", "fight", "bond", "plot"];

function read(f) { try { return readJson(f); } catch (e) { err(e.message); return null; } }

// 1. fichiers de base
const stats = read("stats.json"), actes = read("actes.json"), evs = read("evenements.json"), myst = read("mysteres.json"), fils = read("fils.json"), tab = read("tableaux.json");
const pdir = path.join(dataDir, "personnages");
const files = fs.readdirSync(pdir).filter(f => f.endsWith(".json")).sort();
const persos = {};
for (const f of files) { const p = read("personnages/" + f); if (!p) continue; if (!p.nom) err(`personnages/${f} : champ "nom" manquant`); else persos[p.nom] = { f, p }; }

// 2. liste des personnages (index lu par le site)
fs.writeFileSync(path.join(dataDir, "personnages.json"), JSON.stringify(files.map(f => f.replace(/\.json$/, "")), null, 2) + "\n");

const known = new Set([...Object.keys(persos), ...Object.keys((stats && stats.chars) || {})]);

// 3. événements
if (Array.isArray(evs)) evs.forEach((e, i) => {
  const w = `evenements.json, événement n°${i + 1} (« ${e.titre || "?"} »)`;
  if (!e.titre) err(w + " : titre manquant");
  if (!isDate(e.date)) err(w + ` : date invalide (${e.date}), format AAAA-MM-JJ`);
  if (e.fin && !isDate(e.fin)) err(w + ` : fin invalide (${e.fin})`);
  if (e.fin && e.fin < e.date) err(w + " : la fin est avant le début");
  if (!TYPES.includes(e.type)) err(w + ` : type "${e.type}" inconnu (${TYPES.join(", ")})`);
  if (!e.texte) warn(w + " : pas de texte");
  (e.personnages || []).forEach(c => { if (!known.has(c)) warn(w + ` : personnage "${c}" inconnu (pas de page ni de fichier)`); });
});

// 4. fiches personnages
for (const [nom, { f, p }] of Object.entries(persos)) {
  const w = `personnages/${f}`;
  if (p.parcours) (p.parcours.reperes || []).forEach((b, i) => { if (!isDate(b.date)) err(`${w} : repère n°${i + 1}, date invalide (${b.date})`); if (!BEAT.includes(b.type)) err(`${w} : repère n°${i + 1}, type "${b.type}" inconnu (${BEAT.join(", ")})`); });
  if (p.fiche_unodex) (p.fiche_unodex.stats_par_niveau || []).forEach((r, i) => { for (const s of ["niveau", "Power", "Defense", "Recovery", "Trick", "Speed"]) if (typeof r[s] !== "number") err(`${w} : stats_par_niveau n°${i + 1}, "${s}" doit être un nombre`); });
  if (p.apres_attaque && !["perdue", "partielle", "complète", "inconnue"].includes(p.apres_attaque.statut)) err(`${w} : apres_attaque.statut doit être perdue, partielle, complète ou inconnue`);
  if (!(stats && stats.chars[nom])) warn(`${w} : "${nom}" n'a pas de messages dans les logs (pas de page personnage, sa fiche n'est utilisée que dans les tableaux)`);
}

// 5. mystères
if (Array.isArray(myst)) myst.forEach(m => { try { new RegExp(m.regex); } catch (e) { err(`mysteres.json, « ${m.titre} » : regex invalide (${e.message})`); } (m.personnes || []).forEach(c => { if (!known.has(c)) warn(`mysteres.json, « ${m.titre} » : personne "${c}" inconnue`); }); });

// 6. tableaux d'enquête
if (Array.isArray(tab)) tab.forEach(b => {
  const ids = new Set((b.cartes || []).map(n => n.id));
  (b.cartes || []).forEach(n => { if (typeof n.x !== "number" || typeof n.y !== "number") err(`tableaux.json, tableau « ${b.titre} », carte "${n.id}" : x et y doivent être des nombres (0-100)`); });
  (b.fils || []).forEach(f => { for (const k of ["de", "vers"]) if (!ids.has(f[k])) err(`tableaux.json, tableau « ${b.titre} » : fil ${f.de} → ${f.vers} : la carte "${f[k]}" n'existe pas`); });
});

console.log(`${files.length} personnages, ${evs ? evs.length : 0} événements, ${tab ? tab.length : 0} tableaux.`);
warns.forEach(m => console.log("  attention : " + m));
if (errors.length) { console.error("\n" + errors.length + " erreur(s) :"); errors.forEach(m => console.error("  ✗ " + m)); process.exit(1); }
console.log("OK : aucune erreur" + (warns.length ? ` (${warns.length} avertissement(s))` : "") + ".");
