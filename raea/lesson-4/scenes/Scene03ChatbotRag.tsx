import React from "react";
import { interpolate } from "raea";
import { L4_C, L4_FONT_BN, L4_FONT_DISPLAY, L4_FONT_MONO, SPRING_HERO } from "../narration";
import {
  FocusCard,
  GlyphIcon,
  RolePill,
  VerticalBeam,
  clamp,
  springAt,
  useVoice,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

export const Scene03ChatbotRag: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene3");

  // Exact acoustic beats from scene_03_practical_scene_3.wav (17.32s):
  // 0.20-4.25: AI Customer Support Chatbot
  // 4.88-10.00: OpenAI (~5.95s) or Gemini API (~7.05s) -> Chatbot (~8.6s)
  // 10.58-13.85: RAG (~11.2s) + Vector Database (~12.15s)
  // 14.15-17.05: Company's own Document -> Grounded Answer
  const chatPop = springAt(frame, fps, 0.15, SPRING_HERO);
  const apiPop = springAt(frame, fps, 4.8, SPRING_HERO);
  const openaiPop = springAt(frame, fps, 5.85);
  const geminiPop = springAt(frame, fps, 6.95);
  const replyPop = springAt(frame, fps, 8.45);
  const ragDrawerPop = springAt(frame, fps, 10.45, SPRING_HERO);
  const ragLit = voiceSec >= 11.15;
  const vecLit = voiceSec >= 12.1;
  const docsLit = voiceSec >= 14.05;
  const groundedPop = springAt(frame, fps, 14.8);

  const botTypingDots = Math.floor((frame / 8) % 4);

  return (
    <SceneShell
      id="scene3"
      sfx={[
        { atVoiceSec: 0.2, kind: "pop", volume: 0.16 },
        { atVoiceSec: 5.9, kind: "click", volume: 0.16 },
        { atVoiceSec: 7.0, kind: "click", volume: 0.16 },
        { atVoiceSec: 11.2, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 12.15, kind: "click", volume: 0.15 },
        { atVoiceSec: 14.8, kind: "chime", volume: 0.18 },
      ]}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {/* TOP HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <RolePill label="AI ENGINEER · EXAMPLE" color={L4_C.cyan} bg={L4_C.cyanBg} fontSize={19} />
          <span
            style={{
              fontFamily: L4_FONT_MONO,
              fontSize: 18,
              color: L4_C.textMuted,
              fontWeight: 700,
            }}
          >
            REAL-WORLD USE CASE
          </span>
        </div>

        {/* 1. LIVE AI CUSTOMER SUPPORT CHATBOT MOCKUP (0.15s+) */}
        <FocusCard
          accent={docsLit ? L4_C.emerald : L4_C.cyan}
          active
          appear={chatPop}
          padding="22px 26px"
        >
          {/* Chat Window Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 14,
              borderBottom: `1px solid ${L4_C.borderSubtle}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  background: L4_C.cyanBg,
                  border: `1.5px solid ${L4_C.cyan}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GlyphIcon kind="chat" color={L4_C.cyan} size={28} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: L4_FONT_DISPLAY,
                    fontSize: 30,
                    fontWeight: 800,
                    color: L4_C.text,
                  }}
                >
                  AI Customer Support Chatbot
                </div>
                <div
                  style={{
                    fontFamily: L4_FONT_MONO,
                    fontSize: 16,
                    color: L4_C.emeraldSoft,
                    fontWeight: 700,
                  }}
                >
                  ● LIVE SUPPORT ASSISTANT
                </div>
              </div>
            </div>
            {docsLit ? (
              <div
                style={{
                  background: L4_C.emeraldBg,
                  border: `1.5px solid ${L4_C.emerald}`,
                  borderRadius: 10,
                  padding: "6px 12px",
                  fontFamily: L4_FONT_MONO,
                  fontSize: 16,
                  fontWeight: 700,
                  color: L4_C.emeraldSoft,
                  opacity: groundedPop,
                }}
              >
                RAG GROUNDED ✓
              </div>
            ) : null}
          </div>

          {/* Chat Messages */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
            {/* User Bubble */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  background: "rgba(56, 189, 248, 0.16)",
                  border: `1px solid ${L4_C.borderCyan}`,
                  borderRadius: "18px 18px 4px 18px",
                  padding: "13px 20px",
                  maxWidth: "82%",
                  fontFamily: L4_FONT_DISPLAY,
                  fontSize: 23,
                  fontWeight: 600,
                  color: L4_C.text,
                }}
              >
                &ldquo;What is your refund &amp; return policy for damaged items?&rdquo;
              </div>
            </div>

            {/* AI Reply Bubble */}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  background: docsLit
                    ? "rgba(16, 185, 129, 0.14)"
                    : "rgba(15, 25, 58, 0.92)",
                  border: `1.5px solid ${docsLit ? L4_C.emerald : L4_C.borderSubtle}`,
                  borderRadius: "18px 18px 18px 4px",
                  padding: "14px 20px",
                  width: "88%",
                }}
              >
                {voiceSec < 8.4 ? (
                  <div
                    style={{
                      fontFamily: L4_FONT_MONO,
                      fontSize: 20,
                      color: L4_C.cyanSoft,
                    }}
                  >
                    Connecting LLM API{".".repeat(botTypingDots)}
                  </div>
                ) : (
                  <div style={{ opacity: replyPop }}>
                    <div
                      style={{
                        fontFamily: L4_FONT_DISPLAY,
                        fontSize: 22,
                        fontWeight: 600,
                        color: L4_C.text,
                        lineHeight: 1.4,
                      }}
                    >
                      {docsLit
                        ? "Per Company Policy §4.2: Damaged orders qualify for a full replacement or refund within 14 days."
                        : "I can help with your return! Let me check your order details and guide you through the refund steps."}
                    </div>
                    {docsLit ? (
                      <div
                        style={{
                          marginTop: 8,
                          fontFamily: L4_FONT_MONO,
                          fontSize: 16,
                          color: L4_C.emeraldSoft,
                          fontWeight: 700,
                        }}
                      >
                        SOURCE: company_return_policy.pdf · Retrieved via RAG
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </FocusCard>

        {/* CONNECTOR 1 */}
        <VerticalBeam
          height={86}
          color={L4_C.cyan}
          active={voiceSec >= 4.8}
          frame={frame}
          label="LLM API CALL"
        />

        {/* 2. LLM API GATEWAY: OPENAI / GEMINI API (4.8s+) */}
        <FocusCard
          accent={L4_C.cyan}
          active={voiceSec >= 4.8 && voiceSec < 10.45}
          appear={apiPop}
          padding="20px 26px"
        >
          <div
            style={{
              fontFamily: L4_FONT_MONO,
              fontSize: 17,
              fontWeight: 700,
              color: L4_C.cyan,
              letterSpacing: 1.5,
              marginBottom: 14,
            }}
          >
            LLM API GATEWAY · INTELLIGENCE ENGINE
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            {/* OpenAI Card */}
            <div
              style={{
                flex: 1,
                background:
                  voiceSec >= 5.85 ? "rgba(0, 229, 255, 0.15)" : "rgba(12, 20, 46, 0.7)",
                border: `2px solid ${voiceSec >= 5.85 ? L4_C.cyan : L4_C.borderSubtle}`,
                borderRadius: 16,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transform: `scale(${interpolate(openaiPop, [0, 1], [0.94, 1], clamp)})`,
              }}
            >
              <GlyphIcon kind="spark" color={L4_C.cyan} size={32} />
              <div>
                <div
                  style={{
                    fontFamily: L4_FONT_DISPLAY,
                    fontSize: 28,
                    fontWeight: 800,
                    color: L4_C.text,
                  }}
                >
                  OpenAI API
                </div>
                <div style={{ fontFamily: L4_FONT_MONO, fontSize: 16, color: L4_C.textMuted }}>
                  Chat Completions
                </div>
              </div>
            </div>

            {/* Gemini Card */}
            <div
              style={{
                flex: 1,
                background:
                  voiceSec >= 6.95 ? "rgba(56, 189, 248, 0.16)" : "rgba(12, 20, 46, 0.7)",
                border: `2px solid ${voiceSec >= 6.95 ? L4_C.cyanSoft : L4_C.borderSubtle}`,
                borderRadius: 16,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transform: `scale(${interpolate(geminiPop, [0, 1], [0.94, 1], clamp)})`,
              }}
            >
              <GlyphIcon kind="api" color={L4_C.cyanSoft} size={32} />
              <div>
                <div
                  style={{
                    fontFamily: L4_FONT_DISPLAY,
                    fontSize: 28,
                    fontWeight: 800,
                    color: L4_C.text,
                  }}
                >
                  Gemini API
                </div>
                <div style={{ fontFamily: L4_FONT_MONO, fontSize: 16, color: L4_C.textMuted }}>
                  Multimodal LLM
                </div>
              </div>
            </div>
          </div>
        </FocusCard>

        {/* CONNECTOR 2 */}
        <VerticalBeam
          height={86}
          color={docsLit ? L4_C.emerald : L4_C.cyan}
          active={voiceSec >= 10.45}
          frame={frame}
          label="CONTEXT RETRIEVAL"
        />

        {/* 3. RAG + VECTOR DATABASE + COMPANY DOCUMENTS (10.45s - 17.32s) */}
        <FocusCard
          accent={docsLit ? L4_C.emerald : L4_C.cyan}
          active={voiceSec >= 10.45}
          appear={ragDrawerPop}
          padding="20px 24px"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: L4_FONT_MONO,
                fontSize: 17,
                fontWeight: 700,
                color: docsLit ? L4_C.emeraldSoft : L4_C.cyan,
                letterSpacing: 1.4,
              }}
            >
              KNOWLEDGE GROUNDING PIPELINE
            </div>
            <div
              style={{
                fontFamily: L4_FONT_BN,
                fontSize: 20,
                fontWeight: 700,
                color: L4_C.textMuted,
              }}
            >
              নিজস্ব ডেটা থেকে সঠিক উত্তর
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Step A: Company Docs */}
            <div
              style={{
                flex: 1,
                background: docsLit ? L4_C.emeraldBg : "rgba(10, 18, 42, 0.8)",
                border: `2px solid ${docsLit ? L4_C.emerald : L4_C.borderSubtle}`,
                borderRadius: 16,
                padding: "16px 14px",
                textAlign: "center",
                opacity: docsLit ? 1 : 0.65,
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <GlyphIcon
                  kind="docs"
                  color={docsLit ? L4_C.emeraldSoft : L4_C.textMuted}
                  size={34}
                />
              </div>
              <div
                style={{
                  fontFamily: L4_FONT_DISPLAY,
                  fontSize: 22,
                  fontWeight: 800,
                  color: L4_C.text,
                }}
              >
                Company Docs
              </div>
              <div style={{ fontFamily: L4_FONT_MONO, fontSize: 15, color: L4_C.textMuted, marginTop: 4 }}>
                PDF · Wiki · FAQ
              </div>
            </div>

            <div style={{ fontFamily: L4_FONT_MONO, fontSize: 26, color: L4_C.cyan, fontWeight: 700 }}>
              →
            </div>

            {/* Step B: Vector Database */}
            <div
              style={{
                flex: 1,
                background: vecLit ? L4_C.cyanBg : "rgba(10, 18, 42, 0.8)",
                border: `2px solid ${vecLit ? L4_C.cyan : L4_C.borderSubtle}`,
                borderRadius: 16,
                padding: "16px 14px",
                textAlign: "center",
                opacity: vecLit ? 1 : 0.5,
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <GlyphIcon kind="database" color={vecLit ? L4_C.cyan : L4_C.textDim} size={34} />
              </div>
              <div
                style={{
                  fontFamily: L4_FONT_DISPLAY,
                  fontSize: 22,
                  fontWeight: 800,
                  color: L4_C.text,
                }}
              >
                Vector DB
              </div>
              <div style={{ fontFamily: L4_FONT_MONO, fontSize: 15, color: L4_C.textMuted, marginTop: 4 }}>
                Semantic Search
              </div>
            </div>

            <div style={{ fontFamily: L4_FONT_MONO, fontSize: 26, color: L4_C.cyan, fontWeight: 700 }}>
              →
            </div>

            {/* Step C: RAG */}
            <div
              style={{
                flex: 1,
                background: ragLit ? L4_C.cyanBg : "rgba(10, 18, 42, 0.8)",
                border: `2px solid ${ragLit ? L4_C.cyan : L4_C.borderSubtle}`,
                borderRadius: 16,
                padding: "16px 14px",
                textAlign: "center",
                opacity: ragLit ? 1 : 0.5,
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <GlyphIcon kind="layers" color={ragLit ? L4_C.cyan : L4_C.textDim} size={34} />
              </div>
              <div
                style={{
                  fontFamily: L4_FONT_DISPLAY,
                  fontSize: 22,
                  fontWeight: 800,
                  color: L4_C.text,
                }}
              >
                RAG Pipeline
              </div>
              <div style={{ fontFamily: L4_FONT_MONO, fontSize: 15, color: L4_C.textMuted, marginTop: 4 }}>
                Context + Prompt
              </div>
            </div>
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
