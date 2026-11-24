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
import { RamJar } from "../components/RamJar";
import { SceneSubtitles } from "../components/Subtitle";

const META = PART2_SCENES_META[4];

export const Scene05: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced frame anchors (from scene_05_explanatory_scene_5.wav)
  const nginxDrop = f(24);
  const websiteDrop = f(56);
  const npmDrop = f(90);
  const buildDrop = f(140);
  const overflowFrame = f(196); // "RAM শেষ হলে"
  const robotEnterFrame = f(238); // "Linux-এর Out of Memory Killer"
  const stampHitFrame = f(296); // "Process-টাকেই বন্ধ করে দেয়"
  const websiteCrackFrame = f(356); // "আর একই Server-এ চলা Website-ও আটকে যায়"
  const chipsStartFrame = f(372);

  const robotX = interpolate(
    frame,
    [robotEnterFrame, robotEnterFrame + f(38)],
    [340, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const robotWalkBob =
    frame >= robotEnterFrame && frame < robotEnterFrame + f(38)
      ? Math.abs(Math.sin((frame - robotEnterFrame) * 0.45)) * -10
      : Math.sin(frame * 0.12) * 3;
  const robotOpacity = interpolate(
    frame,
    [robotEnterFrame, robotEnterFrame + f(14)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const stampSwing = interpolate(
    frame,
    [stampHitFrame - f(12), stampHitFrame, stampHitFrame + f(14)],
    [-35, 16, 4],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.6)),
    },
  );

  const stampBadgePop =
    frame >= stampHitFrame
      ? spring({
          frame: frame - stampHitFrame,
          fps,
          config: SPRING_CONFIG.slam,
        })
      : 0;

  const chip1Pop =
    frame >= chipsStartFrame
      ? spring({
          frame: frame - chipsStartFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const chip2Pop =
    frame >= chipsStartFrame + f(18)
      ? spring({
          frame: frame - (chipsStartFrame + f(18)),
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  const impactShakeX =
    frame >= stampHitFrame && frame <= stampHitFrame + 4
      ? Math.sin((frame - stampHitFrame) * 3.2) * 8
      : 0;

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      {/* Scene 05 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

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
            "radial-gradient(ellipse at 50% 42%, rgba(240, 136, 62, 0.09) 0%, transparent 55%), radial-gradient(ellipse at 50% 82%, rgba(57, 197, 207, 0.10) 0%, transparent 50%)",
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
          gap: 22,
          transform: `translateX(${impactShakeX.toFixed(1)}px)`,
        }}
      >
        {/* Top Header + Live Explanation Banner */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                backgroundColor: `${COLORS.fail}22`,
                border: `2px solid ${COLORS.fail}`,
                fontFamily: FONTS.code,
                fontSize: 20,
                fontWeight: 800,
                color: COLORS.fail,
              }}
            >
              Linux OOM Killer
            </div>
            <div
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                backgroundColor: COLORS.panel,
                border: `1.5px solid ${COLORS.vps}88`,
                fontFamily: FONTS.code,
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.vps,
              }}
            >
              VPS Limit: 1 GB RAM
            </div>
          </div>

          <div
            style={{
              fontFamily: FONTS.bangla,
              fontSize: 38,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            RAM শেষ হলে Process বন্ধ করে দেয় Linux
          </div>

          {/* Nadia Apu Explanation Card */}
          <div
            style={{
              padding: "16px 24px",
              borderRadius: 18,
              backgroundColor: COLORS.panel,
              border: `1.5px solid ${COLORS.runner}88`,
              boxShadow: SHADOWS.soft,
              fontFamily: FONTS.bangla,
              fontSize: 25,
              fontWeight: 600,
              color: COLORS.text,
              lineHeight: 1.38,
            }}
          >
            <span style={{ color: COLORS.runner, fontWeight: 700 }}>নাদিয়া আপু: </span>
            {frame < overflowFrame
              ? "1 GB RAM-এর ভেতরে Website + npm install + Build একসাথে ধরে না!"
              : frame < websiteCrackFrame
                ? "RAM উপচে পড়লেই OOM Killer ভারী Build Process-টাকে Kill করে।"
                : "ফলে একই Server-এ চলা Live Website-ও আটকে যায়!"}
          </div>
        </div>

        {/* Middle Hero Stage: 1 GB RamJar + Walking OOM Killer Robot + Floating Chips */}
        <div
          style={{
            position: "relative",
            flex: 1,
            backgroundColor: COLORS.panel,
            borderRadius: LAYOUT.cardRadius,
            border: `2px solid ${
              frame >= overflowFrame ? `${COLORS.fail}88` : COLORS.border
            }`,
            boxShadow:
              frame >= overflowFrame
                ? SHADOWS.glow(COLORS.fail)
                : SHADOWS.card,
            padding: "24px 36px 28px 36px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          {/* Floating Error Chips at Top-Right (372–458f) */}
          {frame >= chipsStartFrame ? (
            <div
              style={{
                position: "absolute",
                top: 22,
                right: 26,
                left: 26,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                gap: 12,
                zIndex: 50,
              }}
            >
              <div
                style={{
                  padding: "10px 20px",
                  borderRadius: 14,
                  backgroundColor: "#1F0D10EE",
                  border: `2px solid ${COLORS.fail}`,
                  boxShadow: SHADOWS.glow(COLORS.fail),
                  fontFamily: FONTS.code,
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#FFA198",
                  transform: `translateY(${interpolate(chip1Pop, [0, 1], [30, 0])}px) scale(${interpolate(chip1Pop, [0, 1], [0.75, 1])})`,
                  opacity: interpolate(chip1Pop, [0, 0.3], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                ✕ JavaScript heap out of memory
              </div>

              {frame >= chipsStartFrame + f(18) ? (
                <div
                  style={{
                    padding: "10px 22px",
                    borderRadius: 14,
                    backgroundColor: "#1F0D10EE",
                    border: `2px solid ${COLORS.fail}`,
                    boxShadow: SHADOWS.glow(COLORS.fail),
                    fontFamily: FONTS.code,
                    fontSize: 21,
                    fontWeight: 800,
                    color: COLORS.fail,
                    transform: `translateY(${interpolate(chip2Pop, [0, 1], [30, 0])}px) scale(${interpolate(chip2Pop, [0, 1], [0.75, 1])})`,
                    opacity: interpolate(chip2Pop, [0, 0.3], [0, 1], {
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  ✕ Killed
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Left: RamJar */}
          <div style={{ position: "relative", marginLeft: 18 }}>
            <RamJar
              capacityLabel="1 GB"
              overflowFrame={overflowFrame}
              shatterBlockIndex={3}
              shatterFrame={stampHitFrame}
              crackBlockIndex={1}
              crackFrame={websiteCrackFrame}
              width={350}
              height={430}
              blocks={[
                { label: "Nginx", height: 50, dropFrame: nginxDrop, color: "#8B949E" },
                { label: "Website", height: 86, dropFrame: websiteDrop, color: COLORS.success },
                { label: "npm install", height: 118, dropFrame: npmDrop, color: COLORS.running },
                { label: "Build", height: 148, dropFrame: buildDrop, color: COLORS.fail },
              ]}
            />

            {frame >= stampHitFrame ? (
              <div
                style={{
                  position: "absolute",
                  left: 34,
                  top: 66,
                  padding: "10px 26px",
                  borderRadius: 12,
                  backgroundColor: "rgba(31, 13, 16, 0.92)",
                  border: `4px solid ${COLORS.fail}`,
                  fontFamily: FONTS.code,
                  fontSize: 38,
                  fontWeight: 800,
                  color: COLORS.fail,
                  transform: `scale(${interpolate(stampBadgePop, [0, 1], [1.9, 1])}) rotate(-11deg)`,
                  boxShadow: SHADOWS.glow(COLORS.fail),
                  zIndex: 40,
                }}
              >
                KILLED
              </div>
            ) : null}
          </div>

          {/* Right: Friendly OOM Killer Robot walking in */}
          {frame >= robotEnterFrame ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                marginRight: 8,
                marginBottom: 14,
                opacity: robotOpacity,
                transform: `translate(${robotX.toFixed(1)}px, ${robotWalkBob.toFixed(1)}px)`,
              }}
            >
              <svg width="245" height="270" viewBox="0 0 245 270" style={{ overflow: "visible" }}>
                <ellipse cx="135" cy="256" rx="70" ry="9" fill="rgba(0,0,0,0.35)" />
                <line x1="135" y1="24" x2="135" y2="52" stroke="#8B949E" strokeWidth="5" strokeLinecap="round" />
                <circle cx="135" cy="18" r="9" fill={COLORS.fail} />
                <rect x="85" y="48" width="100" height="72" rx="22" fill="#2B3445" stroke="#4B5872" strokeWidth="3" />
                <rect x="98" y="66" width="74" height="34" rx="12" fill="#0D1117" />
                <circle cx="118" cy="83" r="7" fill={COLORS.runner} />
                <circle cx="152" cy="83" r="7" fill={COLORS.runner} />
                <path d="M 124 94 Q 135 101 146 94" stroke={COLORS.runner} strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <rect x="75" y="128" width="120" height="86" rx="20" fill="#1F2735" stroke={COLORS.fail} strokeWidth="3" />
                <rect x="92" y="146" width="86" height="44" rx="10" fill="#0D1117" />
                <text x="135" y="165" textAnchor="middle" fill={COLORS.fail} fontSize="14" fontWeight="800" fontFamily="monospace">
                  OOM
                </text>
                <text x="135" y="183" textAnchor="middle" fill="#E6EDF3" fontSize="13" fontWeight="700" fontFamily="monospace">
                  KILLER
                </text>
                <rect x="96" y="214" width="22" height="36" rx="10" fill="#374357" />
                <rect x="152" y="214" width="22" height="36" rx="10" fill="#374357" />

                {/* Swinging Stamp Arm */}
                <g transform={`translate(78, 152) rotate(${stampSwing.toFixed(1)})`}>
                  <rect x="-56" y="-10" width="60" height="20" rx="10" fill="#4B5872" />
                  <rect x="-74" y="-26" width="24" height="52" rx="8" fill="#8B949E" />
                  <rect x="-102" y="-34" width="32" height="68" rx="8" fill={COLORS.fail} />
                  <text
                    x="-86"
                    y="5"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="800"
                    fontFamily="monospace"
                    transform="rotate(-90 -86 0)"
                  >
                    KILLED
                  </text>
                </g>
              </svg>

              <div
                style={{
                  padding: "6px 16px",
                  borderRadius: 12,
                  backgroundColor: "#0D1117",
                  border: `1.5px solid ${COLORS.fail}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: FONTS.ui, fontSize: 18, fontWeight: 800, color: COLORS.text }}>
                  OOM Killer
                </div>
                <div style={{ fontFamily: FONTS.code, fontSize: 13, color: COLORS.muted }}>
                  Out of Memory Killer
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Bottom Character Row: Talking Nadia Apu + Worried Rafi */}
        <div
          style={{
            backgroundColor: COLORS.panel,
            borderRadius: LAYOUT.cardRadius,
            border: `1.5px solid ${COLORS.border}`,
            boxShadow: SHADOWS.soft,
            padding: "16px 36px 12px 36px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Character
              name="nadia"
              expression="smile"
              talking={frame >= f(8) && frame <= f(438)}
              size={270}
            />
            <div
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 23,
                fontWeight: 700,
                color: COLORS.runner,
                marginTop: -6,
              }}
            >
              নাদিয়া আপু
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <Character
              name="rafi"
              expression="worried"
              talking={false}
              size={260}
            />
            <div
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 23,
                fontWeight: 700,
                color: COLORS.muted,
                marginTop: -6,
              }}
            >
              রাফি
            </div>
          </div>
        </div>
      </div>

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
