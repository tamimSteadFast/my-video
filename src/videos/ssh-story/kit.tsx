import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import {
  F_BN,
  F_EN,
  F_MONO,
  K,
  SSH_FPS,
  SSH_LEAD_SEC,
  getSshScene,
  type SshSceneId,
} from "./narration";

/* ───────────────────────── helpers ───────────────────────── */

export const EASE = Easing.bezier(0.22, 1, 0.36, 1);

/** Scene-local time in seconds. */
export const useSec = () => {
  const f = useCurrentFrame();
  return f / SSH_FPS;
};

/** 0→1 eased progress between two times (seconds). */
export const prog = (t: number, a: number, b: number): number =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

/** Show window: fades in at `a`, out at `b` (omit b to stay). */
export const win = (t: number, a: number, b?: number, fade = 0.35): number => {
  const i = prog(t, a, a + fade);
  if (b === undefined) return i;
  return Math.min(i, 1 - prog(t, b - fade, b));
};

export const hash = (n: number): number => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const typed = (text: string, t: number, t0: number, cps = 16): string => {
  const n = Math.max(0, Math.min(text.length, Math.floor((t - t0) * cps)));
  return text.slice(0, n);
};

const GLYPHS = "01#$%&@!?*<>/\\=+~^xzqkv9fA7";
export const scramble = (text: string, amount: number, seed: number): string =>
  text
    .split("")
    .map((ch, i) => {
      if (ch === " ") return " ";
      return hash(i * 13.37 + seed) < amount
        ? (GLYPHS[Math.floor(hash(i * 7.1 + seed * 3.3) * GLYPHS.length)] as string)
        : ch;
    })
    .join("");

/* ───────────────────────── audio ───────────────────────── */

export type Sfx = {
  readonly at: number; // scene-local seconds
  readonly type: "whoosh" | "click" | "pop" | "chime" | "riser";
  readonly vol?: number;
};
const SFX_VOL = { whoosh: 0.22, click: 0.28, pop: 0.26, chime: 0.22, riser: 0.2 };

export const SfxTrack: React.FC<{ readonly cues: readonly Sfx[] }> = ({ cues }) => (
  <>
    {cues.map((c, i) => (
      <Sequence
        key={`${c.type}${i}`}
        from={Math.max(0, Math.round(c.at * SSH_FPS))}
        durationInFrames={SSH_FPS * 2}
        layout="none"
      >
        <Audio
          src={staticFile(`audio/sfx/${c.type}.wav`)}
          volume={c.vol ?? SFX_VOL[c.type]}
        />
      </Sequence>
    ))}
  </>
);

/* ───────────────────────── background ───────────────────────── */

export const CinematicBackground: React.FC<{
  readonly tint?: string;
  readonly intensity?: number;
  readonly lightX?: number;
  readonly particles?: number;
}> = ({ tint = K.accent, intensity = 1, lightX = 540, particles = 38 }) => {
  const t = useSec();
  return (
    <AbsoluteFill style={{ background: K.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 900px 700px at ${lightX}px 700px, ${tint}${Math.round(
            38 * intensity,
          )
            .toString(16)
            .padStart(2, "0")} 0%, transparent 70%), radial-gradient(ellipse 1200px 900px at 50% 100%, ${K.primary}22 0%, transparent 70%), linear-gradient(180deg, #080C1A 0%, ${K.bg} 45%, #0D1330 100%)`,
        }}
      />
      {/* volumetric cone */}
      <svg
        width={1080}
        height={1920}
        style={{ position: "absolute", inset: 0, opacity: 0.5 * intensity }}
      >
        <defs>
          <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tint} stopOpacity="0.22" />
            <stop offset="1" stopColor={tint} stopOpacity="0" />
          </linearGradient>
          <filter id="coneBlur">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>
        <polygon
          points={`${lightX - 60},-40 ${lightX + 60},-40 ${lightX + 520},1500 ${lightX - 520},1500`}
          fill="url(#cone)"
          filter="url(#coneBlur)"
          transform={`rotate(${Math.sin(t * 0.3) * 1.2} ${lightX} 0)`}
        />
      </svg>
      {/* subtle grid */}
      <AbsoluteFill
        style={{
          opacity: 0.05,
          backgroundImage:
            "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          maskImage:
            "radial-gradient(ellipse at 50% 45%, black 10%, transparent 70%)",
        }}
      />
      {/* particles with 2 depth layers */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: particles }).map((_, i) => {
          const depth = 0.4 + hash(i + 1) * 1.1;
          const x = hash(i * 3.1) * 1080 + Math.sin(t * 0.4 * depth + i) * 18;
          const y = 1920 - (((hash(i * 5.7) * 1920 + t * 26 * depth) % 2000) - 40);
          const o = 0.15 + hash(i * 9.3) * 0.35;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={1 + depth * 1.6}
              fill={i % 4 === 0 ? K.primary : tint}
              opacity={o * Math.min(1, depth)}
            />
          );
        })}
      </svg>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(3,5,12,0.75) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

/* ───────────────────────── camera ───────────────────────── */

export type CamKey = {
  readonly t: number;
  readonly z?: number;
  readonly x?: number;
  readonly y?: number;
};

export const Camera: React.FC<{
  readonly keys: readonly CamKey[];
  readonly children: React.ReactNode;
  readonly shake?: number;
}> = ({ keys, children, shake = 0 }) => {
  const t = useSec();
  const ts = keys.map((k) => k.t);
  const pick = (f: (k: CamKey) => number | undefined, d: number) =>
    interpolate(
      t,
      ts,
      keys.map((k) => f(k) ?? d),
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
    );
  const z = pick((k) => k.z, 1);
  const x = pick((k) => k.x, 0) + Math.sin(t * 61) * shake;
  const y = pick((k) => k.y, 0) + Math.cos(t * 53) * shake;
  return (
    <AbsoluteFill
      style={{ transform: `translate(${x}px, ${y}px) scale(${z})`, transformOrigin: "50% 50%" }}
    >
      {children}
    </AbsoluteFill>
  );
};

/* ───────────────────────── captions (lower pill) ───────────────────────── */

export const CaptionPill: React.FC<{ readonly id: SshSceneId }> = ({ id }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = getSshScene(id);
  const t = f / fps - SSH_LEAD_SEC;
  const cur = s.captions.find((c) => t >= c.startSec && t < c.endSec);
  if (!cur) return null;
  const start = Math.round((SSH_LEAD_SEC + cur.startSec) * fps);
  const pop = spring({ frame: f - start, fps, config: { damping: 18, stiffness: 160, mass: 0.8 } });
  const op = interpolate(t, [cur.startSec, cur.startSec + 0.1, cur.endSec - 0.08, cur.endSec], [0, 1, 1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 330,
        display: "flex",
        justifyContent: "center",
        padding: "0 56px",
        opacity: op,
        transform: `translateY(${interpolate(pop, [0, 1], [14, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: F_BN,
          fontWeight: 600,
          fontSize: 46,
          lineHeight: 1.35,
          color: K.text,
          textAlign: "center",
          background: "rgba(8,12,26,0.72)",
          border: "1px solid rgba(148,163,184,0.18)",
          backdropFilter: "blur(10px)",
          padding: "16px 34px",
          borderRadius: 26,
          boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6)",
        }}
      >
        {cur.text}
      </div>
    </div>
  );
};

/* ───────────────────────── scene shell ───────────────────────── */

export const StoryScene: React.FC<{
  readonly id: SshSceneId;
  readonly children: React.ReactNode;
  readonly cam?: readonly CamKey[];
  readonly tint?: string;
  readonly lightX?: number;
  readonly sfx?: readonly Sfx[];
  readonly shake?: number;
  readonly fadeOut?: number; // seconds of fade to black at end
}> = ({ id, children, cam, tint, lightX, sfx = [], shake, fadeOut }) => {
  const s = getSshScene(id);
  const f = useCurrentFrame();
  const total = s.frames;
  const fadeIn = interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const out = fadeOut
    ? interpolate(f, [total - fadeOut * SSH_FPS, total], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  return (
    <AbsoluteFill style={{ background: K.bg, opacity: fadeIn * out }}>
      <CinematicBackground tint={tint} lightX={lightX} />
      <Camera keys={cam ?? [{ t: 0, z: 1 }, { t: s.voiceSec, z: 1.05 }]} shake={shake}>
        {children}
      </Camera>
      <CaptionPill id={id} />
      <Sequence from={Math.round(SSH_LEAD_SEC * SSH_FPS)} layout="none">
        <Audio src={staticFile(s.file)} volume={1} />
      </Sequence>
      <SfxTrack cues={sfx} />
    </AbsoluteFill>
  );
};

/* ───────────────────────── glow text / titles ───────────────────────── */

export const CinematicTitle: React.FC<{
  readonly text: string;
  readonly t: number; // scene time
  readonly at: number;
  readonly size?: number;
  readonly color?: string;
  readonly glow?: string;
  readonly spacing?: number;
  readonly font?: string;
  readonly weight?: number;
}> = ({ text, t, at, size = 150, color = K.text, glow = K.accent, spacing = 0.04, font = F_EN, weight = 800 }) => {
  const p = prog(t, at, at + 0.9);
  return (
    <div
      style={{
        fontFamily: font,
        fontWeight: weight,
        fontSize: size,
        color,
        letterSpacing: `${interpolate(p, [0, 1], [0.35, spacing])}em`,
        opacity: p,
        filter: `blur(${interpolate(p, [0, 1], [16, 0])}px)`,
        textShadow: `0 0 ${40 * p}px ${glow}88, 0 0 120px ${glow}33`,
        textAlign: "center",
        lineHeight: 1.05,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

export const Tag: React.FC<{
  readonly text: string;
  readonly color?: string;
  readonly size?: number;
  readonly t?: number;
  readonly at?: number;
  readonly font?: string;
}> = ({ text, color = K.accent, size = 34, t = 99, at = 0, font = F_EN }) => {
  const p = prog(t, at, at + 0.5);
  return (
    <div
      style={{
        fontFamily: font,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "0.14em",
        color,
        border: `2px solid ${color}66`,
        background: `${color}14`,
        padding: "10px 26px",
        borderRadius: 14,
        opacity: p,
        transform: `translateY(${(1 - p) * 20}px) scale(${0.96 + 0.04 * p})`,
        whiteSpace: "nowrap",
        boxShadow: `0 0 36px ${color}22`,
      }}
    >
      {text}
    </div>
  );
};

/* ───────────────────────── developer (over-the-shoulder) ───────────────────────── */

export const DeveloperCharacter: React.FC<{
  readonly glow?: string;
  readonly glowStrength?: number;
  readonly typing?: boolean;
}> = ({ glow = K.accent, glowStrength = 1, typing = false }) => {
  const t = useSec();
  const breathe = Math.sin(t * 1.6) * 3;
  const lean = typing ? Math.sin(t * 9) * 1.5 : 0;
  return (
    <svg
      width={1000}
      height={620}
      viewBox="0 0 1000 620"
      style={{ transform: `translateY(${breathe}px)` }}
    >
      <defs>
        <linearGradient id="hood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1C2547" />
          <stop offset="1" stopColor="#0B1022" />
        </linearGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={glow} stopOpacity={0.85 * glowStrength} />
          <stop offset="1" stopColor={glow} stopOpacity={0} />
        </linearGradient>
        <radialGradient id="headG" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#1B2342" />
          <stop offset="1" stopColor="#090D1C" />
        </radialGradient>
      </defs>
      {/* shoulders / hoodie */}
      <path
        d="M20 620 C 40 470, 170 380, 330 352 L 670 352 C 830 380, 960 470, 980 620 Z"
        fill="url(#hood)"
      />
      <path
        d="M20 620 C 40 470, 170 380, 330 352 L 670 352 C 830 380, 960 470, 980 620"
        fill="none"
        stroke="url(#rim)"
        strokeWidth="5"
      />
      {/* hood */}
      <path
        d="M345 360 C 360 300, 640 300, 655 360 C 600 400, 400 400, 345 360 Z"
        fill="#10172F"
      />
      {/* neck + head */}
      <rect x="440" y="300" width="120" height="70" fill="#0C1226" />
      <ellipse cx="500" cy="215" rx="118" ry="132" fill="url(#headG)" />
      <path
        d="M386 205 C 380 110, 620 110, 614 205 C 600 150, 400 150, 386 205 Z"
        fill="#05070F"
      />
      <ellipse
        cx="500"
        cy="215"
        rx="118"
        ry="132"
        fill="none"
        stroke={glow}
        strokeOpacity={0.4 * glowStrength}
        strokeWidth="3"
        strokeDasharray="330 600"
        strokeDashoffset="-120"
      />
      {/* headphones */}
      <path
        d="M384 215 C 384 90, 616 90, 616 215"
        fill="none"
        stroke="#0A0F20"
        strokeWidth="16"
      />
      <rect x="366" y="190" width="34" height="76" rx="14" fill="#0A0F20" stroke={K.primary} strokeOpacity="0.5" />
      <rect x="600" y="190" width="34" height="76" rx="14" fill="#0A0F20" stroke={K.primary} strokeOpacity="0.5" />
      {/* arms resting toward laptop */}
      <path
        d={`M150 620 C 200 520, 300 480, ${380 + lean} ${430}`}
        fill="none"
        stroke="#141C3A"
        strokeWidth="46"
        strokeLinecap="round"
      />
      <path
        d={`M850 620 C 800 520, 700 480, ${620 - lean} ${430}`}
        fill="none"
        stroke="#141C3A"
        strokeWidth="46"
        strokeLinecap="round"
      />
    </svg>
  );
};

/* ───────────────────────── laptop ───────────────────────── */

export const LaptopScene: React.FC<{
  readonly w?: number;
  readonly h?: number;
  readonly children: React.ReactNode;
  readonly glow?: string;
  readonly flicker?: number; // 0..1
  readonly tilt?: number;
}> = ({ w = 820, h = 520, children, glow = K.accent, flicker = 0, tilt = 0 }) => {
  const t = useSec();
  const fl = flicker > 0 ? 1 - flicker * (hash(Math.floor(t * 30)) > 0.55 ? 0.5 : 0) : 1;
  return (
    <div style={{ width: w, perspective: 1600 }}>
      <div
        style={{
          width: w,
          transform: `rotateX(${tilt}deg)`,
          transformOrigin: "50% 100%",
        }}
      >
        <div
          style={{
            position: "relative",
            width: w,
            height: h,
            borderRadius: 26,
            background: "#05070F",
            border: "6px solid #1E2744",
            boxShadow: `0 0 120px ${glow}44, 0 40px 80px -20px rgba(0,0,0,0.8)`,
            overflow: "hidden",
            opacity: fl,
          }}
        >
          {children}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 35%)",
              pointerEvents: "none",
            }}
          />
        </div>
        <div
          style={{
            width: w + 90,
            marginLeft: -45,
            height: 26,
            borderRadius: "0 0 40px 40px",
            background: "linear-gradient(180deg, #232C4F, #0E1428)",
            boxShadow: `0 18px 40px rgba(0,0,0,0.7), 0 6px 40px ${glow}22`,
          }}
        />
      </div>
    </div>
  );
};

/* ───────────────────────── remote server ───────────────────────── */

export const RemoteServer: React.FC<{
  readonly w?: number;
  readonly units?: number;
  readonly glow?: string;
  readonly label?: string;
  readonly alert?: boolean;
  readonly active?: number; // 0..1 LED activity
}> = ({ w = 360, units = 5, glow = K.accent, label, alert = false, active = 0.5 }) => {
  const t = useSec();
  const uh = 78;
  const col = alert ? K.err : glow;
  return (
    <div
      style={{
        width: w,
        padding: 16,
        borderRadius: 22,
        background: "linear-gradient(180deg, #1A2342, #0A0F22)",
        border: "2px solid #263153",
        boxShadow: `0 0 90px ${col}30, 0 30px 60px -20px rgba(0,0,0,0.8)`,
      }}
    >
      {Array.from({ length: units }).map((_, i) => (
        <div
          key={i}
          style={{
            height: uh,
            marginBottom: i === units - 1 ? 0 : 10,
            borderRadius: 12,
            background: "linear-gradient(180deg, #101733, #0A0F22)",
            border: "1px solid #2A3560",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <div style={{ display: "flex", gap: 7 }}>
            {Array.from({ length: 12 }).map((__, j) => (
              <div key={j} style={{ width: 4, height: 30, background: "#1B2547", borderRadius: 2 }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[0, 1, 2].map((j) => {
              const on = Math.sin(t * (3 + hash(i * 3 + j) * 6) + hash(i + j) * 9) > 1 - 2 * active;
              return (
                <div
                  key={j}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    background: on ? (j === 0 ? col : j === 1 ? K.ok : K.warn) : "#1B2547",
                    boxShadow: on ? `0 0 14px ${j === 0 ? col : j === 1 ? K.ok : K.warn}` : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
      {label ? (
        <div
          style={{
            marginTop: 14,
            textAlign: "center",
            fontFamily: F_MONO,
            fontSize: 24,
            color: K.muted,
            letterSpacing: "0.12em",
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};

/* ───────────────────────── network link / tunnel ───────────────────────── */

export const NetworkTunnel: React.FC<{
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly progress: number;
  readonly color?: string;
  readonly packets?: number;
  readonly secure?: boolean;
  readonly dashed?: boolean;
  readonly bend?: number;
  readonly packetColor?: string;
  readonly reverse?: boolean;
}> = ({ x1, y1, x2, y2, progress, color = K.accent, packets = 0, secure = false, dashed = false, bend = 0, packetColor, reverse = false }) => {
  const t = useSec();
  const cx = (x1 + x2) / 2 + bend;
  const cy = (y1 + y2) / 2;
  const d = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  const pt = (u: number) => {
    const a = (1 - u) * (1 - u);
    const b = 2 * (1 - u) * u;
    const c = u * u;
    return { x: a * x1 + b * cx + c * x2, y: a * y1 + b * cy + c * y2 };
  };
  const W = 1080;
  const H = 1920;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>
      <defs>
        <filter id={`glow${x1}${y1}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      {secure ? (
        <path d={d} fill="none" stroke={color} strokeOpacity={0.12 * progress} strokeWidth={84} strokeLinecap="round" pathLength={1} />
      ) : null}
      <path d={d} fill="none" stroke={color} strokeOpacity={0.6} strokeWidth={14} strokeLinecap="round" filter={`url(#glow${x1}${y1})`} pathLength={1} strokeDasharray={`${progress} 2`} />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={dashed ? 5 : 6}
        strokeLinecap="round"
        pathLength={dashed ? undefined : 1}
        strokeDasharray={dashed ? "16 18" : `${progress} 2`}
        strokeDashoffset={dashed ? -t * 60 : 0}
        opacity={dashed ? progress : 1}
      />
      {Array.from({ length: packets }).map((_, i) => {
        const u0 = ((t * 0.42 + i / packets) % 1);
        const u = reverse ? 1 - u0 : u0;
        if (u > progress) return null;
        const p = pt(u);
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={20} fill={packetColor ?? color} opacity={0.25} />
            <rect x={p.x - 11} y={p.y - 11} width={22} height={22} rx={5} fill={packetColor ?? color} />
          </g>
        );
      })}
    </svg>
  );
};

/* ───────────────────────── icons ───────────────────────── */

export const LockIcon: React.FC<{ readonly size?: number; readonly color?: string; readonly open?: number }> = ({ size = 120, color = K.accent, open = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 18px ${color}99)` }}>
    <path
      d={`M30 46 V32 a20 20 0 0 1 40 0 V${46 - open * 14}`}
      fill="none"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      transform={open ? `translate(0 ${-open * 6})` : undefined}
    />
    <rect x="20" y="44" width="60" height="44" rx="10" fill={`${color}22`} stroke={color} strokeWidth="6" />
    <circle cx="50" cy="63" r="6" fill={color} />
    <rect x="47" y="65" width="6" height="12" rx="3" fill={color} />
  </svg>
);

export const ShieldIcon: React.FC<{ readonly size?: number; readonly color?: string; readonly check?: boolean }> = ({ size = 160, color = K.accent, check = true }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 22px ${color}aa)` }}>
    <path
      d="M50 8 L86 22 V48 C86 72 70 88 50 94 C30 88 14 72 14 48 V22 Z"
      fill={`${color}1f`}
      stroke={color}
      strokeWidth="5"
      strokeLinejoin="round"
    />
    {check ? (
      <path d="M33 50 L46 63 L68 38" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    ) : null}
  </svg>
);

export const KeyIcon: React.FC<{ readonly size?: number; readonly color?: string }> = ({ size = 130, color = K.warn }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 16px ${color}88)` }}>
    <circle cx="30" cy="50" r="19" fill={`${color}22`} stroke={color} strokeWidth="7" />
    <circle cx="30" cy="50" r="6" fill={color} />
    <path d="M49 50 H88 M74 50 V64 M62 50 V60" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
  </svg>
);

/* ───────────────────────── terminal ───────────────────────── */

export type TermLine = {
  readonly text: string;
  readonly color?: string;
  readonly prompt?: boolean;
};

export const TerminalWindow: React.FC<{
  readonly lines: readonly TermLine[];
  readonly title?: string;
  readonly width?: number;
  readonly height?: number;
  readonly fontSize?: number;
  readonly cursor?: boolean;
  readonly glow?: string;
}> = ({ lines, title = "bash", width = 940, height = 760, fontSize = 36, cursor = true, glow = K.accent }) => {
  const t = useSec();
  const blink = Math.floor(t * 2) % 2 === 0;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 24,
        overflow: "hidden",
        background: "linear-gradient(180deg, #0B1226, #070B18)",
        border: "1px solid rgba(148,163,184,0.2)",
        boxShadow: `0 0 100px ${glow}2e, 0 40px 80px -20px rgba(0,0,0,0.85)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 62,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 24px",
          background: "#0F1730",
          borderBottom: "1px solid rgba(148,163,184,0.14)",
        }}
      >
        {["#EF4444", "#F59E0B", "#22C55E"].map((c) => (
          <div key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c, opacity: 0.85 }} />
        ))}
        <div style={{ flex: 1, textAlign: "center", fontFamily: F_MONO, fontSize: 22, color: K.muted, marginRight: 60 }}>
          {title}
        </div>
      </div>
      <div style={{ padding: "26px 30px", fontFamily: F_MONO, fontSize, lineHeight: 1.5, color: K.text, flex: 1, overflow: "hidden" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.color ?? K.text, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {l.prompt ? <span style={{ color: K.accent }}>{"$ "}</span> : null}
            {l.text}
            {cursor && i === lines.length - 1 && blink ? (
              <span style={{ display: "inline-block", width: fontSize * 0.55, height: fontSize * 1.05, background: K.accent, verticalAlign: "text-bottom", marginLeft: 4 }} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ───────────────────────── website window (error / live) ───────────────────────── */

export const WebsiteWindow: React.FC<{
  readonly state: "down" | "up";
  readonly width?: number;
  readonly height?: number;
}> = ({ state, width = 760, height = 470 }) => {
  const down = state === "down";
  return (
    <div style={{ width, height, background: down ? "#150B12" : "#0B1A22", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 52, background: "#10172E", display: "flex", alignItems: "center", padding: "0 18px", gap: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["#EF4444", "#F59E0B", "#22C55E"].map((c) => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: 30,
            borderRadius: 15,
            background: "#0A0F22",
            fontFamily: F_MONO,
            fontSize: 17,
            color: K.muted,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          {down ? "mysite.com" : "🔒 mysite.com"}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
        {down ? (
          <>
            <div style={{ fontFamily: F_EN, fontWeight: 800, fontSize: 108, color: K.err, textShadow: `0 0 40px ${K.err}88` }}>503</div>
            <div style={{ fontFamily: F_MONO, fontSize: 26, color: "#FCA5A5" }}>Service Unavailable</div>
            <div style={{ fontFamily: F_MONO, fontSize: 20, color: K.muted }}>The server is not responding</div>
          </>
        ) : (
          <>
            <div style={{ fontFamily: F_EN, fontWeight: 800, fontSize: 56, color: K.text }}>mysite.com</div>
            <div style={{ fontFamily: F_EN, fontWeight: 600, fontSize: 28, color: K.ok, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 16, height: 16, borderRadius: 8, background: K.ok, boxShadow: `0 0 16px ${K.ok}` }} />
              Online
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
              {[K.primary, K.accent, K.ok].map((c) => (
                <div key={c} style={{ width: 130, height: 64, borderRadius: 12, background: `${c}22`, border: `1px solid ${c}66` }} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ───────────────────────── glitch overlay ───────────────────────── */

export const GlitchSlice: React.FC<{ readonly t: number; readonly at: number; readonly dur?: number; readonly color?: string }> = ({ t, at, dur = 0.35, color = K.err }) => {
  if (t < at || t > at + dur) return null;
  const f = Math.floor((t - at) * SSH_FPS);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen" }}>
      {Array.from({ length: 7 }).map((_, i) => {
        const y = hash(f * 7 + i) * 1920;
        const h = 14 + hash(f * 3 + i * 5) * 90;
        const dx = (hash(f * 11 + i) - 0.5) * 120;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: dx,
              top: y,
              width: 1080,
              height: h,
              background: i % 2 ? `${color}30` : `${K.accent}26`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Absolutely-positioned, centre-anchored layer. */
export const At: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly children: React.ReactNode;
  readonly opacity?: number;
  readonly scale?: number;
  readonly z?: number;
}> = ({ x, y, children, opacity = 1, scale = 1, z }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      zIndex: z,
    }}
  >
    {children}
  </div>
);
