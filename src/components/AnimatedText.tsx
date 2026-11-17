import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, SPRING_HEADLINE, SPRING_UI } from "../shared/theme";

export const AnimatedText: React.FC<{
  readonly at?: number;
  readonly index?: number;
  readonly preset?: "headline" | "ui";
  readonly dy?: number;
  readonly scaleFrom?: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({
  at = 0,
  index = 0,
  preset = "headline",
  dy = 28,
  scaleFrom = 0.96,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered entrance: delay = index * 6 frames (§3)
  const delay = at + index * 6;
  const p = spring({
    frame: frame - delay,
    fps,
    config: preset === "headline" ? SPRING_HEADLINE : SPRING_UI,
  });

  const y = interpolate(p, [0, 1], [dy, 0]);
  const s = interpolate(p, [0, 1], [scaleFrom, 1]);

  return (
    <div
      style={{
        opacity: p,
        transform: `translate3d(0px, ${y}px, 0px) scale(${s})`,
        lineHeight: 1.15,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const PowerHighlight: React.FC<{
  readonly children: React.ReactNode;
  readonly color?: string;
}> = ({ children, color = C.accent }) => (
  <span
    style={{
      color,
      backgroundImage: `linear-gradient(135deg, ${color}, #88FFE0)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: 700,
    }}
  >
    {children}
  </span>
);
