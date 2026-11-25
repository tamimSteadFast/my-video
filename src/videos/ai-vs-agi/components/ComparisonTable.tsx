import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, getLayoutMetrics, SPRING_CONFIGS } from "../../../config/theme";

export interface ComparisonRow {
  topic: string;
  narrowAi: string;
  agi: string;
  startFrame: number;
}

interface ComparisonTableProps {
  rows: ComparisonRow[];
  headerStartFrame?: number;
  focusColumn?: "none" | "ai" | "agi";
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  rows,
  headerStartFrame = 0,
  focusColumn = "none",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);

  const headerEnter = spring({
    frame: frame - headerStartFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const cellPad = metrics.isVertical ? "22px 18px" : "24px 30px";
  const headerSize = metrics.isVertical ? 28 : 30;
  const cellSize = metrics.isVertical ? 27 : 30;
  const gridCols = metrics.isVertical ? "0.95fr 1.15fr 1.25fr" : "0.9fr 1.25fr 1.35fr";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: metrics.isVertical ? 16 : 14,
        width: "100%",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: metrics.isVertical ? 10 : 16,
          opacity: interpolate(headerEnter, [0, 1], [0, 1]),
          translate: `0px ${interpolate(headerEnter, [0, 1], [16, 0])}px`,
        }}
      >
        <div
          style={{
            padding: cellPad,
            borderRadius: 16,
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            fontFamily: FONTS.primary,
            fontSize: headerSize,
            fontWeight: 700,
            color: COLORS.textMuted,
            letterSpacing: 0,
          }}
        >
          বিষয়
        </div>

        <div
          style={{
            padding: cellPad,
            borderRadius: 16,
            backgroundColor: focusColumn === "ai" ? `${COLORS.ai}26` : COLORS.aiSoft,
            border: `2px solid ${focusColumn === "ai" ? COLORS.ai : COLORS.aiBorder}`,
            boxShadow: focusColumn === "ai" ? `0 0 28px ${COLORS.aiGlow}` : "none",
            fontFamily: FONTS.display,
            fontSize: headerSize,
            fontWeight: 800,
            color: COLORS.ai,
            textAlign: "center",
          }}
        >
          Narrow AI
        </div>

        <div
          style={{
            padding: cellPad,
            borderRadius: 16,
            backgroundColor: focusColumn === "agi" ? `${COLORS.agi}26` : COLORS.agiSoft,
            border: `2px solid ${focusColumn === "agi" ? COLORS.agi : COLORS.agiBorder}`,
            boxShadow: focusColumn === "agi" ? `0 0 28px ${COLORS.agiGlow}` : "none",
            fontFamily: FONTS.display,
            fontSize: headerSize,
            fontWeight: 800,
            color: COLORS.agi,
            textAlign: "center",
          }}
        >
          AGI
        </div>
      </div>

      {/* Data Rows */}
      {rows.map((row) => {
        const rowEnter = spring({
          frame: frame - row.startFrame,
          fps,
          config: SPRING_CONFIGS.snappy,
        });
        const opacity = interpolate(frame, [row.startFrame, row.startFrame + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const slideX = interpolate(rowEnter, [0, 1], [-42, 0]);

        return (
          <div
            key={row.topic}
            style={{
              display: "grid",
              gridTemplateColumns: gridCols,
              gap: metrics.isVertical ? 10 : 16,
              opacity,
              translate: `${slideX}px 0px`,
            }}
          >
            <div
              style={{
                padding: cellPad,
                borderRadius: 16,
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                fontFamily: FONTS.primary,
                fontSize: cellSize,
                fontWeight: 700,
                color: COLORS.textPrimary,
                display: "flex",
                alignItems: "center",
                lineHeight: 1.3,
                letterSpacing: 0,
              }}
            >
              {row.topic}
            </div>

            <div
              style={{
                padding: cellPad,
                borderRadius: 16,
                backgroundColor:
                  focusColumn === "ai" ? "rgba(34, 211, 238, 0.14)" : "rgba(34, 211, 238, 0.07)",
                border: `1.5px solid ${
                  focusColumn === "ai" ? COLORS.ai : "rgba(34, 211, 238, 0.28)"
                }`,
                fontFamily: FONTS.primary,
                fontSize: cellSize,
                fontWeight: 600,
                color: COLORS.textPrimary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                lineHeight: 1.3,
                letterSpacing: 0,
              }}
            >
              {row.narrowAi}
            </div>

            <div
              style={{
                padding: cellPad,
                borderRadius: 16,
                backgroundColor:
                  focusColumn === "agi" ? "rgba(167, 139, 250, 0.16)" : "rgba(167, 139, 250, 0.08)",
                border: `1.5px solid ${
                  focusColumn === "agi" ? COLORS.agi : "rgba(167, 139, 250, 0.30)"
                }`,
                fontFamily: FONTS.primary,
                fontSize: cellSize,
                fontWeight: 600,
                color: COLORS.textPrimary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                lineHeight: 1.3,
                letterSpacing: 0,
              }}
            >
              {row.agi}
            </div>
          </div>
        );
      })}
    </div>
  );
};
