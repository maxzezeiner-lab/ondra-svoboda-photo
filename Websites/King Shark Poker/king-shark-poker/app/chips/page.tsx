"use client";

import { useState } from "react";
import ProductPreview from "@/components/configurator/ProductPreview";
import ColorPicker from "@/components/configurator/ColorPicker";
import PriceSummary from "@/components/configurator/PriceSummary";
import CustomerInfoForm from "@/components/configurator/CustomerInfoForm";
import { ChipsConfig, CustomerInfo } from "@/types";
import { PRICES } from "@/lib/config";
import { CHIP_COLORS } from "@/lib/colors";

const MATERIAL_INFO: Record<string, { label: string; desc: string }> = {
  A: { label: "Material A", desc: "Standard Clay Composite" },
  B: { label: "Material B", desc: "Premium Clay Composite" },
  C: { label: "Material C", desc: "Ceramic — Casino Grade" },
};

const DEFAULT: ChipsConfig = {
  material: "A",
  designColorId: "red",
  designOwnUpload: false,
  designFileName: "",
  amount: 100,
  notes: "",
};

function calcPrice(cfg: ChipsConfig): number {
  return Math.round(PRICES.chips.base[cfg.material] * cfg.amount * 100) / 100;
}

function buildRows(cfg: ChipsConfig) {
  const price = PRICES.chips.base[cfg.material];
  return [{ label: `${MATERIAL_INFO[cfg.material].desc} × ${cfg.amount} @ ${price}€/chip`, value: calcPrice(cfg), prefix: "" as string }];
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

function Opt({ label, sub, active, price, onClick }: { label: string; sub?: string; active: boolean; price?: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ padding: "0.625rem 0.875rem", borderRadius: "6px", border: active ? "1px solid #C9A84C" : "1px solid #2a2a2a", background: active ? "rgba(201,168,76,0.15)" : "#111", color: active ? "#C9A84C" : "#888", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.15s" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: active ? 700 : 400, display: "flex", alignItems: "center", gap: "0.4rem" }}>
          {active && <span style={{ fontSize: "0.7rem" }}>✓</span>}
          {label}
        </span>
        {price !== undefined && <span style={{ fontSize: "0.78rem", color: active ? "#C9A84C" : "#666" }}>{price}€/chip</span>}
      </div>
      {sub && <div style={{ fontSize: "0.75rem", color: active ? "rgba(201,168,76,0.7)" : "#555", marginTop: "0.2rem" }}>{sub}</div>}
    </button>
  );
}

export default function ChipsPage() {
  const [cfg, setCfg] = useState<ChipsConfig>(DEFAULT);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const setMaterial    = (v: ChipsConfig["material"]) => setCfg(p => ({ ...p, material: v }));
  const setDesignColor = (v: string)                  => setCfg(p => ({ ...p, designColorId: v }));
  const setOwnUpload   = (v: boolean)                 => setCfg(p => ({ ...p, designOwnUpload: v }));
  const setDesignFile  = (v: string)                  => setCfg(p => ({ ...p, designFileName: v }));
  const setAmount      = (v: number)                  => setCfg(p => ({ ...p, amount: Math.max(50, v) }));
  const setNotes       = (v: string)                  => setCfg(p => ({ ...p, notes: v }));

  const total = calcPrice(cfg);
  const chipColorHex = CHIP_COLORS.find(c => c.id === cfg.designColorId)?.hex ?? "#c0392b";

  async function handleSubmit(customer: CustomerInfo) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ configurationType: "Chips", customer, configuration: cfg, estimatedTotal: total }),
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
          <p style={{ color: "#888", lineHeight: 1.7, marginBottom: "2rem" }}>Thank you! We will review your chip order and contact you shortly.</p>
          <button className="btn-gold" onClick={() => { setSuccess(false); setCfg(DEFAULT); }}>Configure Again</button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Page header ── */}
      <div style={{ textAlign: "center", padding: "2.5rem 1.5rem 1.5rem" }}>
        <div style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.35)", borderRadius: "999px", padding: "0.3rem 1rem", marginBottom: "1rem" }}>
          Configurator
        </div>
        <h1 style={{ fontFamily: "var(--font-playfair,Georgia,serif)", fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 700, background: "linear-gradient(135deg,#C9A84C,#D4AF37,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "0.5rem" }}>
          Chips Configurator
        </h1>
        <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg,#9A7B2E,#D4AF37,#9A7B2E)", margin: "0 auto 0.75rem", borderRadius: "2px" }} />
        <p style={{ color: "#888", maxWidth: "480px", margin: "0 auto", fontSize: "0.95rem" }}>
          Choose material, design colour, and quantity for your custom casino chips.
        </p>
      </div>

      {/* ── 3-column grid ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.5rem 1.5rem 4rem", display: "grid", gridTemplateColumns: "300px 1fr 280px", gap: "1.5rem", alignItems: "start" }} className="configurator-grid">

        {/* LEFT — Controls */}
        <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "12px", padding: "1.5rem", position: "sticky", top: "88px", maxHeight: "calc(100vh - 108px)", overflowY: "auto" }}>
          <div style={{ fontFamily: "var(--font-playfair,Georgia,serif)", fontSize: "1rem", color: "#C9A84C", marginBottom: "1rem", paddingBottom: "0.625rem", borderBottom: "1px solid #2a2a2a" }}>
            Chip / Token Options
          </div>

          <Section title="Material">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {(["A", "B", "C"] as ChipsConfig["material"][]).map(m => (
                <Opt key={m} label={MATERIAL_INFO[m].label} sub={MATERIAL_INFO[m].desc} active={cfg.material === m} price={PRICES.chips.base[m]} onClick={() => setMaterial(m)} />
              ))}
            </div>
          </Section>

          <Section title="Chip Design">
            {!cfg.designOwnUpload && (
              <div style={{ marginBottom: "0.75rem" }}>
                <ColorPicker label="" colors={CHIP_COLORS} selected={cfg.designColorId} onChange={setDesignColor} />
              </div>
            )}
            <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.85rem", color: "#aaa", cursor: "pointer" }}>
              <input type="checkbox" checked={cfg.designOwnUpload} onChange={e => setOwnUpload(e.target.checked)} style={{ accentColor: "#C9A84C", width: "16px", height: "16px" }} />
              Upload own design
            </label>
            {cfg.designOwnUpload && (
              <div style={{ marginTop: "0.625rem" }}>
                <input type="file" accept="image/*,.pdf,.ai,.eps,.svg" onChange={e => setDesignFile(e.target.files?.[0]?.name ?? "")} style={{ fontSize: "0.82rem", color: "#888", background: "#111", border: "1px solid #2a2a2a", borderRadius: "6px", padding: "0.5rem", width: "100%" }} />
                {cfg.designFileName && <p style={{ fontSize: "0.75rem", color: "#C9A84C", marginTop: "0.375rem" }}>Selected: {cfg.designFileName}</p>}
                <p style={{ fontSize: "0.72rem", color: "#555", marginTop: "0.375rem" }}>Design confirmed by our team after submission.</p>
              </div>
            )}
          </Section>

          <Section title="Number of Chips">
            <input type="number" min={50} step={10} value={cfg.amount} onChange={e => setAmount(parseInt(e.target.value) || 50)} className="input-dark" style={{ maxWidth: "120px" }} />
            <p style={{ fontSize: "0.75rem", color: "#555", marginTop: "0.375rem" }}>Minimum order: 50 chips.</p>
          </Section>

          <Section title="Notes / Custom Request">
            <textarea className="input-dark" value={cfg.notes} onChange={e => setNotes(e.target.value)} placeholder="Denominations, colours per denomination, special packaging..." style={{ minHeight: "90px", resize: "vertical" }} />
          </Section>
        </div>

        {/* MIDDLE — Preview */}
        <div>
          <ProductPreview
            category="chips"
            chipMaterial={cfg.material}
            chipColorHex={chipColorHex}
            subLabel={`${cfg.amount} × ${MATERIAL_INFO[cfg.material].desc}`}
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
