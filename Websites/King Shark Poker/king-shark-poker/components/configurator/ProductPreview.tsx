"use client";

import { getTableLayers, getChairLayers, getChipLayers, type Layer } from "@/lib/layers";

interface ProductPreviewProps {
  category: "table" | "chair" | "chips";
  subLabel?: string;

  // Table
  tableType?: string | null;
  shape?: string;
  pit?: boolean;
  legs?: string;
  feltHex?: string;
  vinylHex?: string;
  cupHolderCount?: number;
  chipRack?: boolean;
  lightRail?: boolean;
  matDesign?: string;

  // Chair
  chairType?: string;
  chairHex?: string;
  armrests?: boolean;

  // Chips
  chipMaterial?: string;
  chipColorHex?: string;
}

function TintLayer({ src, color }: { src: string; color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: color,
        WebkitMaskImage: `url('${src}')`,
        maskImage: `url('${src}')`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

function ImageLayer({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
      onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
    />
  );
}

function renderLayer(layer: Layer, i: number) {
  return layer.kind === "tint"
    ? <TintLayer key={i} src={layer.src} color={layer.color} />
    : <ImageLayer key={i} src={layer.src} />;
}

export default function ProductPreview({
  category,
  subLabel,
  tableType,
  shape = "oval",
  pit = false,
  legs = "A",
  feltHex = "#1a6b3c",
  vinylHex = "#0a0a0a",
  cupHolderCount = 0,
  chipRack = false,
  lightRail = false,
  matDesign = "plain",
  chairType,
  chairHex = "#0a0a0a",
  armrests = false,
  chipMaterial,
  chipColorHex = "#c0392b",
}: ProductPreviewProps) {

  let layers: Layer[] = [];

  if (category === "table" && tableType) {
    layers = getTableLayers(tableType, shape, pit, legs, feltHex, vinylHex, matDesign, chipRack, cupHolderCount, lightRail);
  } else if (category === "chair" && chairType) {
    layers = getChairLayers(chairType, chairHex, armrests);
  } else if (category === "chips" && chipMaterial) {
    layers = getChipLayers(chipMaterial, chipColorHex);
  }

  const hasProduct = layers.length > 0;

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 10",
        background: hasProduct ? "#0a0a0a" : "radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 70%)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        position: "relative",
        overflow: "hidden",
        minHeight: "280px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {hasProduct ? (
        <>
          {layers.map((layer, i) => renderLayer(layer, i))}
          {subLabel && (
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
              padding: "2rem 1rem 0.75rem",
              fontSize: "0.78rem",
              color: "#999",
              textAlign: "center",
              zIndex: 10,
              letterSpacing: "0.04em",
            }}>
              {subLabel}
            </div>
          )}
        </>
      ) : (
        <>
          <div style={{ position: "absolute", top: 12, left: 12, width: 32, height: 32, borderTop: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)", borderRadius: "2px 0 0 0" }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderTop: "2px solid var(--gold)", borderRight: "2px solid var(--gold)", borderRadius: "0 2px 0 0" }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, width: 32, height: 32, borderBottom: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)", borderRadius: "0 0 0 2px" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 32, height: 32, borderBottom: "2px solid var(--gold)", borderRight: "2px solid var(--gold)", borderRadius: "0 0 2px 0" }} />
          <div style={{ textAlign: "center", color: "#444", userSelect: "none" }}>
            <div style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "1.1rem", color: "#555", marginBottom: "0.4rem" }}>Select a product type</div>
            <div style={{ fontSize: "0.72rem", color: "#333", letterSpacing: "0.08em", textTransform: "uppercase" }}>Preview will appear here</div>
          </div>
        </>
      )}
    </div>
  );
}
