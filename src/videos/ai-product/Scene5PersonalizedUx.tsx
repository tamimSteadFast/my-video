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

export const Scene5PersonalizedUx: React.FC<{
  readonly showSubtitles?: boolean;
  readonly showHud?: boolean;
}> = ({ showSubtitles = true, showHud = true }) => {
  const { frame, fps, voiceSec, totalVoiceSec } = useAipVoice("scene5");
  const P = useP();

  // Camera glide: Center -> Netflix Left -> E-Commerce Right
  const camX = interpolate(
    voiceSec,
    [0, 3.5, 4.0, 7.5, 8.0, totalVoiceSec],
    [0, 0, 40, 40, -40, -40],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.98, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heroPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 0.2) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const netflixPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 3.65) * fps),
    fps,
    config: SPRING_UI,
  });

  const ecommercePop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 7.6) * fps),
    fps,
    config: SPRING_UI,
  });

  const isNetflixActive = voiceSec >= 3.65 && voiceSec < 7.6;
  const isEcomActive = voiceSec >= 7.6;

  if (P) {
    return (
      <AipSceneShell
        id="scene5"
        showSubtitles={showSubtitles}
        showHud={showHud}
        cameraStyle={{
          transform: `scale(${camScale})`,
          transformOrigin: "center center",
        }}
        sfx={[
          { atSec: AIP_LEAD_SEC + 0.2, type: "whoosh", volume: 0.22 },
          { atSec: AIP_LEAD_SEC + 3.65, type: "pop", volume: 0.28 },
          { atSec: AIP_LEAD_SEC + 7.6, type: "pop", volume: 0.28 },
          { atSec: AIP_LEAD_SEC + 10.0, type: "chime", volume: 0.3 },
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
              PILLAR 03 · CONTEXTUAL ADAPTATION
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
              Hyper-Personalized UX
            </div>
            <div
              style={{
                fontSize: 15,
                color: AIP_C.textMuted,
                marginTop: 4,
              }}
            >
              Every interaction dynamically tailored to individual user intent and affinity.
            </div>
          </div>

          {/* Dual Platform Mockups Stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Mockup 1: Netflix Recommendation Engine */}
            <div
              style={{
                background: "rgba(8, 16, 44, 0.94)",
                border: `2px solid ${isNetflixActive ? AIP_C.cyan : AIP_C.panelBorderCyan}`,
                borderRadius: 22,
                padding: "20px 24px",
                boxShadow: isNetflixActive
                  ? "0 16px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 229, 255, 0.25)"
                  : "0 12px 30px rgba(0, 0, 0, 0.6)",
                transform: `scale(${interpolate(netflixPop, [0, 1], [0.94, 1])}) translateY(${interpolate(netflixPop, [0, 1], [20, 0])}px)`,
                opacity: netflixPop,
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
                  height: 3,
                  background: `linear-gradient(90deg, #E50914, ${AIP_C.cyan})`,
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: AIP_MONO,
                      fontSize: 12,
                      color: "#E50914",
                      fontWeight: 800,
                      letterSpacing: 1,
                    }}
                  >
                    NETFLIX AI
                  </span>
                  <span style={{ fontSize: 13, color: AIP_C.textDim }}>· History Synthesis</span>
                </div>
                <span
                  style={{
                    background: "rgba(0, 229, 255, 0.15)",
                    border: `1px solid ${AIP_C.cyan}`,
                    borderRadius: 6,
                    padding: "2px 8px",
                    fontFamily: AIP_MONO,
                    fontSize: 12,
                    color: AIP_C.cyan,
                    fontWeight: 700,
                  }}
                >
                  99% MATCH
                </span>
              </div>

              {/* Streaming UI card preview */}
              <div
                style={{
                  background: "rgba(4, 9, 26, 0.85)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 14,
                  padding: "14px 18px",
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.cyan }}>★ TOP RECOMMENDATION</div>
                  <div style={{ fontFamily: AIP_DISPLAY, fontSize: 20, fontWeight: 800, color: AIP_C.text, marginTop: 2 }}>
                    AI Engineering Frontiers
                  </div>
                  <div style={{ fontSize: 13, color: AIP_C.textMuted, marginTop: 2 }}>
                    Based on your viewing history of 34 Sci-Fi & Machine Learning titles
                  </div>
                </div>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: AIP_C.cyan,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 16px ${AIP_C.cyan}`,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mockup 2: E-Commerce Product Suggestion Engine */}
            <div
              style={{
                background: "rgba(8, 16, 44, 0.94)",
                border: `2px solid ${isEcomActive ? AIP_C.purple : AIP_C.panelBorderPurple}`,
                borderRadius: 22,
                padding: "20px 24px",
                boxShadow: isEcomActive
                  ? "0 16px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(168, 85, 247, 0.25)"
                  : "0 12px 30px rgba(0, 0, 0, 0.6)",
                transform: `scale(${interpolate(ecommercePop, [0, 1], [0.94, 1])}) translateY(${interpolate(ecommercePop, [0, 1], [20, 0])}px)`,
                opacity: ecommercePop,
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
                  height: 3,
                  background: `linear-gradient(90deg, ${AIP_C.purple}, ${AIP_C.cyan})`,
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: AIP_MONO,
                      fontSize: 12,
                      color: AIP_C.purple,
                      fontWeight: 800,
                      letterSpacing: 1,
                    }}
                  >
                    E-COMMERCE AI
                  </span>
                  <span style={{ fontSize: 13, color: AIP_C.textDim }}>· Dynamic Suggestion</span>
                </div>
                <span
                  style={{
                    background: "rgba(168, 85, 247, 0.15)",
                    border: `1px solid ${AIP_C.purple}`,
                    borderRadius: 6,
                    padding: "2px 8px",
                    fontFamily: AIP_MONO,
                    fontSize: 12,
                    color: AIP_C.purple,
                    fontWeight: 700,
                  }}
                >
                  HIGH INTENT
                </span>
              </div>

              {/* Product UI preview */}
              <div
                style={{
                  background: "rgba(4, 9, 26, 0.85)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 14,
                  padding: "14px 18px",
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.purple }}>RECOMMENDED FOR YOUR WORKFLOW</div>
                  <div style={{ fontFamily: AIP_DISPLAY, fontSize: 20, fontWeight: 800, color: AIP_C.text, marginTop: 2 }}>
                    Edge AI Developer Workstation
                  </div>
                  <div style={{ fontSize: 13, color: AIP_C.textMuted, marginTop: 2 }}>
                    Matching recent hardware searches · $1,299 (98.7% affinity)
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(168, 85, 247, 0.15)",
                    border: `1.5px solid ${AIP_C.purple}`,
                    borderRadius: 10,
                    padding: "8px 14px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.textDim }}>CONV RATE</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 16, fontWeight: 800, color: AIP_C.purple }}>+89.4%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Conversion Banner */}
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
                Real-Time Vector Embeddings
              </span>
            </div>
            <div style={{ fontFamily: AIP_MONO, fontSize: 14, color: AIP_C.cyan, fontWeight: 700 }}>
              AFFINITY: 98.7%
            </div>
          </div>
        </div>
      </AipSceneShell>
    );
  }

  return (
    <AipSceneShell
      id="scene5"
      showSubtitles={showSubtitles}
      showHud={showHud}
      cameraStyle={{
        transform: `scale(${camScale}) translateX(${camX}px)`,
        transformOrigin: "center center",
      }}
      sfx={[
        { atSec: AIP_LEAD_SEC + 0.2, type: "whoosh", volume: 0.22 },
        { atSec: AIP_LEAD_SEC + 3.65, type: "pop", volume: 0.28 },
        { atSec: AIP_LEAD_SEC + 7.6, type: "pop", volume: 0.28 },
        { atSec: AIP_LEAD_SEC + 10.0, type: "chime", volume: 0.3 },
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
          gap: 45,
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
            PILLAR 03 · CONTEXTUAL ADAPTATION
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
            Hyper-Personalized User Experiences
          </div>
          <div
            style={{
              fontSize: 28,
              color: AIP_C.textMuted,
              marginTop: 12,
              lineHeight: 1.4,
            }}
          >
            Every single interaction dynamically customizes the interface to the individual user’s mental model.
          </div>
        </div>

        {/* Dual Ecosystem Showcase */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 50,
            width: "100%",
            maxWidth: 3400,
          }}
        >
          {/* LEFT: Netflix Viewing History & Recommendation Engine */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.92)",
              border: `2px solid ${
                isNetflixActive ? AIP_C.cyan : AIP_C.panelBorderCyan
              }`,
              borderRadius: 36,
              padding: "48px 56px",
              boxShadow: isNetflixActive
                ? `0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 229, 255, 0.25)`
                : "0 20px 50px rgba(0, 0, 0, 0.6)",
              transform: `scale(${interpolate(netflixPop, [0, 1], [0.93, 1])}) translateY(${interpolate(netflixPop, [0, 1], [30, 0])}px)`,
              opacity: netflixPop,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
                background: `linear-gradient(90deg, #E50914, ${AIP_C.cyan})`,
              }}
            />

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
                  MEDIA STREAMING (e.g. NETFLIX)
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
                  99% MATCH
                </div>
              </div>

              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 48,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 18,
                }}
              >
                Viewing History Synthesis
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: AIP_C.textMuted,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                Deep collaborative filtering & multi-head embeddings match user preferences to catalog content in real time.
              </div>
            </div>

            {/* Interactive Recommendation Cards Mock */}
            <div style={{ display: "flex", gap: 20, marginTop: 32 }}>
              <div
                style={{
                  flex: 1,
                  background: "rgba(5, 10, 28, 0.9)",
                  border: `1px solid ${AIP_C.cyan}`,
                  borderRadius: 20,
                  padding: "24px",
                  boxShadow: "0 10px 30px rgba(0, 229, 255, 0.15)",
                }}
              >
                <div
                  style={{
                    height: 120,
                    background:
                      "linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(168, 85, 247, 0.2))",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <span style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.cyan }}>
                    ★ TOP PICK FOR YOU
                  </span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: AIP_C.text }}>
                  AI Engineering Frontiers
                </div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.cyan, marginTop: 6 }}>
                  99.2% Affinity Match
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  background: "rgba(5, 10, 28, 0.9)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 20,
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    height: 120,
                    background:
                      "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(56, 189, 248, 0.15))",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <span style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.purple }}>
                    TRENDING NOW
                  </span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: AIP_C.text }}>
                  Neural Systems 2026
                </div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.purple, marginTop: 6 }}>
                  96.8% Affinity Match
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: E-Commerce Product Suggestion Engine */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.92)",
              border: `2px solid ${
                isEcomActive ? AIP_C.purple : AIP_C.panelBorderPurple
              }`,
              borderRadius: 36,
              padding: "48px 56px",
              boxShadow: isEcomActive
                ? `0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(168, 85, 247, 0.25)`
                : "0 20px 50px rgba(0, 0, 0, 0.6)",
              transform: `scale(${interpolate(ecommercePop, [0, 1], [0.93, 1])}) translateY(${interpolate(ecommercePop, [0, 1], [30, 0])}px)`,
              opacity: ecommercePop,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
                background: `linear-gradient(90deg, ${AIP_C.purple}, ${AIP_C.cyan})`,
              }}
            />

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
                  E-COMMERCE DISCOVERY PLATFORM
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
                  REAL-TIME RANKING
                </div>
              </div>

              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 48,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 18,
                }}
              >
                Dynamic Product Suggestions
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: AIP_C.textMuted,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                Predicting user purchase intent based on browsing vectors, session context, and real-time behavioral graph.
              </div>
            </div>

            {/* Interactive Product Cards Mock */}
            <div style={{ display: "flex", gap: 20, marginTop: 32 }}>
              <div
                style={{
                  flex: 1,
                  background: "rgba(5, 10, 28, 0.9)",
                  border: `1px solid ${AIP_C.purple}`,
                  borderRadius: 20,
                  padding: "24px",
                  boxShadow: "0 10px 30px rgba(168, 85, 247, 0.15)",
                }}
              >
                <div
                  style={{
                    height: 120,
                    background:
                      "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(0, 229, 255, 0.2))",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <span style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.purple }}>
                    RECOMMENDED HARDWARE
                  </span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: AIP_C.text }}>
                  Neural Edge Accelerator Pro
                </div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.emerald, marginTop: 6 }}>
                  98.6% Purchase Propensity
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  background: "rgba(5, 10, 28, 0.9)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 20,
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    height: 120,
                    background:
                      "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(168, 85, 247, 0.15))",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <span style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.cyanSoft }}>
                    FREQUENTLY BUNDLED
                  </span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: AIP_C.text }}>
                  Vector Cloud Suite 2026
                </div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.cyanSoft, marginTop: 6 }}>
                  94.1% Affinity Match
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AipSceneShell>
  );
};
