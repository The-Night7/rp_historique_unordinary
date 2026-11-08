// Données éditoriales : événements, arcs de personnages, fiches (issues de l'unodex + logs Discord)
// kind : combat | rencontre | plot | vigilante | lien | tournant | ecole
window.CURATED = {

ACTS: [
  { id:"a1", name:"Acte I — La rentrée", from:"2026-08-12", to:"2026-08-31", color:"#5b8def", text:"Premières rencontres, hiérarchie des niveaux, affrontement inter-écoles Agwin vs Westview, apparition des justiciers masqués." },
  { id:"a2", name:"Acte II — Rivalités & enquêtes", from:"2026-09-01", to:"2026-10-19", color:"#c78bff", text:"Duel Telemachus/Power, dossier fédéral contre les justiciers, rassemblement inter-écoles, trafics et gangs dans les quartiers." },
  { id:"a3", name:"Acte III — L'attaque & Spectre", from:"2026-10-20", to:"2026-10-31", color:"#ff6b6b", text:"Sortie scolaire attaquée par Spectre : atténuateur (niveaux divisés par deux), injections qui retirent la capacité, enlèvements, marché d'Orrin à 25 %, récupérations partielles, enquête médicale." },
  { id:"a4", name:"Acte IV — Après la tempête", from:"2026-11-01", to:"2026-11-08", color:"#4cc9a4", text:"Nouveaux arrivants à Agwin, combats de rue à Wellston, l'histoire d'amour Beta × Isaure se scelle." }
],

EVENTS: [
 {d:"2026-08-12", e:"2026-08-17", t:"Julia vole au secours de Leonie", k:"rencontre", p:"Rue de Wellston", c:["Julia","Leonie"], s:"Leonie (Agwin, 2.2) se fait bousculer par deux élèves de niveau ~3. Julia intervient par télépathie depuis un banc, puis les met à terre. Premier contact, Leonie confie son rêve de devenir « aussi puissante que toi »."},
 {d:"2026-08-15", e:"2026-08-18", t:"Power tabasse Kaïra (1.8)", k:"combat", p:"Parc de Westview", c:["Power","Kaïra","Mitsu"], s:"Power, qui frappe tout ce qui est sous 4.5, humilie Kaïra. Mitsu la relève et l'aide à remarcher. Début de la réputation de « grande terreur » de Westview."},
 {d:"2026-08-19", e:"2026-08-22", t:"L'entraînement qui tourne mal : Leonie possède Kaïra", k:"rencontre", p:"Parc de Westview → Hôpital", c:["Leonie","Kaïra","Mitsu"], s:"Pour s'entraîner, Leonie prend possession de Kaïra. Mitsu garde le corps inconscient sur le banc, Kaïra se rend à l'hôpital dans le corps possédé. Leonie rencontre ensuite Mitsu, un des rares hauts niveaux à lui parler sans mépris."},
 {d:"2026-08-18", e:"2026-08-22", t:"Premier jour : Soren et Julia", k:"rencontre", p:"Lycée de Wellston", c:["Soren","Julia"], s:"Deux nouveaux au lycée, tous deux mal à l'aise dans la foule. Ils s'apprivoisent dans les couloirs (échange de numéros le 29 août)."},
 {d:"2026-08-22", t:"Ice contre Mitsu sur la plage", k:"combat", p:"Plage de Westview", c:["Ice","Mitsu","Marc","Telemachus"], s:"Ice plante un pic de glace dans l'épaule de Mitsu. Marc et Telemachus assistent à la scène ; Marc analyse déjà tout le monde avec son Passif."},
 {d:"2026-08-22", e:"2026-08-23", t:"Irene et Elizabeth Shaw débattent du « potentiel »", k:"rencontre", p:"Centre commercial d'Agwin", c:["Irene","Elizabeth Shaw"], s:"L'As d'Agwin (7.4) et une royale de Westview (4.4) discutent de ce que veut dire être fort, sous la pluie, au centre commercial."},
 {d:"2026-08-23", e:"2026-08-26", t:"★ Affrontement inter-écoles Agwin vs Westview", k:"tournant", p:"Zone Turf Wars", c:["Hizo Vertini","Mitsu","Irene","Ice","Telemachus","Beta","Rein","Marc"], s:"Le grand événement de la rentrée. Hizo (roi d'Agwin) tient tête à Mitsu mais repart blessé, sur une canne artisanale ; Irene écrase Ice avec une sphère de pression, sans que celle-ci n'abandonne ; Beta soigne jusqu'à l'épuisement. L'item « FIN AFFRONTEMENT » est consommé le 26."},
 {d:"2026-08-25", e:"2026-08-26", t:"Kael renverse son plateau sur Issei", k:"combat", p:"Cantine du lycée de Wellston", c:["Kael","Issei"], s:"Un accident (la sauce) dégénère. Kael sort ses Dark Blades ; Issei finit à l'infirmerie. Kael, nouveau depuis deux semaines, fait ses premiers points de combat."},
 {d:"2026-08-24", e:"2026-08-29", t:"Beta tient tête à Power", k:"rencontre", p:"Cour & salle de classe de Westview", c:["Beta","Power"], s:"Power voit en Beta un « nouveau jouet ». La soigneuse (3.2) la bat par la ruse, puis lui apprend à mieux viser. Power décide de ne plus la toucher mais continuera avec les autres bas niveaux."},
 {d:"2026-08-25", e:"2026-08-28", t:"Hizo et Kaito Vance : la justice en question", k:"plot", p:"Starbucks d'Agwin", c:["Hizo Vertini","Kaito Vance"], s:"L'avocat-justicier Kaito laisse sa carte à Hizo après un débat sur les justiciers qui corrompent ou contournent la justice. Hizo lui évoque une « vieille affaire » personnelle."},
 {d:"2026-08-27", e:"2026-08-28", t:"Les justiciers de Lovun : Void, Le Pinceau, Kuyo", k:"vigilante", p:"Lovun", c:["Void","Le Pinceau","Kuyo","Arin","Parish"], s:"Après l'affrontement inter-écoles, une patrouille nocturne tourne à la dispute idéologique : tuer ou récolter des informations ? Kuyo traite Void d'« anti-héros »."},
 {d:"2026-08-27", t:"Complot « Lighter × Vulcain »", k:"plot", p:"Messagerie privée", c:["Volcan"], s:"Lighter propose à Volcan de se faire passer pour un niveau 5.8 afin de contrôler le mouvement des justiciers. Une technologie capable de priver quelqu'un de sa capacité est évoquée dès le 28."},
 {d:"2026-08-27", e:"2026-09-03", t:"Arlequin entre en scène", k:"vigilante", p:"Zone sans surveillance, Grasshill, Lovun", c:["Arlequin"], s:"Un justicier masqué, sans plaque, patrouille à moto : il assomme des criminels, les ligote et les photographie. Les embeds de points d'évolution le relient au joueur de Telemachus."},
 {d:"2026-08-29", t:"« Des justiciers ou des meurtriers ! »", k:"plot", p:"Réseaux sociaux", c:[], s:"Le Creek West Daily News lance la polémique sur les justiciers masqués. La Grape Vine relaie ensuite les exploits d'Arlequin (29 août, 5 septembre)."},
 {d:"2026-08-29", e:"2026-09-06", t:"★ Duel Telemachus × Power sur le toit", k:"tournant", p:"Toit du lycée de Westview", c:["Telemachus","Power","Beta","Mitsu"], s:"Telemachus, qui a copié Sanity Control de Beta, inflige à Power des douleurs ciblées (tendons, tibia). Power divise son axe de gravité et vise avec le regard ; le roi la soigne puis recommence. Elle s'effondre KO le 6 septembre, avec une blessure en plus."},
 {d:"2026-08-31", e:"2026-09-07", t:"La lettre de Kaito à Hizo", k:"plot", p:"Chez Hizo", c:["Hizo Vertini","Kaito Vance"], s:"Une enveloppe poussiéreuse : une clé USB avec les photos de trois personnes responsables de la mort des proches de Hizo. Il lance un appel le 4 septembre ; quelqu'un répond le 7 (bruit de moteur)."},
 {d:"2026-09-01", e:"2026-09-03", t:"Beta consulte le professeur Elias", k:"rencontre", p:"Lycée de Wellston", c:["Beta","Elias"], s:"Beta a des soucis de capacité (pertes temporaires). Le professeur Elias lui conseille de pratiquer, de se reposer, et de revenir en cas de problème."},
 {d:"2026-09-01", e:"2026-09-02", t:"Hizo croise Irene : « tu es trop faible »", k:"rencontre", p:"Centre-ville d'Agwin", c:["Hizo Vertini","Irene"], s:"Hizo reconnaît avoir perdu face au « valet » de Westview. Irene lui rappelle qu'il reste roi tant qu'il ne rend pas son titre à Broven. Il redoute Void, capable lui aussi d'intangibilité."},
 {d:"2026-09-01", e:"2026-09-02", t:"Trafic de drogues amplificatrices", k:"plot", p:"Quartiers de Wellston", c:["Lucian Hale","Ablaze","Le Pinceau"], s:"Ablaze vend des drogues amplificatrices « pour les tests d'Ember ». Lucian rejoint Wellston avec un stock du marché noir. Le Pinceau, en costume, est mis en garde."},
 {d:"2026-09-03", e:"2026-09-05", t:"Arlequin démantèle un gang à Lovun", k:"vigilante", p:"Lovun", c:["Arlequin","Virginia","Hugo","Raddix","Lennon","Magalie","Mei"], s:"Six adversaires, Arlequin les met un à un hors-jeu, ligote Hugo et Virginia et prend une photo. La Grape Vine le surnomme le « Justicier de l'ombre »."},
 {d:"2026-09-04", e:"2026-09-05", t:"Dossier fédéral contre les justiciers", k:"plot", p:"Bureau de Wellston", c:["Valerie","Adrien"], s:"Valérie confirme l'identité de deux jeunes justiciers et cherche à destituer le directeur Vaughn, peu coopératif avec le bureau. Adrian reste prudent."},
 {d:"2026-09-05", e:"2026-09-11", t:"Soren à Rowden : Silas, Louis, Keito", k:"rencontre", p:"Colline de Rowden", c:["Soren","Silas","Louis","Keito"], s:"Soren part en balade et rencontre Silas (muet, calepin) et Louis (suspicieux, craint le « bureau »). Keito, roi de Rowden, domine la colline."},
 {d:"2026-09-05", e:"2026-09-07", t:"Telemachus retrouve son frère adoptif Keito", k:"lien", p:"Café tranquille de Rowden", c:["Telemachus","Keito"], s:"Café entre frères : taquineries sur sa vie sentimentale, les cours, la moto. Keito paye."},
 {d:"2026-09-07", e:"2026-09-08", t:"Les royaux d'Agwin se réunissent", k:"plot", p:"Lycée d'Agwin", c:["Irene","Ramlethal Valentine","Hizo Vertini"], s:"Irene demande à Ramlethal d'aller chercher Hizo et Johaness. Hizo dort sur le toit, puis traverse le sol vers le bureau du proviseur."},
 {d:"2026-09-06", e:"2026-09-08", t:"Telemachus et Lucina se rapprochent", k:"lien", p:"Toit de Westview", c:["Telemachus","Lucina"], s:"Telemachus la rattrape quand elle glisse, ils s'accordent sur un dîner. Leur duo reviendra les 23-24 octobre."},
 {d:"2026-09-08", t:"Marc défie Kael à la vieille maison", k:"combat", p:"Vieille maison, Wellston", c:["Marc","Kael"], s:"Marc cherche des 1v1 pour étoffer ses « données » ; Kael accepte à contrecœur. Marc enregistre : invocation de lames d'ombres, défense basse."},
 {d:"2026-09-11", e:"2026-09-22", t:"★ Rassemblement inter-écoles", k:"tournant", p:"Gymnase de Westview", c:["Telemachus","Beta","Mitsu","Ice","Irene","Hizo Vertini","Julia","Leonie","Lucina","Marc"], s:"Les quatre proviseurs réunissent les élèves : trois zones d'entraînement (combat, théorie, soutien), yeux bandés pour certains. Cours de théorie le 17, exercices en binômes le 22 (Telemachus × Marc, Lucina × Ice). Issei est emmené à l'infirmerie."},
 {d:"2026-09-22", e:"2026-09-29", t:"Laura croise Soren puis Louis", k:"rencontre", p:"Agwin → Rowden", c:["Laura","Soren","Louis"], s:"Laura (3.5, Agwin) se promène en uniforme, aide Soren, puis Louis lui montre le chemin de la bibliothèque à Rowden."},
 {d:"2026-10-06", e:"2026-10-07", t:"Arlequin contre le gang de la zone sans surveillance", k:"vigilante", p:"Zone sans surveillance", c:["Arlequin"], s:"Une longue scène narrée : Jax (étincelles), Nell, Dorso, Brann et Vesna (fils d'aura) face à Arlequin. Le combat occupe plus de 85 messages."},
 {d:"2026-10-10", e:"2026-10-13", t:"Fioles de Grasshill : Volcan, Vitalis et le gang", k:"combat", p:"Grasshill", c:["Volcan","Vitalis","Ilya","Garance","Tobias"], s:"Volcan surveille un échange de fioles. Vitalis lance un couteau qui brise une fiole ; la bagarre éclate, Garance touche Volcan avant que tout le monde ne soit laissé à terre."},
 {d:"2026-10-12", e:"2026-10-15", t:"Void contre Silvio, Rocco et Mara", k:"vigilante", p:"Lovun", c:["Void","Silvio","Rocco","Mara"], s:"Void, justicier radical, fait le ménage chez les voleurs. Silvio surgit en applaudissant : « Tout le quartier te cherche ». Négociation puis combat ; Void s'enfonce dans le sol pour surprendre Rocco."},
 {d:"2026-10-18", t:"Ice digère sa défaite", k:"lien", p:"Toit de Westview", c:["Ice","Telemachus"], s:"Au déjeuner, Telemachus la rassure : elle n'a manqué que d'observation face à Irene. Ice vient de passer 5.6."},
 {d:"2026-10-20", e:"2026-10-22", t:"★ L'attaque de la sortie scolaire", k:"tournant", p:"Plage / Limite de la ville / Rue de Westview", c:["Telemachus","Lucina","Beta","Isaure","Louis","Keito","Blyke","Isen","Arlo","Liam","John","Kael","Mitsu","Kaïra","Laura","Leonie","Julia","Terrence"], s:"Trois groupes (plage, randonnée, ville). Des masqués lancent une IEM qui coupe les communications, encerclent chacun des groupes ; capacités éteintes, enlèvements. Arlo et Liam se battent barrière contre assaut, Keito (Death Fire) attaque la plage. La police n'arrive que 5 à 20 minutes après le départ des assaillants."},
 {d:"2026-10-21", e:"2026-10-22", t:"★ Le marché d'Orrin (salle de recharge)", k:"tournant", p:"Base Spectre, Wellston", c:["Telemachus","Lucina","Kael","Rein","Orrin","Keito"], s:"Réveil 24 h plus tard, nausée en premier effet secondaire. Orrin force les prisonniers à genoux et propose : capacités rendues contre services. Keito voudrait les recruter, Orrin veut d'abord les tester. Kael accepte, Lucina aussi (« ne me demande pas de te remercier »)."},
 {d:"2026-10-22", e:"2026-10-28", t:"Hôpital de Westview", k:"lien", p:"Hôpital, couloir", c:["Kaïra","Louis","Hizo Vertini","Kaito Vance","Julia","Mitsu"], s:"Kaïra et Louis s'attachent dans le couloir (plus de 200 messages). Kaito prélève du sang à Hizo et note que plusieurs étudiants ont disparu avant d'être « retrouvés »."},
 {d:"2026-10-23", e:"2026-10-24", t:"Le téléphone d'Isaure", k:"lien", p:"Rue, café, centre commercial de Westview", c:["Isaure","Beta","Telemachus","Lucina"], s:"Isaure a perdu son téléphone dans l'attaque ; Beta l'accompagne en boutique pendant que Telemachus et Lucina vont récupérer le leur. Début de leur rapprochement."},
 {d:"2026-10-24", e:"2026-10-25", t:"Vitalis contre Fury", k:"vigilante", p:"Branish", c:["Vitalis","Fury","Arlequin","Thomas","Cynthia","Silas","Magalie"], s:"Vitalis (récupération) face à Fury (vitesse). Arlequin observe, étonné de ne pas être attaqué."},
 {d:"2026-10-25", e:"2026-10-30", t:"Lucina et Ice s'entraînent", k:"lien", p:"Bibliothèque → limite de la ville → centre-ville", c:["Lucina","Ice"], s:"Plus de 400 messages. Lucina explique que sa capacité agit sur tous les aspects de l'esprit, pas seulement lire les pensées ; migraine de surmenage ; défi, rires, et rivalité amicale (« reine des glaces »)."},
 {d:"2026-10-27", e:"2026-11-01", t:"Isaure et Beta : la colline de Rowden", k:"lien", p:"Appartement d'Isaure, colline de Rowden", c:["Isaure","Beta"], s:"Beta, épuisée, soigne Isaure. Balade jusqu'au coucher de soleil, veste partagée, Isaure la porte jusque chez elle. Dîner à deux, cauchemar de Beta."},
 {d:"2026-10-29", e:"2026-10-30", t:"Telemachus au bureau de Wellston", k:"plot", p:"Bureau de Wellston", c:["Telemachus","Byron"], s:"Il vient faire un signalement (piqûre à la nuque, brûlure froide). Byron le guide, une doctoresse fait une prise de sang et compare avec la zone voisine."},
 {d:"2026-11-01", e:"2026-11-03", t:"Volcan écrase la bande du quartier low-tier", k:"combat", p:"Quartier low-tier", c:["Volcan","Vitalis","Arlequin","Tiago","Marek","Odile","Sibyl"], s:"Vitalis propose de se rendre ou de se battre. Volcan, griffes de feu, domine tout le monde ; Vitalis, partiellement brûlée, tient debout."},
 {d:"2026-11-02", e:"2026-11-03", t:"Marou face à Irene", k:"rencontre", p:"Entrée du lycée d'Agwin", c:["Marou","Irene"], s:"Marou (6.6) arrive à 6 h du matin. Irene sent un niveau divin, le teste avec une forte pression ; il lève les mains en signe de reddition et évoque les atténuateurs."},
 {d:"2026-11-05", e:"2026-11-05", t:"Louis dévoile son niveau", k:"rencontre", p:"Hôpital de Westview", c:["Louis","Mitsu","Julia"], s:"« Je suis 1.7 », dit Louis, crispé comme s'il s'attendait à être maltraité. Mitsu répond 5.5 en espérant ne pas passer pour un de « ces hauts niveaux »."},
 {d:"2026-11-06", t:"Laura et Kael sur la plage", k:"combat", p:"Plage de Westview", c:["Laura","Kael"], s:"Entraînement à 3.6 contre Kael, Laura augmente trop la pression de l'eau ; Kael saigne du nez, refuse l'hôpital."},
 {d:"2026-11-06", e:"2026-11-08", t:"★ Beta et Isaure se déclarent", k:"tournant", p:"Parc de Westview", c:["Beta","Isaure"], s:"6 nov : Isaure avoue avoir compris sa propre attirance. 7 nov : « tu serais d'accord de sortir avec une potentielle criminelle ? », premier baiser. 8 nov : « je t'aime », pique-nique ravagé par les fourmis."}
],

// Arcs de personnages : kind = evo (niveau/pouvoir) | arc (arc de personnage) | fight | bond | plot
ARCS: {
 "Telemachus": {
   title:"Le roi copieur", tag:"Westview · Roi · Meta",
   summary:"Roi de Westview, Telemachus est un copieur : sa fiche affiche une soixantaine de combinaisons de capacités empruntées. Entre entraînements, double jeu masqué et Spectre, il est le fil rouge du RP.",
   beats:[
    ["2026-08-17","evo","Entraînements quotidiens (salle de sport, plage) : il cumule le plus de points d'évolution de tout le RP."],
    ["2026-08-25","evo","Pendant l'affrontement inter-écoles il copie Sanity Control de Beta."],
    ["2026-08-29","fight","Duel contre Power sur le toit : il arrache les tendons de son adversaire avec la douleur empruntée à Beta."],
    ["2026-09-05","bond","Café avec son frère adoptif Keito, roi de Rowden."],
    ["2026-09-07","bond","Rapprochement avec Lucina sur le toit ; rendez-vous du soir."],
    ["2026-10-21","arc","Enlevé lors de l'attaque, il se réveille sans pouvoir dans la base de Spectre et affronte Orrin."],
    ["2026-10-29","plot","Au bureau de Wellston, il rapporte la piqûre à la nuque et passe des examens."]
   ]},
 "Beta": {
   title:"La soigneuse qui s'épuise", tag:"Westview · Soigneur · Status 3.1 → 3.4",
   summary:"Sanity Control (Heal / Hurt / Balance). Beta passe de victime potentielle à pilier des royaux, puis du statut de soigneuse en burn-out à celui de compagne d'Isaure.",
   beats:[
    ["2026-08-25","fight","Tient tête à Power : 4 points d'évolution le 25 août, puis 6 (bonus « Royaux ») le 27."],
    ["2026-08-26","arc","Soigne Mitsu et Ice jusqu'à l'épuisement pendant l'affrontement inter-écoles."],
    ["2026-08-28","evo","Passe à 3.4 (sheet : 3.1 → 3.4, taux 96 % → 88 %)."],
    ["2026-09-02","arc","Consulte Elias à Wellston pour des pertes de capacité."],
    ["2026-10-20","plot","Sa capacité est coupée pendant l'attaque ; elle revient environ une heure plus tard."],
    ["2026-10-23","bond","Premier vrai rendez-vous avec Isaure (téléphone, centre commercial, parc)."],
    ["2026-11-07","bond","Premier baiser avec Isaure."]
   ]},
 "Lucina": {
   title:"God's Mind", tag:"Westview · Mental · 5.2 → 5.3",
   summary:"Télépathe et manipulatrice mentale de haut niveau, Lucina cache un surmenage qui lui donne des migraines. Son duo avec Ice lui fait gagner une rivale amicale.",
   beats:[
    ["2026-09-07","bond","Lien naissant avec Telemachus sur le toit."],
    ["2026-09-22","fight","Exercice de binôme face à Ice au gymnase."],
    ["2026-10-21","arc","Enlevée, privée de ses pouvoirs, elle accepte le marché d'Orrin."],
    ["2026-10-25","bond","Migraine de surmenage ; elle s'entraîne avec Ice (limite de la ville)."],
    ["2026-10-26","arc","Explique à Ice que sa capacité agit sur tous les aspects de l'esprit."]
   ]},
 "Ice": {
   title:"La reine qui refuse d'abandonner", tag:"Westview · Reine · Quantum 5.5 → 5.6",
   summary:"Ice crée glace et pics. Son arc est celui d'une combattante qui perd — contre Mitsu, contre Irene — mais refuse de lâcher.",
   beats:[
    ["2026-08-22","fight","Plante un pic de glace dans l'épaule de Mitsu."],
    ["2026-08-24","fight","Prise en sandwich par la pression d'Irene, elle refuse d'abandonner."],
    ["2026-08-26","bond","Duel puis hôpital avec Mitsu : ils s'entraident."],
    ["2026-09-07","plot","Sous le nom de Glacia, elle patrouille à Branish (alerte patrouille)."],
    ["2026-10-18","evo","Passe 5.6 après avoir digéré sa défaite sur le toit."],
    ["2026-10-30","bond","Complicité totale avec Lucina."]
   ]},
 "Mitsu": {
   title:"Le valet qui ne veut pas frapper", tag:"Westview · Valet · Faucheuse Fantôme 5.3 → 5.5",
   summary:"Mitsu protège les plus faibles : il aide Kaïra, rassure Leonie, soigne Louis du regard. Sa faux fantôme le place parmi les hauts niveaux, mais il refuse leur arrogance.",
   beats:[
    ["2026-08-17","bond","Aide Kaïra à remarcher après la correction de Power."],
    ["2026-08-24","fight","Combat serré face à Hizo ; il ressort les flancs en sang."],
    ["2026-08-26","fight","Duel contre Ice sur la plage."],
    ["2026-10-20","evo","Passe de 5.3 à 5.4."],
    ["2026-11-05","evo","Passe 5.5 et révèle son niveau à Louis et Julia."]
   ]},
 "Louis": {
   title:"L'observateur au calepin", tag:"Rowden · Enhancement 1.5 → 1.7",
   summary:"Faible mais lucide, Louis note tout dans son calepin, craint le « bureau » et se lie progressivement avec des hauts niveaux.",
   beats:[
    ["2026-09-05","bond","Rencontre Soren et Silas sur la colline de Rowden, prend des notes en cachette."],
    ["2026-09-29","bond","Guide Laura à la bibliothèque de Rowden."],
    ["2026-10-20","fight","Prend un laser dans la jambe pendant l'attaque de la plage."],
    ["2026-10-22","arc","Plus de 200 messages avec Kaïra à l'hôpital : une amitié se noue."],
    ["2026-11-05","evo","Annonce « Je suis 1.7 » à Julia et Mitsu."]
   ]},
 "Kaïra": {
   title:"De souffre-douleur à 2.1", tag:"Westview · Blade 1.8 → 2.1",
   summary:"Frappée, possédée, puis hospitalisée : Kaïra grimpe de 1.8 à 2.1 et trouve en Louis un ami solide.",
   beats:[
    ["2026-08-16","fight","Battue par Power (1.8 contre 4.8)."],
    ["2026-08-19","plot","Possédée par Leonie ; elle se retrouve dans son propre corps allongé sur un banc."],
    ["2026-09-12","evo","Passe à 1.9."],
    ["2026-10-13","evo","Passe à 2.0 ; promenade avec Telemachus."],
    ["2026-10-22","evo","Passe à 2.1 ; rencontre Louis à l'hôpital."]
   ]},
 "Isaure": {
   title:"La fille de la dette", tag:"Debt 6.7 · Status",
   summary:"Isaure apparaît lors de la sortie scolaire. Sa fiche (Debt, 6.7) et les bonus « EMBER » de ses points d'évolution la lient à l'univers criminel ; elle le dit elle-même à Beta.",
   beats:[
    ["2026-10-20","plot","Arrive sur la plage et disparaît avec « un certain objet » sorti de sa poche."],
    ["2026-10-23","bond","Perd son téléphone dans l'attaque, repart avec Beta."],
    ["2026-10-28","bond","Colline de Rowden : pause au coucher de soleil, veste partagée."],
    ["2026-10-30","bond","Elle porte Beta dans ses bras jusqu'à son appartement."],
    ["2026-11-06","arc","Avoue ses sentiments ; le 7 : « sortir avec une potentielle criminelle ? »."],
    ["2026-11-08","bond","« Je t'aime » dit à Beta."]
   ]},
 "Kael": {
   title:"Le neutre aux lames sombres", tag:"Wellston · Creation · Dark Blades 5.2 → 5.3",
   summary:"Nouveau au lycée de Wellston, Kael choisit la neutralité (« agir de façon neutre est la meilleure solution »). L'attaque l'oblige à choisir un camp.",
   beats:[
    ["2026-08-25","fight","Premier combat contre Issei à la cantine."],
    ["2026-08-27","bond","Rencontre Marie dans la rue ; la rassure sur son niveau."],
    ["2026-09-08","fight","Duel contre Marc à la vieille maison."],
    ["2026-10-21","arc","Enlevé, il accepte les conditions d'Orrin."],
    ["2026-11-06","fight","S'entraîne contre Laura et saigne du nez."]
   ]},
 "Julia": {
   title:"Télépathe discrète", tag:"Wellston · Mental · Telepathy 4.4 → 4.5",
   summary:"Julia protège plus qu'elle ne combat : télépathie, illusions, et un complexe de ne « servir à rien ».",
   beats:[
    ["2026-08-12","bond","Sauve Leonie de deux élèves."],
    ["2026-08-17","evo","Gagne 2 points d'évolution pour ce premier combat."],
    ["2026-09-13","plot","Choisit la zone de droite, les yeux bandés, au gymnase."],
    ["2026-10-20","arc","Pendant l'attaque : « Bordel je ne sers à rien… »."],
    ["2026-11-02","bond","Échange son numéro avec Louis à l'hôpital."]
   ]},
 "Leonie": {
   title:"La possédée de 2.2", tag:"Agwin · Possession 2.2 → 2.5",
   summary:"Leonie ne peut posséder que plus faible qu'elle. Elle rêve de progresser mais enchaîne les situations où elle est le maillon faible.",
   beats:[
    ["2026-08-12","bond","Est sauvée par Julia à Wellston."],
    ["2026-08-19","evo","Possède Kaïra pour s'entraîner."],
    ["2026-09-06","evo","Passe 2.3 ; rencontre Lawrence au centre commercial."],
    ["2026-10-20","evo","Passe 2.4 puis 2.5."]
   ]},
 "Irene": {
   title:"L'As d'Agwin", tag:"Agwin · Reine · White Hole 7.4",
   summary:"Reine d'Agwin, niveau divin 7.4, Irene domine physiquement et diplomatiquement. Elle écrase Ice, chaperonne Hizo, accueille Marou.",
   beats:[
    ["2026-08-23","fight","Écrase Ice dans l'affrontement inter-écoles."],
    ["2026-09-01","arc","Face à Hizo : il est roi tant qu'il ne rend pas son titre à Broven."],
    ["2026-09-07","plot","Envoie Ramlethal chercher Hizo et Johaness."],
    ["2026-10-12","bond","Discute avec Marie au centre commercial."],
    ["2026-11-03","fight","Teste la pression sur Marou."]
   ]},
 "Hizo Vertini": {
   title:"Le roi fantôme et la lettre", tag:"Agwin · Roi · Ghost 4.8 → 4.9",
   summary:"Roi d'Agwin, Hizo est intangible, fatigué et hanté : une lettre de Kaito Vance lui désigne les responsables de la mort des siens.",
   beats:[
    ["2026-08-24","fight","Combat contre Mitsu ; sa vitesse et son intangibilité lui valent un avantage."],
    ["2026-08-25","arc","Repart boiteux avec une canne qu'il a fabriquée."],
    ["2026-08-28","evo","Passe 4.9."],
    ["2026-09-02","plot","Reçoit la lettre et la clé USB de Kaito."],
    ["2026-10-28","plot","Prise de sang à l'hôpital ; il cherche d'autres élèves touchés."]
   ]},
 "Soren": {
   title:"Le timide qui explore", tag:"Wellston · Creation · Crimson Thread 4.8 → 4.9",
   summary:"Soren n'aime pas les foules mais explore : Wellston, Rowden, Agwin.",
   beats:[
    ["2026-08-18","bond","Premier jour avec Julia."],
    ["2026-08-29","bond","Échange de numéros avec Julia."],
    ["2026-09-05","bond","Rencontre Silas et Louis à Rowden."],
    ["2026-09-07","evo","Passe 4.9."]
   ]},
 "Power": {
   title:"La grande terreur de Westview", tag:"Westview · Graviton 4.8 → 4.9",
   summary:"Elle frappe tout ce qui est sous 4.5. Son arc : de la brute à une élève qui écoute Beta, jusqu'à la chute face à Telemachus.",
   beats:[
    ["2026-08-16","fight","Tabasse Kaïra (1.8)."],
    ["2026-08-25","fight","Rate Beta, finit à l'hôpital."],
    ["2026-08-27","arc","Apprend à viser avec Beta : « Toi, je ne te toucherai plus »."],
    ["2026-08-31","fight","Combat sur le toit contre Telemachus."],
    ["2026-09-06","fight","S'effondre KO."]
   ]},
 "Marc": {
   title:"Le chasseur de données", tag:"Westview · Modes 8.6",
   summary:"Marc analyse tout, s'entraîne dans les vagues et défie les forts pour enregistrer leurs données.",
   beats:[
    ["2026-08-17","arc","Analyse la fréquence stochastique des vagues sur la plage."],
    ["2026-09-08","fight","Duel contre Kael."],
    ["2026-09-22","fight","Face à Telemachus au gymnase."]
   ]},
 "Marie": {
   title:"« Une moins que rien »", tag:"Wellston · niveau bas",
   summary:"Marie se rabaisse et fuit les regards, mais lit la Grape Vine et connaît les infos publiques.",
   beats:[
    ["2026-08-27","bond","Rencontre Kael dans la rue."],
    ["2026-09-03","fight","Passée à tabac par Issei au pire moment."],
    ["2026-10-12","bond","Parle avec Irene : « la plupart des hauts niveaux m'ont méprisée »."]
   ]},
 "Issei": {
   title:"Le petit brutal", tag:"Wellston · Claws 1.4 → 1.6",
   summary:"Issei cherche des cibles plus faibles, perd contre Kael, s'entraîne, recommence.",
   beats:[
    ["2026-08-25","fight","Sa cantine tourne au combat contre Kael."],
    ["2026-09-03","fight","Corrige Marie."],
    ["2026-09-22","fight","Se fait emmener à l'infirmerie."],
    ["2026-10-25","evo","Passe 1.6."]
   ]},
 "Laura": {
   title:"Eau et études", tag:"Agwin · Liquids Manipulation 3.5 → 3.6",
   summary:"Laura sort de cours avec des livres plein le sac, aime les bibliothèques et maîtrise l'eau sous pression.",
   beats:[
    ["2026-09-22","bond","Aide Soren au centre-ville d'Agwin."],
    ["2026-10-23","evo","Passe 3.6."],
    ["2026-11-06","fight","Blesse Kael sans le vouloir."]
   ]},
 "Arlequin": {
   title:"Le justicier masqué", tag:"Vigilante · Meta 6.0 – 6.7",
   summary:"Moto sans plaque, filets, photos : Arlequin nettoie les quartiers et fait la une de la Grape Vine. Ses embeds d'évolution renvoient au joueur de Telemachus.",
   beats:[
    ["2026-08-27","fight","Première patrouille en zone sans surveillance."],
    ["2026-09-05","plot","Démantèle un gang à Lovun ; la Grape Vine publie un article."],
    ["2026-10-07","fight","Combat contre Jax, Nell, Dorso, Brann et Vesna."],
    ["2026-11-02","fight","Affronte Volcan et encaisse son coup de flammes (tenue brûlée)."]
   ]},
 "Vitalis": {
   title:"Life Steal", tag:"Vigilante · Cure 6.3",
   summary:"Haute de 2 m, Vitalis récupère en frappant. Elle croise Volcan, Fury et le gang de Marek.",
   beats:[
    ["2026-10-12","fight","Lance un couteau dans Grasshill."],
    ["2026-10-24","fight","Se bat contre Fury à Branish."],
    ["2026-11-02","fight","Brûlée par Volcan dans le quartier low-tier."]
   ]},
 "Volcan": {
   title:"Barrière et flammes", tag:"Vigilante · Barrier+ 7.5",
   summary:"Volcan, partenaire de Lighter, domine les quartiers et ne laisse aucun adversaire en paix.",
   beats:[
    ["2026-08-27","plot","Lighter lui propose de contrôler le mouvement des justiciers."],
    ["2026-10-13","fight","Reçoit un coup de Vitalis."],
    ["2026-11-02","fight","Écrase la bande de Marek et Odile."]
   ]},
 "Keito": {
   title:"Death Fire", tag:"Rowden (ancien Roi) · Quantum 8.8",
   summary:"Frère adoptif de Telemachus, roi de Rowden, 8.8. La fiche lui prête une association avec Spectre.",
   beats:[
    ["2026-09-05","bond","Café avec Telemachus."],
    ["2026-10-20","fight","Envoie des flammes sur la plage."],
    ["2026-10-22","plot","Face à Orrin, il voudrait recruter les prisonniers."]
   ]},
 "Kaito Vance": {
   title:"L'avocat-justicier", tag:"Justice",
   summary:"Avocat, il met les coupables derrière les barreaux. Il envoie la lettre à Hizo puis examine les victimes à l'hôpital.",
   beats:[
    ["2026-08-25","plot","Rencontre Hizo au Starbucks."],
    ["2026-09-02","plot","Lettre et clé USB envoyées à Hizo."],
    ["2026-10-28","plot","Prélève du sang à l'hôpital."]
   ]},
 "Void": {
   title:"Justicier radical", tag:"Vigilante · Ghost 4.9",
   summary:"Void dissout son corps dans le sol et frappe sans merci. Il partage la fiche de Ghost avec Hizo.",
   beats:[
    ["2026-08-27","fight","Dispute avec Le Pinceau sur la méthode."],
    ["2026-10-12","fight","Affronte Silvio, Rocco et Mara."]
   ]}
},

// Fiches (unodex-rp). rows : [niveau, [Power, Defense, Recovery, Trick, Speed]]
FICHES: {
 "Telemachus":{ecole:"Westview (Roi)",taille:"170 cm (H)",type:"Meta",ability:"Aura Deity",nature:"—",rows:[[1.0,[1,1,1,1,1]],[1.6,[1,1,1,4,1]],[4.1,[5.4,3.2,5.4,10.6,3.6]],[5.8,[1,1,1,14,1]],[6.1,[1,1,1,14.7,1]],[6.2,[1,1,1,15,1]]],note:"Copieur : les ~60 lignes 5.8–6.2 sont des combinaisons de capacités copiées (ex. Graviton de Power, Sanity Control de Beta). Niveau effectif estimé 4.9, potentiel 9.5, maîtrise 6.6."},
 "Lucina":{ecole:"Westview",taille:"145 cm (F)",type:"Mental",ability:"God's Mind",nature:"—",rows:[[1.0,[1,1,1,1,1]],[5.2,[4,3,6,9,3]],[5.3,[4,3,6,9,3]]]},
 "Hizo Vertini":{ecole:"Agwin (Roi)",taille:"185 cm (H)",type:"Quantum",ability:"Ghost (Spectre)",nature:"—",rows:[[1.0,[1,1,1,1,1]],[4.8,[3,3,5,7,6]],[4.9,[3,3,5,7,6]]],note:"Intangibilité totale limitée à 5 minutes ; désactivée dans un obstacle solide, elle le propulse. Statut : vigilantisme."},
 "Kael":{ecole:"Wellston",taille:"179 cm (H)",type:"Creation",ability:"Dark Blades",nature:"—",rows:[[1.0,[1,1,1,1,1]],[5.2,[8,4,5,5,3]],[5.3,[8,4,5,5,3]]]},
 "Ramlethal Valentine":{ecole:"Agwin",taille:"167 cm (F)",type:"Detection",ability:"Scanner",nature:"Stratège",rows:[[1.4,[1,1,1,2,1]],[1.6,[1,1,1,2,1]]]},
 "Issei":{ecole:"Wellston",taille:"175 cm (H)",type:"Creation",ability:"Claws",nature:"Attaque",rows:[[1.5,[2,2,1,1,2]],[1.6,[2,2,1,1,2]]]},
 "Louis":{ecole:"Rowden",taille:"175 cm (H)",type:"Enhancement",ability:"Knuckles",nature:"—",rows:[[1.5,[2,1,1,1,1]],[1.6,[2,1,1,1,1]],[1.7,[2,1,1,1,1]]]},
 "Kaïra":{ecole:"Westview",taille:"162 cm (F)",type:"Creation",ability:"Blade",nature:"Attaque",rows:[[1.8,[2,1,1,1,1]],[1.9,[2,1,1,1,1]],[2.0,[2,1,1,1,1]],[2.1,[2,1,1,1,1]]]},
 "Leonie":{ecole:"Agwin",taille:"166 cm (F)",type:"Mental",ability:"Possession",nature:"Stratège",rows:[[2.4,[1,3,1,4,2]],[2.5,[1,3,1,4,2]]]},
 "Beta":{ecole:"Westview (Soigneur)",taille:"162 cm (F)",type:"Status",ability:"Sanity Control (Heal/Hurt/Bal)",nature:"Soutien / Attaque",rows:[[3.1,[3,3,3,3,4]],[3.2,[3,3,3,3,4]],[3.3,[3,3,3,3,4]],[3.4,[3,3,3,3,4]]],note:"Trois modes : Heal [2,3,4,3,3], Hurt [4,2,2,3,4], Balance [3,3,3,3,4]. Taux d'efficacité 96,8 % → 88,2 % de 3.1 à 3.4. Ligne affichée = mode Balance."},
 "Laura":{ecole:"Agwin",taille:"160 cm (F)",type:"Quantum",ability:"Liquids Manipulation",nature:"—",rows:[[3.5,[5,2,1,6,2]],[3.6,[5,2,1,6,2]]]},
 "Julia":{ecole:"Wellston",taille:"162 cm (F)",type:"Mental",ability:"Telepathy",nature:"Stratège",rows:[[4.4,[5,6,3,7,1]],[4.5,[5,6,3,7,1]]]},
 "Power":{ecole:"Westview",taille:"173 cm (F)",type:"Quantum",ability:"Graviton",nature:"—",rows:[[4.8,[6,5,2,7,3]],[4.9,[6,5,2,7,3]]]},
 "Soren":{ecole:"Wellston",taille:"175 cm (H)",type:"Creation",ability:"Crimson Thread",nature:"—",rows:[[4.8,[5,3,2,7,5]],[4.9,[5,3,2,7,5]]]},
 "Void":{ecole:"Vigilante",taille:"185 cm (H)",type:"Quantum",ability:"Ghost",nature:"—",rows:[[4.9,[3,3,5,7,6]]]},
 "Isen":{ecole:"Wellston (Jack)",taille:"183 cm (H)",type:"Enhancement",ability:"Hunter",nature:"Attaque",rows:[[4.8,[6,5,3,6,3]]]},
 "Rein":{ecole:"Agwin",taille:"~178 cm (F)",type:"Creation",ability:"Arachnid",nature:"Défense",rows:[[4.9,[4,6,2,4,4]]]},
 "Blyke":{ecole:"Wellston (Roi)",taille:"178 cm (H)",type:"Emission",ability:"Energy Discharge",nature:"Attaque",rows:[[5.0,[8,4,4,5,4]]],note:"Statuts : vigilantisme, distribution de substances illégales."},
 "Mitsu":{ecole:"Westview (Valet)",taille:"175 cm (H)",type:"Emission",ability:"Faucheuse Fantôme",nature:"—",rows:[[5.3,[6,3,3,8,4]],[5.4,[6,3,3,8,4]]]},
 "Ice":{ecole:"Westview (Reine)",taille:"162 cm (F)",type:"Quantum",ability:"Icicle",nature:"—",rows:[[5.5,[5,7,6,4,3]],[5.6,[5,7,6,4,3]]]},
 "Arlequin":{ecole:"Vigilante",taille:"170 cm (H)",type:"Meta",ability:"Aura Deity / Debt",nature:"Stratège",rows:[[6.0,[7,2,5,15,6]],[6.2,[1,1,1,15,1]],[6.7,[6,10,3,6,5]]],note:"Fiche Debt (6.7) identique à celle d'Isaure."},
 "Isaure":{ecole:"—",taille:"—",type:"Status",ability:"Debt",nature:"—",rows:[[6.7,[6,10,3,6,5]]]},
 "Vitalis":{ecole:"Vigilante",taille:"—",type:"Cure",ability:"Life Steal",nature:"—",rows:[[6.3,[6,4,11,5,2]]]},
 "Irene":{ecole:"Agwin (Reine)",taille:"168 cm (F)",type:"Emission",ability:"White Hole",nature:"—",rows:[[7.4,[7,12,4,9,3]]]},
 "Marc":{ecole:"Westview",taille:"175 cm (H)",type:"Enhancement",ability:"Modes (Bal/Atk/Def/Spd/Dst)",nature:"—",rows:[[8.6,[8,8,8,14,8]]],note:"Cinq modes : Atk [12,3,3,14,8], Def [3,12,8,14,3], Spd [3,3,3,14,14], Dst [14,3,3,14,3]."},
 "Keito":{ecole:"Rowden (Roi, ancien)",taille:"180 cm (H)",type:"Quantum",ability:"Death Fire",nature:"—",rows:[[8.8,[16,6,7,12,5]]],note:"Statuts : terrorisme, association avec Spectre."},
 "John":{ecole:"—",taille:"—",type:"Detection",ability:"Aura Manipulation",nature:"Stratège",rows:[[7.5,[1,1,1,16,1]]]},
 "Lucian Hale":{ecole:"Westview",taille:"175 cm (H)",type:"Enhancement",ability:"Pride",nature:"Attaque",rows:[[4.6,[6,3,5,7,1]],[4.7,[6,3,5,7,1]]]},
 "Adrien":{ecole:"Agwin (ancien élève)",taille:"183 cm (H)",type:"Quantum",ability:"Alchimie",nature:"—",rows:[[5.5,[7,4,3,9,3]]]},
 "Remi":{ecole:"Wellston (Reine)",taille:"165 cm (F)",type:"Quantum",ability:"Lightning",nature:"Attaque",rows:[[5.4,[7,3,4,4,6]]]}
}
};
