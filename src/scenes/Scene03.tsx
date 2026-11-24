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
import { SceneSubtitles } from "../components/Subtitle";

const META = SCENES_META[2];

const LOOP_ITEMS = ["Test", "Build", "Deploy"] as const;

export const Scene03: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced cue anchors
  const bubbleStart = f(108); // "রাফি, মানুষ ভুল করবেই।"
  const splitStart = f(186); // "তাই যে কাজ প্রতিবার..."
  const revealStart = f(324); // "চলো, তোমাকে GitHub Actions দেখাই।"

  const nadiaTalking =
    (frame >= f(10) && frame <= f(184)) ||
    (frame >= f(190) && frame <= f(316)) ||
    (frame >= f(326) && frame <= f(404));

  // Speech bubble pop
  const bubbleSpring =
    frame >= bubbleStart
      ? spring({
          frame: frame - bubbleStart,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const bubbleFadeOut = interpolate(
    frame,
    [splitStart - 10, splitStart + 4],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Split-screen metaphor progress (186..324)
  const splitSpring =
    frame >= splitStart
      ? spring({
          frame: frame - splitStart,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;
  const splitFadeOut = interpolate(
    frame,
    [revealStart - 10, revealStart + 4],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const splitOpacity = splitSpring * splitFadeOut;

  // Split-screen animation variables
  const splitElapsed = Math.max(0, frame - splitStart);
  const repeatCount = Math.min(12, 1 + Math.floor(splitElapsed / 14));
  const activeHumanStep = Math.floor(splitElapsed / 12) % 3;
  const activeRobotStep = Math.floor(splitElapsed / 12) % 3;
  // Hand gets shakier as repeat count rises
  const shakeAmp = Math.min(14, repeatCount * 1.45);
  const handShakeX = Math.sin(frame * 2.3) * shakeAmp;
  const handShakeY = Math.cos(frame * 2.9) * shakeAmp * 0.7;
  // Smooth continuous robot arm angle
  const robotAngle = Math.sin(splitElapsed * 0.14) * 18;

  // GitHub Actions hero reveal (324..end)
  const revealSpring =
    frame >= revealStart
      ? spring({
          frame: frame - revealStart,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const sweepProgress = interpolate(
    frame,
    [revealStart + 8, revealStart + 50],
    [-120, 220],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );
  const gearRotation = frame >= revealStart ? (frame - revealStart) * 2.2 : 0;

  // Rafi shifts from sad/looking down -> happy at revealStart!
  const isRafiHappy = frame >= revealStart + 10;
  const rafiHappyBounce =
    frame >= revealStart + 10
      ? spring({
          frame: frame - (revealStart + 10),
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const rafiYOffset = isRafiHappy
    ? interpolate(rafiHappyBounce, [0, 1], [14, -6])
    : 14;

  // Characters scale gently in place during split-screen (staying above bottom 160px subtitle safe zone)
  const charsScale = interpolate(
    splitOpacity,
    [0, 1],
    [1, 0.84],
  );
  const charsY = interpolate(splitOpacity, [0, 1], [0, -18]);

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.warmBg,
        overflow: "hidden",
      }}
    >
      {/* Scene 03 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      {/* Warm Office Afternoon Background + Soft Orange Sunlight */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(165deg, #2B1D14 0%, #1B1517 48%, #12151E 100%)",
        }}
      />
      {/* Warm afternoon golden sunbeam from top-right */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(242, 153, 74, 0.28) 0%, rgba(242, 153, 74, 0.08) 45%, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Warm Afternoon Badge */}
      <div
        style={{
          position: "absolute",
          top: LAYOUT.safeTop,
          left: LAYOUT.safeX,
          padding: "10px 24px",
          borderRadius: 999,
          backgroundColor: "rgba(38, 27, 22, 0.85)",
          border: `1.5px solid ${COLORS.warmAccent}66`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 20,
        }}
      >
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            backgroundColor: COLORS.warmAccent,
            boxShadow: `0 0 12px ${COLORS.warmAccent}`,
          }}
        />
        <span
          style={{
            fontFamily: FONTS.bangla,
            fontSize: 22,
            fontWeight: 700,
            color: "#FDE6C4",
          }}
        >
          নাদিয়া আপুর পরামর্শ · Senior Developer
        </span>
      </div>

      {/* PHASE A (108–186): Speech Bubble from Nadia: "মানুষ ভুল করবেই।" */}
      {frame >= bubbleStart && bubbleFadeOut > 0.01 ? (
        <div
          style={{
            position: "absolute",
            top: 340,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "center",
            opacity: bubbleFadeOut,
            transform: `scale(${interpolate(bubbleSpring, [0, 1], [0.5, 1])})`,
            zIndex: 40,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#FFFBEB",
              borderRadius: 30,
              padding: "36px 52px",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
              border: `4px solid ${COLORS.warmAccent}`,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 58,
                fontWeight: 700,
                color: "#1F2328",
                textAlign: "center",
                letterSpacing: 0,
              }}
            >
              “মানুষ ভুল করবেই।”
            </div>
            {/* Speech bubble pointer toward Nadia on the right */}
            <div
              style={{
                position: "absolute",
                bottom: -24,
                right: 170,
                width: 42,
                height: 42,
                backgroundColor: "#FFFBEB",
                borderRight: `4px solid ${COLORS.warmAccent}`,
                borderBottom: `4px solid ${COLORS.warmAccent}`,
                transform: "rotate(45deg)",
              }}
            />
          </div>
        </div>
      ) : null}

      {/* PHASE B (186–324): Split-Screen Metaphor (Human Hand vs Robot Arm) */}
      {splitOpacity > 0.01 ? (
        <div
          style={{
            position: "absolute",
            top: 210,
            left: LAYOUT.safeX,
            right: LAYOUT.safeX,
            opacity: splitOpacity,
            transform: `translateY(${interpolate(splitSpring, [0, 1], [50, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            zIndex: 45,
          }}
        >
          {/* Caption pill */}
          <div
            style={{
              alignSelf: "center",
              padding: "14px 34px",
              borderRadius: 999,
              backgroundColor: COLORS.panel,
              border: `2px solid ${COLORS.runner}`,
              boxShadow: SHADOWS.glow(COLORS.runner),
              fontFamily: FONTS.bangla,
              fontSize: 36,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: 0,
            }}
          >
            একই কাজ বারবার? Machine-কে দাও
          </div>

          {/* 2-Column Split Cards */}
          <div style={{ display: "flex", gap: 24 }}>
            {/* LEFT: Human Hand (shaky + rising counter) */}
            <div
              style={{
                flex: 1,
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `2px solid ${COLORS.fail}77`,
                boxShadow: SHADOWS.card,
                padding: "26px 22px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.bangla,
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.fail,
                  }}
                >
                  মানুষ (Manual)
                </span>
                <span
                  style={{
                    fontFamily: FONTS.code,
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#FFFFFF",
                    backgroundColor: `${COLORS.fail}33`,
                    border: `1.5px solid ${COLORS.fail}`,
                    padding: "4px 14px",
                    borderRadius: 10,
                  }}
                >
                  ×{repeatCount}
                </span>
              </div>

              {/* Shaky Human Hand SVG */}
              <div
                style={{
                  height: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `translate(${handShakeX.toFixed(1)}px, ${handShakeY.toFixed(1)}px)`,
                }}
              >
                <svg width="190" height="190" viewBox="0 0 190 190">
                  {/* Motion shake arcs */}
                  {repeatCount >= 3 ? (
                    <>
                      <path
                        d="M 28 70 Q 16 95 28 120"
                        fill="none"
                        stroke={COLORS.fail}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        opacity="0.7"
                      />
                      <path
                        d="M 162 70 Q 174 95 162 120"
                        fill="none"
                        stroke={COLORS.fail}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        opacity="0.7"
                      />
                    </>
                  ) : null}
                  {/* Wrist & Palm */}
                  <rect x="66" y="128" width="58" height="48" rx="14" fill="#3B4252" />
                  <rect x="54" y="68" width="82" height="72" rx="28" fill="#D8A47F" />
                  {/* Fingers */}
                  <rect x="56" y="34" width="16" height="46" rx="8" fill="#D8A47F" />
                  <rect x="77" y="24" width="16" height="54" rx="8" fill="#D8A47F" />
                  <rect x="98" y="28" width="16" height="50" rx="8" fill="#D8A47F" />
                  <rect x="118" y="42" width="15" height="40" rx="7.5" fill="#D8A47F" />
                  {/* Thumb */}
                  <rect
                    x="36"
                    y="82"
                    width="30"
                    height="16"
                    rx="8"
                    transform="rotate(-25 36 82)"
                    fill="#C48D68"
                  />
                  {/* Sweat drop on fatigued hand */}
                  {repeatCount >= 4 ? (
                    <path
                      d="M 152 38 C 152 38 162 52 162 59 A 10 10 0 0 1 142 59 C 142 52 152 38 152 38 Z"
                      fill="#38BDF8"
                    />
                  ) : null}
                </svg>
              </div>

              {/* Loop Steps (Human) */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                {LOOP_ITEMS.map((item, idx) => {
                  const isActive = idx === activeHumanStep;
                  const missed = repeatCount >= 6 && idx === 0;
                  return (
                    <div
                      key={item}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 12,
                        backgroundColor: missed
                          ? `${COLORS.fail}33`
                          : isActive
                            ? `${COLORS.running}22`
                            : "#0F141B",
                        border: `1.5px solid ${
                          missed
                            ? COLORS.fail
                            : isActive
                              ? COLORS.running
                              : COLORS.border
                        }`,
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: FONTS.code,
                        fontSize: 21,
                        fontWeight: 700,
                        color: missed ? COLORS.fail : COLORS.text,
                      }}
                    >
                      <span>{item}</span>
                      <span>{missed ? "✕" : isActive ? "..." : "↻"}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Robot Arm (smooth, crisp, flawless) */}
            <div
              style={{
                flex: 1,
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `2px solid ${COLORS.success}88`,
                boxShadow: SHADOWS.glow(COLORS.success),
                padding: "26px 22px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.bangla,
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.success,
                  }}
                >
                  Machine (Auto)
                </span>
                <span
                  style={{
                    fontFamily: FONTS.code,
                    fontSize: 22,
                    fontWeight: 800,
                    color: COLORS.success,
                    backgroundColor: `${COLORS.success}22`,
                    border: `1.5px solid ${COLORS.success}`,
                    padding: "4px 12px",
                    borderRadius: 10,
                  }}
                >
                  100% ✓
                </span>
              </div>

              {/* Sleek Animated Robot Arm SVG */}
              <div
                style={{
                  height: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="190" height="190" viewBox="0 0 190 190">
                  {/* Base pedestal */}
                  <rect x="48" y="152" width="94" height="22" rx="10" fill="#30363D" />
                  <circle cx="95" cy="148" r="18" fill={COLORS.runner} />
                  {/* Lower arm segment */}
                  <g transform={`rotate(${robotAngle * 0.6} 95 148)`}>
                    <rect x="85" y="82" width="20" height="68" rx="10" fill="#8B949E" />
                    <circle cx="95" cy="84" r="14" fill={COLORS.job} />
                    {/* Upper arm segment */}
                    <g transform={`rotate(${-robotAngle * 1.1} 95 84)`}>
                      <rect x="87" y="34" width="16" height="52" rx="8" fill="#C9D1D9" />
                      {/* Precision Claw */}
                      <path
                        d="M 76 22 L 88 38 L 102 38 L 114 22"
                        fill="none"
                        stroke={COLORS.success}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="95" cy="24" r="6" fill={COLORS.success} />
                    </g>
                  </g>
                </svg>
              </div>

              {/* Loop Steps (Machine) */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                {LOOP_ITEMS.map((item, idx) => {
                  const isActive = idx === activeRobotStep;
                  return (
                    <div
                      key={item}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 12,
                        backgroundColor: isActive
                          ? `${COLORS.success}28`
                          : `${COLORS.success}0E`,
                        border: `1.5px solid ${
                          isActive ? COLORS.success : `${COLORS.success}55`
                        }`,
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: FONTS.code,
                        fontSize: 21,
                        fontWeight: 700,
                        color: COLORS.text,
                      }}
                    >
                      <span>{item}</span>
                      <span style={{ color: COLORS.success }}>✓</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* PHASE C (324–end): Generic Gear + Play Icon & "GitHub Actions" Light Sweep Reveal */}
      {frame >= revealStart ? (
        <div
          style={{
            position: "absolute",
            top: 280,
            left: LAYOUT.safeX,
            right: LAYOUT.safeX,
            display: "flex",
            justifyContent: "center",
            transform: `scale(${interpolate(revealSpring, [0, 1], [0.55, 1])})`,
            opacity: revealSpring,
            zIndex: 50,
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              padding: "48px 36px",
              borderRadius: 30,
              backgroundColor: COLORS.panel,
              border: `2.5px solid ${COLORS.job}`,
              boxShadow: `0 24px 70px rgba(47, 129, 247, 0.35), 0 0 0 1px ${COLORS.event}44`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
            }}
          >
            {/* Generic Gear + Play Vector Icon (No Octocat) */}
            <svg width="140" height="140" viewBox="0 0 140 140">
              <defs>
                <linearGradient id="gh-actions-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={COLORS.event} />
                  <stop offset="50%" stopColor={COLORS.job} />
                  <stop offset="100%" stopColor={COLORS.runner} />
                </linearGradient>
              </defs>
              {/* Rotating Gear Teeth */}
              <g transform={`rotate(${gearRotation} 70 70)`}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect
                    key={i}
                    x="60"
                    y="6"
                    width="20"
                    height="24"
                    rx="6"
                    fill="url(#gh-actions-grad)"
                    transform={`rotate(${i * 45} 70 70)`}
                  />
                ))}
                <circle
                  cx="70"
                  cy="70"
                  r="48"
                  fill="none"
                  stroke="url(#gh-actions-grad)"
                  strokeWidth="12"
                />
              </g>
              {/* Play triangle inside gear */}
              <circle cx="70" cy="70" r="34" fill="#0D1117" />
              <polygon points="60,52 92,70 60,88" fill="#FFFFFF" />
            </svg>

            <div
              style={{
                fontFamily: FONTS.ui,
                fontSize: 64,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: -0.8,
                textAlign: "center",
              }}
            >
              GitHub Actions
            </div>

            <div
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 28,
                fontWeight: 600,
                color: COLORS.runner,
              }}
            >
              তোমার অটোমেটিক ডেভেলপমেন্ট সহকারী
            </div>

            {/* Diagonal Light Sweep Overlay */}
            <div
              style={{
                position: "absolute",
                top: -40,
                bottom: -40,
                left: `${sweepProgress}%`,
                width: 140,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.34) 50%, transparent 100%)",
                transform: "skewX(-22deg)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      ) : null}

      {/* Characters Layer: Sad Rafi at Desk + Smiling Talking Nadia Apu */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 40,
          right: 40,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
          transform: `translateY(${charsY}px) scale(${charsScale})`,
          transformOrigin: "bottom center",
          zIndex: 30,
        }}
      >
        {/* Rafi (sad/looking down initially, shifts to happy when GitHub Actions reveals!) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateY(${rafiYOffset}px)`,
          }}
        >
          <Character
            name="rafi"
            expression={isRafiHappy ? "happy" : "tired"}
            talking={false}
            size={360}
          />
          <div
            style={{
              marginTop: -6,
              padding: "6px 20px",
              borderRadius: 999,
              backgroundColor: "rgba(22, 27, 34, 0.85)",
              border: `1px solid ${COLORS.border}`,
              fontFamily: FONTS.bangla,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            রাফি
          </div>
        </div>

        {/* Nadia Apu standing beside Rafi */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Character
            name="nadia"
            expression="smile"
            talking={nadiaTalking}
            size={395}
          />
          <div
            style={{
              marginTop: -6,
              padding: "6px 20px",
              borderRadius: 999,
              backgroundColor: "rgba(21, 127, 130, 0.3)",
              border: `1px solid ${COLORS.runner}`,
              fontFamily: FONTS.bangla,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.runner,
            }}
          >
            নাদিয়া আপু
          </div>
        </div>
      </div>

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
