export default function MenuItem({ name, price, desc }) {
  return (
    <div className="py-6">
      <div className="flex items-start gap-4 py-2!">
        {/* 🔴 Icon Circle */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-(--border-default) text-[var(--accent-primary)]">
          ☕
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Top Row */}
          <div className="flex items-center gap-3">
            {/* Name */}
            <h3 className="font-heading text-[1.1rem] tracking-wide whitespace-nowrap">
              {name}
            </h3>

            {/* Dotted line */}
            <div className="flex-1 translate-y-[2px] border-b border-dashed border-[var(--border-default)] opacity-50" />

            {/* Price */}
            <span className="font-heading text-[1rem] whitespace-nowrap text-[var(--text-primary)]">
              {price}
            </span>
          </div>

          {/* Description */}
          {desc && (
            <p className="mt-2 max-w-[90%] text-sm leading-relaxed text-[var(--text-muted)]">
              {desc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
