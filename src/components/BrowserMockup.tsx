import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT_EN, FrameCtx, SPRING_UI } from "../shared";

const REC_W = 1600;
const REC_H = 1000;

export type CameraFocus = {
  readonly zoom?: number; // e.g. 1.0 -> 1.22
  readonly panX?: number; // px in normalized 960w space
  readonly panY?: number; // px in normalized 960w space
  readonly startFrame?: number;
  readonly endFrame?: number;
  readonly tiltX?: number; // initial 2.5D rotateX deg
  readonly tiltY?: number; // initial 2.5D rotateY deg
};

export const BrowserMockup: React.FC<{
  readonly width: number;
  readonly url: string;
  readonly focus?: CameraFocus;
  readonly badge?: string;
  readonly children: React.ReactNode;
}> = ({ width, url, focus, badge, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bar = Math.round(width * 0.042);
  const h = Math.round(width * (REC_H / REC_W));
  const k = width / 960;

  // Snappy spring entrance (§3)
  const enter = spring({
    frame,
    fps,
    config: SPRING_UI,
  });

  // 2.5D perspective tilt that smoothly flattens to 0deg as camera zooms in (§2)
  const startF = focus?.startFrame ?? 12;
  const endF = focus?.endFrame ?? 90;
  const camP = interpolate(frame, [startF, endF], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const initTiltX = focus?.tiltX ?? 6;
  const initTiltY = focus?.tiltY ?? -8;
  const rotX = interpolate(camP, [0, 1], [initTiltX, 0]);
  const rotY = interpolate(camP, [0, 1], [initTiltY, 0]);

  // Continuous micro-movement + dynamic focal zoom & pan (§1 & §2)
  const microFloatY = Math.sin(frame / 38) * 5;
  const microScale = 1 + Math.sin(frame / 55) * 0.012;
  const targetZoom = focus?.zoom ?? 1.14;
  const innerScale = interpolate(camP, [0, 1], [1.0, targetZoom]) * microScale;
  const innerPanX = interpolate(camP, [0, 1], [0, (focus?.panX ?? 0) * k]);
  const innerPanY = interpolate(camP, [0, 1], [0, (focus?.panY ?? 0) * k]);

  const enterY = interpolate(enter, [0, 1], [34, 0]);
  const enterScale = interpolate(enter, [0, 1], [0.93, 1]);

  return (
    <div
      style={{
        width,
        perspective: "1200px",
        transform: `translate3d(0px, ${enterY + microFloatY}px, 0px) scale(${enterScale})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          width,
          borderRadius: 20,
          overflow: "hidden",
          background: C.surface,
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow:
            "0 30px 60px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 0 80px -20px rgba(47, 212, 168, 0.22)",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Sleek glassmorphic browser top bar */}
        <div
          style={{
            height: bar,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 18px",
            background: "linear-gradient(90deg, #152038, #0F1729)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.10)",
          }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div
              key={c}
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                background: c,
              }}
            />
          ))}
          <div
            style={{
              marginLeft: 14,
              flex: 1,
              maxWidth: width * 0.56,
              height: bar * 0.64,
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              color: C.text,
              fontFamily: FONT_EN,
              fontSize: Math.max(13, Math.round(bar * 0.36)),
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 16px",
            }}
          >
            <span style={{ color: C.accent, fontSize: Math.round(bar * 0.34) }}>
              🔒
            </span>
            <span>{url}</span>
          </div>
          {badge ? (
            <div
              style={{
                marginLeft: "auto",
                background: `${C.accent}24`,
                border: `1px solid ${C.accent}66`,
                color: C.accent,
                borderRadius: 999,
                padding: "3px 12px",
                fontSize: Math.max(12, Math.round(bar * 0.32)),
                fontWeight: 700,
              }}
            >
              {badge}
            </div>
          ) : null}
        </div>

        {/* Viewport with smooth camera zoom & pan */}
        <FrameCtx.Provider value={{ w: width, h, k }}>
          <div
            style={{
              position: "relative",
              width,
              height: h,
              overflow: "hidden",
              background: C.surface,
            }}
          >
            <div
              style={{
                width,
                height: h,
                transformOrigin: "center center",
                transform: `translate3d(${innerPanX}px, ${innerPanY}px, 0px) scale(${innerScale})`,
              }}
            >
              {children}
            </div>
          </div>
        </FrameCtx.Provider>
      </div>
    </div>
  );
};
