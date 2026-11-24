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

export const Scene3AutomationLifecycle: React.FC<{
  readonly showSubtitles?: boolean;
  readonly showHud?: boolean;
}> = ({ showSubtitles = true, showHud = true }) => {
  const { frame, fps, voiceSec, totalVoiceSec } = useAipVoice("scene3");
  const P = useP();

  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.98, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camY = interpolate(voiceSec, [0, totalVoiceSec], [10, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Entrance springs
  const heroPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 0.1) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const card1Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 3.8) * fps),
    fps,
    config: SPRING_UI,
  });

  const card2Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 5.6) * fps),
    fps,
    config: SPRING_UI,
  });

  const card3Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 7.4) * fps),
    fps,
    config: SPRING_UI,
  });

  const bottomPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 9.2) * fps),
    fps,
    config: SPRING_UI,
  });

  if (P) {
    return (
      <AipSceneShell
        id="scene3"
        showSubtitles={showSubtitles}
        showHud={showHud}
        cameraStyle={{
          transform: `scale(${camScale})`,
          transformOrigin: "center center",
        }}
        sfx={[
          { atSec: AIP_LEAD_SEC + 0.1, type: "whoosh", volume: 0.22 },
          { atSec: AIP_LEAD_SEC + 3.8, type: "pop", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 5.6, type: "pop", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 7.4, type: "pop", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 9.2, type: "chime", volume: 0.3 },
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
          {/* Hero Section Banner */}
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
                background: "rgba(0, 229, 255, 0.12)",
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
              PILLAR 01 · SYSTEMIC EFFICIENCY
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
              End-to-End Development Automation
            </div>
            <div
              style={{
                fontSize: 15,
                color: AIP_C.textMuted,
                marginTop: 4,
              }}
            >
              Eliminating manual bottlenecks to accelerate engineering velocity.
            </div>
          </div>

          {/* 3 Core Automation Stations Stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Station 1: Customer Support */}
            <div
              style={{
                background: "rgba(8, 16, 44, 0.92)",
                border: `1.5px solid ${AIP_C.panelBorderCyan}`,
                borderRadius: 20,
                padding: "16px 22px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.65), 0 0 25px rgba(0, 229, 255, 0.1)",
                transform: `scale(${interpolate(card1Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(card1Pop, [0, 1], [20, 0])}px)`,
                opacity: card1Pop,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: AIP_MONO, fontSize: 13, color: AIP_C.cyan, fontWeight: 700 }}>
                    STATION 01
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
                    AUTONOMOUS
                  </span>
                </div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 12, color: AIP_C.emerald }}>✔ 0.42s SLA</div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div>
                  <div style={{ fontFamily: AIP_DISPLAY, fontSize: 24, fontWeight: 800, color: AIP_C.text }}>
                    Customer Support
                  </div>
                  <div style={{ fontSize: 14, color: AIP_C.textMuted, marginTop: 2 }}>
                    AI agents resolve inquiries instantly via context-aware RAG pipelines.
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(4, 9, 26, 0.8)",
                    border: `1px solid ${AIP_C.borderSubtle}`,
                    borderRadius: 10,
                    padding: "6px 14px",
                    textAlign: "right",
                    minWidth: 90,
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 10, color: AIP_C.textDim }}>RESOLUTION</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 18, fontWeight: 700, color: AIP_C.cyan }}>94.6%</div>
                </div>
              </div>
            </div>

            {/* Station 2: Data Processing */}
            <div
              style={{
                background: "rgba(8, 16, 44, 0.92)",
                border: `1.5px solid ${AIP_C.panelBorderPurple}`,
                borderRadius: 20,
                padding: "16px 22px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.65), 0 0 25px rgba(168, 85, 247, 0.1)",
                transform: `scale(${interpolate(card2Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(card2Pop, [0, 1], [20, 0])}px)`,
                opacity: card2Pop,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: AIP_MONO, fontSize: 13, color: AIP_C.purple, fontWeight: 700 }}>
                    STATION 02
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
                    STREAMING ETL
                  </span>
                </div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 12, color: AIP_C.cyan }}>✔ 2.4 GB/s</div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div>
                  <div style={{ fontFamily: AIP_DISPLAY, fontSize: 24, fontWeight: 800, color: AIP_C.text }}>
                    Data Processing
                  </div>
                  <div style={{ fontSize: 14, color: AIP_C.textMuted, marginTop: 2 }}>
                    Unstructured ingestion, automated cleaning, embeddings & indexing.
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(4, 9, 26, 0.8)",
                    border: `1px solid ${AIP_C.borderSubtle}`,
                    borderRadius: 10,
                    padding: "6px 14px",
                    textAlign: "right",
                    minWidth: 90,
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 10, color: AIP_C.textDim }}>EMBEDDINGS</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 18, fontWeight: 700, color: AIP_C.purple }}>1536d</div>
                </div>
              </div>
            </div>

            {/* Station 3: Software Testing */}
            <div
              style={{
                background: "rgba(8, 16, 44, 0.92)",
                border: `1.5px solid ${AIP_C.panelBorderCyan}`,
                borderRadius: 20,
                padding: "16px 22px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.65), 0 0 25px rgba(0, 229, 255, 0.1)",
                transform: `scale(${interpolate(card3Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(card3Pop, [0, 1], [20, 0])}px)`,
                opacity: card3Pop,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: AIP_MONO, fontSize: 13, color: AIP_C.emerald, fontWeight: 700 }}>
                    STATION 03
                  </span>
                  <span
                    style={{
                      background: "rgba(16, 185, 129, 0.15)",
                      border: `1px solid ${AIP_C.emerald}`,
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontFamily: AIP_MONO,
                      fontSize: 11,
                      color: AIP_C.emerald,
                    }}
                  >
                    CI/CD AGENTS
                  </span>
                </div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 12, color: AIP_C.emerald }}>✔ 4,820 Tests Passed</div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div>
                  <div style={{ fontFamily: AIP_DISPLAY, fontSize: 24, fontWeight: 800, color: AIP_C.text }}>
                    Software Testing
                  </div>
                  <div style={{ fontSize: 14, color: AIP_C.textMuted, marginTop: 2 }}>
                    Autonomous test generation, edge case fuzzing & continuous QA checks.
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(4, 9, 26, 0.8)",
                    border: `1px solid ${AIP_C.borderSubtle}`,
                    borderRadius: 10,
                    padding: "6px 14px",
                    textAlign: "right",
                    minWidth: 90,
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 10, color: AIP_C.textDim }}>COVERAGE</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 18, fontWeight: 700, color: AIP_C.emerald }}>99.8%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Efficiency Acceleration Banner */}
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(8, 16, 44, 0.94) 0%, rgba(18, 14, 52, 0.94) 100%)",
              border: `2px solid ${AIP_C.panelBorderPurple}`,
              borderRadius: 22,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6), 0 0 35px rgba(168, 85, 247, 0.15)",
              transform: `scale(${interpolate(bottomPop, [0, 1], [0.96, 1])}) translateY(${interpolate(bottomPop, [0, 1], [15, 0])}px)`,
              opacity: bottomPop,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "rgba(0, 229, 255, 0.15)",
                  border: `1.5px solid ${AIP_C.cyan}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 16px rgba(0, 229, 255, 0.3)`,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    stroke={AIP_C.cyan}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: AIP_DISPLAY, fontSize: 20, fontWeight: 800, color: AIP_C.text }}>
                  Velocity Multiplier
                </div>
                <div style={{ fontSize: 13, color: AIP_C.textDim }}>
                  Accelerating product lifecycle
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.textDim }}>VELOCITY</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 26, fontWeight: 800, color: AIP_C.cyan }}>+340%</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.textDim }}>OVERHEAD</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 26, fontWeight: 800, color: AIP_C.purple }}>-82%</div>
              </div>
            </div>
          </div>
        </div>
      </AipSceneShell>
    );
  }

  return (
    <AipSceneShell
      id="scene3"
      showSubtitles={showSubtitles}
      showHud={showHud}
      cameraStyle={{
        transform: `scale(${camScale}) translateY(${camY}px)`,
        transformOrigin: "center center",
      }}
      sfx={[
        { atSec: AIP_LEAD_SEC + 0.1, type: "whoosh", volume: 0.22 },
        { atSec: AIP_LEAD_SEC + 3.8, type: "pop", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 5.6, type: "pop", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 7.4, type: "pop", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 9.2, type: "chime", volume: 0.3 },
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
        {/* Hero Section Banner */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 2400,
            transform: `scale(${interpolate(heroPop, [0, 1], [0.95, 1])})`,
            opacity: heroPop,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(0, 229, 255, 0.12)",
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
            PILLAR 01 · SYSTEMIC EFFICIENCY
          </div>
          <div
            style={{
              fontFamily: AIP_DISPLAY,
              fontSize: 66,
              fontWeight: 900,
              color: AIP_C.text,
              letterSpacing: -1,
            }}
          >
            End-to-End Development Automation
          </div>
          <div
            style={{
              fontSize: 28,
              color: AIP_C.textMuted,
              marginTop: 12,
              lineHeight: 1.4,
            }}
          >
            Eliminating repetitive manual bottlenecks to accelerate production engineering.
          </div>
        </div>

        {/* 3 Core Automation Stations */}
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
          {/* Station 1: Customer Support Agents */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.9)",
              border: `2px solid ${AIP_C.panelBorderCyan}`,
              borderRadius: 32,
              padding: "44px 44px",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 229, 255, 0.12)",
              transform: `scale(${interpolate(card1Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(card1Pop, [0, 1], [30, 0])}px)`,
              opacity: card1Pop,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: AIP_MONO,
                    fontSize: 20,
                    color: AIP_C.cyan,
                    fontWeight: 700,
                  }}
                >
                  STATION 01
                </div>
                <div
                  style={{
                    background: "rgba(0, 229, 255, 0.15)",
                    border: `1px solid ${AIP_C.cyan}`,
                    borderRadius: 6,
                    padding: "4px 12px",
                    fontFamily: AIP_MONO,
                    fontSize: 16,
                    color: AIP_C.cyan,
                  }}
                >
                  24/7 AUTONOMOUS
                </div>
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
                Customer Support
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: AIP_C.textMuted,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                Conversational AI agents resolve user issues instantly with context-aware RAG pipelines.
              </div>
            </div>

            {/* Visual simulation card */}
            <div
              style={{
                background: "rgba(4, 9, 26, 0.8)",
                border: `1px solid ${AIP_C.borderSubtle}`,
                borderRadius: 18,
                padding: "24px 28px",
                marginTop: 28,
                fontFamily: AIP_MONO,
                fontSize: 20,
              }}
            >
              <div style={{ color: AIP_C.cyan, marginBottom: 8 }}>
                ● Agent Response: 0.42s
              </div>
              <div style={{ color: AIP_C.textDim }}>
                &gt; Resolution Rate: 94.6%
              </div>
              <div style={{ color: AIP_C.emerald, marginTop: 4 }}>
                &gt; Ticket Deflection: +78%
              </div>
            </div>
          </div>

          {/* Station 2: Data Processing & ETL */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.9)",
              border: `2px solid ${AIP_C.panelBorderPurple}`,
              borderRadius: 32,
              padding: "44px 44px",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(168, 85, 247, 0.12)",
              transform: `scale(${interpolate(card2Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(card2Pop, [0, 1], [30, 0])}px)`,
              opacity: card2Pop,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: AIP_MONO,
                    fontSize: 20,
                    color: AIP_C.purple,
                    fontWeight: 700,
                  }}
                >
                  STATION 02
                </div>
                <div
                  style={{
                    background: "rgba(168, 85, 247, 0.15)",
                    border: `1px solid ${AIP_C.purple}`,
                    borderRadius: 6,
                    padding: "4px 12px",
                    fontFamily: AIP_MONO,
                    fontSize: 16,
                    color: AIP_C.purple,
                  }}
                >
                  STREAMING ETL
                </div>
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
                Data Processing
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: AIP_C.textMuted,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                Massive unstructured data ingestion, automated cleaning, vector embedding, and indexing.
              </div>
            </div>

            {/* Visual simulation card */}
            <div
              style={{
                background: "rgba(4, 9, 26, 0.8)",
                border: `1px solid ${AIP_C.borderSubtle}`,
                borderRadius: 18,
                padding: "24px 28px",
                marginTop: 28,
                fontFamily: AIP_MONO,
                fontSize: 20,
              }}
            >
              <div style={{ color: AIP_C.purple, marginBottom: 8 }}>
                ● Ingestion: 2.4 GB/sec
              </div>
              <div style={{ color: AIP_C.textDim }}>
                &gt; Automated Schema Mapping: 100%
              </div>
              <div style={{ color: AIP_C.cyan, marginTop: 4 }}>
                &gt; Vector Dimension: 1536d
              </div>
            </div>
          </div>

          {/* Station 3: Software QA & Autonomous Testing */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.9)",
              border: `2px solid ${AIP_C.panelBorderCyan}`,
              borderRadius: 32,
              padding: "44px 44px",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 229, 255, 0.12)",
              transform: `scale(${interpolate(card3Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(card3Pop, [0, 1], [30, 0])}px)`,
              opacity: card3Pop,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: AIP_MONO,
                    fontSize: 20,
                    color: AIP_C.emerald,
                    fontWeight: 700,
                  }}
                >
                  STATION 03
                </div>
                <div
                  style={{
                    background: "rgba(16, 185, 129, 0.15)",
                    border: `1px solid ${AIP_C.emerald}`,
                    borderRadius: 6,
                    padding: "4px 12px",
                    fontFamily: AIP_MONO,
                    fontSize: 16,
                    color: AIP_C.emerald,
                  }}
                >
                  CI/CD AGENTS
                </div>
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
                Software Testing
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: AIP_C.textMuted,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                Autonomous test generation, edge case fuzzing, and regression validation without human overhead.
              </div>
            </div>

            {/* Visual simulation card */}
            <div
              style={{
                background: "rgba(4, 9, 26, 0.8)",
                border: `1px solid ${AIP_C.borderSubtle}`,
                borderRadius: 18,
                padding: "24px 28px",
                marginTop: 28,
                fontFamily: AIP_MONO,
                fontSize: 20,
              }}
            >
              <div style={{ color: AIP_C.emerald, marginBottom: 8 }}>
                ✔ 4,820 Automated Tests Passed
              </div>
              <div style={{ color: AIP_C.textDim }}>
                &gt; Edge Case Coverage: 99.8%
              </div>
              <div style={{ color: AIP_C.cyan, marginTop: 4 }}>
                &gt; Build Verification: Green
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Efficiency Acceleration Banner */}
        <div
          style={{
            width: "100%",
            maxWidth: 3400,
            background:
              "linear-gradient(90deg, rgba(8, 16, 44, 0.92) 0%, rgba(18, 14, 52, 0.92) 100%)",
            border: `2px solid ${AIP_C.panelBorderPurple}`,
            borderRadius: 24,
            padding: "28px 60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(168, 85, 247, 0.15)",
            transform: `scale(${interpolate(bottomPop, [0, 1], [0.96, 1])}) translateY(${interpolate(bottomPop, [0, 1], [20, 0])}px)`,
            opacity: bottomPop,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 20,
                background: "rgba(0, 229, 255, 0.15)",
                border: `2px solid ${AIP_C.cyan}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 24px rgba(0, 229, 255, 0.3)`,
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                  stroke={AIP_C.cyan}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: AIP_DISPLAY, fontSize: 36, fontWeight: 800, color: AIP_C.text }}>
                Development Velocity Multiplier
              </div>
              <div style={{ fontSize: 22, color: AIP_C.textDim }}>
                Shifting engineering talent from repetitive maintenance to strategic product innovation.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 50 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: AIP_MONO, fontSize: 20, color: AIP_C.textDim }}>VELOCITY GAIN</div>
              <div style={{ fontFamily: AIP_MONO, fontSize: 44, fontWeight: 800, color: AIP_C.cyan }}>+340%</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: AIP_MONO, fontSize: 20, color: AIP_C.textDim }}>REPETITIVE TASK OVERHEAD</div>
              <div style={{ fontFamily: AIP_MONO, fontSize: 44, fontWeight: 800, color: AIP_C.purple }}>-82%</div>
            </div>
          </div>
        </div>
      </div>
    </AipSceneShell>
  );
};
