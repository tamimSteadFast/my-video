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
  DEPLOY_YML_FULL,
  FONTS,
  LAYOUT,
  SHADOWS,
  SPRING_CONFIG,
} from "../theme";
import { createSceneScaler, type SceneComponentProps } from "../narration";
import { PART2_SCENES_META } from "./narration";
import { CodeEditor } from "../components/CodeEditor";
import { ServerBox } from "../components/ServerBox";
import { TransferBeam } from "../components/TransferBeam";
import { ConceptTag } from "../components/ConceptTag";
import { SceneSubtitles } from "../components/Subtitle";

const META = PART2_SCENES_META[7];

const SECRET_ROWS = [
  { name: "VPS_SSH_KEY", lockAt: 318 },
  { name: "VPS_HOST", lockAt: 346 },
  { name: "VPS_USER", lockAt: 374 },
] as const;

export const Scene08: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced frame anchors (from scene_08_educational_scene_8.wav)
  const distPopFrame = f(14);
  const distOpenFrame = f(42);
  const deployPhaseFrame = f(104); // "Deploy Step-এ"
  const beamStartFrame = f(148); // "rsync দিয়ে শুধু এই Folder পাঠানো হয় VPS-এ"
  const beamDuration = f(72);
  const arrivedFrame = beamStartFrame + beamDuration;
  const secretsPhaseFrame = f(268); // "আর Server-এ ঢোকার SSH Key..."

  const distPop =
    frame >= distPopFrame
      ? spring({
          frame: frame - distPopFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const filesPop =
    frame >= distOpenFrame
      ? spring({
          frame: frame - distOpenFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  // Smooth scroll inside CodeEditor (fontSize=15 -> ~27.4px/line) to lines 15–22
  const editorScrollY = interpolate(
    frame,
    [deployPhaseFrame + f(4), deployPhaseFrame + f(32)],
    [110, 365],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );

  const arrivedPop =
    frame >= arrivedFrame
      ? spring({
          frame: frame - arrivedFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  const secretsSlide =
    frame >= secretsPhaseFrame
      ? spring({
          frame: frame - secretsPhaseFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  const act: "dist" | "rsync" | "secrets" =
    frame < deployPhaseFrame
      ? "dist"
      : frame < secretsPhaseFrame
        ? "rsync"
        : "secrets";

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      {/* Scene 08 Voiceover */}
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
            "radial-gradient(ellipse at 50% 25%, rgba(219, 97, 162, 0.09) 0%, transparent 52%), radial-gradient(ellipse at 50% 78%, rgba(57, 197, 207, 0.09) 0%, transparent 52%)",
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
          gap: 24,
        }}
      >
        {/* ACT 1 (0–104f): Vertical Runner -> Opening dist/ Folder */}
        {act === "dist" ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {/* Top: Runner Cloud */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
              <ConceptTag label="Runner" color={COLORS.runner} startFrame={0} />
              <ServerBox
                label="GitHub Actions Runner"
                subLabel="Build Complete ✓"
                size="large"
                status="healthy"
                scale={1.26}
              />
            </div>

            {/* Downward Arrow */}
            <svg width="80" height="120" viewBox="0 0 80 120">
              <path
                d="M 40 8 L 40 100 M 22 82 L 40 104 L 58 82"
                fill="none"
                stroke={COLORS.success}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Bottom: dist/ Folder opening to reveal index.html & assets/ */}
            <div
              style={{
                width: "100%",
                padding: "36px 36px",
                borderRadius: LAYOUT.cardRadius,
                backgroundColor: COLORS.panel,
                border: `2.5px solid ${COLORS.vps}`,
                boxShadow: `${SHADOWS.glow(COLORS.vps)}, ${SHADOWS.card}`,
                transform: `scale(${interpolate(distPop, [0, 1], [0.5, 1])})`,
                opacity: interpolate(distPop, [0, 0.25], [0, 1], {
                  extrapolateRight: "clamp",
                }),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <svg width="136" height="110" viewBox="0 0 128 104">
                  <path
                    d="M 10 22 C 10 15 15 10 22 10 L 52 10 L 62 22 L 106 22 C 113 22 118 27 118 34 L 118 86 C 118 92 113 96 106 96 L 22 96 C 15 96 10 92 10 86 Z"
                    fill="#D4742E"
                  />
                  <path
                    d={`M 10 ${interpolate(filesPop, [0, 1], [34, 48])} L 118 ${interpolate(filesPop, [0, 1], [34, 48])} L 110 96 L 18 96 Z`}
                    fill={COLORS.vps}
                  />
                </svg>

                <div>
                  <div style={{ fontFamily: FONTS.code, fontSize: 54, fontWeight: 800, color: COLORS.vps }}>
                    dist/
                  </div>
                  <div style={{ fontFamily: FONTS.bangla, fontSize: 25, fontWeight: 600, color: COLORS.muted }}>
                    শুধু Final Production Files
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                  transform: `translateY(${interpolate(filesPop, [0, 1], [28, 0])}px)`,
                  opacity: filesPop,
                }}
              >
                <div
                  style={{
                    padding: "20px 22px",
                    borderRadius: 16,
                    backgroundColor: "#0D1117",
                    border: `1.5px solid ${COLORS.success}88`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 48,
                      borderRadius: 8,
                      backgroundColor: `${COLORS.success}22`,
                      border: `2px solid ${COLORS.success}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: FONTS.code,
                      fontSize: 14,
                      fontWeight: 800,
                      color: COLORS.success,
                    }}
                  >
                    &lt;/&gt;
                  </div>
                  <div>
                    <div style={{ fontFamily: FONTS.code, fontSize: 25, fontWeight: 700, color: COLORS.text }}>
                      index.html
                    </div>
                    <div style={{ fontFamily: FONTS.code, fontSize: 15, color: COLORS.muted }}>
                      minified entry
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: "20px 22px",
                    borderRadius: 16,
                    backgroundColor: "#0D1117",
                    border: `1.5px solid ${COLORS.runner}88`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 48,
                      borderRadius: 8,
                      backgroundColor: `${COLORS.runner}22`,
                      border: `2px solid ${COLORS.runner}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: FONTS.code,
                      fontSize: 14,
                      fontWeight: 800,
                      color: COLORS.runner,
                    }}
                  >
                    JS
                  </div>
                  <div>
                    <div style={{ fontFamily: FONTS.code, fontSize: 25, fontWeight: 700, color: COLORS.text }}>
                      assets/
                    </div>
                    <div style={{ fontFamily: FONTS.code, fontSize: 15, color: COLORS.muted }}>
                      bundle.js · css
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* ACT 2 (104–268f): deploy.yml Deploy Step (zero horizontal clip!) + rsync TransferBeam */}
        {act === "rsync" ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 28,
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ConceptTag label="Step" color={COLORS.step} startFrame={deployPhaseFrame} />
                <ConceptTag label="VPS" color={COLORS.vps} startFrame={deployPhaseFrame + 8} />
              </div>
              <div style={{ fontFamily: FONTS.bangla, fontSize: 38, fontWeight: 700, color: COLORS.text }}>
                Deploy Step — rsync দিয়ে শুধু dist/ পাঠানো হয়
              </div>
            </div>

            {/* Full-Width CodeEditor scrolled to lines 16–22 (fontSize=15, gutterWidth=42 -> zero clipping!) */}
            <CodeEditor
              filename="deploy.yml"
              code={DEPLOY_YML_FULL}
              highlightLines={[16, 17, 18, 19, 20, 21, 22]}
              highlightColor={COLORS.step}
              dimLines={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
              preTypedLines={22}
              typingStartFrame={0}
              fontSize={15}
              gutterWidth={42}
              width="100%"
              scrollOffsetY={editorScrollY}
              maxBodyHeight={310}
            />

            {/* Lower Transfer Arena: Runner -> TransferBeam ("rsync over SSH") -> VPS + Arrival Badge */}
            <div
              style={{
                position: "relative",
                flex: 1,
                borderRadius: LAYOUT.cardRadius,
                backgroundColor: COLORS.panel,
                border: `1.5px solid ${COLORS.border}`,
                boxShadow: SHADOWS.card,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "46px 46px 34px 46px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 54,
                }}
              >
                <ServerBox
                  label="Runner"
                  subLabel="dist/ ready"
                  size="large"
                  status="healthy"
                  scale={0.94}
                />

                <ServerBox
                  label="VPS"
                  subLabel="1 GB RAM"
                  size="small"
                  status="healthy"
                  scale={1.06}
                />
              </div>

              {/* Arrival Confirmation Pill */}
              <div
                style={{
                  minHeight: 110,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {frame >= arrivedFrame ? (
                  <div
                    style={{
                      padding: "16px 34px",
                      borderRadius: 18,
                      backgroundColor: `${COLORS.success}22`,
                      border: `2px solid ${COLORS.success}`,
                      boxShadow: SHADOWS.glow(COLORS.success),
                      transform: `scale(${interpolate(arrivedPop, [0, 1], [0.55, 1])})`,
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                    }}
                  >
                    <span style={{ fontFamily: FONTS.code, fontSize: 28, fontWeight: 800, color: COLORS.success }}>
                      ✓ /var/www/app/
                    </span>
                    <span style={{ fontFamily: FONTS.ui, fontSize: 19, color: COLORS.text }}>
                      dist/ synced cleanly
                    </span>
                  </div>
                ) : (
                  <div style={{ fontFamily: FONTS.code, fontSize: 19, color: COLORS.muted }}>
                    Syncing static files over encrypted SSH tunnel...
                  </div>
                )}
              </div>

              {/* Curved Animated TransferBeam calibrated for 984px card */}
              <TransferBeam
                from={[270, 210]}
                to={[750, 220]}
                label="rsync over SSH"
                packetLabel="dist/"
                startFrame={beamStartFrame}
                durationFrames={beamDuration}
                color={COLORS.runner}
                curveOffset={-125}
              />
            </div>
          </div>
        ) : null}

        {/* ACT 3 (268–444f): Vertical Stack: GitHub Secrets Lock Panel + Nginx Serving Globe */}
        {act === "secrets" ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 36,
            }}
          >
            {/* Upper: GitHub Settings Panel "Secrets and variables -> Actions" */}
            <div
              style={{
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `2px solid ${COLORS.event}88`,
                boxShadow: `${SHADOWS.glow(COLORS.event)}, ${SHADOWS.card}`,
                overflow: "hidden",
                transform: `translateY(${interpolate(secretsSlide, [0, 1], [-48, 0])}px)`,
                opacity: interpolate(secretsSlide, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  padding: "24px 30px",
                  backgroundColor: "#11161D",
                  borderBottom: `1px solid ${COLORS.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.ui,
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.muted,
                      textTransform: "uppercase",
                      letterSpacing: 0.7,
                    }}
                  >
                    Repository Settings
                  </div>
                  <div style={{ fontFamily: FONTS.ui, fontSize: 28, fontWeight: 800, color: COLORS.text, marginTop: 4 }}>
                    Secrets and variables → Actions
                  </div>
                </div>
                <div
                  style={{
                    padding: "6px 16px",
                    borderRadius: 999,
                    backgroundColor: `${COLORS.success}22`,
                    border: `1.5px solid ${COLORS.success}`,
                    fontFamily: FONTS.code,
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.success,
                  }}
                >
                  Encrypted
                </div>
              </div>

              <div
                style={{
                  padding: "26px 30px 30px 30px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {SECRET_ROWS.map((row) => {
                  const lockFrame = f(row.lockAt);
                  const isLocked = frame >= lockFrame;
                  const lockPop = isLocked
                    ? spring({
                        frame: frame - lockFrame,
                        fps,
                        config: SPRING_CONFIG.slam,
                      })
                    : 0;
                  const shackleY = isLocked ? interpolate(lockPop, [0, 1], [-6, 0]) : -6;

                  return (
                    <div
                      key={row.name}
                      style={{
                        padding: "20px 26px",
                        borderRadius: 16,
                        backgroundColor: "#0D1117",
                        border: `1.5px solid ${isLocked ? COLORS.success : COLORS.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                        <svg width="36" height="38" viewBox="0 0 34 36">
                          <path
                            d="M 10 16 V 11 C 10 6.5 13 4 17 4 C 21 4 24 6.5 24 11 V 16"
                            fill="none"
                            stroke={isLocked ? COLORS.success : COLORS.muted}
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            transform={`translate(0, ${shackleY.toFixed(1)})`}
                          />
                          <rect
                            x="6"
                            y="16"
                            width="22"
                            height="16"
                            rx="5"
                            fill={isLocked ? COLORS.success : "#30363D"}
                          />
                          <circle cx="17" cy="24" r="2.5" fill="#0D1117" />
                        </svg>
                        <span style={{ fontFamily: FONTS.code, fontSize: 27, fontWeight: 700, color: COLORS.text }}>
                          {row.name}
                        </span>
                      </div>

                      <div
                        style={{
                          fontFamily: FONTS.code,
                          fontSize: 26,
                          letterSpacing: 4,
                          color: isLocked ? COLORS.success : COLORS.muted,
                        }}
                      >
                        ••••••••
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lower: VPS Nginx Serving Glowing User Dots to Generic Globe */}
            <div
              style={{
                height: 490,
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `1.5px solid ${COLORS.border}`,
                boxShadow: SHADOWS.card,
                padding: "28px 34px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontFamily: FONTS.bangla, fontSize: 32, fontWeight: 700, color: COLORS.text }}>
                  VPS এখন শুধু Serve করছে
                </div>
                <div
                  style={{
                    padding: "7px 18px",
                    borderRadius: 999,
                    backgroundColor: `${COLORS.success}22`,
                    border: `1.5px solid ${COLORS.success}`,
                    fontFamily: FONTS.code,
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS.success,
                  }}
                >
                  Nginx Static Serve
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 20px",
                }}
              >
                <ServerBox
                  label="VPS · Nginx"
                  subLabel="/var/www/app/"
                  size="small"
                  status="healthy"
                  scale={1.08}
                />

                <svg width="280" height="180" viewBox="0 0 260 180" style={{ overflow: "visible" }}>
                  <path d="M 0 90 Q 130 30 250 72" fill="none" stroke={COLORS.success} strokeOpacity="0.28" strokeWidth="3" strokeDasharray="8 8" />
                  <path d="M 0 90 L 250 90" fill="none" stroke={COLORS.success} strokeOpacity="0.28" strokeWidth="3" strokeDasharray="8 8" />
                  <path d="M 0 90 Q 130 150 250 108" fill="none" stroke={COLORS.success} strokeOpacity="0.28" strokeWidth="3" strokeDasharray="8 8" />

                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const lane = i % 3;
                    const t = (frame * 0.025 + i * 0.17) % 1;
                    const x = t * 250;
                    const y =
                      lane === 0
                        ? (1 - t) * (1 - t) * 90 + 2 * (1 - t) * t * 30 + t * t * 72
                        : lane === 1
                          ? 90
                          : (1 - t) * (1 - t) * 90 + 2 * (1 - t) * t * 150 + t * t * 108;
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r={11} fill={COLORS.success} opacity={0.25} />
                        <circle cx={x} cy={y} r={5.5} fill={COLORS.success} />
                      </g>
                    );
                  })}
                </svg>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 156,
                      height: 156,
                      borderRadius: "50%",
                      backgroundColor: "#0D1117",
                      border: `3px solid ${COLORS.runner}`,
                      boxShadow: SHADOWS.glow(COLORS.runner),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="108" height="108" viewBox="0 0 104 104">
                      <circle cx="52" cy="52" r="42" fill="none" stroke={COLORS.runner} strokeWidth="3.5" />
                      <ellipse cx="52" cy="52" rx="20" ry="42" fill="none" stroke={COLORS.runner} strokeWidth="2.5" />
                      <line x1="10" y1="52" x2="94" y2="52" stroke={COLORS.runner} strokeWidth="2.5" />
                      <line x1="16" y1="32" x2="88" y2="32" stroke={COLORS.runner} strokeWidth="2" opacity="0.7" />
                      <line x1="16" y1="72" x2="88" y2="72" stroke={COLORS.runner} strokeWidth="2" opacity="0.7" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: FONTS.ui, fontSize: 20, fontWeight: 700, color: COLORS.text }}>
                    Users Worldwide
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
