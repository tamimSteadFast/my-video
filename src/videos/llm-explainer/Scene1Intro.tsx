import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { LLM_C, LLM_FONT, LLM_MONO } from "./narration";
import { LlmSceneShell, useLlmVoiceTime, useP } from "./LlmSceneShell";

const PROMPT_TEXT = "How do Large Language Models generate intelligent answers?";
const RESPONSE_TEXT =
  "An LLM processes input text as tokens, maps them to numerical embeddings, and uses Transformer self-attention layers to predict the most likely next token step by step.";

const LAYERS = [3, 5, 5, 3];

export const Scene1Intro: React.FC = () => {
  const { fps } = useVideoConfig();
  const P = useP();
  const { frame, voiceSec, totalVoiceSec } = useLlmVoiceTime("scene1");

  // Camera: Slow cinematic zoom toward the computer screen
  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.97, 1.045], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camX = interpolate(voiceSec, [0, totalVoiceSec], [0, 14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phrase 1 (0.15s - 2.7s): User types question into computer
  const typedChars = Math.floor(
    interpolate(voiceSec, [0.25, 2.35], [0, PROMPT_TEXT.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  // Phrase 2 (2.7s - 5.85s): Particles travel into neural network & response streams back
  const forwardActive = interpolate(voiceSec, [2.2, 3.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const returnActive = interpolate(voiceSec, [3.4, 5.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const respChars = Math.floor(
    interpolate(voiceSec, [3.5, 6.2], [0, RESPONSE_TEXT.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  // Phrase 3 (5.85s - 10.3s): "Large Language Model (LLM)" badge illuminates
  const llmBadgePop = spring({
    frame: frame - Math.round(5.9 * fps),
    fps,
    config: SPRING_UI,
  });

  // Phrase 4 (10.3s - 13.64s): "How Do Large Language Models Work?" hero banner
  const heroPop = spring({
    frame: frame - Math.round(10.2 * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  return (
    <LlmSceneShell
      id="scene1"
      cameraStyle={{
        transform: `scale(${camScale}) translate3d(${camX}px, 0px, 0px)`,
      }}
      sfx={[
        { atSec: 0.4, type: "click", volume: 0.22 },
        { atSec: 2.75, type: "whoosh", volume: 0.22 },
        { atSec: 5.9, type: "pop", volume: 0.26 },
        { atSec: 10.3, type: "chime", volume: 0.24 },
      ]}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: P ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: P ? 12 : 36,
        }}
      >
        {/* LEFT: Computer Terminal / Chat Interface */}
        <div
          style={{
            width: P ? "100%" : 780,
            height: P ? 540 : 620,
            boxSizing: "border-box",
            background: "rgba(11, 22, 49, 0.88)",
            border: `1.5px solid ${LLM_C.border}`,
            borderRadius: 24,
            boxShadow:
              "0 28px 70px rgba(0, 0, 0, 0.65), 0 0 40px rgba(0, 229, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          {/* Window Chrome */}
          <div
            style={{
              height: 54,
              background: "rgba(4, 8, 20, 0.9)",
              borderBottom: `1px solid ${LLM_C.borderSubtle}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 22px",
            }}
          >
            <div style={{ display: "flex", gap: 9 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 99,
                  background: "#EF4444",
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 99,
                  background: "#F59E0B",
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 99,
                  background: "#10B981",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 15,
                color: LLM_C.cyan,
                letterSpacing: 0.5,
              }}
            >
              ai-assistant://chat-interface
            </div>
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 13,
                color: LLM_C.emerald,
              }}
            >
              ● ONLINE
            </div>
          </div>

          {/* Chat Content */}
          <div
            style={{
              flex: 1,
              padding: "30px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 26,
            }}
          >
            {/* User Prompt Box */}
            <div
              style={{
                alignSelf: "flex-end",
                width: "92%",
                background: "rgba(16, 31, 66, 0.95)",
                border: `1px solid rgba(56, 189, 248, 0.4)`,
                borderRadius: "20px 20px 6px 20px",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  fontFamily: LLM_MONO,
                  fontSize: 13,
                  color: LLM_C.cyanSoft,
                  fontWeight: 700,
                }}
              >
                <span>USER PROMPT</span>
                <span>INPUT STREAM</span>
              </div>
              <div
                style={{
                  fontFamily: LLM_FONT,
                  fontSize: 24,
                  fontWeight: 600,
                  color: LLM_C.text,
                  lineHeight: 1.4,
                  minHeight: 68,
                }}
              >
                {PROMPT_TEXT.slice(0, typedChars)}
                {voiceSec < 2.6 ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 24,
                      background: LLM_C.cyan,
                      marginLeft: 4,
                      verticalAlign: "middle",
                    }}
                  />
                ) : null}
              </div>
            </div>

            {/* AI Generated Response Box */}
            <div
              style={{
                alignSelf: "flex-start",
                width: "96%",
                background: "rgba(4, 12, 30, 0.92)",
                border: `1.5px solid ${voiceSec >= 3.4 ? LLM_C.cyan : LLM_C.borderSubtle}`,
                borderRadius: "20px 20px 20px 6px",
                padding: "22px 26px",
                opacity: interpolate(voiceSec, [3.1, 3.6], [0.25, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                boxShadow:
                  voiceSec >= 3.4
                    ? "0 0 32px rgba(0, 229, 255, 0.14)"
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: LLM_MONO,
                    fontSize: 14,
                    color: LLM_C.cyan,
                    fontWeight: 700,
                  }}
                >
                  <span>✦ GENERATED RESPONSE</span>
                </div>
                <div
                  style={{
                    fontFamily: LLM_MONO,
                    fontSize: 12,
                    color: LLM_C.emerald,
                    background: "rgba(16, 185, 129, 0.14)",
                    padding: "3px 10px",
                    borderRadius: 6,
                  }}
                >
                  {voiceSec >= 3.5 ? "STREAMING TOKENS" : "WAITING"}
                </div>
              </div>

              <div
                style={{
                  fontFamily: LLM_FONT,
                  fontSize: 22,
                  color: LLM_C.text,
                  lineHeight: 1.5,
                  minHeight: 136,
                }}
              >
                {RESPONSE_TEXT.slice(0, respChars)}
                {voiceSec >= 3.5 && voiceSec < 6.5 ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 22,
                      background: LLM_C.cyan,
                      marginLeft: 5,
                      verticalAlign: "middle",
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* CENTER: Traveling Text Particles (Input -> Network -> Response) */}
        <svg
          width={240}
          height={620}
          viewBox="0 0 240 620"
          style={{ overflow: "visible", zIndex: 15, display: P ? "none" : "block" }}
        >
          {/* Top Path: User Prompt -> Neural Network */}
          <path
            d="M -10 190 C 80 190, 140 230, 250 250"
            fill="none"
            stroke="rgba(0, 229, 255, 0.35)"
            strokeWidth={3}
            strokeDasharray="8 8"
          />
          {/* Traveling Forward Particles */}
          {[0, 0.25, 0.5, 0.75].map((offset, idx) => {
            const prog = (frame / 36 + offset) % 1;
            const x = interpolate(prog, [0, 1], [-10, 250]);
            const y = interpolate(prog, [0, 1], [190, 250]);
            return (
              <g key={`fwd-${idx}`} opacity={forwardActive}>
                <circle
                  cx={x}
                  cy={y}
                  r={7}
                  fill={LLM_C.cyan}
                  style={{ filter: "drop-shadow(0 0 10px #00E5FF)" }}
                />
                <rect
                  x={x - 22}
                  y={y - 26}
                  width={44}
                  height={16}
                  rx={4}
                  fill="rgba(4, 8, 20, 0.9)"
                  stroke={LLM_C.cyan}
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={y - 14}
                  textAnchor="middle"
                  fill={LLM_C.cyan}
                  fontSize={9}
                  fontFamily={LLM_MONO}
                  fontWeight={700}
                >
                  TOKEN
                </text>
              </g>
            );
          })}

          {/* Bottom Path: Neural Network -> Generated Response */}
          <path
            d="M 250 390 C 140 410, 80 430, -10 430"
            fill="none"
            stroke="rgba(16, 185, 129, 0.4)"
            strokeWidth={3}
            strokeDasharray="8 8"
          />
          {/* Traveling Return Particles */}
          {[0, 0.33, 0.66].map((offset, idx) => {
            const prog = (frame / 34 + offset) % 1;
            const x = interpolate(prog, [0, 1], [250, -10]);
            const y = interpolate(prog, [0, 1], [390, 430]);
            return (
              <g key={`ret-${idx}`} opacity={returnActive}>
                <circle
                  cx={x}
                  cy={y}
                  r={7}
                  fill={LLM_C.emerald}
                  style={{ filter: "drop-shadow(0 0 10px #10B981)" }}
                />
                <rect
                  x={x - 24}
                  y={y + 12}
                  width={48}
                  height={16}
                  rx={4}
                  fill="rgba(4, 8, 20, 0.9)"
                  stroke={LLM_C.emerald}
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={y + 23}
                  textAnchor="middle"
                  fill={LLM_C.emerald}
                  fontSize={9}
                  fontFamily={LLM_MONO}
                  fontWeight={700}
                >
                  OUTPUT
                </text>
              </g>
            );
          })}
        </svg>

        {P ? (
          <div
            style={{
              height: 110,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontFamily: LLM_MONO,
              fontSize: 18,
              fontWeight: 700,
              color: returnActive > 0.2 ? LLM_C.emerald : LLM_C.cyan,
              opacity: Math.max(forwardActive, 0.25),
            }}
          >
            {[0, 1, 2].map((k) => (
              <span
                key={k}
                style={{
                  opacity: 0.35 + 0.65 * Math.max(0, Math.sin(frame / 5 - k * 1.2)),
                }}
              >
                {returnActive > 0.2 ? "▲ OUTPUT TOKENS" : "▼ INPUT TOKENS"}
              </span>
            ))}
          </div>
        ) : null}

        {/* RIGHT: Glowing Neural Network Visualization */}
        <div
          style={{
            width: P ? "100%" : 740,
            height: P ? 660 : 620,
            boxSizing: "border-box",
            background: "rgba(8, 16, 38, 0.86)",
            border: `1.5px solid ${LLM_C.border}`,
            borderRadius: 24,
            padding: "26px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            boxShadow:
              "0 28px 70px rgba(0, 0, 0, 0.65), inset 0 0 60px rgba(0, 229, 255, 0.06)",
          }}
        >
          {/* Top Header */}
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
                  color: LLM_C.cyan,
                  letterSpacing: 1.2,
                  fontWeight: 700,
                }}
              >
                NEURAL ARCHITECTURE CORE
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: LLM_C.text,
                  marginTop: 2,
                }}
              >
                Large Language Model (LLM)
              </div>
            </div>

            {/* LLM Badge popping at 5.85s when voice says "Large Language Model, সংক্ষেপে LLM" */}
            <div
              style={{
                transform: `scale(${interpolate(llmBadgePop, [0, 1], [0.7, 1])})`,
                opacity: llmBadgePop,
                background:
                  "linear-gradient(135deg, rgba(0, 229, 255, 0.25), rgba(99, 102, 241, 0.25))",
                border: `1.5px solid ${LLM_C.cyan}`,
                borderRadius: 14,
                padding: "10px 22px",
                fontFamily: LLM_MONO,
                fontSize: 26,
                fontWeight: 800,
                color: LLM_C.cyan,
                boxShadow: "0 0 30px rgba(0, 229, 255, 0.3)",
              }}
            >
              LLM
            </div>
          </div>

          {/* Interactive Neural Graph SVG */}
          <svg
            width={676}
            height={380}
            viewBox="0 0 676 380"
            style={{ alignSelf: "center" }}
          >
            {/* Synaptic Connections */}
            {LAYERS.map((countA, lIdx) => {
              if (lIdx === LAYERS.length - 1) return null;
              const countB = LAYERS[lIdx + 1];
              const x1 = 95 + lIdx * 162;
              const x2 = 95 + (lIdx + 1) * 162;
              const lines: React.ReactNode[] = [];

              for (let i = 0; i < countA; i++) {
                const y1 = (380 / (countA + 1)) * (i + 1);
                for (let j = 0; j < countB; j++) {
                  const y2 = (380 / (countB + 1)) * (j + 1);
                  const wave =
                    0.35 +
                    0.65 *
                      Math.max(
                        0,
                        Math.sin(frame / 10 - lIdx * 1.1 + (i + j) * 0.7),
                      );
                  lines.push(
                    <line
                      key={`c-${lIdx}-${i}-${j}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={lIdx === 1 ? LLM_C.cyan : LLM_C.cyanSoft}
                      strokeWidth={1.2 + wave * 1.6}
                      strokeOpacity={0.14 + wave * 0.45 * forwardActive}
                    />,
                  );
                }
              }
              return <g key={`layer-lines-${lIdx}`}>{lines}</g>;
            })}

            {/* Nodes */}
            {LAYERS.map((count, lIdx) => {
              const x = 95 + lIdx * 162;
              return Array.from({ length: count }).map((_, nIdx) => {
                const y = (380 / (count + 1)) * (nIdx + 1);
                const pulse =
                  0.6 +
                  0.4 * Math.sin(frame / 12 - lIdx * 0.9 + nIdx * 0.8);
                return (
                  <g key={`node-${lIdx}-${nIdx}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={20}
                      fill="rgba(0, 229, 255, 0.12)"
                      opacity={pulse}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={11}
                      fill={LLM_C.panelElevated}
                      stroke={LLM_C.cyan}
                      strokeWidth={2.5}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={4.5}
                      fill={LLM_C.cyan}
                      opacity={pulse}
                    />
                  </g>
                );
              });
            })}
          </svg>

          {/* Bottom Question Banner */}
          <div
            style={{
              transform: `translateY(${interpolate(heroPop, [0, 1], [16, 0])}px)`,
              opacity: Math.max(0.35, heroPop),
              background: "rgba(4, 8, 20, 0.9)",
              border: `1px solid ${heroPop > 0.1 ? LLM_C.cyan : LLM_C.borderSubtle}`,
              borderRadius: 16,
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 20,
                fontWeight: 700,
                color: LLM_C.cyan,
              }}
            >
              How Do Large Language Models Work?
            </div>
            <div
              style={{
                display: P ? "none" : "block",
                fontFamily: LLM_FONT,
                fontSize: 18,
                color: LLM_C.textMuted,
                fontWeight: 600,
              }}
            >
              চলুন ধাপে ধাপে জেনে নিই →
            </div>
          </div>
        </div>
      </div>
    </LlmSceneShell>
  );
};
