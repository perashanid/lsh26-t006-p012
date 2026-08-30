// Financial calculation utilities

import { Expense, CategorySpending, Forecast, Insight, DPSProjection, ExpenseCategory } from "./types";
import { format, startOfMonth, endOfMonth, getDaysInMonth, differenceInDays, addMonths } from "date-fns";

/**
 * Format number as BDT currency
 */
export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Calculate category breakdown from expenses
 */
export function calculateCategoryBreakdown(expenses: Expense[]): CategorySpending[] {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const categoryMap = new Map<ExpenseCategory, { amount: number; count: number }>();
  
  expenses.forEach(exp => {
    const current = categoryMap.get(exp.category) || { amount: 0, count: 0 };
    categoryMap.set(exp.category, {
      amount: current.amount + exp.amount,
      count: current.count + 1
    });
  });
  
  const breakdown: CategorySpending[] = Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    amount: data.amount,
    percentage: total > 0 ? (data.amount / total) * 100 : 0,
    count: data.count
  }));
  
  // Sort by amount descending
  return breakdown.sort((a, b) => b.amount - a.amount);
}

/**
 * Get largest expenses
 */
export function getLargestExpenses(expenses: Expense[], limit: number = 5): Expense[] {
  return [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

/**
 * Calculate forecast for current month
 */
export function calculateForecast(
  currentMonthExpenses: Expense[],
  previousMonthExpenses: Expense[],
  salary: number,
  currentDate: Date = new Date()
): Forecast {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const daysElapsed = differenceInDays(currentDate, monthStart) + 1;
  const daysRemaining = differenceInDays(monthEnd, currentDate);
  
  const spentSoFar = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const dailyAverage = daysElapsed > 0 ? spentSoFar / daysElapsed : 0;
  const projectedTotal = dailyAverage * daysInMonth;
  const expectedSurplus = salary - projectedTotal;
  
  // Generate insights
  const insights = generateMonthlyInsights(
    currentMonthExpenses,
    previousMonthExpenses,
    projectedTotal,
    salary,
    expectedSurplus
  );
  
  return {
    currentMonth: format(currentDate, "yyyy-MM"),
    daysElapsed,
    daysRemaining,
    spentSoFar,
    dailyAverage,
    projectedTotal,
    expectedSurplus,
    insights
  };
}

/**
 * Simple forecast monthly spending based on current progress
 */
export function forecastMonthlySpending(expenses: Expense[], currentDayOfMonth: number): number {
  const totalDaysInMonth = 30; // Simplified
  const spentSoFar = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const dailyAverage = currentDayOfMonth > 0 ? spentSoFar / currentDayOfMonth : 0;
  return dailyAverage * totalDaysInMonth;
}

/**
 * Generate insights from expense data
 */
export function generateInsights(
  currentExpenses: Expense[],
  previousExpenses: Expense[],
  salary: number
): { category?: string; message: string; amount?: number }[] {
  const insights: { category?: string; message: string; amount?: number }[] = [];
  
  const currentTotal = currentExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const previousTotal = previousExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  // Insight 1: Spending change
  if (previousTotal > 0) {
    const change = currentTotal - previousTotal;
    const changePercent = (change / previousTotal) * 100;
    if (Math.abs(changePercent) > 5) {
      insights.push({
        message: `Your spending is ${Math.abs(changePercent).toFixed(1)}% ${change > 0 ? 'higher' : 'lower'} than last month (${formatBDT(Math.abs(change))} ${change > 0 ? 'more' : 'less'})`,
        amount: Math.abs(change)
      });
    }
  }
  
  // Insight 2 & 3: Category insights
  const currentBreakdown = calculateCategoryBreakdown(currentExpenses);
  const previousBreakdown = calculateCategoryBreakdown(previousExpenses);
  
  const prevMap = new Map(previousBreakdown.map(cb => [cb.category, cb.amount]));
  
  // Top category
  if (currentBreakdown.length > 0) {
    const highest = currentBreakdown[0];
    insights.push({
      category: highest.category,
      message: `${highest.category} accounts for ${highest.percentage.toFixed(0)}% (${formatBDT(highest.amount)}) of your spending`,
      amount: highest.amount
    });
  }
  
  // Category changes
  let categoryInsightsAdded = 0;
  for (const current of currentBreakdown) {
    if (categoryInsightsAdded >= 2) break;
    
    const prevAmount = prevMap.get(current.category) || 0;
    if (prevAmount === 0) continue;
    
    const change = current.amount - prevAmount;
    const changePercent = Math.abs((change / prevAmount) * 100);
    
    if (changePercent > 20) {
      insights.push({
        category: current.category,
        message: `${current.category} expenses ${change > 0 ? 'increased' : 'decreased'} by ${formatBDT(Math.abs(change))} vs last month`,
        amount: Math.abs(change)
      });
      categoryInsightsAdded++;
    }
  }
  
  // Ensure we have at least 3 insights
  if (insights.length < 3 && salary > 0) {
    const spendingPercent = (currentTotal / salary) * 100;
    insights.push({
      message: `You've spent ${spendingPercent.toFixed(1)}% of your monthly salary so far`,
      amount: currentTotal
    });
  }
  
  return insights.slice(0, 5);
}

/**
 * Generate data-driven insights for forecast
 */
function generateMonthlyInsights(
  currentExpenses: Expense[],
  previousExpenses: Expense[],
  projectedTotal: number,
  salary: number,
  expectedSurplus: number
): Insight[] {
  const insights: Insight[] = [];
  
  // Insight 1: Budget status
  if (expectedSurplus < 0) {
    insights.push({
      id: "budget-warning",
      type: "warning",
      message: `You're projected to overspend by ${formatBDT(Math.abs(expectedSurplus))} this month. Consider reducing expenses in high-spending categories.`,
      amount: Math.abs(expectedSurplus)
    });
  } else if (expectedSurplus > salary * 0.2) {
    insights.push({
      id: "budget-success",
      type: "success",
      message: `Great job! You're on track to save ${formatBDT(expectedSurplus)} (${formatPercentage((expectedSurplus / salary) * 100)}) this month.`,
      amount: expectedSurplus
    });
  } else {
    insights.push({
      id: "budget-info",
      type: "info",
      message: `You're projected to have ${formatBDT(expectedSurplus)} remaining at month end.`,
      amount: expectedSurplus
    });
  }
  
  // Insight 2 & 3: Category comparisons
  const currentBreakdown = calculateCategoryBreakdown(currentExpenses);
  const previousBreakdown = calculateCategoryBreakdown(previousExpenses);
  
  const prevMap = new Map(previousBreakdown.map(cb => [cb.category, cb.amount]));
  
  let categoryInsightsAdded = 0;
  for (const current of currentBreakdown) {
    if (categoryInsightsAdded >= 2) break;
    
    const prevAmount = prevMap.get(current.category) || 0;
    if (prevAmount === 0) continue;
    
    const change = current.amount - prevAmount;
    const changePercent = (change / prevAmount) * 100;
    
    if (Math.abs(changePercent) > 15) {
      const type = changePercent > 0 ? "warning" : "success";
      const direction = changePercent > 0 ? "higher" : "lower";
      
      insights.push({
        id: `category-${current.category.toLowerCase()}`,
        type,
        category: current.category,
        message: `Your ${current.category} spending of ${formatBDT(current.amount)} is ${formatPercentage(Math.abs(changePercent))} ${direction} than last month (${formatBDT(prevAmount)}).`,
        amount: current.amount,
        comparison: direction
      });
      
      categoryInsightsAdded++;
    }
  }
  
  // Insight 4: Highest spending category
  if (currentBreakdown.length > 0 && categoryInsightsAdded < 3) {
    const highest = currentBreakdown[0];
    insights.push({
      id: "highest-category",
      type: "info",
      category: highest.category,
      message: `${highest.category} is your largest expense category at ${formatBDT(highest.amount)} (${formatPercentage(highest.percentage)} of total spending).`,
      amount: highest.amount
    });
  }
  
  return insights.slice(0, 5); // Max 5 insights
}

/**
 * Calculate DPS projection with compound interest
 */
export function calculateDPSProjection(
  monthlyDeposit: number,
  months: number,
  annualRate: number = 8.0
): DPSProjection {
  const monthlyRate = annualRate / 12 / 100;
  let balance = 0;
  
  // Calculate compound interest month by month
  for (let i = 0; i < months; i++) {
    balance += monthlyDeposit;
    const interest = balance * monthlyRate;
    balance += interest;
  }
  
  // Round to 2 decimal places
  const finalAmount = Math.round(balance * 100) / 100;
  const totalDeposits = monthlyDeposit * months;
  const totalInterest = finalAmount - totalDeposits;
  
  return {
    annualRate,
    monthlyDeposit,
    months,
    finalAmount,
    totalInterest
  };
}

/**
 * Simple DPS calculation (returns final amount only)
 */
export function calculateDPS(monthlyDeposit: number, months: number, annualRate: number = 8.0): number {
  const projection = calculateDPSProjection(monthlyDeposit, months, annualRate);
  return projection.finalAmount;
}

/**
 * Calculate expected completion date for savings pocket
 */
export function calculateCompletionDate(
  targetAmount: number,
  monthlyContribution: number,
  currentSaved: number = 0
): Date {
  const remaining = targetAmount - currentSaved;
  const monthsNeeded = Math.ceil(remaining / monthlyContribution);
  return addMonths(new Date(), monthsNeeded);
}

/**
 * Filter expenses by month
 */
export function filterExpensesByMonth(expenses: Expense[], year: number, month: number): Expense[] {
  const monthStr = `${year}-${String(month).padStart(2, "0")}`;
  return expenses.filter(exp => exp.date.startsWith(monthStr));
}

/**
 * Get current month and previous month strings
 */
export function getMonthStrings(date: Date = new Date()): { current: string; previous: string } {
  const current = format(date, "yyyy-MM");
  const previous = format(addMonths(date, -1), "yyyy-MM");
  return { current, previous };
}
