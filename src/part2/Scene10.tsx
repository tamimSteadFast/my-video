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
import { ServerBox } from "../components/ServerBox";
import { ConceptTag } from "../components/ConceptTag";
import { SceneSubtitles } from "../components/Subtitle";

const META = PART2_SCENES_META[9];

interface QuoteWord {
  readonly text: string;
  readonly revealAt: number;
  readonly color?: string;
}

const QUOTE_WORDS: readonly QuoteWord[] = [
  { text: "“Server-এর", revealAt: 102 },
  { text: "কাজ", revealAt: 116 },
  { text: "Serve", revealAt: 130, color: COLORS.success },
  { text: "করা,", revealAt: 146 },
  { text: "Build", revealAt: 168, color: COLORS.runner },
  { text: "করা", revealAt: 180 },
  { text: "নয়।”", revealAt: 190 },
];

export const Scene10: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced frame anchors (from scene_10_inspirational_scene_10.wav)
  const quoteStartFrame = f(98);
  const endCardStartFrame = f(216);
  const ctaStartFrame = f(312);

  const officeIn = spring({
    frame,
    fps,
    config: SPRING_CONFIG.smooth,
  });

  const quotePop =
    frame >= quoteStartFrame
      ? spring({
          frame: frame - quoteStartFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  const endCardOpacity = interpolate(
    frame,
    [endCardStartFrame, endCardStartFrame + f(16)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const questionPop =
    frame >= endCardStartFrame + f(4)
      ? spring({
          frame: frame - (endCardStartFrame + f(4)),
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;
  const ctaPop =
    frame >= ctaStartFrame
      ? spring({
          frame: frame - ctaStartFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill style={{ backgroundColor: "#1A1418", overflow: "hidden" }}>
      {/* Scene 10 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
      {/* Music fades out smoothly over final 60 frames in VPSBuildStory.tsx */}

      {/* ACT 1 & 2 (0–216f): Calm Evening Office + Warm Amber Light */}
      {endCardOpacity < 0.99 ? (
        <AbsoluteFill>
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(180deg, #1E1726 0%, #2C1E22 48%, #1C1618 100%)",
            }}
          />

          {/* Evening Sunset Window across Upper 9:16 Canvas */}
          <div
            style={{
              position: "absolute",
              left: LAYOUT.safeX,
              right: LAYOUT.safeX,
              top: 130,
              height: 560,
              borderRadius: LAYOUT.cardRadius,
              border: "8px solid #3B2B30",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(242, 153, 74, 0.18)",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 984 560" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="sunset-sky-v" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A1D3D" />
                  <stop offset="48%" stopColor="#8A3E47" />
                  <stop offset="82%" stopColor="#E68A4C" />
                  <stop offset="100%" stopColor="#F6C177" />
                </linearGradient>
              </defs>
              <rect width="984" height="560" fill="url(#sunset-sky-v)" />
              <circle cx="492" cy="390" r="145" fill="#FDE68A" opacity="0.28" />
              <circle cx="492" cy="390" r="88" fill="#FDE68A" opacity="0.68" />
              <path
                d="M 0 560 L 0 430 L 82 430 L 82 360 L 164 360 L 164 440 L 258 440 L 258 320 L 340 320 L 340 405 L 435 405 L 435 345 L 540 345 L 540 420 L 640 420 L 640 315 L 745 315 L 745 398 L 850 398 L 850 350 L 940 350 L 940 435 L 984 435 L 984 560 Z"
                fill="#1B1324"
              />
              <line x1="328" y1="0" x2="328" y2="560" stroke="#3B2B30" strokeWidth="10" />
              <line x1="656" y1="0" x2="656" y2="560" stroke="#3B2B30" strokeWidth="10" />
            </svg>
          </div>

          <AbsoluteFill
            style={{
              background:
                "radial-gradient(ellipse at 50% 48%, rgba(242, 153, 74, 0.22) 0%, transparent 62%)",
              pointerEvents: "none",
            }}
          />

          {/* Rafi + Happy Small VPS ServerBox + Nadia Apu */}
          <div
            style={{
              position: "absolute",
              left: LAYOUT.safeX,
              right: LAYOUT.safeX,
              bottom: LAYOUT.subtitleSafeBottom + 230,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-around",
              transform: `translateY(${interpolate(officeIn, [0, 1], [34, 0])}px)`,
              opacity:
                frame >= quoteStartFrame
                  ? interpolate(
                      frame,
                      [quoteStartFrame, quoteStartFrame + f(14)],
                      [1, 0.22],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                    )
                  : officeIn,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Character name="rafi" expression="smile" talking={false} size={310} />
              <div style={{ fontFamily: FONTS.bangla, fontSize: 27, fontWeight: 700, color: COLORS.text, marginTop: -6 }}>
                রাফি
              </div>
            </div>

            <div style={{ marginBottom: 42 }}>
              <ServerBox
                label="client-vps"
                subLabel="Healthy ✓"
                size="small"
                status="healthy"
                scale={1.06}
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <Character name="nadia" expression="smile" talking={false} size={310} />
              <div style={{ fontFamily: FONTS.bangla, fontSize: 27, fontWeight: 700, color: COLORS.runner, marginTop: -6 }}>
                নাদিয়া আপু
              </div>
            </div>
          </div>

          {/* ACT 2 (98–216f): Centered Quote Card with Word-by-Word Reveal */}
          {frame >= quoteStartFrame ? (
            <div
              style={{
                position: "absolute",
                left: LAYOUT.safeX,
                right: LAYOUT.safeX,
                top: LAYOUT.safeTop + 140,
                bottom: LAYOUT.subtitleSafeBottom + 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  padding: "56px 46px",
                  borderRadius: 34,
                  backgroundColor: "rgba(13, 17, 23, 0.95)",
                  border: `2.5px solid ${COLORS.runner}`,
                  boxShadow: `${SHADOWS.glow(COLORS.runner)}, ${SHADOWS.card}`,
                  transform: `scale(${interpolate(quotePop, [0, 1], [0.76, 1])})`,
                  opacity: interpolate(quotePop, [0, 0.3], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 32,
                }}
              >
                <div
                  style={{
                    padding: "8px 24px",
                    borderRadius: 999,
                    backgroundColor: `${COLORS.vps}22`,
                    border: `1.5px solid ${COLORS.vps}`,
                    fontFamily: FONTS.bangla,
                    fontSize: 25,
                    fontWeight: 700,
                    color: COLORS.vps,
                  }}
                >
                  মূল শিক্ষা
                </div>

                {/* Word-by-word animated Bangla Quote */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "18px 20px",
                    textAlign: "center",
                  }}
                >
                  {QUOTE_WORDS.map((w, idx) => {
                    const rf = f(w.revealAt);
                    const wPop =
                      frame >= rf
                        ? spring({
                            frame: frame - rf,
                            fps,
                            config: SPRING_CONFIG.bouncy,
                          })
                        : 0;
                    const visible = frame >= rf;
                    const isAccent = Boolean(w.color);

                    return (
                      <span
                        key={`${w.text}-${idx}`}
                        style={{
                          fontFamily: FONTS.bangla,
                          fontSize: 66,
                          fontWeight: 700,
                          color: w.color ?? COLORS.text,
                          lineHeight: 1.3,
                          padding: isAccent ? "2px 22px" : "2px 0",
                          borderRadius: isAccent ? 18 : 0,
                          backgroundColor: isAccent ? `${w.color}20` : "transparent",
                          border: isAccent ? `2px solid ${w.color}88` : "none",
                          opacity: visible ? wPop : 0,
                          transform: `translateY(${interpolate(wPop, [0, 1], [24, 0])}px) scale(${interpolate(wPop, [0, 1], [0.82, 1])})`,
                          display: "inline-block",
                        }}
                      >
                        {w.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </AbsoluteFill>
      ) : null}

      {/* ACT 3 (216–360f): Native 9:16 #0D1117 End Card */}
      {endCardOpacity > 0.01 ? (
        <AbsoluteFill
          style={{
            backgroundColor: COLORS.bg,
            opacity: endCardOpacity,
          }}
        >
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
                "radial-gradient(ellipse at 50% 45%, rgba(57, 197, 207, 0.12) 0%, rgba(240, 136, 62, 0.06) 45%, transparent 72%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: LAYOUT.safeTop + 40,
              left: LAYOUT.safeX,
              right: LAYOUT.safeX,
              bottom: LAYOUT.subtitleSafeBottom + 60,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Top 5 Concept Tags wrapped neatly in centered rows */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 14,
                maxWidth: 820,
              }}
            >
              <ConceptTag label="Event" color={COLORS.event} startFrame={endCardStartFrame} />
              <ConceptTag label="Job" color={COLORS.job} startFrame={endCardStartFrame + 4} />
              <ConceptTag label="Runner" color={COLORS.runner} startFrame={endCardStartFrame + 8} />
              <ConceptTag label="Step" color={COLORS.step} startFrame={endCardStartFrame + 12} />
              <ConceptTag label="VPS" color={COLORS.vps} startFrame={endCardStartFrame + 16} />
            </div>

            {/* Center Bold Question + CTA */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 44,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.bangla,
                  fontSize: 68,
                  fontWeight: 700,
                  color: COLORS.text,
                  lineHeight: 1.32,
                  maxWidth: 920,
                  transform: `translateY(${interpolate(questionPop, [0, 1], [34, 0])}px) scale(${interpolate(questionPop, [0, 1], [0.9, 1])})`,
                  opacity: interpolate(questionPop, [0, 0.35], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                তোমার <span style={{ color: COLORS.vps }}>Server</span>-এ কি এখনো{" "}
                <span style={{ color: COLORS.runner }}>Build</span> চলছে?
              </div>

              {frame >= ctaStartFrame ? (
                <div
                  style={{
                    padding: "20px 52px",
                    borderRadius: 999,
                    backgroundColor: `${COLORS.success}22`,
                    border: `2.5px solid ${COLORS.success}`,
                    boxShadow: SHADOWS.glow(COLORS.success),
                    fontFamily: FONTS.bangla,
                    fontSize: 42,
                    fontWeight: 700,
                    color: COLORS.text,
                    transform: `scale(${interpolate(ctaPop, [0, 1], [0.5, 1])})`,
                  }}
                >
                  Comment-এ জানাও 💬
                </div>
              ) : null}
            </div>

            {/* Bottom Series Label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 28px",
                borderRadius: 999,
                backgroundColor: COLORS.panel,
                border: `1.5px solid ${COLORS.border}`,
              }}
            >
              <span
                style={{
                  padding: "4px 14px",
                  borderRadius: 999,
                  backgroundColor: COLORS.vps,
                  color: "#0D1117",
                  fontFamily: FONTS.ui,
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                Part 2
              </span>
              <span style={{ fontFamily: FONTS.bangla, fontSize: 28, fontWeight: 700, color: COLORS.muted }}>
                রাফির গল্প — পর্ব ২
              </span>
            </div>
          </div>
        </AbsoluteFill>
      ) : null}

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
