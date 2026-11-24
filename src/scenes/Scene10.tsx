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

const META = SCENES_META[9];

const END_WORDS = [
  "তোমার",
  "প্রথম",
  "Workflow",
  "কবে",
  "লিখছ?",
] as const;

export const Scene10: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced cue anchors
  const checkPopFrame = f(48);
  const shieldStartFrame = f(115); // "কারণ এখন প্রতিটি Push পাহারা দেয় GitHub Actions।"
  const highFiveStartFrame = f(168); // Zoom out + Rafi & Nadia high-five
  const highFiveHitFrame = f(198);
  const endCardStartFrame = f(254); // "আর তুমি? তোমার প্রথম Workflow কবে লিখছ?"

  // Checkmark pop on laptop
  const laptopCheckSpring =
    frame >= checkPopFrame
      ? spring({
          frame: frame - checkPopFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  // Shield + Push stream entrance
  const shieldSpring =
    frame >= shieldStartFrame
      ? spring({
          frame: frame - shieldStartFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  // Zoom out for high-five (168..254)
  const zoomOutScale = interpolate(
    frame,
    [highFiveStartFrame, highFiveStartFrame + 28],
    [1.06, 0.94],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  // High-five spring arm animation
  const highFiveSpring =
    frame >= highFiveStartFrame + 14
      ? spring({
          frame: frame - (highFiveStartFrame + 14),
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const nadiaSlideSpring =
    frame >= highFiveStartFrame
      ? spring({
          frame: frame - highFiveStartFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;
  const rafiShiftX = interpolate(nadiaSlideSpring, [0, 1], [0, -190]);
  const nadiaEnterX = interpolate(nadiaSlideSpring, [0, 1], [420, 190]);

  // High-five spark burst at contact
  const clapBurstProgress = interpolate(
    frame,
    [highFiveHitFrame, highFiveHitFrame + 22],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const clapBurstOpacity = interpolate(
    frame,
    [highFiveHitFrame, highFiveHitFrame + 4, highFiveHitFrame + 22],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // End card transition (254..385)
  const endCardOpacity = interpolate(
    frame,
    [endCardStartFrame, endCardStartFrame + 16],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const cursorVisible = Math.floor(frame / 14) % 2 === 0;
  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#141628",
        overflow: "hidden",
        fontFamily: FONTS.ui,
      }}
    >
      {/* Scene 10 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
      {/* Music fade-out over the last 60 frames handled in Video.tsx */}

      {/* Warm calm night background (outside zoom container so it always fills edge-to-edge) */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, #121833 0%, #1B1C30 48%, #221B24 100%)",
        }}
      />

      {/* PHASE 1 & 2 (0..268): Warm Calm Night -> Shield Stream -> High-Five */}
      {endCardOpacity < 0.99 ? (
        <AbsoluteFill
          style={{
            transform: `scale(${zoomOutScale})`,
            transformOrigin: "50% 62%",
            opacity: 1 - endCardOpacity,
          }}
        >
          {/* Warm desk lamp golden halo */}
          <div
            style={{
              position: "absolute",
              top: 520,
              left: "50%",
              transform: "translateX(-50%)",
              width: 980,
              height: 980,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(242, 153, 74, 0.22) 0%, rgba(63, 185, 80, 0.08) 45%, transparent 72%)",
              pointerEvents: "none",
            }}
          />

          {/* Calm Night Badge */}
          <div
            style={{
              position: "absolute",
              top: LAYOUT.safeTop + 10,
              left: LAYOUT.safeX,
              padding: "10px 24px",
              borderRadius: 999,
              backgroundColor: "rgba(22, 27, 34, 0.85)",
              border: `1.5px solid ${COLORS.success}77`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                backgroundColor: COLORS.success,
                boxShadow: `0 0 12px ${COLORS.success}`,
              }}
            />
            <span
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 23,
                fontWeight: 700,
                color: "#E6EDF3",
              }}
            >
              চিন্তামুক্ত Deploy · শান্ত রাত
            </span>
          </div>

          {/* SHIELD GUARDING PUSH STREAM -> SERVER (115..254) */}
          {shieldSpring > 0.01 ? (
            <div
              style={{
                position: "absolute",
                top: 235,
                left: LAYOUT.safeX,
                right: LAYOUT.safeX,
                opacity: shieldSpring,
                transform: `scale(${interpolate(shieldSpring, [0, 1], [0.75, 1])})`,
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(22, 27, 34, 0.92)",
                  borderRadius: 30,
                  border: `2.5px solid ${COLORS.success}88`,
                  boxShadow: SHADOWS.glow(COLORS.success),
                  padding: "36px 26px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <svg
                  viewBox="0 0 930 340"
                  width="100%"
                  height="340"
                  style={{ overflow: "visible" }}
                >
                  <defs>
                    <linearGradient id="shield-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={COLORS.job} />
                      <stop offset="50%" stopColor={COLORS.runner} />
                      <stop offset="100%" stopColor={COLORS.success} />
                    </linearGradient>
                  </defs>

                  {/* Stream track line */}
                  <line
                    x1="60"
                    y1="170"
                    x2="780"
                    y2="170"
                    stroke="#30363D"
                    strokeWidth="8"
                    strokeDasharray="14 10"
                  />

                  {/* Flowing "Push" pills moving left -> shield -> server */}
                  {[0, 1, 2].map((i) => {
                    const elapsed = Math.max(0, frame - shieldStartFrame);
                    const t = ((elapsed * 1.4 + i * 32) % 96) / 96;
                    const px = interpolate(t, [0, 1], [40, 745]);
                    const passedShield = px > 455;
                    const op = interpolate(t, [0, 0.1, 0.88, 1], [0, 1, 1, 0]);
                    return (
                      <g
                        key={i}
                        transform={`translate(${px}, 170)`}
                        opacity={op}
                      >
                        <rect
                          x="-52"
                          y="-24"
                          width="104"
                          height="48"
                          rx="14"
                          fill={
                            passedShield
                              ? `${COLORS.success}33`
                              : `${COLORS.event}33`
                          }
                          stroke={passedShield ? COLORS.success : COLORS.event}
                          strokeWidth="2.5"
                        />
                        <text
                          x="0"
                          y="7"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontFamily={FONTS.code}
                          fontSize="20"
                          fontWeight="700"
                        >
                          {passedShield ? "Push ✓" : "Push ↑"}
                        </text>
                      </g>
                    );
                  })}

                  {/* Protective Shield Wrapping the Stream */}
                  <g transform="translate(460, 170)">
                    <circle
                      cx="0"
                      cy="0"
                      r="128"
                      fill={COLORS.runner}
                      opacity="0.1"
                    />
                    <path
                      d="M 0 -118 L 106 -76 L 106 8 C 106 72 60 112 0 132 C -60 112 -106 72 -106 8 L -106 -76 Z"
                      fill="rgba(13, 17, 23, 0.88)"
                      stroke="url(#shield-grad)"
                      strokeWidth="7"
                    />
                    {/* Shield check emblem */}
                    <path
                      d="M -28 2 L -8 22 L 32 -22"
                      fill="none"
                      stroke={COLORS.success}
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <text
                      x="0"
                      y="72"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontFamily={FONTS.ui}
                      fontSize="22"
                      fontWeight="800"
                    >
                      GitHub Actions
                    </text>
                  </g>

                  {/* Production Server Icon on Right */}
                  <g transform="translate(825, 170)">
                    <rect
                      x="-58"
                      y="-76"
                      width="116"
                      height="152"
                      rx="20"
                      fill="#161B22"
                      stroke={COLORS.success}
                      strokeWidth="3.5"
                    />
                    <rect x="-38" y="-48" width="76" height="22" rx="6" fill="#232A35" />
                    <circle cx="-24" cy="-37" r="4.5" fill={COLORS.success} />
                    <rect x="-38" y="-12" width="76" height="22" rx="6" fill="#232A35" />
                    <circle cx="-24" cy="-1" r="4.5" fill={COLORS.success} />
                    <rect x="-38" y="24" width="76" height="22" rx="6" fill="#232A35" />
                    <circle cx="-24" cy="35" r="4.5" fill={COLORS.runner} />
                    <text
                      x="0"
                      y="108"
                      textAnchor="middle"
                      fill={COLORS.text}
                      fontFamily={FONTS.ui}
                      fontSize="24"
                      fontWeight="800"
                    >
                      Server
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          ) : null}

          {/* Characters + Laptop + High-Five Stage */}
          <div
            style={{
              position: "absolute",
              bottom: 245,
              left: 0,
              right: 0,
              height: 620,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            {/* Rafi (smiling, slides slightly left when Nadia enters for high-five) */}
            <div
              style={{
                position: "absolute",
                bottom: 50,
                transform: `translateX(${rafiShiftX}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Character
                name="rafi"
                expression={frame >= highFiveStartFrame ? "happy" : "smile"}
                talking={false}
                size={410}
              />

              {/* Laptop with Green Checkmark (before high-five zooms out) */}
              {frame < highFiveStartFrame + 16 ? (
                <div
                  style={{
                    marginTop: -62,
                    opacity: interpolate(
                      frame,
                      [highFiveStartFrame, highFiveStartFrame + 16],
                      [1, 0],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                    ),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 340,
                      height: 118,
                      borderRadius: "16px 16px 4px 4px",
                      backgroundColor: "#212838",
                      border: `2.5px solid ${COLORS.success}`,
                      boxShadow: SHADOWS.glow(COLORS.success),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 14,
                    }}
                  >
                    {laptopCheckSpring > 0.01 ? (
                      <div
                        style={{
                          transform: `scale(${laptopCheckSpring})`,
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            backgroundColor: COLORS.success,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#0D1117",
                            fontSize: 30,
                            fontWeight: 800,
                          }}
                        >
                          ✓
                        </div>
                        <span
                          style={{
                            fontFamily: FONTS.code,
                            fontSize: 22,
                            fontWeight: 700,
                            color: COLORS.success,
                          }}
                        >
                          Deployed!
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div
                    style={{
                      width: 390,
                      height: 14,
                      borderRadius: "4px 4px 12px 12px",
                      backgroundColor: "#3D4761",
                    }}
                  />
                </div>
              ) : null}
            </div>

            {/* Nadia Apu slides in from right for celebratory High-Five */}
            {frame >= highFiveStartFrame ? (
              <div
                style={{
                  position: "absolute",
                  bottom: 50,
                  transform: `translateX(${nadiaEnterX}px)`,
                  opacity: nadiaSlideSpring,
                }}
              >
                <Character
                  name="nadia"
                  expression="happy"
                  talking={false}
                  size={410}
                />
              </div>
            ) : null}

            {/* Animated Spring High-Five Arms + Golden Spark Burst */}
            {frame >= highFiveStartFrame + 10 ? (
              <svg
                viewBox="0 0 600 320"
                width="600"
                height="320"
                style={{
                  position: "absolute",
                  bottom: 185,
                  pointerEvents: "none",
                  overflow: "visible",
                }}
              >
                {/* Rafi's raising right arm */}
                <g
                  transform={`rotate(${interpolate(
                    highFiveSpring,
                    [0, 1],
                    [58, -8],
                  )} 185 260)`}
                >
                  <line
                    x1="185"
                    y1="260"
                    x2="286"
                    y2="122"
                    stroke="#2B313C"
                    strokeWidth="30"
                    strokeLinecap="round"
                  />
                  <circle cx="292" cy="112" r="20" fill="#D8A47F" />
                </g>

                {/* Nadia's raising left arm */}
                <g
                  transform={`rotate(${interpolate(
                    highFiveSpring,
                    [0, 1],
                    [-58, 8],
                  )} 415 260)`}
                >
                  <line
                    x1="415"
                    y1="260"
                    x2="314"
                    y2="122"
                    stroke="#157F82"
                    strokeWidth="28"
                    strokeLinecap="round"
                  />
                  <circle cx="308" cy="112" r="20" fill="#DFB08E" />
                </g>

                {/* High-five Impact Starburst */}
                {clapBurstOpacity > 0.01 ? (
                  <g
                    transform={`translate(300, 102) scale(${interpolate(
                      clapBurstProgress,
                      [0, 1],
                      [0.4, 1.4],
                    )})`}
                    opacity={clapBurstOpacity}
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line
                        key={i}
                        x1="0"
                        y1="-28"
                        x2="0"
                        y2="-56"
                        stroke="#FACC15"
                        strokeWidth="6"
                        strokeLinecap="round"
                        transform={`rotate(${i * 45})`}
                      />
                    ))}
                  </g>
                ) : null}
              </svg>
            ) : null}
          </div>
        </AbsoluteFill>
      ) : null}

      {/* PHASE 3 (254–385): End Card on #0D1117 — Word-by-word Bangla Question + ci.yml icon */}
      {endCardOpacity > 0.01 ? (
        <AbsoluteFill
          style={{
            backgroundColor: COLORS.bg,
            opacity: endCardOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 64,
            paddingRight: 64,
            paddingBottom: 150,
            gap: 54,
            zIndex: 50,
          }}
        >
          {/* Subtle dot grid & glow */}
          <AbsoluteFill
            style={{
              backgroundImage:
                "radial-gradient(rgba(57, 197, 207, 0.14) 1.5px, transparent 1.5px)",
              backgroundSize: "34px 34px",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 720,
              height: 720,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(47, 129, 247, 0.18) 0%, rgba(163, 113, 247, 0.08) 45%, transparent 72%)",
              pointerEvents: "none",
            }}
          />

          {/* Top Tag */}
          <div
            style={{
              position: "relative",
              padding: "10px 28px",
              borderRadius: 999,
              backgroundColor: COLORS.panel,
              border: `1.5px solid ${COLORS.runner}`,
              fontFamily: FONTS.ui,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.runner,
              letterSpacing: 1.2,
              textTransform: "uppercase",
            }}
          >
            GitHub Actions · Start Today
          </div>

          {/* Word-by-word Bangla Question: "তোমার প্রথম Workflow কবে লিখছ?" */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "14px 20px",
              maxWidth: 900,
            }}
          >
            {END_WORDS.map((word, idx) => {
              const wordStart = endCardStartFrame + 16 + idx * 14;
              const ws =
                frame >= wordStart
                  ? spring({
                      frame: frame - wordStart,
                      fps,
                      config: SPRING_CONFIG.bouncy,
                    })
                  : 0;
              const isHighlight = word === "Workflow";
              return (
                <span
                  key={idx}
                  style={{
                    fontFamily: isHighlight ? FONTS.ui : FONTS.bangla,
                    fontSize: 78,
                    fontWeight: 700,
                    color: isHighlight ? COLORS.runner : "#FFFFFF",
                    lineHeight: 1.24,
                    letterSpacing: 0,
                    display: "inline-block",
                    transform: `translateY(${interpolate(ws, [0, 1], [34, 0])}px) scale(${interpolate(ws, [0, 1], [0.8, 1])})`,
                    opacity: ws,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Small ci.yml File Icon Card with Blinking Cursor */}
          <div
            style={{
              position: "relative",
              marginTop: 12,
              padding: "26px 42px",
              borderRadius: 26,
              backgroundColor: COLORS.panel,
              border: `2px solid ${COLORS.border}`,
              boxShadow: SHADOWS.glow(COLORS.event),
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            {/* Mini ci.yml File Icon */}
            <svg width="64" height="74" viewBox="0 0 64 74">
              <defs>
                <linearGradient id="end-file-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={COLORS.step} />
                  <stop offset="100%" stopColor={COLORS.job} />
                </linearGradient>
              </defs>
              <path
                d="M 8 4 L 42 4 L 58 20 L 58 66 Q 58 70 54 70 L 8 70 Q 4 70 4 66 L 4 8 Q 4 4 8 4 Z"
                fill="url(#end-file-grad)"
              />
              <path d="M 42 4 L 42 20 L 58 20 Z" fill="rgba(255,255,255,0.35)" />
              <rect x="14" y="34" width="26" height="5" rx="2.5" fill="#FFFFFF" />
              <rect x="14" y="46" width="34" height="5" rx="2.5" fill="#FFFFFF" opacity="0.8" />
              <rect x="14" y="58" width="22" height="5" rx="2.5" fill="#FFFFFF" opacity="0.7" />
            </svg>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: FONTS.code,
                fontSize: 34,
                fontWeight: 700,
                color: COLORS.text,
              }}
            >
              <span>.github/workflows/</span>
              <span style={{ color: COLORS.runner }}>ci.yml</span>
              {cursorVisible ? (
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 36,
                    backgroundColor: COLORS.runner,
                    marginLeft: 8,
                    borderRadius: 3,
                  }}
                />
              ) : null}
            </div>
          </div>
        </AbsoluteFill>
      ) : null}

      {/* Bangla Subtitle Bar */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
