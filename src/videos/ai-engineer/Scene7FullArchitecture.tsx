import React from "react";
import { interpolate, spring } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { AIE_C, AIE_DISPLAY, AIE_LEAD_SEC, AIE_MONO } from "./narration";
import { AieSceneShell, useAieVoice } from "./SceneShell";

const LAYERS = [
  {
    id: "ui",
    step: "LAYER 01",
    title: "User Interface",
    sub: "Web & Mobile Experience",
    bullets: ["Chat & Smart UI", "Real-Time Streaming", "Instant Feedback"],
    atSec: 7.45,
    accent: "#38BDF8",
  },
  {
    id: "api",
    step: "LAYER 02",
    title: "API Gateway",
    sub: "REST / WebSocket Layer",
    bullets: ["Auth & Rate Limits", "Streaming Endpoints", "Schema Validation"],
    atSec: 6.65,
    accent: "#00E5FF",
  },
  {
    id: "backend",
    step: "LAYER 03",
    title: "Backend Engine",
    sub: "Orchestration & Logic",
    bullets: ["Prompt Pipelines", "RAG & Tool Routing", "Safety Guardrails"],
    atSec: 5.95,
    accent: "#818CF8",
  },
  {
    id: "db",
    step: "LAYER 04",
    title: "Database",
    sub: "SQL + Vector Storage",
    bullets: ["User & App Data", "Document Embeddings", "Conversation Memory"],
    atSec: 5.1,
    accent: "#10B981",
  },
  {
    id: "ai",
    step: "LAYER 05",
    title: "AI Model Core",
    sub: "LLM & Neural Engine",
    bullets: ["Reasoning & Synthesis", "Structured Outputs", "Multi-Modal Inference"],
    atSec: 0.15,
    accent: "#A855F7",
  },
] as const;

export const Scene7FullArchitecture: React.FC<{
  readonly showSubtitles?: boolean;
}> = ({ showSubtitles = true }) => {
  const { frame, fps, voiceSec } = useAieVoice("scene7");

  const systemWrapP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 9.6) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const unifiedActive = voiceSec >= 9.6;
  const flowT = (frame % 70) / 70;

  return (
    <AieSceneShell
      id="scene7"
      showSubtitles={showSubtitles}
      backdropImage="ai-engineer/server-cloud-backdrop.png"
      backdropOpacity={0.34}
      sfx={[
        { atSec: AIE_LEAD_SEC + 5.1, type: "click", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 5.95, type: "click", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 6.65, type: "click", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 7.45, type: "click", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 9.6, type: "chime", volume: 0.32 },
      ]}
    >
      {/* Unified Master System Frame wrapping all 5 Architecture Layers */}
      <div
        style={{
          position: "relative",
          marginTop: 18,
          height: 778,
          borderRadius: 28,
          padding: "30px 28px 28px",
          background: unifiedActive
            ? "linear-gradient(155deg, rgba(10, 17, 44, 0.88), rgba(28, 14, 62, 0.88))"
            : "rgba(7, 12, 30, 0.65)",
          border: `2px solid ${unifiedActive ? AIE_C.purple : AIE_C.borderSubtle}`,
          boxShadow: unifiedActive
            ? "0 0 80px rgba(124, 58, 237, 0.34), inset 0 0 40px rgba(56, 189, 248, 0.12)"
            : "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Top Master System Banner */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: AIE_MONO, fontSize: 13.5, color: AIE_C.cyan, letterSpacing: 1.8 }}>
              END-TO-END PRODUCTION ARCHITECTURE
            </div>
            <div
              style={{
                fontFamily: AIE_DISPLAY,
                fontSize: 38,
                fontWeight: 800,
                marginTop: 4,
                background: unifiedActive
                  ? "linear-gradient(90deg, #FFFFFF 0%, #7DD3FC 50%, #D8B4FE 100%)"
                  : "none",
                WebkitBackgroundClip: unifiedActive ? "text" : undefined,
                WebkitTextFillColor: unifiedActive ? "transparent" : AIE_C.text,
                color: AIE_C.text,
              }}
            >
              {unifiedActive
                ? "Complete Intelligent Software System"
                : "More Than Just an AI Model"}
            </div>
          </div>

          <div
            style={{
              opacity: 0.25 + systemWrapP * 0.75,
              transform: `scale(${interpolate(systemWrapP, [0, 1], [0.9, 1])})`,
              background: unifiedActive
                ? "linear-gradient(90deg, rgba(16, 185, 129, 0.22), rgba(56, 189, 248, 0.18))"
                : "rgba(15, 23, 42, 0.7)",
              border: `1.5px solid ${unifiedActive ? AIE_C.emerald : AIE_C.borderSubtle}`,
              borderRadius: 99,
              padding: "10px 22px",
              fontFamily: AIE_MONO,
              fontSize: 14,
              fontWeight: 700,
              color: unifiedActive ? "#A7F3D0" : AIE_C.textDim,
            }}
          >
            ● {unifiedActive ? "ALL 5 LAYERS INTEGRATED" : "CONNECTING ARCHITECTURE..."}
          </div>
        </div>

        {/* 5 Connected Architectural Columns with Animated Optical Data Conduit */}
        <div style={{ position: "relative", height: 470, display: "flex", alignItems: "center" }}>
          {/* Horizontal Fiber Backbone behind Cards */}
          <svg
            width="1752"
            height="140"
            viewBox="0 0 1752 140"
            style={{
              position: "absolute",
              top: 165,
              left: 0,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <defs>
              <linearGradient id="archBus" gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="1600" y2="0">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <line
              x1="150"
              y1="44"
              x2="1600"
              y2="44"
              stroke="url(#archBus)"
              strokeWidth="4"
              opacity={voiceSec >= 5.1 ? 0.85 : 0.15}
            />
            <line
              x1="150"
              y1="96"
              x2="1600"
              y2="96"
              stroke="url(#archBus)"
              strokeWidth="4"
              opacity={voiceSec >= 5.1 ? 0.85 : 0.15}
            />
            {voiceSec >= 5.1 ? (
              <>
                <circle cx={150 + flowT * 1450} cy="44" r="7" fill="#00E5FF" />
                <circle cx={1600 - flowT * 1450} cy="96" r="7" fill="#C084FC" />
              </>
            ) : null}
          </svg>

          {/* 5 Architecture Cards */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 22,
            }}
          >
            {LAYERS.map((layer) => {
              const sp = spring({
                frame: frame - Math.round((AIE_LEAD_SEC + layer.atSec) * fps),
                fps,
                config: SPRING_UI,
              });
              const lit = voiceSec >= layer.atSec;
              return (
                <div
                  key={layer.id}
                  style={{
                    height: 430,
                    borderRadius: 22,
                    padding: "22px 20px",
                    background: lit
                      ? "linear-gradient(165deg, rgba(12, 20, 50, 0.96), rgba(22, 14, 52, 0.96))"
                      : "rgba(9, 14, 34, 0.56)",
                    border: `2px solid ${lit ? layer.accent : AIE_C.borderSubtle}`,
                    opacity: 0.24 + sp * 0.76,
                    transform: `translate3d(0px, ${interpolate(sp, [0, 1], [22, 0])}px, 0px)`,
                    boxShadow: lit
                      ? `0 20px 48px ${layer.accent}2B, inset 0 1px 0 rgba(255,255,255,0.1)`
                      : "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <span
                        style={{
                          fontFamily: AIE_MONO,
                          fontSize: 12,
                          fontWeight: 700,
                          color: layer.accent,
                          background: `${layer.accent}1F`,
                          padding: "4px 10px",
                          borderRadius: 8,
                        }}
                      >
                        {layer.step}
                      </span>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 99,
                          background: lit ? layer.accent : AIE_C.textDim,
                          boxShadow: lit ? `0 0 12px ${layer.accent}` : "none",
                        }}
                      />
                    </div>

                    <div style={{ fontFamily: AIE_DISPLAY, fontSize: 27, fontWeight: 800, color: AIE_C.text }}>
                      {layer.title}
                    </div>
                    <div style={{ fontSize: 14.5, color: AIE_C.textMuted, marginTop: 4 }}>
                      {layer.sub}
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {layer.bullets.map((b) => (
                      <div
                        key={b}
                        style={{
                          background: "rgba(5, 10, 28, 0.85)",
                          border: `1px solid ${lit ? `${layer.accent}44` : AIE_C.borderSubtle}`,
                          borderRadius: 10,
                          padding: "10px 12px",
                          fontFamily: AIE_MONO,
                          fontSize: 13,
                          color: lit ? "#F1F5F9" : AIE_C.textDim,
                        }}
                      >
                        ▸ {b}
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      fontFamily: AIE_MONO,
                      fontSize: 11.5,
                      color: lit ? layer.accent : AIE_C.textDim,
                      textAlign: "center",
                      borderTop: `1px solid ${AIE_C.borderSubtle}`,
                      paddingTop: 10,
                    }}
                  >
                    {lit ? "● ONLINE & SYNCED" : "STANDBY"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Architectural Flow Summary Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 24px",
            borderRadius: 14,
            background: "rgba(6, 11, 28, 0.86)",
            border: `1px solid ${unifiedActive ? AIE_C.borderBlue : AIE_C.borderSubtle}`,
            fontFamily: AIE_MONO,
            fontSize: 14.5,
            color: "#E2E8F0",
          }}
        >
          <span>DATA FLOW:</span>
          <span style={{ color: AIE_C.blue }}>User Request</span>
          <span style={{ color: AIE_C.textDim }}>➔</span>
          <span style={{ color: AIE_C.cyan }}>API Gateway</span>
          <span style={{ color: AIE_C.textDim }}>➔</span>
          <span style={{ color: "#A5B4FC" }}>Backend + Context</span>
          <span style={{ color: AIE_C.textDim }}>➔</span>
          <span style={{ color: AIE_C.emerald }}>Database + Vector DB</span>
          <span style={{ color: AIE_C.textDim }}>➔</span>
          <span style={{ color: AIE_C.purple }}>AI Model Inference</span>
          <span style={{ color: AIE_C.textDim }}>➔</span>
          <span style={{ color: AIE_C.emerald }}>Intelligent Response</span>
        </div>
      </div>
    </AieSceneShell>
  );
};
