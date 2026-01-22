// ==================== SCROLL ANIMATIONS ====================
// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
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
        observer.observe(section);
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
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// ==================== APPOINTMENT FORM HANDLING ====================
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const submitBtn = appointmentForm.querySelector('.btn-submit');
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            department: document.getElementById('department').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value
        };
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you! Your appointment request has been submitted. We will contact you shortly to confirm.';
            
            // Reset form
            appointmentForm.reset();
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Appointment Request';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // In a real application, you would send the data to your server:
            /*
            fetch('/api/appointments', {
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
                    formMessage.textContent = 'Appointment request submitted successfully!';
                } else {
                    formMessage.className = 'form-message error';
                    formMessage.textContent = 'Something went wrong. Please try again.';
                }
            })
            .catch(error => {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Network error. Please try again later.';
            });
            */
        }, 1500);
    });
}

// ==================== SERVICE CARD HOVER EFFECTS ====================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== DOCTOR CARD ANIMATIONS ====================
const doctorCards = document.querySelectorAll('.doctor-card');

doctorCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotate(1deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// ==================== APPOINTMENT BUTTON CLICK ====================
const appointmentBtns = document.querySelectorAll('.appointment-btn');

appointmentBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Redirect to contact page or open appointment modal
        window.location.href = 'contact.html';
    });
});

// ==================== STATS COUNTER ANIMATION ====================
const statCards = document.querySelectorAll('.stat-card h3');

const animateCounter = (element, target) => {
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
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

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3Elements = entry.target.querySelectorAll('.stat-card h3');
            h3Elements.forEach(h3 => {
                const targetText = h3.textContent;
                const target = parseInt(targetText.replace(/\D/g, ''));
                animateCounter(h3, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==================== FORM VALIDATION ====================
const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '#28a745';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value) {
            this.style.borderColor = '#28a745';
        }
    });
});

// Email validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '#28a745';
        }
    });
}

// Phone validation
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
}

// ==================== MOBILE MENU (Future Enhancement) ====================
// Add mobile menu functionality here if needed
console.log('Hospital Website Loaded Successfully');

// ==================== IMAGE PLACEHOLDER INTERACTIONS ====================
const imagePlaceholders = document.querySelectorAll('.image-placeholder');

imagePlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        alert('Replace this placeholder with your actual image!\n\nYou can use:\n- Your own hospital photos\n- Stock images from sites like Unsplash, Pexels\n- Professional photography');
    });
    
    // Add pointer cursor
    placeholder.style.cursor = 'pointer';
});

// ==================== EMERGENCY BANNER ANIMATION ====================
const emergencyBanner = document.querySelector('.emergency-banner');
if (emergencyBanner) {
    setInterval(() => {
        emergencyBanner.style.background = emergencyBanner.style.background === 'linear-gradient(135deg, #c82333, #dc3545)' 
            ? 'linear-gradient(135deg, #dc3545, #c82333)' 
            : 'linear-gradient(135deg, #c82333, #dc3545)';
    }, 3000);
}
