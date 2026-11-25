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
  CatIcon,
  ChatSparkIcon,
  ChessKnightIcon,
  DogIcon,
  ImageSparkIcon,
  LockIcon,
  ShieldSpamIcon,
} from "../components/Icons";
import { Title } from "../components/Title";

export const Scene04NarrowAi: React.FC<{ hasSfx?: boolean }> = ({
  hasSfx = AUDIO_CONFIG.hasSfx,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);
  const cues = SCENE_CUES.narrowAi;

  const boxesStart = sec(cues.boxesStart);
  const stagger = sec(cues.boxStagger);
  const focusImg = sec(cues.focusImageModel);
  const detectCat = sec(cues.detectCat);
  const detectDog = sec(cues.detectDog);
  const bounceStart = sec(cues.bounceArrowStart);
  const captionStart = sec(cues.bounceCaption);

  const isFocusingImg = frame >= focusImg;

  // Cat & Dog classification pill animations
  const catPop = spring({ frame: frame - detectCat, fps, config: SPRING_CONFIGS.bouncy });
  const dogPop = spring({ frame: frame - detectDog, fps, config: SPRING_CONFIGS.bouncy });

  // Bouncing skill transfer arrow animation (12.1s -> 15.0s)
  // Phase 1: shoot out (0 -> 26f), Phase 2: hit shield & bounce back (26f -> 56f)
  const bLocal = frame - bounceStart;
  const arrowOpacity = interpolate(bLocal, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const travelForward = interpolate(bLocal, [0, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const recoil = spring({
    frame: Math.max(0, bLocal - 26),
    fps,
    config: { damping: 9, stiffness: 180, mass: 0.7 },
  });
  const arrowProgress = bLocal < 26 ? travelForward : 1 - recoil * 0.65;

  const shieldFlash = interpolate(bLocal, [23, 27, 46], [0, 1, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionEnter = spring({
    frame: frame - captionStart,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const catDogWidget =
    frame >= focusImg ? (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 6,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 12,
            backgroundColor: COLORS.greenSoft,
            border: `1.5px solid ${COLORS.green}`,
            opacity: interpolate(frame, [detectCat - 2, detectCat + 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: `${interpolate(catPop, [0, 1], [0.7, 1])}`,
          }}
        >
          <CatIcon size={22} color={COLORS.green} />
          <span
            style={{
              fontFamily: FONTS.primary,
              fontSize: metrics.isVertical ? 22 : 20,
              fontWeight: 700,
              color: COLORS.green,
              letterSpacing: 0,
            }}
          >
            বিড়াল ✓
          </span>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 12,
            backgroundColor: COLORS.greenSoft,
            border: `1.5px solid ${COLORS.green}`,
            opacity: interpolate(frame, [detectDog - 2, detectDog + 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: `${interpolate(dogPop, [0, 1], [0.7, 1])}`,
          }}
        >
          <DogIcon size={22} color={COLORS.green} />
          <span
            style={{
              fontFamily: FONTS.primary,
              fontSize: metrics.isVertical ? 22 : 20,
              fontWeight: 700,
              color: COLORS.green,
              letterSpacing: 0,
            }}
          >
            কুকুর ✓
          </span>
        </div>
      </div>
    ) : null;

  return (
    <AbsoluteFill>
      <AnimatedBackground mood="ai" />

      {hasSfx ? (
        <>
          <Sequence from={detectCat} durationInFrames={16}>
            <Audio src={staticFile(SFX_FILES.pop)} volume={AUDIO_CONFIG.sfxVolume * 0.7} />
          </Sequence>
          <Sequence from={detectDog} durationInFrames={16}>
            <Audio src={staticFile(SFX_FILES.pop)} volume={AUDIO_CONFIG.sfxVolume * 0.7} />
          </Sequence>
          <Sequence from={bounceStart + 24} durationInFrames={20}>
            <Audio src={staticFile(SFX_FILES.click)} volume={AUDIO_CONFIG.sfxVolume} />
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
          justifyContent: "space-between",
          gap: metrics.isVertical ? 32 : 24,
        }}
      >
        <Title
          eyebrow="02 • NARROW AI (ANI)"
          heading="Narrow AI — একটি কাজে Expert"
          accentColor={COLORS.ai}
          startFrame={sec(cues.heading)}
          align="center"
        />

        {/* 2x2 Isolated Domain Grid + Animated Bounce Overlay */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: metrics.isVertical ? 950 : 1540,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: metrics.isVertical ? 24 : 34,
            columnGap: metrics.isVertical ? 40 : 64,
          }}
        >
          <IconCard
            icon={<ImageSparkIcon size={32} color={COLORS.ai} />}
            title="Image Recognition"
            subtitle="ছবি শনাক্তকরণ"
            accentColor={COLORS.ai}
            startFrame={boxesStart}
            locked
            highlighted={isFocusingImg}
            extra={catDogWidget}
          />

          <IconCard
            icon={<ChessKnightIcon size={32} color={COLORS.ai} />}
            title="Chess Engine"
            subtitle="শুধু দাবা খেলা"
            accentColor={COLORS.ai}
            startFrame={boxesStart + stagger}
            locked
            dimmed={isFocusingImg && bLocal < 0}
          />

          <IconCard
            icon={<ShieldSpamIcon size={32} color={COLORS.ai} />}
            title="Spam Filter"
            subtitle="ইমেইল ফিল্টারিং"
            accentColor={COLORS.ai}
            startFrame={boxesStart + stagger * 2}
            locked
            dimmed={isFocusingImg}
          />

          <IconCard
            icon={<ChatSparkIcon size={32} color={COLORS.ai} />}
            title="AI Chatbot"
            subtitle="টেক্সট উত্তর দেওয়া"
            accentColor={COLORS.ai}
            startFrame={boxesStart + stagger * 3}
            locked
            dimmed={isFocusingImg}
          />

          {/* Animated Skill Transfer Arrow bouncing off the center barrier between columns */}
          {bLocal >= 0 ? (
            <div
              style={{
                position: "absolute",
                top: metrics.isVertical ? -62 : "26%",
                left: 0,
                right: 0,
                height: metrics.isVertical ? 84 : 110,
                translate: metrics.isVertical ? "0 0" : "0 -50%",
                opacity: arrowOpacity,
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              {/* Moving skill capsule staying strictly on the left side of the center barrier */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${interpolate(arrowProgress, [0, 1], metrics.isVertical ? [28, 45.5] : [34, 47.5])}%`,
                  translate: "-100% -50%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: metrics.isVertical ? "8px 16px" : "10px 18px",
                  borderRadius: 999,
                  backgroundColor: bLocal >= 26 ? "#2B1424" : "#0D2A3A",
                  border: `2px solid ${bLocal >= 26 ? COLORS.danger : COLORS.ai}`,
                  boxShadow: `0 0 24px ${bLocal >= 26 ? COLORS.danger : COLORS.aiGlow}`,
                  fontFamily: FONTS.display,
                  fontSize: metrics.isVertical ? 20 : 20,
                  fontWeight: 800,
                  color: bLocal >= 26 ? COLORS.danger : COLORS.ai,
                  whiteSpace: "nowrap",
                }}
              >
                {bLocal >= 26 ? "✕ BLOCKED" : "SKILL →"}
              </div>

              {/* Vertical barrier shield centered cleanly in the column gap */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  translate: "-50% -50%",
                  height: metrics.isVertical ? 84 : 120,
                  width: 5,
                  borderRadius: 999,
                  backgroundColor: COLORS.danger,
                  opacity: 0.45 + shieldFlash * 0.55,
                  boxShadow: `0 0 ${14 + shieldFlash * 28}px ${COLORS.danger}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  translate: "-50% -50%",
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  backgroundColor: COLORS.bgDeep,
                  border: `2px solid ${COLORS.danger}`,
                  boxShadow: `0 0 ${12 + shieldFlash * 24}px ${COLORS.danger}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  scale: `${1 + shieldFlash * 0.22}`,
                }}
              >
                <LockIcon size={20} color={COLORS.danger} />
              </div>
            </div>
          ) : null}
        </div>

        {/* Bottom Takeaway Caption */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: metrics.isVertical ? "18px 28px" : "16px 36px",
              borderRadius: 18,
              backgroundColor: bLocal >= 0 ? COLORS.amberSoft : COLORS.surface,
              border: `1.5px solid ${bLocal >= 0 ? COLORS.amberBorder : COLORS.borderBright}`,
              fontFamily: FONTS.primary,
              fontSize: metrics.captionSize,
              fontWeight: 700,
              color: bLocal >= 0 ? COLORS.amber : COLORS.textPrimary,
              textAlign: "center",
              letterSpacing: 0,
              opacity:
                bLocal >= 0
                  ? interpolate(captionEnter, [0, 1], [0.7, 1])
                  : interpolate(frame, [20, 34], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
              scale: bLocal >= 0 ? `${interpolate(captionEnter, [0, 1], [0.95, 1])}` : "1",
            }}
          >
            {bLocal >= 0
              ? "একটি Task-এর দক্ষতা অন্য Task-এ কাজ করে না"
              : "আজকের প্রায় সব AI-ই Narrow AI"}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
