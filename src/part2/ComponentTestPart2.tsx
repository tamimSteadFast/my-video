import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, LAYOUT } from "../theme";
import { GrainOverlay } from "../components/GrainOverlay";
import { ConceptTag } from "../components/ConceptTag";
import { Character } from "../components/Character";
import { Terminal } from "../components/Terminal";
import { HtopMonitor } from "../components/HtopMonitor";
import { ServerBox } from "../components/ServerBox";
import { BrowserWindow } from "../components/BrowserWindow";
import { PhoneCall } from "../components/PhoneCall";
import { RamJar } from "../components/RamJar";
import { TransferBeam } from "../components/TransferBeam";
import { Subtitle } from "../components/Subtitle";

export const ComponentTestPart2: React.FC = () => {
  const frame = useCurrentFrame();

  const browserState =
    frame < 60
      ? "loading"
      : frame < 120
        ? "ok"
        : frame < 180
          ? "error502"
          : "newVersion";

  const serverStatus =
    frame < 80 ? "healthy" : frame < 160 ? "stressed" : "down";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: FONTS.ui,
        color: COLORS.text,
      }}
    >
      {/* Subtle dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(139, 148, 158, 0.14) 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Native 9:16 Stage Container (above bottom 160px Subtitle safe zone) */}
      <div
        style={{
          position: "absolute",
          top: LAYOUT.safeTop,
          left: LAYOUT.safeX,
          right: LAYOUT.safeX,
          bottom: LAYOUT.subtitleSafeBottom + 24,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 32, fontWeight: 800 }}>
              ComponentTestPart2 — 9:16
            </div>
            <div
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 21,
                fontWeight: 600,
                color: COLORS.muted,
              }}
            >
              রাফির গল্প (পর্ব ২) — Reels Vertical Components
            </div>
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 10,
              backgroundColor: COLORS.panel,
              border: `1px solid ${COLORS.vps}`,
              fontFamily: FONTS.code,
              fontSize: 16,
              color: COLORS.vps,
            }}
          >
            1080×1920
          </div>
        </div>

        {/* All 5 Concept Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <ConceptTag label="Event" color={COLORS.event} startFrame={0} />
          <ConceptTag label="Job" color={COLORS.job} startFrame={4} />
          <ConceptTag label="Runner" color={COLORS.runner} startFrame={8} />
          <ConceptTag label="Step" color={COLORS.step} startFrame={12} />
          <ConceptTag label="VPS" color={COLORS.vps} startFrame={16} />
        </div>

        {/* Row 1: HtopMonitor (Portrait-Safe) */}
        <HtopMonitor
          cpu={(f) =>
            interpolate(f, [10, 150], [35, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
          mem={(f) =>
            interpolate(f, [10, 150], [30, 99], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
          memTotal="1.0G"
          processes={[
            { name: "node (vite build)", cpu: 92, mem: 81 },
            { name: "node (site)", cpu: 5.2, mem: 12.4 },
          ]}
          compact
        />

        {/* Row 2: BrowserWindow */}
        <BrowserWindow
          url="client-website.com"
          state={browserState}
          stateChangeFrame={180}
          width="100%"
          height={295}
        />

        {/* Row 3: Two-Column Split (PhoneCall + Worried Rafi | RamJar) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.08fr 0.92fr",
            gap: 18,
            height: 410,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.panel,
              borderRadius: LAYOUT.cardRadius,
              border: `1.5px solid ${COLORS.border}`,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: 310,
                height: 360,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <PhoneCall
                caller="Client"
                scale={0.52}
                notifications={[
                  { text: "সাইট খুলছে না!", startFrame: 15 },
                  { text: "জরুরি!", startFrame: 45 },
                ]}
              />
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <Character
                name="rafi"
                expression="worried"
                talking={false}
                size={145}
              />
              <div
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 14,
                  color: COLORS.vps,
                  marginTop: -6,
                }}
              >
                worried
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: COLORS.panel,
              borderRadius: LAYOUT.cardRadius,
              border: `1.5px solid ${COLORS.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div style={{ transform: "scale(0.76)", transformOrigin: "center center" }}>
              <RamJar
                capacityLabel="1 GB"
                overflowFrame={135}
                blocks={[
                  { label: "Nginx", height: 48, dropFrame: 15, color: "#8B949E" },
                  { label: "Website", height: 82, dropFrame: 45, color: COLORS.success },
                  { label: "npm install", height: 112, dropFrame: 80, color: COLORS.running },
                  { label: "Build", height: 140, dropFrame: 115, color: COLORS.fail },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Row 4: Frozen Terminal */}
        <Terminal
          title="rafi@client-vps — frozen test"
          width="100%"
          fontSize={22}
          frozen={frame >= 110}
          frozenStartFrame={110}
          lines={[
            { text: "npm run build", startFrame: 8, typeSpeed: 1.5 },
            {
              text: "transforming (1243) modules...",
              startFrame: 35,
              isOutput: true,
            },
          ]}
        />

        {/* Row 5: ServerBox Pair + TransferBeam (984px calibrated) */}
        <div
          style={{
            position: "relative",
            flex: 1,
            borderRadius: LAYOUT.cardRadius,
            backgroundColor: COLORS.panel,
            border: `1.5px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 72px",
          }}
        >
          <ServerBox
            label="Runner"
            size="large"
            status="healthy"
            scale={0.78}
          />
          <ServerBox
            label={`VPS (${serverStatus})`}
            size="small"
            status={serverStatus}
            scale={0.86}
          />
          <TransferBeam
            from={[275, 130]}
            to={[715, 138]}
            label="rsync over SSH"
            startFrame={20}
            durationFrames={120}
            curveOffset={-78}
          />
        </div>
      </div>

      {/* Subtitle Safe-Zone Verification */}
      <Subtitle
        text="নতুন ComponentTestPart2 — 9:16 Reels ভার্সন সঠিকভাবে কাজ করছে।"
        startFrame={0}
        endFrame={240}
      />

      <GrainOverlay opacity={0.04} />
    </AbsoluteFill>
  );
};
