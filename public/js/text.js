/* =====================================================
   MARRAKECH ESSAOUIRA TAXI - MAIN JAVASCRIPT
   Version: 1.0
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initScrollAnimations(); 
    initPricingAnimations(); 
});

/* =====================================================
   MOBILE MENU TOGGLE
   ===================================================== */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            if (mobileNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll(
    'a.mobile-nav-link'
);

        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}
 

/* =====================================================
   PRICES
   ===================================================== */


function initPricingAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    const tableRows = document.querySelectorAll('.table-row');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe header elements
    animatedElements.forEach(el => observer.observe(el));
    
    // Observe table rows with delay
    setTimeout(() => {
        tableRows.forEach(row => observer.observe(row));
    }, 400);
} 

/**
 * Show notification toast
 */
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.innerHTML = '<span>📞 ' + message + '</span>';
    notification.style.cssText = `
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
    `;
    
    // Add animation styles if not exists
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideDown {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(30px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3.5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3500);
}

// Show List 
 
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle.parentElement.classList.toggle('open');
    });
});


/* =====================================================
   SLIDER CODE
   ===================================================== */

const slider = document.getElementById('excursionSlider');
if (slider) { 
let isDown = false;
let startX;
let scrollStart;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX;
    scrollStart = slider.parentElement.scrollLeft;
});

window.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
});

window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - startX) * 1.2;
    slider.parentElement.scrollLeft = scrollStart - walk;
});
}

/* =====================================================
   SMOOTH SCROLL
   ===================================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* =====================================================
   FORM VALIDATION
   ===================================================== */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error state on input
                const formGroup = this.closest('.form-group');
                if (formGroup && formGroup.classList.contains('error')) {
                    formGroup.classList.remove('error');
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show success message
                showFormSuccess(this);
            } else {
                // Focus first invalid field
                const firstInvalid = this.querySelector('.form-group.error input');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });
    });
}

function validateField(field) {
    const formGroup = field.closest('.form-group');
    const value = field.value.trim();
    let isValid = true;
    
    // Required validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Update UI
    if (formGroup) {
        if (isValid) {
            formGroup.classList.remove('error');
        } else {
            formGroup.classList.add('error');
        }
    }
    
    return isValid;
}

function showFormSuccess(form) {
    const submitBtn = form.querySelector('.btn-submit, .btn-form, button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Change button state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<svg class="spinner" viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4"/></svg> Envoi en cours...';
    
    // Simulate API call
    setTimeout(() => {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <div class="success-icon">
                <svg viewBox="0 0 24 24" width="48" height="48">
                    <circle cx="12" cy="12" r="11" fill="none" stroke="#28A745" stroke-width="2"/>
                    <path d="M7 12l3 3 7-7" fill="none" stroke="#28A745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h3>Merci pour votre demande !</h3>
            <p>Nous vous répondrons dans les plus brefs délais.</p>
        `;
        
        // Insert success message
        form.innerHTML = '';
        form.appendChild(successDiv);
        
        // Reset form after delay (optional)
        setTimeout(() => {
            form.reset();
            location.reload();
        }, 5000);
    }, 1500);
}

/* =====================================================
   SCROLL ANIMATIONS
   ===================================================== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.service-card,.faq-item, .route-detail, .advantage-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
} 

/* =====================================================
   LANGUAGE SWITCHER
   ===================================================== */
// function initLanguageSwitcher() {
//     // Language switcher is visual only for now
//     // Future implementation will redirect to /en/ or /es/
    
//     const langOptions = document.querySelectorAll('.lang-option');
    
//     langOptions.forEach(option => {
//         option.addEventListener('click', function(e) {
//             if (this.classList.contains('inactive')) {
//                 e.preventDefault();
                
//                 // Show coming soon notification
//                 showComingSoon(this.querySelector('span:last-child')?.textContent || 'cette langue');
//             }
//         });
//     });
// }

// function showComingSoon(lang) {
//     // Create notification element
//     const notification = document.createElement('div');
//     notification.className = 'coming-soon-notification';
//     notification.innerHTML = `
//         <p>Le contenu en ${lang} sera bientôt disponible.</p>
//         <button class="close-notification">&times;</button>
//     `;
    
//     // Add styles
//     notification.style.cssText = `
//         position: fixed;
//         bottom: 20px;
//         right: 20px;
//         background: #1A1A1A;
//         color: white;
//         padding: 16px 24px;
//         border-radius: 8px;
//         display: flex;
//         align-items: center;
//         gap: 16px;
//         z-index: 10000;
//         animation: slideUp 0.3s ease;
//         font-size: 14px;
//     `;
    
//     // Add close button style
//     const closeBtn = notification.querySelector('.close-notification');
//     closeBtn.style.cssText = `
//         background: none;
//         border: none;
//         color: white;
//         font-size: 20px;
//         cursor: pointer;
//         padding: 0;
//         line-height: 1;
//     `;
    
//     document.body.appendChild(notification);
    
//     // Close button event
//     closeBtn.addEventListener('click', function() {
//         notification.remove();
//     });
    
//     // Auto remove after 4 seconds
//     setTimeout(() => {
//         if (notification.parentNode) {
//             notification.style.animation = 'fadeIn 0.3s ease reverse';
//             setTimeout(() => notification.remove(), 300);
//         }
//     }, 4000);
// }

/* =====================================================
   UTILITY FUNCTIONS
   ===================================================== */

// Format phone number for display
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(?=\d)/g, '$1 ');
}

// Make phone callable
function initPhoneLinks() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        const phone = link.getAttribute('href').replace('tel:', '');
        link.setAttribute('aria-label', 'Appeler au ' + formatPhoneNumber(phone));
    });
}

// Initialize phone links
initPhoneLinks();

/* =====================================================
   HEADER SCROLL EFFECT
   ===================================================== */
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* =====================================================
   CURRENT YEAR
   ===================================================== */
document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
});






/**
 * Testimonials & FAQs Section - JavaScript
 * Handles scroll animations, infinite carousel interactions, and FAQ accordion
 */

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations(); 
    initCarouselEnhancements(); 
    initScrollAnimations()
});

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get delay from data attribute
                const delay = entry.target.getAttribute('data-delay');
                const delayValue = delay ? parseInt(delay) : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delayValue);
                
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Animate section header elements specifically
 */ 

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.service-card,.achievements__list-item, .provide__grid-item, .route-detail, .advantage-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
} 

/**
 * Initialize carousel enhancements and interactions
 */
function initCarouselEnhancements() {
    const carouselTrack = document.getElementById('carouselTrack');
    
    if (!carouselTrack) return;
    
    // Add smooth pause effect on hover
    const cards = carouselTrack.querySelectorAll('.testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add slight scale effect
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset scale
            this.style.transform = '';
        });
    });
    
    // Touch/swipe support for mobile
    let isDown = false;
    let startX;
    let scrollLeft;
    let animationPaused = false;
    
    carouselTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        carouselTrack.style.animationPlayState = 'paused';
        startX = e.pageX - carouselTrack.offsetLeft;
        scrollLeft = carouselTrack.scrollLeft;
    });
    
    carouselTrack.addEventListener('mouseleave', () => {
        isDown = false;
        carouselTrack.style.animationPlayState = 'running';
    });
    
    carouselTrack.addEventListener('mouseup', (e) => {
        isDown = false;
        carouselTrack.style.animationPlayState = 'running';
    });
    
    carouselTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carouselTrack.offsetLeft;
        const walk = (x - startX) * 2;
        carouselTrack.style.animation = 'none';
        carouselTrack.scrollLeft = scrollLeft - walk;
    });
    
    // Pause animation when section is not visible
    const section = document.querySelector('.testimonials-infinite-section');
    if (section) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    carouselTrack.style.animationPlayState = 'running';
                } else {
                    carouselTrack.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    }
}

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.style.cssText = `
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
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 1.2rem;">${type === 'error' ? '⚠️' : '✓'}</span>
            <span>${message}</span>
        </div>
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
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
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Expose functions globally
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;