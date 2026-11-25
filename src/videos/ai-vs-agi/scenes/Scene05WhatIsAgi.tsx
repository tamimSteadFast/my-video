import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, getLayoutMetrics, SPRING_CONFIGS } from "../../../config/theme";
import { AUDIO_CONFIG, SCENE_CUES, sec, SFX_FILES } from "../../../config/timing";
import { AnimatedBackground } from "../components/AnimatedBackground";
import {
  BrainNetworkIcon,
  LearnBookIcon,
  ReasoningGearIcon,
  TransferArrowsIcon,
  UnderstandBulbIcon,
} from "../components/Icons";
import { Title } from "../components/Title";

interface AgiNode {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  startFrame: number;
  xPct: number;
  yPct: number;
}

export const Scene05WhatIsAgi: React.FC<{ hasSfx?: boolean }> = ({
  hasSfx = AUDIO_CONFIG.hasSfx,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);
  const cues = SCENE_CUES.whatIsAgi;

  const badgeStart = sec(cues.theoreticalBadge);
  const coreStart = sec(cues.coreIgnite);
  const crossStart = sec(cues.crossLinks);

  const badgeSpring = spring({
    frame: frame - badgeStart,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const coreSpring = spring({
    frame: frame - coreStart,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const pulse = 1 + Math.sin(frame * 0.1) * 0.05;

  const nodes: AgiNode[] = metrics.isVertical
    ? [
        {
          id: "learn",
          title: "শেখা",
          subtitle: "Learn",
          icon: <LearnBookIcon size={28} color={COLORS.agi} />,
          startFrame: sec(cues.nodeLearn),
          xPct: 24,
          yPct: 16,
        },
        {
          id: "understand",
          title: "বোঝা",
          subtitle: "Understand",
          icon: <UnderstandBulbIcon size={28} color={COLORS.agi} />,
          startFrame: sec(cues.nodeUnderstand),
          xPct: 76,
          yPct: 16,
        },
        {
          id: "reasoning",
          title: "Reasoning",
          subtitle: "যুক্তি বিশ্লেষণ",
          icon: <ReasoningGearIcon size={28} color={COLORS.agi} />,
          startFrame: sec(cues.nodeReasoning),
          xPct: 24,
          yPct: 84,
        },
        {
          id: "transfer",
          title: "নতুন পরিস্থিতিতে প্রয়োগ",
          subtitle: "Transfer",
          icon: <TransferArrowsIcon size={28} color={COLORS.agi} />,
          startFrame: sec(cues.nodeTransfer),
          xPct: 76,
          yPct: 84,
        },
      ]
    : [
        {
          id: "learn",
          title: "শেখা",
          subtitle: "Learn",
          icon: <LearnBookIcon size={28} color={COLORS.agi} />,
          startFrame: sec(cues.nodeLearn),
          xPct: 18,
          yPct: 22,
        },
        {
          id: "understand",
          title: "বোঝা",
          subtitle: "Understand",
          icon: <UnderstandBulbIcon size={28} color={COLORS.agi} />,
          startFrame: sec(cues.nodeUnderstand),
          xPct: 82,
          yPct: 22,
        },
        {
          id: "reasoning",
          title: "Reasoning",
          subtitle: "যুক্তি বিশ্লেষণ",
          icon: <ReasoningGearIcon size={28} color={COLORS.agi} />,
          startFrame: sec(cues.nodeReasoning),
          xPct: 18,
          yPct: 78,
        },
        {
          id: "transfer",
          title: "নতুন পরিস্থিতিতে প্রয়োগ",
          subtitle: "Transfer",
          icon: <TransferArrowsIcon size={28} color={COLORS.agi} />,
          startFrame: sec(cues.nodeTransfer),
          xPct: 82,
          yPct: 78,
        },
      ];

  const crossOpacity = interpolate(frame, [crossStart, crossStart + 18], [0, 0.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const stageHeight = metrics.isVertical ? 880 : 540;

  return (
    <AbsoluteFill>
      <AnimatedBackground mood="agi" />

      {hasSfx
        ? nodes.map((n) => (
            <Sequence key={n.id} from={n.startFrame} durationInFrames={16}>
              <Audio src={staticFile(SFX_FILES.pop)} volume={AUDIO_CONFIG.sfxVolume * 0.6} />
            </Sequence>
          ))
        : null}

      <AbsoluteFill
        style={{
          paddingLeft: metrics.padX,
          paddingRight: metrics.padX,
          paddingTop: metrics.padTop,
          paddingBottom: metrics.padBottom,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: metrics.isVertical ? 24 : 18,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            width: "100%",
          }}
        >
          <Title
            eyebrow="03 • ARTIFICIAL GENERAL INTELLIGENCE"
            heading="Artificial General Intelligence (AGI)"
            accentColor={COLORS.agi}
            startFrame={sec(cues.heading)}
            align="center"
          />

          {/* Theoretical Badge synced at 3.5s */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 26px",
              borderRadius: 999,
              backgroundColor: COLORS.amberSoft,
              border: `1.5px solid ${COLORS.amberBorder}`,
              fontFamily: FONTS.primary,
              fontSize: metrics.isVertical ? 28 : 26,
              fontWeight: 700,
              color: COLORS.amber,
              letterSpacing: 0,
              opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
              scale: `${interpolate(badgeSpring, [0, 1], [0.85, 1])}`,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: COLORS.amber,
                boxShadow: `0 0 12px ${COLORS.amber}`,
              }}
            />
            Theoretical — এখনো তৈরি হয়নি
          </div>
        </div>

        {/* Central Neural Network Diagram */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: metrics.isVertical ? 950 : 1560,
            height: stageHeight,
          }}
        >
          {/* SVG Connecting Spokes & Cross-links */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            {/* Cross-links between outer 4 nodes illuminating at 12.8s */}
            <polygon
              points={`${nodes[0].xPct},${nodes[0].yPct} ${nodes[1].xPct},${nodes[1].yPct} ${nodes[3].xPct},${nodes[3].yPct} ${nodes[2].xPct},${nodes[2].yPct}`}
              fill="none"
              stroke={COLORS.agi}
              strokeWidth="2"
              strokeDasharray="10 10"
              vectorEffect="non-scaling-stroke"
              opacity={crossOpacity}
            />

            {/* Radial spokes growing from center (50,50) to each node */}
            {nodes.map((node) => {
              const progress = interpolate(
                frame,
                [node.startFrame - 8, node.startFrame + 8],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );
              const x2 = 50 + (node.xPct - 50) * progress;
              const y2 = 50 + (node.yPct - 50) * progress;
              return (
                <line
                  key={`line-${node.id}`}
                  x1={50}
                  y1={50}
                  x2={x2}
                  y2={y2}
                  stroke={COLORS.agi}
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  opacity={progress * 0.92}
                />
              );
            })}
          </svg>

          {/* Central Glowing Brain Hub (opaque core so lines terminate cleanly at rim) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              translate: "-50% -50%",
              width: metrics.isVertical ? 220 : 230,
              height: metrics.isVertical ? 220 : 230,
              borderRadius: "50%",
              background: "radial-gradient(circle, #2B2056 0%, #121A33 72%)",
              border: `2.5px solid ${COLORS.agi}`,
              boxShadow: `0 0 60px ${COLORS.agiGlow}, inset 0 0 28px ${COLORS.agi}38`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              opacity: interpolate(coreSpring, [0, 1], [0, 1]),
              scale: `${interpolate(coreSpring, [0, 1], [0.4, 1]) * pulse}`,
              zIndex: 4,
            }}
          >
            <BrainNetworkIcon size={metrics.isVertical ? 64 : 68} color={COLORS.agi} />
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: 22,
                fontWeight: 800,
                color: COLORS.textPrimary,
                letterSpacing: "0.08em",
              }}
            >
              AGI CORE
            </span>
          </div>

          {/* 4 Capability Nodes */}
          {nodes.map((node) => {
            const localF = frame - node.startFrame;
            const enter = spring({
              frame: localF,
              fps,
              config: SPRING_CONFIGS.bouncy,
            });
            const opacity = interpolate(localF, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={node.id}
                style={{
                  position: "absolute",
                  left: `${node.xPct}%`,
                  top: `${node.yPct}%`,
                  translate: "-50% -50%",
                  width: metrics.isVertical ? 410 : 410,
                  padding: metrics.isVertical ? "22px 22px" : "22px 26px",
                  borderRadius: 22,
                  backgroundColor: "#141D38",
                  border: `1.5px solid ${COLORS.agiBorder}`,
                  boxShadow: `0 12px 34px rgba(0, 0, 0, 0.48), 0 0 28px ${COLORS.agi}28`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity,
                  scale: `${interpolate(enter, [0, 1], [0.75, 1])}`,
                  zIndex: 5,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    backgroundColor: COLORS.agiSoft,
                    border: `1px solid ${COLORS.agiBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {node.icon}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div
                    style={{
                      fontFamily: FONTS.primary,
                      fontSize: metrics.isVertical ? 28 : 28,
                      fontWeight: 700,
                      color: COLORS.textPrimary,
                      lineHeight: 1.22,
                      letterSpacing: 0,
                    }}
                  >
                    {node.title}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.primary,
                      fontSize: metrics.isVertical ? 20 : 20,
                      fontWeight: 600,
                      color: COLORS.agi,
                      letterSpacing: 0,
                    }}
                  >
                    {node.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
