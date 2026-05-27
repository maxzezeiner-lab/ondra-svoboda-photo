// ============================================================
// PRODUCT IMAGE MAPPING
//
// This file maps product configurations to image paths.
// All images live under /public/images/.
//
// HOW TO ADD PHOTOS:
//   1. Place your .jpg / .webp in the correct subfolder under public/images/
//   2. Update the matching key in the maps below to point to the file path
//   3. Set the value to the path string (e.g. "/images/tables/poker/standard-oval.jpg")
//   4. If a specific variant has no photo yet, leave the value as null —
//      the preview will fall back to the next available level or the placeholder.
//
// PRIORITY fallback chain (most specific → least specific → placeholder):
//   size+shape  →  size  →  "default"  →  null (shows placeholder)
// ============================================================

// ---- TABLES ----
// Key format: "size-shape"  (e.g. "standard-oval", "large-bean")
// Use "default" for the catch-all fallback for each table type.

export const TABLE_IMAGES: Record<string, Record<string, string | null>> = {
  poker: {
    "default":         "/images/tables/poker/poker_table_cover.jpg" ,
    "small-oval":      null,  // TODO: /images/tables/poker/small-oval.jpg
    "small-bean":      null,  // TODO: /images/tables/poker/small-bean.jpg
    "small-round":     null,  // TODO: /images/tables/poker/small-round.jpg
    "standard-oval":   null,  // TODO: /images/tables/poker/standard-oval.jpg
    "standard-bean":   null,  // TODO: /images/tables/poker/standard-bean.jpg
    "standard-round":  null,  // TODO: /images/tables/poker/standard-round.jpg
    "large-oval":      null,  // TODO: /images/tables/poker/large-oval.jpg
    "large-bean":      null,  // TODO: /images/tables/poker/large-bean.jpg
    "large-round":     null,  // TODO: /images/tables/poker/large-round.jpg
  },
  blackjack: {
    "default":         null,  // TODO: /images/tables/blackjack/default.jpg
    "small":           null,  // TODO: /images/tables/blackjack/small.jpg
    "standard":        null,  // TODO: /images/tables/blackjack/standard.jpg
    "large":           null,  // TODO: /images/tables/blackjack/large.jpg
  },
  roulette: {
    "default":         null,  // TODO: /images/tables/roulette/default.jpg
    "standard":        null,  // TODO: /images/tables/roulette/standard.jpg
    "large":           null,  // TODO: /images/tables/roulette/large.jpg
  },
  custom: {
    "default":         null,  // TODO: /images/tables/custom/default.jpg
  },
};

// ---- CHAIRS ----
// Key format: "type-colorId"  (e.g. "highStool-black", "lowOfficeChair-brown")
// Use "type-default" for the catch-all per chair type.

export const CHAIR_IMAGES: Record<string, string | null> = {
  "highStool-default":        null,  // TODO: /images/chairs/high-stool/default.jpg
  "highStool-black":          null,  // TODO: /images/chairs/high-stool/black.jpg
  "highStool-brown":          null,  // TODO: /images/chairs/high-stool/brown.jpg
  "highStool-red":            null,  // TODO: /images/chairs/high-stool/red.jpg
  "highStool-blue":           null,  // TODO: /images/chairs/high-stool/blue.jpg
  "highStool-green":          null,  // TODO: /images/chairs/high-stool/green.jpg
  "highStool-gold":           null,  // TODO: /images/chairs/high-stool/gold.jpg
  "lowOfficeChair-default":   null,  // TODO: /images/chairs/low-office/default.jpg
  "lowOfficeChair-black":     null,  // TODO: /images/chairs/low-office/black.jpg
  "lowOfficeChair-brown":     null,  // TODO: /images/chairs/low-office/brown.jpg
  "lowOfficeChair-red":       null,  // TODO: /images/chairs/low-office/red.jpg
  "lowOfficeChair-blue":      null,  // TODO: /images/chairs/low-office/blue.jpg
  "lowOfficeChair-green":     null,  // TODO: /images/chairs/low-office/green.jpg
  "lowOfficeChair-gold":      null,  // TODO: /images/chairs/low-office/gold.jpg
};

// ---- CHIPS ----
// Key format: "material-designColorId"  (e.g. "A-red", "B-gold")
// Use "material-default" for the catch-all per material.

export const CHIP_IMAGES: Record<string, string | null> = {
  "A-default":   null,  // TODO: /images/chips/material-a/default.jpg
  "A-white":     null,  // TODO: /images/chips/material-a/white.jpg
  "A-red":       null,  // TODO: /images/chips/material-a/red.jpg
  "A-blue":      null,  // TODO: /images/chips/material-a/blue.jpg
  "A-green":     null,  // TODO: /images/chips/material-a/green.jpg
  "A-black":     null,  // TODO: /images/chips/material-a/black.jpg
  "A-gold":      null,  // TODO: /images/chips/material-a/gold.jpg
  "B-default":   null,  // TODO: /images/chips/material-b/default.jpg
  "B-white":     null,
  "B-red":       null,
  "B-blue":      null,
  "B-green":     null,
  "B-black":     null,
  "B-gold":      null,
  "C-default":   null,  // TODO: /images/chips/material-c/default.jpg
  "C-white":     null,
  "C-red":       null,
  "C-blue":      null,
  "C-green":     null,
  "C-black":     null,
  "C-gold":      null,
};

// ============================================================
// LOOKUP HELPERS
// ============================================================

/** Returns image path for a table, or null if not yet available. */
export function getTableImage(
  type: string,
  size?: string,
  shape?: string
): string | null {
  const typeMap = TABLE_IMAGES[type];
  if (!typeMap) return null;

  // Try most specific key first, then fall back
  if (size && shape) {
    const specific = typeMap[`${size}-${shape}`];
    if (specific) return specific;
  }
  if (size && typeMap[size]) return typeMap[size]!;
  return typeMap["default"] ?? null;
}

/** Returns image path for a chair, or null if not yet available. */
export function getChairImage(type: string, colorId?: string): string | null {
  if (colorId) {
    const specific = CHAIR_IMAGES[`${type}-${colorId}`];
    if (specific) return specific;
  }
  return CHAIR_IMAGES[`${type}-default`] ?? null;
}

/** Returns image path for chips, or null if not yet available. */
export function getChipImage(material: string, colorId?: string): string | null {
  if (colorId) {
    const specific = CHIP_IMAGES[`${material}-${colorId}`];
    if (specific) return specific;
  }
  return CHIP_IMAGES[`${material}-default`] ?? null;
}
