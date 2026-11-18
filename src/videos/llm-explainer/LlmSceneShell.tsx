import React from "react";
import {
  AbsoluteFill,
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
  LLM_C,
  LLM_FONT,
  LLM_LEAD_SEC,
  LLM_MONO,
  getLlmScene,
  type LlmSceneId,
} from "./narration";

export const useP = () => {
  const { width, height } = useVideoConfig();
  return height > width;
};

export const useLlmVoiceTime = (id: LlmSceneId) => {
  const frame = useCurrentFrame();
  const s = getLlmScene(id);
  const voiceSec = Math.max(0, frame / FPS - LLM_LEAD_SEC);
  const progress = Math.min(1, Math.max(0, voiceSec / s.voiceSec));
  return {
    frame,
    voiceSec,
    progress,
    totalVoiceSec: s.voiceSec,
    sceneFrames: s.sceneFrames,
  };
};

export const LlmSubtitleBar: React.FC<{
  readonly id: LlmSceneId;
}> = ({ id }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = getLlmScene(id);
  const P = useP();
  const t = frame / FPS - LLM_LEAD_SEC;
  const cur = s.captions.find((c) => t >= c.startSec && t < c.endSec);
  if (!cur) return null;

  const phraseStartFrame = Math.round((LLM_LEAD_SEC + cur.startSec) * FPS);
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

  const y = interpolate(pop, [0, 1], [12, 0]);
  const sc = interpolate(pop, [0, 1], [0.975, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: P ? 150 : 34,
        display: "flex",
        justifyContent: "center",
        padding: P ? "0 36px" : "0 140px",
        opacity: op,
        transform: `translate3d(0px, ${y}px, 0px) scale(${sc})`,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "rgba(4, 8, 20, 0.88)",
          border: `1px solid ${LLM_C.border}`,
          borderBottom: `2px solid ${LLM_C.cyan}`,
          borderRadius: 18,
          padding: "14px 36px",
          color: LLM_C.text,
          fontFamily: LLM_FONT,
          fontSize: P ? 42 : 33,
          fontWeight: 600,
          lineHeight: 1.35,
          textAlign: "center",
          backdropFilter: "blur(14px)",
          boxShadow: `0 18px 46px rgba(0, 0, 0, 0.72), 0 0 28px rgba(0, 229, 255, 0.12)`,
        }}
      >
        {cur.text}
      </div>
    </div>
  );
};

export const LlmSceneShell: React.FC<{
  readonly id: LlmSceneId;
  readonly sfx?: readonly SfxCue[];
  readonly cameraStyle?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ id, sfx = [], cameraStyle, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = getLlmScene(id);
  const P = useP();

  // Ambient grid movement
  const driftX = Math.sin(frame / 85) * 32;
  const driftY = Math.cos(frame / 105) * 24;

  // Transition entrance & exit animations per scene spec
  const enterP = spring({
    frame,
    fps,
    config: SPRING_HEADLINE,
  });

  const exitFrames = 14;
  const exitP = interpolate(
    frame,
    [s.sceneFrames - exitFrames, s.sceneFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  let transitionTransform = "";
  let transitionOpacity = Math.min(enterP, exitP);

  if (s.transitionType === "Segmented slide") {
    const tx = interpolate(enterP, [0, 1], [60, 0]);
    transitionTransform = `translate3d(${tx}px, 0px, 0px)`;
  } else if (s.transitionType === "Technical zoom") {
    const sc = interpolate(enterP, [0, 1], [0.92, 1]);
    transitionTransform = `scale(${sc})`;
  } else if (s.transitionType === "Morph transition") {
    const sc = interpolate(enterP, [0, 1], [0.96, 1]);
    transitionTransform = `scale(${sc})`;
  } else if (s.transitionType === "Cinematic fade out") {
    const slowExit = interpolate(
      frame,
      [s.sceneFrames - 28, s.sceneFrames],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    transitionOpacity = Math.min(enterP, slowExit);
  }

  // Light sweep overlay for Scene 5
  const showLightSweep = s.transitionType === "Light sweep" && frame < 36;
  const sweepX = interpolate(frame, [0, 36], [-30, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bannerSpring = spring({
    frame: frame - 8,
    fps,
    config: SPRING_UI,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: LLM_C.bg,
        fontFamily: LLM_FONT,
        color: LLM_C.text,
        overflow: "hidden",
      }}
    >
      {/* Consistent Dark Navy & Cyan Technical Backdrop */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(1050px 720px at ${24 + driftX / 12}% ${18 + driftY / 12}%, rgba(0, 229, 255, 0.11), transparent 70%), radial-gradient(950px 680px at ${80 - driftX / 14}% ${78 - driftY / 14}%, rgba(99, 102, 241, 0.12), transparent 72%), linear-gradient(180deg, #040814 0%, #071024 55%, #040814 100%)`,
        }}
      />

      {/* Precision Blueprint Grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 229, 255, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 88% 82% at 50% 48%, black 35%, transparent 95%)",
        }}
      />

      {/* Recurring Top HUD Bar (Global Instruction 7: Do not change the appearance of recurring interface elements) */}
      <div
        style={{
          position: "absolute",
          top: P ? 70 : 28,
          left: P ? 36 : 56,
          right: P ? 36 : 56,
          height: P ? 190 : 62,
          display: "flex",
          flexDirection: P ? "column" : "row",
          alignItems: P ? "flex-start" : "center",
          justifyContent: P ? "center" : "space-between",
          gap: P ? 16 : 0,
          padding: P ? "0 28px" : "0 24px",
          background: "rgba(8, 16, 38, 0.84)",
          border: `1px solid ${LLM_C.border}`,
          borderRadius: 14,
          backdropFilter: "blur(12px)",
          zIndex: 40,
          boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: "rgba(0, 229, 255, 0.14)",
              border: `1px solid ${LLM_C.cyan}`,
              color: LLM_C.cyan,
              fontFamily: LLM_MONO,
              fontSize: P ? 22 : 16,
              fontWeight: 700,
              padding: "5px 12px",
              borderRadius: 8,
              letterSpacing: 1,
            }}
          >
            SCENE 0{s.number} / 08
          </div>
          <div
            style={{
              fontSize: P ? 34 : 22,
              fontWeight: 700,
              color: LLM_C.text,
              letterSpacing: -0.3,
            }}
          >
            {s.title}
          </div>
        </div>

        {/* Center/Right On-Screen Formula Pill */}
        <div
          style={{
            transform: `translateY(${interpolate(bannerSpring, [0, 1], [-10, 0])}px) scale(${interpolate(bannerSpring, [0, 1], [0.95, 1])})`,
            opacity: bannerSpring,
            background:
              "linear-gradient(90deg, rgba(0, 229, 255, 0.16), rgba(56, 189, 248, 0.08))",
            border: `1px solid rgba(0, 229, 255, 0.45)`,
            borderRadius: 999,
            padding: "7px 22px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 0 22px rgba(0, 229, 255, 0.16)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 99,
              background: LLM_C.cyan,
              boxShadow: `0 0 10px ${LLM_C.cyan}`,
            }}
          />
          <span
            style={{
              fontFamily: LLM_MONO,
              fontSize: P ? 26 : 18,
              fontWeight: 700,
              color: LLM_C.cyan,
              letterSpacing: 0.3,
            }}
          >
            {s.onScreenText}
          </span>
        </div>

        <div
          style={{
            display: P ? "none" : "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: LLM_MONO,
            fontSize: 14,
            color: LLM_C.textMuted,
          }}
        >
          <span>AI ENGINEERING EDUCATION</span>
          <span style={{ color: LLM_C.cyan }}>●</span>
        </div>
      </div>

      {/* Main Stage with Camera & Scene Transition */}
      <AbsoluteFill
        style={{
          opacity: transitionOpacity,
          transform: transitionTransform || undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: P ? 290 : 104,
            left: P ? 36 : 56,
            width: P ? 1008 : 1808,
            height: P ? 1280 : 860,
            boxSizing: "border-box",
            ...cameraStyle,
          }}
        >
          {children}
        </div>
      </AbsoluteFill>

      {/* Light sweep transition effect when specified */}
      {showLightSweep ? (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            background: `linear-gradient(105deg, transparent ${sweepX - 18}%, rgba(0, 229, 255, 0.18) ${sweepX}%, transparent ${sweepX + 18}%)`,
            zIndex: 45,
          }}
        />
      ) : null}

      {/* Synchronized Bangla + English Technical Subtitles */}
      <LlmSubtitleBar id={id} />

      {/* Synchronized Scene Voiceover */}
      <Sequence
        name={`Voiceover · Scene ${s.number} (${s.title})`}
        from={Math.round(LLM_LEAD_SEC * FPS)}
        layout="none"
      >
        <Audio src={staticFile(s.file)} volume={1.0} />
      </Sequence>

      {/* Subtle Documentary Sound Design */}
      <SfxLayer
        cues={[
          { atSec: 0.04, type: "whoosh", volume: 0.18 },
          ...sfx,
        ]}
      />
    </AbsoluteFill>
  );
};
