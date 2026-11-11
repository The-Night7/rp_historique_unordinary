/* Chargeur des données du site.
 * Les données se modifient dans data/*.json et data/personnages/*.json (voir EDITER.md).
 * Ce fichier les lit, les remet dans le format attendu par app.js, puis lance app.js.
 * Il sert aussi aux outils (tools/) : assemble() / disassemble() sont purs et testables sous Node.
 */
(function (root) {
  "use strict";
  const STAT = ["Power", "Defense", "Recovery", "Trick", "Speed"];
  // noms de champs : ancien (interne) -> lisible (fichiers json)
  const M = {
    ev: { d: "date", e: "fin", t: "titre", k: "type", p: "lieu", c: "personnages", s: "texte" },
    act: { id: "id", name: "nom", from: "debut", to: "fin", color: "couleur", text: "resume" },
    myst: { id: "id", short: "court", t: "titre", st: "statut", rx: "regex", pp: "personnes", sum: "resume" },
    node: { id: "id", k: "type", n: "nom", s: "sous_titre", dt: "date", x: "x", y: "y", d: "detail", p: "perso", ik: "image_de" },
    fiche: { ecole: "ecole", taille: "taille", type: "type", ability: "capacite", nature: "nature", note: "note" }
  };
  const inv = m => Object.fromEntries(Object.entries(m).map(([a, b]) => [b, a]));
  const ren = (o, m) => { const r = {}; for (const k of Object.keys(o)) r[m[k] || k] = o[k]; return r; };

  function assemble(D) {
    const C = { ACTS: [], EVENTS: [], ARCS: {}, FICHES: {}, FICHE_RP: {}, FICHE_CHRONO: {}, TRACKER: [], DEBLOCAGE: {}, THREADS: [], MYSTERIES: [], BOARDS: [], IMAGES: {} };
    C.ACTS = D.actes.map(a => ren(a, inv(M.act)));
    C.EVENTS = D.evenements.map(e => ren(e, inv(M.ev))).sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : (a.e || a.d) < (b.e || b.d) ? -1 : 1);
    C.MYSTERIES = D.mysteres.map(m => ren(m, inv(M.myst)));
    C.THREADS = D.fils.map(t => ({ id: t.id, t: t.titre, c: t.couleur, intro: t.intro, steps: t.etapes.map(s => [s.date, s.texte]) }));
    C.BOARDS = D.tableaux.map(b => ({ id: b.id, t: b.titre, intro: b.intro, nodes: b.cartes.map(n => ren(n, inv(M.node))), edges: b.fils.map(f => f.hypothese ? [f.de, f.vers, f.texte, "?"] : [f.de, f.vers, f.texte]) }));
    for (const P of D.personnages) {
      const n = P.nom;
      if (P.image) C.IMAGES[n] = P.image;
      if (P.images_supplementaires) Object.assign(C.IMAGES, P.images_supplementaires);
      if (P.fiche_unodex) {
        const f = P.fiche_unodex, o = ren(f, inv(M.fiche)); delete o.stats_par_niveau;
        o.rows = (f.stats_par_niveau || []).map(r => [r.niveau, STAT.map(s => r[s])]);
        C.FICHES[n] = o;
      }
      if (P.parcours) C.ARCS[n] = { title: P.parcours.titre, tag: P.parcours.tag, summary: P.parcours.resume, beats: (P.parcours.reperes || []).map(b => [b.date, b.type, b.texte]) };
      if (P.fiche_rp) C.FICHE_RP[n] = { src: P.fiche_rp.source, blocs: P.fiche_rp.blocs.map(b => [b.titre, b.texte]) };
      if (P.chronologie_fiche) C.FICHE_CHRONO[n] = P.chronologie_fiche.map(c => [c.titre, c.quand, c.texte]);
      if (P.apres_attaque) C.TRACKER.push({ n, eff: P.apres_attaque.effet, st: P.apres_attaque.statut, rec: P.apres_attaque.recuperation });
      if (P.recuperation_capacite) C.DEBLOCAGE[n] = P.recuperation_capacite.map(r => [r.date, r.min, r.max, r.texte]);
    }
    const ord = { perdue: 0, partielle: 1, "complète": 2, inconnue: 3 };
    C.TRACKER.sort((a, b) => (ord[a.st] - ord[b.st]) || a.n.localeCompare(b.n));
    return { STATS: D.stats, CURATED: C };
  }

  function disassemble(S, C) {
    const D = { stats: S, personnages: [] };
    D.actes = C.ACTS.map(a => ren(a, M.act));
    D.evenements = C.EVENTS.map(e => ren(e, M.ev));
    D.mysteres = C.MYSTERIES.map(m => ren(m, M.myst));
    D.fils = C.THREADS.map(t => ({ id: t.id, titre: t.t, couleur: t.c, intro: t.intro, etapes: t.steps.map(([date, texte]) => ({ date, texte })) }));
    D.tableaux = C.BOARDS.map(b => ({ id: b.id, titre: b.t, intro: b.intro, cartes: b.nodes.map(n => ren(n, M.node)), fils: b.edges.map(([de, vers, texte, h]) => { const o = { de, vers, texte }; if (h) o.hypothese = true; return o; }) }));
    const names = new Set([...Object.keys(C.FICHES), ...Object.keys(C.ARCS), ...Object.keys(C.FICHE_RP), ...Object.keys(C.FICHE_CHRONO || {}), ...C.TRACKER.map(t => t.n.trim()), ...Object.keys(C.DEBLOCAGE || {}), ...Object.keys(C.IMAGES).filter(k => !/\(/.test(k))]);
    for (const n of [...names].sort()) {
      const o = { nom: n };
      if (C.IMAGES[n]) o.image = C.IMAGES[n];
      const extra = Object.fromEntries(Object.entries(C.IMAGES).filter(([k]) => k.startsWith(n + " (")));
      if (Object.keys(extra).length) o.images_supplementaires = extra;
      if (C.FICHES[n]) { const { rows, ...f } = C.FICHES[n]; o.fiche_unodex = { ...ren(f, M.fiche), stats_par_niveau: rows.map(([niveau, v]) => { const r = { niveau }; STAT.forEach((s, i) => r[s] = v[i]); return r; }) }; }
      if (C.ARCS[n]) { const a = C.ARCS[n]; o.parcours = { titre: a.title, tag: a.tag, resume: a.summary, reperes: (a.beats || []).map(([date, type, texte]) => ({ date, type, texte })) }; }
      if (C.FICHE_RP[n]) o.fiche_rp = { source: C.FICHE_RP[n].src, blocs: C.FICHE_RP[n].blocs.map(([titre, texte]) => ({ titre, texte })) };
      if ((C.FICHE_CHRONO || {})[n]) o.chronologie_fiche = C.FICHE_CHRONO[n].map(([titre, quand, texte]) => ({ titre, quand, texte }));
      const t = C.TRACKER.find(x => x.n.trim() === n); if (t) o.apres_attaque = { effet: t.eff, statut: t.st, recuperation: t.rec };
      if ((C.DEBLOCAGE || {})[n]) o.recuperation_capacite = C.DEBLOCAGE[n].map(([date, min, max, texte]) => ({ date, min, max, texte }));
      D.personnages.push(o);
    }
    return D;
  }

  async function load(base) {
    base = base || "data/";
    const get = async f => { const r = await fetch(base + f); if (!r.ok) throw new Error(base + f + " : " + r.status + " " + r.statusText); try { return await r.json(); } catch (e) { throw new Error(base + f + " : JSON invalide (" + e.message + ")"); } };
    const D = {};
    for (const [k, f] of [["stats", "stats.json"], ["actes", "actes.json"], ["evenements", "evenements.json"], ["mysteres", "mysteres.json"], ["fils", "fils.json"], ["tableaux", "tableaux.json"]]) D[k] = await get(f);
    const list = await get("personnages.json");
    D.personnages = await Promise.all(list.map(s => get("personnages/" + s + ".json")));
    return assemble(D);
  }

  root.RPData = { assemble, disassemble, load };
  if (typeof document !== "undefined" && root.window === root) {
    const fail = e => { document.getElementById("app").innerHTML = '<h1>Erreur de données</h1><p class="lead">' + String(e.message || e).replace(/</g, "&lt;") + '</p><p class="sub">Vérifiez le fichier indiqué (virgule ou guillemet manquant ?). Lancez <code>node tools/valider.js</code> pour trouver l\'erreur.</p>'; };
    load().then(({ STATS, CURATED }) => { root.STATS = STATS; root.CURATED = CURATED; const s = document.createElement("script"); s.src = "app.js"; s.onerror = () => fail("app.js introuvable"); document.body.appendChild(s); }).catch(fail);
  }
})(typeof window !== "undefined" ? window : globalThis);
