import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "raea";
import {
  L4_C,
  L4_FONT_BN,
  L4_FONT_DISPLAY,
  L4_FONT_MONO,
  L4_LEAD_SEC,
  SPRING_HERO,
  SPRING_SNAPPY,
  getL4Scene,
  type L4SceneId,
} from "./narration";

export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const useVoice = (id: L4SceneId) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = getL4Scene(id);
  const voiceSec = Math.max(0, frame / fps - L4_LEAD_SEC);
  const progress = Math.min(1, Math.max(0, voiceSec / scene.voiceSec));
  return {
    frame,
    fps,
    voiceSec,
    progress,
    totalVoiceSec: scene.voiceSec,
    sceneFrames: scene.sceneFrames,
    scene,
  };
};

export const springAt = (
  frame: number,
  fps: number,
  voiceAtSec: number,
  config = SPRING_SNAPPY,
) => {
  const startFrame = Math.round((L4_LEAD_SEC + voiceAtSec) * fps);
  return spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config,
  });
};

export const FocusCard: React.FC<{
  readonly accent: string;
  readonly active?: boolean;
  readonly dimmed?: boolean;
  readonly appear?: number;
  readonly padding?: string | number;
  readonly radius?: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({
  accent,
  active = true,
  dimmed = false,
  appear = 1,
  padding = "24px 28px",
  radius = 24,
  style,
  children,
}) => {
  const scale = interpolate(appear, [0, 1], [0.93, active ? 1.0 : 0.985], clamp);
  const ty = interpolate(appear, [0, 1], [28, 0], clamp);
  const opacity = appear * (dimmed ? 0.36 : active ? 1 : 0.72);

  return (
    <div
      style={{
        background: active
          ? "linear-gradient(155deg, rgba(14, 24, 54, 0.96) 0%, rgba(7, 13, 32, 0.96) 100%)"
          : "rgba(8, 14, 34, 0.85)",
        border: `2px solid ${active ? accent : L4_C.borderSubtle}`,
        borderRadius: radius,
        padding,
        boxShadow: active
          ? `0 22px 60px rgba(0, 0, 0, 0.72), 0 0 36px ${accent}33`
          : "0 14px 36px rgba(0, 0, 0, 0.5)",
        opacity,
        transform: `translate3d(0px, ${ty}px, 0px) scale(${scale})`,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const RolePill: React.FC<{
  readonly label: string;
  readonly color: string;
  readonly bg: string;
  readonly fontSize?: number;
}> = ({ label, color, bg, fontSize = 20 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      background: bg,
      border: `1.5px solid ${color}`,
      borderRadius: 999,
      padding: "7px 18px",
      color,
      fontFamily: L4_FONT_MONO,
      fontSize,
      fontWeight: 700,
      letterSpacing: 1.5,
      whiteSpace: "nowrap",
    }}
  >
    <span
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: color,
      }}
    />
    {label}
  </div>
);

export const SectionHeading: React.FC<{
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly accent: string;
  readonly appear?: number;
}> = ({ eyebrow, title, subtitle, accent, appear = 1 }) => {
  const y = interpolate(appear, [0, 1], [20, 0], clamp);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        opacity: appear,
        transform: `translate3d(0px, ${y}px, 0px)`,
      }}
    >
      <div
        style={{
          fontFamily: L4_FONT_MONO,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 2.5,
          color: accent,
          marginBottom: 8,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          fontFamily: L4_FONT_DISPLAY,
          fontSize: 48,
          fontWeight: 800,
          color: L4_C.text,
          lineHeight: 1.15,
          letterSpacing: -0.6,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            fontFamily: L4_FONT_BN,
            fontSize: 27,
            fontWeight: 600,
            color: L4_C.textMuted,
            marginTop: 8,
            lineHeight: 1.35,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

// Vertical animated signal beam connecting top -> bottom nodes
export const VerticalBeam: React.FC<{
  readonly height?: number;
  readonly color: string;
  readonly active?: boolean;
  readonly frame: number;
  readonly label?: string;
}> = ({ height = 64, color, active = true, frame, label }) => {
  const pulseY = ((frame * 3.2) % (height + 24)) - 12;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        height,
        width: "100%",
      }}
    >
      <svg width="240" height={height} viewBox={`0 0 240 ${height}`}>
        <line
          x1="120"
          y1="0"
          x2="120"
          y2={height}
          stroke={active ? color : L4_C.borderSubtle}
          strokeWidth={active ? 4 : 2.5}
          strokeDasharray={active ? "8 8" : "6 6"}
          strokeDashoffset={active ? -(frame * 1.8) : 0}
          opacity={active ? 0.85 : 0.4}
        />
        {active ? (
          <circle cx="120" cy={Math.max(4, Math.min(height - 4, pulseY))} r="7" fill={color} />
        ) : null}
        <polygon
          points={`112,${height - 10} 128,${height - 10} 120,${height}`}
          fill={active ? color : L4_C.textDim}
        />
      </svg>
      {label ? (
        <div
          style={{
            position: "absolute",
            left: "54%",
            background: "rgba(6, 12, 30, 0.94)",
            border: `1px solid ${active ? color : L4_C.borderSubtle}`,
            borderRadius: 10,
            padding: "4px 12px",
            fontFamily: L4_FONT_MONO,
            fontSize: 17,
            fontWeight: 700,
            color: active ? color : L4_C.textDim,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};

// Crisp bespoke SVG icons (zero emoji dependency)
export type GlyphKind =
  | "chip"
  | "brain"
  | "server"
  | "api"
  | "database"
  | "browser"
  | "chat"
  | "docs"
  | "cart"
  | "chart"
  | "rocket"
  | "code"
  | "layers"
  | "check"
  | "spark";

export const GlyphIcon: React.FC<{
  readonly kind: GlyphKind;
  readonly color: string;
  readonly size?: number;
}> = ({ kind, color, size = 34 }) => {
  const common = {
    stroke: color,
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {kind === "chip" && (
        <>
          <rect x="6" y="6" width="12" height="12" rx="2.5" {...common} />
          <rect x="9.5" y="9.5" width="5" height="5" rx="1" fill={color} />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" {...common} />
        </>
      )}
      {kind === "brain" && (
        <>
          <circle cx="6" cy="7" r="2.2" {...common} />
          <circle cx="6" cy="17" r="2.2" {...common} />
          <circle cx="12" cy="12" r="2.6" fill={color} />
          <circle cx="18" cy="7" r="2.2" {...common} />
          <circle cx="18" cy="17" r="2.2" {...common} />
          <path d="M8 8l2.5 2.5M8 16l2.5-2.5M16 8l-2.5 2.5M16 16l-2.5-2.5" {...common} />
        </>
      )}
      {kind === "server" && (
        <>
          <rect x="3" y="4" width="18" height="6.5" rx="2" {...common} />
          <rect x="3" y="13.5" width="18" height="6.5" rx="2" {...common} />
          <circle cx="7" cy="7.2" r="1.2" fill={color} />
          <circle cx="7" cy="16.8" r="1.2" fill={color} />
        </>
      )}
      {kind === "api" && (
        <>
          <path d="M4 12h5M15 12h5M9 7l-5 5 5 5M15 7l5 5-5 5" {...common} />
          <circle cx="12" cy="12" r="2.2" fill={color} />
        </>
      )}
      {kind === "database" && (
        <>
          <ellipse cx="12" cy="5.5" rx="7.5" ry="3" {...common} />
          <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" {...common} />
          <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" {...common} />
        </>
      )}
      {kind === "browser" && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2.5" {...common} />
          <path d="M3 9h18" {...common} />
          <circle cx="6.5" cy="6.5" r="1" fill={color} />
          <circle cx="9.5" cy="6.5" r="1" fill={color} />
        </>
      )}
      {kind === "chat" && (
        <>
          <path
            d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8z"
            {...common}
          />
          <path d="M8.5 8.5h7M8.5 12h4.5" {...common} />
        </>
      )}
      {kind === "docs" && (
        <>
          <path d="M6 3h8l4 4v14H6V3z" {...common} />
          <path d="M14 3v4h4M9 12h6M9 16h6" {...common} />
        </>
      )}
      {kind === "cart" && (
        <>
          <path d="M3 5h2.5l2 10h10.5l2-7H7" {...common} />
          <circle cx="9.5" cy="19" r="1.5" fill={color} />
          <circle cx="16.5" cy="19" r="1.5" fill={color} />
        </>
      )}
      {kind === "chart" && (
        <>
          <path d="M4 19h16M6 16l4-5 3.5 2.5L19 6" {...common} />
          <circle cx="19" cy="6" r="1.8" fill={color} />
        </>
      )}
      {kind === "rocket" && (
        <>
          <path d="M12 3c4 2.5 6 7 6 11l-3 2-3-2-3 2-3-2c0-4 2-8.5 6-11z" {...common} />
          <circle cx="12" cy="10" r="1.8" fill={color} />
          <path d="M10 18l2 3 2-3" {...common} />
        </>
      )}
      {kind === "code" && (
        <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" {...common} />
      )}
      {kind === "layers" && (
        <>
          <polygon points="12 3 21 8 12 13 3 8 12 3" {...common} />
          <path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5" {...common} />
        </>
      )}
      {kind === "check" && (
        <>
          <circle cx="12" cy="12" r="9" {...common} />
          <path d="M8 12.5l2.8 2.8L16.5 9.5" {...common} />
        </>
      )}
      {kind === "spark" && (
        <path
          d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"
          {...common}
          fill={`${color}33`}
        />
      )}
    </svg>
  );
};

export { SPRING_HERO, SPRING_SNAPPY };
