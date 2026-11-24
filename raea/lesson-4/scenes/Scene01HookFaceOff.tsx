import React from "react";
import { interpolate } from "raea";
import { L4_C, L4_FONT_BN, L4_FONT_DISPLAY, L4_FONT_MONO, SPRING_HERO } from "../narration";
import { FocusCard, GlyphIcon, RolePill, clamp, springAt, useVoice } from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

export const Scene01HookFaceOff: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene1");

  // Exact acoustic beats from scene_01_curious_scene_1.wav (10.96s)
  // 0.20-2.15: "তুমি যদি AI Engineering শিখতে চাও"
  // 2.35-4.85: "তাহলে প্রথমেই একটি বিষয় পরিষ্কারভাবে জানা দরকার"
  // 5.50-8.48: "AI Engineer এবং ML Engineer কি একই কাজ করেন?"
  // 8.65-10.70: "নাকি তাদের মধ্যে রয়েছে গুরুত্বপূর্ণ পার্থক্য?"
  const heroPop = springAt(frame, fps, 0.1, SPRING_HERO);
  const clarifyPop = springAt(frame, fps, 2.3);
  const aiPop = springAt(frame, fps, 5.4, SPRING_HERO);
  const mlPop = springAt(frame, fps, 6.2, SPRING_HERO);
  const badgePop = springAt(frame, fps, 5.8);
  const diffFlip = springAt(frame, fps, 8.6, SPRING_HERO);

  const isDiffMode = voiceSec >= 8.55;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 10);
  const cardSplitOffset = interpolate(diffFlip, [0, 1], [0, 12], clamp);

  return (
    <SceneShell
      id="scene1"
      sfx={[
        { atVoiceSec: 0.15, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 5.45, kind: "pop", volume: 0.18 },
        { atVoiceSec: 8.6, kind: "chime", volume: 0.2 },
      ]}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* TOP HEADER BLOCK (0.1s - 5.1s) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            opacity: heroPop,
            transform: `translate3d(0px, ${interpolate(heroPop, [0, 1], [24, 0], clamp)}px, 0px)`,
          }}
        >
          <RolePill
            label="AI ENGINEERING SERIES · LESSON 04"
            color={L4_C.cyan}
            bg={L4_C.cyanBg}
            fontSize={19}
          />
          <div
            style={{
              fontFamily: L4_FONT_DISPLAY,
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.12,
              marginTop: 18,
              color: L4_C.text,
              letterSpacing: -1,
            }}
          >
            AI Engineer{" "}
            <span style={{ color: L4_C.textDim, fontSize: 44, fontWeight: 700 }}>vs</span>{" "}
            <span style={{ color: L4_C.violetSoft }}>ML Engineer</span>
          </div>
          <div
            style={{
              marginTop: 16,
              background: "rgba(12, 22, 50, 0.85)",
              border: `1.5px solid ${L4_C.borderSubtle}`,
              borderRadius: 16,
              padding: "12px 26px",
              fontFamily: L4_FONT_BN,
              fontSize: 28,
              fontWeight: 600,
              color: L4_C.textMuted,
              opacity: clarifyPop,
              transform: `translate3d(0px, ${interpolate(clarifyPop, [0, 1], [16, 0], clamp)}px, 0px)`,
            }}
          >
            শুরুতেই একটি মৌলিক প্রশ্ন পরিষ্কার করা দরকার
          </div>
        </div>

        {/* MAIN VERTICAL SHOWDOWN STAGE (5.4s -> 10.96s) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
          }}
        >
          {/* AI ENGINEER CARD */}
          <FocusCard
            accent={L4_C.cyan}
            active={voiceSec >= 5.3}
            appear={aiPop}
            padding="28px 32px"
            style={{
              transform: `translate3d(0px, ${interpolate(aiPop, [0, 1], [-28, -cardSplitOffset], clamp)}px, 0px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 20,
                    background: L4_C.cyanBg,
                    border: `2px solid ${L4_C.cyan}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GlyphIcon kind="chip" color={L4_C.cyan} size={42} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: L4_FONT_MONO,
                      fontSize: 18,
                      fontWeight: 700,
                      color: L4_C.cyan,
                      letterSpacing: 1.5,
                    }}
                  >
                    ROLE 01 · APPLICATION LAYER
                  </div>
                  <div
                    style={{
                      fontFamily: L4_FONT_DISPLAY,
                      fontSize: 42,
                      fontWeight: 800,
                      color: L4_C.text,
                      marginTop: 4,
                    }}
                  >
                    AI Engineer
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: L4_FONT_MONO,
                  fontSize: 18,
                  color: L4_C.cyanSoft,
                  background: "rgba(0, 229, 255, 0.1)",
                  border: `1px solid ${L4_C.borderCyan}`,
                  padding: "8px 14px",
                  borderRadius: 12,
                  fontWeight: 700,
                }}
              >
                APIs · RAG · Apps
              </div>
            </div>
          </FocusCard>

          {/* CENTER CLASH EMBLEM: "?" (5.5s-8.5s) -> "≠ KEY DIFFERENCE" (8.6s+) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              height: 112,
              opacity: badgePop,
              transform: `scale(${interpolate(badgePop, [0, 1], [0.7, 1], clamp)})`,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 3,
                background: isDiffMode
                  ? `linear-gradient(90deg, transparent, ${L4_C.cyan})`
                  : `linear-gradient(90deg, transparent, ${L4_C.borderSubtle})`,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: isDiffMode
                  ? "linear-gradient(135deg, rgba(0,229,255,0.22), rgba(168,85,247,0.28))"
                  : "rgba(15, 23, 48, 0.96)",
                border: `2.5px solid ${isDiffMode ? L4_C.amber : L4_C.borderSubtle}`,
                borderRadius: 999,
                padding: "16px 34px",
                boxShadow: isDiffMode
                  ? `0 0 ${24 + pulse * 16}px rgba(245, 158, 11, 0.4)`
                  : "0 12px 30px rgba(0, 0, 0, 0.6)",
              }}
            >
              <span
                style={{
                  fontFamily: L4_FONT_DISPLAY,
                  fontSize: 44,
                  fontWeight: 800,
                  color: isDiffMode ? L4_C.amberSoft : L4_C.cyan,
                }}
              >
                {isDiffMode ? "≠" : "?"}
              </span>
              <span
                style={{
                  fontFamily: L4_FONT_BN,
                  fontSize: 30,
                  fontWeight: 700,
                  color: L4_C.text,
                }}
              >
                {isDiffMode ? "গুরুত্বপূর্ণ পার্থক্য রয়েছে" : "একই কাজ করেন?"}
              </span>
            </div>
            <div
              style={{
                flex: 1,
                height: 3,
                background: isDiffMode
                  ? `linear-gradient(90deg, ${L4_C.violet}, transparent)`
                  : `linear-gradient(90deg, ${L4_C.borderSubtle}, transparent)`,
              }}
            />
          </div>

          {/* ML ENGINEER CARD */}
          <FocusCard
            accent={L4_C.violet}
            active={voiceSec >= 6.1}
            appear={mlPop}
            padding="28px 32px"
            style={{
              transform: `translate3d(0px, ${interpolate(mlPop, [0, 1], [28, cardSplitOffset], clamp)}px, 0px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 20,
                    background: L4_C.violetBg,
                    border: `2px solid ${L4_C.violet}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GlyphIcon kind="brain" color={L4_C.violetSoft} size={42} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: L4_FONT_MONO,
                      fontSize: 18,
                      fontWeight: 700,
                      color: L4_C.violetSoft,
                      letterSpacing: 1.5,
                    }}
                  >
                    ROLE 02 · MODEL & DATA LAYER
                  </div>
                  <div
                    style={{
                      fontFamily: L4_FONT_DISPLAY,
                      fontSize: 42,
                      fontWeight: 800,
                      color: L4_C.text,
                      marginTop: 4,
                    }}
                  >
                    ML Engineer
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: L4_FONT_MONO,
                  fontSize: 18,
                  color: L4_C.orchid,
                  background: "rgba(168, 85, 247, 0.14)",
                  border: `1px solid ${L4_C.borderViolet}`,
                  padding: "8px 14px",
                  borderRadius: 12,
                  fontWeight: 700,
                }}
              >
                Data · Train · Deploy
              </div>
            </div>
          </FocusCard>
        </div>

        {/* BOTTOM FOOTER CALLOUT */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            opacity: diffFlip,
            transform: `translate3d(0px, ${interpolate(diffFlip, [0, 1], [16, 0], clamp)}px, 0px)`,
          }}
        >
          <div
            style={{
              fontFamily: L4_FONT_MONO,
              fontSize: 20,
              fontWeight: 700,
              color: L4_C.amberSoft,
              letterSpacing: 1.6,
            }}
          >
            LET&apos;S BREAK DOWN BOTH ROLES STEP BY STEP →
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
