interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  goldTitle?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true, goldTitle = false }: SectionHeadingProps) {
  return (
    <div style={{ textAlign: centered ? "center" : "left", marginBottom: "3rem" }}>
      <h2
        style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 700,
          marginBottom: "0.75rem",
          lineHeight: 1.2,
          ...(goldTitle
            ? {
                background: "linear-gradient(135deg, #C9A84C, #D4AF37, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : { color: "var(--foreground)" }),
        }}
      >
        {title}
      </h2>
      {/* Gold accent line */}
      <div
        style={{
          width: "60px",
          height: "3px",
          background: "linear-gradient(90deg, #9A7B2E, #D4AF37, #9A7B2E)",
          margin: centered ? "0 auto 1.25rem" : "0 0 1.25rem",
          borderRadius: "2px",
        }}
      />
      {subtitle && (
        <p style={{ fontSize: "1.05rem", color: "#999", maxWidth: "640px", margin: centered ? "0 auto" : "0", lineHeight: 1.7 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
