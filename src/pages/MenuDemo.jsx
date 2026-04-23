import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

/* ───────── MENU HEADER DATA ───────── */
const MENU_DATA = {
  cold: {
    title: "Cold Drinks",
    highlight: "& Juices",
    subtitle: "Fresh juices, smoothies, cocktails, and soft drinks.",
  },
  hot: {
    title: "Hot Drinks",
    highlight: "& Milkshakes",
    subtitle: "Hot beverages and creamy milkshakes.",
  },
  food: {
    title: "Food",
    highlight: "& Desserts",
    subtitle: "Bakery items and delicious desserts.",
  },
  shisha: {
    title: "Shisha",
    highlight: "Corner",
    subtitle: "Premium shisha flavors.",
  },
};

/* ───────── FULL REAL DATA ───────── */
const MENU_ITEMS = {
  cold: [
    {
      title: { en: "Fresh Juices", ar: "عصائر فريش" },
      items: [
        {
          en: "Peach, Banana, Lemon, Pomegranate, Apple",
          ar: "خوخ، موز، ليمون، رمان، تفاح",
          price: "55.25",
        },
        {
          en: "Banana with Milk, Mango, Guava with Milk",
          ar: "موز باللبن، مانجو، جوافة باللبن",
          price: "63.50",
        },
        {
          en: "Orange, Mango, Strawberry, Guava, Kiwi, Watermelon",
          ar: "برتقال، مانجو، فراولة، جوافة، كيوي، بطيخ",
          price: "58.50",
        },
      ],
    },
    {
      title: { en: "Smoothies", ar: "سموذي" },
      items: [
        {
          en: "Mango, Strawberry, Peach, Guava, Banana",
          ar: "مانجو، فراولة، خوخ، جوافة، موز",
          price: "51.25",
        },
        {
          en: "Cocktail Smoothie",
          ar: "سموذي كوكتيل",
          price: "57.00",
        },
      ],
    },
    {
      title: { en: "Cocktails", ar: "كوكتيلات" },
      items: [
        {
          en: "Mojito, Virgin Colada, Florida",
          ar: "موهيتو، فيرجن كولادا، فلوريدا",
          price: "52 - 57.5",
        },
        {
          en: "Cinderella, Orange Sunrise",
          ar: "سندريلا، أورانج صن رايز",
          price: "57",
        },
      ],
    },
    {
      title: { en: "Soft Drinks", ar: "مشروبات غازية" },
      items: [
        { en: "Coca Cola, Sprite", ar: "كوكاكولا، سبرايت", price: "30.50" },
        { en: "Schweppes", ar: "شويبس", price: "35.50" },
        { en: "Red Bull", ar: "ريد بول", price: "67.50" },
      ],
    },
  ],

  hot: [
    {
      title: { en: "Hot Drinks", ar: "مشروبات ساخنة" },
      items: [
        { en: "Turkish Coffee", ar: "قهوة تركي", price: "38.25" },
        { en: "Latte", ar: "كافيه لاتيه", price: "44.25" },
        { en: "Cappuccino", ar: "كابتشينو", price: "50.00" },
      ],
    },
    {
      title: { en: "Milkshakes", ar: "ميلك شيك" },
      items: [
        { en: "Vanilla, Caramel, Strawberry", ar: "فانيليا، كراميل، فراولة", price: "63" },
        { en: "Oreo, HoHos", ar: "أوريو، هوهوز", price: "65" },
      ],
    },
  ],

  food: [
    {
      title: { en: "Bakery", ar: "مخبوزات" },
      items: [
        { en: "Croissant", ar: "كرواسون", price: "30" },
        { en: "Cheese Pastry", ar: "باتيه جبنة", price: "30" },
      ],
    },
    {
      title: { en: "Desserts", ar: "حلويات" },
      items: [
        { en: "Chocolate Cake", ar: "كيك شوكولاتة", price: "60" },
        { en: "Waffle", ar: "وافل", price: "55" },
      ],
    },
  ],

  shisha: [
    {
      title: { en: "All Flavors", ar: "جميع النكهات" },
      items: [
        {
          en: "Grape, Mango, Peach, Mint...",
          ar: "عنب، مانجو، خوخ، نعناع...",
          price: "72.50",
        },
      ],
    },
  ],
};

export default function MenuDemo() {
  const [lang, setLang] = useState("en"); // ✅ default EN
  const navigate = useNavigate();
  const { slug } = useParams();

  const data = MENU_DATA[slug] || MENU_DATA.cold;
  const sections = MENU_ITEMS[slug] || [];

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{ minHeight: "100vh", background: "#0d0d0d", color: "#fff" }}
    >
      {/* Close */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 50,
          width: 40,
          height: 40,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.6)",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <Header
        title={data.title}
        highlight={data.highlight}
        subtitle={data.subtitle}
        lang={lang}
        currentLang={lang}
        onToggleLang={setLang}
      />

      {/* ───── MENU CONTENT ───── */}
      <main style={{ padding: "40px 20px", maxWidth: 900, margin: "auto" }}>
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <h2 style={{ marginBottom: 20, fontSize: 22 }}>
              {lang === "ar" ? section.title.ar : section.title.en}
            </h2>

            {section.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  color: "#ccc",
                }}
              >
                <span>
                  {lang === "ar" ? item.ar : item.en}
                </span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
        ))}
      </main>

      {/* Back */}
      <div style={{ textAlign: "center", paddingBottom: 40 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "10px 30px",
            background: "transparent",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}