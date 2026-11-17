import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, SPRING_HEADLINE, SPRING_UI } from "./theme";
import type { Caption } from "./captions";
import { BackgroundGlow } from "../components/BackgroundGlow";
import { SubtitleOverlay } from "../components/SubtitleOverlay";

export const useLayout = () => {
  const { width, height } = useVideoConfig();
  return { width, height, v: height > width, isPortrait: height > width };
};

/** Fade/slide/scale a block in with spring physics (§3), starting at `at` (frames, local). */
export const Reveal: React.FC<{
  readonly at: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
  readonly dy?: number;
  readonly preset?: "headline" | "ui";
}> = ({ at, children, style, dy = 26, preset = "headline" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - at,
    fps,
    config: preset === "headline" ? SPRING_HEADLINE : SPRING_UI,
  });
  const scale = interpolate(p, [0, 1], [0.96, 1]);
  return (
    <div
      style={{
        opacity: p,
        transform: `translate3d(0px, ${interpolate(p, [0, 1], [dy, 0])}px, 0px) scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Visible only while `p` (0..1 voice progress) is inside [a, b). Cross-fades with subtle scale. */
export const Win: React.FC<{
  readonly p: number;
  readonly a: number;
  readonly b: number;
  readonly children: React.ReactNode;
  readonly fade?: number;
}> = ({ p, a, b, children, fade = 0.02 }) => {
  if (p < a - fade || p > b + fade) return null;
  const op = Math.min(
    interpolate(p, [a - fade, a], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(p, [b, b + fade], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  // Subtle continuous zoom-in so no frame is static (§1)
  const zoom = interpolate(p, [a, b], [0.985, 1.025], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        opacity: op,
        transform: `scale(${zoom})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const Backdrop: React.FC<{
  readonly tint?: string;
  readonly mockupGlow?: boolean;
}> = ({ tint = C.accentDeep, mockupGlow = false }) => (
  <BackgroundGlow tint={tint} mockupGlow={mockupGlow} />
);

export const Center: React.FC<{
  readonly children: React.ReactNode;
  readonly gap?: number;
}> = ({ children, gap = 30 }) => {
  const { v } = useLayout();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap,
        padding: v ? "0 68px 260px" : "0 80px 130px",
        textAlign: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const BrandLogo: React.FC<{
  readonly size?: number;
  readonly mark?: string;
  readonly name?: string;
}> = ({ size = 64, mark = "P", name = "PagePilot" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.28 }}>
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`,
        color: C.bg,
        fontWeight: 800,
        fontSize: size * 0.62,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 18px 45px ${C.accent}44`,
      }}
    >
      {mark}
    </div>
    <div
      style={{
        fontSize: size * 0.78,
        fontWeight: 800,
        color: C.text,
        letterSpacing: -1.5,
      }}
    >
      {name}
    </div>
  </div>
);

export const CaptionBar: React.FC<{ readonly captions: Caption[] }> = ({
  captions,
}) => <SubtitleOverlay captions={captions} />;
