import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import {
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
import { SceneSubtitles } from "../components/Subtitle";

const META = SCENES_META[3];

const TITLE_TEXT = "GitHub Actions = Automation Tool";

const NODES = [
  { id: "push", label: "Code Push", sub: "Trigger", x: 145, color: COLORS.event },
  { id: "test", label: "Test", sub: "Verify", x: 405, color: COLORS.job },
  { id: "build", label: "Build", sub: "Compile", x: 665, color: COLORS.runner },
  { id: "deploy", label: "Deploy", sub: "Ship", x: 925, color: COLORS.success },
] as const;

export const Scene04: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced frame anchors
  const titleStart = f(10);
  const pipelineStart = f(136); // "এটি দিয়ে তৈরি হয় CI/CD Pipeline।"
  const ciBracketStart = f(228); // "CI মানে Continuous Integration,"
  const cdBracketStart = f(308); // "আর CD মানে Continuous Deployment।"
  const flyIntoFileStart = f(404); // "আর সব নিয়ম লেখা থাকে একটি Workflow File-এ।"
  const fileBounceFrame = f(444);

  // Title typewriter (10..74)
  const titleChars = Math.min(
    TITLE_TEXT.length,
    Math.max(0, Math.floor((frame - titleStart) * 0.65)),
  );
  const typedTitle = TITLE_TEXT.slice(0, titleChars);
  const cursorVisible = Math.floor(frame / 12) % 2 === 0;

  // Animated SVG stroke draw left-to-right (136..218)
  const lineLength = 780;
  const lineDrawProgress = interpolate(
    frame,
    [pipelineStart, pipelineStart + 76],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );
  const strokeDashoffset = lineLength * (1 - lineDrawProgress);

  // Glowing particle continuously traveling along the pipeline
  const particleActive = frame >= pipelineStart + 30 && frame < flyIntoFileStart + 28;
  const particleCycle = ((Math.max(0, frame - (pipelineStart + 30))) % 90) / 90;
  const particleX = interpolate(particleCycle, [0, 1], [145, 925]);

  // CI & CD Brackets spring-in
  const ciSpring =
    frame >= ciBracketStart
      ? spring({
          frame: frame - ciBracketStart,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const cdSpring =
    frame >= cdBracketStart
      ? spring({
          frame: frame - cdBracketStart,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  // Pipeline shrinks and flies into Workflow File icon (404..446)
  const flyProgress = interpolate(
    frame,
    [flyIntoFileStart, fileBounceFrame],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    },
  );
  const pipelineScale = interpolate(flyProgress, [0, 1], [1, 0.12]);
  const pipelineFlyY = interpolate(flyProgress, [0, 1], [0, 420]);
  const pipelineOpacity = interpolate(flyProgress, [0.75, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Workflow File Icon appearance & bounce once on impact (444)
  const fileAppear =
    frame >= flyIntoFileStart - 10
      ? spring({
          frame: frame - (flyIntoFileStart - 10),
          fps,
          config: SPRING_CONFIG.smooth,
        })
      : 0;
  const fileImpactSpring =
    frame >= fileBounceFrame
      ? spring({
          frame: frame - fileBounceFrame,
          fps,
          config: { damping: 8, stiffness: 220, mass: 0.7 },
        })
      : 0;
  const fileImpactScale =
    frame >= fileBounceFrame
      ? 1 + Math.sin(fileImpactSpring * Math.PI) * 0.16
      : interpolate(fileAppear, [0, 1], [0.6, 1]);

  // Impact pulse ring around Workflow File
  const pulseRadius = interpolate(
    frame,
    [fileBounceFrame, fileBounceFrame + 28],
    [110, 260],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const pulseOpacity = interpolate(
    frame,
    [fileBounceFrame, fileBounceFrame + 28],
    [0.75, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        fontFamily: FONTS.ui,
      }}
    >
      {/* Scene 04 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      {/* Faint dot grid background */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(139, 148, 158, 0.19) 1.6px, transparent 1.6px)",
          backgroundSize: "34px 34px",
        }}
      />
      {/* Ambient top radial glow */}
      <div
        style={{
          position: "absolute",
          top: -140,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 620,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(47, 129, 247, 0.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Section Pill */}
      <div
        style={{
          position: "absolute",
          top: LAYOUT.safeTop,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 26px",
          borderRadius: 999,
          backgroundColor: COLORS.panel,
          border: `1.5px solid ${COLORS.border}`,
          fontFamily: FONTS.bangla,
          fontSize: 23,
          fontWeight: 700,
          color: COLORS.runner,
        }}
      >
        CI/CD Pipeline কী?
      </div>

      {/* 0–90: Center Top Title Types In: "GitHub Actions = Automation Tool" */}
      <div
        style={{
          position: "absolute",
          top: 195,
          left: 48,
          right: 48,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.panel,
            borderRadius: LAYOUT.cardRadius,
            border: `2px solid ${COLORS.job}66`,
            boxShadow: SHADOWS.glow(COLORS.job),
            padding: "28px 34px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.ui,
              fontSize: 46,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.25,
              minHeight: 118,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>
              {typedTitle.includes("=") ? (
                <>
                  <span style={{ color: "#FFFFFF" }}>
                    {typedTitle.split("=")[0]}
                  </span>
                  <span style={{ color: COLORS.event }}>=</span>
                  <span style={{ color: COLORS.runner }}>
                    {typedTitle.split("=")[1]}
                  </span>
                </>
              ) : (
                typedTitle
              )}
              {cursorVisible && titleChars < TITLE_TEXT.length ? (
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 44,
                    backgroundColor: COLORS.runner,
                    marginLeft: 6,
                    verticalAlign: "middle",
                  }}
                />
              ) : null}
            </span>
          </div>
        </div>
      </div>

      {/* 136–444: Horizontal 4-Node Pipeline + Glowing Particle + CI/CD Brackets */}
      <div
        style={{
          position: "absolute",
          top: 470,
          left: 0,
          right: 0,
          height: 680,
          transform: `translateY(${pipelineFlyY}px) scale(${pipelineScale})`,
          transformOrigin: "50% 45%",
          opacity: pipelineOpacity,
        }}
      >
        <svg
          viewBox="0 0 1080 620"
          width="1080"
          height="620"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="pipe-line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={COLORS.event} />
              <stop offset="35%" stopColor={COLORS.job} />
              <stop offset="70%" stopColor={COLORS.runner} />
              <stop offset="100%" stopColor={COLORS.success} />
            </linearGradient>
            <filter id="particle-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base muted track */}
          <line
            x1="145"
            y1="180"
            x2="925"
            y2="180"
            stroke="#242B35"
            strokeWidth="10"
            strokeLinecap="round"
            opacity={frame >= pipelineStart ? 0.8 : 0}
          />

          {/* Animated SVG stroke drawing left-to-right */}
          {frame >= pipelineStart ? (
            <line
              x1="145"
              y1="180"
              x2="925"
              y2="180"
              stroke="url(#pipe-line-grad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={lineLength}
              strokeDashoffset={strokeDashoffset}
            />
          ) : null}

          {/* Directional chevrons between nodes */}
          {[275, 535, 795].map((cx, idx) => {
            const chevronOp = interpolate(
              lineDrawProgress,
              [idx * 0.28 + 0.1, idx * 0.28 + 0.25],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            return (
              <path
                key={cx}
                d={`M ${cx - 8} 168 L ${cx + 8} 180 L ${cx - 8} 192`}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={chevronOp * 0.85}
              />
            );
          })}

          {/* Glowing energy particle traveling along the line */}
          {particleActive ? (
            <g filter="url(#particle-glow)">
              <circle cx={particleX} cy="180" r="14" fill="#FFFFFF" />
              <circle
                cx={particleX}
                cy="180"
                r="24"
                fill={COLORS.runner}
                opacity="0.45"
              />
            </g>
          ) : null}

          {/* 4 Pipeline Nodes */}
          {NODES.map((node, idx) => {
            const nodeStart = pipelineStart + idx * 18;
            const nodeSpring =
              frame >= nodeStart
                ? spring({
                    frame: frame - nodeStart,
                    fps,
                    config: SPRING_CONFIG.bouncy,
                  })
                : 0;
            const s = interpolate(nodeSpring, [0, 1], [0.3, 1]);
            const isLit =
              particleActive && Math.abs(particleX - node.x) < 62;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, 180) scale(${s})`}
                opacity={nodeSpring}
              >
                {/* Node outer glow halo when particle passes */}
                <circle
                  cx="0"
                  cy="0"
                  r={isLit ? 84 : 74}
                  fill={node.color}
                  opacity={isLit ? 0.24 : 0.1}
                />
                {/* Node Circle Card */}
                <circle
                  cx="0"
                  cy="0"
                  r="64"
                  fill={COLORS.panel}
                  stroke={node.color}
                  strokeWidth={isLit ? "5" : "3.5"}
                />
                {/* Node Vector Icon */}
                <NodeIcon id={node.id} color={node.color} />
                {/* Node Title below circle */}
                <text
                  x="0"
                  y="102"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily={FONTS.ui}
                  fontSize="27"
                  fontWeight="800"
                >
                  {node.label}
                </text>
                <text
                  x="0"
                  y="130"
                  textAnchor="middle"
                  fill={node.color}
                  fontFamily={FONTS.code}
                  fontSize="18"
                  fontWeight="600"
                >
                  {node.sub}
                </text>
              </g>
            );
          })}

          {/* CI Bracket under Test (405) & Build (665) */}
          {ciSpring > 0.01 ? (
            <g
              opacity={ciSpring}
              transform={`translate(0, ${interpolate(ciSpring, [0, 1], [35, 0])})`}
            >
              <path
                d="M 335 335 L 335 368 Q 335 380 347 380 L 522 380 L 535 398 L 548 380 L 723 380 Q 735 380 735 368 L 735 335"
                fill="none"
                stroke={COLORS.job}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="235"
                y="412"
                width="600"
                height="74"
                rx="18"
                fill={`${COLORS.job}24`}
                stroke={COLORS.job}
                strokeWidth="2.5"
              />
              <text
                x="535"
                y="458"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily={FONTS.ui}
                fontSize="29"
                fontWeight="800"
              >
                CI = Continuous Integration
              </text>
            </g>
          ) : null}

          {/* CD Bracket under Deploy (925) */}
          {cdSpring > 0.01 ? (
            <g
              opacity={cdSpring}
              transform={`translate(0, ${interpolate(cdSpring, [0, 1], [35, 0])})`}
            >
              <path
                d="M 855 335 L 855 368 Q 855 380 867 380 L 913 380 L 925 398 L 937 380 L 983 380 Q 995 380 995 368 L 995 335"
                fill="none"
                stroke={COLORS.success}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="440"
                y="510"
                width="590"
                height="74"
                rx="18"
                fill={`${COLORS.success}22`}
                stroke={COLORS.success}
                strokeWidth="2.5"
              />
              {/* Connector stem from Deploy bracket down to CD label */}
              <path
                d="M 925 398 L 925 510"
                stroke={COLORS.success}
                strokeWidth="3.5"
                strokeDasharray="6 6"
              />
              <text
                x="735"
                y="556"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily={FONTS.ui}
                fontSize="29"
                fontWeight="800"
              >
                CD = Continuous Deployment
              </text>
            </g>
          ) : null}
        </svg>
      </div>

      {/* 400–523: Pink-to-Blue Gradient "Workflow File" Icon (bounces once on pipeline arrival) */}
      {frame >= flyIntoFileStart - 10 ? (
        <div
          style={{
            position: "absolute",
            top: 970,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: fileAppear,
          }}
        >
          {/* Impact Pulse Ring */}
          {frame >= fileBounceFrame && pulseOpacity > 0.01 ? (
            <div
              style={{
                position: "absolute",
                top: 140 - pulseRadius,
                width: pulseRadius * 2,
                height: pulseRadius * 2,
                borderRadius: "50%",
                border: `4px solid ${COLORS.step}`,
                opacity: pulseOpacity,
                pointerEvents: "none",
              }}
            />
          ) : null}

          <div
            style={{
              transform: `scale(${fileImpactScale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 22,
            }}
          >
            {/* Pink-to-Blue Gradient File Card */}
            <div
              style={{
                width: 290,
                height: 310,
                borderRadius: 34,
                background: `linear-gradient(135deg, ${COLORS.step} 0%, ${COLORS.event} 48%, ${COLORS.job} 100%)`,
                padding: 5,
                boxShadow: `0 26px 70px ${COLORS.step}44, 0 12px 35px ${COLORS.job}44`,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 30,
                  backgroundColor: "#121722",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 18,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Folded file corner */}
                <svg width="110" height="126" viewBox="0 0 110 126">
                  <defs>
                    <linearGradient id="wf-file-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={COLORS.step} />
                      <stop offset="100%" stopColor={COLORS.job} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 14 8 L 72 8 L 98 34 L 98 114 Q 98 120 92 120 L 14 120 Q 8 120 8 114 L 8 14 Q 8 8 14 8 Z"
                    fill="url(#wf-file-grad)"
                  />
                  <path d="M 72 8 L 72 34 L 98 34 Z" fill="rgba(255,255,255,0.35)" />
                  {/* YAML code lines inside icon */}
                  <rect x="22" y="54" width="44" height="7" rx="3.5" fill="#FFFFFF" opacity="0.95" />
                  <rect x="28" y="70" width="54" height="7" rx="3.5" fill="#FFFFFF" opacity="0.78" />
                  <rect x="28" y="86" width="38" height="7" rx="3.5" fill="#FFFFFF" opacity="0.78" />
                  <rect x="22" y="102" width="48" height="7" rx="3.5" fill="#FFFFFF" opacity="0.65" />
                </svg>

                <div
                  style={{
                    fontFamily: FONTS.code,
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  ci.yml
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "12px 34px",
                borderRadius: 999,
                background: `linear-gradient(90deg, ${COLORS.step}, ${COLORS.job})`,
                fontFamily: FONTS.ui,
                fontSize: 34,
                fontWeight: 800,
                color: "#FFFFFF",
                boxShadow: SHADOWS.soft,
              }}
            >
              Workflow File
            </div>
          </div>
        </div>
      ) : null}

      {/* Bangla Subtitle Bar */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};

const NodeIcon: React.FC<{ id: string; color: string }> = ({ id, color }) => {
  if (id === "push") {
    return (
      <g stroke={color} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="0" y1="22" x2="0" y2="-20" />
        <polyline points="-16,-6 0,-22 16,-6" />
        <line x1="-18" y1="26" x2="18" y2="26" />
      </g>
    );
  }
  if (id === "test") {
    return (
      <g stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M -10 -22 L 10 -22 M -6 -22 L -6 -4 L -20 20 Q -22 24 -16 24 L 16 24 Q 22 24 20 20 L 6 -4 L 6 -22" />
        <line x1="-12" y1="10" x2="12" y2="10" />
      </g>
    );
  }
  if (id === "build") {
    return (
      <g stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <polygon points="0,-24 22,-11 22,13 0,26 -22,13 -22,-11" />
        <polyline points="-22,-11 0,2 22,-11" />
        <line x1="0" y1="2" x2="0" y2="26" />
      </g>
    );
  }
  return (
    <g stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M 0 -24 C 14 -14 18 2 12 16 L -12 16 C -18 2 -14 -14 0 -24 Z" />
      <circle cx="0" cy="-2" r="5" fill={color} />
      <path d="M -12 16 L -20 24 M 12 16 L 20 24" />
    </g>
  );
};
