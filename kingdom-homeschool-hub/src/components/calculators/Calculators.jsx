import { useState, useCallback } from 'react';
import { DollarSign, TrendingDown, Target, Shield, BarChart2, ArrowUpDown } from 'lucide-react';
import './Calculators.css';

/* ── Utility ── */
const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
const fmtDec = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const InputField = ({ label, value, onChange, prefix, suffix, min = 0, step = 1, type = 'number', placeholder }) => (
  <div className="calc__field">
    <label className="form-label">{label}</label>
    <div className="calc__input-wrap">
      {prefix && <span className="calc__prefix">{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`form-input calc__input ${prefix ? 'has-prefix' : ''} ${suffix ? 'has-suffix' : ''}`}
        min={min}
        step={step}
        placeholder={placeholder}
      />
      {suffix && <span className="calc__suffix">{suffix}</span>}
    </div>
  </div>
);

const ResultRow = ({ label, value, highlight }) => (
  <div className={`calc__result-row ${highlight ? 'highlight' : ''}`}>
    <span className="calc__result-label">{label}</span>
    <span className="calc__result-value">{value}</span>
  </div>
);

/* ── 1. Budget Calculator ── */
export function BudgetCalculator() {
  const [income, setIncome] = useState(5000);
  const [tithe, setTithe] = useState(10);
  const [savings, setSavings] = useState(20);

  const titheAmt = income * (tithe / 100);
  const savingsAmt = income * (savings / 100);
  const living = income - titheAmt - savingsAmt;
  const livingPct = 100 - Number(tithe) - Number(savings);

  return (
    <div className="calc">
      <div className="calc__inputs">
        <InputField label="Monthly Take-Home Income" value={income} onChange={setIncome} prefix="$" step={100} />
        <InputField label="Tithe Percentage" value={tithe} onChange={setTithe} suffix="%" max={50} />
        <InputField label="Savings Percentage" value={savings} onChange={setSavings} suffix="%" max={80} />
      </div>
      <div className="calc__results">
        <h4 className="calc__results-title">Your Kingdom Budget</h4>
        <ResultRow label={`Tithe & Giving (${tithe}%)`} value={fmt(titheAmt)} />
        <ResultRow label={`Savings & Investing (${savings}%)`} value={fmt(savingsAmt)} />
        <ResultRow label={`Living Expenses (${livingPct}%)`} value={fmt(living)} highlight />
        <div className="calc__bar-section">
          <div className="calc__bar-track">
            <div className="calc__bar-seg calc__bar-seg--green" style={{ width: `${tithe}%` }} title={`Giving ${tithe}%`} />
            <div className="calc__bar-seg calc__bar-seg--gold" style={{ width: `${savings}%` }} title={`Savings ${savings}%`} />
            <div className="calc__bar-seg calc__bar-seg--navy" style={{ width: `${livingPct}%` }} title={`Living ${livingPct}%`} />
          </div>
          <div className="calc__bar-legend">
            <span><i style={{background:'var(--sage-500)'}} />Giving</span>
            <span><i style={{background:'var(--gold-500)'}} />Savings</span>
            <span><i style={{background:'var(--navy-500)'}} />Living</span>
          </div>
        </div>
        <p className="calc__verse">"Honor the Lord with your wealth, with the firstfruits of all your crops." — Proverbs 3:9</p>
      </div>
    </div>
  );
}

/* ── 2. Debt Payoff Calculator ── */
export function DebtPayoffCalculator() {
  const [balance, setBalance] = useState(10000);
  const [rate, setRate] = useState(19.99);
  const [minPayment, setMinPayment] = useState(250);
  const [extraPayment, setExtraPayment] = useState(100);

  const totalPayment = Number(minPayment) + Number(extraPayment);
  const monthlyRate = rate / 100 / 12;

  const calcMonths = (payment) => {
    if (payment <= balance * monthlyRate) return Infinity;
    return Math.ceil(-Math.log(1 - (balance * monthlyRate) / payment) / Math.log(1 + monthlyRate));
  };

  const calcInterest = (payment, months) => {
    if (!isFinite(months)) return 0;
    return payment * months - balance;
  };

  const monthsMin = calcMonths(minPayment);
  const monthsTotal = calcMonths(totalPayment);
  const interestMin = calcInterest(Number(minPayment), monthsMin);
  const interestExtra = calcInterest(totalPayment, monthsTotal);
  const interestSaved = interestMin - interestExtra;
  const monthsSaved = monthsMin - monthsTotal;

  const formatMonths = (m) => {
    if (!isFinite(m)) return 'Never (payment too low)';
    const yr = Math.floor(m / 12);
    const mo = m % 12;
    return [yr > 0 && `${yr}yr`, mo > 0 && `${mo}mo`].filter(Boolean).join(' ');
  };

  return (
    <div className="calc">
      <div className="calc__inputs">
        <InputField label="Current Balance" value={balance} onChange={setBalance} prefix="$" step={500} />
        <InputField label="Annual Interest Rate (APR)" value={rate} onChange={setRate} suffix="%" step={0.1} />
        <InputField label="Minimum Monthly Payment" value={minPayment} onChange={setMinPayment} prefix="$" step={10} />
        <InputField label="Extra Monthly Payment" value={extraPayment} onChange={setExtraPayment} prefix="$" step={10} />
      </div>
      <div className="calc__results">
        <h4 className="calc__results-title">Payoff Comparison</h4>
        <ResultRow label="Payoff (minimum only)" value={formatMonths(monthsMin)} />
        <ResultRow label="Interest paid (minimum)" value={isFinite(monthsMin) ? fmt(interestMin) : 'N/A'} />
        <div className="calc__divider" />
        <ResultRow label="Payoff (with extra payment)" value={formatMonths(monthsTotal)} />
        <ResultRow label="Interest paid (with extra)" value={fmt(interestExtra)} />
        <div className="calc__divider" />
        {isFinite(monthsMin) && (
          <>
            <ResultRow label="⚡ Time Saved" value={formatMonths(monthsSaved)} highlight />
            <ResultRow label="💰 Interest Saved" value={fmt(interestSaved)} highlight />
          </>
        )}
        <p className="calc__verse">"The borrower is slave to the lender." — Proverbs 22:7</p>
      </div>
    </div>
  );
}

/* ── 3. Savings Goal Calculator ── */
export function SavingsGoalCalculator() {
  const [goal, setGoal] = useState(10000);
  const [current, setCurrent] = useState(500);
  const [monthly, setMonthly] = useState(300);
  const [rate, setRate] = useState(4.5);

  const remaining = Math.max(0, goal - current);
  const monthlyRate = rate / 100 / 12;

  let months;
  if (monthlyRate === 0) {
    months = monthly > 0 ? Math.ceil(remaining / monthly) : Infinity;
  } else {
    months = monthly > 0
      ? Math.ceil(Math.log(1 + (remaining * monthlyRate) / monthly) / Math.log(1 + monthlyRate))
      : Infinity;
  }

  const totalContributions = Number(current) + monthly * months;
  const interestEarned = isFinite(months) ? (totalContributions - goal + remaining - (goal - current)) : 0;
  const targetDate = isFinite(months)
    ? new Date(Date.now() + months * 30.5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A';

  return (
    <div className="calc">
      <div className="calc__inputs">
        <InputField label="Savings Goal" value={goal} onChange={setGoal} prefix="$" step={500} />
        <InputField label="Current Savings" value={current} onChange={setCurrent} prefix="$" step={100} />
        <InputField label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="$" step={25} />
        <InputField label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.1} />
      </div>
      <div className="calc__results">
        <h4 className="calc__results-title">Goal Timeline</h4>
        <ResultRow label="Amount Remaining" value={fmt(remaining)} />
        <ResultRow label="Months to Goal" value={isFinite(months) ? `${months} months` : 'Increase contribution'} />
        <ResultRow label="Target Date" value={targetDate} highlight />
        <ResultRow label="Interest Earned" value={isFinite(months) ? fmt(Math.max(0, (goal - current) * (rate/100/12) * months)) : 'N/A'} />
        <div className="calc__progress-wrap">
          <div className="calc__progress-bar">
            <div className="calc__progress-fill" style={{ width: `${Math.min(100, (current / goal) * 100)}%` }} />
          </div>
          <span className="calc__progress-pct">{Math.round((current / goal) * 100)}% there</span>
        </div>
        <p className="calc__verse">"The plans of the diligent lead to profit." — Proverbs 21:5</p>
      </div>
    </div>
  );
}

/* ── 4. Emergency Fund Calculator ── */
export function EmergencyFundCalculator() {
  const [housing, setHousing] = useState(1200);
  const [utilities, setUtilities] = useState(200);
  const [food, setFood] = useState(500);
  const [transport, setTransport] = useState(300);
  const [insurance, setInsurance] = useState(200);
  const [debtMin, setDebtMin] = useState(400);
  const [current, setCurrent] = useState(500);
  const [monthly, setMonthly] = useState(200);
  const [months, setMonths] = useState(3);

  const monthlyExpenses = [housing, utilities, food, transport, insurance, debtMin].reduce((a, b) => Number(a) + Number(b), 0);
  const target = monthlyExpenses * months;
  const remaining = Math.max(0, target - current);
  const monthsToGoal = monthly > 0 ? Math.ceil(remaining / monthly) : Infinity;
  const targetDate = isFinite(monthsToGoal)
    ? new Date(Date.now() + monthsToGoal * 30.5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A';

  return (
    <div className="calc">
      <div className="calc__inputs">
        <h4 className="calc__sub-header">Monthly Essential Expenses</h4>
        <InputField label="Housing (rent/mortgage)" value={housing} onChange={setHousing} prefix="$" step={50} />
        <InputField label="Utilities" value={utilities} onChange={setUtilities} prefix="$" step={10} />
        <InputField label="Food & Groceries" value={food} onChange={setFood} prefix="$" step={25} />
        <InputField label="Transportation" value={transport} onChange={setTransport} prefix="$" step={25} />
        <InputField label="Insurance" value={insurance} onChange={setInsurance} prefix="$" step={25} />
        <InputField label="Minimum Debt Payments" value={debtMin} onChange={setDebtMin} prefix="$" step={25} />
        <h4 className="calc__sub-header">Your Situation</h4>
        <InputField label="Current Emergency Savings" value={current} onChange={setCurrent} prefix="$" step={100} />
        <InputField label="Monthly Amount to Save" value={monthly} onChange={setMonthly} prefix="$" step={25} />
        <div className="calc__field">
          <label className="form-label">Target Coverage Period</label>
          <select className="form-input" value={months} onChange={e => setMonths(e.target.value)}>
            <option value={1}>1 Month (Starter)</option>
            <option value={3}>3 Months (Basic)</option>
            <option value={6}>6 Months (Standard)</option>
            <option value={12}>12 Months (Self-Employed)</option>
          </select>
        </div>
      </div>
      <div className="calc__results">
        <h4 className="calc__results-title">Emergency Fund Analysis</h4>
        <ResultRow label="Monthly Essentials" value={fmt(monthlyExpenses)} />
        <ResultRow label={`${months}-Month Target`} value={fmt(target)} highlight />
        <ResultRow label="Already Saved" value={fmt(current)} />
        <ResultRow label="Gap to Fill" value={fmt(remaining)} />
        <div className="calc__divider" />
        <ResultRow label="Months to Goal" value={isFinite(monthsToGoal) ? `${monthsToGoal} months` : 'Set monthly savings'} />
        <ResultRow label="Fully Funded By" value={targetDate} />
        <p className="calc__verse">"Go to the ant... it stores provisions in summer." — Proverbs 6:6-8</p>
      </div>
    </div>
  );
}

/* ── 5. Net Worth Calculator ── */
export function NetWorthCalculator() {
  const [checking, setChecking] = useState(2000);
  const [savings, setSavings] = useState(5000);
  const [retirement, setRetirement] = useState(15000);
  const [investments, setInvestments] = useState(0);
  const [home, setHome] = useState(0);
  const [vehicle, setVehicle] = useState(8000);
  const [other, setOther] = useState(0);
  const [mortgage, setMortgage] = useState(0);
  const [carLoan, setCarLoan] = useState(5000);
  const [creditCards, setCreditCards] = useState(3000);
  const [studentLoans, setStudentLoans] = useState(8000);
  const [otherDebt, setOtherDebt] = useState(0);

  const totalAssets = [checking, savings, retirement, investments, home, vehicle, other].reduce((a, b) => Number(a) + Number(b), 0);
  const totalLiabilities = [mortgage, carLoan, creditCards, studentLoans, otherDebt].reduce((a, b) => Number(a) + Number(b), 0);
  const netWorth = totalAssets - totalLiabilities;

  const getNetWorthLabel = () => {
    if (netWorth < 0) return { label: 'Net Negative — You Have a Plan to Execute', color: '#e53e3e' };
    if (netWorth < 10000) return { label: 'Building Stage — Foundation Being Laid', color: '#C9A84C' };
    if (netWorth < 100000) return { label: 'Growing Stage — Momentum Building', color: '#5d9170' };
    return { label: 'Established Stage — Excellent Stewardship', color: '#1B2E5A' };
  };

  const { label, color } = getNetWorthLabel();

  return (
    <div className="calc">
      <div className="calc__inputs">
        <h4 className="calc__sub-header">Assets (What You Own)</h4>
        <InputField label="Checking Account" value={checking} onChange={setChecking} prefix="$" step={100} />
        <InputField label="Savings Account" value={savings} onChange={setSavings} prefix="$" step={100} />
        <InputField label="Retirement Accounts (401k/IRA)" value={retirement} onChange={setRetirement} prefix="$" step={500} />
        <InputField label="Investment Accounts" value={investments} onChange={setInvestments} prefix="$" step={500} />
        <InputField label="Home Value" value={home} onChange={setHome} prefix="$" step={1000} />
        <InputField label="Vehicle Value" value={vehicle} onChange={setVehicle} prefix="$" step={500} />
        <InputField label="Other Assets" value={other} onChange={setOther} prefix="$" step={100} />
        <h4 className="calc__sub-header">Liabilities (What You Owe)</h4>
        <InputField label="Mortgage Balance" value={mortgage} onChange={setMortgage} prefix="$" step={1000} />
        <InputField label="Car Loan Balance" value={carLoan} onChange={setCarLoan} prefix="$" step={500} />
        <InputField label="Credit Card Balances" value={creditCards} onChange={setCreditCards} prefix="$" step={100} />
        <InputField label="Student Loan Balance" value={studentLoans} onChange={setStudentLoans} prefix="$" step={500} />
        <InputField label="Other Debt" value={otherDebt} onChange={setOtherDebt} prefix="$" step={100} />
      </div>
      <div className="calc__results">
        <h4 className="calc__results-title">Net Worth Snapshot</h4>
        <ResultRow label="Total Assets" value={fmt(totalAssets)} />
        <ResultRow label="Total Liabilities" value={fmt(totalLiabilities)} />
        <div className="calc__divider" />
        <ResultRow label="Net Worth" value={fmt(netWorth)} highlight />
        <div className="calc__net-worth-label" style={{ borderColor: color, color }}>
          {label}
        </div>
        <p className="calc__verse">"Wealth gained hastily will dwindle, but whoever gathers little by little will increase it." — Proverbs 13:11</p>
      </div>
    </div>
  );
}

/* ── 6. Cash Flow Planner ── */
export function CashFlowPlanner() {
  const [income1, setIncome1] = useState(4500);
  const [income2, setIncome2] = useState(0);
  const [sideIncome, setSideIncome] = useState(300);
  const [housing, setHousing] = useState(1200);
  const [utilities, setUtilities] = useState(200);
  const [food, setFood] = useState(500);
  const [transport, setTransport] = useState(300);
  const [insurance, setInsurance] = useState(250);
  const [debt, setDebt] = useState(400);
  const [subscriptions, setSubscriptions] = useState(80);
  const [entertainment, setEntertainment] = useState(150);
  const [clothing, setClothing] = useState(100);
  const [giving, setGiving] = useState(480);
  const [savings, setSavings] = useState(600);
  const [other, setOther] = useState(100);

  const totalIncome = [income1, income2, sideIncome].reduce((a, b) => Number(a) + Number(b), 0);
  const totalExpenses = [housing, utilities, food, transport, insurance, debt, subscriptions, entertainment, clothing, other].reduce((a, b) => Number(a) + Number(b), 0);
  const totalGiving = Number(giving);
  const totalSavings = Number(savings);
  const netCashFlow = totalIncome - totalExpenses - totalGiving - totalSavings;
  const givingPct = totalIncome > 0 ? ((totalGiving / totalIncome) * 100).toFixed(1) : 0;
  const savingsPct = totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(1) : 0;

  const getCashFlowStatus = () => {
    if (netCashFlow > 200) return { label: 'Positive Cash Flow ✓', color: '#5d9170' };
    if (netCashFlow >= 0) return { label: 'Balanced — Room to Improve', color: '#C9A84C' };
    return { label: 'Deficit — Adjustments Needed', color: '#e53e3e' };
  };

  const { label: cfLabel, color: cfColor } = getCashFlowStatus();

  return (
    <div className="calc">
      <div className="calc__inputs">
        <h4 className="calc__sub-header">Monthly Income</h4>
        <InputField label="Primary Income (take-home)" value={income1} onChange={setIncome1} prefix="$" step={100} />
        <InputField label="Spouse/Partner Income" value={income2} onChange={setIncome2} prefix="$" step={100} />
        <InputField label="Side Income / Freelance" value={sideIncome} onChange={setSideIncome} prefix="$" step={50} />
        <h4 className="calc__sub-header">Kingdom Priorities</h4>
        <InputField label="Giving / Tithe" value={giving} onChange={setGiving} prefix="$" step={50} />
        <InputField label="Savings / Investing" value={savings} onChange={setSavings} prefix="$" step={50} />
        <h4 className="calc__sub-header">Living Expenses</h4>
        <InputField label="Housing" value={housing} onChange={setHousing} prefix="$" step={50} />
        <InputField label="Utilities" value={utilities} onChange={setUtilities} prefix="$" step={10} />
        <InputField label="Food & Groceries" value={food} onChange={setFood} prefix="$" step={25} />
        <InputField label="Transportation" value={transport} onChange={setTransport} prefix="$" step={25} />
        <InputField label="Insurance" value={insurance} onChange={setInsurance} prefix="$" step={25} />
        <InputField label="Debt Payments" value={debt} onChange={setDebt} prefix="$" step={25} />
        <InputField label="Subscriptions" value={subscriptions} onChange={setSubscriptions} prefix="$" step={5} />
        <InputField label="Entertainment" value={entertainment} onChange={setEntertainment} prefix="$" step={25} />
        <InputField label="Clothing" value={clothing} onChange={setClothing} prefix="$" step={25} />
        <InputField label="Other Expenses" value={other} onChange={setOther} prefix="$" step={25} />
      </div>
      <div className="calc__results">
        <h4 className="calc__results-title">Monthly Cash Flow</h4>
        <ResultRow label="Total Income" value={fmt(totalIncome)} />
        <ResultRow label={`Giving (${givingPct}%)`} value={fmt(totalGiving)} />
        <ResultRow label={`Savings (${savingsPct}%)`} value={fmt(totalSavings)} />
        <ResultRow label="Total Expenses" value={fmt(totalExpenses)} />
        <div className="calc__divider" />
        <ResultRow label="Net Cash Flow" value={fmtDec(netCashFlow)} highlight />
        <div className="calc__net-worth-label" style={{ borderColor: cfColor, color: cfColor }}>
          {cfLabel}
        </div>
        {netCashFlow < 0 && (
          <div className="calc__tip">
            💡 Deficit of {fmt(Math.abs(netCashFlow))}/month. Review subscriptions, food, and entertainment first.
          </div>
        )}
        <p className="calc__verse">"Be sure you know the condition of your flocks, give careful attention to your herds." — Proverbs 27:23</p>
      </div>
    </div>
  );
}
