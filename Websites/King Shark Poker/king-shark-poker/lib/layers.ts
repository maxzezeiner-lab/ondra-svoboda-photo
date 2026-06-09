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
  | { kind: "tint";  slot: string; src: string; color: string }
  | { kind: "image"; slot: string; src: string; duration: number };

// Colour mode: full felt images keyed by colour ID.
// Each entry: [normal, pit]
const FELT_COLOR_FILES: Record<string, [string, string]> = {
  black:  ["Felt%20black.png",  "Felt%20black%20pit.png"],
  blue:   ["Felt%20blue.png",   "Felt%20blue%20pit.png"],
  brown:  ["Felt%20brown.png",  "Felt%20brown%20pit.png"],
  green:  ["Felt%20green.png",  "Felt%20green%20pit.png"],
  orange: ["Felt%20orange.png", "Felt%20orange%20pit.png"],
  purple: ["Felt%20purple.png", "Felt%20purple%20pit.png"],
  red:    ["Felt%20red.png",    "Felt%20red%20pit.png"],
};

// Design mode: full felt images with a printed pattern.
// Design A = plain black (the default look). B/C/D have decorative patterns.
// Each entry: [normal, pit]
const FELT_DESIGN_FILES: Record<string, [string, string]> = {
  // A has no overlay — shows the plain table base (same as Custom preview)
  B: ["Felt%20design%20B.png",   "Felt%20design%20B%20pit.png"],
  C: ["Felt%20design%20C.png",   "Felt%20design%20C%20pit.png"],
  D: ["Felt%20design%20D.png",   "Felt%20design%20D%20pit.png"],
};

// Layer order (bottom → top):
//   1. legs-{A|B|C|D|E}.png          — leg variant (behind body)
//   2. base.png / base-pit.png        — table shell
//   3. felt image                     — colour mode: Felt {color}.png
//                                       design mode: Felt design {A|B|C|D}.png
//                                       custom / tint fallback: felt-mask.png tinted
//   4. vinyl-mask.png (tint)          — vinyl rail colour
//   5. accessories                    — cupholder, chiprack, lightrail (conditional)
export function getTableLayers(
  tableType: string,
  shape: string,
  pit: boolean,
  legs: string,
  feltMode: "color" | "design",
  feltColorId: string,
  feltHex: string,
  feltDesign: string,
  vinylHex: string,
  chipRack: boolean,
  cupHolderCount: number,
  lightRail: boolean,
): Layer[] {
  const b = `/layers/tables/${tableType}/${shape}`;
  const pitIdx = pit ? 1 : 0;

  const feltLayer: Layer[] = (() => {
    if (feltMode === "color") {
      const f = FELT_COLOR_FILES[feltColorId];
      return f
        ? [{ kind: "image" as const, slot: "felt", src: `${b}/${f[pitIdx]}`, duration: 1200 }]
        : [{ kind: "tint"  as const, slot: "felt", src: `${b}/felt-mask.png`, color: feltHex }];
    }
    const f = FELT_DESIGN_FILES[feltDesign];
    return f
      ? [{ kind: "image" as const, slot: "felt", src: `${b}/${f[pitIdx]}`, duration: 1200 }]
      : [];
  })();

  return [
    { kind: "image", slot: "legs",      src: `${b}/legs-${legs}.png`,            duration: 0 },
    { kind: "image", slot: "base",      src: `${b}/${pit ? "base-pit" : "base"}.png`, duration: 0 },
    ...feltLayer,
    { kind: "tint",  slot: "vinyl",     src: `${b}/vinyl-mask.png`, color: vinylHex },
    ...(chipRack           ? [{ kind: "image" as const, slot: "chiprack",  src: `${b}/chiprack.png`,  duration: 0 }] : []),
    ...(cupHolderCount > 0 ? [{ kind: "image" as const, slot: "cupholder", src: `${b}/cupholder.png`, duration: 0 }] : []),
    ...(lightRail          ? [{ kind: "image" as const, slot: "lightrail", src: `${b}/lightrail.png`, duration: 0 }] : []),
  ];
}

export function getChairLayers(
  chairType: string,
  chairHex: string,
  armrests: boolean,
): Layer[] {
  const b = `/layers/chairs/${chairType}`;
  return [
    { kind: "tint",  slot: "seat",    src: `${b}/seat-mask.png`, color: chairHex },
    { kind: "image", slot: "frame",   src: `${b}/frame.png`,     duration: 0 },
    ...(armrests ? [{ kind: "image" as const, slot: "armrest", src: `${b}/armrest.png`, duration: 0 }] : []),
  ];
}

export function getChipLayers(
  material: string,
  chipColorHex: string,
): Layer[] {
  const b = `/layers/chips/material-${material.toLowerCase()}`;
  return [
    { kind: "tint",  slot: "base", src: `${b}/base-mask.png`, color: chipColorHex },
    { kind: "image", slot: "edge", src: `${b}/edge.png`,      duration: 0 },
  ];
}
