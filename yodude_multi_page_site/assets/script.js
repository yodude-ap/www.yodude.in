
let audioCtx;
function ctx(){
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if(audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function clickSfx(kind="tap"){
  const c = ctx(), now = c.currentTime;
  const g = c.createGain();
  g.connect(c.destination);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(kind==="page" ? .10 : .16, now+.006);
  g.gain.exponentialRampToValueAtTime(0.0001, now+.09);
  const o = c.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(kind==="page" ? 620 : 820, now);
  o.frequency.exponentialRampToValueAtTime(kind==="page" ? 300 : 420, now+.065);
  o.connect(g); o.start(now); o.stop(now+.095);

  const tG = c.createGain();
  tG.connect(c.destination);
  tG.gain.setValueAtTime(0.0001, now);
  tG.gain.exponentialRampToValueAtTime(.055, now+.003);
  tG.gain.exponentialRampToValueAtTime(0.0001, now+.026);
  const tick = c.createOscillator();
  tick.type = "square"; tick.frequency.setValueAtTime(1550, now);
  tick.connect(tG); tick.start(now); tick.stop(now+.028);
}
function ripple(x,y){
  const r = document.createElement("span");
  r.className = "ripple";
  r.style.left = (x-9)+"px"; r.style.top = (y-9)+"px";
  document.body.appendChild(r);
  setTimeout(()=>r.remove(),500);
}
document.addEventListener("click", (e)=>{
  const target = e.target.closest("a,button,.clickable");
  if(!target) return;
  clickSfx(target.tagName==="A" ? "page" : "tap");
  ripple(e.clientX,e.clientY);
  const href = target.getAttribute("href");
  if(target.tagName==="A" && href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:") && !target.target){
    e.preventDefault();
    setTimeout(()=>{ window.location.href = href; }, 105);
  }
});
const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".navlinks");
if(menu && nav){
  menu.addEventListener("click", ()=>{
    nav.style.display = nav.style.display === "flex" ? "" : "flex";
    nav.style.position = "absolute";
    nav.style.top = "82px";
    nav.style.left = "12px";
    nav.style.right = "12px";
    nav.style.flexDirection = "column";
    nav.style.padding = "20px";
    nav.style.borderRadius = "24px";
    nav.style.background = "rgba(255,241,207,.96)";
    nav.style.boxShadow = "0 22px 55px rgba(72,38,0,.22)";
  });
}
