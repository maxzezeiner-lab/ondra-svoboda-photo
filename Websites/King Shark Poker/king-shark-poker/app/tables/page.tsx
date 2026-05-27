"use client";

import { useState } from "react";
import ProductPreview from "@/components/configurator/ProductPreview";
import ColorPicker from "@/components/configurator/ColorPicker";
import PriceSummary from "@/components/configurator/PriceSummary";
import CustomerInfoForm from "@/components/configurator/CustomerInfoForm";
import { TableConfig, CustomerInfo } from "@/types";
import { PRICES } from "@/lib/config";
import { FELT_COLORS, VINYL_STANDARD, VINYL_PREMIUM } from "@/lib/colors";

const DEFAULT_CONFIG: TableConfig = {
  type: null,
  size: "standard",
  shape: "oval",
  pit: false,
  legs: "A",
  feltColorId: "emerald",
  feltCustomHex: "",
  feltOwnDesign: false,
  feltOwnDesignFile: "",
  matDesign: "plain",
  uploadedLogoName: "",
  vinylType: "standard",
  vinylColorId: "black",
  vinylCustomHex: "",
  chipRack: false,
  cupHolderCount: 0,
  cupHolderMaterial: "mosas",
  cupHolderSize: "small",
  dealerMaterial: "nothing",
  feetColor: "black",
  feetCustomHex: "",
  accessories: [],
};

const FEETCOLOR_OPTIONS = [
  { id: "black",  name: "Black",  hex: "#0a0a0a" },
  { id: "gold",   name: "Gold",   hex: "#d4af37" },
  { id: "brass",  name: "Brass",  hex: "#b5a642" },
  { id: "chrome", name: "Chrome", hex: "#d4d4d4" },
];

const TABLE_TYPES = [
  { value: "poker"     as const, label: "Poker Table",     desc: "6–10 players. Oval, bean, or round. Full customisation.", color: "#1a6b3c", base: PRICES.table.base.poker     },
  { value: "blackjack" as const, label: "Blackjack Table", desc: "Professional casino layout. Drop box, bill slot, premium options.", color: "#1a3a8f", base: PRICES.table.base.blackjack },
  { value: "roulette"  as const, label: "Roulette Table",  desc: "Full roulette setup with wheel housing and brass fixtures.", color: "#722f37", base: PRICES.table.base.roulette  },
  { value: "custom"    as const, label: "Custom Table",    desc: "Any shape, size, or concept. Bring us your vision.", color: "#5b2d8e", base: PRICES.table.base.custom    },
];

function calcPrice(cfg: TableConfig): number {
  if (!cfg.type) return 0;
  const P = PRICES.table;
  let t = P.base[cfg.type];
  t += P.size[cfg.size];
  t += P.shape[cfg.shape];
  if (cfg.pit) t += P.pit.yes;
  t += P.legs[cfg.legs];
  t += cfg.feltOwnDesign ? P.felt.ownDesign : cfg.feltColorId === "custom" ? P.felt.customHex : 0;
  t += P.matDesign[cfg.matDesign];
  t += cfg.vinylType === "custom" ? P.vinyl.customHex : cfg.vinylType === "premium" ? P.vinyl.premium : 0;
  if (cfg.chipRack) t += P.chipRack.yes;
  if (cfg.cupHolderCount > 0) {
    t += cfg.cupHolderCount * P.cupHolder.perCup;
    if (cfg.cupHolderMaterial === "brass") t += cfg.cupHolderCount * P.cupHolder.materialBrass;
    if (cfg.cupHolderSize === "big")       t += cfg.cupHolderCount * P.cupHolder.sizeBig;
  }
  t += P.dealerMaterial[cfg.dealerMaterial];
  if (cfg.accessories.includes("lightRail")) t += P.accessories.lightRail;
  if (cfg.accessories.includes("dropBox"))   t += P.accessories.dropBox;
  if (cfg.accessories.includes("billSlot"))  t += P.accessories.billSlot;
  return t;
}

function buildRows(cfg: TableConfig) {
  if (!cfg.type) return [];
  const P = PRICES.table;
  const rows: { label: string; value: number; prefix?: string }[] = [];
  rows.push({ label: `Base — ${cfg.type.charAt(0).toUpperCase() + cfg.type.slice(1)} Table`, value: P.base[cfg.type], prefix: "" });
  if (cfg.size === "large")   rows.push({ label: "Size: Large",   value: P.size.large });
  if (cfg.shape === "bean")   rows.push({ label: "Shape: Bean",   value: P.shape.bean });
  if (cfg.shape === "round")  rows.push({ label: "Shape: Round",  value: P.shape.round });
  if (cfg.pit)                rows.push({ label: "Raised Armrest Pit", value: P.pit.yes });
  if (cfg.legs !== "A")       rows.push({ label: `Leg Set: Variant ${cfg.legs}`, value: P.legs[cfg.legs] });
  if (cfg.feltOwnDesign)      rows.push({ label: "Felt: Own Design", value: P.felt.ownDesign });
  else if (cfg.feltColorId === "custom") rows.push({ label: "Felt: Custom HEX", value: P.felt.customHex });
  const mat = P.matDesign[cfg.matDesign];
  if (mat > 0) rows.push({ label: `Mat Design: ${cfg.matDesign}`, value: mat });
  if (cfg.vinylType === "custom")  rows.push({ label: "Vinyl: Custom HEX", value: P.vinyl.customHex });
  else if (cfg.vinylType === "premium") rows.push({ label: "Vinyl: Premium", value: P.vinyl.premium });
  if (cfg.chipRack) rows.push({ label: "Chip Rack", value: P.chipRack.yes });
  if (cfg.cupHolderCount > 0) {
    let cup = cfg.cupHolderCount * P.cupHolder.perCup;
    if (cfg.cupHolderMaterial === "brass") cup += cfg.cupHolderCount * P.cupHolder.materialBrass;
    if (cfg.cupHolderSize === "big")       cup += cfg.cupHolderCount * P.cupHolder.sizeBig;
    rows.push({ label: `Cup Holders ×${cfg.cupHolderCount} (${cfg.cupHolderMaterial}, ${cfg.cupHolderSize})`, value: cup });
  }
  if (cfg.dealerMaterial === "metal") rows.push({ label: "Dealer Position: Metal", value: P.dealerMaterial.metal });
  if (cfg.accessories.includes("lightRail")) rows.push({ label: "Light Rail", value: P.accessories.lightRail });
  if (cfg.accessories.includes("dropBox"))   rows.push({ label: "Drop Box",   value: P.accessories.dropBox });
  if (cfg.accessories.includes("billSlot"))  rows.push({ label: "Bill Slot",  value: P.accessories.billSlot });
  return rows;
}

// ── Small helpers ──────────────────────────────────────────────────────────
function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #2a2a2a", marginBottom: "0.25rem" }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "none", padding: "0.625rem 0", cursor: "pointer" }}
      >
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.09em", textTransform: "uppercase" }}>{title}</span>
        <span style={{ color: "#C9A84C", fontSize: "0.65rem", display: "inline-block", transition: "transform 0.2s", transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}>▼</span>
      </button>
      {open && <div style={{ paddingBottom: "0.875rem" }}>{children}</div>}
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#777", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.4rem", marginTop: "0.75rem" }}>{children}</div>;
}

function Opt({ label, active, price, onClick }: { label: string; active: boolean; price?: number; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: active ? "1px solid #C9A84C" : "1px solid #2a2a2a", background: active ? "rgba(201,168,76,0.15)" : "#111", color: active ? "#C9A84C" : "#888", cursor: "pointer", fontSize: "0.85rem", fontWeight: active ? 700 : 400, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", textAlign: "left", transition: "all 0.15s" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        {active && <span style={{ fontSize: "0.7rem" }}>✓</span>}
        {label}
      </span>
      {price !== undefined && price > 0 && <span style={{ fontSize: "0.75rem", opacity: 0.75 }}>+{price}€</span>}
    </button>
  );
}

function YesNo({ yesLabel, noLabel, active, yesPrice, onYes, onNo }: { yesLabel?: string; noLabel?: string; active: boolean; yesPrice?: number; onYes: () => void; onNo: () => void }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Opt label={yesLabel ?? "Yes"} active={active}  price={yesPrice} onClick={onYes} />
      <Opt label={noLabel  ?? "No"}  active={!active}                  onClick={onNo}  />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function TablesPage() {
  const [cfg, setCfg] = useState<TableConfig>(DEFAULT_CONFIG);
  const [showForm, setShowForm]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);

  const setType          = (v: TableConfig["type"])           => setCfg(p => ({ ...p, type: v }));
  const setSize          = (v: TableConfig["size"])           => setCfg(p => ({ ...p, size: v }));
  const setShape         = (v: TableConfig["shape"])          => setCfg(p => ({ ...p, shape: v }));
  const setPit           = (v: boolean)                       => setCfg(p => ({ ...p, pit: v }));
  const setLegs          = (v: TableConfig["legs"])           => setCfg(p => ({ ...p, legs: v }));
  const setFeltColor     = (v: string)                        => setCfg(p => ({ ...p, feltColorId: v }));
  const setFeltHex       = (v: string)                        => setCfg(p => ({ ...p, feltCustomHex: v }));
  const setFeltOwnDesign = (v: boolean)                       => setCfg(p => ({ ...p, feltOwnDesign: v }));
  const setFeltOwnFile   = (v: string)                        => setCfg(p => ({ ...p, feltOwnDesignFile: v }));
  const setMatDesign     = (v: TableConfig["matDesign"])      => setCfg(p => ({ ...p, matDesign: v }));
  const setLogoName      = (v: string)                        => setCfg(p => ({ ...p, uploadedLogoName: v }));
  const setVinylType     = (v: TableConfig["vinylType"])      => setCfg(p => ({ ...p, vinylType: v }));
  const setVinylColor    = (v: string)                        => setCfg(p => ({ ...p, vinylColorId: v }));
  const setVinylHex      = (v: string)                        => setCfg(p => ({ ...p, vinylCustomHex: v }));
  const setChipRack      = (v: boolean)                       => setCfg(p => ({ ...p, chipRack: v }));
  const setCupCount      = (v: number)                        => setCfg(p => ({ ...p, cupHolderCount: Math.max(0, v) }));
  const setCupMat        = (v: "mosas" | "brass")             => setCfg(p => ({ ...p, cupHolderMaterial: v }));
  const setCupSize       = (v: "small" | "big")               => setCfg(p => ({ ...p, cupHolderSize: v }));
  const setDealerMat     = (v: TableConfig["dealerMaterial"]) => setCfg(p => ({ ...p, dealerMaterial: v }));
  const setFeetColor     = (v: TableConfig["feetColor"])      => setCfg(p => ({ ...p, feetColor: v }));
  const setFeetHex       = (v: string)                        => setCfg(p => ({ ...p, feetCustomHex: v }));
  const toggleAcc = (id: string) => setCfg(p => ({ ...p, accessories: p.accessories.includes(id) ? p.accessories.filter(a => a !== id) : [...p.accessories, id] }));

  const total = calcPrice(cfg);

  async function handleSubmit(customer: CustomerInfo) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ configurationType: "Table", customer, configuration: cfg, estimatedTotal: total }),
      });
      if (res.ok) { setSuccess(true); setShowForm(false); }
    } finally { setSubmitting(false); }
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (success) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <div style={{ maxWidth: "520px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
          <h2 style={{ fontFamily: "var(--font-playfair,Georgia,serif)", fontSize: "2rem", color: "#C9A84C", marginBottom: "1rem" }}>Configuration Submitted!</h2>
          <p style={{ color: "#888", lineHeight: 1.7, marginBottom: "2rem" }}>Thank you. We have received your table configuration and will contact you within 1–2 business days.</p>
          <button className="btn-gold" onClick={() => { setSuccess(false); setCfg(DEFAULT_CONFIG); }}>Configure Another Table</button>
        </div>
      </div>
    );
  }

  // ── Step 0: Choose table type ────────────────────────────────────────────
  if (!cfg.type) {
    return (
      <section style={{ minHeight: "90vh", padding: "4rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.35)", borderRadius: "999px", padding: "0.3rem 1rem", marginBottom: "1.25rem" }}>
            Configurator
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair,Georgia,serif)", fontSize: "clamp(2rem,5vw,3.25rem)", fontWeight: 700, background: "linear-gradient(135deg,#C9A84C,#D4AF37,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem" }}>
            What Would You Like to Build?
          </h1>
          <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg,#9A7B2E,#D4AF37,#9A7B2E)", margin: "0 auto 1.25rem", borderRadius: "2px" }} />
          <p style={{ color: "#888", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Select the type of table you want to configure. You will customise every detail on the next step.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {TABLE_TYPES.map(t => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "16px", padding: "2.25rem 1.75rem", cursor: "pointer", textAlign: "left", transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(201,168,76,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.transform = "none";               e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", background: `radial-gradient(circle,${t.color}22 0%,transparent 70%)`, pointerEvents: "none" }} />
              <h3 style={{ fontFamily: "var(--font-playfair,Georgia,serif)", fontSize: "1.15rem", fontWeight: 700, color: "#f0ece0", marginBottom: "0.625rem" }}>{t.label}</h3>
              <p style={{ fontSize: "0.85rem", color: "#777", lineHeight: 1.65, marginBottom: "1.25rem" }}>{t.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.78rem", color: "#555" }}>From</span>
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#C9A84C" }}>{t.base.toLocaleString()}€</span>
              </div>
              <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#C9A84C", fontWeight: 600 }}>Configure →</div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  // ── Step 1: Full configurator ────────────────────────────────────────────
  const feltName = FELT_COLORS.find(c => c.id === cfg.feltColorId)?.name ?? cfg.feltColorId;
  const subLabel = `${cfg.size} · ${cfg.shape} · ${cfg.feltOwnDesign ? "own design" : feltName} felt`;

  const feltHex = cfg.feltOwnDesign
    ? "#1a6b3c"
    : cfg.feltColorId === "custom"
      ? cfg.feltCustomHex || "#1a6b3c"
      : FELT_COLORS.find(c => c.id === cfg.feltColorId)?.hex ?? "#1a6b3c";

  const vinylHex = cfg.vinylType === "custom"
    ? cfg.vinylCustomHex || "#0a0a0a"
    : (cfg.vinylType === "premium" ? VINYL_PREMIUM : VINYL_STANDARD)
        .find(c => c.id === cfg.vinylColorId)?.hex ?? "#0a0a0a";

  return (
    <>
      {/* Page header */}
      <div style={{ textAlign: "center", padding: "2.5rem 1.5rem 1.5rem" }}>
        <div style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.35)", borderRadius: "999px", padding: "0.3rem 1rem", marginBottom: "1rem" }}>
          Configurator — {cfg.type.charAt(0).toUpperCase() + cfg.type.slice(1)} Table
        </div>
        <h1 style={{ fontFamily: "var(--font-playfair,Georgia,serif)", fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 700, background: "linear-gradient(135deg,#C9A84C,#D4AF37,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "0.5rem" }}>
          Table Configurator
        </h1>
        <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg,#9A7B2E,#D4AF37,#9A7B2E)", margin: "0 auto 0.75rem", borderRadius: "2px" }} />
        <p style={{ color: "#888", fontSize: "0.95rem" }}>Customise every detail and watch your price update in real time.</p>
      </div>

      {/* 3-column grid */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.5rem 1.5rem 4rem", display: "grid", gridTemplateColumns: "300px 1fr 280px", gap: "1.5rem", alignItems: "start" }} className="configurator-grid">

        {/* LEFT — Controls */}
        <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "12px", padding: "1.5rem", position: "sticky", top: "88px", maxHeight: "calc(100vh - 108px)", overflowY: "auto" }}>

          {/* Back button */}
          <button type="button" onClick={() => setType(null)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "0.82rem", marginBottom: "0.875rem", padding: 0 }}>
            ← Change table type
          </button>
          <div style={{ height: "1px", background: "#2a2a2a", marginBottom: "0.5rem" }} />

          <Section title="Size">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <Opt label="Small"    active={cfg.size === "small"}    onClick={() => setSize("small")}    />
              <Opt label="Standard" active={cfg.size === "standard"} onClick={() => setSize("standard")} />
              <Opt label="Large"    active={cfg.size === "large"}    price={PRICES.table.size.large} onClick={() => setSize("large")} />
            </div>
          </Section>

          <Section title="Shape">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <Opt label="Oval"  active={cfg.shape === "oval"}  onClick={() => setShape("oval")}  />
              <Opt label="Bean"  active={cfg.shape === "bean"}  price={PRICES.table.shape.bean}  onClick={() => setShape("bean")}  />
              <Opt label="Round" active={cfg.shape === "round"} price={PRICES.table.shape.round} onClick={() => setShape("round")} />
            </div>
          </Section>

          <Section title="Raised Armrest Pit">
            <YesNo active={cfg.pit} yesPrice={PRICES.table.pit.yes} onYes={() => setPit(true)} onNo={() => setPit(false)} />
          </Section>

          <Section title="Leg Set">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {(["A","B","C","D","E"] as TableConfig["legs"][]).map(l => (
                <Opt key={l} label={`Variant ${l}`} active={cfg.legs === l} price={PRICES.table.legs[l] > 0 ? PRICES.table.legs[l] : undefined} onClick={() => setLegs(l)} />
              ))}
            </div>
          </Section>

          <Section title="Felt & Mat">
            {!cfg.feltOwnDesign && (
              <ColorPicker label="" colors={FELT_COLORS} selected={cfg.feltColorId} onChange={setFeltColor} showCustomHex customHex={cfg.feltCustomHex} onCustomHexChange={setFeltHex} />
            )}
            <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.85rem", color: "#aaa", cursor: "pointer", marginBottom: "0.625rem" }}>
              <input type="checkbox" checked={cfg.feltOwnDesign} onChange={e => setFeltOwnDesign(e.target.checked)} style={{ accentColor: "#C9A84C", width: "16px", height: "16px" }} />
              Own Design Upload (+{PRICES.table.felt.ownDesign}€)
            </label>
            {cfg.feltOwnDesign && (
              <div style={{ marginBottom: "0.625rem" }}>
                <input type="file" accept="image/*,.pdf,.ai,.eps" onChange={e => setFeltOwnFile(e.target.files?.[0]?.name ?? "")} style={{ fontSize: "0.82rem", color: "#888", background: "#111", border: "1px solid #2a2a2a", borderRadius: "6px", padding: "0.5rem", width: "100%" }} />
                {cfg.feltOwnDesignFile && <p style={{ fontSize: "0.75rem", color: "#C9A84C", marginTop: "0.375rem" }}>Selected: {cfg.feltOwnDesignFile}</p>}
              </div>
            )}
            <SubLabel>Inside Mat Design</SubLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <Opt label="Plain"                 active={cfg.matDesign === "plain"}         onClick={() => setMatDesign("plain")} />
              <Opt label="Simple Line Design"    active={cfg.matDesign === "simpleLine"}    price={PRICES.table.matDesign.simpleLine}    onClick={() => setMatDesign("simpleLine")} />
              <Opt label="Premium Border Design" active={cfg.matDesign === "premiumBorder"} price={PRICES.table.matDesign.premiumBorder} onClick={() => setMatDesign("premiumBorder")} />
              <Opt label="Custom Logo / Design"  active={cfg.matDesign === "custom"}        price={PRICES.table.matDesign.custom}        onClick={() => setMatDesign("custom")} />
            </div>
            {cfg.matDesign === "custom" && (
              <div style={{ marginTop: "0.625rem" }}>
                <input type="file" accept="image/*,.pdf,.ai,.eps,.svg" onChange={e => setLogoName(e.target.files?.[0]?.name ?? "")} style={{ fontSize: "0.82rem", color: "#888", background: "#111", border: "1px solid #2a2a2a", borderRadius: "6px", padding: "0.5rem", width: "100%" }} />
                {cfg.uploadedLogoName && <p style={{ fontSize: "0.75rem", color: "#C9A84C", marginTop: "0.375rem" }}>Selected: {cfg.uploadedLogoName}</p>}
              </div>
            )}
          </Section>

          <Section title="Vinyl / Outside">
            <SubLabel>Vinyl Type</SubLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "0.625rem" }}>
              <Opt label="Standard"   active={cfg.vinylType === "standard"} onClick={() => setVinylType("standard")} />
              <Opt label="Premium"    active={cfg.vinylType === "premium"}  price={PRICES.table.vinyl.premium}    onClick={() => setVinylType("premium")} />
              <Opt label="Custom HEX" active={cfg.vinylType === "custom"}   price={PRICES.table.vinyl.customHex}  onClick={() => setVinylType("custom")} />
            </div>
            {cfg.vinylType === "standard" && <ColorPicker label="" colors={VINYL_STANDARD} selected={cfg.vinylColorId} onChange={setVinylColor} />}
            {cfg.vinylType === "premium"  && <ColorPicker label="" colors={VINYL_PREMIUM}  selected={cfg.vinylColorId} onChange={setVinylColor} />}
            {cfg.vinylType === "custom"   && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input type="color" value={cfg.vinylCustomHex || "#C9A84C"} onChange={e => setVinylHex(e.target.value)} style={{ width: "40px", height: "32px", borderRadius: "4px", border: "1px solid #2a2a2a", cursor: "pointer", background: "none", padding: "2px" }} />
                <input type="text" className="input-dark" placeholder="#C9A84C" value={cfg.vinylCustomHex} onChange={e => setVinylHex(e.target.value)} style={{ maxWidth: "140px" }} />
              </div>
            )}
          </Section>

          <Section title="Accessories">
            <SubLabel>Chip Rack</SubLabel>
            <div style={{ marginBottom: "0.625rem" }}>
              <YesNo active={cfg.chipRack} yesPrice={PRICES.table.chipRack.yes} onYes={() => setChipRack(true)} onNo={() => setChipRack(false)} />
            </div>

            <SubLabel>Cup Holders</SubLabel>
            <div style={{ marginBottom: "0.625rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.82rem", color: "#aaa" }}>Count:</span>
                <input type="number" min={0} max={12} value={cfg.cupHolderCount} onChange={e => setCupCount(parseInt(e.target.value) || 0)} className="input-dark" style={{ width: "70px" }} />
              </div>
              {cfg.cupHolderCount > 0 && (
                <>
                  <SubLabel>Cup Material</SubLabel>
                  <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.5rem" }}>
                    <Opt label="Mosas" active={cfg.cupHolderMaterial === "mosas"} onClick={() => setCupMat("mosas")} />
                    <Opt label="Brass" active={cfg.cupHolderMaterial === "brass"} price={PRICES.table.cupHolder.materialBrass} onClick={() => setCupMat("brass")} />
                  </div>
                  <SubLabel>Cup Size</SubLabel>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <Opt label="Small" active={cfg.cupHolderSize === "small"} onClick={() => setCupSize("small")} />
                    <Opt label="Big"   active={cfg.cupHolderSize === "big"}   price={PRICES.table.cupHolder.sizeBig} onClick={() => setCupSize("big")} />
                  </div>
                </>
              )}
            </div>

            <SubLabel>Dealer Position Material</SubLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "0.625rem" }}>
              <Opt label="None"                     active={cfg.dealerMaterial === "nothing"}   onClick={() => setDealerMat("nothing")} />
              <Opt label="Cushioned (matches table)" active={cfg.dealerMaterial === "cushioned"} onClick={() => setDealerMat("cushioned")} />
              <Opt label="Metal"                    active={cfg.dealerMaterial === "metal"}     price={PRICES.table.dealerMaterial.metal} onClick={() => setDealerMat("metal")} />
            </div>

            <SubLabel>Feet / Leg Colour</SubLabel>
            <ColorPicker label="" colors={FEETCOLOR_OPTIONS} selected={cfg.feetColor} onChange={v => setFeetColor(v as TableConfig["feetColor"])} showCustomHex customHex={cfg.feetCustomHex} onCustomHexChange={setFeetHex} customHexLabel="Custom colour" />

            <SubLabel>Extra Accessories</SubLabel>
            {[
              { id: "lightRail", label: "Light Rail", price: PRICES.table.accessories.lightRail },
              { id: "dropBox",   label: "Drop Box",   price: PRICES.table.accessories.dropBox },
              { id: "billSlot",  label: "Bill Slot",  price: PRICES.table.accessories.billSlot },
            ].map(acc => (
              <label key={acc.id} style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.85rem", color: "#aaa", cursor: "pointer", marginBottom: "0.5rem" }}>
                <input type="checkbox" checked={cfg.accessories.includes(acc.id)} onChange={() => toggleAcc(acc.id)} style={{ accentColor: "#C9A84C", width: "16px", height: "16px" }} />
                {acc.label} (+{acc.price}€)
              </label>
            ))}
          </Section>
        </div>

        {/* MIDDLE — Preview */}
        <div>
          <ProductPreview
            category="table"
            tableType={cfg.type}
            shape={cfg.shape}
            pit={cfg.pit}
            legs={cfg.legs}
            feltHex={feltHex}
            vinylHex={vinylHex}
            cupHolderCount={cfg.cupHolderCount}
            chipRack={cfg.chipRack}
            lightRail={cfg.accessories.includes("lightRail")}
            matDesign={cfg.matDesign}
            subLabel={subLabel}
          />
          <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#555", marginTop: "1rem" }}>
            Preview updates as you configure. Real product photos will replace this when added.
          </p>
        </div>

        {/* RIGHT — Summary */}
        <PriceSummary
          title="Your Configuration"
          rows={buildRows(cfg)}
          total={total}
          onSubmit={() => setShowForm(true)}
        />
      </div>

      {showForm && (
        <CustomerInfoForm onClose={() => setShowForm(false)} onSubmit={handleSubmit} isSubmitting={submitting} />
      )}
    </>
  );
}
