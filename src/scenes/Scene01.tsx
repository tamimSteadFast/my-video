import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
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
import { SceneSubtitles } from "../components/Subtitle";

const META = SCENES_META[0];

// Deterministic Dhaka skyline silhouette buildings (no Math.random)
const BUILDINGS = [
  { x: 18, w: 72, h: 175 },
  { x: 96, w: 58, h: 235 },
  { x: 162, w: 84, h: 195 },
  { x: 254, w: 66, h: 278 },
  { x: 328, w: 92, h: 215 },
  { x: 428, w: 74, h: 310 }, // tall Dhaka tower
  { x: 510, w: 82, h: 225 },
  { x: 600, w: 64, h: 255 },
  { x: 672, w: 88, h: 190 },
  { x: 768, w: 72, h: 245 },
  { x: 848, w: 90, h: 180 },
];

export const Scene01: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Key voice-synced frame anchors (scaled proportionally if duration changes)
  const pushInEnd = f(64);
  const stickyPopFrame = f(148);
  const termStartFrame = f(204);
  const enterShake1Frame = f(224);
  const deployStartFrame = f(248);
  const enterShake2Frame = f(278);
  const closeLaptopStart = f(316);
  const closeLaptopEnd = f(344);
  const yawnStart = f(328);

  // 0–64: slow camera push-in (scale 1 -> 1.08)
  const cameraScale = interpolate(frame, [0, pushInEnd], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Enter-key rushed micro screen shakes
  const shake1 =
    frame >= enterShake1Frame && frame <= enterShake1Frame + 5
      ? Math.sin((frame - enterShake1Frame) * 3.1) * 5
      : 0;
  const shake2 =
    frame >= enterShake2Frame && frame <= enterShake2Frame + 5
      ? Math.sin((frame - enterShake2Frame) * 3.1) * 6
      : 0;
  const shakeX = shake1 + shake2;
  const shakeY = (shake1 + shake2) * 0.5;

  // SFX: clock tick every 30 frames (once per second)
  const clockSeconds = Math.floor(frame / 30);
  const secondAngle = clockSeconds * 6; // 6 deg per tick

  // Laptop blue glow fades out as laptop closes (316–344)
  const laptopOpenAmount = interpolate(
    frame,
    [closeLaptopStart, closeLaptopEnd],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );
  const glowFlicker =
    frame >= termStartFrame && frame < closeLaptopStart
      ? 0.92 + 0.08 * Math.sin(frame * 0.85)
      : 1;
  const laptopGlowOpacity = laptopOpenAmount * 0.55 * glowFlicker;

  // Room darkening when laptop closes
  const roomDarken = interpolate(
    frame,
    [closeLaptopStart, closeLaptopEnd + 16],
    [0, 0.56],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Sticky note pop-in ("কাল সকালে Client Demo!")
  const stickyProgress =
    frame >= stickyPopFrame
      ? spring({
          frame: frame - stickyPopFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const stickyScale = interpolate(stickyProgress, [0, 1], [0.2, 1]);
  const stickyRotate = interpolate(stickyProgress, [0, 1], [-18, -5]);

  // Terminal focus slide-up during rushed coding phase (204–316)
  const terminalPop =
    frame >= termStartFrame
      ? spring({
          frame: frame - termStartFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;
  const terminalOpacity = interpolate(
    frame,
    [termStartFrame, termStartFrame + 10, closeLaptopStart, closeLaptopEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const terminalY = interpolate(terminalPop, [0, 1], [36, 0]);

  // Squash-and-stretch yawn on Rafi during closing frames
  const yawnStretch = interpolate(
    frame,
    [yawnStart, yawnStart + 14, yawnStart + 28, yawnStart + 40],
    [1, 1.07, 0.95, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Subtitle cues scaled proportionally
  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.nightBg,
        overflow: "hidden",
      }}
    >
      {/* Scene 01 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
      {/* SFX: clock tick (every 30f), keyboard clacks (204–278f) */}

      {/* Animated Camera Layer */}
      <AbsoluteFill
        style={{
          transform: `scale(${cameraScale}) translate(${shakeX}px, ${shakeY}px)`,
          transformOrigin: "50% 44%",
        }}
      >
        {/* Night office wall subtle gradient */}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, #070B1C 0%, #0B1026 55%, #111834 100%)",
          }}
        />

        {/* Top Header Badge — 11:00 PM Dhaka */}
        <div
          style={{
            position: "absolute",
            top: LAYOUT.safeTop,
            left: LAYOUT.safeX,
            right: LAYOUT.safeX,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              backgroundColor: "rgba(22, 27, 34, 0.85)",
              border: `1.5px solid ${COLORS.border}`,
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: SHADOWS.soft,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: COLORS.running,
                boxShadow: `0 0 10px ${COLORS.running}`,
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
              রাত ১১:০০ · ঢাকা Startup Office
            </span>
          </div>

          {/* Analog Wall Clock reading 11:00 PM with ticking second hand */}
          <div
            style={{
              width: 112,
              height: 112,
              borderRadius: "50%",
              backgroundColor: "#141C3A",
              border: "4px solid #3B4770",
              boxShadow: SHADOWS.card,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="104" height="104" viewBox="0 0 104 104">
              <circle cx="52" cy="52" r="46" fill="#0F1530" />
              {/* Hour tick marks */}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 30 * Math.PI) / 180;
                const x1 = 52 + Math.sin(a) * 38;
                const y1 = 52 - Math.cos(a) * 38;
                const x2 = 52 + Math.sin(a) * 43;
                const y2 = 52 - Math.cos(a) * 43;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i === 11 || i === 0 ? COLORS.running : "#6B78A6"}
                    strokeWidth={i % 3 === 0 ? 3 : 1.8}
                    strokeLinecap="round"
                  />
                );
              })}
              {/* Hour hand pointing at 11 (330 deg) */}
              <line
                x1="52"
                y1="52"
                x2="39"
                y2="30"
                stroke="#E6EDF3"
                strokeWidth="4.2"
                strokeLinecap="round"
              />
              {/* Minute hand pointing at 12 (0 deg) */}
              <line
                x1="52"
                y1="52"
                x2="52"
                y2="18"
                stroke="#E6EDF3"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Second hand ticking every 30 frames */}
              <g transform={`rotate(${secondAngle} 52 52)`}>
                <line
                  x1="52"
                  y1="58"
                  x2="52"
                  y2="15"
                  stroke={COLORS.fail}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              <circle cx="52" cy="52" r="4" fill={COLORS.running} />
            </svg>
          </div>
        </div>

        {/* Big Office Window showing Flat Dhaka Skyline + Moon */}
        <div
          style={{
            position: "absolute",
            top: 224,
            left: 60,
            right: 60,
            height: 520,
            borderRadius: LAYOUT.cardRadius,
            border: "8px solid #1E2749",
            backgroundColor: "#0D1535",
            overflow: "hidden",
            boxShadow: "inset 0 0 60px rgba(0, 0, 0, 0.55), 0 18px 40px rgba(0,0,0,0.45)",
          }}
        >
          <svg
            viewBox="0 0 960 520"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="dhaka-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#09102A" />
                <stop offset="65%" stopColor="#13204A" />
                <stop offset="100%" stopColor="#1D2B5B" />
              </linearGradient>
              <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="960" height="520" fill="url(#dhaka-sky)" />

            {/* Deterministic Stars */}
            {Array.from({ length: 28 }).map((_, i) => {
              const sx = random(`star-x-${i}`) * 920 + 20;
              const sy = random(`star-y-${i}`) * 190 + 18;
              const r = 1.2 + random(`star-r-${i}`) * 1.8;
              const twinkle =
                0.35 +
                0.65 *
                  (0.5 +
                    0.5 *
                      Math.sin(frame * 0.08 + random(`star-p-${i}`) * Math.PI * 2));
              return (
                <circle
                  key={i}
                  cx={sx}
                  cy={sy}
                  r={r}
                  fill="#E6EDF3"
                  opacity={twinkle}
                />
              );
            })}

            {/* Moon */}
            <circle cx="790" cy="115" r="88" fill="url(#moon-glow)" />
            <circle cx="790" cy="115" r="36" fill="#FEF3C7" />
            <circle cx="804" cy="105" r="31" fill="#0F193C" />

            {/* Distant skyline silhouettes */}
            <path
              d="M0 440 L0 360 L60 360 L60 320 L130 320 L130 375 L220 375 L220 300 L290 300 L290 350 L390 350 L390 280 L470 280 L470 340 L570 340 L570 310 L650 310 L650 365 L750 365 L750 295 L840 295 L840 355 L960 355 L960 520 L0 520 Z"
              fill="#0E1736"
            />

            {/* Foreground Dhaka buildings with twinkling lit windows */}
            {BUILDINGS.map((b, bi) => {
              const topY = 520 - b.h;
              const cols = Math.max(2, Math.floor((b.w - 16) / 18));
              const rows = Math.max(3, Math.floor((b.h - 32) / 24));
              return (
                <g key={bi}>
                  <rect
                    x={b.x}
                    y={topY}
                    width={b.w}
                    height={b.h}
                    rx="4"
                    fill="#080D21"
                  />
                  {Array.from({ length: rows }).map((_, r) =>
                    Array.from({ length: cols }).map((__, c) => {
                      const seed = `win-${bi}-${r}-${c}`;
                      const isLit = random(seed) > 0.68;
                      if (!isLit) return null;
                      const flickerSeed = random(`flk-${seed}`);
                      const winOp =
                        flickerSeed > 0.72
                          ? 0.45 +
                            0.55 *
                              (0.5 + 0.5 * Math.sin(frame * 0.1 + flickerSeed * 20))
                          : 0.75;
                      return (
                        <rect
                          key={`${r}-${c}`}
                          x={b.x + 10 + c * 18}
                          y={topY + 14 + r * 24}
                          width={9}
                          height={13}
                          rx="1.5"
                          fill={flickerSeed > 0.5 ? "#FDE68A" : "#7DD3FC"}
                          opacity={winOp}
                        />
                      );
                    }),
                  )}
                </g>
              );
            })}

            {/* Window mullions */}
            <line x1="320" y1="0" x2="320" y2="520" stroke="#1E2749" strokeWidth="8" />
            <line x1="640" y1="0" x2="640" y2="520" stroke="#1E2749" strokeWidth="8" />
            <line x1="0" y1="330" x2="960" y2="330" stroke="#1E2749" strokeWidth="6" />
          </svg>
        </div>

        {/* Blue ambient laptop glow cast across Rafi & Desk */}
        <div
          style={{
            position: "absolute",
            left: 140,
            right: 140,
            top: 660,
            height: 620,
            background:
              "radial-gradient(ellipse at 50% 68%, rgba(56, 189, 248, 0.34) 0%, rgba(47, 129, 247, 0.12) 45%, transparent 75%)",
            opacity: laptopOpenAmount * glowFlicker,
            pointerEvents: "none",
          }}
        />

        {/* Rafi sitting at his desk */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 730,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Character
            name="rafi"
            expression="tired"
            talking={false}
            size={410}
            faceGlowColor="#60A5FA"
            faceGlowOpacity={laptopGlowOpacity}
            stretchY={yawnStretch}
          />
        </div>

        {/* Desk Surface + Laptop */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 1125,
            height: 620,
            background:
              "linear-gradient(180deg, #1E2538 0%, #141928 32%, #0C101C 100%)",
            borderTop: "4px solid #2D3652",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Coffee mug on left of desk */}
          <svg
            width="92"
            height="100"
            viewBox="0 0 92 100"
            style={{ position: "absolute", left: 86, top: -64 }}
          >
            <rect x="14" y="34" width="52" height="58" rx="10" fill="#30363D" />
            <path
              d="M 66 46 C 82 46 82 76 66 76"
              fill="none"
              stroke="#30363D"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <rect x="14" y="34" width="52" height="10" rx="5" fill="#484F58" />
            {/* Subtle steam wisps */}
            <path
              d={`M 30 26 Q ${26 + Math.sin(frame * 0.1) * 4} 14 32 4`}
              fill="none"
              stroke="#8B949E"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={0.45 * laptopOpenAmount}
            />
            <path
              d={`M 48 26 Q ${52 - Math.sin(frame * 0.1) * 4} 14 46 4`}
              fill="none"
              stroke="#8B949E"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={0.35 * laptopOpenAmount}
            />
          </svg>

          {/* Laptop Back Lid (closes smoothly between 316–344) */}
          <div
            style={{
              marginTop: -120,
              width: 470,
              height: 150,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {/* Laptop Lid */}
            <div
              style={{
                width: 430,
                height: Math.max(16, 132 * laptopOpenAmount),
                borderRadius: "18px 18px 4px 4px",
                background:
                  "linear-gradient(180deg, #2C354A 0%, #1F2638 100%)",
                border: "2.5px solid #475575",
                boxShadow:
                  laptopOpenAmount > 0.1
                    ? "0 -12px 45px rgba(56, 189, 248, 0.35)"
                    : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Generic subtle dev diamond icon on lid */}
              {laptopOpenAmount > 0.4 ? (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    transform: "rotate(45deg)",
                    backgroundColor: "#4F628E",
                    opacity: 0.7,
                  }}
                />
              ) : null}

              {/* Yellow Sticky Note popping on monitor corner: "কাল সকালে Client Demo!" */}
              {frame >= stickyPopFrame ? (
                <div
                  style={{
                    position: "absolute",
                    right: -130,
                    top: -72,
                    width: 240,
                    padding: "18px 20px",
                    backgroundColor: "#FACC15",
                    borderRadius: 10,
                    boxShadow: "0 14px 32px rgba(0, 0, 0, 0.55)",
                    transform: `scale(${stickyScale}) rotate(${stickyRotate}deg)`,
                    opacity: laptopOpenAmount,
                    zIndex: 30,
                  }}
                >
                  {/* Pin dot */}
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: COLORS.fail,
                      position: "absolute",
                      top: 8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.35)",
                    }}
                  />
                  <div
                    style={{
                      marginTop: 12,
                      fontFamily: FONTS.bangla,
                      fontSize: 27,
                      fontWeight: 700,
                      color: "#1F2328",
                      lineHeight: 1.25,
                      textAlign: "center",
                      letterSpacing: 0,
                    }}
                  >
                    কাল সকালে Client Demo!
                  </div>
                </div>
              ) : null}
            </div>

            {/* Laptop Base */}
            <div
              style={{
                width: 470,
                height: 16,
                borderRadius: "4px 4px 14px 14px",
                backgroundColor: "#3D4761",
                borderTop: "2px solid #607094",
              }}
            />
          </div>

          {/* Prominent Laptop Screen Terminal Overlay (204–316) */}
          {terminalOpacity > 0.01 ? (
            <div
              style={{
                marginTop: 42,
                width: 940,
                opacity: terminalOpacity,
                transform: `translateY(${terminalY}px)`,
                zIndex: 40,
              }}
            >
              <Terminal
                width="100%"
                title="rafi@dhaka-startup — production"
                fontSize={29}
                lines={[
                  {
                    text: "git push origin main",
                    startFrame: termStartFrame,
                    charsPerFrame: 1.7,
                  },
                  {
                    text: "deploying to server... ✓ done",
                    startFrame: deployStartFrame,
                    isOutput: true,
                    charsPerFrame: 1.8,
                    color: COLORS.success,
                  },
                ]}
              />
            </div>
          ) : null}
        </div>
      </AbsoluteFill>

      {/* Darkening veil when laptop closes */}
      <AbsoluteFill
        style={{
          backgroundColor: "#040610",
          opacity: roomDarken,
          pointerEvents: "none",
        }}
      />

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
