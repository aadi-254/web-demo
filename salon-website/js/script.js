// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in sections
document.addEventListener('DOMContentLoaded', function() {
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    fadeInSections.forEach(section => {
        fadeInObserver.observe(section);
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Enhanced shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
});

// ==================== SERVICE CARD HOVER EFFECTS ====================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add ripple effect
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== PRICE CARD ANIMATIONS ====================
const priceCards = document.querySelectorAll('.price-card');

priceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = this.classList.contains('featured') 
            ? 'scale(1.05) translateY(-12px) rotate(1deg)' 
            : 'translateY(-12px) rotate(-1deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = this.classList.contains('featured') 
            ? 'scale(1.05)' 
            : 'translateY(0) rotate(0deg)';
    });
});

// ==================== GALLERY HOVER ZOOM EFFECT ====================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const placeholder = this.querySelector('.image-placeholder');
        if (placeholder) {
            placeholder.style.transform = 'scale(1.15) rotate(2deg)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const placeholder = this.querySelector('.image-placeholder');
        if (placeholder) {
            placeholder.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ==================== BOOKING FORM HANDLING ====================
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const submitBtn = bookingForm.querySelector('.btn-submit');
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        submitBtn.style.opacity = '0.7';
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            stylist: document.getElementById('stylist').value,
            notes: document.getElementById('notes').value,
            newsletter: document.getElementById('newsletter').checked,
            terms: document.getElementById('terms').checked
        };
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success
            formMessage.className = 'form-message success';
            formMessage.innerHTML = '<strong>Success!</strong> Your appointment request has been received. We\'ll send you a confirmation email within 24 hours.';
            
            // Reset form
            bookingForm.reset();
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Confirm Booking';
            submitBtn.style.opacity = '1';
            
            // Hide message after 7 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 7000);
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // In a real application, send data to server:
            /*
            fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Booking confirmed!';
                } else {
                    formMessage.className = 'form-message error';
                    formMessage.textContent = 'Something went wrong. Please try again.';
                }
            });
            */
        }, 1800);
    });
}

// ==================== FORM VALIDATION & STYLING ====================
const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');

inputs.forEach(input => {
    // Validation on blur
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = '#e74c3c';
            this.style.boxShadow = '0 0 0 4px rgba(231, 76, 60, 0.1)';
        } else {
            this.style.borderColor = '#27ae60';
            this.style.boxShadow = '0 0 0 4px rgba(39, 174, 96, 0.1)';
        }
    });
    
    // Reset styling on input
    input.addEventListener('input', function() {
        if (this.value) {
            this.style.borderColor = '#27ae60';
            this.style.boxShadow = '0 0 0 4px rgba(39, 174, 96, 0.1)';
        } else {
            this.style.borderColor = '#e5e5e5';
            this.style.boxShadow = 'none';
        }
    });
});

// Email validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            this.style.borderColor = '#e74c3c';
            this.style.boxShadow = '0 0 0 4px rgba(231, 76, 60, 0.1)';
        } else {
            this.style.borderColor = '#27ae60';
            this.style.boxShadow = '0 0 0 4px rgba(39, 174, 96, 0.1)';
        }
    });
}

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        // Allow only numbers, spaces, hyphens, and parentheses
        this.value = this.value.replace(/[^\d\s\-\(\)]/g, '');
    });
}

// Date validation (no past dates)
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    dateInput.addEventListener('change', function() {
        if (this.value < today) {
            alert('Please select a future date for your appointment.');
            this.value = '';
        }
    });
}

// ==================== BUTTON RIPPLE EFFECT ====================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== STATS COUNTER ANIMATION ====================
const stats = document.querySelectorAll('.stat h3');

const animateCounter = (element) => {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElements = entry.target.querySelectorAll('.stat h3');
            statElements.forEach(stat => {
                animateCounter(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-row');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==================== IMAGE PLACEHOLDER INTERACTIONS ====================
const imagePlaceholders = document.querySelectorAll('.image-placeholder');

imagePlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        alert('📸 Replace this placeholder with your actual image!\n\nYou can use:\n• Your salon photos\n• Before/after transformations\n• Product photos\n• Team photos\n\nRecommended: Use high-quality images from Unsplash, Pexels, or your own photography.');
    });
    
    // Add pointer cursor and glow effect
    placeholder.style.cursor = 'pointer';
    placeholder.style.transition = 'all 0.3s ease';
    
    placeholder.addEventListener('mouseenter', function() {
        this.style.opacity = '0.8';
        this.style.transform = 'scale(1.02)';
    });
    
    placeholder.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    });
});

// ==================== FEATURE CARD ANIMATIONS ====================
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach((card, index) => {
    // Stagger animation on load
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
});

// ==================== TESTIMONIAL CARD HOVER ====================
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== SERVICE LINK ARROW ANIMATION ====================
const serviceLinks = document.querySelectorAll('.service-link');

serviceLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        const arrow = this.querySelector('i');
        if (arrow) {
            arrow.style.transform = 'translateX(5px)';
            arrow.style.transition = 'transform 0.3s ease';
        }
    });
    
    link.addEventListener('mouseleave', function() {
        const arrow = this.querySelector('i');
        if (arrow) {
            arrow.style.transform = 'translateX(0)';
        }
    });
});

// ==================== NAVBAR ACTIVE STATE ====================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c✨ Luxe Beauty Salon Website ✨', 'color: #d4a373; font-size: 20px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #c9a0dc; font-size: 14px;');
console.log('%cReplace image placeholders with your salon photos for a complete look.', 'color: #6b6b6b; font-size: 12px;');

// ==================== ACCESSIBILITY ====================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 3px solid var(--primary-color) !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);
