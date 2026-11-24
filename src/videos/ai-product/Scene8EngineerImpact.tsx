import React from "react";
import { interpolate, spring } from "remotion";
import { SPRING_HEADLINE } from "../../shared/theme";
import {
  AIP_C,
  AIP_DISPLAY,
  AIP_LEAD_SEC,
  AIP_MONO,
} from "./narration";
import { AipSceneShell, useAipVoice, useP } from "./AipSceneShell";
import { NeuralNetwork3D } from "./NeuralNetwork3D";

export const Scene8EngineerImpact: React.FC<{
  readonly showSubtitles?: boolean;
  readonly showHud?: boolean;
}> = ({ showSubtitles = true, showHud = true }) => {
  const { frame, fps, voiceSec, totalVoiceSec } = useAipVoice("scene8");
  const P = useP();

  // Camera: Majestic slow pull back revealing the entire ecosystem
  const camScale = interpolate(voiceSec, [0, totalVoiceSec], [1.04, 0.98], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camY = interpolate(voiceSec, [0, totalVoiceSec], [-15, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heroPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 0.2) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const missionPop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 5.05) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const finalePop = spring({
    frame: frame - Math.round((AIP_LEAD_SEC + 11.0) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const ringRot = (frame * 1.5) % 360;

  if (P) {
    return (
      <AipSceneShell
        id="scene8"
        showSubtitles={showSubtitles}
        showHud={showHud}
        cameraStyle={{
          transform: `scale(${camScale})`,
          transformOrigin: "center center",
        }}
        sfx={[
          { atSec: AIP_LEAD_SEC + 0.2, type: "whoosh", volume: 0.25 },
          { atSec: AIP_LEAD_SEC + 5.05, type: "riser", volume: 0.28 },
          { atSec: AIP_LEAD_SEC + 11.0, type: "chime", volume: 0.4 },
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
          {/* Top Tag */}
          <div
            style={{
              textAlign: "center",
              transform: `scale(${interpolate(heroPop, [0, 1], [0.92, 1])})`,
              opacity: heroPop,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(0, 229, 255, 0.15)",
                border: `2px solid ${AIP_C.cyan}`,
                borderRadius: 999,
                padding: "6px 22px",
                boxShadow: `0 0 20px rgba(0, 229, 255, 0.35)`,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: AIP_C.cyan,
                  boxShadow: `0 0 12px ${AIP_C.cyan}`,
                }}
              />
              <span
                style={{
                  fontFamily: AIP_MONO,
                  fontSize: 14,
                  color: AIP_C.cyan,
                  fontWeight: 800,
                  letterSpacing: 2,
                }}
              >
                THE AI ENGINEER’S CALLING
              </span>
            </div>
          </div>

          {/* Central Master Hero Card */}
          <div
            style={{
              flex: 1,
              background:
                "linear-gradient(180deg, rgba(8, 16, 46, 0.94) 0%, rgba(18, 12, 54, 0.96) 100%)",
              border: `2.5px solid ${AIP_C.panelBorderCyan}`,
              borderRadius: 28,
              padding: "26px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.85), 0 0 50px rgba(0, 229, 255, 0.2)",
              transform: `scale(${interpolate(missionPop, [0, 1], [0.94, 1])}) translateY(${interpolate(missionPop, [0, 1], [20, 0])}px)`,
              opacity: missionPop,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Text Narrative */}
            <div style={{ textAlign: "center", zIndex: 10 }}>
              <div
                style={{
                  fontFamily: AIP_DISPLAY,
                  fontSize: 30,
                  fontWeight: 900,
                  color: AIP_C.text,
                  lineHeight: 1.25,
                  letterSpacing: -0.5,
                }}
              >
                Beyond Model Integration:{" "}
                <span
                  style={{
                    background: `linear-gradient(90deg, ${AIP_C.cyan}, ${AIP_C.purple})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Solving Real Business Problems
                </span>
              </div>

              <div
                style={{
                  fontSize: 15,
                  color: AIP_C.textMuted,
                  lineHeight: 1.45,
                  marginTop: 8,
                }}
              >
                Architecting intelligent, reliable, and production-proven software products that create lasting value.
              </div>
            </div>

            {/* 3D Neural Nexus Emblem Center */}
            <div
              style={{
                position: "relative",
                width: 380,
                height: 380,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "scale(0.85)",
              }}
            >
              {/* Spinning decorative orbit rings */}
              <div
                style={{
                  position: "absolute",
                  width: 360,
                  height: 360,
                  borderRadius: "50%",
                  border: `2px dashed rgba(0, 229, 255, 0.35)`,
                  transform: `rotate(${ringRot}deg)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  border: `2px solid rgba(168, 85, 247, 0.4)`,
                  transform: `rotate(${-ringRot * 1.2}deg)`,
                }}
              />

              <NeuralNetwork3D
                scale={0.95}
                active={true}
                primaryColor={AIP_C.cyan}
                secondaryColor={AIP_C.purple}
                label="PRODUCTION AI ENGINEERING"
              />
            </div>

            {/* Core Values Row */}
            <div style={{ display: "flex", gap: 10, width: "100%", zIndex: 10 }}>
              <div
                style={{
                  flex: 1,
                  background: "rgba(6, 12, 34, 0.85)",
                  border: `1.5px solid ${AIP_C.panelBorderCyan}`,
                  borderRadius: 14,
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: AIP_C.cyan,
                    boxShadow: `0 0 8px ${AIP_C.cyan}`,
                  }}
                />
                <span style={{ fontFamily: AIP_MONO, fontSize: 13, fontWeight: 700, color: AIP_C.text }}>
                  Business Value
                </span>
              </div>

              <div
                style={{
                  flex: 1,
                  background: "rgba(6, 12, 34, 0.85)",
                  border: `1.5px solid ${AIP_C.panelBorderPurple}`,
                  borderRadius: 14,
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: AIP_C.purple,
                    boxShadow: `0 0 8px ${AIP_C.purple}`,
                  }}
                />
                <span style={{ fontFamily: AIP_MONO, fontSize: 13, fontWeight: 700, color: AIP_C.text }}>
                  Reliability
                </span>
              </div>

              <div
                style={{
                  flex: 1,
                  background: "rgba(6, 12, 34, 0.85)",
                  border: `1.5px solid ${AIP_C.panelBorderCyan}`,
                  borderRadius: 14,
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: AIP_C.emerald,
                    boxShadow: `0 0 8px ${AIP_C.emerald}`,
                  }}
                />
                <span style={{ fontFamily: AIP_MONO, fontSize: 13, fontWeight: 700, color: AIP_C.text }}>
                  Real Impact
                </span>
              </div>
            </div>
          </div>

          {/* Grand Outro Banner (11.0s - 14.0s) */}
          <div
            style={{
              transform: `scale(${interpolate(finalePop, [0, 1], [0.94, 1])}) translateY(${interpolate(finalePop, [0, 1], [15, 0])}px)`,
              opacity: finalePop,
              background:
                "linear-gradient(90deg, rgba(0, 229, 255, 0.16) 0%, rgba(168, 85, 247, 0.18) 100%)",
              border: `2px solid ${AIP_C.cyan}`,
              borderRadius: 22,
              padding: "16px 24px",
              boxShadow: `0 0 40px rgba(0, 229, 255, 0.3), 0 0 60px rgba(168, 85, 247, 0.2)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                fontFamily: AIP_DISPLAY,
                fontSize: 22,
                fontWeight: 900,
                color: AIP_C.text,
                letterSpacing: 0.5,
              }}
            >
              THIS IS THE REAL IMPACT OF AI ENGINEERING
            </div>
            <div
              style={{
                fontFamily: AIP_MONO,
                fontSize: 14,
                color: AIP_C.cyan,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              BUILDING THE FUTURE OF INTELLIGENT PRODUCTS
            </div>
          </div>
        </div>
      </AipSceneShell>
    );
  }

  return (
    <AipSceneShell
      id="scene8"
      showSubtitles={showSubtitles}
      showHud={showHud}
      cameraStyle={{
        transform: `scale(${camScale}) translateY(${camY}px)`,
        transformOrigin: "center center",
      }}
      sfx={[
        { atSec: AIP_LEAD_SEC + 0.2, type: "whoosh", volume: 0.25 },
        { atSec: AIP_LEAD_SEC + 5.05, type: "riser", volume: 0.28 },
        { atSec: AIP_LEAD_SEC + 11.0, type: "chime", volume: 0.4 },
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
        {/* Top Tag */}
        <div
          style={{
            transform: `scale(${interpolate(heroPop, [0, 1], [0.92, 1])})`,
            opacity: heroPop,
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            background: "rgba(0, 229, 255, 0.15)",
            border: `2px solid ${AIP_C.cyan}`,
            borderRadius: 999,
            padding: "10px 32px",
            boxShadow: `0 0 28px rgba(0, 229, 255, 0.35)`,
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: AIP_C.cyan,
              boxShadow: `0 0 16px ${AIP_C.cyan}`,
            }}
          />
          <span
            style={{
              fontFamily: AIP_MONO,
              fontSize: 24,
              color: AIP_C.cyan,
              fontWeight: 800,
              letterSpacing: 3,
            }}
          >
            THE AI ENGINEER’S CALLING
          </span>
        </div>

        {/* Central Master Hero Card */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 3200,
            background:
              "linear-gradient(180deg, rgba(8, 16, 46, 0.94) 0%, rgba(18, 12, 54, 0.96) 100%)",
            border: `2.5px solid ${AIP_C.panelBorderCyan}`,
            borderRadius: 40,
            padding: "60px 80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow:
              "0 30px 100px rgba(0, 0, 0, 0.85), 0 0 70px rgba(0, 229, 255, 0.2)",
            transform: `scale(${interpolate(missionPop, [0, 1], [0.94, 1])}) translateY(${interpolate(missionPop, [0, 1], [30, 0])}px)`,
            opacity: missionPop,
          }}
        >
          {/* Left Text Narrative */}
          <div style={{ maxWidth: 1600 }}>
            <div
              style={{
                fontFamily: AIP_DISPLAY,
                fontSize: 66,
                fontWeight: 900,
                color: AIP_C.text,
                lineHeight: 1.18,
                letterSpacing: -1,
              }}
            >
              Beyond Model Integration:{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${AIP_C.cyan}, ${AIP_C.purple})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Solving Real-World Business Problems
              </span>
            </div>

            <div
              style={{
                fontSize: 30,
                color: AIP_C.textMuted,
                lineHeight: 1.5,
                marginTop: 24,
              }}
            >
              Our role is not simply wrapping API endpoints. It is architecting
              intelligent, reliable, high-integrity software products that deliver
              tangible value to millions of users.
            </div>

            {/* Core Values Row */}
            <div style={{ display: "flex", gap: 24, marginTop: 40 }}>
              <div
                style={{
                  background: "rgba(6, 12, 34, 0.85)",
                  border: `1.5px solid ${AIP_C.panelBorderCyan}`,
                  borderRadius: 18,
                  padding: "16px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: AIP_C.cyan,
                    boxShadow: `0 0 10px ${AIP_C.cyan}`,
                  }}
                />
                <span style={{ fontFamily: AIP_MONO, fontSize: 22, fontWeight: 700, color: AIP_C.text }}>
                  Business Value
                </span>
              </div>

              <div
                style={{
                  background: "rgba(6, 12, 34, 0.85)",
                  border: `1.5px solid ${AIP_C.panelBorderPurple}`,
                  borderRadius: 18,
                  padding: "16px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: AIP_C.purple,
                    boxShadow: `0 0 10px ${AIP_C.purple}`,
                  }}
                />
                <span style={{ fontFamily: AIP_MONO, fontSize: 22, fontWeight: 700, color: AIP_C.text }}>
                  System Reliability
                </span>
              </div>

              <div
                style={{
                  background: "rgba(6, 12, 34, 0.85)",
                  border: `1.5px solid ${AIP_C.panelBorderCyan}`,
                  borderRadius: 18,
                  padding: "16px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: AIP_C.emerald,
                    boxShadow: `0 0 10px ${AIP_C.emerald}`,
                  }}
                />
                <span style={{ fontFamily: AIP_MONO, fontSize: 22, fontWeight: 700, color: AIP_C.text }}>
                  Human Impact
                </span>
              </div>
            </div>
          </div>

          {/* Right 3D Neural Nexus Emblem */}
          <div
            style={{
              position: "relative",
              width: 500,
              height: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Spinning decorative orbit rings */}
            <div
              style={{
                position: "absolute",
                width: 460,
                height: 460,
                borderRadius: "50%",
                border: `2px dashed rgba(0, 229, 255, 0.35)`,
                transform: `rotate(${ringRot}deg)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 360,
                height: 360,
                borderRadius: "50%",
                border: `2px solid rgba(168, 85, 247, 0.4)`,
                transform: `rotate(${-ringRot * 1.2}deg)`,
              }}
            />

            <NeuralNetwork3D
              scale={1.35}
              active={true}
              primaryColor={AIP_C.cyan}
              secondaryColor={AIP_C.purple}
              label="PRODUCTION AI ENGINEERING"
            />
          </div>
        </div>

        {/* Grand Outro Banner (11.0s - 14.0s) */}
        <div
          style={{
            transform: `scale(${interpolate(finalePop, [0, 1], [0.94, 1])}) translateY(${interpolate(finalePop, [0, 1], [20, 0])}px)`,
            opacity: finalePop,
            background:
              "linear-gradient(90deg, rgba(0, 229, 255, 0.16) 0%, rgba(168, 85, 247, 0.18) 100%)",
            border: `2px solid ${AIP_C.cyan}`,
            borderRadius: 999,
            padding: "20px 70px",
            boxShadow: `0 0 50px rgba(0, 229, 255, 0.3), 0 0 80px rgba(168, 85, 247, 0.2)`,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <span
            style={{
              fontFamily: AIP_DISPLAY,
              fontSize: 42,
              fontWeight: 900,
              color: AIP_C.text,
              letterSpacing: 0.5,
            }}
          >
            THIS IS THE REAL IMPACT OF AI ENGINEERING
          </span>
          <span
            style={{
              fontFamily: AIP_MONO,
              fontSize: 26,
              color: AIP_C.cyan,
              fontWeight: 700,
            }}
          >
            ●
          </span>
          <span
            style={{
              fontFamily: AIP_MONO,
              fontSize: 26,
              color: AIP_C.purple,
              fontWeight: 700,
            }}
          >
            THE FUTURE OF PRODUCT DEVELOPMENT
          </span>
        </div>
      </div>
    </AipSceneShell>
  );
};
