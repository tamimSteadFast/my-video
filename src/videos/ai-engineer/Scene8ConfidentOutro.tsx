import React from "react";
import { Img, interpolate, spring, staticFile } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { AIE_C, AIE_DISPLAY, AIE_LEAD_SEC, AIE_MONO } from "./narration";
import { AieSceneShell, useAieVoice } from "./SceneShell";

const JOURNEY_STEPS = [
  { num: "01", label: "AI Engineering Foundations", atSec: 0.4 },
  { num: "02", label: "Prompt Engineering & RAG", atSec: 1.6 },
  { num: "03", label: "AI Agents & Tool Calling", atSec: 2.8 },
  { num: "04", label: "Real-World Production Projects", atSec: 4.6 },
] as const;

export const Scene8ConfidentOutro: React.FC<{
  readonly showSubtitles?: boolean;
}> = ({ showSubtitles = true }) => {
  const { frame, fps, voiceSec } = useAieVoice("scene8");

  const portraitP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 0.1) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const projectBadgeP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 4.6) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const nextLessonP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 6.9) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const imgScale = interpolate(voiceSec, [0, 13.36], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AieSceneShell
      id="scene8"
      showSubtitles={showSubtitles}
      backdropImage="ai-engineer/ai-digital-world.png"
      backdropOpacity={0.34}
      sfx={[
        { atSec: AIE_LEAD_SEC + 4.6, type: "pop", volume: 0.24 },
        { atSec: AIE_LEAD_SEC + 6.9, type: "chime", volume: 0.3 },
      ]}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.06fr 0.94fr",
          gap: 32,
          height: "100%",
          paddingTop: 10,
          paddingBottom: 14,
        }}
      >
        {/* LEFT HERO VIEWPORT: Consistent AI Engineer Looking Confidently at Completed AI Application */}
        <div
          style={{
            position: "relative",
            borderRadius: 26,
            overflow: "hidden",
            border: `2px solid ${AIE_C.purple}`,
            boxShadow:
              "0 30px 80px rgba(0, 0, 0, 0.72), 0 0 46px rgba(124, 58, 237, 0.3)",
            opacity: portraitP,
            transform: `scale(${interpolate(portraitP, [0, 1], [0.96, 1])})`,
          }}
        >
          <Img
            src={staticFile("ai-engineer/engineer-confident.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${imgScale})`,
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(4, 7, 20, 0.2) 0%, transparent 45%, rgba(4, 7, 20, 0.9) 100%)",
            }}
          />

          {/* Top Live Deployment Chip */}
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 22,
              background: "rgba(6, 12, 30, 0.86)",
              border: `1px solid ${AIE_C.emerald}`,
              borderRadius: 12,
              padding: "9px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 99,
                background: AIE_C.emerald,
                boxShadow: `0 0 12px ${AIE_C.emerald}`,
              }}
            />
            <span style={{ fontFamily: AIE_MONO, fontSize: 13.5, fontWeight: 700, color: "#A7F3D0" }}>
              AI APPLICATION DEPLOYED · LIVE IN PRODUCTION
            </span>
          </div>

          {/* Bottom Completed App Status Bar */}
          <div
            style={{
              position: "absolute",
              left: 24,
              right: 24,
              bottom: 24,
              background: "rgba(9, 14, 36, 0.88)",
              border: `1px solid ${AIE_C.borderBlue}`,
              borderRadius: 18,
              padding: "18px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backdropFilter: "blur(14px)",
            }}
          >
            <div>
              <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.cyan, letterSpacing: 1.5 }}>
                SYSTEM COMPLETE
              </div>
              <div style={{ fontFamily: AIE_DISPLAY, fontSize: 26, fontWeight: 800, color: AIE_C.text, marginTop: 2 }}>
                Ready to Build Intelligent Systems
              </div>
            </div>
            <div style={{ textAlign: "right", fontFamily: AIE_MONO }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: AIE_C.emerald }}>99.98%</div>
              <div style={{ fontSize: 11.5, color: AIE_C.textDim }}>UPTIME</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Step-by-Step Learning Roadmap + Next Lesson Preview */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {/* Step-by-Step Learning Journey Card */}
          <div
            style={{
              background: AIE_C.panel,
              border: `1.5px solid ${AIE_C.borderBlue}`,
              borderRadius: 24,
              padding: "26px 28px",
              backdropFilter: "blur(16px)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: AIE_MONO, fontSize: 13, color: AIE_C.blue, letterSpacing: 1.6 }}>
                  LEARNING JOURNEY
                </div>
                <div style={{ fontFamily: AIE_DISPLAY, fontSize: 32, fontWeight: 800, color: AIE_C.text, marginTop: 4 }}>
                  Step-by-Step AI Engineering
                </div>
              </div>
              <div
                style={{
                  opacity: projectBadgeP,
                  transform: `scale(${interpolate(projectBadgeP, [0, 1], [0.85, 1])})`,
                  fontFamily: AIE_MONO,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: "#A7F3D0",
                  background: "rgba(16, 185, 129, 0.16)",
                  border: `1px solid ${AIE_C.emerald}`,
                  padding: "6px 14px",
                  borderRadius: 99,
                }}
              >
                REAL PROJECTS
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {JOURNEY_STEPS.map((st, idx) => {
                const sp = spring({
                  frame: frame - Math.round((AIE_LEAD_SEC + st.atSec) * fps),
                  fps,
                  config: SPRING_UI,
                });
                const lit = voiceSec >= st.atSec;
                const isLast = idx === 3;
                return (
                  <div
                    key={st.num}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      borderRadius: 14,
                      background:
                        isLast && lit
                          ? "linear-gradient(90deg, rgba(16, 185, 129, 0.18), rgba(56, 189, 248, 0.14))"
                          : lit
                            ? "rgba(56, 189, 248, 0.1)"
                            : "rgba(15, 23, 42, 0.5)",
                      border: `1px solid ${isLast && lit ? AIE_C.emerald : lit ? AIE_C.borderBlue : AIE_C.borderSubtle}`,
                      opacity: 0.25 + sp * 0.75,
                      transform: `translate3d(${interpolate(sp, [0, 1], [18, 0])}px, 0px, 0px)`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span
                        style={{
                          fontFamily: AIE_MONO,
                          fontSize: 14,
                          fontWeight: 700,
                          color: isLast ? AIE_C.emerald : AIE_C.cyan,
                          background: "rgba(6, 10, 26, 0.7)",
                          padding: "5px 10px",
                          borderRadius: 8,
                        }}
                      >
                        {st.num}
                      </span>
                      <span style={{ fontFamily: AIE_DISPLAY, fontSize: 20, fontWeight: 700, color: AIE_C.text }}>
                        {st.label}
                      </span>
                    </div>
                    <span style={{ fontFamily: AIE_MONO, fontSize: 14, color: isLast ? AIE_C.emerald : AIE_C.purple }}>
                      {lit ? "✓" : "•"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* UP NEXT: Lesson 02 Preview Card (at 6.90s) */}
          <div
            style={{
              opacity: nextLessonP,
              transform: `translate3d(0px, ${interpolate(nextLessonP, [0, 1], [24, 0])}px, 0px)`,
              background:
                "linear-gradient(135deg, rgba(14, 24, 58, 0.96) 0%, rgba(44, 18, 92, 0.96) 100%)",
              border: `2px solid ${AIE_C.purple}`,
              borderRadius: 24,
              padding: "26px 28px",
              boxShadow:
                "0 24px 64px rgba(124, 58, 237, 0.36), 0 0 32px rgba(56, 189, 248, 0.16)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: AIE_MONO,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  background: "linear-gradient(90deg, #0284C7, #7C3AED)",
                  padding: "6px 14px",
                  borderRadius: 99,
                  letterSpacing: 1.2,
                }}
              >
                UP NEXT · LESSON 02
              </span>
              <span style={{ fontFamily: AIE_MONO, fontSize: 13, color: AIE_C.cyan }}>
                STAY TUNED ➔
              </span>
            </div>

            {/* Split VS Comparison Teaser */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  background: "rgba(56, 189, 248, 0.14)",
                  border: `1.5px solid ${AIE_C.blue}`,
                  borderRadius: 16,
                  padding: "18px 16px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: AIE_MONO, fontSize: 11.5, color: AIE_C.cyan }}>ROLE A</div>
                <div style={{ fontFamily: AIE_DISPLAY, fontSize: 23, fontWeight: 800, color: AIE_C.text, marginTop: 4 }}>
                  AI Engineer
                </div>
              </div>

              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 99,
                  background: "linear-gradient(135deg, #38BDF8, #A855F7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: AIE_DISPLAY,
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#040714",
                }}
              >
                VS
              </div>

              <div
                style={{
                  background: "rgba(168, 85, 247, 0.16)",
                  border: `1.5px solid ${AIE_C.purple}`,
                  borderRadius: 16,
                  padding: "18px 16px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: AIE_MONO, fontSize: 11.5, color: "#D8B4FE" }}>ROLE B</div>
                <div style={{ fontFamily: AIE_DISPLAY, fontSize: 22, fontWeight: 800, color: AIE_C.text, marginTop: 4 }}>
                  ML Engineer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AieSceneShell>
  );
};
