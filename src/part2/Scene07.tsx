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
  DEPLOY_YML_LINES,
  FONTS,
  LAYOUT,
  SHADOWS,
  SPRING_CONFIG,
} from "../theme";
import { createSceneScaler, type SceneComponentProps } from "../narration";
import { PART2_SCENES_META } from "./narration";
import { ServerBox } from "../components/ServerBox";
import { ConceptTag } from "../components/ConceptTag";
import { CodeEditor } from "../components/CodeEditor";
import { ActionsRun } from "../components/ActionsRun";
import { HtopMonitor } from "../components/HtopMonitor";
import { SceneSubtitles } from "../components/Subtitle";

const META = PART2_SCENES_META[6];
const DEPLOY_PART1_CODE = DEPLOY_YML_LINES.slice(0, 15).join("\n");

export const Scene07: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced frame anchors (from scene_07_engaging_scene_7.wav)
  const morphStart = f(18);
  const morphEnd = f(68);
  const splitStart = f(144);
  const vpsRelaxPopFrame = f(338); // "VPS-এর ওপর কোনো চাপই পড়বে না"

  const morphT = interpolate(frame, [morphStart, morphEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const splitPop =
    frame >= splitStart
      ? spring({
          frame: frame - splitStart,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  let highlightLines: number[] = [2, 3, 4];
  let highlightColor: string = COLORS.event;
  let activeConceptLabel = "Event";
  if (frame >= f(255)) {
    highlightLines = [8, 9, 10, 11, 12, 13, 14, 15];
    highlightColor = COLORS.step;
    activeConceptLabel = "Step";
  } else if (frame >= f(220)) {
    highlightLines = [7];
    highlightColor = COLORS.runner;
    activeConceptLabel = "Runner";
  } else if (frame >= f(188)) {
    highlightLines = [5, 6];
    highlightColor = COLORS.job;
    activeConceptLabel = "Job";
  }

  const vpsRelaxGlow = interpolate(
    frame,
    [vpsRelaxPopFrame, vpsRelaxPopFrame + f(18)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      {/* Scene 07 Voiceover */}
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
            "radial-gradient(ellipse at 50% 25%, rgba(57, 197, 207, 0.11) 0%, transparent 55%), radial-gradient(ellipse at 50% 78%, rgba(240, 136, 62, 0.09) 0%, transparent 55%)",
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
          gap: 22,
        }}
      >
        {/* ACT 1 (0–144f): Vertical Top-Over-Bottom Kitchen -> Runner & Table -> VPS Morph */}
        {frame < splitStart ? (
          <>
            <div
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.text,
                textAlign: "center",
              }}
            >
              আমাদের Kitchen ={" "}
              <span style={{ color: COLORS.runner }}>GitHub Actions Runner</span>
            </div>

            {/* UPPER MORPH CARD: Kitchen -> Large Cyan Runner */}
            <div
              style={{
                flex: 1,
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `2.5px solid ${COLORS.runner}`,
                boxShadow: SHADOWS.glow(COLORS.runner),
                padding: "26px 34px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <ConceptTag label="Runner" color={COLORS.runner} startFrame={f(36)} />
                <span style={{ fontFamily: FONTS.ui, fontSize: 28, fontWeight: 800, color: COLORS.text }}>
                  {morphT < 0.5 ? "Kitchen" : "GitHub Actions Runner"}
                </span>
              </div>

              <div
                style={{
                  position: "relative",
                  width: 460,
                  height: 360,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    opacity: 1 - morphT,
                    transform: `scale(${interpolate(morphT, [0, 1], [1.1, 0.55])}) rotate(${interpolate(morphT, [0, 1], [0, -14])}deg)`,
                  }}
                >
                  <svg width="260" height="240" viewBox="0 0 240 220">
                    <rect x="20" y="130" width="200" height="65" rx="14" fill="#212836" stroke={COLORS.runner} strokeWidth="3" />
                    <rect x="65" y="75" width="110" height="54" rx="12" fill="#374357" stroke="#8B949E" strokeWidth="3" />
                    <ellipse cx="120" cy="130" rx="44" ry="9" fill={COLORS.runner} />
                    <circle cx="95" cy="48" r="14" fill="#E6EDF3" opacity="0.5" />
                    <circle cx="125" cy="34" r="18" fill="#E6EDF3" opacity="0.4" />
                    <circle cx="148" cy="52" r="12" fill="#E6EDF3" opacity="0.45" />
                  </svg>
                </div>

                <div
                  style={{
                    position: "absolute",
                    opacity: morphT,
                    transform: `scale(${interpolate(morphT, [0, 1], [0.55, 1.18])})`,
                  }}
                >
                  <ServerBox
                    label="GitHub Actions Runner"
                    subLabel="ubuntu-latest · Cloud VM"
                    size="large"
                    status="healthy"
                  />
                </div>
              </div>

              <div
                style={{
                  padding: "12px 32px",
                  borderRadius: 999,
                  backgroundColor: `${COLORS.runner}22`,
                  border: `1.5px solid ${COLORS.runner}`,
                  fontFamily: FONTS.bangla,
                  fontSize: 32,
                  fontWeight: 700,
                  color: COLORS.runner,
                }}
              >
                বেশি RAM, বেশি CPU
              </div>
            </div>

            {/* LOWER MORPH CARD: Dining Table -> Small Orange VPS */}
            <div
              style={{
                flex: 1,
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `2.5px solid ${COLORS.vps}`,
                boxShadow: SHADOWS.glow(COLORS.vps),
                padding: "26px 34px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <ConceptTag label="VPS" color={COLORS.vps} startFrame={f(48)} />
                <span style={{ fontFamily: FONTS.ui, fontSize: 28, fontWeight: 800, color: COLORS.text }}>
                  {morphT < 0.5 ? "Dining Table" : "Small VPS (1 GB)"}
                </span>
              </div>

              <div
                style={{
                  position: "relative",
                  width: 460,
                  height: 340,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    opacity: 1 - morphT,
                    transform: `scale(${interpolate(morphT, [0, 1], [1.1, 0.55])}) rotate(${interpolate(morphT, [0, 1], [0, 14])}deg)`,
                  }}
                >
                  <svg width="260" height="240" viewBox="0 0 240 220">
                    <rect x="20" y="110" width="200" height="22" rx="10" fill="#A6764C" />
                    <rect x="44" y="132" width="16" height="68" rx="6" fill="#7D5635" />
                    <rect x="180" y="132" width="16" height="68" rx="6" fill="#7D5635" />
                    <ellipse cx="120" cy="106" rx="46" ry="12" fill="#E6EDF3" />
                    <ellipse cx="120" cy="102" rx="28" ry="8" fill={COLORS.success} />
                  </svg>
                </div>

                <div
                  style={{
                    position: "absolute",
                    opacity: morphT,
                    transform: `scale(${interpolate(morphT, [0, 1], [0.55, 1.24])})`,
                  }}
                >
                  <ServerBox
                    label="VPS"
                    subLabel="1 vCPU · 1 GB RAM"
                    size="small"
                    status="healthy"
                  />
                </div>
              </div>

              <div
                style={{
                  padding: "12px 32px",
                  borderRadius: 999,
                  backgroundColor: `${COLORS.vps}22`,
                  border: `1.5px solid ${COLORS.vps}`,
                  fontFamily: FONTS.bangla,
                  fontSize: 32,
                  fontWeight: 700,
                  color: COLORS.vps,
                }}
              >
                শুধু Serve করবে
              </div>
            </div>
          </>
        ) : null}

        {/* ACT 2 (144–422f): Vertical 3-Tier Stack (deploy.yml + ActionsRun + Calm VPS htop) */}
        {frame >= splitStart ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 20,
              transform: `scale(${interpolate(splitPop, [0, 1], [0.95, 1])})`,
              opacity: interpolate(splitPop, [0, 0.25], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            {/* Tier 1: deploy.yml (lines 1–15) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ConceptTag
                  label={activeConceptLabel}
                  color={highlightColor}
                  startFrame={splitStart}
                />
                <span style={{ fontFamily: FONTS.code, fontSize: 18, color: COLORS.muted }}>
                  .github/workflows/deploy.yml
                </span>
              </div>

              <CodeEditor
                filename="deploy.yml"
                code={DEPLOY_PART1_CODE}
                highlightLines={highlightLines}
                highlightColor={highlightColor}
                typingStartFrame={splitStart}
                charsPerFrame={3.8}
                fontSize={22}
                width="100%"
              />
            </div>

            {/* Tier 2: Compact ActionsRun on Runner */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    backgroundColor: COLORS.runner,
                    boxShadow: `0 0 10px ${COLORS.runner}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONTS.ui,
                    fontSize: 17,
                    fontWeight: 700,
                    color: COLORS.runner,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                  }}
                >
                  Running on GitHub Actions Runner
                </span>
              </div>

              <ActionsRun
                workflow="Build & Deploy"
                job="deploy"
                compact
                width="100%"
                steps={[
                  { name: "actions/checkout@v4", startFrame: f(198), endFrame: f(236), result: "success" },
                  { name: "actions/setup-node@v4", startFrame: f(236), endFrame: f(268), result: "success" },
                  { name: "npm ci", startFrame: f(268), endFrame: f(302), result: "success" },
                  { name: "npm run build", startFrame: f(302), endFrame: f(338), result: "success" },
                ]}
              />
            </div>

            {/* Tier 3: Calm Green VPS HtopMonitor Inset */}
            <div
              style={{
                borderRadius: LAYOUT.cardRadius,
                boxShadow: vpsRelaxGlow > 0.1 ? SHADOWS.glow(COLORS.success) : undefined,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontFamily: FONTS.code, fontSize: 17, fontWeight: 700, color: COLORS.vps }}>
                  VPS Live Status (Zero Build Load)
                </span>
                <div
                  style={{
                    padding: "6px 18px",
                    borderRadius: 999,
                    backgroundColor: `${COLORS.success}26`,
                    border: `2px solid ${COLORS.success}`,
                    fontFamily: FONTS.bangla,
                    fontSize: 22,
                    fontWeight: 700,
                    color: COLORS.success,
                  }}
                >
                  VPS: আরামে আছে 😌
                </div>
              </div>

              <HtopMonitor
                title="htop — rafi@client-vps (calm)"
                cpu={(fr) => 3.5 + Math.sin(fr * 0.12) * 0.8}
                mem={21}
                memTotal="1.0G"
                swpLabel="0K/0K"
                compact
                processes={[
                  { name: "nginx: worker", cpu: 1.4, mem: 6.2 },
                  { name: "node (site)", cpu: 2.6, mem: 14.8 },
                ]}
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
