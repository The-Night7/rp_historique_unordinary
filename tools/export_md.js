const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),site=path.join(root,'site'),out=path.join(root,'personnages');
global.window={};
for(const f of ['data.js','curated.js','curated2.js','curated3.js','curated4.js','curated5.js','curated6.js','curated7.js'])eval(fs.readFileSync(path.join(site,f),'utf8'));
const S=window.STATS,C=window.CURATED;
const fd=d=>{const [y,m,j]=d.split('-');return `${+j}/${m}`};
const fdr=(a,b)=>b&&b!==a?`${fd(a)} → ${fd(b)}`:fd(a);
const slug=n=>n.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const kind={combat:'Combat',rencontre:'Rencontre',plot:'Intrigue',vigilante:'Justiciers',lien:'Lien',tournant:'Tournant',ecole:'École'};
const STATN=['Power','Defense','Recovery','Trick','Speed'];
const files=[];
const arlequin=(only)=>{
  const c=S.chars['Arlequin'],f=C.FICHES['Arlequin'],a=C.ARCS['Arlequin'];
  const ATT='2026-10-20',JOIN='2026-10-24',LT='2026-10-31';
  const isJoin=e=>e.d===JOIN&&/Isaure/.test(e.t);
  const evsAll=C.EVENTS.filter(e=>(e.c||[]).includes('Arlequin')).sort((x,y)=>x.d<y.d?-1:1);
  const T={ev:evsAll.filter(e=>e.d<ATT||e.d>=LT),sc:c.scenes.filter(x=>x[0]<ATT||x[0]>=LT),bt:a.beats.filter(b=>b[0]<ATT||b[0]>=LT),rows:f.rows.filter(r=>r[0]<6.5)};
  const I={ev:evsAll.filter(e=>isJoin(e)||e.d>=ATT&&e.d!==JOIN||e.d===JOIN&&!isJoin(e)&&false),sc:c.scenes.filter(x=>x[0]>=ATT),bt:a.beats.filter(b=>b[0]>=JOIN||(b[0]>=ATT&&b[0]<LT)),rows:f.rows.filter(r=>r[0]>=6.5)};
  I.ev=evsAll.filter(e=>isJoin(e)||e.d>=ATT);
  const L=['# Arlequin','',`${c.msgs} messages · du ${fd(c.first)} au ${fd(c.last)} · ${c.scenes.length} scènes (pseudo unique dans les logs)`,'',`**${a.title}** — ${a.tag}`,'',a.summary,'',
   '> Arlequin est un masque partagé. Les logs gardent le pseudo « Arlequin » ; le récit (pronoms « il » / « elle ») et la capacité utilisée (copies pour Telemachus, dettes pour Isaure) permettent de les distinguer. Les scènes du 31 octobre au 3 novembre (quartier low-tier) comptent pour les deux : « il » le 2 novembre, « elle » le 3.',''];
  const part=(title,img,who,sec,extra)=>{
    L.push(`# ${title}`,'');
    L.push(`- Image : ${img}`,`- ${extra}`,`- ${sec.sc.length} scènes, ${sec.sc.reduce((t,x)=>t+x[3],0)} messages`,'');
    L.push('## Fiche (unodex)','',`- École : ${f.ecole}`,`- Taille : ${f.taille}`,`- Type : ${f.type}`,'');
    if(sec.rows.length){L.push('| Niveau | '+STATN.join(' | ')+' |','|---|'+STATN.map(()=>'---|').join(''));sec.rows.forEach(r=>L.push(`| ${r[0].toFixed(1)} | ${r[1].join(' | ')} |`));L.push('');}
    if(sec.bt.length){const t={arc:'Arc',evo:'Évolution',fight:'Combat',bond:'Lien',plot:'Intrigue'};L.push('## Repères de parcours','');sec.bt.forEach(b=>L.push(`- ${fd(b[0])} · ${t[b[1]]||b[1]} : ${b[2]}`));L.push('');}
    L.push('## Événements','');sec.ev.forEach(e=>L.push(`- **${fdr(e.d,e.e)} · ${e.t}** (${kind[e.k]||e.k}${e.p?' · '+e.p:''}) : ${e.s}`));L.push('');
    const pm={},pl={};sec.sc.forEach(x=>{pl[x[1]]=(pl[x[1]]||0)+1;x[4].forEach(n=>{if(n!=='Arlequin')pm[n]=(pm[n]||0)+1;});});
    const top=o=>Object.entries(o).sort((p,q)=>q[1]-p[1]).slice(0,6);
    L.push('## Partenaires de scène (scènes en commun)','');top(pm).forEach(p=>L.push(`- ${p[0]} : ${p[1]}`));L.push('','## Lieux (scènes)','');top(pl).forEach(p=>L.push(`- ${p[0]} : ${p[1]}`));L.push('');
  };
  if(only==='I'){L.length=0;part('Isaure sous le masque d\'Arlequin','fille (cdn.tupperbox.app/…/dg8EB-E7Elp31OOl.webp)','I',I,'Capacité : Debt (niveau 6.7). Arlequin garçon (Telemachus) : voir telemachus.md et arlequin.md. Ici : ce qu\'Isaure fait sous le masque, du 24 octobre au 3 novembre (Branish : « elle », dettes remboursées ; quartier low-tier : « elle souffle »).');return L.join('\n');}
  part('Sous le masque : Telemachus','garçon (cdn.tupperbox.app/…/3pqyKj1WiFubpFIJ.webp)','T',T,'Capacité : Aura Deity (copie au toucher). Du 27 août au 7 octobre, puis le 2 novembre (« il encaisse et ne tombe pas »).');
  part('Sous le masque : Isaure','fille (cdn.tupperbox.app/…/dg8EB-E7Elp31OOl.webp)','I',I,'Capacité : Debt = Isaure (niveau 6.7). Rejoint Arlequin le 24 octobre ; Branish (« elle », dettes remboursées) ; quartier low-tier le 3 novembre (« elle souffle »). Fiche complète : isaure.md');
  L.push('# Mystères','');(C.MYSTERIES||[]).filter(m=>(m.pp||[]).includes('Arlequin')).forEach(m=>L.push(`- ${m.t} (${m.st})`));L.push('');
  return L.join('\n');
};
for(const [name,c] of Object.entries(S.chars).sort((a,b)=>b[1].msgs-a[1].msgs)){
  if(name==='Arlequin'){const fn=slug(name)+'.md';fs.writeFileSync(path.join(out,fn),arlequin());files.push([name,fn,c.msgs]);continue;}
  const L=[];const f=C.FICHES[name],a=C.ARCS[name];
  L.push(`# ${name}`,'');
  L.push(`${c.msgs} messages · du ${fd(c.first)} au ${fd(c.last)} · ${c.scenes.length} scènes`,'');
  if(a){L.push(`**${a.title}** — ${a.tag||''}`,'',a.summary,'');}
  if(f){L.push('## Fiche (unodex)','',`- École : ${f.ecole}`,`- Taille : ${f.taille}`,`- Type : ${f.type}`,`- Capacité : ${f.ability}`,`- Nature : ${f.nature}`);
    if(f.note)L.push('',f.note);
    if(f.rows&&f.rows.length){L.push('','| Niveau | '+STATN.join(' | ')+' |','|---|'+STATN.map(()=> '---|').join(''));f.rows.forEach(r=>L.push(`| ${r[0].toFixed(1)} | ${r[1].join(' | ')} |`));}
    L.push('');}
  const tr=(C.TRACKER||[]).find(t=>t.n.trim()===name);
  if(tr)L.push('## Après l\'attaque de Spectre','',`- Effet subi : ${tr.eff}`,`- Capacité : **${tr.st}**`,`- Récupération : ${tr.rec}`,'');
  if(C.DEBLOCAGE&&C.DEBLOCAGE[name]){L.push('## Récupération de la capacité (estimation)','');C.DEBLOCAGE[name].forEach(p=>L.push(`- ${fd(p[0])} : ${p[1]===p[2]?p[1]+' %':p[1]+'–'+p[2]+' %'} — ${p[3]}`));L.push('');}
  if(C.FICHE_RP&&C.FICHE_RP[name]){L.push('## Sa fiche RP','');C.FICHE_RP[name].blocs.forEach(b=>L.push(`- **${b[0]}** : ${b[1]}`));L.push('',`Source : ${C.FICHE_RP[name].src}`,'');}
  if(C.FICHE_CHRONO&&C.FICHE_CHRONO[name]){L.push('## Chronologie de sa fiche','');C.FICHE_CHRONO[name].forEach(x=>L.push(`- **${x[0]}** (${x[1]}) : ${x[2]}`));L.push('');}
  if(a&&a.beats&&a.beats.length){const t={arc:'Arc',evo:'Évolution',fight:'Combat',bond:'Lien',plot:'Intrigue'};L.push('## Repères de parcours','');a.beats.forEach(b=>L.push(`- ${fd(b[0])} · ${t[b[1]]||b[1]} : ${b[2]}`));L.push('');}
  const evs=C.EVENTS.filter(e=>(e.c||[]).includes(name)).sort((x,y)=>x.d<y.d?-1:1);
  if(evs.length){L.push('## Événements','');evs.forEach(e=>L.push(`- **${fdr(e.d,e.e)} · ${e.t}** (${kind[e.k]||e.k}${e.p?' · '+e.p:''}) : ${e.s}`));L.push('');}
  const ms=(C.MYSTERIES||[]).filter(m=>(m.pp||[]).includes(name));
  if(ms.length){L.push('## Mystères liés','');ms.forEach(m=>L.push(`- ${m.t} (${m.st})`));L.push('');}
  if(c.partners.length){L.push('## Partenaires de scène (messages échangés)','');c.partners.slice(0,8).forEach(p=>L.push(`- ${p[0]} : ${p[1]}`));L.push('');}
  if(c.places.length){L.push('## Lieux (messages)','');c.places.slice(0,6).forEach(p=>L.push(`- ${p[0]} : ${p[1]}`));L.push('');}
  if(name==='Isaure'){L.unshift('> Ce fichier sépare Isaure sous son propre nom (en haut) et Isaure sous le masque d\'Arlequin (en bas).','');L.push('',arlequin('I'));}
  const fn=slug(name)+'.md';fs.writeFileSync(path.join(out,fn),L.join('\n'));files.push([name,fn,c.msgs]);
}
const I=['# Personnages','','Un fichier lisible par personnage, généré à partir des données du site (`site/data.js`, `site/curated*.js`). Ne pas modifier à la main : les corrections se font dans les fichiers `curated*.js`.','','| Personnage | Messages |','|---|---|'];
files.forEach(([n,f,m])=>I.push(`| [${n}](${f}) | ${m} |`));
fs.writeFileSync(path.join(out,'README.md'),I.join('\n')+'\n');
console.log(files.length,'fichiers');
