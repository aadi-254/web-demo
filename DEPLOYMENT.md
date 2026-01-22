# Quick Deployment Guide

## 🚀 Fastest Way to Deploy (GitHub Pages)

### Step 1: Push to GitHub

Open PowerShell in this folder and run:

```powershell
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Add website templates portfolio"

# Add your GitHub repository (replace with your actual repo URL)
git remote add origin https://github.com/YOUR-USERNAME/web-templates.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **main** branch and **/ (root)**
5. Click **Save**
6. Wait 2-3 minutes for deployment

### Step 3: Get Your Links

Your portfolio will be live at:
```
https://YOUR-USERNAME.github.io/web-templates/
```

Share individual templates:
```
https://YOUR-USERNAME.github.io/web-templates/hospital-website/
https://YOUR-USERNAME.github.io/web-templates/salon-website/
https://YOUR-USERNAME.github.io/web-templates/electronics-shop/
https://YOUR-USERNAME.github.io/web-templates/grocery-market/
```

---

## 🎯 Alternative: Netlify Drop (No Git Required)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `web-dev` folder
3. Get instant live URL like: `https://random-name.netlify.app/`
4. Share links: `https://random-name.netlify.app/hospital-website/`

**Pros:**
- No git knowledge needed
- Instant deployment (30 seconds)
- Free custom domain

---

## 💡 Comparison

| Method | Difficulty | Time | Custom Domain | Git Required |
|--------|-----------|------|---------------|--------------|
| GitHub Pages | Easy | 5 min | Yes (free) | Yes |
| Netlify Drop | Easiest | 30 sec | Yes (free) | No |
| Vercel | Easy | 3 min | Yes (free) | Optional |

---

## 🔧 Troubleshooting

**Problem:** Links don't work after deployment
- **Solution:** Make sure all paths are relative (`./` or `../`)

**Problem:** Images not loading
- **Solution:** Check that image URLs are absolute or relative from root

**Problem:** CSS not applying
- **Solution:** Verify CSS file paths in HTML `<link>` tags

---

## 📱 Testing Before Deployment

Test locally by opening:
```
c:\Users\adity\Desktop\web-dev\index.html
```

Click each template link to verify everything works.

---

**Need Help?** Create an issue on GitHub or check the README.md file.
