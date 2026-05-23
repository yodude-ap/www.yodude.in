
let audioCtx;
function ctx(){ if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)(); if(audioCtx.state==='suspended') audioCtx.resume(); return audioCtx; }
function clickSfx(){ try{ const c=ctx(),n=c.currentTime,g=c.createGain(); g.connect(c.destination); g.gain.setValueAtTime(.0001,n); g.gain.exponentialRampToValueAtTime(.12,n+.006); g.gain.exponentialRampToValueAtTime(.0001,n+.08); const o=c.createOscillator(); o.type='triangle'; o.frequency.setValueAtTime(820,n); o.frequency.exponentialRampToValueAtTime(420,n+.06); o.connect(g); o.start(n); o.stop(n+.09); }catch(e){} }
function ripple(x,y){ const r=document.createElement('span'); r.className='ripple'; r.style.left=(x-9)+'px'; r.style.top=(y-9)+'px'; document.body.appendChild(r); setTimeout(()=>r.remove(),500); }
document.addEventListener('click',e=>{ const t=e.target.closest('a,button,.clickable'); if(!t)return; clickSfx(); ripple(e.clientX,e.clientY); });

const menu=document.querySelector('.menu-btn'), nav=document.querySelector('.navlinks');
if(menu&&nav){ menu.addEventListener('click',()=>{ nav.style.display=nav.style.display==='flex'?'':'flex'; nav.style.position='absolute'; nav.style.top='82px'; nav.style.left='12px'; nav.style.right='12px'; nav.style.flexDirection='column'; nav.style.padding='20px'; nav.style.borderRadius='24px'; nav.style.background='rgba(255,241,207,.97)'; nav.style.boxShadow='0 22px 55px rgba(72,38,0,.22)'; }); }

const YODUDE_WEBAPP_URL="https://script.google.com/macros/s/AKfycbwJFMONKWFJf_v_cW4xeYl0Bio8toVPgChPjrVimAk4VcirFUy2HfTyc56tF-TDcyLVZw/exec";
const yodudeForm=document.getElementById('yodudeInquiryForm');
if(yodudeForm){
  yodudeForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const status=document.getElementById('formStatus');
    const btn=yodudeForm.querySelector('button[type="submit"]');
    const payload={name:yodudeForm.name.value.trim(),contact:yodudeForm.contact.value.trim(),service:yodudeForm.service.value,message:yodudeForm.message.value.trim()};
    if(!payload.name||!payload.contact){status.textContent='Please enter your name and contact.';return;}
    btn.disabled=true; btn.textContent='Sending...'; status.textContent='Sending your message...';
    try{
      await fetch(YODUDE_WEBAPP_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      status.textContent='Message sent! YoDude will contact you soon.'; yodudeForm.reset();
    }catch(err){ status.textContent='Message failed. Please WhatsApp us directly.'; }
    btn.disabled=false; btn.textContent='Send Message ↗';
  });
}
