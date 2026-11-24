import React from "react";
import { interpolate, spring } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import {
  AIP_C,
  AIP_DISPLAY,
  AIP_LEAD_SEC,
  AIP_MONO,
} from "./narration";
import { AipSceneShell, useAipVoice, useP } from "./AipSceneShell";
import { NeuralNetwork3D } from "./NeuralNetwork3D";

export const Scene2TraditionalVsAi: React.FC<{
  readonly showSubtitles?: boolean;
  readonly showHud?: boolean;
}> = ({ showSubtitles = true, showHud = true }) => {
  const { frame, fps, voiceSec, totalVoiceSec } = useAipVoice("scene2");
  const P = useP();

  // Camera: Isometric lateral pan from traditional (left) to AI (right)
  const camX = interpolate(voiceSec, [0, 4.5, 7.0, totalVoiceSec], [60, 40, -40, -60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.98, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phrase 1: Traditional software pop (0.15s - 5.05s)
  const leftPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 0.15) * fps),
    fps,
    config: SPRING_UI,
  });

  // Phrase 2: AI learning pop (5.05s - 12.96s)
  const rightPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 5.05) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const isAiActive = voiceSec >= 5.05;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 14);

  if (P) {
    return (
      <AipSceneShell
        id="scene2"
        showSubtitles={showSubtitles}
        showHud={showHud}
        cameraStyle={{
          transform: `scale(${camScale})`,
          transformOrigin: "center center",
        }}
        sfx={[
          { atSec: AIP_LEAD_SEC + 0.2, type: "pop", volume: 0.24 },
          { atSec: AIP_LEAD_SEC + 5.05, type: "chime", volume: 0.35 },
          { atSec: AIP_LEAD_SEC + 8.5, type: "whoosh", volume: 0.2 },
        ]}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          {/* TOP CARD: Traditional Software */}
          <div
            style={{
              height: 470,
              background: "rgba(8, 14, 36, 0.92)",
              border: `1.5px solid ${!isAiActive ? "rgba(148, 163, 184, 0.45)" : AIP_C.borderSubtle}`,
              borderRadius: 22,
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.65)",
              transform: `scale(${interpolate(leftPop, [0, 1], [0.94, 1])}) translateY(${interpolate(leftPop, [0, 1], [25, 0])}px)`,
              opacity: leftPop,
              position: "relative",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    background: "rgba(148, 163, 184, 0.12)",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    borderRadius: 6,
                    padding: "3px 10px",
                    fontFamily: AIP_MONO,
                    fontSize: 12,
                    color: AIP_C.textDim,
                    fontWeight: 700,
                  }}
                >
                  LEGACY PARADIGM
                </span>
                <span style={{ fontFamily: AIP_MONO, fontSize: 12, color: "#EF4444" }}>HARDCODED LOGIC</span>
              </div>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 28,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 8,
                }}
              >
                Traditional Software Development
              </div>
              <div style={{ fontSize: 14, color: AIP_C.textMuted, marginTop: 4 }}>
                Developers explicitly write manual business rules and static logic branches.
              </div>
            </div>

            {/* Code Box */}
            <div
              style={{
                background: "rgba(4, 8, 22, 0.96)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: 14,
                padding: "16px 20px",
                fontFamily: AIP_MONO,
                fontSize: 14,
                lineHeight: 1.6,
                color: "#94A3B8",
              }}
            >
              <div>
                <span style={{ color: "#F43F5E" }}>if</span> (user.score &gt; <span style={{ color: "#38BDF8" }}>720</span>) &#123;{" "}
                <span style={{ color: "#10B981" }}>approveLoan()</span>; &#125;
              </div>
              <div>
                <span style={{ color: "#F43F5E" }}>else if</span> (user.debt &lt; <span style={{ color: "#38BDF8" }}>0.35</span>) &#123;{" "}
                <span style={{ color: "#F59E0B" }}>manualReview()</span>; &#125;
              </div>
              <div>
                <span style={{ color: "#F43F5E" }}>else</span> &#123; <span style={{ color: "#EF4444" }}>reject()</span>; &#125;
              </div>
            </div>

            {/* Limitation tag */}
            <div
              style={{
                background: "rgba(244, 63, 94, 0.08)",
                border: "1px solid rgba(244, 63, 94, 0.3)",
                borderRadius: 10,
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#F43F5E",
                }}
              />
              <span style={{ fontFamily: AIP_MONO, fontSize: 12, color: "#F43F5E", fontWeight: 700 }}>
                LIMITATION: Rigid, cannot adapt to unseen patterns or changing data.
              </span>
            </div>
          </div>

          {/* PARADIGM SHIFT DIVIDER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                height: 1,
                flex: 1,
                background: `linear-gradient(90deg, transparent, ${isAiActive ? AIP_C.cyan : "rgba(148, 163, 184, 0.2)"})`,
              }}
            />
            <div
              style={{
                background: isAiActive
                  ? "linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(168, 85, 247, 0.2))"
                  : "rgba(10, 18, 44, 0.8)",
                border: `1.5px solid ${isAiActive ? AIP_C.cyan : AIP_C.borderSubtle}`,
                borderRadius: 999,
                padding: "4px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: isAiActive ? "0 0 20px rgba(0, 229, 255, 0.3)" : "none",
              }}
            >
              <span style={{ fontFamily: AIP_MONO, fontSize: 12, color: isAiActive ? AIP_C.cyan : AIP_C.textDim, fontWeight: 700 }}>
                PARADIGM SHIFT: RULES → PATTERNS
              </span>
              <span style={{ color: isAiActive ? AIP_C.cyan : AIP_C.textDim }}>↓</span>
            </div>
            <div
              style={{
                height: 1,
                flex: 1,
                background: `linear-gradient(90deg, ${isAiActive ? AIP_C.purple : "rgba(148, 163, 184, 0.2)"}, transparent)`,
              }}
            />
          </div>

          {/* BOTTOM CARD: AI-Powered Software */}
          <div
            style={{
              flex: 1,
              background:
                "linear-gradient(180deg, rgba(8, 16, 46, 0.94) 0%, rgba(18, 14, 56, 0.96) 100%)",
              border: `2px solid ${isAiActive ? AIP_C.cyan : AIP_C.panelBorderCyan}`,
              borderRadius: 24,
              padding: "22px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: isAiActive
                ? "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 229, 255, 0.2)"
                : "0 16px 40px rgba(0, 0, 0, 0.6)",
              transform: `scale(${interpolate(rightPop, [0, 1], [0.94, 1])}) translateY(${interpolate(rightPop, [0, 1], [25, 0])}px)`,
              opacity: rightPop,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    background: "rgba(0, 229, 255, 0.15)",
                    border: `1px solid ${AIP_C.cyan}`,
                    borderRadius: 6,
                    padding: "3px 10px",
                    fontFamily: AIP_MONO,
                    fontSize: 12,
                    color: AIP_C.cyan,
                    fontWeight: 700,
                  }}
                >
                  NEXT-GEN AI PARADIGM
                </span>
                <span style={{ fontFamily: AIP_MONO, fontSize: 12, color: AIP_C.cyan }}>PATTERN LEARNING</span>
              </div>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 28,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 8,
                }}
              >
                AI-Powered Software
              </div>
              <div style={{ fontSize: 14, color: AIP_C.textMuted, marginTop: 4 }}>
                Learns data patterns autonomously, makes probabilistic predictions, and executes intelligent decisions.
              </div>
            </div>

            {/* 3D Neural Architecture Center */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 340,
                transform: "scale(0.85)",
              }}
            >
              <NeuralNetwork3D
                scale={0.9}
                active={isAiActive}
                primaryColor={AIP_C.cyan}
                secondaryColor={AIP_C.purple}
                label="NEURAL PATTERN REASONING"
              />
            </div>

            {/* 3 Capabilities Row */}
            <div style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  flex: 1,
                  background: "rgba(6, 12, 34, 0.8)",
                  border: `1px solid ${AIP_C.panelBorderCyan}`,
                  borderRadius: 14,
                  padding: "12px 14px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.cyan }}>01 · PATTERN</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: AIP_C.text, marginTop: 2 }}>Learns Features</div>
              </div>
              <div
                style={{
                  flex: 1,
                  background: "rgba(6, 12, 34, 0.8)",
                  border: `1px solid ${AIP_C.panelBorderPurple}`,
                  borderRadius: 14,
                  padding: "12px 14px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.purple }}>02 · PREDICT</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: AIP_C.text, marginTop: 2 }}>High Accuracy</div>
              </div>
              <div
                style={{
                  flex: 1,
                  background: "rgba(6, 12, 34, 0.8)",
                  border: `1px solid ${AIP_C.panelBorderCyan}`,
                  borderRadius: 14,
                  padding: "12px 14px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.emerald }}>03 · DECIDE</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: AIP_C.text, marginTop: 2 }}>Smart Action</div>
              </div>
            </div>
          </div>
        </div>
      </AipSceneShell>
    );
  }

  return (
    <AipSceneShell
      id="scene2"
      showSubtitles={showSubtitles}
      showHud={showHud}
      cameraStyle={{
        transform: `scale(${camScale}) translateX(${camX}px)`,
        transformOrigin: "center center",
      }}
      sfx={[
        { atSec: AIP_LEAD_SEC + 0.2, type: "pop", volume: 0.24 },
        { atSec: AIP_LEAD_SEC + 5.05, type: "chime", volume: 0.35 },
        { atSec: AIP_LEAD_SEC + 8.5, type: "whoosh", volume: 0.2 },
      ]}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 60,
          padding: "0 40px",
        }}
      >
        {/* LEFT COLUMN: Traditional Software Development */}
        <div
          style={{
            flex: 1,
            height: 1400,
            background: "rgba(8, 14, 36, 0.88)",
            border: `2px solid ${
              !isAiActive ? "rgba(148, 163, 184, 0.45)" : AIP_C.borderSubtle
            }`,
            borderRadius: 36,
            padding: "50px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65)",
            transform: `scale(${interpolate(leftPop, [0, 1], [0.94, 1])}) translateY(${interpolate(leftPop, [0, 1], [40, 0])}px)`,
            opacity: leftPop,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(148, 163, 184, 0.12)",
                border: "1px solid rgba(148, 163, 184, 0.3)",
                borderRadius: 8,
                padding: "6px 16px",
                fontFamily: AIP_MONO,
                fontSize: 20,
                color: AIP_C.textDim,
                fontWeight: 700,
              }}
            >
              LEGACY ARCHITECTURE
            </div>
            <div
              style={{
                fontFamily: AIP_DISPLAY,
                fontSize: 54,
                fontWeight: 800,
                color: AIP_C.text,
                marginTop: 20,
              }}
            >
              Traditional Development
            </div>
            <div
              style={{
                fontSize: 26,
                color: AIP_C.textMuted,
                marginTop: 10,
                lineHeight: 1.4,
              }}
            >
              Engineers explicitly define static logic, business rules, and strict conditional flows.
            </div>
          </div>

          {/* Code & Flowchart Visual */}
          <div
            style={{
              background: "rgba(4, 8, 22, 0.95)",
              border: `1.5px solid rgba(148, 163, 184, 0.25)`,
              borderRadius: 20,
              padding: "36px 40px",
              fontFamily: AIP_MONO,
              fontSize: 24,
              color: "#94A3B8",
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: "#64748B", marginBottom: 12 }}>
              // Deterministic Business Logic Engine
            </div>
            <div>
              <span style={{ color: "#F43F5E" }}>if</span> (user.creditScore &gt;{" "}
              <span style={{ color: "#38BDF8" }}>720</span>) &#123;
            </div>
            <div style={{ paddingLeft: 30, color: "#10B981" }}>
              return executeApproval(loanTierA);
            </div>
            <div>
              &#125; <span style={{ color: "#F43F5E" }}>else if</span> (user.debtRatio &lt;{" "}
              <span style={{ color: "#38BDF8" }}>0.35</span>) &#123;
            </div>
            <div style={{ paddingLeft: 30, color: "#F59E0B" }}>
              return routeManualReview();
            </div>
            <div>
              &#125; <span style={{ color: "#F43F5E" }}>else</span> &#123;
            </div>
            <div style={{ paddingLeft: 30, color: "#EF4444" }}>
              return rejectApplication();
            </div>
            <div>&#125;</div>
          </div>

          {/* Bottleneck Badge */}
          <div
            style={{
              background: "rgba(244, 63, 94, 0.1)",
              border: "1.5px solid rgba(244, 63, 94, 0.35)",
              borderRadius: 18,
              padding: "24px 30px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#F43F5E",
                boxShadow: "0 0 16px #F43F5E",
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#F43F5E",
                }}
              >
                LIMITATION: STATIC RULE BOTTLENECK
              </div>
              <div style={{ fontSize: 22, color: AIP_C.textDim, marginTop: 4 }}>
                Cannot generalize to unseen patterns, edge cases, or evolving behavioral trends.
              </div>
            </div>
          </div>
        </div>

        {/* CENTER: Transformation Energy Conduit */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            zIndex: 20,
          }}
        >
          <div
            style={{
              width: 4,
              height: 200,
              background: `linear-gradient(180deg, transparent, ${AIP_C.cyan}, transparent)`,
              opacity: isAiActive ? 0.9 : 0.3,
            }}
          />
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: isAiActive
                ? "linear-gradient(135deg, #00E5FF, #A855F7)"
                : "rgba(10, 18, 44, 0.9)",
              border: `2px solid ${isAiActive ? AIP_C.cyan : AIP_C.borderSubtle}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isAiActive
                ? `0 0 40px ${AIP_C.cyan}, 0 0 70px ${AIP_C.purple}`
                : "none",
              transform: `scale(${isAiActive ? 1.1 + 0.08 * pulse : 1})`,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke={isAiActive ? "#FFFFFF" : AIP_C.textDim}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              width: 4,
              height: 200,
              background: `linear-gradient(180deg, transparent, ${AIP_C.purple}, transparent)`,
              opacity: isAiActive ? 0.9 : 0.3,
            }}
          />
          <div
            style={{
              fontFamily: AIP_MONO,
              fontSize: 16,
              color: isAiActive ? AIP_C.cyan : AIP_C.textDim,
              letterSpacing: 2,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            PARADIGM EVOLUTION
          </div>
        </div>

        {/* RIGHT COLUMN: AI-Powered Software Architecture */}
        <div
          style={{
            flex: 1,
            height: 1400,
            background:
              "linear-gradient(180deg, rgba(8, 16, 46, 0.94) 0%, rgba(18, 14, 56, 0.96) 100%)",
            border: `2px solid ${
              isAiActive ? AIP_C.cyan : AIP_C.panelBorderCyan
            }`,
            borderRadius: 36,
            padding: "50px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: isAiActive
              ? `0 30px 80px rgba(0, 0, 0, 0.8), 0 0 60px rgba(0, 229, 255, 0.25)`
              : "0 20px 50px rgba(0, 0, 0, 0.6)",
            transform: `scale(${interpolate(rightPop, [0, 1], [0.94, 1])}) translateY(${interpolate(rightPop, [0, 1], [40, 0])}px)`,
            opacity: rightPop,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glowing Top Beam */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: `linear-gradient(90deg, ${AIP_C.cyan}, ${AIP_C.purple})`,
            }}
          />

          {/* Header */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(0, 229, 255, 0.15)",
                border: `1.5px solid ${AIP_C.cyan}`,
                borderRadius: 8,
                padding: "6px 16px",
                fontFamily: AIP_MONO,
                fontSize: 20,
                color: AIP_C.cyan,
                fontWeight: 700,
                boxShadow: "0 0 16px rgba(0, 229, 255, 0.3)",
              }}
            >
              NEXT-GEN AI CAPABILITY
            </div>
            <div
              style={{
                fontFamily: AIP_DISPLAY,
                fontSize: 54,
                fontWeight: 800,
                color: AIP_C.text,
                marginTop: 20,
              }}
            >
              AI-Powered Software
            </div>
            <div
              style={{
                fontSize: 26,
                color: AIP_C.textMuted,
                marginTop: 10,
                lineHeight: 1.4,
              }}
            >
              Learns intricate patterns directly from raw data, produces high-confidence predictions, and drives autonomous decisions.
            </div>
          </div>

          {/* 3D Neural Architecture Center */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 480,
            }}
          >
            <NeuralNetwork3D
              scale={1.15}
              active={isAiActive}
              primaryColor={AIP_C.cyan}
              secondaryColor={AIP_C.purple}
              label="CONTINUOUS PATTERN INFERENCE"
            />
          </div>

          {/* 3 Capabilities Row */}
          <div style={{ display: "flex", gap: 20 }}>
            <div
              style={{
                flex: 1,
                background: "rgba(6, 12, 34, 0.8)",
                border: `1px solid ${AIP_C.panelBorderCyan}`,
                borderRadius: 18,
                padding: "20px 24px",
              }}
            >
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.cyan }}>01 · PATTERN</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: AIP_C.text, marginTop: 4 }}>
                Learns Features
              </div>
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(6, 12, 34, 0.8)",
                border: `1px solid ${AIP_C.panelBorderPurple}`,
                borderRadius: 18,
                padding: "20px 24px",
              }}
            >
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.purple }}>02 · PREDICT</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: AIP_C.text, marginTop: 4 }}>
                Anticipates Intent
              </div>
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(6, 12, 34, 0.8)",
                border: `1px solid ${AIP_C.panelBorderCyan}`,
                borderRadius: 18,
                padding: "20px 24px",
              }}
            >
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.emerald }}>03 · DECIDE</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: AIP_C.text, marginTop: 4 }}>
                Real-Time Action
              </div>
            </div>
          </div>
        </div>
      </div>
    </AipSceneShell>
  );
};
