import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, getLayoutMetrics, SPRING_CONFIGS } from "../../../config/theme";
import { SCENE_CUES, sec } from "../../../config/timing";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { ComparisonRow, ComparisonTable } from "../components/ComparisonTable";
import { Title } from "../components/Title";

export const Scene06Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);
  const cues = SCENE_CUES.comparison;

  const focusAgiFrame = sec(cues.focusAgiColumn);
  const summaryFrame = sec(cues.summaryPill);

  const focusColumn: "none" | "ai" | "agi" =
    frame >= summaryFrame
      ? "none"
      : frame >= focusAgiFrame
        ? "agi"
        : frame >= sec(cues.rowScope)
          ? "ai"
          : "none";

  const rows: ComparisonRow[] = [
    {
      topic: "Scope",
      narrowAi: "নির্দিষ্ট কাজ",
      agi: "যেকোনো কাজ",
      startFrame: sec(cues.rowScope),
    },
    {
      topic: "Learning",
      narrowAi: "Training data-নির্ভর",
      agi: "মানুষের মতো নিজে শেখা",
      startFrame: sec(cues.rowLearning),
    },
    {
      topic: "নতুন পরিস্থিতি",
      narrowAi: "সীমিত",
      agi: "সহজে মানিয়ে নেয়",
      startFrame: sec(cues.rowNewSituation),
    },
    {
      topic: "Existence",
      narrowAi: "আজই আছে",
      agi: "এখনো নেই",
      startFrame: sec(cues.rowExistence),
    },
  ];

  const summarySpring = spring({
    frame: frame - summaryFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  return (
    <AbsoluteFill>
      <AnimatedBackground mood="mixed" />

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
          gap: metrics.isVertical ? 32 : 24,
        }}
      >
        <Title
          eyebrow="04 • KEY DIFFERENCES"
          heading="AI vs AGI — মূল পার্থক্য"
          accentColor={focusColumn === "agi" ? COLORS.agi : COLORS.ai}
          startFrame={sec(cues.heading)}
          align="center"
        />

        <div
          style={{
            width: "100%",
            maxWidth: metrics.isVertical ? 960 : 1520,
          }}
        >
          <ComparisonTable
            rows={rows}
            headerStartFrame={sec(cues.heading) + 8}
            focusColumn={focusColumn}
          />
        </div>

        {/* Takeaway Summary Pill */}
        <div
          style={{
            display: "flex",
            flexDirection: metrics.isVertical ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: metrics.isVertical ? 14 : 24,
            opacity: interpolate(summarySpring, [0, 1], [0, 1]),
            translate: `0px ${interpolate(summarySpring, [0, 1], [18, 0])}px`,
          }}
        >
          <div
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              backgroundColor: COLORS.aiSoft,
              border: `1.5px solid ${COLORS.aiBorder}`,
              fontFamily: FONTS.display,
              fontSize: metrics.isVertical ? 26 : 25,
              fontWeight: 700,
              color: COLORS.ai,
            }}
          >
            Narrow AI = Specialist
          </div>

          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 26,
              fontWeight: 800,
              color: COLORS.textMuted,
            }}
          >
            vs
          </span>

          <div
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              backgroundColor: COLORS.agiSoft,
              border: `1.5px solid ${COLORS.agiBorder}`,
              fontFamily: FONTS.display,
              fontSize: metrics.isVertical ? 26 : 25,
              fontWeight: 700,
              color: COLORS.agi,
            }}
          >
            AGI = Generalist
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
