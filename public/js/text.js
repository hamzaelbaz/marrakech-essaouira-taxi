document.addEventListener('DOMContentLoaded',function(){initMobileMenu();initSmoothScroll();initFormValidation();initScrollAnimations();initPricingAnimations()});function initMobileMenu(){const mobileToggle=document.querySelector('.mobile-toggle');const mobileNav=document.querySelector('.mobile-nav');if(mobileToggle&&mobileNav){mobileToggle.addEventListener('click',function(){mobileNav.classList.toggle('active');const spans=this.querySelectorAll('span');if(mobileNav.classList.contains('active')){spans[0].style.transform='rotate(45deg) translate(5px, 5px)';spans[1].style.opacity='0';spans[2].style.transform='rotate(-45deg) translate(5px, -5px)'}else{spans[0].style.transform='none';spans[1].style.opacity='1';spans[2].style.transform='none'}});const mobileLinks=mobileNav.querySelectorAll('a.mobile-nav-link');mobileLinks.forEach(link=>{link.addEventListener('click',function(){mobileNav.classList.remove('active');const spans=mobileToggle.querySelectorAll('span');spans[0].style.transform='none';spans[1].style.opacity='1';spans[2].style.transform='none'})});document.addEventListener('click',function(e){if(!mobileNav.contains(e.target)&&!mobileToggle.contains(e.target)){mobileNav.classList.remove('active');const spans=mobileToggle.querySelectorAll('span');spans[0].style.transform='none';spans[1].style.opacity='1';spans[2].style.transform='none'}})}}
function initPricingAnimations(){const animatedElements=document.querySelectorAll('[data-animate]');const tableRows=document.querySelectorAll('.table-row');const observerOptions={root:null,rootMargin:'0px 0px -100px 0px',threshold:0.1};const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},observerOptions);animatedElements.forEach(el=>observer.observe(el));setTimeout(()=>{tableRows.forEach(row=>observer.observe(row))},400)}
function showNotification(message){const existing=document.querySelector('.notification-toast');if(existing)existing.remove();const notification=document.createElement('div');notification.className='notification-toast';notification.innerHTML='<span>📞 '+message+'</span>';notification.style.cssText=`
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        background: #47b3dc;
        color: white;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 0.95rem;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;if(!document.querySelector('#toast-styles')){const style=document.createElement('style');style.id='toast-styles';style.textContent=`
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideDown {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(30px); }
            }
        `;document.head.appendChild(style)}
document.body.appendChild(notification);setTimeout(()=>{notification.style.animation='slideDown 0.3s ease forwards';setTimeout(()=>notification.remove(),300)},3500)}
document.querySelectorAll('.dropdown-toggle').forEach(toggle=>{toggle.addEventListener('click',(e)=>{e.preventDefault();e.stopPropagation();toggle.parentElement.classList.toggle('open')})});const slider=document.getElementById('excursionSlider');if(slider){let isDown=!1;let startX;let scrollStart;slider.addEventListener('mousedown',(e)=>{isDown=!0;slider.classList.add('dragging');startX=e.pageX;scrollStart=slider.parentElement.scrollLeft});window.addEventListener('mouseup',()=>{isDown=!1;slider.classList.remove('dragging')});window.addEventListener('mousemove',(e)=>{if(!isDown)return;e.preventDefault();const walk=(e.pageX-startX)*1.2;slider.parentElement.scrollLeft=scrollStart-walk})}
function initSmoothScroll(){const links=document.querySelectorAll('a[href^="#"]');links.forEach(link=>{link.addEventListener('click',function(e){const href=this.getAttribute('href');if(href!=='#'){const target=document.querySelector(href);if(target){e.preventDefault();const headerHeight=document.querySelector('.header').offsetHeight;const targetPosition=target.getBoundingClientRect().top+window.pageYOffset-headerHeight;window.scrollTo({top:targetPosition,behavior:'smooth'})}}})})}
function initFormValidation(){const forms=document.querySelectorAll('form');forms.forEach(form=>{const inputs=form.querySelectorAll('input, select, textarea');inputs.forEach(input=>{input.addEventListener('blur',function(){validateField(this)});input.addEventListener('input',function(){const formGroup=this.closest('.form-group');if(formGroup&&formGroup.classList.contains('error')){formGroup.classList.remove('error')}})});form.addEventListener('submit',function(e){e.preventDefault();let isValid=!0;const requiredFields=this.querySelectorAll('[required]');requiredFields.forEach(field=>{if(!validateField(field)){isValid=!1}});if(isValid){showFormSuccess(this)}else{const firstInvalid=this.querySelector('.form-group.error input');if(firstInvalid){firstInvalid.focus()}}})})}
function validateField(field){const formGroup=field.closest('.form-group');const value=field.value.trim();let isValid=!0;if(field.hasAttribute('required')&&!value){isValid=!1}
if(field.type==='email'&&value){const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;if(!emailRegex.test(value)){isValid=!1}}
if(field.type==='tel'&&value){const phoneRegex=/^[\d\s\+\-\(\)]{8,}$/;if(!phoneRegex.test(value)){isValid=!1}}
if(formGroup){if(isValid){formGroup.classList.remove('error')}else{formGroup.classList.add('error')}}
return isValid}
function showFormSuccess(form){const submitBtn=form.querySelector('.btn-submit, .btn-form, button[type="submit"]');const originalText=submitBtn.textContent;submitBtn.disabled=!0;submitBtn.innerHTML='<svg class="spinner" viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4"/></svg> Envoi en cours...';setTimeout(()=>{const successDiv=document.createElement('div');successDiv.className='form-success';successDiv.innerHTML=`
            <div class="success-icon">
                <svg viewBox="0 0 24 24" width="48" height="48">
                    <circle cx="12" cy="12" r="11" fill="none" stroke="#28A745" stroke-width="2"/>
                    <path d="M7 12l3 3 7-7" fill="none" stroke="#28A745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h3>Merci pour votre demande !</h3>
            <p>Nous vous répondrons dans les plus brefs délais.</p>
        `;form.innerHTML='';form.appendChild(successDiv);setTimeout(()=>{form.reset();location.reload()},5000)},1500)}
function initScrollAnimations(){const observerOptions={root:null,rootMargin:'0px',threshold:0.1};const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('fade-in');observer.unobserve(entry.target)}})},observerOptions);const animateElements=document.querySelectorAll('.service-card,.faq-item, .route-detail, .advantage-item, .contact-item');animateElements.forEach(el=>{el.style.opacity='0';observer.observe(el)})}
function formatPhoneNumber(phone){return phone.replace(/(\d{3})(?=\d)/g,'$1 ')}
function initPhoneLinks(){const phoneLinks=document.querySelectorAll('a[href^="tel:"]');phoneLinks.forEach(link=>{const phone=link.getAttribute('href').replace('tel:','');link.setAttribute('aria-label','Appeler au '+formatPhoneNumber(phone))})}
initPhoneLinks();window.addEventListener('scroll',function(){const header=document.querySelector('.header');if(window.scrollY>50){header.classList.add('scrolled')}else{header.classList.remove('scrolled')}});document.querySelectorAll('.current-year').forEach(el=>{el.textContent=new Date().getFullYear()});document.addEventListener('DOMContentLoaded',function(){initScrollAnimations();initCarouselEnhancements();initScrollAnimations()});function initScrollAnimations(){const animatedElements=document.querySelectorAll('.animate-on-scroll');const observerOptions={root:null,rootMargin:'0px 0px -80px 0px',threshold:0.1};const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){const delay=entry.target.getAttribute('data-delay');const delayValue=delay?parseInt(delay):0;setTimeout(()=>{entry.target.classList.add('visible')},delayValue);obs.unobserve(entry.target)}})},observerOptions);animatedElements.forEach(el=>observer.observe(el))}
function initScrollAnimations(){const observerOptions={root:null,rootMargin:'0px',threshold:0.1};const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('fade-in');observer.unobserve(entry.target)}})},observerOptions);const animateElements=document.querySelectorAll('.service-card,.achievements__list-item, .provide__grid-item, .route-detail, .advantage-item, .contact-item');animateElements.forEach(el=>{el.style.opacity='0';observer.observe(el)})}
function initCarouselEnhancements(){const carouselTrack=document.getElementById('carouselTrack');if(!carouselTrack)return;const cards=carouselTrack.querySelectorAll('.testimonial-card');cards.forEach(card=>{card.addEventListener('mouseenter',function(){this.style.transition='transform 0.3s ease, box-shadow 0.3s ease'});card.addEventListener('mouseleave',function(){this.style.transform=''})});let isDown=!1;let startX;let scrollLeft;let animationPaused=!1;carouselTrack.addEventListener('mousedown',(e)=>{isDown=!0;carouselTrack.style.animationPlayState='paused';startX=e.pageX-carouselTrack.offsetLeft;scrollLeft=carouselTrack.scrollLeft});carouselTrack.addEventListener('mouseleave',()=>{isDown=!1;carouselTrack.style.animationPlayState='running'});carouselTrack.addEventListener('mouseup',(e)=>{isDown=!1;carouselTrack.style.animationPlayState='running'});carouselTrack.addEventListener('mousemove',(e)=>{if(!isDown)return;e.preventDefault();const x=e.pageX-carouselTrack.offsetLeft;const walk=(x-startX)*2;carouselTrack.style.animation='none';carouselTrack.scrollLeft=scrollLeft-walk});const section=document.querySelector('.testimonials-infinite-section');if(section){const sectionObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){carouselTrack.style.animationPlayState='running'}else{carouselTrack.style.animationPlayState='paused'}})},{threshold:0.1});sectionObserver.observe(section)}}
function showNotification(message,type='info'){const existing=document.querySelector('.notification-toast');if(existing)existing.remove();const notification=document.createElement('div');notification.className=`notification-toast notification-${type}`;notification.style.cssText=`
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 0.95rem;
        box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        z-index: 10000;
        animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 350px;
    `;notification.innerHTML=`
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 1.2rem;">${type === 'error' ? '⚠️' : '✓'}</span>
            <span>${message}</span>
        </div>
    `;if(!document.querySelector('#notification-styles')){const style=document.createElement('style');style.id='notification-styles';style.textContent=`
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideDown {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(30px); }
            }
            @keyframes pulse {
                0%, 100% { box-shadow: 0 0 0 0 rgba(247, 195, 49, 0.4); }
                50% { box-shadow: 0 0 0 15px rgba(247, 195, 49, 0); }
            }
        `;document.head.appendChild(style)}
document.body.appendChild(notification);setTimeout(()=>{notification.style.animation='slideDown 0.3s ease forwards';setTimeout(()=>notification.remove(),300)},4000)}
function scrollToSection(sectionId){const section=document.getElementById(sectionId);if(section){section.scrollIntoView({behavior:'smooth',block:'start'})}}
window.scrollToSection=scrollToSection;window.showNotification=showNotification