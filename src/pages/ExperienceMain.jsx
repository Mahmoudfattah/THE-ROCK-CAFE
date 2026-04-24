import { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useLang } from "../context/Context";

// ─── Photos per section (each has its own set) ───────────────────────────────
const SECTION_PHOTOS = {
  cozy: [
    { src: "/20.webp", alt: { en: "Cozy seating",    ar: "جلسات مريحة"   } },
    { src: "/22.webp", alt: { en: "Warm lighting",   ar: "إضاءة دافئة"   } },
    { src: "/11.webp", alt: { en: "Lounge area",     ar: "منطقة الاسترخاء" } },
    { src: "/23.webp", alt: { en: "Indoor plants",   ar: "نباتات داخلية"  } },
    { src: "/13.webp", alt: { en: "Corner table",    ar: "طاولة الزاوية"  } },
    { src: "/22.webp", alt: { en: "Evening ambiance",ar: "أجواء المساء"   } },
  ],
  specialty: [
    { src: "/17.webp", alt: { en: "Coffee brewing",  ar: "تحضير القهوة"   } },
    { src: "/9.webp", alt: { en: "Latte art",       ar: "فن اللاتيه"    } },
    { src: "/14.webp", alt: { en: "Arabic coffee",   ar: "قهوة عربية"    } },
    { src: "/15.webp", alt: { en: "Barista at work", ar: "البريستا"       } },
    { src: "/19.webp", alt: { en: "Iced drinks",     ar: "مشروبات باردة" } },
    { src: "/18.webp", alt: { en: "Espresso shot",   ar: "إسبريسو"       } },
  ],
  pastries: [
    { src: "/37.webp", alt: { en: "Fresh pastries",   ar: "معجنات طازجة"   } },
    { src: "/12.webp", alt: { en: "Cakes display",    ar: "عرض الكيك"     } },
    { src: "/21.webp", alt: { en: "Dessert plating",  ar: "تقديم الحلويات" } },
    { src: "/5.webp", alt: { en: "Croissants",       ar: "كرواسون"       } },
    { src: "/8.webp", alt: { en: "Morning bakery",   ar: "مخبوزات الصباح" } },
    { src: "/10.webp", alt: { en: "Cookies",          ar: "كوكيز"         } },
  ],
  work: [
    { src: "/4.jpg", alt: { en: "Work desk",       ar: "طاولة عمل"       } },
    { src: "/6.webp", alt: { en: "Study area",      ar: "منطقة دراسة"    } },
    { src: "/7.webp", alt: { en: "Laptop corner",   ar: "ركن اللابتوب"   } },
    // { src: "/7.webp", alt: { en: "Community table", ar: "طاولة مشتركة"   } },
    { src: "/33.webp", alt: { en: "Power outlets",   ar: "منافذ كهرباء"   } },
    { src: "/34.webp", alt: { en: "Quiet zone",      ar: "منطقة هادئة"    } },
  ],
};

const ITEMS = [
  {
    id: "cozy",
    title: { en: "COZY ATMOSPHERE", ar: "أجواء دافئة" },
    desc:  { en: "Relax in our warm and inviting space", ar: "استرخِ في مساحتنا الدافئة والمريحة" },
  },
  {
    id: "specialty",
    title: { en: "SPECIALTY COFFEE", ar: "قهوة مختصة" },
    desc:  { en: "Premium roasted beans from around the world", ar: "حبوب مختارة بعناية من أجود مزارع العالم" },
  },
  {
    id: "pastries",
    title: { en: "FRESH PASTRIES", ar: "معجنات طازجة" },
    desc:  { en: "Delicious baked goods made daily", ar: "مخبوزات شهية يومية بأيدٍ متخصصة" },
  },
  {
    id: "work",
    title: { en: "WORK & STUDY", ar: "عمل ودراسة" },
    desc:  { en: "Perfect spot for productivity and focus", ar: "بيئة مثالية للإنتاجية والتركيز" },
  },
];

// ─── Marquee — uses inline style for direction so it reacts to lang changes ──
function Marquee({ photos, lang, isRTL }) {
  // Duplicate for seamless loop
  const track = [...photos, ...photos];

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        minHeight: 0,
        direction: "ltr", // 👈 مهم جداً
      }}
      className="exp-marquee-clip"
    >
      {/* Edge fades — inline so they respond to RTL/LTR instantly */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to ${isRTL ? "left" : "right"}, var(--exp-bg) 0%, transparent 8%, transparent 92%, var(--exp-bg) 100%)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div
        className="exp-track"
       style={{
  animationName: "marqueeToLeft",
}}
      >
        {track.map((photo, idx) => (
          <PhotoSlide
            key={idx}
            src={photo.src}
            alt={photo.alt[lang] ?? photo.alt.en}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ExperienceMain() {
  const [openId, setOpenId] = useState(null);
  const { lang } = useLang();
  const isRTL = lang === "ar";

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&display=swap');

        /* ── CSS variable so edge fades always match bg ── */
        .exp-section                         { --exp-bg: #0A0806; }
        [data-theme="light"] .exp-section    { --exp-bg: #F2EDE4; }

        .exp-section {
          background-color: var(--exp-bg);
          padding-bottom: 80px;
          overflow: hidden;
          transition: background-color 0.45s ease;
        }

        /* ── Heading ── */
        .exp-heading {
          text-align: center;
          padding: clamp(52px,9vw,88px) 24px clamp(36px,5vw,60px);
          font-size: clamp(2.4rem,8vw,5rem);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: 0.05em;
          color: #F0E8DC;
          position: relative;
          transition: color 0.45s ease;
        }
        .exp-heading.is-rtl {
          font-family: 'Tajawal', sans-serif;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: 0;
        }
        [data-theme="light"] .exp-heading { color: #1C1A18; }
        .exp-heading::after {
          content: '';
          display: block;
          width: 44px; height: 2px;
          background: #C8151B;
          margin: 18px auto 0;
        }

        /* ── List ── */
        .exp-list {
          list-style: none; margin: 0; padding: 0;
          border-top: 1px solid rgba(201,145,58,.16);
        }
        [data-theme="light"] .exp-list { border-top-color: rgba(201,145,58,.26); }

        /* ── Item ── */
        .exp-item {
          border-bottom: 1px solid rgba(201,145,58,.16);
          transition: background 0.45s ease;
        }
        [data-theme="light"] .exp-item { border-bottom-color: rgba(201,145,58,.26); }
        .exp-item.is-open { background: rgba(201,145,58,.032); }
        [data-theme="light"] .exp-item.is-open { background: rgba(201,145,58,.055); }

        /* ── Row ── */
        .exp-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          align-items: center;
          gap: 16px;
          padding: clamp(22px,4vw,38px) clamp(20px,5vw,60px);
          cursor: pointer;
          user-select: none;
          outline: none;
          transition: background 0.35s ease;
        }
        .exp-row:hover { background: rgba(201,145,58,.042); }
        .exp-row:focus-visible { outline: 2px solid rgba(201,145,58,.5); outline-offset: -2px; }

        @media (max-width: 600px) {
          .exp-row { grid-template-columns: 1fr auto; gap: 12px; padding: 22px 20px; }
          .exp-desc-desktop { display: none !important; }
        }
        @media (min-width: 601px) {
          .exp-desc-mobile-wrap { display: none !important; }
        }

        /* ── Title ── */
        .exp-title {
          font-size: clamp(1.45rem,4vw,2.65rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: 0.04em;
          color: #F0E8DC;
          transition: color 0.35s ease;
        }
        .exp-title.is-rtl {
          font-family: 'Tajawal', sans-serif;
          font-weight: 500;
          letter-spacing: 0;
        }
        [data-theme="light"] .exp-title { color: #1C1A18; }
        .exp-item.is-open .exp-title,
        .exp-row:hover .exp-title { color: #C9913A; }

        /* ── Desktop desc ── */
        .exp-desc-desktop {
          font-size: clamp(.83rem,1.8vw,.97rem);
          color: #7A7470;
          font-weight: 500;
          line-height: 1.65;
          text-align: center;
          transition: color 0.35s ease;
        }
        [data-theme="light"] .exp-desc-desktop { color: #4A4542; }

        /* ── Mobile desc slide ── */
        .exp-desc-mobile-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition:
            grid-template-rows .5s cubic-bezier(.4,0,.2,1),
            opacity .4s ease,
            padding .5s ease;
          opacity: 0;
          overflow: hidden;
          padding: 0 20px;
        }
        .exp-desc-mobile-wrap > span { overflow: hidden; display: block; }
        .exp-item.is-open .exp-desc-mobile-wrap {
          grid-template-rows: 1fr;
          opacity: 1;
          padding: 0 20px 18px;
        }
        .exp-desc-mobile-text {
          font-size: .88rem;
          color: #7A7470;
          line-height: 1.6;
        }
        [data-theme="light"] .exp-desc-mobile-text { color: #4A4542; }

        /* ── Toggle btn ── */
        .exp-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(201,145,58,.34);
          background: transparent;
          color: #C8151B;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition:
            background .35s ease,
            border-color .35s ease,
            transform .5s cubic-bezier(.34,1.56,.64,1),
            box-shadow .35s ease;
        }
        .exp-btn:hover {
          background: rgba(201,145,58,.1);
          border-color: #C8151B;
          box-shadow: 0 0 16px rgba(201,145,58,.22);
        }
        .exp-item.is-open .exp-btn {
          background: rgba(201,145,58,.12);
          border-color: #C8151B;
          transform: rotate(135deg);
          box-shadow: 0 0 20px rgba(201,145,58,.26);
        }
        [data-theme="light"] .exp-btn { color: #C8151B; border-color: rgba(212,135,42,.34); }

        /* ── Marquee wrapper ── */
        .exp-marquee-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows .7s cubic-bezier(.4,0,.2,1);
          overflow: hidden;
        }
        .exp-item.is-open .exp-marquee-wrap { grid-template-rows: 1fr; }

        /* ── Track animations ── */
        @keyframes marqueeToLeft  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }


        .exp-track {
          display: flex;
          gap: 14px;
          padding: 20px 0 26px;
          width: max-content;
          will-change: transform;
          animation-duration: 42s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          /* animationName set inline per-lang */
        }
        .exp-marquee-clip:hover .exp-track { animation-play-state: paused; }

        /* ── Photo card ── */
        .exp-photo {
          flex-shrink: 0;
          width: clamp(185px,27vw,315px);
          height: clamp(122px,18vw,205px);
          object-fit: cover;
          border-radius: 0px;
          filter: brightness(.80) saturate(.82);
          display: block;
          cursor: pointer;
          transition:
            filter .55s ease,
            transform .55s cubic-bezier(.4,0,.2,1),
            box-shadow .55s ease;
        }
        .exp-photo:hover {
          filter: brightness(1.04) saturate(1.1);
          transform: scale(1.038) translateY(-4px);
          box-shadow: 0 18px 40px rgba(0,0,0,.5), 0 0 0 1.5px rgba(201,145,58,.32);
        }

        /* ── Fallback ── */
        .exp-photo-fallback {
          flex-shrink: 0;
          width: clamp(185px,27vw,315px);
          height: clamp(122px,18vw,205px);
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(201,145,58,.1) 0%, rgba(184,28,28,.06) 100%);
          border: 1px solid rgba(201,145,58,.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          letter-spacing: .12em;
          color: rgba(201,145,58,.42);
          text-transform: uppercase;
        }
      `}</style>

      <section
        className="exp-section"
        id="exp-section"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Heading */}
        <h2 className={`exp-heading${isRTL ? " is-rtl" : ""}`}>
          {isRTL
            ? <><span>تجربة</span><br /><span>مكاننا</span></>
            : <><span>EXPERIENCE</span><br /><span>OUR SPACE</span></>
          }
        </h2>

        {/* Accordion */}
        <ul className="exp-list">
          {ITEMS.map((item) => {
            const isOpen  = openId === item.id;
            const title   = item.title[lang] ?? item.title.en;
            const desc    = item.desc[lang]  ?? item.desc.en;
            const photos  = SECTION_PHOTOS[item.id];   // ← each section gets its own photos

            return (
              <li
                key={item.id}
                className={`exp-item${isOpen ? " is-open" : ""}`}
              >
                {/* Row */}
                <div
                  className="exp-row"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggle(item.id)}
                  onKeyDown={(e) => e.key === "Enter" && toggle(item.id)}
                >
                  <span className={`exp-title${isRTL ? " is-rtl" : ""}`}>{title}</span>
                  <span className="exp-desc-desktop">{desc}</span>
                  <button
                    className="exp-btn"
                    aria-label={isOpen ? (isRTL ? "إغلاق" : "Close") : (isRTL ? "فتح" : "Open")}
                    onClick={(e) => { e.stopPropagation(); toggle(item.id); }}
                  >
                    {isOpen
                      ? <Plus    size={17} strokeWidth={1.8} />
                      : <Plus size={17} strokeWidth={1.8} />
                    }
                  </button>
                </div>

                {/* Mobile desc */}
                <div className="exp-desc-mobile-wrap">
                  <span>
                    <span
                      className="exp-desc-mobile-text"
                      style={{ textAlign: isRTL ? "right" : "left" }}
                    >
                      {desc}
                    </span>
                  </span>
                </div>

                {/* Marquee — receives its own photos + current lang */}
                <div className="exp-marquee-wrap">
                  <Marquee photos={photos} lang={lang} isRTL={isRTL} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

// ─── Photo slide with error fallback ─────────────────────────────────────────
function PhotoSlide({ src, alt }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return <div className="exp-photo-fallback"><span>{alt}</span></div>;
  }
  return (
    <img
      className="exp-photo"
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      loading="lazy"
      draggable={false}
    />
  );
}