"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const EMPTY: ContactForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (field: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function validate() {
    const errs: Partial<ContactForm> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
    if (!form.message.trim()) errs.message = "Required";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSending(true);
    // Contact form submissions also save to Excel for tracking
    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        configurationType: "Contact Inquiry",
        customer: { name: form.name, email: form.email, phone: form.phone, company: "", country: "", message: form.message },
        configuration: { subject: form.subject },
        estimatedTotal: 0,
      }),
    });
    setSending(false);
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
    padding: "0.7rem 0.875rem",
    borderRadius: "6px",
    width: "100%",
    fontSize: "0.9rem",
    transition: "border-color 0.2s",
  };

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "4rem 1.5rem 3rem", textAlign: "center", background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 1rem", border: "1px solid rgba(201,168,76,0.4)", borderRadius: "999px", fontSize: "0.8rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            Contact Us
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, background: "linear-gradient(135deg, #f0ece0, #D4AF37, #f0ece0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem" }}>
            Let&apos;s Talk About Your Project
          </h1>
          <p style={{ color: "#888", lineHeight: 1.75 }}>
            Have a question or a custom project in mind? Fill in the form below, or use our configurator to get started with a detailed specification.
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "4rem", alignItems: "start" }} className="contact-grid">

          {/* Info column */}
          <div>
            <SectionHeading title="Get in Touch" centered={false} />

            {[
              { icon: "📧", label: "Email", value: "info@kingsharkpoker.com" /* TODO: replace */ },
              { icon: "📞", label: "Phone", value: "+420 XXX XXX XXX" /* TODO: replace */ },
              { icon: "📍", label: "Location", value: "Czech Republic, European Union" /* TODO: replace */ },
              { icon: "🕐", label: "Response Time", value: "Within 1–2 business days" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "var(--card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>{item.label}</div>
                  <div style={{ fontSize: "0.9rem", color: "#aaa" }}>{item.value}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px" }}>
              <h4 style={{ color: "var(--gold)", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.75rem" }}>Skip the form — configure directly</h4>
              <p style={{ fontSize: "0.85rem", color: "#777", marginBottom: "1rem", lineHeight: 1.6 }}>
                Use our table configurator to spec out exactly what you want and receive an instant price estimate.
              </p>
              <Link href="/tables" className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                Open Configurator
              </Link>
            </div>
          </div>

          {/* Form column */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2.5rem" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
                <h3 style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "1.5rem", color: "var(--gold)", marginBottom: "0.75rem" }}>Message Received!</h3>
                <p style={{ color: "#888", lineHeight: 1.7, marginBottom: "1.5rem" }}>Thank you for reaching out. We&apos;ll get back to you within 1–2 business days.</p>
                <button className="btn-outline-gold" onClick={() => { setSubmitted(false); setForm(EMPTY); }}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "1.3rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "1.75rem" }}>Send a Message</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.375rem" }}>Full Name *</label>
                    <input style={{ ...inputStyle, borderColor: errors.name ? "#c0392b" : "var(--border)" }} value={form.name} onChange={set("name")} placeholder="Your name" />
                    {errors.name && <p style={{ fontSize: "0.75rem", color: "#c0392b", marginTop: "0.25rem" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.375rem" }}>Email *</label>
                    <input type="email" style={{ ...inputStyle, borderColor: errors.email ? "#c0392b" : "var(--border)" }} value={form.email} onChange={set("email")} placeholder="you@example.com" />
                    {errors.email && <p style={{ fontSize: "0.75rem", color: "#c0392b", marginTop: "0.25rem" }}>{errors.email}</p>}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.375rem" }}>Phone</label>
                    <input type="tel" style={inputStyle} value={form.phone} onChange={set("phone")} placeholder="+1 234 567 890" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.375rem" }}>Subject</label>
                    <select style={inputStyle} value={form.subject} onChange={set("subject")}>
                      <option value="">Select a topic...</option>
                      <option>Custom Poker Table</option>
                      <option>Blackjack / Roulette Table</option>
                      <option>Casino Chairs</option>
                      <option>Custom Chips</option>
                      <option>Full Casino Setup</option>
                      <option>Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.375rem" }}>Message *</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: "140px", resize: "vertical", borderColor: errors.message ? "#c0392b" : "var(--border)" }}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Describe your project, requirements, or ask any questions..."
                  />
                  {errors.message && <p style={{ fontSize: "0.75rem", color: "#c0392b", marginTop: "0.25rem" }}>{errors.message}</p>}
                </div>

                <button type="submit" className="btn-gold" style={{ width: "100%" }} disabled={sending}>
                  {sending ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
