import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { LLM_C, LLM_MONO } from "./narration";
import { LlmSceneShell, useLlmVoiceTime, useP } from "./LlmSceneShell";

const WORDS = ["The", "model", "reads", "the", "context", "carefully"];
const WX = (i: number, P = false) => (P ? 70 + i * 160 : 110 + i * 150);

// Query = "carefully"(5) attends to others. Weights: relevant strong, others subtle.
const LINKS = [
  { to: 1, w: 0.9 },
  { to: 2, w: 0.7 },
  { to: 4, w: 0.95 },
  { to: 0, w: 0.12 },
  { to: 3, w: 0.15 },
];

const PATHS = [
  {
    key: "Query",
    color: LLM_C.cyan,
    desc: "কী Information খোঁজা হচ্ছে",
    at: 4.75,
    end: 7.9,
    icon: "Q",
  },
  {
    key: "Key",
    color: LLM_C.indigo,
    desc: "অন্য Token-এর পরিচিতি",
    at: 7.9,
    end: 10.45,
    icon: "K",
  },
  {
    key: "Value",
    color: LLM_C.emerald,
    desc: "Token থেকে পাওয়া Information",
    at: 10.45,
    end: 14.35,
    icon: "V",
  },
] as const;

export const Scene5Attention: React.FC = () => {
  const { fps } = useVideoConfig();
  const P = useP();
  const { frame, voiceSec, totalVoiceSec } = useLlmVoiceTime("scene5");

  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.985, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sentenceIn = spring({ frame: frame - 4, fps, config: SPRING_HEADLINE });
  // Connections appear when Query is introduced, illuminate when weights described.
  const linksIn = spring({
    frame: frame - Math.round(1.7 * fps),
    fps,
    config: SPRING_UI,
  });
  const weightGlow = interpolate(voiceSec, [14.35, 16.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <LlmSceneShell
      id="scene5"
      cameraStyle={{ transform: `scale(${camScale})` }}
      sfx={[
        { atSec: 0.5, type: "pop", volume: 0.2 },
        { atSec: 4.8, type: "click", volume: 0.24 },
        { atSec: 7.95, type: "click", volume: 0.24 },
        { atSec: 10.5, type: "click", volume: 0.24 },
        { atSec: 14.4, type: "chime", volume: 0.26 },
      ]}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        {/* Sentence + attention links */}
        <div
          style={{
            background: "rgba(8, 16, 38, 0.9)",
            border: `1.5px solid ${LLM_C.border}`,
            borderRadius: 24,
            padding: "22px 30px",
            opacity: sentenceIn,
            boxShadow: "0 26px 68px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              fontFamily: LLM_MONO,
              fontSize: 13,
              color: LLM_C.cyan,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            SELF-ATTENTION · QUERY TOKEN: &quot;carefully&quot;
          </div>
          <svg width={P ? 940 : 1700} height={290} viewBox={P ? "0 0 940 290" : "0 0 1700 290"}>
            {LINKS.map((l, i) => {
              const x1 = WX(5, P);
              const x2 = WX(l.to, P);
              const mid = (x1 + x2) / 2;
              const top = 200 - Math.abs(5 - l.to) * 36;
              const strong = l.w > 0.5;
              const pulse = 0.75 + 0.25 * Math.sin(frame / 10 + i);
              const op = strong
                ? 0.25 + 0.75 * weightGlow * pulse + 0.3 * linksIn
                : 0.12 * linksIn + 0.05;
              return (
                <g key={i} opacity={Math.min(1, op) * linksIn}>
                  <path
                    d={`M ${x1} 215 Q ${mid} ${top} ${x2} 215`}
                    fill="none"
                    stroke={strong ? LLM_C.cyan : LLM_C.textDim}
                    strokeWidth={strong ? 2 + l.w * 5 : 1.5}
                  />
                  {strong ? (
                    <text
                      x={mid}
                      y={top + 16}
                      textAnchor="middle"
                      fill={LLM_C.cyan}
                      fontFamily={LLM_MONO}
                      fontSize={15}
                      fontWeight={700}
                      opacity={weightGlow}
                    >
                      high weight
                    </text>
                  ) : null}
                </g>
              );
            })}
            {WORDS.map((w, i) => {
              const isQ = i === 5;
              const strong = LINKS.find((l) => l.to === i)?.w ?? 0;
              const hot = strong > 0.5 && weightGlow > 0.3;
              return (
                <g key={w + i}>
                  <rect
                    x={WX(i, P) - 66}
                    y={215}
                    width={132}
                    height={56}
                    rx={12}
                    fill={
                      isQ
                        ? "rgba(0,229,255,0.22)"
                        : hot
                          ? "rgba(16,185,129,0.18)"
                          : "rgba(16,31,66,0.95)"
                    }
                    stroke={isQ ? LLM_C.cyan : hot ? LLM_C.emerald : LLM_C.borderSubtle}
                    strokeWidth={isQ || hot ? 2.5 : 1.3}
                  />
                  <text
                    x={WX(i, P)}
                    y={250}
                    textAnchor="middle"
                    fill={LLM_C.text}
                    fontFamily={LLM_MONO}
                    fontSize={21}
                    fontWeight={700}
                  >
                    {w}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Q / K / V three information paths */}
        <div style={{ display: "flex", flexDirection: P ? "column" : "row", gap: 24 }}>
          {PATHS.map((p) => {
            const active = voiceSec >= p.at;
            const current = voiceSec >= p.at && voiceSec < p.end;
            const pop = spring({
              frame: frame - Math.round(p.at * fps),
              fps,
              config: SPRING_UI,
            });
            return (
              <div
                key={p.key}
                style={{
                  flex: 1,
                  background: current
                    ? "rgba(16,31,66,0.97)"
                    : "rgba(11,22,49,0.7)",
                  border: `2px solid ${active ? p.color : LLM_C.borderSubtle}`,
                  borderRadius: 20,
                  padding: "20px 26px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  opacity: active ? 1 : 0.4,
                  transform: `scale(${current ? 1.02 : interpolate(pop, [0, 1], [0.97, 1])})`,
                  boxShadow: current ? `0 0 34px ${p.color}44` : "none",
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 16,
                    background: active ? p.color : "rgba(148,163,184,0.2)",
                    color: LLM_C.bg,
                    fontFamily: LLM_MONO,
                    fontSize: 38,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: LLM_MONO,
                      fontSize: 28,
                      fontWeight: 800,
                      color: active ? p.color : LLM_C.textMuted,
                    }}
                  >
                    {p.key}
                  </div>
                  <div style={{ fontSize: 20, color: LLM_C.text, marginTop: 2 }}>
                    {p.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: LLM_MONO,
            fontSize: 24,
            fontWeight: 800,
            color: LLM_C.cyan,
            opacity: interpolate(voiceSec, [14.35, 15.2], [0.35, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Query • Key • Value → relevant tokens get higher attention weight
        </div>
      </div>
    </LlmSceneShell>
  );
};
