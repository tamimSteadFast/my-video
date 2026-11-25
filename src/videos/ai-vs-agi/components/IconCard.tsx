import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, getLayoutMetrics, SPRING_CONFIGS } from "../../../config/theme";
import { LockIcon } from "./Icons";

interface IconCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  accentColor?: string;
  startFrame?: number;
  locked?: boolean;
  highlighted?: boolean;
  dimmed?: boolean;
  compact?: boolean;
  extra?: React.ReactNode;
}

export const IconCard: React.FC<IconCardProps> = ({
  icon,
  title,
  subtitle,
  accentColor = COLORS.ai,
  startFrame = 0,
  locked = false,
  highlighted = false,
  dimmed = false,
  compact = false,
  extra,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);

  const localFrame = frame - startFrame;
  const enter = spring({
    frame: localFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const baseOpacity = interpolate(localFrame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalOpacity = dimmed ? baseOpacity * 0.42 : baseOpacity;
  const scale = interpolate(enter, [0, 1], [0.88, highlighted ? 1.03 : 1]);
  const y = interpolate(enter, [0, 1], [24, 0]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: compact ? "row" : "column",
        alignItems: compact ? "center" : "flex-start",
        gap: compact ? 18 : 14,
        padding: compact ? "20px 24px" : metrics.isVertical ? "26px 28px" : "28px 30px",
        borderRadius: 22,
        backgroundColor: highlighted ? COLORS.surfaceElevated : COLORS.surface,
        border: `1.5px solid ${highlighted ? accentColor : `${accentColor}44`}`,
        boxShadow: highlighted
          ? `0 0 36px ${accentColor}38, 0 14px 36px rgba(0,0,0,0.4)`
          : "0 12px 30px rgba(0, 0, 0, 0.32)",
        opacity: finalOpacity,
        scale: `${scale}`,
        translate: `0px ${y}px`,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {locked ? (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 10px",
            borderRadius: 999,
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: `1px solid ${COLORS.borderBright}`,
          }}
        >
          <LockIcon size={16} color={highlighted ? accentColor : COLORS.textMuted} />
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 13,
              fontWeight: 700,
              color: highlighted ? accentColor : COLORS.textMuted,
              letterSpacing: "0.04em",
            }}
          >
            ONLY 1 TASK
          </span>
        </div>
      ) : null}

      <div
        style={{
          flexShrink: 0,
          width: compact ? 54 : 64,
          height: compact ? 54 : 64,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `${accentColor}1C`,
          border: `1px solid ${accentColor}55`,
          boxShadow: `0 0 20px ${accentColor}26`,
        }}
      >
        {icon}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: compact ? metrics.cardTitleSize - 2 : metrics.cardTitleSize,
            fontWeight: 700,
            color: COLORS.textPrimary,
            lineHeight: 1.25,
            letterSpacing: 0,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: metrics.cardSubSize,
              fontWeight: 500,
              color: COLORS.textSecondary,
              lineHeight: 1.32,
              letterSpacing: 0,
            }}
          >
            {subtitle}
          </div>
        ) : null}
        {extra ? <div style={{ marginTop: 8 }}>{extra}</div> : null}
      </div>
    </div>
  );
};
