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
  L4_C,
  L4_FONT_BN,
  L4_FONT_DISPLAY,
  L4_FONT_MONO,
  L4_FPS,
  L4_LEAD_SEC,
  L4_SCENES,
  SFX_BASE,
  SPRING_HERO,
  SPRING_SNAPPY,
  getL4Scene,
  type L4RoleMood,
  type L4SceneId,
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
  click: 0.16,
  chime: 0.17,
  riser: 0.15,
};

const MOOD_GLOWS: Record<L4RoleMood, { top: string; bottom: string; bar: string }> = {
  dual: {
    top: "rgba(0, 229, 255, 0.16)",
    bottom: "rgba(168, 85, 247, 0.18)",
    bar: `linear-gradient(90deg, ${L4_C.cyan}, ${L4_C.violet})`,
  },
  ai: {
    top: "rgba(0, 229, 255, 0.2)",
    bottom: "rgba(56, 189, 248, 0.13)",
    bar: `linear-gradient(90deg, ${L4_C.cyan}, ${L4_C.cyanSoft})`,
  },
  ml: {
    top: "rgba(168, 85, 247, 0.22)",
    bottom: "rgba(232, 121, 249, 0.14)",
    bar: `linear-gradient(90deg, ${L4_C.violet}, ${L4_C.orchid})`,
  },
  emerald: {
    top: "rgba(0, 229, 255, 0.16)",
    bottom: "rgba(16, 185, 129, 0.18)",
    bar: `linear-gradient(90deg, ${L4_C.cyan}, ${L4_C.emerald})`,
  },
};

const KineticSubtitleBar: React.FC<{
  readonly id: L4SceneId;
  readonly accent: string;
}> = ({ id, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = getL4Scene(id);
  const t = frame / fps - L4_LEAD_SEC;
  const activeCap = scene.captions.find((c) => t >= c.startSec && t < c.endSec);

  if (!activeCap) return null;

  const phraseStart = Math.round((L4_LEAD_SEC + activeCap.startSec) * fps);
  const pop = spring({
    frame: Math.max(0, frame - phraseStart),
    fps,
    config: SPRING_SNAPPY,
  });

  const fadeOut = interpolate(
    t,
    [activeCap.endSec - 0.14, activeCap.endSec],
    [1, 0.6],
    clamp,
  );
  const y = interpolate(pop, [0, 1], [14, 0], clamp);
  const sc = interpolate(pop, [0, 1], [0.97, 1], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 52,
        right: 52,
        bottom: 245,
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
          border: `1.5px solid ${L4_C.borderSubtle}`,
          borderBottom: `4px solid ${accent}`,
          borderRadius: 22,
          padding: "20px 30px",
          color: L4_C.text,
          fontFamily: L4_FONT_BN,
          fontSize: 33,
          fontWeight: 600,
          lineHeight: 1.46,
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
  readonly id: L4SceneId;
  readonly sfx?: readonly SfxBeat[];
  readonly children: React.ReactNode;
}> = ({ id, sfx = [], children }) => {
  const { frame, fps, voiceSec, totalVoiceSec, sceneFrames, scene } = useVoice(id);
  const glows = MOOD_GLOWS[scene.mood];
  const accent =
    scene.mood === "ml"
      ? L4_C.violet
      : scene.mood === "emerald"
        ? L4_C.emerald
        : L4_C.cyan;

  // Smooth scene entrance + exit breath (never overlaps audio)
  const enterP = spring({ frame, fps, config: SPRING_HERO });
  const exitP = interpolate(frame, [sceneFrames - 10, sceneFrames], [1, 0], clamp);
  const stageOpacity = Math.min(enterP, exitP);

  // Subtle living motion so nothing ever freezes for 3+ seconds
  const driftX1 = 22 + Math.sin(frame / 75) * 14;
  const driftY1 = 18 + Math.cos(frame / 90) * 10;
  const driftX2 = 78 - Math.sin(frame / 85) * 14;
  const driftY2 = 76 + Math.cos(frame / 70) * 10;
  const gridShiftY = (frame * 0.55) % 64;

  const progressPct = interpolate(voiceSec, [0, totalVoiceSec], [0, 100], clamp);
  const overallPct =
    ((scene.number - 1 + progressPct / 100) / L4_SCENES.length) * 100;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: L4_C.bg,
        fontFamily: L4_FONT_BN,
        color: L4_C.text,
        overflow: "hidden",
      }}
    >
      {/* 1. Role-Reactive Volumetric Lighting */}
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
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.17 }}
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

      {/* 3. Mobile-Safe Compact Chapter HUD (clears top 108px status/app bars) */}
      <div
        style={{
          position: "absolute",
          top: 108,
          left: 52,
          right: 52,
          height: 76,
          background: "rgba(7, 14, 34, 0.9)",
          border: `1.5px solid ${L4_C.borderSubtle}`,
          borderRadius: 18,
          padding: "0 22px",
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
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              background: `${accent}22`,
              border: `1.5px solid ${accent}`,
              borderRadius: 10,
              padding: "5px 12px",
              fontFamily: L4_FONT_MONO,
              fontSize: 18,
              fontWeight: 700,
              color: accent,
              letterSpacing: 1.2,
            }}
          >
            0{scene.number}/09
          </div>
          <div
            style={{
              fontFamily: L4_FONT_DISPLAY,
              fontSize: 25,
              fontWeight: 800,
              color: L4_C.text,
            }}
          >
            {scene.title}
          </div>
        </div>
        <div
          style={{
            fontFamily: L4_FONT_MONO,
            fontSize: 17,
            fontWeight: 700,
            color: L4_C.textMuted,
            letterSpacing: 1.2,
          }}
        >
          {scene.badge}
        </div>
      </div>

      {/* 4. Hero Motion Stage (968 x 1260 vertical-native stage) */}
      <div
        style={{
          position: "absolute",
          top: 206,
          left: 52,
          width: 976,
          height: 1260,
          opacity: stageOpacity,
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
        from={Math.round(L4_LEAD_SEC * L4_FPS)}
        layout="none"
      >
        <Audio src={scene.file} volume={1.0} />
      </Sequence>

      {/* 7. Subtle Tactile SFX Cues (ducked cleanly under VO) */}
      {sfx.map((cue, idx) => (
        <Sequence
          key={`${cue.kind}-${idx}-${cue.atVoiceSec}`}
          from={Math.max(0, Math.round((L4_LEAD_SEC + cue.atVoiceSec) * L4_FPS))}
          durationInFrames={36}
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
