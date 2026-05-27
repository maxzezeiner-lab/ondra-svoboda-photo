import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const VALUES = [
  { icon: "◈", title: "Precision Craftsmanship", desc: "Every table is assembled by hand, with each component measured to the millimetre. We use only casino-grade materials trusted by professional establishments worldwide." },
  { icon: "◉", title: "Client-Specific Design", desc: "No catalogue products — every order starts with a blank canvas. We collaborate with each client to create something truly unique to their space and vision." },
  { icon: "◊", title: "Premium Materials", desc: "Casino-grade wool felt, full-grain vinyl upholstery, solid hardwood frames, and precision-machined metal hardware. We source only the best." },
  { icon: "⬡", title: "End-to-End Service", desc: "From your initial inquiry through design, build, delivery, and installation, our team is with you at every step. We don't ship and disappear." },
];

const STATS = [
  { value: "500+", label: "Tables Built" },
  { value: "12+", label: "Years Experience" },
  { value: "30+", label: "Countries Served" },
  { value: "100%", label: "Custom Orders" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        padding: "5rem 1.5rem",
        background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%)",
        textAlign: "center",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 1rem", border: "1px solid rgba(201,168,76,0.4)", borderRadius: "999px", fontSize: "0.8rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Our Story
          </div>
          <h1 style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            background: "linear-gradient(135deg, #f0ece0, #D4AF37, #f0ece0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1.5rem",
          }}>
            Crafting the Art of the Game
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#888", lineHeight: 1.8, marginBottom: "2rem" }}>
            King Shark Poker was born from a simple belief: the table at the centre of a game should be as exceptional as the players who gather around it. We build custom casino furniture for discerning clients who refuse to settle for off-the-shelf.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "3rem 1.5rem", background: "var(--surface)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "2.5rem", fontWeight: 700, background: "linear-gradient(135deg, #C9A84C, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#777", marginTop: "0.25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="about-grid">
          <div>
            <SectionHeading title="Who We Are" centered={false} />
            <p style={{ color: "#888", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Founded by passionate craftsmen and casino enthusiasts, King Shark Poker has spent over a decade perfecting the art of bespoke casino furniture. Our workshop combines traditional woodworking techniques with modern precision tools to deliver results that would be at home in the finest casinos in Europe.
            </p>
            <p style={{ color: "#888", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Every project begins with a consultation. Whether you&apos;re outfitting a home game room, opening a new casino, or upgrading an existing venue, we take the time to understand your exact requirements — and then we exceed them.
            </p>
            <p style={{ color: "#888", lineHeight: 1.8 }}>
              Our clients range from private collectors and enthusiasts to established casinos, bars, restaurants, and clubs across Europe and beyond. Each client receives the same level of attention, regardless of order size.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { label: "Workshop founded", value: "2012" },
              { label: "First casino contract", value: "2014" },
              { label: "International shipping", value: "2017" },
              { label: "Online configurator", value: "2024" },
            ].map((item) => (
              <div key={item.label} style={{ padding: "1.5rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                <div style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "1.75rem", fontWeight: 700, background: "linear-gradient(135deg, #C9A84C, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "0.25rem" }}>{item.value}</div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--surface)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionHeading title="Our Values" subtitle="The principles that guide every table we build." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{ padding: "2rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px" }}>
                <div style={{ fontSize: "1.75rem", color: "var(--gold)", marginBottom: "1rem" }}>{v.icon}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.625rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#777", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "2rem", fontWeight: 700, color: "var(--gold)", marginBottom: "1rem" }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ color: "#888", marginBottom: "2rem", lineHeight: 1.7 }}>
            Use our configurator to design your table, or reach out directly — we&apos;re always happy to discuss a project.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/tables" className="btn-gold">Configure a Table</Link>
            <Link href="/contact" className="btn-outline-gold">Get in Touch</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
