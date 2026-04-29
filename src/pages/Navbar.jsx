// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Sun, Moon } from "lucide-react";
// import { useLang } from "../context/Context";
// import {
//   fadeDown,
//   fadeUp,
//   staggerContainer,
// } from "../animations";

// const links = {
//   en: [
//     { id: "home",        label: "Home" },
//     { id: "menu-section",label: "Menu" },
//     { id: "exp-section", label: "Experience" },
//     { id: "contact",     label: "Contact" },
//   ],
//   ar: [
//     { id: "home",        label: "الرئيسية"


      
//      },
//     { id: "menu-section",label: "القائمة" },
//     { id: "exp-section", label: "التجربة" },
//     { id: "contact",     label: "تواصل معنا" },
//   ],
// };

// const PILL =
//   "relative flex items-center justify-between rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] cursor-pointer transition-all duration-300 shrink-0";

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [active,   setActive]   = useState("home");
//   const [open,     setOpen]     = useState(false);
//   const { lang, setLang } = useLang();
//   const [theme, setTheme] = useState(() =>
//     typeof window !== "undefined"
//       ? localStorage.getItem("rock-theme") || "dark"
//       : "dark"
//   );

//   const isAR   = lang === "ar";
//   const isDark = theme === "dark";
//   const currentLinks = links[lang];

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("rock-theme", theme);
//   }, [theme]);

//   useEffect(() => {
//     document.documentElement.setAttribute("lang", isAR ? "ar" : "en");
//   }, [isAR]);

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [open]);

//   useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 80);
//       const scrollPos = window.scrollY + 140;
//       currentLinks.forEach(link => {
//         const section = document.getElementById(link.id);
//         if (!section) return;
//         if (
//           scrollPos >= section.offsetTop &&
//           scrollPos < section.offsetTop + section.offsetHeight
//         ) setActive(link.id);
//       });
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [currentLinks]);

//   useEffect(() => {
//     const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const scrollToSection = (id: string) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//     setOpen(false);
//   };

//   const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");
//   const toggleLang  = () => setLang(prev  => prev === "en"   ? "ar"   : "en");

//   const navBg = "bg-transparent";

//   /* ── Pill Controls (unchanged logic) ── */
//   const PillControls = () => (
//     <div className="flex items-center gap-2" style={{ direction: "ltr" }}>
//       {/* Theme pill */}
//       <button
//         onClick={toggleTheme}
//         aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
//         className={`${PILL} w-16 h-8 px-1`}
//       >
//         <Moon size={13} className={`absolute left-2.5 transition-opacity duration-300 text-[var(--text-muted)] ${isDark ? "opacity-100" : "opacity-30"}`} />
//         <Sun  size={13} className={`absolute right-2.5 transition-opacity duration-300 text-[var(--accent-gold)] ${!isDark ? "opacity-100" : "opacity-30"}`} />
//         <span className={`
//           w-6 h-6 rounded-full shadow-md flex items-center justify-center z-10 absolute
//           transition-all duration-300
//           ${isDark
//             ? "left-1 bg-[var(--color-rock-mist)]"
//             : "left-[calc(100%-28px)] bg-[var(--color-rock-gold)]"
//           }
//         `}>
//           {isDark
//             ? <Moon size={11} className="text-[var(--bg-primary)]" />
//             : <Sun  size={11} className="text-[var(--bg-primary)]" />
//           }
//         </span>
//       </button>

//       {/* Lang pill */}
//       <button
//         onClick={toggleLang}
//         aria-label="Toggle language"
//         className={`${PILL} w-16 h-8 px-1`}
//       >
//         <span className={`absolute text-[11px] font-semibold text-[var(--text-muted)] ${isAR ? "left-2" : "right-2"}`}>
//           {isAR ? "EN" : "ع"}
//         </span>
//         <span className={`
//           w-6 h-6 rounded-full bg-[var(--accent-primary)] shadow-md
//           flex items-center justify-center z-10 absolute
//           transition-all duration-300
//           ${isAR ? "left-1" : "left-[calc(100%-28px)]"}
//         `}>
//           <span className="text-[10px] font-bold text-white">
//             {isAR ? "ع" : "EN"}
//           </span>
//         </span>
//       </button>
//     </div>
//   );

//   /* ── Mobile drawer variants ── */
//   const drawerVariants = {
//     hidden: { x: "100%", opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: { duration: 0.35, ease: "easeOut" },
//     },
//     exit: {
//       x: "100%",
//       opacity: 0,
//       transition: { duration: 0.28, ease: "easeIn" },
//     },
//   };

//   const backdropVariants = {
//     hidden:  { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.3 } },
//     exit:    { opacity: 0, transition: { duration: 0.25 } },
//   };

//   return (
//     <>
//       {/* ══════════════════════════════════════════════════════════════════
//           HEADER
//       ══════════════════════════════════════════════════════════════════ */}
//       <motion.header
//         className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-3 ${navBg}`}
//         style={{ direction: "ltr" }}
//         variants={fadeDown}
//         initial="hidden"
//         animate="visible"
//         // delay the navbar slightly so hero content can start loading
//         transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
//       >
//         <div className="container flex items-center justify-between px-4 md:px-8 h-14">

//           {/* Logo */}
//           <motion.button
//             onClick={() => scrollToSection("home")}
//             aria-label="Go to home"
//             className="focus-visible:outline-none shrink-0"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.2 }}
//           >
//             <img src="/logo.png" alt="Logo" className="w-20 md:w-24 object-contain" />
//           </motion.button>

//           {/* Desktop nav — staggered links */}
//           <motion.nav
//             className="hidden md:flex items-center gap-8"
//             style={{ direction: isAR ? "rtl" : "ltr" }}
//             variants={staggerContainer(0.08, 0.35)}
//             initial="hidden"
//             animate="visible"
//           >
//             {currentLinks.map(link => (
//               <motion.button
//                 key={link.id}
//                 onClick={() => scrollToSection(link.id)}
//                 variants={fadeDown}
//                 whileHover={{ y: -2, transition: { duration: 0.18 } }}
//                 className={`
//                   relative text-sm font-medium tracking-wide
//                   transition-colors duration-300 cursor-pointer
//                   ${isAR ? "font-[Cairo,sans-serif]" : ""}
//                   ${active === link.id
//                     ? "text-[var(--accent-primary)]"
//                     : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
//                   }
//                 `}
//               >
//                 {link.label}
//                 <span className={`
//                   absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-[var(--accent-primary)]
//                   transition-all duration-300
//                   ${active === link.id ? "w-full opacity-100" : "w-0 opacity-0"}
//                 `} />
//               </motion.button>
//             ))}
//           </motion.nav>

//           {/* Right cluster */}
//           <motion.div
//             className="flex items-center gap-3"
//             variants={fadeDown}
//             initial="hidden"
//             animate="visible"
//             transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
//           >
//             <PillControls />

//             {/* Hamburger */}
//             <button
//               onClick={() => setOpen(prev => !prev)}
//               aria-label={open ? "Close menu" : "Open menu"}
//               className="md:hidden relative w-7 h-7 flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
//             >
//               <Menu
//                 size={26}
//                 className={`absolute transition-all duration-300 ${open ? "opacity-0 scale-75 rotate-90" : "opacity-100 scale-100 rotate-0"}`}
//               />
//               <X
//                 size={26}
//                 className={`absolute transition-all duration-300 ${open ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-90"}`}
//               />
//             </button>
//           </motion.div>
//         </div>
//       </motion.header>

//       {/* ══════════════════════════════════════════════════════════════════
//           MOBILE DRAWER — slides in from right with AnimatePresence
//       ══════════════════════════════════════════════════════════════════ */}
//       <AnimatePresence>
//         {open && (
//           <>
//             {/* Drawer panel */}
//             <motion.div
//               key="drawer"
//               className="fixed top-0 right-0 w-75 min-h-full z-40 md:hidden bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] shadow-2xl"
//               variants={drawerVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               <motion.nav
//                 className="flex flex-col pt-20 px-6 py-4 gap-1"
//                 style={{ direction: isAR ? "rtl" : "ltr" }}
//                 variants={staggerContainer(0.07, 0.15)}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 {currentLinks.map((link) => (
//                   <motion.button
//                     key={link.id}
//                     onClick={() => scrollToSection(link.id)}
//                     variants={fadeUp}
//                     whileHover={{
//                       x: isAR ? -4 : 4,
//                       color: "var(--accent-primary)",
//                       transition: { duration: 0.18 },
//                     }}
//                     className={`
//                       py-4 text-lg font-semibold
//                       border-b border-[var(--border-subtle)] last:border-0
//                       transition-colors duration-200 cursor-pointer
//                       ${isAR ? "text-right font-[Cairo,sans-serif]" : "text-left"}
//                       ${active === link.id
//                         ? "text-[var(--accent-primary)]"
//                         : "text-[var(--text-primary)]"
//                       }
//                     `}
//                   >
//                     {link.label}
//                   </motion.button>
//                 ))}
//               </motion.nav>
//             </motion.div>

//             {/* Backdrop */}
//             <motion.div
//               key="backdrop"
//               onClick={() => setOpen(false)}
//               className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
//               variants={backdropVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             />
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLang } from "../context/Context";

const links = {
  en: [
    { id: "home",       label: "Home" },
    { id: "menu-section",       label: "Menu" },
    { id: "exp-section", label: "Experience" },
    { id: "contact",    label: "Contact" },
  ],
  ar: [
    { id: "home",       label: "الرئيسية" },
    { id: "menu-section",       label: "القائمة" },
    { id: "exp-section", label: "التجربة" },
    { id: "contact",    label: "تواصل معنا" },
  ],
};

/* ─── Shared pill style ───────────────────────────────────────────────────── */
const PILL =
  "relative flex items-center justify-between rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] cursor-pointer transition-all duration-300 shrink-0";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("home");
  const [open,     setOpen]     = useState(false);
  // const [lang,     setLang]     = useState("en");
  const { lang, setLang } = useLang();
  const [theme,    setTheme]    = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("rock-theme") || "dark"
      : "dark"
  );

  const isAR   = lang === "ar";
  const isDark = theme === "dark";
  const currentLinks = links[lang];

  /* ── Apply theme ── */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("rock-theme", theme);
  }, [theme]);

  /* ── Apply lang (no dir change) ── */
  useEffect(() => {
    document.documentElement.setAttribute("lang", isAR ? "ar" : "en");
  }, [isAR]);

  /* ── Lock body scroll when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ── Scroll + active section ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const scrollPos = window.scrollY + 140;
      currentLinks.forEach(link => {
        const section = document.getElementById(link.id);
        if (!section) return;
        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) setActive(link.id);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentLinks]);

  /* ── Close drawer on resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");
  const toggleLang  = () => setLang(prev  => prev === "en"   ? "ar"   : "en");

  /* ── Nav bg ── */
  const navBg = 
  // scrolled
  //   ? isDark
  //     ? "bg-[var(--bg-secondary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-xl"
  //     : "bg-[var(--bg-elevated)]/85 backdrop-blur-xl border-b border-[var(--border-default)] shadow-md"
  //   : 
    "bg-transparent";

  /* ─────────────────────────────────────────────────────────────────────────
     PILL CONTROLS — always fixed, always LTR layout, always on top
     ───────────────────────────────────────────────────────────────────────── */
  const PillControls = () => (
    <div
      className="flex items-center gap-2"
      style={{ direction: "ltr" }}   /* ← never flips, regardless of lang */
    >
      {/* Theme pill */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className={`${PILL} w-16 h-8 px-1`}
      >
        <Moon size={13} className={`absolute left-2.5 transition-opacity duration-300 text-[var(--text-muted)] ${isDark ? "opacity-100" : "opacity-30"}`} />
        <Sun  size={13} className={`absolute right-2.5 transition-opacity duration-300 text-[var(--accent-gold)] ${!isDark ? "opacity-100" : "opacity-30"}`} />
        <span className={`
          w-6 h-6 rounded-full shadow-md flex items-center justify-center z-10 absolute
          transition-all duration-300
          ${isDark
            ? "left-1 bg-[var(--color-rock-mist)]"
            : "left-[calc(100%-28px)] bg-[var(--color-rock-gold)]"
          }
        `}>
          {isDark
            ? <Moon size={11} className="text-[var(--bg-primary)]" />
            : <Sun  size={11} className="text-[var(--bg-primary)]" />
          }
        </span>
      </button>

      {/* Lang pill */}
      <button
        onClick={toggleLang}
        aria-label="Toggle language"
        className={`${PILL} w-16 h-8 px-1`}
      >
        {/* inactive label — opposite side of thumb */}
        <span className={`absolute text-[11px] font-semibold text-[var(--text-muted)] ${isAR ? "left-2" : "right-2"}`}>
          {isAR ? "EN" : "ع"}
        </span>
        {/* thumb */}
        <span className={`
          w-6 h-6 rounded-full bg-[var(--accent-primary)] shadow-md
          flex items-center justify-center z-10 absolute
          transition-all duration-300
          ${isAR ? "left-1" : "left-[calc(100%-28px)]"}
        `}>
          <span className="text-[10px] font-bold text-white">
            {isAR ? "ع" : "EN"}
          </span>
        </span>
      </button>
    </div>
  );

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          HEADER — logo + desktop nav + static controls + hamburger
          ══════════════════════════════════════════════════════════════════ */}
      <header
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500 py-3
          ${navBg}
        `}
        style={{ direction: "ltr" }}  /* ← header row never flips */
      >
        <div className="container flex items-center justify-between px-4 md:px-8 h-14">

          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            aria-label="Go to home"
            className="focus-visible:outline-none shrink-0"
          >
            <img src="/logo.png" alt="Logo" className="w-20 md:w-24 object-contain" />
          </button>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            style={{ direction: isAR ? "rtl" : "ltr" }}
          >
            {currentLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`
                  relative text-sm font-medium tracking-wide
                  transition-colors duration-300 cursor-pointer
                  ${isAR ? "font-[Cairo,sans-serif]" : ""}
                  ${active === link.id
                    ? "text-[var(--accent-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }
                `}
              >
                {link.label}
                {/* underline indicator */}
                <span className={`
                  absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-[var(--accent-primary)]
                  transition-all duration-300
                  ${active === link.id ? "w-full opacity-100" : "w-0 opacity-0"}
                `} />
              </button>
            ))}
          </nav>

          {/* Right cluster — pills always LTR, hamburger always rightmost */}
          <div className="flex items-center gap-3">
            <PillControls />

            {/* Hamburger / X — static slot, no layout shift */}
            <button
              onClick={() => setOpen(prev => !prev)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden relative w-7 h-7 flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
            >
              {/* Both icons occupy the same space, one fades in/out */}
              <Menu
                size={26}
                className={`absolute transition-all duration-300 ${open ? "opacity-0 scale-75 rotate-90" : "opacity-100 scale-100 rotate-0"}`}
              />
              <X
                size={26}
                className={`absolute transition-all duration-300 ${open ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-90"}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE DROPDOWN MENU — slides down from below the header bar
          No duplicate buttons. Just nav links.
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className={`
          fixed top-0 min-h-full right-0 w-75 z-40 md:hidden
          bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]
          shadow-2xl overflow-hidden
          transition-all duration-400 ease-in-out
          ${open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
        `}
      >
        <nav
          className="flex pt-20! flex-col px-6!  py-4! gap-6! "
          style={{ direction: isAR ? "rtl" : "ltr" }}
        >
          {currentLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                transitionDelay: open ? `${i * 50}ms` : "0ms",
              }}
              className={`
                py-4! text-lg font-semibold 
                border-b border-[var(--border-subtle)] last:border-0
                transition-all duration-300 cursor-pointer
                ${isAR ? "text-right font-[Cairo,sans-serif]" : "text-left"}
                ${active === link.id
                  ? "text-[var(--accent-primary)] translate-x-1"
                  : "text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:translate-x-1"
                }
                ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
              `}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Backdrop (closes menu on outside tap) */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />
    </>
  );
}