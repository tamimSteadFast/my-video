import React from "react";
import { interpolate } from "raea";
import { L4_C, L4_FONT_BN, L4_FONT_DISPLAY, L4_FONT_MONO, SPRING_HERO } from "../narration";
import {
  FocusCard,
  GlyphIcon,
  RolePill,
  SectionHeading,
  clamp,
  springAt,
  useVoice,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

const ML_VERBS = [
  { label: "Build", bn: "তৈরি", atSec: 10.6 },
  { label: "Train", bn: "ট্রেন", atSec: 11.95 },
  { label: "Optimize", bn: "অপ্টিমাইজ", atSec: 12.6 },
  { label: "Deploy", bn: "ডিপ্লয়", atSec: 13.35 },
] as const;

export const Scene06CoreDifference: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene6");

  // Exact acoustic beats from scene_06_educational_scene_6.wav (14.88s):
  // 0.25-2.00: "তাহলে মূল পার্থক্যটা কোথায়?"
  // 2.80-7.90: AI Engineer focus -> Intelligent Application
  // 8.40-14.55: ML Engineer focus -> Data -> Build, Train, Optimize, Deploy
  const headPop = springAt(frame, fps, 0.15, SPRING_HERO);
  const aiCardPop = springAt(frame, fps, 2.7, SPRING_HERO);
  const mlCardPop = springAt(frame, fps, 8.25, SPRING_HERO);

  const aiActive = voiceSec >= 2.65 && voiceSec < 8.25;
  const mlActive = voiceSec >= 8.25;
  const bothSummary = voiceSec >= 13.9;

  return (
    <SceneShell
      id="scene6"
      sfx={[
        { atVoiceSec: 0.2, kind: "pop", volume: 0.15 },
        { atVoiceSec: 2.75, kind: "whoosh", volume: 0.16 },
        { atVoiceSec: 8.3, kind: "whoosh", volume: 0.16 },
        { atVoiceSec: 13.4, kind: "chime", volume: 0.18 },
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
        {/* TOP EDITORIAL HEADLINE (0.15s+) */}
        <SectionHeading
          eyebrow="CORE COMPARISON · SIDE BY SIDE"
          title="The Core Difference"
          subtitle="তাহলে দুই Role-এর মূল পার্থক্যটা কোথায়?"
          accent={L4_C.amberSoft}
          appear={headPop}
        />

        {/* SPOTLIGHT 01: AI ENGINEER (2.7s - 8.2s) */}
        <FocusCard
          accent={L4_C.cyan}
          active={aiActive || bothSummary}
          dimmed={mlActive && !bothSummary}
          appear={aiCardPop}
          padding="30px 32px"
          style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <RolePill label="AI ENGINEER · FOCUS" color={L4_C.cyan} bg={L4_C.cyanBg} fontSize={20} />
            <GlyphIcon kind="chip" color={L4_C.cyan} size={42} />
          </div>

          <div>
            <div
              style={{
                fontFamily: L4_FONT_DISPLAY,
                fontSize: 44,
                fontWeight: 800,
                color: L4_C.text,
                lineHeight: 1.15,
              }}
            >
              Build Intelligent Applications
            </div>
            <div
              style={{
                fontFamily: L4_FONT_BN,
                fontSize: 27,
                fontWeight: 600,
                color: L4_C.textMuted,
                marginTop: 8,
              }}
            >
              AI Model ব্যবহার করে বাস্তব Intelligent Application তৈরি করা
            </div>
          </div>

          {/* 3-Node Horizontal Flow */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {["AI Model", "API & Stack", "Intelligent App"].map((label, idx) => (
              <React.Fragment key={label}>
                <div
                  style={{
                    flex: 1,
                    background: idx === 2 ? L4_C.cyanBg : "rgba(10, 18, 42, 0.9)",
                    border: `1.5px solid ${idx === 2 ? L4_C.cyan : L4_C.borderCyan}`,
                    borderRadius: 14,
                    padding: "14px 12px",
                    textAlign: "center",
                    fontFamily: L4_FONT_DISPLAY,
                    fontSize: 22,
                    fontWeight: 800,
                    color: idx === 2 ? L4_C.cyan : L4_C.text,
                  }}
                >
                  {label}
                </div>
                {idx < 2 ? (
                  <span style={{ fontFamily: L4_FONT_MONO, fontSize: 26, color: L4_C.cyan, fontWeight: 700 }}>
                    →
                  </span>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </FocusCard>

        {/* DIVIDER VS LINE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            opacity: mlCardPop,
          }}
        >
          <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, transparent, ${L4_C.cyan})` }} />
          <div
            style={{
              background: "rgba(12, 20, 46, 0.96)",
              border: `1.5px solid ${L4_C.borderSubtle}`,
              borderRadius: 999,
              padding: "6px 22px",
              fontFamily: L4_FONT_MONO,
              fontSize: 19,
              fontWeight: 700,
              color: L4_C.amberSoft,
            }}
          >
            APP BUILDER vs MODEL BUILDER
          </div>
          <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, ${L4_C.violet}, transparent)` }} />
        </div>

        {/* SPOTLIGHT 02: ML ENGINEER (8.3s - 14.88s) */}
        <FocusCard
          accent={L4_C.violet}
          active={mlActive}
          dimmed={!mlActive}
          appear={mlCardPop}
          padding="30px 32px"
          style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <RolePill
              label="ML ENGINEER · FOCUS"
              color={L4_C.violetSoft}
              bg={L4_C.violetBg}
              fontSize={20}
            />
            <GlyphIcon kind="brain" color={L4_C.violetSoft} size={42} />
          </div>

          <div>
            <div
              style={{
                fontFamily: L4_FONT_DISPLAY,
                fontSize: 44,
                fontWeight: 800,
                color: L4_C.text,
                lineHeight: 1.15,
              }}
            >
              Engineer Models from Data
            </div>
            <div
              style={{
                fontFamily: L4_FONT_BN,
                fontSize: 27,
                fontWeight: 600,
                color: L4_C.textMuted,
                marginTop: 8,
              }}
            >
              Data থেকে Model তৈরি, Train, Optimize এবং Deploy করা
            </div>
          </div>

          {/* 4 Spoken Action Pills */}
          <div style={{ display: "flex", gap: 12 }}>
            {ML_VERBS.map((v) => {
              const lit = voiceSec >= v.atSec;
              const pop = springAt(frame, fps, v.atSec);
              return (
                <div
                  key={v.label}
                  style={{
                    flex: 1,
                    background: lit ? L4_C.violetBg : "rgba(10, 18, 42, 0.85)",
                    border: `2px solid ${lit ? L4_C.violetSoft : L4_C.borderSubtle}`,
                    borderRadius: 14,
                    padding: "14px 10px",
                    textAlign: "center",
                    opacity: lit ? 1 : 0.45,
                    transform: `scale(${lit ? interpolate(pop, [0, 1], [0.9, 1], clamp) : 0.96})`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: L4_FONT_DISPLAY,
                      fontSize: 24,
                      fontWeight: 800,
                      color: lit ? L4_C.text : L4_C.textDim,
                    }}
                  >
                    {v.label}
                  </div>
                  <div
                    style={{
                      fontFamily: L4_FONT_BN,
                      fontSize: 18,
                      fontWeight: 600,
                      color: lit ? L4_C.violetSoft : L4_C.textDim,
                      marginTop: 3,
                    }}
                  >
                    {v.bn}
                  </div>
                </div>
              );
            })}
          </div>
        </FocusCard>
      </div>
    </SceneShell>
  );
};
