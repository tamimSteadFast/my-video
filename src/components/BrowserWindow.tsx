import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, LAYOUT_WIDE, SHADOWS, SPRING_CONFIG } from "../theme";

export type BrowserWindowState = "loading" | "ok" | "error502" | "newVersion";

export interface BrowserWindowProps {
  readonly url: string;
  readonly state: BrowserWindowState;
  /** Optional frame at which badge/state pops in */
  readonly stateChangeFrame?: number;
  readonly width?: number | string;
  readonly height?: number;
  readonly style?: React.CSSProperties;
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({
  url,
  state,
  stateChangeFrame = 0,
  width = 720,
  height = 440,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgePop =
    state === "newVersion"
      ? spring({
          frame: Math.max(0, frame - stateChangeFrame),
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 1;

  const loadingBarPct = ((frame * 3.5) % 100);
  const pulse = 0.55 + 0.45 * Math.sin(frame * 0.22);

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: state === "error502" ? "#FFFFFF" : COLORS.panel,
        borderRadius: LAYOUT_WIDE.cardRadius,
        border: `1.5px solid ${
          state === "error502"
            ? `${COLORS.fail}88`
            : state === "newVersion"
              ? `${COLORS.success}88`
              : COLORS.border
        }`,
        boxShadow:
          state === "error502"
            ? SHADOWS.glow(COLORS.fail)
            : state === "newVersion"
              ? SHADOWS.glow(COLORS.success)
              : SHADOWS.card,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: FONTS.ui,
        ...style,
      }}
    >
      {/* Generic Browser Chrome */}
      <div
        style={{
          height: 52,
          backgroundColor: "#141A24",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: 14,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>

        {/* Generic back/refresh arrows */}
        <div style={{ display: "flex", gap: 8, color: COLORS.muted, fontSize: 16 }}>
          <span>←</span>
          <span>↻</span>
        </div>

        {/* URL Bar */}
        <div
          style={{
            flex: 1,
            height: 32,
            borderRadius: 999,
            backgroundColor: "#0D1117",
            border: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
            fontSize: 15,
            fontFamily: FONTS.code,
            color: state === "error502" ? COLORS.fail : COLORS.text,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor:
                state === "error502"
                  ? COLORS.fail
                  : state === "loading"
                    ? COLORS.running
                    : COLORS.success,
              flexShrink: 0,
            }}
          />
          <span>https://{url}</span>
        </div>
      </div>

      {/* Loading progress bar */}
      {state === "loading" ? (
        <div style={{ height: 4, backgroundColor: "#1C2128", width: "100%" }}>
          <div
            style={{
              height: "100%",
              width: `${loadingBarPct}%`,
              backgroundColor: COLORS.job,
            }}
          />
        </div>
      ) : null}

      {/* Viewport Content */}
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {state === "error502" ? (
          <div
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF",
              color: "#1F2328",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 32,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 42,
                fontWeight: 800,
                color: "#1F2328",
                letterSpacing: -0.5,
              }}
            >
              502 Bad Gateway
            </div>
            <div
              style={{
                width: "72%",
                height: 1.5,
                backgroundColor: "#D0D7DE",
                margin: "18px 0 12px 0",
              }}
            />
            <div
              style={{
                fontFamily: FONTS.code,
                fontSize: 18,
                color: "#656D76",
              }}
            >
              nginx
            </div>
          </div>
        ) : state === "loading" ? (
          <div
            style={{
              flex: 1,
              backgroundColor: "#0F141C",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                height: 36,
                width: "42%",
                borderRadius: 10,
                backgroundColor: "#21262D",
                opacity: pulse,
              }}
            />
            <div
              style={{
                height: 130,
                width: "100%",
                borderRadius: 16,
                backgroundColor: "#161B22",
                opacity: pulse,
              }}
            />
            <div style={{ display: "flex", gap: 16, flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  borderRadius: 14,
                  backgroundColor: "#161B22",
                  opacity: pulse,
                }}
              />
              <div
                style={{
                  flex: 1,
                  borderRadius: 14,
                  backgroundColor: "#161B22",
                  opacity: pulse,
                }}
              />
            </div>
          </div>
        ) : (
          /* "ok" or "newVersion" mock site */
          <div
            style={{
              flex: 1,
              background:
                state === "newVersion"
                  ? "linear-gradient(180deg, #0E1726 0%, #0D1117 100%)"
                  : "linear-gradient(180deg, #131924 0%, #0D1117 100%)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Mock Navbar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 12,
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    backgroundColor:
                      state === "newVersion" ? COLORS.success : COLORS.job,
                  }}
                />
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: COLORS.text,
                  }}
                >
                  Client Shop
                </span>
                {state === "newVersion" ? (
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: 999,
                      backgroundColor: COLORS.success,
                      color: "#0D1117",
                      fontSize: 15,
                      fontWeight: 800,
                      transform: `scale(${interpolate(badgePop, [0, 1], [0.3, 1])})`,
                      boxShadow: `0 0 18px ${COLORS.success}88`,
                    }}
                  >
                    v2.0
                  </span>
                ) : (
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 999,
                      backgroundColor: `${COLORS.muted}28`,
                      color: COLORS.muted,
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    v1.0
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 48, height: 10, borderRadius: 5, backgroundColor: "#30363D" }} />
                <div style={{ width: 48, height: 10, borderRadius: 5, backgroundColor: "#30363D" }} />
              </div>
            </div>

            {/* Mock Hero Card */}
            <div
              style={{
                padding: 20,
                borderRadius: 16,
                backgroundColor:
                  state === "newVersion" ? `${COLORS.success}16` : "#161B22",
                border: `1.5px solid ${
                  state === "newVersion" ? `${COLORS.success}66` : COLORS.border
                }`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: COLORS.text,
                  }}
                >
                  {state === "newVersion"
                    ? "New Dashboard · Live"
                    : "Storefront Online"}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: COLORS.muted,
                    marginTop: 4,
                  }}
                >
                  {state === "newVersion"
                    ? "Zero-downtime deploy via rsync"
                    : "Serving static assets via Nginx"}
                </div>
              </div>
              <div
                style={{
                  padding: "8px 16px",
                  borderRadius: 10,
                  backgroundColor:
                    state === "newVersion" ? COLORS.success : COLORS.job,
                  color: "#0D1117",
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                {state === "newVersion" ? "LIVE ✓" : "200 OK"}
              </div>
            </div>

            {/* Mock Content Cards */}
            <div style={{ display: "flex", gap: 14, flex: 1 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    borderRadius: 14,
                    backgroundColor: "#161B22",
                    border: `1px solid ${COLORS.border}`,
                    padding: 14,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "55%",
                      height: 10,
                      borderRadius: 5,
                      backgroundColor:
                        state === "newVersion" && i === 0
                          ? COLORS.success
                          : "#30363D",
                    }}
                  />
                  <div
                    style={{
                      width: "85%",
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#21262D",
                    }}
                  />
                  <div
                    style={{
                      width: "40%",
                      height: 16,
                      borderRadius: 6,
                      backgroundColor:
                        state === "newVersion"
                          ? `${COLORS.runner}44`
                          : "#21262D",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
