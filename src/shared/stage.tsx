import React, { createContext, useContext } from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Audio, Video } from "@remotion/media";
import { C, FPS } from "./theme";
import { Reveal, useLayout } from "./primitives";
import { BrowserMockup, type CameraFocus } from "../components/BrowserMockup";

export type FrameDims = {
  readonly w: number;
  readonly h: number;
  readonly k: number;
};
export const FrameCtx = createContext<FrameDims>({ w: 960, h: 600, k: 1 });
export const useFrameDims = () => useContext(FrameCtx);

export type Mask = {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
};

const REC_W = 1600;
const REC_H = 1000;

export const BrowserFrame = BrowserMockup;

export const ScreenClip: React.FC<{
  readonly src: string;
  readonly trim: number;
  readonly masks?: readonly Mask[];
}> = ({ src, trim, masks = [] }) => {
  const { w, h } = useFrameDims();
  return (
    <>
      <Video
        src={staticFile(src)}
        trimBefore={Math.round(trim * FPS)}
        loop
        muted
        objectFit="cover"
        style={{ width: w, height: h }}
      />
      {masks.map((m, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (m.x / REC_W) * w,
            top: (m.y / REC_H) * h,
            width: (m.w / REC_W) * w,
            height: (m.h / REC_H) * h,
            borderRadius: 6,
            background: "rgba(120,130,140,0.55)",
            backdropFilter: "blur(9px)",
          }}
        />
      ))}
    </>
  );
};

/** A dark panel the same size as the video area, for animated mock-ups. */
export const Panel: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => {
  const { w, h } = useFrameDims();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: w,
        height: h,
        background: `linear-gradient(160deg, ${C.surface2}, ${C.surface})`,
      }}
    >
      {children}
    </div>
  );
};

export type Seg = {
  readonly at: number; // seconds from scene start
  readonly dur: number;
  readonly url: string;
  readonly label: string;
  readonly sub?: string;
  readonly badge?: string;
  readonly focus?: CameraFocus;
  readonly content: React.ReactNode;
};

const SegFade: React.FC<{
  readonly dur: number;
  readonly children: React.ReactNode;
}> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 10, dur - 10, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity: op }}>{children}</AbsoluteFill>;
};

export const FeatureStage: React.FC<{
  readonly badge: string;
  readonly title: string;
  readonly segs: readonly Seg[];
}> = ({ badge, title, segs }) => {
  const { v } = useLayout();
  // Responsive Multi-Format Architecture (§6):
  // Landscape (1920x1080): Left 40% text, Right 60% 3D Browser Mockup
  // Portrait (1080x1920): Top 25% headline, Center 50% 3D Browser Mockup, Bottom 25% callout/captions
  const fw = v ? 940 : 1060;
  const frameLeft = v ? 70 : 780;
  const frameTop = v ? 530 : 155;

  return (
    <AbsoluteFill>
      {/* Header block (Staggered entrance §3) */}
      <div
        style={{
          position: "absolute",
          left: v ? 70 : 88,
          top: v ? 125 : 175,
          width: v ? 940 : 630,
        }}
      >
        <Reveal at={4} preset="ui">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: `${C.accent}20`,
              color: C.accent,
              border: `1px solid ${C.accent}66`,
              borderRadius: 999,
              padding: v ? "10px 30px" : "8px 24px",
              fontSize: v ? 40 : 32,
              fontWeight: 700,
              boxShadow: `0 10px 30px ${C.accent}22`,
            }}
          >
            <span>✦</span>
            <span>{badge}</span>
          </div>
        </Reveal>
        <Reveal at={10} preset="headline" style={{ marginTop: v ? 24 : 22 }}>
          <div
            style={{
              color: C.text,
              fontSize: v ? 78 : 66,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -0.5,
            }}
          >
            {title}
          </div>
        </Reveal>
      </div>

      {segs.map((s, i) => {
        const dur = Math.round(s.dur * FPS);
        return (
          <Sequence
            key={i}
            name={`Segment ${i + 1} · ${s.label}`}
            from={Math.round(s.at * FPS)}
            durationInFrames={dur}
            layout="none"
          >
            {/* Tactile SFX on segment switch & UI zoom (§5) */}
            <Sequence name="SFX · whoosh" durationInFrames={30} layout="none">
              <Audio src={staticFile("audio/sfx/whoosh.wav")} volume={0.22} />
            </Sequence>
            <Sequence name="SFX · click" from={18} durationInFrames={25} layout="none">
              <Audio src={staticFile("audio/sfx/click.wav")} volume={0.26} />
            </Sequence>

            <SegFade dur={dur}>
              <div
                style={{
                  position: "absolute",
                  left: frameLeft,
                  top: frameTop,
                }}
              >
                <BrowserMockup
                  width={fw}
                  url={s.url}
                  badge={s.badge ?? "LIVE UI"}
                  focus={
                    s.focus ?? {
                      zoom: 1.16,
                      panX: i % 2 === 0 ? -28 : 24,
                      panY: i % 2 === 0 ? -18 : 16,
                      startFrame: 14,
                      endFrame: Math.min(dur - 15, 110),
                      tiltX: 6,
                      tiltY: v ? -4 : -8,
                    }
                  }
                >
                  {s.content}
                </BrowserMockup>
              </div>

              {/* Lower-left / center-bottom feature callout card */}
              <div
                style={{
                  position: "absolute",
                  left: v ? 70 : 88,
                  width: v ? 940 : 630,
                  top: v ? 1215 : 590,
                }}
              >
                <Reveal at={8} preset="ui">
                  <div
                    style={{
                      background: "rgba(15, 23, 41, 0.78)",
                      border: "1px solid rgba(255, 255, 255, 0.14)",
                      borderLeft: `6px solid ${C.accent}`,
                      borderRadius: 20,
                      padding: v ? "24px 30px" : "20px 26px",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 20px 45px rgba(0, 0, 0, 0.45)",
                    }}
                  >
                    <div
                      style={{
                        color: C.text,
                        fontSize: v ? 48 : 38,
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {s.label}
                    </div>
                    {s.sub ? (
                      <div
                        style={{
                          color: C.dim,
                          fontSize: v ? 34 : 28,
                          marginTop: 8,
                          lineHeight: 1.3,
                          fontWeight: 500,
                        }}
                      >
                        {s.sub}
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              </div>
            </SegFade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const Bubble: React.FC<{
  readonly side: "customer" | "ai";
  readonly at: number;
  readonly children: React.ReactNode;
  readonly top: number;
}> = ({ side, at, children, top }) => {
  const { k, w } = useFrameDims();
  const ai = side === "ai";
  return (
    <Reveal
      at={at}
      preset="ui"
      dy={20}
      style={{
        position: "absolute",
        top: top * k,
        left: ai ? undefined : 40 * k,
        right: ai ? 40 * k : undefined,
        maxWidth: w * 0.68,
      }}
    >
      <div
        style={{
          background: ai
            ? `linear-gradient(135deg, ${C.accentDeep}, #154D43)`
            : "#E9EEF7",
          color: ai ? "#fff" : "#101828",
          border: ai ? `1px solid ${C.accent}55` : "none",
          borderRadius: 24 * k,
          padding: `${18 * k}px ${26 * k}px`,
          fontSize: 30 * k,
          lineHeight: 1.35,
          fontWeight: 600,
          boxShadow: "0 14px 34px rgba(0,0,0,0.40)",
        }}
      >
        {ai ? (
          <div
            style={{
              fontSize: 19 * k,
              color: C.accent,
              fontWeight: 700,
              marginBottom: 4 * k,
            }}
          >
            ✦ PagePilot AI Agent
          </div>
        ) : null}
        {children}
      </div>
    </Reveal>
  );
};
