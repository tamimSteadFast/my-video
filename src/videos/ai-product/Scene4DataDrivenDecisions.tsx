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

export const Scene4DataDrivenDecisions: React.FC<{
  readonly showSubtitles?: boolean;
  readonly showHud?: boolean;
}> = ({ showSubtitles = true, showHud = true }) => {
  const { frame, fps, voiceSec, totalVoiceSec } = useAipVoice("scene4");
  const P = useP();

  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [0.97, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camX = interpolate(voiceSec, [0, totalVoiceSec], [-20, 20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heroPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 0.1) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const chart1Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 4.0) * fps),
    fps,
    config: SPRING_UI,
  });

  const chart2Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 6.0) * fps),
    fps,
    config: SPRING_UI,
  });

  const chart3Pop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 8.0) * fps),
    fps,
    config: SPRING_UI,
  });

  // Animated bars progress
  const barProgress = interpolate(voiceSec, [4.0, 8.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (P) {
    return (
      <AipSceneShell
        id="scene4"
        showSubtitles={showSubtitles}
        showHud={showHud}
        cameraStyle={{
          transform: `scale(${camScale})`,
          transformOrigin: "center center",
        }}
        sfx={[
          { atSec: AIP_LEAD_SEC + 0.1, type: "whoosh", volume: 0.22 },
          { atSec: AIP_LEAD_SEC + 4.0, type: "pop", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 6.0, type: "pop", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 8.0, type: "pop", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 10.0, type: "chime", volume: 0.3 },
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
              PILLAR 02 · STRATEGIC INTELLIGENCE
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
              Data-Driven Decision Making
            </div>
            <div
              style={{
                fontSize: 15,
                color: AIP_C.textMuted,
                marginTop: 4,
              }}
            >
              Transforming unstructured telemetry into actionable strategic insights.
            </div>
          </div>

          {/* 3 Core Analytics Cards Stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Card 1: Customer Behaviour */}
            <div
              style={{
                background: "rgba(8, 16, 44, 0.92)",
                border: `1.5px solid ${AIP_C.panelBorderCyan}`,
                borderRadius: 20,
                padding: "16px 22px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.65), 0 0 25px rgba(0, 229, 255, 0.1)",
                transform: `scale(${interpolate(chart1Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(chart1Pop, [0, 1], [20, 0])}px)`,
                opacity: chart1Pop,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: AIP_MONO, fontSize: 13, color: AIP_C.cyan, fontWeight: 700 }}>
                  01 · USER INTELLIGENCE
                </span>
                <span style={{ fontFamily: AIP_MONO, fontSize: 12, color: AIP_C.cyan }}>CONFIDENCE: 98.4%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div>
                  <div style={{ fontFamily: AIP_DISPLAY, fontSize: 24, fontWeight: 800, color: AIP_C.text }}>
                    Customer Behaviour
                  </div>
                  <div style={{ fontSize: 14, color: AIP_C.textMuted, marginTop: 2 }}>
                    Cohort retention mapping, intent classification & churn risk detection.
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(4, 9, 26, 0.8)",
                    border: `1px solid ${AIP_C.borderSubtle}`,
                    borderRadius: 10,
                    padding: "6px 14px",
                    textAlign: "right",
                    minWidth: 100,
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 10, color: AIP_C.textDim }}>RETENTION</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 18, fontWeight: 700, color: AIP_C.cyan }}>+42%</div>
                </div>
              </div>
              <svg width="100%" height="48" viewBox="0 0 400 48" style={{ marginTop: 10 }}>
                <path
                  d="M10,40 Q100,10 200,28 T390,8"
                  fill="none"
                  stroke={AIP_C.cyan}
                  strokeWidth="2.5"
                />
                <circle cx="200" cy="28" r="4" fill={AIP_C.cyan} />
                <circle cx="390" cy="8" r="5" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Card 2: Product Performance */}
            <div
              style={{
                background: "rgba(8, 16, 44, 0.92)",
                border: `1.5px solid ${AIP_C.panelBorderPurple}`,
                borderRadius: 20,
                padding: "16px 22px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.65), 0 0 25px rgba(168, 85, 247, 0.1)",
                transform: `scale(${interpolate(chart2Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(chart2Pop, [0, 1], [20, 0])}px)`,
                opacity: chart2Pop,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: AIP_MONO, fontSize: 13, color: AIP_C.purple, fontWeight: 700 }}>
                  02 · SYSTEM TELEMETRY
                </span>
                <span style={{ fontFamily: AIP_MONO, fontSize: 12, color: AIP_C.purple }}>UPTIME: 99.98%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div>
                  <div style={{ fontFamily: AIP_DISPLAY, fontSize: 24, fontWeight: 800, color: AIP_C.text }}>
                    Product Performance
                  </div>
                  <div style={{ fontSize: 14, color: AIP_C.textMuted, marginTop: 2 }}>
                    Feature adoption funnels, bottleneck diagnosis & server load.
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(4, 9, 26, 0.8)",
                    border: `1px solid ${AIP_C.borderSubtle}`,
                    borderRadius: 10,
                    padding: "6px 14px",
                    textAlign: "right",
                    minWidth: 100,
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 10, color: AIP_C.textDim }}>ADOPTION</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 18, fontWeight: 700, color: AIP_C.purple }}>4.8x</div>
                </div>
              </div>
              {/* Animated mini bars */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 36, marginTop: 10 }}>
                {[35, 55, 78, 95, 68, 88, 98].map((val, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: `${val * barProgress}%`,
                      background: `linear-gradient(180deg, ${AIP_C.purple}, rgba(124, 58, 237, 0.4))`,
                      borderRadius: "3px 3px 0 0",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Card 3: Business Trends */}
            <div
              style={{
                background: "rgba(8, 16, 44, 0.92)",
                border: `1.5px solid ${AIP_C.panelBorderCyan}`,
                borderRadius: 20,
                padding: "16px 22px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.65), 0 0 25px rgba(0, 229, 255, 0.1)",
                transform: `scale(${interpolate(chart3Pop, [0, 1], [0.94, 1])}) translateY(${interpolate(chart3Pop, [0, 1], [20, 0])}px)`,
                opacity: chart3Pop,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: AIP_MONO, fontSize: 13, color: AIP_C.emerald, fontWeight: 700 }}>
                  03 · MARKET FORECAST
                </span>
                <span style={{ fontFamily: AIP_MONO, fontSize: 12, color: AIP_C.emerald }}>PRECISION: 96.2%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div>
                  <div style={{ fontFamily: AIP_DISPLAY, fontSize: 24, fontWeight: 800, color: AIP_C.text }}>
                    Business Trends
                  </div>
                  <div style={{ fontSize: 14, color: AIP_C.textMuted, marginTop: 2 }}>
                    Predictive demand forecasting & macro economic trend analysis.
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(4, 9, 26, 0.8)",
                    border: `1px solid ${AIP_C.borderSubtle}`,
                    borderRadius: 10,
                    padding: "6px 14px",
                    textAlign: "right",
                    minWidth: 100,
                  }}
                >
                  <div style={{ fontFamily: AIP_MONO, fontSize: 10, color: AIP_C.textDim }}>GROWTH</div>
                  <div style={{ fontFamily: AIP_MONO, fontSize: 18, fontWeight: 700, color: AIP_C.emerald }}>+185%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Insight Badge */}
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(8, 16, 44, 0.94) 0%, rgba(18, 14, 52, 0.94) 100%)",
              border: `2px solid ${AIP_C.panelBorderPurple}`,
              borderRadius: 20,
              padding: "16px 22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6), 0 0 35px rgba(168, 85, 247, 0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: AIP_C.cyan,
                  boxShadow: `0 0 12px ${AIP_C.cyan}`,
                }}
              />
              <span style={{ fontFamily: AIP_DISPLAY, fontSize: 18, fontWeight: 800, color: AIP_C.text }}>
                Actionable Strategic Roadmaps
              </span>
            </div>
            <div style={{ fontFamily: AIP_MONO, fontSize: 14, color: AIP_C.cyan, fontWeight: 700 }}>
              PETABYTES → CONVICTION
            </div>
          </div>
        </div>
      </AipSceneShell>
    );
  }

  return (
    <AipSceneShell
      id="scene4"
      showSubtitles={showSubtitles}
      showHud={showHud}
      cameraStyle={{
        transform: `scale(${camScale}) translateX(${camX}px)`,
        transformOrigin: "center center",
      }}
      sfx={[
        { atSec: AIP_LEAD_SEC + 0.1, type: "whoosh", volume: 0.22 },
        { atSec: AIP_LEAD_SEC + 4.0, type: "pop", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 6.0, type: "pop", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 8.0, type: "pop", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 10.0, type: "chime", volume: 0.3 },
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
          gap: 50,
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
            PILLAR 02 · STRATEGIC INTELLIGENCE
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
            Data-Driven Decision Making
          </div>
          <div
            style={{
              fontSize: 28,
              color: AIP_C.textMuted,
              marginTop: 12,
              lineHeight: 1.4,
            }}
          >
            Transforming petabytes of unstructured telemetry into actionable, high-confidence strategic roadmaps.
          </div>
        </div>

        {/* 3 Core Analytics Cards */}
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
          {/* Card 1: Customer Behaviour */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.92)",
              border: `2px solid ${AIP_C.panelBorderCyan}`,
              borderRadius: 32,
              padding: "44px",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 229, 255, 0.12)",
              transform: `scale(${interpolate(chart1Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(chart1Pop, [0, 1], [30, 0])}px)`,
              opacity: chart1Pop,
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
                  color: AIP_C.cyan,
                  fontWeight: 700,
                }}
              >
                01 · USER INTELLIGENCE
              </div>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 42,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 16,
                }}
              >
                Customer Behaviour
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: AIP_C.textMuted,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                Cohort retention mapping, intent classification, and churn risk detection.
              </div>
            </div>

            {/* Simulated Cohort Scatter / Wave Chart */}
            <div
              style={{
                background: "rgba(4, 9, 26, 0.8)",
                border: `1px solid ${AIP_C.borderSubtle}`,
                borderRadius: 20,
                padding: "24px",
                marginTop: 24,
                height: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: AIP_MONO,
                  fontSize: 16,
                  color: AIP_C.textDim,
                }}
              >
                <span>RETENTION CLUSTER</span>
                <span style={{ color: AIP_C.cyan }}>CONFIDENCE: 98.4%</span>
              </div>
              <svg width="100%" height="120" viewBox="0 0 400 120">
                <path
                  d="M10,90 Q90,30 180,60 T380,20"
                  fill="none"
                  stroke={AIP_C.cyan}
                  strokeWidth="3.5"
                />
                <circle cx="180" cy="60" r="6" fill={AIP_C.cyan} />
                <circle cx="380" cy="20" r="6" fill="#FFFFFF" />
              </svg>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 20,
                  color: AIP_C.cyan,
                  fontWeight: 700,
                }}
              >
                +42% Lifetime Retention
              </div>
            </div>
          </div>

          {/* Card 2: Product Performance */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.92)",
              border: `2px solid ${AIP_C.panelBorderPurple}`,
              borderRadius: 32,
              padding: "44px",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(168, 85, 247, 0.12)",
              transform: `scale(${interpolate(chart2Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(chart2Pop, [0, 1], [30, 0])}px)`,
              opacity: chart2Pop,
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
                02 · SYSTEM TELEMETRY
              </div>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 42,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 16,
                }}
              >
                Product Performance
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: AIP_C.textMuted,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                Feature adoption funnels, execution bottleneck analysis, and server load monitoring.
              </div>
            </div>

            {/* 3D Bar Columns Simulation */}
            <div
              style={{
                background: "rgba(4, 9, 26, 0.8)",
                border: `1px solid ${AIP_C.borderSubtle}`,
                borderRadius: 20,
                padding: "24px",
                marginTop: 24,
                height: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: AIP_MONO,
                  fontSize: 16,
                  color: AIP_C.textDim,
                }}
              >
                <span>FEATURE USAGE</span>
                <span style={{ color: AIP_C.purple }}>UPTIME: 99.98%</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 16,
                  height: 100,
                  paddingBottom: 8,
                }}
              >
                {[45, 65, 88, 98, 72].map((val, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: `${val * barProgress}%`,
                      background: `linear-gradient(180deg, ${AIP_C.purple}, rgba(124, 58, 237, 0.4))`,
                      borderRadius: "6px 6px 0 0",
                      boxShadow: `0 0 12px rgba(168, 85, 247, 0.4)`,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 20,
                  color: AIP_C.purple,
                  fontWeight: 700,
                }}
              >
                3.8x Feature Adoption Rate
              </div>
            </div>
          </div>

          {/* Card 3: Business Trends */}
          <div
            style={{
              flex: 1,
              background: "rgba(8, 16, 44, 0.92)",
              border: `2px solid ${AIP_C.panelBorderCyan}`,
              borderRadius: 32,
              padding: "44px",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 229, 255, 0.12)",
              transform: `scale(${interpolate(chart3Pop, [0, 1], [0.92, 1])}) translateY(${interpolate(chart3Pop, [0, 1], [30, 0])}px)`,
              opacity: chart3Pop,
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
                  color: AIP_C.cyanSoft,
                  fontWeight: 700,
                }}
              >
                03 · PREDICTIVE FORECASTING
              </div>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 42,
                  fontWeight: 800,
                  color: AIP_C.text,
                  marginTop: 16,
                }}
              >
                Business Trends
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: AIP_C.textMuted,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                Predictive forecasting of demand cycles, revenue models, and market anomalies.
              </div>
            </div>

            {/* Forecasting Curve Simulation */}
            <div
              style={{
                background: "rgba(4, 9, 26, 0.8)",
                border: `1px solid ${AIP_C.borderSubtle}`,
                borderRadius: 20,
                padding: "24px",
                marginTop: 24,
                height: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: AIP_MONO,
                  fontSize: 16,
                  color: AIP_C.textDim,
                }}
              >
                <span>MARKET TRAJECTORY</span>
                <span style={{ color: AIP_C.emerald }}>GROWTH SIGNAL</span>
              </div>
              <svg width="100%" height="120" viewBox="0 0 400 120">
                <path
                  d="M10,100 C100,80 180,60 260,35 C320,15 360,10 390,8"
                  fill="none"
                  stroke={AIP_C.emerald}
                  strokeWidth="3.5"
                />
                <circle cx="390" cy="8" r="6" fill={AIP_C.emerald} />
              </svg>
              <div
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 20,
                  color: AIP_C.emerald,
                  fontWeight: 700,
                }}
              >
                High Confidence Trend Horizon
              </div>
            </div>
          </div>
        </div>
      </div>
    </AipSceneShell>
  );
};
