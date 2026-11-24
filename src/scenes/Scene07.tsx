import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import {
  CI_YML_LINES,
  COLORS,
  FONTS,
  LAYOUT,
  SHADOWS,
  SPRING_CONFIG,
} from "../theme";
import {
  SCENES_META,
  createSceneScaler,
  type SceneComponentProps,
} from "../narration";
import { CodeEditor } from "../components/CodeEditor";
import { ConceptTag } from "../components/ConceptTag";
import { SceneSubtitles } from "../components/Subtitle";

const META = SCENES_META[6];
// Lines 10..18 of ci.yml (9 lines total)
const STEPS_CODE = CI_YML_LINES.slice(9, 18).join("\n");

interface StepCardSpec {
  readonly id: string;
  readonly codeLabel: string;
  readonly banglaTitle: string;
  readonly kind: "uses" | "run";
  readonly lines: readonly number[]; // 1-based relative to STEPS_CODE
  readonly designStartFrame: number;
}

const STEP_SPECS: readonly StepCardSpec[] = [
  {
    id: "checkout",
    codeLabel: "actions/checkout@v4",
    banglaTitle: "Code নামানো",
    kind: "uses",
    lines: [2],
    designStartFrame: 62,
  },
  {
    id: "setup-node",
    codeLabel: "actions/setup-node@v4",
    banglaTitle: "Node.js সেট",
    kind: "uses",
    lines: [3, 4, 5, 6],
    designStartFrame: 172,
  },
  {
    id: "npm-ci",
    codeLabel: "npm ci",
    banglaTitle: "Dependency Install",
    kind: "run",
    lines: [7],
    designStartFrame: 300,
  },
  {
    id: "npm-test",
    codeLabel: "npm test",
    banglaTitle: "Test",
    kind: "run",
    lines: [8],
    designStartFrame: 400,
  },
  {
    id: "npm-build",
    codeLabel: "npm run build",
    banglaTitle: "Production Build",
    kind: "run",
    lines: [9],
    designStartFrame: 456,
  },
];

export const Scene07: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Determine which step is currently narrated (for pink Step highlight)
  let activeStepIdx = -1;
  STEP_SPECS.forEach((step, idx) => {
    if (frame >= f(step.designStartFrame)) {
      activeStepIdx = idx;
    }
  });

  const activeHighlightLines =
    activeStepIdx >= 0 ? STEP_SPECS[activeStepIdx].lines : [1];

  const usesBadgeFrame = f(76);
  const runBadgeFrame = f(308);
  const usesSpring =
    frame >= usesBadgeFrame
      ? spring({
          frame: frame - usesBadgeFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const runSpring =
    frame >= runBadgeFrame
      ? spring({
          frame: frame - runBadgeFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  // How many cards have appeared so we can animate the vertical dotted connector line
  const visibleCardsCount = STEP_SPECS.filter(
    (s) => frame >= f(s.designStartFrame),
  ).length;
  const connectorHeight = Math.max(0, (visibleCardsCount - 1) * 124);

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        fontFamily: FONTS.ui,
      }}
    >
      {/* Scene 07 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      {/* Pink-tinted dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(219, 97, 162, 0.14) 1.4px, transparent 1.4px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Top Row: Section Pill + ConceptTag "Step" */}
      <div
        style={{
          position: "absolute",
          top: LAYOUT.safeTop,
          left: LAYOUT.safeX,
          right: LAYOUT.safeX,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 22px",
            borderRadius: 999,
            backgroundColor: COLORS.panel,
            border: `1.5px solid ${COLORS.step}77`,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: COLORS.step,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.bangla,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            ধাপ ৩ · ৫টি Steps
          </span>
        </div>

        <ConceptTag
          label="Step"
          subLabel="একটি করে কাজ"
          color={COLORS.step}
          startFrame={f(8)}
        />
      </div>

      {/* Top Stage: CodeEditor showing lines 10–18 of ci.yml */}
      <div
        style={{
          position: "absolute",
          top: 184,
          left: LAYOUT.safeX,
          right: LAYOUT.safeX,
          zIndex: 20,
        }}
      >
        <CodeEditor
          code={STEPS_CODE}
          highlightLines={activeHighlightLines}
          highlightColor={COLORS.step}
          typingStartFrame={f(6)}
          charsPerFrame={2.2}
          fontSize={23}
          width="100%"
        />
      </div>

      {/* Legend Badges: "uses = তৈরি Action" & "run = নিজের Command" */}
      <div
        style={{
          position: "absolute",
          top: 668,
          left: LAYOUT.safeX,
          right: LAYOUT.safeX,
          display: "flex",
          gap: 18,
          zIndex: 25,
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "14px 20px",
            borderRadius: 16,
            backgroundColor: `${COLORS.success}1C`,
            border: `2px solid ${COLORS.success}88`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            opacity: usesSpring,
            transform: `scale(${interpolate(usesSpring, [0, 1], [0.7, 1])})`,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.code,
              fontSize: 22,
              fontWeight: 800,
              color: COLORS.success,
            }}
          >
            uses
          </span>
          <span
            style={{
              fontFamily: FONTS.bangla,
              fontSize: 23,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: 0,
            }}
          >
            = তৈরি Action
          </span>
        </div>

        <div
          style={{
            flex: 1,
            padding: "14px 20px",
            borderRadius: 16,
            backgroundColor: "rgba(255, 166, 87, 0.14)",
            border: "2px solid rgba(255, 166, 87, 0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            opacity: runSpring,
            transform: `scale(${interpolate(runSpring, [0, 1], [0.7, 1])})`,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.code,
              fontSize: 22,
              fontWeight: 800,
              color: "#FFA657",
            }}
          >
            run
          </span>
          <span
            style={{
              fontFamily: FONTS.bangla,
              fontSize: 23,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: 0,
            }}
          >
            = নিজের Command
          </span>
        </div>
      </div>

      {/* Vertical Stack of 5 Step Cards sliding in from right + dotted SVG connector line */}
      <div
        style={{
          position: "absolute",
          top: 758,
          left: LAYOUT.safeX,
          right: LAYOUT.safeX,
          bottom: LAYOUT.subtitleSafeBottom + 26,
          zIndex: 20,
        }}
      >
        {/* Dotted SVG Connector Line running vertically through step badges */}
        {connectorHeight > 0 ? (
          <svg
            width="60"
            height="620"
            viewBox="0 0 60 620"
            style={{
              position: "absolute",
              left: 26,
              top: 52,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <line
              x1="30"
              y1="0"
              x2="30"
              y2={connectorHeight}
              stroke={COLORS.step}
              strokeWidth="4"
              strokeDasharray="8 9"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
        ) : null}

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {STEP_SPECS.map((step, idx) => {
            const startF = f(step.designStartFrame);
            if (frame < startF) return null;

            const cardSpring = spring({
              frame: frame - startF,
              fps,
              config: SPRING_CONFIG.snappy,
            });
            const slideX = interpolate(cardSpring, [0, 1], [460, 0]);
            const isCurrent = idx === activeStepIdx;
            const kindColor =
              step.kind === "uses" ? COLORS.success : "#FFA657";

            return (
              <div
                key={step.id}
                style={{
                  position: "relative",
                  zIndex: 2,
                  height: 106,
                  borderRadius: 20,
                  backgroundColor: isCurrent ? "#1E1A28" : COLORS.panel,
                  border: `2px solid ${
                    isCurrent ? COLORS.step : COLORS.border
                  }`,
                  boxShadow: isCurrent
                    ? SHADOWS.glow(COLORS.step)
                    : SHADOWS.soft,
                  padding: "0 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  transform: `translateX(${slideX}px) scale(${isCurrent ? 1.015 : 1})`,
                  opacity: cardSpring,
                }}
              >
                {/* Step Number + Icon Circle */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    backgroundColor: `${COLORS.step}24`,
                    border: `2px solid ${COLORS.step}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <StepIcon id={step.id} color={COLORS.step} />
                </div>

                {/* Titles */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: FONTS.bangla,
                      fontSize: 31,
                      fontWeight: 700,
                      color: "#FFFFFF",
                      lineHeight: 1.15,
                      letterSpacing: 0,
                    }}
                  >
                    {idx + 1}. {step.banglaTitle}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.code,
                      fontSize: 20,
                      color: COLORS.muted,
                      marginTop: 4,
                    }}
                  >
                    {step.codeLabel}
                  </div>
                </div>

                {/* uses / run tag */}
                <div
                  style={{
                    padding: "6px 16px",
                    borderRadius: 999,
                    backgroundColor: `${kindColor}22`,
                    border: `1.5px solid ${kindColor}88`,
                    fontFamily: FONTS.code,
                    fontSize: 18,
                    fontWeight: 700,
                    color: kindColor,
                  }}
                >
                  {step.kind}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bangla Subtitle Bar */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};

const StepIcon: React.FC<{ id: string; color: string }> = ({ id, color }) => {
  if (id === "checkout") {
    // Download arrow
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="17" y1="5" x2="17" y2="23" />
        <polyline points="9,16 17,24 25,16" />
        <line x1="7" y1="29" x2="27" y2="29" />
      </svg>
    );
  }
  if (id === "setup-node") {
    // Hexagon (Node.js)
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round">
        <polygon points="17,3 29,10 29,24 17,31 5,24 5,10" />
        <circle cx="17" cy="17" r="4.5" fill={color} />
      </svg>
    );
  }
  if (id === "npm-ci") {
    // Package box
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="17,4 30,11 30,24 17,31 4,24 4,11" />
        <polyline points="4,11 17,18 30,11" />
        <line x1="17" y1="18" x2="17" y2="31" />
      </svg>
    );
  }
  if (id === "npm-test") {
    // Flask
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="22" y2="5" />
        <path d="M 14 5 L 14 14 L 6 27 Q 5 30 9 30 L 25 30 Q 29 30 28 27 L 20 14 L 20 5" />
        <line x1="10" y1="22" x2="24" y2="22" />
      </svg>
    );
  }
  // Hammer (Production Build)
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 19 6 L 28 15 L 23 20 L 14 11 Z" fill={`${color}33`} />
      <line x1="17" y1="16" x2="6" y2="27" strokeWidth="4" />
    </svg>
  );
};
