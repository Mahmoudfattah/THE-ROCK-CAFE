import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLang } from "../context/Context";
import { fadeDown, staggerContainer } from "../animations/animation";

const links = {
  en: [
    { id: "home",        label: "Home" },
    { id: "menu-section",label: "Menu" },
    { id: "exp-section", label: "Experience" },
    { id: "contact",     label: "Contact" },
  ],
  ar: [
    { id: "home",        label: "الرئيسية" },
    { id: "menu-section",label: "القائمة" },
    { id: "exp-section", label: "التجربة" },
    { id: "contact",     label: "تواصل معنا" },
  ],
};

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
      style={{ direction: "ltr" }}
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
        <span className={`absolute text-[11px] font-semibold text-[var(--text-muted)] ${isAR ? "left-2" : "right-2"}`}>
          {isAR ? "EN" : "ع"}
        </span>
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

      {/* header → motion.header | added: variants, initial, animate, transition */}
      <motion.header
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500 py-3
          ${navBg}
        `}
        style={{ direction: "ltr" }}
        variants={fadeDown}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <div className="container flex items-center justify-between px-4 md:px-8 h-14">

          {/* Logo — unchanged */}
          <button
            onClick={() => scrollToSection("home")}
            aria-label="Go to home"
            className="focus-visible:outline-none shrink-0"
          >
            <img src="/logo.png" alt="Logo" className="w-20 md:w-24 object-contain" />
          </button>

          {/* Desktop nav — nav → motion.nav | links → motion.button */}
          {/* added: staggerContainer on nav, fadeDown variant on each link */}
          <motion.nav
            className="hidden md:flex items-center gap-8"
            style={{ direction: isAR ? "rtl" : "ltr" }}
            variants={staggerContainer(0.08, 0.35)}
            initial="hidden"
            animate="visible"
          >
            {currentLinks.map(link => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                variants={fadeDown}
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
                {/* underline indicator — unchanged */}
                <span className={`
                  absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-[var(--accent-primary)]
                  transition-all duration-300
                  ${active === link.id ? "w-full opacity-100" : "w-0 opacity-0"}
                `} />
              </motion.button>
            ))}
          </motion.nav>

          {/* Right cluster — unchanged */}
          <div className="flex items-center gap-3">
            <PillControls />

            {/* Hamburger / X — unchanged */}
            <button
              onClick={() => setOpen(prev => !prev)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden relative w-7 h-7 flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
            >
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
      </motion.header>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE DROPDOWN MENU
          Only change: outer div → AnimatePresence + motion.div
          All classes are identical to the original
          ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            className={`
              fixed top-0 min-h-full right-0 w-75 z-40 md:hidden
              bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]
              shadow-2xl overflow-hidden
            `}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0,      opacity: 1 }}
            exit={{    x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <nav
              className="flex pt-20! flex-col px-6!  py-4! gap-6! "
              style={{ direction: isAR ? "rtl" : "ltr" }}
            >
              {currentLinks.map((link, i) => (
                /* button → motion.button | added: initial/animate/transition for stagger */
                /* all existing classes kept exactly as-is */
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ delay: i * 0.05, duration: 0.28, ease: "easeOut" }}
                  className={`
                    py-4! text-lg font-semibold 
                    border-b border-[var(--border-subtle)] last:border-0
                    transition-all duration-300 cursor-pointer
                    ${isAR ? "text-right font-[Cairo,sans-serif]" : "text-left"}
                    ${active === link.id
                      ? "text-[var(--accent-primary)] translate-x-1"
                      : "text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:translate-x-1"
                    }
                  `}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop — unchanged */}
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