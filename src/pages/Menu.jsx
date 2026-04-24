import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Header from "./Header";
import MenuSection from "./MenuSection";
import { useLang } from "../context/Context";

/* ── MENU DATA ─────────────────────────────────────────────── */
const MENU_DATA = {
  cold: {
    title: "Cold Drinks",
    highlight: "& Juices & Milkshakes",
    subtitle: "Fresh juices, smoothies,  Milkshakes,cocktails, and soft drinks.",
    sectionTitle: "Cold Drinks & Juices & Milkshakes",
    sectionTitleAr: "المشروبات الباردة والعصائر والميلك شيك",
    
  },
  hot: {
    title: "Hot Drinks",
    highlight: "",
    subtitle: "Hot beverages .",
    sectionTitle: "Hot Drinks ",
    sectionTitleAr: "المشروبات الساخنة ",
  },
  food: {
    title: "Food",
    highlight: "& Desserts",
    subtitle: "Bakery items and delicious desserts.",
    sectionTitle: "Food & Desserts",
    sectionTitleAr: "المأكولات والحلويات",
  },
  shisha: {
    title: "Shisha",
    highlight: "Corner",
    subtitle: "Premium shisha flavors.",
    sectionTitle: "Shisha Corner",
    sectionTitleAr: "ركن الشيشة",
  },
};

const MENU_ITEMS = {
  cold: [
    {
      title: { en: "Fresh Juices", ar: "عصائر فريش" },
      groups: [
        {
          price: "55.25",
        
         
          items: [
            { en: "Peach", ar: "خوخ" },
            { en: "Banana", ar: "موز" },
            { en: "Lemon", ar: "ليمون" },
            { en: "Pomegranate", ar: "رمان" },
            { en: "Apple", ar: "تفاح" },
          ],
        },
        {
          price: "63.50",
          items: [
            { en: "Banana with Milk", ar: "موز باللبن" },
            { en: "Mango Juice", ar: "عصير مانجو" },
            { en: "Guava with Milk", ar: "جوافة باللبن" },
          ],
        },
        {
          price: "58.50",
          items: [
            { en: "Orange", ar: "برتقال" },
            { en: "Mango", ar: "مانجو" },
            { en: "Strawberry", ar: "فراولة" },
            { en: "Guava", ar: "جوافة" },
            { en: "Kiwi", ar: "كيوي" },
            { en: "Cantaloupe", ar: "كنتالوب" },
            { en: "Watermelon", ar: "بطيخ" },
          ],
        },
      ],
    },
    {
      title: { en: "Smoothies", ar: "سموذي" },
      groups: [
        {
          price: "51.25",
          items: [
            { en: "Mango", ar: "مانجو" },
            { en: "Strawberry", ar: "فراولة" },
            { en: "Peach", ar: "خوخ" },
            { en: "Cantaloupe", ar: "كنتالوب" },
            { en: "Watermelon", ar: "بطيخ" },
            { en: "Guava", ar: "جوافة" },
            { en: "Banana", ar: "موز" },
          ],
        },
        {
          price: "57.00",
          items: [{ en: "Cocktail Smoothie", ar: "سموذي كوكتيل" }],
        },
      ],
    },
    {
      title: { en: "Cocktails", ar: "كوكتيلات" },
      groups: [
        {
          price: "52 - 57.50",
          items: [
            { en: "Mojito", ar: "موهيتو" },
            { en: "Virgin Colada", ar: "فيرجن كولادا" },
            { en: "Florida", ar: "فلوريدا" },
            { en: "Lemon Squash", ar: "ليمون اسكواش" },
            { en: "Orange Cooler", ar: "أورانج كولر" },
          ],
        },
        {
          price: "57.00",
          items: [
            { en: "Cinderella", ar: "سندريلا" },
            { en: "Orange Sunrise", ar: "أورانج صن رايز" },
          ],
        },
        {
          price: "52.50",
          items: [
            { en: "Aswan Cocktail", ar: "كوكتيل أسوان" },
            { en: "Sunshine", ar: "صن شاين" },
          ],
        },
      ],
    },
    {
      title: { en: "Soft Drinks", ar: "مشروبات غازية" },
      groups: [
        {
          price: "30.50",
          items: [
            { en: "Coca Cola", ar: "كوكاكولا" },
            { en: "Sprite", ar: "سبرايت" },
          ],
        },
        { price: "35.50", items: [{ en: "Schweppes", ar: "شويبس" }] },
        {
          price: "38.50",
          items: [
            { en: "Birell", ar: "بيريل" },
            { en: "Fayrouz", ar: "فيروز" },
          ],
        },
        { price: "67.50", items: [{ en: "Red Bull", ar: "ريد بول" }] },
        { price: "60.00", items: [{ en: "Monster", ar: "مونستر" }] },
        { price: "12.50", items: [{ en: "Water (Small)", ar: "مياه صغيرة" }] },
      ],
    },
  
    {
      title: { en: "Milkshakes", ar: "ميلك شيك" },
      groups: [
        {
          price: "63.00",
          items: [
            { en: "Vanilla", ar: "فانيليا" },
            { en: "Caramel", ar: "كراميل" },
            { en: "Cantaloupe", ar: "كنتالوب" },
            { en: "Strawberry", ar: "فراولة" },
            { en: "Mango", ar: "مانجو" },
          ],
        },
        {
          price: "65.00",
          items: [
            { en: "Oreo", ar: "أوريو" },
            { en: "HoHos", ar: "هوهوز" },
            { en: "Boreo", ar: "بوريو" },
          ],
        },
        {
          price: "68.25",
          items: [
            { en: "KitKat", ar: "كيت كات" },
            { en: "Bimbo", ar: "بيمبو" },
          ],
        },
      ],
    },
  ],

  hot: [
    {
      title: { en: "Hot Drinks", ar: "مشروبات ساخنة" },
      groups: [
        { price: "38.25", items: [{ en: "Turkish Coffee", ar: "قهوة تركي / ميكس" }] },
        { price: "44.25", items: [{ en: "Latte", ar: "كافيه لاتيه" }] },
        { price: "50.00", items: [{ en: "Cappuccino", ar: "كابتشينو" }] },
        { price: "49.50", items: [{ en: "White Hot Chocolate", ar: "هوت شوكليت أبيض" }] },
        { price: "53.50", items: [{ en: "Sahlab with Nuts", ar: "سحلب بالمكسرات" }] },
      ],
    },
    {
      title: { en: "Milkshakes", ar: "ميلك شيك" },
      groups: [
        {
          price: "63.00",
          items: [
            { en: "Vanilla", ar: "فانيليا" },
            { en: "Caramel", ar: "كراميل" },
            { en: "Cantaloupe", ar: "كنتالوب" },
            { en: "Strawberry", ar: "فراولة" },
            { en: "Mango", ar: "مانجو" },
          ],
        },
        {
          price: "65.00",
          items: [
            { en: "Oreo", ar: "أوريو" },
            { en: "HoHos", ar: "هوهوز" },
            { en: "Boreo", ar: "بوريو" },
          ],
        },
        {
          price: "68.25",
          items: [
            { en: "KitKat", ar: "كيت كات" },
            { en: "Bimbo", ar: "بيمبو" },
          ],
        },
      ],
    },
  ],

  food: [
    {
      title: { en: "Bakery", ar: "مخبوزات" },
      groups: [
        {
          price: "30.00",
          items: [
            { en: "Croissant", ar: "كرواسون" },
            { en: "Roumi Cheese Pastry", ar: "باتيه جبنة رومي" },
            { en: "White Cheese Pastry", ar: "باتيه جبنة بيضاء" },
            { en: "Butter Pastry", ar: "باتيه زبدة" },
            { en: "Chocolate Pastry", ar: "باتيه شوكولاتة" },
          ],
        },
      ],
    },
    {
      title: { en: "Desserts", ar: "حلويات" },
      groups: [
        {
          price: "60.00",
          items: [
            { en: "Chocolate Raspberry Cake", ar: "كيكة شوكولاتة بالراسبيري" },
            { en: "Raspberry Cheesecake", ar: "تشيز كيك بالراسبيري" },
            { en: "Chocolate Caramel Cake", ar: "كيكة شوكولاتة بالكراميل" },
            { en: "Oriental Mix Dessert", ar: "طبق حلويات شرقي مشكل" },
          ],
        },
        {
          price: "55.00",
          items: [{ en: "Waffle (Chocolate or Jam)", ar: "وافل شوكولاتة أو مربى" }],
        },
      ],
    },
  ],

  shisha: [
    {
      title: { en: "All Flavors", ar: "جميع النكهات" },
      groups: [
        {
          price: "72.50",
          items: [
            { en: "Black Grape", ar: "عنب أسود" },
            { en: "Mastic", ar: "مستكة" },
            { en: "Gum", ar: "علكة" },
            { en: "Tropical Kiwi", ar: "كيوي استوائي" },
            { en: "Orange", ar: "برتقال" },
            { en: "Watermelon", ar: "بطيخ" },
            { en: "Vanilla", ar: "فانيليا" },
            { en: "Mango", ar: "مانجو" },
            { en: "Peach", ar: "خوخ" },
          ],
        },
      ],
    },
  ],
};

const menuItems = [
  {
    id: 1,
    side: "right",
    title: "Cold Drinks",
    slug: "cold",
    image: "/cl.jfif",
    desc: "Juices, smoothies, milkshakes, cocktails & soft drinks",
    descAr: "عصائر، سموذي، ميلك شيك، كوكتيلات ومشروبات غازية",
  },
  {
    id: 2,
    side: "left",
    title: "Hot Drinks",
    slug: "hot",
    image: "/hot.jfif",
    desc: "Coffee, latte & cappuccino ",
    descAr: "قهوة، لاتيه، كابتشينو  ",
  },
  {
    id: 3,
    side: "right",
    title: "Food & Desserts",
    slug: "food",
    image: "/dessert.jfif",
    desc: "Fresh bakery & delicious desserts",
    descAr: "مخبوزات طازجة وحلويات لذيذة",
  },
  {
    id: 4,
    side: "left",
    title: "Shisha",
    slug: "shisha",
    image: "/shasha.jpg",
    desc: "Premium shisha flavors",
    descAr: "نكهات شيشة فاخرة",
  },
];

/* ── Arabic titles for timeline cards ───────────────────────── */
const TITLE_AR = {
  cold: "المشروبات الباردة",
  hot: "المشروبات الساخنة",
  food: "المأكولات والحلويات",
  shisha: "ركن الشيشة",
};

/* ── MenuDemoContent ───────────────────────────────────────── */
// lang is now received as a prop from the navbar — no internal toggle needed
function MenuDemoContent({ item, onClose }) {
   const { lang } = useLang();
  const data = MENU_DATA[item.slug] || MENU_DATA.cold;
  const isAr = lang === "ar";

  return (
    <>
      <style>{`
        .menu-hero-bg{
          position: absolute;
          inset: 0;
          background-color: #0d0b08;
          // background-image:
          //   linear-gradient(rgba(180,30,30,0.07) 1px, transparent 1px),
          //   linear-gradient(90deg, rgba(180,30,30,0.07) 1px, transparent 1px),
          //   radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,145,58,0.11) 0%, transparent 65%),
          //   radial-gradient(ellipse 40% 60% at 10% 70%, rgba(180,120,40,0.07) 0%, transparent 60%);
          background-size: 48px 48px, 48px 48px, 100% 100%, 100% 100%;
        }
        [data-theme="light"] .menu-hero-bg {
          background-color: #F5F0E8;
          // background-image:
          //   linear-gradient(rgba(160,20,20,0.06) 1px, transparent 1px),
          //   linear-gradient(90deg, rgba(160,20,20,0.06) 1px, transparent 1px),
          //   radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,145,58,0.15) 0%, transparent 65%),
          //   radial-gradient(ellipse 40% 60% at 10% 70%, rgba(180,120,40,0.10) 0%, transparent 60%);
          background-size: 48px 48px, 48px 48px, 100% 100%, 100% 100%;
        }
        .menu-hero-bg::after {
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
        [data-theme="light"] .menu-hero-bg::after { opacity: 0.7; }
        .menu-hero-bg::before {
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
      `}</style>

      <div
        className="menu-hero-bg"
        dir={isAr ? "rtl" : "ltr"}
        style={{ position: "relative" }}
      >
        {/* Close ✕ */}
        <button
          onClick={onClose}
          style={{
            position: "fixed",
            top: 10,
            [isAr ? "left" : "right"]: 16,
            zIndex: 200,
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(13,13,13,0.8)",
            backdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.5)",
            fontSize: 16,
            cursor: "pointer",
            transition: "all .3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "#c8211b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}
        >
          ✕
        </button>

        <Header
          title={isAr ? `${data.highlight} ${data.title}` : data.title}
          highlight={isAr ? "" : data.highlight}
          subtitle={data.subtitle}
          lang={lang}
          currentLang={lang}
          /* no onToggleLang — toggle lives in navbar */
        />

        <main className=' '>
          <MenuSection
            title={isAr ? data.sectionTitleAr : data.sectionTitle}
            subtitle={isAr ? data.sectionSubtitleAr : data.sectionSubtitle}
            sections={MENU_ITEMS[item.slug]}
            lang={lang}
          />
        </main>
      </div>
    </>
  );
}

/* ── HeroOverlay ───────────────────────────────────────────── */
function HeroOverlay({ item, imgRef, onDismiss }) {
   const { lang } = useLang();
  const overlayRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const menuPageRef = useRef(null);
  const arrowRef = useRef(null);

  const scrollProgress = useRef(0);
  const touchStartY = useRef(0);
  const isExpanded = useRef(false);
  const menuVisible = useRef(false);

  const isAr = lang === "ar";

  const bounceArrow = () => {
    if (!arrowRef.current) return;
    gsap.to(arrowRef.current, {
      y: 8,
      duration: 0.6,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  };

  /* 1. Expand image on mount */
  useEffect(() => {
    const bg = bgRef.current;
    const overlay = overlayRef.current;
    const text = textRef.current;
    const menuPage = menuPageRef.current;

    const srcEl = imgRef?.current;
    if (srcEl) {
      const srcRect = srcEl.getBoundingClientRect();
      gsap.set(bg, {
        position: "fixed",
        top: srcRect.top,
        left: srcRect.left,
        width: srcRect.width,
        height: srcRect.height,
        borderRadius: 14,
      });
    } else {
      gsap.set(bg, {
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "60%",
        height: "40%",
        xPercent: -50,
        yPercent: -50,
        borderRadius: 14,
      });
    }

    gsap.set(menuPage, { y: "100vh" });
    gsap.set(overlay, { opacity: 0 });
    gsap.to(overlay, { opacity: 1, duration: 0.25 });

    gsap.to(bg, {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      xPercent: 0,
      yPercent: 0,
      borderRadius: 0,
      duration: 1.4,
      ease: "power4.inOut",
      onComplete: () => {
        isExpanded.current = true;
        if (text?.children?.length) {
          gsap.fromTo(
            text.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
          );
        }
        bounceArrow();
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* 2. Core scroll logic */
  const updateScroll = useCallback(
    (delta) => {
      if (menuVisible.current) return;
      if (!isExpanded.current) return;
      if (delta < 0 && scrollProgress.current <= 0) {
        onDismiss();
        return;
      }
      scrollProgress.current = Math.min(1, Math.max(0, scrollProgress.current + delta));
      const yVal = 100 - scrollProgress.current * 100;
      gsap.set(menuPageRef.current, { y: `${yVal}vh` });
      if (scrollProgress.current >= 1) {
        menuVisible.current = true;
        gsap.to(textRef.current, { opacity: 0, duration: 0.3 });
      }
    },
    [onDismiss]
  );

  /* 3. Wheel */
  useEffect(() => {
    const el = overlayRef.current;
    const onWheel = (e) => {
      if (!menuVisible.current) {
        e.preventDefault();
        updateScroll((e.deltaY / window.innerHeight) * 1.5);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [updateScroll]);

  /* 4. Touch */
  useEffect(() => {
    const el = overlayRef.current;
    const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (!menuVisible.current) {
        e.preventDefault();
        const diff = touchStartY.current - e.touches[0].clientY;
        touchStartY.current = e.touches[0].clientY;
        updateScroll((diff / window.innerHeight) * 2);
      }
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [updateScroll]);

  const handleViewMenu = () => {
    if (menuVisible.current) return;
    menuVisible.current = true;
    gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(menuPageRef.current, { y: "0vh", duration: 1, ease: "power4.out" });
  };

  const handleCloseMenu = () => {
    menuVisible.current = false;
    scrollProgress.current = 0;
    gsap.to(menuPageRef.current, {
      y: "100vh",
      duration: 1,
      ease: "power4.in",
      onComplete: () => {
        gsap.to(textRef.current, { opacity: 1, duration: 0.4 });
        bounceArrow();
      },
    });
  };

  return (
    <div
      ref={overlayRef}
      style={{ position: "fixed", inset: 0, zIndex: 999, overflow: "hidden" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Expanding BG image */}
      <div
        ref={bgRef}
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          zIndex: 0,
        }}
      />

      {/* Dark gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to top, rgba(0,0,0,.88) 0%, rgba(0,0,0,.3) 55%, transparent 100%)",
        }}
      />

      {/* BACK button — flips side for RTL */}
      <button
        onClick={onDismiss}
        style={{
          position: "absolute",
          top: 10,
          [isAr ? "right" : "left"]: 16,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 16px",
          border: "1.5px solid rgba(255,255,255,0.25)",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(8px)",
          color: "rgba(255,255,255,0.75)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        {isAr ? "رجوع →" : "← BACK"}
      </button>

      {/* Hero Text */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 2,
          padding: "0 24px",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            letterSpacing: ".35em",
            textTransform: "uppercase",
            color: "#c8960c",
            margin: "0 0 10px",
          }}
        >
          {isAr ? "ذا روك سبيشيالتي كوفي" : "The Rock Specialty Coffee"}
        </p>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.4rem, 8vw, 5rem)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            margin: "0 0 12px",
            lineHeight: 1,
          }}
        >
          {isAr ? TITLE_AR[item.slug] : item.title}
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: "italic",
            fontSize: 13,
            color: "rgba(255,255,255,.58)",
            maxWidth: 300,
            margin: "0 auto 28px",
            lineHeight: 1.8,
          }}
        >
          {isAr ? item.descAr : item.desc}
        </p>

        {/* VIEW MENU */}
        <button
          onClick={handleViewMenu}
          style={{
            display: "block",
            margin: "0 auto 18px",
            padding: "13px 40px",
            background: "#c8f000",
            color: "#000",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isAr ? "عرض القائمة" : "VIEW MENU"}
        </button>

        {/* SCROLL DOWN */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 9,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.38)",
            }}
          >
            {isAr ? "اسحب للأسفل" : "SCROLL DOWN"}
          </span>
          <span
            ref={arrowRef}
            style={{ color: "rgba(255,255,255,.38)", fontSize: 16, display: "block" }}
          >
            ↓
          </span>
        </div>
      </div>

      {/* MenuDemo slides up from bottom */}
      <div
        ref={menuPageRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          background: "var(--bg-primary, #0d0d0d)",
        }}
      >
        <div style={{ overflowY: "auto",overflowX: "hidden", height: "100vh", width: "100%" }}>
          <MenuDemoContent item={item} onClose={handleCloseMenu} lang={lang} />
        </div>
      </div>
    </div>
  );
}

/* ── Main Menu ─────────────────────────────────────────────── */
// Accept lang prop from parent (navbar controls it)
export default function Menu({ theme = "dark" }) {
  const fillRef = useRef(null);
   const { lang } = useLang();
  const itemRefs = useRef([]);
  const imgRefs = useRef([]);
  const [activeItem, setActiveItem] = useState(null);

  const isDark = theme === "dark";
  const isAr = lang === "ar";

  const colors = {
    bg: isDark ? "#0b0b0b" : "#f5f0eb",
    text: isDark ? "#ffffff" : "#1a1a1a",
    textMuted: isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.4)",
    textDesc: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
    trackBg: isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)",
    dotBg: isDark ? "#0b0b0b" : "#f5f0eb",
    dotBorder: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)",
  };

  /* ── FIX 1: id changed to "menu-section" to match CSS & scroll listener ── */
  useEffect(() => {
    const section = document.getElementById("menu-section");
    const fill = fillRef.current;
    if (!section || !fill) return;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const viewH = window.innerHeight;
      const raw = -rect.top / (sectionH - viewH);
      fill.style.transform = `scaleY(${Math.min(Math.max(raw, 0), 1)})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* intersection observer for row reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("row--visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.2 }
    );
    itemRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleOpen = (item, index) => {
    setActiveItem({ ...item, index });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;700&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');

        /* ── FIX 2: background now targets #menu-section ── */
        #menu-section {
          background-color: #0d0b08;
          background-image:
            linear-gradient(rgba(180,30,30,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180,30,30,0.07) 1px, transparent 1px),
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,145,58,0.11) 0%, transparent 65%),
            radial-gradient(ellipse 40% 60% at 10% 70%, rgba(180,120,40,0.07) 0%, transparent 60%);
          background-size: 48px 48px, 48px 48px, 100% 100%, 100% 100%;
        }
        [data-theme="light"] #menu-section {
          background-color: #F5F0E8;
          background-image:
            linear-gradient(rgba(160,20,20,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(160,20,20,0.06) 1px, transparent 1px),
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,145,58,0.15) 0%, transparent 65%),
            radial-gradient(ellipse 40% 60% at 10% 70%, rgba(180,120,40,0.10) 0%, transparent 60%);
          background-size: 48px 48px, 48px 48px, 100% 100%, 100% 100%;
        }

        .menu-track { position:absolute; top:0; bottom:0; left:50%; transform:translateX(-50%); width:2px; background:var(--track-bg); z-index:0; }
        .menu-track__fill { position:absolute; inset:0; background:#c8151b; box-shadow:0 0 22px rgba(200,21,27,.75); transform:scaleY(0); transform-origin:top; will-change:transform; }
        .menu-row { position:relative; display:flex; align-items:flex-start; min-height:280px; padding:64px 0 56px; }
        .menu-dot { position:absolute; left:50%; top:64px; transform:translate(-50%,-50%); width:13px; height:13px; border-radius:50%; border:2px solid var(--dot-border); background:var(--dot-bg); z-index:2; transition:background .4s,border-color .4s,box-shadow .45s; }
        .row--visible .menu-dot { background:#c8151b; border-color:#c8151b; box-shadow:0 0 14px rgba(200,21,27,1); }
        .menu-dash { position:absolute; top:64px; transform:translateY(-50%); height:2px; width:calc(50% - 400px); background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='2'%3E%3Cline x1='0' y1='1' x2='100%25' y2='1' stroke='%23d4af37' stroke-width='2' stroke-dasharray='10 8'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-size:100% 100%; clip-path:inset(0 100% 0 0); transition:clip-path .6s cubic-bezier(.4,0,.2,1) .18s; z-index:1; }
        .menu-dash--right { left:calc(50% + 1px); clip-path:inset(0 100% 0 0); }
        .menu-dash--left  { right:calc(50% + 1px); clip-path:inset(0 0 0 100%); }
        .row--visible .menu-dash--right { clip-path:inset(0 0% 0 0); }
        .row--visible .menu-dash--left  { clip-path:inset(0 0 0 0%); }
        .menu-card { display:flex; flex-direction:column; gap:14px; width:calc(50% - 100px); opacity:0; transition:opacity .55s ease .25s,transform .55s ease .25s; }
        .menu-card--right { margin-left:auto; padding-left:80px; transform:translateX(32px); }
        .menu-card--left  { margin-right:auto; padding-right:80px; transform:translateX(-32px); align-items:flex-end; text-align:right; }
        .row--visible .menu-card { opacity:1; transform:translateX(0); }
        .menu-label { display:inline-block; padding:5px 18px; background:#c8151b; font-size:12.5px; font-weight:700; letter-spacing:.05em; color:#fff; font-family:'DM Sans',sans-serif; width:fit-content; }
        .menu-img-link { display:block; width:100%; height:200px; overflow:hidden; background:rgba(128,128,128,0.1); cursor:pointer; position:relative; outline:1.5px solid transparent; transition:outline-color .3s,box-shadow .3s; }
        .menu-img-link:hover { outline-color:rgba(200,21,27,.55); box-shadow:0 8px 40px rgba(200,21,27,.22); }
        .menu-img-link img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s ease; }
        .menu-img-link:hover img { transform:scale(1.05); }
        .menu-img-link__badge { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(11,11,11,.55); opacity:0; transition:opacity .3s; font-family:'DM Sans',sans-serif; font-size:13px; letter-spacing:.12em; color:#fff; text-transform:uppercase; gap:8px; }
        .menu-img-link:hover .menu-img-link__badge { opacity:1; }
        .menu-img-link__badge svg { width:16px; height:16px; stroke:#fff; transition:transform .3s; }
        .menu-img-link:hover .menu-img-link__badge svg { transform:translateX(4px); }
        .menu-desc { font-family:'DM Sans',sans-serif; font-size:13.5px; line-height:1.75; font-style:italic; margin:0; }
        @media (max-width:768px) {
          .menu-track { left:22px; transform:none; }
          .menu-dot { left:22px; }
          .menu-dash--right,.menu-dash--left { left:22px; right:auto; width:30px; clip-path:inset(0 100% 0 0); }
          .row--visible .menu-dash--right,.row--visible .menu-dash--left { clip-path:inset(0 0% 0 0); }
          .menu-card--right,.menu-card--left { width:calc(100% - 68px); margin-left:68px; margin-right:0; padding-left:0; padding-right:0; align-items:flex-start; text-align:left; transform:translateX(20px); }
        }
      `}</style>

      {activeItem && (
        <HeroOverlay
          item={activeItem}
          imgRef={{ current: imgRefs.current[activeItem.index] ?? null }}
          onDismiss={() => setActiveItem(null)}
          lang={lang}
        />
      )}

      {/* ── FIX: id is now "menu-section" — matches CSS & scroll listener ── */}
      <section
        id="menu-section"
        style={{
          position: "relative",
          color: colors.text,
          overflow: "hidden",
          "--track-bg": colors.trackBg,
          "--dot-bg": colors.dotBg,
          "--dot-border": colors.dotBorder,
        }}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "100px 28px 120px",
          }}
        >
          {/* Section heading */}
          <div style={{ textAlign: "center", marginBottom: 88 }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem,5vw,4rem)",
                fontWeight: 700,
                letterSpacing: ".05em",
                margin: 0,
                lineHeight: 1.1,
                color: colors.text,
              }}
              className="bg-[#c8151b] py-1!"
            >
              {isAr ? "قائمتنا المميزة" : "Our Signature Menu"}
            </h2>
            <p
              style={{
                marginTop: 18,
                fontSize: 14,
                fontFamily: "'DM Sans',sans-serif",
                fontStyle: "italic",
                maxWidth: 440,
                marginInline: "auto",
                lineHeight: 1.8,
              }}
              className="text-[var(--accent-gold)]"
            >
              {isAr
                ? "اكتشف تشكيلتنا المختارة بعناية من المشروبات الفاخرة والحلويات"
                : "Discover our carefully crafted selection of premium beverages and desserts"}
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            <div className="menu-track">
              <div className="menu-track__fill" ref={fillRef} />
            </div>

            {menuItems.map((item, i) => {
              const isRight = item.side === "right";
              return (
                <div
                  key={item.id}
                  className="menu-row"
                  ref={(el) => (itemRefs.current[i] = el)}
                >
                  <div className="menu-dot" />
                  <div
                    className={`menu-dash ${isRight ? "menu-dash--right" : "menu-dash--left"}`}
                  />
                  <div
                    className={`menu-card ${isRight ? "menu-card--right" : "menu-card--left"}`}
                  >
                    <div className="menu-label">
                      {isAr ? TITLE_AR[item.slug] : item.title}
                    </div>

                    <div
                      className="menu-img-link"
                      ref={(el) => (imgRefs.current[i] = el)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${item.title}`}
                      onClick={() => handleOpen(item, i)}
                      onKeyDown={(e) => e.key === "Enter" && handleOpen(item, i)}
                    >
                      <img src={item.image} alt={item.title} />
                      <div className="menu-img-link__badge">
                        {isAr ? "عرض القائمة" : "View Menu"}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </div>
                    </div>

                    <p className="menu-desc text-[var(--color-rock-gold-light)]">
                      {isAr ? item.descAr : item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}