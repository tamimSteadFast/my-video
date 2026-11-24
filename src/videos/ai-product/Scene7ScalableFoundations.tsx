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

export const Scene7ScalableFoundations: React.FC<{
  readonly showSubtitles?: boolean;
  readonly showHud?: boolean;
}> = ({ showSubtitles = true, showHud = true }) => {
  const { frame, fps, voiceSec, totalVoiceSec } = useAipVoice("scene7");
  const P = useP();

  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.98, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camY = interpolate(voiceSec, [0, totalVoiceSec], [12, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heroPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 0.1) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const foundation1Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 7.5) * fps),
    fps,
    config: SPRING_UI,
  });

  const foundation2Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 8.8) * fps),
    fps,
    config: SPRING_UI,
  });

  const foundation3Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 10.2) * fps),
    fps,
    config: SPRING_UI,
  });

  const isFoundationsActive = voiceSec >= 7.5;

  if (P) {
    return (
      <AipSceneShell
        id="scene7"
        showSubtitles={showSubtitles}
        showHud={showHud}
        cameraStyle={{
          transform: `scale(${camScale})`,
          transformOrigin: "center center",
        }}
        sfx={[
          { atSec: AIP_LEAD_SEC + 0.1, type: "whoosh", volume: 0.22 },
          { atSec: AIP_LEAD_SEC + 7.5, type: "pop", volume: 0.28 },
          { atSec: AIP_LEAD_SEC + 8.8, type: "pop", volume: 0.28 },
          { atSec: AIP_LEAD_SEC + 10.2, type: "chime", volume: 0.35 },
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
          {/* Hero Section */}
          <div
            style={{
              textAlign: "center",
              transform: `scale(${interpolate(heroPop, [0, 1], [0.95, 1])})`,
              opacity: heroPop,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0, 229, 255, 0.14)",
                border: `1.5px solid ${AIP_C.cyan}`,
                borderRadius: 999,
                padding: "4px 18px",
                fontFamily: AIP_MONO,
                fontSize: 13,
                color: AIP_C.cyan,
                fontWeight: 700,
                letterSpacing: 1.5,
                marginBottom: 8,
              }}
            >
              THE THREE IMPERATIVES
            </div>
            <div
              style={{
                fontFamily: AIP_DISPLAY,
                fontSize: 34,
                fontWeight: 900,
                color: AIP_C.text,
                letterSpacing: -0.5,
              }}
            >
              Engineering Foundations
            </div>
            <div
              style={{
                fontSize: 15,
                color: AIP_C.textMuted,
                marginTop: 4,
              }}
            >
              Fast development cycles, continuous innovation & superior quality.
            </div>
          </div>

          {/* 3 Foundation Pillars Stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Foundation 1: Proper Architecture */}
            <div
              style={{
                background: "rgba(8, 16, 44, 0.92)",
                border: `1.5px solid ${isFoundationsActive ? AIP_C.cyan : AIP_C.panelBorderCyan}`,
                borderRadius: 20,
                padding: "18px 22px",
                boxShadow: isFoundationsActive
                  ? "0 12px 30px rgba(0, 0, 0, 0.75), 0 0 30px rgba(0, 229, 255, 0.2)"
                  : "0 10px 25px rgba(0, 0, 0, 0.5)",
                transform: `scale(${interpolate(foundation1Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(foundation1Pop, [0, 1], [20, 0])}px)`,
                opacity: foundation1Pop,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: AIP_MONO, fontSize: 13, color: AIP_C.cyan, fontWeight: 700 }}>
                  FOUNDATION 01 · SYSTEM
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
                  }}
                >
                  ARCHITECTURE
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div>
                  <div style={{ fontFamily: AIP_DISPLAY, fontSize: 24, fontWeight: 800, color: AIP_C.text }}>
                    Proper Architecture
                  </div>
                  <div style={{ fontSize: 14, color: AIP_C.textMuted, marginTop: 2 }}>
                    Modular microservices, vector DBs & resilient model serving pipelines.
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(4, 9, 26, 0.8)",
                    border: `1px solid ${AIP_C.borderSubtle}`,
                    borderRadius: 10,
                    padding: "6px 14px",
                    textAlign: "right",
                    minWidth: 100,
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 10, color: AIP_C.textDim }}>THROUGHPUT</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 18, fontWeight: 700, color: AIP_C.cyan }}>120k req/s</div>
                </div>
              </div>
            </div>

            {/* Foundation 2: Reliable Data */}
            <div
              style={{
                background: "rgba(8, 16, 44, 0.92)",
                border: `1.5px solid ${isFoundationsActive ? AIP_C.purple : AIP_C.panelBorderPurple}`,
                borderRadius: 20,
                padding: "18px 22px",
                boxShadow: isFoundationsActive
                  ? "0 12px 30px rgba(0, 0, 0, 0.75), 0 0 30px rgba(168, 85, 247, 0.2)"
                  : "0 10px 25px rgba(0, 0, 0, 0.5)",
                transform: `scale(${interpolate(foundation2Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(foundation2Pop, [0, 1], [20, 0])}px)`,
                opacity: foundation2Pop,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: AIP_MONO, fontSize: 13, color: AIP_C.purple, fontWeight: 700 }}>
                  FOUNDATION 02 · PIPELINE
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
                  }}
                >
                  RELIABILITY
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div>
                  <div style={{ fontFamily: AIP_DISPLAY, fontSize: 24, fontWeight: 800, color: AIP_C.text }}>
                    Reliable Data
                  </div>
                  <div style={{ fontSize: 14, color: AIP_C.textMuted, marginTop: 2 }}>
                    Continuous curation, automated verification & zero-drift enforcement.
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(4, 9, 26, 0.8)",
                    border: `1px solid ${AIP_C.borderSubtle}`,
                    borderRadius: 10,
                    padding: "6px 14px",
                    textAlign: "right",
                    minWidth: 100,
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 10, color: AIP_C.textDim }}>DATA PURITY</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 18, fontWeight: 700, color: AIP_C.purple }}>99.9%</div>
                </div>
              </div>
            </div>

            {/* Foundation 3: Proper Evaluation */}
            <div
              style={{
                background: "rgba(8, 16, 44, 0.92)",
                border: `1.5px solid ${isFoundationsActive ? AIP_C.cyanSoft : AIP_C.panelBorderCyan}`,
                borderRadius: 20,
                padding: "18px 22px",
                boxShadow: isFoundationsActive
                  ? "0 12px 30px rgba(0, 0, 0, 0.75), 0 0 30px rgba(56, 189, 248, 0.2)"
                  : "0 10px 25px rgba(0, 0, 0, 0.5)",
                transform: `scale(${interpolate(foundation3Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(foundation3Pop, [0, 1], [20, 0])}px)`,
                opacity: foundation3Pop,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: AIP_MONO, fontSize: 13, color: AIP_C.cyanSoft, fontWeight: 700 }}>
                  FOUNDATION 03 · RIGOR
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
                  }}
                >
                  EVALUATION
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div>
                  <div style={{ fontFamily: AIP_DISPLAY, fontSize: 24, fontWeight: 800, color: AIP_C.text }}>
                    Proper Evaluation
                  </div>
                  <div style={{ fontSize: 14, color: AIP_C.textMuted, marginTop: 2 }}>
                    Automated benchmarking, hallucination guardrails & regression testing.
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(4, 9, 26, 0.8)",
                    border: `1px solid ${AIP_C.borderSubtle}`,
                    borderRadius: 10,
                    padding: "6px 14px",
                    textAlign: "right",
                    minWidth: 100,
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 10, color: AIP_C.textDim }}>GUARDRAILS</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 18, fontWeight: 700, color: AIP_C.cyanSoft }}>100% PASS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Architectural Summary */}
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(8, 16, 44, 0.94) 0%, rgba(18, 14, 52, 0.94) 100%)",
              border: `2px solid ${AIP_C.panelBorderCyan}`,
              borderRadius: 20,
              padding: "16px 22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 229, 255, 0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: AIP_C.cyan,
                  boxShadow: `0 0 12px ${AIP_C.cyan}`,
                }}
              />
              <span style={{ fontFamily: AIP_DISPLAY, fontSize: 18, fontWeight: 800, color: AIP_C.text }}>
                Production-Ready AI Pipeline
              </span>
            </div>
            <div style={{ fontFamily: AIP_MONO, fontSize: 13, color: AIP_C.cyan, fontWeight: 700 }}>
              ARCHITECTURE + DATA + EVAL
            </div>
          </div>
        </div>
      </AipSceneShell>
    );
  }

  return (
    <AipSceneShell
      id="scene7"
      showSubtitles={showSubtitles}
      showHud={showHud}
      cameraStyle={{
        transform: `scale(${camScale}) translateY(${camY}px)`,
        transformOrigin: "center center",
      }}
      sfx={[
        { atSec: AIP_LEAD_SEC + 0.1, type: "whoosh", volume: 0.22 },
        { atSec: AIP_LEAD_SEC + 7.5, type: "pop", volume: 0.28 },
        { atSec: AIP_LEAD_SEC + 8.8, type: "pop", volume: 0.28 },
        { atSec: AIP_LEAD_SEC + 10.2, type: "chime", volume: 0.35 },
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
          gap: 50,
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 2600,
            transform: `scale(${interpolate(heroPop, [0, 1], [0.95, 1])})`,
            opacity: heroPop,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(0, 229, 255, 0.14)",
              border: `1.5px solid ${AIP_C.cyan}`,
              borderRadius: 999,
              padding: "8px 26px",
              fontFamily: AIP_MONO,
              fontSize: 22,
              color: AIP_C.cyan,
              fontWeight: 700,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            THE THREE IMPERATIVES
          </div>
          <div
            style={{
              fontFamily: AIP_DISPLAY,
              fontSize: 64,
              fontWeight: 900,
              color: AIP_C.text,
              letterSpacing: -1,
            }}
          >
            Accelerating Velocity & Quality
          </div>
          <div
            style={{
              fontSize: 28,
              color: AIP_C.textMuted,
              marginTop: 12,
              lineHeight: 1.4,
            }}
          >
            Sustained competitive advantage requires bulletproof engineering rigor beneath the model layer.
          </div>
        </div>

        {/* 3 Pillars of AI Engineering Success */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 40,
            width: "100%",
            maxWidth: 3400,
          }}
        >
          {/* Foundation 1: Proper Architecture */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.92)",
              border: `2px solid ${
                isFoundationsActive ? AIP_C.cyan : AIP_C.panelBorderCyan
              }`,
              borderRadius: 36,
              padding: "48px",
              boxShadow: isFoundationsActive
                ? `0 24px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 229, 255, 0.2)`
                : "0 16px 40px rgba(0, 0, 0, 0.5)",
              transform: `scale(${interpolate(foundation1Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(foundation1Pop, [0, 1], [30, 0])}px)`,
              opacity: foundation1Pop,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 20,
                  color: AIP_C.cyan,
                  fontWeight: 700,
                }}
              >
                FOUNDATION 01
              </div>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 44,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 18,
                }}
              >
                Proper Architecture
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: AIP_C.textMuted,
                  marginTop: 10,
                  lineHeight: 1.45,
                }}
              >
                Modular microservices, high-throughput vector storage, and resilient model serving infrastructure.
              </div>
            </div>

            <div
              style={{
                background: "rgba(4, 9, 26, 0.8)",
                border: `1px solid ${AIP_C.borderSubtle}`,
                borderRadius: 18,
                padding: "24px",
                marginTop: 32,
              }}
            >
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.cyan }}>
                ● High-Throughput Model Serving
              </div>
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim, marginTop: 6 }}>
                &gt; Distributed Vector DB
              </div>
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim, marginTop: 6 }}>
                &gt; Fallback & Cache Layer
              </div>
            </div>
          </div>

          {/* Foundation 2: Reliable Data */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.92)",
              border: `2px solid ${
                isFoundationsActive ? AIP_C.purple : AIP_C.panelBorderPurple
              }`,
              borderRadius: 36,
              padding: "48px",
              boxShadow: isFoundationsActive
                ? `0 24px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(168, 85, 247, 0.2)`
                : "0 16px 40px rgba(0, 0, 0, 0.5)",
              transform: `scale(${interpolate(foundation2Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(foundation2Pop, [0, 1], [30, 0])}px)`,
              opacity: foundation2Pop,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 20,
                  color: AIP_C.purple,
                  fontWeight: 700,
                }}
              >
                FOUNDATION 02
              </div>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 44,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 18,
                }}
              >
                Reliable Data
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: AIP_C.textMuted,
                  marginTop: 10,
                  lineHeight: 1.45,
                }}
              >
                Continuous data curation, automated provenance validation, and real-time schema enforcement.
              </div>
            </div>

            <div
              style={{
                background: "rgba(4, 9, 26, 0.8)",
                border: `1px solid ${AIP_C.borderSubtle}`,
                borderRadius: 18,
                padding: "24px",
                marginTop: 32,
              }}
            >
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.purple }}>
                ● Real-Time Data Pipeline
              </div>
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim, marginTop: 6 }}>
                &gt; Ground Truth Verification
              </div>
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim, marginTop: 6 }}>
                &gt; Zero Drift Drift Detection
              </div>
            </div>
          </div>

          {/* Foundation 3: Proper Evaluation */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.92)",
              border: `2px solid ${
                isFoundationsActive ? AIP_C.cyanSoft : AIP_C.panelBorderCyan
              }`,
              borderRadius: 36,
              padding: "48px",
              boxShadow: isFoundationsActive
                ? `0 24px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(56, 189, 248, 0.2)`
                : "0 16px 40px rgba(0, 0, 0, 0.5)",
              transform: `scale(${interpolate(foundation3Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(foundation3Pop, [0, 1], [30, 0])}px)`,
              opacity: foundation3Pop,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 20,
                  color: AIP_C.cyanSoft,
                  fontWeight: 700,
                }}
              >
                FOUNDATION 03
              </div>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 44,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 18,
                }}
              >
                Proper Evaluation
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: AIP_C.textMuted,
                  marginTop: 10,
                  lineHeight: 1.45,
                }}
              >
                Rigorous automated benchmarking, hallucination guardrails, and behavioral safety telemetry.
              </div>
            </div>

            <div
              style={{
                background: "rgba(4, 9, 26, 0.8)",
                border: `1px solid ${AIP_C.borderSubtle}`,
                borderRadius: 18,
                padding: "24px",
                marginTop: 32,
              }}
            >
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.cyanSoft }}>
                ● Automated Eval Test Harness
              </div>
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim, marginTop: 6 }}>
                &gt; Hallucination Guardrails
              </div>
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim, marginTop: 6 }}>
                &gt; Continuous A/B Regression
              </div>
            </div>
          </div>
        </div>
      </div>
    </AipSceneShell>
  );
};
