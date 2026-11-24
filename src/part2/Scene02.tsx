import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import {
  COLORS,
  FONTS,
  LAYOUT,
  SHADOWS,
  SPRING_CONFIG,
} from "../theme";
import { createSceneScaler, type SceneComponentProps } from "../narration";
import { PART2_SCENES_META } from "./narration";
import { Terminal } from "../components/Terminal";
import { ServerBox } from "../components/ServerBox";
import { Character } from "../components/Character";
import { ConceptTag } from "../components/ConceptTag";
import { SceneSubtitles } from "../components/Subtitle";

const META = PART2_SCENES_META[1];

const WEEKS = ["Week 1", "Week 2", "Week 3"] as const;

export const Scene02: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced frame anchors (from scene_02_confident_scene_2.wav)
  const sshFrame = f(58);
  const cdFrame = f(94);
  const pullFrame = f(134);
  const installFrame = f(176);
  const buildFrame = f(216);
  const builtDoneFrame = f(250);
  const calStartFrame = f(274);

  const weekFrames = [f(282), f(314), f(346)];
  const activeWeekIdx =
    frame >= weekFrames[2] ? 2 : frame >= weekFrames[1] ? 1 : 0;

  const termIn = spring({
    frame,
    fps,
    config: SPRING_CONFIG.snappy,
  });

  const calPop =
    frame >= calStartFrame
      ? spring({
          frame: frame - calStartFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  const currentWeekStart = weekFrames[activeWeekIdx];
  const flipProgress =
    frame >= currentWeekStart
      ? spring({
          frame: frame - currentWeekStart,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;
  const stampPop =
    frame >= currentWeekStart + f(10)
      ? spring({
          frame: frame - (currentWeekStart + f(10)),
          fps,
          config: SPRING_CONFIG.slam,
        })
      : 0;

  const leanBackDeg = interpolate(
    frame,
    [builtDoneFrame, builtDoneFrame + f(26)],
    [0, -7],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  const successPulse =
    frame >= builtDoneFrame
      ? interpolate(frame, [builtDoneFrame, builtDoneFrame + f(18)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      {/* Scene 02 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      {/* Architectural dot grid + ambient light */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(139, 148, 158, 0.14) 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 24%, rgba(240, 136, 62, 0.09) 0%, transparent 55%), radial-gradient(ellipse at 50% 78%, rgba(63, 185, 80, 0.08) 0%, transparent 52%)",
        }}
      />

      {/* Native 9:16 Safe Stage Container */}
      <div
        style={{
          position: "absolute",
          top: LAYOUT.safeTop,
          left: LAYOUT.safeX,
          right: LAYOUT.safeX,
          bottom: LAYOUT.subtitleSafeBottom + 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 28,
        }}
      >
        {/* Top Routine Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ConceptTag label="VPS" color={COLORS.vps} startFrame={4} />
            <div
              style={{
                padding: "9px 20px",
                borderRadius: 999,
                backgroundColor: COLORS.panel,
                border: `1.5px solid ${
                  successPulse > 0.3 ? COLORS.success : COLORS.border
                }`,
                fontFamily: FONTS.code,
                fontSize: 18,
                fontWeight: 700,
                color: successPulse > 0.3 ? COLORS.success : COLORS.muted,
                boxShadow: SHADOWS.soft,
              }}
            >
              {successPulse > 0.3 ? "✓ Routine Deploy OK" : "SSH → Pull → Build"}
            </div>
          </div>

          <div
            style={{
              fontFamily: FONTS.bangla,
              fontSize: 42,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            সরাসরি Server-এ Build (Manual Deploy)
          </div>
        </div>

        {/* Tier 1: Full-Width Fast-Typing Terminal */}
        <div
          style={{
            transform: `translateY(${interpolate(termIn, [0, 1], [34, 0])}px) scale(${interpolate(termIn, [0, 1], [0.95, 1])})`,
            opacity: interpolate(termIn, [0, 0.35], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Terminal
            title="rafi@client-vps"
            prompt="rafi@vps:~$ "
            width="100%"
            fontSize={28}
            style={{ minHeight: 490 }}
            lines={[
              { text: "ssh rafi@client-vps", startFrame: sshFrame, typeSpeed: 1.8 },
              { text: "cd /var/www/app", startFrame: cdFrame, typeSpeed: 1.9 },
              { text: "git pull", startFrame: pullFrame, typeSpeed: 1.8 },
              { text: "npm install", startFrame: installFrame, typeSpeed: 1.8 },
              { text: "npm run build", startFrame: buildFrame, typeSpeed: 1.8 },
              {
                text: "✓ built in 38s",
                startFrame: builtDoneFrame,
                isOutput: true,
                color: COLORS.success,
                typeSpeed: 2.2,
              },
            ]}
          />
        </div>

        {/* Tier 2: Flipping Calendar Widget (at 274f) or Live Checklist */}
        <div
          style={{
            width: "100%",
            height: 310,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {frame >= calStartFrame ? (
            <div
              style={{
                width: "100%",
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `2.5px solid ${COLORS.success}99`,
                boxShadow: `${SHADOWS.glow(COLORS.success)}, ${SHADOWS.card}`,
                overflow: "hidden",
                transform: `scale(${interpolate(calPop, [0, 1], [0.7, 1])})`,
                opacity: interpolate(calPop, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {/* Calendar Top Binding */}
              <div
                style={{
                  height: 54,
                  backgroundColor: COLORS.vps,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 28px",
                }}
              >
                <div style={{ display: "flex", gap: 22 }}>
                  {[0, 1, 2, 3].map((r) => (
                    <div
                      key={r}
                      style={{
                        width: 14,
                        height: 24,
                        borderRadius: 6,
                        backgroundColor: COLORS.bg,
                        marginTop: -12,
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: FONTS.ui,
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#0D1117",
                    textTransform: "uppercase",
                    letterSpacing: 0.9,
                  }}
                >
                  Weekly Deploy Log
                </span>
              </div>

              {/* Flipping Page Body */}
              <div
                style={{
                  padding: "26px 32px 30px 32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 22,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.ui,
                    fontSize: 64,
                    fontWeight: 800,
                    color: COLORS.text,
                    transform: `scaleY(${interpolate(flipProgress, [0, 1], [0.25, 1])})`,
                    transformOrigin: "top center",
                  }}
                >
                  {WEEKS[activeWeekIdx]}
                </div>

                <div style={{ display: "flex", gap: 18 }}>
                  {WEEKS.map((wk, idx) => {
                    const checked = frame >= weekFrames[idx] + f(10);
                    return (
                      <div
                        key={wk}
                        style={{
                          padding: "10px 24px",
                          borderRadius: 999,
                          backgroundColor: checked
                            ? `${COLORS.success}24`
                            : "#0D1117",
                          border: `2px solid ${
                            checked ? COLORS.success : COLORS.border
                          }`,
                          fontFamily: FONTS.code,
                          fontSize: 20,
                          fontWeight: 700,
                          color: checked ? COLORS.success : COLORS.muted,
                        }}
                      >
                        {wk} {checked ? "✓" : ""}
                      </div>
                    );
                  })}
                </div>

                {/* Big Green Check Stamp */}
                {frame >= currentWeekStart + f(10) ? (
                  <div
                    style={{
                      position: "absolute",
                      right: 42,
                      top: 24,
                      width: 82,
                      height: 82,
                      borderRadius: "50%",
                      backgroundColor: `${COLORS.success}22`,
                      border: `4.5px solid ${COLORS.success}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `scale(${interpolate(stampPop, [0, 1], [1.9, 1])}) rotate(-10deg)`,
                      opacity: interpolate(stampPop, [0, 0.25], [0, 1], {
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    <svg width="42" height="42" viewBox="0 0 24 24">
                      <path
                        d="M 5 12.5 L 10 17.5 L 19 7.5"
                        fill="none"
                        stroke={COLORS.success}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                padding: "28px 34px",
                borderRadius: LAYOUT.cardRadius,
                backgroundColor: COLORS.panel,
                border: `1.5px solid ${COLORS.border}`,
                boxShadow: SHADOWS.soft,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 18,
                  fontWeight: 700,
                  color: COLORS.muted,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                Manual Routine Running Directly on VPS
              </div>
              {[
                { label: "1. SSH login → /var/www/app", active: frame >= sshFrame },
                { label: "2. git pull + npm install", active: frame >= pullFrame },
                { label: "3. npm run build (inside 1 GB VPS)", active: frame >= buildFrame },
              ].map((step) => (
                <div
                  key={step.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    fontFamily: FONTS.code,
                    fontSize: 23,
                    fontWeight: 700,
                    color: step.active ? COLORS.text : COLORS.muted,
                    opacity: step.active ? 1 : 0.45,
                  }}
                >
                  <span
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      backgroundColor: step.active
                        ? COLORS.success
                        : COLORS.border,
                    }}
                  />
                  {step.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tier 3: Healthy ServerBox + Relaxed Leaning-Back Rafi */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            padding: "24px 36px 14px 36px",
            borderRadius: LAYOUT.cardRadius,
            backgroundColor: COLORS.panel,
            border: `1.5px solid ${COLORS.border}`,
            boxShadow: SHADOWS.soft,
          }}
        >
          <ServerBox
            label="client-vps"
            subLabel="Healthy · 1 GB"
            size="small"
            status="healthy"
            scale={1.14}
          />

          <div
            style={{
              transform: `rotate(${leanBackDeg.toFixed(2)}deg)`,
              transformOrigin: "bottom center",
            }}
          >
            <Character
              name="rafi"
              expression="happy"
              talking={false}
              size={295}
            />
          </div>
        </div>
      </div>

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
