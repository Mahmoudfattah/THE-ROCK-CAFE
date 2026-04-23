// /* ── MenuDemo Content (used inside overlay) ── */
// function MenuDemoContent({ item }) {
//   const [lang, setLang] = useState("en");
//   const data = MENU_DATA[item.slug] || MENU_DATA["hot-coffee"];

//   return (
//     <div dir={lang === "ar" ? "rtl" : "ltr"} style={{ minHeight: "100vh" }}>
//       <Header
//         title={lang === "ar" ? `${data.highlight} ${data.title}` : data.title}
//         highlight={lang === "ar" ? "" : data.highlight}
//         highlightPos={data.highlightPos}
//         eyebrow={data.eyebrow}
//         subtitle={data.subtitle}
//         lang={lang}
//         currentLang={lang}
//         onToggleLang={setLang}
//       />
//       <main>
//         <MenuSection
//           title={lang === "ar" ? data.sectionTitleAr : data.sectionTitle}
//           subtitle={lang === "ar" ? data.sectionSubtitleAr : data.sectionSubtitle}
//           items={SAMPLE_ITEMS}
//           lang={lang}
//           cols={2}
//         />
//       </main>
//     </div>
//   );
// }