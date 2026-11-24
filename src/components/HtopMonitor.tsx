import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, LAYOUT, SHADOWS } from "../theme";

export type AnimatedMetric = number | ((frame: number) => number);

export interface HtopProcess {
  readonly pid?: number;
  readonly user?: string;
  readonly name: string;
  readonly cpu: AnimatedMetric;
  readonly mem: AnimatedMetric;
}

export interface HtopMonitorProps {
  /** CPU usage percentage (0–100) or frame callback */
  readonly cpu: AnimatedMetric;
  /** Memory usage percentage (0–100) or frame callback */
  readonly mem: AnimatedMetric;
  /** Display total memory string, e.g. "1.0G" */
  readonly memTotal?: string;
  /** Swap display string, e.g. "0K/0K" */
  readonly swpLabel?: string;
  readonly processes: readonly HtopProcess[];
  readonly title?: string;
  readonly compact?: boolean;
  readonly width?: number | string;
  readonly style?: React.CSSProperties;
}

function resolveMetric(val: AnimatedMetric, frame: number): number {
  const n = typeof val === "function" ? val(frame) : val;
  return Math.max(0, Math.min(100, n));
}

function barColorFor(pct: number): string {
  if (pct > 85) return COLORS.fail;
  if (pct >= 60) return COLORS.running;
  return COLORS.success;
}

function formatMemUsed(pct: number, memTotal: string): string {
  const match = memTotal.match(/^([\d.]+)\s*([GMK])?/i);
  if (!match) return `${Math.round(pct)}%`;
  const totalVal = parseFloat(match[1]);
  const unit = (match[2] ?? "G").toUpperCase();
  if (unit === "G") {
    const mb = Math.round((pct / 100) * totalVal * 1000);
    if (mb >= 1000) return `${(mb / 1000).toFixed(2)}G`;
    return `${mb}M`;
  }
  return `${Math.round((pct / 100) * totalVal)}${unit}`;
}

export const HtopMonitor: React.FC<HtopMonitorProps> = ({
  cpu,
  mem,
  memTotal = "1.0G",
  swpLabel = "0K/0K",
  processes,
  title = "htop — rafi@client-vps (1 vCPU · 1 GB RAM)",
  compact = false,
  width = "100%",
  style,
}) => {
  const frame = useCurrentFrame();
  const { width: videoWidth } = useVideoConfig();
  const isPortrait = videoWidth <= 1200;

  const cpuPct = resolveMetric(cpu, frame);
  const memPct = resolveMetric(mem, frame);
  const isDanger = cpuPct >= 95 || memPct >= 95;
  const dangerPulse = isDanger ? 0.55 + 0.45 * Math.sin(frame * 0.36) : 0;

  const barSlots = compact ? (isPortrait ? 24 : 22) : isPortrait ? 30 : 42;
  const cpuFilled = Math.round((cpuPct / 100) * barSlots);
  const memFilled = Math.round((memPct / 100) * barSlots);
  const cpuColor = barColorFor(cpuPct);
  const memColor = barColorFor(memPct);
  const memUsedStr = formatMemUsed(memPct, memTotal);

  const fontSize = compact ? (isPortrait ? 18 : 15) : isPortrait ? 22 : 21;
  const showInlineRightStats = !compact && !isPortrait;
  const showPortraitStatsStrip = !compact && isPortrait;

  return (
    <div
      style={{
        width,
        backgroundColor: "#0A0E14",
        borderRadius: LAYOUT.cardRadius,
        border: `2px solid ${
          isDanger
            ? `rgba(248, 81, 73, ${(0.55 + dangerPulse * 0.45).toFixed(2)})`
            : COLORS.border
        }`,
        boxShadow: isDanger
          ? `0 0 ${Math.round(28 + dangerPulse * 34)}px rgba(248, 81, 73, ${(
              0.32 +
              dangerPulse * 0.36
            ).toFixed(2)}), ${SHADOWS.card}`
          : SHADOWS.card,
        overflow: "hidden",
        fontFamily: FONTS.code,
        color: COLORS.text,
        ...style,
      }}
    >
      {/* Window Title Bar */}
      <div
        style={{
          height: compact ? 38 : 46,
          backgroundColor: isDanger ? "#221216" : "#141A24",
          borderBottom: `1px solid ${isDanger ? `${COLORS.fail}55` : COLORS.border}`,
          display: "flex",
          alignItems: "center",
          padding: compact ? "0 16px" : "0 20px",
          gap: 9,
        }}
      >
        <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FF5F56", flexShrink: 0 }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FFBD2E", flexShrink: 0 }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#27C93F", flexShrink: 0 }} />
        <span
          style={{
            marginLeft: 10,
            fontFamily: FONTS.ui,
            fontSize: compact ? 15 : 17,
            fontWeight: 600,
            color: isDanger ? "#FFA198" : COLORS.muted,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </span>
        {isDanger ? (
          <span
            style={{
              marginLeft: "auto",
              padding: "2px 10px",
              borderRadius: 999,
              backgroundColor: `${COLORS.fail}33`,
              border: `1px solid ${COLORS.fail}`,
              color: "#FFD2CF",
              fontFamily: FONTS.ui,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 0.5,
              opacity: 0.7 + dangerPulse * 0.3,
              flexShrink: 0,
            }}
          >
            CRITICAL
          </span>
        ) : null}
      </div>

      {/* Meters Section */}
      <div
        style={{
          padding: compact ? "14px 18px" : "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: compact ? 7 : 11,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        {/* CPU Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize,
            lineHeight: 1.35,
            whiteSpace: "pre",
          }}
        >
          <span style={{ color: COLORS.runner, fontWeight: 700, width: compact ? 58 : 72 }}>
            CPU[
          </span>
          <span style={{ color: cpuColor, fontWeight: 700 }}>
            {"|".repeat(cpuFilled)}
          </span>
          <span style={{ color: "#2D3642" }}>
            {" ".repeat(Math.max(0, barSlots - cpuFilled))}
          </span>
          <span
            style={{
              color: cpuColor,
              fontWeight: 700,
              marginLeft: "auto",
              minWidth: compact ? 64 : 84,
              textAlign: "right",
            }}
          >
            {cpuPct.toFixed(cpuPct >= 99.5 ? 0 : 1)}%
          </span>
          <span style={{ color: COLORS.runner, fontWeight: 700 }}>]</span>
          {showInlineRightStats ? (
            <span style={{ marginLeft: 28, color: COLORS.muted, fontSize: 17 }}>
              Tasks: <strong style={{ color: COLORS.text }}>42</strong>,{" "}
              <strong style={{ color: isDanger ? COLORS.fail : COLORS.success }}>
                {isDanger ? "4 running" : "1 running"}
              </strong>
            </span>
          ) : null}
        </div>

        {/* Mem Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize,
            lineHeight: 1.35,
            whiteSpace: "pre",
          }}
        >
          <span style={{ color: COLORS.runner, fontWeight: 700, width: compact ? 58 : 72 }}>
            Mem[
          </span>
          <span style={{ color: memColor, fontWeight: 700 }}>
            {"|".repeat(memFilled)}
          </span>
          <span style={{ color: "#2D3642" }}>
            {" ".repeat(Math.max(0, barSlots - memFilled))}
          </span>
          <span
            style={{
              color: memColor,
              fontWeight: 700,
              marginLeft: "auto",
              minWidth: compact ? 104 : 132,
              textAlign: "right",
            }}
          >
            {memUsedStr}/{memTotal}
          </span>
          <span style={{ color: COLORS.runner, fontWeight: 700 }}>]</span>
          {showInlineRightStats ? (
            <span style={{ marginLeft: 28, color: COLORS.muted, fontSize: 17 }}>
              Load avg:{" "}
              <strong style={{ color: isDanger ? COLORS.fail : COLORS.text }}>
                {isDanger ? "4.82 3.41 1.95" : "0.12 0.08 0.05"}
              </strong>
            </span>
          ) : null}
        </div>

        {/* Swp Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize,
            lineHeight: 1.35,
            whiteSpace: "pre",
          }}
        >
          <span style={{ color: COLORS.runner, fontWeight: 700, width: compact ? 58 : 72 }}>
            Swp[
          </span>
          <span style={{ color: "#2D3642" }}>{" ".repeat(barSlots)}</span>
          <span
            style={{
              color: COLORS.muted,
              fontWeight: 600,
              marginLeft: "auto",
              minWidth: compact ? 104 : 132,
              textAlign: "right",
            }}
          >
            {swpLabel}
          </span>
          <span style={{ color: COLORS.runner, fontWeight: 700 }}>]</span>
          {showInlineRightStats ? (
            <span style={{ marginLeft: 28, color: COLORS.muted, fontSize: 17 }}>
              Uptime: <strong style={{ color: COLORS.text }}>21 days</strong>
            </span>
          ) : null}
        </div>

        {/* Portrait-safe 3-column summary telemetry row */}
        {showPortraitStatsStrip ? (
          <div
            style={{
              marginTop: 6,
              paddingTop: 10,
              borderTop: `1px solid ${COLORS.border}`,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 17,
              color: COLORS.muted,
            }}
          >
            <span>
              Tasks: <strong style={{ color: COLORS.text }}>42</strong>,{" "}
              <strong style={{ color: isDanger ? COLORS.fail : COLORS.success }}>
                {isDanger ? "4 run" : "1 run"}
              </strong>
            </span>
            <span>
              Load:{" "}
              <strong style={{ color: isDanger ? COLORS.fail : COLORS.text }}>
                {isDanger ? "4.82 3.41" : "0.12 0.08"}
              </strong>
            </span>
            <span>
              Uptime: <strong style={{ color: COLORS.text }}>21d</strong>
            </span>
          </div>
        ) : null}
      </div>

      {/* Process Table */}
      <div style={{ padding: compact ? "10px 16px 14px 16px" : "14px 22px 20px 22px" }}>
        {/* Header Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: compact
              ? "1fr 78px 78px"
              : isPortrait
                ? "72px 104px 86px 86px 1fr"
                : "88px 110px 104px 104px 1fr",
            backgroundColor: "#1F6FEB44",
            color: "#D2E8FF",
            padding: compact ? "6px 12px" : "9px 14px",
            borderRadius: 8,
            fontSize: compact ? 15 : 17,
            fontWeight: 700,
            marginBottom: compact ? 6 : 8,
          }}
        >
          {!compact ? <span>PID</span> : null}
          {!compact ? <span>USER</span> : null}
          {compact ? <span>COMMAND</span> : null}
          <span style={{ textAlign: "right" }}>CPU%</span>
          <span style={{ textAlign: "right" }}>MEM%</span>
          {!compact ? <span style={{ paddingLeft: 18 }}>COMMAND</span> : null}
        </div>

        {/* Process Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: compact ? 5 : 8 }}>
          {processes.map((proc, idx) => {
            const pCpu = resolveMetric(proc.cpu, frame);
            const pMem = resolveMetric(proc.mem, frame);
            const isHot = pCpu >= 75 || pMem >= 70;
            const pid = proc.pid ?? 1042 + idx * 137;
            const user = proc.user ?? "rafi";

            return (
              <div
                key={`${proc.name}-${idx}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: compact
                    ? "1fr 78px 78px"
                    : isPortrait
                      ? "72px 104px 86px 86px 1fr"
                      : "88px 110px 104px 104px 1fr",
                  padding: compact ? "6px 12px" : "10px 14px",
                  borderRadius: 8,
                  backgroundColor: isHot
                    ? `${COLORS.fail}24`
                    : idx === 0
                      ? "rgba(255, 255, 255, 0.04)"
                      : "transparent",
                  border: isHot ? `1px solid ${COLORS.fail}66` : "1px solid transparent",
                  fontSize: compact ? 16 : 19,
                  alignItems: "center",
                }}
              >
                {!compact ? (
                  <span style={{ color: COLORS.muted }}>{pid}</span>
                ) : null}
                {!compact ? (
                  <span style={{ color: COLORS.muted }}>{user}</span>
                ) : null}
                {compact ? (
                  <span
                    style={{
                      color: isHot ? "#FFA198" : COLORS.text,
                      fontWeight: isHot ? 700 : 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {proc.name}
                  </span>
                ) : null}
                <span
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: barColorFor(pCpu),
                  }}
                >
                  {pCpu.toFixed(1)}
                </span>
                <span
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: barColorFor(pMem),
                  }}
                >
                  {pMem.toFixed(1)}
                </span>
                {!compact ? (
                  <span
                    style={{
                      paddingLeft: 18,
                      color: isHot ? "#FFA198" : COLORS.text,
                      fontWeight: isHot ? 700 : 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {proc.name}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
