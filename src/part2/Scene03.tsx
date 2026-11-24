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
import { BrowserWindow } from "../components/BrowserWindow";
import { ServerBox } from "../components/ServerBox";
import { SceneSubtitles } from "../components/Subtitle";

const META = PART2_SCENES_META[2];

const FILE_TREE = [
  "src/",
  "  ├─ components/ (42 files)",
  "  ├─ pages/ (18 routes)",
  "  ├─ assets/ (images, fonts)",
  "  ├─ hooks/ (14 hooks)",
  "  ├─ store/ (slices)",
  "  ├─ charts/ (analytics)",
  "  └─ utils/ (helpers)",
] as const;

const PKG_DEPS = [
  '"react": "^19.0.0"',
  '"react-dom": "^19.0.0"',
  '"react-router-dom": "^7.1.0"',
  '"@tanstack/react-query": "^5.6"',
  '"recharts": "^2.15.0"',
  '"framer-motion": "^12.0.0"',
  '"lucide-react": "^0.468.0"',
  '"axios": "^1.7.9"',
  '"zod": "^3.24.0"',
  '"date-fns": "^4.1.0"',
  '"lodash-es": "^4.17.21"',
  '"tailwindcss": "^4.0.0"',
  '"@vitejs/plugin-react": "^4.3"',
  '"typescript": "^5.7.0"',
  '"vite": "^6.1.0"',
] as const;

export const Scene03: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced frame anchors (from scene_03_tense_scene_3.wav)
  const montageEnd = f(84);
  const buildCmdFrame = f(88);
  const out1Frame = f(106);
  const out2Frame = f(126);
  const out3Frame = f(152);
  const out4Frame = f(184);
  const freezeFrame = f(215);
  const killedFrame = f(288); // exact vocal hit: "Killed!"
  const cutTo502Frame = f(322);
  const switch502Frame = f(344);

  // Act 1: Project growing montage (0–84f)
  const visibleTreeCount = Math.min(
    FILE_TREE.length,
    Math.floor(
      interpolate(frame, [4, f(72)], [1, FILE_TREE.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
  const balloonScale = interpolate(frame, [6, f(78)], [0.7, 1.24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const nodeModulesMb = Math.round(
    interpolate(frame, [6, f(78)], [92, 540], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const pkgScrollY = interpolate(frame, [4, f(80)], [0, 310], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Act 2: 4-frame violent camera shake on "Killed" slam (288–292f)
  const isShaking = frame >= killedFrame && frame <= killedFrame + 4;
  const shakeX = isShaking ? Math.sin((frame - killedFrame) * 2.8) * 18 : 0;
  const shakeY = isShaking ? Math.cos((frame - killedFrame) * 3.5) * 12 : 0;

  const killedPop =
    frame >= killedFrame
      ? spring({
          frame: frame - killedFrame,
          fps,
          config: SPRING_CONFIG.slam,
        })
      : 0;
  const killedScale = interpolate(killedPop, [0, 1], [2.2, 1]);

  const redVignetteOpacity =
    frame >= killedFrame && frame < cutTo502Frame
      ? interpolate(frame, [killedFrame, killedFrame + 6], [0, 0.85], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : frame >= switch502Frame
        ? 0.42
        : 0;

  const outagePop =
    frame >= cutTo502Frame
      ? spring({
          frame: frame - cutTo502Frame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  const subtitles = scale.subtitles(META.subtitles);

  const act: "montage" | "terminal" | "outage" =
    frame < montageEnd
      ? "montage"
      : frame < cutTo502Frame
        ? "terminal"
        : "outage";

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      {/* Scene 03 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
      {/* SFX cue: ticking clock 195–288f while terminal hangs (music ducks to 0 at 195f) */}
      {/* SFX cue: heavy impact thud at 288f on "Killed" slam */}

      <AbsoluteFill
        style={{
          transform: `translate(${shakeX.toFixed(1)}px, ${shakeY.toFixed(1)}px)`,
        }}
      >
        <AbsoluteFill
          style={{
            backgroundImage:
              "radial-gradient(rgba(139, 148, 158, 0.14) 1.5px, transparent 1.5px)",
            backgroundSize: "34px 34px",
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
            gap: 26,
          }}
        >
          {/* ACT 1 (0–84f): Vertical 3-Tier Project Growing Montage */}
          {act === "montage" ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.bangla,
                    fontSize: 40,
                    fontWeight: 700,
                    color: COLORS.text,
                  }}
                >
                  Project দ্রুত বড় হতে থাকল...
                </div>
                <div
                  style={{
                    padding: "8px 18px",
                    borderRadius: 999,
                    backgroundColor: `${COLORS.running}22`,
                    border: `1.5px solid ${COLORS.running}`,
                    fontFamily: FONTS.code,
                    fontSize: 17,
                    fontWeight: 700,
                    color: COLORS.running,
                    flexShrink: 0,
                  }}
                >
                  Growing ↑
                </div>
              </div>

              {/* Tier 1: Growing File Tree */}
              <div
                style={{
                  backgroundColor: COLORS.panel,
                  borderRadius: LAYOUT.cardRadius,
                  border: `1.5px solid ${COLORS.border}`,
                  boxShadow: SHADOWS.card,
                  padding: "24px 28px",
                  height: 430,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.ui,
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.muted,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    paddingBottom: 10,
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  Explorer · Project Tree
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    fontFamily: FONTS.code,
                    fontSize: 23,
                  }}
                >
                  {FILE_TREE.slice(0, visibleTreeCount).map((row, idx) => (
                    <div
                      key={row}
                      style={{
                        color: idx === 0 ? COLORS.runner : COLORS.text,
                        fontWeight: idx === 0 ? 700 : 500,
                        whiteSpace: "pre",
                      }}
                    >
                      {row}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 2: Inflating node_modules Balloon */}
              <div
                style={{
                  backgroundColor: COLORS.panel,
                  borderRadius: LAYOUT.cardRadius,
                  border: `2px solid ${COLORS.vps}88`,
                  boxShadow: SHADOWS.card,
                  height: 440,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 26,
                    fontFamily: FONTS.ui,
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.muted,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  Disk & Memory Load
                </div>
                <div
                  style={{
                    width: 300,
                    height: 235,
                    borderRadius: "46% 46% 42% 42%",
                    background: `radial-gradient(circle at 35% 30%, #FFAD66 0%, ${COLORS.vps} 55%, #C85A17 100%)`,
                    boxShadow: SHADOWS.glow(COLORS.vps),
                    transform: `scale(${balloonScale.toFixed(3)})`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.code,
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#0D1117",
                    }}
                  >
                    node_modules
                  </div>
                  <div
                    style={{
                      padding: "5px 16px",
                      borderRadius: 999,
                      backgroundColor: "rgba(13,17,23,0.84)",
                      fontFamily: FONTS.code,
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                  >
                    {nodeModulesMb} MB ↑
                  </div>
                </div>
              </div>

              {/* Tier 3: Scrolling package.json */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: COLORS.panel,
                  borderRadius: LAYOUT.cardRadius,
                  border: `1.5px solid ${COLORS.border}`,
                  boxShadow: SHADOWS.card,
                  padding: "22px 28px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.code,
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS.running,
                    paddingBottom: 10,
                    borderBottom: `1px solid ${COLORS.border}`,
                    marginBottom: 12,
                  }}
                >
                  package.json · dependencies
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div
                    style={{
                      transform: `translateY(${-pkgScrollY}px)`,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      fontFamily: FONTS.code,
                      fontSize: 22,
                    }}
                  >
                    {PKG_DEPS.map((dep) => (
                      <div key={dep} style={{ color: "#A5D6FF" }}>
                        {dep},
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {/* ACT 2 (84–322f): Slowing Build Terminal -> Freeze -> "Killed" Slam */}
          {act === "terminal" ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 40,
              }}
            >
              <div style={{ position: "relative" }}>
                <Terminal
                  title="rafi@client-vps — /var/www/app"
                  prompt="rafi@vps:~$ "
                  width="100%"
                  fontSize={29}
                  frozen={frame >= freezeFrame && frame < killedFrame}
                  frozenStartFrame={freezeFrame}
                  frozenLabel="terminal frozen..."
                  style={{ minHeight: 620 }}
                  lines={[
                    { text: "npm run build", startFrame: buildCmdFrame, typeSpeed: 1.8 },
                    {
                      text: "vite building for production...",
                      startFrame: out1Frame,
                      isOutput: true,
                      color: COLORS.runner,
                      typeSpeed: 2.2,
                    },
                    {
                      text: "transforming (412) modules...",
                      startFrame: out2Frame,
                      isOutput: true,
                      color: COLORS.muted,
                      typeSpeed: 1.8,
                    },
                    {
                      text: "transforming (987) modules...",
                      startFrame: out3Frame,
                      isOutput: true,
                      color: COLORS.running,
                      typeSpeed: 1.2,
                    },
                    {
                      text: "transforming (1243) modules...",
                      startFrame: out4Frame,
                      isOutput: true,
                      color: COLORS.vps,
                      typeSpeed: 0.75,
                    },
                  ]}
                />

                {/* BIG RED "Killed" SLAM at frame 288 */}
                {frame >= killedFrame ? (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(13, 17, 23, 0.74)",
                      borderRadius: LAYOUT.cardRadius,
                    }}
                  >
                    <div
                      style={{
                        padding: "28px 64px",
                        borderRadius: 24,
                        backgroundColor: "#1F0D10",
                        border: `5px solid ${COLORS.fail}`,
                        boxShadow: `0 0 65px rgba(248, 81, 73, 0.72), ${SHADOWS.card}`,
                        transform: `scale(${killedScale}) rotate(-3deg)`,
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: FONTS.code,
                          fontSize: 102,
                          fontWeight: 800,
                          color: COLORS.fail,
                          letterSpacing: 2,
                          lineHeight: 1.05,
                        }}
                      >
                        Killed
                      </div>
                      <div
                        style={{
                          fontFamily: FONTS.code,
                          fontSize: 22,
                          color: "#FFA198",
                          marginTop: 10,
                        }}
                      >
                        exit code 137 · SIGKILL (Out of Memory)
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Lower Card: Stressed -> Down ServerBox */}
              <div
                style={{
                  height: 520,
                  borderRadius: LAYOUT.cardRadius,
                  backgroundColor: COLORS.panel,
                  border: `2px solid ${
                    frame >= killedFrame
                      ? COLORS.fail
                      : frame >= out2Frame
                        ? COLORS.vps
                        : COLORS.border
                  }`,
                  boxShadow:
                    frame >= killedFrame
                      ? SHADOWS.glow(COLORS.fail)
                      : SHADOWS.soft,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 24,
                }}
              >
                <ServerBox
                  label="client-vps"
                  subLabel={
                    frame >= killedFrame
                      ? "Process Killed!"
                      : frame >= freezeFrame
                        ? "RAM Exhausted..."
                        : "Heavy Build Load"
                  }
                  size="small"
                  status={
                    frame >= killedFrame
                      ? "down"
                      : frame >= out2Frame
                        ? "stressed"
                        : "healthy"
                  }
                  scale={1.45}
                />
              </div>
            </div>
          ) : null}

          {/* ACT 3 (322–429f): BrowserWindow -> 502 Bad Gateway + Down Smoking ServerBox */}
          {act === "outage" ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 42,
                transform: `scale(${interpolate(outagePop, [0, 1], [0.92, 1])})`,
              }}
            >
              <BrowserWindow
                url="client-website.com"
                state={frame >= switch502Frame ? "error502" : "loading"}
                width="100%"
                height={660}
              />

              <div
                style={{
                  height: 560,
                  borderRadius: LAYOUT.cardRadius,
                  backgroundColor: COLORS.panel,
                  border: `2.5px solid ${COLORS.fail}88`,
                  boxShadow: SHADOWS.glow(COLORS.fail),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 36,
                  padding: 30,
                }}
              >
                <ServerBox
                  label="client-vps"
                  subLabel="Server Down"
                  size="small"
                  status="down"
                  scale={1.5}
                />
                <div
                  style={{
                    padding: "12px 32px",
                    borderRadius: 999,
                    backgroundColor: `${COLORS.fail}24`,
                    border: `2px solid ${COLORS.fail}`,
                    fontFamily: FONTS.bangla,
                    fontSize: 34,
                    fontWeight: 700,
                    color: "#FFA198",
                  }}
                >
                  Live Website বন্ধ!
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </AbsoluteFill>

      {/* Red Vignette on "Killed" & Outage */}
      {redVignetteOpacity > 0.01 ? (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 48%, rgba(248, 81, 73, 0.44) 100%)",
            opacity: redVignetteOpacity,
            pointerEvents: "none",
          }}
        />
      ) : null}

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
