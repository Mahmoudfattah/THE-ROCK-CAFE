/**
 * GsapPlayground.jsx
 * -------------------
 * صفحة تدريب واحدة فيها كل مفاهيم GSAP بالترتيب.
 * كل section مستقل، جرب/عدّل فيه وشوف اللي بيحصل مباشرة.
 *
 * التركيب المطلوب:
 *   npm install gsap @gsap/react
 *
 * إزاي تضيفها لمشروعك:
 *   1. حط الملف ده في src/pages/GsapPlayground.jsx
 *   2. ضيف route ليها في الراوتر بتاعك (مثال في آخر الملف)
 */

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { InertiaPlugin } from "gsap/all";

// التسجيل بيتعمل مرة واحدة بس، برة الـ component
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  Draggable,
  SplitText,
  Flip,
  InertiaPlugin,
);

export default function GsapPlayground() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/90 px-6 py-4 backdrop-blur">
        <h1 className="text-xl font-semibold">
          GSAP <span className="text-[#3fc3ff]">Playground</span>
        </h1>
        <p className="text-sm text-white/50">
          كل قسم تحت مستقل عن التاني — انزل وجرب بالترتيب
        </p>
      </header>

      <main className="mx-auto max-w-3xl space-y-24 px-6 py-16">
        <TweenSection />
        <TimelineSection />
        <StaggerSection />
        <EasingSection />
        <ContextSafeSection />
        <DraggableSection />
        <SplitTextSection />
        <FlipSection />
        <ScrollTriggerSection />
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Tween أساسي — gsap.to / from / fromTo                            */
/* ------------------------------------------------------------------ */
function TweenSection() {
  const box = useRef(null);
  const { contextSafe } = useGSAP({ scope: box });

  const runTween = contextSafe(() => {
    gsap.fromTo(
      box.current,
      { x: 0, opacity: 0.4, scale: 0.8 },
      { x: 200, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
    );
  });

  const reset = contextSafe(() => {
    gsap.set(box.current, { x: 0, opacity: 0.4, scale: 0.8 });
  });

  return (
    <Section
      title="1. Tween أساسي"
      desc="gsap.fromTo — من حالة معينة لحالة تانية"
    >
      <div ref={box} className="flex h-24 items-center">
        <div
          className="h-12 w-12 rounded-lg bg-[#3fc3ff]"
          style={{ opacity: 0.4, transform: "scale(0.8)" }}
        />
      </div>
      <Controls>
        <Btn onClick={runTween}>Run Tween</Btn>
        <Btn onClick={reset} variant="ghost">
          Reset
        </Btn>
      </Controls>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Timeline — sequencing + position parameters                      */
/* ------------------------------------------------------------------ */
function TimelineSection() {
  const scope = useRef(null);
  const logo = useRef(null);
  const title = useRef(null);
  const subtitle = useRef(null);
  const cta = useRef(null);

  const { contextSafe } = useGSAP({ scope });

  const playTimeline = contextSafe(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      logo.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
    )
      .fromTo(
        title.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.2",
      )
      .fromTo(
        subtitle.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3",
      )
      .fromTo(
        cta.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4 },
        "-=0.2",
      );
  });

  return (
    <Section
      title="2. Timeline"
      desc="hero sequence — لاحظ الـ overlap بين كل عنصر والتاني (-=0.2 / -=0.3)"
    >
      <div
        ref={scope}
        className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 py-10"
      >
        <div
          ref={logo}
          className="h-8 w-8 rounded-full bg-[#3fc3ff]"
          style={{ opacity: 0 }}
        />
        <div ref={title} className="text-2xl font-bold" style={{ opacity: 0 }}>
          Mahmoud Fattah
        </div>
        <div ref={subtitle} className="text-white/50" style={{ opacity: 0 }}>
          Front-End Engineer
        </div>
        <button
          ref={cta}
          className="mt-2 rounded-lg bg-[#3fc3ff] px-4 py-2 text-sm font-medium text-black"
          style={{ opacity: 0 }}
        >
          Hire Me
        </button>
      </div>
      <Controls>
        <Btn onClick={playTimeline}>Play Timeline</Btn>
      </Controls>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Stagger — تحريك مجموعة عناصر مرة واحدة                            */
/* ------------------------------------------------------------------ */
function StaggerSection() {
  const scope = useRef(null);
  const { contextSafe } = useGSAP({ scope });

  const runStagger = contextSafe(() => {
    gsap.fromTo(
      ".stagger-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
    );
  });

  return (
    <Section title="3. Stagger" desc="نفس التمرين بتاع menu items في Rock Café">
      <div ref={scope} className="grid grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="stagger-item h-16 rounded-lg bg-white/10" />
        ))}
      </div>
      <Controls>
        <Btn onClick={runStagger}>Run Stagger</Btn>
      </Controls>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Easing — قارن بين منحنيات مختلفة على نفس الحركة                    */
/* ------------------------------------------------------------------ */
const EASES = [
  "power2.out",
  "elastic.out(1, 0.3)",
  "back.out(2)",
  "bounce.out",
  "expo.inOut",
];

function EasingSection() {
  const scope = useRef(null);
  const { contextSafe } = useGSAP({ scope });

  const runEase = contextSafe((ease, el) => {
    gsap.fromTo(el, { x: 0 }, { x: 260, duration: 1, ease });
  });

  return (
    <Section title="4. Easing" desc="دوس على كل زرار وشوف الفرق في الإحساس">
      <div ref={scope} className="space-y-3">
        {EASES.map((ease) => (
          <EaseRow key={ease} ease={ease} onRun={runEase} />
        ))}
      </div>
    </Section>
  );
}

function EaseRow({ ease, onRun }) {
  const dot = useRef(null);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => dot.current && onRun(ease, dot.current)}
        className="w-40 shrink-0 rounded-md bg-white/10 px-3 py-1.5 text-left text-xs hover:bg-white/20"
      >
        {ease}
      </button>
      <div className="relative h-3 flex-1 rounded-full bg-white/5">
        <div
          ref={dot}
          className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-[#3fc3ff]"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. contextSafe — أنيميشن جوه event handler                           */
/* ------------------------------------------------------------------ */
function ContextSafeSection() {
  const scope = useRef(null);
  const { contextSafe } = useGSAP({ scope });

  const spin = contextSafe(() => {
    gsap.to(".good", {
      rotation: "+=360",
      duration: 1,
      ease: "power2.inOut",
    });
  });

  return (
    <Section
      title="5. contextSafe"
      desc="نفس الباترن اللي طبقته — أنيميشن بيحصل بـ click مش بـ mount"
    >
      <div ref={scope} className="flex h-20 items-center">
        <div className="good h-10 w-10 rounded-md bg-[#3fc3ff]" />
      </div>
      <Controls>
        <Btn onClick={spin}>Rotate 360°</Btn>
      </Controls>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Draggable                                                        */
/* ------------------------------------------------------------------ */
function DraggableSection() {
  const container = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);

 useGSAP(
  () => {
    if (card1.current) {
      Draggable.create(card1.current, { type: "x", bounds: container.current, inertia: true });
    }
    if (card2.current) {
      Draggable.create(card2.current, { type: "rotation", bounds: container.current, inertia: true });
    }
    if (card3.current) {
      Draggable.create(card3.current, { type: "x,y", bounds: container.current, inertia: true });
    }
  },
  { scope: container }
);

  return (
    <Section title="6. Draggable" desc="اسحب الكارت جوه الصندوق">
      <div
        ref={container}
        className="flex h-48 items-center justify-between gap-8 rounded-xl border border-dashed border-white/20 bg-white/5 p-10"
      >
        <div
          ref={card1}
          className="flex h-16 w-16 cursor-grab items-center justify-center rounded-lg bg-[#3fc3ff] text-xs font-medium text-black active:cursor-grabbing"
        >
          Drag
        </div>
        <div
          ref={card2}
          className="flex h-16 w-16 cursor-grab items-center justify-center rounded-lg bg-[#3fc3ff] text-xs font-medium text-black active:cursor-grabbing"
        >
          Drag2
        </div>
        <div
          ref={card3}
          className="flex h-16 w-16 cursor-grab items-center justify-center rounded-lg bg-[#3fc3ff] text-xs font-medium text-black active:cursor-grabbing"
        >
          Drag3
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. SplitText — character reveal                                     */
/* ------------------------------------------------------------------ */
function SplitTextSection() {
  const heading = useRef(null);
  const scope = useRef(null);
  const { contextSafe } = useGSAP({ scope });

  const runSplit = contextSafe(() => {
    if (!heading.current) return;
    const split = SplitText.create(heading.current, { type: "chars" });
    gsap.fromTo(
      split.chars,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: "back.out(1.7)" },
    );
  });

  return (
    <Section
      title="7. SplitText"
      desc="character-by-character reveal — زي عناوين Rock Café"
    >
      <div ref={scope}>
        <h3 ref={heading} className="text-3xl font-bold">
          Front-End Engineer
        </h3>
      </div>
      <Controls>
        <Btn onClick={runSplit}>Split & Reveal</Btn>
      </Controls>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Flip — انتقال سلس بين layout مختلف                                 */
/* ------------------------------------------------------------------ */
function FlipSection() {
  const [expanded, setExpanded] = useState(false);
  const box = useRef(null);
  const scope = useRef(null);
  const { contextSafe } = useGSAP({ scope });

  const toggle = contextSafe(() => {
    if (!box.current) return;
    const state = Flip.getState(box.current);
    setExpanded((prev) => !prev);
    requestAnimationFrame(() => {
      Flip.from(state, { duration: 0.5, ease: "power2.inOut" });
    });
  });

  return (
    <Section
      title="8. Flip"
      desc="نفس الفكرة اللي هتستخدمها في menu overlay بتاع Rock Café"
    >
      <div
        ref={scope}
        className={`flex ${expanded ? "justify-end" : "justify-start"}`}
      >
        <div
          ref={box}
          className={`rounded-lg bg-[#3fc3ff] ${expanded ? "h-32 w-32" : "h-16 w-16"}`}
        />
      </div>
      <Controls>
        <Btn onClick={toggle}>Toggle Flip</Btn>
      </Controls>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* 9. ScrollTrigger                                                     */
/* ------------------------------------------------------------------ */
function ScrollTriggerSection() {
  const scope = useRef(null);
  const panel = useRef(null);

  useGSAP(
    () => {
      if (!panel.current) return;
      gsap.fromTo(
        panel.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            // markers: true, // فعّلها وانت بتتعلم عشان تشوف الـ trigger points
          },
        },
      );
    },
    { scope },
  );

  return (
    <Section
      title="9. ScrollTrigger"
      desc="انزل لتحت وارجع فوق تاني عشان تشوف toggleActions"
    >
      <div ref={scope}>
        <div
          ref={panel}
          className="flex h-40 items-center justify-center rounded-xl border border-[#3fc3ff]/30 bg-[#3fc3ff]/10 text-lg font-medium"
        >
          Reveals on scroll
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* UI helpers                                                           */
/* ------------------------------------------------------------------ */
function Section({ title, desc, children }) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#3fc3ff]">{title}</h2>
        <p className="text-sm text-white/50">{desc}</p>
      </div>
      {children}
    </section>
  );
}

function Controls({ children }) {
  return <div className="mt-4 flex gap-2">{children}</div>;
}

function Btn({ children, onClick, variant = "solid", ...rest }) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={
        variant === "solid"
          ? "rounded-lg bg-[#3fc3ff] px-4 py-2 text-sm font-medium text-black hover:opacity-90"
          : "rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10"
      }
    >
      {children}
    </button>
  );
}

/*
إزاي تضيفها كـ route (React Router v6/v7):

  import GsapPlayground from "./pages/GsapPlayground";

  <Route path="/playground" element={<GsapPlayground />} />

بعدين افتح: http://localhost:5173/playground
*/
