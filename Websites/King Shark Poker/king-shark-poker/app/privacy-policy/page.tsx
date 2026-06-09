import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | King Shark Poker",
  description: "How King Shark Poker collects, uses and protects your personal data.",
};

const CONTROLLER_NAME = "XXX";
const CONTROLLER_EMAIL = "XXX";

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-playfair, Georgia, serif)",
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "var(--gold)",
  marginBottom: "0.75rem",
  marginTop: "2.5rem",
};

const bodyStyle: React.CSSProperties = {
  color: "#aaa",
  lineHeight: 1.8,
  fontSize: "0.95rem",
  marginBottom: "1rem",
};

const listStyle: React.CSSProperties = {
  color: "#aaa",
  lineHeight: 1.8,
  fontSize: "0.95rem",
  paddingLeft: "1.5rem",
  marginBottom: "1rem",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: "4rem 1.5rem 3rem", textAlign: "center", background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 1rem", border: "1px solid rgba(201,168,76,0.4)", borderRadius: "999px", fontSize: "0.8rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            Legal
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, background: "linear-gradient(135deg, #f0ece0, #D4AF37, #f0ece0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem" }}>
            Privacy Policy
          </h1>
          <p style={{ color: "#888", lineHeight: 1.75 }}>
            Last updated: June 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "4rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>

        <p style={bodyStyle}>
          This page explains what personal information we collect when you use our website or contact us, why we collect it, and what your rights are. We have written this in plain language on purpose — no legal jargon.
        </p>

        {/* Who we are */}
        <h2 style={headingStyle}>Who we are</h2>
        <p style={bodyStyle}>
          The data controller responsible for your personal data is <strong style={{ color: "#ccc" }}>{CONTROLLER_NAME}</strong>, operating under the brand <strong style={{ color: "#ccc" }}>King Shark Poker</strong>, based in the Czech Republic (European Union).
        </p>
        <p style={bodyStyle}>
          If you have any questions about this policy or your personal data, you can reach us at{" "}
          <a href={`mailto:${CONTROLLER_EMAIL}`} style={{ color: "var(--gold)", textDecoration: "none" }}>{CONTROLLER_EMAIL}</a>.
        </p>

        {/* What we collect */}
        <h2 style={headingStyle}>What personal data we collect</h2>
        <p style={bodyStyle}>
          We only collect data that you actively give us through the contact form on this website. This includes:
        </p>
        <ul style={listStyle}>
          <li><strong style={{ color: "#ccc" }}>Full name</strong> — so we know who we are talking to</li>
          <li><strong style={{ color: "#ccc" }}>Email address</strong> — so we can reply to you</li>
          <li><strong style={{ color: "#ccc" }}>Phone number</strong> (optional) — if you prefer a call</li>
          <li><strong style={{ color: "#ccc" }}>Your message</strong> — the content of your enquiry</li>
          <li><strong style={{ color: "#ccc" }}>Product configuration</strong> (if submitted via the configurator) — the table/chair/chip options you selected</li>
        </ul>
        <p style={bodyStyle}>
          We do not use cookies for tracking, do not run any analytics services, and do not collect any data automatically from your browser or device.
        </p>

        {/* Why we collect it */}
        <h2 style={headingStyle}>Why we collect it and the legal basis</h2>
        <p style={bodyStyle}>
          We collect your data solely to respond to your enquiry and, where relevant, to prepare a quote or follow up on your project. The legal basis under GDPR is your freely given <strong style={{ color: "#ccc" }}>consent</strong> (Article 6(1)(a)) — you provide your data and tick the consent checkbox before submitting the form.
        </p>
        <p style={bodyStyle}>
          We will never use your data to send you unsolicited marketing emails.
        </p>

        {/* How long */}
        <h2 style={headingStyle}>How long we keep your data</h2>
        <p style={bodyStyle}>
          We keep your enquiry data for up to <strong style={{ color: "#ccc" }}>2 years</strong> after your last contact with us. This is the time we reasonably need to follow up on a project or answer further questions. After that period, your data is permanently deleted.
        </p>
        <p style={bodyStyle}>
          If you ask us to delete your data earlier, we will do so promptly (see &quot;Your rights&quot; below).
        </p>

        {/* Sharing */}
        <h2 style={headingStyle}>Who we share your data with</h2>
        <p style={bodyStyle}>
          We do not sell, rent, or trade your personal data to anyone.
        </p>
        <p style={bodyStyle}>
          Your enquiry data is stored on our own server infrastructure. We do not pass it to any marketing companies, advertising networks, or data brokers.
        </p>

        {/* Security */}
        <h2 style={headingStyle}>How we protect your data</h2>
        <p style={bodyStyle}>
          All data you submit through this website is transmitted over an encrypted <strong style={{ color: "#ccc" }}>HTTPS / TLS (SSL)</strong> connection, meaning it cannot be read in transit. Data stored on our server is accessible only to authorised personnel.
        </p>

        {/* Your rights */}
        <h2 style={headingStyle}>Your rights under GDPR</h2>
        <p style={bodyStyle}>
          As a person whose data we hold, you have the following rights under the General Data Protection Regulation (GDPR):
        </p>
        <ul style={listStyle}>
          <li><strong style={{ color: "#ccc" }}>Right of access</strong> — you can ask us to tell you exactly what data we hold about you.</li>
          <li><strong style={{ color: "#ccc" }}>Right to correction</strong> — if any of your data is inaccurate, you can ask us to correct it.</li>
          <li><strong style={{ color: "#ccc" }}>Right to deletion</strong> — you can ask us to delete all personal data we hold about you at any time.</li>
          <li><strong style={{ color: "#ccc" }}>Right to restrict processing</strong> — you can ask us to stop using your data while keeping it on record (e.g. while a dispute is resolved).</li>
          <li><strong style={{ color: "#ccc" }}>Right to withdraw consent</strong> — since we process your data based on consent, you can withdraw it at any time. This will not affect anything we did before you withdrew.</li>
          <li><strong style={{ color: "#ccc" }}>Right to lodge a complaint</strong> — if you believe we are mishandling your data, you can file a complaint with the Czech data protection authority, the <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", textDecoration: "none" }}>Office for Personal Data Protection (UOOU)</a>.</li>
        </ul>
        <p style={bodyStyle}>
          To exercise any of these rights, simply email us at{" "}
          <a href={`mailto:${CONTROLLER_EMAIL}`} style={{ color: "var(--gold)", textDecoration: "none" }}>{CONTROLLER_EMAIL}</a>. We will respond within 30 days.
        </p>

        {/* Changes */}
        <h2 style={headingStyle}>Changes to this policy</h2>
        <p style={bodyStyle}>
          If we update this policy, we will post the new version here with an updated date at the top. We encourage you to check back occasionally.
        </p>

        {/* Back link */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
          <Link href="/contact" style={{ color: "var(--gold)", fontSize: "0.9rem", textDecoration: "none" }}>
            Back to Contact
          </Link>
        </div>

      </section>
    </>
  );
}
