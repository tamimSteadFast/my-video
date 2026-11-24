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
import { Character } from "../components/Character";
import { CodeEditor } from "../components/CodeEditor";
import { ConceptTag } from "../components/ConceptTag";
import { SceneSubtitles } from "../components/Subtitle";

const META = SCENES_META[5];
const SCENE6_CODE = CI_YML_LINES.slice(0, 9).join("\n");

export const Scene06: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced cue anchors
  const jobTagFrame = f(26); // "build নামে একটি Job"
  const runnerHighlightFrame = f(98); // "এই Job চলবে একটি Runner-এ"
  const panStartFrame = f(164); // "মানে GitHub-এর দেওয়া একটি Virtual Machine, ubuntu-latest"
  const panEndFrame = f(224);
  const vmAssembleFrame = f(208);
  const rafiPopFrame = f(310); // "রাফি অবাক হলো..."
  const rafiHappyFrame = f(356); // "...নিজের কোনো Server ছাড়াই!"

  const isRunnerStage = frame >= runnerHighlightFrame;

  // Smooth horizontal camera pan right across 2160px wide stage (0 -> -1080)
  const panX = interpolate(frame, [panStartFrame, panEndFrame], [0, -1080], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Cyan beam shooting from `runs-on` line across stage into Cloud VM
  const beamProgress = interpolate(
    frame,
    [panStartFrame - 8, panEndFrame - 6],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const beamPulseOffset = (frame * 12) % 60;

  // Cloud + VM Card assembling parts with staggered springs
  const cloudSpring =
    frame >= vmAssembleFrame - 18
      ? spring({
          frame: frame - (vmAssembleFrame - 18),
          fps,
          config: SPRING_CONFIG.smooth,
        })
      : 0;
  const rackSpring =
    frame >= vmAssembleFrame
      ? spring({
          frame: frame - vmAssembleFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const badgeSpring =
    frame >= vmAssembleFrame + 14
      ? spring({
          frame: frame - (vmAssembleFrame + 14),
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const specsSpring =
    frame >= vmAssembleFrame + 28
      ? spring({
          frame: frame - (vmAssembleFrame + 28),
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  // Rafi pops up from bottom (310..end), expression shocked -> happy
  const rafiSpring =
    frame >= rafiPopFrame
      ? spring({
          frame: frame - rafiPopFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const rafiY = interpolate(rafiSpring, [0, 1], [340, 0]);
  const thoughtSpring =
    frame >= rafiPopFrame + 16
      ? spring({
          frame: frame - (rafiPopFrame + 16),
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
      {/* Scene 06 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      {/* Dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(57, 197, 207, 0.14) 1.4px, transparent 1.4px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Persistent Top Section Header + ConceptTags */}
      <div
        style={{
          position: "absolute",
          top: LAYOUT.safeTop,
          left: LAYOUT.safeX,
          right: LAYOUT.safeX,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          zIndex: 40,
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
            border: `1.5px solid ${COLORS.border}`,
            width: "fit-content",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: isRunnerStage ? COLORS.runner : COLORS.job,
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
            ধাপ ২ · Job এবং Runner
          </span>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <ConceptTag
            label="Job"
            subLabel="কাজের গ্রুপ"
            color={COLORS.job}
            startFrame={jobTagFrame}
          />
          <ConceptTag
            label="Runner"
            subLabel="Virtual Machine"
            color={COLORS.runner}
            startFrame={runnerHighlightFrame}
          />
        </div>
      </div>

      {/* Wide 2160px Panning Stage */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 2160,
          height: 1920,
          transform: `translateX(${panX}px)`,
        }}
      >
        {/* Continuous Cyan Beam spanning from CodeEditor (x=880) -> Cloud VM (x=1400) */}
        {beamProgress > 0.01 ? (
          <svg
            viewBox="0 0 2160 1920"
            width="2160"
            height="1920"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 15,
            }}
          >
            <defs>
              <filter id="cyan-beam-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Outer soft beam */}
            <line
              x1="780"
              y1="780"
              x2={780 + 780 * beamProgress}
              y2={780 - 150 * beamProgress}
              stroke={COLORS.runner}
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.28"
              filter="url(#cyan-beam-glow)"
            />
            {/* Core animated dashed energy line */}
            <line
              x1="780"
              y1="780"
              x2={780 + 780 * beamProgress}
              y2={780 - 150 * beamProgress}
              stroke={COLORS.runner}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="24 16"
              strokeDashoffset={-beamPulseOffset}
            />
            {/* Leading cyan spark tip */}
            <circle
              cx={780 + 780 * beamProgress}
              cy={780 - 150 * beamProgress}
              r="14"
              fill="#FFFFFF"
              filter="url(#cyan-beam-glow)"
            />
          </svg>
        ) : null}

        {/* LEFT HALF (x = 0..1080): CodeEditor with lines 1–6 dimmed & 7–9 typing */}
        <div
          style={{
            position: "absolute",
            top: 310,
            left: LAYOUT.safeX,
            width: 984,
            zIndex: 20,
          }}
        >
          <CodeEditor
            code={SCENE6_CODE}
            preTypedLines={6}
            dimLines={[1, 2, 3, 4, 5, 6]}
            highlightLines={isRunnerStage ? [9] : [7, 8]}
            highlightColor={isRunnerStage ? COLORS.runner : COLORS.job}
            typingStartFrame={f(12)}
            charsPerFrame={1.1}
            fontSize={29}
            width="100%"
          />

          {/* Quick Explanatory Cards beneath CodeEditor */}
          <div
            style={{
              marginTop: 34,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                padding: "22px 26px",
                borderRadius: LAYOUT.cardRadius,
                backgroundColor: COLORS.panel,
                border: `2px solid ${COLORS.job}88`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: frame >= jobTagFrame ? 1 : 0.25,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONTS.code,
                    fontSize: 26,
                    fontWeight: 700,
                    color: COLORS.job,
                  }}
                >
                  build:
                </div>
                <div
                  style={{
                    fontFamily: FONTS.bangla,
                    fontSize: 25,
                    fontWeight: 600,
                    color: COLORS.text,
                    marginTop: 4,
                  }}
                >
                  একটি Job-এর ভেতর সব Step একসাথে চলে
                </div>
              </div>
              <div
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 18,
                  fontWeight: 800,
                  color: COLORS.job,
                  padding: "6px 14px",
                  borderRadius: 10,
                  backgroundColor: `${COLORS.job}22`,
                }}
              >
                JOB
              </div>
            </div>

            <div
              style={{
                padding: "22px 26px",
                borderRadius: LAYOUT.cardRadius,
                backgroundColor: COLORS.panel,
                border: `2px solid ${
                  isRunnerStage ? COLORS.runner : COLORS.border
                }`,
                boxShadow: isRunnerStage ? SHADOWS.glow(COLORS.runner) : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: isRunnerStage ? 1 : 0.25,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONTS.code,
                    fontSize: 26,
                    fontWeight: 700,
                    color: COLORS.runner,
                  }}
                >
                  runs-on: ubuntu-latest
                </div>
                <div
                  style={{
                    fontFamily: FONTS.bangla,
                    fontSize: 25,
                    fontWeight: 600,
                    color: COLORS.text,
                    marginTop: 4,
                  }}
                >
                  GitHub Cloud-এ নতুন Virtual Machine
                </div>
              </div>
              <div
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 18,
                  fontWeight: 800,
                  color: COLORS.runner,
                  padding: "6px 14px",
                  borderRadius: 10,
                  backgroundColor: `${COLORS.runner}22`,
                }}
              >
                RUNNER
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT HALF (x = 1080..2160): Cloud + Assembling Virtual Machine Card */}
        <div
          style={{
            position: "absolute",
            top: 280,
            left: 1080 + LAYOUT.safeX,
            width: 984,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          {/* Cloud Silhouette Container */}
          <div
            style={{
              position: "relative",
              width: 960,
              height: 670,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${interpolate(cloudSpring, [0, 1], [0.75, 1])})`,
              opacity: cloudSpring,
            }}
          >
            {/* Glowing Flat Vector Cloud SVG */}
            <svg
              viewBox="0 0 960 660"
              width="960"
              height="660"
              style={{ position: "absolute", inset: 0 }}
            >
              <defs>
                <linearGradient id="cloud-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A2940" />
                  <stop offset="100%" stopColor="#121A28" />
                </linearGradient>
              </defs>
              <path
                d="M 210 580 C 100 580 42 505 42 415 C 42 332 98 265 178 252 C 194 148 286 72 398 72 C 482 72 554 114 596 178 C 626 164 660 156 696 156 C 818 156 914 252 914 372 C 914 488 824 580 706 580 Z"
                fill="url(#cloud-fill)"
                stroke={COLORS.runner}
                strokeWidth="4"
                strokeOpacity="0.65"
              />
              {/* Cloud Label at top */}
              <text
                x="415"
                y="186"
                textAnchor="middle"
                fill={COLORS.runner}
                fontFamily={FONTS.ui}
                fontSize="22"
                fontWeight="800"
                letterSpacing="2"
              >
                GITHUB HOSTED CLOUD
              </text>
            </svg>

            {/* Assembling Virtual Machine Card inside the Cloud */}
            <div
              style={{
                position: "relative",
                zIndex: 5,
                marginTop: 86,
                width: 720,
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `2.5px solid ${COLORS.runner}`,
                boxShadow: SHADOWS.glow(COLORS.runner),
                padding: "30px 34px",
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
            >
              {/* Top Row: Server Rack Icon + Generic Orange Circle + VM Title */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  transform: `translateY(${interpolate(rackSpring, [0, 1], [35, 0])}px)`,
                  opacity: rackSpring,
                }}
              >
                {/* Flat Server Rack Icon */}
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 20,
                    backgroundColor: `${COLORS.runner}1F`,
                    border: `2px solid ${COLORS.runner}66`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="64" height="64" viewBox="0 0 64 64">
                    <rect x="8" y="8" width="48" height="14" rx="4" fill="#2B3648" stroke={COLORS.runner} strokeWidth="2.5" />
                    <circle cx="17" cy="15" r="3" fill={COLORS.success} />
                    <line x1="26" y1="15" x2="48" y2="15" stroke="#8B949E" strokeWidth="3" strokeLinecap="round" />

                    <rect x="8" y="25" width="48" height="14" rx="4" fill="#2B3648" stroke={COLORS.runner} strokeWidth="2.5" />
                    <circle cx="17" cy="32" r="3" fill={COLORS.runner} />
                    <line x1="26" y1="32" x2="48" y2="32" stroke="#8B949E" strokeWidth="3" strokeLinecap="round" />

                    <rect x="8" y="42" width="48" height="14" rx="4" fill="#2B3648" stroke={COLORS.runner} strokeWidth="2.5" />
                    <circle cx="17" cy="49" r="3" fill={COLORS.success} />
                    <line x1="26" y1="49" x2="48" y2="49" stroke="#8B949E" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      transform: `scale(${interpolate(badgeSpring, [0, 1], [0.6, 1])})`,
                      opacity: badgeSpring,
                      transformOrigin: "left center",
                    }}
                  >
                    {/* Generic orange circle (No official Ubuntu logo) */}
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "#E95420",
                        boxShadow: "0 0 14px rgba(233, 84, 32, 0.7)",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: FONTS.code,
                        fontSize: 30,
                        fontWeight: 800,
                        color: "#FFFFFF",
                      }}
                    >
                      ubuntu-latest
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.ui,
                      fontSize: 24,
                      fontWeight: 600,
                      color: COLORS.runner,
                      marginTop: 6,
                    }}
                  >
                    ubuntu-latest · Virtual Machine
                  </div>
                </div>
              </div>

              {/* Spec Chips assembling in */}
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  opacity: specsSpring,
                  transform: `translateY(${interpolate(specsSpring, [0, 1], [18, 0])}px)`,
                }}
              >
                {["Fresh Linux OS", "Auto-Provisioned", "Zero Setup"].map(
                  (spec) => (
                    <div
                      key={spec}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        backgroundColor: "#0F1520",
                        border: `1px solid ${COLORS.border}`,
                        fontFamily: FONTS.code,
                        fontSize: 17,
                        color: COLORS.text,
                        textAlign: "center",
                      }}
                    >
                      ✓ {spec}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 310–443: Rafi pops in from bottom (shocked -> happy) + Thought Bubble */}
      {frame >= rafiPopFrame ? (
        <div
          style={{
            position: "absolute",
            bottom: 205,
            left: 56,
            right: 56,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 24,
            transform: `translateY(${rafiY}px)`,
            zIndex: 45,
          }}
        >
          <Character
            name="rafi"
            expression={frame >= rafiHappyFrame ? "happy" : "shocked"}
            talking={false}
            size={360}
          />

          {/* Thought Bubble: "নিজের Server ছাড়াই!" */}
          {thoughtSpring > 0.01 ? (
            <div
              style={{
                position: "relative",
                marginBottom: 155,
                transform: `scale(${interpolate(thoughtSpring, [0, 1], [0.4, 1])})`,
                opacity: thoughtSpring,
                transformOrigin: "left bottom",
              }}
            >
              {/* Small thought dots */}
              <div
                style={{
                  position: "absolute",
                  left: -26,
                  bottom: 18,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: -46,
                  bottom: 4,
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 28,
                  padding: "24px 32px",
                  border: `4px solid ${COLORS.runner}`,
                  boxShadow: "0 18px 48px rgba(0, 0, 0, 0.5)",
                  maxWidth: 440,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.bangla,
                    fontSize: 40,
                    fontWeight: 700,
                    color: "#0D1117",
                    lineHeight: 1.25,
                    letterSpacing: 0,
                  }}
                >
                  নিজের Server ছাড়াই!
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Bangla Subtitle Bar */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
