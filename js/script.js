/* ════════════════════════════════════════
   CURSOR
════════════════════════════════════════ */
const dot = document.getElementById('dot'), ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
(function loop() { rx += (mx - rx) * .2; ry += (my - ry) * .2; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); })();
document.querySelectorAll('a,button,.spill,.pcard,.ec,.edc,.ccard,.otw,.tpill,.ftag,.citem,.btn').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
});

/* ════════════════════════════════════════
   TYPEWRITER
════════════════════════════════════════ */
const roles = ['Backend Software Engineer', 'Java & Spring Boot Dev', 'Microservices Developer', 'REST API Engineer', 'DevOps Enthusiast'];
let ri = 0, ci = 0, dl = false;
const tw = document.getElementById('tw');
function type() {
  const c = roles[ri];
  if (!dl) { tw.textContent = c.slice(0, ci + 1); ci++; if (ci === c.length) { dl = true; setTimeout(type, 1900); return; } }
  else { tw.textContent = c.slice(0, ci - 1); ci--; if (ci === 0) { dl = false; ri = (ri + 1) % roles.length; } }
  setTimeout(type, dl ? 50 : 85);
}
type();

/* ════════════════════════════════════════
   THEMES — 3 themes, visible in nav
════════════════════════════════════════ */
/* Multi-mode shuffled colour palettes */
const MULTI_PALS = [
  ['rgba(192,132,252,', 'rgba(244,114,182,', 'rgba(251,146,60,', 'rgba(251,191,36,', 'rgba(52,211,153,', 'rgba(96,165,250,'],
  ['rgba(244,114,182,', 'rgba(251,146,60,', 'rgba(250,204,21,', 'rgba(74,222,128,', 'rgba(129,140,248,'],
  ['rgba(52,211,153,', 'rgba(96,165,250,', 'rgba(192,132,252,', 'rgba(244,114,182,', 'rgba(251,191,36,'],
  ['rgba(251,191,36,', 'rgba(251,146,60,', 'rgba(192,132,252,', 'rgba(52,211,153,', 'rgba(244,114,182,'],
  ['rgba(96,165,250,', 'rgba(52,211,153,', 'rgba(251,146,60,', 'rgba(250,204,21,', 'rgba(192,132,252,'],
];
let _multiIdx = 0;

// All shuffled colour sub-themes cycled by 3rd button
const SHUFFLE_THEMES = ['multi', 'aurora', 'ember', 'violet', 'candy', 'ocean', 'sunset'];
let _shuffleIdx = 0;

function setTheme(t) {
  let actual = t;
  if (t === 'multi') {
    // cycle through all colour themes randomly
    _shuffleIdx = (_shuffleIdx + 1) % SHUFFLE_THEMES.length;
    actual = SHUFFLE_THEMES[_shuffleIdx];
    // update the 3rd button icon to hint current vibe
    const icons = { multi: '🎨', aurora: '🌿', ember: '🔥', violet: '💜', candy: '🍬', ocean: '🌊', sunset: '🌅' };
    const mb = document.getElementById('multiBtn');
    if (mb) mb.textContent = icons[actual] || '🎨';
    const mobs = document.querySelectorAll('.mob-tcirc[data-t="multi"]');
    mobs.forEach(b => b.textContent = icons[actual] || '🎨');
  }
  document.documentElement.setAttribute('data-theme', actual);
  // mark the 3 floating buttons — multi btn stays "on" for any colour theme
  document.querySelectorAll('.tcirc').forEach(b => {
    const isMultiGroup = SHUFFLE_THEMES.includes(actual);
    if (b.dataset.t === 'multi') b.classList.toggle('on', isMultiGroup);
    else b.classList.toggle('on', b.dataset.t === actual);
  });
  document.querySelectorAll('.mob-tcirc').forEach(b => {
    const isMultiGroup = SHUFFLE_THEMES.includes(actual);
    if (b.dataset.t === 'multi') b.classList.toggle('on', isMultiGroup);
    else b.classList.toggle('on', b.dataset.t === actual);
  });
  localStorage.setItem('rc-theme', actual);
  initBubbles();
}
(() => {
  const saved = localStorage.getItem('rc-theme') || 'dark';
  // if saved was a colour theme, restore with multi button active
  if (SHUFFLE_THEMES.includes(saved) && saved !== 'multi') {
    _shuffleIdx = SHUFFLE_THEMES.indexOf(saved);
    document.documentElement.setAttribute('data-theme', saved);
    document.querySelectorAll('.tcirc[data-t="multi"],.mob-tcirc[data-t="multi"]').forEach(b => b.classList.add('on'));
    initBubbles();
  } else {
    setTheme(saved === 'multi' ? 'dark' : saved);
  }
})();

/* ════════════════════════════════════════
   OTW TOGGLE
   ─────────────────────────────────────
   ✏️  TO CHANGE YOUR STATUS: edit the
       MY_STATUS variable below.
       true  = "Open to Work"  (green glow)
       false = "Currently Working" (dim)
   This is the ONLY line you need to change.
════════════════════════════════════════ */
const MY_STATUS = true; // ← CHANGE THIS

let isOpen = MY_STATUS;
const otwEl = document.getElementById('otw');
const otwLbl = document.getElementById('otwLbl');
const jStat = document.getElementById('jStat');
function syncOTW() {
  otwEl.className = 'otw ' + (isOpen ? 'open' : 'busy');
  otwLbl.textContent = isOpen ? 'Open to Work' : 'Currently Working';
  if (jStat) jStat.textContent = isOpen ? '"open_to_work"' : '"currently_working"';
}
syncOTW();
otwEl.addEventListener('click', () => { isOpen = !isOpen; syncOTW(); });

/* ════════════════════════════════════════
   MOBILE MENU
════════════════════════════════════════ */
function toggleMob() {
  document.getElementById('hbg').classList.toggle('x');
  document.getElementById('mob').classList.toggle('open');
}
function closeMob() {
  document.getElementById('hbg').classList.remove('x');
  document.getElementById('mob').classList.remove('open');
}

/* ════════════════════════════════════════
   ANIMATED BUBBLE CANVAS
════════════════════════════════════════ */
function initBubbles() {
  const cv = document.getElementById('bgc'), ctx = cv.getContext('2d');
  cv.width = innerWidth; cv.height = innerHeight;
  window.addEventListener('resize', () => { cv.width = innerWidth; cv.height = innerHeight; });
  const t = document.documentElement.getAttribute('data-theme') || 'dark';
  const P = {
    dark: ['rgba(88,166,255,', 'rgba(167,139,250,', 'rgba(63,185,80,', 'rgba(240,197,68,', 'rgba(232,121,160,', 'rgba(249,115,22,'],
    aurora: ['rgba(63,185,80,', 'rgba(86,211,100,', 'rgba(88,166,255,', 'rgba(167,139,250,', 'rgba(240,197,68,'],
    ember: ['rgba(249,115,22,', 'rgba(232,121,160,', 'rgba(240,197,68,', 'rgba(249,115,22,', 'rgba(167,139,250,'],
    light: ['rgba(79,110,247,', 'rgba(168,85,247,', 'rgba(16,185,129,', 'rgba(245,158,11,', 'rgba(236,72,153,', 'rgba(249,115,22,'],
    multi: MULTI_PALS[_multiIdx],
    violet: ['rgba(167,139,250,', 'rgba(192,132,252,', 'rgba(244,114,182,', 'rgba(251,191,36,', 'rgba(167,139,250,'],
    candy: ['rgba(244,114,182,', 'rgba(251,146,60,', 'rgba(251,191,36,', 'rgba(167,139,250,', 'rgba(244,114,182,'],
    ocean: ['rgba(6,182,212,', 'rgba(59,130,246,', 'rgba(52,211,153,', 'rgba(251,191,36,', 'rgba(6,182,212,'],
    sunset: ['rgba(251,113,133,', 'rgba(249,115,22,', 'rgba(251,191,36,', 'rgba(192,132,252,', 'rgba(251,113,133,']
  };
  const pal = P[t] || P.dark;
  const N = t === 'light' ? 28 : 40;
  const maxR = t === 'multi' ? 75 : t === 'light' ? 45 : 62;
  const B = Array.from({ length: N }, (_, i) => ({
    x: Math.random() * cv.width, y: Math.random() * cv.height,
    r: Math.random() * maxR + 10, vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5,
    c: pal[i % pal.length], op: t === 'light' ? (Math.random() * .16 + .06) : (Math.random() * .14 + .03),
    pulse: Math.random() * Math.PI * 2, pspd: Math.random() * .01 + .005
  }));
  let mX = -999, mY = -999;
  window.addEventListener('mousemove', e => { mX = e.clientX; mY = e.clientY; });
  if (window._raf) cancelAnimationFrame(window._raf);
  function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    B.forEach(b => {
      const dx = b.x - mX, dy = b.y - mY, d = Math.sqrt(dx * dx + dy * dy), R = 180;
      if (d < R && d > 0) { const f = (R - d) / R; b.vx += (dx / d) * f * .16; b.vy += (dy / d) * f * .16; }
      b.vx += (cv.width / 2 - b.x) * .00005; b.vy += (cv.height / 2 - b.y) * .00005;
      b.vx *= .965; b.vy *= .965;
      const sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (sp > 1.7) { b.vx = b.vx / sp * 1.7; b.vy = b.vy / sp * 1.7; }
      b.x += b.vx; b.y += b.vy;
      if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx); }
      if (b.x > cv.width - b.r) { b.x = cv.width - b.r; b.vx = -Math.abs(b.vx); }
      if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy); }
      if (b.y > cv.height - b.r) { b.y = cv.height - b.r; b.vy = -Math.abs(b.vy); }
      b.pulse += b.pspd;
      const pr = b.r * (1 + Math.sin(b.pulse) * 0.08);
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, pr);
      g.addColorStop(0, b.c + (b.op * 1.7) + ')');
      g.addColorStop(0.5, b.c + (b.op * 0.8) + ')');
      g.addColorStop(1, b.c + '0)');
      ctx.beginPath(); ctx.arc(b.x, b.y, pr, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    });
    window._raf = requestAnimationFrame(draw);
  }
  draw();
}
initBubbles();

/* ════════════════════════════════════════
   SCROLL — progress bar + nav active + parallax
════════════════════════════════════════ */
const sbar = document.getElementById('sbar');
const nav = document.getElementById('nav');
const nlinks = document.querySelectorAll('.nlinks a');
const sects = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // progress bar
  sbar.style.transform = `scaleX(${window.scrollY / (document.documentElement.scrollHeight - innerHeight)})`;
  // nav slim
  nav.classList.toggle('slim', window.scrollY > 60);
  // active link
  let cur = '';
  sects.forEach(s => { if (window.scrollY >= s.offsetTop - 145) cur = s.id; });
  nlinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
  // section numbers parallax
  document.querySelectorAll('.sec-n').forEach(el => {
    const rect = el.closest('section').getBoundingClientRect();
    el.style.transform = `translateY(${rect.top * .12}px)`;
  });
  // hero name parallax
  const hname = document.querySelector('.hname');
  if (hname) hname.style.transform = `translateY(${window.scrollY * .12}px)`;
});

/* ════════════════════════════════════════
   INTERSECTION OBSERVER — staggered reveals
   Each section heading + children animate in
   from different directions with delay
════════════════════════════════════════ */
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // stagger delay by index within parent
      const siblings = [...e.target.parentElement.querySelectorAll('.rv,.rl,.rr,.rsc,.rfl,.sh')];
      const idx = siblings.indexOf(e.target);
      setTimeout(() => e.target.classList.add('in'), (idx > 0 ? idx : 0) * 85);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.rv,.rl,.rr,.rsc,.rfl,.sh').forEach(el => obs.observe(el));

/* ════════════════════════════════════════
   PROJECT CARD SPOTLIGHT
════════════════════════════════════════ */
document.querySelectorAll('.pcard').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
    c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
  });
});

/* ════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════ */
function sendMsg() {
  const n = document.getElementById('fn').value.trim();
  const e = document.getElementById('fe').value.trim();
  const s = document.getElementById('fs').value.trim();
  const m = document.getElementById('fm').value.trim();
  if (!n || !e || !m) { alert('Please fill in Name, Email and Message.'); return; }
  window.location.href = `mailto:reymonchoudhary@gmail.com?subject=${encodeURIComponent(s || 'Portfolio Contact')}&body=${encodeURIComponent('Name: ' + n + '\nEmail: ' + e + '\n\n' + m)}`;
  document.getElementById('cForm').style.display = 'none';
  document.getElementById('fOk').style.display = 'block';
}
