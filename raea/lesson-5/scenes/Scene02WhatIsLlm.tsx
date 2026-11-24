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
  VerticalBeam,
  clamp,
  springAt,
  useVoice,
  type GlyphKind,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

const DATA_SOURCES: readonly {
  readonly label: string;
  readonly sub: string;
  readonly icon: GlyphKind;
  readonly atSec: number;
}[] = [
  { label: "Books", sub: "Literature", icon: "book", atSec: 3.55 },
  { label: "Code", sub: "GitHub Repos", icon: "code", atSec: 4.1 },
  { label: "Articles", sub: "Web & Docs", icon: "layers", atSec: 4.65 },
  { label: "Datasets", sub: "Trillions Tokens", icon: "database", atSec: 5.2 },
];

export const Scene02WhatIsLlm: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene2");

  // Exact acoustic beats from scene_02_explanatory_scene_2.wav (13.88s):
  // 0.34-3.22: "Large Language Model হলো এমন একটি AI Model,"
  // 3.58-8.62: "যেটি বিশাল পরিমাণ Text Data থেকে Language-এর Pattern এবং শব্দের সম্পর্ক শেখে।"
  // 9.28-13.58: "এর মূল কাজ হলো Context বুঝে পরবর্তী সম্ভাব্য Token Predict করা।"
  const headPop = springAt(frame, fps, 0.2, SPRING_HERO);
  const dataPop = springAt(frame, fps, 3.5, SPRING_HERO);
  const graphPop = springAt(frame, fps, 5.8, SPRING_HERO);
  const predictPop = springAt(frame, fps, 9.2, SPRING_HERO);
  const tokenLockPop = springAt(frame, fps, 11.55, SPRING_HERO);

  const isPredictPhase = voiceSec >= 9.15;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 10);
  const dashOffset = -(frame * 1.6);

  return (
    <SceneShell
      id="scene2"
      sfx={[
        { atVoiceSec: 0.25, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 3.6, kind: "click", volume: 0.14 },
        { atVoiceSec: 6.2, kind: "pop", volume: 0.15 },
        { atVoiceSec: 9.25, kind: "whoosh", volume: 0.15 },
        { atVoiceSec: 11.6, kind: "chime", volume: 0.18 },
      ]}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        {/* TOP HEADING */}
        <SectionHeading
          eyebrow="CORE DEFINITION · AI MODEL"
          title="Large Language Model"
          subtitle="বিশাল Text Data থেকে ভাষার Pattern ও সম্পর্ক শেখে"
          accent={L5_C.cyan}
          appear={headPop}
        />

        {/* 1. MASSIVE TEXT DATA CORPUS GRID (3.5s+) */}
        <FocusCard
          accent={L5_C.cyan}
          active={!isPredictPhase}
          appear={dataPop}
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
              label="MASSIVE TEXT DATA"
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
              BILLIONS OF PARAMETERS
            </span>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {DATA_SOURCES.map((src) => {
              const pop = springAt(frame, fps, src.atSec);
              const lit = voiceSec >= src.atSec;
              return (
                <div
                  key={src.label}
                  style={{
                    flex: 1,
                    background: lit ? "rgba(0, 229, 255, 0.11)" : "rgba(10, 18, 42, 0.8)",
                    border: `1.5px solid ${lit ? L5_C.cyan : L5_C.borderSubtle}`,
                    borderRadius: 16,
                    padding: "14px 10px",
                    textAlign: "center",
                    opacity: lit ? 1 : 0.45,
                    transform: `scale(${lit ? interpolate(pop, [0, 1], [0.88, 1], clamp) : 0.94})`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                    <GlyphIcon
                      kind={src.icon}
                      color={lit ? L5_C.cyan : L5_C.textDim}
                      size={30}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: L5_FONT_DISPLAY,
                      fontSize: 22,
                      fontWeight: 800,
                      color: L5_C.text,
                    }}
                  >
                    {src.label}
                  </div>
                  <div
                    style={{
                      fontFamily: L5_FONT_MONO,
                      fontSize: 13,
                      color: L5_C.textMuted,
                      marginTop: 3,
                    }}
                  >
                    {src.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </FocusCard>

        <VerticalBeam
          height={38}
          color={L5_C.cyan}
          active={voiceSec >= 5.5}
          frame={frame}
          label="LEARNS PATTERNS"
        />

        {/* 2. LANGUAGE PATTERN & WORD RELATIONSHIP GRAPH (5.8s+) */}
        <FocusCard
          accent={L5_C.violetSoft}
          active={voiceSec >= 5.8 && !isPredictPhase}
          appear={graphPop}
          padding="16px 20px"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 17,
                fontWeight: 700,
                color: L5_C.violetSoft,
                letterSpacing: 1.4,
              }}
            >
              LANGUAGE PATTERNS &amp; WORD RELATIONS
            </span>
            <span
              style={{
                fontFamily: L5_FONT_BN,
                fontSize: 20,
                fontWeight: 700,
                color: L5_C.textMuted,
              }}
            >
              শব্দের সম্পর্ক
            </span>
          </div>

          <svg width="880" height="190" viewBox="0 0 920 225">
            {/* Animated Semantic Links */}
            <line
              x1="150"
              y1="62"
              x2="460"
              y2="112"
              stroke={L5_C.cyan}
              strokeWidth="3"
              strokeDasharray="8 6"
              strokeDashoffset={dashOffset}
              opacity="0.85"
            />
            <line
              x1="160"
              y1="172"
              x2="460"
              y2="112"
              stroke={L5_C.violetSoft}
              strokeWidth="3"
              strokeDasharray="8 6"
              strokeDashoffset={dashOffset}
              opacity="0.85"
            />
            <line
              x1="460"
              y1="112"
              x2="765"
              y2="62"
              stroke={L5_C.emeraldSoft}
              strokeWidth="3"
              strokeDasharray="8 6"
              strokeDashoffset={dashOffset}
              opacity="0.85"
            />
            <line
              x1="460"
              y1="112"
              x2="765"
              y2="172"
              stroke={L5_C.amberSoft}
              strokeWidth="3"
              strokeDasharray="8 6"
              strokeDashoffset={dashOffset}
              opacity="0.85"
            />
            <line
              x1="150"
              y1="62"
              x2="160"
              y2="172"
              stroke={L5_C.borderSubtle}
              strokeWidth="2"
            />
            <line
              x1="765"
              y1="62"
              x2="765"
              y2="172"
              stroke={L5_C.borderSubtle}
              strokeWidth="2"
            />

            {/* Left Nodes */}
            <rect x="42" y="34" width="216" height="56" rx="16" fill="#0B183A" stroke={L5_C.cyan} strokeWidth="2" />
            <text x="150" y="69" textAnchor="middle" fill={L5_C.text} fontSize="22" fontWeight="700" fontFamily="DejaVu Sans Mono">
              &quot;Prompt&quot;
            </text>

            <rect x="42" y="144" width="216" height="56" rx="16" fill="#17103C" stroke={L5_C.violetSoft} strokeWidth="2" />
            <text x="150" y="179" textAnchor="middle" fill={L5_C.text} fontSize="22" fontWeight="700" fontFamily="DejaVu Sans Mono">
              &quot;Python&quot;
            </text>

            {/* Center Neural Hub */}
            <circle cx="460" cy="112" r={54 + pulse * 4} fill="#08142E" stroke={L5_C.cyan} strokeWidth="2.5" />
            <circle cx="460" cy="112" r={50 + pulse * 3} fill="rgba(0, 229, 255, 0.12)" />
            <text x="460" y="106" textAnchor="middle" fill={L5_C.cyan} fontSize="20" fontWeight="800" fontFamily="DejaVu Sans Mono">
              LLM
            </text>
            <text x="460" y="131" textAnchor="middle" fill={L5_C.textMuted} fontSize="15" fontWeight="700" fontFamily="DejaVu Sans Mono">
              CONTEXT
            </text>

            {/* Right Nodes */}
            <rect x="658" y="34" width="216" height="56" rx="16" fill="#08242E" stroke={L5_C.emeraldSoft} strokeWidth="2" />
            <text x="766" y="69" textAnchor="middle" fill={L5_C.text} fontSize="22" fontWeight="700" fontFamily="DejaVu Sans Mono">
              &quot;Answer&quot;
            </text>

            <rect x="658" y="144" width="216" height="56" rx="16" fill="#261B0A" stroke={L5_C.amberSoft} strokeWidth="2" />
            <text x="766" y="179" textAnchor="middle" fill={L5_C.text} fontSize="22" fontWeight="700" fontFamily="DejaVu Sans Mono">
              &quot;Code&quot;
            </text>
          </svg>
        </FocusCard>

        <VerticalBeam
          height={38}
          color={L5_C.emeraldSoft}
          active={isPredictPhase}
          frame={frame}
          label="CORE OBJECTIVE"
        />

        {/* 3. CORE JOB: CONTEXT -> NEXT TOKEN PREDICTION (9.2s - 13.88s) */}
        <FocusCard
          accent={L5_C.emerald}
          active={isPredictPhase}
          appear={predictPop}
          padding="24px 28px"
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
              label="CORE JOB · NEXT TOKEN PREDICTION"
              color={L5_C.emeraldSoft}
              bg={L5_C.emeraldBg}
              fontSize={17}
            />
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 17,
                fontWeight: 700,
                color: L5_C.cyan,
              }}
            >
              P(next | context)
            </span>
          </div>

          {/* Live Token Prediction Strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 12,
              background: "rgba(4, 9, 24, 0.94)",
              border: `1.5px solid ${L5_C.borderSubtle}`,
              borderRadius: 18,
              padding: "20px 18px",
            }}
          >
            {["The", "future", "of", "AI", "is"].map((word) => (
              <TokenChip
                key={word}
                text={word}
                color={L5_C.cyanSoft}
                bg="rgba(56, 189, 248, 0.14)"
                fontSize={26}
              />
            ))}
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 30,
                fontWeight: 800,
                color: L5_C.amberSoft,
                margin: "0 4px",
              }}
            >
              →
            </span>
            <TokenChip
              text={voiceSec >= 11.55 ? "bright" : "???"}
              id={voiceSec >= 11.55 ? "PREDICTED ✓" : "SCORING..."}
              color={voiceSec >= 11.55 ? L5_C.emeraldSoft : L5_C.amberSoft}
              bg={voiceSec >= 11.55 ? L5_C.emeraldBg : L5_C.amberBg}
              scale={interpolate(tokenLockPop, [0, 1], [0.88, 1.06], clamp)}
              fontSize={28}
            />
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
