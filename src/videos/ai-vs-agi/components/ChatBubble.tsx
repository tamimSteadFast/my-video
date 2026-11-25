import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRING_CONFIGS } from "../../../config/theme";

interface ChatBubbleProps {
  role: "user" | "ai";
  text?: string;
  typingDots?: boolean;
  startFrame?: number;
  /** Optional typewriter speed for English-only user prompt */
  typewriterCharsPerFrame?: number;
  fontSize?: number;
  maxWidth?: number | string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  text = "",
  typingDots = false,
  startFrame = 0,
  typewriterCharsPerFrame = 0,
  fontSize = 32,
  maxWidth = "86%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  const enter = spring({
    frame: localFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const opacity = interpolate(localFrame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (localFrame < -2) {
    return null;
  }

  const isUser = role === "user";

  let visibleText = text;
  if (typewriterCharsPerFrame > 0 && text.length > 0) {
    const chars = Math.max(
      0,
      Math.min(text.length, Math.floor(Math.max(0, localFrame - 4) * typewriterCharsPerFrame)),
    );
    visibleText = text.slice(0, chars);
  }

  const cursorVisible =
    typewriterCharsPerFrame > 0 &&
    visibleText.length < text.length &&
    Math.floor(Math.max(0, localFrame) / 8) % 2 === 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        width: "100%",
        opacity,
        translate: `0px ${interpolate(enter, [0, 1], [18, 0])}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          maxWidth,
          padding: "20px 28px",
          borderRadius: isUser ? "24px 24px 6px 24px" : "24px 24px 24px 6px",
          backgroundColor: isUser ? COLORS.aiSoft : COLORS.surfaceElevated,
          border: `1.5px solid ${isUser ? COLORS.aiBorder : COLORS.agiBorder}`,
          boxShadow: isUser
            ? `0 10px 30px ${COLORS.aiGlow}33`
            : `0 10px 30px rgba(0, 0, 0, 0.35)`,
        }}
      >
        {/* Role pill avatar */}
        <div
          style={{
            flexShrink: 0,
            width: 44,
            height: 44,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isUser ? `${COLORS.ai}28` : `${COLORS.agi}28`,
            border: `1.5px solid ${isUser ? COLORS.ai : COLORS.agi}`,
            fontFamily: FONTS.display,
            fontSize: 16,
            fontWeight: 800,
            color: isUser ? COLORS.ai : COLORS.agi,
          }}
        >
          {isUser ? "YOU" : "AI"}
        </div>

        {typingDots ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 6px" }}>
            {[0, 1, 2].map((dotIdx) => {
              const phase = Math.max(0, localFrame) * 0.22 - dotIdx * 1.1;
              const bounce = Math.sin(phase);
              const dotY = interpolate(bounce, [-1, 1], [3, -6]);
              const dotOp = interpolate(bounce, [-1, 1], [0.35, 1]);
              return (
                <div
                  key={dotIdx}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: COLORS.agi,
                    opacity: dotOp,
                    translate: `0px ${dotY}px`,
                    boxShadow: `0 0 10px ${COLORS.agi}`,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize,
              fontWeight: 600,
              color: COLORS.textPrimary,
              lineHeight: 1.35,
              letterSpacing: 0,
            }}
          >
            {visibleText}
            {cursorVisible ? (
              <span style={{ color: COLORS.ai, marginLeft: 3 }}>|</span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
