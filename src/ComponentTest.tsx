import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import {
  COLORS,
  FONTS,
  LAYOUT,
  SHADOWS,
} from "./theme";
import { GrainOverlay } from "./components/GrainOverlay";
import {
  Character,
  type CharacterExpression,
} from "./components/Character";
import { CodeEditor } from "./components/CodeEditor";
import { ActionsRun } from "./components/ActionsRun";
import { Terminal } from "./components/Terminal";
import { Subtitle } from "./components/Subtitle";
import { ConceptTag } from "./components/ConceptTag";
import { SceneTransition } from "./components/SceneTransition";

const EXPRESSIONS: readonly CharacterExpression[] = [
  "neutral",
  "tired",
  "shocked",
  "happy",
  "smile",
];

const SAMPLE_YML = `name: CI
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest`;

export const ComponentTest: React.FC = () => {
  const frame = useCurrentFrame();
  const exprIndex = Math.floor(frame / 45) % EXPRESSIONS.length;
  const currentExpression = EXPRESSIONS[exprIndex];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: FONTS.ui,
        color: COLORS.text,
      }}
    >
      {/* Faint dot grid background */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(139, 148, 158, 0.16) 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Stage container respecting top/bottom safe zones */}
      <div
        style={{
          position: "absolute",
          top: LAYOUT.safeTop,
          left: LAYOUT.safeX,
          right: LAYOUT.safeX,
          bottom: LAYOUT.subtitleSafeBottom + 24,
          display: "flex",
          flexDirection: "column",
          gap: 24,
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
            <div style={{ fontSize: 34, fontWeight: 800, color: COLORS.text }}>
              ComponentTest
            </div>
            <div
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 22,
                fontWeight: 600,
                color: COLORS.muted,
                letterSpacing: 0,
              }}
            >
              GitHub Actions Story — সব Reusable Components
            </div>
          </div>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: 12,
              backgroundColor: COLORS.panel,
              border: `1px solid ${COLORS.border}`,
              fontFamily: FONTS.code,
              fontSize: 18,
              color: COLORS.runner,
            }}
          >
            expr: {currentExpression}
          </div>
        </div>

        {/* 1. ConceptTag row (all 4 concept colors) */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          <ConceptTag label="Event" color={COLORS.event} startFrame={5} />
          <ConceptTag label="Job" color={COLORS.job} startFrame={12} />
          <ConceptTag label="Runner" color={COLORS.runner} startFrame={19} />
          <ConceptTag label="Step" color={COLORS.step} startFrame={26} />
        </div>

        {/* 2. Character row (Rafi & Nadia Apu) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-end",
            backgroundColor: COLORS.panel,
            borderRadius: LAYOUT.cardRadius,
            border: `1.5px solid ${COLORS.border}`,
            boxShadow: SHADOWS.soft,
            padding: "16px 24px 10px 24px",
            height: 290,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Character
              name="rafi"
              expression={currentExpression}
              talking={frame % 60 < 30}
              size={215}
            />
            <div
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.text,
                marginTop: -6,
              }}
            >
              রাফি (Rafi)
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Character
              name="nadia"
              expression={currentExpression === "tired" ? "smile" : currentExpression}
              talking={frame % 60 >= 30}
              size={215}
            />
            <div
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.runner,
                marginTop: -6,
              }}
            >
              নাদিয়া আপু (Nadia)
            </div>
          </div>
        </div>

        {/* 3. CodeEditor */}
        <CodeEditor
          code={SAMPLE_YML}
          highlightLines={[2, 3, 4]}
          highlightColor={COLORS.event}
          dimLines={[1]}
          typingStartFrame={10}
          charsPerFrame={3}
          fontSize={22}
          width="100%"
        />

        {/* 4. ActionsRun */}
        <ActionsRun
          workflow="CI"
          job="build"
          width="100%"
          steps={[
            { name: "actions/checkout@v4", startFrame: 15, endFrame: 40, result: "success" },
            { name: "npm ci", startFrame: 40, endFrame: 70, result: "success" },
            { name: "npm test", startFrame: 70, endFrame: 115, result: "fail" },
            { name: "npm run build", startFrame: 115, endFrame: 145, result: "skipped" },
          ]}
          logLines={["FAIL src/App.test.jsx", "✕ renders homepage (12 ms)"]}
          showLogAtFrame={118}
        />

        {/* 5. Terminal */}
        <Terminal
          width="100%"
          fontSize={22}
          lines={[
            { text: "git push origin main", startFrame: 20 },
            { text: "deploying to server... ✓ done", startFrame: 55, isOutput: true },
          ]}
        />
      </div>

      {/* 6. Subtitle (in bottom 160px safe area) */}
      <Subtitle
        text="নাদিয়া আপু বললেন — একই কাজ বারবার? GitHub Actions-কে দাও!"
        startFrame={10}
        endFrame={285}
      />

      {/* 7. SceneTransition wipe preview near end of ComponentTest */}
      <Sequence from={210} durationInFrames={12}>
        <SceneTransition accentColor={COLORS.runner} />
      </Sequence>

      <GrainOverlay opacity={0.04} />
    </AbsoluteFill>
  );
};
