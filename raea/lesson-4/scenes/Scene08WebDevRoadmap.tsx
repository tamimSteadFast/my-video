import React from "react";
import { interpolate } from "raea";
import { L4_C, L4_FONT_BN, L4_FONT_DISPLAY, L4_FONT_MONO, SPRING_HERO } from "../narration";
import {
  FocusCard,
  GlyphIcon,
  clamp,
  springAt,
  useVoice,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

const ROADMAP_SKILLS = [
  { num: "01", name: "Python", sub: "Core AI Scripting", atSec: 6.85 },
  { num: "02", name: "LLM API", sub: "OpenAI · Gemini · SDKs", atSec: 7.65 },
  { num: "03", name: "Prompt Engineering", sub: "Structured Reliable Output", atSec: 9.0 },
  { num: "04", name: "Embeddings", sub: "Semantic Meaning Vectors", atSec: 10.3 },
  { num: "05", name: "Vector Database", sub: "Fast Similarity Retrieval", atSec: 11.25 },
  { num: "06", name: "RAG", sub: "Context-Grounded Apps", atSec: 12.4 },
] as const;

export const Scene08WebDevRoadmap: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene8");

  // Exact acoustic beats from scene_08_inspirational_scene_8.wav (17.12s):
  // 0.25-2.15: If you are a Web Developer
  // 2.35-6.00: Starting with AI Engineering is a Practical Approach
  // 6.55-13.40: Python (7.0), LLM API (7.8), Prompt Engineering (9.2), Embeddings (10.5), Vector Database (11.4), RAG (12.6)
  // 13.95-16.90: Build your own AI-powered Application
  const webPop = springAt(frame, fps, 0.2, SPRING_HERO);
  const pathPop = springAt(frame, fps, 2.3, SPRING_HERO);
  const ladderPop = springAt(frame, fps, 6.45, SPRING_HERO);
  const launchPop = springAt(frame, fps, 13.85, SPRING_HERO);

  const isLaunching = voiceSec >= 13.85;

  return (
    <SceneShell
      id="scene8"
      sfx={[
        { atVoiceSec: 0.25, kind: "pop", volume: 0.16 },
        { atVoiceSec: 6.9, kind: "click", volume: 0.14 },
        { atVoiceSec: 7.7, kind: "click", volume: 0.14 },
        { atVoiceSec: 9.05, kind: "click", volume: 0.14 },
        { atVoiceSec: 10.35, kind: "click", volume: 0.14 },
        { atVoiceSec: 11.3, kind: "click", volume: 0.14 },
        { atVoiceSec: 12.45, kind: "pop", volume: 0.16 },
        { atVoiceSec: 13.9, kind: "chime", volume: 0.2 },
      ]}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 18,
        }}
      >
        {/* TOP TRANSITION BANNER: WEB DEVELOPER -> AI ENGINEERING (0.2s - 6.2s) */}
        <FocusCard accent={L4_C.cyan} active={!isLaunching} appear={webPop} padding="24px 28px">
          <div
            style={{
              fontFamily: L4_FONT_MONO,
              fontSize: 17,
              fontWeight: 700,
              color: L4_C.cyan,
              letterSpacing: 1.6,
              marginBottom: 14,
            }}
          >
            PRACTICAL STARTING APPROACH
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                flex: 1,
                background: "rgba(15, 25, 58, 0.92)",
                border: `2px solid ${L4_C.borderCyan}`,
                borderRadius: 18,
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <GlyphIcon kind="code" color={L4_C.cyanSoft} size={34} />
              <div>
                <div style={{ fontFamily: L4_FONT_DISPLAY, fontSize: 27, fontWeight: 800, color: L4_C.text }}>
                  Web Developer
                </div>
                <div style={{ fontFamily: L4_FONT_MONO, fontSize: 15, color: L4_C.textMuted }}>
                  YOUR CURRENT SKILLS
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: L4_FONT_MONO,
                fontSize: 34,
                fontWeight: 800,
                color: L4_C.emeraldSoft,
                opacity: pathPop,
              }}
            >
              ⟶
            </div>

            <div
              style={{
                flex: 1,
                background: L4_C.emeraldBg,
                border: `2px solid ${L4_C.emerald}`,
                borderRadius: 18,
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                opacity: pathPop,
                transform: `scale(${interpolate(pathPop, [0, 1], [0.92, 1], clamp)})`,
              }}
            >
              <GlyphIcon kind="chip" color={L4_C.emeraldSoft} size={34} />
              <div>
                <div style={{ fontFamily: L4_FONT_DISPLAY, fontSize: 27, fontWeight: 800, color: L4_C.text }}>
                  AI Engineering
                </div>
                <div style={{ fontFamily: L4_FONT_MONO, fontSize: 15, color: L4_C.emeraldSoft }}>
                  FASTEST ON-RAMP
                </div>
              </div>
            </div>
          </div>
        </FocusCard>

        {/* MIDDLE: 6-STEP SKILL ROADMAP (6.5s - 13.6s) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: ladderPop,
            transform: `translate3d(0px, ${interpolate(ladderPop, [0, 1], [22, 0], clamp)}px, 0px)`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span
              style={{
                fontFamily: L4_FONT_MONO,
                fontSize: 18,
                fontWeight: 700,
                color: L4_C.cyan,
                letterSpacing: 1.5,
              }}
            >
              6-STEP LEARNING ROADMAP
            </span>
            <span style={{ fontFamily: L4_FONT_BN, fontSize: 21, fontWeight: 700, color: L4_C.textMuted }}>
              ধাপে ধাপে যা শিখবে
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
              alignContent: "flex-start",
            }}
          >
            {ROADMAP_SKILLS.map((skill, idx) => {
              const lit = voiceSec >= skill.atSec;
              const nextSec = idx < ROADMAP_SKILLS.length - 1 ? ROADMAP_SKILLS[idx + 1].atSec : 13.85;
              const isCurrent = voiceSec >= skill.atSec && voiceSec < nextSec;
              const pop = springAt(frame, fps, skill.atSec);
              const accent = isLaunching ? L4_C.emerald : L4_C.cyan;

              return (
                <div
                  key={skill.num}
                  style={{
                    width: "calc(50% - 9px)",
                    height: 222,
                    background: isCurrent
                      ? "linear-gradient(155deg, rgba(10, 36, 56, 0.98), rgba(8, 18, 40, 0.98))"
                      : lit
                        ? "rgba(11, 22, 48, 0.94)"
                        : "rgba(9, 15, 34, 0.72)",
                    border: `2px solid ${isCurrent ? accent : lit ? `${accent}88` : L4_C.borderSubtle}`,
                    borderRadius: 20,
                    padding: "20px 22px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    opacity: lit ? 1 : 0.42,
                    transform: `scale(${lit ? interpolate(pop, [0, 1], [0.92, isCurrent ? 1.02 : 1], clamp) : 0.96})`,
                    boxShadow: isCurrent ? `0 14px 36px ${accent}33` : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        background: lit ? `${accent}24` : "rgba(148,163,184,0.1)",
                        border: `1.5px solid ${lit ? accent : L4_C.borderSubtle}`,
                        borderRadius: 10,
                        padding: "4px 12px",
                        fontFamily: L4_FONT_MONO,
                        fontSize: 18,
                        fontWeight: 700,
                        color: lit ? accent : L4_C.textDim,
                      }}
                    >
                      {skill.num}
                    </span>
                    {lit ? <GlyphIcon kind="check" color={accent} size={26} /> : null}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: L4_FONT_DISPLAY,
                        fontSize: 28,
                        fontWeight: 800,
                        color: lit ? L4_C.text : L4_C.textDim,
                        lineHeight: 1.2,
                      }}
                    >
                      {skill.name}
                    </div>
                    <div
                      style={{
                        fontFamily: L4_FONT_MONO,
                        fontSize: 16,
                        color: lit ? L4_C.textMuted : L4_C.textDim,
                        marginTop: 5,
                      }}
                    >
                      {skill.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM LAUNCH CARD: BUILD YOUR OWN AI-POWERED APP (13.85s+) */}
        <FocusCard
          accent={L4_C.emerald}
          active={isLaunching}
          appear={launchPop}
          padding="24px 30px"
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: L4_C.emeraldBg,
                  border: `2px solid ${L4_C.emerald}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GlyphIcon kind="rocket" color={L4_C.emeraldSoft} size={40} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: L4_FONT_MONO,
                    fontSize: 17,
                    fontWeight: 700,
                    color: L4_C.emeraldSoft,
                    letterSpacing: 1.5,
                  }}
                >
                  FINAL MILESTONE · SHIP REAL WORK
                </div>
                <div
                  style={{
                    fontFamily: L4_FONT_DISPLAY,
                    fontSize: 34,
                    fontWeight: 800,
                    color: L4_C.text,
                    marginTop: 2,
                  }}
                >
                  Build Your Own AI-Powered App
                </div>
              </div>
            </div>
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
