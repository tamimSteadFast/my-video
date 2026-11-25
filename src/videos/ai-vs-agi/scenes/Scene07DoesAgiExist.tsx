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
import {
  ChatSparkIcon,
  CodeBracketsIcon,
  ImageSparkIcon,
  MicWaveIcon,
  NavigationIcon,
  PlayStarIcon,
} from "../components/Icons";
import { WordByWordText } from "../components/WordByWordText";

export const Scene07DoesAgiExist: React.FC<{ hasSfx?: boolean }> = ({
  hasSfx = AUDIO_CONFIG.hasSfx,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);
  const cues = SCENE_CUES.doesAgiExist;

  const noFrame = sec(cues.noPunch);
  const badgeFrame = sec(cues.researchBadge);
  const stripFrame = sec(cues.powerfulStrip);
  const verdictFrame = sec(cues.verdictPill);

  const noSpring = spring({
    frame: frame - noFrame,
    fps,
    config: SPRING_CONFIGS.impact,
  });

  const badgeSpring = spring({
    frame: frame - badgeFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const verdictSpring = spring({
    frame: frame - verdictFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const examples = [
    { label: "AI Chatbot", icon: <ChatSparkIcon size={22} color={COLORS.ai} /> },
    { label: "Image Gen", icon: <ImageSparkIcon size={22} color={COLORS.ai} /> },
    { label: "Coding AI", icon: <CodeBracketsIcon size={22} color={COLORS.ai} /> },
    { label: "Map Navigation", icon: <NavigationIcon size={22} color={COLORS.ai} /> },
    { label: "Recommendation", icon: <PlayStarIcon size={22} color={COLORS.ai} /> },
    { label: "Voice Assistant", icon: <MicWaveIcon size={22} color={COLORS.ai} /> },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground mood="amber" />

      {hasSfx ? (
        <Sequence from={noFrame} durationInFrames={20}>
          <Audio src={staticFile(SFX_FILES.click)} volume={AUDIO_CONFIG.sfxVolume} />
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
          gap: metrics.isVertical ? 32 : 24,
        }}
      >
        {/* Top Question */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              padding: "8px 22px",
              borderRadius: 999,
              backgroundColor: COLORS.amberSoft,
              border: `1px solid ${COLORS.amberBorder}`,
              fontFamily: FONTS.display,
              fontSize: metrics.badgeSize,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: COLORS.amber,
            }}
          >
            05 • REALITY CHECK
          </div>

          <WordByWordText
            text="AGI কি আজ তৈরি হয়েছে?"
            startFrame={sec(cues.questionStart)}
            framesPerWord={6}
            fontSize={metrics.headingSize}
            highlightWords={{ AGI: COLORS.agi }}
          />
        </div>

        {/* Center Dramatic Punch Answer ("না — এখনো না") synced to exact 2.85s */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: metrics.isVertical ? 104 : 112,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: 0,
              color: COLORS.amber,
              textShadow: `0 0 46px ${COLORS.amber}66`,
              textAlign: "center",
              opacity: interpolate(frame, [noFrame, noFrame + 6], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: `${interpolate(noSpring, [0, 1], [0.6, 1])}`,
            }}
          >
            না — এখনো না
          </div>

          {/* Research Goal Status Pill synced to 3.85s */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 28px",
              borderRadius: 999,
              backgroundColor: COLORS.agiSoft,
              border: `1.5px solid ${COLORS.agiBorder}`,
              fontFamily: FONTS.primary,
              fontSize: metrics.isVertical ? 30 : 28,
              fontWeight: 700,
              color: COLORS.textPrimary,
              letterSpacing: 0,
              opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
              translate: `0px ${interpolate(badgeSpring, [0, 1], [16, 0])}px`,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: COLORS.agi,
                boxShadow: `0 0 14px ${COLORS.agi}`,
              }}
            />
            AGI এখনো একটি <span style={{ color: COLORS.agi }}>Research Goal</span>
          </div>
        </div>

        {/* Bottom Strip: Today's Powerful AI Examples ≠ AGI */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            width: "100%",
            maxWidth: metrics.isVertical ? 950 : 1480,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: metrics.isVertical ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: metrics.isVertical ? 14 : 16,
              width: "100%",
            }}
          >
            {examples.map((ex, idx) => {
              const start = stripFrame + idx * 4;
              const enter = spring({
                frame: frame - start,
                fps,
                config: SPRING_CONFIGS.snappy,
              });
              const opacity = interpolate(frame, [start, start + 7], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={ex.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    padding: metrics.isVertical ? "16px 18px" : "14px 20px",
                    borderRadius: 16,
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.aiBorder}`,
                    opacity,
                    translate: `0px ${interpolate(enter, [0, 1], [16, 0])}px`,
                  }}
                >
                  {ex.icon}
                  <span
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: metrics.isVertical ? 24 : 22,
                      fontWeight: 600,
                      color: COLORS.textSecondary,
                    }}
                  >
                    {ex.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Verdict Callout */}
          <div
            style={{
              display: "flex",
              flexDirection: metrics.isVertical ? "column" : "row",
              alignItems: "center",
              gap: metrics.isVertical ? 10 : 20,
              padding: metrics.isVertical ? "18px 28px" : "16px 34px",
              borderRadius: 18,
              backgroundColor: COLORS.surfaceElevated,
              border: `1.5px solid ${COLORS.dangerBorder}`,
              opacity: interpolate(verdictSpring, [0, 1], [0, 1]),
              scale: `${interpolate(verdictSpring, [0, 1], [0.92, 1])}`,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: metrics.isVertical ? 30 : 28,
                fontWeight: 800,
                color: COLORS.danger,
              }}
            >
              Powerful AI ≠ AGI
            </span>
            <span
              style={{
                fontFamily: FONTS.primary,
                fontSize: metrics.isVertical ? 26 : 26,
                fontWeight: 600,
                color: COLORS.textPrimary,
                textAlign: "center",
                letterSpacing: 0,
              }}
            >
              শুধু Capability দেখে AGI বলা যায় না
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
