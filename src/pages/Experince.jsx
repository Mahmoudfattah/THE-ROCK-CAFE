import { Coffee, Cake, Leaf, Star } from "lucide-react";
import { useLang } from "../context/Context";

const features = [
  {
    icon: Coffee,
    title: {
      en: "Premium Arabic Coffee",
      ar: "قهوة عربية فاخرة",
    },
  },
  {
    icon: Cake,
    title: {
      en: "Fresh Daily Cakes",
      ar: "حلويات طازجة يومياً",
    },
  },
  {
    icon: Leaf,
    title: {
      en: "Natural Ingredients",
      ar: "مكونات طبيعية",
    },
  },
  {
    icon: Star,
    title: {
      en: "Premium Quality",
      ar: "جودة عالية",
    },
  },
];

export default function Experience() {
  const { lang } = useLang();
  const isAR = lang === "ar";

  return (
    <section className="experience-hero-bg">
      <style>{`
        :root {
          --red: #B81C1C;
          --gold: #C9913A;
          --bg-dark: #0A0806;
          --bg-light: #F2EDE4;
          --ink: #1C1A18;
        }

        .experience-hero-bg {
          position: relative;
          padding: 50px 20px;
          overflow: hidden;
          background-color: var(--bg-dark);
        }

        [data-theme="light"] .experience-hero-bg {
          background-color: var(--bg-light);
        }

        /* GRID */
        .features-grid {
          display: grid;
          gap: 20px;
          max-width: 1100px;
          margin: auto;
        }

        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* CARD */
        .feature-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          border-radius: 18px;
          backdrop-filter: blur(10px);
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          background: rgba(0,0,0,0.6);
          border-color: var(--red);
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(184,28,28,0.2);
        }

        [data-theme="light"] .feature-card {
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(0,0,0,0.08);
        }

        [data-theme="light"] .feature-card:hover {
          background: #fff;
          border-color: var(--red);
        }

        /* LTR layout */
        .feature-card.ltr {
          flex-direction: row;
          text-align: left;
        }

        /* RTL layout */
        .feature-card.rtl {
          flex-direction: row-reverse;
          text-align: right;
        }

        /* ICON */
        .icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201,145,58,0.15);
          border: 1px solid rgba(201,145,58,0.3);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .feature-card:hover .icon-wrapper {
          background: rgba(184,28,28,0.15);
          border-color: var(--red);
        }

        /* TEXT */
        .feature-text {
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
        }

        [data-theme="light"] .feature-text {
          color: var(--ink);
        }
      `}</style>

      <div className="features-grid">
        {features.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className={`feature-card ${isAR ? "rtl" : "ltr"}`}
            >
              <div className="icon-wrapper">
                <Icon size={22} color="#C9913A" />
              </div>

              <span className="feature-text">
                {item.title[lang]}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}