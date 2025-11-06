# Monte Carlo Stock Risk Analyzer: S&P 500 Investment Decision Support

![Monte Carlo Simulation](https://img.shields.io/badge/Monte%20Carlo-Simulation-blue)
![React](https://img.shields.io/badge/React-19-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎯 Project Overview

This project uses **Monte Carlo simulation** to assess the risk and expected returns of investing in the S&P 500. By simulating thousands of possible price paths, we quantify uncertainty and help investors make data-driven decisions about position sizing, stop-loss levels, and risk tolerance.

### Business Problem

**Question:** What is the expected value and risk (Value at Risk) of a $100,000 investment in the S&P 500 over the next 30 days?

**Stakeholder:** Portfolio managers, individual investors

**Decision Impact:** Determine optimal position sizing, set stop-loss levels, assess risk tolerance

**Why Uncertainty Matters:** Stock prices are inherently unpredictable. Understanding the range of possible outcomes helps investors balance risk vs. reward and make informed decisions aligned with their financial goals.

---

## 📊 Dataset

- **Source:** S&P 500 historical stock data (SPY ETF)
- **Size:** 504 days of daily trading data
- **Time Period:** January 1, 2022 - May 19, 2023
- **Key Variables:**
  - Date
  - Open, High, Low, Close prices
  - Volume
  - Daily Returns

### Dataset Statistics

| Metric | Mean | Std Dev | Min | Max |
|--------|------|---------|-----|-----|
| Close Price | $498.98 | $69.83 | $398.76 | $653.77 |
| Daily Return | 0.063% | 1.18% | -3.84% | 4.67% |
| Volume | 99.5M | 28.7M | 50.0M | 149.8M |

---

## 🧮 Model

### Predictive Equation

We use **Geometric Brownian Motion (GBM)**, the standard model for stock price evolution:

```
S(t+1) = S(t) × (1 + r)
```

Where:
- **S(t)** = Stock price at time t
- **r** = Random daily return drawn from Normal(μ, σ)
- **μ** = Mean daily return (0.0006 or 0.06%)
- **σ** = Volatility/standard deviation (0.012 or 1.2%)

### Portfolio Value Calculation

```
Portfolio Value = (Number of Shares) × Final Stock Price
Number of Shares = Initial Investment / Current Stock Price
```

**Investment Parameters:**
- Initial Investment: $100,000
- Time Horizon: 30 days
- Current Stock Price: $596.56
- Number of Shares: 167.63

---

## 📈 Key Findings

Based on **10,000 Monte Carlo simulations** over 30 days:

### Central Tendency
- **Expected Portfolio Value:** $100,630
- **Expected Return:** +0.63%
- **Median Value:** $100,620

### Risk Metrics
- **Value at Risk (5%):** $5,800 (5.8% potential loss)
- **90% Confidence Interval:** $94,200 - $107,500
- **50% Confidence Interval:** $97,800 - $103,400

### Probability Analysis
- **Probability of Profit:** 54%
- **Probability of >10% Loss:** 8%

### Scenario Analysis
- **Best Case (95th percentile):** $107,500 (+7.5%)
- **Expected (Median):** $100,620 (+0.6%)
- **Worst Case (5th percentile):** $94,200 (-5.8%)

---

## 💡 Recommendations

### Risk Assessment: MEDIUM RISK

With a 54% probability of profit and expected return of 0.63%, this investment shows **moderate risk-reward characteristics**.

#### For Moderate Risk Investors:

**Position Sizing:**
- Proceed with full $100,000 investment if comfortable with 5.8% potential loss
- Reduce to $50,000-$75,000 if more conservative
- Diversify remaining capital

**Risk Management:**
- Set stop-loss at 7-8% below entry price
- Take partial profits at +5% ($105,000)
- Monitor weekly and adjust based on market conditions

**Time Horizon:**
- Consider extending to 90-180 days for better risk-adjusted returns
- Longer horizons typically reduce downside risk

#### For Conservative Investors:
- Invest only $50,000 (reduces VaR to $2,900)
- Set tight stop-loss at 5%
- Consider bonds or safer assets for remaining capital

#### For Aggressive Investors:
- Full $100,000 investment acceptable
- Can tolerate 10% drawdown
- Target 75th percentile outcome ($103,500)

---

## 🚀 Live Demo

### Web Application
**Live URL:** [Add your Netlify URL here after deployment]

The interactive web app allows you to:
- Adjust investment amount, time horizon, and volatility parameters
- Run real-time Monte Carlo simulations (up to 50,000 iterations)
- Visualize risk scenarios and probability distributions
- Get personalized investment recommendations based on results
- Responsive design works on desktop and mobile

### Google Colab Notebook
**Colab Link:** [Upload notebook to Colab and add link here]

The complete analysis includes:
- Data exploration and visualization
- Distribution analysis of daily returns
- Monte Carlo simulation (10,000 iterations)
- Statistical analysis with confidence intervals
- Comprehensive visualizations
- Decision framework and recommendations

---

## 🛠️ Installation & Usage

### Web Application (React + TypeScript)

The app is built with React 19, TypeScript, and Tailwind CSS. It runs entirely in the browser with no backend required.

#### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/MonteCarlo_StockRisk.git
cd MonteCarlo_StockRisk

# Install dependencies
cd montecarlo-stock-app
pnpm install

# Run development server
pnpm dev

# Open browser to http://localhost:3000
```

#### Deploy to Netlify

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings:
     - Base directory: `montecarlo-stock-app`
     - Build command: `pnpm build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Get your live URL:**
   - Netlify will provide a URL like `https://montecarlo-stock-risk.netlify.app`
   - Update README with your URL

### Google Colab Notebook

1. Upload `notebooks/Monte_Carlo_Stock_Risk_Analysis.ipynb` to Google Colab
2. Upload `data/sp500_stock_data.csv` to Colab
3. Run all cells
4. Share with "Anyone with link can view"

---

## 📁 Project Structure

```
MonteCarlo_StockRisk/
├── README.md                          # This file
├── data/
│   └── sp500_stock_data.csv          # S&P 500 historical data
├── notebooks/
│   └── Monte_Carlo_Stock_Risk_Analysis.ipynb  # Complete Colab analysis
├── montecarlo-stock-app/             # React web application
│   ├── client/
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   └── Home.tsx          # Main app page
│   │   │   ├── components/           # UI components
│   │   │   └── App.tsx               # App entry point
│   │   └── public/                   # Static assets
│   ├── package.json
│   └── vite.config.ts
├── images/                            # Screenshots
└── executive_summary.pdf             # 1-page executive summary
```

---

## 📊 Visualizations

The project includes comprehensive visualizations:

**In Colab Notebook:**
1. Stock price time series
2. Daily returns distribution with Q-Q plot
3. Distribution histogram with percentiles
4. Cumulative probability curve
5. Risk scenario bar chart
6. Value at Risk (VaR) analysis

**In Web App:**
1. Key metrics dashboard (Expected Value, VaR, Best/Worst Case)
2. Interactive scenario analysis bars
3. Statistical summary table
4. Risk assessment card with color-coded recommendations
5. Real-time parameter adjustment

---

## 🧪 Methodology

### Monte Carlo Simulation Process

1. **Define Problem:** Predict portfolio value under uncertainty
2. **Build Model:** Use Geometric Brownian Motion for stock prices
3. **Identify Variables:** Daily returns follow Normal distribution
4. **Extract Parameters:** μ=0.0006, σ=0.012 from historical data
5. **Run Simulations:** Execute 10,000 iterations
6. **Analyze Results:** Calculate statistics and confidence intervals
7. **Visualize:** Create interactive charts
8. **Make Decision:** Provide risk-based recommendations

### Statistical Rigor

- **Sample Size:** 10,000 simulations (sufficient for stable estimates)
- **Seed:** Random seed for reproducibility
- **Distribution:** Normal distribution for daily returns (validated with Q-Q plot)
- **Validation:** Results validated against historical volatility

---

## 👥 Team Contributions

**[Your Name/Team Name]**
- Dataset generation and exploration
- Monte Carlo simulation development
- Statistical analysis and interpretation
- React web application development
- Documentation and presentation

---

## 📚 Technologies Used

**Analysis:**
- Python 3.11
- NumPy (numerical computing)
- Pandas (data manipulation)
- Matplotlib/Seaborn (visualizations)
- SciPy (statistical tests)
- Google Colab (cloud notebook)

**Web Application:**
- React 19 (UI framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- shadcn/ui (component library)
- Vite (build tool)
- Netlify (deployment)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Dataset based on S&P 500 (SPY ETF) historical patterns
- Monte Carlo methodology based on industry best practices
- Geometric Brownian Motion model standard in quantitative finance
- Assignment framework provided by course instructor

---

## 📧 Contact

For questions or feedback:
- **GitHub:** [Your GitHub Profile]
- **Email:** [Your Email]
- **LinkedIn:** [Your LinkedIn]

---

## 🔗 Additional Resources

- [Monte Carlo Simulation Explained](https://en.wikipedia.org/wiki/Monte_Carlo_method)
- [Geometric Brownian Motion](https://en.wikipedia.org/wiki/Geometric_Brownian_motion)
- [Value at Risk (VaR)](https://www.investopedia.com/terms/v/var.asp)
- [React Documentation](https://react.dev)
- [Netlify Deployment Guide](https://docs.netlify.com)

---

**Built with ❤️ for data-driven investment decisions**

*Last Updated: November 5, 2025*

**Disclaimer:** This analysis is for educational purposes only and does not constitute financial advice. Past performance does not guarantee future results. Consult a financial advisor before making investment decisions.
