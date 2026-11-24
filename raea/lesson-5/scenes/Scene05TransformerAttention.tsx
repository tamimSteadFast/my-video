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
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

const SENTENCE_TOKENS = [
  { word: "The", x: 58, weight: 0.02 },
  { word: "model", x: 180, weight: 0.84 },
  { word: "wrote", x: 314, weight: 0.04 },
  { word: "code", x: 440, weight: 0.06 },
  { word: "because", x: 582, weight: 0.03 },
  { word: "it", x: 710, weight: 1.0 },
  { word: "learned", x: 836, weight: 0.11 },
] as const;

const WEIGHT_BARS = [
  { target: "it → model", score: 84, color: L5_C.amberSoft, tag: "HIGHEST CONTEXT" },
  { target: "it → learned", score: 11, color: L5_C.cyanSoft, tag: "ACTION LINK" },
  { target: "it → code", score: 5, color: L5_C.violetSoft, tag: "SECONDARY" },
] as const;

export const Scene05TransformerAttention: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene5");

  // Exact acoustic beats from scene_05_engaging_scene_5.wav (18.00s):
  // 0.22-3.54: "এরপর এই Data প্রবেশ করে Transformer Architecture-এ।"
  // 4.28-7.90: "Transformer-এর একটি গুরুত্বপূর্ণ Component হলো Self-Attention।"
  // 8.50-12.08: "এটি Sentence-এর বিভিন্ন Token-এর মধ্যে সম্পর্ক বিশ্লেষণ করে"
  // 12.72-17.56: "এবং কোন Token কোন Context-এ বেশি গুরুত্বপূর্ণ, তা নির্ধারণ করতে সাহায্য করে।"
  const headPop = springAt(frame, fps, 0.15, SPRING_HERO);
  const stackPop = springAt(frame, fps, 0.45, SPRING_HERO);
  const attnFocusPop = springAt(frame, fps, 4.2, SPRING_HERO);
  const arcStagePop = springAt(frame, fps, 8.4, SPRING_HERO);
  const weightsPop = springAt(frame, fps, 12.6, SPRING_HERO);

  const isSelfAttnPhase = voiceSec >= 4.2;
  const isArcPhase = voiceSec >= 8.4;
  const isWeightPhase = voiceSec >= 12.6;

  const arcDraw = interpolate(voiceSec, [8.5, 11.4], [0, 1], clamp);
  const barFill = interpolate(voiceSec, [12.7, 15.8], [0, 1], clamp);
  const pulse = 0.5 + 0.5 * Math.sin(frame / 9);

  return (
    <SceneShell
      id="scene5"
      sfx={[
        { atVoiceSec: 0.2, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 4.25, kind: "pop", volume: 0.18 },
        { atVoiceSec: 8.45, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 12.65, kind: "chime", volume: 0.19 },
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
          eyebrow="STEP 03 · DEEP ARCHITECTURE"
          title="Transformer & Self-Attention"
          subtitle="প্রতিটি Token-এর সাথে অন্য Token-এর সম্পর্ক বিশ্লেষণ"
          accent={L5_C.violetSoft}
          appear={headPop}
        />

        {/* 1. TRANSFORMER ARCHITECTURE STACK (0.45s+) */}
        <FocusCard
          accent={isSelfAttnPhase ? L5_C.amber : L5_C.violet}
          active={!isArcPhase}
          appear={stackPop}
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
            <RolePill
              label="TRANSFORMER BLOCK"
              color={L5_C.violetSoft}
              bg={L5_C.violetBg}
              fontSize={17}
            />
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 16,
                fontWeight: 700,
                color: isSelfAttnPhase ? L5_C.amberSoft : L5_C.textMuted,
              }}
            >
              {isSelfAttnPhase ? "★ SELF-ATTENTION ACTIVE" : "MULTI-LAYER STACK"}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {[
              { label: "Embeddings", highlight: false },
              { label: "Self-Attention", highlight: true },
              { label: "Feed-Forward", highlight: false },
              { label: "Context Out", highlight: false },
            ].map((blk, i) => {
              const isSpotlight = blk.highlight && isSelfAttnPhase;
              return (
                <React.Fragment key={blk.label}>
                  <div
                    style={{
                      flex: blk.highlight ? 1.35 : 1,
                      background: isSpotlight
                        ? "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(168, 85, 247, 0.28))"
                        : "rgba(10, 18, 42, 0.9)",
                      border: `2px solid ${isSpotlight ? L5_C.amberSoft : L5_C.borderViolet}`,
                      borderRadius: 14,
                      padding: "14px 10px",
                      textAlign: "center",
                      boxShadow: isSpotlight
                        ? `0 0 ${18 + pulse * 14}px rgba(245, 158, 11, 0.38)`
                        : "none",
                      transform: isSpotlight
                        ? `scale(${interpolate(attnFocusPop, [0, 1], [0.95, 1.04], clamp)})`
                        : "scale(1)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: L5_FONT_DISPLAY,
                        fontSize: 21,
                        fontWeight: 800,
                        color: isSpotlight ? L5_C.amberSoft : L5_C.text,
                      }}
                    >
                      {blk.label}
                    </div>
                  </div>
                  {i < 3 ? (
                    <span
                      style={{
                        fontFamily: L5_FONT_MONO,
                        fontSize: 22,
                        fontWeight: 800,
                        color: L5_C.violetSoft,
                      }}
                    >
                      →
                    </span>
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </FocusCard>

        {/* 2. LIVE SELF-ATTENTION ARC VISUALIZER (8.4s+) */}
        <FocusCard
          accent={L5_C.amber}
          active={isArcPhase}
          appear={arcStagePop}
          padding="20px 22px"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GlyphIcon kind="attention" color={L5_C.amberSoft} size={28} />
              <span
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 18,
                  fontWeight: 700,
                  color: L5_C.amberSoft,
                  letterSpacing: 1.3,
                }}
              >
                SELF-ATTENTION MAP · WHAT DOES &quot;it&quot; REFER TO?
              </span>
            </div>
          </div>

          <div
            style={{
              background: "rgba(4, 9, 24, 0.94)",
              border: `1.5px solid ${L5_C.borderAmber}`,
              borderRadius: 18,
              padding: "12px 6px",
            }}
          >
            <svg width="874" height="232" viewBox="0 0 920 270">
              {/* Attention Arcs radiating from "it" (x=710) to other tokens */}
              {SENTENCE_TOKENS.filter((t) => t.word !== "it").map((tok) => {
                const isWinner = tok.word === "model";
                const midX = (710 + tok.x) / 2;
                const arcHeight = isWinner ? 28 : 115 - tok.weight * 120;
                const strokeW = isWinner
                  ? isWeightPhase
                    ? 6.5
                    : 4.5
                  : Math.max(1.8, tok.weight * 14);
                const opacity =
                  arcDraw * (isWinner ? 1 : isWeightPhase ? 0.35 : 0.65);

                return (
                  <path
                    key={tok.word}
                    d={`M 710 190 Q ${midX} ${arcHeight} ${tok.x} 190`}
                    fill="none"
                    stroke={isWinner ? L5_C.amberSoft : L5_C.violetSoft}
                    strokeWidth={strokeW}
                    strokeLinecap="round"
                    opacity={opacity}
                  />
                );
              })}

              {/* Highlight Score Badge on Top of Winner Arc */}
              {isWeightPhase ? (
                <g opacity={weightsPop}>
                  <rect
                    x="410"
                    y="22"
                    width="156"
                    height="38"
                    rx="12"
                    fill="rgba(245, 158, 11, 0.24)"
                    stroke={L5_C.amberSoft}
                    strokeWidth="2"
                  />
                  <text
                    x="488"
                    y="47"
                    textAnchor="middle"
                    fill={L5_C.amberSoft}
                    fontSize="19"
                    fontWeight="800"
                    fontFamily="DejaVu Sans Mono"
                  >
                    WEIGHT: 0.84
                  </text>
                </g>
              ) : null}

              {/* Token Pills along Bottom Row */}
              {SENTENCE_TOKENS.map((tok) => {
                const isQuery = tok.word === "it";
                const isWinner = tok.word === "model";
                const boxW = tok.word.length * 14 + 34;
                const strokeCol = isQuery
                  ? L5_C.cyan
                  : isWinner && isArcPhase
                    ? L5_C.amberSoft
                    : "#334155";
                const fillCol = isQuery
                  ? "rgba(0, 229, 255, 0.2)"
                  : isWinner && isWeightPhase
                    ? "rgba(245, 158, 11, 0.22)"
                    : "#0D1736";

                return (
                  <g key={tok.word}>
                    <rect
                      x={tok.x - boxW / 2}
                      y="194"
                      width={boxW}
                      height="52"
                      rx="13"
                      fill={fillCol}
                      stroke={strokeCol}
                      strokeWidth={isQuery || isWinner ? "2.5" : "1.5"}
                    />
                    <text
                      x={tok.x}
                      y="227"
                      textAnchor="middle"
                      fill={L5_C.text}
                      fontSize="21"
                      fontWeight="700"
                      fontFamily="DejaVu Sans Mono"
                    >
                      {tok.word}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </FocusCard>

        {/* 3. CONTEXT IMPORTANCE WEIGHT METERS (12.6s - 18.00s) */}
        <FocusCard
          accent={L5_C.amberSoft}
          active={isWeightPhase}
          appear={weightsPop}
          padding="22px 26px"
          style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 17,
                fontWeight: 700,
                color: L5_C.amberSoft,
                letterSpacing: 1.4,
              }}
            >
              CONTEXT RELEVANCE SCORES
            </span>
            <span
              style={{
                fontFamily: L5_FONT_BN,
                fontSize: 21,
                fontWeight: 700,
                color: L5_C.textMuted,
              }}
            >
              কোন Token বেশি গুরুত্বপূর্ণ?
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
            {WEIGHT_BARS.map((bar) => (
              <div key={bar.target} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: L5_FONT_MONO,
                      fontSize: 21,
                      fontWeight: 700,
                      color: L5_C.text,
                    }}
                  >
                    {bar.target}
                  </span>
                  <span
                    style={{
                      fontFamily: L5_FONT_MONO,
                      fontSize: 18,
                      fontWeight: 800,
                      color: bar.color,
                    }}
                  >
                    {Math.round(bar.score * barFill)}% · {bar.tag}
                  </span>
                </div>
                <div
                  style={{
                    height: 16,
                    borderRadius: 999,
                    background: "rgba(148, 163, 184, 0.16)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.round(bar.score * barFill)}%`,
                      background: bar.color,
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
