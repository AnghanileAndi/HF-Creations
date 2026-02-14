// Small, dependency-free JS for interactivity and performance
document.addEventListener('DOMContentLoaded',function(){
  // Nav / future: mobile toggle placeholder

  // Lazy-load images via IntersectionObserver
  const lazyImages = document.querySelectorAll('img.lazy');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const img = e.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          obs.unobserve(img);
        }
      });
    },{rootMargin:'100px'});
    lazyImages.forEach(i=>io.observe(i));
  } else {
    // fallback
    lazyImages.forEach(i=>i.src = i.dataset.src);
  }

  // Subscription form (no backend) — store email locally & show message
  const form = document.getElementById('subscribe');
  const note = document.getElementById('subscribe-note');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    if(!email) return;
    try{ localStorage.setItem('hf_email', email); note.textContent = 'Thanks! Check your inbox — download link sent.'; } catch(err){ note.textContent = 'Subscribed — check your email.' }
    form.reset();
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const a = btn.nextElementSibling; if(a) a.hidden = expanded;
    });
  });
});