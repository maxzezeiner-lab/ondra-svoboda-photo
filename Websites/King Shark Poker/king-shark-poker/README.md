# King Shark Poker — Custom Casino Tables Website

A premium custom casino furniture website featuring product configurators, a gallery, and a contact system.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **xlsx** — server-side Excel order storage

---

## How to Run Locally

### Prerequisites
- Node.js 18+ installed

### Steps

```bash
# 1. Navigate to the project folder
cd "King Shark Poker/king-shark-poker"

# 2. Install dependencies (already done if you see node_modules)
npm install

# 3. Start the development server
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## Project Structure

```
king-shark-poker/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout (Header + Footer)
│   ├── globals.css           # Global styles + design tokens
│   ├── tables/page.tsx       # Table Configurator
│   ├── chairs/page.tsx       # Chair Configurator
│   ├── chips/page.tsx        # Chips Configurator
│   ├── gallery/page.tsx      # Gallery + filters
│   ├── about/page.tsx        # About page
│   ├── contact/page.tsx      # Contact form
│   └── api/submit/route.ts   # API: saves submissions to Excel
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ui/
│   │   └── SectionHeading.tsx
│   └── configurator/
│       ├── ConfiguratorLayout.tsx
│       ├── ProductPreview.tsx
│       ├── OptionGroup.tsx
│       ├── ColorPicker.tsx
│       ├── PriceSummary.tsx
│       └── CustomerInfoForm.tsx
├── lib/
│   ├── config.ts             # All PRICES + CONTENT (edit here!)
│   ├── colors.ts             # All color palettes
│   └── gallery-data.ts       # Gallery items (add real projects here)
├── types/
│   └── index.ts              # TypeScript types
├── data/
│   └── orders.xlsx           # Auto-created on first submission
└── public/
    └── logo.jpeg             # Brand logo
```

---

## Configuration & Customization

### Edit Prices
Open `lib/config.ts` → `PRICES` object. All prices are in EUR.

### Add Czech Translations
Open `lib/config.ts` → `CONTENT.cs` — fill in the Czech strings.
Then wire the language switcher in `components/Header.tsx` to pass the active language as context.

### Add Real Gallery Photos
1. Place photos in `public/gallery/`
2. Open `lib/gallery-data.ts`
3. Add `image: "/gallery/your-photo.jpg"` to each item
4. Update `app/gallery/page.tsx` GalleryCard to use `<Image src={item.image} ... />`

### Add Real Product Previews
Open `components/configurator/ProductPreview.tsx` — see the TODO comment at the top.
Create an `imageMap` object mapping config combinations → image paths.

### Replace Contact Info
Open `components/Footer.tsx` and `app/contact/page.tsx` — search for `TODO: replace`.

---

## Order Submissions

All configurator submissions are saved to `data/orders.xlsx` (created automatically).

Each row contains: date, config type, customer info, full configuration JSON, and estimated total.

### Future upgrades (see `app/api/submit/route.ts`):
- Replace with email sending (Resend / Nodemailer)
- Connect to a CRM (HubSpot, Pipedrive)
- Add a database (Supabase, MongoDB)
- Build an admin panel with authentication

---

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

For deployment, the easiest option is [Vercel](https://vercel.com) — connect the repo and deploy.
Note: The Excel file write (`data/orders.xlsx`) requires a persistent filesystem. On serverless platforms, replace with a database or email solution.
