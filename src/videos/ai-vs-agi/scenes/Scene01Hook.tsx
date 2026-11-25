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
import { ChatBubble } from "../components/ChatBubble";
import { ChatSparkIcon, CodeBracketsIcon, ImageSparkIcon } from "../components/Icons";
import { WordByWordText } from "../components/WordByWordText";

export const Scene01Hook: React.FC<{ hasSfx?: boolean }> = ({ hasSfx = AUDIO_CONFIG.hasSfx }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);
  const cues = SCENE_CUES.hook;

  const focusFrame = sec(cues.focusShift);
  const questionFrame = sec(cues.questionStart);

  // Smoothly dim/recede the chat stage when the hero question lands at 6.4s
  const stageOpacity = interpolate(frame, [focusFrame, focusFrame + 14], [1, 0.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stageScale = interpolate(frame, [focusFrame, focusFrame + 16], [1, 0.93], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const questionBadgeSpring = spring({
    frame: frame - (questionFrame - 4),
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const toolChips = [
    {
      label: "AI Chatbot",
      sub: "কথোপকথন",
      icon: <ChatSparkIcon size={28} color={COLORS.ai} />,
      start: sec(cues.chipChat),
    },
    {
      label: "Image Generator",
      sub: "ছবি তৈরি",
      icon: <ImageSparkIcon size={28} color={COLORS.agi} />,
      start: sec(cues.chipImage),
    },
    {
      label: "Coding Assistant",
      sub: "কোড লেখা",
      icon: <CodeBracketsIcon size={28} color={COLORS.green} />,
      start: sec(cues.chipCode),
    },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground mood="mixed" />

      {hasSfx ? (
        <>
          {toolChips.map((chip) => (
            <Sequence key={chip.label} from={chip.start} durationInFrames={20}>
              <Audio src={staticFile(SFX_FILES.pop)} volume={AUDIO_CONFIG.sfxVolume * 0.75} />
            </Sequence>
          ))}
        </>
      ) : null}

      {/* Layer 1: Chat UI + Daily AI Tools */}
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
          gap: metrics.isVertical ? 36 : 30,
          opacity: stageOpacity,
          scale: `${stageScale}`,
        }}
      >
        {/* Chat Card Container */}
        <div
          style={{
            width: "100%",
            maxWidth: metrics.isVertical ? 940 : 1140,
            padding: metrics.isVertical ? "32px 28px" : "34px 40px",
            borderRadius: 28,
            backgroundColor: COLORS.surface,
            border: `1.5px solid ${COLORS.borderBright}`,
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Minimal window header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 14,
              borderBottom: `1px solid ${COLORS.border}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: COLORS.ai }}
              />
              <span
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 20,
                  fontWeight: 700,
                  color: COLORS.textSecondary,
                  letterSpacing: "0.04em",
                }}
              >
                AI ASSISTANT • LIVE PROMPT
              </span>
            </div>
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: 16,
                fontWeight: 600,
                color: COLORS.green,
              }}
            >
              ● ONLINE
            </span>
          </div>

          <ChatBubble
            role="user"
            text="Explain AI vs AGI"
            startFrame={sec(cues.userPrompt)}
            typewriterCharsPerFrame={0.65}
            fontSize={metrics.isVertical ? 36 : 34}
          />

          <ChatBubble role="ai" typingDots startFrame={sec(cues.aiTyping)} />
        </div>

        {/* 3 Daily AI Tool Pills synced to narration */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: metrics.isVertical ? "1fr" : "repeat(3, 1fr)",
            gap: metrics.isVertical ? 18 : 22,
            width: "100%",
            maxWidth: metrics.isVertical ? 940 : 1140,
          }}
        >
          {toolChips.map((chip) => {
            const localF = frame - chip.start;
            const enter = spring({
              frame: localF,
              fps,
              config: SPRING_CONFIGS.snappy,
            });
            const opacity = interpolate(localF, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={chip.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: metrics.isVertical ? "22px 26px" : "20px 24px",
                  borderRadius: 20,
                  backgroundColor: COLORS.surfaceElevated,
                  border: `1.5px solid ${COLORS.borderBright}`,
                  opacity,
                  translate: `0px ${interpolate(enter, [0, 1], [24, 0])}px`,
                  scale: `${interpolate(enter, [0, 1], [0.9, 1])}`,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    backgroundColor: "rgba(15, 23, 42, 0.85)",
                    border: `1px solid ${COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {chip.icon}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: metrics.isVertical ? 30 : 25,
                      fontWeight: 700,
                      color: COLORS.textPrimary,
                    }}
                  >
                    {chip.label}
                  </span>
                  <span
                    style={{
                      fontFamily: FONTS.primary,
                      fontSize: metrics.isVertical ? 24 : 20,
                      fontWeight: 500,
                      color: COLORS.textMuted,
                      letterSpacing: 0,
                    }}
                  >
                    {chip.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Layer 2: Big Hero Bangla Question synced at 6.75s */}
      {frame >= questionFrame - 6 ? (
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
            gap: 28,
          }}
        >
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              backgroundColor: COLORS.amberSoft,
              border: `1.5px solid ${COLORS.amberBorder}`,
              fontFamily: FONTS.display,
              fontSize: metrics.badgeSize,
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: COLORS.amber,
              opacity: interpolate(questionBadgeSpring, [0, 1], [0, 1]),
              scale: `${interpolate(questionBadgeSpring, [0, 1], [0.85, 1])}`,
            }}
          >
            THINK ABOUT IT
          </div>

          <WordByWordText
            text="সব AI কি মানুষের মতো চিন্তা করতে পারে?"
            startFrame={questionFrame}
            framesPerWord={6}
            fontSize={metrics.isVertical ? 74 : 80}
            fontWeight={700}
            lineHeight={1.32}
            maxWidth={metrics.isVertical ? 900 : 1320}
            highlightWords={{
              AI: COLORS.ai,
              মানুষের: COLORS.agi,
              মতো: COLORS.agi,
              চিন্তা: COLORS.amber,
            }}
          />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
