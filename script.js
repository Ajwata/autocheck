// Premium Site Interactions
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFormSubmission();
    initSmoothScroll();
    initScrollAnimations();
    initParallax();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Form Submission with Validation
function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[placeholder="Ваше ім\'я"]').value.trim();
        const email = this.querySelector('input[placeholder="Email"]').value.trim();
        const phone = this.querySelector('input[placeholder="Телефон"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Validation
        if (!name || !email || !phone || !message) {
            alert('Будь ласка, заповніть всі поля!');
            return;
        }

        if (!validateEmail(email)) {
            alert('Будь ласка, введіть коректний email!');
            return;
        }

        // Create WhatsApp message
        const whatsappMessage = `🚗 *Нова заявка з сайту* 🚗\n\n*Ім\'я:* ${name}\n*Email:* ${email}\n*Телефон:* ${phone}\n*Повідомлення:* ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Send to WhatsApp
        window.open(`https://wa.me/380935386948?text=${encodedMessage}`, '_blank');
        
        // Reset form with animation
        this.reset();
        const submitBtn = this.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Дякуємо!';
        submitBtn.style.background = 'linear-gradient(135deg, #d4af37 0%, #c59c24 100%)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// Email validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Smooth scroll enhancement
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add animation
                    target.style.animation = 'pulse 0.6s ease-out';
                }
            }
        });
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe service cards and benefit items
    document.querySelectorAll('.service-card, .benefit-item, .location-item').forEach(el => {
        observer.observe(el);
    });
}

// Parallax effect on hero
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroBefore = hero.querySelector('::before');
        if (scrollPosition < hero.offsetHeight) {
            hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        }
    });
}

// Add pulse animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);
