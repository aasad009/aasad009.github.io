(() => {
  'use strict';
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sky = document.getElementById('bird-sky');
  const glass = document.getElementById('rain-glass');
  const toggle = document.getElementById('sound-toggle');
  const icon = toggle && toggle.querySelector('.sound-symbol');
  const label = toggle && toggle.querySelector('.sound-label');
  const audio = document.getElementById('rainforest-audio');
  let heroVisible = true;
  let soundWanted = false;
  let soundDisabledByVisitor = false;
  let birdTimer;
  const birds = new Set();

  // Repeatable positions give the glass a natural arrangement without flashing on reload.
  let seed = 251026;
  const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
  if (glass) {
    const frag = document.createDocumentFragment();
    for (let i=0;i<65;i++) {
      const drop = document.createElement('i');
      drop.className = 'glass-drop' + (i%13 === 0 && !reduced ? ' slow-drip' : '');
      // More droplets to the sides and upper canopy, fewer on the primary headline.
      const x = random()*100, y = random()*100;
      const d = 3 + Math.pow(random(),2.5)*23;
      const op = x<68 && y>22 && y<76 ? .19+.2*random() : .3+.36*random();
      drop.style.setProperty('--x', x.toFixed(2)+'%');
      drop.style.setProperty('--y', y.toFixed(2)+'%');
      drop.style.setProperty('--d', d.toFixed(1)+'px');
      drop.style.setProperty('--o', op.toFixed(2));
      drop.style.setProperty('--rot', (random()*36-18).toFixed(0)+'deg');
      drop.style.setProperty('--seconds', (8+random()*9).toFixed(1)+'s');
      frag.appendChild(drop);
    }
    glass.appendChild(frag);
  }

  // One friendly, short-lived visitor. It sticks to the glass for approximately 0.5 s.
  if (!reduced) {
    const visit = document.createElement('div');
    visit.id = 'gecko-visit';
    visit.setAttribute('aria-hidden','true');
    visit.innerHTML = '<span class="glass-ring"></span><img class="gecko-picture" src="assets/gecko-glass.svg" width="430" height="410" alt="" decoding="async">';
    document.body.appendChild(visit);
    const gecko = visit.querySelector('.gecko-picture');
    gecko.addEventListener('animationend', () => visit.remove(), {once:true});
    // Also remove the overlay if animation events are interrupted by navigation.
    window.addEventListener('pagehide', () => visit.remove(), {once:true});
  }

  const birdSVG = `<svg viewBox="0 0 124 78" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g fill="currentColor"><path class="bird-wing left" d="M61 47 C43 28 24 18 1 15 C18 28 23 46 40 54 C48 58 57 54 62 48Z"/><path class="bird-wing right" d="M63 48 C80 28 101 18 123 15 C106 31 103 45 83 55 C77 58 68 54 63 48Z"/><path d="M53 43 Q62 37 71 43 Q69 54 63 60 Q56 54 53 43Z"/><path d="M60 45 Q62 42 66 45 L63 62 Z"/></g></svg>`;
  const scheduleBird = () => {
    clearTimeout(birdTimer);
    if (!reduced && heroVisible && !document.hidden) {
      birdTimer = setTimeout(() => {
        spawnBird();
        scheduleBird();
      }, 1500 + Math.random()*2600);
    }
  };
  function spawnBird(initial = false) {
    if (!sky || !heroVisible || document.hidden || birds.size >= 4) return;
    const w = sky.clientWidth, h = sky.clientHeight;
    if (w < 180 || h < 100) return;
    const fromLeft = Math.random()>.5;
    const b = document.createElement('span');
    b.className = 'flight-bird';
    const size = Math.round(24+Math.random()*38);
    b.style.width = size+'px';
    b.style.setProperty('--flap',(0.3+Math.random()*.28).toFixed(2)+'s');
    b.style.top = '0';
    b.innerHTML = birdSVG;
    if (!fromLeft) b.querySelector('svg').style.transform = 'scaleX(-1)';
    sky.appendChild(b);birds.add(b);
    const y = Math.round((.09+Math.random()*.73)*h);
    const startX = initial ? (fromLeft?.20:.73)*w : (fromLeft ? -size-25:w+size+25);
    const finishX = fromLeft ? w+size+45 : -size-45;
    const endY = Math.max(8,Math.min(h-12,y+(Math.random()-.5)*h*.24));
    const duration = initial ? 7500+Math.random()*4000 : 8000+Math.random()*6800;
    const motion = b.animate([
      {transform:`translate3d(${startX}px,${y}px,0)`,opacity:initial?.72:0,offset:0},
      {transform:`translate3d(${startX+(finishX-startX)*.18}px,${y-14}px,0)`,opacity:.76,offset:.17},
      {transform:`translate3d(${startX+(finishX-startX)*.53}px,${(y+endY)/2+12}px,0)`,opacity:.6,offset:.53},
      {transform:`translate3d(${finishX}px,${endY}px,0)`,opacity:0,offset:1}
    ],{duration,easing:'linear'});
    motion.addEventListener('finish',()=>{birds.delete(b);b.remove();},{once:true});
  }
  if (sky && !reduced) {
    const observe = new IntersectionObserver((entries)=>{
      heroVisible = entries[0].isIntersecting;
      if(heroVisible) scheduleBird(); else {
        clearTimeout(birdTimer);
        for(const b of [...birds]){for(const a of b.getAnimations())a.cancel();b.remove();birds.delete(b);}
      }
    },{threshold:0.02});
    observe.observe(hero);
    setTimeout(()=>{if(heroVisible){spawnBird(true);spawnBird(true);}},450);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)scheduleBird();else clearTimeout(birdTimer);});
  }

  if (audio && toggle && icon && label) {
    audio.volume = 0.30;
    const reflect = (playing) => {
      toggle.setAttribute('aria-pressed',String(playing));
      icon.textContent = playing ? '♫' : '♪';
      label.textContent = playing ? 'Rainforest sound on' : 'Play rainforest sound';
      toggle.setAttribute('aria-label', playing ? 'Mute rainforest sound' : 'Play rainforest sound');
    };
    const startAudio = async () => {
      if(soundDisabledByVisitor) return;
      soundWanted = true;
      try {await audio.play();reflect(true);} catch {reflect(false);}
    };
    toggle.addEventListener('click', () => {
      if(!audio.paused){soundDisabledByVisitor=true;soundWanted=false;audio.pause();reflect(false);}
      else{soundDisabledByVisitor=false;startAudio();}
    });
    // Once a visitor interacts, browsers permit the softly mixed soundtrack.
    const onFirstGesture = (e) => {
      if(e.target.closest && e.target.closest('#sound-toggle')) return;
      startAudio();
    };
    document.addEventListener('pointerdown',onFirstGesture,{once:true});
    document.addEventListener('keydown',(e)=>{
      if(!e.repeat && ['Enter',' ','ArrowDown'].includes(e.key) && !soundWanted && !soundDisabledByVisitor && e.target!==toggle)startAudio();
    });
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden){audio.pause();}
      else if(soundWanted && !soundDisabledByVisitor){startAudio();}
    });
    audio.addEventListener('error',()=>{reflect(false);label.textContent='Audio unavailable';toggle.title='Please check that assets/rainforest-ambience.mp3 was uploaded.';});
    reflect(false);
  }
})();
