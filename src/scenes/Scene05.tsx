import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import {
  CI_YML_LINES,
  COLORS,
  FONTS,
  LAYOUT,
  SHADOWS,
  SPRING_CONFIG,
} from "../theme";
import {
  SCENES_META,
  createSceneScaler,
  type SceneComponentProps,
} from "../narration";
import { Character } from "../components/Character";
import { CodeEditor } from "../components/CodeEditor";
import { ConceptTag } from "../components/ConceptTag";
import { SceneSubtitles } from "../components/Subtitle";

const META = SCENES_META[4];
const SCENE5_CODE = CI_YML_LINES.slice(0, 6).join("\n");

export const Scene05: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced cue frames
  const folder1Frame = f(14); // my-react-app/
  const folder2Frame = f(54); // .github/
  const folder3Frame = f(92); // workflows/
  const fileSpawnFrame = f(142); // ci.yml + sparkle ("সেখানে তৈরি করলেন একটি YAML File।")
  const editorStartFrame = f(185); // CodeEditor opens & types lines 1–6
  const eventHighlightFrame = f(250); // "প্রথমেই লিখলেন on, অর্থাৎ কোন Event-এ..."
  const triggersStartFrame = f(372); // "যেমন main Branch-এ Push বা Pull Request।"

  const nadiaTalking = frame >= f(8) && frame <= f(472);

  // Sparkle burst around new ci.yml row
  const sparkleSpring =
    frame >= fileSpawnFrame
      ? spring({
          frame: frame - fileSpawnFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const sparklePulse =
    frame >= fileSpawnFrame
      ? 0.55 + 0.45 * Math.sin((frame - fileSpawnFrame) * 0.25)
      : 0;

  // CodeEditor slide-in
  const editorSpring =
    frame >= editorStartFrame
      ? spring({
          frame: frame - editorStartFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  const isEventHighlighted = frame >= eventHighlightFrame;

  // Triggers section (Push ↑ and Pull Request ⇄)
  const triggerSpring =
    frame >= triggersStartFrame
      ? spring({
          frame: frame - triggersStartFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  // Purple pulse traveling from Push & PR badges up into the `on:` line
  const pulseElapsed = Math.max(0, frame - triggersStartFrame);
  const pushPulseT = (pulseElapsed % 46) / 46;
  const prPulseT = ((pulseElapsed + 23) % 46) / 46;

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        fontFamily: FONTS.ui,
      }}
    >
      {/* Scene 05 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      {/* Subtle dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(163, 113, 247, 0.14) 1.4px, transparent 1.4px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Top Row: Section Pill + Small Nadia Apu Avatar (talking=true) */}
      <div
        style={{
          position: "absolute",
          top: LAYOUT.safeTop,
          left: LAYOUT.safeX,
          right: LAYOUT.safeX,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 25,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 20px",
              borderRadius: 999,
              backgroundColor: COLORS.panel,
              border: `1.5px solid ${COLORS.event}77`,
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: COLORS.event,
              }}
            />
            <span
              style={{
                fontFamily: FONTS.bangla,
                fontSize: 22,
                fontWeight: 700,
                color: COLORS.text,
              }}
            >
              ধাপ ১ · Workflow File এবং Event
            </span>
          </div>
          {isEventHighlighted ? (
            <ConceptTag
              label="Event"
              subLabel="কখন চালু হবে?"
              color={COLORS.event}
              startFrame={eventHighlightFrame}
            />
          ) : null}
        </div>

        {/* Small Nadia Apu corner avatar */}
        <div
          style={{
            width: 146,
            height: 146,
            borderRadius: "50%",
            backgroundColor: "#14262E",
            border: `3px solid ${COLORS.runner}`,
            boxShadow: SHADOWS.glow(COLORS.runner),
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Character
            name="nadia"
            expression="smile"
            talking={nadiaTalking}
            size={156}
            style={{ marginBottom: -28 }}
          />
        </div>
      </div>

      {/* VS Code File Explorer Card (Top-Left Folder Tree) */}
      <div
        style={{
          position: "absolute",
          top: 265,
          left: LAYOUT.safeX,
          right: LAYOUT.safeX,
          backgroundColor: COLORS.panel,
          borderRadius: LAYOUT.cardRadius,
          border: `1.5px solid ${COLORS.border}`,
          boxShadow: SHADOWS.card,
          overflow: "hidden",
          zIndex: 20,
        }}
      >
        {/* Explorer Header */}
        <div
          style={{
            height: 46,
            backgroundColor: "#11161D",
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 22px",
            fontSize: 15,
            fontWeight: 700,
            color: COLORS.muted,
            letterSpacing: 1.1,
            textTransform: "uppercase",
          }}
        >
          <span>Explorer — VS Code</span>
          <span style={{ fontFamily: FONTS.code, color: COLORS.event }}>
            .github/workflows
          </span>
        </div>

        {/* Expanding Folder Tree */}
        <div
          style={{
            padding: "18px 26px 22px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontFamily: FONTS.code,
            fontSize: 25,
          }}
        >
          <FolderTreeRow
            label="my-react-app/"
            indent={0}
            isFolder
            startFrame={folder1Frame}
            accent={COLORS.text}
          />
          <FolderTreeRow
            label=".github/"
            indent={1}
            isFolder
            startFrame={folder2Frame}
            accent={COLORS.job}
          />
          <FolderTreeRow
            label="workflows/"
            indent={2}
            isFolder
            startFrame={folder3Frame}
            accent={COLORS.runner}
          />

          {/* ci.yml new file row with animated sparkle */}
          {frame >= fileSpawnFrame ? (
            <div
              style={{
                marginLeft: 3 * 34,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 18px",
                borderRadius: 12,
                backgroundColor: `${COLORS.event}24`,
                border: `1.5px solid ${COLORS.event}`,
                width: "fit-content",
                transform: `scale(${interpolate(sparkleSpring, [0, 1], [0.7, 1])})`,
                opacity: sparkleSpring,
                boxShadow: SHADOWS.glow(COLORS.event),
              }}
            >
              <span style={{ color: COLORS.event, fontSize: 22 }}>📄</span>
              <span style={{ color: "#FFFFFF", fontWeight: 700 }}>ci.yml</span>
              <span
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#0D1117",
                  backgroundColor: "#FACC15",
                  padding: "3px 10px",
                  borderRadius: 999,
                  marginLeft: 6,
                }}
              >
                NEW
              </span>
              {/* Sparkle SVG stars */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                style={{ opacity: sparklePulse, marginLeft: 2 }}
              >
                <path
                  d="M 15 2 L 17.5 12.5 L 28 15 L 17.5 17.5 L 15 28 L 12.5 17.5 L 2 15 L 12.5 12.5 Z"
                  fill="#FDE047"
                />
              </svg>
            </div>
          ) : null}
        </div>
      </div>

      {/* CodeEditor Opening & Typing Lines 1–6 */}
      {frame >= editorStartFrame ? (
        <div
          style={{
            position: "absolute",
            top: 645,
            left: LAYOUT.safeX,
            right: LAYOUT.safeX,
            transform: `translateY(${interpolate(editorSpring, [0, 1], [60, 0])}px)`,
            opacity: editorSpring,
            zIndex: 25,
          }}
        >
          <CodeEditor
            code={SCENE5_CODE}
            highlightLines={isEventHighlighted ? [2, 3, 4, 5, 6] : []}
            highlightColor={COLORS.event}
            dimLines={isEventHighlighted ? [1] : []}
            typingStartFrame={editorStartFrame + 6}
            charsPerFrame={1.6}
            fontSize={28}
            width="100%"
          />
        </div>
      ) : null}

      {/* Trigger Cards ("Push ↑" and "Pull Request ⇄") + Purple Energy Pulses into `on:` */}
      {frame >= triggersStartFrame ? (
        <div
          style={{
            position: "absolute",
            top: 1185,
            left: LAYOUT.safeX,
            right: LAYOUT.safeX,
            height: 480,
            opacity: triggerSpring,
            zIndex: 30,
          }}
        >
          {/* SVG Pulse Beams shooting upward from the two trigger cards into CodeEditor's `on:` block */}
          <svg
            viewBox="0 0 984 220"
            width="984"
            height="220"
            style={{
              position: "absolute",
              top: -120,
              left: 0,
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            <defs>
              <filter id="event-pulse-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Left dashed guide path from Push card -> on: block */}
            <path
              d="M 235 220 C 235 120 340 90 420 20"
              fill="none"
              stroke={COLORS.event}
              strokeWidth="4"
              strokeDasharray="10 8"
              opacity="0.65"
            />
            {/* Right dashed guide path from PR card -> on: block */}
            <path
              d="M 749 220 C 749 120 644 90 564 20"
              fill="none"
              stroke={COLORS.event}
              strokeWidth="4"
              strokeDasharray="10 8"
              opacity="0.65"
            />

            {/* Animated traveling purple pulse orb (Push ↑) */}
            {(() => {
              const t = pushPulseT;
              const x =
                (1 - t) ** 3 * 235 +
                3 * (1 - t) ** 2 * t * 235 +
                3 * (1 - t) * t ** 2 * 340 +
                t ** 3 * 420;
              const y =
                (1 - t) ** 3 * 220 +
                3 * (1 - t) ** 2 * t * 120 +
                3 * (1 - t) * t ** 2 * 90 +
                t ** 3 * 20;
              return (
                <g filter="url(#event-pulse-glow)">
                  <circle cx={x} cy={y} r="13" fill="#FFFFFF" />
                  <circle cx={x} cy={y} r="22" fill={COLORS.event} opacity="0.55" />
                </g>
              );
            })()}

            {/* Animated traveling purple pulse orb (Pull Request ⇄) */}
            {(() => {
              const t = prPulseT;
              const x =
                (1 - t) ** 3 * 749 +
                3 * (1 - t) ** 2 * t * 749 +
                3 * (1 - t) * t ** 2 * 644 +
                t ** 3 * 564;
              const y =
                (1 - t) ** 3 * 220 +
                3 * (1 - t) ** 2 * t * 120 +
                3 * (1 - t) * t ** 2 * 90 +
                t ** 3 * 20;
              return (
                <g filter="url(#event-pulse-glow)">
                  <circle cx={x} cy={y} r="13" fill="#FFFFFF" />
                  <circle cx={x} cy={y} r="22" fill={COLORS.event} opacity="0.55" />
                </g>
              );
            })()}
          </svg>

          {/* Trigger Cards Row */}
          <div
            style={{
              marginTop: 100,
              display: "flex",
              gap: 28,
              transform: `translateY(${interpolate(triggerSpring, [0, 1], [45, 0])}px)`,
            }}
          >
            {/* Card 1: Push ↑ */}
            <div
              style={{
                flex: 1,
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `2.5px solid ${COLORS.event}`,
                boxShadow: SHADOWS.glow(COLORS.event),
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 20,
                  backgroundColor: `${COLORS.event}28`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 42,
                  color: COLORS.event,
                  fontWeight: 800,
                }}
              >
                ↑
              </div>
              <div
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 34,
                  fontWeight: 800,
                  color: "#FFFFFF",
                }}
              >
                Push ↑
              </div>
              <div
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 20,
                  color: COLORS.event,
                  backgroundColor: `${COLORS.event}1F`,
                  padding: "6px 16px",
                  borderRadius: 999,
                }}
              >
                branches: [main]
              </div>
            </div>

            {/* Card 2: Pull Request ⇄ */}
            <div
              style={{
                flex: 1,
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `2.5px solid ${COLORS.event}`,
                boxShadow: SHADOWS.glow(COLORS.event),
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 20,
                  backgroundColor: `${COLORS.event}28`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 42,
                  color: COLORS.event,
                  fontWeight: 800,
                }}
              >
                ⇄
              </div>
              <div
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 34,
                  fontWeight: 800,
                  color: "#FFFFFF",
                }}
              >
                Pull Request ⇄
              </div>
              <div
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 20,
                  color: COLORS.event,
                  backgroundColor: `${COLORS.event}1F`,
                  padding: "6px 16px",
                  borderRadius: 999,
                }}
              >
                branches: [main]
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Bangla Subtitle Bar */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};

const FolderTreeRow: React.FC<{
  readonly label: string;
  readonly indent: number;
  readonly isFolder?: boolean;
  readonly startFrame: number;
  readonly accent: string;
}> = ({ label, indent, startFrame, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame) return null;
  const s = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING_CONFIG.snappy,
  });

  return (
    <div
      style={{
        marginLeft: indent * 34,
        display: "flex",
        alignItems: "center",
        gap: 12,
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [-18, 0])}px)`,
      }}
    >
      <span style={{ color: COLORS.muted, fontSize: 18 }}>▾</span>
      <span style={{ fontSize: 22 }}>📁</span>
      <span style={{ color: accent, fontWeight: 700 }}>{label}</span>
    </div>
  );
};
