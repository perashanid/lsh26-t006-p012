# Development Notes

## Phase 0 Complete ✅

**Status:** Foundation ready, handoff to coding agent  
**Date:** 2026-08-30  
**Next:** Feature implementation (UI + service wiring)

All planning, data layer, and documentation complete. See `../final-documentation.md` for full handoff details.

---

## Template Selection

**Chosen:** `remix-of-glamping-off-grid-retreat-booking-template`

**Why this template:**
- Soothing white and ash color palette evokes trust and calm — critical for financial applications
- Clean, minimal aesthetic allows focus on numbers and data
- Premium feel appropriate for personal finance management
- Pre-built form patterns adaptable for expense/salary input
- Card-based layouts work well for expense lists and savings pockets
- Responsive design tested across devices

**Rejected:** `perfect-pixel-replica` (user requested different choice)

---

## Stack Decisions

### Frontend
- **Vite + React 18** — Fast dev experience, modern React features
- **TypeScript** — Type safety for financial calculations
- **Tailwind CSS** — Utility-first styling matching template
- **shadcn/ui** — High-quality component library with 40+ components

**Decision:** Keep Vite setup from template, no migration to Next.js  
**Why:** Template already optimized for Vite, no need for SSR in this app

### Backend/Database
- **MongoDB Atlas** — Cloud database for persistence
- **Database:** `personal-ledger`
- **Collections:** expenses, salary_settings, savings_pockets
- **Connection:** `mongodb+srv://shanidsajjatuz:RnHu2S9L9xu93Hn0@cluster0.usmr4rf.mongodb.net/`

**Decision:** Use MongoDB instead of localStorage  
**Why:** Requirements imply real persistence across sessions, not just client-side storage

### Libraries Added
- `mongodb` — Database driver
- `uuid` + `@types/uuid` — ID generation for expenses and pockets

### Libraries to Add (Coding Agent)
- `@tanstack/react-query` — Server state management (recommended)
- `date-fns` — Date manipulation
- `recharts` — Dashboard charts (optional)

---

## What's Mocked

### Receipt OCR
**Implementation:** `src/lib/mock-ocr.ts`

**Why mocked:**
- Real OCR requires paid APIs (Google Cloud Vision, AWS Textract, Azure Computer Vision)
- Mock provides realistic interface for easy swapping later
- Returns plausible extracted data: amount, date, shop name

**Future real implementation:**
```typescript
// Replace simulateReceiptOCR with:
import vision from '@google-cloud/vision';
// or
import { Textract } from 'aws-sdk';
```

---

## Test Data Source

Based on **PUB-01** test case from `P12_personal_ledger_public.json`:

- Salary: ৳50,000/month (effective 2026-04-01)
- Current month: April 2026 (15 expenses, ৳25,083 total)
- Previous month: March 2026 (26 expenses for comparison)
- Savings pockets: Wedding (৳300k), Laptop (৳145k), Bike (৳150k)
- DPS rate: 8% annual

All seed data ready in `src/data/seed.ts` with seeding utility in `src/lib/seed-database.ts`.

---

## Financial Constants

- **Currency:** BDT (Bangladeshi Taka)
- **Symbol:** ৳
- **DPS Rate:** 8% annual with monthly compound interest
- **Categories:** Rent, Food, Groceries, Transport, Mobile, Utilities, Entertainment, Education, Health, Other

---

## Design System

See `DESIGN.md` for complete color tokens, typography, and component patterns extracted from template.

---

## Click Path (Implementation Target)

1. Dashboard → See spending vs salary, category breakdown, top expenses
2. Dashboard → View forecast and 3+ insights
3. Add Expense (manual) → Form with category/shop/amount/date
4. Add Expense (OCR) → Upload receipt, review extracted data, save
5. Savings Pockets → View 3 pockets with completion dates and DPS projections
6. Create Pocket → Form with name/item/target/monthly contribution
7. Salary Settings → View/update monthly salary

Full click path details in `../final-documentation.md`.

---

## Build Status

✅ Foundation complete:
- All TypeScript types defined
- Database connection working
- All services implemented (expense, salary, savings)
- Finance utilities ready (formatting, forecasting, DPS calc, insights)
- Mock OCR ready
- Seed data prepared
- Documentation complete

✅ Build verification:
```bash
npm run build  # Passes with chunk size warnings (acceptable)
```

Ready for coding agent to implement UI and wire up services.
