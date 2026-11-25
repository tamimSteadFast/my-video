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
import { IconCard } from "../components/IconCard";
import {
  DecisionBranchIcon,
  LanguageWaveIcon,
  PatternEyeIcon,
} from "../components/Icons";
import { Title } from "../components/Title";

export const Scene03WhatIsAi: React.FC<{ hasSfx?: boolean }> = ({
  hasSfx = AUDIO_CONFIG.hasSfx,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);
  const cues = SCENE_CUES.whatIsAi;

  const line1Start = sec(cues.defLine1);
  const line2Start = sec(cues.defLine2);

  const cardEnter = spring({
    frame: frame - line1Start,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const line2Opacity = interpolate(frame, [line2Start, line2Start + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [line2Start, line2Start + 14], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const capabilities = [
    {
      title: "Pattern Recognition",
      subtitle: "প্যাটার্ন চেনা ও শনাক্তকরণ",
      icon: <PatternEyeIcon size={32} color={COLORS.ai} />,
      start: sec(cues.cardPattern),
    },
    {
      title: "Decision Making",
      subtitle: "বুদ্ধিমান সিদ্ধান্ত নেওয়া",
      icon: <DecisionBranchIcon size={32} color={COLORS.ai} />,
      start: sec(cues.cardDecision),
    },
    {
      title: "Language Processing",
      subtitle: "ভাষা বোঝা, অনুবাদ ও তৈরি করা",
      icon: <LanguageWaveIcon size={32} color={COLORS.ai} />,
      start: sec(cues.cardLanguage),
    },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground mood="ai" />

      {hasSfx
        ? capabilities.map((cap) => (
            <Sequence key={cap.title} from={cap.start} durationInFrames={18}>
              <Audio src={staticFile(SFX_FILES.pop)} volume={AUDIO_CONFIG.sfxVolume * 0.65} />
            </Sequence>
          ))
        : null}

      <AbsoluteFill
        style={{
          paddingLeft: metrics.padX,
          paddingRight: metrics.padX,
          paddingTop: metrics.padTop,
          paddingBottom: metrics.padBottom,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: metrics.isVertical ? 36 : 28,
        }}
      >
        <Title
          eyebrow="01 • ARTIFICIAL INTELLIGENCE"
          heading="What is Artificial Intelligence (AI)?"
          accentColor={COLORS.ai}
          startFrame={sec(cues.heading)}
          align="center"
        />

        {/* Definition Glass Box */}
        <div
          style={{
            width: "100%",
            maxWidth: metrics.isVertical ? 950 : 1440,
            margin: "0 auto",
            padding: metrics.isVertical ? "34px 32px" : "34px 48px",
            borderRadius: 26,
            backgroundColor: COLORS.surface,
            border: `1.5px solid ${COLORS.aiBorder}`,
            boxShadow: `0 18px 44px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(34, 211, 238, 0.25)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            opacity: interpolate(cardEnter, [0, 1], [0, 1]),
            translate: `0px ${interpolate(cardEnter, [0, 1], [22, 0])}px`,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: metrics.isVertical ? 40 : 40,
              fontWeight: 600,
              color: COLORS.textPrimary,
              textAlign: "center",
              lineHeight: 1.4,
              letterSpacing: 0,
            }}
          >
            এমন একটি <span style={{ color: COLORS.ai, fontWeight: 700 }}>Technology</span>, যার
            মাধ্যমে Computer System
          </div>

          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: metrics.isVertical ? 40 : 40,
              fontWeight: 700,
              color: COLORS.textPrimary,
              textAlign: "center",
              lineHeight: 1.4,
              letterSpacing: 0,
              opacity: line2Opacity,
              translate: `0px ${line2Y}px`,
            }}
          >
            মানুষের বুদ্ধিমত্তার{" "}
            <span
              style={{
                color: COLORS.ai,
                padding: "2px 12px",
                borderRadius: 10,
                backgroundColor: COLORS.aiSoft,
              }}
            >
              নির্দিষ্ট কিছু কাজ
            </span>{" "}
            সম্পাদন করতে পারে
          </div>
        </div>

        {/* 3 Spoken Capability Cards synced to 10.95s, 12.25s, 13.35s */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: metrics.isVertical ? "1fr" : "repeat(3, 1fr)",
            gap: metrics.isVertical ? 22 : 26,
            width: "100%",
            maxWidth: metrics.isVertical ? 950 : 1560,
            margin: "0 auto",
          }}
        >
          {capabilities.map((cap) => (
            <IconCard
              key={cap.title}
              icon={cap.icon}
              title={cap.title}
              subtitle={cap.subtitle}
              accentColor={COLORS.ai}
              startFrame={cap.start}
              compact={metrics.isVertical}
              highlighted={frame >= cap.start && frame < cap.start + 45}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
