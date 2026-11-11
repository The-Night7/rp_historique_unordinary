// Fiches RP des autres personnages (Google Docs et sites liés dans la colonne « Reference » de l'unodex).
// FICHE_RP[nom] = { src, blocs: [[titre, texte], …] } ; FICHE_CHRONO[nom] = [[titre, quand, texte], …] pour les fiches qui racontent le RP.
(function () {
const C = window.CURATED;
C.FICHE_RP = {
 "Isaure": { src: "https://isaure-lazare.vercel.app/", blocs: [
  ["Identité", "Isaure Lazare, 17 ans, Rowden, God Tier 6.7, potentiel Exo-god 9.9. Devise : « Elle rend toujours ce qu'on lui donne. »"],
  ["Comportement", "Calme, polie, presque trop. Elle tient des comptes sur tout (un service, une insulte, un coup) et ne supporte pas de devoir quoi que ce soit à personne. En combat elle ne frappe jamais la première et laisse l'autre s'engager. Elle prévient avant d'agir. Forte en biochimie : elle étudie les capacités et ce qu'elles demandent au corps."],
  ["Pouvoir : Dette", "Elle transforme les coups reçus en dettes. Le coup est mis en suspens dans son aura, grossit avec des intérêts (écart de niveau × 0,5 par tour, +0,5 toutes les 9 h hors combat) puis elle le rend en entier au contact, avec pour Power le montant de la dette. 16 comptes ouverts en même temps au God Tier, plafond de 25 par créancier. Une dette ne se rembourse qu'à son créancier."],
  ["Stats", "Power 6 · Defense 10 · Recovery 3 (+1,5 avec 3 créanciers) · Trick 6 · Speed 5. Passif (niv. 5.0) : elle récupère plus vite selon le nombre de créanciers."],
  ["Registre en direct", "Sa fiche affiche trois créanciers : Random (niv. 3,7, ouverte le 20 oct.), Farrah (6,5, le 25 oct. à 1 h, la nuit de Branish) et Valérie (7,5, le 3 nov., la nuit du quartier low-tier)."],
  ["Aura et physique", "Ambre sombre presque cuivre : à chaque coup emprunté, de fines lignes lumineuses « écrites dans un registre » s'inscrivent sur sa peau et s'effacent au remboursement. Cheveux noirs courts à reflets bleutés, yeux noirs reflet cuivre, un livre à la main où elle note ses comptes."],
  ["Histoire", "Père ruiné au jeu : toute son enfance, des gens sont venus réclamer ce qu'on leur devait, et c'est souvent elle qui ouvrait. Sa capacité s'est éveillée le soir où l'un d'eux a levé la main sur elle : le coup n'a rien fait, et l'homme l'a repris en pleine figure. Elle rembourse encore les dettes de son père. Son niveau lui a ouvert Rowden avec une bourse, où elle découvre qu'une God Tier n'a en théorie de comptes à rendre à personne, ce qu'elle n'aime pas."]
 ] },
 "Lucina": { src: "https://docs.google.com/document/d/19va5De-jDkUA-LKT9YRGGOm9Cvcvpg4t0Uenk4XnXHo/edit", blocs: [
  ["Identité", "Lucina Arneb, 16 ans, « la manipulatrice », Westview (première), née à Wellston, anniversaire le 27/10, 1 m 45. Niveau 5.2, potentiel 7.8."],
  ["Capacité : God's Mind", "Elle lit, manipule et perturbe l'esprit d'un adversaire qu'elle voit : pression mentale, lecture des pensées et de la mémoire, liaison de pensées, hallucinations (Imaginary control), isolation mentale, parasite, Void spirit (5.0+), Capacity Eraser (6.5). Passif : immunité aux capacités mentales (5.0), détection de leur usage (5.5), des personnes sous influence (6.0). Stats : Puissance 4, Speed 3, Ruse 9, Régénération 5, Défense 3."],
  ["Caractère", "Pragmatique et stratège, froide avec l'extérieur, loyale et protectrice envers un cercle restreint. Respect institutionnel pour le système royal de Westview, mépris des royaux des autres écoles, opposée par principe aux vigilantes."],
  ["Relations", "Telemachus (« Machus », ami d'enfance, peut-être plus : elle ignore ses sentiments) et Ice, la reine, qu'elle estime sincèrement depuis leur entraînement."],
  ["Arc après l'attaque", "Depuis la perte de sa capacité et face au dévouement des royaux de Wellston pour protéger les plus démunis de l'attaque de Spectre, sa vision change : la hiérarchie n'est plus un système infaillible, et les plus faibles deviennent de « véritables personnes », plus des êtres bons à manipuler. Elle ne veut plus utiliser le peu de capacité qui lui reste pour son propre intérêt mais pour aider ceux qui risquent le même sort, et s'en veut d'avoir cru que seuls les plus forts valaient la peine d'exister."],
  ["Histoire", "Fille unique de deux agents du gouvernement, élevée dans la doctrine des Autorités. Capacité de sa mère manifestée à 4 ans. Destinée à Wellston High, elle a refusé son admission pour suivre ses parents mutés et s'est retrouvée à Westview."]
 ] },
 "Beta": { src: "https://docs.google.com/document/d/1lH5-XMqGgYgcNM1Qyq2O22JhzxeK3YAO3RrBzN0HufE/edit", blocs: [
  ["Identité", "Beta, 16 ans et 7 mois, Westview. Niveau 3.1 (Mid), potentiel 5.8, aura bleu violet."],
  ["Double personnalité", "Bipolarité qui se décrit mieux comme une double personnalité. 1re : amicale, enfantine, douce, taquine, naïve (bleue). 2e : voix plus profonde, agressive, arrogante, sérieuse, prête à blesser (violette)."],
  ["Capacité : Sanity Control", "Elle régule ou perturbe l'équilibre psychophysique d'une personne à travers son aura. Soin sous la 1re personnalité (petites blessures sans problème, grosses blessures lentement), blessures internes à 5 m sous la 2e. Les deux facettes, normalement réunies, sont séparées sur ses deux personnalités. Passif (5.0) : sentir les auras des personnes blessées."],
  ["Stats", "1re personnalité : Speed 3, Power 2, Defense 3, Recovery 4, Trick 3. 2e : Speed 4, Power 4, Defense 2, Recovery 2, Trick 3."],
  ["Histoire", "Attaque terroriste sur son collège : elle a tenté en vain de soigner un blessé et a attiré un agresseur, sauvée de justesse par Rin. 3 semaines d'hôpital, vide d'émotions, 6 mois pour se remettre en apparence, puis un diagnostic de bipolarité. Son traumatisme a aussi bloqué sa capacité : sa personnalité douce fuit son trauma et ne peut que soigner, sa personnalité agressive le combat et ne peut que blesser. Tant qu'elle n'aura pas surmonté son traumatisme, elle ne pourra pas réutiliser sa capacité comme à l'origine."]
 ] },
 "Hizo Vertini": { src: "https://docs.google.com/document/d/1NfbaffOxFh9Fiv8q2vHpSmHP2mLkAhzYQKfXWAJrxf4/edit", blocs: [
  ["Identité", "Hizo Vertini, 17 ans, élève d'Agwin, niveau 4.8, capacité Spectre, nom de justicier Void (« Le Fantôme des USA »)."],
  ["Rêve", "Devenir un symbole d'espoir, celui dont la présence rassure : « bâtir un monde où personne n'aura à souffrir comme lui a souffert ». Très discipliné, entraînements avant l'aube."],
  ["Capacité : Spectre", "Intangibilité par altération extrême de la fréquence vibratoire de son corps : rien ne l'atteint, mais il ne voit, n'entend ni ne respire plus (5 minutes maximum). Désactiver Spectre à l'intérieur d'un solide l'expulse à grande vitesse, il s'en sert pour se déplacer et attaquer."],
  ["Histoire", "Né à New York dans une branche des Vertini en guerre interne. À huit ans, des membres de la branche rivale tuent son père et son grand frère Damian pendant que sa mère Emily protège les deux plus jeunes. Une enfance de deuil et de lutte qui forge sa volonté."],
  ["Physique", "1 m 85, cheveux et yeux vert sombre, quatre taches de rousseur en losange, corps couvert de cicatrices dont deux sur le visage."]
 ] },
 "Power": { src: "https://docs.google.com/document/d/1S2Dol6hi5fX252Oklghjm67KPcBjUeIkaDPJjyvReTI/edit", blocs: [
  ["Identité", "Power Chisio, 16 ans, Westview, niveau 4.8, potentiel 10.0 (Exo God Tier), aura jaune dorée."],
  ["Caractère", "Charismatique, redoutée, tyrannique. Elle méprise les Impotents et croit véritablement au droit naturel des puissants à gouverner les faibles : pour elle ce n'est pas de la cruauté gratuite mais l'ordre naturel des choses."],
  ["Capacité : Graviton", "Manipulation de la gravité locale sur environ huit mètres : alourdir un adversaire, alléger son propre poids pour bondir, champs gravitationnels pour détourner un projectile. Elle exige ligne de vue, précision mentale et endurance nerveuse. Passif : sensibilité gravitationnelle accrue."],
  ["Stats", "Power 6 · Défense 5 · Recovery 2 · Trick 7 · Speed 3."],
  ["Histoire", "Lignée High Tier : père CEO God Tier (6.6), mère maîtresse d'un pouvoir de destruction (5.8). Enfance rythmée par des duels organisés par ses parents contre d'autres enfants de la haute société. Cette pression et les humiliations des échecs font naître sa rage et son mépris des plus faibles. À Westview, elle reproduit la hiérarchie familiale."]
 ] },
 "Rin": { src: "https://docs.google.com/document/d/192k-K5RskpKYFBuIQ9mChcaJXD4g_vck4JydeWOlj0Y/edit", blocs: [
  ["Identité", "Rin Tohsaka, 16 ans et 8 mois, Westview, niveau Élite Tier."],
  ["Capacité : Éclipse d'ombre", "Se cacher et créer des illusions dans l'ombre, se déplacer d'ombre en ombre sur environ 10 m, former de petits objets inanimés. Passif (5.0) : Ombres Sentinelles, elle perçoit les émotions et intentions des autres à travers leurs ombres, ce qui peut être un fardeau émotionnel."],
  ["Caractère", "Réservée, prudente, protectrice et loyale avec ses proches, parfois imprévisible : ses ombres s'activent quand elle est stressée."],
  ["Beta", "Amie d'enfance de Beta, avec qui elle a fait le collège. Elle l'a sauvée de l'attaque terroriste, et fait partie des rares personnes capables de la calmer pendant ses crises."]
 ] },
 "Laura": { src: "https://docs.google.com/document/d/1poJ9DIJHwp6E4cqxgez8ErLyBKkEGN8Z7WO67Soz7N4/edit", blocs: [
  ["Identité", "Laura Arsaut, 16 ans, 1 m 60, Agwin. Niveau 3.5, potentiel 9.5, aura de la couleur bleue de ses yeux."],
  ["Capacité : Manipulation des liquides", "Dans un rayon de 30 m, mais elle ne crée rien : elle utilise un liquide à portée (toujours une bouteille d'eau). À plus haut niveau, le sang et l'humidité de l'air, et à son maximum la maîtrise des fluides. Passif non débloqué : sentir les corps (composés d'eau) autour d'elle."],
  ["Stats", "Power 5 · Defense 2 · Recovery 1 · Trick 6 · Speed 2."],
  ["Histoire", "Famille modeste de la campagne. Opposée au système des tiers : son grand frère en a été victime, harcelé, il vit reclus. Elle baisse la tête devant les tiers les plus hauts mais ne participe pas aux brimades."]
 ] },
 "Lucian Hale": { src: "https://docs.google.com/document/d/13dXO2_CJHjxc6leu1R9ct9RAO3A_3BTA1TBPi08Q0A8/edit", blocs: [
  ["Identité", "Lucian Hale, alias Red Hood, 18 ans, Westview. Niveau 4.6, potentiel 5.8, aura d'or incandescent."],
  ["Capacité : Orgueil (Pride Manifestation)", "Sa puissance grandit avec son ego : défi, combat ou provocation renforcent Power, Speed et Recovery, mais il perd le contrôle émotionnel et met ses alliés en danger. Forme « Orgueil absolu » limitée à 2 tours. Passif « Refus de soumission »."],
  ["Rôle", "Stratège des justiciers de Wellston, il déteste l'injustice et méprise ceux qui abusent de leur pouvoir. Sa fierté l'empêche de fuir un combat."],
  ["Histoire", "Né dans une famille de haut rang dont il a rejeté les idéaux. Il joue d'abord la hiérarchie à Westview avant d'en voir la corruption. Quand un ami faible est hospitalisé pour avoir défié un High Tier, il jure de ne plus se taire et fonde un petit groupe de justiciers clandestins. Derrière l'arrogance : un cœur brisé par la trahison et la culpabilité."]
 ] },
 "Mitsu": { src: "https://docs.google.com/document/d/14ocLUb2X5F3VQ1bhcpNlDGCgAOS88HEKp2xP45ptqWo/edit", blocs: [
  ["Identité", "Mitsu, 15 ans, Westview (1re année). Niveau 5.5, potentiel 7.0, aura d'un blanc presque pur avec une fumée spectrale."],
  ["Capacité : Faucheur Fantomatique", "Une faux qui peut être intangible ou tangible. Si elle touche quelqu'un dont la capacité est active, la « marque hantée » déstabilise la capacité de l'adversaire (plus difficile à contrôler ou moins efficace), utile contre les hauts niveaux. Passif : rapidité accrue et présence discrète."],
  ["Caractère", "Calme, rationnel, gentil, peu bavard ; déterminé à monter dans la hiérarchie mais n'aime pas se battre et s'interpose face à l'injustice."],
  ["Histoire", "Faux héritée de son père, Fantôme de sa mère. Entraîné par ses parents depuis l'éveil au collège. Hospitalisé avant son arrivée au lycée : cette maladie l'a traumatisé et rendu plus distant."]
 ] },
 "Adrien": { src: "https://docs.google.com/document/d/1gPF-rW8nZ39wzODpDmCRE6eDqNFh3N8rtQqgESbsXsI/edit", blocs: [
  ["Identité", "Adrien, 25 ans, 1 m 83, affilié à EMBER, homme d'affaires et chercheur. Niveau 5.5, potentiel 6.8, aura dorée orangée."],
  ["Capacité : Alchimie", "Il transforme la matière à partir d'une matière de base avec son aura. Passif : analyse de matière au toucher. Il a reçu artificiellement de nouvelles capacités lors d'expériences secrètes, connues des seuls membres d'EMBER. Stats : Power 7, Defense 4, Recovery 3, Trick 9, Speed 3."],
  ["Rôle dans EMBER", "Héritier d'une immense fortune, il finance secrètement les laboratoires et les recherches d'EMBER. Membre expérimenté de l'unité anti-terroriste depuis ses 21 ans, il sert officiellement d'homme d'affaires et investisseur. Objectif : permettre à EMBER de devenir assez puissant pour contrôler l'évolution de la société."]
 ] },
 "Ramlethal Valentine": { src: "https://docs.google.com/document/d/1QV4m1LeM2aSghTOULf_ZJdHnEI-w07SO80T_KR-aWK8/edit", blocs: [
  ["Identité", "Ramlethal Valentine, 16 ans, Agwin. Niveau 1.4 (Low Tier), potentiel 5.7, aura vert jade."],
  ["Capacité : Scanner", "Elle scanne la structure énergétique d'une personne : nom et catégorie de la capacité au niveau actuel, puis niveau, statistiques et faiblesses à mesure qu'elle monte. En version médicale : radiographie vivante des blessures, qu'elle transmet au médecin de l'école. Elle ne soigne pas. Passif : conscience spatiale à 360°, à travers les murs sur 10 m."],
  ["Caractère", "Apathie sévère, mécanisme de défense : elle ne ressent ni colère ni tristesse, hormis une obsession pour les burgers."],
  ["Histoire", "Dernière d'une fratrie de Mid Tiers, bloquée à 1.4, rabaissée par ses parents et harcelée par ses frères et sœurs. À Agwin, elle passe son temps à l'infirmerie, où le médecin utilise son Scanner."]
 ] },
 "Hécate": { src: "https://docs.google.com/document/d/18hgvXKR-ueko0l8QfepzwJb7wU-k6NZfNsCrPYlA_Ps/edit", blocs: [
  ["Identité", "Hécate Häyhä, 16 ans, 1 m 69, Agwin. Niveau 1,2, potentiel 3,5. Capacité : Tir concentré (boule d'énergie, une dizaine de mètres, 2 tirs d'affilée). Discret, aime la poésie, la nature et la musique, bienveillant."]
 ] },
 "Marc": { src: "https://marcmarquez.vercel.app/", blocs: [
  ["Identité", "Marc Marquez, 17 ans, Westview, niveau 8.6, potentiel 10.0, aura blanche. Capacité : Phase_Shift (modes Équilibré, Offensif, Défensif, Vélocité, Destructeur). Passif Scanner : détecte les deux meilleures statistiques d'une cible."],
  ["Stats", "Power 8 · Defense 8 · Speed 8 · Recovery 8 · Trick 14. Toute statistique au-delà de 14 provoque une instabilité psychomotrice : il cherche à reprogrammer ce verrou (« la clé »)."],
  ["Caractère", "Discret, humour sec, intensément protecteur en confiance. L'injustice ou le rabaissement d'un camarade le fait basculer en mode offensif par réflexe. Il se surmène."],
  ["Chronique", "Éveil à 7 ans (un drone recyclé qui l'aurait percuté), il découvre à 9 ans que ses modes sont une interface paramétrable, installe un labo clandestin au sous-sol de Westview, survit à un effondrement de plafond en enchaînant quatre modes en moins de 3 secondes, et travaille à un langage de programmation personnel pour coder de nouvelles formes sans crash. Carnet #15 : le métal liquide stocke 65 % de son aura."]
 ] },
 "Marie": { src: "https://marie-une.vercel.app/", blocs: [
  ["Identité", "Marie Sue, 15 ans, Westview puis Agwin puis Wellston. Atteinte d'insensibilité congénitale à la douleur (CIPA)."],
  ["Capacité", "Aura de Vérité, pas encore débloquée : en sa présence, impossible de mentir. Passif (5.0) : ses yeux s'éclairent quand une aura puissante est proche. Stats à 1 partout."],
  ["Caractère", "Discrète, observatrice, fort complexe d'infériorité face aux élèves de badge plus haut, mais une fierté têtue et une vraie perspicacité."]
 ] },
 "Kaito Vance": { src: "https://the-night7.github.io/digital-bugs-uno/index.html", blocs: [
  ["Identité", "Kaito Vance, 21 ans, avocat dirigeant le cabinet Vance & Associés, High Tier 5.8 (potentiel de contrôle 58 %), QI mesuré à 400, 1 m 75."],
  ["Capacité : Digital Hive", "Il matérialise un deck de cartes (Programmes, Archives Noires, Scripts, Protocoles) qui se débloquent par palier de niveau, invoque des créatures et structures, se régénère par scripts de réparation et pirate les systèmes connectés. Fusion d'insectes pour des formes évoluées. Passif : Network Sense, il perçoit les appareils électroniques actifs dans un rayon de 50 m. Stats : Power 8, Defense 6, Speed 6, Recovery 3, Trick 10."],
  ["Caractère", "Avocat charismatique et brillant, il garde un amour de jeunesse pour la magie de scène et utilise des métaphores d'illusionniste au tribunal. Icthyophobie (peur extrême des poissons)."]
 ] }
};

// Chroniques RP racontées par la fiche elle-même
C.FICHE_CHRONO = C.FICHE_CHRONO || {};
C.FICHE_CHRONO["Isaure"] = [
 ["La plage de Westview", "jour de la sortie", "Isaure reste sur le sable avec Telemachus, Remi, Morgane, Rein, Louis et Keito. Elle va voir Louis, qui dessinait le groupe et la supplie de ne pas le frapper : « Je ne compte pas te frapper. Je suis juste curieuse. » Une onde divise les capacités par deux, Keito (8,8) se lève et les trahit, un cercle de flammes bleues enferme le groupe et une impulsion coupe les téléphones."],
 ["Isaure tient les tireurs", "jour de la sortie", "Telemachus lui confie les plus faibles. Elle immobilise un agresseur mais son toucher l'endort. Réveillée, oubliée de tous, elle met les tireurs hors d'état un par un. Keito plante une seringue dans le cou de Rein, Telemachus se rend pour épargner les autres, Isaure prend une balle dans la jambe en courant vers Rein. Quand la police arrive, elle est partie, « un certain objet » au fond de la poche."],
 ["Le téléphone qui n'était pas le sien", "le lendemain", "Elle percute Beta dans une rue de Westview. Son téléphone ne s'ouvre plus : c'est celui de Telemachus, échangé pendant le combat (il sonne sous le nom « Ma Circe », Lucina). Au centre commercial, Beta la guide ; elles parlent de Power, que Beta refuse qu'Isaure « occupe ». Elles échangent leurs numéros."],
 ["Le roi des fées", "le même jour", "Elle écrit à Telemachus : « Je sais pour ton petit passe-temps. Le roi des fées, c'est toi. » Elle a cloné son téléphone et vu les photos, elle veut en être. Il demande son adresse : « Tu recevras le nécessaire. Ne parle jamais sous le casque. Supprime cet échange. » Le soir, elle déballe un colis et sourit."],
 ["Arlequin à Branish", "le lendemain soir", "Vitalis vient de chasser des amplifiés quand Fury, agente d'EMBER, la lacère. Arlequin, une dague dans le dos de Fury, se met entre elles, prend les coups à la place de Vitalis « dette après dette », puis rembourse d'un poing de Power 20,2 que Fury esquive. Elle se présente sur une ardoise : membre des Arlequins, qui portent tous la même tenue pour brouiller les pistes."],
 ["Le sac lourd", "les jours suivants", "Elle s'entraîne à encaisser plutôt qu'à frapper : « Speed 5. Je ne gagnerai jamais à la course. Alors je n'ai pas besoin de courir. »"],
 ["Beta à l'appartement", "quelques jours plus tard", "Beta la soigne et sent toutes les blessures de Branish. Isaure parle d'une mauvaise rencontre. À l'occasion du thé, elle propose les collines puis la patinoire « pour un prochain date »."],
 ["La colline de Rowden", "le même jour", "Elle avoue à Beta ce qu'elle fait la nuit : aider les plus démunis dans des quartiers comme Branish, avec les Arlequins, sans jamais montrer sa capacité. Beta promet le secret. Elles regardent le coucher du soleil, tête contre tête."],
 ["Un troisième date", "le même soir", "Chez Isaure : repas préparé ensemble, vaisselle, carnet où elle consigne ses journées. « Comment pourrais-je te demander un troisième date si tu es en train de dormir ? »"],
 ["Sur le toit, Arlequin attend", "une nuit, quartier low-tier", "Marek, Odile, Sibyl et Tiago occupent une ruelle. Sur un autre toit, Arlequin attend, « prête à descendre au premier mouvement ». Vitalis leur propose de se rendre ; Arlequin atterrit derrière le groupe. Le combat ne fait que commencer."]
];
C.FICHE_CHRONO["Lucina"] = [
 ["L'entraînement inter-écoles", "août", "Lucina peine à trouver le lieu, Telemachus le lui rappelle. Elle se range avec lui au corps à corps. Il affronte Issei ; elle affronte Ice, la reine, sans utiliser sa capacité (time skip, pas de résultat)."],
 ["Le week-end du Coin Tranquille", "20 octobre", "Invitée avec Telemachus à un week-end organisé par le Coin Tranquille de Wellston. Camarade de chambre : Kiara. Le lendemain, trois groupes : le sien fait la randonnée avec Hizo, Arlo, Blyke, Isen, Beta et Julia."],
 ["L'attaque de la randonnée", "20-21 octobre", "Des ravisseurs connaissent leur trajet et les attaquent, affaiblis par un frisson qui réduit leur capacité de moitié (la sienne tombe à 2.7). Elle connecte ses pensées à celles de Blyke et d'Arlo pour qu'ils communiquent, ce qui lui donne une forte migraine. Un ravisseur téléporteur lui injecte un produit inconnu."],
 ["Le réveil chez Spectre", "21-22 octobre", "Réveil nauséeux, elle vomit. Avec elle : Telemachus, Rein et Kael. Sa capacité ne répond plus à sa volonté. Orrin propose de la rendre contre un service."],
 ["La bibliothèque et Ice", "après l'attaque", "Elle cherche des cas similaires. Elle y rencontre Ice, inquiète, et lui propose un entraînement pour lui montrer qu'elle n'a rien : elle esquive facilement, son vrai but est de rendre Ice imprévisible. Elles terminent en amies et sortent boire au centre-ville."]
];
})();
