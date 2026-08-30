# Personal Ledger Manager

A comprehensive personal finance management application built with React, TypeScript, and MongoDB. Track expenses, manage savings goals, and get AI-powered insights from your financial data.

## ✨ Features

### 📊 Dashboard
- Real-time spending vs. salary tracking
- Visual progress indicators
- Month-over-month comparison
- Category breakdown with percentages
- Top 5 largest expenses
- Financial forecast with expected surplus/deficit
- Data-driven insights

### 💰 Expense Management
- **Manual Entry**: Quick expense input with category selection
- **Receipt OCR**: Upload receipt images for automatic data extraction using Gemini AI
- Full CRUD operations (Create, Read, Update, Delete)
- Expense history with filtering
- Real-time totals and summaries

### 🎯 Savings Pockets
- Create savings goals for specific items
- Track progress towards targets
- Set monthly contributions
- Automatic completion date calculation
- DPS (Deposit Pension Scheme) comparison at 8% annual rate
- Visual progress indicators

### ⚙️ Settings
- Set and update monthly salary
- Track effective dates
- View settings history

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack React Query
- **Database**: MongoDB Atlas
- **AI**: Google Gemini API for receipt OCR
- **Animations**: Framer Motion
- **Date Handling**: date-fns

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key (for OCR feature)

## 🛠️ Installation

1. **Clone the repository**
```bash
cd personal-ledger-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create `.env.local` file in the root:
```env
VITE_MONGODB_URI=mongodb+srv://shanidsajjatuz:RnHu2S9L9xu93Hn0@cluster0.usmr4rf.mongodb.net/
VITE_DB_NAME=personal-ledger
VITE_GEMINI_API_KEY=AIzaSyAb8RN6LKJsvwx5QoAT_owz0hSPS5NPvx2tUmResiu5hXxqlIUQ
```

4. **Database Setup**

The application will automatically seed the database with demo data on first run.

Demo data includes:
- Salary: ৳50,000/month
- 15 expenses from April 2026
- 26 expenses from March 2026 (for comparison)
- 3 savings pockets (Wedding, Laptop, Bike)

## 🎮 Running the Application

### Development Mode
```bash
npm run dev
```
Access at: `http://localhost:8080`

### Production Build
```bash
npm run build
npm run preview
```

## 📱 Usage Guide

### First Time Setup

1. **Navigate to Dashboard** - The app starts on the dashboard
2. **Set Salary** - If not set, you'll see a prompt. Go to Settings and enter your monthly salary
3. **Add Expenses** - Use either:
   - Manual entry: Click "Add Manual" on Expenses page
   - OCR upload: Click "Upload Receipt" and upload an image
4. **Create Savings Pockets** - Go to Savings page and create your goals

### Daily Use

1. **Add expenses** as they occur (manual or photo)
2. **Check Dashboard** for spending overview and insights
3. **Review Forecast** to see projected month-end balance
4. **Track Savings** progress towards your goals

## 📸 Receipt OCR

The application uses Google Gemini API to extract:
- Merchant name
- Purchase date
- Total amount
- Line items (if available)

After extraction, you can review and correct any fields before saving.

### Supported Image Formats
- JPG/JPEG
- PNG
- WebP
- BMP

## 💡 Key Features Explained

### Financial Forecast
- Projects month-end spending based on current daily average
- Calculates expected surplus or deficit
- Updates in real-time as you add expenses

### Insights Engine
Generates specific, data-driven insights:
- Spending trends vs. last month
- Largest expense categories
- Category-level changes
- Budget warnings or congratulations

### DPS Projections
For each savings pocket, shows:
- Expected completion date
- What a DPS investment would yield at 8% annual rate
- Extra amount earned through interest

## 🗂️ Project Structure

```
personal-ledger-manager/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── ui/          # shadcn/ui components
│   ├── lib/             # Core business logic
│   │   ├── types.ts            # TypeScript interfaces
│   │   ├── mongodb.ts          # Database connection
│   │   ├── expense-service.ts  # Expense CRUD
│   │   ├── salary-service.ts   # Salary management
│   │   ├── savings-service.ts  # Savings CRUD
│   │   ├── mock-ocr.ts         # Gemini OCR integration
│   │   ├── utils-finance.ts    # Financial calculations
│   │   └── seed-database.ts    # Database seeding
│   ├── data/            # Seed data
│   │   └── seed.ts      # Demo expense/savings data
│   └── pages/           # Application pages
│       ├── Dashboard.tsx
│       ├── Expenses.tsx
│       ├── AddExpense.tsx
│       ├── AddExpenseOCR.tsx
│       ├── EditExpense.tsx
│       ├── Savings.tsx
│       ├── AddSavings.tsx
│       ├── EditSavings.tsx
│       └── Settings.tsx
├── DESIGN.md           # Design system documentation
├── PROBLEM.md          # Problem statement
├── MVP.md              # Requirements & done-when criteria
└── NOTES.md            # Development notes
```

## 🎨 Design Philosophy

The application uses a soothing white and ash color palette chosen to:
- Evoke trust and calm (critical for financial applications)
- Provide a premium feel appropriate for money management
- Ensure clear visibility of financial data
- Reduce cognitive load with clean, minimal design

## 💾 Database Collections

### `expenses`
- id, date, category, shop, amount
- createdAt, updatedAt

### `salary_settings`
- monthlyAmount, effectiveFrom, updatedAt

### `savings_pockets`
- id, name, item, targetAmount, monthlyContribution, currentSaved
- createdAt, updatedAt

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

See `LICENSES.md` for full dependency attribution.

## 🎯 MVP Requirements Status

✅ Requirement 1: Salary & Expense Entry with Receipt OCR  
✅ Requirement 2: Monthly Dashboard with Breakdown  
✅ Requirement 3: Forecast & Written Insights  
✅ Requirement 4: Savings Pockets with DPS Projections

---

**Built with ❤️ for the Kiro Hackathon**

**Server Running:** http://localhost:8080
