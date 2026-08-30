import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getAllExpenses, getExpensesByMonth } from "@/lib/expense-service";
import { getSalarySettings } from "@/lib/salary-service";
import { formatBDT, forecastMonthlySpending, generateInsights } from "@/lib/utils-finance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertCircle, DollarSign, Calendar, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Demo current date (April 18, 2026) for consistency with seed data
const DEMO_DATE = new Date("2026-04-18");
const getCurrentMonth = () => {
  const year = DEMO_DATE.getFullYear();
  const month = String(DEMO_DATE.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const getPreviousMonth = () => {
  const date = new Date(DEMO_DATE);
  date.setMonth(date.getMonth() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const Dashboard = () => {
  const currentMonth = getCurrentMonth();
  const previousMonth = getPreviousMonth();
  const currentDay = DEMO_DATE.getDate();

  const { data: salary } = useQuery({
    queryKey: ["salary"],
    queryFn: getSalarySettings,
  });

  const { data: currentExpenses = [] } = useQuery({
    queryKey: ["expenses", currentMonth],
    queryFn: () => getExpensesByMonth(currentMonth),
  });

  const { data: previousExpenses = [] } = useQuery({
    queryKey: ["expenses", previousMonth],
    queryFn: () => getExpensesByMonth(previousMonth),
  });

  // Calculate totals
  const currentTotal = currentExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const previousTotal = previousExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const spendingPercentage = salary ? (currentTotal / salary.monthlyAmount) * 100 : 0;

  // Forecast
  const forecast = forecastMonthlySpending(currentExpenses, currentDay);
  const expectedLeft = salary ? salary.monthlyAmount - forecast : 0;

  // Category breakdown
  const categoryTotals = currentExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / currentTotal) * 100,
    }))
    .sort((a, b) => b.amount - a.amount);

  // Top expenses
  const topExpenses = [...currentExpenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // Month comparison
  const monthChange = currentTotal - previousTotal;
  const monthChangePercentage = previousTotal > 0 ? (monthChange / previousTotal) * 100 : 0;

  // Insights
  const insights = generateInsights(
    currentExpenses,
    previousExpenses,
    salary?.monthlyAmount || 0
  );

  if (!salary) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Set Your Monthly Salary
              </CardTitle>
              <CardDescription>
                To get started with your personal ledger, please set your monthly salary first.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/settings">
                <Button className="w-full">Go to Settings</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            {new Date(currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Overview
          </p>
        </div>

        {/* Spending vs Salary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Monthly Spending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatBDT(currentTotal)}
                  </p>
                  <p className="text-gray-600">
                    of {formatBDT(salary.monthlyAmount)} ({spendingPercentage.toFixed(1)}%)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {formatBDT(salary.monthlyAmount - currentTotal)}
                  </p>
                  <p className="text-sm text-gray-600">Remaining</p>
                </div>
              </div>
              <Progress value={spendingPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Forecast & Insights */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Expected by month end</p>
                <p className="text-2xl font-bold text-gray-900">{formatBDT(forecast)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Expected {expectedLeft >= 0 ? 'left' : 'short'}</p>
                <p className={`text-2xl font-bold ${expectedLeft >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatBDT(Math.abs(expectedLeft))}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Month Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current month</span>
                <span className="font-semibold">{formatBDT(currentTotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Previous month</span>
                <span className="font-semibold">{formatBDT(previousTotal)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-gray-600">Change</span>
                <div className="flex items-center gap-2">
                  {monthChange >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                  <span className={`font-semibold ${monthChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {monthChange >= 0 ? '+' : ''}{formatBDT(monthChange)} ({monthChangePercentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Insights</CardTitle>
            <CardDescription>Data-driven observations about your spending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900">{insight.message}</p>
                    {insight.category && (
                      <Badge variant="outline" className="mt-1">
                        {insight.category}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown & Top Expenses */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map(({ category, amount, percentage }) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="secondary">{category}</Badge>
                      <span className="text-sm font-medium">
                        {formatBDT(amount)} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{expense.shop}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{expense.category}</Badge>
                        <span className="text-xs text-gray-600">{expense.date}</span>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{formatBDT(expense.amount)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
