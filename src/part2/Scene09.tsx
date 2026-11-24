import React from "react";
import {
  AbsoluteFill,
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
import { Terminal } from "../components/Terminal";
import { ActionsRun } from "../components/ActionsRun";
import { BrowserWindow } from "../components/BrowserWindow";
import { HtopMonitor } from "../components/HtopMonitor";
import { SceneSubtitles } from "../components/Subtitle";

const META = PART2_SCENES_META[8];

export const Scene09: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced frame anchors (from scene_09_relieved_scene_9.wav)
  const livePhaseFrame = f(128);
  const uptimeChipFrame = f(210);
  const failSafetyFrame = f(272);
  const buildFailFrame = f(296);
  const shieldBlockFrame = f(322);
  const oldSiteLabelFrame = f(356);

  const livePop =
    frame >= livePhaseFrame
      ? spring({
          frame: frame - livePhaseFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  const uptimePop =
    frame >= uptimeChipFrame
      ? spring({
          frame: frame - uptimeChipFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  const shieldPop =
    frame >= shieldBlockFrame
      ? spring({
          frame: frame - shieldBlockFrame,
          fps,
          config: SPRING_CONFIG.slam,
        })
      : 0;

  const oldSitePop =
    frame >= oldSiteLabelFrame
      ? spring({
          frame: frame - oldSiteLabelFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  const dotPulse = 0.55 + 0.45 * Math.sin(frame * 0.24);

  const act: "push" | "live" | "safety" =
    frame < livePhaseFrame
      ? "push"
      : frame < failSafetyFrame
        ? "live"
        : "safety";

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      {/* Scene 09 Voiceover */}
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
            act === "safety"
              ? "radial-gradient(ellipse at 50% 24%, rgba(248, 81, 73, 0.10) 0%, transparent 50%), radial-gradient(ellipse at 50% 78%, rgba(63, 185, 80, 0.11) 0%, transparent 55%)"
              : "radial-gradient(ellipse at 50% 42%, rgba(63, 185, 80, 0.12) 0%, transparent 60%)",
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
        {/* ACT 1 (0–128f): Happy Rafi + git push Terminal + 2x ActionsRun */}
        {act === "push" ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "16px 28px",
                borderRadius: LAYOUT.cardRadius,
                backgroundColor: COLORS.panel,
                border: `2px solid ${COLORS.success}88`,
                boxShadow: SHADOWS.soft,
              }}
            >
              <Character
                name="rafi"
                expression="happy"
                talking={false}
                size={210}
              />
              <div>
                <div
                  style={{
                    fontFamily: FONTS.ui,
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.success,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  Automated CI/CD Deploy
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
                  শুধু git push — বাকিটা Actions করবে!
                </div>
              </div>
            </div>

            <Terminal
              title="rafi@laptop — my-client-app"
              width="100%"
              fontSize={28}
              lines={[
                { text: "git push origin main", startFrame: f(6), typeSpeed: 1.5 },
                {
                  text: "✓ Workflow triggered: Build & Deploy",
                  startFrame: f(32),
                  isOutput: true,
                  color: COLORS.success,
                  typeSpeed: 2.2,
                },
              ]}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: FONTS.ui,
                    fontSize: 19,
                    fontWeight: 700,
                    color: COLORS.runner,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                  }}
                >
                  GitHub Actions · Live Run
                </span>
                <span
                  style={{
                    padding: "4px 14px",
                    borderRadius: 999,
                    backgroundColor: `${COLORS.runner}22`,
                    border: `1px solid ${COLORS.runner}`,
                    fontFamily: FONTS.code,
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.runner,
                  }}
                >
                  2× Fast Preview
                </span>
              </div>

              <ActionsRun
                workflow="Build & Deploy"
                job="deploy"
                speed={2}
                compact
                width="100%"
                steps={[
                  { name: "actions/checkout@v4", startFrame: f(44), endFrame: f(76), result: "success" },
                  { name: "actions/setup-node@v4", startFrame: f(76), endFrame: f(108), result: "success" },
                  { name: "npm ci", startFrame: f(108), endFrame: f(142), result: "success" },
                  { name: "npm run build", startFrame: f(142), endFrame: f(178), result: "success" },
                  { name: "Deploy to VPS (rsync)", startFrame: f(178), endFrame: f(208), result: "success" },
                ]}
              />
            </div>
          </div>
        ) : null}

        {/* ACT 2 (128–272f): Vertical Stack: BrowserWindow v2.0 + Uptime Chip + Calm Green HtopMonitor */}
        {act === "live" ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 32,
              transform: `scale(${interpolate(livePop, [0, 1], [0.94, 1])})`,
            }}
          >
            <BrowserWindow
              url="client-website.com"
              state="newVersion"
              stateChangeFrame={livePhaseFrame + f(6)}
              width="100%"
              height={540}
            />

            {/* Pulsing "Uptime ✓ Website Online" Chip */}
            <div
              style={{
                alignSelf: "center",
                padding: "16px 34px",
                borderRadius: 999,
                backgroundColor: `${COLORS.success}22`,
                border: `2.5px solid ${COLORS.success}`,
                boxShadow: SHADOWS.glow(COLORS.success),
                display: "flex",
                alignItems: "center",
                gap: 16,
                transform: `scale(${
                  frame >= uptimeChipFrame
                    ? interpolate(uptimePop, [0, 1], [0.85, 1.04])
                    : 1
                })`,
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: COLORS.success,
                  boxShadow: `0 0 ${Math.round(10 + dotPulse * 14)}px ${COLORS.success}`,
                  opacity: 0.65 + dotPulse * 0.35,
                }}
              />
              <span style={{ fontFamily: FONTS.ui, fontSize: 30, fontWeight: 800, color: COLORS.text }}>
                Uptime ✓ Website Online
              </span>
            </div>

            <HtopMonitor
              title="htop — rafi@client-vps (calm & steady)"
              cpu={(fr) => 3 + Math.sin(fr * 0.14) * 0.5}
              mem={22}
              memTotal="1.0G"
              swpLabel="0K/0K"
              compact
              processes={[
                { name: "nginx: worker", cpu: 1.2, mem: 6.4 },
                { name: "node (site)", cpu: 1.8, mem: 15.6 },
              ]}
            />

            <div
              style={{
                padding: "18px 28px",
                borderRadius: 18,
                backgroundColor: COLORS.panel,
                border: `1.5px solid ${COLORS.success}66`,
                fontFamily: FONTS.bangla,
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.success,
                textAlign: "center",
              }}
            >
              ✓ RAM 22% · CPU 3% — Zero Downtime Deploy!
            </div>
          </div>
        ) : null}

        {/* ACT 3 (272–420f): Vertical Top-to-Bottom "What if build fails?" Safety Net */}
        {act === "safety" ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 18,
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: FONTS.bangla, fontSize: 38, fontWeight: 700, color: COLORS.text }}>
                আর যদি <span style={{ color: COLORS.fail }}>Build Fail</span> করে?
              </div>
              <div
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  backgroundColor: `${COLORS.success}22`,
                  border: `1.5px solid ${COLORS.success}`,
                  fontFamily: FONTS.ui,
                  fontSize: 18,
                  fontWeight: 800,
                  color: COLORS.success,
                }}
              >
                Built-in Safety Net
              </div>
            </div>

            {/* Top: Failed ActionsRun (npm run build red X, Deploy skipped) */}
            <ActionsRun
              workflow="Build & Deploy"
              job="deploy"
              compact
              width="100%"
              steps={[
                { name: "actions/checkout@v4", startFrame: f(260), endFrame: f(274), result: "success" },
                { name: "npm ci", startFrame: f(274), endFrame: f(284), result: "success" },
                { name: "npm run build", startFrame: f(284), endFrame: buildFailFrame, result: "fail" },
                { name: "Deploy to VPS", startFrame: buildFailFrame, endFrame: f(340), result: "skipped" },
              ]}
            />

            {/* Middle: Downward Dashed Arrow Blocked by Slamming Shield */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
                height: 175,
              }}
            >
              <svg width="160" height="170" viewBox="0 0 160 170">
                <line
                  x1="80"
                  y1="6"
                  x2="80"
                  y2="154"
                  stroke={COLORS.fail}
                  strokeWidth="5"
                  strokeDasharray="10 10"
                  opacity="0.65"
                />
                <path
                  d="M 65 138 L 80 158 L 95 138"
                  fill="none"
                  stroke={COLORS.fail}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.65"
                />

                {frame >= shieldBlockFrame ? (
                  <g
                    transform={`translate(80, 82) scale(${interpolate(shieldPop, [0, 1], [1.85, 1]).toFixed(3)})`}
                  >
                    <path
                      d="M 0 -56 L 46 -38 V 4 C 46 34 26 52 0 64 C -26 52 -46 34 -46 4 V -38 Z"
                      fill="#141E2E"
                      stroke={COLORS.success}
                      strokeWidth="5"
                    />
                    <path
                      d="M -16 -14 L 16 18 M 16 -14 L -16 18"
                      stroke={COLORS.fail}
                      strokeWidth="7"
                      strokeLinecap="round"
                    />
                  </g>
                ) : null}
              </svg>

              {frame >= shieldBlockFrame ? (
                <div
                  style={{
                    padding: "10px 24px",
                    borderRadius: 999,
                    backgroundColor: `${COLORS.fail}26`,
                    border: `2px solid ${COLORS.fail}`,
                    fontFamily: FONTS.code,
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#FFA198",
                  }}
                >
                  Deploy Blocked
                </div>
              ) : null}
            </div>

            {/* Bottom: VPS Browser still serving old version safely */}
            <BrowserWindow
              url="client-website.com"
              state="ok"
              width="100%"
              height={405}
            />

            <div style={{ minHeight: 74, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {frame >= oldSiteLabelFrame ? (
                <div
                  style={{
                    padding: "14px 36px",
                    borderRadius: 999,
                    backgroundColor: `${COLORS.success}24`,
                    border: `2.5px solid ${COLORS.success}`,
                    boxShadow: SHADOWS.glow(COLORS.success),
                    fontFamily: FONTS.bangla,
                    fontSize: 34,
                    fontWeight: 700,
                    color: COLORS.success,
                    transform: `scale(${interpolate(oldSitePop, [0, 1], [0.6, 1])})`,
                  }}
                >
                  পুরনো Version চলতেই থাকে ✓
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
