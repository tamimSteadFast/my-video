import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, getLayoutMetrics, SPRING_CONFIGS } from "../../../config/theme";

interface TitleProps {
  eyebrow?: string;
  heading: string;
  accentColor?: string;
  startFrame?: number;
  align?: "left" | "center";
  fontSize?: number;
}

export const Title: React.FC<TitleProps> = ({
  eyebrow,
  heading,
  accentColor = COLORS.ai,
  startFrame = 0,
  align = "center",
  fontSize,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);

  const badgeProgress = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const headingProgress = spring({
    frame: frame - (startFrame + 5),
    fps,
    config: SPRING_CONFIGS.smooth,
  });
  const barWidth = interpolate(frame, [startFrame + 8, startFrame + 24], [0, 110], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const alignItems = align === "center" ? "center" : "flex-start";
  const textAlign = align;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems,
        gap: metrics.isVertical ? 18 : 14,
        width: "100%",
      }}
    >
      {eyebrow ? (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 20px",
            borderRadius: 999,
            backgroundColor: `${accentColor}1A`,
            border: `1px solid ${accentColor}55`,
            fontFamily: FONTS.display,
            fontSize: metrics.badgeSize,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: accentColor,
            opacity: interpolate(badgeProgress, [0, 1], [0, 1]),
            translate: `0px ${interpolate(badgeProgress, [0, 1], [14, 0])}px`,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor: accentColor,
              boxShadow: `0 0 12px ${accentColor}`,
            }}
          />
          {eyebrow}
        </div>
      ) : null}

      <div
        style={{
          fontFamily: FONTS.primary,
          fontSize: fontSize ?? metrics.headingSize,
          fontWeight: 700,
          lineHeight: 1.22,
          letterSpacing: 0,
          color: COLORS.textPrimary,
          textAlign,
          opacity: interpolate(headingProgress, [0, 1], [0, 1]),
          translate: `0px ${interpolate(headingProgress, [0, 1], [20, 0])}px`,
        }}
      >
        {heading}
      </div>

      <div
        style={{
          height: 5,
          width: barWidth,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}55)`,
          boxShadow: `0 0 16px ${accentColor}77`,
        }}
      />
    </div>
  );
};
