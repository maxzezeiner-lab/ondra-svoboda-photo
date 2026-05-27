"use client";

interface PriceRow {
  label: string;
  value: number;
  prefix?: string;
}

interface PriceSummaryProps {
  title: string;
  rows: PriceRow[];
  total: number;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function PriceSummary({ title, rows, total, onSubmit, disabled }: PriceSummaryProps) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "1.5rem",
        position: "sticky",
        top: "88px",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "var(--gold)",
          marginBottom: "1.25rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {title}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {rows.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#888", flex: 1 }}>{row.label}</span>
            <span style={{ fontSize: "0.85rem", color: row.value > 0 ? "#c0b090" : "#666", fontWeight: 500, whiteSpace: "nowrap" }}>
              {row.prefix ?? (row.value > 0 ? "+" : "")}{row.value}€
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border)", marginBottom: "1rem" }} />

      {/* Total */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "0.9rem", color: "#aaa", fontWeight: 600 }}>Estimated Total</span>
        <span
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #C9A84C, #D4AF37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {total.toFixed(0)}€
        </span>
      </div>

      <p style={{ fontSize: "0.75rem", color: "#555", marginBottom: "1.25rem", lineHeight: 1.5 }}>
        * Estimated price. Final quote provided after review by our team.
      </p>

      <button
        onClick={onSubmit}
        disabled={disabled}
        className="btn-gold"
        style={{ width: "100%", opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
      >
        Submit Configuration
      </button>
    </div>
  );
}
