// Fils rouges et suivi des capacités après l'attaque du 20-21 octobre
window.CURATED.THREADS = [
 {id:"ember", t:"Ember, les amplificateurs et les « boostés »", c:"#d6453d", intro:"Les amplificateurs sont des fioles (environ 250 $ pièce, environ 40 minutes d'effet, tremblements) qui poussent un niveau vers le haut ; les embeds du bot comptent les adversaires « boostés » (×1,10 à ×5,50) puis « amplifiés » avec un bonus « EMBER ». Ember est une organisation qui les teste, les vend et exécute ses clients ; elle est distincte de Spectre, qui mène l'attaque de Westview.",
  steps:[
  ["2026-08-24","Observation d'Hizo : la faux de Mitsu semble porter une « drogue » qui a désorienté Rein ; il se demande si elle s'attaque à la capacité (simple hypothèse de combat)."],
  ["2026-08-27","Lovun : Void, Kuyo et Le Pinceau affrontent six amplifiés (Parish à 5.9, 12 de Speed). Kuyo détruit les amplificateurs. Zone sans surveillance : Arlequin saisit des fioles sur Fice, qui dit les acheter 250 $ à des vendeurs masqués de noir."],
  ["2026-08-29","Le Creek West Daily News accuse un justicier de créer des drogues et de droguer les citoyens."],
  ["2026-09-01","Ablaze (fiche Ember) vend des amplificateurs « pour les tests d'Ember » ; Lucian Hale revend de la drogue du marché noir à Wellston."],
  ["2026-09-04","Bureau de Wellston : Adrien s'intéresse aux individus qui pourraient gêner « les intérêts d'EMBER »."],
  ["2026-10-10","Grasshill : Volcan, agent exécutif d'Ember, vend douze fioles au gang de Tobias, Garance et Ilya. Vitalis brise une fiole puis s'empare de la mallette."],
  ["2026-10-23","Branish : cinq amplifiés et un membre d'Ember ; Vitalis les met en fuite ou KO et leur dit de détruire leurs amplificateurs. Fury, aux griffes enflammées, la blesse."],
  ["2026-10-28","Isaure : « EMBER qui les assassine » ; Lighter demande à Volcan si une drogue supprime les capacités."],
  ["2026-11-01","Quartier low-tier : Vitalis bat quatre amplifiés, Volcan les exécute (« ils vont en payer chaque gramme »)."]]},
 {id:"attenuateur", t:"L'atténuateur et les injections (Spectre)", c:"#8b52d6", intro:"Deux procédés distincts : un atténuateur, qui divise temporairement les niveaux par deux dans la zone (environ une heure), et un produit injecté dans la nuque qui retire la capacité (nausée, sommeil, vomissements au réveil). Orrin peut rendre 25 % de la capacité par recharge d'environ une semaine.",
  steps:[
  ["2026-10-20","21:00 environ : frisson, IEM, niveaux divisés par deux ; Kaïra estime l'effet à environ 1 h. Les sbires préviennent à 21:17 que l'atténuateur va cesser."],
  ["2026-10-21","Les injections : Rein (plage), Telemachus (par Keito), Lucina (téléporteur), Hizo (par Liam), John (silhouette dans la rue). Kael est emporté par le même téléporteur."],
  ["2026-10-22","Réveil des enlevés dans la base de Spectre : nausées. Marché d'Orrin : 25 % de capacité contre services. John et Hizo se réveillent à l'hôpital sans capacité."],
  ["2026-10-24","Kaito Vance prélève le sang d'Hizo et cherche un remède."],
  ["2026-10-24","Telemachus travaille son « bouchon » par méditation ; la fissure s'élargit le 28."],
  ["2026-10-29","Bureau de Wellston : dossiers d'injections sans substance identifiée ; examen le 30 (marque froide, prise de sang, frottis)."],
  ["2026-11-02","Hizo n'a toujours pas retrouvé sa capacité."],
  ["2026-11-03","Marou, nouveau, décrit une capacité qui « affaiblit, use » ; son joueur la rapproche des atténuateurs."]]}
];

// statut : rec = récupération ; "perdue" | "partielle" | "complète" | "inconnue"
window.CURATED.TRACKER = [
 {n:"Telemachus", eff:"Injecté par Keito, enlevé", st:"partielle", rec:"25 % rendus par Orrin (22 oct.), recharge environ une semaine ; « bouchon » entamé par méditation (24–29 oct.)"},
 {n:"Lucina", eff:"Injectée par un téléporteur, enlevée", st:"partielle", rec:"Recharge de ~10 min, partielle et temporaire ; « quasiment rien » le 22, « affaiblie voire disparue » le 28"},
 {n:"Kael", eff:"Enlevé (téléporteur), nausée", st:"partielle", rec:"Capacité revenue après un petit sommeil et ~10 min (25 %)"},
 {n:"Rein", eff:"Piquée à la nuque, enlevée, dominée par Orrin", st:"perdue", rec:"Capacité inactivable le 21–22 oct. ; sort non documenté ensuite"},
 {n:"John", eff:"Injecté dans la rue, inconscient ~24 h", st:"perdue", rec:"Capacité inactivable le 22 oct. (« pour le mieux »)"},
 {n:"Hizo Vertini", eff:"Injecté par Liam, inconscient ~24 h", st:"perdue", rec:"Inactivable le 22 oct. ; Kaito cherche un remède ; toujours rien le 2 nov."},
 {n:"Beta", eff:"Niveau divisé (3.3)", st:"complète", rec:"Revient vers 21:30 le 21 ; « récupéré » le 22 oct."},
 {n:"Kaïra", eff:"Niveau divisé, tir au flanc", st:"complète", rec:"« Peu de puissance revenir » à 21:29 le 21 oct."},
 {n:"Keito", eff:"Niveau divisé par deux pendant l'atténuateur (~1 h)", st:"complète", rec:"Retrouve son 8.8 complet après l'événement"},
 {n:"Vitalis", eff:"Niveau divisé, guérison ralentie", st:"complète", rec:"Se soigne totalement le 25 oct. (onde curative) ; plus d'atténuateur le 23"},
 {n:"Arlo", eff:"Barrière affaiblie", st:"complète", rec:"Non désactivée : capacité revenue avec l'atténuateur (21 oct.)"},
 {n:"Blyke", eff:"Filet d'énergie à la place des salves", st:"complète", rec:"Non désactivé : la lueur rouge réapparaît (21 oct.), capacité retrouvée"},
 {n:"Isen", eff:"Vision de prédateur brouillée", st:"complète", rec:"Non désactivé : capacité retrouvée"},
 {n:"Julia", eff:"Niveau divisé", st:"complète", rec:"Non désactivée : capacité retrouvée"},
 {n:"Laura", eff:"Niveau divisé, blessée par lasers", st:"complète", rec:"Non désactivée : capacité retrouvée ; sort de l'hôpital le 23 oct."},
 {n:"Mitsu", eff:"Faux affaiblie, jambe transpercée", st:"complète", rec:"Non désactivée : capacité retrouvée ; sort de l'hôpital le 24 oct."},
 {n:"Leonie", eff:"Possession impossible", st:"complète", rec:"Non désactivée : capacité retrouvée"},
 {n:"Hizo Vertini ", eff:"", st:"", rec:""}
].filter(x => x.eff);
