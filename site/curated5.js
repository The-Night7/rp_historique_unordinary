// Tableaux d'enquête (fils rouges). k : perso | note | objet | lieu | inconnu
// x,y : centre de la carte en % du tableau. p : nom de personnage du site (lien + pastille de statut).
// Arêtes : [a, b, libellé, "?" si hypothèse non prouvée]
(function () {
const C = window.CURATED;
C.BOARDS = [
{ id: "ember", short: "Ember et l'attaque ?", t: "Ember", intro: "Les fioles amplificatrices, ceux qui les fournissent et ceux qui les paient. Ember est distincte de Spectre : les pointillés marquent ce que personne n'a prouvé.",
 nodes: [
  { id: "bleu", k: "inconnu", n: "L'homme aux cheveux bleus", s: "Fournisseur", dt: "28 août · 7 oct.", x: 9, y: 13, d: "Long manteau noir, chapeau et masque, cheveux bleus. Il fixe le jour et le lieu, donne les doses, prend l'argent et repart à pied (Vesna, 7 octobre). Les vendeurs de Fice étaient « masqués de noir ». Son identité n'est jamais donnée." },
  { id: "fioles", k: "objet", n: "Fioles amplificatrices", s: "250 $ · ~40 min", dt: "dès le 27 août", x: 31, y: 13, d: "Poussent un niveau vers le haut pendant environ 40 minutes, avec des tremblements. Les embeds du bot comptent les adversaires « boostés » (×1,10 à ×5,50) puis « amplifiés » avec un bonus « EMBER »." },
  { id: "ember", k: "note", n: "EMBER", s: "Teste, vend, exécute", x: 55, y: 15, d: "Organisation qui teste les amplificateurs, les vend et exécute ses clients. Distincte de Spectre, qui mène l'attaque de Westview." },
  { id: "adrien", k: "perso", p: "Adrien", n: "Adrien", s: "Bureau de Wellston", dt: "4 sept.", x: 88, y: 13, d: "Au bureau de Wellston, s'intéresse aux individus qui pourraient gêner « les intérêts d'EMBER »." },
  { id: "fice", k: "perso", n: "Fice", s: "Acheteur", dt: "27 août", x: 9, y: 42, d: "Assommé par Arlequin dans la zone sans surveillance. Il dit acheter ses fioles 250 $ à des vendeurs masqués de noir." },
  { id: "lovun", k: "lieu", n: "Lovun", s: "Six amplifiés", dt: "27 août", x: 28, y: 44, d: "Void, Kuyo et Le Pinceau affrontent six amplifiés (Parish à 5.9, 12 de Speed). Kuyo détruit les amplificateurs." },
  { id: "volcan", k: "perso", p: "Volcan", n: "Volcan", s: "Agent exécutif", dt: "10 oct. → 1 nov.", x: 56, y: 44, d: "Agent exécutif d'Ember : vend douze fioles à Grasshill, exécute les acheteurs du quartier low-tier (« ils vont en payer chaque gramme »)." },
  { id: "ablaze", k: "perso", n: "Ablaze", s: "Vend « pour les tests »", dt: "1 sept.", x: 77, y: 38, d: "Fiche Ember : vend des amplificateurs « pour les tests d'Ember »." },
  { id: "arlequin", k: "perso", p: "Arlequin", n: "Arlequin", s: "Saisit des fioles", dt: "27 août", x: 9, y: 66, d: "Identité partagée. Il saisit des fioles sur Fice et se demande qui est l'homme aux cheveux bleus. Plus tard, à Branish et au quartier low-tier, le logs ne disent pas qui porte le casque." },
  { id: "vitalis", k: "perso", p: "Vitalis", n: "Vitalis", s: "Brise les fioles", dt: "10 oct. → 1 nov.", x: 33, y: 66, d: "Brise une fiole à Grasshill et s'empare de la mallette ; fait fuir ou assomme des amplifiés à Branish ; bat quatre amplifiés au quartier low-tier." },
  { id: "fury", k: "perso", p: "Fury", n: "Fury", s: "Griffes enflammées", dt: "24 oct.", x: 55, y: 66, d: "Agent d'Ember aux griffes enflammées. À Branish, elle entaille le dos de Vitalis et ralentit sa régénération." },
  { id: "grasshill", k: "lieu", n: "Grasshill", s: "12 fioles vendues", dt: "10 oct.", x: 76, y: 66, d: "Volcan vend douze fioles au gang de Tobias, Garance et Ilya. Vitalis brise une fiole puis s'empare de la mallette." },
  { id: "lighter", k: "perso", n: "Lighter", s: "Une drogue qui supprime ?", dt: "28 oct.", x: 92, y: 40, d: "Demande à Volcan si une drogue supprime les capacités. Isaure parle d'« EMBER qui les assassine » le même jour." },
  { id: "branish", k: "lieu", n: "Branish", s: "Cinq amplifiés", dt: "23–25 oct.", x: 33, y: 88, d: "Cinq amplifiés et un membre d'Ember. Vitalis les met en fuite ou KO et leur dit de détruire leurs amplificateurs. Arlequin observe." },
  { id: "lowtier", k: "lieu", n: "Quartier low-tier", s: "Quatre boostés exécutés", dt: "1–3 nov.", x: 62, y: 88, d: "Vitalis bat Tiago, Marek, Odile et Sibyl ; Volcan, masquée, les exécute pour avoir acheté les amplificateurs. Arlequin intervient." },
  { id: "attaque", k: "note", n: "L'attaque de Westview", s: "Ember derrière ?", dt: "soupçon", x: 88, y: 88, d: "Vitalis soupçonne Ember d'être derrière l'enlèvement de Kael et des autres (« qu'avez-vous fait de Kael et des autres ? »). Aucun log ne le prouve : les mécanismes décrits sont ceux de Spectre. Voir le tableau Spectre." }
 ],
 edges: [
  ["bleu", "fioles", "fournisseur"], ["fioles", "ember", "teste · vend"], ["bleu", "fice", "vendeurs masqués"],
  ["fice", "arlequin", "assommé · fioles saisies"], ["arlequin", "bleu", "« qui est-ce ? »"],
  ["lovun", "fioles", "détruites par Kuyo"], ["ember", "ablaze", "vend « pour les tests »"],
  ["ember", "adrien", "« les intérêts d'EMBER »"], ["ember", "volcan", "agent exécutif"], ["ember", "fury", "agent"],
  ["volcan", "grasshill", "vend 12 fioles"], ["grasshill", "vitalis", "fiole brisée"],
  ["vitalis", "fury", "blessée, ralentie"], ["fury", "branish", "présente"], ["vitalis", "branish", "5 amplifiés"],
  ["arlequin", "branish", "observe"], ["volcan", "lowtier", "exécute"], ["vitalis", "lowtier", "4 boostés"],
  ["lighter", "volcan", "« une drogue ? »"], ["vitalis", "attaque", "soupçon", "?"], ["ember", "attaque", "?", "?"]
 ] },

{ id: "spectre", t: "Spectre", intro: "L'attaque de la sortie scolaire des 20–21 octobre : l'atténuateur (temporaire), l'injection (retire la capacité), le marché d'Orrin et ce qu'il en reste. La pastille indique l'état de la capacité.",
 nodes: [
  { id: "sortie", k: "lieu", n: "La plage", s: "Sortie scolaire", dt: "20–21 oct.", x: 6, y: 13, d: "La sortie se divise en trois groupes (plage, randonnée, ville). Les téléphones sont coupés par une IEM." },
  { id: "att", k: "objet", n: "L'atténuateur", s: "Niveaux ÷ 2 · ~1 h", dt: "20 oct. ~21 h", x: 23, y: 13, d: "Divise temporairement les niveaux par deux dans la zone pendant environ une heure. Les sbires préviennent à 21:17 qu'il va cesser. Les capacités reviennent ensuite chez ceux qui n'ont pas été injectés." },
  { id: "orrin", k: "perso", p: "Orrin", n: "Orrin", s: "Chef de Spectre", x: 43, y: 13, d: "Dirige Spectre. Sa machine rend 25 % de la capacité par recharge d'environ une semaine ; il impose le marché aux prisonniers." },
  { id: "marche", k: "note", n: "Le marché d'Orrin", s: "25 % contre services", dt: "22 oct.", x: 63, y: 13, d: "Réveil des enlevés dans la base : nausées, vomissements, capacités qui ne s'activent plus. Orrin rend un quart de la capacité contre des services ; interdiction de parler d'Orrin et du lieu." },
  { id: "quart", k: "objet", n: "« Un quart »", s: "Recharge ~1 semaine", dt: "22–24 oct.", x: 81, y: 13, d: "25 % de capacité rendus par la machine d'Orrin. Telemachus, Lucina et Kael en bénéficient." },
  { id: "wellston", k: "lieu", n: "Bureau de Wellston", s: "Dossiers sans substance", dt: "29–30 oct.", x: 93, y: 13, d: "Dossiers d'injections sans substance identifiée ; examen le 30 (marque froide, prise de sang, frottis)." },
  { id: "marou", k: "perso", p: "Marou", n: "Marou", s: "Capacité qui « use »", dt: "3 nov.", x: 6, y: 41, d: "Nouveau personnage dont la capacité « affaiblit, use ». Son joueur la rapproche des atténuateurs : simple parallèle de joueur, pas un fait du RP." },
  { id: "keito", k: "perso", p: "Keito", n: "Keito", s: "Recruté par Orrin", dt: "20 oct. → 25 oct.", x: 29, y: 41, d: "Frère adoptif de Telemachus, 8.8. Son niveau est divisé par deux pendant l'atténuateur, puis il retrouve son 8.8 complet. Injecte Telemachus le 21 octobre et le livre à Spectre." },
  { id: "inj", k: "objet", n: "L'injection", s: "Dans la nuque", dt: "21 oct.", x: 50, y: 42, d: "Produit injecté dans la nuque : retire la capacité. Nausée, sommeil, vomissements au réveil. Source de la perte, qui dure là où l'atténuateur est passager." },
  { id: "liam", k: "perso", p: "Liam", n: "Liam", s: "Injecte Hizo", dt: "21 oct.", x: 72, y: 41, d: "Injecte Hizo (21 octobre)." },
  { id: "but", k: "note", n: "Le but de Keito", s: "High Tier → Low Tier", dt: "25 oct.", x: 93, y: 42, d: "Au parc, masqué, Keito explique : ramener tous les High Tier et au-delà au niveau des Low Tier par la technologie, sur ordre d'Orrin. Telemachus refuse (« punition collective »)." },
  { id: "tele", k: "perso", p: "Telemachus", n: "Telemachus", s: "Injecté par Keito", dt: "21 oct.", x: 6, y: 70, d: "Injecté par son frère adoptif, enlevé, il récupère 25 % le 22 octobre puis travaille son « bouchon » par méditation : 10 à 20 % de plus le 28." },
  { id: "lucina", k: "perso", p: "Lucina", n: "Lucina", s: "Piquée (téléporteur)", dt: "21 oct.", x: 23, y: 70, d: "Piquée par un téléporteur et enlevée. Un quart rendu : peut lire les pensées, plus les contrôler. « Affaiblie voire disparue » le 28." },
  { id: "kael", k: "perso", p: "Kael", n: "Kael", s: "Enlevé", dt: "21 oct.", x: 40, y: 70, d: "Emporté par le même téléporteur que Lucina, nausée au réveil. Capacité revenue à 25 % après un petit sommeil et environ 10 minutes." },
  { id: "rein", k: "perso", p: "Rein", n: "Rein", s: "Piquée sur la plage", dt: "20–21 oct.", x: 57, y: 70, d: "Piquée à la nuque, enlevée, dominée par Orrin. Capacité inactivable le 21–22 octobre ; sort non documenté ensuite." },
  { id: "john", k: "perso", p: "John", n: "John", s: "Injecté en ville", dt: "21 oct.", x: 74, y: 70, d: "Injecté par une silhouette dans la rue, inconscient environ 24 h. Se réveille à l'hôpital sans capacité." },
  { id: "hizo", k: "perso", p: "Hizo Vertini", n: "Hizo Vertini", s: "Injecté par Liam", dt: "21 oct.", x: 91, y: 70, d: "Inconscient environ 24 h, se réveille à l'hôpital sans capacité. Toujours rien le 2 novembre." },
  { id: "debloc", k: "note", n: "Le déblocage", s: "Le « bouchon »", dt: "24–31 oct.", x: 12, y: 88, d: "Telemachus suit le filet d'aura jusqu'au bouchon laissé par la seringue, puis des pulsations : fissure le 25, élargie le 28 (10 à 20 % de plus). Le bouchon est toujours là le 31." },
  { id: "kaito", k: "perso", p: "Kaito Vance", n: "Kaito Vance", s: "Cherche un remède", dt: "24 oct.", x: 78, y: 88, d: "Prélève le sang d'Hizo et cherche un remède." }
 ],
 edges: [
  ["sortie", "att", "divise par 2"], ["orrin", "att", "déploie"], ["orrin", "keito", "recrute"], ["orrin", "marche", "impose"],
  ["marche", "quart", "25 %"], ["quart", "tele", "rendu"], ["quart", "lucina", "rendu"], ["quart", "kael", "rendu"],
  ["keito", "tele", "frère adoptif · injecte"], ["keito", "but", "explique"], ["orrin", "inj", "mène"],
  ["liam", "hizo", "injecte"], ["inj", "lucina", "téléporteur"], ["inj", "kael", "enlevé"], ["inj", "rein", "nuque"],
  ["inj", "john", "silhouette"], ["inj", "hizo", "perdue"], ["inj", "tele", "perdue"],
  ["tele", "debloc", "méditation"], ["kaito", "hizo", "cherche un remède"], ["wellston", "inj", "dossiers"],
  ["marou", "att", "parallèle de joueur", "?"]
 ] },

{ id: "arlequin", t: "Arlequin", intro: "Arlequin n'est pas une personne : c'est un masque partagé. Les logs gardent le pseudo sans dire qui est dessous. Les pointillés marquent les apparitions dont le porteur n'est pas précisé.",
 nodes: [
  { id: "arl", k: "inconnu", p: "Arlequin", n: "ARLEQUIN", s: "« Nous sommes Arlequin »", x: 50, y: 40, d: "Casque intégral, jamais un mot sous le casque. Telemachus l'a voulu multiple : pour qu'« un seul Arlequin » devienne « un brouillard »." },
  { id: "tele", k: "perso", p: "Telemachus", n: "Telemachus", s: "Porteur d'origine", dt: "dès le 27 août", x: 22, y: 14, d: "Copie les capacités de ses adversaires au toucher. Premier soir sous le casque le 27 août, Fice et ses fioles. Les lignes « (Arlequin) » de sa fiche sont les mêmes capacités avec le masque." },
  { id: "faux", k: "note", n: "Le faux Arlequin « féminin »", s: "Un leurre", dt: "5 sept. · 7 oct.", x: 50, y: 12, d: "Telemachus fabrique un faux buste : l'Arlequin qui arrive à Lovun « avait de la poitrine ». Il réapparaît en « elle » face à Dorso, Vesna, Brann, Jax et Nell. Ce n'est pas Isaure : elle n'a rejoint que le 24 octobre." },
  { id: "isaure", k: "perso", p: "Isaure", n: "Isaure", s: "Rejoint le 24 oct.", dt: "24 oct.", x: 80, y: 14, d: "Clone le téléphone de Telemachus, voit les photos, demande à intégrer Arlequin. Il lui annonce qu'elle recevra « le nécessaire »." },
  { id: "phone", k: "objet", n: "Le téléphone cloné", s: "« Le roi des fées, c'est toi »", dt: "24 oct.", x: 80, y: 40, d: "Isaure avait pris le téléphone de Telemachus pour le sien sur la plage. « Les Arlequins venaient de devenir un peu plus qu'un mensonge. »" },
  { id: "debt", k: "objet", n: "Fiche Debt 6.7", s: "Capacité d'Isaure", x: 80, y: 68, d: "Transforme les coups reçus en dettes qui grossissent avec des intérêts et qu'elle rend en entier au contact. C'est la capacité d'Isaure, copiée par Telemachus sous le masque : la fiche « Arlequin » est identique à la sienne." },
  { id: "copie", k: "objet", n: "Copie · Aura Deity", s: "Lignes « (Arlequin) »", x: 22, y: 42, d: "Telemachus copie une capacité au toucher et la nourrit de sa propre aura. Beaucoup de lignes de l'unodex sont des capacités copiées." },
  { id: "beta", k: "perso", p: "Beta", n: "Beta", s: "Sanity Control", dt: "27 août", x: 6, y: 68, d: "En copiant Sanity Control, Telemachus a senti sa « moitié sombre » : la capacité de Beta est coupée en deux, il a copié la moitié sombre." },
  { id: "power", k: "perso", p: "Power", n: "Power", s: "Graviton · pacte", dt: "29 août", x: 24, y: 70, d: "Pacte avec Telemachus (Beta lui apprend à viser en échange d'une paix pour les bas niveaux), puis duel sur le toit. Graviton copié." },
  { id: "fice", k: "perso", n: "Fice", s: "Premier combat", dt: "27 août", x: 40, y: 70, d: "Premier combat d'Arlequin : Fice assommé, ses fioles saisies, son téléphone lu. Il parle de vendeurs masqués de noir." },
  { id: "lovun", k: "lieu", n: "Lovun", s: "Gang démantelé", dt: "3–5 sept.", x: 58, y: 70, d: "Arlequin met six adversaires hors-jeu. Le 5 septembre, c'est le faux Arlequin « féminin »." },
  { id: "grape", k: "note", n: "La Grape Vine", s: "« Combien sous le casque ? »", dt: "29 août · 5 sept.", x: 8, y: 88, d: "Le journal titre « Combien de personnes se cachent sous le casque ? » après Lovun." },
  { id: "gang", k: "lieu", n: "Zone sans surveillance", s: "Dorso · Vesna · Brann…", dt: "6–7 oct.", x: 40, y: 88, d: "Dorso, Vesna, Brann, Jax et Nell attendaient une livraison. Arlequin « en femme » renvoie l'onde de choc de Dorso, copie la peau de pierre de Brann, interroge Vesna par écrit. Il laisse un papier : « Nous sommes Arlequin. »" },
  { id: "bleu", k: "inconnu", n: "L'homme aux cheveux bleus", s: "Le fournisseur", dt: "7 oct.", x: 62, y: 88, d: "Décrit par Vesna : long manteau noir, chapeau, masque, cheveux bleus. Voir le tableau Ember." },
  { id: "branish", k: "lieu", n: "Branish", s: "Porteur non précisé", dt: "24–25 oct.", x: 92, y: 88, d: "Arlequin observe le duel Vitalis–Fury, étonné de ne pas être attaqué. Les logs ne disent pas qui porte alors le casque." },
  { id: "lowtier", k: "lieu", n: "Quartier low-tier", s: "Porteur non précisé", dt: "1er nov.", x: 66, y: 40, d: "Se glisse derrière Marek, Odile, Sibyl et Tiago pendant que Vitalis les affronte. Les logs ne disent pas qui porte le casque." }
 ],
 edges: [
  ["tele", "arl", "porteur d'origine"], ["tele", "faux", "fabrique"], ["faux", "arl", "brouille les pistes"],
  ["isaure", "arl", "rejoint le 24 oct."], ["isaure", "phone", "clone"], ["phone", "tele", "photos"],
  ["isaure", "debt", "sa capacité"], ["tele", "debt", "copiée sous le masque"],
  ["tele", "copie", "copie au toucher"], ["copie", "beta", "Sanity Control"], ["copie", "power", "Graviton"],
  ["arl", "fice", "27 août"], ["faux", "lovun", "5 sept."], ["lovun", "grape", "titré"], ["faux", "gang", "7 oct."],
  ["gang", "bleu", "Vesna le décrit"], ["arl", "bleu", "« qui est-ce ? »"],
  ["arl", "branish", "porteur ?", "?"], ["arl", "lowtier", "porteur ?", "?"]
 ] }
];
})();

// Mystères : chaque piste se relie automatiquement aux événements dont le texte correspond (rx) et aux personnages cités.
(function () {
window.CURATED.MYSTERIES = [
 { id: "bleu", short: "L'homme aux cheveux bleus", t: "Qui est l'homme aux cheveux bleus ?", st: "Ouvert", rx: "cheveux bleus|fioles|amplificat|vendeurs masqu", pp: ["Arlequin", "Telemachus", "Vitalis", "Volcan", "Fury"],
   sum: "Le fournisseur des fioles : long manteau noir, chapeau, masque, cheveux bleus. Il fixe le jour et le lieu, donne les doses, prend l'argent. Décrit par Vesna le 7 octobre, jamais identifié. Le lien avec Ember n'est pas prouvé." },
 { id: "casque", short: "Sous le casque d'Arlequin", t: "Qui se cache sous le casque d'Arlequin ?", st: "Partiellement résolu", rx: "Arlequin", pp: ["Telemachus", "Isaure", "Arlequin"],
   sum: "Un masque partagé : Telemachus l'a voulu multiple (un faux Arlequin « féminin »), Isaure l'a rejoint le 24 octobre. Les logs ne disent pas qui le porte à Branish ni au quartier low-tier." },
 { id: "ember", t: "Ember est-elle derrière l'attaque de Westview ?", st: "Ouvert", rx: "Ember|EMBER", pp: ["Vitalis", "Volcan", "Fury", "Isaure", "Lighter"],
   sum: "Vitalis le soupçonne. Les logs montrent deux mécanismes distincts : fioles (Ember) et atténuateur / injection (Spectre). Aucune preuve d'un lien." },
 { id: "orrin", short: "Que veut Orrin ?", t: "Que veut Orrin ?", st: "En partie révélé", rx: "Orrin|Spectre|atténuateur", pp: ["Orrin", "Keito", "Liam", "Telemachus", "Lucina", "Kael", "Rein"],
   sum: "Keito en donne le but le 25 octobre : ramener tous les High Tier au niveau des Low Tier par la technologie. Le lieu, l'organisation et le reste de ses plans restent verrouillés." },
 { id: "remede", short: "Rendre la capacité ?", t: "Peut-on rendre la capacité injectée ?", st: "Ouvert", rx: "injection|injecté|récupération partielle|bouchon|déblocage|remède", pp: ["Hizo Vertini", "John", "Rein", "Telemachus", "Lucina", "Kael", "Kaito Vance"],
   sum: "Rein, John et Hizo n'ont rien retrouvé. Telemachus, Lucina et Kael récupèrent un quart, Telemachus tente de forcer son « bouchon ». Kaito Vance cherche un remède dans le sang d'Hizo." }
];
})();
