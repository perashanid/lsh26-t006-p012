# Licenses and Attribution

## Template
**Source:** Kiro Hackathon Templates Collection  
**Template:** `remix-of-glamping-off-grid-retreat-booking-template`  
**License:** [Template license terms from Kiro]

This project builds upon the glamping retreat booking template, adapting its components and design system for personal finance management.

---

## Core Dependencies

### Runtime Dependencies

**React & Core**
- `react` (v18.3.1) — MIT License
- `react-dom` (v18.3.1) — MIT License
- `react-router-dom` (v6.30.1) — MIT License
- `@tanstack/react-query` (v5.83.0) — MIT License

**UI & Styling**
- `tailwindcss` (v3.4.17) — MIT License
- `tailwindcss-animate` (v1.0.7) — MIT License
- `tailwind-merge` (v2.6.0) — MIT License
- `class-variance-authority` (v0.7.1) — Apache 2.0
- `clsx` (v2.1.1) — MIT License
- `framer-motion` (v12.23.25) — MIT License
- `next-themes` (v0.3.0) — MIT License

**Radix UI Components** (all MIT License)
- `@radix-ui/react-accordion` (v1.2.11)
- `@radix-ui/react-alert-dialog` (v1.1.14)
- `@radix-ui/react-aspect-ratio` (v1.1.7)
- `@radix-ui/react-avatar` (v1.1.10)
- `@radix-ui/react-checkbox` (v1.3.2)
- `@radix-ui/react-collapsible` (v1.1.11)
- `@radix-ui/react-context-menu` (v2.2.15)
- `@radix-ui/react-dialog` (v1.1.14)
- `@radix-ui/react-dropdown-menu` (v2.1.15)
- `@radix-ui/react-hover-card` (v1.1.14)
- `@radix-ui/react-label` (v2.1.7)
- `@radix-ui/react-menubar` (v1.1.15)
- `@radix-ui/react-navigation-menu` (v1.2.13)
- `@radix-ui/react-popover` (v1.1.14)
- `@radix-ui/react-progress` (v1.1.7)
- `@radix-ui/react-radio-group` (v1.3.7)
- `@radix-ui/react-scroll-area` (v1.2.9)
- `@radix-ui/react-select` (v2.2.5)
- `@radix-ui/react-separator` (v1.1.7)
- `@radix-ui/react-slider` (v1.3.5)
- `@radix-ui/react-slot` (v1.2.3)
- `@radix-ui/react-switch` (v1.2.5)
- `@radix-ui/react-tabs` (v1.1.12)
- `@radix-ui/react-toast` (v1.2.14)
- `@radix-ui/react-toggle` (v1.1.9)
- `@radix-ui/react-toggle-group` (v1.1.10)
- `@radix-ui/react-tooltip` (v1.2.7)

**Form & Validation**
- `react-hook-form` (v7.61.1) — MIT License
- `@hookform/resolvers` (v3.10.0) — MIT License
- `zod` (v3.25.76) — MIT License

**Utilities**
- `date-fns` (v3.6.0) — MIT License
- `uuid` (v14.0.2) — MIT License
- `lucide-react` (v0.462.0) — ISC License
- `cmdk` (v1.1.1) — MIT License
- `sonner` (v1.7.4) — MIT License
- `input-otp` (v1.4.2) — MIT License

**Charts & Visualization**
- `recharts` (v2.15.4) — MIT License

**Database**
- `mongodb` (v7.6.0) — Apache 2.0

**Other**
- `embla-carousel-react` (v8.6.0) — MIT License
- `react-resizable-panels` (v2.1.9) — MIT License
- `vaul` (v0.9.9) — MIT License
- `@supabase/supabase-js` (v2.95.3) — MIT License (included from template, not used)

### Development Dependencies

**Build Tools**
- `vite` (v5.4.19) — MIT License
- `@vitejs/plugin-react-swc` (v3.11.0) — MIT License

**TypeScript**
- `typescript` (v5.8.3) — Apache 2.0
- `@types/node` (v22.16.5) — MIT License
- `@types/react` (v18.3.23) — MIT License
- `@types/react-dom` (v18.3.7) — MIT License
- `@types/uuid` (v10.0.0) — MIT License
- `typescript-eslint` (v8.38.0) — MIT License

**Linting**
- `eslint` (v9.32.0) — MIT License
- `@eslint/js` (v9.32.0) — MIT License
- `eslint-plugin-react-hooks` (v5.2.0) — MIT License
- `eslint-plugin-react-refresh` (v0.4.20) — MIT License
- `globals` (v15.15.0) — MIT License

**PostCSS & Tailwind**
- `postcss` (v8.5.6) — MIT License
- `autoprefixer` (v10.4.21) — MIT License
- `@tailwindcss/typography` (v0.5.16) — MIT License

**Other**
- `lovable-tagger` (v1.1.11) — [License TBD]

---

## Custom Code

All code in `src/lib/` and `src/data/` directories (types, services, utilities, seed data) is original work created for this hackathon project.

**Services:**
- `src/lib/types.ts` — TypeScript interfaces
- `src/lib/mongodb.ts` — Database connection
- `src/lib/expense-service.ts` — Expense CRUD
- `src/lib/salary-service.ts` — Salary management
- `src/lib/savings-service.ts` — Savings pockets CRUD
- `src/lib/mock-ocr.ts` — Receipt OCR simulation
- `src/lib/utils-finance.ts` — Financial calculations
- `src/lib/seed-database.ts` — Database seeding
- `src/data/seed.ts` — Demo data

---

## Test Data

Test case data sourced from `P12_personal_ledger_public.json` (PUB-01 case) provided as part of the hackathon problem specification.

---

## License Notice

This project is built for educational/hackathon purposes. All third-party dependencies are used in accordance with their respective licenses. See individual package repositories for full license texts.

MIT License dependencies permit commercial and non-commercial use with attribution.  
Apache 2.0 dependencies require preservation of copyright notices and disclaimers.
