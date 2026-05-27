// ============================================================
// LAYERED PNG PREVIEW SYSTEM
//
// Each product type uses stacked PNG layers to compose the preview.
// Layers are rendered bottom-to-top in the order returned.
//
// Two layer kinds:
//   "tint"  — a div coloured via CSS mask-image. The PNG is a
//             greyscale mask (white = paint, transparent = skip).
//             One mask PNG covers all colour variants.
//   "image" — a plain transparent PNG dropped directly on top.
//
// FILE STRUCTURE  (all under /public/layers/)
//
//   tables/{type}/{shape}/
//     felt-mask.png       ← white silhouette of the playing surface
//     frame.png           ← wood frame, rails, legs (transparent bg)
//     vinyl-mask.png      ← white silhouette of the vinyl rail wrap
//     mat-simpleLine.png  ← optional mat design overlays
//     mat-premiumBorder.png
//     mat-custom.png
//     chiprack.png        ← accessory overlays (conditional)
//     cupholder.png
//     lightrail.png
//
//   chairs/{type}/
//     seat-mask.png
//     frame.png
//     armrest.png
//
//   chips/material-{a|b|c}/
//     base-mask.png
//     edge.png            ← chip detail / embossed rim
//
// RECOMMENDED SPECS
//   Canvas: 1600 × 1000 px, transparent background, 72 dpi
//   Format: PNG-24 with alpha
//   All layers for a given product share the same canvas size and camera angle
//   so they register perfectly when stacked.
// ============================================================

export type Layer =
  | { kind: "tint";  src: string; color: string }
  | { kind: "image"; src: string };

// Layer order (bottom → top):
//   1. base.png / base-pit.png     — table shell/body
//   2. legs-{A|B|C|D|E}.png        — leg variant overlay
//   3. felt-mask.png (tint)         — felt surface colour
//   4. mat-{design}.png             — mat design overlay (conditional)
//   5. vinyl-mask.png (tint)        — vinyl rail colour
//   6. accessories                  — cupholder, chiprack, lightrail (conditional)
export function getTableLayers(
  tableType: string,
  shape: string,
  pit: boolean,
  legs: string,
  feltHex: string,
  vinylHex: string,
  matDesign: string,
  chipRack: boolean,
  cupHolderCount: number,
  lightRail: boolean,
): Layer[] {
  const b = `/layers/tables/${tableType}/${shape}`;
  return [
    // 1 — legs (behind the table body)
    { kind: "image", src: `${b}/legs-${legs}.png` },
    // 2 — base shape (sits on top of legs)
    { kind: "image", src: `${b}/${pit ? "base-pit" : "base"}.png` },
    // 3 — felt surface (tinted)
    { kind: "tint",  src: `${b}/felt-mask.png`,  color: feltHex },
    // 4 — mat design overlay
    ...(matDesign !== "plain" ? [{ kind: "image" as const, src: `${b}/mat-${matDesign}.png` }] : []),
    // 5 — vinyl rail (tinted)
    { kind: "tint",  src: `${b}/vinyl-mask.png`, color: vinylHex },
    // 6 — accessories
    ...(chipRack           ? [{ kind: "image" as const, src: `${b}/chiprack.png`  }] : []),
    ...(cupHolderCount > 0 ? [{ kind: "image" as const, src: `${b}/cupholder.png` }] : []),
    ...(lightRail          ? [{ kind: "image" as const, src: `${b}/lightrail.png` }] : []),
  ];
}

export function getChairLayers(
  chairType: string,
  chairHex: string,
  armrests: boolean,
): Layer[] {
  const b = `/layers/chairs/${chairType}`;
  return [
    { kind: "tint",  src: `${b}/seat-mask.png`, color: chairHex },
    { kind: "image", src: `${b}/frame.png` },
    ...(armrests ? [{ kind: "image" as const, src: `${b}/armrest.png` }] : []),
  ];
}

export function getChipLayers(
  material: string,
  chipColorHex: string,
): Layer[] {
  const b = `/layers/chips/material-${material.toLowerCase()}`;
  return [
    { kind: "tint",  src: `${b}/base-mask.png`, color: chipColorHex },
    { kind: "image", src: `${b}/edge.png` },
  ];
}
