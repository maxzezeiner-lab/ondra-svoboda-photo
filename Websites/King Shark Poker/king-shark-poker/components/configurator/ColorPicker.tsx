"use client";

import { useState } from "react";

interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

interface ColorPickerProps {
  label: string;
  colors: ColorOption[];
  selected: string;
  onChange: (id: string) => void;
  showCustomHex?: boolean;
  customHex?: string;
  onCustomHexChange?: (hex: string) => void;
  customHexLabel?: string;
}

export default function ColorPicker({
  label,
  colors,
  selected,
  onChange,
  showCustomHex = false,
  customHex = "",
  onCustomHexChange,
  customHexLabel = "Custom HEX",
}: ColorPickerProps) {
  const [showHexInput, setShowHexInput] = useState(selected === "custom");

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      {label && <label style={{ display: "block", fontSize: "0.8rem", color: "var(--gold)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{label}</label>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {colors.map((c) => (
          <button
            key={c.id}
            title={c.name}
            onClick={() => { onChange(c.id); setShowHexInput(false); }}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "4px",
              background: c.hex,
              border: selected === c.id ? "2px solid var(--gold)" : "2px solid var(--border)",
              cursor: "pointer",
              transition: "border-color 0.15s, transform 0.15s",
              transform: selected === c.id ? "scale(1.15)" : "scale(1)",
              boxShadow: selected === c.id ? "0 0 8px rgba(201,168,76,0.5)" : "none",
            }}
            aria-label={c.name}
            aria-pressed={selected === c.id}
          />
        ))}
        {showCustomHex && (
          <button
            title={customHexLabel}
            onClick={() => { onChange("custom"); setShowHexInput(true); }}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "4px",
              background: "linear-gradient(135deg, #ff0000, #00ff00, #0000ff)",
              border: selected === "custom" ? "2px solid var(--gold)" : "2px solid var(--border)",
              cursor: "pointer",
              fontSize: "0.6rem",
              color: "#fff",
              fontWeight: 700,
              transform: selected === "custom" ? "scale(1.15)" : "scale(1)",
            }}
            aria-label={customHexLabel}
            aria-pressed={selected === "custom"}
          >
            HEX
          </button>
        )}
      </div>

      {/* Color name display */}
      {selected && selected !== "custom" && (
        <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.4rem" }}>
          {colors.find((c) => c.id === selected)?.name ?? selected}
        </p>
      )}

      {/* Custom HEX input */}
      {showCustomHex && showHexInput && (
        <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="color"
            value={customHex || "#C9A84C"}
            onChange={(e) => onCustomHexChange?.(e.target.value)}
            style={{ width: "40px", height: "32px", borderRadius: "4px", border: "1px solid var(--border)", cursor: "pointer", background: "none", padding: "2px" }}
          />
          <input
            type="text"
            placeholder="#C9A84C"
            value={customHex}
            onChange={(e) => onCustomHexChange?.(e.target.value)}
            className="input-dark"
            style={{ maxWidth: "130px" }}
          />
        </div>
      )}
    </div>
  );
}
