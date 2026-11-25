import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../config/theme";

export type AccentMood = "mixed" | "ai" | "agi" | "amber" | "green";

interface AnimatedBackgroundProps {
  mood?: AccentMood;
}

const MOOD_ORBS: Record<AccentMood, [string, string]> = {
  mixed: [COLORS.ai, COLORS.agi],
  ai: [COLORS.ai, "#0EA5E9"],
  agi: [COLORS.agi, "#7C3AED"],
  amber: [COLORS.amber, COLORS.agi],
  green: [COLORS.green, COLORS.ai],
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ mood = "mixed" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const [primaryOrb, secondaryOrb] = MOOD_ORBS[mood];

  // Slow organic orbital drift
  const t = frame * 0.012;
  const orb1X = width * 0.22 + Math.sin(t) * (width * 0.08);
  const orb1Y = height * 0.24 + Math.cos(t * 0.8) * (height * 0.07);

  const orb2X = width * 0.78 + Math.cos(t * 0.9) * (width * 0.08);
  const orb2Y = height * 0.76 + Math.sin(t * 0.7) * (height * 0.07);

  const gridOffset = (frame * 0.45) % 72;
  const orbRadius = Math.max(width, height) * 0.42;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      {/* Subtle drifting architectural tech grid */}
      <div
        style={{
          position: "absolute",
          inset: -72,
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.055) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          translate: `${gridOffset}px ${gridOffset * 0.5}px`,
        }}
      />

      {/* Ambient primary glow orb */}
      <div
        style={{
          position: "absolute",
          left: orb1X - orbRadius,
          top: orb1Y - orbRadius,
          width: orbRadius * 2,
          height: orbRadius * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${primaryOrb}24 0%, ${primaryOrb}08 42%, transparent 72%)`,
        }}
      />

      {/* Ambient secondary glow orb */}
      <div
        style={{
          position: "absolute",
          left: orb2X - orbRadius,
          top: orb2Y - orbRadius,
          width: orbRadius * 2,
          height: orbRadius * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${secondaryOrb}22 0%, ${secondaryOrb}07 42%, transparent 72%)`,
        }}
      />

      {/* Soft cinematic edge vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 48%, transparent 48%, rgba(5, 8, 18, 0.68) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
