import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { LLM_C, LLM_MONO } from "./narration";
import { LlmSceneShell, useLlmVoiceTime, useP } from "./LlmSceneShell";

const EMBED_ITEMS = [
  {
    token: "Large",
    id: 13842,
    color: "#00E5FF",
    dims: ["+0.42", "-0.18", "+0.89", "+0.11", "-0.64"],
  },
  {
    token: "Language",
    id: 11688,
    color: "#38BDF8",
    dims: ["+0.77", "+0.54", "-0.21", "+0.68", "+0.31"],
  },
  {
    token: "Models",
    id: 27915,
    color: "#6366F1",
    dims: ["-0.12", "+0.83", "+0.65", "-0.39", "+0.91"],
  },
  {
    token: "context",
    id: 2317,
    color: "#10B981",
    dims: ["+0.69", "+0.49", "-0.15", "+0.72", "+0.28"],
  },
] as const;

const SPACE_POINTS = [
  { label: "Language", x: 185, y: 120, color: "#38BDF8", cluster: "Semantic" },
  { label: "context", x: 265, y: 155, color: "#10B981", cluster: "Semantic" },
  { label: "meaning", x: 155, y: 205, color: "#38BDF8", cluster: "Semantic" },
  { label: "Models", x: 430, y: 275, color: "#6366F1", cluster: "Architecture" },
  { label: "Neural", x: 485, y: 215, color: "#00E5FF", cluster: "Architecture" },
  { label: "Large", x: 380, y: 345, color: "#00E5FF", cluster: "Scale" },
] as const;

export const Scene3Embeddings: React.FC = () => {
  const { fps } = useVideoConfig();
  const P = useP();
  const { frame, voiceSec, totalVoiceSec } = useLlmVoiceTime("scene3");

  // Camera: Smooth camera movement from token IDs toward vector visualization
  const camX = interpolate(voiceSec, [0, totalVoiceSec], [18, -18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.99, 1.035], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phrase 2 (3.9s - 6.65s): Numerical vectors morph and expand
  const vecReveal = spring({
    frame: frame - Math.round(3.4 * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  // Phrase 3 & 4 (6.65s - 13.8s): Neural Network Semantic Space & Pattern connections illuminate
  const spaceReveal = spring({
    frame: frame - Math.round(6.6 * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const patternGlow = interpolate(voiceSec, [9.8, 11.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <LlmSceneShell
      id="scene3"
      cameraStyle={{
        transform: `scale(${camScale}) translate3d(${camX}px, 0px, 0px)`,
      }}
      sfx={[
        { atSec: 0.5, type: "pop", volume: 0.22 },
        { atSec: 3.9, type: "whoosh", volume: 0.25 },
        { atSec: 6.7, type: "chime", volume: 0.24 },
        { atSec: 10.1, type: "click", volume: 0.22 },
      ]}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: P ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        {/* LEFT + CENTER: Token IDs -> Embedding Matrix -> Numerical Vector Representations */}
        <div
          style={{
            width: P ? "100%" : 1080,
            height: P ? 690 : 620,
            boxSizing: "border-box",
            background: "rgba(8, 16, 38, 0.88)",
            border: `1.5px solid ${LLM_C.border}`,
            borderRadius: 24,
            padding: "26px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 26px 68px rgba(0,0,0,0.65)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${LLM_C.borderSubtle}`,
              paddingBottom: 14,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: LLM_MONO,
                  fontSize: 13,
                  color: LLM_C.cyan,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                EMBEDDING LOOKUP &amp; VECTOR PROJECTION
              </div>
              <div
                style={{
                  fontSize: 25,
                  fontWeight: 800,
                  color: LLM_C.text,
                  marginTop: 2,
                }}
              >
                Token IDs → Multi-Dimensional Numerical Vectors
              </div>
            </div>
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 14,
                color: LLM_C.cyanSoft,
                background: "rgba(56, 189, 248, 0.12)",
                border: `1px solid rgba(56, 189, 248, 0.4)`,
                padding: "6px 14px",
                borderRadius: 8,
                fontWeight: 700,
              }}
            >
              ℝᵈ EMBEDDING SPACE
            </div>
          </div>

          {/* Rows: Token ID -> Morph Arrow -> Floating Numerical Vector Array */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              margin: "12px 0",
            }}
          >
            {EMBED_ITEMS.map((item, idx) => {
              const rowPop = spring({
                frame: frame - Math.round((0.4 + idx * 0.25) * fps),
                fps,
                config: SPRING_UI,
              });
              const rowVec = spring({
                frame: frame - Math.round((3.6 + idx * 0.3) * fps),
                fps,
                config: SPRING_UI,
              });

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(11, 22, 49, 0.78)",
                    border: `1px solid ${LLM_C.borderSubtle}`,
                    borderLeft: `5px solid ${item.color}`,
                    borderRadius: 16,
                    padding: "14px 20px",
                    opacity: rowPop,
                    transform: `translateX(${interpolate(rowPop, [0, 1], [-24, 0])}px)`,
                  }}
                >
                  {/* Token + ID Block */}
                  <div
                    style={{
                      width: P ? 225 : 245,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "rgba(4, 8, 20, 0.9)",
                      border: `1px solid ${item.color}88`,
                      borderRadius: 12,
                      padding: "10px 16px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: LLM_MONO,
                          fontSize: 11,
                          color: LLM_C.textMuted,
                        }}
                      >
                        TOKEN
                      </div>
                      <div
                        style={{
                          fontFamily: LLM_MONO,
                          fontSize: 20,
                          fontWeight: 700,
                          color: LLM_C.text,
                        }}
                      >
                        &quot;{item.token}&quot;
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontFamily: LLM_MONO,
                          fontSize: 11,
                          color: LLM_C.textMuted,
                        }}
                      >
                        ID
                      </div>
                      <div
                        style={{
                          fontFamily: LLM_MONO,
                          fontSize: 20,
                          fontWeight: 800,
                          color: item.color,
                        }}
                      >
                        {item.id}
                      </div>
                    </div>
                  </div>

                  {/* Embedding Transform Arrow */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: P ? 70 : 120,
                      opacity: Math.max(0.3, vecReveal),
                    }}
                  >
                    <span
                      style={{
                        fontFamily: LLM_MONO,
                        fontSize: 11,
                        color: LLM_C.cyan,
                        fontWeight: 700,
                      }}
                    >
                      EMBED(x)
                    </span>
                    <span
                      style={{
                        fontFamily: LLM_MONO,
                        fontSize: 24,
                        color: item.color,
                        lineHeight: 1,
                      }}
                    >
                      ───►
                    </span>
                  </div>

                  {/* Numerical Vector Representation with Connected Dimensions */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "rgba(4, 8, 20, 0.92)",
                      border: `1.5px solid ${rowVec > 0.2 ? item.color : LLM_C.borderSubtle}`,
                      borderRadius: 12,
                      padding: "10px 18px",
                      opacity: Math.max(0.2, rowVec),
                      transform: `scale(${interpolate(rowVec, [0, 1], [0.92, 1])})`,
                      boxShadow:
                        rowVec > 0.5 ? `0 0 22px ${item.color}22` : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: LLM_MONO,
                        fontSize: 24,
                        color: item.color,
                        fontWeight: 700,
                      }}
                    >
                      [
                    </span>
                    {item.dims.slice(0, P ? 3 : 5).map((val, dIdx) => (
                      <React.Fragment key={dIdx}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            background: "rgba(16, 31, 66, 0.9)",
                            border: `1px solid ${item.color}55`,
                            borderRadius: 8,
                            padding: "4px 12px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: LLM_MONO,
                              fontSize: 10,
                              color: LLM_C.textMuted,
                            }}
                          >
                            d_{dIdx + 1}
                          </span>
                          <span
                            style={{
                              fontFamily: LLM_MONO,
                              fontSize: 18,
                              fontWeight: 700,
                              color: val.startsWith("+")
                                ? LLM_C.cyan
                                : LLM_C.amber,
                            }}
                          >
                            {val}
                          </span>
                        </div>
                        {dIdx < (P ? 3 : 5) - 1 ? (
                          <div
                            style={{
                              width: 18,
                              height: 2,
                              background: `${item.color}66`,
                            }}
                          />
                        ) : null}
                      </React.Fragment>
                    ))}
                    <span
                      style={{
                        fontFamily: LLM_MONO,
                        fontSize: 16,
                        color: LLM_C.textMuted,
                      }}
                    >
                      … d_n
                    </span>
                    <span
                      style={{
                        fontFamily: LLM_MONO,
                        fontSize: 24,
                        color: item.color,
                        fontWeight: 700,
                      }}
                    >
                      ]
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div
            style={{
              display: "flex",
              flexDirection: P ? "column" : "row",
              gap: P ? 4 : 0,
              justifyContent: "space-between",
              fontFamily: LLM_MONO,
              fontSize: 14,
              color: LLM_C.textMuted,
            }}
          >
            <span>EACH DIMENSION ENCODES SEMANTIC &amp; SYNTACTIC FEATURES</span>
            <span style={{ color: LLM_C.cyan }}>
              CONTINUOUS VECTOR REPRESENTATION
            </span>
          </div>
        </div>

        {/* RIGHT: 3D Vector Space Visualization (Pattern & Context Clustering) */}
        <div
          style={{
            width: P ? "100%" : 696,
            height: P ? 540 : 620,
            boxSizing: "border-box",
            background: "rgba(8, 16, 38, 0.88)",
            border: `1.5px solid ${spaceReveal > 0.2 ? LLM_C.cyan : LLM_C.border}`,
            borderRadius: 24,
            padding: "26px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 26px 68px rgba(0,0,0,0.65)",
            opacity: Math.max(0.35, spaceReveal),
            transform: `scale(${interpolate(spaceReveal, [0, 1], [0.95, 1])})`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: LLM_MONO,
                  fontSize: 13,
                  color: LLM_C.emerald,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                NEURAL VECTOR SPACE
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: LLM_C.text,
                  marginTop: 2,
                }}
              >
                Language Pattern &amp; Context Proximity
              </div>
            </div>
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 13,
                color: LLM_C.emerald,
                background: "rgba(16, 185, 129, 0.14)",
                border: `1px solid ${LLM_C.emerald}`,
                padding: "5px 12px",
                borderRadius: 99,
                fontWeight: 700,
              }}
            >
              COSINE SIMILARITY
            </div>
          </div>

          {/* Coordinate Axes & Connected Vectors SVG */}
          <svg
            width={640}
            height={430}
            viewBox="0 0 640 430"
            style={{
              alignSelf: "center",
              background: "rgba(4, 8, 20, 0.85)",
              borderRadius: 18,
              border: `1px solid ${LLM_C.borderSubtle}`,
            }}
          >
            {/* 3D Perspective Axes */}
            <line
              x1={70}
              y1={370}
              x2={580}
              y2={370}
              stroke="rgba(148, 163, 184, 0.35)"
              strokeWidth={2}
            />
            <line
              x1={70}
              y1={370}
              x2={70}
              y2={45}
              stroke="rgba(148, 163, 184, 0.35)"
              strokeWidth={2}
            />
            <line
              x1={70}
              y1={370}
              x2={210}
              y2={250}
              stroke="rgba(148, 163, 184, 0.25)"
              strokeWidth={2}
              strokeDasharray="6 6"
            />
            <text
              x={545}
              y={395}
              fill={LLM_C.textMuted}
              fontSize={12}
              fontFamily={LLM_MONO}
            >
              DIM X
            </text>
            <text
              x={82}
              y={62}
              fill={LLM_C.textMuted}
              fontSize={12}
              fontFamily={LLM_MONO}
            >
              DIM Y
            </text>
            <text
              x={215}
              y={248}
              fill={LLM_C.textMuted}
              fontSize={12}
              fontFamily={LLM_MONO}
            >
              DIM Z
            </text>

            {/* Semantic Cluster Highlights (Pattern & Context) */}
            <ellipse
              cx={205}
              cy={160}
              rx={110}
              ry={78}
              fill="rgba(56, 189, 248, 0.08)"
              stroke={LLM_C.cyanSoft}
              strokeWidth={1.5}
              strokeDasharray="6 6"
              opacity={patternGlow}
            />
            <ellipse
              cx={455}
              cy={245}
              rx={95}
              ry={68}
              fill="rgba(99, 102, 241, 0.09)"
              stroke={LLM_C.indigo}
              strokeWidth={1.5}
              strokeDasharray="6 6"
              opacity={patternGlow}
            />

            {/* Connected Dimension Edges between related tokens */}
            <line
              x1={185}
              y1={120}
              x2={265}
              y2={155}
              stroke={LLM_C.emerald}
              strokeWidth={2.5}
              opacity={spaceReveal}
            />
            <line
              x1={185}
              y1={120}
              x2={155}
              y2={205}
              stroke={LLM_C.cyanSoft}
              strokeWidth={2}
              opacity={spaceReveal}
            />
            <line
              x1={265}
              y1={155}
              x2={155}
              y2={205}
              stroke={LLM_C.cyanSoft}
              strokeWidth={2}
              opacity={spaceReveal}
            />
            <line
              x1={430}
              y1={275}
              x2={485}
              y2={215}
              stroke={LLM_C.cyan}
              strokeWidth={2.5}
              opacity={spaceReveal}
            />

            {/* Vector Rays from Origin (70, 370) */}
            {SPACE_POINTS.map((pt, i) => {
              const floatY = Math.sin(frame / 18 + i * 1.2) * 4;
              return (
                <g key={pt.label}>
                  <line
                    x1={70}
                    y1={370}
                    x2={pt.x}
                    y2={pt.y + floatY}
                    stroke={pt.color}
                    strokeWidth={1.5}
                    strokeOpacity={0.45 * spaceReveal}
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y + floatY}
                    r={16}
                    fill={`${pt.color}22`}
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y + floatY}
                    r={7}
                    fill={pt.color}
                  />
                  <rect
                    x={pt.x + 12}
                    y={pt.y + floatY - 14}
                    width={pt.label.length * 9 + 18}
                    height={24}
                    rx={6}
                    fill="rgba(4, 8, 20, 0.92)"
                    stroke={pt.color}
                    strokeWidth={1.2}
                  />
                  <text
                    x={pt.x + 21}
                    y={pt.y + floatY + 3}
                    fill={LLM_C.text}
                    fontSize={13}
                    fontFamily={LLM_MONO}
                    fontWeight={700}
                  >
                    {pt.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div
            style={{
              background: "rgba(4, 8, 20, 0.9)",
              border: `1px solid ${LLM_C.borderSubtle}`,
              borderRadius: 14,
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: LLM_MONO,
              fontSize: 14,
            }}
          >
            <span style={{ color: LLM_C.cyan }}>
              ● SEMANTICALLY SIMILAR TOKENS CLUSTER TOGETHER
            </span>
            <span style={{ color: LLM_C.emerald, fontWeight: 700 }}>
              CONTEXT READY
            </span>
          </div>
        </div>
      </div>
    </LlmSceneShell>
  );
};
