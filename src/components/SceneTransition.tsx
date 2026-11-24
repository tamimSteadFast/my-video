import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

export interface SceneTransitionProps {
  /** Accent strip color for the 12-frame wipe */
  readonly accentColor?: string;
  /** Total duration in frames (default 12) */
  readonly durationInFrames?: number;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  accentColor = COLORS.job,
  durationInFrames = 12,
}) => {
  const frame = useCurrentFrame();

  // First 6 frames sweep panel in across screen; next 6 frames sweep it out
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Panel slides from -115% to +115% so at progress=0.5 it completely covers the cut
  const translateX = interpolate(progress, [0, 1], [-115, 115]);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 800,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -80,
          bottom: -80,
          left: 0,
          width: "118%",
          transform: `translateX(${translateX}%) skewX(-6deg)`,
          backgroundColor: COLORS.bg,
          borderLeft: `14px solid ${accentColor}`,
          borderRight: `14px solid ${COLORS.event}`,
          boxShadow: `0 0 60px rgba(0, 0, 0, 0.85)`,
        }}
      />
    </AbsoluteFill>
  );
};
