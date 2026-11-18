import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { LLM_C, LLM_MONO } from "./narration";
import { LlmSceneShell, useLlmVoiceTime, useP } from "./LlmSceneShell";

const ARCH_BLOCKS = [
  {
    id: "embed",
    step: "STAGE 01",
    title: "Input Embeddings + Positional Encoding",
    sub: "Token Vectors + Sequence Order Representation",
    color: "#38BDF8",
    activeAt: 0.3,
  },
  {
    id: "attn",
    step: "STAGE 02 · CORE",
    title: "Masked Multi-Head Self-Attention",
    sub: "Causal Context Relationships Across Preceding Tokens",
    color: "#00E5FF",
    activeAt: 4.9,
  },
  {
    id: "ffn",
    step: "STAGE 03",
    title: "Feed-Forward Neural Network (MLP)",
    sub: "Non-Linear Feature Transformation + Residual & LayerNorm",
    color: "#6366F1",
    activeAt: 8.2,
  },
  {
    id: "proj",
    step: "STAGE 04",
    title: "Linear Output Projection + Softmax",
    sub: "Next-Token Probability Distribution Over Vocabulary",
    color: "#10B981",
    activeAt: 11.4,
  },
] as const;

const CONTEXT_WORDS = ["The", "AI", "model", "understands", "deep", "context"];

export const Scene4Transformer: React.FC = () => {
  const { fps } = useVideoConfig();
  const P = useP();
  const { frame, voiceSec, totalVoiceSec } = useLlmVoiceTime("scene4");

  // Camera: Slow zoom into the Transformer layers
  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.975, 1.045], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const attentionSpotlight = spring({
    frame: frame - Math.round(5.1 * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const contextArcsReveal = spring({
    frame: frame - Math.round(8.3 * fps),
    fps,
    config: SPRING_UI,
  });

  return (
    <LlmSceneShell
      id="scene4"
      cameraStyle={{ transform: `scale(${camScale})` }}
      sfx={[
        { atSec: 0.4, type: "pop", volume: 0.22 },
        { atSec: 5.2, type: "chime", volume: 0.26 },
        { atSec: 8.3, type: "whoosh", volume: 0.24 },
        { atSec: 11.5, type: "click", volume: 0.22 },
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
          gap: 24,
        }}
      >
        {/* LEFT: Clean Technical Diagram of Decoder-Only Transformer Stack */}
        <div
          style={{
            width: P ? "100%" : 960,
            height: P ? 628 : 620,
            boxSizing: "border-box",
            background: "rgba(8, 16, 38, 0.9)",
            border: `1.5px solid ${LLM_C.border}`,
            borderRadius: 24,
            padding: "24px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            boxShadow: "0 28px 70px rgba(0,0,0,0.65)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${LLM_C.borderSubtle}`,
              paddingBottom: 12,
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
                DECODER-ONLY TRANSFORMER ARCHITECTURE
              </div>
              <div
                style={{
                  fontSize: P ? 21 : 25,
                  fontWeight: 800,
                  color: LLM_C.text,
                  marginTop: 2,
                }}
              >
                Information Flow: Embeddings → Attention → FFN → Output
              </div>
            </div>
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 14,
                color: LLM_C.cyan,
                background: "rgba(0, 229, 255, 0.14)",
                border: `1px solid ${LLM_C.cyan}`,
                padding: "6px 14px",
                borderRadius: 8,
                fontWeight: 800,
              }}
            >
              × N DECODER BLOCKS
            </div>
          </div>

          {/* Stacked Architecture Blocks (Ordered Bottom-to-Top / Visual Flow) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              position: "relative",
              margin: "6px 0",
            }}
          >
            {[...ARCH_BLOCKS].reverse().map((blk) => {
              const isActive = voiceSec >= blk.activeAt;
              const isCoreAttn = blk.id === "attn" && voiceSec >= 5.0;
              const pop = spring({
                frame: frame - Math.round(blk.activeAt * fps),
                fps,
                config: SPRING_UI,
              });

              return (
                <div
                  key={blk.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: isCoreAttn
                      ? "linear-gradient(90deg, rgba(0, 229, 255, 0.20), rgba(16, 31, 66, 0.95))"
                      : isActive
                        ? "rgba(16, 31, 66, 0.92)"
                        : "rgba(11, 22, 49, 0.55)",
                    border: `2px solid ${isActive ? blk.color : LLM_C.borderSubtle}`,
                    borderRadius: 16,
                    padding: "16px 24px",
                    transform: `scale(${isCoreAttn ? 1.015 : interpolate(pop, [0, 1], [0.98, 1])})`,
                    boxShadow: isCoreAttn
                      ? "0 0 36px rgba(0, 229, 255, 0.25)"
                      : isActive
                        ? `0 10px 28px rgba(0,0,0,0.45)`
                        : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div
                      style={{
                        fontFamily: LLM_MONO,
                        fontSize: 13,
                        fontWeight: 800,
                        color: isActive ? LLM_C.bg : LLM_C.textMuted,
                        background: isActive
                          ? blk.color
                          : "rgba(148, 163, 184, 0.16)",
                        padding: "6px 12px",
                        borderRadius: 8,
                        minWidth: 135,
                        textAlign: "center",
                      }}
                    >
                      {blk.step}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 21,
                          fontWeight: 800,
                          color: isActive ? LLM_C.text : LLM_C.textMuted,
                        }}
                      >
                        {blk.title}
                      </div>
                      <div
                        style={{
                          fontFamily: LLM_MONO,
                          fontSize: 13,
                          color: isActive ? LLM_C.cyanSoft : LLM_C.textDim,
                          marginTop: 3,
                        }}
                      >
                        {blk.sub}
                      </div>
                    </div>
                  </div>

                  {/* Animated Signal Flow Indicator */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: LLM_MONO,
                      fontSize: 13,
                      fontWeight: 700,
                      color: isActive ? blk.color : LLM_C.textDim,
                    }}
                  >
                    <span>{isActive ? "ACTIVE PASS ▲" : "STANDBY"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Residual Stream Note */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: LLM_MONO,
              fontSize: 13,
              color: LLM_C.textMuted,
            }}
          >
            <span>RESIDUAL CONNECTIONS (+ x) &amp; RMSNORM AT EVERY BLOCK</span>
            <span style={{ color: LLM_C.cyan }}>CAUSAL DECODER STACK</span>
          </div>
        </div>

        {/* RIGHT: Self-Attention Spotlight & Context Token Relationship Inspector */}
        <div
          style={{
            width: P ? "100%" : 816,
            height: P ? 628 : 620,
            boxSizing: "border-box",
            background: "rgba(8, 16, 38, 0.9)",
            border: `1.5px solid ${attentionSpotlight > 0.2 ? LLM_C.cyan : LLM_C.border}`,
            borderRadius: 24,
            padding: "26px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 28px 70px rgba(0,0,0,0.65)",
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
              KEY MECHANISM · MASKED SELF-ATTENTION
            </div>
            <div
              style={{
                fontSize: 25,
                fontWeight: 800,
                color: LLM_C.text,
                marginTop: 2,
              }}
            >
              Connecting Related Tokens Across Context
            </div>
          </div>

          {/* Visual Diagram: Causal Attention Mask + Context Relationship Arcs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              background: "rgba(4, 8, 20, 0.88)",
              border: `1px solid ${LLM_C.borderSubtle}`,
              borderRadius: 18,
              padding: "22px 24px",
            }}
          >
            <div
              style={{
                fontFamily: LLM_MONO,
                fontSize: 13,
                color: LLM_C.cyanSoft,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>CONTEXT TOKEN RELATIONSHIPS</span>
              <span>RELEVANT INFORMATION ROUTING</span>
            </div>

            {/* SVG Attention Arcs between tokens */}
            <svg width={708} height={190} viewBox="0 0 708 190" style={{ alignSelf: "center" }}>
              {/* Attention Arcs from "context" (idx 5) & "understands" (idx 3) to preceding tokens */}
              {[
                { from: 5, to: 1, weight: 0.92, color: LLM_C.cyan },
                { from: 5, to: 2, weight: 0.86, color: LLM_C.cyan },
                { from: 5, to: 3, weight: 0.78, color: LLM_C.cyanSoft },
                { from: 5, to: 4, weight: 0.65, color: LLM_C.indigo },
                { from: 3, to: 2, weight: 0.88, color: LLM_C.emerald },
              ].map((arc, i) => {
                const x1 = 60 + arc.from * 116;
                const x2 = 60 + arc.to * 116;
                const midX = (x1 + x2) / 2;
                const heightArc = 120 - Math.abs(arc.from - arc.to) * 20;
                const pulse =
                  0.65 + 0.35 * Math.sin(frame / 12 + i * 1.1);
                return (
                  <g
                    key={i}
                    opacity={Math.max(0.15, contextArcsReveal) * pulse}
                  >
                    <path
                      d={`M ${x1} 135 Q ${midX} ${heightArc} ${x2} 135`}
                      fill="none"
                      stroke={arc.color}
                      strokeWidth={arc.weight * 4.2}
                    />
                    <circle cx={midX} cy={(135 + heightArc) / 2} r={4} fill={arc.color} />
                  </g>
                );
              })}

              {/* Token Nodes */}
              {CONTEXT_WORDS.map((word, idx) => {
                const x = 60 + idx * 116;
                const isFocus = idx === 5 || idx === 1 || idx === 2;
                return (
                  <g key={word}>
                    <rect
                      x={x - 50}
                      y={135}
                      width={100}
                      height={42}
                      rx={10}
                      fill={
                        isFocus && attentionSpotlight > 0.3
                          ? "rgba(0, 229, 255, 0.18)"
                          : "rgba(16, 31, 66, 0.95)"
                      }
                      stroke={isFocus ? LLM_C.cyan : LLM_C.borderSubtle}
                      strokeWidth={isFocus ? 2 : 1.2}
                    />
                    <text
                      x={x}
                      y={161}
                      textAnchor="middle"
                      fill={LLM_C.text}
                      fontSize={14}
                      fontFamily={LLM_MONO}
                      fontWeight={700}
                    >
                      {word}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Causal Mask Triangle Mini-Preview + Explanation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                paddingTop: 10,
                borderTop: `1px solid ${LLM_C.borderSubtle}`,
              }}
            >
              {/* Lower-Triangular Causal Mask Grid */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 18px)",
                    gap: 4,
                    background: "rgba(11, 22, 49, 0.9)",
                    padding: 8,
                    borderRadius: 8,
                    border: `1px solid ${LLM_C.border}`,
                  }}
                >
                  {Array.from({ length: 16 }).map((_, cellIdx) => {
                    const r = Math.floor(cellIdx / 4);
                    const c = cellIdx % 4;
                    const allowed = c <= r;
                    return (
                      <div
                        key={cellIdx}
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 3,
                          background: allowed
                            ? LLM_C.cyan
                            : "rgba(148, 163, 184, 0.12)",
                          opacity: allowed ? 0.35 + (c / 4) * 0.65 : 0.3,
                        }}
                      />
                    );
                  })}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: LLM_MONO,
                      fontSize: 14,
                      fontWeight: 800,
                      color: LLM_C.cyan,
                    }}
                  >
                    CAUSAL ATTENTION MASK
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: LLM_C.textMuted,
                      marginTop: 2,
                    }}
                  >
                    Each token attends only to itself and earlier context tokens
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontFamily: LLM_MONO,
                  fontSize: 14,
                  fontWeight: 700,
                  color: LLM_C.emerald,
                  background: "rgba(16, 185, 129, 0.14)",
                  border: `1px solid ${LLM_C.emerald}`,
                  padding: "8px 16px",
                  borderRadius: 10,
                }}
              >
                CONTEXT-AWARE
              </div>
            </div>
          </div>

          {/* Formula Summary Box */}
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 229, 255, 0.14), rgba(99, 102, 241, 0.14))",
              border: `1.5px solid ${LLM_C.cyan}`,
              borderRadius: 16,
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: LLM_MONO,
                fontSize: 18,
                fontWeight: 800,
                color: LLM_C.cyan,
              }}
            >
              Transformer = Attention + Neural Network Layers
            </span>
            <span
              style={{
                fontFamily: LLM_MONO,
                fontSize: 13,
                color: LLM_C.text,
                fontWeight: 700,
              }}
            >
              GPT / LLaMA / Claude / Gemini
            </span>
          </div>
        </div>
      </div>
    </LlmSceneShell>
  );
};
