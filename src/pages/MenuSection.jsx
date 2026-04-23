import MenuItem from "./MenuItem";

export default function MenuSection({
  title,
  subtitle,
  sections = [],
  lang = "en",
}) {
  return (
    <section className="py-20 px-6">

      {/* ───────── Header ───────── */}
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-5 mb-6 mx-auto">
          <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          <span className="text-[var(--accent-gold)] text-sm">✦</span>
          <div className="flex-1 h-px bg-[var(--border-subtle)]" />
        </div>

        {/* <h2
          className="font-display py-2! uppercase tracking-[0.3em] text-[var(--text-primary)]"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
        >
          {title}
        </h2> */}

        {subtitle && (
          <p className="mt-3 text-[var(--text-muted)] italic text-sm tracking-wide">
            {subtitle}
          </p>
        )}
      </div>

      {/* ───────── Sections (Groups) ───────── */}
      <div className="max-w-5xl mx-auto space-y-12">

        {sections.map((section, sIndex) => (
          <div key={sIndex}>

            {/* Section Title */}
            <h3 className="text-center text-lg my-3! font-bold! text-[var(--accent-gold)]!  tracking-widest">
              {lang === "ar" ? section.title.ar : section.title.en}
            </h3>

            {/* Groups */}
            {section.groups.map((group, gIndex) => (
              <div key={gIndex} className="mb-8">

                {/* Price Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                  <span className="text-sm text-[var(--accent-gold)] whitespace-nowrap">
                    {group.price} EGP
                  </span>
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                </div>

                {/* Items Grid */}
                <div className="grid md:grid-cols-2 gap-x-16">
                  {group.items.map((item, i) => (
                    <MenuItem
                      key={i}
                      name={lang === "ar" ? item.ar : item.en}
                      price={group.price}
                    />
                  ))}
                </div>

              </div>
            ))}

          </div>
        ))}

      </div>
    </section>
  );
}