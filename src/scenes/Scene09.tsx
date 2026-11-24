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
import { ActionsRun } from "../components/ActionsRun";
import { Character } from "../components/Character";
import { SceneSubtitles } from "../components/Subtitle";

const META = SCENES_META[8];

const CONFETTI_COLORS = [
  COLORS.success,
  COLORS.runner,
  COLORS.event,
  COLORS.job,
  COLORS.step,
  "#FACC15",
] as const;

export const Scene09: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced cue anchors
  const prStartFrame = f(146); // "Pull Request-এ দেখা গেল All checks passed।"
  const confettiStart = f(168);
  const secretsStartFrame = f(256); // "নাদিয়া আপু মনে করিয়ে দিলেন..."
  const lock1ClickFrame = f(300);
  const lock2ClickFrame = f(332);
  const strikeStartFrame = f(364); // red strike-through on hardcoded API key

  // Phase 1: 2x speed ActionsRun (0..146)
  const actionsFadeOut = interpolate(
    frame,
    [prStartFrame - 8, prStartFrame + 6],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Phase 2: Pull Request Mock (146..256)
  const prSpring =
    frame >= prStartFrame
      ? spring({
          frame: frame - prStartFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;
  const prFadeOut = interpolate(
    frame,
    [secretsStartFrame - 10, secretsStartFrame + 4],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const prOpacity = prSpring * prFadeOut;

  const bannerSpring =
    frame >= prStartFrame + 14
      ? spring({
          frame: frame - (prStartFrame + 14),
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const mergeGlow =
    frame >= prStartFrame + 22
      ? 0.5 + 0.5 * Math.sin((frame - (prStartFrame + 22)) * 0.22)
      : 0;

  // Phase 3: Secrets & Variables Panel (256..459)
  const secretsSpring =
    frame >= secretsStartFrame
      ? spring({
          frame: frame - secretsStartFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  // Animated red strike-through width (0% -> 100%)
  const strikeProgress = interpolate(
    frame,
    [strikeStartFrame, strikeStartFrame + 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const badgePop =
    frame >= strikeStartFrame + 14
      ? spring({
          frame: frame - (strikeStartFrame + 14),
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  const nadiaTalking = frame >= secretsStartFrame && frame <= f(444);

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        fontFamily: FONTS.ui,
      }}
    >
      {/* Scene 09 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      {/* Bright green-tinted relief glow */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, rgba(63, 185, 80, 0.16) 0%, #0D1117 65%)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(63, 185, 80, 0.14) 1.4px, transparent 1.4px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* PHASE 1 (0–146): 2x Speed ActionsRun — All 5 Steps Green! */}
      {actionsFadeOut > 0.01 ? (
        <div
          style={{
            position: "absolute",
            top: LAYOUT.safeTop,
            left: LAYOUT.safeX,
            right: LAYOUT.safeX,
            opacity: actionsFadeOut,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            zIndex: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                backgroundColor: `${COLORS.success}22`,
                border: `1.5px solid ${COLORS.success}`,
                fontFamily: FONTS.bangla,
                fontSize: 24,
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              ✓ ভুল ঠিক করে Re-run
            </div>
            <div
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                backgroundColor: COLORS.panel,
                border: `1.5px solid ${COLORS.runner}`,
                fontFamily: FONTS.code,
                fontSize: 20,
                fontWeight: 800,
                color: COLORS.runner,
              }}
            >
              2× SPEED
            </div>
          </div>

          <ActionsRun
            workflow="CI"
            job="build"
            speed={2}
            width="100%"
            steps={[
              { name: "actions/checkout@v4", startFrame: 12, endFrame: 52, result: "success" },
              { name: "actions/setup-node@v4", startFrame: 52, endFrame: 96, result: "success" },
              { name: "npm ci", startFrame: 96, endFrame: 144, result: "success" },
              { name: "npm test", startFrame: 144, endFrame: 196, result: "success" },
              { name: "npm run build", startFrame: 196, endFrame: 244, result: "success" },
            ]}
          />

          {/* Big All-Green Badge once 5th step completes (~122 real frames) */}
          {frame >= f(118) ? (
            <div
              style={{
                alignSelf: "center",
                padding: "18px 40px",
                borderRadius: 999,
                backgroundColor: COLORS.success,
                color: "#0D1117",
                fontFamily: FONTS.bangla,
                fontSize: 38,
                fontWeight: 700,
                boxShadow: SHADOWS.glow(COLORS.success),
                transform: `scale(${spring({
                  frame: frame - f(118),
                  fps,
                  config: SPRING_CONFIG.bouncy,
                })})`,
              }}
            >
              সব Step-এ সবুজ Tick! ✓
            </div>
          ) : null}
        </div>
      ) : null}

      {/* PHASE 2 (146–256): Pull Request Page Mock + Glowing Merge Button + Confetti */}
      {prOpacity > 0.01 ? (
        <div
          style={{
            position: "absolute",
            top: 170,
            left: LAYOUT.safeX,
            right: LAYOUT.safeX,
            opacity: prOpacity,
            transform: `translateY(${interpolate(prSpring, [0, 1], [60, 0])}px)`,
            zIndex: 25,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.panel,
              borderRadius: LAYOUT.cardRadius,
              border: `2px solid ${COLORS.border}`,
              boxShadow: SHADOWS.card,
              overflow: "hidden",
            }}
          >
            {/* PR Header */}
            <div
              style={{
                padding: "28px 32px",
                borderBottom: `1px solid ${COLORS.border}`,
                backgroundColor: "#11161D",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    padding: "6px 18px",
                    borderRadius: 999,
                    backgroundColor: COLORS.success,
                    color: "#FFFFFF",
                    fontSize: 19,
                    fontWeight: 800,
                  }}
                >
                  Open
                </span>
                <span
                  style={{
                    fontFamily: FONTS.code,
                    fontSize: 22,
                    color: COLORS.muted,
                  }}
                >
                  #42 · rafi wants to merge into main
                </span>
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  marginTop: 14,
                }}
              >
                fix: homepage HeroBanner test & render
              </div>
            </div>

            {/* Sliding Green Banner: "All checks have passed" */}
            <div style={{ padding: "30px 32px", display: "flex", flexDirection: "column", gap: 28 }}>
              <div
                style={{
                  borderRadius: 20,
                  backgroundColor: `${COLORS.success}1F`,
                  border: `2.5px solid ${COLORS.success}`,
                  padding: "24px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  transform: `translateY(${interpolate(bannerSpring, [0, 1], [-40, 0])}px)`,
                  opacity: bannerSpring,
                  boxShadow: SHADOWS.glow(COLORS.success),
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    backgroundColor: COLORS.success,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 34,
                    fontWeight: 800,
                    color: "#0D1117",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 800,
                      color: "#FFFFFF",
                    }}
                  >
                    All checks have passed
                  </div>
                  <div
                    style={{
                      fontSize: 21,
                      color: COLORS.success,
                      marginTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    1 successful check · CI / build (ubuntu-latest)
                  </div>
                </div>
              </div>

              {/* Check detail row */}
              <div
                style={{
                  padding: "18px 24px",
                  borderRadius: 16,
                  backgroundColor: "#0F141B",
                  border: `1px solid ${COLORS.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: FONTS.code,
                  fontSize: 21,
                }}
              >
                <span style={{ color: COLORS.text }}>✓ CI / build — 5/5 steps passed</span>
                <span style={{ color: COLORS.success }}>Required</span>
              </div>

              {/* Glowing Green "Merge pull request" Button */}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "20px 44px",
                    borderRadius: 16,
                    backgroundColor: COLORS.success,
                    color: "#FFFFFF",
                    fontSize: 30,
                    fontWeight: 800,
                    boxShadow: `0 0 ${Math.round(24 + mergeGlow * 32)}px rgba(63, 185, 80, ${(
                      0.55 +
                      mergeGlow * 0.4
                    ).toFixed(2)})`,
                    transform: `scale(${1 + mergeGlow * 0.03})`,
                  }}
                >
                  Merge pull request
                </div>
              </div>
            </div>
          </div>

          {/* Deterministic Confetti Burst using Remotion random(seed) */}
          {frame >= confettiStart ? (
            <svg
              viewBox="0 0 984 900"
              width="984"
              height="900"
              style={{
                position: "absolute",
                top: -120,
                left: 0,
                pointerEvents: "none",
                overflow: "visible",
              }}
            >
              {Array.from({ length: 42 }).map((_, i) => {
                const elapsed = frame - confettiStart;
                const angle =
                  (random(`conf-a-${i}`) - 0.5) * Math.PI * 1.4 - Math.PI / 2;
                const speed = 10 + random(`conf-v-${i}`) * 18;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed - 6;
                const gravity = 0.52;
                const x = 492 + vx * elapsed;
                const y = 380 + vy * elapsed + 0.5 * gravity * elapsed * elapsed;
                const rot =
                  random(`conf-r0-${i}`) * 360 +
                  elapsed * (random(`conf-rs-${i}`) - 0.5) * 18;
                const w = 10 + random(`conf-w-${i}`) * 10;
                const h = 6 + random(`conf-h-${i}`) * 8;
                const color =
                  CONFETTI_COLORS[i % CONFETTI_COLORS.length];
                const op = interpolate(elapsed, [0, 5, 55, 80], [0, 1, 1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                return (
                  <rect
                    key={i}
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    rx="2"
                    fill={color}
                    opacity={op}
                    transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}
                  />
                );
              })}
            </svg>
          ) : null}
        </div>
      ) : null}

      {/* PHASE 3 (256–459): GitHub Secrets Panel + Red Strike-through Snippet + Nadia Avatar */}
      {frame >= secretsStartFrame ? (
        <div
          style={{
            position: "absolute",
            top: LAYOUT.safeTop,
            left: LAYOUT.safeX,
            right: LAYOUT.safeX,
            opacity: secretsSpring,
            transform: `translateY(${interpolate(secretsSpring, [0, 1], [50, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            zIndex: 30,
          }}
        >
          {/* Top Bar with Nadia Apu Avatar talking=true */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 22px",
                  borderRadius: 999,
                  backgroundColor: `${COLORS.event}24`,
                  border: `1.5px solid ${COLORS.event}`,
                  width: "fit-content",
                }}
              >
                <span style={{ fontSize: 20 }}>🔐</span>
                <span
                  style={{
                    fontFamily: FONTS.bangla,
                    fontSize: 23,
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  নাদিয়া আপুর নিরাপত্তা টিপস
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 38,
                  fontWeight: 800,
                  color: "#FFFFFF",
                }}
              >
                GitHub Secrets
              </div>
            </div>

            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                backgroundColor: "#14262E",
                border: `3px solid ${COLORS.runner}`,
                boxShadow: SHADOWS.glow(COLORS.runner),
                overflow: "hidden",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Character
                name="nadia"
                expression="smile"
                talking={nadiaTalking}
                size={158}
                style={{ marginBottom: -28 }}
              />
            </div>
          </div>

          {/* Settings Panel: "Secrets and variables → Actions" */}
          <div
            style={{
              backgroundColor: COLORS.panel,
              borderRadius: LAYOUT.cardRadius,
              border: `2px solid ${COLORS.border}`,
              boxShadow: SHADOWS.card,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 28px",
                backgroundColor: "#11161D",
                borderBottom: `1px solid ${COLORS.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                Secrets and variables →{" "}
                <span style={{ color: COLORS.runner }}>Actions</span>
              </div>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: COLORS.success,
                  padding: "4px 12px",
                  borderRadius: 999,
                  backgroundColor: `${COLORS.success}22`,
                }}
              >
                Encrypted
              </span>
            </div>

            <div
              style={{
                padding: "26px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <SecretRow
                name="SERVER_PASSWORD"
                lockFrame={lock1ClickFrame}
                frame={frame}
                fps={fps}
              />
              <SecretRow
                name="API_KEY"
                lockFrame={lock2ClickFrame}
                frame={frame}
                fps={fps}
              />
            </div>
          </div>

          {/* Warning Snippet Card: const apiKey = "sk-12345" with red strike-through & "Code-এ নয়!" */}
          <div
            style={{
              backgroundColor: "#1A1215",
              borderRadius: LAYOUT.cardRadius,
              border: `2.5px solid ${COLORS.fail}`,
              boxShadow: SHADOWS.glow(COLORS.fail),
              padding: "30px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 22,
            }}
          >
            <div style={{ position: "relative", display: "inline-block", padding: "6px 12px" }}>
              <div
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#FCA5A5",
                }}
              >
                <span style={{ color: COLORS.event }}>const</span>{" "}
                <span style={{ color: "#E6EDF3" }}>apiKey</span> ={" "}
                <span style={{ color: "#FFA657" }}>&quot;sk-12345&quot;</span>
              </div>

              {/* Animated Red Strike-Through Line */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  height: 7,
                  width: `${Math.round(strikeProgress * 100)}%`,
                  backgroundColor: COLORS.fail,
                  borderRadius: 4,
                  transform: "translateY(-50%) rotate(-1.2deg)",
                  boxShadow: `0 0 14px ${COLORS.fail}`,
                }}
              />
            </div>

            {badgePop > 0.01 ? (
              <div
                style={{
                  padding: "12px 34px",
                  borderRadius: 999,
                  backgroundColor: COLORS.fail,
                  color: "#FFFFFF",
                  fontFamily: FONTS.bangla,
                  fontSize: 36,
                  fontWeight: 700,
                  transform: `scale(${interpolate(badgePop, [0, 1], [0.4, 1])})`,
                  letterSpacing: 0,
                }}
              >
                ✕ Code-এ নয়!
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Bangla Subtitle Bar */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};

const SecretRow: React.FC<{
  readonly name: string;
  readonly lockFrame: number;
  readonly frame: number;
  readonly fps: number;
}> = ({ name, lockFrame, frame, fps }) => {
  const locked = frame >= lockFrame;
  const clickSpring = locked
    ? spring({
        frame: frame - lockFrame,
        fps,
        config: SPRING_CONFIG.slam,
      })
    : 0;
  // Shackle drops from open (-10px) down to locked (0px) with a crisp click
  const shackleY = interpolate(clickSpring, [0, 1], [-9, 0]);
  const rowPulse = locked
    ? 1 + Math.sin(clickSpring * Math.PI) * 0.03
    : 1;

  return (
    <div
      style={{
        padding: "22px 24px",
        borderRadius: 18,
        backgroundColor: locked ? `${COLORS.success}14` : "#0F141B",
        border: `2px solid ${locked ? `${COLORS.success}88` : COLORS.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transform: `scale(${rowPulse})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* Animated Closing Lock SVG */}
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
          <g transform={`translate(0, ${shackleY})`}>
            <path
              d="M 15 21 V 14 A 8 8 0 0 1 31 14 V 21"
              stroke={locked ? COLORS.success : COLORS.running}
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
          <rect
            x="10"
            y="20"
            width="26"
            height="20"
            rx="5"
            fill={locked ? COLORS.success : "#30363D"}
          />
          <circle cx="23" cy="30" r="3" fill="#0D1117" />
        </svg>

        <div>
          <div
            style={{
              fontFamily: FONTS.code,
              fontSize: 26,
              fontWeight: 800,
              color: "#FFFFFF",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: FONTS.code,
              fontSize: 22,
              color: COLORS.muted,
              letterSpacing: 4,
              marginTop: 4,
            }}
          >
            ••••••••
          </div>
        </div>
      </div>

      <div
        style={{
          fontFamily: FONTS.code,
          fontSize: 18,
          fontWeight: 700,
          color: locked ? COLORS.success : COLORS.running,
          padding: "6px 14px",
          borderRadius: 10,
          backgroundColor: locked ? `${COLORS.success}22` : `${COLORS.running}22`,
        }}
      >
        {locked ? "LOCKED ✓" : "SECURING..."}
      </div>
    </div>
  );
};
