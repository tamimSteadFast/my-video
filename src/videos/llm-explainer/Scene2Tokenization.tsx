import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { LLM_C, LLM_FONT, LLM_MONO } from "./narration";
import { LlmSceneShell, useLlmVoiceTime, useP } from "./LlmSceneShell";

const TOKENS = [
  { text: "Large", id: 13842, color: "#00E5FF" },
  { text: " Language", id: 11688, color: "#38BDF8" },
  { text: " Models", id: 27915, color: "#6366F1" },
  { text: " understand", id: 3619, color: "#10B981" },
  { text: " context", id: 2317, color: "#F59E0B" },
  { text: ".", id: 13, color: "#F43F5E" },
] as const;

export const Scene2Tokenization: React.FC = () => {
  const { fps } = useVideoConfig();
  const P = useP();
  const { frame, voiceSec, totalVoiceSec } = useLlmVoiceTime("scene2");

  // Camera: Close-up on the sentence and its segmented tokens
  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.98, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Step 1 (0.15s - 4.15s): Raw sentence splits into smaller text segments
  const splitProgress = spring({
    frame: frame - Math.round(1.9 * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  // Step 2 (4.15s - 6.4s): "এই অংশগুলোকে বলা হয় Token" -> Token badges pop
  const tokenLabelPop = spring({
    frame: frame - Math.round(4.15 * fps),
    fps,
    config: SPRING_UI,
  });

  // Step 3 (6.4s - 10.2s): "Process-এর নাম Tokenization" -> Pipeline stage 2 highlights
  const processPop = spring({
    frame: frame - Math.round(6.4 * fps),
    fps,
    config: SPRING_UI,
  });

  // Step 4 (10.2s - 13.8s): "প্রতিটি Token-এর সঙ্গে একটি Numeric ID যুক্ত থাকে" -> IDs appear sequentially
  const idBaseSec = 10.1;

  return (
    <LlmSceneShell
      id="scene2"
      cameraStyle={{ transform: `scale(${camScale})` }}
      sfx={[
        { atSec: 2.0, type: "click", volume: 0.25 },
        { atSec: 4.2, type: "pop", volume: 0.25 },
        { atSec: 6.5, type: "whoosh", volume: 0.22 },
        { atSec: 10.25, type: "chime", volume: 0.25 },
      ]}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "12px 0",
        }}
      >
        {/* TOP: 3-Stage Pipeline Indicator (Text -> Tokens -> Token IDs) */}
        <div
          style={{
            display: "flex",
            flexDirection: P ? "column" : "row",
            alignItems: P ? "stretch" : "center",
            justifyContent: "center",
            gap: P ? 10 : 24,
          }}
        >
          {[
            {
              step: "01",
              label: "RAW TEXT",
              sub: "Input Sentence",
              active: voiceSec >= 0.1,
            },
            {
              step: "02",
              label: "TOKENIZATION",
              sub: "Subword / Word Segments",
              active: voiceSec >= 4.1,
            },
            {
              step: "03",
              label: "TOKEN IDs",
              sub: "Vocabulary Lookup Integers",
              active: voiceSec >= 10.1,
            },
          ].map((item, idx) => (
            <React.Fragment key={item.step}>
              <div
                style={{
                  width: P ? "100%" : 380,
                  boxSizing: "border-box",
                  background: item.active
                    ? "rgba(0, 229, 255, 0.12)"
                    : "rgba(11, 22, 49, 0.7)",
                  border: `1.5px solid ${item.active ? LLM_C.cyan : LLM_C.borderSubtle}`,
                  borderRadius: 16,
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  boxShadow: item.active
                    ? "0 0 28px rgba(0, 229, 255, 0.15)"
                    : "none",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: item.active
                      ? LLM_C.cyan
                      : "rgba(148, 163, 184, 0.15)",
                    color: item.active ? LLM_C.bg : LLM_C.textMuted,
                    fontFamily: LLM_MONO,
                    fontSize: 18,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: LLM_MONO,
                      fontSize: 18,
                      fontWeight: 800,
                      color: item.active ? LLM_C.cyan : LLM_C.textMuted,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: LLM_C.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {item.sub}
                  </div>
                </div>
              </div>
              {idx < 2 ? (
                <div
                  style={{
                    display: P ? "none" : "block",
                    fontFamily: LLM_MONO,
                    fontSize: 28,
                    color: LLM_C.cyan,
                    fontWeight: 800,
                  }}
                >
                  →
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>

        {/* CENTER: Sentence Breaking Into Token Blocks + Numerical Token IDs */}
        <div
          style={{
            background: "rgba(8, 16, 38, 0.88)",
            border: `1.5px solid ${LLM_C.border}`,
            borderRadius: 28,
            padding: P ? "28px 24px" : "42px 46px",
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            boxShadow: "0 30px 75px rgba(0, 0, 0, 0.65)",
          }}
        >
          {/* Raw Input Header & Tokenization Status */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: P ? "column" : "row",
              alignItems: P ? "flex-start" : "center",
              gap: P ? 12 : 0,
              justifyContent: "space-between",
              borderBottom: `1px solid ${LLM_C.borderSubtle}`,
              paddingBottom: 18,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  fontFamily: LLM_MONO,
                  fontSize: 14,
                  color: LLM_C.cyan,
                  background: "rgba(0, 229, 255, 0.12)",
                  padding: "5px 12px",
                  borderRadius: 6,
                  fontWeight: 700,
                }}
              >
                INPUT STRING
              </span>
              <span
                style={{
                  fontFamily: LLM_MONO,
                  fontSize: 20,
                  color: LLM_C.text,
                }}
              >
                &quot;Large Language Models understand context.&quot;
              </span>
            </div>

            <div
              style={{
                opacity: Math.max(0.3, processPop),
                transform: `scale(${interpolate(processPop, [0, 1], [0.9, 1])})`,
                fontFamily: LLM_MONO,
                fontSize: 15,
                color: LLM_C.emerald,
                background: "rgba(16, 185, 129, 0.12)",
                border: `1px solid ${LLM_C.emerald}`,
                padding: "6px 16px",
                borderRadius: 999,
                fontWeight: 700,
              }}
            >
              PROCESS: TOKENIZATION (6 TOKENS)
            </div>
          </div>

          {/* Segmented Token Blocks Row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexWrap: P ? "wrap" : "nowrap",
              rowGap: P ? 8 : 0,
              gap: interpolate(splitProgress, [0, 1], [2, 14]),
              marginTop: 8,
            }}
          >
            {TOKENS.map((tok, i) => {
              const idPop = spring({
                frame: frame - Math.round((idBaseSec + i * 0.28) * fps),
                fps,
                config: SPRING_UI,
              });

              return (
                <div
                  key={tok.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: interpolate(splitProgress, [0, 1], P ? [270, 280] : [200, 240]),
                  }}
                >
                  {/* Top "TOKEN #i" micro-badge */}
                  <div
                    style={{
                      opacity: tokenLabelPop,
                      transform: `translateY(${interpolate(tokenLabelPop, [0, 1], [10, 0])}px)`,
                      fontFamily: LLM_MONO,
                      fontSize: 13,
                      fontWeight: 700,
                      color: tok.color,
                      marginBottom: 10,
                      letterSpacing: 1,
                    }}
                  >
                    TOKEN #{i + 1}
                  </div>

                  {/* Token Text Segment Card */}
                  <div
                    style={{
                      width: "100%",
                      height: 96,
                      background:
                        splitProgress > 0.2
                          ? "rgba(16, 31, 66, 0.95)"
                          : "rgba(11, 22, 49, 0.6)",
                      border: `2px solid ${splitProgress > 0.2 ? tok.color : "rgba(148,163,184,0.25)"}`,
                      borderRadius: interpolate(splitProgress, [0, 1], [6, 18]),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: LLM_MONO,
                      fontSize: 30,
                      fontWeight: 700,
                      color: LLM_C.text,
                      boxShadow:
                        splitProgress > 0.5
                          ? `0 14px 32px rgba(0,0,0,0.45), 0 0 22px ${tok.color}28`
                          : "none",
                    }}
                  >
                    <span
                      style={{
                        background:
                          tok.text.startsWith(" ") && splitProgress > 0.5
                            ? "rgba(255,255,255,0.06)"
                            : "transparent",
                        padding: "2px 8px",
                        borderRadius: 6,
                      }}
                    >
                      {tok.text}
                    </span>
                  </div>

                  {/* Connector Arrow Down to Token ID */}
                  <div
                    style={{
                      height: 46,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: idPop,
                    }}
                  >
                    <div
                      style={{
                        width: 2,
                        height: 26,
                        background: tok.color,
                      }}
                    />
                    <div
                      style={{
                        color: tok.color,
                        fontSize: 16,
                        lineHeight: 1,
                      }}
                    >
                      ▼
                    </div>
                  </div>

                  {/* Numerical Token ID Block */}
                  <div
                    style={{
                      width: "100%",
                      height: 78,
                      opacity: idPop,
                      transform: `translateY(${interpolate(idPop, [0, 1], [-16, 0])}px) scale(${interpolate(idPop, [0, 1], [0.88, 1])})`,
                      background: "rgba(4, 8, 20, 0.95)",
                      border: `1.5px solid ${tok.color}`,
                      borderRadius: 14,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 10px 26px rgba(0,0,0,0.5), inset 0 0 18px ${tok.color}22`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: LLM_MONO,
                        fontSize: 11,
                        color: LLM_C.textMuted,
                        letterSpacing: 1,
                      }}
                    >
                      NUMERIC TOKEN ID
                    </div>
                    <div
                      style={{
                        fontFamily: LLM_MONO,
                        fontSize: 28,
                        fontWeight: 800,
                        color: tok.color,
                        marginTop: 2,
                      }}
                    >
                      {tok.id}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM: Resulting Integer Array Summary */}
        <div
          style={{
            background: "rgba(11, 22, 49, 0.85)",
            border: `1px solid ${LLM_C.border}`,
            borderRadius: 18,
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: P ? "column" : "row",
            gap: P ? 10 : 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: LLM_MONO,
                fontSize: 15,
                fontWeight: 700,
                color: LLM_C.cyan,
              }}
            >
              TOKEN ID SEQUENCE:
            </span>
            <span
              style={{
                fontFamily: LLM_MONO,
                fontSize: 21,
                fontWeight: 700,
                color: LLM_C.text,
              }}
            >
              [ 13842, 11688, 27915, 3619, 2317, 13 ]
            </span>
          </div>
          <div
            style={{
              fontFamily: LLM_FONT,
              fontSize: 18,
              color: LLM_C.textMuted,
              fontWeight: 600,
            }}
          >
            Text → Tokens → Numeric IDs
          </div>
        </div>
      </div>
    </LlmSceneShell>
  );
};
