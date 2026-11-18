import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { LLM_C, LLM_MONO } from "./narration";
import { LlmSceneShell, useLlmVoiceTime, useP } from "./LlmSceneShell";

// Indicators light up in step with the narration. No real model metrics are
// shown: every panel is a labelled placeholder/schematic.
const CARDS = [
  { k: "Token Cost", sub: "tokens in / out per request", at: 4.5, c: LLM_C.cyan },
  { k: "Context Window", sub: "how much fits in the prompt", at: 6.2, c: LLM_C.cyanSoft },
  { k: "Latency", sub: "time to first token / total", at: 7.6, c: LLM_C.indigo },
  { k: "Hallucination", sub: "unsupported answers monitor", at: 8.6, c: LLM_C.rose },
  { k: "Response Quality", sub: "evaluation & feedback", at: 10.0, c: LLM_C.emerald },
] as const;

const Spark: React.FC<{ readonly color: string; readonly seed: number; readonly reveal: number }> = ({
  color,
  seed,
  reveal,
}) => {
  const pts = Array.from({ length: 16 }).map((_, i) => {
    const y = 34 - (Math.sin(i * 0.8 + seed) * 0.5 + 0.5) * 24 - i * 0.4;
    return `${i * 16},${y.toFixed(1)}`;
  });
  return (
    <svg width={240} height={44} viewBox="0 0 240 44" style={{ opacity: reveal }}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={3} />
    </svg>
  );
};

export const Scene8Engineering: React.FC = () => {
  const { fps } = useVideoConfig();
  const P = useP();
  const { frame, voiceSec, totalVoiceSec } = useLlmVoiceTime("scene8");

  // Slow zoom OUT to reveal the whole dashboard.
  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [1.1, 0.985], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sysIn = spring({
    frame: frame - Math.round(12.6 * fps),
    fps,
    config: SPRING_HEADLINE,
  });
  const finalIn = spring({
    frame: frame - Math.round(15.65 * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  return (
    <LlmSceneShell
      id="scene8"
      cameraStyle={{ transform: `scale(${camScale})` }}
      sfx={[
        ...CARDS.map((c) => ({ atSec: c.at, type: "click" as const, volume: 0.2 })),
        { atSec: 12.65, type: "whoosh", volume: 0.22 },
        { atSec: 15.7, type: "chime", volume: 0.28 },
      ]}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 18,
        }}
      >
        <div
          style={{
            background: "rgba(8,16,38,0.92)",
            border: `1.5px solid ${LLM_C.border}`,
            borderRadius: 24,
            padding: "22px 30px",
            boxShadow: "0 28px 70px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: LLM_MONO,
                  fontSize: 13,
                  fontWeight: 700,
                  color: LLM_C.cyan,
                  letterSpacing: 1,
                }}
              >
                LLM APPLICATION MONITORING DASHBOARD
              </div>
              <div style={{ fontSize: 26, fontWeight: 800 }}>
                AI Engineer View · Schematic
              </div>
            </div>
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 14,
                color: LLM_C.textMuted,
              }}
            >
              placeholder charts · no real model metrics
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: P ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: 16 }}>
            {CARDS.map((c, i) => {
              const on = voiceSec >= c.at;
              const cur = on && voiceSec < c.at + 1.6;
              const pop = spring({
                frame: frame - Math.round(c.at * fps),
                fps,
                config: SPRING_UI,
              });
              return (
                <div
                  key={c.k}
                  style={{
                    background: cur ? "rgba(16,31,66,0.97)" : "rgba(11,22,49,0.75)",
                    border: `2px solid ${on ? c.c : LLM_C.borderSubtle}`,
                    borderRadius: 18,
                    padding: "18px 18px",
                    opacity: on ? 1 : 0.38,
                    boxShadow: cur ? `0 0 30px ${c.c}44` : "none",
                    transform: `scale(${interpolate(pop, [0, 1], [0.96, 1])})`,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 99,
                      background: on ? c.c : LLM_C.textDim,
                      boxShadow: on ? `0 0 12px ${c.c}` : "none",
                    }}
                  />
                  <div style={{ fontSize: 24, fontWeight: 800, marginTop: 10 }}>
                    {c.k}
                  </div>
                  <div style={{ fontSize: 14, color: LLM_C.textMuted, minHeight: 36 }}>
                    {c.sub}
                  </div>
                  <Spark color={c.c} seed={i * 1.7} reveal={on ? 1 : 0} />
                </div>
              );
            })}
          </div>
        </div>

        {/* System pipeline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            rowGap: 12,
            gap: 16,
            opacity: sysIn,
            transform: `translateY(${interpolate(sysIn, [0, 1], [16, 0])}px)`,
          }}
        >
          {["User", "Prompt / Context", "LLM", "Tools & Data", "Monitoring"].map(
            (n, i, a) => (
              <React.Fragment key={n}>
                <div
                  style={{
                    fontFamily: LLM_MONO,
                    fontSize: 20,
                    fontWeight: 700,
                    padding: "12px 24px",
                    borderRadius: 12,
                    background: "rgba(16,31,66,0.95)",
                    border: `1.5px solid ${n === "LLM" ? LLM_C.cyan : LLM_C.borderSubtle}`,
                    color: n === "LLM" ? LLM_C.cyan : LLM_C.text,
                  }}
                >
                  {n}
                </div>
                {i < a.length - 1 && !P ? (
                  <span style={{ color: LLM_C.cyan, fontSize: 24 }}>→</span>
                ) : null}
              </React.Fragment>
            ),
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: P ? 56 : 48,
            fontWeight: 800,
            opacity: finalIn,
            transform: `scale(${interpolate(finalIn, [0, 1], [0.96, 1])})`,
            color: LLM_C.text,
            textShadow: `0 0 30px ${LLM_C.cyan}66`,
          }}
        >
          <span style={{ color: LLM_C.cyan }}>Understand the Model.</span>{" "}
          Engineer the System.
        </div>
      </div>
    </LlmSceneShell>
  );
};
