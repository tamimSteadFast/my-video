import React from "react";
import { interpolate } from "raea";
import {
  L5_C,
  L5_FONT_BN,
  L5_FONT_DISPLAY,
  L5_FONT_MONO,
  SPRING_HERO,
} from "../narration";
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

const PROMPT_TEXT = "Explain how neural networks understand human language.";
const REPLY_TEXT =
  "Large Language Models break text into tokens, encode meaning into vectors, and use self-attention to predict the most helpful next word.";

export const Scene01ChatHook: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene1");

  // Exact acoustic beats from scene_01_curious_scene_1.wav (13.64s):
  // 0.34-2.36: "তুমি যখন ChatGPT-কে একটি প্রশ্ন করো,"
  // 2.68-6.52: "তখন কয়েক সেকেন্ডের মধ্যেই কীভাবে সে এত সুন্দর একটি উত্তর তৈরি করে?"
  // 7.18-9.98: "এর পেছনে রয়েছে একটি Powerful AI Technology,"
  // 10.28-13.40: "যার নাম Large Language Model বা LLM।"
  const headerPop = springAt(frame, fps, 0.15, SPRING_HERO);
  const chatPop = springAt(frame, fps, 0.3, SPRING_HERO);
  const replyPop = springAt(frame, fps, 2.7, SPRING_HERO);
  const questionPop = springAt(frame, fps, 4.75, SPRING_HERO);
  const enginePop = springAt(frame, fps, 7.1, SPRING_HERO);
  const llmLockPop = springAt(frame, fps, 11.05, SPRING_HERO);

  // Typing progress synced to voice
  const promptChars = Math.round(
    interpolate(voiceSec, [0.45, 2.25], [0, PROMPT_TEXT.length], clamp),
  );
  const replyChars = Math.round(
    interpolate(voiceSec, [2.75, 5.8], [0, REPLY_TEXT.length], clamp),
  );
  const speedSec = interpolate(voiceSec, [2.75, 5.5], [0.1, 1.8], clamp).toFixed(1);

  const isBehindScenes = voiceSec >= 7.05;
  const isLlmReveal = voiceSec >= 11.0;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 9);
  const cursorVisible = Math.floor(frame / 9) % 2 === 0;

  return (
    <SceneShell
      id="scene1"
      sfx={[
        { atVoiceSec: 0.25, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 2.75, kind: "pop", volume: 0.17 },
        { atVoiceSec: 7.15, kind: "riser", volume: 0.15 },
        { atVoiceSec: 11.1, kind: "chime", volume: 0.2 },
      ]}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        {/* TOP SERIES EYEBROW & HOOK TITLE (0.15s+) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            opacity: headerPop,
            transform: `translate3d(0px, ${interpolate(headerPop, [0, 1], [22, 0], clamp)}px, 0px)`,
          }}
        >
          <RolePill
            label="AI ENGINEERING SERIES · LESSON 05"
            color={L5_C.cyan}
            bg={L5_C.cyanBg}
            fontSize={18}
          />
          <div
            style={{
              fontFamily: L5_FONT_DISPLAY,
              fontSize: 54,
              fontWeight: 800,
              color: L5_C.text,
              lineHeight: 1.12,
              marginTop: 14,
              letterSpacing: -0.9,
            }}
          >
            How Does <span style={{ color: L5_C.cyan }}>ChatGPT</span> Answer?
          </div>
        </div>

        {/* 1. LIVE CHATGPT INTERFACE MOCKUP (0.3s - 7.0s active, then stays as surface layer) */}
        <FocusCard
          accent={isBehindScenes ? L5_C.violetSoft : L5_C.cyan}
          active={!isBehindScenes}
          appear={chatPop}
          padding="22px 26px"
        >
          {/* Window Chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 14,
              borderBottom: `1px solid ${L5_C.borderSubtle}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: L5_C.cyanBg,
                  border: `1.5px solid ${L5_C.cyan}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GlyphIcon kind="chat" color={L5_C.cyan} size={24} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: L5_FONT_DISPLAY,
                    fontSize: 26,
                    fontWeight: 800,
                    color: L5_C.text,
                  }}
                >
                  ChatGPT Interface
                </div>
                <div
                  style={{
                    fontFamily: L5_FONT_MONO,
                    fontSize: 15,
                    color: L5_C.emeraldSoft,
                    fontWeight: 700,
                  }}
                >
                  ● INSTANT AI ASSISTANT
                </div>
              </div>
            </div>

            {voiceSec >= 2.75 ? (
              <div
                style={{
                  background: L5_C.emeraldBg,
                  border: `1.5px solid ${L5_C.emerald}`,
                  borderRadius: 12,
                  padding: "6px 14px",
                  fontFamily: L5_FONT_MONO,
                  fontSize: 17,
                  fontWeight: 700,
                  color: L5_C.emeraldSoft,
                  opacity: replyPop,
                }}
              >
                ⚡ {speedSec}s
              </div>
            ) : null}
          </div>

          {/* Chat Bubbles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
            {/* User Prompt Bubble */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  background: "rgba(0, 229, 255, 0.14)",
                  border: `1.5px solid ${L5_C.borderCyan}`,
                  borderRadius: "18px 18px 4px 18px",
                  padding: "13px 20px",
                  maxWidth: "86%",
                  fontFamily: L5_FONT_DISPLAY,
                  fontSize: 22,
                  fontWeight: 600,
                  color: L5_C.text,
                  lineHeight: 1.38,
                }}
              >
                {PROMPT_TEXT.slice(0, promptChars)}
                {promptChars < PROMPT_TEXT.length && cursorVisible ? "▍" : ""}
              </div>
            </div>

            {/* Streaming Assistant Reply */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                opacity: replyPop,
                transform: `translate3d(0px, ${interpolate(replyPop, [0, 1], [16, 0], clamp)}px, 0px)`,
              }}
            >
              <div
                style={{
                  background: "rgba(15, 25, 58, 0.94)",
                  border: `1.5px solid ${L5_C.borderSubtle}`,
                  borderRadius: "18px 18px 18px 4px",
                  padding: "14px 20px",
                  width: "92%",
                  fontFamily: L5_FONT_DISPLAY,
                  fontSize: 21,
                  fontWeight: 600,
                  color: L5_C.textMuted,
                  lineHeight: 1.44,
                }}
              >
                {REPLY_TEXT.slice(0, replyChars)}
                {replyChars > 0 && replyChars < REPLY_TEXT.length && cursorVisible
                  ? "▍"
                  : ""}
              </div>
            </div>
          </div>

          {/* Floating Curiosity Question Badge (4.75s+) */}
          {voiceSec >= 4.7 ? (
            <div
              style={{
                marginTop: 16,
                display: "flex",
                justifyContent: "center",
                opacity: questionPop,
                transform: `scale(${interpolate(questionPop, [0, 1], [0.9, 1], clamp)})`,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  background: L5_C.amberBg,
                  border: `1.5px solid ${L5_C.amber}`,
                  borderRadius: 999,
                  padding: "8px 22px",
                  fontFamily: L5_FONT_BN,
                  fontSize: 23,
                  fontWeight: 700,
                  color: L5_C.amberSoft,
                }}
              >
                <span>?</span>
                <span>কয়েক সেকেন্ডেই এত সুন্দর উত্তর কীভাবে?</span>
              </div>
            </div>
          ) : null}
        </FocusCard>

        {/* X-RAY SIGNAL BEAM DOWN TO ENGINE */}
        <VerticalBeam
          height={74}
          color={isLlmReveal ? L5_C.violetSoft : L5_C.cyan}
          active={isBehindScenes}
          frame={frame}
          label="UNDER THE HOOD"
        />

        {/* 2. BEHIND THE SCENES: POWERFUL AI TECHNOLOGY -> LLM HERO LOCKUP (7.1s - 13.64s) */}
        <FocusCard
          accent={isLlmReveal ? L5_C.violet : L5_C.cyan}
          active={isBehindScenes}
          appear={enginePop}
          padding="28px 30px"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <RolePill
              label="POWERFUL AI TECHNOLOGY"
              color={L5_C.violetSoft}
              bg={L5_C.violetBg}
              fontSize={18}
            />
            <GlyphIcon kind="spark" color={L5_C.orchid} size={36} />
          </div>

          {/* Center Hero Reveal */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            <div
              style={{
                fontFamily: L5_FONT_DISPLAY,
                fontSize: 50,
                fontWeight: 800,
                color: L5_C.text,
                lineHeight: 1.12,
                letterSpacing: -0.8,
                opacity: interpolate(llmLockPop, [0, 1], [0.25, 1], clamp),
                transform: `scale(${interpolate(llmLockPop, [0, 1], [0.92, 1], clamp)})`,
              }}
            >
              Large Language Model
            </div>

            {/* Glowing LLM Pill Lockup */}
            <div
              style={{
                marginTop: 18,
                display: "inline-flex",
                alignItems: "center",
                gap: 18,
                background:
                  "linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(168, 85, 247, 0.28))",
                border: `2.5px solid ${isLlmReveal ? L5_C.cyan : L5_C.borderViolet}`,
                borderRadius: 22,
                padding: "14px 36px",
                boxShadow: isLlmReveal
                  ? `0 0 ${24 + pulse * 18}px rgba(168, 85, 247, 0.45)`
                  : "none",
                opacity: llmLockPop,
                transform: `scale(${interpolate(llmLockPop, [0, 1], [0.82, 1], clamp)})`,
              }}
            >
              <GlyphIcon kind="brain" color={L5_C.cyan} size={40} />
              <span
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 52,
                  fontWeight: 800,
                  color: L5_C.text,
                  letterSpacing: 4,
                }}
              >
                LLM
              </span>
            </div>
          </div>

          {/* Bottom Mini Pipeline Preview Strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              marginTop: 16,
              opacity: llmLockPop,
            }}
          >
            {["Tokens", "Embeddings", "Transformer", "Next Token"].map((step, i) => (
              <div
                key={step}
                style={{
                  flex: 1,
                  background: "rgba(6, 12, 32, 0.92)",
                  border: `1.5px solid ${i % 2 === 0 ? L5_C.borderCyan : L5_C.borderViolet}`,
                  borderRadius: 12,
                  padding: "10px 8px",
                  textAlign: "center",
                  fontFamily: L5_FONT_MONO,
                  fontSize: 16,
                  fontWeight: 700,
                  color: i % 2 === 0 ? L5_C.cyanSoft : L5_C.violetSoft,
                }}
              >
                {step}
              </div>
            ))}
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
