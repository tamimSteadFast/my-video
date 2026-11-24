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
  type GlyphKind,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

const STACK_NODES: readonly {
  readonly label: string;
  readonly sub: string;
  readonly icon: GlyphKind;
  readonly atSec: number;
}[] = [
  { label: "Backend", sub: "Server Logic & Auth", icon: "server", atSec: 10.2 },
  { label: "API", sub: "LLM & REST Endpoints", icon: "api", atSec: 10.9 },
  { label: "Database", sub: "State & Vector Store", icon: "database", atSec: 11.55 },
  { label: "Frontend", sub: "Interactive User UI", icon: "browser", atSec: 12.45 },
];

export const Scene02AiEngineerHub: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene2");

  // Exact beats from scene_02_explanatory_scene_2.wav (14.72s):
  // 0.25-4.10: Existing AI Model + Pre-trained Model
  // 4.15-8.38: Real Software Application
  // 8.85-14.40: Integrate AI Model with Backend (10.3), API (11.0), Database (11.6), Frontend (12.5)
  const modelPop = springAt(frame, fps, 0.2, SPRING_HERO);
  const appPop = springAt(frame, fps, 4.1, SPRING_HERO);
  const hubPop = springAt(frame, fps, 8.75, SPRING_HERO);
  const integratePop = springAt(frame, fps, 13.35);

  const isIntegrating = voiceSec >= 8.75;
  const isIntegrated = voiceSec >= 13.35;

  return (
    <SceneShell
      id="scene2"
      sfx={[
        { atVoiceSec: 0.25, kind: "pop", volume: 0.16 },
        { atVoiceSec: 4.15, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 10.25, kind: "click", volume: 0.15 },
        { atVoiceSec: 10.95, kind: "click", volume: 0.15 },
        { atVoiceSec: 11.6, kind: "click", volume: 0.15 },
        { atVoiceSec: 12.5, kind: "click", volume: 0.15 },
        { atVoiceSec: 13.4, kind: "chime", volume: 0.18 },
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
        {/* ROLE BANNER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <RolePill label="AI ENGINEER" color={L4_C.cyan} bg={L4_C.cyanBg} fontSize={21} />
          <div
            style={{
              fontFamily: L4_FONT_MONO,
              fontSize: 19,
              fontWeight: 700,
              color: L4_C.textDim,
            }}
          >
            BUILD WITH MODELS
          </div>
        </div>

        {/* TOP NODE: EXISTING / PRE-TRAINED AI MODEL (0.2s+) */}
        <FocusCard
          accent={L4_C.cyan}
          active={voiceSec < 4.15 || isIntegrating}
          appear={modelPop}
          padding="24px 28px"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 74,
                height: 74,
                borderRadius: 18,
                background: L4_C.cyanBg,
                border: `2px solid ${L4_C.cyan}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GlyphIcon kind="chip" color={L4_C.cyan} size={40} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: L4_FONT_MONO,
                  fontSize: 18,
                  color: L4_C.cyan,
                  fontWeight: 700,
                  letterSpacing: 1.4,
                }}
              >
                FOUNDATION INPUT
              </div>
              <div
                style={{
                  fontFamily: L4_FONT_DISPLAY,
                  fontSize: 36,
                  fontWeight: 800,
                  color: L4_C.text,
                  marginTop: 4,
                }}
              >
                Existing &amp; Pre-trained AI Models
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                {["LLMs", "Vision Models", "Embeddings", "Speech"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(0, 229, 255, 0.1)",
                      border: `1px solid ${L4_C.borderCyan}`,
                      borderRadius: 8,
                      padding: "5px 12px",
                      fontFamily: L4_FONT_MONO,
                      fontSize: 16,
                      fontWeight: 700,
                      color: L4_C.cyanSoft,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FocusCard>

        {/* BEAM 1: MODEL -> REAL SOFTWARE APP */}
        <VerticalBeam
          height={102}
          color={L4_C.cyan}
          active={voiceSec >= 4.0}
          frame={frame}
          label="USE & BUILD"
        />

        {/* MIDDLE NODE: REAL SOFTWARE APPLICATION (4.15s+) */}
        <FocusCard
          accent={L4_C.emerald}
          active={voiceSec >= 4.1 && !isIntegrating}
          appear={appPop}
          padding="24px 28px"
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 16,
                  background: L4_C.emeraldBg,
                  border: `2px solid ${L4_C.emerald}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GlyphIcon kind="layers" color={L4_C.emeraldSoft} size={36} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: L4_FONT_MONO,
                    fontSize: 17,
                    color: L4_C.emeraldSoft,
                    fontWeight: 700,
                    letterSpacing: 1.4,
                  }}
                >
                  END GOAL
                </div>
                <div
                  style={{
                    fontFamily: L4_FONT_DISPLAY,
                    fontSize: 36,
                    fontWeight: 800,
                    color: L4_C.text,
                    marginTop: 2,
                  }}
                >
                  Real Software Application
                </div>
                <div
                  style={{
                    fontFamily: L4_FONT_BN,
                    fontSize: 23,
                    color: L4_C.textMuted,
                    marginTop: 4,
                  }}
                >
                  বাস্তব ব্যবহারযোগ্য সফটওয়্যার প্রোডাক্ট
                </div>
              </div>
            </div>
            <div
              style={{
                background: L4_C.emeraldBg,
                border: `1.5px solid ${L4_C.emerald}`,
                borderRadius: 12,
                padding: "8px 14px",
                fontFamily: L4_FONT_MONO,
                fontSize: 17,
                fontWeight: 700,
                color: L4_C.emeraldSoft,
              }}
            >
              PRODUCTION
            </div>
          </div>
        </FocusCard>

        {/* BEAM 2: SYSTEM INTEGRATION */}
        <VerticalBeam
          height={98}
          color={isIntegrated ? L4_C.emerald : L4_C.cyan}
          active={isIntegrating}
          frame={frame}
          label="INTEGRATE WITH"
        />

        {/* BOTTOM 2x2 FULL-STACK INTEGRATION GRID (8.75s - 14.72s) */}
        <div
          style={{
            opacity: hubPop,
            transform: `translate3d(0px, ${interpolate(hubPop, [0, 1], [24, 0], clamp)}px, 0px)`,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            {STACK_NODES.map((node) => {
              const lit = voiceSec >= node.atSec;
              const nodePop = springAt(frame, fps, node.atSec);
              const nodeColor = isIntegrated ? L4_C.emerald : L4_C.cyan;
              return (
                <div
                  key={node.label}
                  style={{
                    width: "calc(50% - 9px)",
                    background: lit
                      ? "linear-gradient(155deg, rgba(14, 28, 60, 0.96), rgba(8, 16, 38, 0.96))"
                      : "rgba(9, 15, 34, 0.72)",
                    border: `2px solid ${lit ? nodeColor : L4_C.borderSubtle}`,
                    borderRadius: 20,
                    padding: "20px 22px",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transform: `scale(${lit ? interpolate(nodePop, [0, 1], [0.92, 1.0], clamp) : 0.96})`,
                    opacity: lit ? 1 : 0.45,
                    boxShadow: lit ? `0 12px 32px ${nodeColor}26` : "none",
                  }}
                >
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 14,
                      background: lit ? `${nodeColor}22` : "rgba(148,163,184,0.1)",
                      border: `1.5px solid ${lit ? nodeColor : L4_C.borderSubtle}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GlyphIcon
                      kind={node.icon}
                      color={lit ? nodeColor : L4_C.textDim}
                      size={30}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: L4_FONT_DISPLAY,
                        fontSize: 30,
                        fontWeight: 800,
                        color: lit ? L4_C.text : L4_C.textDim,
                      }}
                    >
                      {node.label}
                    </div>
                    <div
                      style={{
                        fontFamily: L4_FONT_MONO,
                        fontSize: 16,
                        color: lit ? L4_C.textMuted : L4_C.textDim,
                        marginTop: 2,
                      }}
                    >
                      {node.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INTEGRATED CONFIRMATION STRIP (13.35s+) */}
          <div
            style={{
              background: L4_C.emeraldBg,
              border: `2px solid ${L4_C.emerald}`,
              borderRadius: 16,
              padding: "14px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              opacity: integratePop,
              transform: `scale(${interpolate(integratePop, [0, 1], [0.94, 1], clamp)})`,
            }}
          >
            <GlyphIcon kind="check" color={L4_C.emeraldSoft} size={28} />
            <span
              style={{
                fontFamily: L4_FONT_MONO,
                fontSize: 21,
                fontWeight: 700,
                color: L4_C.emeraldSoft,
                letterSpacing: 1.2,
              }}
            >
              AI MODEL INTEGRATED ACROSS FULL SOFTWARE STACK
            </span>
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
