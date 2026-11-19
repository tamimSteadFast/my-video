import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { FPS, SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { SfxLayer, type SfxCue } from "../../components/SfxLayer";
import {
  AIE_C,
  AIE_DISPLAY,
  AIE_FONT,
  AIE_LEAD_SEC,
  AIE_MONO,
  getAieScene,
  type AieSceneId,
} from "./narration";

export const useAieVoice = (id: AieSceneId) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = getAieScene(id);
  const voiceSec = Math.max(0, frame / fps - AIE_LEAD_SEC);
  const progress = Math.min(1, Math.max(0, voiceSec / s.voiceSec));
  return {
    frame,
    fps,
    voiceSec,
    progress,
    totalVoiceSec: s.voiceSec,
    sceneFrames: s.sceneFrames,
  };
};

export const AieSubtitleBar: React.FC<{
  readonly id: AieSceneId;
}> = ({ id }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = getAieScene(id);
  const t = frame / fps - AIE_LEAD_SEC;
  const cur = s.captions.find((c) => t >= c.startSec && t < c.endSec);
  if (!cur) return null;

  const phraseStartFrame = Math.round((AIE_LEAD_SEC + cur.startSec) * fps);
  const pop = spring({
    frame: frame - phraseStartFrame,
    fps,
    config: SPRING_UI,
  });

  const op = interpolate(
    t,
    [cur.startSec, cur.startSec + 0.12, cur.endSec - 0.1, cur.endSec],
    [0, 1, 1, 0.85],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const y = interpolate(pop, [0, 1], [10, 0]);
  const sc = interpolate(pop, [0, 1], [0.98, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 26,
        display: "flex",
        justifyContent: "center",
        padding: "0 120px",
        opacity: op,
        transform: `translate3d(0px, ${y}px, 0px) scale(${sc})`,
        pointerEvents: "none",
        zIndex: 60,
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(6, 10, 26, 0.92) 0%, rgba(16, 12, 38, 0.92) 100%)",
          border: `1px solid ${AIE_C.borderPurple}`,
          borderBottom: `2.5px solid ${AIE_C.blue}`,
          borderRadius: 16,
          padding: "13px 34px",
          color: AIE_C.text,
          fontFamily: AIE_FONT,
          fontSize: 31,
          fontWeight: 600,
          lineHeight: 1.38,
          textAlign: "center",
          maxWidth: 1580,
          backdropFilter: "blur(16px)",
          boxShadow:
            "0 18px 46px rgba(0, 0, 0, 0.78), 0 0 32px rgba(124, 58, 237, 0.2)",
        }}
      >
        {cur.text}
      </div>
    </div>
  );
};

export const AieSceneShell: React.FC<{
  readonly id: AieSceneId;
  readonly showSubtitles?: boolean;
  readonly backdropImage?: string;
  readonly backdropOpacity?: number;
  readonly backdropZoomFrom?: number;
  readonly backdropZoomTo?: number;
  readonly backdropPanX?: [number, number];
  readonly sfx?: readonly SfxCue[];
  readonly stageStyle?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({
  id,
  showSubtitles = true,
  backdropImage,
  backdropOpacity = 0.42,
  backdropZoomFrom = 1.0,
  backdropZoomTo = 1.07,
  backdropPanX = [0, -18],
  sfx = [],
  stageStyle,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = getAieScene(id);

  const driftX = Math.sin(frame / 90) * 28;
  const driftY = Math.cos(frame / 110) * 20;

  // Smooth Ken Burns cinematic camera push-in on photorealistic backdrop
  const bgScale = interpolate(
    frame,
    [0, s.sceneFrames],
    [backdropZoomFrom, backdropZoomTo],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const bgPanX = interpolate(frame, [0, s.sceneFrames], backdropPanX, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Entrance & exit transitions
  const enterP = spring({
    frame,
    fps,
    config: SPRING_HEADLINE,
  });

  const exitFrames = s.transitionStyle === "cinematic-outro" ? 30 : 14;
  const exitP = interpolate(
    frame,
    [s.sceneFrames - exitFrames, s.sceneFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  let stageTransform = "";
  const stageOpacity = Math.min(enterP, exitP);

  if (s.transitionStyle === "slide-left") {
    const tx = interpolate(enterP, [0, 1], [54, 0]);
    stageTransform = `translate3d(${tx}px, 0px, 0px)`;
  } else if (s.transitionStyle === "push-zoom") {
    const sc = interpolate(enterP, [0, 1], [0.95, 1]);
    stageTransform = `scale(${sc})`;
  }

  // Light sweep overlay
  const showLightSweep = s.transitionStyle === "light-sweep" && frame < 34;
  const sweepX = interpolate(frame, [0, 34], [-25, 128], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hudSpring = spring({
    frame: frame - 6,
    fps,
    config: SPRING_UI,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: AIE_C.bg,
        fontFamily: AIE_FONT,
        color: AIE_C.text,
        overflow: "hidden",
      }}
    >
      {/* Photorealistic Cinematic Backdrop with Slow Push-In */}
      {backdropImage ? (
        <AbsoluteFill style={{ overflow: "hidden" }}>
          <Img
            src={staticFile(backdropImage)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: backdropOpacity * Math.min(1, frame / 12) * exitP,
              transform: `scale(${bgScale}) translate3d(${bgPanX}px, 0px, 0px)`,
              filter: "saturate(1.08) contrast(1.04)",
            }}
          />
          {/* Deep Blue & Royal Purple Documentary Color Grade + Subtitle Safe Dark Gradient */}
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(180deg, rgba(4, 7, 20, 0.72) 0%, rgba(7, 11, 30, 0.48) 38%, rgba(10, 8, 30, 0.62) 74%, rgba(4, 6, 18, 0.94) 100%)",
            }}
          />
        </AbsoluteFill>
      ) : null}

      {/* Dark Blue & Purple Volumetric Glow */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background: `radial-gradient(1100px 720px at ${22 + driftX / 12}% ${18 + driftY / 12}%, rgba(56, 189, 248, 0.13), transparent 68%), radial-gradient(1050px 760px at ${80 - driftX / 12}% ${74 - driftY / 12}%, rgba(139, 92, 246, 0.16), transparent 70%)`,
        }}
      />

      {/* Precision Architectural Blueprint Grid */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(99, 102, 241, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 90% 82% at 50% 46%, black 28%, transparent 94%)",
        }}
      />

      {/* Documentary Cinematic Vignette */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 84% 80% at 50% 48%, transparent 58%, rgba(2, 4, 12, 0.76) 100%)",
        }}
      />

      {/* Recurring Documentary Top HUD Bar */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 54,
          right: 54,
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 22px",
          background:
            "linear-gradient(90deg, rgba(8, 13, 34, 0.86), rgba(17, 13, 42, 0.86))",
          border: `1px solid ${AIE_C.borderBlue}`,
          borderRadius: 14,
          backdropFilter: "blur(14px)",
          zIndex: 45,
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(168, 85, 247, 0.24))",
              border: `1px solid ${AIE_C.purple}`,
              color: AIE_C.cyan,
              fontFamily: AIE_MONO,
              fontSize: 15,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 8,
              letterSpacing: 1.1,
            }}
          >
            0{s.number} / 08
          </div>
          <div
            style={{
              fontFamily: AIE_DISPLAY,
              fontSize: 21,
              fontWeight: 700,
              color: AIE_C.text,
              letterSpacing: -0.2,
            }}
          >
            {s.title}
          </div>
        </div>

        {/* Center/Right Focal Badge */}
        <div
          style={{
            transform: `translateY(${interpolate(hudSpring, [0, 1], [-8, 0])}px)`,
            opacity: hudSpring,
            background:
              "linear-gradient(90deg, rgba(56, 189, 248, 0.14), rgba(168, 85, 247, 0.18))",
            border: `1px solid ${AIE_C.borderPurple}`,
            borderRadius: 999,
            padding: "6px 20px",
            display: "flex",
            alignItems: "center",
            gap: 9,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 99,
              background: `linear-gradient(135deg, ${AIE_C.cyan}, ${AIE_C.purple})`,
              boxShadow: `0 0 12px ${AIE_C.purple}`,
            }}
          />
          <span
            style={{
              fontFamily: AIE_MONO,
              fontSize: 15,
              fontWeight: 600,
              color: "#E2E8F0",
              letterSpacing: 0.3,
            }}
          >
            {s.badge}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: AIE_MONO,
            fontSize: 13,
            color: AIE_C.textDim,
            letterSpacing: 0.8,
          }}
        >
          <span>LESSON 01 · AI ENGINEER</span>
          <span style={{ color: AIE_C.purple }}>●</span>
        </div>
      </div>

      {/* Main Content Stage — Strictly above the Bottom Subtitle Safe Zone (y: 98..934 = 836px tall, leaving 146px clean space at bottom!) */}
      <AbsoluteFill
        style={{
          opacity: stageOpacity,
          transform: stageTransform || undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 98,
            left: 54,
            width: 1812,
            height: 830,
            boxSizing: "border-box",
            ...stageStyle,
          }}
        >
          {children}
        </div>
      </AbsoluteFill>

      {/* Light Sweep Transition Accent */}
      {showLightSweep ? (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            background: `linear-gradient(108deg, transparent ${sweepX - 18}%, rgba(168, 85, 247, 0.22) ${sweepX - 4}%, rgba(56, 189, 248, 0.24) ${sweepX + 4}%, transparent ${sweepX + 18}%)`,
            zIndex: 50,
          }}
        />
      ) : null}

      {/* Synchronized Bangla + English Subtitles (Reserved Safe Zone at Bottom) */}
      {showSubtitles ? <AieSubtitleBar id={id} /> : null}

      {/* Synchronized Scene Voiceover */}
      <Sequence
        name={`Voiceover · Scene ${s.number}`}
        from={Math.round(AIE_LEAD_SEC * FPS)}
        layout="none"
      >
        <Audio src={staticFile(s.file)} volume={1.0} />
      </Sequence>

      {/* Subtle Documentary Sound Design */}
      <SfxLayer
        cues={[{ atSec: 0.04, type: "whoosh", volume: 0.16 }, ...sfx]}
      />
    </AbsoluteFill>
  );
};
