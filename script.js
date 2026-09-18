const menuButton=document.querySelector('.menu-button');
const mobileMenu=document.querySelector('.mobile-menu');
if(menuButton&&mobileMenu){menuButton.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});}
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -25px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Small stagger keeps section entrances polished without slowing navigation.
document.querySelectorAll('.cap-list, .process-steps, .trust-cards, .service-grid').forEach(group=>{[...group.querySelectorAll('.reveal, .service-card')].forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i,5)*55}ms`;});});
