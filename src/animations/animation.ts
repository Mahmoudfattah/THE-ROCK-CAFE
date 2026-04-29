import type { Variants } from "framer-motion";

// ─────────────────────────────────────────
//  Reusable Framer Motion Variants
//  Usage: <motion.div variants={fadeUp} initial="hidden" animate="visible" />
// ─────────────────────────────────────────

/** Fade up from below — for headings, paragraphs, general content */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Fade down from above — for navbar / top elements */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Scale + fade — for buttons and small UI chips */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Slide in from the right — for hero images / side visuals */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// ─────────────────────────────────────────
//  Container variants — for stagger groups
// ─────────────────────────────────────────

/**
 * Wraps a group of children that should stagger in.
 * Apply to the parent motion element.
 * Children should use `fadeUp`, `scaleIn`, etc.
 *
 * @param stagger  delay between each child (default 0.2s)
 * @param delayChildren  delay before the first child starts (default 0s)
 */
export const staggerContainer = (
  stagger = 0.2,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

// ─────────────────────────────────────────
//  Floating loop — for hero cup / image
// ─────────────────────────────────────────

/**
 * Infinite gentle float.
 * Use as `animate` prop directly (not variants),
 * after the entrance animation completes.
 *
 * Example:
 *   <motion.div
 *     variants={slideInRight}
 *     initial="hidden"
 *     animate="visible"
 *   >
 *     <motion.img animate={floatLoop} />
 *   </motion.div>
 */
export const floatLoop = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop" as const,
  },
};

// ─────────────────────────────────────────
//  Hover helpers (pass to whileHover prop)
// ─────────────────────────────────────────

export const hoverScale = { scale: 1.05, transition: { duration: 0.22 } };
export const hoverScaleSm = { scale: 1.03, transition: { duration: 0.22 } };