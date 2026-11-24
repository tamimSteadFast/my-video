import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, SHADOWS, SPRING_CONFIG } from "../theme";

export interface ConceptTagProps {
  readonly label: string;
  readonly color: string;
  readonly startFrame?: number;
  readonly subLabel?: string;
  readonly style?: React.CSSProperties;
}

export const ConceptTag: React.FC<ConceptTagProps> = ({
  label,
  color,
  startFrame = 0,
  subLabel,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame) return null;

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING_CONFIG.bouncy,
  });

  const scale = interpolate(progress, [0, 1], [0.4, 1]);
  const opacity = interpolate(progress, [0, 0.35], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 22px",
        borderRadius: 999,
        backgroundColor: `${color}26`,
        border: `2px solid ${color}`,
        boxShadow: SHADOWS.glow(color),
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: "center center",
        ...style,
      }}
    >
      <span
        style={{
          width: 11,
          height: 11,
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: FONTS.ui,
          fontSize: 23,
          fontWeight: 800,
          color: "#FFFFFF",
          letterSpacing: 0.4,
        }}
      >
        {label}
      </span>
      {subLabel ? (
        <span
          style={{
            fontFamily: FONTS.bangla,
            fontSize: 20,
            fontWeight: 600,
            color,
            letterSpacing: 0,
          }}
        >
          {subLabel}
        </span>
      ) : null}
    </div>
  );
};
