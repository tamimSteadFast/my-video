import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, getLayoutMetrics } from "../../../config/theme";

interface ProgressBarProps {
  brandName?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ brandName = "AI শিখি" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);

  const progressPct = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Corner brand watermark */}
      <div
        style={{
          position: "absolute",
          top: metrics.isVertical ? 76 : 32,
          right: metrics.isVertical ? 44 : 44,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 18px",
          borderRadius: 999,
          backgroundColor: "rgba(11, 16, 32, 0.72)",
          border: `1px solid ${COLORS.borderBright}`,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.ai}, ${COLORS.agi})`,
            boxShadow: `0 0 10px ${COLORS.ai}`,
          }}
        />
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: metrics.isVertical ? 24 : 22,
            fontWeight: 700,
            color: COLORS.textPrimary,
            letterSpacing: 0,
          }}
        >
          {brandName}
        </span>
      </div>

      {/* Bottom progress track */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: metrics.isVertical ? 10 : 8,
          backgroundColor: "rgba(148, 163, 184, 0.16)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPct}%`,
            background: `linear-gradient(90deg, ${COLORS.ai}, ${COLORS.agi})`,
            boxShadow: `0 0 18px ${COLORS.aiGlow}`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
