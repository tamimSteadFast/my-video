import React from "react";
import { Img, interpolate, spring, staticFile } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { AIE_C, AIE_DISPLAY, AIE_LEAD_SEC, AIE_MONO } from "./narration";
import { AieSceneShell, useAieVoice } from "./SceneShell";

const LIFECYCLE = [
  {
    num: "01",
    label: "DESIGN",
    sub: "AI System Architecture",
    atSec: 6.4,
    accent: "#38BDF8",
  },
  {
    num: "02",
    label: "DEVELOP",
    sub: "Intelligent Codebase",
    atSec: 7.45,
    accent: "#818CF8",
  },
  {
    num: "03",
    label: "INTEGRATE",
    sub: "Models, Data & APIs",
    atSec: 8.3,
    accent: "#A855F7",
  },
  {
    num: "04",
    label: "DEPLOY",
    sub: "Production Scale",
    atSec: 9.15,
    accent: "#10B981",
  },
] as const;

export const Scene2EngineerRole: React.FC<{
  readonly showSubtitles?: boolean;
}> = ({ showSubtitles = true }) => {
  const { frame, fps, voiceSec } = useAieVoice("scene2");

  const portraitP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 0.1) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const brainP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 2.95) * fps),
    fps,
    config: SPRING_UI,
  });

  const missionP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 10.35) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const imgScale = interpolate(voiceSec, [0, 16.44], [1.0, 1.09], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 0.5 + 0.5 * Math.sin(frame / 11);
  const packetT = (frame % 75) / 75;

  return (
    <AieSceneShell
      id="scene2"
      showSubtitles={showSubtitles}
      backdropImage="ai-engineer/server-cloud-backdrop.png"
      backdropOpacity={0.32}
      backdropZoomFrom={1.01}
      backdropZoomTo={1.06}
      sfx={[
        { atSec: AIE_LEAD_SEC + 3.0, type: "pop", volume: 0.2 },
        { atSec: AIE_LEAD_SEC + 6.4, type: "click", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 7.45, type: "click", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 8.3, type: "click", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 9.15, type: "chime", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 10.35, type: "pop", volume: 0.24 },
      ]}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.94fr 1.12fr",
          gap: 32,
          height: "100%",
          paddingTop: 10,
          paddingBottom: 14,
        }}
      >
        {/* LEFT COLUMN: Consistent Photorealistic AI Engineer at Futuristic Desk */}
        <div
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            border: `1.5px solid ${AIE_C.borderPurple}`,
            boxShadow:
              "0 28px 70px rgba(0, 0, 0, 0.7), 0 0 36px rgba(124, 58, 237, 0.22)",
            opacity: portraitP,
            transform: `translate3d(${interpolate(portraitP, [0, 1], [-24, 0])}px, 0px, 0px)`,
          }}
        >
          <Img
            src={staticFile("ai-engineer/engineer-working.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${imgScale})`,
            }}
          />
          {/* Cinematic Bottom Gradient inside Frame */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(4, 7, 20, 0.25) 0%, transparent 45%, rgba(4, 7, 20, 0.92) 100%)",
            }}
          />

          {/* Top Left Documentary Live Indicator */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              background: "rgba(6, 10, 26, 0.82)",
              border: `1px solid ${AIE_C.borderBlue}`,
              borderRadius: 10,
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: 9,
              backdropFilter: "blur(10px)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 99,
                background: AIE_C.cyan,
                boxShadow: `0 0 10px ${AIE_C.cyan}`,
              }}
            />
            <span style={{ fontFamily: AIE_MONO, fontSize: 13, color: "#E2E8F0", letterSpacing: 1 }}>
              AI WORKSTATION · ACTIVE
            </span>
          </div>

          {/* Lower Third Identity Card */}
          <div
            style={{
              position: "absolute",
              left: 24,
              right: 24,
              bottom: 24,
              background: "rgba(9, 14, 36, 0.88)",
              border: `1px solid ${AIE_C.borderPurple}`,
              borderLeft: `4px solid ${AIE_C.cyan}`,
              borderRadius: 16,
              padding: "18px 22px",
              backdropFilter: "blur(14px)",
            }}
          >
            <div style={{ fontFamily: AIE_MONO, fontSize: 13, color: AIE_C.blue, letterSpacing: 1.5 }}>
              SOFTWARE PROFESSIONAL
            </div>
            <div style={{ fontFamily: AIE_DISPLAY, fontSize: 34, fontWeight: 800, color: AIE_C.text, marginTop: 4 }}>
              AI Engineer
            </div>
            <div style={{ fontSize: 17, color: AIE_C.textMuted, marginTop: 4 }}>
              Bridging Artificial Intelligence &amp; Production Software Systems
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Brain + Interconnected Network + 4-Stage Lifecycle + Real-World Goal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {/* Top Visual: AI Brain ↔ Computer ↔ Interconnected Digital Network */}
          <div
            style={{
              opacity: brainP,
              transform: `scale(${interpolate(brainP, [0, 1], [0.95, 1])})`,
              background: AIE_C.panel,
              border: `1.5px solid ${AIE_C.borderBlue}`,
              borderRadius: 22,
              padding: "20px 26px",
              height: 300,
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontFamily: AIE_MONO, fontSize: 13, color: AIE_C.cyan, letterSpacing: 1.4 }}>
                INTELLIGENT SYSTEM TOPOLOGY
              </span>
              <span style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.purple }}>
                NEURAL ENGINE ↔ COMPUTE ↔ NETWORK
              </span>
            </div>

            <svg width="100%" height="232" viewBox="0 0 880 232">
              <defs>
                <linearGradient id="netGrad" gradientUnits="userSpaceOnUse" x1="210" y1="116" x2="420" y2="116">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(168, 85, 247, 0.45)" />
                  <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                </radialGradient>
              </defs>

              {/* Connecting Lines */}
              <line x1="210" y1="116" x2="420" y2="116" stroke="url(#netGrad)" strokeWidth="3" strokeDasharray="8 6" opacity="0.8" />
              <line x1="510" y1="116" x2="680" y2="54" stroke="#38BDF8" strokeWidth="2.2" opacity="0.65" />
              <line x1="510" y1="116" x2="720" y2="116" stroke="#A855F7" strokeWidth="2.5" opacity="0.75" />
              <line x1="510" y1="116" x2="680" y2="178" stroke="#10B981" strokeWidth="2.2" opacity="0.65" />

              {/* Animated Traveling Data Packets */}
              <circle cx={210 + packetT * 210} cy="116" r="5.5" fill="#00E5FF" />
              <circle cx={510 + packetT * 170} cy={116 - packetT * 62} r="4.5" fill="#38BDF8" />
              <circle cx={510 + packetT * 210} cy="116" r="5" fill="#C084FC" />
              <circle cx={510 + packetT * 170} cy={116 + packetT * 62} r="4.5" fill="#34D399" />

              {/* AI BRAIN NODE (Left) */}
              <circle cx="135" cy="116" r={72 + pulse * 6} fill="url(#brainGlow)" />
              <circle cx="135" cy="116" r="56" fill="#130E35" stroke="#A855F7" strokeWidth="2.5" />
              {/* Stylized Neural Brain Synapses */}
              {[
                [112, 96], [135, 84], [158, 96],
                [106, 118], [135, 116], [164, 118],
                [116, 140], [135, 148], [154, 140],
              ].map(([nx, ny], idx) => (
                <g key={idx}>
                  <line x1={nx} y1={ny} x2="135" y2="116" stroke="#C084FC" strokeWidth="1.4" opacity="0.65" />
                  <circle cx={nx} cy={ny} r={idx === 4 ? 7 : 4.2} fill={idx % 2 === 0 ? "#00E5FF" : "#C084FC"} />
                </g>
              ))}
              <text x="135" y="196" textAnchor="middle" fill="#E9D5FF" fontSize="14" fontWeight="700" fontFamily={AIE_MONO}>
                AI NEURAL BRAIN
              </text>

              {/* COMPUTER SYSTEM CORE (Center) */}
              <rect x="405" y="68" width="115" height="96" rx="16" fill="#0C1938" stroke="#38BDF8" strokeWidth="2.5" />
              <rect x="424" y="86" width="77" height="44" rx="6" fill="#071026" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="436" y1="102" x2="486" y2="102" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="436" y1="114" x2="472" y2="114" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="444" y="140" width="38" height="8" rx="4" fill="#38BDF8" opacity="0.7" />
              <text x="462" y="196" textAnchor="middle" fill="#BAE6FD" fontSize="14" fontWeight="700" fontFamily={AIE_MONO}>
                SOFTWARE CORE
              </text>

              {/* DIGITAL NETWORK NODES (Right) */}
              {[
                { x: 730, y: 54, label: "CLOUD APIs", c: "#38BDF8" },
                { x: 760, y: 116, label: "USER APPS", c: "#A855F7" },
                { x: 730, y: 178, label: "DATA STREAMS", c: "#10B981" },
              ].map((node, i) => (
                <g key={i}>
                  <rect x={node.x - 66} y={node.y - 22} width="144" height="44" rx="12" fill="rgba(12, 18, 44, 0.92)" stroke={node.c} strokeWidth="1.8" />
                  <circle cx={node.x - 46} cy={node.y} r="5" fill={node.c} />
                  <text x={node.x - 32} y={node.y + 5} fill="#F8FAFC" fontSize="13" fontWeight="700" fontFamily={AIE_MONO}>
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Middle Visual: 4 Sequential Engineering Verbs (Design · Develop · Integrate · Deploy) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            {LIFECYCLE.map((step) => {
              const sp = spring({
                frame: frame - Math.round((AIE_LEAD_SEC + step.atSec) * fps),
                fps,
                config: SPRING_UI,
              });
              const lit = voiceSec >= step.atSec;
              return (
                <div
                  key={step.num}
                  style={{
                    background: lit
                      ? "linear-gradient(160deg, rgba(16, 24, 58, 0.94), rgba(26, 16, 62, 0.94))"
                      : "rgba(9, 14, 34, 0.65)",
                    border: `1.5px solid ${lit ? step.accent : AIE_C.borderSubtle}`,
                    borderRadius: 18,
                    padding: "20px 18px",
                    opacity: 0.3 + sp * 0.7,
                    transform: `translate3d(0px, ${interpolate(sp, [0, 1], [16, 0])}px, 0px)`,
                    boxShadow: lit ? `0 14px 36px ${step.accent}26` : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: AIE_MONO,
                      fontSize: 13,
                      fontWeight: 700,
                      color: step.accent,
                      marginBottom: 8,
                    }}
                  >
                    STEP {step.num}
                  </div>
                  <div
                    style={{
                      fontFamily: AIE_DISPLAY,
                      fontSize: 24,
                      fontWeight: 800,
                      color: AIE_C.text,
                      marginBottom: 6,
                    }}
                  >
                    {step.label}
                  </div>
                  <div style={{ fontSize: 14.5, color: AIE_C.textMuted, lineHeight: 1.35 }}>
                    {step.sub}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Mission Card: Real-World Impact */}
          <div
            style={{
              opacity: missionP,
              transform: `translate3d(0px, ${interpolate(missionP, [0, 1], [22, 0])}px, 0px)`,
              background:
                "linear-gradient(135deg, rgba(12, 22, 54, 0.94), rgba(40, 18, 82, 0.92))",
              border: `1.5px solid ${AIE_C.purple}`,
              borderRadius: 22,
              padding: "24px 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              boxShadow: "0 20px 55px rgba(124, 58, 237, 0.25)",
            }}
          >
            <div>
              <div style={{ fontFamily: AIE_MONO, fontSize: 13, color: AIE_C.cyan, letterSpacing: 1.5, marginBottom: 6 }}>
                CORE MISSION
              </div>
              <div style={{ fontFamily: AIE_DISPLAY, fontSize: 28, fontWeight: 800, color: AIE_C.text }}>
                AI Technology ➔ Real-World Solutions
              </div>
              <div style={{ fontSize: 16.5, color: AIE_C.textMuted, marginTop: 4 }}>
                Turning artificial intelligence into reliable, practical everyday impact
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
              {["AUTOMATION", "INTELLIGENCE", "SCALE"].map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontFamily: AIE_MONO,
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: "#E0F2FE",
                    background: "rgba(56, 189, 248, 0.14)",
                    border: `1px solid ${AIE_C.borderBlue}`,
                    padding: "8px 14px",
                    borderRadius: 10,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AieSceneShell>
  );
};
