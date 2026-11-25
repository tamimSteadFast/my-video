import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, getLayoutMetrics, SPRING_CONFIGS } from "../../../config/theme";
import { AUDIO_CONFIG, SCENE_CUES, sec, SFX_FILES } from "../../../config/timing";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { BookmarkIcon, CommentIcon, ShareIcon } from "../components/Icons";
import { WordByWordText } from "../components/WordByWordText";

export const Scene09Cta: React.FC<{ hasSfx?: boolean }> = ({ hasSfx = AUDIO_CONFIG.hasSfx }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);
  const cues = SCENE_CUES.cta;

  const actionsStart = sec(cues.actionIcons);
  const endCardStart = sec(cues.endCard);

  const actions = [
    {
      label: "Comment",
      sub: "তোমার মতামত জানাও",
      color: COLORS.ai,
      icon: <CommentIcon size={30} color={COLORS.ai} />,
    },
    {
      label: "Save",
      sub: "পরে দেখার জন্য",
      color: COLORS.amber,
      icon: <BookmarkIcon size={30} color={COLORS.amber} />,
    },
    {
      label: "Share",
      sub: "বন্ধুদের সাথে",
      color: COLORS.agi,
      icon: <ShareIcon size={30} color={COLORS.agi} />,
    },
  ];

  const brandSpring = spring({
    frame: frame - endCardStart,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  return (
    <AbsoluteFill>
      <AnimatedBackground mood="mixed" />

      {hasSfx ? (
        <Sequence from={endCardStart} durationInFrames={50}>
          <Audio src={staticFile(SFX_FILES.chime)} volume={AUDIO_CONFIG.sfxVolume * 0.85} />
        </Sequence>
      ) : null}

      <AbsoluteFill
        style={{
          paddingLeft: metrics.padX,
          paddingRight: metrics.padX,
          paddingTop: metrics.padTop,
          paddingBottom: metrics.padBottom,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: metrics.isVertical ? 40 : 28,
        }}
      >
        {/* Engagement Question */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            marginTop: metrics.isVertical ? 24 : 10,
          }}
        >
          <div
            style={{
              padding: "8px 22px",
              borderRadius: 999,
              backgroundColor: COLORS.aiSoft,
              border: `1px solid ${COLORS.aiBorder}`,
              fontFamily: FONTS.display,
              fontSize: metrics.badgeSize,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: COLORS.ai,
            }}
          >
            YOUR TURN
          </div>

          <WordByWordText
            text="তোমার কী মনে হয়, ভবিষ্যতে AGI কি মানুষের মতো General Intelligence অর্জন করতে পারবে?"
            startFrame={sec(cues.questionStart)}
            framesPerWord={3}
            fontSize={metrics.isVertical ? 54 : 56}
            lineHeight={1.34}
            maxWidth={metrics.isVertical ? 920 : 1460}
            highlightWords={{
              AGI: COLORS.agi,
              General: COLORS.ai,
              Intelligence: COLORS.ai,
            }}
          />
        </div>

        {/* 3 CTA Action Pills */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: metrics.isVertical ? "1fr" : "repeat(3, 1fr)",
            gap: metrics.isVertical ? 18 : 26,
            width: "100%",
            maxWidth: metrics.isVertical ? 820 : 1120,
          }}
        >
          {actions.map((act, idx) => {
            const start = actionsStart + idx * 6;
            const enter = spring({
              frame: frame - start,
              fps,
              config: SPRING_CONFIGS.bouncy,
            });
            const opacity = interpolate(frame, [start, start + 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={act.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: metrics.isVertical ? "flex-start" : "center",
                  gap: 16,
                  padding: metrics.isVertical ? "20px 28px" : "20px 26px",
                  borderRadius: 20,
                  backgroundColor: COLORS.surface,
                  border: `1.5px solid ${act.color}55`,
                  boxShadow: `0 10px 28px rgba(0, 0, 0, 0.35)`,
                  opacity,
                  scale: `${interpolate(enter, [0, 1], [0.85, 1])}`,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    backgroundColor: `${act.color}1C`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {act.icon}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: metrics.isVertical ? 30 : 28,
                      fontWeight: 800,
                      color: act.color,
                    }}
                  >
                    {act.label}
                  </span>
                  <span
                    style={{
                      fontFamily: FONTS.primary,
                      fontSize: metrics.isVertical ? 22 : 20,
                      fontWeight: 500,
                      color: COLORS.textSecondary,
                      letterSpacing: 0,
                    }}
                  >
                    {act.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand End Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            padding: metrics.isVertical ? "28px 44px" : "24px 56px",
            borderRadius: 24,
            backgroundColor: COLORS.surfaceElevated,
            border: `2px solid ${COLORS.aiBorder}`,
            boxShadow: `0 0 42px ${COLORS.aiGlow}33`,
            opacity: interpolate(brandSpring, [0, 1], [0, 1]),
            translate: `0px ${interpolate(brandSpring, [0, 1], [22, 0])}px`,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: metrics.isVertical ? 58 : 54,
              fontWeight: 700,
              background: `linear-gradient(90deg, ${COLORS.ai}, ${COLORS.agi})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 0,
            }}
          >
            AI শিখি
          </div>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: metrics.isVertical ? 26 : 24,
              fontWeight: 600,
              color: COLORS.textSecondary,
              letterSpacing: "0.06em",
            }}
          >
            Step by Step AI Engineering
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
