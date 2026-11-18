import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { SPRING_UI } from "../../shared/theme";
import { LLM_C, LLM_MONO } from "./narration";
import { LlmSceneShell, useLlmVoiceTime, useP } from "./LlmSceneShell";

// Generated token sequence, appearing one at a time. Starts at 5.8s when voice
// explains append-and-repeat; first token at 3.7s (voice: "predicts next token").
const GEN = [
  { t: " is", at: 3.8 },
  { t: " a", at: 5.9 },
  { t: " programming", at: 7.3 },
  { t: " language", at: 8.8 },
  { t: " for", at: 10.1 },
  { t: " the", at: 11.7 },
  { t: " web", at: 12.6 },
  { t: ".", at: 13.4 },
] as const;

const CANDIDATES: Record<string, [string, number][]> = {
  " is": [[" is", 0.62], [" was", 0.14], [" runs", 0.09]],
  " a": [[" a", 0.58], [" the", 0.2], [" an", 0.08]],
  " programming": [[" programming", 0.51], [" scripting", 0.22], [" popular", 0.1]],
  " language": [[" language", 0.74], [" tool", 0.07], [" model", 0.05]],
  " for": [[" for", 0.43], [" used", 0.3], [" that", 0.12]],
  " the": [[" the", 0.4], [" web", 0.28], [" building", 0.15]],
  " web": [[" web", 0.55], [" browser", 0.2], [" internet", 0.1]],
  ".": [[".", 0.66], [",", 0.15], [" and", 0.08]],
};

export const Scene6Prediction: React.FC = () => {
  const { fps } = useVideoConfig();
  const P = useP();
  const { frame, voiceSec, totalVoiceSec } = useLlmVoiceTime("scene6");

  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.985, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shown = GEN.filter((g) => voiceSec >= g.at);
  const last = shown[shown.length - 1];
  const phase =
    voiceSec < 3.65
      ? "WHOLE ANSWER ≠ ONE SHOT"
      : voiceSec < 5.8
        ? "PREDICT"
        : voiceSec < 11.6
          ? "APPEND → PREDICT AGAIN"
          : "COMPLETE ANSWER";

  return (
    <LlmSceneShell
      id="scene6"
      cameraStyle={{ transform: `scale(${camScale})` }}
      sfx={GEN.map((g) => ({ atSec: g.at, type: "pop" as const, volume: 0.16 }))}
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
        {/* Loop steps */}
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          {[
            { k: "PREDICT", from: 3.65, to: 5.8, c: LLM_C.cyan },
            { k: "APPEND", from: 5.8, to: 8.5, c: LLM_C.indigo },
            { k: "PREDICT AGAIN", from: 8.5, to: 11.6, c: LLM_C.emerald },
          ].map((s) => {
            const on = voiceSec >= s.from;
            const cur = voiceSec >= s.from && voiceSec < s.to;
            return (
              <div
                key={s.k}
                style={{
                  fontFamily: LLM_MONO,
                  fontSize: 22,
                  fontWeight: 800,
                  padding: "12px 34px",
                  borderRadius: 999,
                  color: on ? s.c : LLM_C.textDim,
                  border: `2px solid ${on ? s.c : LLM_C.borderSubtle}`,
                  background: cur ? `${s.c}22` : "rgba(11,22,49,0.7)",
                  boxShadow: cur ? `0 0 26px ${s.c}55` : "none",
                }}
              >
                {s.k}
              </div>
            );
          })}
        </div>

        {/* Generated sentence */}
        <div
          style={{
            flex: 1,
            background: "rgba(8, 16, 38, 0.92)",
            border: `1.5px solid ${LLM_C.border}`,
            borderRadius: 26,
            padding: "36px 52px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
            boxShadow: "0 28px 70px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              fontFamily: LLM_MONO,
              fontSize: 14,
              color: LLM_C.cyan,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            CONTEXT WINDOW · {phase}
          </div>
          <div
            style={{
              fontFamily: LLM_MONO,
              fontSize: P ? 72 : 66,
              fontWeight: 700,
              lineHeight: 1.3,
              color: LLM_C.text,
            }}
          >
            <span style={{ color: LLM_C.cyanSoft }}>JavaScript</span>
            {shown.map((g) => {
              const pop = spring({
                frame: frame - Math.round(g.at * fps),
                fps,
                config: SPRING_UI,
              });
              const isNew = g === last && voiceSec - g.at < 0.9;
              return (
                <span
                  key={g.at}
                  style={{
                    whiteSpace: "pre",
                    opacity: pop,
                    color: isNew ? LLM_C.cyan : LLM_C.text,
                    textShadow: isNew ? `0 0 24px ${LLM_C.cyan}` : "none",
                    display: "inline-block",
                    translate: `0px ${interpolate(pop, [0, 1], [14, 0])}px`,
                  }}
                >
                  {g.t}
                </span>
              );
            })}
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 60,
                marginLeft: 8,
                verticalAlign: "middle",
                background: LLM_C.cyan,
                opacity: Math.floor(frame / 12) % 2 === 0 ? 1 : 0.2,
              }}
            />
          </div>
        </div>

        {/* Candidate probabilities (illustrative) */}
        <div
          style={{
            display: "flex",
            flexDirection: P ? "column" : "row",
            alignItems: P ? "stretch" : "center",
            gap: P ? 12 : 24,
            background: "rgba(11,22,49,0.85)",
            border: `1px solid ${LLM_C.border}`,
            borderRadius: 18,
            padding: "16px 28px",
          }}
        >
          <div
            style={{
              fontFamily: LLM_MONO,
              fontSize: 14,
              fontWeight: 800,
              color: LLM_C.cyan,
              width: P ? "auto" : 260,
            }}
          >
            NEXT-TOKEN CANDIDATES
            <div style={{ color: LLM_C.textDim, fontSize: 11, marginTop: 2 }}>
              illustrative probabilities
            </div>
          </div>
          {(last ? CANDIDATES[last.t] : [])
            .map(([tok, p], i) => (
              <div
                key={tok + i}
                style={{
                  flex: 1,
                  background: "rgba(4,8,20,0.9)",
                  border: `1.5px solid ${i === 0 ? LLM_C.cyan : LLM_C.borderSubtle}`,
                  borderRadius: 12,
                  padding: "10px 16px",
                  fontFamily: LLM_MONO,
                  color: LLM_C.text,
                  fontSize: 20,
                  fontWeight: 700,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ whiteSpace: "pre" }}>{`"${tok.trim() || tok}"`}</span>
                <span style={{ color: i === 0 ? LLM_C.cyan : LLM_C.textMuted }}>
                  {Math.round(p * 100)}%
                </span>
              </div>
            ))}
        </div>
      </div>
    </LlmSceneShell>
  );
};
