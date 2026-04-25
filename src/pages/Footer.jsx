import { useState } from "react";
import { useLang } from "../context/Context";
import {
  MapPin, Phone, Mail, Facebook, Instagram, Star,
  ChevronLeft, ChevronRight,
} from "lucide-react";

/* ─── TikTok icon (not in lucide) ────────────────────────────────────────── */
function TikTokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

/* ─── Data ────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { en: "Home",       ar: "الرئيسية",    href: "#home"       },
  { en: "Menu",       ar: "القائمة",     href: "#menu"       },
  { en: "Experience", ar: "تجربة مكاننا", href: "#exp-section"},
  { en: "Contact",    ar: "تواصل معنا",   href: "#contact"    },
];


const CONTACT = {
  address: {
    en: "Abu AR Rish Qebli, Aswan (Near Nile Corniche)",
    ar: "أبو الريش قبلي، أسوان (قريب من كورنيش النيل)",
  },
  phone: {en: "+20 102 345 6789",
    ar:'+٢٠ ١٠٢ ٣٤٥ ٦٧٨٩',
  },
  email: "info@therockaswan.com",
};

const REVIEWS = [
  {
    name: { en: "Ahmed Hassan", ar: "أحمد حسن" },
    date: { en: "March 2026", ar: "مارس ٢٠٢٦" },
    stars: 5,
    text: {
      en: "One of the best cafes in Aswan. The calm atmosphere and proximity to the Nile make it a perfect place to relax.",
      ar: "من أفضل الكافيهات في أسوان. الجو هادي وقربه من النيل بيخليه مكان مثالي للاسترخاء.",
    },
  },
  {
    name: { en: "Sarah Williams", ar: "سارة ويليامز" },
    date: { en: "February 2026", ar: "فبراير ٢٠٢٦" },
    stars: 5,
    text: {
      en: "Great desserts and very friendly staff. I visited twice during my trip to Aswan.",
      ar: "الحلويات رائعة والموظفين ودودين جداً. رجعت له مرتين خلال رحلتي في أسوان.",
    },
  },
  {
    name: { en: "Mohamed Adel", ar: "محمد عادل" },
    date: { en: "January 2026", ar: "يناير ٢٠٢٦" },
    stars: 4,
    text: {
      en: "Nice place to sit with friends. Coffee quality is really good and the vibe is chill.",
      ar: "مكان جميل للقعدة مع الأصحاب. القهوة ممتازة والجو مريح.",
    },
  },
  {
    name: { en: "Lina Farouk", ar: "لينا فاروق" },
    date: { en: "December 2025", ar: "ديسمبر ٢٠٢٥" },
    stars: 4,
    text: {
      en: "Lovely atmosphere especially at night. Music and lighting create a cozy experience.",
      ar: "الجو جميل خصوصًا بالليل. الإضاءة والموسيقى عاملين تجربة دافئة.",
    },
  },
  {
    name: { en: "Omar Tarek", ar: "عمر طارق" },
    date: { en: "November 2025", ar: "نوفمبر ٢٠٢٥" },
    stars: 5,
    text: {
      en: "Perfect spot near the Nile to relax after a long day. Highly recommended.",
      ar: "مكان مثالي قريب من النيل للاسترخاء بعد يوم طويل. أنصح به جداً.",
    },
  },
];

/* ─── Star row ────────────────────────────────────────────────────────────── */
function Stars({ count }) {
  return (
    <span style={{ display: "inline-flex", gap: "3px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < count ? "#C9913A" : "none"}
          stroke={i < count ? "#C9913A" : "rgba(201,145,58,.35)"}
          strokeWidth={1.6}
        />
      ))}
    </span>
  );
}

/* ─── Reviews Carousel ────────────────────────────────────────────────────── */
function ReviewsSection({ lang, isRTL }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p === 0 ? REVIEWS.length - 1 : p - 1));
  const next = () => setActive((p) => (p === REVIEWS.length - 1 ? 0 : p + 1));

  const review = REVIEWS[active];

  return (
    <section className="rev-section" dir={isRTL ? "rtl" : "ltr"}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&display=swap');

        .rev-section {
          background-color: #0D0B09;
          padding: clamp(64px,10vw,100px) clamp(20px,6vw,80px);
          overflow: hidden;
          position: relative;
          transition: background-color .45s ease;
        }
        [data-theme="light"] .rev-section { background-color: #F5EFE6; }

        /* Decorative quote mark */
        .rev-section::before {
          content: '"';
          position: absolute;
          top: -20px;
          ${isRTL ? "left: 5%;" : "right: 5%;"}
          font-size: clamp(180px, 22vw, 280px);
          line-height: 1;
          font-family: Georgia, serif;
          color: rgba(201,145,58,.06);
          pointer-events: none;
          user-select: none;
        }

        .rev-label {
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-display, 'Bebas Neue', sans-serif)"};
          font-size: clamp(.7rem,.9vw,.82rem);
          font-weight: ${isRTL ? "700" : "400"};
          letter-spacing: ${isRTL ? ".05em" : ".22em"};
          color: #C9913A;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .rev-heading {
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-display, 'Bebas Neue', sans-serif)"};
          font-size: clamp(2rem,5vw,3.8rem);
          font-weight: ${isRTL ? "800" : "400"};
          line-height: ${isRTL ? "1.2" : "0.95"};
          letter-spacing: ${isRTL ? "0" : ".05em"};
          color: #F0E8DC;
          margin: 0 0 clamp(36px,6vw,60px);
          transition: color .45s ease;
        }
        [data-theme="light"] .rev-heading { color: #1C1A18; }

        /* Card */
        .rev-card {
          max-width: 780px;
          margin: 0 auto;
          padding: clamp(28px,5vw,52px) clamp(24px,5vw,52px);
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(201,145,58,.14);
          border-radius: 4px;
          position: relative;
          transition: background .45s ease, border-color .45s ease;
        }
        [data-theme="light"] .rev-card {
          background: rgba(255,255,255,.7);
          border-color: rgba(201,145,58,.22);
          box-shadow: 0 8px 40px rgba(0,0,0,.06);
        }

        /* Gold top bar */
        .rev-card::before {
          content: '';
          position: absolute;
          top: 0;
          ${isRTL ? "right: 0;" : "left: 0;"}
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, #C9913A 0%, transparent 100%);
          border-radius: 4px 0 0 4px;
        }

        .rev-stars { margin-bottom: 18px; }

        .rev-text {
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-body, 'Barlow', sans-serif)"};
          font-size: clamp(.95rem,1.6vw,1.12rem);
          line-height: 1.75;
          color: #B0A89E;
          margin: 0 0 24px;
          font-style: italic;
          transition: color .45s ease;
        }
        [data-theme="light"] .rev-text { color: #4A4542; }

        .rev-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rev-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #C9913A 0%, #B81C1C 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-display, 'Bebas Neue', sans-serif)"};
          font-size: 1rem;
          color: #0A0806;
          font-weight: 700;
          flex-shrink: 0;
        }
        .rev-name {
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-display, 'Bebas Neue', sans-serif)"};
          font-size: clamp(.95rem,1.4vw,1.1rem);
          letter-spacing: ${isRTL ? "0" : ".06em"};
          font-weight: ${isRTL ? "700" : "400"};
          color: #F0E8DC;
          transition: color .45s ease;
        }
        [data-theme="light"] .rev-name { color: #1C1A18; }
        .rev-date {
          font-size: .78rem;
          color: #7A7470;
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-body, 'Barlow', sans-serif)"};
        }

        /* Controls */
        .rev-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: clamp(28px,4vw,40px);
        }
        .rev-arrow {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(201,145,58,.3);
          background: transparent;
          color: #C9913A;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background .3s ease, border-color .3s ease, transform .3s ease;
        }
        .rev-arrow:hover {
          background: rgba(201,145,58,.1);
          border-color: #C9913A;
          transform: scale(1.08);
        }

        /* Dots */
        .rev-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .rev-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(201,145,58,.25);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background .3s ease, transform .3s ease;
        }
        .rev-dot.active {
          background: #C9913A;
          transform: scale(1.5);
        }

        /* Rating summary bar */
        .rev-summary {
          display: flex;
          align-items: center;
          gap: clamp(12px,3vw,28px);
          justify-content: center;
          margin-bottom: clamp(36px,5vw,56px);
          flex-wrap: wrap;
        }
        .rev-big-score {
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-display, 'Bebas Neue', sans-serif)"};
          font-size: clamp(3rem,7vw,5.5rem);
          font-weight: ${isRTL ? "800" : "400"};
          line-height: 1;
          color: #C9913A;
        }
        .rev-summary-right { display: flex; flex-direction: column; gap: 6px; }
        .rev-summary-stars { display: flex; gap: 4px; }
        .rev-summary-label {
          font-size: .8rem;
          color: #7A7470;
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-body, 'Barlow', sans-serif)"};
        }
        .rev-divider {
          width: 1px; height: clamp(40px,6vw,72px);
          background: rgba(201,145,58,.18);
        }

        @media (max-width: 480px) {
          .rev-divider { display: none; }
          .rev-summary { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <div className="rev-label">
        {isRTL ? "آراء عملائنا" : "Customer Reviews"}
      </div>

      <h2 className="rev-heading">
        {isRTL ? <><span>ماذا يقول</span><br /><span>ضيوفنا</span></> : <><span>WHAT OUR</span><br /><span>GUESTS SAY</span></>}
      </h2>

      {/* Rating summary */}
      <div className="rev-summary">
        <span className="rev-big-score">4.3</span>
        <div className="rev-divider" />
        <div className="rev-summary-right">
          <div className="rev-summary-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="#C9913A" stroke="#C9913A" strokeWidth={1.4} />
            ))}
          </div>
          <span className="rev-summary-label">
            {isRTL ? "بناءً على ١٢٠+ تقييم" : "Based on 120+ reviews"}
          </span>
        </div>
      </div>

      {/* Card */}
      <div className="rev-card">
        <div className="rev-stars"><Stars count={review.stars} /></div>
        <p className="rev-text">"{review.text[lang] ?? review.text.en}"</p>
        <div className="rev-meta">
          <div className="rev-avatar">
            {(review.name[lang] ?? review.name.en).charAt(0)}
          </div>
          <div>
            <div className="rev-name">{review.name[lang] ?? review.name.en}</div>
            <div className="rev-date">{review.date[lang] ?? review.date.en}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="rev-controls">
        <button className="rev-arrow" onClick={isRTL ? next : prev} aria-label="Previous">
         { isRTL ? <ChevronRight size={18} strokeWidth={1.8} /> : <ChevronLeft size={18} strokeWidth={1.8} /> }
        </button>
        <div className="rev-dots">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`rev-dot${i === active ? " active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
        <button className="rev-arrow" onClick={isRTL ? prev : next} aria-label="Next">
          { isRTL ? <ChevronLeft size={18} strokeWidth={1.8} /> : <ChevronRight size={18} strokeWidth={1.8} /> }
        </button>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
function Footer({ lang, isRTL }) {
  return (
    <footer className="ft-footer" id='contact' dir={isRTL ? "rtl" : "ltr"}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&display=swap');

        .ft-footer {
          background-color: #070504;
          color: #F0E8DC;
          padding: clamp(52px,8vw,88px) clamp(20px,6vw,80px) 0;
          transition: background-color .45s ease, color .45s ease;
          border-top: 1px solid rgba(201,145,58,.12);
        }
        [data-theme="light"] .ft-footer {
          background-color: #1C1A18;
          color: #F0E8DC;
        }

        /* Top grid */
        .ft-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.4fr;
          gap: clamp(32px,5vw,72px);
          padding-bottom: clamp(44px,7vw,72px);
          border-bottom: 1px solid rgba(201,145,58,.1);
        }
        @media (max-width: 700px) {
          .ft-grid { grid-template-columns: 1fr; gap: 36px; }
        }

        /* Brand col */
        .ft-brand-logo {
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-display, 'Bebas Neue', sans-serif)"};
          font-size: clamp(1.8rem,4vw,2.6rem);
          font-weight: ${isRTL ? "800" : "400"};
          letter-spacing: ${isRTL ? "0" : ".08em"};
          color: #F0E8DC;
          margin: 0 0 6px;
          line-height: 1;
        }
        .ft-brand-sub {
          font-size: .75rem;
          letter-spacing: .18em;
          color: #C9913A;
          text-transform: uppercase;
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-body, 'Barlow', sans-serif)"};
          margin-bottom: 20px;
        }
        .ft-divider-gold {
          width: 36px; height: 1.5px;
          background: #C9913A;
          margin-bottom: 18px;
        }
        .ft-brand-desc {
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-body, 'Barlow', sans-serif)"};
          font-size: clamp(.82rem,1.4vw,.92rem);
          line-height: 1.75;
          color: #7A7470;
          margin-bottom: 26px;
          max-width: 280px;
        }

        /* Socials */
        .ft-socials { display: flex; gap: 12px; }
        .ft-social {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1.5px solid rgba(201,145,58,.28);
          display: flex; align-items: center; justify-content: center;
          color: #C9913A;
          cursor: pointer;
          background: transparent;
          text-decoration: none;
          transition: background .3s ease, border-color .3s ease, transform .3s cubic-bezier(.34,1.56,.64,1);
        }
        .ft-social:hover {
          background: rgba(201,145,58,.1);
          border-color: #C9913A;
          transform: translateY(-3px) scale(1.05);
        }

        /* Column headings */
        .ft-col-title {
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-display, 'Bebas Neue', sans-serif)"};
          font-size: clamp(.85rem,1.3vw,1rem);
          letter-spacing: ${isRTL ? ".04em" : ".18em"};
          font-weight: ${isRTL ? "700" : "400"};
          color: #F0E8DC;
          margin: 0 0 16px;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 14px;
        }
        .ft-col-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          ${isRTL ? "right: 0;" : "left: 0;"}
          width: 24px; height: 1.5px;
          background: #C9913A;
        }

        /* Nav links */
        .ft-nav { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 11px; }
        .ft-nav a {
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-body, 'Barlow', sans-serif)"};
          font-size: clamp(.82rem,1.3vw,.92rem);
          color: #7A7470;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color .3s ease, gap .3s ease;
        }
        .ft-nav a:hover { color: #C9913A; gap: 12px; }
        .ft-nav-arrow {
          font-size: .65rem;
          opacity: 0;
          transition: opacity .3s ease;
          color: #C9913A;
        }
        .ft-nav a:hover .ft-nav-arrow { opacity: 1; }

        /* Contact */
        .ft-contact { display: flex; flex-direction: column; gap: 14px; }
        .ft-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-body, 'Barlow', sans-serif)"};
          font-size: clamp(.8rem,1.3vw,.9rem);
          color: #7A7470;
          text-decoration: none;
          transition: color .3s ease;
        }
        .ft-contact-row:hover { color: #C9913A; }
        .ft-contact-icon {
          color: #C9913A;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Bottom bar */
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 0;
          gap: 16px;
          flex-wrap: wrap;
        }
        .ft-copy {
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-body, 'Barlow', sans-serif)"};
          font-size: .76rem;
          color: #4A4542;
          letter-spacing: .04em;
        }
        .ft-copy span { color: #C9913A; }
        .ft-bottom-links {
          display: flex;
          gap: 20px;
        }
        .ft-bottom-links a {
          font-family: ${isRTL ? "'Tajawal', sans-serif" : "var(--font-body, 'Barlow', sans-serif)"};
          font-size: .73rem;
          color: #4A4542;
          text-decoration: none;
          letter-spacing: .04em;
          transition: color .3s ease;
        }
        .ft-bottom-links a:hover { color: #C9913A; }
      `}</style>

      <div className="ft-grid">

        {/* ── Brand ── */}
        <div>
          <p className="ft-brand-logo">THE ROCK CAFE</p>

<p className="ft-brand-sub">
  {isRTL ? "قهوة مختصة • حلويات • أجواء على النيل" : "Specialty Coffee • Desserts • Nile Vibes"}
</p>

<div className="ft-divider-gold" />

<p className="ft-brand-desc">
  {isRTL
    ? "في قلب أسوان، يقدم The Rock Cafe تجربة فريدة تجمع بين القهوة المختصة، الحلويات الطازجة، وأجواء هادئة بالقرب من النيل. المكان المثالي للاسترخاء أو قضاء وقت مميز مع الأصدقاء."
    : "In the heart of Aswan, The Rock Cafe offers a unique experience blending specialty coffee, fresh desserts, and a relaxed atmosphere near the Nile. The perfect spot to unwind or enjoy time with friends."
  }
</p>
          <div className="ft-socials">
            <a href="#" className="ft-social" aria-label="Facebook">
              <Facebook size={15} strokeWidth={1.8} />
            </a>
            <a href="#" className="ft-social" aria-label="Instagram">
              <Instagram size={15} strokeWidth={1.8} />
            </a>
            <a href="#" className="ft-social" aria-label="TikTok">
              <TikTokIcon size={15} />
            </a>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h3 className="ft-col-title">
            {isRTL ? "روابط سريعة" : "Quick Links"}
          </h3>
          <ul className="ft-nav">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>
                  {isRTL ? "" : <span className="ft-nav-arrow">→</span>}
                  {link[lang] ?? link.en}
                  {isRTL && <span className="ft-nav-arrow">←</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div>
          <h3 className="ft-col-title">
            {isRTL ? "تواصل معنا" : "Contact Us"}
          </h3>
          <div className="ft-contact">
            <a
  href="https://www.google.com/maps/search/?api=1&query=The+Rock+Aswan"
  target="_blank"
  rel="noopener noreferrer"
  className="ft-contact-row"
>
  <MapPin size={15} className="ft-contact-icon" />
  {CONTACT.address[lang] ?? CONTACT.address.en}
</a>
          <a
  href={`tel:${CONTACT.phone[lang] ?? CONTACT.phone.en}`}
  className="ft-contact-row"
>
  <Phone size={15} className="ft-contact-icon" />

  <span dir="ltr" className="inline-block">
    {CONTACT.phone[lang] ?? CONTACT.phone.en}
  </span>
</a>
            <a href={`mailto:${CONTACT.email}`} className="ft-contact-row">
              <Mail size={15} className="ft-contact-icon" />
              {CONTACT.email}
            </a>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <p className="ft-copy">
          {isRTL
            ? <>© ٢٠٢٦ <span> م.محمود فتاح </span>. جميع الحقوق محفوظة.</>
            : <>© 2026 <span>Eng:Mahmoud Fattah</span>. All rights reserved.</>
          }
        </p>
        <div className="ft-bottom-links">
          <a href="#">{isRTL ? "سياسة الخصوصية" : "Privacy Policy"}</a>
          <a href="#">{isRTL ? "الشروط والأحكام" : "Terms of Use"}</a>
        </div>
      </div>

    </footer>
  );
}

/* ─── Combined export ─────────────────────────────────────────────────────── */
export default function FooterWithReviews() {
  const { lang } = useLang();
  const isRTL = lang === "ar";

  return (
    <>
      <ReviewsSection lang={lang} isRTL={isRTL} />
      <Footer        lang={lang} isRTL={isRTL} />
    </>
  );
}