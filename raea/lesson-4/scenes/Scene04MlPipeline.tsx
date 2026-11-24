import React from "react";
import { interpolate } from "raea";
import { L4_C, L4_FONT_BN, L4_FONT_DISPLAY, L4_FONT_MONO, SPRING_HERO } from "../narration";
import {
  FocusCard,
  GlyphIcon,
  RolePill,
  clamp,
  springAt,
  useVoice,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

const ML_STEPS: readonly {
  readonly num: string;
  readonly title: string;
  readonly detail: string;
  readonly atSec: number;
  readonly isDeploy?: boolean;
}[] = [
  { num: "01", title: "Data Preprocessing", detail: "Clean & normalize raw data", atSec: 6.3 },
  { num: "02", title: "Feature Engineering", detail: "Extract predictive signals", atSec: 7.75 },
  { num: "03", title: "Model Training", detail: "Learn weights from data", atSec: 9.25 },
  { num: "04", title: "Fine-tuning", detail: "Refine model parameters", atSec: 10.45 },
  { num: "05", title: "Evaluation", detail: "Test accuracy & benchmarks", atSec: 11.4 },
  {
    num: "06",
    title: "Model Deployment",
    detail: "Serve model in production",
    atSec: 12.3,
    isDeploy: true,
  },
];

export const Scene04MlPipeline: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene4");

  // Exact acoustic beats from scene_04_analytical_scene_4.wav (14.60s):
  // 0.20-6.20: ML Engineer works with Data & Machine Learning Model
  // 6.35-14.35: Data Preprocessing -> Feature Engineering -> Model Training -> Fine-tuning -> Evaluation -> Model Deployment
  const heroPop = springAt(frame, fps, 0.2, SPRING_HERO);
  const gridPop = springAt(frame, fps, 6.15, SPRING_HERO);

  // Live training loss curve draws smoothly from 2.0s -> 13.5s
  const curveDraw = interpolate(voiceSec, [1.8, 12.8], [520, 0], clamp);
  const dotProgress = interpolate(voiceSec, [1.8, 12.8], [0, 1], clamp);
  const dotX = 30 + dotProgress * 460;
  const dotY = 108 - (1 - Math.exp(-dotProgress * 3.1)) * 84;

  return (
    <SceneShell
      id="scene4"
      sfx={[
        { atVoiceSec: 0.25, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 6.3, kind: "click", volume: 0.14 },
        { atVoiceSec: 7.75, kind: "click", volume: 0.14 },
        { atVoiceSec: 9.25, kind: "pop", volume: 0.16 },
        { atVoiceSec: 10.45, kind: "click", volume: 0.14 },
        { atVoiceSec: 11.4, kind: "click", volume: 0.14 },
        { atVoiceSec: 12.35, kind: "chime", volume: 0.18 },
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
        {/* TOP ROLE HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <RolePill
            label="MACHINE LEARNING ENGINEER"
            color={L4_C.violetSoft}
            bg={L4_C.violetBg}
            fontSize={19}
          />
          <span
            style={{
              fontFamily: L4_FONT_MONO,
              fontSize: 18,
              color: L4_C.textDim,
              fontWeight: 700,
            }}
          >
            DATA &amp; MODELS
          </span>
        </div>

        {/* HERO CARD: DATA + ML MODEL CORE + LIVE TRAINING CURVE (0.2s+) */}
        <FocusCard accent={L4_C.violet} active appear={heroPop} padding="24px 28px">
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 18 }}>
            <div
              style={{
                width: 74,
                height: 74,
                borderRadius: 18,
                background: L4_C.violetBg,
                border: `2px solid ${L4_C.violet}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GlyphIcon kind="brain" color={L4_C.violetSoft} size={42} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: L4_FONT_MONO,
                  fontSize: 17,
                  color: L4_C.violetSoft,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                }}
              >
                CORE DOMAIN
              </div>
              <div
                style={{
                  fontFamily: L4_FONT_DISPLAY,
                  fontSize: 38,
                  fontWeight: 800,
                  color: L4_C.text,
                  marginTop: 2,
                }}
              >
                Data &amp; Machine Learning Models
              </div>
              <div
                style={{
                  fontFamily: L4_FONT_BN,
                  fontSize: 23,
                  color: L4_C.textMuted,
                  marginTop: 4,
                }}
              >
                ডেটা থেকে শক্তিশালী মডেল তৈরি ও অপ্টিমাইজেশন
              </div>
            </div>
          </div>

          {/* Animated Training Loss / Convergence Visual */}
          <div
            style={{
              background: "rgba(4, 9, 24, 0.94)",
              border: `1px solid ${L4_C.borderViolet}`,
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <svg width="530" height="128" viewBox="0 0 530 128">
              {/* Grid lines */}
              <line x1="30" y1="24" x2="500" y2="24" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" />
              <line x1="30" y1="66" x2="500" y2="66" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" />
              <line x1="30" y1="108" x2="500" y2="108" stroke="#475569" strokeWidth="1.5" />
              <line x1="30" y1="14" x2="30" y2="108" stroke="#475569" strokeWidth="1.5" />
              {/* Training Convergence Curve */}
              <path
                d="M 30 108 C 110 92, 160 54, 240 40 C 330 27, 410 25, 490 24"
                fill="none"
                stroke={L4_C.violetSoft}
                strokeWidth="4.5"
                strokeDasharray="520"
                strokeDashoffset={curveDraw}
                strokeLinecap="round"
              />
              {/* Active Head */}
              <circle cx={dotX} cy={dotY} r="8" fill={L4_C.orchid} />
            </svg>
            <div style={{ width: 290, display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  fontFamily: L4_FONT_MONO,
                  fontSize: 16,
                  color: L4_C.violetSoft,
                  fontWeight: 700,
                }}
              >
                MODEL LEARNING CURVE
              </div>
              <div
                style={{
                  fontFamily: L4_FONT_DISPLAY,
                  fontSize: 24,
                  fontWeight: 800,
                  color: L4_C.text,
                }}
              >
                {voiceSec < 9.2
                  ? "Preparing Features"
                  : voiceSec < 11.4
                    ? "Training & Tuning"
                    : voiceSec < 12.3
                      ? "Evaluating Model"
                      : "Ready to Deploy ✓"}
              </div>
              <div
                style={{
                  height: 10,
                  borderRadius: 999,
                  background: "rgba(148, 163, 184, 0.2)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.round(dotProgress * 100)}%`,
                    background: `linear-gradient(90deg, ${L4_C.violet}, ${L4_C.emerald})`,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          </div>
        </FocusCard>

        {/* 6-STAGE END-TO-END ML LIFECYCLE PIPELINE (6.3s - 14.6s) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: gridPop,
            transform: `translate3d(0px, ${interpolate(gridPop, [0, 1], [22, 0], clamp)}px, 0px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontFamily: L4_FONT_MONO,
                fontSize: 18,
                fontWeight: 700,
                color: L4_C.violetSoft,
                letterSpacing: 1.6,
              }}
            >
              END-TO-END ML WORKFLOW (6 STAGES)
            </span>
            <span style={{ fontFamily: L4_FONT_MONO, fontSize: 17, color: L4_C.textDim }}>
              STEP-BY-STEP
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              alignContent: "flex-start",
            }}
          >
            {ML_STEPS.map((step, idx) => {
              const lit = voiceSec >= step.atSec;
              const nextSec = idx < ML_STEPS.length - 1 ? ML_STEPS[idx + 1].atSec : 99;
              const isCurrent = voiceSec >= step.atSec && voiceSec < nextSec;
              const pop = springAt(frame, fps, step.atSec);
              const accent = step.isDeploy && lit ? L4_C.emerald : L4_C.violetSoft;

              return (
                <div
                  key={step.num}
                  style={{
                    width: "calc(50% - 10px)",
                    height: 232,
                    background: isCurrent
                      ? "linear-gradient(150deg, rgba(44, 18, 74, 0.96), rgba(14, 14, 42, 0.96))"
                      : lit
                        ? "rgba(18, 16, 48, 0.92)"
                        : "rgba(9, 14, 34, 0.72)",
                    border: `2px solid ${isCurrent ? accent : lit ? `${accent}88` : L4_C.borderSubtle}`,
                    borderRadius: 20,
                    padding: "20px 22px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    opacity: lit ? 1 : 0.42,
                    transform: `scale(${lit ? interpolate(pop, [0, 1], [0.92, isCurrent ? 1.02 : 1], clamp) : 0.96})`,
                    boxShadow: isCurrent ? `0 14px 36px ${accent}38` : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        background: lit ? `${accent}24` : "rgba(148,163,184,0.1)",
                        border: `1.5px solid ${lit ? accent : L4_C.borderSubtle}`,
                        borderRadius: 10,
                        padding: "4px 12px",
                        fontFamily: L4_FONT_MONO,
                        fontSize: 18,
                        fontWeight: 700,
                        color: lit ? accent : L4_C.textDim,
                      }}
                    >
                      STEP {step.num}
                    </span>
                    {lit ? (
                      <GlyphIcon kind="check" color={accent} size={26} />
                    ) : null}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: L4_FONT_DISPLAY,
                        fontSize: 28,
                        fontWeight: 800,
                        color: lit ? L4_C.text : L4_C.textDim,
                        lineHeight: 1.2,
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        fontFamily: L4_FONT_MONO,
                        fontSize: 16,
                        color: lit ? L4_C.textMuted : L4_C.textDim,
                        marginTop: 6,
                      }}
                    >
                      {step.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
