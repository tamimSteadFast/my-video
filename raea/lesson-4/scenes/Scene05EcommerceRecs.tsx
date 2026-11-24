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

const REC_ITEMS = [
  { name: "Wireless Headphones", tag: "Audio · Top Pick" },
  { name: "Smart Fitness Watch", tag: "Wearables · Similar" },
  { name: "Mechanical Keyboard", tag: "Workspace · Bought Next" },
] as const;

export const Scene05EcommerceRecs: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene5");

  // Exact acoustic beats from scene_05_explanatory_scene_5.wav (15.28s):
  // 0.20-6.10: E-commerce Website -> Product Recommendation System
  // 6.40-12.10: ML Engineer analyzes Customer's old Activity (~9.1s) + Purchase History (~10.3s)
  // 12.25-14.90: Build & Train Recommendation Model
  const storePop = springAt(frame, fps, 0.2, SPRING_HERO);
  const dataPop = springAt(frame, fps, 6.4, SPRING_HERO);
  const actPop = springAt(frame, fps, 8.9);
  const histPop = springAt(frame, fps, 10.2);
  const modelPop = springAt(frame, fps, 12.2, SPRING_HERO);

  const actLit = voiceSec >= 8.9;
  const histLit = voiceSec >= 10.2;
  const trainLit = voiceSec >= 12.2;
  const epochNum = Math.round(interpolate(voiceSec, [12.2, 14.8], [1, 50], clamp));
  const trainBar = interpolate(voiceSec, [12.2, 14.8], [8, 100], clamp);

  return (
    <SceneShell
      id="scene5"
      sfx={[
        { atVoiceSec: 0.25, kind: "pop", volume: 0.16 },
        { atVoiceSec: 6.4, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 8.95, kind: "click", volume: 0.15 },
        { atVoiceSec: 10.25, kind: "click", volume: 0.15 },
        { atVoiceSec: 12.25, kind: "chime", volume: 0.18 },
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
          <RolePill
            label="ML ENGINEER · EXAMPLE"
            color={L4_C.violetSoft}
            bg={L4_C.violetBg}
            fontSize={19}
          />
          <span style={{ fontFamily: L4_FONT_MONO, fontSize: 18, color: L4_C.amberSoft, fontWeight: 700 }}>
            E-COMMERCE RECSYS
          </span>
        </div>

        {/* 1. E-COMMERCE STOREFRONT CARD (0.2s+) */}
        <FocusCard
          accent={L4_C.violet}
          active={voiceSec < 6.4}
          appear={storePop}
          padding="22px 26px"
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 16,
                  background: L4_C.amberBg,
                  border: `2px solid ${L4_C.amber}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GlyphIcon kind="cart" color={L4_C.amberSoft} size={36} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: L4_FONT_MONO,
                    fontSize: 17,
                    color: L4_C.amberSoft,
                    fontWeight: 700,
                    letterSpacing: 1.4,
                  }}
                >
                  E-COMMERCE WEBSITE
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
                  Product Recommendation System
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              background: "rgba(6, 11, 28, 0.88)",
              border: `1px solid ${L4_C.borderSubtle}`,
              borderRadius: 14,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontFamily: L4_FONT_BN, fontSize: 23, color: L4_C.textMuted, fontWeight: 600 }}>
              প্রতিটি Customer-এর পছন্দ অনুযায়ী Product সাজেশন
            </span>
            <span
              style={{
                fontFamily: L4_FONT_MONO,
                fontSize: 16,
                fontWeight: 700,
                color: L4_C.violetSoft,
                background: L4_C.violetBg,
                padding: "6px 12px",
                borderRadius: 8,
              }}
            >
              PERSONALIZED
            </span>
          </div>
        </FocusCard>

        {/* BEAM 1 */}
        <VerticalBeam
          height={94}
          color={L4_C.amberSoft}
          active={voiceSec >= 6.4}
          frame={frame}
          label="ANALYZE CUSTOMER DATA"
        />

        {/* 2. CUSTOMER DATA ANALYSIS: PAST ACTIVITY + PURCHASE HISTORY (6.4s+) */}
        <FocusCard
          accent={L4_C.amber}
          active={voiceSec >= 6.4 && !trainLit}
          appear={dataPop}
          padding="20px 26px"
        >
          <div
            style={{
              fontFamily: L4_FONT_MONO,
              fontSize: 17,
              fontWeight: 700,
              color: L4_C.amberSoft,
              letterSpacing: 1.4,
              marginBottom: 14,
            }}
          >
            INPUT TRAINING SIGNALS · BEHAVIORAL DATASET
          </div>

          <div style={{ display: "flex", gap: 18 }}>
            {/* Past Activity */}
            <div
              style={{
                flex: 1,
                background: actLit ? L4_C.amberBg : "rgba(10, 18, 42, 0.78)",
                border: `2px solid ${actLit ? L4_C.amber : L4_C.borderSubtle}`,
                borderRadius: 18,
                padding: "18px 20px",
                opacity: actLit ? 1 : 0.55,
                transform: `scale(${actLit ? interpolate(actPop, [0, 1], [0.94, 1], clamp) : 0.97})`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <GlyphIcon kind="chart" color={actLit ? L4_C.amberSoft : L4_C.textDim} size={30} />
                <div
                  style={{
                    fontFamily: L4_FONT_DISPLAY,
                    fontSize: 27,
                    fontWeight: 800,
                    color: L4_C.text,
                  }}
                >
                  Past Activity
                </div>
              </div>
              <div style={{ fontFamily: L4_FONT_MONO, fontSize: 16, color: L4_C.textMuted, lineHeight: 1.5 }}>
                • Product clicks &amp; views
                <br />• Search &amp; dwell time
              </div>
            </div>

            {/* Purchase History */}
            <div
              style={{
                flex: 1,
                background: histLit ? L4_C.violetBg : "rgba(10, 18, 42, 0.78)",
                border: `2px solid ${histLit ? L4_C.violet : L4_C.borderSubtle}`,
                borderRadius: 18,
                padding: "18px 20px",
                opacity: histLit ? 1 : 0.55,
                transform: `scale(${histLit ? interpolate(histPop, [0, 1], [0.94, 1], clamp) : 0.97})`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <GlyphIcon kind="database" color={histLit ? L4_C.violetSoft : L4_C.textDim} size={30} />
                <div
                  style={{
                    fontFamily: L4_FONT_DISPLAY,
                    fontSize: 27,
                    fontWeight: 800,
                    color: L4_C.text,
                  }}
                >
                  Purchase History
                </div>
              </div>
              <div style={{ fontFamily: L4_FONT_MONO, fontSize: 16, color: L4_C.textMuted, lineHeight: 1.5 }}>
                • Previous orders &amp; brands
                <br />• Category affinity graph
              </div>
            </div>
          </div>
        </FocusCard>

        {/* BEAM 2 */}
        <VerticalBeam
          height={94}
          color={L4_C.violetSoft}
          active={trainLit}
          frame={frame}
          label="BUILD & TRAIN MODEL"
        />

        {/* 3. RECOMMENDATION MODEL TRAINING & OUTPUT (12.2s - 15.28s) */}
        <FocusCard accent={L4_C.violet} active={trainLit} appear={modelPop} padding="22px 26px">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <GlyphIcon kind="brain" color={L4_C.violetSoft} size={32} />
              <div
                style={{
                  fontFamily: L4_FONT_DISPLAY,
                  fontSize: 30,
                  fontWeight: 800,
                  color: L4_C.text,
                }}
              >
                Recommendation Model
              </div>
            </div>
            <div
              style={{
                fontFamily: L4_FONT_MONO,
                fontSize: 18,
                fontWeight: 700,
                color: epochNum >= 48 ? L4_C.emeraldSoft : L4_C.violetSoft,
                background: epochNum >= 48 ? L4_C.emeraldBg : L4_C.violetBg,
                border: `1px solid ${epochNum >= 48 ? L4_C.emerald : L4_C.violet}`,
                padding: "5px 14px",
                borderRadius: 10,
              }}
            >
              {epochNum >= 48 ? "TRAINED ✓" : `TRAINING · EPOCH ${epochNum}/50`}
            </div>
          </div>

          {/* Live Training Progress Bar */}
          <div
            style={{
              height: 10,
              borderRadius: 999,
              background: "rgba(148, 163, 184, 0.2)",
              overflow: "hidden",
              marginBottom: 18,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${trainBar}%`,
                background: `linear-gradient(90deg, ${L4_C.violet}, ${L4_C.orchid}, ${L4_C.emerald})`,
                borderRadius: 999,
              }}
            />
          </div>

          {/* 3 Recommended Product Cards */}
          <div style={{ display: "flex", gap: 14 }}>
            {REC_ITEMS.map((item, i) => {
              const p = springAt(frame, fps, 12.6 + i * 0.45);
              return (
                <div
                  key={item.name}
                  style={{
                    flex: 1,
                    background: "rgba(10, 17, 42, 0.94)",
                    border: `1.5px solid ${L4_C.borderViolet}`,
                    borderRadius: 16,
                    padding: "14px 16px",
                    opacity: p,
                    transform: `translate3d(0px, ${interpolate(p, [0, 1], [16, 0], clamp)}px, 0px)`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: L4_FONT_MONO,
                      fontSize: 14,
                      color: L4_C.emeraldSoft,
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    RANK #0{i + 1}
                  </div>
                  <div
                    style={{
                      fontFamily: L4_FONT_DISPLAY,
                      fontSize: 21,
                      fontWeight: 800,
                      color: L4_C.text,
                      lineHeight: 1.25,
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontFamily: L4_FONT_MONO,
                      fontSize: 14,
                      color: L4_C.textMuted,
                      marginTop: 6,
                    }}
                  >
                    {item.tag}
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
