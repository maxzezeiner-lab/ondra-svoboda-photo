"use client";

interface Option {
  value: string;
  label: string;
  price?: number;
}

interface OptionGroupProps {
  label: string;
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
  layout?: "grid" | "list";
}

export default function OptionGroup({ label, options, selected, onChange, layout = "grid" }: OptionGroupProps) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", fontSize: "0.8rem", color: "var(--gold)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.625rem" }}>
        {label}
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: layout === "grid" ? "repeat(auto-fill, minmax(100px, 1fr))" : "1fr",
          gap: "0.5rem",
        }}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              border: selected === opt.value ? "1px solid var(--gold)" : "1px solid var(--border)",
              background: selected === opt.value ? "rgba(201,168,76,0.12)" : "var(--shark-surface, #111)",
              color: selected === opt.value ? "var(--gold)" : "#999",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: selected === opt.value ? 600 : 400,
              transition: "all 0.15s ease",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            aria-pressed={selected === opt.value}
          >
            <span>{opt.label}</span>
            {opt.price !== undefined && opt.price > 0 && (
              <span style={{ fontSize: "0.75rem", color: selected === opt.value ? "var(--gold)" : "#666" }}>
                +{opt.price}€
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
