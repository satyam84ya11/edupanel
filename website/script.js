// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== FAQ TOGGLE =====
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    
    // Rotate icon
    const icon = element.querySelector('i');
    icon.style.transform = answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
}

// ===== MODAL FUNCTIONS =====
const demoModal = document.getElementById('demoModal');

function openDemo() {
    demoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    demoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) {
        closeModal();
    }
});

// ===== FORM SUBMISSIONS =====
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: event.target.elements[0].value,
        email: event.target.elements[1].value,
        subject: event.target.elements[2].value,
        message: event.target.elements[3].value
    };
    
    // Simulate form submission
    console.log('Contact Form Submitted:', formData);
    
    // Show success message
    showNotification('Thank you! We\'ll get back to you soon.', 'success');
    
    // Reset form
    event.target.reset();
}

function handleDemoSubmit(event) {
    event.preventDefault();
    
    const formData = {
        schoolName: event.target.elements[0].value,
        name: event.target.elements[1].value,
        email: event.target.elements[2].value,
        phone: event.target.elements[3].value,
        preferredTime: event.target.elements[4].value
    };
    
    // Simulate form submission
    console.log('Demo Request Submitted:', formData);
    
    // Show success message
    showNotification('Demo scheduled! Check your email for details.', 'success');
    
    // Close modal
    closeModal();
    
    // Reset form
    event.target.reset();
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    const styles = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: slideUp 0.3s ease-out;
    `;
    
    notification.setAttribute('style', styles);
    
    if (type === 'success') {
        notification.style.background = '#10B981';
    } else if (type === 'error') {
        notification.style.background = '#EF4444';
    } else {
        notification.style.background = '#1E4FFF';
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card, .tech-item, .pricing-card, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        const text = stat.textContent;
        let current = 0;
        
        const increment = target / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = text;
                clearInterval(counter);
            } else {
                const isPercentage = text.includes('%');
                const isPlus = text.includes('+');
                
                if (isPercentage) {
                    stat.textContent = Math.floor(current) + '%';
                } else if (isPlus) {
                    stat.textContent = Math.floor(current) + '+';
                } else {
                    stat.textContent = Math.floor(current);
                }
            }
        }, 30);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
let counterTriggered = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterTriggered) {
            counterTriggered = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Close modal with Escape
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Quick scroll with keyboard
    if (e.key === '/') {
        e.preventDefault();
        document.querySelector('.nav-menu a[href="#features"]').focus();
    }
});

// ===== LOCAL STORAGE FOR PREFERENCES =====
function saveDarkMode(enabled) {
    localStorage.setItem('darkMode', enabled);
}

function isDarkModeEnabled() {
    return localStorage.getItem('darkMode') === 'true';
}

// ===== PERFORMANCE MONITORING =====
function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page Load Time: ${loadTime}ms`);
    }
}

window.addEventListener('load', logPerformanceMetrics);

// ===== UTILITY FUNCTIONS =====
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== LAZY LOADING IMAGES (FUTURE) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ANALYTICS TRACKER (PLACEHOLDER) =====
class AnalyticsTracker {
    constructor() {
        this.events = [];
    }
    
    trackEvent(eventName, eventData) {
        const event = {
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        };
        this.events.push(event);
        console.log('Event tracked:', event);
    }
    
    trackPageView(page) {
        this.trackEvent('pageView', { page });
    }
    
    trackButtonClick(buttonName) {
        this.trackEvent('buttonClick', { button: buttonName });
    }
}

const tracker = new AnalyticsTracker();

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        tracker.trackButtonClick(btn.textContent);
    });
});

// ===== NEWSLETTER SIGNUP (FUTURE) =====
function subscribeNewsletter(email) {
    if (email && email.includes('@')) {
        tracker.trackEvent('newsletter_signup', { email });
        showNotification('Thank you for subscribing!', 'success');
        return true;
    } else {
        showNotification('Please enter a valid email', 'error');
        return false;
    }
}

// ===== VALIDATION HELPERS =====
const validators = {
    email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    phone: (phone) => /^[\d\s\-\+\(\)]+$/.test(phone),
    text: (text) => text.trim().length > 0,
    minLength: (text, length) => text.trim().length >= length,
};

// ===== INIT FUNCTION =====
function init() {
    console.log('Kids Academy Website Initialized');
    console.log('Version: 1.0.0');
    console.log('Features: Responsive Design, Smooth Animations, Mobile Friendly');
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== CONSOLE EASTER EGGS =====
console.log('%cKids Academy School Management System', 'color: #1E4FFF; font-size: 20px; font-weight: bold;');
console.log('%cPowered by Laravel 11 + Next.js 14', 'color: #2563EB; font-size: 14px;');
console.log('%cVersion 1.0.0 - Production Ready ✓', 'color: #10B981; font-size: 12px;');
