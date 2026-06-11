"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { GALLERY_ITEMS } from "@/lib/gallery-data";
import { GalleryItem } from "@/types";

const PRODUCTS = [
  {
    title: "Poker Tables",
    desc: "From intimate 6-player home tables to full 10-player tournament setups. Custom felt, vinyl, cup holders, and more.",
    href: "/tables",
    color: "#1a6b3c",
  },
  {
    title: "Custom Chips",
    desc: "Premium clay composite chips with custom denominations, colours, and logo. Available in multiple materials and finishes.",
    href: "/chips",
    color: "#9A7B2E",
  },
];

const CATEGORIES = [
  { id: "all",       label: "All" },
  { id: "poker",     label: "Poker Tables" },
  { id: "chips",     label: "Chips" },
  { id: "chairs",    label: "Chairs" },
];

const CAT_COLORS: Record<string, string> = {
  poker:     "#1a6b3c",
  blackjack: "#1a3a8f",
  roulette:  "#722f37",
  custom:    "#5b2d8e",
  chairs:    "#36454f",
  chips:     "#9A7B2E",
};

const CAT_ICONS: Record<string, string> = {
  poker:     "♠",
  blackjack: "♥",
  roulette:  "⚙",
  custom:    "★",
  chairs:    "⬡",
  chips:     "●",
};

function GalleryCard({ item }: { item: GalleryItem }) {
  const color = CAT_COLORS[item.category] ?? "#2a2a2a";
  const icon  = CAT_ICONS[item.category]  ?? "◆";

  return (
    <div className="card-premium" style={{ borderRadius: "12px", overflow: "hidden" }}>
      <div style={{ height: "200px", position: "relative", overflow: "hidden", background: `radial-gradient(ellipse at center, ${color}44 0%, #111 70%)` }}>
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", color, filter: "brightness(1.4)" }}>
            {icon}
            <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", background: "rgba(0,0,0,0.7)", border: "1px solid var(--border)", borderRadius: "4px", padding: "0.2rem 0.5rem", fontSize: "0.7rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Photo Coming Soon
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "1.25rem" }}>
        <div style={{ fontSize: "0.72rem", color, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.375rem", filter: "brightness(1.4)" }}>
          {CATEGORIES.find(c => c.id === item.category)?.label ?? item.category}
        </div>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--foreground)" }}>{item.title}</h3>
        <p style={{ fontSize: "0.82rem", color: "#777", lineHeight: 1.6 }}>{item.description}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <>
      {/* ---- HERO ---- */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem 1.5rem",
          position: "relative",
          background: "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.07) 0%, transparent 65%)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(42,42,42,0.3) 60px, rgba(42,42,42,0.3) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(42,42,42,0.3) 60px, rgba(42,42,42,0.3) 61px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          <div style={{ marginBottom: "2rem" }}>
            <Image
              src="/logo.jpeg"
              alt="King Shark Poker logo"
              width={120}
              height={120}
              style={{ borderRadius: "12px", border: "2px solid var(--gold)", boxShadow: "0 0 40px rgba(201,168,76,0.3)", display: "block", margin: "0 auto" }}
              priority
            />
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 1rem", border: "1px solid rgba(201,168,76,0.4)", borderRadius: "999px", fontSize: "0.8rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            <span>♠</span>
            <span>Bespoke Casino Furniture</span>
            <span>♠</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontSize: "clamp(2.25rem, 6vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "1.5rem",
              background: "linear-gradient(135deg, #f0ece0, #D4AF37, #f0ece0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Custom Casino Tables
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "#999", maxWidth: "620px", margin: "0 auto 2.5rem", lineHeight: 1.75 }}>
            Get your own table right now — fully custom, built to your exact specifications.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/tables" className="btn-gold" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>
              Customize Your Table
            </Link>
            <Link href="/contact" className="btn-outline-gold" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>
              Contact Us
            </Link>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem", color: "#444" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
        </div>
      </section>

      {/* ---- PRODUCTS ---- */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--surface)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionHeading title="Our Products" subtitle="Handcrafted to your exact specifications — no off-the-shelf tables, only bespoke craftsmanship." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {PRODUCTS.map((p) => (
              <Link key={p.title} href={p.href} style={{ textDecoration: "none" }}>
                <div className="card-premium product-card" style={{ borderRadius: "12px", padding: "2rem 1.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "1.2rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.75rem" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#777", lineHeight: 1.65 }}>{p.desc}</p>
                  <div style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "var(--gold)", fontWeight: 600 }}>Configure →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- GALLERY ---- */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <SectionHeading title="Gallery" subtitle="A glimpse of our craftsmanship — every project is unique." />

          {/* Filter buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "3rem" }}>
            {CATEGORIES.map(cat => (
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
            {filtered.map(item => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem", color: "#555" }}>
              No projects in this category yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section style={{
        padding: "6rem 1.5rem",
        background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontSize: "clamp(1.75rem, 5vw, 3rem)",
            fontWeight: 700,
            background: "linear-gradient(135deg, #C9A84C, #D4AF37, #C9A84C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1.25rem",
          }}>
            Ready to Build Your Dream Table?
          </h2>
          <p style={{ color: "#888", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Start configuring your custom casino table now. Choose every detail, see your price estimate, and submit — we&apos;ll take it from there.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/tables" className="btn-gold" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
              Start Configuring
            </Link>
            <Link href="/about" className="btn-outline-gold" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
