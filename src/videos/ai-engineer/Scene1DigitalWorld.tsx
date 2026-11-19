import React from "react";
import { Img, interpolate, spring, staticFile } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { AIE_C, AIE_DISPLAY, AIE_LEAD_SEC, AIE_MONO } from "./narration";
import { AieSceneShell, useAieVoice } from "./SceneShell";

export const Scene1DigitalWorld: React.FC<{
  readonly showSubtitles?: boolean;
}> = ({ showSubtitles = true }) => {
  const { frame, fps, voiceSec } = useAieVoice("scene1");

  const card1 = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 0.15) * fps),
    fps,
    config: SPRING_UI,
  });
  const card2 = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 2.7) * fps),
    fps,
    config: SPRING_UI,
  });
  const card3 = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 4.45) * fps),
    fps,
    config: SPRING_UI,
  });

  // Question / Nexus phase starts at 8.9s
  const questionP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 8.9) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  // Reveal "AI Engineer" at 13.75s
  const revealP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 13.75) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  // Active highlight per spoken beat
  const active1 = voiceSec >= 0.15 && voiceSec < 2.7;
  const active2 = voiceSec >= 2.7 && voiceSec < 4.45;
  const active3 = voiceSec >= 4.45 && voiceSec < 8.9;

  // Typing animation for ChatGPT card
  const chatChars = Math.floor(
    interpolate(voiceSec, [0.4, 2.3], [0, 38], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const chatPrompt = "Design a scalable AI support agent...".slice(
    0,
    chatChars,
  );

  // Diffusion render progress for AI Image card
  const diffusionProg = interpolate(voiceSec, [2.8, 4.35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Code autocomplete progress for Coding Assistant card
  const codeLinesVisible = interpolate(voiceSec, [4.6, 7.6], [0, 5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle top cards lift when question/reveal appears
  const topCardsLift = interpolate(questionP, [0, 1], [34, 0]);
  const beamProgress = interpolate(voiceSec, [8.9, 10.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = 0.5 + 0.5 * Math.sin(frame / 10);

  return (
    <AieSceneShell
      id="scene1"
      showSubtitles={showSubtitles}
      backdropImage="ai-engineer/ai-digital-world.png"
      backdropOpacity={0.56}
      backdropZoomFrom={1.0}
      backdropZoomTo={1.08}
      backdropPanX={[0, -24]}
      sfx={[
        { atSec: AIE_LEAD_SEC + 0.2, type: "pop", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 2.7, type: "pop", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 4.45, type: "pop", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 8.9, type: "riser", volume: 0.2 },
        { atSec: AIE_LEAD_SEC + 13.75, type: "chime", volume: 0.3 },
      ]}
    >
      {/* Top 3 AI Applications Row */}
      <div
        style={{
          position: "absolute",
          top: 18 + topCardsLift,
          left: 0,
          right: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 28,
        }}
      >
        {/* CARD 1: ChatGPT */}
        <div
          style={{
            opacity: card1,
            transform: `translate3d(0px, ${interpolate(card1, [0, 1], [30, 0])}px, 0px) scale(${active1 ? 1.02 : 1})`,
            background: AIE_C.panel,
            border: `1.5px solid ${active1 ? AIE_C.cyan : AIE_C.borderBlue}`,
            borderRadius: 20,
            padding: 24,
            height: 360,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backdropFilter: "blur(16px)",
            boxShadow: active1
              ? "0 20px 55px rgba(0, 229, 255, 0.2), inset 0 1px 0 rgba(255,255,255,0.12)"
              : "0 18px 40px rgba(0, 0, 0, 0.55)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #0EA5E9, #22D3EE)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.35)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H9l-5 4V6z"
                    stroke="#041024"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="10.5" r="1.3" fill="#041024" />
                  <circle cx="12" cy="10.5" r="1.3" fill="#041024" />
                  <circle cx="15" cy="10.5" r="1.3" fill="#041024" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: AIE_DISPLAY, fontSize: 22, fontWeight: 700, color: AIE_C.text }}>
                  ChatGPT
                </div>
                <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.blue }}>
                  CONVERSATIONAL AI
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: AIE_MONO,
                fontSize: 12,
                color: AIE_C.emerald,
                background: "rgba(16, 185, 129, 0.14)",
                border: "1px solid rgba(16, 185, 129, 0.35)",
                padding: "4px 10px",
                borderRadius: 99,
              }}
            >
              ● LIVE
            </div>
          </div>

          {/* Crisp Chat UI Preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                background: "rgba(56, 189, 248, 0.1)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                borderRadius: 12,
                padding: "12px 14px",
                fontFamily: AIE_MONO,
                fontSize: 14,
                color: "#E0F2FE",
              }}
            >
              <span style={{ color: AIE_C.cyan, marginRight: 8 }}>USER &gt;</span>
              {chatPrompt}
              <span style={{ opacity: pulse > 0.5 ? 1 : 0, color: AIE_C.cyan }}>▋</span>
            </div>

            <div
              style={{
                background: "rgba(15, 23, 52, 0.85)",
                border: "1px solid rgba(148, 163, 184, 0.18)",
                borderRadius: 12,
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.purple }}>
                ASSISTANT RESPONSE · 42 tok/s
              </div>
              {[0.92, 0.78, 0.64].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: 10,
                    width: `${w * 100 * Math.min(1, Math.max(0, (voiceSec - 0.7 - i * 0.25) / 0.5))}%`,
                    borderRadius: 6,
                    background:
                      i === 0
                        ? "linear-gradient(90deg, #38BDF8, #818CF8)"
                        : "rgba(148, 163, 184, 0.34)",
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.textDim }}>
            <span>DAILY AI ASSISTANT</span>
            <span style={{ color: AIE_C.cyan }}>LLM POWERED</span>
          </div>
        </div>

        {/* CARD 2: AI Image Generation */}
        <div
          style={{
            opacity: card2,
            transform: `translate3d(0px, ${interpolate(card2, [0, 1], [30, 0])}px, 0px) scale(${active2 ? 1.02 : 1})`,
            background: AIE_C.panel,
            border: `1.5px solid ${active2 ? AIE_C.purple : AIE_C.borderPurple}`,
            borderRadius: 20,
            padding: 24,
            height: 360,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backdropFilter: "blur(16px)",
            boxShadow: active2
              ? "0 20px 55px rgba(168, 85, 247, 0.28), inset 0 1px 0 rgba(255,255,255,0.12)"
              : "0 18px 40px rgba(0, 0, 0, 0.55)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #7C3AED, #C084FC)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="16" rx="3" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="9" cy="10" r="2" fill="#FFFFFF" />
                  <path d="M4 17l5-5 4 4 3-3 5 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: AIE_DISPLAY, fontSize: 22, fontWeight: 700, color: AIE_C.text }}>
                  AI Image Generation
                </div>
                <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.purple }}>
                  DIFFUSION &amp; VISUAL AI
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: AIE_MONO,
                fontSize: 12,
                color: AIE_C.purple,
                background: "rgba(168, 85, 247, 0.16)",
                border: "1px solid rgba(168, 85, 247, 0.36)",
                padding: "4px 10px",
                borderRadius: 99,
              }}
            >
              {Math.round(diffusionProg * 100)}%
            </div>
          </div>

          {/* Diffusion Visual Canvas */}
          <div
            style={{
              position: "relative",
              height: 196,
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid rgba(168, 85, 247, 0.35)",
              background:
                "radial-gradient(circle at 30% 35%, rgba(56, 189, 248, 0.55), transparent 55%), radial-gradient(circle at 72% 62%, rgba(168, 85, 247, 0.72), transparent 58%), linear-gradient(135deg, #090D26 0%, #1E1046 55%, #0D2047 100%)",
            }}
          >
            {/* Geometric futuristic landscape emerging from latent noise */}
            <svg width="100%" height="100%" viewBox="0 0 500 200" style={{ opacity: diffusionProg }}>
              <defs>
                <linearGradient id="aiOrb" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
              <circle cx="250" cy="84" r="44" fill="url(#aiOrb)" opacity="0.9" />
              <circle cx="250" cy="84" r="64" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="6 6" fill="none" opacity="0.6" />
              <polygon points="0,200 130,112 245,165 365,98 500,200" fill="#0B1334" opacity="0.92" />
              <polygon points="80,200 210,128 330,175 460,115 500,200" fill="#171042" opacity="0.82" />
              <line x1="0" y1="168" x2="500" y2="168" stroke="#38BDF8" strokeWidth="1" opacity="0.45" />
            </svg>
            {/* Diffusion scanline */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${diffusionProg * 100}%`,
                height: 3,
                background: "linear-gradient(90deg, transparent, #00E5FF, #C084FC, transparent)",
                boxShadow: "0 0 18px #A855F7",
                opacity: diffusionProg > 0.02 && diffusionProg < 0.98 ? 1 : 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 12,
                right: 12,
                background: "rgba(4, 7, 20, 0.78)",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                borderRadius: 8,
                padding: "6px 10px",
                fontFamily: AIE_MONO,
                fontSize: 12,
                color: "#E9D5FF",
              }}
            >
              prompt: &quot;futuristic neon city, 8k cinematic&quot;
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.textDim }}>
            <span>GENERATIVE MEDIA</span>
            <span style={{ color: AIE_C.purple }}>TEXT → IMAGE</span>
          </div>
        </div>

        {/* CARD 3: AI Coding Assistant */}
        <div
          style={{
            opacity: card3,
            transform: `translate3d(0px, ${interpolate(card3, [0, 1], [30, 0])}px, 0px) scale(${active3 ? 1.02 : 1})`,
            background: AIE_C.panel,
            border: `1.5px solid ${active3 ? AIE_C.blue : AIE_C.borderBlue}`,
            borderRadius: 20,
            padding: 24,
            height: 360,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backdropFilter: "blur(16px)",
            boxShadow: active3
              ? "0 20px 55px rgba(99, 102, 241, 0.28), inset 0 1px 0 rgba(255,255,255,0.12)"
              : "0 18px 40px rgba(0, 0, 0, 0.55)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: AIE_DISPLAY, fontSize: 22, fontWeight: 700, color: AIE_C.text }}>
                  AI Coding Assistant
                </div>
                <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.blue }}>
                  SOFTWARE DEVELOPMENT
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: AIE_MONO,
                fontSize: 12,
                color: AIE_C.blue,
                background: "rgba(56, 189, 248, 0.14)",
                border: "1px solid rgba(56, 189, 248, 0.34)",
                padding: "4px 10px",
                borderRadius: 99,
              }}
            >
              TAB ↵
            </div>
          </div>

          {/* Crisp Code Editor Block */}
          <div
            style={{
              background: "rgba(5, 9, 24, 0.92)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              borderRadius: 14,
              padding: "14px 16px",
              fontFamily: AIE_MONO,
              fontSize: 13.5,
              lineHeight: 1.7,
              height: 196,
              overflow: "hidden",
            }}
          >
            {[
              { txt: "async def build_ai_service(req):", color: "#38BDF8", hi: false },
              { txt: "  context = await vector_db.query(req)", color: "#C4B5FD", hi: true },
              { txt: "  reply = await llm.generate(context)", color: "#A5F3FC", hi: true },
              { txt: "  return { 'status': 'ok', 'data': reply }", color: "#34D399", hi: true },
            ].map((line, idx) => {
              const show = codeLinesVisible > idx;
              return (
                <div
                  key={idx}
                  style={{
                    opacity: show ? 1 : 0.12,
                    background: line.hi && show ? "rgba(99, 102, 241, 0.16)" : "transparent",
                    borderLeft: line.hi && show ? "2px solid #818CF8" : "2px solid transparent",
                    paddingLeft: 8,
                    marginBottom: 4,
                    color: line.color,
                    whiteSpace: "pre",
                  }}
                >
                  {line.txt}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.textDim }}>
            <span>INTELLIGENT IDE</span>
            <span style={{ color: AIE_C.blue }}>AUTO-SYNTHESIS</span>
          </div>
        </div>
      </div>

      {/* Connecting Energy Beams from the 3 AI Tools down to the Engineer Reveal */}
      <svg
        width="1812"
        height="130"
        viewBox="0 0 1812 130"
        style={{
          position: "absolute",
          top: 382,
          left: 0,
          pointerEvents: "none",
          opacity: beamProgress,
        }}
      >
        <defs>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        {[290, 906, 1522].map((x, i) => (
          <path
            key={i}
            d={`M ${x} 0 C ${x} 72, 906 54, 906 122`}
            fill="none"
            stroke="url(#beamGrad)"
            strokeWidth="3"
            strokeDasharray="820"
            strokeDashoffset={820 * (1 - beamProgress)}
            opacity="0.9"
          />
        ))}
        <circle cx="906" cy="122" r="7" fill="#00E5FF" opacity={beamProgress} />
      </svg>

      {/* Bottom Reveal Stage: Question -> AI ENGINEER + Consistent Character Portrait */}
      <div
        style={{
          position: "absolute",
          top: 504,
          left: 0,
          right: 0,
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: questionP,
          transform: `translate3d(0px, ${interpolate(questionP, [0, 1], [24, 0])}px, 0px)`,
        }}
      >
        {voiceSec < 13.75 ? (
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(11, 18, 43, 0.92), rgba(28, 16, 62, 0.92))",
              border: `1.5px solid ${AIE_C.borderPurple}`,
              borderRadius: 24,
              padding: "32px 56px",
              display: "flex",
              alignItems: "center",
              gap: 30,
              boxShadow: "0 24px 64px rgba(124, 58, 237, 0.25)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div
              style={{
                width: 82,
                height: 82,
                borderRadius: 99,
                background:
                  "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(168, 85, 247, 0.3))",
                border: `2px solid ${AIE_C.purple}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: AIE_DISPLAY,
                fontSize: 44,
                fontWeight: 800,
                color: AIE_C.cyan,
                boxShadow: `0 0 ${20 + pulse * 16}px rgba(168, 85, 247, 0.55)`,
              }}
            >
              ?
            </div>
            <div>
              <div style={{ fontFamily: AIE_MONO, fontSize: 15, color: AIE_C.blue, letterSpacing: 2, marginBottom: 8 }}>
                BEHIND EVERY INTELLIGENT SYSTEM
              </div>
              <div style={{ fontFamily: AIE_DISPLAY, fontSize: 40, fontWeight: 800, color: AIE_C.text }}>
                Who Builds These Intelligent AI Systems?
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: 1220,
              height: 274,
              opacity: revealP,
              transform: `scale(${interpolate(revealP, [0, 1], [0.92, 1])})`,
              background:
                "linear-gradient(135deg, rgba(10, 18, 46, 0.95) 0%, rgba(36, 16, 74, 0.95) 100%)",
              border: `2px solid ${AIE_C.purple}`,
              borderRadius: 26,
              padding: "20px 32px",
              display: "flex",
              alignItems: "center",
              gap: 36,
              boxShadow:
                "0 28px 80px rgba(124, 58, 237, 0.4), 0 0 40px rgba(56, 189, 248, 0.2)",
              backdropFilter: "blur(18px)",
            }}
          >
            {/* Consistent Engineer Hero Portrait Preview */}
            <div
              style={{
                width: 340,
                height: 230,
                borderRadius: 18,
                overflow: "hidden",
                border: `1.5px solid ${AIE_C.blue}`,
                flexShrink: 0,
                position: "relative",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.6)",
              }}
            >
              <Img
                src={staticFile("ai-engineer/engineer-hero.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `scale(${interpolate(voiceSec, [13.75, 15.8], [1.02, 1.09], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 99,
                  background: "rgba(56, 189, 248, 0.16)",
                  border: `1px solid ${AIE_C.blue}`,
                  fontFamily: AIE_MONO,
                  fontSize: 13,
                  fontWeight: 700,
                  color: AIE_C.cyan,
                  letterSpacing: 1.5,
                }}
              >
                ● THE ARCHITECT OF MODERN AI
              </div>
              <div
                style={{
                  fontFamily: AIE_DISPLAY,
                  fontSize: 66,
                  fontWeight: 800,
                  letterSpacing: -1.5,
                  background: "linear-gradient(90deg, #FFFFFF 0%, #7DD3FC 52%, #C084FC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.08,
                }}
              >
                AI ENGINEER
              </div>
              <div style={{ fontFamily: AIE_DISPLAY, fontSize: 21, color: AIE_C.textMuted }}>
                Building intelligent software systems that power the modern digital world
              </div>
            </div>
          </div>
        )}
      </div>
    </AieSceneShell>
  );
};
