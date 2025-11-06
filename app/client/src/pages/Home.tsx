import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, BarChart3, PieChart, Github, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  // State for inputs
  const [investment, setInvestment] = useState(100000);
  const [timeHorizon, setTimeHorizon] = useState(30);
  const [numSimulations, setNumSimulations] = useState(10000);
  const [meanReturn, setMeanReturn] = useState(0.0006);
  const [volatility, setVolatility] = useState(0.012);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  
  // State for results
  const [results, setResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Monte Carlo simulation function
  const runSimulation = () => {
    setIsRunning(true);
    toast.info("Running Monte Carlo simulation...");

    // Simulate with setTimeout to allow UI to update
    setTimeout(() => {
      const finalValues: number[] = [];
      const currentPrice = 596.56; // Last price from dataset
      const numShares = investment / currentPrice;

      // Run simulations
      for (let sim = 0; sim < numSimulations; sim++) {
        let price = currentPrice;
        
        // Simulate price path
        for (let day = 0; day < timeHorizon; day++) {
          // Generate random return from normal distribution
          const u1 = Math.random();
          const u2 = Math.random();
          const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); // Box-Muller transform
          const randomReturn = meanReturn + volatility * z;
          
          price = price * (1 + randomReturn);
        }
        
        const portfolioValue = numShares * price;
        finalValues.push(portfolioValue);
      }

      // Calculate statistics
      finalValues.sort((a, b) => a - b);
      const mean = finalValues.reduce((a, b) => a + b, 0) / finalValues.length;
      const variance = finalValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / finalValues.length;
      const std = Math.sqrt(variance);
      
      const p5 = finalValues[Math.floor(finalValues.length * 0.05)];
      const p25 = finalValues[Math.floor(finalValues.length * 0.25)];
      const p50 = finalValues[Math.floor(finalValues.length * 0.50)];
      const p75 = finalValues[Math.floor(finalValues.length * 0.75)];
      const p95 = finalValues[Math.floor(finalValues.length * 0.95)];
      
      const var5 = investment - p5;
      const expectedReturn = mean - investment;
      const probProfit = finalValues.filter(v => v > investment).length / finalValues.length;
      const probLoss10 = finalValues.filter(v => v < investment * 0.9).length / finalValues.length;

      setResults({
        mean,
        std,
        p5,
        p25,
        p50,
        p75,
        p95,
        var5,
        expectedReturn,
        probProfit,
        probLoss10,
        finalValues: finalValues.slice(0, 1000), // Keep only 1000 for visualization
        currentPrice,
        numShares
      });

      setIsRunning(false);
      toast.success("Simulation complete!");
    }, 100);
  };

  const getRiskLevel = () => {
    if (!results) return { level: "UNKNOWN", color: "gray", message: "" };
    
    if (results.probProfit >= 0.65) {
      return {
        level: "LOW RISK",
        color: "green",
        message: "High probability of profit. Suitable for conservative investors."
      };
    } else if (results.probProfit >= 0.50) {
      return {
        level: "MEDIUM RISK",
        color: "orange",
        message: "Balanced risk-reward profile. Suitable for moderate investors."
      };
    } else {
      return {
        level: "HIGH RISK",
        color: "red",
        message: "Lower probability of profit. Only for aggressive investors."
      };
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return (value * 100).toFixed(1) + '%';
  };

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What does Monte Carlo simulation use to model uncertainty?',
      options: ['Historical data only', 'Random sampling', 'Fixed predictions', 'Expert opinions'],
      correct: 'Random sampling'
    },
    {
      id: 'q2',
      question: 'What does Value at Risk (VaR) represent?',
      options: ['Expected profit', 'Maximum possible loss', 'Potential loss at a confidence level', 'Average return'],
      correct: 'Potential loss at a confidence level'
    },
    {
      id: 'q3',
      question: 'What distribution is commonly used for stock returns in Monte Carlo?',
      options: ['Uniform', 'Normal (Gaussian)', 'Exponential', 'Binomial'],
      correct: 'Normal (Gaussian)'
    },
    {
      id: 'q4',
      question: 'Why run 10,000 simulations instead of just 100?',
      options: ['Faster results', 'More accurate probability estimates', 'Less computation', 'Simpler analysis'],
      correct: 'More accurate probability estimates'
    }
  ];

  const checkQuizAnswers = () => {
    const correct = quizQuestions.filter(q => quizAnswers[q.id] === q.correct).length;
    const total = quizQuestions.length;
    const percentage = (correct / total) * 100;
    
    if (percentage === 100) {
      toast.success(`Perfect score! ${correct}/${total} correct! 🎉`);
    } else if (percentage >= 75) {
      toast.success(`Great job! ${correct}/${total} correct!`);
    } else if (percentage >= 50) {
      toast.info(`Good effort! ${correct}/${total} correct. Review the concepts.`);
    } else {
      toast.error(`${correct}/${total} correct. Study the Monte Carlo method more.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Monte Carlo Stock Risk Analyzer
              </h1>
              <p className="text-sm text-gray-600">S&P 500 Investment Decision Support System</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQuiz(!showQuiz)}
              className="gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              {showQuiz ? 'Hide Quiz' : 'Test Your Knowledge'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://github.com/aflorentin001/montecarlo', '_blank')}
              className="gap-2"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quiz Section */}
        {showQuiz && (
          <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <HelpCircle className="h-6 w-6" />
                Monte Carlo Knowledge Quiz
              </CardTitle>
              <CardDescription>Test your understanding of Monte Carlo simulation concepts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {quizQuestions.map((q, idx) => (
                <div key={q.id} className="space-y-2">
                  <Label className="text-base font-semibold">
                    {idx + 1}. {q.question}
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: option })}
                        className={`p-3 text-left rounded-lg border-2 transition-all ${
                          quizAnswers[q.id] === option
                            ? 'border-purple-500 bg-purple-100 font-medium'
                            : 'border-gray-200 hover:border-purple-300 bg-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <Button onClick={checkQuizAnswers} className="w-full bg-purple-600 hover:bg-purple-700">
                Check Answers
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Business Problem */}
        <Card className="mb-8 border-l-4 border-l-blue-500 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <AlertTriangle className="h-5 w-5" />
              Business Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg mb-4">
              <strong>Question:</strong> What is the expected value and risk (Value at Risk) of a ${investment.toLocaleString()} investment in the S&P 500 over the next {timeHorizon} days?
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-blue-600">Stakeholder:</strong> Portfolio managers, individual investors
              </div>
              <div>
                <strong className="text-blue-600">Decision:</strong> Determine optimal position sizing, set stop-loss levels, assess risk tolerance
              </div>
              <div>
                <strong className="text-blue-600">Why Uncertainty Matters:</strong> Stock prices are inherently unpredictable. Understanding the range of possible outcomes helps investors make informed decisions about risk vs. reward.
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Parameters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg border-2 border-blue-100">
              <CardHeader className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <CardTitle>Simulation Parameters</CardTitle>
                <CardDescription className="text-blue-100">Adjust parameters based on your investment scenario</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <Label htmlFor="investment" className="text-base font-semibold">Initial Investment ($)</Label>
                  <Input
                    id="investment"
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="mt-2 text-lg font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">Amount to invest in S&P 500</p>
                </div>

                <div>
                  <Label className="text-base font-semibold">Time Horizon: {timeHorizon} days</Label>
                  <Slider
                    value={[timeHorizon]}
                    onValueChange={(v) => setTimeHorizon(v[0])}
                    min={7}
                    max={365}
                    step={1}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Investment duration</p>
                </div>

                <div>
                  <Label className="text-base font-semibold">Simulations: {numSimulations.toLocaleString()}</Label>
                  <Slider
                    value={[numSimulations]}
                    onValueChange={(v) => setNumSimulations(v[0])}
                    min={1000}
                    max={50000}
                    step={1000}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">More = more accurate</p>
                </div>

                <div>
                  <Label htmlFor="meanReturn" className="text-base font-semibold">Mean Daily Return</Label>
                  <Input
                    id="meanReturn"
                    type="number"
                    step="0.0001"
                    value={meanReturn}
                    onChange={(e) => setMeanReturn(Number(e.target.value))}
                    className="mt-2 font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">Average daily return ({(meanReturn * 100).toFixed(2)}% = {(meanReturn * 252 * 100).toFixed(1)}% annually)</p>
                </div>

                <div>
                  <Label htmlFor="volatility" className="text-base font-semibold">Volatility (Std Dev)</Label>
                  <Input
                    id="volatility"
                    type="number"
                    step="0.001"
                    value={volatility}
                    onChange={(e) => setVolatility(Number(e.target.value))}
                    className="mt-2 font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">Daily volatility ({(volatility * 100).toFixed(2)}% = {(volatility * Math.sqrt(252) * 100).toFixed(1)}% annually)</p>
                </div>

                <Button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  {isRunning ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Running...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Run Monte Carlo Simulation
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2">
            {!results ? (
              <Card className="h-full flex items-center justify-center shadow-lg border-2 border-dashed border-gray-300">
                <CardContent className="text-center py-16">
                  <PieChart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Ready to Analyze</h3>
                  <p className="text-gray-500 max-w-md">
                    Adjust parameters and click "Run Simulation" to see results
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Risk Assessment Banner */}
                <Card className={`border-l-4 shadow-lg ${
                  getRiskLevel().color === 'green' ? 'border-l-green-500 bg-green-50' :
                  getRiskLevel().color === 'orange' ? 'border-l-orange-500 bg-orange-50' :
                  'border-l-red-500 bg-red-50'
                }`}>
                  <CardHeader>
                    <CardTitle className={`text-2xl ${
                      getRiskLevel().color === 'green' ? 'text-green-700' :
                      getRiskLevel().color === 'orange' ? 'text-orange-700' :
                      'text-red-700'
                    }`}>
                      Risk Assessment: {getRiskLevel().level}
                    </CardTitle>
                    <CardDescription className="text-base">{getRiskLevel().message}</CardDescription>
                  </CardHeader>
                </Card>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="shadow-lg border-2 border-blue-100">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Expected Portfolio Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                        <span className="text-3xl font-bold text-blue-600">{formatCurrency(results.mean)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {results.expectedReturn >= 0 ? (
                          <span className="text-green-600 font-semibold">+{formatCurrency(results.expectedReturn)} ({formatPercent(results.expectedReturn / investment)})</span>
                        ) : (
                          <span className="text-red-600 font-semibold">{formatCurrency(results.expectedReturn)} ({formatPercent(results.expectedReturn / investment)})</span>
                        )}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-red-100">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Value at Risk (5%)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                        <span className="text-3xl font-bold text-red-600">{formatCurrency(results.var5)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        5% chance of losing <span className="font-semibold text-red-600">{formatPercent(results.var5 / investment)}</span> or more
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-green-100">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Probability of Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                        <span className="text-3xl font-bold text-green-600">{formatPercent(results.probProfit)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Chance of positive returns
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-2 border-purple-100">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">90% Confidence Interval</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-semibold text-purple-600">
                        {formatCurrency(results.p5)} - {formatCurrency(results.p95)}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        90% likely to fall in this range
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Scenario Analysis */}
                <Card className="shadow-lg border-2 border-gray-100">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-transparent">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-gray-700" />
                      Scenario Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-5 gap-4">
                      <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                        <div className="text-xs font-semibold text-red-600 mb-1">WORST CASE (5%)</div>
                        <div className="text-lg font-bold text-red-700">{formatCurrency(results.p5)}</div>
                        <div className="text-xs text-red-600 mt-1">{formatPercent((results.p5 - investment) / investment)}</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                        <div className="text-xs font-semibold text-orange-600 mb-1">PESSIMISTIC (25%)</div>
                        <div className="text-lg font-bold text-orange-700">{formatCurrency(results.p25)}</div>
                        <div className="text-xs text-orange-600 mt-1">{formatPercent((results.p25 - investment) / investment)}</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <div className="text-xs font-semibold text-blue-600 mb-1">MEDIAN (50%)</div>
                        <div className="text-lg font-bold text-blue-700">{formatCurrency(results.p50)}</div>
                        <div className="text-xs text-blue-600 mt-1">{formatPercent((results.p50 - investment) / investment)}</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="text-xs font-semibold text-green-600 mb-1">OPTIMISTIC (75%)</div>
                        <div className="text-lg font-bold text-green-700">{formatCurrency(results.p75)}</div>
                        <div className="text-xs text-green-600 mt-1">{formatPercent((results.p75 - investment) / investment)}</div>
                      </div>
                      <div className="text-center p-4 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                        <div className="text-xs font-semibold text-emerald-600 mb-1">BEST CASE (95%)</div>
                        <div className="text-lg font-bold text-emerald-700">{formatCurrency(results.p95)}</div>
                        <div className="text-xs text-emerald-600 mt-1">{formatPercent((results.p95 - investment) / investment)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="shadow-lg border-2 border-indigo-100">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-transparent">
                    <CardTitle className="flex items-center gap-2 text-indigo-700">
                      <TrendingUp className="h-5 w-5" />
                      Investment Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {results.probProfit >= 0.60 ? (
                      <div className="space-y-3">
                        <p className="font-semibold text-green-700">✓ PROCEED - Favorable risk-reward profile</p>
                        <ul className="space-y-2 text-sm">
                          <li>• <strong>Position Sizing:</strong> Full investment acceptable for moderate-aggressive investors</li>
                          <li>• <strong>Risk Management:</strong> Set stop-loss at {formatPercent(0.08)} below entry ({formatCurrency(investment * 0.92)})</li>
                          <li>• <strong>Profit Taking:</strong> Consider taking partial profits at {formatCurrency(results.p75)} (+{formatPercent((results.p75 - investment) / investment)})</li>
                          <li>• <strong>Monitoring:</strong> Track performance weekly and adjust based on market conditions</li>
                        </ul>
                      </div>
                    ) : results.probProfit >= 0.45 ? (
                      <div className="space-y-3">
                        <p className="font-semibold text-orange-700">⚠ PROCEED WITH CAUTION - Balanced but uncertain</p>
                        <ul className="space-y-2 text-sm">
                          <li>• <strong>Position Sizing:</strong> Consider reducing to {formatCurrency(investment * 0.5)} - {formatCurrency(investment * 0.75)}</li>
                          <li>• <strong>Risk Management:</strong> Tight stop-loss at {formatPercent(0.05)} ({formatCurrency(investment * 0.95)})</li>
                          <li>• <strong>Diversification:</strong> Allocate remaining capital to bonds or safer assets</li>
                          <li>• <strong>Review:</strong> Re-evaluate after {Math.floor(timeHorizon / 2)} days</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="font-semibold text-red-700">✗ HIGH RISK - Reconsider this investment</p>
                        <ul className="space-y-2 text-sm">
                          <li>• <strong>Position Sizing:</strong> Reduce to {formatCurrency(investment * 0.25)} - {formatCurrency(investment * 0.5)} maximum</li>
                          <li>• <strong>Alternative Strategy:</strong> Wait for better market conditions or consider hedging</li>
                          <li>• <strong>Risk Tolerance:</strong> Only suitable for aggressive investors who can tolerate {formatPercent(results.probLoss10)} chance of {formatPercent(0.1)} loss</li>
                          <li>• <strong>Exit Plan:</strong> Define clear exit criteria before entering position</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p className="font-semibold mb-2">Monte Carlo Stock Risk Analyzer</p>
          <p>Built with React + TypeScript | Powered by Monte Carlo Simulation</p>
          <p className="mt-2">Data-driven investment decision support for S&P 500</p>
        </div>
      </footer>
    </div>
  );
}
