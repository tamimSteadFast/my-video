import React from "react";
import { useCurrentFrame } from "remotion";
import { AIP_C } from "./narration";

export const IsometricGrid: React.FC<{
  readonly opacity?: number;
  readonly pulseColor?: "cyan" | "purple";
}> = ({ opacity = 0.6, pulseColor = "cyan" }) => {
  const frame = useCurrentFrame();

  // Slow ambient drift
  const gridShift = (frame * 0.8) % 80;

  const primaryGlow = pulseColor === "cyan" ? AIP_C.cyan : AIP_C.purple;

  return (
    <div
      style={{
        position: "absolute",
        inset: -400,
        pointerEvents: "none",
        opacity,
        overflow: "hidden",
        perspective: 1600,
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Isometric Plane */}
      <div
        style={{
          position: "absolute",
          width: "140%",
          height: "140%",
          left: "-20%",
          top: "10%",
          transform: "rotateX(62deg) rotateZ(-35deg) translateZ(-60px)",
          transformOrigin: "center center",
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.12) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.12) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: `${gridShift}px ${gridShift}px`,
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)",
        }}
      >
        {/* Glowing Isometric Node Markers */}
        {[
          { x: 320, y: 400 },
          { x: 640, y: 720 },
          { x: 960, y: 480 },
          { x: 1280, y: 800 },
          { x: 1600, y: 560 },
          { x: 1920, y: 880 },
          { x: 2240, y: 640 },
          { x: 2560, y: 960 },
        ].map((pt, i) => {
          const delay = i * 7;
          const nodePulse =
            0.4 + 0.6 * Math.sin((frame + delay) / 12);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: pt.x,
                top: pt.y,
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: i % 2 === 0 ? AIP_C.cyan : AIP_C.purple,
                boxShadow: `0 0 16px ${
                  i % 2 === 0 ? AIP_C.cyan : AIP_C.purple
                }, 0 0 32px ${primaryGlow}`,
                opacity: nodePulse,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
