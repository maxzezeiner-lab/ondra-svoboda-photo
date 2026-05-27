"use client";

import { useState } from "react";
import ProductPreview from "@/components/configurator/ProductPreview";
import ColorPicker from "@/components/configurator/ColorPicker";
import PriceSummary from "@/components/configurator/PriceSummary";
import CustomerInfoForm from "@/components/configurator/CustomerInfoForm";
import { ChairConfig, CustomerInfo } from "@/types";
import { PRICES } from "@/lib/config";
import { CHAIR_COLORS } from "@/lib/colors";

const DEFAULT: ChairConfig = {
  type: "highStool",
  armrests: false,
  colorId: "black",
  colorCustomHex: "",
  amount: 1,
  notes: "",
};

function calcPrice(cfg: ChairConfig): number {
  const P = PRICES.chair;
  let total = P.base[cfg.type] * cfg.amount;
  if (cfg.armrests) total += P.armrests.yes * cfg.amount;
  return total;
}

function buildRows(cfg: ChairConfig) {
  const P = PRICES.chair;
  return [
    { label: `${cfg.type === "highStool" ? "High Stool" : "Low Office Chair"} × ${cfg.amount}`, value: P.base[cfg.type] * cfg.amount, prefix: "" as string },
    ...(cfg.armrests ? [{ label: `Armrests × ${cfg.amount}`, value: P.armrests.yes * cfg.amount }] : []),
  ];
}

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

function Opt({ label, active, price, onClick }: { label: string; active: boolean; price?: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ padding: "0.55rem 0.75rem", borderRadius: "6px", border: active ? "1px solid #C9A84C" : "1px solid #2a2a2a", background: active ? "rgba(201,168,76,0.15)" : "#111", color: active ? "#C9A84C" : "#888", cursor: "pointer", fontSize: "0.85rem", fontWeight: active ? 700 : 400, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", width: "100%", textAlign: "left", transition: "border-color 0.15s, background 0.15s, color 0.15s" }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        {active && <span style={{ fontSize: "0.7rem" }}>✓</span>}
        {label}
      </span>
      {price !== undefined && price > 0 && <span style={{ fontSize: "0.75rem", opacity: 0.75 }}>+{price}€</span>}
    </button>
  );
}

export default function ChairsPage() {
  const [cfg, setCfg] = useState<ChairConfig>(DEFAULT);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const setType     = (v: ChairConfig["type"]) => setCfg(p => ({ ...p, type: v }));
  const setArmrests = (v: boolean)             => setCfg(p => ({ ...p, armrests: v }));
  const setColorId  = (v: string)              => setCfg(p => ({ ...p, colorId: v }));
  const setColorHex = (v: string)              => setCfg(p => ({ ...p, colorCustomHex: v }));
  const setAmount   = (v: number)              => setCfg(p => ({ ...p, amount: Math.max(1, v) }));
  const setNotes    = (v: string)              => setCfg(p => ({ ...p, notes: v }));

  const total = calcPrice(cfg);

  async function handleSubmit(customer: CustomerInfo) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ configurationType: "Chair", customer, configuration: cfg, estimatedTotal: total }),
      });
      if (res.ok) { setSuccess(true); setShowForm(false); }
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <div style={{ maxWidth: "520px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
          <h2 style={{ fontFamily: "var(--font-playfair,Georgia,serif)", fontSize: "2rem", color: "#C9A84C", marginBottom: "1rem" }}>Configuration Submitted!</h2>
          <p style={{ color: "#888", lineHeight: 1.7, marginBottom: "2rem" }}>Thank you! We will review your chair configuration and contact you within 1–2 business days.</p>
          <button className="btn-gold" onClick={() => { setSuccess(false); setCfg(DEFAULT); }}>Configure Again</button>
        </div>
      </div>
    );
  }

  const colorName = CHAIR_COLORS.find(c => c.id === cfg.colorId)?.name ?? cfg.colorId;
  const chairHex = cfg.colorId === "custom"
    ? cfg.colorCustomHex || "#0a0a0a"
    : CHAIR_COLORS.find(c => c.id === cfg.colorId)?.hex ?? "#0a0a0a";

  return (
    <>
      {/* ── Page header ── */}
      <div style={{ textAlign: "center", padding: "2.5rem 1.5rem 1.5rem" }}>
        <div style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.35)", borderRadius: "999px", padding: "0.3rem 1rem", marginBottom: "1rem" }}>
          Configurator
        </div>
        <h1 style={{ fontFamily: "var(--font-playfair,Georgia,serif)", fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 700, background: "linear-gradient(135deg,#C9A84C,#D4AF37,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "0.5rem" }}>
          Chair Configurator
        </h1>
        <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg,#9A7B2E,#D4AF37,#9A7B2E)", margin: "0 auto 0.75rem", borderRadius: "2px" }} />
        <p style={{ color: "#888", maxWidth: "480px", margin: "0 auto", fontSize: "0.95rem" }}>
          Choose your chair type, upholstery colour, and quantity.
        </p>
      </div>

      {/* ── 3-column grid ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.5rem 1.5rem 4rem", display: "grid", gridTemplateColumns: "300px 1fr 280px", gap: "1.5rem", alignItems: "start" }} className="configurator-grid">

        {/* LEFT — Controls */}
        <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "12px", padding: "1.5rem", position: "sticky", top: "88px", maxHeight: "calc(100vh - 108px)", overflowY: "auto" }}>
          <div style={{ fontFamily: "var(--font-playfair,Georgia,serif)", fontSize: "1rem", color: "#C9A84C", marginBottom: "1rem", paddingBottom: "0.625rem", borderBottom: "1px solid #2a2a2a" }}>
            Chair Options
          </div>

          <Section title="Chair Type">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Opt label="High Stool"       active={cfg.type === "highStool"}      price={PRICES.chair.base.highStool}      onClick={() => setType("highStool")} />
              <Opt label="Low Office Chair" active={cfg.type === "lowOfficeChair"} price={PRICES.chair.base.lowOfficeChair} onClick={() => setType("lowOfficeChair")} />
            </div>
          </Section>

          <Section title="Armrests">
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Opt label="Yes" active={cfg.armrests}  price={PRICES.chair.armrests.yes} onClick={() => setArmrests(true)}  />
              <Opt label="No"  active={!cfg.armrests}                                   onClick={() => setArmrests(false)} />
            </div>
          </Section>

          <Section title="Chair Colour">
            <ColorPicker label="" colors={CHAIR_COLORS} selected={cfg.colorId} onChange={setColorId} showCustomHex customHex={cfg.colorCustomHex} onCustomHexChange={setColorHex} />
          </Section>

          <Section title="Amount">
            <input type="number" min={1} max={100} value={cfg.amount} onChange={e => setAmount(parseInt(e.target.value) || 1)} className="input-dark" style={{ maxWidth: "100px" }} />
          </Section>

          <Section title="Notes / Custom Request">
            <textarea className="input-dark" value={cfg.notes} onChange={e => setNotes(e.target.value)} placeholder="Special requirements, custom dimensions, or notes..." style={{ minHeight: "90px", resize: "vertical" }} />
          </Section>
        </div>

        {/* MIDDLE — Preview */}
        <div>
          <ProductPreview
            category="chair"
            chairType={cfg.type}
            chairHex={chairHex}
            armrests={cfg.armrests}
            subLabel={`${cfg.amount} × ${colorName}${cfg.armrests ? " · With Armrests" : ""}`}
          />
          <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#555", marginTop: "1rem" }}>
            Preview updates as you configure. Photos will be added for each variant.
          </p>
        </div>

        {/* RIGHT — Summary */}
        <PriceSummary title="Your Selection" rows={buildRows(cfg)} total={total} onSubmit={() => setShowForm(true)} />
      </div>

      {showForm && (
        <CustomerInfoForm onClose={() => setShowForm(false)} onSubmit={handleSubmit} isSubmitting={submitting} />
      )}
    </>
  );
}
