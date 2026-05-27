"use client";

import React from "react";

interface ConfiguratorLayoutProps {
  title: string;
  subtitle?: string;
  controls: React.ReactNode;
  preview: React.ReactNode;
  summary: React.ReactNode;
}

export default function ConfiguratorLayout({ title, subtitle, controls, preview, summary }: ConfiguratorLayoutProps) {
  return (
    <section style={{ minHeight: "100vh", padding: "2rem 1.5rem 4rem", maxWidth: "1500px", margin: "0 auto" }}>
      {/* Page header */}
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            background: "linear-gradient(135deg, #C9A84C, #D4AF37, #C9A84C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </h1>
        <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, #9A7B2E, #D4AF37, #9A7B2E)", margin: "0 auto 1rem", borderRadius: "2px" }} />
        {subtitle && <p style={{ color: "#888", fontSize: "1rem", maxWidth: "540px", margin: "0 auto" }}>{subtitle}</p>}
      </div>

      {/* 3-column responsive grid — CSS class defined in globals.css */}
      <div className="configurator-grid">
        {/* Left: Controls panel */}
        <aside
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "1.5rem",
          }}
        >
          {controls}
        </aside>

        {/* Middle: Preview */}
        <div>{preview}</div>

        {/* Right: Price summary */}
        <aside>{summary}</aside>
      </div>
    </section>
  );
}
