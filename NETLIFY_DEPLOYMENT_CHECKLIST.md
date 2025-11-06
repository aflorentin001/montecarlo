# Netlify Deployment Checklist ✅

## ✅ Pre-Deployment Setup Complete

The following files have been created and configured:

- ✅ `.gitignore` - Notebooks folder excluded from git
- ✅ `netlify.toml` - Netlify build configuration
- ✅ Build tested locally - Working successfully

---

## 📋 Next Steps to Deploy

### Step 1: Initialize Git Repository

```bash
cd /Volumes/Lexar/MonteCarlo_Complete/MonteCarlo_StockRisk
git init
git add .
git commit -m "Initial commit: Monte Carlo Stock Risk Analyzer"
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new **PUBLIC** repository
2. Name it: `MonteCarlo_StockRisk`
3. Do NOT initialize with README (we already have one)

### Step 3: Push to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/MonteCarlo_StockRisk.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your `MonteCarlo_StockRisk` repository
5. Netlify will auto-detect the `netlify.toml` configuration:
   - Base directory: `app`
   - Build command: `npm install --legacy-peer-deps && npm run build`
   - Publish directory: `dist`
6. Click **"Deploy site"**
7. Wait 2-3 minutes for build to complete

### Step 5: Customize URL (Optional)

1. In Netlify dashboard, click **"Site settings"** → **"Change site name"**
2. Choose a name like: `montecarlo-stock-risk`
3. Your URL will be: `https://montecarlo-stock-risk.netlify.app`

---

## 🔍 What's Configured

### `.gitignore` includes:
- ✅ `notebooks/` folder (excluded from git)
- ✅ `node_modules/`
- ✅ Build outputs (`dist/`, `build/`)
- ✅ Environment files
- ✅ IDE and OS files

### `netlify.toml` configures:
- ✅ Base directory: `app`
- ✅ Build command with legacy peer deps flag
- ✅ Node version 20
- ✅ SPA redirect rules for client-side routing

---

## ⚠️ Important Notes

1. **Notebooks are excluded**: The `notebooks/` folder will NOT be pushed to GitHub (as configured in `.gitignore`)

2. **Build uses npm**: The build command uses `npm install --legacy-peer-deps` to handle dependency conflicts

3. **No pnpm on Netlify**: Since Netlify doesn't have pnpm by default, we use npm with the legacy peer deps flag

4. **Environment variables**: If you need any environment variables, add them in Netlify dashboard under Site settings → Environment variables

---

## 🧪 Test Your Deployment

After deployment, verify:
- [ ] App loads at your Netlify URL
- [ ] Monte Carlo simulation runs successfully
- [ ] All interactive features work
- [ ] Charts and visualizations display correctly
- [ ] Responsive design works on mobile

---

## 🐛 Troubleshooting

### If build fails on Netlify:

1. Check the build logs in Netlify dashboard
2. Verify `netlify.toml` is in the root directory
3. Ensure all dependencies are in `package.json`
4. Try clearing cache and redeploying

### If app doesn't load:

1. Check browser console for errors
2. Verify the publish directory is set to `dist`
3. Check that the redirect rules are working

---

## 📝 After Deployment

1. Copy your live Netlify URL
2. Update `README.md` with the live URL (line 138)
3. Test the app thoroughly
4. Share the URL for submission

---

**Ready to deploy! Follow the steps above to get your app live on Netlify.** 🚀
