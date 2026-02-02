# Video Editor Studio Website

A modern, cinematic website template for video editors and creative studios. Perfect for freelance video editors, production houses, and creative agencies.

## 🎬 Features

### Design
- **Dark Cinematic Theme** - Professional dark mode with orange/gold accent colors
- **Video Background Hero** - Full-screen hero with video background support
- **Modern Typography** - Montserrat + Playfair Display font combination
- **Smooth Animations** - Fade-in on scroll, hover effects, and transitions

### Pages
1. **Home (index.html)**
   - Hero section with video background placeholder
   - Services showcase (Short-form, YouTube, Wedding, Corporate)
   - Statistics counter
   - Portfolio preview grid
   - Call-to-action sections

2. **Portfolio (portfolio.html)**
   - Filterable portfolio grid (by category)
   - Video modal popup system
   - 12 portfolio items with hover overlays
   - Categories: Commercial, Wedding, YouTube, Music Video, Corporate

3. **Contact (contact.html)**
   - Professional contact form with validation
   - Contact information cards
   - FAQ accordion section
   - Social media links

### Functionality
- ✅ Responsive mobile menu (hamburger)
- ✅ Smooth scroll animations
- ✅ Portfolio filtering system
- ✅ Video modal popup
- ✅ Animated statistics counter
- ✅ Form validation
- ✅ FAQ accordion
- ✅ Fully responsive design

---

## 📁 File Structure

```
video-editor-studio/
│
├── index.html              # Homepage
├── portfolio.html          # Portfolio page with filtering
├── contact.html            # Contact page with form
│
├── css/
│   └── style.css          # All styles (9,000+ lines)
│
├── js/
│   └── script.js          # All functionality
│
└── README.md              # This file
```

---

## 🚀 Quick Start

1. **Open Locally**
   - Simply open `index.html` in your browser
   - No build process required!

2. **Replace Content**
   - Images: Replace Unsplash URLs with your own
   - Videos: Add video thumbnails and video files
   - Text: Update all content in HTML files

3. **Deploy**
   - Upload to any web hosting
   - Works with GitHub Pages, Netlify, Vercel

---

## 🎨 Customization Guide

### 1. Change Colors

Edit CSS variables in `css/style.css` (lines 8-18):

```css
:root {
    --primary-color: #ff6b35;      /* Orange */
    --secondary-color: #f7931e;    /* Gold */
    --dark-bg: #0a0a0a;            /* Background */
    --text-primary: #ffffff;        /* White text */
}
```

### 2. Replace Video Background (Hero Section)

In `index.html`, replace the image placeholder with a video:

```html
<!-- Find this section -->
<div class="hero-video">
    <!-- Replace with: -->
    <video autoplay muted loop playsinline poster="images/hero-poster.jpg">
        <source src="videos/hero-background.mp4" type="video/mp4">
    </video>
</div>
```

**Tips:**
- Use a compressed video (under 5MB for web)
- Add a poster image for faster loading
- Keep video short (10-20 seconds loop)

### 3. Add Portfolio Videos

**Method 1: YouTube Embed**

1. Add `data-video-id` to thumbnail in `portfolio.html`:
```html
<div class="portfolio-thumbnail-full" data-video-id="dQw4w9WgXcQ">
```

2. Update `js/script.js` (line 192):
```javascript
const videoId = thumbnail.getAttribute('data-video-id');
const modalVideo = document.querySelector('.modal-video');
modalVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
```

**Method 2: Vimeo Embed**
```javascript
modalVideo.innerHTML = `<iframe src="https://player.vimeo.com/video/${videoId}" frameborder="0" allowfullscreen></iframe>`;
```

**Method 3: Self-Hosted Video**
```javascript
modalVideo.innerHTML = `<video controls autoplay>
    <source src="videos/${videoId}.mp4" type="video/mp4">
</video>`;
```

### 4. Replace Portfolio Thumbnails

Replace Unsplash URLs in `portfolio.html`:

```html
<!-- Before -->
<img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=500&fit=crop" alt="Project">

<!-- After -->
<img src="images/thumbnails/project-1.jpg" alt="Project">
```

**Recommended Size:** 800x500px (16:10 aspect ratio)

### 5. Update Services

Edit services in `index.html` (lines 80-150):
- Change service icons (Font Awesome)
- Update service titles and descriptions
- Replace service images

### 6. Connect Contact Form

Edit `js/script.js` (line 250):

**Option 1: Formspree**
```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
```

**Option 2: Netlify Forms**
Add to form tag in `contact.html`:
```html
<form class="contact-form" name="contact" method="POST" data-netlify="true">
```

**Option 3: EmailJS**
Follow EmailJS documentation for setup

### 7. Add Social Media Links

In footer and contact page, replace `#` with your profiles:

```html
<a href="https://instagram.com/yourprofile" aria-label="Instagram">
    <i class="fab fa-instagram"></i>
</a>
```

---

## 🎯 SEO Optimization

1. **Update Meta Tags** (in each HTML file):
```html
<meta name="description" content="Your custom description">
<meta name="keywords" content="video editing, production, etc">
```

2. **Add Open Graph Tags**:
```html
<meta property="og:title" content="Your Studio Name">
<meta property="og:image" content="images/og-image.jpg">
<meta property="og:url" content="https://yourwebsite.com">
```

3. **Update Alt Text** on all images for accessibility

---

## 📱 Responsive Breakpoints

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** 320px - 767px

All sections are fully responsive with touch-friendly navigation.

---

## 🔧 Technical Details

### Technologies Used
- HTML5 (semantic markup)
- CSS3 (Grid, Flexbox, animations)
- Vanilla JavaScript (no frameworks)
- Font Awesome 6.4.0
- Google Fonts (Montserrat, Playfair Display)

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- No external dependencies (except fonts/icons from CDN)
- Optimized CSS (minify for production)
- Lazy loading images (add loading="lazy" to img tags)
- Fast load times

---

## 💡 Tips for Video Editors

### Best Practices
1. **Keep videos short** - 30-60 second showreels work best
2. **Use high-quality thumbnails** - First impression matters
3. **Organize by category** - Commercial, Wedding, etc.
4. **Add before/after** comparisons in portfolio
5. **Show variety** - Different styles, genres, techniques

### Content Suggestions
- Add testimonials from clients
- Include your editing workflow/process
- Show your editing setup (behind the scenes)
- Add pricing packages
- Create a blog for video editing tips

---

## 🚀 Deployment Options

### 1. GitHub Pages (Free)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```
Enable Pages in repository settings.

### 2. Netlify Drop
- Drag and drop folder to [netlify.com/drop](https://app.netlify.com/drop)
- Get instant deployment
- Free SSL certificate

### 3. Vercel
```bash
npm install -g vercel
vercel
```

---

## 📝 Checklist Before Launch

- [ ] Replace all placeholder images
- [ ] Add real video thumbnails
- [ ] Connect video embeds to modal
- [ ] Update contact form endpoint
- [ ] Add your social media links
- [ ] Update all text content
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Add analytics (Google Analytics)
- [ ] Set up domain name

---

## 🆘 Troubleshooting

**Q: Video background isn't playing?**
- Check video file format (use MP4)
- Add `playsinline` attribute for iOS
- Ensure file size is under 5MB

**Q: Modal not opening?**
- Check browser console for errors
- Verify `data-video-id` attribute exists
- Test with a valid YouTube/Vimeo ID

**Q: Contact form not working?**
- Update form submission endpoint
- Check browser console for errors
- Test with Formspree or Netlify Forms

**Q: Images not loading?**
- Verify file paths are correct
- Check image file names (case-sensitive)
- Ensure images are in correct folder

---

## 📄 License

Free to use for personal and commercial projects.
Attribution appreciated but not required.

---

## 🎉 Credits

- **Icons:** Font Awesome
- **Fonts:** Google Fonts
- **Placeholder Images:** Unsplash

---

**Need Help?** Check the comments in the code or refer to this README!

**Enjoy your new website! 🎬✨**
