// Corrections issues de la fiche de Telemachus (« Histoire IRP », chapitres I à XV) et suivi du déblocage
(() => {
const C = window.CURATED;
const ev = p => C.EVENTS.find(e => e.t.replace("★ ", "").startsWith(p));
const set = (p, o) => { const e = ev(p); if (!e) throw new Error("événement introuvable : " + p); Object.assign(e, o); };

// --- corrections d'événements ---
set("Duel Telemachus", {t:"★ Duel Telemachus × Power : un pacte sur le toit", c:["Telemachus","Power","Beta","Mitsu"],
 s:"Dans une salle de classe, Beta apprend à Power à mieux utiliser sa gravité en échange d'une paix pour les bas niveaux ; Power réclame un cobaye et désigne le roi et le valet. Telemachus accepte à la place de Mitsu, à une condition : si elle attaque encore un élève non consentant, c'est fini. Sur le toit, il soigne d'abord l'entaille que Beta cachait sous un pansement et la jambe de Power. Il amplifie la gravité autour de lui à 10 G, lui inflige la douleur de la « moitié sombre » de Sanity Control, régénère sa main broyée et lui arrache le deuxième tendon ; Power s'effondre KO le 6 septembre, il la soigne."});
set("Arlequin chasse", {d:"2026-08-27", e:"2026-09-05", t:"Arlequin : une identité qui se partage", k:"vigilante", p:"Zone sans surveillance, Grasshill, Lovun", c:["Arlequin","Telemachus"],
 s:"Casque intégral, jamais un mot sous le casque. Telemachus (qui copie les capacités de ses adversaires) assomme Fice, vend les fioles « à 250 $, vendues par des types masqués en noir », puis pose la question qui le hante : qui est l'homme aux cheveux bleus ? À Grasshill il copie les capacités de cinq adversaires. Pour qu'« un seul Arlequin » devienne « un brouillard », il fabrique un faux buste : l'Arlequin qui arrive à Lovun « avait de la poitrine » ; la Grape Vine titre « Combien de personnes se cachent sous le casque ? »"});
set("Arlequin contre le gang", {t:"Arlequin « elle » contre Dorso, Vesna, Brann, Jax et Nell", p:"Zone sans surveillance",
 s:"Les cinq attendaient une livraison. Arlequin, cette fois en femme pour les brouiller, renvoie en cône l'onde de choc de Dorso, copie la peau de pierre de Brann (« C'est le mien »), puis interroge Vesna par écrit : le fournisseur est un homme en long manteau noir, chapeau et masque, aux cheveux bleus, qui fixe jour et lieu, donne les doses, prend l'argent et repart à pied. Arlequin laisse un papier : « Nous sommes Arlequin. »"});
const mo = ev("Le marché d'Orrin"); if (mo) mo.s = "Réveil 24 h plus tard : nausée, vomissements. Keito, recruté par Orrin, tient une barrière de feu entre Telemachus et Lucina. Les capacités ne s'activent plus. Orrin impose le marché (capacités contre services, sinon impotents à vie), fait étrangler Telemachus par Rein dominée, puis règle sa machine à 25 % : Lucina d'abord (dix minutes de sommeil), Kael, Rein, Telemachus. La machine « retire » aussi, par une sensation précise que Telemachus reconnaît. Il impose aussi un verrou : impossible de parler d'Orrin ou du lieu. Recharge d'environ une semaine. Lucina récupère de quoi lire les pensées mais plus rien pour les contrôler ; elle et Telemachus tombent sous le niveau 2.";

C.EVENTS.push(
 {d:"2026-10-22", e:"2026-10-24", t:"« Un quart » : Telemachus et Lucina sous le niveau 2", k:"lien", p:"Wellston, café Woaba Boba, centre commercial de Westview", c:["Telemachus","Lucina","Isaure"],
  s:"Ils font le compte à Wellston : tous deux sous le niveau 2, aura bouchée, fourmillements constants chez lui. Pour récupérer le portable de Telemachus, Lucina et lui roulent une heure jusqu'au centre commercial ; elle a les jambes engourdies et renverse deux pots de plantes en entrant."},
 {d:"2026-10-24", t:"★ Isaure clone le téléphone de Telemachus et rejoint Arlequin", k:"tournant", p:"Messagerie privée", c:["Isaure","Telemachus","Arlequin"],
  s:"Isaure, qui a pris son téléphone pour le sien sur la plage, l'a cloné et a vu les photos : « Le roi des fées, c'est toi. Je veux in. » Il fait l'idiot, puis lui demande où elle habite, la prévient qu'elle recevra « le nécessaire », de ne jamais parler sous le casque et de supprimer l'échange. « Les Arlequins venaient de devenir un peu plus qu'un mensonge. »"},
 {d:"2026-10-24", e:"2026-10-31", t:"★ Le déblocage de Telemachus", k:"tournant", p:"Chez Telemachus", c:["Telemachus"],
  s:"Il médite pour suivre le mince filet d'aura jusqu'au « bouchon » laissé par la seringue. 24 oct. : en forçant, il n'obtient que des bras qui tremblent. 25 oct. : de petites pulsations régulières, une par expiration, au même endroit : une vibration, puis une fissure. 28 oct. : la fissure s'élargit ; il sent passer, par sa propre poussée, entre 10 et 20 % de sa capacité en plus du quart d'Orrin (estimation du personnage). 29–31 oct. : le bouchon reste, plus fragile ; il observe avant de forcer. Il lui faut encore « une ou deux séances »."},
 {d:"2026-10-25", e:"2026-10-28", t:"Keito et Telemachus au parc : « protège-moi autrement »", k:"lien", p:"Parc", c:["Keito","Telemachus"],
  s:"Keito, masqué, lui parle d'égalité et de technologie : ramener tous les High Tier et au-dessus au niveau des Low Tier, « pour te protéger », c'est Orrin qui décide. Il propose de « traumatiser » Power à sa place et se moque de Lucina. Telemachus, en larmes, refuse : « punition collective ». Il lui demande de l'aider à tenir debout face aux plus forts, au lieu de rabaisser tous les autres. Keito répète le même discours mot pour mot."}
);

// --- fiche de Telemachus (valeurs de sa fiche en ligne) ---
const F = C.FICHES["Telemachus"];
F.rows = [[1.0,[1,1,1,1,1]],[1.6,[1,1,1,4,1]],[4.1,[1,1,1,10.6,1]],[5.8,[1,1,1,14,1]],[6.1,[1,1,1,14.7,1]],[6.2,[1,1,1,15,1]],[6.3,[1,1,1,15.2,1]]];
F.note = "Aura Deity (aura jaune). Niveau actuel 6.3 = (potentiel 9.5 × maîtrise 6.6) / 10. Il copie une capacité au toucher et la nourrit de sa propre aura ; ses statistiques physiques restent à 1.0 tant qu'il n'a rien copié, son Trick est de niveau × 2,414. Au niveau 6.0 il découvre qu'il a « sauvegardé » toutes les capacités copiées. Beaucoup de lignes de l'unodex sont des combinaisons copiées (Graviton de Power, Sanity Control de Beta, Icicle et Faucheuse Fantôme, Shockwave…), et celles « (Arlequin) » sont les mêmes avec le masque.";
C.FICHES["Arlequin"].note = "Arlequin est une identité partagée (« Nous sommes Arlequin »). La ligne Debt 6.7 est Isaure sous le masque : sa capacité Debt transforme les coups reçus en dettes qui grossissent avec des intérêts et qu'elle rend en entier au contact.";

// --- arcs corrigés ---
const A = C.ARCS;
A["Arlequin"] = {title:"« Nous sommes Arlequin »", tag:"Identité partagée · Meta 6.0 – 6.7",
 summary:"Arlequin n'est pas un seul personnage : c'est un masque que Telemachus a voulu multiple (un faux Arlequin « féminin » pour brouiller les pistes) et qu'Isaure rejoint le 24 octobre. Les logs gardent le pseudo « Arlequin » sans dire qui porte le casque.",
 beats:[["2026-08-27","fight","Premier combat : Fice, ses fioles, la question « qui t'a donné ça ? »."],["2026-09-05","plot","Arlequin « féminin » à Lovun ; la Grape Vine : « combien de personnes se cachent sous le casque ? »"],["2026-10-07","fight","Ruelle : Dorso, Vesna, Brann, Jax, Nell ; la piste de l'homme aux cheveux bleus."],["2026-10-24","plot","Isaure demande à rejoindre ; elle recevra « le nécessaire »."],["2026-11-01","fight","Impasse du quartier low-tier : se glisse derrière Marek, Odile, Sibyl et Tiago pendant que Vitalis les affronte."]]};
const T = A["Telemachus"];
T.summary = "Roi de Westview et copieur (Aura Deity), Telemachus est aussi sous le casque d'Arlequin. Le 21 octobre, son frère adoptif Keito l'injecte et le livre à Spectre ; il reconquiert ensuite sa capacité séance après séance.";
T.beats = [["2026-08-17","evo","Entraînements quotidiens : le plus gros total de points d'évolution du RP."],["2026-08-23","fight","Turf War : face à Irene, il gèle ses jambes avec des aiguilles de glace mais abandonne en sachant qu'il ne peut pas passer sa défense."],["2026-08-27","arc","Révèle à Beta que, en copiant Sanity Control, il a senti sa « moitié sombre »."],["2026-08-27","plot","Premier soir sous le casque d'Arlequin."],["2026-08-29","fight","Pacte avec Power, puis duel sur le toit."],["2026-09-05","bond","Café avec Keito, frère adoptif."],["2026-09-07","bond","Rattrape Lucina quand elle glisse."],["2026-10-07","evo","Médite 32 minutes en silence : « apprendre le silence »."],["2026-10-20","arc","Sur la plage : « Tu ne peux pas être Keito. »"],["2026-10-21","arc","Injecté dans la nuque par Keito, emporté à Spectre."],["2026-10-22","evo","Orrin lui rend un quart ; sous le niveau 2 avec un fourmillement constant."],["2026-10-24","plot","Isaure le démasque et veut entrer dans les Arlequins."],["2026-10-25","evo","Séances de médiation : vibration, puis fissure dans le bouchon."],["2026-10-28","evo","Force 10 à 20 % de capacité de plus à travers la fissure."],["2026-10-29","plot","Témoigne au bureau de Wellston (Byron) : marque froide, prise de sang."]];
const I = A["Isaure"];
I.summary = "Isaure se bat blessée à la jambe pendant l'attaque et en sort avec un « certain objet ». Elle découvre qui est Arlequin, rejoint le groupe et tombe amoureuse de Beta.";
I.beats.splice(2,0,["2026-10-24","arc","Clone le téléphone de Telemachus, voit ses photos et demande à intégrer Arlequin."]);
const B = A["Beta"]; B.summary = "Sanity Control (Heal / Hurt / Balance). Depuis un événement qu'elle n'évoque pas, sa capacité est coupée en deux, comme sa personnalité : elle n'a plus accès qu'à la moitié qui soigne (les professionnels disent qu'elle guérira sa capacité le jour où elle guérira sa bipolarité). Telemachus a copié l'autre moitié. Elle sert de soutien à toute la randonnée du 20 octobre et s'attache à Isaure.";
const K = A["Keito"]; K.beats.push(["2026-10-25","arc","Au parc, masqué : veut ramener tous les High Tier au niveau des Low Tier, « pour te protéger »."]);

// --- fils rouges ---
const em = C.THREADS.find(t => t.id === "ember");
em.steps.splice(1, 0, ["2026-08-28","Telemachus (sous le casque) affronte cinq mid tiers à Grasshill et se demande qui est « celui aux cheveux bleus »."]);
em.steps.splice(5, 0, ["2026-10-07","Vesna décrit l'homme aux cheveux bleus : long manteau noir, chapeau, masque ; il fixe jour et lieu, donne les doses, prend l'argent et repart à pied."]);
C.THREADS.find(t => t.id === "attenuateur").steps.push(["2026-10-25","Au parc, Keito explique le but : ramener tous les High Tier et au-dessus au niveau des Low Tier par la technologie, sur ordre d'Orrin."]);

// --- tracker ---
const tr = C.TRACKER.find(t => t.n === "Telemachus");
tr.st = "partielle"; tr.rec = "Injecté le 21 oct. ; 25 % rendus par Orrin le 22 (sous le niveau 2) ; fissure du « bouchon » le 25, puis 10–20 % de plus forcés vers le 28 (estimation du personnage) ; recharge hebdomadaire à renouveler à la base.";

// --- courbe du déblocage : [date, bas %, haut %, libellé] ---
C.DEBLOCAGE = {
 "Telemachus": [["2026-10-19",100,100,"Pleine capacité"],["2026-10-20",50,50,"L'atténuateur divise par deux"],["2026-10-21",0,0,"Seringue de Keito, plus de capacité"],["2026-10-22",25,25,"Orrin rend un quart"],["2026-10-25",25,25,"Premières pulsations, fissure"],["2026-10-28",35,45,"10–20 % forcés en plus du quart"],["2026-10-31",35,45,"Bouchon toujours là, plus fragile"]],
 "Lucina": [["2026-10-19",100,100,"Pleine capacité"],["2026-10-20",50,50,"L'atténuateur : n'arrive plus à manipuler"],["2026-10-21",0,0,"Piquée par le téléporteur"],["2026-10-22",25,25,"Un quart : peut lire les pensées, plus les contrôler"],["2026-10-28",10,25,"« Affaiblie voire disparue »"]],
 "Kael": [["2026-10-19",100,100,"Pleine capacité"],["2026-10-20",50,50,"Lames plus petites"],["2026-10-21",0,0,"Enlevé, injecté"],["2026-10-22",25,25,"Revenue à 25 % après un sommeil"]]
};

C.EVENTS.sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : (a.e || a.d) < (b.e || b.d) ? -1 : 1);
C.FICHE_CHRONO = {"Telemachus": [
 ["I. L'avantage de l'information","mi-août","Présentation, passif d'aura, premier duel perdu contre Marc sur la plage."],
 ["II. La guerre des territoires","23–25 août","Turf War : Mitsu et Hizo, Ice écrasée par Irene, il abandonne face à elle puis soigne avec Sanity Control copié."],
 ["III. L'autre moitié","27 août","Avoue à Beta qu'il a senti la moitié sombre de sa capacité."],
 ["IV. Le masque","27–29 août","Premier soir d'Arlequin : Fice, les fioles, Grasshill, la question des cheveux bleus."],
 ["V. Power","29 août – 7 sept.","Pacte avec Power, duel sur le toit."],
 ["VI. Nous sommes Arlequin","1–5 sept.","Zone sans surveillance, faux Arlequin « féminin » à Lovun, la Grape Vine."],
 ["VII. Le frère","5–7 sept.","Café avec Keito, frère adoptif."],
 ["VIII. Lucina","septembre","Rapprochement, jeux inter-écoles."],
 ["IX. Apprendre le silence","octobre","Premières méditations, Kaïra, Ice."],
 ["X. La ruelle","6–7 oct.","Dorso, Vesna, Brann, Jax, Nell ; l'homme aux cheveux bleus."],
 ["XI. La plage","20–21 oct.","Trahison de Keito, atténuateur, injection."],
 ["XII. Un quart","22–25 oct.","Orrin, 25 % de capacité, Isaure clone son téléphone, premières pulsations."],
 ["XIII. Des grosses flèches","25–28 oct.","Keito au parc ; la fissure s'élargit, 10 à 20 % forcés."],
 ["XIV. Ce qui se mesure","29–31 oct.","Bureau de Wellston, Byron, examen de la nuque."],
 ["XV. À l'autre bout de la ruelle","31 oct. – 1er nov.","Quartier low-tier : Vitalis contre quatre amplifiés, Arlequin derrière eux."]]};
})();
