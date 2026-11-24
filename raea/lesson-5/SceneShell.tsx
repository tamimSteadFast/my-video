import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "raea";
import {
  L5_C,
  L5_FONT_BN,
  L5_FONT_DISPLAY,
  L5_FONT_MONO,
  L5_FPS,
  L5_LEAD_SEC,
  L5_SCENES,
  SFX_BASE,
  SPRING_HERO,
  SPRING_SNAPPY,
  getL5Scene,
  type L5Mood,
  type L5SceneId,
} from "./narration";
import { clamp, useVoice } from "./MotionPrimitives";

export type SfxKind = "whoosh" | "pop" | "click" | "chime" | "riser";

export type SfxBeat = {
  readonly atVoiceSec: number;
  readonly kind: SfxKind;
  readonly volume?: number;
};

const SFX_DEFAULT_VOL: Record<SfxKind, number> = {
  whoosh: 0.14,
  pop: 0.18,
  click: 0.15,
  chime: 0.17,
  riser: 0.14,
};

const SFX_DURATION_FRAMES: Record<SfxKind, number> = {
  whoosh: 11,
  pop: 4,
  click: 2,
  chime: 28,
  riser: 25,
};

const MOOD_GLOWS: Record<
  L5Mood,
  { top: string; bottom: string; bar: string; accent: string }
> = {
  dual: {
    top: "rgba(0, 229, 255, 0.17)",
    bottom: "rgba(168, 85, 247, 0.19)",
    bar: `linear-gradient(90deg, ${L5_C.cyan}, ${L5_C.violet})`,
    accent: L5_C.cyan,
  },
  cyan: {
    top: "rgba(0, 229, 255, 0.21)",
    bottom: "rgba(56, 189, 248, 0.13)",
    bar: `linear-gradient(90deg, ${L5_C.cyan}, ${L5_C.cyanSoft})`,
    accent: L5_C.cyan,
  },
  violet: {
    top: "rgba(168, 85, 247, 0.22)",
    bottom: "rgba(232, 121, 249, 0.14)",
    bar: `linear-gradient(90deg, ${L5_C.violet}, ${L5_C.orchid})`,
    accent: L5_C.violetSoft,
  },
  amber: {
    top: "rgba(245, 158, 11, 0.2)",
    bottom: "rgba(0, 229, 255, 0.14)",
    bar: `linear-gradient(90deg, ${L5_C.amber}, ${L5_C.cyan})`,
    accent: L5_C.amberSoft,
  },
  emerald: {
    top: "rgba(16, 185, 129, 0.2)",
    bottom: "rgba(0, 229, 255, 0.15)",
    bar: `linear-gradient(90deg, ${L5_C.emerald}, ${L5_C.cyan})`,
    accent: L5_C.emeraldSoft,
  },
};

const KineticSubtitleBar: React.FC<{
  readonly id: L5SceneId;
  readonly accent: string;
}> = ({ id, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = getL5Scene(id);
  const t = frame / fps - L5_LEAD_SEC;
  const activeCap = scene.captions.find((c) => t >= c.startSec && t < c.endSec);

  if (!activeCap) return null;

  const phraseStart = Math.round((L5_LEAD_SEC + activeCap.startSec) * fps);
  const pop = spring({
    frame: Math.max(0, frame - phraseStart),
    fps,
    config: SPRING_SNAPPY,
  });

  const fadeOut = interpolate(
    t,
    [activeCap.endSec - 0.14, activeCap.endSec],
    [1, 0.62],
    clamp,
  );
  const y = interpolate(pop, [0, 1], [14, 0], clamp);
  const sc = interpolate(pop, [0, 1], [0.97, 1], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 58,
        right: 92,
        bottom: 334,
        display: "flex",
        justifyContent: "center",
        opacity: Math.min(pop, fadeOut),
        transform: `translate3d(0px, ${y}px, 0px) scale(${sc})`,
        zIndex: 60,
      }}
    >
      <div
        style={{
          width: "100%",
          background:
            "linear-gradient(145deg, rgba(6, 12, 30, 0.96) 0%, rgba(14, 20, 48, 0.96) 100%)",
          border: `1.5px solid ${L5_C.borderSubtle}`,
          borderBottom: `4px solid ${accent}`,
          borderRadius: 20,
          padding: "16px 26px",
          color: L5_C.text,
          fontFamily: L5_FONT_BN,
          fontSize: 31,
          fontWeight: 600,
          lineHeight: 1.42,
          textAlign: "center",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.82)",
        }}
      >
        {activeCap.text}
      </div>
    </div>
  );
};

export const SceneShell: React.FC<{
  readonly id: L5SceneId;
  readonly sfx?: readonly SfxBeat[];
  readonly children: React.ReactNode;
}> = ({ id, sfx = [], children }) => {
  const { frame, fps, voiceSec, totalVoiceSec, sceneFrames, scene } = useVoice(id);
  const glows = MOOD_GLOWS[scene.mood];
  const accent = glows.accent;

  // Smooth scene entrance + exit breath (never clips audio)
  const enterP = spring({ frame, fps, config: SPRING_HERO });
  const exitP = interpolate(frame, [sceneFrames - 10, sceneFrames], [1, 0], clamp);
  const stageOpacity = Math.min(enterP, exitP);

  // Subtle living motion so no frame ever feels frozen
  const driftX1 = 22 + Math.sin(frame / 72) * 14;
  const driftY1 = 18 + Math.cos(frame / 88) * 10;
  const driftX2 = 78 - Math.sin(frame / 82) * 14;
  const driftY2 = 76 + Math.cos(frame / 68) * 10;
  const gridShiftY = (frame * 0.55) % 64;
  const microBreath = 1 + Math.sin(frame / 90) * 0.004;

  const progressPct = interpolate(voiceSec, [0, totalVoiceSec], [0, 100], clamp);
  const overallPct =
    ((scene.number - 1 + progressPct / 100) / L5_SCENES.length) * 100;
  const sceneCounter = `${String(scene.number).padStart(2, "0")}/${String(L5_SCENES.length).padStart(2, "0")}`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: L5_C.bg,
        fontFamily: L5_FONT_BN,
        color: L5_C.text,
        overflow: "hidden",
      }}
    >
      {/* 1. Stage-Reactive Volumetric Lighting */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(900px 760px at ${driftX1}% ${driftY1}%, ${glows.top} 0%, transparent 65%), radial-gradient(880px 760px at ${driftX2}% ${driftY2}%, ${glows.bottom} 0%, transparent 65%), linear-gradient(180deg, #040814 0%, #071028 52%, #040814 100%)`,
        }}
      />

      {/* 2. Subtle Animated Architectural Grid */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.16 }}
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 64}
            y1="0"
            x2={i * 64}
            y2="1920"
            stroke="#64748B"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 32 }).map((_, i) => {
          const y = i * 64 + gridShiftY - 64;
          return (
            <line
              key={`h-${i}`}
              x1="0"
              y1={y}
              x2="1080"
              y2={y}
              stroke="#64748B"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* 3. Mobile-Safe Compact Chapter HUD (clears Reels/Shorts 210px top & 84px right zones) */}
      <div
        style={{
          position: "absolute",
          top: 214,
          left: 58,
          right: 92,
          height: 68,
          background: "rgba(7, 14, 34, 0.92)",
          border: `1.5px solid ${L5_C.borderSubtle}`,
          borderRadius: 16,
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          zIndex: 50,
          boxShadow: "0 14px 36px rgba(0, 0, 0, 0.55)",
        }}
      >
        {/* Bottom Live Progress Track */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 4,
            width: `${overallPct}%`,
            background: glows.bar,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              background: `${accent}22`,
              border: `1.5px solid ${accent}`,
              borderRadius: 10,
              padding: "4px 11px",
              fontFamily: L5_FONT_MONO,
              fontSize: 17,
              fontWeight: 700,
              color: accent,
              letterSpacing: 1.1,
            }}
          >
            {sceneCounter}
          </div>
          <div
            style={{
              fontFamily: L5_FONT_DISPLAY,
              fontSize: 24,
              fontWeight: 800,
              color: L5_C.text,
            }}
          >
            {scene.title}
          </div>
        </div>
        <div
          style={{
            fontFamily: L5_FONT_MONO,
            fontSize: 15,
            fontWeight: 700,
            color: L5_C.textMuted,
            letterSpacing: 1.1,
          }}
        >
          {scene.badge}
        </div>
      </div>

      {/* 4. Hero Motion Stage (930 x 1110 Reels/Shorts-safe vertical stage) */}
      <div
        style={{
          position: "absolute",
          top: 298,
          left: 58,
          width: 930,
          height: 1110,
          opacity: stageOpacity,
          transform: `scale(${microBreath})`,
          boxSizing: "border-box",
          zIndex: 20,
        }}
      >
        {children}
      </div>

      {/* 5. Synchronized Kinetic Bengali Subtitles */}
      <KineticSubtitleBar id={id} accent={accent} />

      {/* 6. Zero-Drift Scene Voiceover Audio */}
      <Sequence
        name={`VO-Scene-${scene.number}`}
        from={Math.round(L5_LEAD_SEC * L5_FPS)}
        layout="none"
      >
        <Audio src={scene.file} volume={1.0} />
      </Sequence>

      {/* 7. Subtle Tactile SFX Cues (exact natural WAV frame duration, cleanly ducked under VO) */}
      {sfx.map((cue, idx) => (
        <Sequence
          key={`${cue.kind}-${idx}-${cue.atVoiceSec}`}
          from={Math.max(0, Math.round((L5_LEAD_SEC + cue.atVoiceSec) * L5_FPS))}
          durationInFrames={SFX_DURATION_FRAMES[cue.kind]}
          layout="none"
        >
          <Audio
            src={`${SFX_BASE}/${cue.kind}.wav`}
            volume={cue.volume ?? SFX_DEFAULT_VOL[cue.kind]}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
