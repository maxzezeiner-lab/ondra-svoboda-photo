import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      {/* Gold divider */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem" }}>
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", marginBottom: "1rem" }}>
              <Image
                src="/logo.jpeg"
                alt="King Shark Poker Logo"
                width={40}
                height={40}
                style={{ borderRadius: "4px", border: "1px solid var(--gold)" }}
              />
              <span style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                fontSize: "1rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #C9A84C, #D4AF37, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                King Shark Poker
              </span>
            </Link>
            <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: "1.6", maxWidth: "260px" }}>
              Premium custom casino tables and accessories crafted with precision and passion.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Products
            </h4>
            {[
              { href: "/tables", label: "Poker Tables" },
              { href: "/tables", label: "Blackjack Tables" },
              { href: "/tables", label: "Roulette Tables" },
              { href: "/chairs", label: "Casino Chairs" },
              { href: "/chips", label: "Custom Chips" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="footer-link"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Company
            </h4>
            {[
              { href: "/about", label: "About Us" },
              { href: "/gallery", label: "Gallery" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy-policy", label: "Privacy Policy" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="footer-link"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact info */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Contact
            </h4>
            {/* TODO: Replace with real contact details */}
            <p style={{ fontSize: "0.875rem", color: "#888880", marginBottom: "0.5rem" }}>
              📧 info@kingsharkpoker.com
            </p>
            <p style={{ fontSize: "0.875rem", color: "#888880", marginBottom: "0.5rem" }}>
              📞 +420 XXX XXX XXX
            </p>
            <p style={{ fontSize: "0.875rem", color: "#888880", marginBottom: "0.5rem" }}>
              📍 Czech Republic / EU
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: "2.5rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <p style={{ fontSize: "0.8rem", color: "#555" }}>
            © 2024 King Shark Poker. All rights reserved.
          </p>
          <Link href="/privacy-policy" className="footer-link" style={{ fontSize: "0.8rem", marginBottom: 0 }}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
