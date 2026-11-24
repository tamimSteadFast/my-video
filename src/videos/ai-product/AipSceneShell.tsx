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
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { SfxLayer, type SfxCue } from "../../components/SfxLayer";
import {
  AIP_C,
  AIP_DISPLAY,
  AIP_FONT,
  AIP_LEAD_SEC,
  AIP_MONO,
  getAipScene,
  type AipSceneId,
} from "./narration";
import { IsometricGrid } from "./IsometricGrid";

export const useP = () => {
  const { width, height } = useVideoConfig();
  return height > width;
};

export const useAipVoice = (id: AipSceneId) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = getAipScene(id);
  const voiceSec = Math.max(0, frame / fps - AIP_LEAD_SEC);
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

export const AipSubtitleBar: React.FC<{
  readonly id: AipSceneId;
}> = ({ id }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = getAipScene(id);
  const P = useP();
  const t = frame / fps - AIP_LEAD_SEC;
  const cur = s.captions.find((c) => t >= c.startSec && t < c.endSec);
  if (!cur) return null;

  const phraseStartFrame = Math.round((AIP_LEAD_SEC + cur.startSec) * fps);
  const pop = spring({
    frame: frame - phraseStartFrame,
    fps,
    config: SPRING_UI,
  });

  const op = interpolate(
    t,
    [cur.startSec, cur.startSec + 0.15, cur.endSec - 0.12, cur.endSec],
    [0, 1, 1, 0.85],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const y = interpolate(pop, [0, 1], [P ? 10 : 16, 0]);
  const sc = interpolate(pop, [0, 1], [0.98, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: P ? 150 : 80,
        display: "flex",
        justifyContent: "center",
        padding: P ? "0 40px" : "0 200px",
        opacity: op,
        transform: `translate3d(0px, ${y}px, 0px) scale(${sc})`,
        pointerEvents: "none",
        zIndex: 60,
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(6, 12, 34, 0.96) 0%, rgba(18, 14, 46, 0.96) 100%)",
          border: `1.5px solid ${AIP_C.panelBorderPurple}`,
          borderBottom: `3.5px solid ${AIP_C.cyan}`,
          borderRadius: P ? 18 : 24,
          padding: P ? "18px 32px" : "24px 60px",
          color: AIP_C.text,
          fontFamily: AIP_FONT,
          fontSize: P ? 34 : 50,
          fontWeight: 600,
          lineHeight: 1.42,
          textAlign: "center",
          maxWidth: P ? 980 : 2900,
          boxShadow: `0 30px 80px rgba(0, 0, 0, 0.85), 0 0 50px rgba(0, 229, 255, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
          letterSpacing: 0.2,
        }}
      >
        {cur.text}
      </div>
    </div>
  );
};

export const AipSceneShell: React.FC<{
  readonly id: AipSceneId;
  readonly showSubtitles?: boolean;
  readonly showHud?: boolean;
  readonly backdropImage?: string;
  readonly backdropOpacity?: number;
  readonly backdropZoomFrom?: number;
  readonly backdropZoomTo?: number;
  readonly backdropPanX?: [number, number];
  readonly sfx?: readonly SfxCue[];
  readonly cameraStyle?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({
  id,
  showSubtitles = true,
  showHud = true,
  backdropImage,
  backdropOpacity = 0.42,
  backdropZoomFrom = 1.0,
  backdropZoomTo = 1.07,
  backdropPanX = [0, -30],
  sfx = [],
  cameraStyle,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = getAipScene(id);
  const P = useP();
  const { voiceSec, totalVoiceSec } = useAipVoice(id);

  // Scene entrance & exit animation
  const enterP = spring({
    frame,
    fps,
    config: SPRING_HEADLINE,
  });

  const exitFrames = 18;
  const exitP = interpolate(
    frame,
    [s.sceneFrames - exitFrames, s.sceneFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const transitionOpacity = Math.min(enterP, exitP);

  // Background slow Ken Burns zoom
  const bgScale = interpolate(
    frame,
    [0, s.sceneFrames],
    [backdropZoomFrom, backdropZoomTo],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const bgPanX = interpolate(
    frame,
    [0, s.sceneFrames],
    [backdropPanX[0], backdropPanX[1]],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Ambient volumetric light drift
  const lightX1 = 30 + Math.sin(frame / 90) * 12;
  const lightY1 = 25 + Math.cos(frame / 110) * 10;
  const lightX2 = 75 - Math.sin(frame / 100) * 14;
  const lightY2 = 70 + Math.cos(frame / 120) * 12;

  // Header pop
  const hudPop = spring({
    frame: frame - 6,
    fps,
    config: SPRING_UI,
  });

  const imageSrc = backdropImage || s.backdropImage;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: AIP_C.bg,
        fontFamily: AIP_FONT,
        color: AIP_C.text,
        overflow: "hidden",
      }}
    >
      {/* 1. Base Dark Navy Void + Volumetric Gradients */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(1800px 1200px at ${lightX1}% ${lightY1}%, rgba(0, 229, 255, 0.14) 0%, transparent 68%),
            radial-gradient(1600px 1100px at ${lightX2}% ${lightY2}%, rgba(168, 85, 247, 0.16) 0%, transparent 68%),
            linear-gradient(180deg, #020617 0%, #060D27 50%, #020617 100%)
          `,
        }}
      />

      {/* 2. Optional High-Res Isometric Backdrop (Ken Burns Pan & Depth) */}
      {imageSrc ? (
        <AbsoluteFill
          style={{
            opacity: backdropOpacity,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        >
          <Img
            src={staticFile(imageSrc)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${bgScale}) translate3d(${bgPanX}px, 0px, 0px)`,
              filter: "contrast(1.1) brightness(0.95)",
            }}
          />
        </AbsoluteFill>
      ) : null}

      {/* 3. 3D Isometric Precision Grid Floor */}
      <IsometricGrid opacity={0.55} pulseColor={id === "scene2" ? "purple" : "cyan"} />

      {/* 4. Ambient Floating Dust Particles / Bokeh Depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {[
          { x: 400, y: 350, r: 12, c: AIP_C.cyan, s: 0.3 },
          { x: 920, y: 780, r: 8, c: AIP_C.purple, s: 0.5 },
          { x: 1650, y: 420, r: 16, c: AIP_C.cyan, s: 0.2 },
          { x: 2300, y: 890, r: 10, c: AIP_C.purpleSoft, s: 0.4 },
          { x: 2950, y: 460, r: 14, c: AIP_C.cyanSoft, s: 0.3 },
          { x: 3400, y: 920, r: 9, c: AIP_C.purple, s: 0.6 },
          { x: 700, y: 1400, r: 11, c: AIP_C.cyan, s: 0.4 },
          { x: 1800, y: 1550, r: 18, c: AIP_C.purple, s: 0.25 },
          { x: 3100, y: 1600, r: 12, c: AIP_C.cyan, s: 0.35 },
        ].map((pt, i) => {
          const dy = Math.sin((frame + i * 30) / 45) * 24;
          const dx = Math.cos((frame + i * 25) / 50) * 16;
          const pOp = 0.3 + 0.4 * Math.sin((frame + i * 20) / 30);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: pt.x + dx,
                top: pt.y + dy,
                width: pt.r * 2,
                height: pt.r * 2,
                borderRadius: "50%",
                background: pt.c,
                filter: `blur(${pt.r > 13 ? 6 : 2}px)`,
                boxShadow: `0 0 24px ${pt.c}`,
                opacity: pOp * pt.s,
              }}
            />
          );
        })}
      </div>

      {/* 5. 4K / Mobile Precision Documentary HUD Header */}
      {showHud ? (
        <div
          style={{
            position: "absolute",
            top: P ? 48 : 70,
            left: P ? 36 : 110,
            right: P ? 36 : 110,
            height: P ? 92 : 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: P ? "0 22px" : "0 46px",
            background: "rgba(6, 12, 34, 0.88)",
            border: `1.5px solid ${AIP_C.panelBorderCyan}`,
            borderRadius: P ? 18 : 24,
            zIndex: 50,
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.12)",
            opacity: hudPop,
            transform: `translateY(${interpolate(hudPop, [0, 1], [-20, 0])}px)`,
            overflow: "hidden",
          }}
        >
          {/* Top Progress Track */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 3,
              width: `${interpolate(voiceSec, [0, totalVoiceSec], [0, 100], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}%`,
              background: `linear-gradient(90deg, ${AIP_C.cyan}, ${AIP_C.purple})`,
              boxShadow: `0 0 8px ${AIP_C.cyan}`,
            }}
          />

          {/* Left: Scene Number & Title */}
          <div style={{ display: "flex", alignItems: "center", gap: P ? 16 : 30 }}>
            <div
              style={{
                background: "rgba(0, 229, 255, 0.14)",
                border: `1.5px solid ${AIP_C.cyan}`,
                color: AIP_C.cyan,
                fontFamily: AIP_MONO,
                fontSize: P ? 18 : 26,
                fontWeight: 700,
                padding: P ? "6px 14px" : "8px 20px",
                borderRadius: 10,
                letterSpacing: 1.5,
                boxShadow: `0 0 16px rgba(0, 229, 255, 0.3)`,
                whiteSpace: "nowrap",
              }}
            >
              SCENE 0{s.number}
            </div>
            <div>
              <div
                style={{
                  fontSize: P ? 24 : 38,
                  fontWeight: 800,
                  fontFamily: AIP_DISPLAY,
                  color: AIP_C.text,
                  letterSpacing: -0.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: P ? 480 : "none",
                }}
              >
                {s.title}
              </div>
              {!P ? (
                <div
                  style={{
                    fontSize: 22,
                    fontFamily: AIP_MONO,
                    color: AIP_C.textDim,
                    marginTop: 2,
                    letterSpacing: 0.5,
                  }}
                >
                  {s.subtitle}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right: Technical Metric Pill */}
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 229, 255, 0.14), rgba(168, 85, 247, 0.16))",
              border: `1.5px solid ${AIP_C.panelBorderPurple}`,
              borderRadius: 999,
              padding: P ? "6px 18px" : "10px 32px",
              display: "flex",
              alignItems: "center",
              gap: P ? 10 : 16,
              boxShadow: "0 0 28px rgba(168, 85, 247, 0.2)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: P ? 8 : 12,
                height: P ? 8 : 12,
                borderRadius: "50%",
                background: AIP_C.cyan,
                boxShadow: `0 0 14px ${AIP_C.cyan}`,
              }}
            />
            <span
              style={{
                fontFamily: AIP_MONO,
                fontSize: P ? 15 : 24,
                fontWeight: 700,
                color: AIP_C.cyan,
                letterSpacing: 1.0,
              }}
            >
              {P ? s.onScreenMetric.split("·")[0].trim() : s.onScreenMetric}
            </span>
          </div>

          {!P ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                fontFamily: AIP_MONO,
                fontSize: 22,
                color: AIP_C.textMuted,
              }}
            >
              <span>4K 60FPS MASTER</span>
              <span style={{ color: AIP_C.purple }}>●</span>
              <span>AI PRODUCT ENG</span>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* 6. Main Stage with Isometric Camera Movement & Professional Transitions */}
      <AbsoluteFill
        style={{
          opacity: transitionOpacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: P ? 160 : 230,
            left: P ? 36 : 110,
            width: P ? 1008 : 3620,
            height: P ? 1280 : 1720,
            boxSizing: "border-box",
            ...cameraStyle,
          }}
        >
          {children}
        </div>
      </AbsoluteFill>

      {/* 7. Synchronized Bengali Subtitle Bar */}
      {showSubtitles ? <AipSubtitleBar id={id} /> : null}

      {/* 8. Synchronized Scene Voiceover Audio */}
      <Sequence
        name={`Voiceover · Scene ${s.number} (${s.title})`}
        from={Math.round(AIP_LEAD_SEC * fps)}
        layout="none"
      >
        <Audio src={staticFile(s.file)} volume={1.0} />
      </Sequence>

      {/* 9. Documentary SFX Sound Design */}
      <SfxLayer
        cues={[
          { atSec: 0.05, type: "whoosh", volume: 0.2 },
          ...sfx,
        ]}
      />
    </AbsoluteFill>
  );
};
