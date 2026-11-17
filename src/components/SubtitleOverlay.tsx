import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FPS, LEAD_SEC, SPRING_UI } from "../shared/theme";
import type { Caption } from "../shared/captions";

export const SubtitleOverlay: React.FC<{
  readonly captions: readonly Caption[];
}> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const isPortrait = height > width;

  const t = frame / FPS - LEAD_SEC;
  const cur = captions.find((c) => t >= c.startSec && t < c.endSec);
  if (!cur) return null;

  const phraseStartFrame = Math.round((LEAD_SEC + cur.startSec) * FPS);
  const pop = spring({
    frame: frame - phraseStartFrame,
    fps,
    config: SPRING_UI,
  });

  const op = interpolate(
    t,
    [cur.startSec, cur.startSec + 0.14, cur.endSec - 0.1, cur.endSec],
    [0, 1, 1, 0.75],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const y = interpolate(pop, [0, 1], [14, 0]);
  const s = interpolate(pop, [0, 1], [0.97, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: isPortrait ? 190 : 44,
        display: "flex",
        justifyContent: "center",
        padding: isPortrait ? "0 56px" : "0 180px",
        opacity: op,
        transform: `translate3d(0px, ${y}px, 0px) scale(${s})`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 999,
          padding: isPortrait ? "20px 38px" : "15px 36px",
          color: C.text,
          fontSize: isPortrait ? 46 : 38,
          fontWeight: 600,
          lineHeight: 1.32,
          textAlign: "center",
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.55)",
        }}
      >
        {cur.text}
      </div>
    </div>
  );
};
