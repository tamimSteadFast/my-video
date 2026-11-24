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
  clamp,
  springAt,
  useVoice,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

const RECAP_STAGES = [
  { label: "Prompt", color: L5_C.cyan },
  { label: "Tokens", color: L5_C.cyanSoft },
  { label: "Vectors", color: L5_C.violetSoft },
  { label: "Attention", color: L5_C.amberSoft },
  { label: "Next Token", color: L5_C.emeraldSoft },
] as const;

export const Scene10RecapNextCta: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene10");

  // Exact acoustic beats from scene_10_inspirational_scene_10.wav (11.84s):
  // 0.28-2.84: "এখন তুমি জানো একটি LLM কীভাবে কাজ করে।"
  // 3.30-7.72: "পরবর্তী ধাপে আমরা আরও গভীরে গিয়ে Tokenization এবং Embedding নিয়ে শিখব।"
  // 8.20-11.54: "AI Engineering শেখার এই Journey-তে আমাদের সঙ্গে থাকো।"
  const recapPop = springAt(frame, fps, 0.2, SPRING_HERO);
  const nextPop = springAt(frame, fps, 3.25, SPRING_HERO);
  const chipsPop = springAt(frame, fps, 5.55, SPRING_HERO);
  const ctaPop = springAt(frame, fps, 8.15, SPRING_HERO);

  const isNextPhase = voiceSec >= 3.25 && voiceSec < 8.15;
  const isCtaPhase = voiceSec >= 8.15;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 8);

  return (
    <SceneShell
      id="scene10"
      sfx={[
        { atVoiceSec: 0.25, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 3.3, kind: "pop", volume: 0.17 },
        { atVoiceSec: 5.65, kind: "click", volume: 0.15 },
        { atVoiceSec: 8.2, kind: "chime", volume: 0.2 },
      ]}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        {/* 1. LESSON 05 COMPLETE RECAP CARD (0.2s - 3.1s spotlight) */}
        <FocusCard
          accent={L5_C.emerald}
          active={!isNextPhase && !isCtaPhase}
          appear={recapPop}
          padding="28px 30px"
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <RolePill
              label="LESSON 05 COMPLETE ✓"
              color={L5_C.emeraldSoft}
              bg={L5_C.emeraldBg}
              fontSize={18}
            />
            <GlyphIcon kind="check" color={L5_C.emeraldSoft} size={36} />
          </div>

          <div
            style={{
              fontFamily: L5_FONT_DISPLAY,
              fontSize: 40,
              fontWeight: 800,
              color: L5_C.text,
              lineHeight: 1.16,
            }}
          >
            You Now Know How LLMs Work!
          </div>
          <div
            style={{
              fontFamily: L5_FONT_BN,
              fontSize: 26,
              fontWeight: 600,
              color: L5_C.textMuted,
              marginTop: 6,
            }}
          >
            এখন তুমি জানো একটি LLM ভেতরে কীভাবে কাজ করে
          </div>

          {/* Complete 5-Stage Mini Pipeline Recap */}
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            {RECAP_STAGES.map((st, idx) => (
              <div
                key={st.label}
                style={{
                  flex: 1,
                  background: "rgba(5, 11, 28, 0.94)",
                  border: `1.5px solid ${st.color}`,
                  borderRadius: 12,
                  padding: "10px 6px",
                  textAlign: "center",
                  fontFamily: L5_FONT_MONO,
                  fontSize: 15,
                  fontWeight: 800,
                  color: st.color,
                  opacity: interpolate(recapPop, [0, 1], [0.3, 1], clamp),
                  transform: `translate3d(0px, ${idx % 2 === 0 ? 0 : 0}px, 0px)`,
                }}
              >
                {st.label}
              </div>
            ))}
          </div>
        </FocusCard>

        {/* 2. UP NEXT TEASER: LESSON 06 — TOKENIZATION & EMBEDDINGS DEEP DIVE (3.25s - 8.1s) */}
        <FocusCard
          accent={L5_C.violet}
          active={isNextPhase}
          appear={nextPop}
          padding="28px 30px"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 22,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <RolePill
              label="UP NEXT · LESSON 06"
              color={L5_C.violetSoft}
              bg={L5_C.violetBg}
              fontSize={19}
            />
            <GlyphIcon kind="spark" color={L5_C.orchid} size={36} />
          </div>

          <div>
            <div
              style={{
                fontFamily: L5_FONT_DISPLAY,
                fontSize: 42,
                fontWeight: 800,
                color: L5_C.text,
                lineHeight: 1.15,
              }}
            >
              Deep Dive Coming Next
            </div>
            <div
              style={{
                fontFamily: L5_FONT_BN,
                fontSize: 28,
                fontWeight: 700,
                color: L5_C.violetSoft,
                marginTop: 8,
              }}
            >
              পরবর্তী ধাপে আরও গভীরে শিখব:
            </div>
          </div>

          {/* Dual Deep-Dive Topic Cards (pop at 5.55s) */}
          <div
            style={{
              display: "flex",
              gap: 16,
              opacity: chipsPop,
              transform: `scale(${interpolate(chipsPop, [0, 1], [0.92, 1], clamp)})`,
            }}
          >
            <div
              style={{
                flex: 1,
                background: L5_C.cyanBg,
                border: `2px solid ${L5_C.cyan}`,
                borderRadius: 18,
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <GlyphIcon kind="slices" color={L5_C.cyan} size={34} />
              <div>
                <div style={{ fontFamily: L5_FONT_DISPLAY, fontSize: 27, fontWeight: 800, color: L5_C.text }}>
                  Tokenization
                </div>
                <div style={{ fontFamily: L5_FONT_MONO, fontSize: 15, color: L5_C.cyanSoft }}>
                  BPE &amp; Subwords
                </div>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                background: L5_C.violetBg,
                border: `2px solid ${L5_C.violetSoft}`,
                borderRadius: 18,
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <GlyphIcon kind="vector" color={L5_C.violetSoft} size={34} />
              <div>
                <div style={{ fontFamily: L5_FONT_DISPLAY, fontSize: 27, fontWeight: 800, color: L5_C.text }}>
                  Embeddings
                </div>
                <div style={{ fontFamily: L5_FONT_MONO, fontSize: 15, color: L5_C.orchid }}>
                  Vector Similarity
                </div>
              </div>
            </div>
          </div>
        </FocusCard>

        {/* 3. STAY WITH US SERIES CTA CARD (8.15s - 11.84s) */}
        <FocusCard
          accent={L5_C.cyan}
          active={isCtaPhase}
          appear={ctaPop}
          padding="28px 32px"
          style={{
            boxShadow: isCtaPhase
              ? `0 22px 60px rgba(0, 0, 0, 0.78), 0 0 ${24 + pulse * 18}px rgba(0, 229, 255, 0.42)`
              : undefined,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                fontFamily: L5_FONT_BN,
                fontSize: 38,
                fontWeight: 800,
                color: L5_C.text,
                lineHeight: 1.28,
              }}
            >
              <span style={{ color: L5_C.cyan }}>AI Engineering</span> শেখার এই Journey-তে আমাদের সঙ্গে থাকো
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                background: "linear-gradient(90deg, rgba(0, 229, 255, 0.22), rgba(168, 85, 247, 0.26))",
                border: `2px solid ${L5_C.cyan}`,
                borderRadius: 999,
                padding: "13px 34px",
                boxShadow: isCtaPhase ? `0 0 ${16 + pulse * 16}px rgba(0, 229, 255, 0.4)` : "none",
              }}
            >
              <GlyphIcon kind="rocket" color={L5_C.cyan} size={28} />
              <span
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 22,
                  fontWeight: 800,
                  color: L5_C.text,
                  letterSpacing: 1.5,
                }}
              >
                FOLLOW FOR LESSON 06 →
              </span>
            </div>
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
