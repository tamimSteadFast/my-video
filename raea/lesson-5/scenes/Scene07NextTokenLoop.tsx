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
  TokenChip,
  clamp,
  springAt,
  useVoice,
  type GlyphKind,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

const LOOP_STEPS: readonly {
  readonly num: string;
  readonly title: string;
  readonly bn: string;
  readonly icon: GlyphKind;
  readonly color: string;
  readonly startSec: number;
  readonly endSec: number;
}[] = [
  {
    num: "01",
    title: "Generate 1 Token",
    bn: "একটি Token তৈরি করে",
    icon: "spark",
    color: L5_C.cyan,
    startSec: 4.5,
    endSec: 6.5,
  },
  {
    num: "02",
    title: "Append to Context",
    bn: "Context-এর সঙ্গে যুক্ত করে",
    icon: "layers",
    color: L5_C.violetSoft,
    startSec: 6.5,
    endSec: 8.6,
  },
  {
    num: "03",
    title: "Predict Next Token",
    bn: "আবার পরবর্তী Token Predict করে",
    icon: "loop",
    color: L5_C.amberSoft,
    startSec: 8.6,
    endSec: 11.1,
  },
];

const STREAM_TOKENS = [
  { text: "AI", atSec: 4.7 },
  { text: "helps", atSec: 6.8 },
  { text: "engineers", atSec: 8.75 },
  { text: "build", atSec: 9.5 },
  { text: "smart,", atSec: 10.25 },
  { text: "fast", atSec: 11.2 },
  { text: "production", atSec: 11.8 },
  { text: "apps!", atSec: 12.45 },
] as const;

export const Scene07NextTokenLoop: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene7");

  // Exact acoustic beats from scene_07_analytical_scene_7.wav (14.28s):
  // 0.28-3.58: "এই পুরো প্রক্রিয়াকে আমরা Next Token Prediction বলতে পারি।"
  // 4.64-6.20: "অর্থাৎ Model একটি Token Generate করে,"
  // 6.58-8.32: "সেটিকে Context-এর সঙ্গে যুক্ত করে"
  // 8.64-10.70: "এবং আবার পরবর্তী Token Predict করে।"
  // 11.26-13.74: "এভাবেই ধীরে ধীরে একটি সম্পূর্ণ Response তৈরি হয়।"
  const headPop = springAt(frame, fps, 0.18, SPRING_HERO);
  const cyclePop = springAt(frame, fps, 3.85, SPRING_HERO);
  const responsePop = springAt(frame, fps, 4.6, SPRING_HERO);
  const completePop = springAt(frame, fps, 11.25, SPRING_HERO);

  const isCompletePhase = voiceSec >= 11.2;
  const visibleCount = STREAM_TOKENS.filter((t) => voiceSec >= t.atSec).length;
  const progressPct = Math.round((visibleCount / STREAM_TOKENS.length) * 100);

  return (
    <SceneShell
      id="scene7"
      sfx={[
        { atVoiceSec: 0.2, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 4.65, kind: "pop", volume: 0.17 },
        { atVoiceSec: 6.6, kind: "click", volume: 0.15 },
        { atVoiceSec: 8.7, kind: "click", volume: 0.15 },
        { atVoiceSec: 11.3, kind: "chime", volume: 0.2 },
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
          eyebrow="AUTOREGRESSIVE GENERATION"
          title="Next Token Prediction"
          subtitle="একটি একটি Token জুড়ে সম্পূর্ণ উত্তর তৈরি হয়"
          accent={L5_C.cyan}
          appear={headPop}
        />

        {/* 1. 3-STEP AUTOREGRESSIVE ENGINE CARDS (3.85s - 11.1s spotlight) */}
        <FocusCard
          accent={L5_C.cyan}
          active={!isCompletePhase}
          appear={cyclePop}
          padding="22px 24px"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <RolePill
              label="THE 3-STEP LOOP"
              color={L5_C.cyan}
              bg={L5_C.cyanBg}
              fontSize={17}
            />
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 16,
                fontWeight: 700,
                color: L5_C.amberSoft,
              }}
            >
              FEEDBACK CYCLE
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {LOOP_STEPS.map((st) => {
              const lit = voiceSec >= st.startSec;
              const isCurrent = voiceSec >= st.startSec && voiceSec < st.endSec;
              const p = springAt(frame, fps, st.startSec);

              return (
                <div
                  key={st.num}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: isCurrent
                      ? "linear-gradient(135deg, rgba(16, 30, 68, 0.98), rgba(10, 18, 44, 0.98))"
                      : "rgba(5, 11, 28, 0.9)",
                    border: `2px solid ${isCurrent ? st.color : lit ? `${st.color}80` : L5_C.borderSubtle}`,
                    borderRadius: 18,
                    padding: "16px 20px",
                    opacity: lit ? 1 : 0.45,
                    transform: `scale(${lit ? interpolate(p, [0, 1], [0.94, isCurrent ? 1.02 : 1], clamp) : 0.97})`,
                    boxShadow: isCurrent ? `0 12px 32px ${st.color}36` : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div
                      style={{
                        width: 58,
                        height: 58,
                        borderRadius: 16,
                        background: `${st.color}20`,
                        border: `2px solid ${st.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <GlyphIcon kind={st.icon} color={st.color} size={30} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: L5_FONT_DISPLAY,
                          fontSize: 28,
                          fontWeight: 800,
                          color: L5_C.text,
                        }}
                      >
                        {st.title}
                      </div>
                      <div
                        style={{
                          fontFamily: L5_FONT_BN,
                          fontSize: 22,
                          fontWeight: 600,
                          color: L5_C.textMuted,
                          marginTop: 2,
                        }}
                      >
                        {st.bn}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: L5_FONT_MONO,
                      fontSize: 18,
                      fontWeight: 800,
                      color: lit ? st.color : L5_C.textDim,
                      background: lit ? `${st.color}20` : "rgba(148,163,184,0.08)",
                      border: `1.5px solid ${lit ? st.color : L5_C.borderSubtle}`,
                      borderRadius: 12,
                      padding: "6px 14px",
                    }}
                  >
                    STEP {st.num}
                  </div>
                </div>
              );
            })}
          </div>
        </FocusCard>

        {/* 2. LIVE STREAMING CONTEXT -> COMPLETE RESPONSE BUILDER (4.6s - 14.28s) */}
        <FocusCard
          accent={isCompletePhase ? L5_C.emerald : L5_C.cyanSoft}
          active={isCompletePhase || voiceSec >= 4.6}
          appear={responsePop}
          padding="24px 26px"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <RolePill
              label={isCompletePhase ? "COMPLETE RESPONSE ✓" : "LIVE CONTEXT BUFFER"}
              color={isCompletePhase ? L5_C.emeraldSoft : L5_C.cyan}
              bg={isCompletePhase ? L5_C.emeraldBg : L5_C.cyanBg}
              fontSize={17}
            />
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 17,
                fontWeight: 800,
                color: isCompletePhase ? L5_C.emeraldSoft : L5_C.cyanSoft,
              }}
            >
              {visibleCount}/{STREAM_TOKENS.length} TOKENS
            </span>
          </div>

          {/* Token Stream Grid */}
          <div
            style={{
              background: "rgba(4, 9, 24, 0.94)",
              border: `1.5px solid ${isCompletePhase ? L5_C.borderEmerald : L5_C.borderCyan}`,
              borderRadius: 18,
              padding: "22px 20px",
              minHeight: 168,
              display: "flex",
              flexWrap: "wrap",
              alignContent: "center",
              gap: 12,
            }}
          >
            {STREAM_TOKENS.map((tok, i) => {
              const shown = voiceSec >= tok.atSec;
              if (!shown) return null;
              const p = springAt(frame, fps, tok.atSec);
              const isLatest = i === visibleCount - 1 && !isCompletePhase;
              return (
                <TokenChip
                  key={tok.text}
                  text={tok.text}
                  color={
                    isCompletePhase
                      ? L5_C.emeraldSoft
                      : isLatest
                        ? L5_C.amberSoft
                        : L5_C.cyan
                  }
                  bg={
                    isCompletePhase
                      ? L5_C.emeraldBg
                      : isLatest
                        ? L5_C.amberBg
                        : L5_C.cyanBg
                  }
                  scale={interpolate(p, [0, 1], [0.78, 1], clamp)}
                  fontSize={27}
                />
              );
            })}
          </div>

          {/* Progress Bar + Final Bangla Label */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                height: 12,
                borderRadius: 999,
                background: "rgba(148, 163, 184, 0.16)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: `linear-gradient(90deg, ${L5_C.cyan}, ${L5_C.emerald})`,
                  borderRadius: 999,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                opacity: completePop,
              }}
            >
              <span
                style={{
                  fontFamily: L5_FONT_BN,
                  fontSize: 23,
                  fontWeight: 700,
                  color: L5_C.emeraldSoft,
                }}
              >
                ধীরে ধীরে তৈরি হলো একটি সম্পূর্ণ Response!
              </span>
              <span
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 16,
                  fontWeight: 700,
                  color: L5_C.textMuted,
                }}
              >
                END_OF_SEQ ✓
              </span>
            </div>
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
