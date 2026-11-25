import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, getLayoutMetrics, SPRING_CONFIGS } from "../../../config/theme";

export interface BulletItem {
  text: string;
  startFrame: number;
}

interface BulletListProps {
  items: BulletItem[];
  accentColor?: string;
}

export const BulletList: React.FC<BulletListProps> = ({ items, accentColor = COLORS.green }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: metrics.isVertical ? 24 : 20,
        width: "100%",
      }}
    >
      {items.map((item, idx) => {
        const localFrame = frame - item.startFrame;
        const enter = spring({
          frame: localFrame,
          fps,
          config: SPRING_CONFIGS.snappy,
        });
        const opacity = interpolate(localFrame, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const checkDraw = interpolate(localFrame, [4, 18], [32, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const slideX = interpolate(enter, [0, 1], [-32, 0]);

        return (
          <div
            key={`${idx}-${item.text}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: metrics.isVertical ? "24px 28px" : "22px 32px",
              borderRadius: 20,
              backgroundColor: COLORS.surface,
              border: `1.5px solid ${accentColor}44`,
              boxShadow: "0 10px 28px rgba(0, 0, 0, 0.30)",
              opacity,
              translate: `${slideX}px 0px`,
            }}
          >
            {/* Animated SVG checkmark badge */}
            <div
              style={{
                flexShrink: 0,
                width: metrics.isVertical ? 54 : 50,
                height: metrics.isVertical ? 54 : 50,
                borderRadius: "50%",
                backgroundColor: `${accentColor}20`,
                border: `2px solid ${accentColor}`,
                boxShadow: `0 0 18px ${accentColor}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4.5 4.5L19 7.5"
                  stroke={accentColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="32"
                  strokeDashoffset={checkDraw}
                />
              </svg>
            </div>

            <div
              style={{
                fontFamily: FONTS.primary,
                fontSize: metrics.isVertical ? 36 : 34,
                fontWeight: 600,
                color: COLORS.textPrimary,
                lineHeight: 1.3,
                letterSpacing: 0,
              }}
            >
              {item.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
