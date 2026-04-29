import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Coffee, Cake, Leaf, Star, Phone } from "lucide-react";
import { useLang } from "../context/Context";
import {
  fadeUp,
  fadeDown,
  scaleIn,
  slideInRight,
  floatLoop,
  hoverScale,
  staggerContainer,
} from "../animations/animation";

const floatingItems = [
  { src: "/coffee.webp", left: "8%", size: 34, duration: 7, delay: 0, rotate: -20, rotateEnd: 20, opacity: 0.5 },
  { src: "/coffee11.webp", left: "9%", size: 34, duration: 7, delay: 0, rotate: -20, rotateEnd: 20, opacity: 0.5 },
  { src: "/coffee.webp", right: "22%", size: 25, duration: 6, delay: 0, rotate: -20, rotateEnd: 20, opacity: 0.5 },
  { src: "/coffee11.webp", right: "33%", size: 27, duration: 10, delay: 0, rotate: -20, rotateEnd: 20, opacity: 0.5 },
  { src: "/coffee2 (1).webp", left: "28%", size: 24, duration: 9, delay: 1.5, rotate: 30, rotateEnd: -15, opacity: 0.4 },
  { src: "/coffee.webp", left: "58%", size: 38, duration: 8, delay: 3, rotate: -10, rotateEnd: 25, opacity: 0.55 },
  { src: "/coffee2 (1).webp", left: "82%", size: 28, duration: 10, delay: 5, rotate: 15, rotateEnd: -30, opacity: 0.35 },
  { src: "/coffee2.webp", left: "15%", size: 20, duration: 6, delay: 0.8, rotate: 45, rotateEnd: 180, opacity: 0.6 },
  { src: "/coffee11(1).webp", left: "15%", size: 20, duration: 6, delay: 0.8, rotate: 45, rotateEnd: 180, opacity: 0.6 },
  { src: "/coffee.webp", right: "58%", size: 38, duration: 8, delay: 3, rotate: -10, rotateEnd: 25, opacity: 0.55 },
  // { src: "/coffee2 (1).webp", right: "82%", size: 28, duration: 10, delay: 5, rotate: 15, rotateEnd: -30, opacity: 0.35 },
  // { src: "/coffee2.webp", right: "15%", size: 20, duration: 6, delay: 0.8, rotate: 45, rotateEnd: 180, opacity: 0.6 },
  // { src: "/coffee11(1).webp", right: "15%", size: 20, duration: 6, delay: 0.8, rotate: 45, rotateEnd: 180, opacity: 0.6 },
  { src: "/coffee11.webp", left: "48%", size: 18, duration: 8, delay: 2.5, rotate: 0, rotateEnd: 270, opacity: 0.5 },
  { src: "/coffee11(1).webp", left: "72%", size: 24, duration: 7, delay: 4, rotate: 90, rotateEnd: -90, opacity: 0.45 },
  { src: "/coffee.webp", right: "8%", size: 16, duration: 10.8, delay: 3, rotate: 20, rotateEnd: -40, opacity: 0.35 },
];

export default function Hero() {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);

  const handleExploreMenu = () => {
    const menuSection = document.getElementById("menu-section");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const t = {
    quote1: lang === "ar" ? ` " بعض الأماكن تزورها ` : `" Some places you visit `,
    quote2: lang === "ar" ? ` وأخرى تبقى معك " ` : 'Others stay with you."',
    sub: lang === "ar"
      ? "حيث يروي كل فنجان قصة تميز，\nوكل قضمة لحظة من المتعة الخالصة. "
      : "Where every cup tells a story of excellence,\nand every bite is a moment of pure indulgence.",
    btnMenu: lang === "ar" ? "استكشف القائمة" : "EXPLORE MENU",
    btnVisit: lang === "ar" ? "احجز الآن" : "Reserve Now",
    sidebarText: lang === "ar" ? "تأسس 2020 · ذا روك كافيه" : "Est. 2020 · The Rock Café",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        @keyframes floatFall {
          0%   { transform: translateY(-60px) rotate(var(--r-start)); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(115vh) rotate(var(--r-end)); opacity: 0; }
        }
        @keyframes sway {
          0%,100% { margin-left: 0px; }
          50%     { margin-left: 18px; }
        }
        @keyframes smokeRise {
          0%   { transform: translateY(0) scale(.6); opacity: 0; }
          20%  { opacity: .3; }
          100% { transform: translateY(-180px) translateX(20px) scale(1.8); opacity: 0; }
        }
        @keyframes scrollPulse {
          0%,100% { opacity: 0.4; }
          50%     { opacity: 0.85; }
        }

        /* ── Hero background ── */
        .hero-bg {
          position: absolute;
          inset: 0;
          background-color: #0d0b08;
          background-image:
            linear-gradient(rgba(180,30,30,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180,30,30,0.07) 1px, transparent 1px),
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,145,58,0.11) 0%, transparent 65%),
            radial-gradient(ellipse 40% 60% at 10% 70%, rgba(180,120,40,0.07) 0%, transparent 60%);
          background-size: 48px 48px, 48px 48px, 100% 100%, 100% 100%;
        }
        [data-theme="light"] .hero-bg {
          background-color: #F5F0E8;
          background-image:
            linear-gradient(rgba(160,20,20,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(160,20,20,0.06) 1px, transparent 1px),
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,145,58,0.15) 0%, transparent 65%),
            radial-gradient(ellipse 40% 60% at 10% 70%, rgba(180,120,40,0.10) 0%, transparent 60%);
          background-size: 48px 48px, 48px 48px, 100% 100%, 100% 100%;
        }

        .hero-bg::after {
          content: '';
          position: absolute;
          top: -30px;
          right: -20px;
          width: clamp(160px, 38vw, 280px);
          height: clamp(220px, 55vw, 400px);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 320'%3E%3Cpath d='M160 10 C200 40 210 100 180 160 C160 200 120 240 80 270 C50 290 20 300 10 310 C30 280 60 240 70 200 C85 150 80 100 100 60 C115 30 140 0 160 10Z' fill='%23C9913A' opacity='0.08'/%3E%3Cpath d='M140 5 C170 30 185 90 165 150 C148 195 112 232 75 260 C48 280 18 292 8 302 C26 274 54 236 64 196 C78 148 74 98 92 58 C106 28 120 -8 140 5Z' fill='%23C9913A' opacity='0.05'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: contain;
          pointer-events: none;
          opacity: 1;
        }
        [data-theme="light"] .hero-bg::after { opacity: 0.7; }

        .hero-bg::before {
          content: '';
          position: absolute;
          bottom: 60px;
          left: -10px;
          width: clamp(80px, 20vw, 140px);
          height: clamp(120px, 30vw, 200px);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 200'%3E%3Cpath d='M30 190 C10 150 5 90 30 50 C50 20 90 5 110 10 C90 40 70 80 65 120 C60 155 70 175 30 190Z' fill='%23C9913A' opacity='0.07'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: contain;
          pointer-events: none;
          transform: rotate(15deg);
        }

        /* ── Coffee tree branch — desktop only ── */
        .hero-tree-branch {
          display: none;
          position: absolute;
          top: 0;
          right: -10% ;
          z-index: 6;
          pointer-events: none;
        }
        .hero-tree-branch img {
          width: clamp(280px, 32vw, 480px);
          height: auto;
          display: block;
          /* force the image to feel embedded in the dark bg */
          mix-blend-mode: luminosity;
          opacity: 0.72;
          filter: brightness(0.55) saturate(0.6);
        }
        /* Dark overlay that sits on top of the branch image itself */
        .hero-tree-branch::after {
          content: '';
          position: absolute;
          inset: 0;
          // background: linear-gradient(
          //   to left,
          //   rgba(13,11,8,0.0) 0%,
          //   rgba(13,11,8,0.55) 55%,
          //   rgba(13,11,8,0.88) 100%
          // );
          pointer-events: none;
        }
        [data-theme="light"] .hero-tree-branch img {
          mix-blend-mode: multiply;
          opacity: 0.55;
          filter: brightness(0.7) saturate(0.5);
        }
        [data-theme="light"] .hero-tree-branch::after {
          background: linear-gradient(
            to left,
            rgba(245,240,232,0.0) 0%,
            rgba(245,240,232,0.55) 55%,
            rgba(245,240,232,0.88) 100%
          );
        }

        /* ── Floating items — visible on ALL screen sizes ── */
        .hero-floating-layer {
          pointer-events: none;
          position: absolute;
          left: 0;
          right: 0;
          top: -40vh;
          height: 140vh;
          z-index: 8;
          overflow: hidden;
        }

        /* ── Directional overlay ── */
        .hero-overlay-dir {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(13,11,8,0.92) 0%,
            rgba(13,11,8,0.55) 45%,
            rgba(13,11,8,0.08) 100%
          );
          pointer-events: none;
        }
        [data-theme="light"] .hero-overlay-dir {
          background: linear-gradient(
            to right,
            rgba(245,240,232,0.96) 0%,
            rgba(245,240,232,0.65) 45%,
            rgba(245,240,232,0.1)  100%
          );
        }

        /* ── Bottom fade ── */
        .hero-fade-bottom {
          position: absolute;
          inset-inline: 0;
          bottom: 10px;
          height: 200px;
          background: linear-gradient(to top, var(--bg-primary, #080808), transparent);
          pointer-events: none;
          z-index: 5;
        }
        [data-theme="light"] .hero-fade-bottom {
          background: linear-gradient(to top, var(--color-rock-cream, #F5F0E8), transparent);
        }

        /* ── Script quote ── */
        .hero-quote {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(2rem, 10vw, 2.8rem);
          line-height: 1;
          color: var(--color-rock-gold, #C9913A);
          text-shadow: 0 2px 32px rgba(201,145,58,0.22);
        }
        .hero-quote-ar {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(1.8rem, 8vw, 2.8rem);
          line-height: 1.5;
          color: var(--color-rock-gold, #C9913A);
          text-shadow: 0 2px 32px rgba(201,145,58,0.22);
          unicode-bidi: plaintext;
        }
        [data-theme="light"] .hero-quote,
        [data-theme="light"] .hero-quote-ar {
          color: var(--color-rock-amber, #D4872A);
          text-shadow: 0 2px 16px rgba(212,135,42,0.18);
        }

        /* ── Sub text ── */
        .hero-sub {
          font-family: var(--font-body, 'Barlow', sans-serif);
          font-size: 0.9rem;
          line-height: 1.4;
          color: var(--text-muted, #8A8580);
          max-width: 390px;
          white-space: pre-line;
          unicode-bidi: plaintext;
        }
        [data-theme="light"] .hero-sub {
          color: var(--color-rock-ink-soft, #2D2B29);
        }

        /* ── Buttons ── */
        .hero-btns {
          display: flex;
          gap: 10px;
          width: 100%;
          max-width: 380px;
        }
        .hero-btn-primary {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          background: rgba(201,145,58,0.1);
          border: 1.5px solid rgba(201,145,58,0.45);
          color: var(--color-rock-gold-light, #E8B86D);
          padding: 13px 12px;
          font-family: var(--font-display, 'Bebas Neue', sans-serif);
          font-size: 0.92rem;
          letter-spacing: 0.12em;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s, box-shadow 0.25s;
          white-space: nowrap;
          text-transform: uppercase;
        }
        .hero-btn-primary:hover {
          background: rgba(201,145,58,0.22);
          border-color: var(--color-rock-gold, #C9913A);
          box-shadow: 0 0 20px rgba(201,145,58,0.28);
        }
        [data-theme="light"] .hero-btn-primary {
          background: rgba(201,145,58,0.12);
          color: var(--color-rock-amber, #D4872A);
          border-color: rgba(212,135,42,0.5);
        }
        .hero-btn-ghost {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          background: transparent;
          border: 1.5px solid var(--border-strong, rgba(255,255,255,0.22));
          color: var(--text-secondary, #D4CFC8);
          padding: 13px 12px;
          font-family: var(--font-display, 'Bebas Neue', sans-serif);
          font-size: 0.92rem;
          letter-spacing: 0.12em;
          border-radius: 4px;
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
          white-space: nowrap;
          text-transform: uppercase;
        }
        .hero-btn-ghost:hover {
          border-color: var(--color-rock-gold, #C9913A);
          color: var(--color-rock-gold-light, #E8B86D);
          background: rgba(201,145,58,0.06);
        }
        [data-theme="light"] .hero-btn-ghost {
          border-color: rgba(28,26,24,0.25);
          color: var(--color-rock-ink, #1C1A18);
        }
        [data-theme="light"] .hero-btn-ghost:hover {
          border-color: var(--color-rock-amber, #D4872A);
          color: var(--color-rock-amber, #D4872A);
        }

        /* ── Sidebar pill ── */
        .sidebar-pill {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 40px;
          padding: 12px 7px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(8px);
        }
        [data-theme="light"] .sidebar-pill {
          background: rgba(28,26,24,0.05);
          border-color: rgba(28,26,24,0.13);
        }
        .sidebar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
        }
        .sidebar-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-family: var(--font-body, 'Barlow', sans-serif);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted, #8A8580);
          white-space: nowrap;
        }
        [data-theme="light"] .sidebar-text {
          color: var(--color-rock-ink-soft, #2D2B29);
        }

        /* ── Lid ── */
        .lid {
          transition: transform .55s cubic-bezier(.34,1.56,.64,1);
          position: relative;
          z-index: 10;
        }
        .lid-normal  { transform: translateY(160px) scale(.58) translateX(-16px); }
        .lid-hovered { transform: translateY(130px) scale(.60) translateX(20px) rotate(5deg); }
        @media (max-width: 640px) {
          .lid-normal  { transform: translateY(85px) scale(.58) translateX(-10px); }
          .lid-hovered { transform: translateY(70px) scale(.60) translateX(11px) rotate(5deg); }
        }

        /* ── Features ── */
        .features-section {
          background-color: var(--bg-secondary, #111111);
          transition: background-color 0.3s ease;
        }
        [data-theme="light"] .features-section {
          background-color: var(--color-rock-linen, #EDE6D8);
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .features-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .feature-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 52px 24px;
          border: 1px solid rgba(201,145,58,0.12);
          transition: background 0.25s;
          text-align: center;
        }
        [data-theme="light"] .feature-cell { border-color: rgba(201,145,58,0.22); }
        .feature-cell:hover { background: rgba(201,145,58,0.04); }
        .feature-icon-ring {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 1.5px solid rgba(201,145,58,0.40);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-rock-gold, #C9913A);
          background: rgba(201,145,58,0.10);
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .feature-cell:hover .feature-icon-ring {
          border-color: var(--color-rock-gold, #C9913A);
          box-shadow: 0 0 20px rgba(201,145,58,0.22);
        }
        [data-theme="light"] .feature-icon-ring {
          color: var(--color-rock-amber, #D4872A);
          border-color: rgba(212,135,42,0.35);
          background: rgba(212,135,42,0.08);
        }
        .feature-label {
          font-family: var(--font-body, 'Barlow', sans-serif);
          font-size: 15px;
          font-weight: 500;
          color: var(--color-rock-gold-light, #E8B86D);
          letter-spacing: 0.03em;
        }
        [data-theme="light"] .feature-label { color: var(--color-rock-amber, #D4872A); }

        /* ── Scroll indicator ── */
        .scroll-line {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, rgba(201,145,58,0.55), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        /* ══════════════════════════════════
           MOBILE (< 900px)
        ══════════════════════════════════ */
        .hero-mobile-cup-abs {
          display: block;
        }
        .hero-desktop-cup {
          display: none;
        }

        /* ══════════════════════════════════
           DESKTOP (≥ 900px)
        ══════════════════════════════════ */
        @media (min-width: 900px) {

          /* Show the tree branch on desktop */
          .hero-tree-branch {
            display: block !important;
          }

          .hero-mobile-cup-abs {
            display: none !important;
          }

          .hero-desktop-inner {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            height: 100svh !important;
            min-height: 100svh !important;
            padding-inline: clamp(60px, 6vw, 120px) !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          .hero-desktop-left {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: center !important;
            gap: 28px !important;
            max-width: 520px !important;
            text-align: left !important;
            position: relative;
            z-index: 11;
          }

          .hero-desktop-left .hero-quote,
          .hero-desktop-left .hero-quote-ar {
            font-size: clamp(2.8rem, 4.1vw, 4.2rem) !important;
            line-height: 1.9 !important;
            text-align: left !important;
          }

          .hero-desktop-left .hero-sub {
            font-size: 1rem !important;
            text-align: left !important;
            max-width: 440px !important;
          }

          .hero-desktop-left .hero-btns {
            width: auto !important;
            max-width: none !important;
          }
          .hero-desktop-left .hero-btn-primary,
          .hero-desktop-left .hero-btn-ghost {
            flex: 0 0 auto !important;
            padding: 14px 28px !important;
            font-size: 0.95rem !important;
          }

          .hero-mobile-spacer { display: none !important; }

          .hero-desktop-cup {
            display: block !important;
            position: absolute !important;
            right: 0 !important;
            bottom: 0 !important;
            z-index: 30 !important;
            pointer-events: auto !important;
          }

          .hero-desktop-cup-inner {
            position: relative;
            width: clamp(400px, 42vw, 340px);
            user-select: none;
            cursor: pointer;
          }

          .features-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
          .feature-cell {
            flex-direction: row !important;
            gap: 14px !important;
            padding: 28px 20px !important;
            text-align: left !important;
          }
          .feature-icon-ring {
            width: 52px !important;
            height: 52px !important;
            flex-shrink: 0 !important;
          }
          .feature-label {
            font-size: 13px !important;
            text-align: left !important;
          }
        }

          @media (min-width: 400px) {
.hero-tree-branch {
            display: block !important;
          }
      }
      `}</style>

      {/* ══════════════════════════════════
          HERO SECTION
      ══════════════════════════════════ */}
      <section
        id="home"
        style={{
          position: "relative",
          isolation: "isolate",
          minHeight: "100svh",
          overflow: "hidden",
          display: "flex",
          paddingBottom: "45px",
          flexDirection: "column",
        }}
      >
        {/* Organic warm background */}
        <div className="hero-bg" />

        {/* ══════════════════════════════════
            COFFEE TREE BRANCH — desktop only
            Sits behind the overlay so the dark
            gradient bleeds naturally over it.
        ══════════════════════════════════ */}
        <div className="hero-tree-branch">
          <img
            src="/coffeeTree2.webp"
            alt=""
          />
        </div>

        {/* Directional gradient veil — sits on top of tree branch */}
        <div className="hero-overlay-dir" />

        {/* Bottom fade */}
        <div className="hero-fade-bottom" />

        {/* ══════════════════════════════════
            FLOATING LEAVES & COFFEE BEANS
            Now rendered at section level so
            they appear on BOTH mobile & desktop
        ══════════════════════════════════ */}
        <div className="hero-floating-layer">
          {floatingItems.map((item, i) => (
            <img
              key={i}
              src={item.src}
              alt=""
              style={{
                position: "absolute",
                left: item.left,
                right:item.right,
                top: 0,
                width: item.size,
                opacity: item.opacity,
                "--r-start": `${item.rotate}deg`,
                "--r-end": `${item.rotateEnd}deg`,
                animation: `floatFall ${item.duration}s linear ${item.delay}s infinite, sway ${item.duration * 0.6}s ease-in-out ${item.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* ── CONTENT WRAPPER ── */}
        <div
          className="hero-desktop-inner"
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "100svh",
          }}
        >
          {/* ── LEFT / MAIN CONTENT ── */}
          <motion.div
            className="hero-desktop-left"
            variants={staggerContainer(0.2, 0.3)}
            initial="hidden"
            animate="visible"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            {/* QUOTE */}
            <motion.div
              variants={fadeUp}
              style={{
                paddingTop: "clamp(88px, 18vw, 130px)",
                paddingInline: "clamp(24px, 3vw, 72px)",
                textAlign: "center",
              }}
            >
              <h1 className={lang === "ar" ? "hero-quote-ar" : "hero-quote"}>
                {t.quote1}
                <br />
                {t.quote2}
              </h1>
            </motion.div>

            {/* SPACER (hidden on desktop) */}
            <div className="hero-mobile-spacer" style={{ flex: 1 }} />

            {/* SUB-COPY + BUTTONS */}
            <div
              style={{
                paddingBottom: "clamp(2px, 17vw, 10px)",
                paddingInline: "clamp(20px, 6vw, 40px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "18px",
                textAlign: "center",
              }}
            >
              {/* Sub text */}
              <motion.p className="hero-sub" variants={fadeUp}>
                {t.sub}
              </motion.p>

              {/* Buttons */}
              <motion.div className="hero-btns" variants={staggerContainer(0.15)}>
                <motion.button
                  className="hero-btn-primary"
                  variants={scaleIn}
                  whileHover={hoverScale}
                  onClick={handleExploreMenu}
                >
                  <span>{t.btnMenu}</span>
                  <ArrowRight size={16} strokeWidth={1.8} />
                </motion.button>

                <motion.a
                  className="hero-btn-ghost"
                  href="tel:+201023456789"
                  variants={scaleIn}
                  whileHover={hoverScale}
                >
                  <Phone size={14} strokeWidth={1.8} />
                  <span>{t.btnVisit}</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── SIDEBAR PILL ── */}
        <motion.div
          className="sidebar-pill"
          variants={fadeDown}
          initial="hidden"
          animate="visible"
        >
          <span className="sidebar-dot" />
          <span className="sidebar-text">{t.sidebarText}</span>
        </motion.div>

        {/* ══════════════════════════════════
            MOBILE CUP (< 900px) — UNCHANGED
            (floating items removed from here;
             they now live in hero-floating-layer above)
        ══════════════════════════════════ */}
        <div
          className="hero-mobile-cup-abs"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 30,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            style={{
              position: "absolute",
              right: "-20px",
              bottom: "110px",
              transform: "translate(5%, -22%)",
              pointerEvents: "auto",
            }}
          >
            {/* Floating loop wrapper */}
            <motion.div
              animate={floatLoop}
              onClick={() => setHovered((h) => !h)}
            >
              <div
                style={{
                  position: "relative",
                  width: "clamp(330px, 60vw, 400px)",
                  userSelect: "none",
                  cursor: "pointer",
                }}
              >
                {/* Smoke */}
                <div
                  style={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: "50px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 40,
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        position: "absolute",
                        width: `${20 + i * 6}px`,
                        height: `${20 + i * 6}px`,
                        left: `${i * 4}px`,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.2)",
                        filter: "blur(14px)",
                        animation: `smokeRise ${3 + i * 0.4}s ease-out ${i * 0.5}s infinite`,
                      }}
                    />
                  ))}
                </div>

                {/* Lid */}
                <div className={`lid ${hovered ? "lid-hovered" : "lid-normal"}`}>
                  <img
                    src="/cup2.webp"
                    alt=""
                    style={{ width: "100%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.55))" }}
                  />
                </div>

                {/* Cup body */}
                <div
                  style={{
                    transform: hovered
                      ? "rotate(4.5deg) translateY(-23px) scale(1.05)"
                      : "rotate(0deg) translateY(-24px)",
                    transition: "transform .55s cubic-bezier(.34,1.56,.64,1)",
                    marginTop: "-20px",
                    position: "relative",
                    zIndex: 5,
                  }}
                >
                  <img
                    src="/4.png"
                    alt=""
                    style={{ width: "100%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
                  />
                </div>

                {/* Gold glow */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "150px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "var(--color-rock-gold, #C9913A)",
                    opacity: 0.28,
                    filter: "blur(22px)",
                    zIndex: 1,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════
            DESKTOP CUP (≥ 900px)
        ══════════════════════════════════ */}
        <div className="hero-desktop-cup">
          <motion.div
            className="hero-desktop-cup-inner"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            onMouseEnter={() => setHovered((h) => !h)}
            onMouseLeave={() => setHovered((h) => !h)}
          >
            {/* Floating loop wrapper */}
            <motion.div animate={floatLoop}>
              {/* Smoke */}
              <div
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: "120px",
                  left: "20%",
                  transform: "translateX(-50%)",
                  zIndex: 40,
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      position: "absolute",
                      width: `${20 + i * 6}px`,
                      height: `${20 + i * 6}px`,
                      left: `${i * 4}px`,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      filter: "blur(14px)",
                      animation: `smokeRise ${3 + i * 0.4}s ease-out ${i * 0.5}s infinite`,
                    }}
                  />
                ))}
              </div>

              {/* Lid */}
              <div className={`lid ${hovered ? "lid-hovered" : "lid-normal"}`}>
                <img
                  src="/cup2.webp"
                  alt=""
                  style={{ width: "100%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.55))" }}
                />
              </div>

              {/* Cup body */}
              <div
                style={{
                  transform: hovered
                    ? "rotate(5deg) translateY(8px) scale(1.04)"
                    : "rotate(0deg)",
                  transition: "transform .55s cubic-bezier(.34,1.56,.64,1)",
                  marginTop: "-20px",
                  position: "relative",
                  zIndex: 5,
                }}
              >
                <img
                  src="/4.png"
                  alt=""
                  style={{ width: "100%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
                />
              </div>

              {/* Gold glow */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "200px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--color-rock-gold, #C9913A)",
                  opacity: 0.28,
                  filter: "blur(28px)",
                  zIndex: 1,
                }}
              />
            </motion.div>
          </motion.div>
        </div>

      </section>
    </>
  );
}