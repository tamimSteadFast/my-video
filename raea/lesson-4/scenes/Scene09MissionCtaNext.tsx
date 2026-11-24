import React from "react";
import { interpolate } from "raea";
import { L4_C, L4_FONT_BN, L4_FONT_DISPLAY, L4_FONT_MONO, SPRING_HERO } from "../narration";
import {
  FocusCard,
  GlyphIcon,
  RolePill,
  clamp,
  springAt,
  useVoice,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

export const Scene09MissionCtaNext: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene9");

  // Exact acoustic beats from scene_09_energetic_scene_9.wav (14.80s):
  // 0.25-2.85: Our goal is not just knowing AI
  // 3.15-6.55: Rather Step by Step building real AI Applications
  // 7.05-9.65: Do you want to become an AI Engineer? Tell us in comments!
  // 9.93-14.45: Next Lesson -> What is a Large Language Model (LLM)?
  const missionPop = springAt(frame, fps, 0.2, SPRING_HERO);
  const buildPop = springAt(frame, fps, 3.1, SPRING_HERO);
  const ctaPop = springAt(frame, fps, 6.95, SPRING_HERO);
  const nextPop = springAt(frame, fps, 9.85, SPRING_HERO);

  const isBuild = voiceSec >= 3.1;
  const isCta = voiceSec >= 6.95 && voiceSec < 9.85;
  const isNext = voiceSec >= 9.85;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 9);

  return (
    <SceneShell
      id="scene9"
      sfx={[
        { atVoiceSec: 0.25, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 3.15, kind: "pop", volume: 0.16 },
        { atVoiceSec: 7.0, kind: "pop", volume: 0.18 },
        { atVoiceSec: 9.9, kind: "chime", volume: 0.2 },
      ]}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        {/* 1. MISSION CARD: NOT JUST THEORY -> STEP BY STEP REAL AI APPS (0.2s - 6.7s) */}
        <FocusCard
          accent={L4_C.cyan}
          active={!isCta && !isNext}
          appear={missionPop}
          padding="28px 30px"
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <RolePill label="OUR MISSION" color={L4_C.cyan} bg={L4_C.cyanBg} fontSize={19} />
            <span style={{ fontFamily: L4_FONT_MONO, fontSize: 17, color: L4_C.emeraldSoft, fontWeight: 700 }}>
              LEARN → BUILD → SHIP
            </span>
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            {/* Left: Not just theory */}
            <div
              style={{
                flex: 1,
                background: "rgba(244, 63, 94, 0.11)",
                border: "1.5px solid rgba(244, 63, 94, 0.48)",
                borderRadius: 18,
                padding: "18px 20px",
                opacity: isBuild ? 0.72 : 1,
              }}
            >
              <div style={{ fontFamily: L4_FONT_MONO, fontSize: 16, fontWeight: 700, color: L4_C.rose }}>
                ✕ NOT JUST THEORY
              </div>
              <div
                style={{
                  fontFamily: L4_FONT_BN,
                  fontSize: 25,
                  fontWeight: 700,
                  color: L4_C.textMuted,
                  marginTop: 8,
                }}
              >
                শুধু AI সম্পর্কে জানা নয়
              </div>
            </div>

            {/* Right: Step by Step Real AI Apps */}
            <div
              style={{
                flex: 1.35,
                background: isBuild ? L4_C.emeraldBg : "rgba(10, 18, 42, 0.85)",
                border: `2px solid ${isBuild ? L4_C.emerald : L4_C.borderSubtle}`,
                borderRadius: 18,
                padding: "18px 20px",
                opacity: buildPop,
                transform: `scale(${interpolate(buildPop, [0, 1], [0.94, 1], clamp)})`,
              }}
            >
              <div style={{ fontFamily: L4_FONT_MONO, fontSize: 16, fontWeight: 700, color: L4_C.emeraldSoft }}>
                ✓ STEP BY STEP EXECUTION
              </div>
              <div
                style={{
                  fontFamily: L4_FONT_BN,
                  fontSize: 27,
                  fontWeight: 800,
                  color: L4_C.text,
                  marginTop: 8,
                }}
              >
                বাস্তব AI Application তৈরি করা
              </div>
            </div>
          </div>

          {/* 3-Step Progression Strip */}
          <div style={{ display: "flex", gap: 12, marginTop: 18, opacity: buildPop }}>
            {["01 · Foundations", "02 · APIs & RAG", "03 · Real AI Apps"].map((step, i) => (
              <div
                key={step}
                style={{
                  flex: 1,
                  background: "rgba(6, 12, 32, 0.92)",
                  border: `1px solid ${i === 2 ? L4_C.emerald : L4_C.borderCyan}`,
                  borderRadius: 12,
                  padding: "10px 14px",
                  textAlign: "center",
                  fontFamily: L4_FONT_MONO,
                  fontSize: 16,
                  fontWeight: 700,
                  color: i === 2 ? L4_C.emeraldSoft : L4_C.cyanSoft,
                }}
              >
                {step}
              </div>
            ))}
          </div>
        </FocusCard>

        {/* 2. INTERACTIVE AUDIENCE CTA CARD (7.0s - 9.75s) */}
        <FocusCard accent={L4_C.amber} active={isCta} appear={ctaPop} padding="28px 32px">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                fontFamily: L4_FONT_BN,
                fontSize: 42,
                fontWeight: 800,
                color: L4_C.text,
                lineHeight: 1.25,
              }}
            >
              তুমি কি <span style={{ color: L4_C.cyan }}>AI Engineer</span> হতে চাও?
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                background: "linear-gradient(90deg, rgba(0,229,255,0.2), rgba(245,158,11,0.22))",
                border: `2px solid ${L4_C.amberSoft}`,
                borderRadius: 999,
                padding: "12px 32px",
                boxShadow: isCta ? `0 0 ${18 + pulse * 18}px rgba(245, 158, 11, 0.35)` : "none",
              }}
            >
              <GlyphIcon kind="chat" color={L4_C.amberSoft} size={28} />
              <span
                style={{
                  fontFamily: L4_FONT_BN,
                  fontSize: 30,
                  fontWeight: 800,
                  color: L4_C.amberSoft,
                }}
              >
                কমেন্টে জানাও!
              </span>
            </div>
          </div>
        </FocusCard>

        {/* 3. UP NEXT TEASER: LESSON 05 — LARGE LANGUAGE MODEL (LLM) (9.85s - 14.80s) */}
        <FocusCard accent={L4_C.violet} active={isNext} appear={nextPop} padding="30px 32px">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <RolePill
              label="UP NEXT · LESSON 05"
              color={L4_C.violetSoft}
              bg={L4_C.violetBg}
              fontSize={20}
            />
            <GlyphIcon kind="spark" color={L4_C.orchid} size={38} />
          </div>

          <div
            style={{
              fontFamily: L4_FONT_DISPLAY,
              fontSize: 44,
              fontWeight: 800,
              color: L4_C.text,
              lineHeight: 1.15,
            }}
          >
            Large Language Model (LLM)
          </div>
          <div
            style={{
              fontFamily: L4_FONT_BN,
              fontSize: 32,
              fontWeight: 700,
              color: L4_C.violetSoft,
              marginTop: 8,
            }}
          >
            LLM আসলে কী এবং কীভাবে কাজ করে?
          </div>

          {/* Animated Token Stream Preview Bar */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {["Tokens", "→", "Transformers", "→", "Next-Word AI"].map((tok, idx) => (
              <div
                key={idx}
                style={{
                  padding: tok === "→" ? "8px 4px" : "8px 16px",
                  background: tok === "→" ? "transparent" : "rgba(168, 85, 247, 0.16)",
                  border: tok === "→" ? "none" : `1.5px solid ${L4_C.borderViolet}`,
                  borderRadius: 10,
                  fontFamily: L4_FONT_MONO,
                  fontSize: 18,
                  fontWeight: 700,
                  color: tok === "→" ? L4_C.cyan : L4_C.text,
                }}
              >
                {tok}
              </div>
            ))}
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
