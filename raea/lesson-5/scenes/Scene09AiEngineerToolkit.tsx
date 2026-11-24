import React from "react";
import { interpolate } from "raea";
import {
  L5_C,
  L5_FONT_BN,
  L5_FONT_DISPLAY,
  L5_FONT_MONO,
  SPRING_HERO,
} from "../narration";
import {
  FocusCard,
  GlyphIcon,
  RolePill,
  SectionHeading,
  clamp,
  springAt,
  useVoice,
  type GlyphKind,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

// Exact acoustic keyword triggers measured from scene_09_professional_scene_9.wav (15.36s):
// 0.28-4.24: "একজন AI Engineer হিসেবে আমাদের Tokenization," -> Tokenization @ ~3.15s
// 4.40-5.22: "Embedding," -> @ 4.40s
// 5.40-6.30: "Transformer," -> @ 5.40s
// 6.58-7.64: "Context Window," -> @ 6.58s
// 7.76-10.16: "Token Usage এবং Inference সম্পর্কে..." -> Token Usage @ 7.76s, Inference @ 8.55s
// 10.54-14.98: "কারণ এগুলো দিয়েই আমরা Efficient এবং Production-ready AI Application তৈরি করি।"
const PILLARS: readonly {
  readonly num: string;
  readonly title: string;
  readonly detail: string;
  readonly icon: GlyphKind;
  readonly color: string;
  readonly atSec: number;
}[] = [
  {
    num: "01",
    title: "Tokenization",
    detail: "Prompt splitting & limits",
    icon: "slices",
    color: L5_C.cyan,
    atSec: 3.1,
  },
  {
    num: "02",
    title: "Embedding",
    detail: "Semantic vector space",
    icon: "vector",
    color: L5_C.violetSoft,
    atSec: 4.35,
  },
  {
    num: "03",
    title: "Transformer",
    detail: "Self-attention engine",
    icon: "attention",
    color: L5_C.orchid,
    atSec: 5.35,
  },
  {
    num: "04",
    title: "Context Window",
    detail: "Memory span per call",
    icon: "window",
    color: L5_C.amberSoft,
    atSec: 6.55,
  },
  {
    num: "05",
    title: "Token Usage",
    detail: "Cost & speed optimization",
    icon: "sliders",
    color: L5_C.cyanSoft,
    atSec: 7.75,
  },
  {
    num: "06",
    title: "Inference",
    detail: "Low-latency serving",
    icon: "bolt",
    color: L5_C.emeraldSoft,
    atSec: 8.55,
  },
];

export const Scene09AiEngineerToolkit: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene9");

  const headPop = springAt(frame, fps, 0.15, SPRING_HERO);
  const gridPop = springAt(frame, fps, 1.5, SPRING_HERO);
  const prodPop = springAt(frame, fps, 10.5, SPRING_HERO);

  const isProdPhase = voiceSec >= 10.5;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 9);

  return (
    <SceneShell
      id="scene9"
      sfx={[
        { atVoiceSec: 0.2, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 3.15, kind: "click", volume: 0.14 },
        { atVoiceSec: 4.4, kind: "click", volume: 0.14 },
        { atVoiceSec: 5.4, kind: "click", volume: 0.14 },
        { atVoiceSec: 6.58, kind: "click", volume: 0.14 },
        { atVoiceSec: 7.76, kind: "click", volume: 0.14 },
        { atVoiceSec: 8.58, kind: "pop", volume: 0.16 },
        { atVoiceSec: 10.55, kind: "chime", volume: 0.2 },
      ]}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 18,
        }}
      >
        {/* TOP HEADER */}
        <SectionHeading
          eyebrow="AI ENGINEER ESSENTIALS · 6 PILLARS"
          title="What You Must Master"
          subtitle="দক্ষ AI Engineer হওয়ার ৬টি মূল ভিত্তি"
          accent={L5_C.emeraldSoft}
          appear={headPop}
        />

        {/* 2x3 CORE CONCEPT GRID (lights up exactly on each spoken term) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            alignContent: "stretch",
            opacity: gridPop,
          }}
        >
          {PILLARS.map((item, idx) => {
            const lit = voiceSec >= item.atSec;
            const nextSec = idx < PILLARS.length - 1 ? PILLARS[idx + 1].atSec : 10.5;
            const isCurrent = voiceSec >= item.atSec && voiceSec < nextSec;
            const p = springAt(frame, fps, item.atSec);

            return (
              <div
                key={item.num}
                style={{
                  width: "calc(50% - 9px)",
                  height: 178,
                  background: isCurrent
                    ? "linear-gradient(150deg, rgba(18, 34, 72, 0.98), rgba(9, 17, 42, 0.98))"
                    : lit
                      ? "rgba(11, 20, 48, 0.94)"
                      : "rgba(8, 13, 32, 0.72)",
                  border: `2px solid ${
                    isCurrent
                      ? item.color
                      : lit
                        ? `${item.color}88`
                        : L5_C.borderSubtle
                  }`,
                  borderRadius: 22,
                  padding: "20px 22px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  opacity: lit ? 1 : 0.4,
                  transform: `scale(${
                    lit ? interpolate(p, [0, 1], [0.9, isCurrent ? 1.03 : 1], clamp) : 0.96
                  })`,
                  boxShadow: isCurrent ? `0 16px 38px ${item.color}38` : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: lit ? `${item.color}22` : "rgba(148,163,184,0.1)",
                      border: `1.5px solid ${lit ? item.color : L5_C.borderSubtle}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GlyphIcon
                      kind={item.icon}
                      color={lit ? item.color : L5_C.textDim}
                      size={28}
                    />
                  </div>

                  <span
                    style={{
                      fontFamily: L5_FONT_MONO,
                      fontSize: 17,
                      fontWeight: 800,
                      color: lit ? item.color : L5_C.textDim,
                    }}
                  >
                    {lit ? `✓ ${item.num}` : item.num}
                  </span>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: L5_FONT_DISPLAY,
                      fontSize: 30,
                      fontWeight: 800,
                      color: lit ? L5_C.text : L5_C.textDim,
                      lineHeight: 1.18,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: L5_FONT_MONO,
                      fontSize: 16,
                      color: lit ? L5_C.textMuted : L5_C.textDim,
                      marginTop: 5,
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM PRODUCTION-READY PAYOFF BANNER (10.5s - 15.36s) */}
        <FocusCard
          accent={L5_C.emerald}
          active={isProdPhase}
          appear={prodPop}
          padding="24px 28px"
          style={{
            boxShadow: isProdPhase
              ? `0 22px 60px rgba(0,0,0,0.75), 0 0 ${24 + pulse * 18}px rgba(16, 185, 129, 0.42)`
              : undefined,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <RolePill
              label="PRODUCTION OUTCOME"
              color={L5_C.emeraldSoft}
              bg={L5_C.emeraldBg}
              fontSize={17}
            />
            <GlyphIcon kind="rocket" color={L5_C.emeraldSoft} size={34} />
          </div>

          <div
            style={{
              fontFamily: L5_FONT_DISPLAY,
              fontSize: 36,
              fontWeight: 800,
              color: L5_C.text,
              lineHeight: 1.18,
            }}
          >
            Efficient &amp; Production-Ready AI Apps
          </div>
          <div
            style={{
              fontFamily: L5_FONT_BN,
              fontSize: 24,
              fontWeight: 600,
              color: L5_C.textMuted,
              marginTop: 6,
            }}
          >
            এগুলো দিয়েই তৈরি হয় বাস্তব, দ্রুত ও স্কেলেবল AI Application
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            {["LOW LATENCY", "COST OPTIMIZED", "PRODUCTION READY"].map((tag) => (
              <div
                key={tag}
                style={{
                  flex: 1,
                  background: L5_C.emeraldBg,
                  border: `1.5px solid ${L5_C.borderEmerald}`,
                  borderRadius: 12,
                  padding: "9px 10px",
                  textAlign: "center",
                  fontFamily: L5_FONT_MONO,
                  fontSize: 15,
                  fontWeight: 800,
                  color: L5_C.emeraldSoft,
                }}
              >
                ✓ {tag}
              </div>
            ))}
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
