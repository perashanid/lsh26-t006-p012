# Design System - Personal Ledger Manager

## Visual Identity
- **Palette:** Soothing white/ash with green accents (from original glamping template)
- **Mood:** Calm, premium, trustworthy - perfect for financial management
- **Typography:** DM Sans font family (system-ui fallback)

## Color Tokens (HSL)
All colors defined as CSS variables in `src/index.css`:

### Light Theme (Default)
- `--background: 0 0% 99%` - Off-white background
- `--foreground: 0 0% 20%` - Dark gray text
- `--primary: 150 15% 70%` - Soft sage green (main actions)
- `--secondary: 0 0% 96%` - Light gray (secondary surfaces)
- `--muted: 0 0% 96%` - Muted backgrounds
- `--accent: 150 20% 95%` - Light green accent
- `--destructive: 0 70% 55%` - Red for delete/warnings
- `--border: 0 0% 92%` - Subtle borders
- `--card: 0 0% 100%` - White card backgrounds

### Dark Theme (Available)
- `--background: 30 20% 12%` - Dark warm background
- `--primary: 140 40% 55%` - Brighter green for dark mode
- Other tokens adjusted for dark mode contrast

## Typography Scale
- Headings: font-light with tight tracking (-0.03em to -0.02em)
- Body: Default weight with normal tracking
- Labels: uppercase with wide tracking (0.08em) and text-xs

## Spacing & Layout
- Container: max-width 1400px, centered with 2rem padding
- Border radius: --radius (0.5rem), with md/sm variants
- Standard spacing follows Tailwind's scale (4px increments)

## Component Patterns

### Cards
- White background (`bg-card`)
- Subtle borders (`border-border`)
- Soft shadow (`shadow-soft`: 0 2px 8px rgba(0,0,0,0.04))
- Hover lift effect available (`hover-lift` utility)

### Buttons
- Primary: sage green background with white text
- Secondary: light gray background
- Rounded corners (rounded-md or rounded-full for CTA)
- Smooth transitions (duration-400)

### Form Inputs
- Light gray background when unfocused
- Border on focus with primary ring color
- Consistent padding and height across all inputs
- Labels use uppercase-label utility class

### Loading States
- Skeleton loaders with shimmer animation
- Spinners using Lucide icons with animate-spin
- Loading overlays with semi-transparent background

### Empty States
- Centered layout with icon
- Muted text color
- Clear call-to-action button

### Data Visualization
- Charts use primary/accent colors for consistency
- Recharts library for visualizations
- Tooltips styled to match card design

## Shadows
- `--soft-shadow: 0 2px 8px hsl(0 0% 0% / 0.04)` - Default subtle shadow
- `--hover-shadow: 0 4px 16px hsl(0 0% 0% / 0.08)` - Elevated hover state

## Transitions
- `--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- Standard duration: 400ms
- Easing: ease-out for most animations

## Utility Classes
```css
.smooth-hover - Apply transition-all duration-400 ease-out
.hover-lift - Scale 105% with shadow-xl on hover
.uppercase-label - Uppercase, tracking-wider, text-xs, font-normal
```

## Icon System
- Lucide React icons throughout
- Consistent sizing: w-5 h-5 for most UI icons
- w-6 h-6 for larger feature icons
- Stroke width 1.5 for refined appearance

## Responsive Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1400px (container max)

## Financial Data Formatting
- Currency symbol: ৳ (Bangladeshi Taka)
- Number format: 50,000.00 (comma thousands, 2 decimals)
- Percentages: 15.2% (1 decimal)
- Dates: DD MMM YYYY (e.g., 17 Apr 2026)

## Animation Principles
- Subtle and purposeful (avoid distraction)
- Fast interactions (< 400ms)
- Loading states show immediately (no delay)
- Page transitions smooth with AnimatePresence (Framer Motion available)

## Accessibility
- All interactive elements keyboard accessible
- Color contrast meets WCAG AA
- Form labels properly associated
- Error states clearly indicated
- Focus visible on all interactive elements

## Pattern: Adding New Feature
1. Use existing card/button patterns from shadcn/ui components
2. Match color tokens (never hardcode colors)
3. Follow spacing scale (Tailwind defaults)
4. Include loading/empty/error states
5. Ensure responsive layout
6. Test keyboard navigation
