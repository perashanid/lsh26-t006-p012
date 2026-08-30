# Problem Statement: Personal Ledger Manager

**Problem ID:** P12  
**Difficulty:** Medium  
**Category:** Personal Finance Management

---

## Overview

Build a comprehensive personal finance management application that helps users track their income and expenses, forecast future spending, and plan for savings goals. The app should provide intelligent insights based on actual spending patterns and help users make informed financial decisions.

---

## The Four Required Items

### 1. Salary and Expense Entry with Receipt OCR

**Requirement:**  
Let the user set a monthly salary and add expenses, including by uploading a photo of a bill or receipt. Read the amount, date and shop name from the image, show what was read so the user can check it, and let them correct any field before saving.

**Key Features:**
- Set monthly salary amount
- Add expenses manually (amount, date, category, shop)
- Upload receipt photo for automatic extraction
- OCR extracts: amount, date, shop name
- Show extracted data for user verification
- Allow editing of any field before saving
- Support multiple expense categories

### 2. Monthly Dashboard

**Requirement:**  
Show a monthly dashboard: total spent against salary, a breakdown by category, the largest expenses, and the change compared to last month.

**Key Features:**
- Total spent vs. salary comparison (e.g., ৳25,083 / ৳50,000)
- Progress bar or percentage showing spending rate
- Category breakdown with amounts and percentages
- Top 5 (or more) largest expenses
- Month-over-month comparison showing increases/decreases
- Visual indicators for spending trends

### 3. Forecast and Insights

**Requirement:**  
Produce a forecast and written insights from the actual numbers: expected spending for the rest of the month, expected money left or short at month end, and at least three insights that name specific categories and amounts rather than giving general advice.

**Key Features:**
- Forecast total spending by month end based on current trends
- Calculate expected surplus or deficit
- Generate at least 3 data-driven insights
- Insights must reference specific categories and amounts
- Examples:
  - "Rent accounts for 32% (৳16,000) of your spending"
  - "Mobile expenses increased by ৳1,803 vs last month"
  - "You spent 47% less on Education this month"

### 4. Savings Pockets with DPS Projections

**Requirement:**  
Let the user create savings pockets for specific items, each with a name, a target amount, item details and a monthly contribution. For each pocket show an expected completion date based on the forecast, and what a DPS at a rate you state would return over that time.

**Key Features:**
- Create multiple savings pockets
- Each pocket has: name, item description, target amount, monthly contribution
- Calculate expected completion date: `(target - saved) / monthly contribution`
- Show DPS (Deposit Pension Scheme) projection at stated rate (8% annual)
- DPS calculation with monthly compound interest
- Display both pocket savings and DPS alternative side-by-side
- Example: "15 months to reach ৳300,000 target; DPS would yield ৳307,200"

---

## Technical Requirements

### Currency
- All amounts in BDT (Bangladeshi Taka)
- Display with ৳ symbol
- Format with commas: ৳12,345.67

### DPS Rate
- Use 8% annual interest rate
- Calculate with monthly compounding
- Show comparison with regular savings

### Data Persistence
- Store expenses, salary settings, and savings pockets in database
- Support historical data for month-over-month comparisons
- Maintain creation and update timestamps

### Categories
Support common expense categories:
- Rent
- Food
- Groceries
- Transport
- Mobile
- Utilities
- Entertainment
- Education
- Health
- Other

---

## User Experience Goals

1. **Quick Entry** — Adding expenses should be fast (manual or OCR)
2. **Clear Overview** — Dashboard shows financial health at a glance
3. **Actionable Insights** — Specific guidance based on actual spending
4. **Goal Tracking** — Visual progress toward savings targets
5. **Trust** — Design should feel reliable and professional for financial data

---

## Success Criteria

A successful implementation will:
- Allow salary setup and expense tracking (manual + OCR)
- Display clear dashboard with spending breakdown
- Provide accurate financial forecast and 3+ specific insights
- Support savings pocket creation with completion dates and DPS comparisons
- Handle BDT currency formatting correctly
- Store all data persistently in database
- Work responsively across devices
- Feel trustworthy and professional

---

## What Can Be Mocked

**Receipt OCR:**  
Real OCR requires paid APIs (Google Cloud Vision, AWS Textract). A mock implementation that simulates extraction is acceptable, provided the interface allows for easy swapping with a real service later.

---

## Test Data Available

See `P12_personal_ledger_public.json` for test cases including:
- Sample salary amounts
- Realistic expense data across multiple months
- Various expense categories and shops
- Savings pocket examples

Use PUB-01 test case for primary demo/seed data.
