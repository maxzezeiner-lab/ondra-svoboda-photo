"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { getTableLayers, getChairLayers, getChipLayers, type Layer } from "@/lib/layers";

interface ProductPreviewProps {
  category: "table" | "chair" | "chips";
  subLabel?: string;

  // Table
  tableType?: string | null;
  shape?: string;
  pit?: boolean;
  legs?: string;
  feltMode?: "color" | "design";
  feltColorId?: string;
  feltHex?: string;
  feltDesign?: string;
  vinylHex?: string;
  cupHolderCount?: number;
  chipRack?: boolean;
  lightRail?: boolean;
  dealerCutout?: boolean;

  // Chair
  chairType?: string;
  chairHex?: string;
  armrests?: boolean;

  // Chips
  chipMaterial?: string;
  chipColorHex?: string;
}

// Tint layers transition their colour smoothly; the mask src never changes for a given slot.
function TintLayer({ src, color }: { src: string; color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: color,
        transition: "background-color 1.2s ease",
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

// Image layers cross-fade: the old image stays fully visible while the new one fades in on top.
// duration=0 means instant swap (used for legs, base, armrest, etc.).
function ImageLayer({ src, duration }: { src: string; duration: number }) {
  const [prev, setPrev] = useState<string | null>(null);
  const prevSrcRef = useRef(src);

  useLayoutEffect(() => {
    if (prevSrcRef.current === src) return;
    const old = prevSrcRef.current;
    prevSrcRef.current = src;
    if (duration > 0) {
      setPrev(old);
      const t = setTimeout(() => setPrev(null), duration);
      return () => clearTimeout(t);
    }
  }, [src, duration]);

  const base: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" };

  return (
    <>
      {/* Old image stays at full opacity underneath during cross-fade */}
      {prev && (
        <img key={"prev-" + prev} src={prev} alt="" aria-hidden style={base}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      )}
      {/* New image fades in on top; duration=0 → appears instantly */}
      <img
        key={"curr-" + src}
        src={src}
        alt=""
        aria-hidden
        style={{ ...base, animation: duration > 0 ? `layer-fade-in ${duration}ms ease forwards` : "none" }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
    </>
  );
}

function renderLayer(layer: Layer) {
  return layer.kind === "tint"
    ? <TintLayer key={layer.slot} src={layer.src} color={layer.color} />
    : <ImageLayer key={layer.slot} src={layer.src} duration={layer.duration} />;
}

export default function ProductPreview({
  category,
  subLabel,
  tableType,
  shape = "oval",
  pit = false,
  legs = "A",
  feltMode = "color" as "color" | "design",
  feltColorId = "black",
  feltHex = "#0a0a0a",
  feltDesign = "A",
  vinylHex = "#0a0a0a",
  cupHolderCount = 0,
  chipRack = false,
  lightRail = false,
  dealerCutout = false,
  chairType,
  chairHex = "#0a0a0a",
  armrests = false,
  chipMaterial,
  chipColorHex = "#c0392b",
}: ProductPreviewProps) {

  let layers: Layer[] = [];
  if (category === "table" && tableType) {
    layers = getTableLayers(tableType, shape, pit, legs, feltMode, feltColorId, feltHex, feltDesign, vinylHex, chipRack, cupHolderCount, lightRail, dealerCutout);
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
          {layers.map(renderLayer)}
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
