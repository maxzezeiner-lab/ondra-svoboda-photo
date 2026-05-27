# King Shark Poker — Photo Upload Guide

This folder holds all product images for the website.
After adding a photo, update the matching key in `lib/images.ts` from `null` to the path string.

---

## Folder Structure

```
public/images/
│
├── tables/
│   ├── poker/
│   │   ├── default.jpg          ← Generic poker table (fallback for all poker configs)
│   │   ├── small-oval.jpg
│   │   ├── small-bean.jpg
│   │   ├── small-round.jpg
│   │   ├── standard-oval.jpg    ← Most common — prioritize this one
│   │   ├── standard-bean.jpg
│   │   ├── standard-round.jpg
│   │   ├── large-oval.jpg
│   │   ├── large-bean.jpg
│   │   └── large-round.jpg
│   │
│   ├── blackjack/
│   │   ├── default.jpg
│   │   ├── small.jpg
│   │   ├── standard.jpg
│   │   └── large.jpg
│   │
│   ├── roulette/
│   │   ├── default.jpg
│   │   ├── standard.jpg
│   │   └── large.jpg
│   │
│   └── custom/
│       └── default.jpg
│
├── chairs/
│   ├── high-stool/
│   │   ├── default.jpg          ← Fallback for any high stool
│   │   ├── black.jpg
│   │   ├── brown.jpg
│   │   ├── red.jpg
│   │   ├── blue.jpg
│   │   ├── green.jpg
│   │   └── gold.jpg
│   │
│   └── low-office/
│       ├── default.jpg
│       ├── black.jpg
│       ├── brown.jpg
│       ├── red.jpg
│       ├── blue.jpg
│       ├── green.jpg
│       └── gold.jpg
│
├── chips/
│   ├── material-a/
│   │   ├── default.jpg          ← Standard clay composite, fallback
│   │   ├── white.jpg
│   │   ├── red.jpg
│   │   ├── blue.jpg
│   │   ├── green.jpg
│   │   ├── black.jpg
│   │   └── gold.jpg
│   │
│   ├── material-b/              ← Premium clay composite
│   │   └── (same as material-a)
│   │
│   └── material-c/              ← Ceramic casino grade
│       └── (same as material-a)
│
└── gallery/
    ├── project-1.jpg            ← Filename matches gallery-data.ts entries
    ├── project-2.jpg
    └── ...
```

---

## How to Activate a Photo

1. Drop the `.jpg` or `.webp` file into the correct folder above.
2. Open `lib/images.ts`.
3. Find the matching key and change `null` to the path string:

```typescript
// Before:
"standard-oval": null,

// After:
"standard-oval": "/images/tables/poker/standard-oval.jpg",
```

4. Save — the configurator preview will show the real photo immediately.

---

## Recommended Photo Specs

| Use | Size | Format |
|-----|------|--------|
| Table preview (configurator) | 900×560 px | .jpg or .webp |
| Chair preview | 600×600 px | .jpg or .webp |
| Chips preview | 600×600 px | .jpg or .webp |
| Gallery cards | 800×520 px | .jpg or .webp |

- Use `.webp` for better performance (smaller file size, same quality).
- Keep file size under 200 KB per image for fast loading.
- Use consistent lighting and backgrounds for a professional look.

---

## Gallery Photos

For gallery items, add photos to `public/images/gallery/` and update `lib/gallery-data.ts`:

```typescript
// In gallery-data.ts, add an `image` field:
{
  id: "1",
  title: "Premium Oval Poker Table",
  category: "poker",
  image: "/images/gallery/project-1.jpg",   // ← add this
  // ...
}
```

Then update `app/gallery/page.tsx` → `GalleryCard` to render:
```tsx
<Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
```
