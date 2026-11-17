import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../shared/theme";

export const BackgroundGlow: React.FC<{
  readonly tint?: string;
  readonly secondaryTint?: string;
  readonly mockupGlow?: boolean;
}> = ({ tint = C.accentDeep, secondaryTint = C.blue, mockupGlow = false }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isPortrait = height > width;

  // Continuous ambient micro-movement (Senior Video Editor Protocol §1)
  const driftX = Math.sin(frame / 75) * 48;
  const driftY = Math.cos(frame / 95) * 36;
  const pulse = 0.88 + 0.12 * Math.sin(frame / 50);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
      {/* Ambient primary + secondary radial lighting */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(960px 760px at ${28 + driftX / 10}% ${16 + driftY / 12}%, ${tint}66, transparent 72%), radial-gradient(860px 720px at ${82 - driftX / 12}% ${88 - driftY / 10}%, ${secondaryTint}38, transparent 70%)`,
        }}
      />

      {/* Depth-of-field radial glow behind 3D Browser Mockups (§2) */}
      {mockupGlow ? (
        <div
          style={{
            position: "absolute",
            left: isPortrait ? "12%" : "44%",
            top: isPortrait ? "30%" : "16%",
            width: isPortrait ? "76%" : "52%",
            height: isPortrait ? "44%" : "68%",
            borderRadius: 999,
            background: `radial-gradient(circle, ${C.accent}40 0%, ${tint}55 45%, transparent 75%)`,
            filter: "blur(80px)",
            opacity: pulse,
            transform: `translate3d(${driftX * 0.4}px, ${driftY * 0.4}px, 0)`,
          }}
        />
      ) : null}

      {/* Crisp subtle studio grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.032) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.032) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, black 20%, transparent 90%)",
        }}
      />
    </AbsoluteFill>
  );
};
