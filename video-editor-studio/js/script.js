// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-on-scroll class
const fadeElements = document.querySelectorAll('.fade-on-scroll');
fadeElements.forEach(element => {
    observer.observe(element);
});

// ===================================
// STATS COUNTER ANIMATION
// ===================================

const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
};

// Start counter animation when stats section is visible
if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// ===================================
// PORTFOLIO FILTER (Portfolio Page)
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item-full');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // Re-trigger fade animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===================================
// VIDEO MODAL (Portfolio Page)
// ===================================

const videoModal = document.getElementById('video-modal');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');
const portfolioThumbnails = document.querySelectorAll('.portfolio-thumbnail-full');

// Open modal when clicking on portfolio item
if (portfolioThumbnails.length > 0) {
    portfolioThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // CLIENT NOTE: Replace the video placeholder with actual video embed
            // Example for YouTube:
            // const videoId = thumbnail.getAttribute('data-video-id');
            // const modalVideo = document.querySelector('.modal-video');
            // modalVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
            
            // Example for Vimeo:
            // modalVideo.innerHTML = `<iframe src="https://player.vimeo.com/video/${videoId}" frameborder="0" allowfullscreen></iframe>`;
            
            // Example for HTML5 video:
            // modalVideo.innerHTML = `<video controls autoplay><source src="videos/${videoId}.mp4" type="video/mp4"></video>`;
        });
    });
}

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
}

function closeModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Stop video playback when closing modal
    const modalVideo = document.querySelector('.modal-video');
    modalVideo.innerHTML = `
        <div class="video-placeholder">
            <i class="fas fa-play-circle"></i>
            <p>Video Player Placeholder</p>
            <p class="small">Replace with actual video embed (YouTube, Vimeo, or HTML5 video)</p>
        </div>
    `;
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // CLIENT NOTE: Replace this with actual form submission
        // Example using fetch API to send to your backend:
        /*
        fetch('your-api-endpoint.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            showFormMessage('success', 'Thank you! Your message has been sent successfully.');
            contactForm.reset();
        })
        .catch(error => {
            showFormMessage('error', 'Oops! Something went wrong. Please try again.');
        });
        */

        // Simulated form submission for demo purposes
        setTimeout(() => {
            showFormMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
            contactForm.reset();
        }, 1000);
    });
}

function showFormMessage(type, message) {
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = message;
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('success', 'error');
    }, 5000);
}

// ===================================
// FAQ ACCORDION (Contact Page)
// ===================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for actual anchor links, not just "#"
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// PAGE TRANSITION EFFECT
// ===================================

// Add subtle fade-in effect when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// PORTFOLIO ITEM CLICK (Homepage)
// ===================================

const homePortfolioItems = document.querySelectorAll('.portfolio-item');

if (homePortfolioItems.length > 0) {
    homePortfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // If clicking the portfolio link, let it navigate
            if (e.target.closest('.portfolio-link')) {
                return;
            }
            
            // Otherwise, navigate to portfolio page
            window.location.href = 'portfolio.html';
        });
    });
}

// ===================================
// CLIENT NOTES AND CUSTOMIZATION GUIDE
// ===================================

/*
CUSTOMIZATION GUIDE FOR CLIENTS:

1. REPLACING VIDEO BACKGROUND (index.html):
   - Replace the <img> tag in .hero-video with:
     <video autoplay muted loop playsinline poster="images/hero-poster.jpg">
         <source src="videos/your-video.mp4" type="video/mp4">
     </video>
   - Add your video file to a "videos" folder
   - Use a poster image for faster loading

2. REPLACING PORTFOLIO THUMBNAILS:
   - Replace the Unsplash URLs in <img src="..."> with your actual video thumbnails
   - Recommended size: 800x500px for best quality
   - Save thumbnails in an "images" folder

3. ADDING VIDEO EMBEDS TO PORTFOLIO:
   - Add data-video-id attribute to each .portfolio-thumbnail-full:
     <div class="portfolio-thumbnail-full" data-video-id="YOUR_VIDEO_ID">
   - The modal will automatically load the video when clicked
   - Supports YouTube, Vimeo, or HTML5 video

4. CONNECTING CONTACT FORM:
   - Update the form submission code (line 250) with your backend API
   - Or integrate with services like Formspree, Netlify Forms, or EmailJS
   - Example: https://formspree.io/

5. UPDATING COLORS:
   - Edit CSS variables in style.css (lines 8-18)
   - Change --primary-color and --secondary-color for brand colors

6. ADDING SOCIAL MEDIA LINKS:
   - Replace "#" in social links with your actual profiles
   - Located in footer and contact page

7. CHANGING CONTENT:
   - All text content is in the HTML files
   - Images use Unsplash - replace with your own images
   - Service icons can be changed using Font Awesome icon codes

8. DEPLOYING:
   - Upload all files to your web hosting
   - Ensure folder structure is maintained
   - Test all links and forms after deployment

For any questions, refer to the comments throughout the code!
*/

console.log('%c🎬 Creative Studio Website Loaded!', 'color: #ff6b35; font-size: 16px; font-weight: bold;');
console.log('%cCustomization tips: Check the CLIENT NOTES section in script.js', 'color: #f7931e; font-size: 12px;');
