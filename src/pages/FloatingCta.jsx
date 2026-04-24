import { Phone, Calendar } from "lucide-react";
import { useLang } from "../context/Context";

export default function FloatingCTA() {
  const { lang } = useLang();
  const isRTL = lang === "ar";

  return (
    <div className={`cta-wrap ${isRTL ? "rtl" : ""}`}>

      <style>{`
        .cta-wrap {
          position: fixed;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cta-wrap.rtl {
          left: auto;
          right: 20px;
        }

        /* Button */
        .cta-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: linear-gradient(135deg, #C9913A, #B81C1C);
          color: #0A0806;
          font-weight: 600;
          font-size: 0.9rem;
          border-radius: 50px;
          text-decoration: none;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .cta-btn:hover {
          transform: translateX(5px) scale(1.05);
          box-shadow: 0 12px 35px rgba(0,0,0,0.4);
        }

        .cta-wrap.rtl .cta-btn:hover {
          transform: translateX(-5px) scale(1.05);
        }

        /* Secondary */
        .cta-btn.secondary {
          background: transparent;
          border: 1px solid rgba(201,145,58,0.5);
          color: #C9913A;
        }

        .cta-btn.secondary:hover {
          background: rgba(201,145,58,0.1);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .cta-wrap {
            top: auto;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            flex-direction: row;
          }

          .cta-wrap.rtl {
            right: auto;
            left: 50%;
          }

          .cta-btn {
            padding: 10px 14px;
            font-size: 0.8rem;
          }
        }
      `}</style>

      {/* Primary CTA */}
      <a href="tel:+201023456789" className="cta-btn">
        <Phone size={16} />
        {isRTL ? "احجز الآن" : "Reserve Now"}
      </a>

      {/* Secondary CTA */}
     

    </div>
  );
}