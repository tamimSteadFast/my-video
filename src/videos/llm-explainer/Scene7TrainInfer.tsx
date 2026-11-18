import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { SPRING_UI } from "../../shared/theme";
import { LLM_C, LLM_MONO } from "./narration";
import { LlmSceneShell, useLlmVoiceTime, useP } from "./LlmSceneShell";

const Panel: React.FC<{
  readonly color: string;
  readonly tag: string;
  readonly title: string;
  readonly active: boolean;
  readonly children: React.ReactNode;
}> = ({ color, tag, title, active, children }) => {
  const P = useP();
  return (
  <div
    style={{
      flex: 1,
      height: P ? 580 : 600,
      boxSizing: "border-box",
      background: "rgba(8,16,38,0.92)",
      border: `2px solid ${active ? color : LLM_C.borderSubtle}`,
      borderRadius: 24,
      padding: "26px 30px",
      display: "flex",
      flexDirection: "column",
      gap: 18,
      boxShadow: active ? `0 0 40px ${color}33` : "none",
      opacity: active ? 1 : 0.55,
    }}
  >
    <div>
      <div
        style={{
          fontFamily: LLM_MONO,
          fontSize: 13,
          color,
          fontWeight: 800,
          letterSpacing: 1,
        }}
      >
        {tag}
      </div>
      <div style={{ fontSize: 34, fontWeight: 800, color: LLM_C.text }}>
        {title}
      </div>
    </div>
    {children}
  </div>
  );
};

const WEIGHTS = [
  [0.2, -0.5, 0.8, 0.1],
  [-0.3, 0.7, 0.4, -0.6],
  [0.9, 0.0, -0.2, 0.5],
];

export const Scene7TrainInfer: React.FC = () => {
  const { fps } = useVideoConfig();
  const P = useP();
  const { frame, voiceSec } = useLlmVoiceTime("scene7");

  const trainActive = voiceSec < 4.9 || voiceSec >= 10.5;
  const inferActive = voiceSec >= 4.9;
  const frozen = voiceSec >= 4.9;
  const inferIn = spring({
    frame: frame - Math.round(4.9 * fps),
    fps,
    config: SPRING_UI,
  });
  const notEqual = spring({
    frame: frame - Math.round(10.55 * fps),
    fps,
    config: SPRING_UI,
  });

  const gen = ["JavaScript", "is", "widely", "used", "on", "the", "web"];
  const genCount = Math.floor(
    interpolate(voiceSec, [5.6, 10.2], [0, gen.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <LlmSceneShell
      id="scene7"
      sfx={[
        { atSec: 0.4, type: "pop", volume: 0.2 },
        { atSec: 4.95, type: "whoosh", volume: 0.24 },
        { atSec: 10.6, type: "chime", volume: 0.26 },
      ]}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", flexDirection: P ? "column" : "row", gap: 28, alignItems: "stretch" }}>
          <Panel
            color={LLM_C.amber}
            tag="PHASE 1 · LEARNING"
            title="Training"
            active={trainActive && voiceSec < 10.5 ? voiceSec < 4.9 : true}
          >
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 16,
                color: LLM_C.textMuted,
              }}
            >
              TRAINING DATA → MODEL → LOSS → UPDATE WEIGHTS
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 10,
              }}
            >
              {WEIGHTS.flatMap((row, r) =>
                row.map((w, c) => {
                  const live = voiceSec < 4.9;
                  const delta = live
                    ? Math.sin(frame / 8 + r * 2 + c) * 0.25
                    : 0;
                  const v = w + delta;
                  const flash = live && Math.abs(delta) > 0.2;
                  return (
                    <div
                      key={`${r}-${c}`}
                      style={{
                        fontFamily: LLM_MONO,
                        fontSize: 22,
                        fontWeight: 700,
                        textAlign: "center",
                        padding: "14px 0",
                        borderRadius: 10,
                        background: "rgba(4,8,20,0.9)",
                        border: `1.5px solid ${flash ? LLM_C.amber : LLM_C.borderSubtle}`,
                        color: flash ? LLM_C.amber : LLM_C.text,
                      }}
                    >
                      {v >= 0 ? "+" : ""}
                      {v.toFixed(2)}
                    </div>
                  );
                }),
              )}
            </div>
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 20,
                fontWeight: 800,
                color: voiceSec < 4.9 ? LLM_C.amber : LLM_C.emerald,
              }}
            >
              {voiceSec < 4.9
                ? "▲ WEIGHTS UPDATING (learning from data)"
                : "■ WEIGHTS FROZEN (saved after training)"}
            </div>
          </Panel>

          <Panel
            color={LLM_C.cyan}
            tag="PHASE 2 · USING THE MODEL"
            title="Inference"
            active={inferActive}
          >
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 16,
                color: LLM_C.textMuted,
              }}
            >
              USER PROMPT → FROZEN WEIGHTS → GENERATED TOKENS
            </div>
            <div
              style={{
                background: "rgba(16,31,66,0.95)",
                border: `1px solid ${LLM_C.cyanSoft}66`,
                borderRadius: 14,
                padding: "14px 20px",
                fontSize: 22,
                color: LLM_C.text,
                opacity: inferIn,
              }}
            >
              <span style={{ fontFamily: LLM_MONO, color: LLM_C.cyanSoft }}>
                USER ›{" "}
              </span>
              What is JavaScript?
            </div>
            <div
              style={{
                background: "rgba(4,8,20,0.92)",
                border: `1.5px solid ${LLM_C.cyan}`,
                borderRadius: 14,
                padding: "16px 20px",
                minHeight: 120,
                fontFamily: LLM_MONO,
                fontSize: 24,
                fontWeight: 700,
                color: LLM_C.text,
                opacity: inferIn,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignContent: "flex-start",
              }}
            >
              {gen.slice(0, genCount).map((g) => (
                <span
                  key={g}
                  style={{
                    background: "rgba(0,229,255,0.14)",
                    border: `1px solid ${LLM_C.cyan}`,
                    borderRadius: 8,
                    padding: "2px 10px",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 20,
                fontWeight: 800,
                color: frozen ? LLM_C.emerald : LLM_C.textDim,
              }}
            >
              ■ USES PREVIOUSLY LEARNED WEIGHTS
            </div>
          </Panel>
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: LLM_MONO,
            fontSize: 44,
            fontWeight: 800,
            color: LLM_C.cyan,
            opacity: Math.max(0.25, notEqual),
            textShadow: notEqual > 0.5 ? `0 0 28px ${LLM_C.cyan}` : "none",
            transform: `scale(${interpolate(notEqual, [0, 1], [0.95, 1])})`,
          }}
        >
          Training ≠ Inference
        </div>
      </div>
    </LlmSceneShell>
  );
};
