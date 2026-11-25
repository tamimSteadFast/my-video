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

export const Scene02Title: React.FC<{ hasSfx?: boolean }> = ({ hasSfx = AUDIO_CONFIG.hasSfx }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);
  const cues = SCENE_CUES.title;

  const collideStart = sec(cues.collideStart);
  const vsStart = sec(cues.vsReveal);
  const subStart = sec(cues.subtitleReveal);

  const collide = spring({
    frame: frame - collideStart,
    fps,
    config: SPRING_CONFIGS.impact,
  });

  const vsSpring = spring({
    frame: frame - vsStart,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const subSpring = spring({
    frame: frame - subStart,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const travel = metrics.isVertical ? 320 : 520;
  const aiX = interpolate(collide, [0, 1], [-travel, 0]);
  const agiX = interpolate(collide, [0, 1], [travel, 0]);
  const wordsOpacity = interpolate(frame, [collideStart, collideStart + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle impact shockwave ring when AI & AGI meet
  const ringProgress = interpolate(frame, [vsStart - 2, vsStart + 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.4, 2.8]);
  const ringOpacity = interpolate(ringProgress, [0, 0.2, 1], [0, 0.55, 0]);

  const titleFontSize = metrics.isVertical ? 142 : 168;

  return (
    <AbsoluteFill>
      <AnimatedBackground mood="mixed" />

      {hasSfx ? (
        <>
          <Sequence from={collideStart} durationInFrames={30}>
            <Audio src={staticFile(SFX_FILES.whoosh)} volume={AUDIO_CONFIG.sfxVolume} />
          </Sequence>
          <Sequence from={vsStart} durationInFrames={45}>
            <Audio src={staticFile(SFX_FILES.chime)} volume={AUDIO_CONFIG.sfxVolume * 0.85} />
          </Sequence>
        </>
      ) : null}

      <AbsoluteFill
        style={{
          paddingLeft: metrics.padX,
          paddingRight: metrics.padX,
          paddingTop: metrics.padTop,
          paddingBottom: metrics.padBottom,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: metrics.isVertical ? 48 : 38,
        }}
      >
        {/* Subtle impact shockwave */}
        <div
          style={{
            position: "absolute",
            width: 240,
            height: 240,
            borderRadius: "50%",
            border: `3px solid ${COLORS.ai}`,
            boxShadow: `0 0 60px ${COLORS.agiGlow}`,
            opacity: ringOpacity,
            scale: `${ringScale}`,
            pointerEvents: "none",
          }}
        />

        {/* Colliding AI vs AGI Lockup */}
        <div
          style={{
            display: "flex",
            flexDirection: metrics.isVertical ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: metrics.isVertical ? 24 : 44,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: titleFontSize,
              fontWeight: 800,
              lineHeight: 1,
              color: COLORS.ai,
              textShadow: `0 0 48px ${COLORS.aiGlow}`,
              opacity: wordsOpacity,
              translate: `${aiX}px 0px`,
            }}
          >
            AI
          </div>

          <div
            style={{
              width: metrics.isVertical ? 96 : 104,
              height: metrics.isVertical ? 96 : 104,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.ai}30, ${COLORS.agi}30)`,
              border: `2px solid ${COLORS.borderBright}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONTS.display,
              fontSize: metrics.isVertical ? 38 : 40,
              fontWeight: 800,
              color: COLORS.textPrimary,
              opacity: interpolate(vsSpring, [0, 1], [0, 1]),
              scale: `${interpolate(vsSpring, [0, 1], [0.4, 1])}`,
              boxShadow: `0 0 36px rgba(167, 139, 250, 0.35)`,
            }}
          >
            vs
          </div>

          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: titleFontSize,
              fontWeight: 800,
              lineHeight: 1,
              color: COLORS.agi,
              textShadow: `0 0 48px ${COLORS.agiGlow}`,
              opacity: wordsOpacity,
              translate: `${agiX}px 0px`,
            }}
          >
            AGI
          </div>
        </div>

        {/* Bangla + English Subtitle */}
        <div
          style={{
            padding: metrics.isVertical ? "22px 30px" : "20px 38px",
            borderRadius: 20,
            backgroundColor: COLORS.surface,
            border: `1.5px solid ${COLORS.borderBright}`,
            fontFamily: FONTS.primary,
            fontSize: metrics.isVertical ? 40 : 40,
            fontWeight: 600,
            color: COLORS.textPrimary,
            textAlign: "center",
            lineHeight: 1.38,
            letterSpacing: 0,
            maxWidth: metrics.isVertical ? 900 : 1380,
            opacity: interpolate(subSpring, [0, 1], [0, 1]),
            translate: `0px ${interpolate(subSpring, [0, 1], [24, 0])}px`,
          }}
        >
          <span style={{ color: COLORS.ai, fontWeight: 700 }}>Artificial Intelligence</span> বনাম{" "}
          <span style={{ color: COLORS.agi, fontWeight: 700 }}>
            Artificial General Intelligence
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
