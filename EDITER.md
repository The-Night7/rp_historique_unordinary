# Comment modifier le site

Tout le contenu est dans **`site/data/`**, en fichiers JSON lisibles. Il n'y a plus de code à toucher pour changer un texte, un événement, une image ou une fiche.

## Où est quoi

| Je veux changer… | Fichier |
|---|---|
| Un personnage (fiche, stats, image, parcours, fiche RP, état après l'attaque…) | `site/data/personnages/<nom>.json` |
| Un événement de la chronologie | `site/data/evenements.json` |
| Les 4 actes (titres, dates, couleurs) | `site/data/actes.json` |
| Les mystères (« Qui est l'homme aux cheveux bleus ? »…) | `site/data/mysteres.json` |
| Les frises « Fils rouges » (Ember, atténuateur) | `site/data/fils.json` |
| Les tableaux d'enquête d'Ember / Spectre / Arlequin | `site/data/tableaux.json` |
| Les statistiques tirées des logs Discord | `site/data/stats.json` (généré, **ne pas modifier à la main**) |

Tout le reste (`site/app.js`, `site/style.css`, `site/loader.js`) est le code : inutile d'y toucher pour changer du contenu.

## Un personnage = un fichier

`site/data/personnages/beta.json`. Toutes les parties sont facultatives :

```json
{
  "nom": "Beta",
  "image": "https://…/photo.webp",
  "fiche_unodex": {
    "ecole": "Westview (Soigneur)", "taille": "162 cm (F)", "type": "Status",
    "capacite": "Sanity Control", "nature": "Soutien", "note": "…",
    "stats_par_niveau": [
      {"niveau": 3.1, "Power": 3, "Defense": 3, "Recovery": 3, "Trick": 3, "Speed": 4}
    ]
  },
  "parcours": {
    "titre": "La soigneuse qui s'épuise", "tag": "Westview · Soigneur", "resume": "…",
    "reperes": [{"date": "2026-08-25", "type": "fight", "texte": "Tient tête à Power."}]
  },
  "fiche_rp": {"source": "https://…", "blocs": [{"titre": "Caractère", "texte": "…"}]},
  "chronologie_fiche": [{"titre": "…", "quand": "20 octobre", "texte": "…"}],
  "apres_attaque": {"effet": "…", "statut": "perdue | partielle | complète | inconnue", "recuperation": "…"},
  "recuperation_capacite": [{"date": "2026-10-22", "min": 25, "max": 25, "texte": "Orrin rend un quart"}]
}
```

Types de `reperes` : `arc`, `evo` (évolution), `fight`, `bond`, `plot`.

**Nouveau personnage** : créez `site/data/personnages/<nom>.json` avec au moins `"nom"`, puis lancez `node tools/valider.js` (il ajoute le fichier à la liste que lit le site). Sa page n'existe que s'il a des messages dans `stats.json`.

## Un événement

Dans `site/data/evenements.json`, ajoutez un bloc (l'ordre n'a pas d'importance, le site trie par date) :

```json
{
  "date": "2026-11-09", "fin": "2026-11-10",
  "titre": "Titre court",
  "type": "combat",
  "lieu": "Parc de Westview",
  "personnages": ["Beta", "Isaure"],
  "texte": "Ce qui s'est passé."
}
```

`fin` est facultatif. Types : `combat`, `rencontre`, `plot` (intrigue), `vigilante` (justiciers), `lien`, `tournant`, `ecole`. Un titre qui commence par `★` est un grand tournant. Les noms dans `personnages` doivent être écrits exactement comme le nom du personnage.

## Travailler

1. **Prévisualiser** : ouvrez `site/index.html` avec Live Server (`http://127.0.0.1:5500/site/index.html`). Un double-clic sur le fichier ne marche pas, le site charge ses données en JSON.
2. **Vérifier** : `node tools/valider.js` trouve les erreurs de syntaxe et de cohérence et dit quel fichier et quelle ligne corriger. Une erreur de virgule ou de guillemet affiche aussi un message clair sur la page.
3. **Tester les pages** (facultatif) : `node tools/tester.js` affiche toutes les pages et signale celles qui plantent.
4. **Fichiers lisibles par personnage** (facultatif) : `node tools/export_md.js` régénère `personnages/*.md` (lecture seule).
5. **Publier** :
   ```
   git add -A
   git commit -m "ce que vous avez changé"
   git push origin main
   ```
   Le push lance la validation puis le déploiement : le site est à jour en une minute environ. Si la validation échoue, rien n'est publié et l'onglet **Actions** de GitHub donne l'erreur.

## À savoir

- Un guillemet `"` dans un texte s'écrit `\"`, un retour à la ligne `\n`. Les guillemets français « » s'écrivent normalement.
- Les images sont des liens. Si un lien casse, l'initiale du personnage s'affiche à la place.
- Arlequin est un cas à part : `site/data/personnages/arlequin.json` a deux images supplémentaires (`images_supplementaires`) pour Telemachus et Isaure, et la séparation des deux porteurs par date est faite dans `site/app.js`.
