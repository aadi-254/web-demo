// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
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
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
});

// ==================== CART FUNCTIONALITY ====================
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.btn-add');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Increment cart
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Animation
        cartCountElement.style.transform = 'scale(1.5)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 300);
        
        // Change button text temporarily
        const originalText = this.textContent;
        this.textContent = '✓ Added!';
        this.style.background = '#4caf50';
        this.style.color = '#fff';
        this.style.borderColor = '#4caf50';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
            this.style.color = '';
            this.style.borderColor = '';
        }, 2000);
        
        // Show notification
        showNotification('Product added to cart!');
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== CATEGORY FILTER TABS ====================
const categoryTabs = document.querySelectorAll('.category-tab');
const productCategories = document.querySelectorAll('.products-category');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Update active tab
        categoryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Filter categories
        if (category === 'all') {
            productCategories.forEach(section => {
                section.style.display = 'block';
            });
        } else {
            productCategories.forEach(section => {
                if (section.getAttribute('data-category') === category) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        }
        
        // Scroll to first visible section
        setTimeout(() => {
            const firstVisible = document.querySelector('.products-category[style="display: block;"]');
            if (firstVisible) {
                firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    });
});

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const submitBtn = contactForm.querySelector('.btn-submit');
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Simulate form submission
        setTimeout(() => {
            formMessage.className = 'form-message success';
            formMessage.innerHTML = '<strong>Success!</strong> Thank you for contacting us. We\'ll get back to you soon.';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            submitBtn.style.opacity = '1';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            
            // In production, send to server:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Handle response
            });
            */
        }, 1500);
    });
}

// ==================== FORM VALIDATION ====================
const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#4caf50';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value) {
            this.style.borderColor = '#4caf50';
        }
    });
});

// Email validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#4caf50';
        }
    });
}

// ==================== IMAGE PLACEHOLDER INTERACTIONS ====================
const imagePlaceholders = document.querySelectorAll('.image-placeholder');

imagePlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        alert('🖼️ Replace this placeholder with your product image!\n\nRecommendations:\n• Use high-quality product photos\n• Clean white background\n• Good lighting\n• Consistent image sizes (recommended: 600x600px)\n\nFree image sources:\n• Unsplash.com (search "groceries", "vegetables", "fruits")\n• Pexels.com\n• Your own product photography');
    });
    
    placeholder.style.cursor = 'pointer';
    
    placeholder.addEventListener('mouseenter', function() {
        this.style.opacity = '0.8';
    });
    
    placeholder.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
    });
});

// ==================== PRODUCT CARD HOVER EFFECTS ====================
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== CATEGORY CARD ANIMATIONS ====================
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== OFFER CARD STAGGER ANIMATION ====================
const offerCards = document.querySelectorAll('.offer-card');

offerCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 150);
});

// ==================== FEATURE BOX ANIMATIONS ====================
const featureBoxes = document.querySelectorAll('.feature-box');

const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            featureObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

featureBoxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = 'all 0.5s ease';
    featureObserver.observe(box);
});

// ==================== NAVBAR ACTIVE STATE ====================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ==================== PRODUCT BADGE PULSE ====================
const productBadges = document.querySelectorAll('.product-badge, .offer-badge');

productBadges.forEach(badge => {
    badge.style.animation = 'badgePulse 2s infinite';
});

const badgeStyle = document.createElement('style');
badgeStyle.textContent = `
    @keyframes badgePulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.08);
        }
    }
`;
document.head.appendChild(badgeStyle);

// ==================== CONSOLE MESSAGE ====================
console.log('%c🛒 FreshMart Grocery 🛒', 'color: #4caf50; font-size: 24px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #388e3c; font-size: 14px;');
console.log('%cReplace image placeholders with your product photos.', 'color: #666; font-size: 12px;');

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== ACCESSIBILITY ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

const accessibilityStyle = document.createElement('style');
accessibilityStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 3px solid var(--primary-green) !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(accessibilityStyle);

// ==================== PRICE HIGHLIGHT ANIMATION ====================
const priceElements = document.querySelectorAll('.new-price, .product-price');

priceElements.forEach(price => {
    price.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    price.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});
