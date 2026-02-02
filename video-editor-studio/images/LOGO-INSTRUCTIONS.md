# Logo Instructions

## 📁 Place Your Logo Here

Save your logo file as: **`logo.png`** in this folder.

### Recommended Logo Specifications:

**Format:** PNG (with transparent background)  
**Dimensions:** 
- Width: 150-200px
- Height: 40-50px
- Aspect ratio: ~3:1 to 4:1

**Alternative formats accepted:**
- logo.svg (vector - best quality)
- logo.jpg (if no transparency needed)

---

## 🎨 Logo Design Tips for "The Last Render"

### Color Scheme:
- Primary: Light Blue (#0170BF)
- Secondary: Teal (#00AF96)
- On white background

### Style Suggestions:
- Modern, minimal design
- Video/film related icon (play button, film reel, clapperboard)
- Clean typography for "The Last Render"
- Professional and cinematic feel

---

## 🔧 Current Setup:

The website is configured to use:
```html
<img src="images/logo.png" alt="The Last Render">
```

### If you don't have a logo yet:

**Option 1:** Use text logo (already in HTML as fallback):
```html
<i class="fas fa-film"></i>
<span>THE LAST <strong>RENDER</strong></span>
```

**Option 2:** Create a logo using:
- Canva.com (free templates)
- Looka.com (AI logo generator)
- Figma.com (design tool)

---

## 📝 Once You Have Your Logo:

1. Save logo as `logo.png` in this `/images/` folder
2. The logo will automatically appear on all pages:
   - Navigation bar (top)
   - Footer (bottom)
   - All 3 pages (index, portfolio, contact)

3. If your logo is a different size, adjust in CSS:
```css
.logo img {
    height: 45px;  /* Change this value */
    width: auto;
}
```

---

**Current logo placeholder:** Font Awesome film icon + text  
**Your logo should replace this once added to this folder.**
