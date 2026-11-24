import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_CONFIG } from "../theme";

export interface PhoneNotification {
  readonly text: string;
  readonly startFrame: number;
  readonly accent?: string;
}

export interface PhoneCallProps {
  readonly caller: string;
  readonly notifications?: readonly PhoneNotification[];
  readonly scale?: number;
  readonly layout?: "row" | "column";
  readonly style?: React.CSSProperties;
}

export const PhoneCall: React.FC<PhoneCallProps> = ({
  caller,
  notifications = [],
  scale = 1,
  layout = "row",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Vibrating rotate ±3° on exact 8-frame loop
  const vibPhase = (frame % 8) / 8;
  const rotateDeg = Math.sin(vibPhase * Math.PI * 2) * 3;

  // Pulsing incoming ring arcs
  const ring1 = (frame % 24) / 24;
  const ring2 = ((frame + 12) % 24) / 24;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: layout,
        alignItems: "center",
        gap: layout === "column" ? 24 : 28,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        ...style,
      }}
    >
      {/* Vibrating Smartphone */}
      <div
        style={{
          position: "relative",
          width: 248,
          height: 452,
          transform: `rotate(${rotateDeg.toFixed(2)}deg)`,
          transformOrigin: "center center",
        }}
      >
        {/* Outer vibration wave arcs */}
        <svg
          width="320"
          height="490"
          viewBox="0 0 320 490"
          style={{
            position: "absolute",
            left: -36,
            top: -19,
            pointerEvents: "none",
          }}
        >
          <path
            d="M 24 140 Q 8 245 24 350"
            fill="none"
            stroke={COLORS.fail}
            strokeWidth="4"
            strokeLinecap="round"
            opacity={(1 - ring1) * 0.75}
          />
          <path
            d="M 10 160 Q -4 245 10 330"
            fill="none"
            stroke={COLORS.fail}
            strokeWidth="3"
            strokeLinecap="round"
            opacity={(1 - ring2) * 0.55}
          />
          <path
            d="M 296 140 Q 312 245 296 350"
            fill="none"
            stroke={COLORS.fail}
            strokeWidth="4"
            strokeLinecap="round"
            opacity={(1 - ring1) * 0.75}
          />
          <path
            d="M 310 160 Q 324 245 310 330"
            fill="none"
            stroke={COLORS.fail}
            strokeWidth="3"
            strokeLinecap="round"
            opacity={(1 - ring2) * 0.55}
          />
        </svg>

        {/* Phone Bezel */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 38,
            backgroundColor: "#11161F",
            border: `4px solid #30363D`,
            boxShadow: `${SHADOWS.glow(COLORS.fail)}, ${SHADOWS.card}`,
            padding: 14,
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
          }}
        >
          {/* Screen */}
          <div
            style={{
              flex: 1,
              borderRadius: 28,
              background:
                "linear-gradient(180deg, #1E1420 0%, #101521 60%, #0B0F17 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 16px 26px 16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Dynamic Notch */}
            <div
              style={{
                width: 72,
                height: 16,
                borderRadius: 999,
                backgroundColor: "#07090E",
              }}
            />

            {/* Incoming Call Badge + Avatar */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.fail,
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                }}
              >
                Incoming Call...
              </div>

              {/* Pulsing Avatar Circle */}
              <div style={{ position: "relative", width: 96, height: 96 }}>
                <div
                  style={{
                    position: "absolute",
                    inset: -Math.round(ring1 * 18),
                    borderRadius: "50%",
                    border: `2.5px solid ${COLORS.fail}`,
                    opacity: (1 - ring1) * 0.7,
                  }}
                />
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    backgroundColor: "#263042",
                    border: `3px solid ${COLORS.fail}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Generic silhouette icon */}
                  <svg width="54" height="54" viewBox="0 0 54 54">
                    <circle cx="27" cy="20" r="10" fill="#E6EDF3" />
                    <path
                      d="M 10 46 C 12 34 42 34 44 46"
                      fill="#E6EDF3"
                    />
                  </svg>
                </div>
              </div>

              <div
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 28,
                  fontWeight: 800,
                  color: COLORS.text,
                }}
              >
                {caller}
              </div>
              <div
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 14,
                  color: COLORS.muted,
                }}
              >
                Calling mobile...
              </div>
            </div>

            {/* Decline / Answer buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                padding: "0 12px",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: COLORS.fail,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 6px 16px ${COLORS.fail}66`,
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <path
                    d="M 6 6 L 18 18 M 18 6 L 6 18"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: COLORS.success,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 6px 16px ${COLORS.success}66`,
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <path
                    d="M 5 12 L 10 17 L 19 7"
                    fill="none"
                    stroke="#0D1117"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stacked Notification Bubbles */}
      {notifications.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            minWidth: 310,
          }}
        >
          {notifications.map((n, idx) => {
            if (frame < n.startFrame) return null;
            const pop = spring({
              frame: frame - n.startFrame,
              fps,
              config: SPRING_CONFIG.bouncy,
            });
            const tx = interpolate(pop, [0, 1], [-36, 0]);
            const sc = interpolate(pop, [0, 1], [0.75, 1]);
            const accent = n.accent ?? COLORS.fail;

            return (
              <div
                key={`${n.text}-${idx}`}
                style={{
                  padding: "16px 22px",
                  borderRadius: 20,
                  backgroundColor: COLORS.panel,
                  border: `2px solid ${accent}99`,
                  boxShadow: `${SHADOWS.glow(accent)}, ${SHADOWS.soft}`,
                  transform: `translateX(${tx}px) scale(${sc})`,
                  opacity: interpolate(pop, [0, 0.3], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: accent,
                    boxShadow: `0 0 12px ${accent}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONTS.bangla,
                    fontSize: 26,
                    fontWeight: 700,
                    color: COLORS.text,
                    letterSpacing: 0,
                  }}
                >
                  {n.text}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
