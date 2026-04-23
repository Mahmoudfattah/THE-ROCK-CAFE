export default function Header({
  title,
  subtitle,
  eyebrow,
  highlight,
  highlightPos = "end",
  onBack,
}) {
  const renderTitle = () => {
    if (!highlight) return title;

    if (highlightPos === "end") {
      return (
        <>
          {title}{" "}
          <span className="text-[var(--accent-primary)]">{highlight}</span>
        </>
      );
    }

    return (
      <>
        <span className="text-[var(--accent-primary)]">{highlight}</span>{" "}
        {title}
      </>
    );
  };

  return (
    <header className="relative text-center  pt-12! pb-14 px-6 bg-[var(--bg-primary)]">

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 85% at 50% -5%, rgba(200,21,27,.18), transparent 70%)",
        }}
      />

      {/* Eyebrow */}
      {eyebrow && (
        <span className="block pt-10! font-bold  mb-4 text-[var(--accent-gold)] uppercase tracking-[.35em] text-xs">
          {eyebrow}
        </span>
      )}

      {/* Title */}
      <h1 className="font-display text-[clamp(1.8rem,4vw,2rem)] leading-none mb-4">
        {renderTitle()}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[var(--text-muted)] italic  mx-auto text-sm tracking-wide">
          {subtitle}
        </p>
      )}

      {/* Divider */}
    

      {/* ✅ Back Button (center) */}
      {onBack && (
        <button
          onClick={onBack}
          className="
            mx-auto mt-4
            px-6 py-2 text-sm tracking-widest uppercase
            border border-[var(--border-default)]
            text-[var(--text-muted)]
            hover:text-white hover:border-[var(--accent-primary)]
            transition-all duration-300
          "
        >
          ← Back to Menu
        </button>
      )}
    </header>
  );
}