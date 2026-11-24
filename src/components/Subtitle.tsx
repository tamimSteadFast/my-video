import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../theme";
import type { SubtitleCue } from "../narration";

export interface SubtitleProps {
  readonly text: string;
  readonly startFrame?: number;
  readonly endFrame?: number;
  readonly fadeFrames?: number;
}

export const Subtitle: React.FC<SubtitleProps> = ({
  text,
  startFrame = 0,
  endFrame,
  fadeFrames = 6,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const isWide = width > 1200;

  if (!text) return null;
  if (frame < startFrame) return null;
  if (endFrame !== undefined && frame > endFrame) return null;

  const fadeIn = interpolate(
    frame,
    [startFrame, startFrame + fadeFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const fadeOut =
    endFrame !== undefined
      ? interpolate(frame, [endFrame - fadeFrames, endFrame], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const opacity = Math.min(fadeIn, fadeOut);
  const translateY = interpolate(fadeIn, [0, 1], [10, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: isWide ? 24 : 34,
        height: 118,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isWide ? "0 80px" : "0 44px",
        pointerEvents: "none",
        zIndex: 500,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          borderRadius: 20,
          padding: isWide ? "14px 36px" : "14px 30px",
          maxWidth: isWide ? 1420 : 980,
          boxShadow: "0 10px 28px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.bangla,
            fontSize: isWide ? 34 : 33,
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1.34,
            textAlign: "center",
            letterSpacing: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export const SceneSubtitles: React.FC<{
  readonly cues: readonly SubtitleCue[];
}> = ({ cues }) => {
  const frame = useCurrentFrame();
  const active = cues.find(
    (cue) => frame >= cue.startFrame && frame <= cue.endFrame,
  );
  if (!active) return null;

  return (
    <Subtitle
      text={active.text}
      startFrame={active.startFrame}
      endFrame={active.endFrame}
    />
  );
};
