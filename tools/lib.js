// Lit site/data/*.json et reconstruit les structures attendues par le site (via site/loader.js).
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const dataDir = path.join(root, "site", "data");
function loaderApi() {
  const g = { window: {} };
  new Function("window", "document", "globalThis", fs.readFileSync(path.join(root, "site", "loader.js"), "utf8").replace('(typeof window !== "undefined" ? window : globalThis)', "(window)"))(g.window, undefined, undefined);
  return g.window.RPData;
}
function readJson(rel) {
  const f = path.join(dataDir, rel);
  try { return JSON.parse(fs.readFileSync(f, "utf8")); }
  catch (e) { throw new Error(path.relative(root, f) + " : " + e.message); }
}
function loadAll() {
  const D = { stats: readJson("stats.json"), actes: readJson("actes.json"), evenements: readJson("evenements.json"), mysteres: readJson("mysteres.json"), fils: readJson("fils.json"), tableaux: readJson("tableaux.json") };
  D.personnages = fs.readdirSync(path.join(dataDir, "personnages")).filter(f => f.endsWith(".json")).sort().map(f => readJson("personnages/" + f));
  return { D, ...loaderApi().assemble(D) };
}
module.exports = { root, dataDir, readJson, loadAll, loaderApi };
