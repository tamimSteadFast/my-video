import React from "react";
import { interpolate } from "raea";
import { L4_C, L4_FONT_BN, L4_FONT_DISPLAY, L4_FONT_MONO, SPRING_HERO } from "../narration";
import {
  FocusCard,
  GlyphIcon,
  SectionHeading,
  clamp,
  springAt,
  useVoice,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

export const Scene07BlurredBoundaries: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene7");

  // Exact acoustic beats from scene_07_analytical_scene_7.wav (12.20s):
  // 0.20-4.55: No rigid boundary between the two roles
  // 4.95-8.10: AI Engineer can also do Model Fine-tuning (~6.45s)
  // 8.35-11.95: ML Engineer can also use Pre-trained Models (~10.15s)
  const headPop = springAt(frame, fps, 0.15, SPRING_HERO);
  const vennMerge = interpolate(voiceSec, [0.6, 3.6], [0, 1], clamp);
  const bridge1Pop = springAt(frame, fps, 4.85, SPRING_HERO);
  const bridge2Pop = springAt(frame, fps, 8.25, SPRING_HERO);

  const leftCx = interpolate(vennMerge, [0, 1], [295, 375], clamp);
  const rightCx = interpolate(vennMerge, [0, 1], [681, 601], clamp);
  const pulseR = 195 + Math.sin(frame / 14) * 4;

  const isBridge1 = voiceSec >= 4.85 && voiceSec < 8.25;
  const isBridge2 = voiceSec >= 8.25;

  return (
    <SceneShell
      id="scene7"
      sfx={[
        { atVoiceSec: 0.2, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 4.9, kind: "pop", volume: 0.17 },
        { atVoiceSec: 8.3, kind: "chime", volume: 0.18 },
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
        {/* HEADER */}
        <SectionHeading
          eyebrow="REAL-WORLD FLEXIBILITY"
          title="No Rigid Boundary"
          subtitle="এই দুই Role-এর মধ্যে সবসময় কঠোর সীমারেখা থাকে না"
          accent={L4_C.cyanSoft}
          appear={headPop}
        />

        {/* ANIMATED VENN DIAGRAM STAGE */}
        <div
          style={{
            background: "rgba(7, 14, 34, 0.9)",
            border: `1.5px solid ${L4_C.borderSubtle}`,
            borderRadius: 28,
            padding: "16px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="976" height="440" viewBox="0 0 976 440">
            {/* Left Circle: AI Engineer */}
            <circle
              cx={leftCx}
              cy="220"
              r={pulseR}
              fill="rgba(0, 229, 255, 0.14)"
              stroke={L4_C.cyan}
              strokeWidth={isBridge1 ? 4.5 : 3}
            />
            {/* Right Circle: ML Engineer */}
            <circle
              cx={rightCx}
              cy="220"
              r={pulseR}
              fill="rgba(168, 85, 247, 0.16)"
              stroke={L4_C.violetSoft}
              strokeWidth={isBridge2 ? 4.5 : 3}
            />
            {/* Dashed Shared Overlap Halo */}
            <ellipse
              cx="488"
              cy="220"
              rx={interpolate(vennMerge, [0, 1], [24, 86], clamp)}
              ry={interpolate(vennMerge, [0, 1], [60, 162], clamp)}
              fill="rgba(248, 250, 252, 0.07)"
              stroke={L4_C.amberSoft}
              strokeWidth="2.5"
              strokeDasharray="10 8"
              strokeDashoffset={-(frame * 1.4)}
              opacity={vennMerge}
            />

            {/* Left Label */}
            <text
              x={leftCx - 74}
              y="206"
              fill={L4_C.cyan}
              fontSize="30"
              fontWeight="800"
              textAnchor="middle"
              fontFamily="Noto Sans, sans-serif"
            >
              AI
            </text>
            <text
              x={leftCx - 74}
              y="242"
              fill={L4_C.text}
              fontSize="24"
              fontWeight="700"
              textAnchor="middle"
              fontFamily="Noto Sans, sans-serif"
            >
              Engineer
            </text>

            {/* Right Label */}
            <text
              x={rightCx + 74}
              y="206"
              fill={L4_C.violetSoft}
              fontSize="30"
              fontWeight="800"
              textAnchor="middle"
              fontFamily="Noto Sans, sans-serif"
            >
              ML
            </text>
            <text
              x={rightCx + 74}
              y="242"
              fill={L4_C.text}
              fontSize="24"
              fontWeight="700"
              textAnchor="middle"
              fontFamily="Noto Sans, sans-serif"
            >
              Engineer
            </text>

            {/* Center Overlap Label */}
            <text
              x="488"
              y="214"
              fill={L4_C.amberSoft}
              fontSize="22"
              fontWeight="800"
              textAnchor="middle"
              opacity={vennMerge}
              fontFamily="DejaVu Sans Mono, monospace"
            >
              SHARED
            </text>
            <text
              x="488"
              y="244"
              fill={L4_C.text}
              fontSize="20"
              fontWeight="700"
              textAnchor="middle"
              opacity={vennMerge}
              fontFamily="DejaVu Sans Mono, monospace"
            >
              OVERLAP
            </text>
          </svg>
        </div>

        {/* CROSSOVER BRIDGE 1: AI ENGINEER -> MODEL FINE-TUNING (4.9s+) */}
        <FocusCard
          accent={L4_C.cyan}
          active={isBridge1 || voiceSec >= 11.2}
          dimmed={isBridge2 && voiceSec < 11.2}
          appear={bridge1Pop}
          padding="24px 28px"
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 16,
                  background: L4_C.cyanBg,
                  border: `2px solid ${L4_C.cyan}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GlyphIcon kind="chip" color={L4_C.cyan} size={34} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: L4_FONT_DISPLAY,
                    fontSize: 30,
                    fontWeight: 800,
                    color: L4_C.text,
                  }}
                >
                  AI Engineer
                </div>
                <div style={{ fontFamily: L4_FONT_BN, fontSize: 22, color: L4_C.textMuted }}>
                  প্রয়োজনে এটিও করতে পারেন
                </div>
              </div>
            </div>

            <div style={{ fontFamily: L4_FONT_MONO, fontSize: 32, color: L4_C.amberSoft, fontWeight: 700 }}>
              ⟶
            </div>

            <div
              style={{
                background: L4_C.violetBg,
                border: `2px solid ${L4_C.violetSoft}`,
                borderRadius: 16,
                padding: "14px 22px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: L4_FONT_DISPLAY,
                  fontSize: 27,
                  fontWeight: 800,
                  color: L4_C.violetSoft,
                }}
              >
                Model Fine-tuning
              </div>
              <div style={{ fontFamily: L4_FONT_MONO, fontSize: 15, color: L4_C.textMuted, marginTop: 2 }}>
                ADAPT MODEL WEIGHTS
              </div>
            </div>
          </div>
        </FocusCard>

        {/* CROSSOVER BRIDGE 2: ML ENGINEER -> PRE-TRAINED MODELS (8.3s+) */}
        <FocusCard
          accent={L4_C.violet}
          active={isBridge2}
          dimmed={!isBridge2}
          appear={bridge2Pop}
          padding="24px 28px"
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 16,
                  background: L4_C.violetBg,
                  border: `2px solid ${L4_C.violetSoft}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GlyphIcon kind="brain" color={L4_C.violetSoft} size={34} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: L4_FONT_DISPLAY,
                    fontSize: 30,
                    fontWeight: 800,
                    color: L4_C.text,
                  }}
                >
                  ML Engineer
                </div>
                <div style={{ fontFamily: L4_FONT_BN, fontSize: 22, color: L4_C.textMuted }}>
                  প্রয়োজনে এটিও ব্যবহার করেন
                </div>
              </div>
            </div>

            <div style={{ fontFamily: L4_FONT_MONO, fontSize: 32, color: L4_C.amberSoft, fontWeight: 700 }}>
              ⟶
            </div>

            <div
              style={{
                background: L4_C.cyanBg,
                border: `2px solid ${L4_C.cyan}`,
                borderRadius: 16,
                padding: "14px 22px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: L4_FONT_DISPLAY,
                  fontSize: 27,
                  fontWeight: 800,
                  color: L4_C.cyan,
                }}
              >
                Pre-trained Models
              </div>
              <div style={{ fontFamily: L4_FONT_MONO, fontSize: 15, color: L4_C.textMuted, marginTop: 2 }}>
                FOUNDATION LLMs
              </div>
            </div>
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
