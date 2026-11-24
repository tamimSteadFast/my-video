import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, LAYOUT, SHADOWS, SPRING_CONFIG } from "../theme";

export interface ActionsStepSpec {
  readonly name: string;
  readonly startFrame: number;
  readonly endFrame: number;
  readonly result: "success" | "fail" | "skipped";
  /** Optional multiplier (<1 slows spinner to build tension) */
  readonly spinnerSpeed?: number;
}

export interface ActionsRunProps {
  readonly workflow?: string;
  readonly job?: string;
  readonly steps: readonly ActionsStepSpec[];
  readonly speed?: number;
  /** Optional expandable log lines shown under a failed step */
  readonly logLines?: readonly string[];
  readonly showLogAtFrame?: number;
  readonly width?: number | string;
  readonly compact?: boolean;
  readonly style?: React.CSSProperties;
}

export const ActionsRun: React.FC<ActionsRunProps> = ({
  workflow = "CI",
  job = "build",
  steps,
  speed = 1,
  logLines,
  showLogAtFrame,
  width = 980,
  compact = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Virtual frame accelerated/slowed by `speed`
  const vFrame = frame * speed;

  // Determine if any earlier step has already failed
  let firstFailVirtualFrame = Number.POSITIVE_INFINITY;
  for (const step of steps) {
    if (step.result === "fail" && step.endFrame < firstFailVirtualFrame) {
      firstFailVirtualFrame = step.endFrame;
    }
  }
  const hasFailed = vFrame >= firstFailVirtualFrame;

  const allCompletedSuccess = steps.every(
    (s) => s.result === "success" && vFrame >= s.endFrame,
  );

  const jobStatusColor = hasFailed
    ? COLORS.fail
    : allCompletedSuccess
      ? COLORS.success
      : COLORS.running;

  const logProgress =
    logLines && showLogAtFrame !== undefined
      ? spring({
          frame: frame - showLogAtFrame,
          fps,
          config: SPRING_CONFIG.smooth,
        })
      : 0;

  return (
    <div
      style={{
        width,
        backgroundColor: COLORS.panel,
        borderRadius: LAYOUT.cardRadius,
        border: `1.5px solid ${hasFailed ? `${COLORS.fail}88` : COLORS.border}`,
        boxShadow: hasFailed ? SHADOWS.glow(COLORS.fail) : SHADOWS.card,
        overflow: "hidden",
        fontFamily: FONTS.ui,
        ...style,
      }}
    >
      {/* Top GitHub Actions Header Bar */}
      <div
        style={{
          backgroundColor: "#11161D",
          borderBottom: `1px solid ${COLORS.border}`,
          padding: "18px 26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Generic Play-in-Circle Actions icon (no Octocat) */}
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle
              cx="14"
              cy="14"
              r="12"
              fill="none"
              stroke={jobStatusColor}
              strokeWidth="2.4"
            />
            <polygon points="11,9 20,14 11,19" fill={jobStatusColor} />
          </svg>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text }}>
              Actions · {workflow}
            </div>
            <div style={{ fontSize: 15, color: COLORS.muted }}>
              push · main branch · ubuntu-latest
            </div>
          </div>
        </div>
        <div
          style={{
            padding: "6px 16px",
            borderRadius: 999,
            backgroundColor: `${jobStatusColor}22`,
            border: `1px solid ${jobStatusColor}66`,
            color: jobStatusColor,
            fontSize: 16,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.6,
          }}
        >
          {hasFailed
            ? "Failed"
            : allCompletedSuccess
              ? "Success"
              : "In Progress"}
        </div>
      </div>

      {/* Main Split Body: Left Job List + Right Step List */}
      <div style={{ display: "flex", minHeight: compact ? 240 : 420 }}>
        {/* Left Job List */}
        {!compact ? (
        <div
          style={{
            width: 230,
            backgroundColor: "#0F141B",
            borderRight: `1px solid ${COLORS.border}`,
            padding: "20px 14px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: COLORS.muted,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              padding: "0 10px 12px 10px",
            }}
          >
            Jobs
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              borderRadius: 12,
              backgroundColor: `${COLORS.job}22`,
              border: `1px solid ${COLORS.job}66`,
            }}
          >
            <StatusDot
              status={
                hasFailed
                  ? "fail"
                  : allCompletedSuccess
                    ? "success"
                    : "running"
              }
              frame={frame}
              size={20}
            />
            <span
              style={{
                fontSize: 19,
                fontWeight: 700,
                color: COLORS.text,
                fontFamily: FONTS.code,
              }}
            >
              {job}
            </span>
          </div>
        </div>
        ) : null}

        {/* Right Step List */}
        <div
          style={{
            flex: 1,
            padding: compact ? "14px 18px" : "18px 24px",
            display: "flex",
            flexDirection: "column",
            gap: compact ? 8 : 12,
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.muted,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              marginBottom: 4,
            }}
          >
            Steps ({job})
          </div>

          {steps.map((step, idx) => {
            const isSkipped =
              step.result === "skipped" && vFrame >= firstFailVirtualFrame;
            const isQueued = vFrame < step.startFrame && !isSkipped;
            const isRunning =
              vFrame >= step.startFrame &&
              vFrame < step.endFrame &&
              !isSkipped;
            const isDone = vFrame >= step.endFrame && !isSkipped;

            const status: "queued" | "running" | "success" | "fail" | "skipped" =
              isSkipped
                ? "skipped"
                : isQueued
                  ? "queued"
                  : isRunning
                    ? "running"
                    : step.result;

            const doneElapsed = isDone
              ? Math.max(0, (vFrame - step.endFrame) / speed)
              : 0;
            const checkPop = isDone
              ? spring({
                  frame: doneElapsed,
                  fps,
                  config: SPRING_CONFIG.bouncy,
                })
              : 1;
            const iconScale = isDone
              ? interpolate(checkPop, [0, 1], [0.5, 1])
              : 1;

            const rowBg =
              status === "fail"
                ? `${COLORS.fail}1E`
                : status === "running"
                  ? `${COLORS.running}14`
                  : "rgba(255,255,255,0.02)";

            const rowBorder =
              status === "fail"
                ? `${COLORS.fail}77`
                : status === "running"
                  ? `${COLORS.running}55`
                  : COLORS.border;

            const showExpandLog =
              status === "fail" &&
              logLines &&
              logLines.length > 0 &&
              logProgress > 0.01;

            // Elapsed time indicator in seconds
            const stepSecs =
              status === "queued" || status === "skipped"
                ? ""
                : status === "running"
                  ? `${Math.max(1, Math.floor((vFrame - step.startFrame) / 18))}s`
                  : `${Math.max(1, Math.round((step.endFrame - step.startFrame) / 18))}s`;

            return (
              <div key={`${step.name}-${idx}`}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: compact ? "10px 14px" : "14px 18px",
                    borderRadius: compact ? 11 : 14,
                    backgroundColor: rowBg,
                    border: `1px solid ${rowBorder}`,
                    opacity: status === "skipped" ? 0.52 : status === "queued" ? 0.65 : 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: compact ? 10 : 14,
                    }}
                  >
                    <div style={{ transform: `scale(${iconScale})` }}>
                      <StatusDot
                        status={status}
                        frame={frame * (step.spinnerSpeed ?? 1)}
                        size={compact ? 22 : 26}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: FONTS.code,
                        fontSize: compact ? 18 : 21,
                        fontWeight: status === "fail" ? 700 : 500,
                        color:
                          status === "fail"
                            ? COLORS.fail
                            : status === "skipped"
                              ? COLORS.muted
                              : COLORS.text,
                      }}
                    >
                      {step.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: FONTS.code,
                      fontSize: 17,
                      color:
                        status === "skipped"
                          ? COLORS.muted
                          : status === "fail"
                            ? COLORS.fail
                            : COLORS.muted,
                    }}
                  >
                    {status === "skipped" ? "skipped" : stepSecs}
                  </span>
                </div>

                {/* Expandable Error Log Panel */}
                {showExpandLog ? (
                  <div
                    style={{
                      marginTop: 8,
                      borderRadius: 14,
                      backgroundColor: "#0B0E14",
                      border: `1px solid ${COLORS.fail}66`,
                      overflow: "hidden",
                      maxHeight: Math.round(logProgress * 220),
                      opacity: logProgress,
                      padding: "14px 18px",
                      fontFamily: FONTS.code,
                      fontSize: 19,
                      lineHeight: 1.55,
                    }}
                  >
                    {logLines.map((line, lineIdx) => (
                      <div
                        key={lineIdx}
                        style={{
                          color:
                            line.includes("FAIL") || line.includes("✕")
                              ? COLORS.fail
                              : COLORS.muted,
                          fontWeight: line.includes("FAIL") ? 700 : 500,
                        }}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const StatusDot: React.FC<{
  status: "queued" | "running" | "success" | "fail" | "skipped";
  frame: number;
  size: number;
}> = ({ status, frame, size }) => {
  if (status === "running") {
    const angle = (frame * 9) % 360;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke={`${COLORS.running}33`}
          strokeWidth="3"
        />
        <g transform={`rotate(${angle} 12 12)`}>
          <path
            d="M 12 3 A 9 9 0 0 1 21 12"
            fill="none"
            stroke={COLORS.running}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
        <circle cx="12" cy="12" r="3" fill={COLORS.running} />
      </svg>
    );
  }
  if (status === "success") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill={COLORS.success} />
        <path
          d="M 7.5 12.2 L 10.6 15.2 L 16.8 8.8"
          fill="none"
          stroke="#0D1117"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === "fail") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill={COLORS.fail} />
        <path
          d="M 8.5 8.5 L 15.5 15.5 M 15.5 8.5 L 8.5 15.5"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (status === "skipped") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          stroke={COLORS.muted}
          strokeWidth="2.2"
        />
        <line
          x1="7.5"
          y1="12"
          x2="16.5"
          y2="12"
          stroke={COLORS.muted}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="#484F58"
        strokeWidth="2.2"
      />
    </svg>
  );
};
