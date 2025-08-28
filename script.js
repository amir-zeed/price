// Robust slideshow with loop + per-slide animations
let current = 0;
const slides = Array.from(document.querySelectorAll('.slide'));
let timers = [];
let intervalId = null;

function clearTimers(){ while(timers.length){ clearTimeout(timers.pop()); } }

function animateOnce(el, delay=80){
  if(!el) return;
  el.classList.remove('play');
  void el.offsetWidth; // reflow to restart CSS animation
  timers.push(setTimeout(()=> el.classList.add('play'), delay));
}

function showSlide(i){
  clearTimers();
  slides.forEach(s=>s.classList.remove('active'));
  current = (i + slides.length) % slides.length;
  const slide = slides[current];
  slide.classList.add('active');

  // animate blocks (works even if some don't exist)
  animateOnce(slide.querySelector('.page-title'), 30);
  animateOnce(slide.querySelector('.prices'), 120);
  animateOnce(slide.querySelector('.overview'), 120);

  // stagger services items
  const items = slide.querySelectorAll('.services li');
  items.forEach((it, idx)=>{
    it.classList.remove('show');
    timers.push(setTimeout(()=> it.classList.add('show'), 180*idx + 180));
  });
}

function startLoop(){
  showSlide(0);
  if(intervalId) clearInterval(intervalId);
  intervalId = setInterval(()=> showSlide(current+1), 15000);
}

function updateClock(){
  const d = new Date();
  const h = String(d.getHours()).padStart(2,'0');
  const m = String(d.getMinutes()).padStart(2,'0');
  const el = document.getElementById('clock');
  if(el) el.textContent = h + ':' + m;
}

document.addEventListener('DOMContentLoaded', ()=>{
  startLoop();
  updateClock();
  setInterval(updateClock, 60000);

  // Allow manual testing with arrows/space
  document.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowRight' || e.key===' '){ showSlide(current+1); }
    if(e.key==='ArrowLeft'){ showSlide(current-1); }
  });
});
