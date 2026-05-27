import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const PRODUCTS = [
  {
    title: "Poker Tables",
    desc: "From intimate 6-player home tables to full 10-player tournament setups. Custom felt, vinyl, cup holders, and more.",
    href: "/tables",
    color: "#1a6b3c",
  },
  {
    title: "Blackjack Tables",
    desc: "Professional casino-grade blackjack tables with drop box, bill slot, and premium layout options.",
    href: "/tables",
    color: "#1a3a8f",
  },
  {
    title: "Roulette Tables",
    desc: "Authentic roulette table setups with premium wheel housings, custom layouts, and brass fixtures.",
    href: "/tables",
    color: "#722f37",
  },
  {
    title: "Custom Tables",
    desc: "Have a unique vision? We build completely custom casino tables — any size, shape, or specification.",
    href: "/tables",
    color: "#5b2d8e",
  },
];


export default function HomePage() {
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
              style={{
                borderRadius: "12px",
                border: "2px solid var(--gold)",
                boxShadow: "0 0 40px rgba(201,168,76,0.3)",
                display: "block",
                margin: "0 auto",
              }}
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
                <div
                  className="card-premium product-card"
                  style={{ borderRadius: "12px", padding: "2rem 1.5rem" }}
                >
                  <h3 style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "1.2rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.75rem" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#777", lineHeight: 1.65 }}>{p.desc}</p>
                  <div style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "var(--gold)", fontWeight: 600 }}>Configure →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- GALLERY PREVIEW ---- */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionHeading title="Past Projects" subtitle="A glimpse of our craftsmanship — every project is unique." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
            {[
              { label: "Premium Oval Poker Table", sub: "Private residence, Vienna", color: "#1a6b3c", icon: "♠" },
              { label: "Classic Blackjack Table", sub: "Boutique casino, Prague", color: "#1a3a8f", icon: "♥" },
              { label: "Custom VIP Poker Table", sub: "Members club, Vienna", color: "#5b2d8e", icon: "★" },
            ].map((item) => (
              <div key={item.label} className="card-premium" style={{ borderRadius: "12px", overflow: "hidden" }}>
                {/* TODO: Replace with <Image src="..." /> once real gallery photos are available */}
                <div style={{ height: "180px", background: `radial-gradient(ellipse at center, ${item.color}44 0%, #111 70%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", color: item.color, filter: "brightness(1.5)" }}>
                  {item.icon}
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.375rem" }}>{item.label}</h4>
                  <p style={{ fontSize: "0.8rem", color: "#666" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/gallery" className="btn-outline-gold">View Full Gallery</Link>
          </div>
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
