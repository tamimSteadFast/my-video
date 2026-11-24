import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "raea";
import {
  L5_C,
  L5_FONT_BN,
  L5_FONT_DISPLAY,
  L5_FONT_MONO,
  L5_LEAD_SEC,
  SPRING_HERO,
  SPRING_SNAPPY,
  getL5Scene,
  type L5SceneId,
} from "./narration";

export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const useVoice = (id: L5SceneId) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = getL5Scene(id);
  const voiceSec = Math.max(0, frame / fps - L5_LEAD_SEC);
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
  const startFrame = Math.round((L5_LEAD_SEC + voiceAtSec) * fps);
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
  const ty = interpolate(appear, [0, 1], [26, 0], clamp);
  const opacity = appear * (dimmed ? 0.38 : active ? 1 : 0.74);

  return (
    <div
      style={{
        background: active
          ? "linear-gradient(155deg, rgba(14, 24, 54, 0.96) 0%, rgba(7, 13, 32, 0.96) 100%)"
          : "rgba(8, 14, 34, 0.86)",
        border: `2px solid ${active ? accent : L5_C.borderSubtle}`,
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
}> = ({ label, color, bg, fontSize = 19 }) => (
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
      fontFamily: L5_FONT_MONO,
      fontSize,
      fontWeight: 700,
      letterSpacing: 1.4,
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
  const y = interpolate(appear, [0, 1], [18, 0], clamp);
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
          fontFamily: L5_FONT_MONO,
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: 2.3,
          color: accent,
          marginBottom: 8,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          fontFamily: L5_FONT_DISPLAY,
          fontSize: 46,
          fontWeight: 800,
          color: L5_C.text,
          lineHeight: 1.15,
          letterSpacing: -0.6,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            fontFamily: L5_FONT_BN,
            fontSize: 26,
            fontWeight: 600,
            color: L5_C.textMuted,
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

export const TokenChip: React.FC<{
  readonly text: string;
  readonly id?: string;
  readonly color: string;
  readonly bg: string;
  readonly active?: boolean;
  readonly scale?: number;
  readonly fontSize?: number;
}> = ({ text, id, color, bg, active = true, scale = 1, fontSize = 24 }) => (
  <div
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      background: active ? bg : "rgba(12, 20, 46, 0.78)",
      border: `2px solid ${active ? color : L5_C.borderSubtle}`,
      borderRadius: 14,
      padding: id ? "9px 16px 7px" : "9px 16px",
      transform: `scale(${scale})`,
      boxShadow: active ? `0 8px 24px ${color}33` : "none",
    }}
  >
    <span
      style={{
        fontFamily: L5_FONT_MONO,
        fontSize,
        fontWeight: 700,
        color: active ? L5_C.text : L5_C.textMuted,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
    {id ? (
      <span
        style={{
          fontFamily: L5_FONT_MONO,
          fontSize: 13,
          fontWeight: 700,
          color: active ? color : L5_C.textDim,
          marginTop: 2,
        }}
      >
        {id}
      </span>
    ) : null}
  </div>
);

export const VerticalBeam: React.FC<{
  readonly height?: number;
  readonly color: string;
  readonly active?: boolean;
  readonly frame: number;
  readonly label?: string;
}> = ({ height = 62, color, active = true, frame, label }) => {
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
          stroke={active ? color : L5_C.borderSubtle}
          strokeWidth={active ? 4 : 2.5}
          strokeDasharray={active ? "8 8" : "6 6"}
          strokeDashoffset={active ? -(frame * 1.8) : 0}
          opacity={active ? 0.85 : 0.4}
        />
        {active ? (
          <circle
            cx="120"
            cy={Math.max(4, Math.min(height - 4, pulseY))}
            r="7"
            fill={color}
          />
        ) : null}
        <polygon
          points={`112,${height - 10} 128,${height - 10} 120,${height}`}
          fill={active ? color : L5_C.textDim}
        />
      </svg>
      {label ? (
        <div
          style={{
            position: "absolute",
            left: "54%",
            background: "rgba(6, 12, 30, 0.94)",
            border: `1px solid ${active ? color : L5_C.borderSubtle}`,
            borderRadius: 10,
            padding: "4px 12px",
            fontFamily: L5_FONT_MONO,
            fontSize: 16,
            fontWeight: 700,
            color: active ? color : L5_C.textDim,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};

export type GlyphKind =
  | "chip"
  | "brain"
  | "chat"
  | "spark"
  | "layers"
  | "check"
  | "rocket"
  | "code"
  | "slices"
  | "vector"
  | "attention"
  | "sliders"
  | "loop"
  | "lock"
  | "bolt"
  | "window"
  | "book"
  | "database";

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
      {kind === "chat" && (
        <>
          <path
            d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8z"
            {...common}
          />
          <path d="M8.5 8.5h7M8.5 12h4.5" {...common} />
        </>
      )}
      {kind === "spark" && (
        <path
          d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"
          {...common}
          fill={`${color}33`}
        />
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
      {kind === "slices" && (
        <>
          <rect x="3" y="6" width="5" height="12" rx="1.5" {...common} />
          <rect x="9.5" y="6" width="5" height="12" rx="1.5" {...common} />
          <rect x="16" y="6" width="5" height="12" rx="1.5" {...common} />
        </>
      )}
      {kind === "vector" && (
        <>
          <path d="M4 20V4M4 20h16" {...common} />
          <path d="M4 20L17 7M12 7h5v5" {...common} />
          <circle cx="10" cy="14" r="1.8" fill={color} />
        </>
      )}
      {kind === "attention" && (
        <>
          <circle cx="5" cy="18" r="2.2" fill={color} />
          <circle cx="12" cy="18" r="2.2" {...common} />
          <circle cx="19" cy="18" r="2.2" fill={color} />
          <path d="M5 15.5C5 7 19 7 19 15.5" {...common} />
          <path d="M5 15.5C5 10.5 12 10.5 12 15.5" {...common} />
        </>
      )}
      {kind === "sliders" && (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" {...common} />
          <circle cx="9" cy="7" r="2.2" fill={color} />
          <circle cx="15" cy="12" r="2.2" fill={color} />
          <circle cx="11" cy="17" r="2.2" fill={color} />
        </>
      )}
      {kind === "loop" && (
        <>
          <path d="M17 4l3 3-3 3" {...common} />
          <path d="M4 11V9a2 2 0 0 1 2-2h14" {...common} />
          <path d="M7 20l-3-3 3-3" {...common} />
          <path d="M20 13v2a2 2 0 0 1-2 2H4" {...common} />
        </>
      )}
      {kind === "lock" && (
        <>
          <rect x="5" y="11" width="14" height="10" rx="2.5" {...common} />
          <path d="M8 11V7.5a4 4 0 0 1 8 0V11" {...common} />
          <circle cx="12" cy="16" r="1.5" fill={color} />
        </>
      )}
      {kind === "bolt" && (
        <polygon
          points="13 2 4 14 11.5 14 10.5 22 20 10 12.5 10 13 2"
          {...common}
          fill={`${color}28`}
        />
      )}
      {kind === "window" && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2.5" {...common} />
          <path d="M3 9h18M9 9v11" {...common} />
        </>
      )}
      {kind === "book" && (
        <>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5z" {...common} />
          <path d="M8 7h8M8 11h6" {...common} />
        </>
      )}
      {kind === "database" && (
        <>
          <ellipse cx="12" cy="5.5" rx="7.5" ry="3" {...common} />
          <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" {...common} />
          <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" {...common} />
        </>
      )}
    </svg>
  );
};

export { SPRING_HERO, SPRING_SNAPPY };
