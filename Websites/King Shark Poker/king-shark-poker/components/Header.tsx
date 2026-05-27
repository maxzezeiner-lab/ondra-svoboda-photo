"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tables", label: "Tables" },
  { href: "/chairs", label: "Chairs" },
  { href: "/chips", label: "Chips" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "CZ">("EN");

  return (
    <header
      style={{
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <Image
            src="/logo.jpeg"
            alt="King Shark Poker Logo"
            width={44}
            height={44}
            style={{ borderRadius: "4px", border: "1px solid var(--gold)" }}
          />
          <span
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontSize: "1.15rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #C9A84C, #D4AF37, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            King Shark Poker Tables
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden-mobile">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "0.375rem 0.75rem",
                fontSize: "0.875rem",
                color: "#b0a890",
                textDecoration: "none",
                borderRadius: "4px",
                transition: "color 0.2s",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#b0a890")}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Language switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem" }}>
            <button
              onClick={() => setLang("EN")}
              style={{
                padding: "0.25rem 0.5rem",
                borderRadius: "3px",
                border: lang === "EN" ? "1px solid var(--gold)" : "1px solid var(--border)",
                background: lang === "EN" ? "rgba(201,168,76,0.15)" : "transparent",
                color: lang === "EN" ? "var(--gold)" : "#666",
                cursor: "pointer",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLang("CZ")}
              title="Czech version coming soon"
              style={{
                padding: "0.25rem 0.5rem",
                borderRadius: "3px",
                border: lang === "CZ" ? "1px solid var(--gold)" : "1px solid var(--border)",
                background: lang === "CZ" ? "rgba(201,168,76,0.15)" : "transparent",
                color: lang === "CZ" ? "var(--gold)" : "#666",
                cursor: "pointer",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              CZ
            </button>
          </div>

          {/* CTA button */}
          <Link href="/tables" className="btn-gold hidden-mobile" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}>
            Customize Now
          </Link>

          {/* Hamburger */}
          <button
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "none",
            }}
            className="show-mobile"
          >
            <span style={{ display: "block", width: "22px", height: "2px", background: "var(--gold)", marginBottom: "5px", transition: "transform 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: "var(--gold)", marginBottom: "5px", opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: "var(--gold)", transition: "transform 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            padding: "1rem 1.5rem",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 0",
                fontSize: "1rem",
                color: "#b0a890",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/tables"
            onClick={() => setMenuOpen(false)}
            className="btn-gold"
            style={{ marginTop: "1rem", display: "block", textAlign: "center" }}
          >
            Customize Now
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
