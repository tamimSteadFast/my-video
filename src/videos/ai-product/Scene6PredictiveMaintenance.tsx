import React from "react";
import { interpolate, spring } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import {
  AIP_C,
  AIP_DISPLAY,
  AIP_LEAD_SEC,
  AIP_MONO,
} from "./narration";
import { AipSceneShell, useAipVoice, useP } from "./AipSceneShell";

export const Scene6PredictiveMaintenance: React.FC<{
  readonly showSubtitles?: boolean;
  readonly showHud?: boolean;
}> = ({ showSubtitles = true, showHud = true }) => {
  const { frame, fps, voiceSec, totalVoiceSec } = useAipVoice("scene6");
  const P = useP();

  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.98, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camY = interpolate(voiceSec, [0, totalVoiceSec], [12, -12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heroPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 0.1) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const sensorPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 3.75) * fps),
    fps,
    config: SPRING_UI,
  });

  const impactPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 10.05) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  // Radar sweep angle
  const radarAngle = (frame * 3.5) % 360;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 12);

  if (P) {
    return (
      <AipSceneShell
        id="scene6"
        showSubtitles={showSubtitles}
        showHud={showHud}
        cameraStyle={{
          transform: `scale(${camScale})`,
          transformOrigin: "center center",
        }}
        sfx={[
          { atSec: AIP_LEAD_SEC + 0.1, type: "whoosh", volume: 0.22 },
          { atSec: AIP_LEAD_SEC + 3.75, type: "pop", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 7.5, type: "click", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 10.05, type: "chime", volume: 0.35 },
        ]}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* Hero Section */}
          <div
            style={{
              textAlign: "center",
              transform: `scale(${interpolate(heroPop, [0, 1], [0.95, 1])})`,
              opacity: heroPop,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(168, 85, 247, 0.14)",
                border: `1.5px solid ${AIP_C.purple}`,
                borderRadius: 999,
                padding: "4px 18px",
                fontFamily: AIP_MONO,
                fontSize: 13,
                color: AIP_C.purple,
                fontWeight: 700,
                letterSpacing: 1.5,
                marginBottom: 8,
              }}
            >
              PILLAR 04 · RELIABILITY & QUALITY
            </div>
            <div
              style={{
                fontFamily: AIP_DISPLAY,
                fontSize: 34,
                fontWeight: 900,
                color: AIP_C.text,
                letterSpacing: -0.5,
              }}
            >
              Predictive Maintenance & QA
            </div>
            <div
              style={{
                fontSize: 15,
                color: AIP_C.textMuted,
                marginTop: 4,
              }}
            >
              Real-time sensor telemetry detects potential anomalies before downtime occurs.
            </div>
          </div>

          {/* Central Diagnostic & Telemetry Card */}
          <div
            style={{
              background: "rgba(8, 16, 44, 0.94)",
              border: `2px solid ${AIP_C.panelBorderCyan}`,
              borderRadius: 24,
              padding: "24px",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.75), 0 0 35px rgba(0, 229, 255, 0.15)",
              transform: `scale(${interpolate(sensorPop, [0, 1], [0.94, 1])}) translateY(${interpolate(sensorPop, [0, 1], [20, 0])}px)`,
              opacity: sensorPop,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            {/* Holographic Radar Circle */}
            <div
              style={{
                position: "relative",
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "rgba(4, 9, 26, 0.95)",
                border: `2px solid ${AIP_C.panelBorderCyan}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 30px rgba(0, 229, 255, 0.2)",
              }}
            >
              {/* Concentric rings */}
              <div
                style={{
                  position: "absolute",
                  width: "72%",
                  height: "72%",
                  borderRadius: "50%",
                  border: `1px dashed rgba(0, 229, 255, 0.4)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "42%",
                  height: "42%",
                  borderRadius: "50%",
                  border: `1px solid rgba(168, 85, 247, 0.4)`,
                }}
              />
              {/* Radar beam */}
              <div
                style={{
                  position: "absolute",
                  width: "50%",
                  height: 2,
                  left: "50%",
                  top: "50%",
                  background: `linear-gradient(90deg, ${AIP_C.cyan}, transparent)`,
                  transformOrigin: "0% 50%",
                  transform: `rotate(${radarAngle}deg)`,
                  boxShadow: `0 0 10px ${AIP_C.cyan}`,
                }}
              />
              {/* Anomaly Ping */}
              <div
                style={{
                  position: "absolute",
                  top: "30%",
                  right: "28%",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: AIP_C.cyan,
                  boxShadow: `0 0 16px ${AIP_C.cyan}`,
                  opacity: pulse,
                }}
              />
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 13,
                  color: AIP_C.cyan,
                  fontWeight: 700,
                  position: "absolute",
                  bottom: 14,
                }}
              >
                AI SENSOR SCAN
              </div>
            </div>

            {/* Live Sensor Telemetry Feed */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  background: "rgba(4, 9, 26, 0.85)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 12,
                  padding: "10px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 14, color: AIP_C.textMuted }}>Core Temperature</span>
                <span style={{ fontFamily: AIP_MONO, fontSize: 14, color: AIP_C.cyan, fontWeight: 700 }}>
                  41.2°C (Optimal)
                </span>
              </div>
              <div
                style={{
                  background: "rgba(4, 9, 26, 0.85)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 12,
                  padding: "10px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 14, color: AIP_C.textMuted }}>Latency Jitter</span>
                <span style={{ fontFamily: AIP_MONO, fontSize: 14, color: AIP_C.emerald, fontWeight: 700 }}>
                  0.18ms (Stable)
                </span>
              </div>
              <div
                style={{
                  background: "rgba(4, 9, 26, 0.85)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 12,
                  padding: "10px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 14, color: AIP_C.textMuted }}>Pre-Emption Lead</span>
                <span style={{ fontFamily: AIP_MONO, fontSize: 14, color: AIP_C.purple, fontWeight: 700 }}>
                  48 Hours Ahead
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Results Banner (at 10.05s) */}
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(8, 16, 44, 0.95) 0%, rgba(18, 14, 52, 0.95) 100%)",
              border: `2px solid ${AIP_C.emerald}`,
              borderRadius: 22,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6), 0 0 35px rgba(16, 185, 129, 0.2)",
              transform: `scale(${interpolate(impactPop, [0, 1], [0.96, 1])}) translateY(${interpolate(impactPop, [0, 1], [15, 0])}px)`,
              opacity: impactPop,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: `2px solid ${AIP_C.emerald}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 16px rgba(16, 185, 129, 0.4)`,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke={AIP_C.emerald}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: AIP_DISPLAY, fontSize: 20, fontWeight: 800, color: AIP_C.text }}>
                  Zero Downtime Guard
                </div>
                <div style={{ fontSize: 13, color: AIP_C.textDim }}>
                  Continuous autonomous health checks
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.textDim }}>DOWNTIME</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 22, fontWeight: 800, color: AIP_C.emerald }}>~0%</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: AIP_MONO, fontSize: 11, color: AIP_C.textDim }}>OPERATIONAL COST</div>
                <div style={{ fontFamily: AIP_MONO, fontSize: 22, fontWeight: 800, color: AIP_C.cyan }}>-62%</div>
              </div>
            </div>
          </div>
        </div>
      </AipSceneShell>
    );
  }

  return (
    <AipSceneShell
      id="scene6"
      showSubtitles={showSubtitles}
      showHud={showHud}
      cameraStyle={{
        transform: `scale(${camScale}) translateY(${camY}px)`,
        transformOrigin: "center center",
      }}
      sfx={[
        { atSec: AIP_LEAD_SEC + 0.1, type: "whoosh", volume: 0.22 },
        { atSec: AIP_LEAD_SEC + 3.75, type: "pop", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 7.5, type: "click", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 10.05, type: "chime", volume: 0.35 },
      ]}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 45,
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 2600,
            transform: `scale(${interpolate(heroPop, [0, 1], [0.95, 1])})`,
            opacity: heroPop,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(168, 85, 247, 0.14)",
              border: `1.5px solid ${AIP_C.purple}`,
              borderRadius: 999,
              padding: "8px 26px",
              fontFamily: AIP_MONO,
              fontSize: 22,
              color: AIP_C.purple,
              fontWeight: 700,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            PILLAR 04 · RELIABILITY & QUALITY
          </div>
          <div
            style={{
              fontFamily: AIP_DISPLAY,
              fontSize: 66,
              fontWeight: 900,
              color: AIP_C.text,
              letterSpacing: -1,
            }}
          >
            Predictive Maintenance & Quality Control
          </div>
          <div
            style={{
              fontSize: 28,
              color: AIP_C.textMuted,
              marginTop: 12,
              lineHeight: 1.4,
            }}
          >
            Real-time IoT sensor telemetry and deep historical pattern audit identify anomalies before failures occur.
          </div>
        </div>

        {/* Center Diagnostic & Radar Dashboard */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 40,
            width: "100%",
            maxWidth: 3400,
          }}
        >
          {/* Diagnostic Radar View */}
          <div
            style={{
              flex: 1.2,
              background: "rgba(8, 16, 44, 0.92)",
              border: `2px solid ${AIP_C.panelBorderCyan}`,
              borderRadius: 36,
              padding: "44px 50px",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 229, 255, 0.14)",
              transform: `scale(${interpolate(sensorPop, [0, 1], [0.93, 1])}) translateY(${interpolate(sensorPop, [0, 1], [30, 0])}px)`,
              opacity: sensorPop,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 40,
            }}
          >
            {/* Holographic Radar Circle */}
            <div
              style={{
                position: "relative",
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: "rgba(4, 9, 26, 0.9)",
                border: `2px solid ${AIP_C.panelBorderCyan}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 30px rgba(0, 229, 255, 0.2)",
              }}
            >
              {/* Concentric rings */}
              <div
                style={{
                  position: "absolute",
                  width: "70%",
                  height: "70%",
                  borderRadius: "50%",
                  border: `1px dashed rgba(0, 229, 255, 0.4)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "40%",
                  height: "40%",
                  borderRadius: "50%",
                  border: `1px solid rgba(168, 85, 247, 0.4)`,
                }}
              />
              {/* Radar beam */}
              <div
                style={{
                  position: "absolute",
                  width: "50%",
                  height: 2,
                  left: "50%",
                  top: "50%",
                  background: `linear-gradient(90deg, ${AIP_C.cyan}, transparent)`,
                  transformOrigin: "0% 50%",
                  transform: `rotate(${radarAngle}deg)`,
                  boxShadow: `0 0 10px ${AIP_C.cyan}`,
                }}
              />
              {/* Anomaly Ping */}
              <div
                style={{
                  position: "absolute",
                  top: "30%",
                  right: "28%",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: AIP_C.cyan,
                  boxShadow: `0 0 16px ${AIP_C.cyan}`,
                  opacity: pulse,
                }}
              />
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 16,
                  color: AIP_C.cyan,
                  fontWeight: 700,
                  position: "absolute",
                  bottom: 20,
                }}
              >
                SCANNING
              </div>
            </div>

            {/* Telemetry Metrics Column */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 20,
                  color: AIP_C.cyan,
                  fontWeight: 700,
                }}
              >
                PROACTIVE ANOMALY PREEMPTION
              </div>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 40,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 8,
                }}
              >
                Zero-Degradation Guard
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: AIP_C.textMuted,
                  marginTop: 6,
                  lineHeight: 1.4,
                }}
              >
                Detects early micro-vibration, thermal skew, and memory leaks before they escalate into outages.
              </div>

              <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
                <div
                  style={{
                    flex: 1,
                    background: "rgba(4, 9, 26, 0.8)",
                    border: `1px solid ${AIP_C.borderSubtle}`,
                    borderRadius: 14,
                    padding: "14px 20px",
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 16, color: AIP_C.textDim }}>PRE-EMPTION LEAD</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 28, fontWeight: 700, color: AIP_C.cyan }}>48 Hours</div>
                </div>
                <div
                  style={{
                    flex: 1,
                    background: "rgba(4, 9, 26, 0.8)",
                    border: `1px solid ${AIP_C.borderSubtle}`,
                    borderRadius: 14,
                    padding: "14px 20px",
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 16, color: AIP_C.textDim }}>DETECTION ACCURACY</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 28, fontWeight: 700, color: AIP_C.purple }}>99.8%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sensor Feed Live Grid */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.92)",
              border: `2px solid ${AIP_C.panelBorderPurple}`,
              borderRadius: 36,
              padding: "44px 50px",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(168, 85, 247, 0.14)",
              transform: `scale(${interpolate(sensorPop, [0, 1], [0.93, 1])}) translateY(${interpolate(sensorPop, [0, 1], [30, 0])}px)`,
              opacity: sensorPop,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 20,
                  color: AIP_C.purple,
                  fontWeight: 700,
                }}
              >
                LIVE SENSOR TELEMETRY
              </div>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 40,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 8,
                }}
              >
                Real-Time Health Stream
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
              <div
                style={{
                  background: "rgba(4, 9, 26, 0.85)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 14,
                  padding: "14px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 22, color: AIP_C.textMuted }}>Core Temperature</span>
                <span style={{ fontFamily: AIP_MONO, fontSize: 22, color: AIP_C.cyan, fontWeight: 700 }}>
                  41.2°C (Optimal)
                </span>
              </div>

              <div
                style={{
                  background: "rgba(4, 9, 26, 0.85)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 14,
                  padding: "14px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 22, color: AIP_C.textMuted }}>Packet Latency Jitter</span>
                <span style={{ fontFamily: AIP_MONO, fontSize: 22, color: AIP_C.emerald, fontWeight: 700 }}>
                  0.18ms (Stable)
                </span>
              </div>

              <div
                style={{
                  background: "rgba(4, 9, 26, 0.85)",
                  border: `1px solid ${AIP_C.borderSubtle}`,
                  borderRadius: 14,
                  padding: "14px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 22, color: AIP_C.textMuted }}>Memory Leak Pressure</span>
                <span style={{ fontFamily: AIP_MONO, fontSize: 22, color: AIP_C.purple, fontWeight: 700 }}>
                  0.00% (Purged)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Results Banner (at 10.05s) */}
        <div
          style={{
            width: "100%",
            maxWidth: 3400,
            background:
              "linear-gradient(90deg, rgba(8, 16, 44, 0.95) 0%, rgba(18, 14, 52, 0.95) 100%)",
            border: `2px solid ${AIP_C.emerald}`,
            borderRadius: 24,
            padding: "26px 60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(16, 185, 129, 0.2)",
            transform: `scale(${interpolate(impactPop, [0, 1], [0.96, 1])}) translateY(${interpolate(impactPop, [0, 1], [20, 0])}px)`,
            opacity: impactPop,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                border: `2px solid ${AIP_C.emerald}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px rgba(16, 185, 129, 0.4)`,
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17L4 12"
                  stroke={AIP_C.emerald}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: AIP_DISPLAY, fontSize: 34, fontWeight: 800, color: AIP_C.text }}>
                Zero Downtime & Cost Reduction Impact
              </div>
              <div style={{ fontSize: 22, color: AIP_C.textDim }}>
                Eliminating catastrophic outages through continuous autonomous health assessment.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 50 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim }}>UNEXPECTED DOWNTIME</div>
              <div style={{ fontFamily: AIP_MONO, fontSize: 40, fontWeight: 800, color: AIP_C.emerald }}>~0% (99.999%)</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: AIP_MONO, fontSize: 18, color: AIP_C.textDim }}>OPERATIONAL OVERHEAD</div>
              <div style={{ fontFamily: AIP_MONO, fontSize: 40, fontWeight: 800, color: AIP_C.cyan }}>-62% SAVED</div>
            </div>
          </div>
        </div>
      </div>
    </AipSceneShell>
  );
};
