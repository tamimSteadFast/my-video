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
import { Character } from "../components/Character";
import { ServerBox } from "../components/ServerBox";
import { ConceptTag } from "../components/ConceptTag";
import { SceneSubtitles } from "../components/Subtitle";

const META = PART2_SCENES_META[0];

export const Scene01: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced frame anchors (from scene_01_happy_scene_1.wav)
  const titleFadeOutStart = f(86);
  const titleFadeOutEnd = f(108);
  const cardInFrame = f(115);
  const serverInFrame = f(142);
  const ramHighlightFrame = f(228);
  const clientBubbleFrame = f(326);

  // Subtle opening camera push-in
  const camScale = interpolate(frame, [0, f(80)], [1.03, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Top-left Part 2 badge + Title Card fade in (0–18f) and out (86–108f)
  const titleOpacity = interpolate(
    frame,
    [0, f(16), titleFadeOutStart, titleFadeOutEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const titleY = interpolate(frame, [0, f(18)], [-24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Pricing-style Basic VPS card spring-in
  const cardPop =
    frame >= cardInFrame
      ? spring({
          frame: frame - cardInFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;
  const cardScale = interpolate(cardPop, [0, 1], [0.8, 1]);
  const cardY = interpolate(cardPop, [0, 1], [44, 0]);

  // ServerBox spring-in
  const serverPop =
    frame >= serverInFrame
      ? spring({
          frame: frame - serverInFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  // "1 GB RAM" orange emphasis pulse at 228f
  const ramGlow = interpolate(
    frame,
    [ramHighlightFrame, ramHighlightFrame + f(14)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const ramPulse =
    frame >= ramHighlightFrame
      ? 1 + 0.055 * Math.sin((frame - ramHighlightFrame) * 0.28)
      : 1;

  // Client video-call bubble with thumbs-up at 326f
  const clientPop =
    frame >= clientBubbleFrame
      ? spring({
          frame: frame - clientBubbleFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const thumbWave =
    frame >= clientBubbleFrame
      ? Math.sin((frame - clientBubbleFrame) * 0.25) * 8
      : 0;

  const cloudShift = (frame * 0.45) % 980;
  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill style={{ backgroundColor: "#E8F1FA", overflow: "hidden" }}>
      {/* Scene 01 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      {/* Bright Daytime Office Scene Layer (Native 9:16 1080×1920) */}
      <AbsoluteFill
        style={{
          transform: `scale(${camScale})`,
          transformOrigin: "50% 42%",
        }}
      >
        {/* Warm sunlit daytime wall */}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, #EAF3FC 0%, #DCE8F5 48%, #CFDDE8 100%)",
          }}
        />

        {/* Large Bright Office Window across upper 9:16 canvas */}
        <div
          style={{
            position: "absolute",
            left: LAYOUT.safeX,
            right: LAYOUT.safeX,
            top: 175,
            height: 410,
            borderRadius: LAYOUT.cardRadius,
            border: "10px solid #FFFFFF",
            backgroundColor: "#BCE0FD",
            boxShadow: "0 18px 44px rgba(30, 58, 95, 0.14)",
            overflow: "hidden",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 984 410" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="day-sky-v" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7CC4FA" />
                <stop offset="100%" stopColor="#D6EEFF" />
              </linearGradient>
            </defs>
            <rect width="984" height="410" fill="url(#day-sky-v)" />
            {/* Warm daytime sun */}
            <circle cx="820" cy="92" r="48" fill="#FEF08A" opacity="0.9" />
            <circle cx="820" cy="92" r="72" fill="#FEF08A" opacity="0.25" />

            {/* Soft drifting clouds */}
            <g transform={`translate(${cloudShift * 0.45 - 80}, 66)`} opacity="0.92">
              <ellipse cx="150" cy="36" rx="58" ry="22" fill="#FFFFFF" />
              <ellipse cx="186" cy="24" rx="40" ry="22" fill="#FFFFFF" />
              <ellipse cx="118" cy="28" rx="34" ry="18" fill="#FFFFFF" />
            </g>
            <g transform={`translate(${640 - cloudShift * 0.25}, 140)`} opacity="0.82">
              <ellipse cx="120" cy="30" rx="50" ry="18" fill="#FFFFFF" />
              <ellipse cx="150" cy="22" rx="32" ry="16" fill="#FFFFFF" />
            </g>

            {/* Sunlit Dhaka skyline silhouette */}
            <path
              d="M 0 410 L 0 325 L 70 325 L 70 272 L 155 272 L 155 328 L 245 328 L 245 245 L 340 245 L 340 302 L 450 302 L 450 230 L 560 230 L 560 310 L 675 310 L 675 260 L 790 260 L 790 318 L 895 318 L 895 275 L 984 275 L 984 410 Z"
              fill="#9CC3E4"
              opacity="0.65"
            />
            <path
              d="M 0 410 L 0 355 L 120 355 L 120 310 L 220 310 L 220 360 L 365 360 L 365 296 L 470 296 L 470 348 L 620 348 L 620 306 L 760 306 L 760 356 L 984 356 L 984 410 Z"
              fill="#7FAAD0"
              opacity="0.72"
            />
            {/* Clean window mullions */}
            <line x1="328" y1="0" x2="328" y2="410" stroke="#FFFFFF" strokeWidth="10" />
            <line x1="656" y1="0" x2="656" y2="410" stroke="#FFFFFF" strokeWidth="10" />
            <line x1="0" y1="265" x2="984" y2="265" stroke="#FFFFFF" strokeWidth="8" />
          </svg>
        </div>

        {/* Potted office plant on right of desk */}
        <svg
          width="115"
          height="185"
          viewBox="0 0 120 190"
          style={{ position: "absolute", right: 82, top: 705 }}
        >
          <path d="M 60 125 C 32 104 20 68 42 36 C 55 64 58 92 60 125 Z" fill="#2E9E5B" />
          <path d="M 60 125 C 88 100 100 66 78 34 C 65 62 62 92 60 125 Z" fill="#3FB950" />
          <path d="M 60 125 C 48 82 52 44 60 16 C 68 44 72 82 60 125 Z" fill="#26824B" />
          <path d="M 32 122 L 88 122 L 78 182 L 42 182 Z" fill="#C97D5D" />
          <rect x="26" y="114" width="68" height="14" rx="7" fill="#D98F70" />
        </svg>

        {/* Rafi (happy) sitting centered at his desk */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 492,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Character
            name="rafi"
            expression="happy"
            talking={false}
            size={360}
          />
        </div>

        {/* Daytime Wooden Desk Surface (lower half backdrop) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 878,
            bottom: 0,
            background: "linear-gradient(180deg, #D5A97E 0%, #B8875B 12%, #8F643F 100%)",
            borderTop: "6px solid #E8C5A0",
          }}
        />

        {/* Rafi's Open Laptop centered on Desk */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 768,
            transform: "translateX(-50%)",
            width: 340,
            height: 122,
          }}
        >
          <div
            style={{
              width: 290,
              height: 108,
              margin: "0 auto",
              borderRadius: "16px 16px 4px 4px",
              background: "linear-gradient(180deg, #2D3748 0%, #1A202C 100%)",
              border: "3px solid #4A5568",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 26px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 5,
                transform: "rotate(45deg)",
                backgroundColor: "#63B3ED",
                opacity: 0.78,
              }}
            />
          </div>
          <div
            style={{
              width: 340,
              height: 14,
              borderRadius: "4px 4px 12px 12px",
              backgroundColor: "#4A5568",
              borderTop: "2px solid #718096",
            }}
          />
        </div>

        {/* 0–108f: Top-Left "Part 2" Badge + Title Card ("রাফির গল্প — পর্ব ২") */}
        {titleOpacity > 0.01 ? (
          <div
            style={{
              position: "absolute",
              top: LAYOUT.safeTop - 10,
              left: LAYOUT.safeX,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 26px",
              borderRadius: 20,
              backgroundColor: COLORS.bg,
              border: `2px solid ${COLORS.vps}`,
              boxShadow: SHADOWS.card,
              zIndex: 40,
            }}
          >
            <span
              style={{
                padding: "5px 14px",
                borderRadius: 999,
                backgroundColor: COLORS.vps,
                color: "#0D1117",
                fontFamily: FONTS.ui,
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              Part 2
            </span>
            <span
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.text,
              }}
            >
              রাফির গল্প — পর্ব ২
            </span>
          </div>
        ) : null}

        {/* Lower Stage (y = 955..1720, strictly above bottom 160px Subtitle safe zone) */}
        <div
          style={{
            position: "absolute",
            left: LAYOUT.safeX,
            right: LAYOUT.safeX,
            top: 955,
            bottom: LAYOUT.subtitleSafeBottom + 36,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 28,
          }}
        >
          {/* Basic VPS Card + Healthy Small ServerBox */}
          {frame >= cardInFrame ? (
            <div
              style={{
                backgroundColor: COLORS.bg,
                borderRadius: LAYOUT.cardRadius,
                border: `2.5px solid ${ramGlow > 0.2 ? COLORS.vps : COLORS.border}`,
                boxShadow: ramGlow > 0.2 ? SHADOWS.glow(COLORS.vps) : SHADOWS.card,
                padding: "26px 28px",
                transform: `translateY(${cardY}px) scale(${cardScale})`,
                opacity: interpolate(cardPop, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 22,
              }}
            >
              {/* Left Info Stack */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
                {/* Header + Generic "Cheap" Tag Icon (NO prices/currency!) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <ConceptTag label="VPS" color={COLORS.vps} startFrame={cardInFrame + 6} />
                    <span
                      style={{
                        fontFamily: FONTS.ui,
                        fontSize: 34,
                        fontWeight: 800,
                        color: COLORS.text,
                      }}
                    >
                      Basic VPS
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "6px 14px",
                      borderRadius: 999,
                      backgroundColor: `${COLORS.success}22`,
                      border: `1.5px solid ${COLORS.success}`,
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path
                        d="M 3 12 L 12 3 L 21 3 L 21 12 L 12 21 Z"
                        fill="none"
                        stroke={COLORS.success}
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                      />
                      <circle cx="16.5" cy="7.5" r="2" fill={COLORS.success} />
                    </svg>
                    <span
                      style={{
                        fontFamily: FONTS.bangla,
                        fontSize: 18,
                        fontWeight: 700,
                        color: COLORS.success,
                      }}
                    >
                      কম খরচ
                    </span>
                  </div>
                </div>

                {/* Spec Pills: 1 vCPU · 1 GB RAM · 25 GB SSD */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      padding: "10px 16px",
                      borderRadius: 12,
                      backgroundColor: COLORS.panel,
                      border: `1.5px solid ${COLORS.border}`,
                      fontFamily: FONTS.code,
                      fontSize: 21,
                      fontWeight: 700,
                      color: COLORS.text,
                    }}
                  >
                    1 vCPU
                  </div>

                  {/* Highlighted 1 GB RAM in VPS orange */}
                  <div
                    style={{
                      padding: "10px 18px",
                      borderRadius: 12,
                      backgroundColor: `${COLORS.vps}26`,
                      border: `2.5px solid ${COLORS.vps}`,
                      boxShadow: ramGlow > 0.1 ? SHADOWS.glow(COLORS.vps) : "none",
                      fontFamily: FONTS.code,
                      fontSize: 23,
                      fontWeight: 800,
                      color: COLORS.vps,
                      transform: `scale(${ramPulse.toFixed(3)})`,
                    }}
                  >
                    1 GB RAM
                  </div>

                  <div
                    style={{
                      padding: "10px 16px",
                      borderRadius: 12,
                      backgroundColor: COLORS.panel,
                      border: `1.5px solid ${COLORS.border}`,
                      fontFamily: FONTS.code,
                      fontSize: 21,
                      fontWeight: 700,
                      color: COLORS.text,
                    }}
                  >
                    25 GB SSD
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: 12,
                    borderTop: `1px solid ${COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: FONTS.ui,
                    fontSize: 17,
                    color: COLORS.muted,
                  }}
                >
                  <span>Shared Cloud Instance · Starter</span>
                  <span style={{ color: COLORS.success, fontWeight: 700 }}>● Ready</span>
                </div>
              </div>

              {/* Right: Small Healthy ServerBox */}
              {frame >= serverInFrame ? (
                <div
                  style={{
                    transform: `scale(${interpolate(serverPop, [0, 1], [0.5, 1])})`,
                    opacity: interpolate(serverPop, [0, 0.3], [0, 1], {
                      extrapolateRight: "clamp",
                    }),
                    flexShrink: 0,
                  }}
                >
                  <ServerBox
                    label="client-vps"
                    subLabel="1 GB RAM"
                    size="small"
                    status="healthy"
                    scale={0.92}
                  />
                </div>
              ) : null}
            </div>
          ) : null}

          {/* 326–411f: Client Video-Call Bubble + Thumbs-Up */}
          {frame >= clientBubbleFrame ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                padding: "22px 30px",
                borderRadius: 28,
                backgroundColor: COLORS.bg,
                border: `2.5px solid ${COLORS.success}`,
                boxShadow: `${SHADOWS.glow(COLORS.success)}, ${SHADOWS.card}`,
                transform: `scale(${interpolate(clientPop, [0, 1], [0.6, 1])})`,
                opacity: interpolate(clientPop, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <div
                  style={{
                    position: "relative",
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    backgroundColor: "#1E2A3B",
                    border: `3px solid ${COLORS.success}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <svg width="86" height="86" viewBox="0 0 86 86">
                    <path d="M 14 86 C 18 62 68 62 72 86 Z" fill="#3B82F6" />
                    <circle cx="43" cy="36" r="18" fill="#E5B994" />
                    <path
                      d="M 25 34 C 25 18 61 18 61 34 C 54 24 32 24 25 34 Z"
                      fill="#1F2430"
                    />
                    <circle cx="37" cy="36" r="2.2" fill="#1F2430" />
                    <circle cx="49" cy="36" r="2.2" fill="#1F2430" />
                    <path
                      d="M 36 43 Q 43 49 50 43"
                      fill="none"
                      stroke="#1F2430"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      right: 6,
                      bottom: 6,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: COLORS.success,
                      border: `2px solid ${COLORS.bg}`,
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: FONTS.ui,
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.muted,
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                    }}
                  >
                    Client · Video Call
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.bangla,
                      fontSize: 38,
                      fontWeight: 700,
                      color: COLORS.text,
                      marginTop: 4,
                    }}
                  >
                    খরচ কম, Client খুশি
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: "50%",
                  backgroundColor: `${COLORS.success}22`,
                  border: `2.5px solid ${COLORS.success}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `rotate(${thumbWave.toFixed(1)}deg)`,
                  flexShrink: 0,
                }}
              >
                <svg width="42" height="42" viewBox="0 0 24 24">
                  <path
                    d="M 7 10 V 20 H 4 V 10 H 7 Z M 9 20 H 16.5 C 17.6 20 18.5 19.2 18.8 18.1 L 20 12.6 C 20.3 11.2 19.2 10 17.8 10 H 14 L 14.8 6.2 C 15 5.1 14.2 4 13.1 4 C 12.4 4 11.8 4.4 11.5 5 L 9 10 V 20 Z"
                    fill={COLORS.success}
                  />
                </svg>
              </div>
            </div>
          ) : null}
        </div>
      </AbsoluteFill>

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
