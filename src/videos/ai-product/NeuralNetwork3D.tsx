import React from "react";
import { useCurrentFrame } from "remotion";
import { AIP_C, AIP_MONO } from "./narration";

interface NeuralNode {
  id: string;
  x: number;
  y: number;
  z: number;
  layer: number;
}

export const NeuralNetwork3D: React.FC<{
  readonly scale?: number;
  readonly active?: boolean;
  readonly primaryColor?: string;
  readonly secondaryColor?: string;
  readonly label?: string;
}> = ({
  scale = 1,
  active = true,
  primaryColor = AIP_C.cyan,
  secondaryColor = AIP_C.purple,
  label = "NEURAL INFERENCE ENGINE",
}) => {
  const frame = useCurrentFrame();

  // 3-layer architecture: 3 inputs, 4 hidden, 2 outputs
  const layers = [3, 4, 3];
  const layerSpacing = 160;
  const nodeSpacing = 90;

  const nodes: NeuralNode[] = [];
  layers.forEach((count, layerIndex) => {
    const startY = -((count - 1) * nodeSpacing) / 2;
    for (let i = 0; i < count; i++) {
      nodes.push({
        id: `L${layerIndex}-N${i}`,
        x: (layerIndex - 1) * layerSpacing,
        y: startY + i * nodeSpacing,
        z: (layerIndex - 1) * 40 + i * 15,
        layer: layerIndex,
      });
    }
  });

  // Calculate synapses between consecutive layers
  const synapses: { from: NeuralNode; to: NeuralNode; idx: number }[] = [];
  let sIndex = 0;
  for (let l = 0; l < layers.length - 1; l++) {
    const fromNodes = nodes.filter((n) => n.layer === l);
    const toNodes = nodes.filter((n) => n.layer === l + 1);
    fromNodes.forEach((fn) => {
      toNodes.forEach((tn) => {
        synapses.push({ from: fn, to: tn, idx: sIndex++ });
      });
    });
  }

  // Float animation
  const floatY = Math.sin(frame / 25) * 8;
  const floatRot = Math.cos(frame / 35) * 3;

  return (
    <div
      style={{
        position: "relative",
        width: 480 * scale,
        height: 380 * scale,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1200,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 440,
          height: 340,
          transform: `scale(${scale}) rotateX(32deg) rotateY(-22deg) rotateZ(${floatRot}deg) translateY(${floatY}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Synapse Lines SVG */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
          }}
          viewBox="-220 -170 440 340"
        >
          <defs>
            <linearGradient id="synapseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity={0.8} />
              <stop offset="100%" stopColor={secondaryColor} stopOpacity={0.8} />
            </linearGradient>
            <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {synapses.map(({ from, to, idx }) => {
            const pulsePhase = (frame * 2 + idx * 15) % 100;
            const photonProgress = pulsePhase / 100;
            const photonX = from.x + (to.x - from.x) * photonProgress;
            const photonY = from.y + (to.y - from.y) * photonProgress;

            const isFiring = active && pulsePhase < 40;

            return (
              <g key={`syn-${from.id}-${to.id}`}>
                {/* Connection line */}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="url(#synapseGrad)"
                  strokeWidth={isFiring ? 2 : 1.2}
                  strokeOpacity={isFiring ? 0.75 : 0.25}
                />
                {/* Moving data packet */}
                {active ? (
                  <circle
                    cx={photonX}
                    cy={photonY}
                    r={2.5}
                    fill={idx % 2 === 0 ? primaryColor : secondaryColor}
                    filter="url(#laserGlow)"
                    opacity={0.9}
                  />
                ) : null}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const nodeGlow =
              0.5 + 0.5 * Math.sin((frame * 4 + i * 20) / 15);
            const isInput = node.layer === 0;
            const isOutput = node.layer === layers.length - 1;
            const color = isInput
              ? primaryColor
              : isOutput
              ? secondaryColor
              : AIP_C.purpleSoft;

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                {/* Outer halo */}
                <circle
                  r={14}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  opacity={nodeGlow * 0.7}
                />
                {/* Solid core */}
                <circle
                  r={7}
                  fill={color}
                  filter="url(#laserGlow)"
                  opacity={0.95}
                />
                {/* Inner white spark */}
                <circle r={2.5} fill="#FFFFFF" opacity={nodeGlow} />
              </g>
            );
          })}
        </svg>

        {/* Floating Isometric Label Tag */}
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: "50%",
            transform: "translateX(-50%) translateZ(30px)",
            background: "rgba(7, 14, 40, 0.85)",
            border: `1px solid ${AIP_C.panelBorderCyan}`,
            borderRadius: 6,
            padding: "4px 14px",
            fontFamily: AIP_MONO,
            fontSize: 11,
            fontWeight: 700,
            color: primaryColor,
            letterSpacing: 1.5,
            whiteSpace: "nowrap",
            boxShadow: `0 0 16px rgba(0, 229, 255, 0.25)`,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};
