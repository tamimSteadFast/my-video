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
import {
  SCENES_META,
  createSceneScaler,
  type SceneComponentProps,
} from "../narration";
import { Character } from "../components/Character";
import { Terminal } from "../components/Terminal";
import { ActionsRun } from "../components/ActionsRun";
import { SceneSubtitles } from "../components/Subtitle";

const META = SCENES_META[7];

export const Scene08: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Exact voice-synced anchors
  const pushTypeStart = f(24);
  const zoomToActionsStart = f(68);
  const zoomToActionsEnd = f(92);

  // ActionsRun step timings (synced to narration!)
  const s1Start = f(92);
  const s1End = f(128);
  const s2Start = f(128);
  const s2End = f(168);
  const s3Start = f(168);
  const s3End = f(215);
  const s4Start = f(215); // Music cuts to 0 here; SFX: heartbeat
  const failFrame = f(305); // "npm test Step লাল হয়ে গেল!"
  const deployBlockFrame = f(356); // "Workflow সেখানেই থেমে গেল, ভুল Code আর Deploy হলো না।"

  // Intro Push Terminal fades/zooms into Browser ActionsRun
  const introZoom = interpolate(
    frame,
    [zoomToActionsStart, zoomToActionsEnd],
    [1, 1.35],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    },
  );
  const introOpacity = interpolate(
    frame,
    [zoomToActionsStart + 6, zoomToActionsEnd],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const actionsSpring =
    frame >= zoomToActionsStart + 10
      ? spring({
          frame: frame - (zoomToActionsStart + 10),
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  // Heartbeat suspense pulse while npm test is running (215..305)
  // SFX: heartbeat
  const isSuspense = frame >= s4Start && frame < failFrame;
  const heartbeatPulse = isSuspense
    ? Math.pow(0.5 + 0.5 * Math.sin(((frame - s4Start) / 14) * Math.PI * 2), 3)
    : 0;

  // 4-frame camera shake right on FAIL at failFrame
  const isShaking = frame >= failFrame && frame <= failFrame + 4;
  const shakeX = isShaking ? Math.sin((frame - failFrame) * 3.1) * 18 : 0;
  const shakeY = isShaking ? Math.cos((frame - failFrame) * 2.7) * 12 : 0;

  // Red flash vignette at failFrame
  const redFlashOpacity = interpolate(
    frame,
    [failFrame, failFrame + 4, failFrame + 24],
    [0, 0.72, 0.22],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Big Red X stamp popping at failFrame (fades softly when Deploy Lock card enters)
  const bigXSpring =
    frame >= failFrame
      ? spring({
          frame: frame - failFrame,
          fps,
          config: SPRING_CONFIG.slam,
        })
      : 0;
  const bigXFade = interpolate(
    frame,
    [deployBlockFrame - 8, deployBlockFrame + 8],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Deploy Stop/Lock Box ("ভুল Code Deploy হলো না ✓")
  const deploySpring =
    frame >= deployBlockFrame
      ? spring({
          frame: frame - deployBlockFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        fontFamily: FONTS.ui,
      }}
    >
      {/* Scene 08 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
      {/* Music cue handled in Video.tsx: cut to 0 at s4Start (215f), resume at deployBlockFrame (356f) */}
      {/* SFX: heartbeat during npm test suspense (215–305f), buzzer/error thud at failFrame (305f) */}

      {/* Subtle dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(139, 148, 158, 0.14) 1.4px, transparent 1.4px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* PHASE 1 (0–92): Mischievous Rafi typing "git push" in Terminal */}
      {introOpacity > 0.01 ? (
        <AbsoluteFill
          style={{
            opacity: introOpacity,
            transform: `scale(${introZoom})`,
            transformOrigin: "50% 56%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 180,
            paddingLeft: LAYOUT.safeX,
            paddingRight: LAYOUT.safeX,
            gap: 36,
            zIndex: 25,
          }}
        >
          <div
            style={{
              padding: "12px 28px",
              borderRadius: 999,
              backgroundColor: `${COLORS.running}22`,
              border: `1.5px solid ${COLORS.running}`,
              fontFamily: FONTS.bangla,
              fontSize: 28,
              fontWeight: 700,
              color: "#FDE68A",
            }}
          >
            পরীক্ষার পালা · Buggy Code Test Push
          </div>

          <Character
            name="rafi"
            expression="smile"
            talking={false}
            size={380}
          />

          <Terminal
            width="100%"
            title="rafi@dhaka-startup — test-bug"
            fontSize={32}
            lines={[
              {
                text: "git push",
                startFrame: pushTypeStart,
                charsPerFrame: 0.65,
              },
              {
                text: "Triggering GitHub Actions workflow CI...",
                startFrame: pushTypeStart + 22,
                isOutput: true,
                color: COLORS.event,
                charsPerFrame: 2.2,
              },
            ]}
          />
        </AbsoluteFill>
      ) : null}

      {/* PHASE 2 (80–502): ActionsRun UI + Shake + Big Red X + Deploy Blocked Card */}
      {actionsSpring > 0.01 ? (
        <AbsoluteFill
          style={{
            transform: `translate(${shakeX}px, ${shakeY}px) scale(${interpolate(
              actionsSpring,
              [0, 1],
              [0.9, 1],
            )})`,
            opacity: actionsSpring,
            zIndex: 20,
          }}
        >
          {/* Top Status Pill */}
          <div
            style={{
              position: "absolute",
              top: LAYOUT.safeTop,
              left: LAYOUT.safeX,
              right: LAYOUT.safeX,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                backgroundColor: COLORS.panel,
                border: `1.5px solid ${
                  frame >= failFrame
                    ? COLORS.fail
                    : isSuspense
                      ? COLORS.running
                      : COLORS.border
                }`,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  backgroundColor:
                    frame >= failFrame ? COLORS.fail : COLORS.running,
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.bangla,
                  fontSize: 23,
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                {frame >= failFrame
                  ? "Workflow থেমে গেছে!"
                  : isSuspense
                    ? "npm test চলছে..."
                    : "GitHub Actions · লাইভ রান"}
              </span>
            </div>

            <div
              style={{
                fontFamily: FONTS.code,
                fontSize: 19,
                color: COLORS.muted,
                padding: "8px 16px",
                borderRadius: 12,
                backgroundColor: COLORS.panel,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              commit #a4f92c
            </div>
          </div>

          {/* ActionsRun Replica */}
          <div
            style={{
              position: "absolute",
              top: 190,
              left: LAYOUT.safeX,
              right: LAYOUT.safeX,
            }}
          >
            <ActionsRun
              workflow="CI"
              job="build"
              width="100%"
              steps={[
                {
                  name: "actions/checkout@v4",
                  startFrame: s1Start,
                  endFrame: s1End,
                  result: "success",
                },
                {
                  name: "actions/setup-node@v4",
                  startFrame: s2Start,
                  endFrame: s2End,
                  result: "success",
                },
                {
                  name: "npm ci",
                  startFrame: s3Start,
                  endFrame: s3End,
                  result: "success",
                },
                {
                  name: "npm test",
                  startFrame: s4Start,
                  endFrame: failFrame,
                  result: "fail",
                  spinnerSpeed: 0.36, // Spinner slows down to build tension
                },
                {
                  name: "npm run build",
                  startFrame: failFrame,
                  endFrame: failFrame + 40,
                  result: "skipped",
                },
              ]}
              logLines={[
                "FAIL src/App.test.jsx",
                "✕ renders homepage (12 ms)",
                "  Expected: <HeroBanner /> · Received: undefined",
              ]}
              showLogAtFrame={failFrame + 4}
            />
          </div>

          {/* Big Red X Stamp on Fail Impact (305..356) */}
          {frame >= failFrame && bigXFade > 0.01 ? (
            <div
              style={{
                position: "absolute",
                top: 1120,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                opacity: bigXFade,
                transform: `scale(${interpolate(bigXSpring, [0, 1], [2.2, 1])})`,
                zIndex: 35,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  padding: "24px 42px",
                  borderRadius: 28,
                  backgroundColor: `${COLORS.fail}24`,
                  border: `3.5px solid ${COLORS.fail}`,
                  boxShadow: SHADOWS.glow(COLORS.fail),
                }}
              >
                <svg width="84" height="84" viewBox="0 0 84 84">
                  <circle cx="42" cy="42" r="38" fill={COLORS.fail} />
                  <path
                    d="M 26 26 L 58 58 M 58 26 L 26 58"
                    stroke="#FFFFFF"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                </svg>
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.ui,
                      fontSize: 40,
                      fontWeight: 800,
                      color: COLORS.fail,
                    }}
                  >
                    TEST FAILED!
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.bangla,
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                  >
                    আগের সেই ভুল ধরা পড়ে গেছে!
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* 356–502: Deploy Box with Stop/Lock Icon + "ভুল Code Deploy হলো না ✓" */}
          {frame >= deployBlockFrame ? (
            <div
              style={{
                position: "absolute",
                top: 1100,
                left: LAYOUT.safeX,
                right: LAYOUT.safeX,
                transform: `translateY(${interpolate(deploySpring, [0, 1], [80, 0])}px) scale(${interpolate(deploySpring, [0, 1], [0.85, 1])})`,
                opacity: deploySpring,
                zIndex: 40,
              }}
            >
              <div
                style={{
                  backgroundColor: COLORS.panel,
                  borderRadius: 28,
                  border: `3px solid ${COLORS.success}`,
                  boxShadow: SHADOWS.glow(COLORS.success),
                  padding: "32px 34px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 22,
                }}
              >
                {/* Blocked Deploy Flow Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 22,
                  }}
                >
                  <div
                    style={{
                      padding: "14px 26px",
                      borderRadius: 16,
                      backgroundColor: `${COLORS.fail}22`,
                      border: `2px solid ${COLORS.fail}`,
                      fontFamily: FONTS.code,
                      fontSize: 24,
                      fontWeight: 700,
                      color: COLORS.fail,
                    }}
                  >
                    Buggy Code
                  </div>

                  {/* Stop / Lock Icon */}
                  <div
                    style={{
                      width: 82,
                      height: 82,
                      borderRadius: "50%",
                      backgroundColor: `${COLORS.fail}24`,
                      border: `3px solid ${COLORS.fail}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                      <rect
                        x="10"
                        y="20"
                        width="26"
                        height="20"
                        rx="5"
                        fill={COLORS.fail}
                      />
                      <path
                        d="M 15 20 V 14 A 8 8 0 0 1 31 14 V 20"
                        stroke={COLORS.fail}
                        strokeWidth="4.2"
                        strokeLinecap="round"
                      />
                      <circle cx="23" cy="29" r="3" fill="#FFFFFF" />
                    </svg>
                  </div>

                  <div
                    style={{
                      padding: "14px 28px",
                      borderRadius: 16,
                      backgroundColor: "#0F141B",
                      border: `2px dashed ${COLORS.muted}`,
                      fontFamily: FONTS.ui,
                      fontSize: 26,
                      fontWeight: 800,
                      color: COLORS.muted,
                    }}
                  >
                    Deploy
                  </div>
                </div>

                {/* Big Relief Confirmation */}
                <div
                  style={{
                    padding: "14px 34px",
                    borderRadius: 999,
                    backgroundColor: `${COLORS.success}24`,
                    border: `2px solid ${COLORS.success}`,
                    fontFamily: FONTS.bangla,
                    fontSize: 40,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: 0,
                  }}
                >
                  ভুল Code Deploy হলো না ✓
                </div>
              </div>
            </div>
          ) : null}
        </AbsoluteFill>
      ) : null}

      {/* Heartbeat Suspense Vignette during npm test */}
      {isSuspense ? (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            background: `radial-gradient(ellipse at center, transparent 48%, rgba(210, 153, 34, ${(
              0.12 +
              heartbeatPulse * 0.28
            ).toFixed(2)}) 100%)`,
            zIndex: 55,
          }}
        />
      ) : null}

      {/* Red Flash Vignette at Fail */}
      {frame >= failFrame ? (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            background: `radial-gradient(ellipse at center, transparent 42%, rgba(248, 81, 73, ${redFlashOpacity.toFixed(
              2,
            )}) 100%)`,
            zIndex: 60,
          }}
        />
      ) : null}

      {/* Bangla Subtitle Bar */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
