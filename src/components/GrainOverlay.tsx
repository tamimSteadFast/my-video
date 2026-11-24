import React from "react";
import { AbsoluteFill } from "remotion";

// Deterministic subtle grain overlay at 4% opacity (no Math.random)
export const GrainOverlay: React.FC<{ readonly opacity?: number }> = ({
  opacity = 0.04,
}) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity,
        mixBlendMode: "overlay",
        zIndex: 999,
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <filter id="gh-actions-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.78"
            numOctaves="3"
            seed="42"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#gh-actions-grain-filter)"
        />
      </svg>
    </AbsoluteFill>
  );
};
