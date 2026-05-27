"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { GALLERY_ITEMS } from "@/lib/gallery-data";
import { GalleryItem } from "@/types";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "poker", label: "Poker Tables" },
  { id: "blackjack", label: "Blackjack Tables" },
  { id: "roulette", label: "Roulette Tables" },
  { id: "custom", label: "Custom Tables" },
  { id: "chairs", label: "Chairs" },
  { id: "chips", label: "Chips" },
];

const CAT_COLORS: Record<string, string> = {
  poker: "#1a6b3c",
  blackjack: "#1a3a8f",
  roulette: "#722f37",
  custom: "#5b2d8e",
  chairs: "#36454f",
  chips: "#9A7B2E",
};

const CAT_ICONS: Record<string, string> = {
  poker: "♠",
  blackjack: "♥",
  roulette: "⚙",
  custom: "★",
  chairs: "⬡",
  chips: "●",
};

function GalleryCard({ item }: { item: GalleryItem }) {
  const color = CAT_COLORS[item.category] ?? "#2a2a2a";
  const icon = CAT_ICONS[item.category] ?? "◆";

  return (
    <div
      className="card-premium"
      style={{ borderRadius: "12px", overflow: "hidden", cursor: "pointer" }}
    >
      <div
        style={{
          height: "200px",
          position: "relative",
          overflow: "hidden",
          background: `radial-gradient(ellipse at center, ${color}44 0%, #111 70%)`,
        }}
      >
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3.5rem",
              color: color,
              filter: "brightness(1.4)",
            }}
          >
            {icon}
            <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", background: "rgba(0,0,0,0.7)", border: "1px solid var(--border)", borderRadius: "4px", padding: "0.2rem 0.5rem", fontSize: "0.7rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Photo Coming Soon
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "1.25rem" }}>
        <div style={{ fontSize: "0.72rem", color: color, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.375rem", filter: "brightness(1.4)" }}>
          {CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category}
        </div>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--foreground)" }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "0.82rem", color: "#777", lineHeight: 1.6, marginBottom: "1rem" }}>
          {item.description}
        </p>
        <div style={{ fontSize: "0.8rem", color: "var(--gold)", fontWeight: 600 }}>
          View Details →
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section style={{ padding: "4rem 1.5rem", maxWidth: "1400px", margin: "0 auto" }}>
      <SectionHeading
        title="Gallery & Past Projects"
        subtitle="Every table we build is a one-of-a-kind masterpiece. Browse our completed projects for inspiration."
      />

      {/* Filter buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "3rem" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "999px",
              border: activeCategory === cat.id ? "1px solid var(--gold)" : "1px solid var(--border)",
              background: activeCategory === cat.id ? "rgba(201,168,76,0.15)" : "var(--card)",
              color: activeCategory === cat.id ? "var(--gold)" : "#888",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: activeCategory === cat.id ? 700 : 400,
              transition: "all 0.15s",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {filtered.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem", color: "#555" }}>
          No projects in this category yet. Check back soon!
        </div>
      )}

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: "4rem", padding: "3rem", borderRadius: "16px", border: "1px solid var(--border)", background: "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)" }}>
        <h3 style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "1.5rem", fontWeight: 700, color: "var(--gold)", marginBottom: "1rem" }}>
          Want to Be in Our Gallery?
        </h3>
        <p style={{ color: "#888", marginBottom: "1.75rem" }}>
          Configure your own custom table and join our growing portfolio of satisfied clients.
        </p>
        <a href="/tables" className="btn-gold">Start Configuring</a>
      </div>
    </section>
  );
}
