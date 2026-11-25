import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRING_CONFIGS } from "../../../config/theme";

interface WordByWordTextProps {
  text: string;
  startFrame?: number;
  framesPerWord?: number;
  fontSize: number;
  fontWeight?: number;
  color?: string;
  align?: "left" | "center" | "right";
  lineHeight?: number;
  /** Optional map of exact word (stripped of punctuation or full token) -> accent hex color */
  highlightWords?: Record<string, string>;
  maxWidth?: number | string;
}

/**
 * Bangla-safe kinetic text component.
 * ALWAYS splits by whitespace (word-by-word) and keeps letterSpacing: 0
 * so Bangla conjuncts (যুক্তাক্ষর) and vowel signs (কার/ফলা) never break.
 */
export const WordByWordText: React.FC<WordByWordTextProps> = ({
  text,
  startFrame = 0,
  framesPerWord = 5,
  fontSize,
  fontWeight = 700,
  color = COLORS.textPrimary,
  align = "center",
  lineHeight = 1.35,
  highlightWords = {},
  maxWidth = "100%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.trim().split(/\s+/);

  const justifyContent =
    align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent,
        columnGap: Math.round(fontSize * 0.28),
        rowGap: Math.round(fontSize * 0.14),
        maxWidth,
        fontFamily: FONTS.primary,
        fontSize,
        fontWeight,
        lineHeight,
        letterSpacing: 0,
      }}
    >
      {words.map((word, idx) => {
        const wordStart = startFrame + idx * framesPerWord;
        const progress = spring({
          frame: frame - wordStart,
          fps,
          config: SPRING_CONFIGS.snappy,
        });
        const opacity = interpolate(frame, [wordStart, wordStart + 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const yOffset = interpolate(progress, [0, 1], [22, 0]);

        const cleanKey = word.replace(/[?,।!—–]/g, "");
        const wordColor = highlightWords[word] ?? highlightWords[cleanKey] ?? color;
        const isHighlighted = Boolean(highlightWords[word] ?? highlightWords[cleanKey]);

        return (
          <span
            key={`${idx}-${word}`}
            style={{
              display: "inline-block",
              opacity,
              translate: `0px ${yOffset}px`,
              color: wordColor,
              textShadow: isHighlighted ? `0 0 28px ${wordColor}55` : "none",
              letterSpacing: 0,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
