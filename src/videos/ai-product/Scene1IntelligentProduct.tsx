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

export const Scene1IntelligentProduct: React.FC<{
  readonly showSubtitles?: boolean;
  readonly showHud?: boolean;
}> = ({ showSubtitles = true, showHud = true }) => {
  const { frame, fps, voiceSec, totalVoiceSec } = useAipVoice("scene1");
  const P = useP();

  // Camera: Smooth cinematic 3D dolly-in
  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.98, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camY = interpolate(voiceSec, [0, totalVoiceSec], [15, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Entrance springs for the 3 core pillars
  const pillar1Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 0.3) * fps),
    fps,
    config: SPRING_UI,
  });
  const pillar2Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 1.6) * fps),
    fps,
    config: SPRING_UI,
  });
  const pillar3Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 3.0) * fps),
    fps,
    config: SPRING_UI,
  });

  // Phrase 2 (AI Engineering reveal at 5.75s)
  const engineReveal = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 5.75) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const activeBeat1 = voiceSec < 5.75;

  if (P) {
    return (
      <AipSceneShell
        id="scene1"
        showSubtitles={showSubtitles}
        showHud={showHud}
        cameraStyle={{
          transform: `scale(${camScale}) translateY(${camY * 0.5}px)`,
          transformOrigin: "center center",
        }}
        sfx={[
          { atSec: AIP_LEAD_SEC + 0.3, type: "pop", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 1.6, type: "pop", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 3.0, type: "pop", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 5.75, type: "chime", volume: 0.35 },
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
            gap: 16,
          }}
        >
          {/* Top 3 Core Pillars Stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Pillar 1: Intelligent */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(8, 16, 46, 0.92) 0%, rgba(18, 12, 48, 0.92) 100%)",
                border: `1.5px solid ${activeBeat1 ? AIP_C.cyan : AIP_C.panelBorderCyan}`,
                borderRadius: 20,
                padding: "16px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: activeBeat1
                  ? "0 12px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 229, 255, 0.2)"
                  : "0 8px 24px rgba(0, 0, 0, 0.4)",
                transform: `scale(${interpolate(pillar1Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(pillar1Pop, [0, 1], [20, 0])}px)`,
                opacity: pillar1Pop,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: AIP_MONO,
                      fontSize: 13,
                      color: AIP_C.cyan,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                    }}
                  >
                    01 · CAPABILITY
                  </span>
                  <span
                    style={{
                      background: "rgba(0, 229, 255, 0.15)",
                      border: `1px solid ${AIP_C.cyan}`,
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontFamily: AIP_MONO,
                      fontSize: 11,
                      color: AIP_C.cyan,
                      fontWeight: 700,
                    }}
                  >
                    ACTIVE
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: AIP_DISPLAY,
                    fontSize: 28,
                    fontWeight: 800,
                    color: AIP_C.text,
                    marginTop: 4,
                  }}
                >
                  Intelligent
                </div>
                <div style={{ fontSize: 15, color: AIP_C.textMuted, marginTop: 2 }}>
                  Adaptive Neural Reasoning & Predictive Inference
                </div>
              </div>
              <div
                style={{
                  background: "rgba(6, 11, 30, 0.8)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 12,
                  padding: "8px 16px",
                  textAlign: "right",
                  minWidth: 100,
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.textDim }}>ACCURACY</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 20, fontWeight: 700, color: AIP_C.cyan }}>99.4%</div>
              </div>
            </div>

            {/* Pillar 2: Faster */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(8, 16, 46, 0.92) 0%, rgba(18, 12, 48, 0.92) 100%)",
                border: `1.5px solid ${activeBeat1 ? AIP_C.purple : AIP_C.panelBorderPurple}`,
                borderRadius: 20,
                padding: "16px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: activeBeat1
                  ? "0 12px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(168, 85, 247, 0.2)"
                  : "0 8px 24px rgba(0, 0, 0, 0.4)",
                transform: `scale(${interpolate(pillar2Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(pillar2Pop, [0, 1], [20, 0])}px)`,
                opacity: pillar2Pop,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: AIP_MONO,
                      fontSize: 13,
                      color: AIP_C.purple,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                    }}
                  >
                    02 · PERFORMANCE
                  </span>
                  <span
                    style={{
                      background: "rgba(168, 85, 247, 0.15)",
                      border: `1px solid ${AIP_C.purple}`,
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontFamily: AIP_MONO,
                      fontSize: 11,
                      color: AIP_C.purple,
                      fontWeight: 700,
                    }}
                  >
                    OPTIMIZED
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: AIP_DISPLAY,
                    fontSize: 28,
                    fontWeight: 800,
                    color: AIP_C.text,
                    marginTop: 4,
                  }}
                >
                  Faster
                </div>
                <div style={{ fontSize: 15, color: AIP_C.textMuted, marginTop: 2 }}>
                  Sub-Millisecond Edge Latency & Stream Acceleration
                </div>
              </div>
              <div
                style={{
                  background: "rgba(6, 11, 30, 0.8)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 12,
                  padding: "8px 16px",
                  textAlign: "right",
                  minWidth: 100,
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.textDim }}>LATENCY</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 20, fontWeight: 700, color: AIP_C.purple }}>12ms (-76%)</div>
              </div>
            </div>

            {/* Pillar 3: Personalized */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(8, 16, 46, 0.92) 0%, rgba(18, 12, 48, 0.92) 100%)",
                border: `1.5px solid ${activeBeat1 ? AIP_C.cyanSoft : AIP_C.panelBorderCyan}`,
                borderRadius: 20,
                padding: "16px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: activeBeat1
                  ? "0 12px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.2)"
                  : "0 8px 24px rgba(0, 0, 0, 0.4)",
                transform: `scale(${interpolate(pillar3Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(pillar3Pop, [0, 1], [20, 0])}px)`,
                opacity: pillar3Pop,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: AIP_MONO,
                      fontSize: 13,
                      color: AIP_C.cyanSoft,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                    }}
                  >
                    03 · EXPERIENCE
                  </span>
                  <span
                    style={{
                      background: "rgba(56, 189, 248, 0.15)",
                      border: `1px solid ${AIP_C.cyanSoft}`,
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontFamily: AIP_MONO,
                      fontSize: 11,
                      color: AIP_C.cyanSoft,
                      fontWeight: 700,
                    }}
                  >
                    DYNAMIC
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: AIP_DISPLAY,
                    fontSize: 28,
                    fontWeight: 800,
                    color: AIP_C.text,
                    marginTop: 4,
                  }}
                >
                  Personalized
                </div>
                <div style={{ fontSize: 15, color: AIP_C.textMuted, marginTop: 2 }}>
                  Dynamic Vector Embeddings & 1:1 Tailored Journeys
                </div>
              </div>
              <div
                style={{
                  background: "rgba(6, 11, 30, 0.8)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 12,
                  padding: "8px 16px",
                  textAlign: "right",
                  minWidth: 100,
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.textDim }}>ENGAGEMENT</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 20, fontWeight: 700, color: AIP_C.cyanSoft }}>+84%</div>
              </div>
            </div>
          </div>

          {/* Bottom Card: AI Engineering Engine & 3D Core */}
          <div
            style={{
              flex: 1,
              background:
                "linear-gradient(180deg, rgba(7, 14, 38, 0.9) 0%, rgba(12, 18, 52, 0.96) 100%)",
              border: `2px solid ${AIP_C.panelBorderCyan}`,
              borderRadius: 24,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.75), 0 0 50px rgba(0, 229, 255, 0.15)",
              transform: `scale(${interpolate(engineReveal, [0, 1], [0.96, 1])}) translateY(${interpolate(engineReveal, [0, 1], [25, 0])}px)`,
              opacity: engineReveal,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ textAlign: "center", width: "100%", zIndex: 5 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(0, 229, 255, 0.12)",
                  border: `1px solid ${AIP_C.cyan}`,
                  borderRadius: 999,
                  padding: "4px 16px",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: AIP_C.cyan,
                    boxShadow: `0 0 10px ${AIP_C.cyan}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: AIP_MONO,
                    fontSize: 14,
                    color: AIP_C.cyan,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                  }}
                >
                  THE DRIVING FORCE
                </span>
              </div>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 34,
                  fontWeight: 900,
                  color: AIP_C.text,
                  lineHeight: 1.2,
                  letterSpacing: -0.5,
                }}
              >
                Artificial Intelligence &{" "}
                <span
                  style={{
                    background: `linear-gradient(90deg, ${AIP_C.cyan}, ${AIP_C.purple})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AI Engineering
                </span>
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: AIP_C.textMuted,
                  lineHeight: 1.4,
                  marginTop: 6,
                }}
              >
                Transforming foundational models into scalable, production-ready intelligent software.
              </div>
            </div>

            {/* 3D Isometric Animated Neural Core */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 380,
                width: "100%",
                transform: "scale(0.88)",
              }}
            >
              <NeuralNetwork3D scale={0.95} active={true} />
            </div>
          </div>
        </div>
      </AipSceneShell>
    );
  }

  return (
    <AipSceneShell
      id="scene1"
      showSubtitles={showSubtitles}
      showHud={showHud}
      cameraStyle={{
        transform: `scale(${camScale}) translateY(${camY}px)`,
        transformOrigin: "center center",
      }}
      sfx={[
        { atSec: AIP_LEAD_SEC + 0.3, type: "pop", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 1.6, type: "pop", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 3.0, type: "pop", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 5.75, type: "chime", volume: 0.35 },
      ]}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* Top 3 Core Pillars: Intelligent, Faster, Personalized */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 50,
            width: "100%",
            maxWidth: 3200,
            zIndex: 10,
          }}
        >
          {/* Pillar 1: Intelligent */}
          <div
            style={{
              flex: 1,
              background:
                "linear-gradient(135deg, rgba(8, 16, 46, 0.9) 0%, rgba(18, 12, 48, 0.9) 100%)",
              border: `2px solid ${
                activeBeat1 ? AIP_C.cyan : AIP_C.panelBorderCyan
              }`,
              borderRadius: 30,
              padding: "44px 50px",
              boxShadow: activeBeat1
                ? `0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 229, 255, 0.25)`
                : `0 16px 40px rgba(0, 0, 0, 0.5)`,
              transform: `scale(${interpolate(pillar1Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(pillar1Pop, [0, 1], [40, 0])}px)`,
              opacity: pillar1Pop,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, transparent, ${AIP_C.cyan}, transparent)`,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 22,
                  color: AIP_C.cyan,
                  letterSpacing: 2,
                  fontWeight: 700,
                }}
              >
                01 · CAPABILITY
              </div>
              <div
                style={{
                  background: "rgba(0, 229, 255, 0.15)",
                  border: `1px solid ${AIP_C.cyan}`,
                  borderRadius: 8,
                  padding: "4px 14px",
                  fontFamily: AIP_MONO,
                  fontSize: 18,
                  color: AIP_C.cyan,
                  fontWeight: 700,
                }}
              >
                ACTIVE
              </div>
            </div>

            <div
              style={{
                fontFamily: AIP_DISPLAY,
                fontSize: 56,
                fontWeight: 800,
                color: AIP_C.text,
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Intelligent
            </div>
            <div style={{ fontSize: 26, color: AIP_C.textMuted, lineHeight: 1.4 }}>
              Adaptive Neural Reasoning & Predictive Model Inference
            </div>

            {/* Metric pill row */}
            <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
              <div
                style={{
                  background: "rgba(6, 11, 30, 0.8)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 14,
                  padding: "12px 20px",
                  flex: 1,
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim }}>ACCURACY</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 32, fontWeight: 700, color: AIP_C.cyan }}>99.4%</div>
              </div>
              <div
                style={{
                  background: "rgba(6, 11, 30, 0.8)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 14,
                  padding: "12px 20px",
                  flex: 1,
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim }}>PARAMETERS</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 32, fontWeight: 700, color: AIP_C.purple }}>175 Billion</div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Faster */}
          <div
            style={{
              flex: 1,
              background:
                "linear-gradient(135deg, rgba(8, 16, 46, 0.9) 0%, rgba(18, 12, 48, 0.9) 100%)",
              border: `2px solid ${
                activeBeat1 ? AIP_C.purple : AIP_C.panelBorderPurple
              }`,
              borderRadius: 30,
              padding: "44px 50px",
              boxShadow: activeBeat1
                ? `0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(168, 85, 247, 0.25)`
                : `0 16px 40px rgba(0, 0, 0, 0.5)`,
              transform: `scale(${interpolate(pillar2Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(pillar2Pop, [0, 1], [40, 0])}px)`,
              opacity: pillar2Pop,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, transparent, ${AIP_C.purple}, transparent)`,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 22,
                  color: AIP_C.purple,
                  letterSpacing: 2,
                  fontWeight: 700,
                }}
              >
                02 · PERFORMANCE
              </div>
              <div
                style={{
                  background: "rgba(168, 85, 247, 0.15)",
                  border: `1px solid ${AIP_C.purple}`,
                  borderRadius: 8,
                  padding: "4px 14px",
                  fontFamily: AIP_MONO,
                  fontSize: 18,
                  color: AIP_C.purple,
                  fontWeight: 700,
                }}
              >
                OPTIMIZED
              </div>
            </div>

            <div
              style={{
                fontFamily: AIP_DISPLAY,
                fontSize: 56,
                fontWeight: 800,
                color: AIP_C.text,
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Faster
            </div>
            <div style={{ fontSize: 26, color: AIP_C.textMuted, lineHeight: 1.4 }}>
              Sub-Millisecond Inference & Real-time Edge Acceleration
            </div>

            {/* Metric pill row */}
            <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
              <div
                style={{
                  background: "rgba(6, 11, 30, 0.8)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 14,
                  padding: "12px 20px",
                  flex: 1,
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim }}>LATENCY</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 32, fontWeight: 700, color: AIP_C.cyan }}>12ms (-76%)</div>
              </div>
              <div
                style={{
                  background: "rgba(6, 11, 30, 0.8)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 14,
                  padding: "12px 20px",
                  flex: 1,
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim }}>THROUGHPUT</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 32, fontWeight: 700, color: AIP_C.purple }}>120k req/s</div>
              </div>
            </div>
          </div>

          {/* Pillar 3: Personalized */}
          <div
            style={{
              flex: 1,
              background:
                "linear-gradient(135deg, rgba(8, 16, 46, 0.9) 0%, rgba(18, 12, 48, 0.9) 100%)",
              border: `2px solid ${
                activeBeat1 ? AIP_C.cyanSoft : AIP_C.panelBorderCyan
              }`,
              borderRadius: 30,
              padding: "44px 50px",
              boxShadow: activeBeat1
                ? `0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56, 189, 248, 0.25)`
                : `0 16px 40px rgba(0, 0, 0, 0.5)`,
              transform: `scale(${interpolate(pillar3Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(pillar3Pop, [0, 1], [40, 0])}px)`,
              opacity: pillar3Pop,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, transparent, ${AIP_C.cyanSoft}, transparent)`,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 22,
                  color: AIP_C.cyanSoft,
                  letterSpacing: 2,
                  fontWeight: 700,
                }}
              >
                03 · EXPERIENCE
              </div>
              <div
                style={{
                  background: "rgba(56, 189, 248, 0.15)",
                  border: `1px solid ${AIP_C.cyanSoft}`,
                  borderRadius: 8,
                  padding: "4px 14px",
                  fontFamily: AIP_MONO,
                  fontSize: 18,
                  color: AIP_C.cyanSoft,
                  fontWeight: 700,
                }}
              >
                DYNAMIC
              </div>
            </div>

            <div
              style={{
                fontFamily: AIP_DISPLAY,
                fontSize: 56,
                fontWeight: 800,
                color: AIP_C.text,
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Personalized
            </div>
            <div style={{ fontSize: 26, color: AIP_C.textMuted, lineHeight: 1.4 }}>
              Contextual Vector Embeddings & Tailored User Journeys
            </div>

            {/* Metric pill row */}
            <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
              <div
                style={{
                  background: "rgba(6, 11, 30, 0.8)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 14,
                  padding: "12px 20px",
                  flex: 1,
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim }}>ENGAGEMENT</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 32, fontWeight: 700, color: AIP_C.cyanSoft }}>+84%</div>
              </div>
              <div
                style={{
                  background: "rgba(6, 11, 30, 0.8)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 14,
                  padding: "12px 20px",
                  flex: 1,
                }}
              >
                <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim }}>SIMILARITY</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 32, fontWeight: 700, color: AIP_C.purple }}>Cosine 0.98</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: 3D Isometric Neural Nexus & AI Engineering Engine */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 3200,
            height: 640,
            background:
              "linear-gradient(180deg, rgba(7, 14, 38, 0.85) 0%, rgba(12, 18, 52, 0.95) 100%)",
            border: `2px solid ${AIP_C.panelBorderCyan}`,
            borderRadius: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 80px",
            boxShadow:
              "0 30px 80px rgba(0, 0, 0, 0.75), 0 0 60px rgba(0, 229, 255, 0.15)",
            transform: `scale(${interpolate(engineReveal, [0, 1], [0.96, 1])}) translateY(${interpolate(engineReveal, [0, 1], [30, 0])}px)`,
            opacity: engineReveal,
          }}
        >
          {/* Left: Engineering Hero Typography */}
          <div style={{ maxWidth: 1400 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                background: "rgba(0, 229, 255, 0.12)",
                border: `1px solid ${AIP_C.cyan}`,
                borderRadius: 999,
                padding: "8px 24px",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: AIP_C.cyan,
                  boxShadow: `0 0 12px ${AIP_C.cyan}`,
                }}
              />
              <span
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 22,
                  color: AIP_C.cyan,
                  fontWeight: 700,
                  letterSpacing: 2,
                }}
              >
                THE DRIVING FORCE
              </span>
            </div>

            <div
              style={{
                fontFamily: AIP_DISPLAY,
                fontSize: 68,
                fontWeight: 900,
                color: AIP_C.text,
                lineHeight: 1.15,
                letterSpacing: -1,
              }}
            >
              Artificial Intelligence &{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${AIP_C.cyan}, ${AIP_C.purple})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AI Engineering
              </span>
            </div>

            <div
              style={{
                fontSize: 30,
                color: AIP_C.textMuted,
                lineHeight: 1.5,
                marginTop: 20,
                maxWidth: 1200,
              }}
            >
              Bridging cutting-edge foundational models into robust, resilient,
              and scalable production software architectures.
            </div>
          </div>

          {/* Right: 3D Isometric Animated Neural Core */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "scale(1.2)",
            }}
          >
            <NeuralNetwork3D scale={1.3} active={true} />
          </div>
        </div>
      </div>
    </AipSceneShell>
  );
};
