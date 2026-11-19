import React from "react";
import { interpolate, spring } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { AIE_C, AIE_DISPLAY, AIE_LEAD_SEC, AIE_MONO } from "./narration";
import { AieSceneShell, useAieVoice } from "./SceneShell";

const COMPONENTS = [
  {
    id: "model",
    num: "01",
    title: "AI Model Integration",
    tag: "LLM & VISION APIs",
    detail: "Connect GPT, Gemini & open-weight models reliably",
    atSec: 3.75,
    accent: "#38BDF8",
    pos: { left: 26, top: 28 },
    anchor: { x: 472, y: 145 },
  },
  {
    id: "prompt",
    num: "02",
    title: "Prompt Engineering",
    tag: "STRUCTURED PROMPTS",
    detail: "System rules, context templates & deterministic JSON",
    atSec: 5.45,
    accent: "#818CF8",
    pos: { left: 656, top: 14 },
    anchor: { x: 906, y: 204 },
  },
  {
    id: "rag",
    num: "03",
    title: "RAG Development",
    tag: "RETRIEVAL PIPELINE",
    detail: "Ground AI responses with private docs & vector search",
    atSec: 6.65,
    accent: "#A855F7",
    pos: { left: 1286, top: 28 },
    anchor: { x: 1340, y: 145 },
  },
  {
    id: "agents",
    num: "04",
    title: "AI Agents",
    tag: "AUTONOMOUS WORKFLOWS",
    detail: "Reasoning loops, memory & external tool execution",
    atSec: 8.1,
    accent: "#C084FC",
    pos: { left: 26, top: 556 },
    anchor: { x: 472, y: 656 },
  },
  {
    id: "api",
    num: "05",
    title: "Backend API Development",
    tag: "STREAMING & AUTH",
    detail: "FastAPI / Node services, rate limits & guardrails",
    atSec: 9.55,
    accent: "#00E5FF",
    pos: { left: 656, top: 576 },
    anchor: { x: 906, y: 586 },
  },
  {
    id: "deploy",
    num: "06",
    title: "Production Deployment",
    tag: "CLOUD & MONITORING",
    detail: "CI/CD, observability, latency & cost optimization",
    atSec: 11.65,
    accent: "#10B981",
    pos: { left: 1286, top: 556 },
    anchor: { x: 1340, y: 656 },
  },
] as const;

export const Scene4CoreComponents: React.FC<{
  readonly showSubtitles?: boolean;
}> = ({ showSubtitles = true }) => {
  const { frame, fps, voiceSec } = useAieVoice("scene4");

  const hubP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 0.15) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const ringRot = (frame * 0.45) % 360;
  const cx = 906;
  const cy = 400;

  return (
    <AieSceneShell
      id="scene4"
      showSubtitles={showSubtitles}
      backdropImage="ai-engineer/server-cloud-backdrop.png"
      backdropOpacity={0.36}
      sfx={[
        { atSec: AIE_LEAD_SEC + 3.75, type: "pop", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 5.45, type: "pop", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 6.65, type: "pop", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 8.1, type: "pop", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 9.55, type: "pop", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 11.65, type: "chime", volume: 0.28 },
      ]}
    >
      {/* Interconnected Optical Data Bus SVG */}
      <svg
        width="1812"
        height="830"
        viewBox="0 0 1812 830"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {COMPONENTS.map((comp, idx) => {
          const active = voiceSec >= comp.atSec;
          const lineProg = interpolate(voiceSec, [comp.atSec, comp.atSec + 0.45], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const pulseT = ((frame + idx * 17) % 60) / 60;
          const px = cx + (comp.anchor.x - cx) * pulseT;
          const py = cy + (comp.anchor.y - cy) * pulseT;
          return (
            <g key={comp.id}>
              {/* Base subtle path */}
              <line
                x1={cx}
                y1={cy}
                x2={comp.anchor.x}
                y2={comp.anchor.y}
                stroke="rgba(148, 163, 184, 0.16)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {/* Illuminated live connection */}
              {active ? (
                <>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cx + (comp.anchor.x - cx) * lineProg}
                    y2={cy + (comp.anchor.y - cy) * lineProg}
                    stroke={comp.accent}
                    strokeWidth="3"
                    opacity="0.85"
                  />
                  <circle cx={px} cy={py} r="5.5" fill={comp.accent} opacity={lineProg} />
                </>
              ) : null}
            </g>
          );
        })}

        {/* Rotating Outer Hub Ring */}
        <g transform={`translate(${cx}, ${cy}) rotate(${ringRot})`}>
          <circle
            cx="0"
            cy="0"
            r="134"
            fill="none"
            stroke="rgba(168, 85, 247, 0.35)"
            strokeWidth="2"
            strokeDasharray="14 10"
          />
        </g>
        <g transform={`translate(${cx}, ${cy}) rotate(${-ringRot * 1.4})`}>
          <circle
            cx="0"
            cy="0"
            r="112"
            fill="none"
            stroke="rgba(56, 189, 248, 0.45)"
            strokeWidth="1.5"
            strokeDasharray="8 12"
          />
        </g>
      </svg>

      {/* Center Core Hub */}
      <div
        style={{
          position: "absolute",
          left: cx - 102,
          top: cy - 102,
          width: 204,
          height: 204,
          borderRadius: 999,
          background:
            "radial-gradient(circle at 35% 30%, #1E1B5E 0%, #0A112C 78%)",
          border: `2px solid ${AIE_C.purple}`,
          boxShadow:
            "0 0 60px rgba(124, 58, 237, 0.42), inset 0 0 28px rgba(56, 189, 248, 0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          opacity: hubP,
          transform: `scale(${interpolate(hubP, [0, 1], [0.85, 1])})`,
          zIndex: 10,
        }}
      >
        <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.cyan, letterSpacing: 1.6 }}>
          CORE SYSTEM
        </div>
        <div style={{ fontFamily: AIE_DISPLAY, fontSize: 26, fontWeight: 800, color: AIE_C.text, lineHeight: 1.15, marginTop: 4 }}>
          AI Engineer
        </div>
        <div style={{ fontFamily: AIE_MONO, fontSize: 11.5, color: "#D8B4FE", marginTop: 6 }}>
          6 KEY PILLARS
        </div>
      </div>

      {/* 6 Interconnected Component Cards */}
      {COMPONENTS.map((comp) => {
        const sp = spring({
          frame: frame - Math.round((AIE_LEAD_SEC + comp.atSec) * fps),
          fps,
          config: SPRING_UI,
        });
        const lit = voiceSec >= comp.atSec;
        const isCurrent =
          lit &&
          (comp.id === "deploy" ||
            voiceSec <
              (COMPONENTS[COMPONENTS.indexOf(comp) + 1]?.atSec ?? 99));

        return (
          <div
            key={comp.id}
            style={{
              position: "absolute",
              left: comp.pos.left,
              top: comp.pos.top,
              width: 500,
              height: 218,
              background: lit
                ? "linear-gradient(145deg, rgba(12, 18, 46, 0.94), rgba(26, 15, 58, 0.94))"
                : "rgba(9, 14, 34, 0.52)",
              border: `1.5px solid ${lit ? comp.accent : AIE_C.borderSubtle}`,
              borderRadius: 22,
              padding: "22px 26px",
              backdropFilter: "blur(14px)",
              opacity: 0.26 + sp * 0.74,
              transform: `scale(${isCurrent ? 1.035 : interpolate(sp, [0, 1], [0.95, 1])})`,
              boxShadow: isCurrent
                ? `0 22px 60px ${comp.accent}38, 0 0 24px ${comp.accent}25`
                : lit
                  ? `0 14px 36px rgba(0, 0, 0, 0.55)`
                  : "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: AIE_MONO,
                  fontSize: 13,
                  fontWeight: 700,
                  color: comp.accent,
                  background: `${comp.accent}1F`,
                  border: `1px solid ${comp.accent}55`,
                  padding: "4px 11px",
                  borderRadius: 8,
                }}
              >
                {comp.num} · {comp.tag}
              </span>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 99,
                  background: lit ? comp.accent : AIE_C.textDim,
                  boxShadow: lit ? `0 0 12px ${comp.accent}` : "none",
                }}
              />
            </div>

            <div>
              <div style={{ fontFamily: AIE_DISPLAY, fontSize: 28, fontWeight: 800, color: AIE_C.text, marginBottom: 8 }}>
                {comp.title}
              </div>
              <div style={{ fontSize: 16.5, color: AIE_C.textMuted, lineHeight: 1.4 }}>
                {comp.detail}
              </div>
            </div>
          </div>
        );
      })}
    </AieSceneShell>
  );
};
