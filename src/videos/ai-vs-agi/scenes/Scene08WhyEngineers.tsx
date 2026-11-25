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
import { BulletItem, BulletList } from "../components/BulletList";
import { Title } from "../components/Title";

export const Scene08WhyEngineers: React.FC<{ hasSfx?: boolean }> = ({
  hasSfx = AUDIO_CONFIG.hasSfx,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);
  const cues = SCENE_CUES.whyEngineersCare;

  const items: BulletItem[] = [
    {
      text: "AI-এর Capability ও সীমাবদ্ধতা বোঝা",
      startFrame: sec(cues.item1),
    },
    {
      text: "Realistic Product Design ও বাস্তব সমাধান",
      startFrame: sec(cues.item2),
    },
    {
      text: "Hype আর বাস্তবতা আলাদা করা",
      startFrame: sec(cues.item3),
    },
    {
      text: "AI Safety ও Engineering Responsibility",
      startFrame: sec(cues.item4),
    },
  ];

  const bannerStart = sec(cues.foundationBanner);
  const bannerSpring = spring({
    frame: frame - bannerStart,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  return (
    <AbsoluteFill>
      <AnimatedBackground mood="green" />

      {hasSfx
        ? items.map((item) => (
            <Sequence key={item.text} from={item.startFrame} durationInFrames={16}>
              <Audio src={staticFile(SFX_FILES.pop)} volume={AUDIO_CONFIG.sfxVolume * 0.55} />
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
          alignItems: "center",
          gap: metrics.isVertical ? 32 : 24,
        }}
      >
        <Title
          eyebrow="06 • FOR AI ENGINEERS"
          heading="AI Engineer হিসেবে কেন জানা দরকার?"
          accentColor={COLORS.green}
          startFrame={sec(cues.heading)}
          align="center"
        />

        <div
          style={{
            width: "100%",
            maxWidth: metrics.isVertical ? 940 : 1220,
          }}
        >
          <BulletList items={items} accentColor={COLORS.green} />
        </div>

        {/* Highlight Banner synced at 11.8s */}
        <div
          style={{
            padding: metrics.isVertical ? "20px 28px" : "18px 40px",
            borderRadius: 20,
            background: `linear-gradient(90deg, ${COLORS.greenSoft}, ${COLORS.aiSoft})`,
            border: `1.5px solid ${COLORS.greenBorder}`,
            boxShadow: `0 0 32px ${COLORS.green}26`,
            fontFamily: FONTS.primary,
            fontSize: metrics.isVertical ? 32 : 30,
            fontWeight: 700,
            color: COLORS.textPrimary,
            textAlign: "center",
            letterSpacing: 0,
            opacity: interpolate(bannerSpring, [0, 1], [0, 1]),
            translate: `0px ${interpolate(bannerSpring, [0, 1], [18, 0])}px`,
          }}
        >
          <span style={{ color: COLORS.green }}>AI Engineering Learning Journey</span>-এর মূল ভিত্তি
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
