"use client";

import { useState } from "react";
import { CustomerInfo } from "@/types";

interface CustomerInfoFormProps {
  onClose: () => void;
  onSubmit: (info: CustomerInfo) => void;
  isSubmitting: boolean;
}

const EMPTY: CustomerInfo = { name: "", email: "", phone: "", company: "", country: "", message: "" };

export default function CustomerInfoForm({ onClose, onSubmit, isSubmitting }: CustomerInfoFormProps) {
  const [info, setInfo] = useState<CustomerInfo>(EMPTY);
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const set = (field: keyof CustomerInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setInfo((prev) => ({ ...prev, [field]: e.target.value }));

  function validate() {
    const errs: Partial<CustomerInfo> = {};
    if (!info.name.trim()) errs.name = "Required";
    if (!info.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) errs.email = "Valid email required";
    if (!info.country.trim()) errs.country = "Required";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit(info);
  }

  const fieldStyle = (err?: string): React.CSSProperties => ({
    background: "var(--surface)",
    border: `1px solid ${err ? "#c0392b" : "var(--border)"}`,
    color: "var(--foreground)",
    padding: "0.625rem 0.875rem",
    borderRadius: "6px",
    width: "100%",
    fontSize: "0.9rem",
    transition: "border-color 0.2s",
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "2rem",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "#666", fontSize: "1.25rem", cursor: "pointer" }}
          aria-label="Close"
        >
          ✕
        </button>

        <h2 style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "1.4rem", fontWeight: 700, color: "var(--gold)", marginBottom: "0.5rem" }}>
          Submit Your Configuration
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "1.75rem" }}>
          Fill in your details and we&apos;ll get back to you with a full quote and availability.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.375rem" }}>Full Name *</label>
              <input style={fieldStyle(errors.name)} value={info.name} onChange={set("name")} placeholder="Your full name" />
              {errors.name && <p style={{ fontSize: "0.75rem", color: "#c0392b", marginTop: "0.25rem" }}>{errors.name}</p>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.375rem" }}>Email Address *</label>
                <input type="email" style={fieldStyle(errors.email)} value={info.email} onChange={set("email")} placeholder="you@example.com" />
                {errors.email && <p style={{ fontSize: "0.75rem", color: "#c0392b", marginTop: "0.25rem" }}>{errors.email}</p>}
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.375rem" }}>Phone</label>
                <input type="tel" style={fieldStyle()} value={info.phone} onChange={set("phone")} placeholder="+1 234 567 890" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.375rem" }}>Company / Casino Name</label>
                <input style={fieldStyle()} value={info.company} onChange={set("company")} placeholder="Optional" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.375rem" }}>Country *</label>
                <input style={fieldStyle(errors.country)} value={info.country} onChange={set("country")} placeholder="e.g. Czech Republic" />
                {errors.country && <p style={{ fontSize: "0.75rem", color: "#c0392b", marginTop: "0.25rem" }}>{errors.country}</p>}
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.375rem" }}>Additional Notes / Message</label>
              <textarea
                style={{ ...fieldStyle(), resize: "vertical", minHeight: "90px" }}
                value={info.message}
                onChange={set("message")}
                placeholder="Any special requests, questions, or additional details..."
              />
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
            <button type="button" onClick={onClose} className="btn-outline-gold" style={{ flex: 1 }}>
              Back
            </button>
            <button type="submit" className="btn-gold" style={{ flex: 2 }} disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Send Configuration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
