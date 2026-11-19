import React from "react";
import { interpolate, spring } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { AIE_C, AIE_DISPLAY, AIE_LEAD_SEC, AIE_MONO } from "./narration";
import { AieSceneShell, useAieVoice } from "./SceneShell";

export const Scene6PretrainedIntegration: React.FC<{
  readonly showSubtitles?: boolean;
}> = ({ showSubtitles = true }) => {
  const { frame, fps, voiceSec } = useAieVoice("scene6");

  const mythP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 1.75) * fps),
    fps,
    config: SPRING_UI,
  });

  const crossP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 4.35) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const modelP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 6.4) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const integrateP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 10.4) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const plugProgress = interpolate(voiceSec, [10.4, 12.1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const packetFwd = (frame % 54) / 54;
  const packetRev = ((frame + 27) % 54) / 54;
  const dimLeft = voiceSec >= 6.4;

  return (
    <AieSceneShell
      id="scene6"
      showSubtitles={showSubtitles}
      backdropImage="ai-engineer/server-cloud-backdrop.png"
      backdropOpacity={0.34}
      sfx={[
        { atSec: AIE_LEAD_SEC + 1.75, type: "pop", volume: 0.2 },
        { atSec: AIE_LEAD_SEC + 4.35, type: "click", volume: 0.24 },
        { atSec: AIE_LEAD_SEC + 6.4, type: "riser", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 10.4, type: "chime", volume: 0.3 },
      ]}
    >
      {/* Top Insight Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 6,
          marginBottom: 20,
          padding: "14px 24px",
          background:
            "linear-gradient(90deg, rgba(168, 85, 247, 0.18), rgba(56, 189, 248, 0.14))",
          border: `1px solid ${AIE_C.borderPurple}`,
          borderRadius: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              fontFamily: AIE_MONO,
              fontSize: 13,
              fontWeight: 700,
              color: "#FFFFFF",
              background: "linear-gradient(90deg, #7C3AED, #0284C7)",
              padding: "5px 12px",
              borderRadius: 8,
            }}
          >
            KEY INSIGHT
          </span>
          <span style={{ fontFamily: AIE_DISPLAY, fontSize: 22, fontWeight: 700, color: AIE_C.text }}>
            Build &amp; Train From Scratch vs. Integrate Pre-Trained Models
          </span>
        </div>
        <span style={{ fontFamily: AIE_MONO, fontSize: 13, color: AIE_C.cyan }}>
          PRACTICAL AI ENGINEERING
        </span>
      </div>

      {/* Main Split Stage */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.78fr 1.22fr",
          gap: 28,
          height: 705,
        }}
      >
        {/* LEFT PANEL: Myth — Training a Foundation Model from Scratch */}
        <div
          style={{
            position: "relative",
            background: "rgba(12, 14, 34, 0.85)",
            border: `1.5px solid ${voiceSec >= 4.35 ? "rgba(244, 63, 94, 0.45)" : AIE_C.borderSubtle}`,
            borderRadius: 24,
            padding: 30,
            opacity: dimLeft ? 0.46 : 0.25 + mythP * 0.75,
            transform: `scale(${dimLeft ? 0.97 : 1})`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backdropFilter: "blur(14px)",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontFamily: AIE_MONO, fontSize: 13, color: AIE_C.rose, letterSpacing: 1.4 }}>
                COMMON MISCONCEPTION
              </span>
              <span
                style={{
                  opacity: crossP,
                  transform: `scale(${interpolate(crossP, [0, 1], [0.7, 1])})`,
                  fontFamily: AIE_MONO,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#FFE4E6",
                  background: "rgba(244, 63, 94, 0.28)",
                  border: `1px solid ${AIE_C.rose}`,
                  padding: "5px 12px",
                  borderRadius: 99,
                }}
              >
                ✕ NOT REQUIRED
              </span>
            </div>

            <div style={{ fontFamily: AIE_DISPLAY, fontSize: 32, fontWeight: 800, color: AIE_C.text, lineHeight: 1.2 }}>
              Training an AI Model From Scratch
            </div>
            <div style={{ fontSize: 17, color: AIE_C.textMuted, marginTop: 10, lineHeight: 1.5 }}>
              Pre-training billion-parameter neural networks requires massive research labs, huge datasets &amp; months of GPU cluster runs.
            </div>
          </div>

          {/* Stylized Heavy GPU Cluster Graphic */}
          <div
            style={{
              background: "rgba(6, 9, 22, 0.9)",
              border: "1px solid rgba(244, 63, 94, 0.24)",
              borderRadius: 18,
              padding: 22,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            {[
              { k: "COMPUTE", v: "10,000+ GPUs" },
              { k: "DATASET", v: "Trillions of Tokens" },
              { k: "TIMELINE", v: "Months of Training" },
              { k: "COST", v: "$10M+ Budget" },
            ].map((m) => (
              <div
                key={m.k}
                style={{
                  background: "rgba(244, 63, 94, 0.08)",
                  border: "1px solid rgba(244, 63, 94, 0.2)",
                  borderRadius: 12,
                  padding: "14px 16px",
                }}
              >
                <div style={{ fontFamily: AIE_MONO, fontSize: 11.5, color: "#FDA4AF" }}>{m.k}</div>
                <div style={{ fontFamily: AIE_DISPLAY, fontSize: 20, fontWeight: 700, color: "#FFF1F2", marginTop: 4 }}>
                  {m.v}
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: AIE_MONO, fontSize: 13.5, color: "#FDA4AF" }}>
            ↳ Usually done by AI Research Labs — not the everyday AI Engineer workflow.
          </div>
        </div>

        {/* RIGHT PANEL: Reality — Connecting Pre-Trained AI Model into Existing Software Application */}
        <div
          style={{
            background:
              "linear-gradient(145deg, rgba(11, 18, 46, 0.94) 0%, rgba(28, 15, 64, 0.94) 100%)",
            border: `2px solid ${voiceSec >= 6.4 ? AIE_C.purple : AIE_C.borderSubtle}`,
            borderRadius: 24,
            padding: 32,
            opacity: 0.24 + modelP * 0.76,
            transform: `translate3d(${interpolate(modelP, [0, 1], [24, 0])}px, 0px, 0px)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow:
              voiceSec >= 6.4
                ? "0 28px 75px rgba(124, 58, 237, 0.34), 0 0 32px rgba(56, 189, 248, 0.16)"
                : "none",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: AIE_MONO, fontSize: 13, color: AIE_C.cyan, letterSpacing: 1.5 }}>
                PRIMARY RESPONSIBILITY OF AN AI ENGINEER
              </div>
              <div style={{ fontFamily: AIE_DISPLAY, fontSize: 34, fontWeight: 800, color: AIE_C.text, marginTop: 4 }}>
                Pre-Trained Model Integration
              </div>
            </div>
            <div
              style={{
                fontFamily: AIE_MONO,
                fontSize: 13,
                fontWeight: 700,
                color: AIE_C.emerald,
                background: "rgba(16, 185, 129, 0.16)",
                border: `1px solid ${AIE_C.emerald}`,
                padding: "7px 16px",
                borderRadius: 99,
                opacity: integrateP,
              }}
            >
              ✓ CONNECTED VIA API
            </div>
          </div>

          {/* Interactive Connection Diagram: Pre-Trained AI Model <==> API Connector <==> Existing Software App */}
          <div
            style={{
              position: "relative",
              height: 390,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 12px",
            }}
          >
            {/* Pre-Trained Foundation Model Core */}
            <div
              style={{
                width: 340,
                height: 320,
                borderRadius: 22,
                background: "linear-gradient(160deg, #1A104B 0%, #0B163A 100%)",
                border: `2px solid ${AIE_C.purple}`,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 0 42px rgba(168, 85, 247, 0.32)",
                zIndex: 4,
              }}
            >
              <div>
                <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: "#D8B4FE", letterSpacing: 1.2 }}>
                  EXISTING FOUNDATION MODEL
                </div>
                <div style={{ fontFamily: AIE_DISPLAY, fontSize: 27, fontWeight: 800, color: AIE_C.text, marginTop: 6 }}>
                  Pre-Trained AI Model
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["GPT-4o / Gemini / Claude", "Llama / Mistral Weights", "Vision & Embedding APIs"].map((m) => (
                  <div
                    key={m}
                    style={{
                      background: "rgba(168, 85, 247, 0.18)",
                      border: "1px solid rgba(168, 85, 247, 0.36)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      fontFamily: AIE_MONO,
                      fontSize: 13.5,
                      color: "#F3E8FF",
                    }}
                  >
                    ◆ {m}
                  </div>
                ))}
              </div>

              <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.cyan }}>
                READY FOR IMMEDIATE USE
              </div>
            </div>

            {/* Animated Connector Bridge SVG */}
            <svg
              width="310"
              height="240"
              viewBox="0 0 310 240"
              style={{ flexShrink: 0 }}
            >
              <defs>
                <linearGradient id="plugGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="310" y2="0">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="50%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>

              {/* Top & Bottom Bidirectional Rails */}
              <line x1="0" y1="86" x2="310" y2="86" stroke="rgba(148,163,184,0.2)" strokeWidth="3" strokeDasharray="8 6" />
              <line x1="0" y1="154" x2="310" y2="154" stroke="rgba(148,163,184,0.2)" strokeWidth="3" strokeDasharray="8 6" />

              {plugProgress > 0 ? (
                <>
                  <line
                    x1="0"
                    y1="86"
                    x2={310 * plugProgress}
                    y2="86"
                    stroke="url(#plugGrad)"
                    strokeWidth="4"
                  />
                  <line
                    x1={310 * (1 - plugProgress)}
                    y1="154"
                    x2="310"
                    y2="154"
                    stroke="url(#plugGrad)"
                    strokeWidth="4"
                  />
                  {/* Traveling Request & Response Packets */}
                  <circle cx={packetFwd * 310} cy="86" r="6" fill="#00E5FF" opacity={plugProgress} />
                  <circle cx={310 - packetRev * 310} cy="154" r="6" fill="#C084FC" opacity={plugProgress} />
                </>
              ) : null}

              {/* Center API / SDK Plug Hub */}
              <g transform={`translate(155, 120) scale(${0.8 + integrateP * 0.2})`} opacity={0.3 + integrateP * 0.7}>
                <rect x="-78" y="-30" width="156" height="60" rx="14" fill="#0D193D" stroke="#00E5FF" strokeWidth="2.2" />
                <text x="0" y="-4" textAnchor="middle" fill="#00E5FF" fontSize="13" fontWeight="700" fontFamily={AIE_MONO}>
                  API / SDK BRIDGE
                </text>
                <text x="0" y="16" textAnchor="middle" fill="#CBD5E1" fontSize="11.5" fontFamily={AIE_MONO}>
                  Prompt ↔ JSON
                </text>
              </g>
            </svg>

            {/* Existing Software Application */}
            <div
              style={{
                width: 340,
                height: 320,
                borderRadius: 22,
                background: "linear-gradient(160deg, #0D2044 0%, #09132E 100%)",
                border: `2px solid ${voiceSec >= 10.4 ? AIE_C.cyan : AIE_C.borderBlue}`,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow:
                  voiceSec >= 10.4 ? "0 0 42px rgba(0, 229, 255, 0.28)" : "none",
                zIndex: 4,
              }}
            >
              <div>
                <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.cyan, letterSpacing: 1.2 }}>
                  PRODUCTION PRODUCT
                </div>
                <div style={{ fontFamily: AIE_DISPLAY, fontSize: 27, fontWeight: 800, color: AIE_C.text, marginTop: 6 }}>
                  Software Application
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Web & Mobile Frontend", "Business Logic & Users", "AI-Powered Features Live"].map((item, i) => (
                  <div
                    key={item}
                    style={{
                      background: i === 2 && voiceSec >= 10.4 ? "rgba(16, 185, 129, 0.18)" : "rgba(56, 189, 248, 0.12)",
                      border: `1px solid ${i === 2 && voiceSec >= 10.4 ? AIE_C.emerald : "rgba(56, 189, 248, 0.28)"}`,
                      borderRadius: 10,
                      padding: "10px 14px",
                      fontFamily: AIE_MONO,
                      fontSize: 13.5,
                      color: i === 2 && voiceSec >= 10.4 ? "#A7F3D0" : "#E0F2FE",
                    }}
                  >
                    {i === 2 && voiceSec >= 10.4 ? "✓ " : "▸ "}
                    {item}
                  </div>
                ))}
              </div>

              <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.emerald }}>
                FAST TIME-TO-MARKET
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(56, 189, 248, 0.1)",
              border: `1px solid ${AIE_C.borderBlue}`,
              borderRadius: 14,
              padding: "14px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 16.5,
              color: "#E0F2FE",
            }}
          >
            <span>
              Focus on <strong>Integration, Reliability, Prompting &amp; Architecture</strong> — delivering real value fast.
            </span>
            <span style={{ fontFamily: AIE_MONO, fontSize: 13, color: AIE_C.cyan, fontWeight: 700 }}>
              SHIP IN DAYS, NOT YEARS
            </span>
          </div>
        </div>
      </div>
    </AieSceneShell>
  );
};
