// Core data types for Personal Ledger Manager

export interface Expense {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  category: ExpenseCategory;
  shop: string;
  amount: number; // BDT amount with 2 decimal precision
  createdAt?: string;
  updatedAt?: string;
}

export type ExpenseCategory =
  | "Groceries"
  | "Rent"
  | "Utilities"
  | "Transport"
  | "Food"
  | "Health"
  | "Education"
  | "Entertainment"
  | "Mobile"
  | "Clothing";

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Groceries",
  "Rent",
  "Utilities",
  "Transport",
  "Food",
  "Health",
  "Education",
  "Entertainment",
  "Mobile",
  "Clothing",
];

export interface SalarySettings {
  monthlyAmount: number; // BDT amount
  effectiveFrom: string; // ISO date string YYYY-MM-DD
  updatedAt: string;
}

export interface SavingsPocket {
  id: string;
  name: string;
  item: string; // Item description
  targetAmount: number; // BDT
  monthlyContribution: number; // BDT
  currentSaved?: number; // BDT - calculated field
  createdAt: string;
  updatedAt?: string;
}

export interface MonthlyStats {
  month: string; // YYYY-MM format
  totalSpent: number;
  totalIncome: number;
  categoryBreakdown: CategorySpending[];
  largestExpenses: Expense[];
}

export interface CategorySpending {
  category: ExpenseCategory;
  amount: number;
  percentage: number;
  count: number;
}

export interface Forecast {
  currentMonth: string; // YYYY-MM
  daysElapsed: number;
  daysRemaining: number;
  spentSoFar: number;
  dailyAverage: number;
  projectedTotal: number;
  expectedSurplus: number; // Positive if under budget, negative if over
  insights: Insight[];
}

export interface Insight {
  id: string;
  type: "warning" | "success" | "info";
  category?: ExpenseCategory;
  message: string;
  amount?: number;
  comparison?: string;
}

export interface DPSProjection {
  annualRate: number; // e.g., 8.0 for 8%
  monthlyDeposit: number;
  months: number;
  finalAmount: number;
  totalInterest: number;
}

// OCR extraction result
export interface OCRExtraction {
  amount: number | null;
  date: string | null; // YYYY-MM-DD
  shop: string | null;
  confidence: number; // 0-1 scale
  rawText?: string;
}

// Form data types
export interface ExpenseFormData {
  date: string;
  category: ExpenseCategory;
  shop: string;
  amount: string; // String for form input
}

export interface SavingsPocketFormData {
  name: string;
  item: string;
  targetAmount: string;
  monthlyContribution: string;
}
