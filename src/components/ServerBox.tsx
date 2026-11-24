import React from "react";
import { random, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SHADOWS } from "../theme";

export type ServerBoxSize = "small" | "large";
export type ServerBoxStatus = "healthy" | "stressed" | "down";

export interface ServerBoxProps {
  readonly label: string;
  readonly subLabel?: string;
  readonly size?: ServerBoxSize;
  readonly status?: ServerBoxStatus;
  readonly scale?: number;
  readonly style?: React.CSSProperties;
}

export const ServerBox: React.FC<ServerBoxProps> = ({
  label,
  subLabel,
  size = "small",
  status = "healthy",
  scale = 1,
  style,
}) => {
  const frame = useCurrentFrame();

  const isLarge = size === "large";
  const accentColor = isLarge ? COLORS.runner : COLORS.vps;
  const rackW = isLarge ? 250 : 184;
  const rackH = isLarge ? 210 : 148;
  const bayCount = isLarge ? 4 : 2;

  // Deterministic stress jitter
  const jitterX =
    status === "stressed" ? Math.sin(frame * 1.9) * 2.5 : 0;
  const jitterY =
    status === "stressed" ? Math.cos(frame * 2.3) * 1.6 : 0;

  // LED color & blink logic
  const ledColor =
    status === "healthy"
      ? COLORS.success
      : status === "stressed"
        ? COLORS.vps
        : COLORS.fail;

  const getLedOpacity = (idx: number) => {
    if (status === "down") return 0.95; // solid red
    if (status === "stressed") {
      // Fast-blinking orange
      return ((frame + idx * 3) % 8) < 4 ? 1 : 0.2;
    }
    // Gentle green blinking
    return ((frame + idx * 14) % 36) < 24 ? 1 : 0.25;
  };

  // Smoke puffs when status="down" (deterministic via Remotion random)
  const smokePuffs =
    status === "down"
      ? Array.from({ length: 6 }).map((_, i) => {
          const cycle = (frame * 1.3 + i * 16) % 90;
          const t = cycle / 90;
          const seedX = (random(`smoke-x-${label}-${i}`) - 0.5) * 70;
          const x = rackW / 2 + seedX + Math.sin(t * Math.PI * 2 + i) * 10;
          const y = 30 - t * 92;
          const r = 10 + t * 22;
          const op = t < 0.2 ? (t / 0.2) * 0.55 : (1 - t) * 0.55;
          return { x, y, r, op };
        })
      : [];

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        transform: `scale(${scale}) translate(${jitterX.toFixed(1)}px, ${jitterY.toFixed(1)}px)`,
        transformOrigin: "center bottom",
        ...style,
      }}
    >
      <div style={{ position: "relative", width: rackW, height: rackH + 40 }}>
        <svg
          width={rackW}
          height={rackH + 40}
          viewBox={`0 0 ${rackW} ${rackH + 40}`}
          style={{ overflow: "visible" }}
        >
          {/* Smoke puffs above rack when down */}
          {smokePuffs.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#9CA3AF"
              opacity={p.op}
            />
          ))}

          {/* Cloud halo behind Large Runner server */}
          {isLarge ? (
            <g opacity={0.22}>
              <circle cx={rackW * 0.26} cy={52} r={34} fill={accentColor} />
              <circle cx={rackW * 0.52} cy={38} r={42} fill={accentColor} />
              <circle cx={rackW * 0.76} cy={54} r={30} fill={accentColor} />
            </g>
          ) : null}

          {/* Ground shadow */}
          <ellipse
            cx={rackW / 2}
            cy={rackH + 34}
            rx={rackW * 0.44}
            ry={10}
            fill="rgba(0,0,0,0.4)"
          />

          {/* Main Server Chassis */}
          <rect
            x={8}
            y={34}
            width={rackW - 16}
            height={rackH - 6}
            rx={20}
            fill={COLORS.panel}
            stroke={status === "down" ? COLORS.fail : accentColor}
            strokeWidth={3}
          />

          {/* Top accent bar */}
          <rect
            x={26}
            y={34}
            width={rackW - 52}
            height={5}
            rx={2.5}
            fill={status === "down" ? COLORS.fail : accentColor}
          />

          {/* Drive Bays */}
          {Array.from({ length: bayCount }).map((_, idx) => {
            const bayGap = 10;
            const innerTop = 52;
            const availH = rackH - 36;
            const bayH = (availH - bayGap * (bayCount - 1)) / bayCount;
            const by = innerTop + idx * (bayH + bayGap);
            const ledOp = getLedOpacity(idx);

            return (
              <g key={idx}>
                <rect
                  x={22}
                  y={by}
                  width={rackW - 44}
                  height={bayH}
                  rx={10}
                  fill="#0D1117"
                  stroke={COLORS.border}
                  strokeWidth={1.5}
                />
                {/* Vent slots on left */}
                {[0, 1, 2, 3].map((v) => (
                  <rect
                    key={v}
                    x={34 + v * 11}
                    y={by + bayH / 2 - 6}
                    width={5}
                    height={12}
                    rx={2.5}
                    fill="#30363D"
                  />
                ))}
                {/* Status LEDs on right */}
                <circle
                  cx={rackW - 58}
                  cy={by + bayH / 2}
                  r={5.5}
                  fill={ledColor}
                  opacity={ledOp}
                />
                <circle
                  cx={rackW - 40}
                  cy={by + bayH / 2}
                  r={4}
                  fill={status === "down" ? COLORS.fail : accentColor}
                  opacity={status === "down" ? 0.9 : 0.65}
                />
              </g>
            );
          })}

          {/* Warning badge on down server */}
          {status === "down" ? (
            <g transform={`translate(${rackW - 34}, 24)`}>
              <circle cx={0} cy={0} r={18} fill={COLORS.fail} />
              <path
                d="M -6 -6 L 6 6 M 6 -6 L -6 6"
                stroke="#FFFFFF"
                strokeWidth={3.2}
                strokeLinecap="round"
              />
            </g>
          ) : null}
        </svg>
      </div>

      {/* Label Pill */}
      <div
        style={{
          textAlign: "center",
          padding: "7px 18px",
          borderRadius: 12,
          backgroundColor: COLORS.bg,
          border: `2px solid ${status === "down" ? COLORS.fail : accentColor}`,
          boxShadow: SHADOWS.soft,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.ui,
            fontSize: isLarge ? 20 : 18,
            fontWeight: 800,
            color: COLORS.text,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
        {subLabel ? (
          <div
            style={{
              fontFamily: FONTS.bangla,
              fontSize: 15,
              fontWeight: 600,
              color: accentColor,
              marginTop: 2,
            }}
          >
            {subLabel}
          </div>
        ) : null}
      </div>
    </div>
  );
};
