# MVP Requirements with Done-When Criteria

**Project:** P12 Personal Ledger Manager  
**Total Requirements:** 4

---

## MVP Requirement 1: Salary and Expense Entry with Receipt OCR

### User Story
As a user, I want to set my monthly salary and track expenses by entering them manually or uploading receipt photos, so I can maintain an accurate record of my spending.

### Functional Requirements
1. User can set and update monthly salary amount
2. User can add expenses manually with: date, category, shop, amount
3. User can upload a receipt photo
4. System extracts amount, date, and shop from receipt using OCR
5. User sees extracted data in an editable form before saving
6. User can correct any OCR-extracted field
7. System saves validated expense to database
8. User can view list of all expenses
9. User can edit existing expenses
10. User can delete expenses

### Done When
- ✅ Salary settings page exists with input field and save button
- ✅ Current salary displays on dashboard/settings page
- ✅ Add expense form includes: date picker, category dropdown, shop text, amount input
- ✅ Category dropdown contains at least: Rent, Food, Groceries, Transport, Mobile, Utilities, Entertainment, Education, Health, Other
- ✅ Upload button accepts image files (jpg, png, pdf)
- ✅ After upload, OCR result displays in modal/form with editable fields
- ✅ User can edit extracted amount, date, shop, and select category before saving
- ✅ Save button stores expense to MongoDB with all required fields
- ✅ Expenses list shows all expenses sorted by date (newest first)
- ✅ Each expense displays: date, category badge, shop, amount in ৳ format
- ✅ Edit and delete actions work for existing expenses
- ✅ All amounts display with BDT formatting (৳12,345.67)
- ✅ Form validation prevents invalid amounts or empty required fields
- ✅ Success feedback shows after creating/updating/deleting expense

### Test Case
1. Set salary to ৳50,000
2. Add manual expense: Food, Madchef, ৳850, 2026-04-20
3. Upload receipt image → OCR extracts ৳1,245, 2026-04-19, "Aarong"
4. Correct category to Groceries
5. Save → Expense appears in list
6. Edit first expense → Change amount to ৳900 → Save
7. Delete second expense → Confirms deletion

---

## MVP Requirement 2: Monthly Dashboard

### User Story
As a user, I want to see a comprehensive monthly spending overview compared to my salary, so I understand where my money goes and how this month compares to last month.

### Functional Requirements
1. Display total spent vs. salary with progress indicator
2. Show spending percentage (e.g., 50.2% of salary spent)
3. Break down spending by category with amounts and percentages
4. Display top 5 largest expenses
5. Compare current month to previous month with +/- indicators
6. Visualize category breakdown (chart or bars)
7. Show surplus or deficit for current month

### Done When
- ✅ Dashboard page accessible from navigation
- ✅ Header shows: "Total Spent: ৳25,083 / ৳50,000 (50.2%)"
- ✅ Progress bar or circular indicator visualizes spending percentage
- ✅ Category breakdown section lists all categories with:
  - Category name
  - Amount spent (৳ formatted)
  - Percentage of total spending
  - Visual bar or chart segment
- ✅ Top expenses section shows 5 largest expenses with:
  - Date
  - Category badge
  - Shop name
  - Amount
- ✅ Month comparison section shows:
  - Current month total
  - Previous month total
  - Difference amount with +/- indicator
  - Percentage change
- ✅ Category comparison highlights increases/decreases vs. last month
- ✅ Dashboard updates when new expense added
- ✅ Data filters correctly by month (current vs. previous)
- ✅ Zero-state message if no expenses exist
- ✅ Handles missing salary gracefully (prompts to set salary)

### Test Case
1. Navigate to Dashboard
2. Verify spending shows ৳25,083 / ৳50,000
3. See Rent category at 32% (৳16,000)
4. Top expenses include Rent ৳16,000, DESCO ৳2,599, etc.
5. Month comparison shows current month lower than March 2026
6. Add new ৳5,000 expense → Dashboard updates immediately

---

## MVP Requirement 3: Forecast and Insights

### User Story
As a user, I want to see data-driven predictions about my month-end finances and receive specific insights about my spending patterns, so I can make better financial decisions.

### Functional Requirements
1. Calculate forecasted total spending by month end
2. Project surplus or deficit at month end
3. Generate at least 3 specific insights with category names and amounts
4. Insights compare current vs. previous month
5. Insights identify high-spending categories
6. Insights highlight unusual spending patterns
7. Display forecast prominently on dashboard

### Done When
- ✅ Forecast section appears on dashboard or separate insights page
- ✅ Shows projected month-end total: "Expected spending: ৳48,500"
- ✅ Shows projected surplus/deficit: "Expected left: ৳1,500" or "Expected short: ৳2,300"
- ✅ Forecast calculation uses: current spending ÷ days elapsed × total days in month
- ✅ At least 3 insights display with specific data:
  - Format: "[Category] accounts for X% (৳amount) of your spending"
  - Format: "[Category] increased by ৳amount vs last month"
  - Format: "You spent X% less/more on [Category] this month"
- ✅ Insights are data-driven, not generic advice
- ✅ Each insight includes category name and specific amount
- ✅ Insights update when expenses change
- ✅ Visual styling distinguishes insights (icons, badges, or cards)
- ✅ Insights sorted by relevance/impact

### Test Case (Using April 2026 seed data on day 18)
1. Dashboard shows forecast: ~৳48,500 by month end
2. Shows expected surplus: ~৳1,500
3. Insight 1: "Rent accounts for 32% (৳16,000) of your spending"
4. Insight 2: "Mobile expenses increased by ৳1,803 compared to last month"
5. Insight 3: "Entertainment spending is 134% higher this month (₩2,064 vs ₩2,014)"
6. Add ৳10,000 expense → Forecast updates to show deficit

---

## MVP Requirement 4: Savings Pockets with DPS Projections

### User Story
As a user, I want to create savings goals for specific items and see when I'll reach them plus what a DPS investment would return, so I can plan major purchases and compare savings strategies.

### Functional Requirements
1. User can create savings pocket with: name, item description, target amount, monthly contribution
2. Display list of all savings pockets
3. Show progress toward each target (current saved / target)
4. Calculate expected completion date
5. Calculate DPS return at 8% annual rate for same time period
6. Display DPS comparison alongside pocket savings
7. User can update pocket details
8. User can delete pockets
9. User can update current saved amount

### Done When
- ✅ Savings pockets page accessible from navigation
- ✅ "Create Pocket" button opens form modal/page
- ✅ Form includes: name input, item description input, target amount, monthly contribution
- ✅ Form validation ensures positive numbers
- ✅ Pockets display as cards in grid layout
- ✅ Each card shows:
  - Name and item description
  - Progress bar: ৳currentSaved / ৳targetAmount (X%)
  - Monthly contribution amount
  - Expected completion date (calculated: months = (target - saved) / monthly)
  - DPS projection: "DPS alternative: ৳XXX over same period"
- ✅ DPS calculation uses 8% annual rate with monthly compounding
- ✅ Formula: `FV = PMT × (((1 + r/12)^months - 1) / (r/12)) × (1 + r/12)`
- ✅ Edit button opens pre-filled form
- ✅ Delete button removes pocket with confirmation
- ✅ Update saved amount feature (manual or automated)
- ✅ Zero-state shows helpful message if no pockets exist
- ✅ All amounts in ৳ format

### Test Case
1. Navigate to Savings Pockets
2. See 3 seed pockets: Wedding (৳300k), Laptop (৳145k), Bike (৳150k)
3. Wedding card shows:
   - Target: ৳300,000
   - Monthly: ৳20,000
   - Expected: 15 months (Jul 2027)
   - DPS: ৳307,200 over 15 months
4. Create new pocket: "Vacation", "Cox's Bazar trip", ৳80,000 target, ৳8,000 monthly
5. New card shows: 10 months to complete, DPS ৳82,560
6. Edit Laptop pocket → Change monthly to ৳15,000 → Completion date updates
7. Delete Bike pocket → Confirms and removes from list

---

## Overall MVP Success Criteria

### Functionality
- ✅ All 4 requirements fully implemented
- ✅ Database persistence working (MongoDB)
- ✅ Real-time updates across UI
- ✅ Data validation on all forms
- ✅ Error handling for edge cases

### User Experience
- ✅ Intuitive navigation between features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states for async operations
- ✅ Success/error feedback for user actions
- ✅ Consistent BDT currency formatting throughout

### Technical
- ✅ Build completes without errors
- ✅ TypeScript types used throughout
- ✅ Services properly wired to UI
- ✅ Clean code following template patterns
- ✅ Proper error boundaries

### Design
- ✅ Maintains template's soothing white/ash aesthetic
- ✅ Professional, trustworthy appearance for financial data
- ✅ Consistent spacing and typography
- ✅ Accessible color contrast
- ✅ Smooth transitions and animations

---

## Test Flow for Complete Click Path

1. **First Visit**
   - See dashboard with prompt to set salary
   - Click "Set Salary" → Enter ৳50,000 → Save

2. **Add Expenses**
   - Navigate to Add Expense
   - Manual: Food, Burger King, ৳850, today
   - OCR: Upload receipt → Review extracted data → Correct → Save

3. **View Dashboard**
   - See spending vs. salary progress
   - Review category breakdown
   - Check top expenses
   - View month comparison

4. **Check Insights**
   - Read forecast for month end
   - Review 3+ specific insights
   - Understand surplus/deficit projection

5. **Plan Savings**
   - Navigate to Savings Pockets
   - View existing pockets with DPS comparisons
   - Create new pocket
   - Edit existing pocket
   - See updated completion dates

6. **Manage Data**
   - Return to expenses list
   - Edit an expense
   - Delete an expense
   - Update salary
   - Verify dashboard reflects changes

**All flows complete without errors = MVP Success** ✅
