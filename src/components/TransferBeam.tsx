import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SHADOWS } from "../theme";

export interface TransferBeamProps {
  readonly from: readonly [number, number];
  readonly to: readonly [number, number];
  readonly label: string;
  readonly startFrame: number;
  readonly durationFrames?: number;
  readonly color?: string;
  readonly packetLabel?: string;
  /** Optional curvature height offset (negative curves upward) */
  readonly curveOffset?: number;
  readonly style?: React.CSSProperties;
}

export const TransferBeam: React.FC<TransferBeamProps> = ({
  from,
  to,
  label,
  startFrame,
  durationFrames = 65,
  color = COLORS.runner,
  packetLabel = "dist/",
  curveOffset = -90,
  style,
}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;

  const [x1, y1] = from;
  const [x2, y2] = to;
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 + curveOffset;

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );

  // Evaluate quadratic Bezier point at t = progress
  const t = progress;
  const oneMinusT = 1 - t;
  const px = oneMinusT * oneMinusT * x1 + 2 * oneMinusT * t * cx + t * t * x2;
  const py = oneMinusT * oneMinusT * y1 + 2 * oneMinusT * t * cy + t * t * y2;

  // Approximate path length for dash animation
  const approxLen = Math.hypot(x2 - x1, y2 - y1) * 1.25;
  const dashOffset = -(frame - startFrame) * 3.5;

  const labelOpacity = interpolate(
    frame,
    [startFrame, startFrame + 12],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const arrived = progress >= 0.98;
  const arrivalPulse = arrived
    ? interpolate(
        frame,
        [startFrame + durationFrames, startFrame + durationFrames + 18],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 0;

  // Midpoint on curve (t = 0.5) for label pill
  const labelX = 0.25 * x1 + 0.5 * cx + 0.25 * x2;
  const labelY = 0.25 * y1 + 0.5 * cy + 0.25 * y2 - 34;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        {/* Background faint track */}
        <path
          d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
          fill="none"
          stroke={color}
          strokeOpacity={0.22}
          strokeWidth={5}
          strokeLinecap="round"
        />

        {/* Animated dashed beam drawn with strokeDashoffset */}
        <path
          d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
          fill="none"
          stroke={color}
          strokeWidth={4.5}
          strokeDasharray="14 10"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          opacity={labelOpacity}
        />

        {/* Progress glow trail */}
        <path
          d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
          fill="none"
          stroke={COLORS.success}
          strokeWidth={3.5}
          strokeDasharray={`${approxLen}`}
          strokeDashoffset={approxLen * (1 - progress)}
          strokeLinecap="round"
          opacity={0.75}
        />

        {/* Arrival ripple ring */}
        {arrivalPulse > 0.01 ? (
          <circle
            cx={x2}
            cy={y2}
            r={16 + (1 - arrivalPulse) * 44}
            fill="none"
            stroke={COLORS.success}
            strokeWidth={3.5}
            opacity={arrivalPulse}
          />
        ) : null}

        {/* Traveling Folder Packet Icon */}
        <g transform={`translate(${px}, ${py})`}>
          <rect
            x={-34}
            y={-26}
            width={68}
            height={50}
            rx={12}
            fill={COLORS.panel}
            stroke={color}
            strokeWidth={2.5}
          />
          {/* Folder tab */}
          <path
            d="M -22 -12 L -8 -12 L -3 -6 L 22 -6 L 22 14 L -22 14 Z"
            fill={COLORS.vps}
          />
          <rect x={-22} y={-4} width={44} height={18} rx={3} fill="#F7A76C" />
        </g>
      </svg>

      {/* Traveling packet micro-label */}
      <div
        style={{
          position: "absolute",
          left: px,
          top: py + 32,
          transform: "translateX(-50%)",
          padding: "2px 10px",
          borderRadius: 999,
          backgroundColor: "#0D1117EE",
          border: `1px solid ${COLORS.vps}`,
          fontFamily: FONTS.code,
          fontSize: 14,
          fontWeight: 700,
          color: COLORS.vps,
          whiteSpace: "nowrap",
        }}
      >
        {packetLabel}
      </div>

      {/* Beam Route Label Pill */}
      <div
        style={{
          position: "absolute",
          left: labelX,
          top: labelY,
          transform: "translate(-50%, -50%)",
          padding: "8px 18px",
          borderRadius: 999,
          backgroundColor: COLORS.panel,
          border: `1.5px solid ${color}`,
          boxShadow: SHADOWS.glow(color),
          fontFamily: FONTS.code,
          fontSize: 18,
          fontWeight: 700,
          color: COLORS.text,
          opacity: labelOpacity,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};
