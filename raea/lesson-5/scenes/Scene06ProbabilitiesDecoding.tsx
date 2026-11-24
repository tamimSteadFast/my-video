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
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

const CANDIDATES = [
  { token: "apps", prob: 68, color: L5_C.cyan, winner: true },
  { token: "systems", prob: 19, color: L5_C.violetSoft, winner: false },
  { token: "tools", prob: 8, color: L5_C.amberSoft, winner: false },
  { token: "agents", prob: 4, color: L5_C.emeraldSoft, winner: false },
  { token: "models", prob: 1, color: L5_C.textDim, winner: false },
] as const;

const DECODERS = [
  { name: "Temperature", desc: "Creativity control" },
  { name: "Top-K", desc: "Best K candidates" },
  { name: "Top-P", desc: "Nucleus probability" },
] as const;

export const Scene06ProbabilitiesDecoding: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene6");

  // Exact acoustic beats from scene_06_explanatory_scene_6.wav (13.80s):
  // 0.34-4.82: "Transformer Processing-এর পর Model Vocabulary-এর বিভিন্ন Token-এর জন্য"
  // 4.96-6.30: "Probability Score তৈরি করে।"
  // 6.96-10.86: "এরপর Decoding Strategy ব্যবহার করে পরবর্তী Token নির্বাচন করা হয়।"
  // 11.58-13.50: "এই প্রক্রিয়াটি বারবার চলতে থাকে।"
  const headPop = springAt(frame, fps, 0.2, SPRING_HERO);
  const probCardPop = springAt(frame, fps, 0.7, SPRING_HERO);
  const decodePop = springAt(frame, fps, 6.9, SPRING_HERO);
  const winnerPop = springAt(frame, fps, 9.2, SPRING_HERO);
  const loopPop = springAt(frame, fps, 11.5, SPRING_HERO);

  const barGrowth = interpolate(voiceSec, [2.0, 5.8], [0, 1], clamp);
  const isDecodePhase = voiceSec >= 6.9;
  const isWinnerLocked = voiceSec >= 9.2;
  const isLoopPhase = voiceSec >= 11.5;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 8);

  return (
    <SceneShell
      id="scene6"
      sfx={[
        { atVoiceSec: 0.25, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 4.95, kind: "pop", volume: 0.16 },
        { atVoiceSec: 7.0, kind: "click", volume: 0.16 },
        { atVoiceSec: 9.25, kind: "chime", volume: 0.19 },
        { atVoiceSec: 11.55, kind: "whoosh", volume: 0.14 },
      ]}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* TOP HEADER */}
        <SectionHeading
          eyebrow="STEP 04 · SOFTMAX & SELECTION"
          title="Probability & Decoding"
          subtitle="প্রতিটি Token-এর Probability Score ও পরবর্তী Token নির্বাচন"
          accent={L5_C.amberSoft}
          appear={headPop}
        />

        {/* PROMPT CONTEXT BAR */}
        <div
          style={{
            background: "rgba(7, 14, 34, 0.94)",
            border: `1.5px solid ${L5_C.borderCyan}`,
            borderRadius: 18,
            padding: "16px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            opacity: probCardPop,
          }}
        >
          <span style={{ fontFamily: L5_FONT_MONO, fontSize: 22, fontWeight: 700, color: L5_C.textMuted }}>
            &ldquo;AI Engineers build intelligent
          </span>
          <TokenChip
            text={isWinnerLocked ? "apps" : "___"}
            color={isWinnerLocked ? L5_C.emeraldSoft : L5_C.amberSoft}
            bg={isWinnerLocked ? L5_C.emeraldBg : L5_C.amberBg}
            scale={isWinnerLocked ? interpolate(winnerPop, [0, 1], [0.85, 1.06], clamp) : 1}
            fontSize={24}
          />
          <span style={{ fontFamily: L5_FONT_MONO, fontSize: 22, fontWeight: 700, color: L5_C.textMuted }}>
            &rdquo;
          </span>
        </div>

        {/* 1. VOCABULARY PROBABILITY SCORE DISTRIBUTION (0.7s - 6.8s active) */}
        <FocusCard
          accent={isWinnerLocked ? L5_C.emerald : L5_C.amber}
          active={!isLoopPhase}
          appear={probCardPop}
          padding="22px 26px"
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
              label="VOCABULARY PROBABILITY SCORES"
              color={L5_C.amberSoft}
              bg={L5_C.amberBg}
              fontSize={16}
            />
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 16,
                fontWeight: 700,
                color: L5_C.cyanSoft,
              }}
            >
              SOFTMAX OUTPUT
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {CANDIDATES.map((cand) => {
              const isSelected = cand.winner && isWinnerLocked;
              const widthPct = Math.max(4, Math.round(cand.prob * barGrowth));
              return (
                <div
                  key={cand.token}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    background: isSelected
                      ? "rgba(16, 185, 129, 0.14)"
                      : "rgba(4, 9, 24, 0.85)",
                    border: `2px solid ${isSelected ? L5_C.emerald : L5_C.borderSubtle}`,
                    borderRadius: 14,
                    padding: "11px 16px",
                    opacity: isWinnerLocked && !cand.winner ? 0.45 : 1,
                    boxShadow: isSelected
                      ? `0 0 ${16 + pulse * 14}px rgba(16, 185, 129, 0.36)`
                      : "none",
                  }}
                >
                  <div
                    style={{
                      width: 140,
                      fontFamily: L5_FONT_MONO,
                      fontSize: 22,
                      fontWeight: 800,
                      color: isSelected ? L5_C.emeraldSoft : L5_C.text,
                    }}
                  >
                    &quot;{cand.token}&quot;
                  </div>

                  <div
                    style={{
                      flex: 1,
                      height: 20,
                      borderRadius: 999,
                      background: "rgba(148, 163, 184, 0.14)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${widthPct}%`,
                        background: isSelected ? L5_C.emeraldSoft : cand.color,
                        borderRadius: 999,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      width: 112,
                      textAlign: "right",
                      fontFamily: L5_FONT_MONO,
                      fontSize: 21,
                      fontWeight: 800,
                      color: isSelected ? L5_C.emeraldSoft : cand.color,
                    }}
                  >
                    {Math.round(cand.prob * barGrowth)}%{isSelected ? " ✓" : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </FocusCard>

        {/* 2. DECODING STRATEGY SELECTOR (6.9s+) */}
        <FocusCard
          accent={L5_C.cyan}
          active={isDecodePhase && !isLoopPhase}
          appear={decodePop}
          padding="20px 24px"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GlyphIcon kind="sliders" color={L5_C.cyan} size={26} />
              <span
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 18,
                  fontWeight: 700,
                  color: L5_C.cyan,
                  letterSpacing: 1.4,
                }}
              >
                DECODING STRATEGY
              </span>
            </div>
            <span
              style={{
                fontFamily: L5_FONT_BN,
                fontSize: 20,
                fontWeight: 700,
                color: L5_C.textMuted,
              }}
            >
              পরবর্তী Token নির্বাচন
            </span>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {DECODERS.map((d, idx) => {
              const p = springAt(frame, fps, 7.1 + idx * 0.45);
              return (
                <div
                  key={d.name}
                  style={{
                    flex: 1,
                    background: "rgba(0, 229, 255, 0.1)",
                    border: `1.5px solid ${L5_C.borderCyan}`,
                    borderRadius: 14,
                    padding: "14px 12px",
                    textAlign: "center",
                    opacity: p,
                    transform: `scale(${interpolate(p, [0, 1], [0.9, 1], clamp)})`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: L5_FONT_DISPLAY,
                      fontSize: 24,
                      fontWeight: 800,
                      color: L5_C.text,
                    }}
                  >
                    {d.name}
                  </div>
                  <div
                    style={{
                      fontFamily: L5_FONT_MONO,
                      fontSize: 14,
                      color: L5_C.cyanSoft,
                      marginTop: 4,
                    }}
                  >
                    {d.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </FocusCard>

        {/* 3. CONTINUOUS REPEAT CYCLE CALLOUT (11.5s - 13.80s) */}
        <FocusCard
          accent={L5_C.emerald}
          active={isLoopPhase}
          appear={loopPop}
          padding="18px 26px"
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  background: L5_C.emeraldBg,
                  border: `2px solid ${L5_C.emerald}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GlyphIcon kind="loop" color={L5_C.emeraldSoft} size={30} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: L5_FONT_MONO,
                    fontSize: 16,
                    fontWeight: 700,
                    color: L5_C.emeraldSoft,
                    letterSpacing: 1.5,
                  }}
                >
                  REPEAT FOR EVERY TOKEN
                </div>
                <div
                  style={{
                    fontFamily: L5_FONT_BN,
                    fontSize: 27,
                    fontWeight: 700,
                    color: L5_C.text,
                    marginTop: 2,
                  }}
                >
                  এই প্রক্রিয়াটি বারবার চলতে থাকে
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 19,
                fontWeight: 800,
                color: L5_C.amberSoft,
                background: L5_C.amberBg,
                border: `1.5px solid ${L5_C.amber}`,
                borderRadius: 12,
                padding: "8px 16px",
              }}
            >
              TOKEN BY TOKEN
            </div>
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
