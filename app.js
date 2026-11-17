(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement,PH='918080888577',TEL='8080888577';
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const svg=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
/* theme */
const setTheme=d=>{root.classList.toggle('dark',d);try{localStorage.setItem('nrb-theme',d?'dark':'light')}catch(e){}};
const tgl=()=>setTheme(!root.classList.contains('dark'));
$$('[aria-label="Toggle light and dark theme"]').forEach(b=>b.addEventListener('click',tgl));
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
$$('.reveal').forEach(el=>rm?el.classList.add('is-visible'):io.observe(el));
/* quote buttons */
const setSvc=s=>{const sel=$('#inq-service');if(!sel||!s)return;const o=[...sel.options].find(x=>x.value===s||x.textContent.trim()===s);if(o)sel.value=o.value};
const toQuote=s=>{const t=$('#quote');if(t){setSvc(s);t.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'})}else{try{if(s)sessionStorage.setItem('nrb-svc',s)}catch(e){}location.href='contact.html#quote'}};
$$('button').forEach(b=>{if(/^get (a )?quote/i.test(b.textContent.trim())){const s=b.closest('article')?.querySelector('h2')?.textContent.trim();b.addEventListener('click',()=>toQuote(s))}});
try{const s=sessionStorage.getItem('nrb-svc');if(s){setSvc(s);sessionStorage.removeItem('nrb-svc')}}catch(e){}
if(location.hash==='#quote')setTimeout(()=>$('#quote')?.scrollIntoView(),150);
/* inquiry form -> validation -> WhatsApp */
const f=$('form[novalidate]');
if(f){f.addEventListener('submit',e=>{e.preventDefault();let bad=0;const g=id=>$(id,f);
const err=(el,m)=>{let p=el.parentElement.querySelector('.nb-err');if(!p){p=document.createElement('p');p.className='nb-err';el.parentElement.appendChild(p)}p.textContent=m;el.setAttribute('aria-invalid',m?'true':'false');if(m)bad++};
const n=g('#inq-name'),ph=g('#inq-phone'),em=g('#inq-email'),sv=g('#inq-service'),ms=g('#inq-message');
err(n,n.value.trim().length<2?'Please enter your full name.':'');
err(ph,/^[6-9]\d{9}$/.test(ph.value.replace(/[\s+-]/g,'').replace(/^91/,''))?'':'Enter a valid 10-digit mobile number.');
err(em,em.value&&!/^\S+@\S+\.\S+$/.test(em.value)?'Enter a valid email address.':'');
err(sv,sv.value?'':'Please select a service.');
err(ms,ms.value.trim().length<5?'Please add a few project details.':'');
let ok=$('.nb-ok',f);if(!ok){ok=document.createElement('p');ok.className='nb-ok';ok.setAttribute('role','status');ok.hidden=true;f.appendChild(ok)}
if(bad){ok.hidden=true;return}
const t=encodeURIComponent(`Hello NR BUILDCON, I would like a quote.\nName: ${n.value.trim()}\nMobile: ${ph.value.trim()}\nEmail: ${em.value.trim()||'-'}\nService: ${sv.value}\nDetails: ${ms.value.trim()}`);
ok.textContent=`Thank you, ${n.value.trim()}. WhatsApp is opening so you can send your enquiry to us directly. You can also call ${TEL}.`;ok.hidden=false;
window.open(`https://wa.me/${PH}?text=${t}`,'_blank','noopener');f.reset()})}
/* mobile More sheet */
const nav=$('nav[aria-label="Mobile"]');
if(nav){const more=$$('button',nav).pop(),ind=$('span[aria-hidden]',nav),home=ind?ind.style.transform:'';
const sh=document.createElement('div');sh.className='nb-sheet';sh.innerHTML=`<div><a href="contact.html">${svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>')}Contact Us</a><a href="tel:${TEL}">${svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>')}Call Now</a><a href="https://wa.me/${PH}" target="_blank" rel="noopener">${svg('<path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 1 12 2.5z"/>')}WhatsApp</a><button type="button" class="th">${svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>')}Light / Dark theme</button></div>`;document.body.appendChild(sh);
const set=o=>{sh.classList.toggle('o',o);more.setAttribute('aria-expanded',o);if(ind)ind.style.transform=o?'translateX(400%)':home};
more.addEventListener('click',()=>set(!sh.classList.contains('o')));
sh.addEventListener('click',e=>{if(e.target===sh||e.target.closest('a'))set(false);if(e.target.closest('.th')){tgl();set(false)}});
addEventListener('keydown',e=>e.key==='Escape'&&set(false))}
/* lightbox (gallery + projects) */
const its=$$('button[aria-label^="Open image"],button[aria-label^="View "]').filter(b=>$('img',b));
if(its.length){const lb=document.createElement('div');lb.className='nb-lb';lb.innerHTML='<button class="x" aria-label="Close">&times;</button><button class="p" aria-label="Previous">&lsaquo;</button><button class="n" aria-label="Next">&rsaquo;</button><figure><img alt=""><figcaption></figcaption></figure>';document.body.appendChild(lb);
let i=0;const show=k=>{i=(k+its.length)%its.length;const b=its[i],im=$('img',b),a=b.closest('article');const t=a?$('h3',a)?.textContent:'',d=a?$('p',a)?.textContent:'';$('img',lb).src=im.currentSrc||im.src;$('img',lb).alt=im.alt;$('figcaption',lb).innerHTML=a?`<b>${t}</b>${d}`:im.alt;lb.classList.add('o')};
its.forEach((b,k)=>b.addEventListener('click',()=>show(k)));
lb.addEventListener('click',e=>{if(e.target.closest('.p'))show(i-1);else if(e.target.closest('.n'))show(i+1);else if(e.target===lb||e.target.closest('.x'))lb.classList.remove('o')});
addEventListener('keydown',e=>{if(!lb.classList.contains('o'))return;if(e.key==='Escape')lb.classList.remove('o');if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)})}
/* project filters */
const fb=$$('button').filter(b=>/^(All|Residential|Commercial|Interior|Infrastructure|Renovation)\d*$/.test(b.textContent.trim()));
if(fb.length>2){const cards=$$('article.card-base').filter(a=>$('button[aria-label^="View "]',a));const on=[fb[0].className,$('span',fb[0])?.className],off=[fb[1].className,$('span',fb[1])?.className];
const cat=a=>$('button span',a)?.textContent.trim();
fb.forEach(b=>b.addEventListener('click',()=>{const k=b.textContent.trim().replace(/\d+$/,'');fb.forEach(x=>{const a=x===b;x.className=a?on[0]:off[0];const s=$('span',x);if(s)s.className=a?on[1]:off[1]});cards.forEach(c=>{const w=c.parentElement;w.hidden=!(k==='All'||cat(c)===k)})}))}
})();
/* homepage client-review carousel */
const reviewTrack=$('.nb-review-track');
if(reviewTrack){
 const cards=$$('.nb-review-card',reviewTrack),dots=$$('.nb-review-dots button'),prev=$('.nb-review-prev'),next=$('.nb-review-next');
 let current=0,timer=null;
 const perView=()=>innerWidth<=767?1:innerWidth<=900?2:3;
 const maxIndex=()=>Math.max(0,cards.length-perView());
 const paint=()=>{current=Math.min(current,maxIndex());const card=cards[0];const gap=parseFloat(getComputedStyle(reviewTrack).gap)||18;const step=card.getBoundingClientRect().width+gap;reviewTrack.style.transform=`translateX(${-current*step}px)`;dots.forEach((d,i)=>d.classList.toggle('active',i===current));};
 const go=n=>{current=n<0?maxIndex():n>maxIndex()?0:n;paint()};
 prev?.addEventListener('click',()=>go(current-1));next?.addEventListener('click',()=>go(current+1));dots.forEach((d,i)=>d.addEventListener('click',()=>go(i)));
 const stop=()=>{if(timer)clearInterval(timer);timer=null};const start=()=>{if(!rm&&maxIndex()>0)timer=setInterval(()=>go(current+1),4800)};
 const shell=reviewTrack.closest('.nb-review-shell');shell?.addEventListener('mouseenter',stop);shell?.addEventListener('mouseleave',start);shell?.addEventListener('focusin',stop);shell?.addEventListener('focusout',start);
 addEventListener('resize',paint);paint();start();
}
