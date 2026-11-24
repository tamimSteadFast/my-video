import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_CONFIG } from "../theme";

export interface RamJarBlock {
  readonly label: string;
  /** Relative height in px inside the 360px-tall jar */
  readonly height: number;
  readonly dropFrame: number;
  readonly color: string;
}

export interface RamJarProps {
  readonly capacityLabel?: string;
  readonly blocks: readonly RamJarBlock[];
  readonly overflowFrame: number;
  /** Optional index of a block that shatters at shatterFrame (e.g. OOM Killer hits Build) */
  readonly shatterBlockIndex?: number;
  readonly shatterFrame?: number;
  /** Optional index of a block that cracks & flickers at crackFrame (e.g. Website) */
  readonly crackBlockIndex?: number;
  readonly crackFrame?: number;
  readonly width?: number;
  readonly height?: number;
  readonly style?: React.CSSProperties;
}

export const RamJar: React.FC<RamJarProps> = ({
  capacityLabel = "1 GB",
  blocks,
  overflowFrame,
  shatterBlockIndex,
  shatterFrame,
  crackBlockIndex,
  crackFrame,
  width = 340,
  height = 420,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const jarInnerW = width - 48;
  const jarInnerH = height - 76; // usable capacity up to rim line
  const isOverflowing = frame >= overflowFrame;
  const overflowFlash = isOverflowing
    ? 0.5 + 0.5 * Math.sin((frame - overflowFrame) * 0.45)
    : 0;
  const spillProgress = isOverflowing
    ? spring({
        frame: frame - overflowFrame,
        fps,
        config: SPRING_CONFIG.bouncy,
      })
    : 0;

  // Compute stacked bottom position for each block
  let runningY = 0;
  const blockLayouts = blocks.map((b, idx) => {
    const bottom = runningY;
    runningY += b.height + 6;
    const exceedsRim = bottom + b.height > jarInnerH - 8;
    return { ...b, idx, bottom, exceedsRim };
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height: height + 54,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        ...style,
      }}
    >
      {/* Capacity Badge at Rim */}
      <div
        style={{
          position: "absolute",
          top: 52,
          right: -18,
          zIndex: 30,
          padding: "5px 14px",
          borderRadius: 999,
          backgroundColor: isOverflowing ? COLORS.fail : COLORS.vps,
          color: "#0D1117",
          fontFamily: FONTS.code,
          fontSize: 17,
          fontWeight: 800,
          boxShadow: SHADOWS.soft,
        }}
      >
        MAX {capacityLabel}
      </div>

      {/* Glass Jar Container */}
      <div
        style={{
          position: "relative",
          width,
          height,
          borderRadius: "16px 16px 34px 34px",
          border: `4px solid ${
            isOverflowing
              ? `rgba(248, 81, 73, ${(0.65 + overflowFlash * 0.35).toFixed(2)})`
              : "rgba(139, 148, 158, 0.55)"
          }`,
          borderTop: "none",
          background: isOverflowing
            ? `linear-gradient(180deg, rgba(248, 81, 73, ${(
                0.08 +
                overflowFlash * 0.14
              ).toFixed(2)}) 0%, rgba(22, 27, 34, 0.78) 100%)`
            : "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(22,27,34,0.72) 100%)",
          boxShadow: isOverflowing
            ? SHADOWS.glow(COLORS.fail)
            : SHADOWS.card,
          boxSizing: "border-box",
        }}
      >
        {/* Jar Top Rim Lip */}
        <div
          style={{
            position: "absolute",
            top: -8,
            left: -12,
            right: -12,
            height: 16,
            borderRadius: 999,
            backgroundColor: isOverflowing ? COLORS.fail : "#484F58",
            border: "2px solid rgba(255,255,255,0.22)",
            zIndex: 25,
          }}
        />

        {/* Capacity Dashed Line near top */}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 10,
            right: 10,
            borderTop: `2px dashed ${isOverflowing ? COLORS.fail : COLORS.vps}`,
            opacity: 0.85,
            zIndex: 15,
          }}
        />

        {/* Glass reflection highlight */}
        <div
          style={{
            position: "absolute",
            top: 26,
            bottom: 30,
            left: 14,
            width: 10,
            borderRadius: 999,
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            pointerEvents: "none",
            zIndex: 22,
          }}
        />

        {/* Dropped Blocks */}
        {blockLayouts.map((b) => {
          if (frame < b.dropFrame) return null;

          const dropSpring = spring({
            frame: frame - b.dropFrame,
            fps,
            config: { damping: 13, stiffness: 150, mass: 1.0 },
          });

          const isShattered =
            shatterBlockIndex === b.idx &&
            shatterFrame !== undefined &&
            frame >= shatterFrame;

          const isCracked =
            crackBlockIndex === b.idx &&
            crackFrame !== undefined &&
            frame >= crackFrame;

          // Gravity drop from above jar rim into stacked position
          const startBottom = height + 90;
          const currentBottom = interpolate(
            dropSpring,
            [0, 1],
            [startBottom, 16 + b.bottom],
          );

          // Spill tilt & slide when overflowing
          const spillRotate =
            b.exceedsRim && isOverflowing
              ? interpolate(spillProgress, [0, 1], [0, 14])
              : 0;
          const spillShiftX =
            b.exceedsRim && isOverflowing
              ? interpolate(spillProgress, [0, 1], [0, 26])
              : 0;

          // Crack flicker for Website block
          const crackFlicker = isCracked
            ? (frame - (crackFrame ?? 0)) % 6 < 3
              ? 0.45
              : 0.95
            : 1;

          // Shatter fragments
          if (isShattered && shatterFrame !== undefined) {
            const elapsed = frame - shatterFrame;
            const fragOpacity = interpolate(elapsed, [0, 24, 38], [1, 0.75, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={`${b.label}-${b.idx}-shatter`}
                style={{
                  position: "absolute",
                  left: 20,
                  bottom: currentBottom,
                  width: jarInnerW,
                  height: b.height,
                  pointerEvents: "none",
                  zIndex: 20,
                }}
              >
                {Array.from({ length: 8 }).map((_, fi) => {
                  const vx = (random(`sh-vx-${fi}`) - 0.5) * 190;
                  const vy = -60 - random(`sh-vy-${fi}`) * 110;
                  const rot = (random(`sh-r-${fi}`) - 0.5) * 260;
                  const t = elapsed / 24;
                  const dx = vx * t;
                  const dy = vy * t + 140 * t * t;
                  return (
                    <div
                      key={fi}
                      style={{
                        position: "absolute",
                        left: `${(fi % 4) * 24 + 4}%`,
                        top: `${Math.floor(fi / 4) * 46 + 4}%`,
                        width: 44,
                        height: 28,
                        borderRadius: 6,
                        backgroundColor: b.color,
                        opacity: fragOpacity,
                        transform: `translate(${dx}px, ${dy}px) rotate(${rot * t}deg)`,
                      }}
                    />
                  );
                })}
              </div>
            );
          }

          return (
            <div
              key={`${b.label}-${b.idx}`}
              style={{
                position: "absolute",
                left: 20,
                bottom: currentBottom,
                width: jarInnerW,
                height: b.height,
                borderRadius: 14,
                backgroundColor: b.color,
                border: `2px solid rgba(255,255,255,0.22)`,
                boxShadow: "0 8px 18px rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateX(${spillShiftX}px) rotate(${spillRotate}deg)`,
                opacity: crackFlicker,
                zIndex: b.exceedsRim ? 18 : 10,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.code,
                  fontSize: b.height < 52 ? 18 : 22,
                  fontWeight: 800,
                  color: "#0D1117",
                  letterSpacing: 0.3,
                }}
              >
                {b.label}
              </span>

              {/* Crack zigzag lines on Website block */}
              {isCracked ? (
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 280 80"
                  preserveAspectRatio="none"
                  style={{ position: "absolute", inset: 0 }}
                >
                  <path
                    d="M 85 0 L 105 26 L 90 48 L 116 80 M 195 0 L 178 32 L 196 54 L 182 80"
                    fill="none"
                    stroke="#0D1117"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
