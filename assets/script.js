
let audioCtx;function ctx(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();return audioCtx}function clickSfx(){const c=ctx(),n=c.currentTime,g=c.createGain();g.connect(c.destination);g.gain.setValueAtTime(.0001,n);g.gain.exponentialRampToValueAtTime(.11,n+.006);g.gain.exponentialRampToValueAtTime(.0001,n+.08);const o=c.createOscillator();o.type='triangle';o.frequency.setValueAtTime(760,n);o.frequency.exponentialRampToValueAtTime(360,n+.055);o.connect(g);o.start(n);o.stop(n+.09);const tg=c.createGain();tg.connect(c.destination);tg.gain.setValueAtTime(.0001,n);tg.gain.exponentialRampToValueAtTime(.055,n+.003);tg.gain.exponentialRampToValueAtTime(.0001,n+.024);const t=c.createOscillator();t.type='square';t.frequency.setValueAtTime(1500,n);t.connect(tg);t.start(n);t.stop(n+.026)}function rip(x,y){const r=document.createElement('span');r.className='ripple';r.style.left=(x-9)+'px';r.style.top=(y-9)+'px';document.body.appendChild(r);setTimeout(()=>r.remove(),500)}document.addEventListener('click',e=>{const a=e.target.closest('a,button,.clickable');if(!a)return;clickSfx();rip(e.clientX,e.clientY);const h=a.getAttribute('href');if(a.tagName==='A'&&h&&!h.startsWith('#')&&!h.startsWith('mailto:')&&!h.startsWith('tel:')&&!a.target){e.preventDefault();setTimeout(()=>location.href=h,95)}});


// Google Sheet + WhatsApp inquiry form
const YODUDE_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwJFMONKWFJf_v_cW4xeYl0Bio8toVPgChPjrVimAk4VcirFUy2HfTyc56tF-TDcyLVZw/exec";
const yodudeForm = document.getElementById("yodudeInquiryForm");

if (yodudeForm) {
  yodudeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("formStatus");
    const submitBtn = yodudeForm.querySelector('button[type="submit"]');

    const payload = {
      name: yodudeForm.name.value.trim(),
      contact: yodudeForm.contact.value.trim(),
      service: yodudeForm.service.value,
      message: yodudeForm.message.value.trim()
    };

    if (!payload.name || !payload.contact) {
      status.textContent = "Please enter your name and contact.";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.textContent = "Sending your message...";

    try {
      await fetch(YODUDE_WEBAPP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      status.textContent = "Message sent! YoDude will contact you soon.";
      yodudeForm.reset();
    } catch (error) {
      status.textContent = "Message failed. Please WhatsApp us directly.";
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message ↗";
  });
}
