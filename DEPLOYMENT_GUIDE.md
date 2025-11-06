# Deployment Guide: Monte Carlo Stock Risk Analyzer

This guide will help you deploy your Monte Carlo Stock Risk Analyzer to Netlify and upload your Google Colab notebook.

---

## 📦 Part 1: Deploy Web App to Netlify

### Step 1: Prepare Your GitHub Repository

1. **Create a new GitHub repository:**
   - Go to [github.com](https://github.com) and log in
   - Click the "+" icon in the top right → "New repository"
   - Name it: `MonteCarlo_StockRisk`
   - Make it **PUBLIC** (required for assignment submission)
   - Do NOT initialize with README (we already have one)
   - Click "Create repository"

2. **Push your code to GitHub:**

```bash
# Navigate to the project directory
cd /path/to/MonteCarlo_StockRisk

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Monte Carlo Stock Risk Analyzer"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/MonteCarlo_StockRisk.git

# Push to GitHub
git branch -M main
git push -u origin main
```

3. **Verify on GitHub:**
   - Refresh your GitHub repository page
   - You should see all your files including `README.md`, `montecarlo-stock-app/`, `data/`, etc.

---

### Step 2: Deploy to Netlify

1. **Create a Netlify account:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Sign up" → Choose "Sign up with GitHub"
   - Authorize Netlify to access your GitHub account

2. **Import your project:**
   - On Netlify dashboard, click **"Add new site"** → **"Import an existing project"**
   - Click **"Deploy with GitHub"**
   - Authorize Netlify if prompted
   - Search for and select your `MonteCarlo_StockRisk` repository

3. **Configure build settings:**
   - **Base directory:** `montecarlo-stock-app`
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist`
   - Click **"Deploy site"**

4. **Wait for deployment:**
   - Netlify will build and deploy your site (takes 2-3 minutes)
   - You'll see a build log showing progress
   - Once complete, you'll get a live URL like: `https://random-name-123456.netlify.app`

5. **Customize your URL (optional):**
   - Click "Site settings" → "Change site name"
   - Choose a custom name like: `montecarlo-stock-risk`
   - Your new URL: `https://montecarlo-stock-risk.netlify.app`

6. **Test your live app:**
   - Click the URL to open your app
   - Test the simulation by clicking "Run Monte Carlo Simulation"
   - Verify all features work correctly

7. **Copy your live URL:**
   - **Example:** `https://montecarlo-stock-risk.netlify.app`
   - **Save this URL** - you'll need it for your submission

---

## 📊 Part 2: Upload Google Colab Notebook

### Step 1: Upload Notebook to Google Colab

1. **Go to Google Colab:**
   - Visit [colab.research.google.com](https://colab.research.google.com)
   - Sign in with your Google account

2. **Upload your notebook:**
   - Click **"File"** → **"Upload notebook"**
   - Navigate to `MonteCarlo_StockRisk/notebooks/Monte_Carlo_Stock_Risk_Analysis.ipynb`
   - Click "Open" to upload

3. **Upload the dataset:**
   - In Colab, click the folder icon on the left sidebar
   - Click the upload button (up arrow icon)
   - Upload `MonteCarlo_StockRisk/data/sp500_stock_data.csv`
   - The file will appear in the file browser

4. **Run all cells:**
   - Click **"Runtime"** → **"Run all"**
   - Wait for all cells to execute (takes 30-60 seconds)
   - Verify all visualizations appear correctly

5. **Share your notebook:**
   - Click the **"Share"** button in the top right
   - Under "General access", change to **"Anyone with the link"**
   - Set permission to **"Viewer"**
   - Click "Copy link"
   - **Save this URL** - you'll need it for your submission

---

## 📄 Part 3: Prepare Submission Files

### Step 1: Update README with URLs

1. **Edit README.md:**
   - Open `MonteCarlo_StockRisk/README.md`
   - Find the "Live Demo" section
   - Replace placeholders with your actual URLs:

```markdown
### Web Application
**Live URL:** https://montecarlo-stock-risk.netlify.app

### Google Colab Notebook
**Colab Link:** https://colab.research.google.com/drive/YOUR_NOTEBOOK_ID
```

2. **Update Executive Summary:**
   - Open `executive_summary.md`
   - Add your URLs at the bottom
   - Regenerate PDF:

```bash
manus-md-to-pdf executive_summary.md executive_summary.pdf
```

3. **Commit and push updates:**

```bash
git add .
git commit -m "Add deployment URLs"
git push origin main
```

---

### Step 2: Take Screenshots

1. **Screenshot your web app:**
   - Open your live Netlify URL
   - Run a simulation
   - Take a full-page screenshot showing:
     - Business problem section
     - Simulation parameters
     - Results dashboard
     - Risk assessment
     - Recommendations
   - Save as `images/app_screenshot.png`

2. **Screenshot your Colab notebook:**
   - Open your Colab link
   - Scroll to show key visualizations
   - Take screenshots of:
     - Distribution plots
     - Scenario analysis
     - Statistical summary
   - Save as `images/colab_screenshot.png`

3. **Add screenshots to repo:**

```bash
git add images/
git commit -m "Add screenshots"
git push origin main
```

---

## 📋 Part 4: Final Submission Checklist

Before submitting, verify you have:

### ✅ Required Deliverables

- [ ] **Google Colab Link** (ensure "Anyone with the link can view")
  - URL: `_______________________________`
  - Test in incognito mode to verify access

- [ ] **Live App URL** (Netlify deployment)
  - URL: `_______________________________`
  - Test all features work correctly

- [ ] **GitHub Repository URL** (must be public)
  - URL: `_______________________________`
  - Verify README is complete and professional

- [ ] **Executive Summary PDF** including:
  - [ ] Problem statement & business context
  - [ ] Dataset description & source
  - [ ] Model explanation (equation)
  - [ ] Key findings (mean, CI, probabilities)
  - [ ] Recommendation for decision-makers
  - [ ] Screenshots of your app
  - [ ] Team member contributions

### ✅ File Naming

- [ ] Rename submission folder to: `MonteCarlo_[YourTeamName]`
- [ ] Example: `MonteCarlo_DataDriven`

### ✅ Quality Checks

- [ ] All links work in incognito/private browsing mode
- [ ] Web app is responsive and works on mobile
- [ ] Colab notebook runs without errors
- [ ] README is comprehensive and professional
- [ ] Executive summary is 1-2 pages maximum
- [ ] Screenshots are clear and high-resolution
- [ ] GitHub repository is public and well-organized

---

## 🎯 Submission Format

### Option 1: Submit Links Only

Create a document with:

```
Monte Carlo Stock Risk Analyzer Submission
Team Name: [Your Team Name]

1. Google Colab Link: [URL]
2. Live App URL (Netlify): [URL]
3. GitHub Repository: [URL]
4. Executive Summary PDF: [Attach file or provide link]
```

### Option 2: Submit Complete Package

Create a ZIP file named `MonteCarlo_[YourTeamName].zip` containing:

```
MonteCarlo_[YourTeamName]/
├── README.md
├── executive_summary.pdf
├── data/
│   └── sp500_stock_data.csv
├── notebooks/
│   └── Monte_Carlo_Stock_Risk_Analysis.ipynb
├── images/
│   ├── app_screenshot.png
│   └── colab_screenshot.png
└── LINKS.txt (containing all URLs)
```

---

## 🐛 Troubleshooting

### Netlify Build Fails

**Error:** "Build command failed"

**Solution:**
1. Check that `pnpm` is installed in your project
2. Verify `package.json` has correct build script
3. Try building locally first: `cd montecarlo-stock-app && pnpm build`
4. Check Netlify build logs for specific errors

### Colab Notebook Errors

**Error:** "File not found: sp500_stock_data.csv"

**Solution:**
1. Make sure you uploaded the CSV file to Colab
2. Check the file path in the notebook matches the uploaded location
3. Re-upload the file if necessary

### GitHub Push Fails

**Error:** "Permission denied"

**Solution:**
1. Use HTTPS URL instead of SSH if you don't have SSH keys set up
2. Generate a Personal Access Token on GitHub if password authentication fails
3. Follow GitHub's authentication guide: https://docs.github.com/en/authentication

---

## 📧 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Netlify's documentation: https://docs.netlify.com
3. Check Google Colab FAQ: https://research.google.com/colaboratory/faq.html
4. Ask your instructor or TA for help

---

**Good luck with your submission! 🚀**

*Last Updated: November 5, 2025*
