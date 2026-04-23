/* ── Hero Overlay ──────────────────────────────────────────── */
function HeroOverlay({ item, imgRef, onDismiss }) {
  const overlayRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const menuPageRef = useRef(null);
  const navigate = useNavigate();

  const scrollProgress = useRef(0); // 0 → 1
  const isDragging = useRef(false);
  const touchStartY = useRef(0);
  const isNavigating = useRef(false);

  /* ── 1. Expand image on mount ── */
  useEffect(() => {
    const bg = bgRef.current;
    const overlay = overlayRef.current;
    const text = textRef.current;
    const menuPage = menuPageRef.current;

    const srcRect = imgRef.current.getBoundingClientRect();

    gsap.set(bg, {
      top: srcRect.top,
      left: srcRect.left,
      width: srcRect.width,
      height: srcRect.height,
      borderRadius: 14,
    });

    // MenuDemo starts below viewport
    gsap.set(menuPage, { y: "100vh" });

    gsap.set(overlay, { opacity: 0 });
    gsap.to(overlay, { opacity: 1, duration: 0.3 });

    gsap.to(bg, {
      top: 0, left: 0,
      width: "100%", height: "100%",
      borderRadius: 0,
      duration: 1.4,
      ease: "power4.inOut",
      onComplete: () => {
        gsap.fromTo(
          text.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }
        );
      },
    });
  }, []);

  /* ── 2. Update scroll progress → move MenuDemo ── */
  const updateScroll = useCallback((delta) => {
    if (isNavigating.current) return;

    const prev = scrollProgress.current;
    scrollProgress.current = Math.min(1, Math.max(0, prev + delta));

    const menuPage = menuPageRef.current;
    const yVal = 100 - scrollProgress.current * 100; // 100vh → 0vh
    gsap.set(menuPage, { y: `${yVal}vh` });

    // Fully revealed → navigate
    if (scrollProgress.current >= 1) {
      isNavigating.current = true;
      navigate(`/menu/${item.slug}`);
    }
  }, [item.slug, navigate]);

  /* ── 3. Wheel ── */
  useEffect(() => {
    const el = overlayRef.current;

    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY / window.innerHeight; // normalize
      updateScroll(delta);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [updateScroll]);

  /* ── 4. Touch ── */
  useEffect(() => {
    const el = overlayRef.current;

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      e.preventDefault();
      const diff = touchStartY.current - e.touches[0].clientY;
      const delta = diff / window.innerHeight;
      touchStartY.current = e.touches[0].clientY;
      updateScroll(delta);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [updateScroll]);

  /* ── VIEW MENU button → animate to full ── */
  const handleViewMenu = () => {
    if (isNavigating.current) return;
    isNavigating.current = true;

    gsap.to(menuPageRef.current, {
      y: "0vh",
      duration: 1.2,
      ease: "power4.out",
      onComplete: () => navigate(`/menu/${item.slug}`),
    });
  };

  /* ── BACK button ── */
  const handleBack = () => {
    onDismiss(); // أخبر الـ parent يشيل الـ overlay
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        overflow: "hidden",
      }}
    >
      {/* Expanding background image */}
      <div
        ref={bgRef}
        style={{
          position: "fixed",
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Dark gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.3) 60%, transparent 100%)",
        zIndex: 1,
      }} />

      {/* BACK button — top left */}
      <button
        onClick={handleBack}
        style={{
          position: "absolute",
          top: 16, left: 16,
          zIndex: 10,
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 18px",
          border: "1.5px solid rgba(255,255,255,0.3)",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          color: "rgba(255,255,255,0.8)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          letterSpacing: ".15em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        ← BACK
      </button>

      {/* Text content */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          bottom: "14%",
          left: 0, right: 0,
          textAlign: "center",
          zIndex: 2,
          padding: "0 24px",
        }}
      >
        {/* Eyebrow */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12, letterSpacing: ".35em",
          textTransform: "uppercase",
          color: "#c8960c", marginBottom: 12,
        }}>
          VOG Specialty Coffee
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.4rem, 8vw, 5rem)",
          fontWeight: 700, color: "#fff",
          letterSpacing: ".08em", textTransform: "uppercase",
          margin: "0 0 12px", lineHeight: 1,
        }}>
          {item.title}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontStyle: "italic", fontSize: 14,
          color: "rgba(255,255,255,.6)",
          maxWidth: 320, margin: "0 auto 28px",
          lineHeight: 1.8,
        }}>
          {item.desc}
        </p>

        {/* VIEW MENU button */}
        <button
          onClick={handleViewMenu}
          style={{
            display: "block",
            margin: "0 auto 20px",
            padding: "14px 40px",
            background: "#c8f000",
            color: "#000",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
          }}
        >
          VIEW MENU
        </button>

        {/* SCROLL DOWN hint */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 6,
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.45)",
          }}>
            SCROLL DOWN
          </span>
          <span style={{ color: "rgba(255,255,255,.45)", fontSize: 18 }}>↓</span>
        </div>
      </div>

      {/* MenuDemo page — slides up with scroll */}
      <div
        ref={menuPageRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          overflowY: "auto",
          background: "var(--bg-primary, #0d0d0d)",
        }}
      >
        <MenuDemoContent item={item} />
      </div>
    </div>
  );
}