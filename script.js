"use strict";
/* Little Kitchen - steps: t=prep taps [t,label,taps,sfx]  c=cook [c,label,mode(0 none,1 flip,2 stir x3),speed,sfx]  p=plate */
const T=(l,n,s)=>["t",l,n,s],C=(l,m,k)=>["c",l,m||0,k||1],P=["p"];
const R=[
["Tomato Toast","rect",["#e9d3a3","#d9a24a","#2a190a","#d6352b"],[T("Chop the tomato",5,"chop"),T("Season with salt",2,"pour"),C("Toast the bread"),P]],
["Sunny Egg Toast","rect",["#efe2c0","#d9a24a","#2a190a","#f6b81c"],[T("Crack the egg",2,"crack"),C("Fry the egg"),C("Toast the bread"),P]],
["Cheesy Potato Bites","strip",["#ecd88f","#d9a02e","#2a190a","#f6c945"],[T("Cut the potatoes",6,"chop"),T("Season",2,"pour"),C("Fry until golden",1),T("Add cheese",3,"pour"),P]],
["Berry Pancakes","disc",["#f1e0b3","#d89a45","#2a190a","#7a1f5c"],[T("Mix flour, milk, egg",6,"mix"),C("Cook the pancake",1),T("Add berries",3,"pour"),P]],
["Tomato Cheese Pizza","disc",["#f0dcb0","#d9a24a","#2a190a","#c8281e"],[T("Stretch the dough",5,"mix"),T("Spread sauce",3,"pour"),T("Add cheese",3,"pour"),C("Bake in the oven",0,1.1),P]],
["Creamy Mushroom Pasta","bowl",["#efe0a0","#e6c26a","#3a230c","#b08a64"],[T("Slice mushrooms",5,"chop"),C("Saute mushrooms"),C("Cook the pasta",0,1.1),C("Stir the cream sauce",2),P]],
["Chicken Skewers","strip",["#f0cfb0","#c98a4a","#24150a","#e9c46a"],[T("Cut the chicken",5,"chop"),T("Season",2,"pour"),C("Grill and turn",1,1.1),P]],
["Garlic Butter Prawns","strip",["#f2a58f","#e8643f","#3a1a0c","#3c8a3c"],[T("Peel the prawns",4,"crack"),T("Chop the garlic",4,"chop"),C("Melt butter, saute",1,1.2),T("Add herbs",2,"pour"),P]],
["Beef Burger","disc",["#b5655a","#7a4325","#1c0e06","#e8b923"],[T("Shape the patty",5,"mix"),C("Cook the patty",1,1.2),C("Toast the bun"),T("Assemble",4,"plate"),P]],
["Fried Rice","bowl",["#f3ecd5","#d7a850","#2b1a0a","#4f9a3a"],[T("Chop vegetables",5,"chop"),C("Scramble the egg",2),C("Stir-fry the rice",2,1.2),P]],
["Fish and Chips","strip",["#e6cfa5","#d99a3a","#2a190a","#f2e9c8"],[T("Cut the potatoes",5,"chop"),T("Coat the fish",3,"pour"),C("Fry the fish",1,1.2),C("Fry the chips",0,1.2),P]],
["Chicken Alfredo","bowl",["#f2e8c0","#ecd38a","#3a230c","#c98a4a"],[T("Cut the chicken",5,"chop"),C("Cook the chicken",1,1.2),C("Boil the pasta",0,1.2),C("Stir the cheese sauce",2,1.2),P]],
["Beef Tacos","rect",["#e8d5a0","#d8a24a","#2a190a","#b8412a"],[T("Chop vegetables",5,"chop"),T("Season the beef",2,"pour"),C("Cook the beef",2,1.3),C("Warm tortillas",1,1.3),T("Assemble",4,"plate"),P]],
["Salmon with Greens","disc",["#f08a70","#e0734f","#2a190a","#3c8a3c"],[T("Season the salmon",2,"pour"),C("Sear the salmon",1,1.4),C("Cook the greens",2,1.3),P]],
["Seafood Risotto","bowl",["#f3ecd5","#ecd9a0","#3a230c","#e8806a"],[T("Chop the onion",5,"chop"),C("Cook the rice",2,1.3),T("Add seafood",3,"pour"),C("Simmer the seafood",0,1.4),T("Stir in cheese",2,"mix"),P]],
["Ramen Bowl","bowl",["#f0e0b0","#e6c870","#3a230c","#f2a52b"],[T("Prepare toppings",5,"chop"),C("Cook the noodles",0,1.4),C("Heat the broth",2,1.4),C("Soft-boil the egg",0,1.5),P]],
["Stuffed Chicken","disc",["#f0cfb0","#c98a4a","#24150a","#4f9a3a"],[T("Mix cheese and spinach",5,"mix"),T("Stuff the chicken",4,"crack"),C("Sear the chicken",1,1.5),C("Cook through",0,1.5),P]],
["Chocolate Lava Cake","disc",["#6b4030","#4a2616","#120804","#8a1f4f"],[T("Melt the chocolate",4,"mix"),T("Mix the batter",6,"mix"),C("Bake carefully",0,1.6),T("Add berries",3,"pour"),P]],
["Steak Dinner","disc",["#b04a4a","#7a4325","#1c0e06","#4f9a3a"],[T("Season the steak",2,"pour"),C("Sear both sides",1,1.6),T("Baste with butter",3,"pour"),T("Rest the meat",3,"plate"),C("Cook the vegetables",2,1.4),P]],
["Grand Chef Feast","disc",["#b04a4a","#7a4325","#1c0e06","#e8643f"],[T("Prepare the vegetables",6,"chop"),T("Season steak and prawns",3,"pour"),C("Sear the steak",1,1.8),C("Saute the prawns",1,1.8),C("Reduce the sauce",2,1.8),T("Arrange the plate",4,"plate"),P]]
];
const $=s=>document.querySelector(s);
let S={u:1,st:{},c:0,sfx:1,mu:1};
try{Object.assign(S,JSON.parse(localStorage.getItem("littleKitchen")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("littleKitchen",JSON.stringify(S))}catch(e){}};

/* ---------- Audio (Web Audio, no files) ---------- */
let AC,MG,mt;
function ac(){try{if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=.05;MG.connect(AC.destination)}if(AC.state==="suspended")AC.resume()}catch(e){AC=null}return AC}
function noise(d,f,type,v){if(!S.sfx||!ac())return;const b=AC.createBuffer(1,AC.sampleRate*d,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=b;fl.type=type;fl.frequency.value=f;g.gain.setValueAtTime(v,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);s.connect(fl);fl.connect(g);g.connect(AC.destination);s.start()}
function tone(f,d,v,type,music){if((!music&&!S.sfx)||!ac())return;const o=AC.createOscillator(),g=AC.createGain();o.type=type||"sine";o.frequency.value=f;g.gain.setValueAtTime(v,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(g);g.connect(music?MG:AC.destination);o.start();o.stop(AC.currentTime+d)}
const SFX={chop:()=>noise(.08,1800,"highpass",.5),crack:()=>{noise(.12,900,"bandpass",.7)},pour:()=>noise(.4,2500,"bandpass",.25),mix:()=>noise(.25,600,"lowpass",.5),plate:()=>tone(1200,.12,.25,"triangle"),sizz:()=>noise(.5,5000,"highpass",.15),flip:()=>tone(300,.15,.3,"triangle"),water:()=>noise(.6,3000,"bandpass",.2),timer:()=>{tone(880,.1,.3);setTimeout(()=>tone(880,.1,.3),160)},serve:()=>[523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.25,.3),i*130))};
const sfx=n=>{try{(SFX[n]||SFX.plate)()}catch(e){}};
function music(){clearInterval(mt);if(!S.mu||!ac())return;const n=[262,330,392,440,392,330,294,330],m=[1,1,1.25,1.5];let i=0;mt=setInterval(()=>{tone(n[i%8]*m[Math.floor(i/8)%4]/(i%4?1:2),.5,1,"triangle",true);i++},380)}
function toggles(){["#sfxT","#sfxG"].forEach(s=>{$(s).textContent="SFX";$(s).classList.toggle("off",!S.sfx)});["#muT","#muG"].forEach(s=>{$(s).textContent="Music";$(s).classList.toggle("off",!S.mu)})}
function togSfx(){S.sfx=S.sfx?0:1;save();toggles();sfx("plate")}
function togMu(){S.mu=S.mu?0:1;save();toggles();music()}

/* ---------- Drawing ---------- */
const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mix=(a,b,t)=>{a=hex(a);b=hex(b);t=Math.max(0,Math.min(1,t));return"rgb("+a.map((v,i)=>Math.round(v+(b[i]-v)*t)).join(",")+")"};
const foodCol=(c,d)=>d<75?mix(c[0],c[1],d/75):mix(c[1],c[2],(d-75)/40);
function rnd(seed){let s=seed;return()=>(s=(s*9301+49297)%233280)/233280}
function drawFood(x,shape,c,d,k,cx,cy,garnish,time){
  if(k<=0)return;const col=foodCol(c,d),r=rnd(7);x.save();x.translate(cx,cy);x.scale(k,k);
  x.fillStyle="rgba(0,0,0,.22)";x.beginPath();x.ellipse(4,50,92,18,0,0,7);x.fill();
  const body=()=>{x.beginPath();
    if(shape==="rect"){x.roundRect(-75,-38,150,86,16)}else if(shape==="strip"){for(let i=0;i<5;i++){x.roundRect(-85+i*34,-30+(i%2)*14,30,70,12)}}
    else{x.ellipse(0,8,86,52,0,0,7)}};
  body();let g=x.createRadialGradient(-25,-15,8,0,10,95);g.addColorStop(0,mix("#ffffff",col.replace(/[^\d,]/g,"").split(",").length?"#d9a24a":"#d9a24a",0));g.addColorStop(0,col);g.addColorStop(1,d>75?col:mix("#000000","#000000",0));x.fillStyle=col;x.fill();
  x.strokeStyle="rgba(60,30,10,.35)";x.lineWidth=3;x.stroke();
  x.save();body();x.clip();for(let i=0;i<40;i++){x.fillStyle="rgba(255,235,190,"+(.08+r()*.12)+")";x.beginPath();x.arc(-80+r()*160,-35+r()*90,1+r()*3,0,7);x.fill()}
  if(shape==="bowl"){x.fillStyle="rgba(255,255,255,.18)";x.beginPath();x.ellipse(-15,0,45,22,0,0,7);x.fill()}
  const tp=Math.floor(k>.55?18*Math.min(1,(k-.5)*2):0);x.fillStyle=c[3];for(let i=0;i<tp;i++){x.beginPath();x.ellipse(-60+r()*120,-18+r()*52,4+r()*5,3+r()*3,r()*3,0,7);x.fill()}
  if(d<20&&d>0){x.fillStyle="rgba(255,255,255,.2)";x.fillRect(-90,-40,180,30)}
  x.restore();
  x.fillStyle="rgba(255,255,255,.28)";x.beginPath();x.ellipse(-30,-8,30,9,-.4,0,7);x.fill();
  if(garnish){x.fillStyle="#4f9a3a";for(let i=0;i<9;i++){x.beginPath();x.ellipse(-30+r()*60,-10+r()*30,6,3,r()*3,0,7);x.fill()}}
  x.restore();
  if(time!==undefined&&d>25){for(let i=0;i<5;i++){const p=((time/900+i*.2)%1);x.strokeStyle="rgba(255,255,255,"+(.5*(1-p))+")";x.lineWidth=3;x.beginPath();x.moveTo(cx-40+i*20,cy-30-p*55);x.quadraticCurveTo(cx-30+i*20,cy-45-p*55,cx-40+i*20,cy-60-p*55);x.stroke()}}
  if(d>40&&time!==undefined&&d<110)for(let i=0;i<6;i++){x.fillStyle="rgba(255,240,180,.7)";x.beginPath();x.arc(cx-60+((time/7+i*47)%120),cy+10+Math.sin(time/90+i)*14,2,0,7);x.fill()}
}
function scene(x,G,time){
  x.fillStyle="#f3e4c4";x.fillRect(0,0,360,110);x.fillStyle="#6b8a5a";for(let i=0;i<6;i++)x.fillRect(i*60+4,18,52,34);
  x.fillStyle="#a8703f";x.fillRect(0,110,360,130);x.fillStyle="#8a5a36";for(let i=0;i<9;i++)x.fillRect(0,125+i*14,360,2);
  x.fillStyle="#d9d4c7";x.fillRect(250,60,90,40);x.fillStyle="#9fb2bd";x.fillRect(258,68,74,26);
  const st=G.step();x.fillStyle="#555";
  if(st[0]==="c"){x.fillStyle="#2c2c2c";x.fillRect(20,150,320,70);x.beginPath();x.ellipse(180,170,115,48,0,0,7);x.fillStyle=G.c&&G.c.heat?"#4a3a35":"#333";x.fill();x.fillStyle="#1d1d1d";x.beginPath();x.ellipse(180,170,100,40,0,0,7);x.fill();x.fillStyle="#999";x.fillRect(285,162,70,10);
    if(G.c&&G.c.heat){x.strokeStyle=["","#ffb347","#ff7a2f","#ff3b1f"][G.c.heat];x.lineWidth=3;x.beginPath();x.ellipse(180,170,100,40,0,0,7);x.stroke()}}
  else if(st[0]==="t"){x.fillStyle="#e2b979";x.beginPath();x.roundRect(55,145,250,80,12);x.fill();x.fillStyle="#cf9f5c";x.fillRect(55,215,250,10);x.fillStyle="#c9ccd0";x.beginPath();x.moveTo(20,190);x.lineTo(60,172);x.lineTo(60,186);x.fill()}
  else{x.fillStyle="#fff";x.beginPath();x.ellipse(180,175,125,52,0,0,7);x.fill();x.strokeStyle="#d9d4c7";x.lineWidth=4;x.stroke();x.beginPath();x.ellipse(180,175,95,38,0,0,7);x.stroke()}
}

/* ---------- Game ---------- */
let G=null,last=0,sizT=0;
function show(id){["start","levels","game","done"].forEach(s=>$("#"+s).hidden=s!==id);window.scrollTo(0,0)}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),1800)}
function buildLevels(){const g=$("#grid");g.innerHTML="";R.forEach((r,i)=>{const b=document.createElement("button"),s=S.st[i]||0;b.disabled=i+1>S.u;b.innerHTML=(i+1)+"<small>"+(s?"\u2605".repeat(s):i+1>S.u?"locked":"new")+"</small>";b.setAttribute("aria-label","Level "+(i+1)+" "+r[0]);b.onclick=()=>startLevel(i);g.appendChild(b)});$("#coins1").textContent="Coins: "+S.c}
function startLevel(i){const r=R[i];G={i,r,si:0,sc:[],pen:0,taps:0,c:null,plated:0,garn:0,lastD:0,pause:false,step(){return this.r[3][this.si]}};
  $("#lvName").textContent="Level "+(i+1)+": "+r[0];$("#lvInfo").textContent=["Beginner","Intermediate","Advanced","Expert"][Math.floor(i/5)];$("#coins2").textContent="\u25CF "+S.c;
  $("#steps").innerHTML=r[3].map(s=>"<li>"+(s[0]==="p"?"Plate and serve":s[1])+"</li>").join("");show("game");$("#pause").hidden=true;beginStep();music()}
function progress(){$("#prog").style.width=(G.si/G.r[3].length*100)+"%";[...$("#steps").children].forEach((li,i)=>{li.className=i<G.si?"ok":i===G.si?"now":""})}
function btn(t,f,cls){const b=document.createElement("button");b.textContent=t;b.className=cls||"big";b.onclick=f;return b}
function beginStep(){progress();const st=G.step(),c=$("#ctl");c.innerHTML="";G.taps=0;G.c=null;
  if(st[0]==="t"){const b=btn(st[1]+" (0/"+st[2]+")",()=>{G.taps++;sfx(st[3]);b.textContent=st[1]+" ("+G.taps+"/"+st[2]+")";if(G.taps>=st[2]){G.sc.push(100);G.si++;beginStep()}});c.appendChild(b)}
  else if(st[0]==="c"){const k=st[3]*(1+G.i*.02);G.c={d:0,heat:0,flip:0,stir:0,k,burn:0};
    const m=document.createElement("div");m.className="meter";m.innerHTML="<i id='mk'></i>";c.appendChild(m);
    const h=document.createElement("div");h.className="row heat";["Off","Low","Med","High"].forEach((n,i)=>{const b=btn(n,()=>{G.c.heat=i;[...h.children].forEach((x,j)=>x.classList.toggle("on",j===i));i&&sfx("sizz")},"");h.appendChild(b)});h.children[0].classList.add("on");c.appendChild(h);
    if(st[2]){const ab=btn(st[2]===1?"Flip":"Stir (0/3)",()=>{const g=G.c;if(st[2]===1){if(g.d<30)return toast("Too early - let it cook first");if(g.flip)return toast("Already flipped");g.flip=1;if(g.d>75)G.pen+=10;sfx("flip");toast("Flipped!")}else{g.stir++;g.d=Math.max(0,g.d-1);sfx("mix");ab.textContent="Stir ("+Math.min(3,g.stir)+"/3)"}},"big alt");c.appendChild(ab)}
    c.appendChild(btn("Take off heat",()=>{const g=G.c,d=g.d;if(d<55)return toast("Still raw - food must be cooked through");if(st[2]===1&&!g.flip)return toast("Flip it first");if(st[2]===2&&g.stir<3)return toast("Stir 3 times first");G.sc.push(d>110?10:d>95?55:d>=70?100:60);G.lastD=Math.min(d,115);G.c=null;sfx("timer");G.si++;beginStep()}));
    toast("Turn the heat on, aim for the green zone")}
  else{const b=btn("Place on plate",()=>{if(!G.plated){G.plated=1;sfx("plate");b.textContent="Add garnish"}else if(!G.garn){G.garn=1;sfx("pour");b.textContent="Serve the dish"}else finish()});c.appendChild(b)}}
function finish(){sfx("serve");const avg=G.sc.reduce((a,b)=>a+b,0)/G.sc.length,sc=Math.max(0,Math.round(avg-G.pen+(G.garn?5:0))),stars=sc>=88?3:sc>=65?2:1,coins=stars*10+G.i+1;
  S.c+=coins;S.st[G.i]=Math.max(S.st[G.i]||0,stars);S.u=Math.max(S.u,Math.min(20,G.i+2));save();
  $("#dTitle").textContent=G.r[0]+" served!";$("#stars").textContent="\u2605".repeat(stars)+"\u2606".repeat(3-stars);$("#dScore").textContent="Score "+sc+"  |  +"+coins+" coins"+(stars===1&&sc<65?"  |  Burnt or rushed steps cost points":"");
  const x=$("#dc").getContext("2d");x.clearRect(0,0,260,190);x.fillStyle="#fff";x.beginPath();x.ellipse(130,115,115,56,0,0,7);x.fill();drawFood(x,G.r[1],G.r[2],G.lastD||70,1,130,100,true);
  $("#next").hidden=G.i>=19;show("done");const ix=G.i;$("#next").onclick=()=>startLevel(ix+1);$("#again").onclick=()=>startLevel(ix)}
function tick(t){requestAnimationFrame(tick);const dt=Math.min(.05,(t-last)/1000);last=t;if(!G||G.pause||$("#game").hidden)return;
  const g=G.c;if(g&&g.heat){const bf=g.stir>0&&G.step()[2]===2?.85:1;g.d+=[0,5,10,20][g.heat]*g.k*dt*bf;sizT+=dt;if(sizT>.9){sizT=0;sfx("sizz")}
    if(g.d>=110&&!g.burn){g.burn=1;toast("It's burning! Take it off the heat")}if(g.d>150)g.d=150}
  const x=$("#stage").getContext("2d");scene(x,G);const st=G.step(),pf=G.si/G.r[3].length;
  let d=0,k=.35+pf*.65;if(g)d=g.d;else if(st[0]==="p")d=G.lastD||70,k=1;else if(G.lastD)d=G.lastD;
  if(st[0]==="p"&&G.plated===0){}
  drawFood(x,G.r[1],G.r[2],d,Math.min(1,k),180,g?160:st[0]==="t"?170:158,G.garn,g&&g.heat?t:undefined);
  if(g){const m=$("#mk");if(m)m.style.left=Math.min(98,g.d/1.1)+"%"}}
requestAnimationFrame(tick);

/* ---------- Wiring ---------- */
$("#go").onclick=()=>{ac();music();buildLevels();show("levels")};
$("#back1").onclick=()=>show("start");
$("#sfxT").onclick=$("#sfxG").onclick=togSfx;$("#muT").onclick=$("#muG").onclick=togMu;
$("#pauseB").onclick=()=>{G.pause=true;$("#pause").hidden=false};
$("#resume").onclick=()=>{G.pause=false;$("#pause").hidden=true};
$("#restart").onclick=()=>startLevel(G.i);
$("#quit").onclick=()=>{$("#pause").hidden=true;buildLevels();show("levels")};
$("#toLv").onclick=()=>{buildLevels();show("levels")};
toggles();
(function hero(){const x=$("#hero").getContext("2d");x.fillStyle="#a8703f";x.fillRect(0,0,320,200);x.fillStyle="#f7ecd6";x.beginPath();x.ellipse(160,120,140,64,0,0,7);x.fill();
  [[R[8],95,100],[R[3],215,105],[R[4],155,125]].forEach(([r,cx,cy],i)=>drawFood(x,r[1],r[2],72,.62+(i===2?.1:0),cx,cy,i===2))})();
