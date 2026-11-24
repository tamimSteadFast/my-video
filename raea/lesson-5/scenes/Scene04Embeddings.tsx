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

const VECTOR_ROWS = [
  { token: "AI", vec: "[ 0.89, -0.34,  0.71,  0.15 ]", color: L5_C.cyan, atSec: 1.1 },
  { token: "Model", vec: "[ 0.84, -0.29,  0.68,  0.22 ]", color: L5_C.violetSoft, atSec: 2.0 },
  { token: "Code", vec: "[ 0.18,  0.76, -0.44,  0.91 ]", color: L5_C.emeraldSoft, atSec: 2.9 },
] as const;

const PLOT_NODES = [
  { label: "AI", x: 255, y: 112, color: L5_C.cyan, cluster: "ai" },
  { label: "LLM", x: 355, y: 82, color: L5_C.cyanSoft, cluster: "ai" },
  { label: "Neural", x: 320, y: 168, color: L5_C.violetSoft, cluster: "ai" },
  { label: "Python", x: 690, y: 105, color: L5_C.emeraldSoft, cluster: "code" },
  { label: "Code", x: 755, y: 175, color: L5_C.emerald, cluster: "code" },
  { label: "King", x: 240, y: 295, color: L5_C.amberSoft, cluster: "royal" },
  { label: "Queen", x: 380, y: 280, color: L5_C.orchid, cluster: "royal" },
] as const;

export const Scene04Embeddings: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene4");

  // Exact acoustic beats from scene_04_analytical_scene_4.wav (14.64s):
  // 0.24-4.48: "এরপর প্রতিটি Token-কে Numerical Vector বা Embedding-এ Convert করা হয়।"
  // 5.18-7.90: "কারণ Neural Network সরাসরি Text নিয়ে কাজ করে না।"
  // 8.62-14.40: "Numerical Representation ব্যবহার করে Model বিভিন্ন শব্দের সম্পর্ক এবং Context Process করতে পারে।"
  const headPop = springAt(frame, fps, 0.15, SPRING_HERO);
  const encPop = springAt(frame, fps, 0.8, SPRING_HERO);
  const rulePop = springAt(frame, fps, 5.1, SPRING_HERO);
  const spacePop = springAt(frame, fps, 8.55, SPRING_HERO);

  const isRulePhase = voiceSec >= 5.05 && voiceSec < 8.55;
  const isSpacePhase = voiceSec >= 8.55;
  const lineReveal = interpolate(voiceSec, [9.2, 12.6], [0, 1], clamp);
  const pulse = 0.5 + 0.5 * Math.sin(frame / 10);

  return (
    <SceneShell
      id="scene4"
      sfx={[
        { atVoiceSec: 0.2, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 1.15, kind: "click", volume: 0.14 },
        { atVoiceSec: 2.05, kind: "click", volume: 0.14 },
        { atVoiceSec: 5.15, kind: "pop", volume: 0.17 },
        { atVoiceSec: 8.6, kind: "chime", volume: 0.18 },
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
          eyebrow="STEP 02 · NUMERICAL REPRESENTATION"
          title="Token Embeddings"
          subtitle="প্রতিটি Token-কে Numerical Vector-এ রূপান্তর"
          accent={L5_C.violetSoft}
          appear={headPop}
        />

        {/* 1. TOKEN -> VECTOR ENCODER TABLE (0.8s+) */}
        <FocusCard
          accent={L5_C.violet}
          active={!isRulePhase && !isSpacePhase}
          appear={encPop}
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
              label="EMBEDDING ENCODER"
              color={L5_C.violetSoft}
              bg={L5_C.violetBg}
              fontSize={17}
            />
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 16,
                fontWeight: 700,
                color: L5_C.textMuted,
              }}
            >
              TOKEN → DENSE VECTOR
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {VECTOR_ROWS.map((row) => {
              const p = springAt(frame, fps, row.atSec);
              return (
                <div
                  key={row.token}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 14,
                    background: "rgba(4, 9, 24, 0.92)",
                    border: `1.5px solid ${L5_C.borderSubtle}`,
                    borderRadius: 14,
                    padding: "10px 18px",
                    opacity: p,
                    transform: `translate3d(${interpolate(p, [0, 1], [-18, 0], clamp)}px, 0px, 0px)`,
                  }}
                >
                  <div style={{ width: 145 }}>
                    <TokenChip
                      text={row.token}
                      color={row.color}
                      bg={`${row.color}20`}
                      fontSize={22}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: L5_FONT_MONO,
                      fontSize: 24,
                      fontWeight: 800,
                      color: row.color,
                    }}
                  >
                    →
                  </span>
                  <div
                    style={{
                      flex: 1,
                      fontFamily: L5_FONT_MONO,
                      fontSize: 22,
                      fontWeight: 700,
                      color: L5_C.text,
                      textAlign: "right",
                      letterSpacing: 0.4,
                    }}
                  >
                    {row.vec}
                  </div>
                </div>
              );
            })}
          </div>
        </FocusCard>

        {/* 2. WHY EMBEDDINGS? NEURAL NETWORKS NEED NUMBERS (5.1s+) */}
        <div
          style={{
            display: "flex",
            gap: 16,
            opacity: rulePop,
            transform: `translate3d(0px, ${interpolate(rulePop, [0, 1], [18, 0], clamp)}px, 0px)`,
          }}
        >
          <FocusCard
            accent={L5_C.rose}
            active={isRulePhase}
            appear={rulePop}
            padding="18px 22px"
            style={{ flex: 1 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 17,
                  fontWeight: 800,
                  color: L5_C.rose,
                }}
              >
                ✕ RAW TEXT
              </span>
              <span
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 15,
                  color: L5_C.textDim,
                }}
              >
                NOT SUPPORTED
              </span>
            </div>
            <div
              style={{
                fontFamily: L5_FONT_BN,
                fontSize: 24,
                fontWeight: 700,
                color: L5_C.textMuted,
                marginTop: 8,
              }}
            >
              Neural Network সরাসরি Text বোঝে না
            </div>
          </FocusCard>

          <FocusCard
            accent={L5_C.emerald}
            active={isRulePhase || isSpacePhase}
            appear={rulePop}
            padding="18px 22px"
            style={{ flex: 1 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 17,
                  fontWeight: 800,
                  color: L5_C.emeraldSoft,
                }}
              >
                ✓ VECTOR MATH
              </span>
              <GlyphIcon kind="check" color={L5_C.emeraldSoft} size={24} />
            </div>
            <div
              style={{
                fontFamily: L5_FONT_BN,
                fontSize: 24,
                fontWeight: 700,
                color: L5_C.text,
                marginTop: 8,
              }}
            >
              সংখ্যা দিয়ে সম্পর্ক ও Context বোঝে
            </div>
          </FocusCard>
        </div>

        {/* 3. SEMANTIC VECTOR SPACE COORDINATE PLOT (8.55s - 14.64s) */}
        <FocusCard
          accent={L5_C.violetSoft}
          active={isSpacePhase}
          appear={spacePop}
          padding="20px 24px"
          style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GlyphIcon kind="vector" color={L5_C.violetSoft} size={26} />
              <span
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 18,
                  fontWeight: 700,
                  color: L5_C.violetSoft,
                  letterSpacing: 1.4,
                }}
              >
                SEMANTIC VECTOR SPACE
              </span>
            </div>
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 15,
                color: L5_C.cyanSoft,
                fontWeight: 700,
              }}
            >
              CLOSER = SIMILAR MEANING
            </span>
          </div>

          <div
            style={{
              background: "rgba(4, 9, 24, 0.94)",
              border: `1px solid ${L5_C.borderViolet}`,
              borderRadius: 18,
              padding: "10px 8px",
              marginTop: 10,
            }}
          >
            <svg width="870" height="275" viewBox="0 0 910 340">
              {/* Coordinate Grid */}
              {[70, 140, 210, 280].map((y) => (
                <line
                  key={`gy-${y}`}
                  x1="48"
                  y1={y}
                  x2="875"
                  y2={y}
                  stroke="#1E293B"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
              ))}
              {[200, 360, 520, 680, 840].map((x) => (
                <line
                  key={`gx-${x}`}
                  x1={x}
                  y1="24"
                  x2={x}
                  y2="315"
                  stroke="#1E293B"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
              ))}
              {/* Axes */}
              <line x1="48" y1="315" x2="875" y2="315" stroke="#475569" strokeWidth="2" />
              <line x1="48" y1="24" x2="48" y2="315" stroke="#475569" strokeWidth="2" />

              {/* Semantic Cluster Halos */}
              <ellipse
                cx="310"
                cy="122"
                rx="118"
                ry="74"
                fill="rgba(0, 229, 255, 0.08)"
                stroke={L5_C.cyan}
                strokeWidth="1.5"
                strokeDasharray="6 6"
                opacity={lineReveal}
              />
              <ellipse
                cx="722"
                cy="140"
                rx="104"
                ry="68"
                fill="rgba(16, 185, 129, 0.09)"
                stroke={L5_C.emerald}
                strokeWidth="1.5"
                strokeDasharray="6 6"
                opacity={lineReveal}
              />
              <ellipse
                cx="310"
                cy="286"
                rx="115"
                ry="38"
                fill="rgba(245, 158, 11, 0.09)"
                stroke={L5_C.amber}
                strokeWidth="1.5"
                strokeDasharray="6 6"
                opacity={lineReveal}
              />

              {/* Similarity Links */}
              <line x1="255" y1="112" x2="355" y2="82" stroke={L5_C.cyan} strokeWidth="2.5" opacity={lineReveal} />
              <line x1="255" y1="112" x2="320" y2="168" stroke={L5_C.violetSoft} strokeWidth="2.5" opacity={lineReveal} />
              <line x1="690" y1="105" x2="755" y2="175" stroke={L5_C.emeraldSoft} strokeWidth="2.5" opacity={lineReveal} />
              <line x1="240" y1="295" x2="380" y2="280" stroke={L5_C.amberSoft} strokeWidth="2.5" opacity={lineReveal} />

              {/* Word Nodes */}
              {PLOT_NODES.map((n, idx) => (
                <g key={n.label}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={idx % 2 === 0 ? 11 + pulse * 2.5 : 10}
                    fill={n.color}
                  />
                  <text
                    x={n.x + 18}
                    y={n.y + 7}
                    fill={L5_C.text}
                    fontSize="22"
                    fontWeight="700"
                    fontFamily="DejaVu Sans Mono"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
