import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, LAYOUT, SHADOWS } from "../theme";

export interface TerminalLine {
  readonly text: string;
  readonly startFrame: number;
  /** If true, prints without shell prompt */
  readonly isOutput?: boolean;
  readonly color?: string;
  readonly charsPerFrame?: number;
  /** Alias for charsPerFrame */
  readonly typeSpeed?: number;
}

export interface TerminalProps {
  readonly lines: readonly TerminalLine[];
  readonly title?: string;
  readonly prompt?: string;
  readonly width?: number | string;
  readonly fontSize?: number;
  readonly style?: React.CSSProperties;
  /** When true, stops cursor blinking and fades in a faint "not responding" overlay */
  readonly frozen?: boolean;
  /** Optional frame when frozen overlay begins fading in (for smooth animation) */
  readonly frozenStartFrame?: number;
  readonly frozenLabel?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  lines,
  title = "zsh — my-react-app",
  prompt = "$ ",
  width = 860,
  fontSize = 26,
  style,
  frozen = false,
  frozenStartFrame,
  frozenLabel = "not responding",
}) => {
  const frame = useCurrentFrame();
  // When frozen=true, cursor stops blinking and stays locked solid
  const cursorVisible = frozen ? true : Math.floor(frame / 12) % 2 === 0;

  const frozenOpacity = frozen
    ? frozenStartFrame !== undefined
      ? interpolate(frame, [frozenStartFrame, frozenStartFrame + 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1
    : 0;

  // Determine the latest active line to attach blinking cursor
  let activeIdx = -1;
  lines.forEach((line, idx) => {
    if (frame >= line.startFrame) {
      activeIdx = idx;
    }
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        backgroundColor: "#0B0F17",
        borderRadius: LAYOUT.cardRadius,
        border: `1.5px solid ${frozen ? `${COLORS.fail}77` : COLORS.border}`,
        boxShadow: SHADOWS.card,
        overflow: "hidden",
        fontFamily: FONTS.code,
        ...style,
      }}
    >
      {/* Terminal Top Bar */}
      <div
        style={{
          height: 46,
          backgroundColor: "#141A24",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: 10,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        <div
          style={{
            marginLeft: 14,
            fontFamily: FONTS.ui,
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.muted,
          }}
        >
          {title}
        </div>
        {frozen ? (
          <div
            style={{
              marginLeft: "auto",
              padding: "3px 10px",
              borderRadius: 999,
              backgroundColor: `${COLORS.fail}24`,
              border: `1px solid ${COLORS.fail}66`,
              fontFamily: FONTS.ui,
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.fail,
              opacity: frozenOpacity,
            }}
          >
            {frozenLabel}
          </div>
        ) : null}
      </div>

      {/* Terminal Body */}
      <div
        style={{
          position: "relative",
          padding: "22px 26px 28px 26px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          minHeight: 160,
        }}
      >
        {lines.map((line, idx) => {
          if (frame < line.startFrame) return null;
          const speed = line.typeSpeed ?? line.charsPerFrame ?? 1.4;
          const elapsed = frame - line.startFrame;
          const revealed = Math.min(
            line.text.length,
            Math.floor(elapsed * speed),
          );
          const visibleText = line.text.slice(0, revealed);
          const isOutput = line.isOutput ?? false;
          const hasCheck = visibleText.includes("✓");

          return (
            <div
              key={`${line.startFrame}-${idx}`}
              style={{
                fontSize,
                lineHeight: 1.45,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {!isOutput ? (
                <span style={{ color: COLORS.runner, marginRight: 8, fontWeight: 700 }}>
                  {prompt}
                </span>
              ) : null}
              <span
                style={{
                  color:
                    line.color ??
                    (hasCheck
                      ? COLORS.success
                      : isOutput
                        ? COLORS.muted
                        : COLORS.text),
                  whiteSpace: "pre-wrap",
                }}
              >
                {visibleText}
              </span>
              {idx === activeIdx && cursorVisible ? (
                <span
                  style={{
                    display: "inline-block",
                    width: 13,
                    height: fontSize * 1.05,
                    backgroundColor: frozen ? COLORS.fail : COLORS.runner,
                    marginLeft: 4,
                    borderRadius: 2,
                    opacity: frozen ? 0.85 : 1,
                  }}
                />
              ) : null}
            </div>
          );
        })}

        {/* Faint "not responding" overlay when frozen */}
        {frozen && frozenOpacity > 0.01 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(13, 17, 23, 0.42)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              opacity: frozenOpacity,
            }}
          >
            <div
              style={{
                padding: "10px 22px",
                borderRadius: 12,
                backgroundColor: "rgba(22, 27, 34, 0.92)",
                border: `1.5px solid ${COLORS.fail}88`,
                color: COLORS.text,
                fontFamily: FONTS.ui,
                fontSize: Math.max(16, Math.round(fontSize * 0.78)),
                fontWeight: 700,
                letterSpacing: 0.4,
                boxShadow: "0 10px 28px rgba(0, 0, 0, 0.6)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: COLORS.fail,
                }}
              />
              {frozenLabel}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
