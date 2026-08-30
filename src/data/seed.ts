// Seed data for demo - Based on PUB-01 test case from P12_personal_ledger_public.json
import { Expense, SalarySettings, SavingsPocket } from "../lib/types";

// Demo salary setting
export const seedSalary: SalarySettings = {
  monthlyAmount: 50000.00,
  effectiveFrom: "2026-04-01",
  updatedAt: new Date().toISOString()
};

// Demo expenses from April 2026 (current month for testing)
export const seedExpenses: Expense[] = [
  {
    id: "E027",
    date: "2026-04-03",
    category: "Rent",
    shop: "Landlord",
    amount: 16000.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E028",
    date: "2026-04-04",
    category: "Food",
    shop: "Sultans Dine",
    amount: 364.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E029",
    date: "2026-04-06",
    category: "Food",
    shop: "Panda Garden",
    amount: 492.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E030",
    date: "2026-04-07",
    category: "Mobile",
    shop: "GP recharge",
    amount: 535.50,
    createdAt: new Date().toISOString()
  },
  {
    id: "E031",
    date: "2026-04-07",
    category: "Utilities",
    shop: "DESCO",
    amount: 2599.50,
    createdAt: new Date().toISOString()
  },
  {
    id: "E032",
    date: "2026-04-08",
    category: "Mobile",
    shop: "bKash",
    amount: 679.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E033",
    date: "2026-04-11",
    category: "Groceries",
    shop: "Unimart",
    amount: 546.50,
    createdAt: new Date().toISOString()
  },
  {
    id: "E034",
    date: "2026-04-11",
    category: "Mobile",
    shop: "Robi recharge",
    amount: 691.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E035",
    date: "2026-04-12",
    category: "Transport",
    shop: "BRTC bus",
    amount: 461.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E036",
    date: "2026-04-13",
    category: "Entertainment",
    shop: "Star Cineplex",
    amount: 1326.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E037",
    date: "2026-04-13",
    category: "Entertainment",
    shop: "Star Cineplex",
    amount: 738.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E038",
    date: "2026-04-15",
    category: "Mobile",
    shop: "GP recharge",
    amount: 919.50,
    createdAt: new Date().toISOString()
  },
  {
    id: "E039",
    date: "2026-04-15",
    category: "Mobile",
    shop: "bKash",
    amount: 764.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E040",
    date: "2026-04-15",
    category: "Transport",
    shop: "CNG",
    amount: 232.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E041",
    date: "2026-04-17",
    category: "Food",
    shop: "Madchef",
    amount: 735.00,
    createdAt: new Date().toISOString()
  }
];

// Previous month expenses (March 2026) for comparison
export const seedPreviousExpenses: Expense[] = [
  {
    id: "E001",
    date: "2026-03-02",
    category: "Groceries",
    shop: "Meena Bazar",
    amount: 2475.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E002",
    date: "2026-03-04",
    category: "Rent",
    shop: "Landlord",
    amount: 16000.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E003",
    date: "2026-03-04",
    category: "Utilities",
    shop: "DESCO",
    amount: 856.50,
    createdAt: new Date().toISOString()
  },
  {
    id: "E004",
    date: "2026-03-05",
    category: "Education",
    shop: "Udemy",
    amount: 1329.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E005",
    date: "2026-03-05",
    category: "Food",
    shop: "Madchef",
    amount: 304.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E006",
    date: "2026-03-06",
    category: "Education",
    shop: "Udemy",
    amount: 719.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E007",
    date: "2026-03-06",
    category: "Transport",
    shop: "Uber",
    amount: 421.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E008",
    date: "2026-03-07",
    category: "Education",
    shop: "Bookworm",
    amount: 501.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E009",
    date: "2026-03-07",
    category: "Food",
    shop: "Panda Garden",
    amount: 505.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E010",
    date: "2026-03-07",
    category: "Food",
    shop: "Panda Garden",
    amount: 585.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E011",
    date: "2026-03-08",
    category: "Health",
    shop: "Lazz Pharma",
    amount: 1477.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E012",
    date: "2026-03-11",
    category: "Mobile",
    shop: "GP recharge",
    amount: 422.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E013",
    date: "2026-03-12",
    category: "Health",
    shop: "Lazz Pharma",
    amount: 710.50,
    createdAt: new Date().toISOString()
  },
  {
    id: "E014",
    date: "2026-03-16",
    category: "Education",
    shop: "Udemy",
    amount: 2563.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E015",
    date: "2026-03-16",
    category: "Food",
    shop: "Panda Garden",
    amount: 348.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E016",
    date: "2026-03-17",
    category: "Entertainment",
    shop: "Netflix",
    amount: 882.50,
    createdAt: new Date().toISOString()
  },
  {
    id: "E017",
    date: "2026-03-17",
    category: "Health",
    shop: "Popular Diagnostic",
    amount: 2474.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E018",
    date: "2026-03-18",
    category: "Transport",
    shop: "Pathao",
    amount: 415.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E019",
    date: "2026-03-20",
    category: "Entertainment",
    shop: "Steam",
    amount: 1132.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E020",
    date: "2026-03-23",
    category: "Education",
    shop: "Bookworm",
    amount: 1742.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E021",
    date: "2026-03-28",
    category: "Groceries",
    shop: "Shwapno",
    amount: 497.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E022",
    date: "2026-03-28",
    category: "Groceries",
    shop: "Unimart",
    amount: 3153.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E023",
    date: "2026-03-29",
    category: "Groceries",
    shop: "Meena Bazar",
    amount: 1398.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E024",
    date: "2026-03-29",
    category: "Mobile",
    shop: "Robi recharge",
    amount: 667.00,
    createdAt: new Date().toISOString()
  },
  {
    id: "E025",
    date: "2026-03-30",
    category: "Groceries",
    shop: "Agora",
    amount: 736.50,
    createdAt: new Date().toISOString()
  },
  {
    id: "E026",
    date: "2026-03-31",
    category: "Education",
    shop: "Udemy",
    amount: 1223.00,
    createdAt: new Date().toISOString()
  }
];

// Demo savings pockets
export const seedSavingsPockets: SavingsPocket[] = [
  {
    id: "SP-1",
    name: "Wedding",
    item: "reception hall booking",
    targetAmount: 300000.00,
    monthlyContribution: 20000.00,
    currentSaved: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: "SP-2",
    name: "Laptop",
    item: "MacBook Air M4",
    targetAmount: 145000.00,
    monthlyContribution: 12000.00,
    currentSaved: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: "SP-3",
    name: "Bike",
    item: "Honda Livo",
    targetAmount: 150000.00,
    monthlyContribution: 9000.00,
    currentSaved: 0,
    createdAt: new Date().toISOString()
  }
];

// DPS annual rate
export const DPS_ANNUAL_RATE = 8.0; // 8% as per test case
