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

export const Scene08TrainingVsInference: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene8");

  // Exact acoustic beats from scene_08_educational_scene_8.wav (14.48s):
  // 0.30-3.78: "LLM বোঝার জন্য Training এবং Inference-এর পার্থক্য জানা জরুরি।"
  // 4.40-8.38: "Training-এর সময় Model বিশাল Data থেকে শেখে এবং তার Parameters Update হয়।"
  // 8.96-14.16: "অন্যদিকে Inference-এর সময় Trained Model ব্যবহার করে User-এর Prompt অনুযায়ী Response Generate করে।"
  const headPop = springAt(frame, fps, 0.2, SPRING_HERO);
  const trainPop = springAt(frame, fps, 4.3, SPRING_HERO);
  const inferPop = springAt(frame, fps, 8.85, SPRING_HERO);
  const replyPop = springAt(frame, fps, 12.4, SPRING_HERO);

  const isTrainActive = voiceSec >= 4.25 && voiceSec < 8.85;
  const isInferActive = voiceSec >= 8.85;

  // Animated loss curve draws during Training (4.4s -> 8.3s)
  const trainProgress = interpolate(voiceSec, [4.4, 8.3], [0, 1], clamp);
  const curveOffset = interpolate(trainProgress, [0, 1], [360, 0], clamp);
  const weightOsc1 = isTrainActive ? 45 + Math.sin(frame / 4) * 32 : 76;
  const weightOsc2 = isTrainActive ? 55 + Math.cos(frame / 3.5) * 28 : 42;
  const weightOsc3 = isTrainActive ? 50 + Math.sin(frame / 5 + 1) * 30 : 88;

  return (
    <SceneShell
      id="scene8"
      sfx={[
        { atVoiceSec: 0.25, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 4.35, kind: "pop", volume: 0.17 },
        { atVoiceSec: 8.9, kind: "whoosh", volume: 0.16 },
        { atVoiceSec: 12.45, kind: "chime", volume: 0.19 },
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
          eyebrow="CORE DISTINCTION · TWO PHASES"
          title="Training vs Inference"
          subtitle="Model কীভাবে শেখে বনাম কীভাবে উত্তর দেয়"
          accent={L5_C.amberSoft}
          appear={headPop}
        />

        {/* 1. TRAINING PHASE CARD (4.3s - 8.8s active) */}
        <FocusCard
          accent={L5_C.violet}
          active={isTrainActive}
          dimmed={isInferActive}
          appear={trainPop}
          padding="24px 28px"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <RolePill
              label="PHASE 01 · TRAINING"
              color={L5_C.violetSoft}
              bg={L5_C.violetBg}
              fontSize={18}
            />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: isInferActive ? "rgba(148,163,184,0.14)" : L5_C.violetBg,
                border: `1.5px solid ${isInferActive ? L5_C.borderSubtle : L5_C.violetSoft}`,
                borderRadius: 10,
                padding: "5px 12px",
                fontFamily: L5_FONT_MONO,
                fontSize: 15,
                fontWeight: 800,
                color: isInferActive ? L5_C.textDim : L5_C.orchid,
              }}
            >
              {isInferActive ? "PARAMETERS: FROZEN" : "PARAMETERS: UPDATING"}
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <div
              style={{
                fontFamily: L5_FONT_DISPLAY,
                fontSize: 36,
                fontWeight: 800,
                color: L5_C.text,
              }}
            >
              Learn from Massive Data
            </div>
            <div
              style={{
                fontFamily: L5_FONT_BN,
                fontSize: 24,
                fontWeight: 600,
                color: L5_C.textMuted,
                marginTop: 4,
              }}
            >
              বিশাল Data থেকে শেখে এবং Parameters Update হয়
            </div>
          </div>

          {/* Live Loss Curve + Moving Parameter Sliders */}
          <div
            style={{
              display: "flex",
              gap: 16,
              background: "rgba(4, 9, 24, 0.94)",
              border: `1.5px solid ${L5_C.borderViolet}`,
              borderRadius: 16,
              padding: "16px 18px",
              marginTop: 10,
            }}
          >
            {/* Loss Curve */}
            <div style={{ flex: 1.2 }}>
              <div
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 14,
                  fontWeight: 700,
                  color: L5_C.violetSoft,
                  marginBottom: 6,
                }}
              >
                TRAINING LOSS ↓
              </div>
              <svg width="360" height="110" viewBox="0 0 360 110">
                <line x1="16" y1="94" x2="344" y2="94" stroke="#334155" strokeWidth="1.5" />
                <line x1="16" y1="12" x2="16" y2="94" stroke="#334155" strokeWidth="1.5" />
                <path
                  d="M 20 18 C 80 28, 130 68, 200 78 C 260 85, 305 88, 340 89"
                  fill="none"
                  stroke={L5_C.orchid}
                  strokeWidth="4.5"
                  strokeDasharray="360"
                  strokeDashoffset={curveOffset}
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Updating Weights Sliders */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 14,
                  fontWeight: 700,
                  color: L5_C.textMuted,
                }}
              >
                NEURAL WEIGHTS (W)
              </div>
              {[
                { label: "W1", val: weightOsc1 },
                { label: "W2", val: weightOsc2 },
                { label: "W3", val: weightOsc3 },
              ].map((w) => (
                <div key={w.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: L5_FONT_MONO, fontSize: 15, color: L5_C.violetSoft, fontWeight: 700 }}>
                    {w.label}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 12,
                      borderRadius: 999,
                      background: "rgba(148, 163, 184, 0.16)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.round(w.val)}%`,
                        background: `linear-gradient(90deg, ${L5_C.violet}, ${L5_C.orchid})`,
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FocusCard>

        {/* CENTER VS DIVIDER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: inferPop,
          }}
        >
          <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, transparent, ${L5_C.violet})` }} />
          <div
            style={{
              background: "rgba(12, 20, 46, 0.96)",
              border: `1.5px solid ${L5_C.borderAmber}`,
              borderRadius: 999,
              padding: "6px 24px",
              fontFamily: L5_FONT_MONO,
              fontSize: 18,
              fontWeight: 800,
              color: L5_C.amberSoft,
            }}
          >
            LEARNING vs SERVING
          </div>
          <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, ${L5_C.cyan}, transparent)` }} />
        </div>

        {/* 2. INFERENCE PHASE CARD (8.85s - 14.48s active) */}
        <FocusCard
          accent={L5_C.cyan}
          active={isInferActive}
          dimmed={!isInferActive}
          appear={inferPop}
          padding="24px 28px"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <RolePill
              label="PHASE 02 · INFERENCE"
              color={L5_C.cyan}
              bg={L5_C.cyanBg}
              fontSize={18}
            />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: L5_C.emeraldBg,
                border: `1.5px solid ${L5_C.emerald}`,
                borderRadius: 10,
                padding: "5px 12px",
                fontFamily: L5_FONT_MONO,
                fontSize: 15,
                fontWeight: 800,
                color: L5_C.emeraldSoft,
              }}
            >
              <GlyphIcon kind="lock" color={L5_C.emeraldSoft} size={18} />
              <span>WEIGHTS LOCKED</span>
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <div
              style={{
                fontFamily: L5_FONT_DISPLAY,
                fontSize: 36,
                fontWeight: 800,
                color: L5_C.text,
              }}
            >
              Generate Real-Time Responses
            </div>
            <div
              style={{
                fontFamily: L5_FONT_BN,
                fontSize: 24,
                fontWeight: 600,
                color: L5_C.textMuted,
                marginTop: 4,
              }}
            >
              Trained Model দিয়ে User Prompt-এর উত্তর তৈরি করে
            </div>
          </div>

          {/* 3-Node Inference Serving Flow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 12,
            }}
          >
            {[
              { title: "User Prompt", sub: "API Request", icon: "chat" as const, col: L5_C.cyanSoft, lit: voiceSec >= 10.6 },
              { title: "Trained LLM", sub: "Frozen Weights", icon: "chip" as const, col: L5_C.cyan, lit: voiceSec >= 10.8 },
              { title: "AI Response", sub: "Fast Stream", icon: "bolt" as const, col: L5_C.emeraldSoft, lit: voiceSec >= 12.4 },
            ].map((node, i) => (
              <React.Fragment key={node.title}>
                <div
                  style={{
                    flex: 1,
                    background: node.lit ? "rgba(0, 229, 255, 0.11)" : "rgba(6, 12, 32, 0.85)",
                    border: `2px solid ${node.lit ? node.col : L5_C.borderSubtle}`,
                    borderRadius: 16,
                    padding: "16px 12px",
                    textAlign: "center",
                    transform:
                      i === 2 && node.lit
                        ? `scale(${interpolate(replyPop, [0, 1], [0.92, 1.03], clamp)})`
                        : "scale(1)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                    <GlyphIcon kind={node.icon} color={node.lit ? node.col : L5_C.textDim} size={32} />
                  </div>
                  <div
                    style={{
                      fontFamily: L5_FONT_DISPLAY,
                      fontSize: 22,
                      fontWeight: 800,
                      color: L5_C.text,
                    }}
                  >
                    {node.title}
                  </div>
                  <div
                    style={{
                      fontFamily: L5_FONT_MONO,
                      fontSize: 14,
                      color: node.lit ? node.col : L5_C.textDim,
                      marginTop: 4,
                    }}
                  >
                    {node.sub}
                  </div>
                </div>
                {i < 2 ? (
                  <span style={{ fontFamily: L5_FONT_MONO, fontSize: 26, fontWeight: 800, color: L5_C.cyan }}>
                    →
                  </span>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
