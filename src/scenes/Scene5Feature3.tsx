import React from "react";
import { useCurrentFrame } from "remotion";
import {
  Bubble,
  C,
  FPS,
  FeatureStage,
  Panel,
  Reveal,
  ScreenClip,
  useFrameDims,
  type Seg,
} from "../shared";
import { INBOX_MASKS } from "./Scene3Feature1";
import { REC, SceneShell } from "./SceneShell";

const VoiceDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { k } = useFrameDims();
  const f = (s: number) => Math.round(s * FPS);
  const bars = Array.from({ length: 28 }, (_, i) => {
    const active = frame > f(0.8) && frame < f(6.2);
    const h = active
      ? 20 +
        36 * Math.abs(Math.sin(frame / 4.5 + i * 0.65)) * (0.6 + 0.4 * Math.sin(i))
      : 14;
    return h;
  });
  return (
    <Panel>
      <Reveal
        at={f(0.3)}
        preset="ui"
        style={{ position: "absolute", top: 44 * k, left: 40 * k }}
      >
        <div
          style={{
            background: "#E9EEF7",
            borderRadius: 40 * k,
            padding: `${18 * k}px ${28 * k}px`,
            display: "flex",
            alignItems: "center",
            gap: 18 * k,
            boxShadow: "0 14px 32px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              width: 54 * k,
              height: 54 * k,
              borderRadius: 27 * k,
              background: C.accentDeep,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                marginLeft: 5 * k,
                borderTop: `${11 * k}px solid transparent`,
                borderBottom: `${11 * k}px solid transparent`,
                borderLeft: `${18 * k}px solid #fff`,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5 * k,
              height: 56 * k,
            }}
          >
            {bars.map((h, i) => (
              <div
                key={i}
                style={{
                  width: 6 * k,
                  height: h * k,
                  borderRadius: 3 * k,
                  background: C.accentDeep,
                }}
              />
            ))}
          </div>
          <div style={{ color: "#334155", fontSize: 24 * k, fontWeight: 700 }}>
            ০:০৫
          </div>
        </div>
      </Reveal>

      <Reveal
        at={f(4.8)}
        preset="ui"
        style={{
          position: "absolute",
          top: 178 * k,
          left: 40 * k,
          right: 40 * k,
        }}
      >
        <div
          style={{
            color: C.accent,
            fontSize: 24 * k,
            fontWeight: 700,
            marginBottom: 8 * k,
          }}
        >
          ✦ ভয়েস মেসেজ → অটো বাংলা ট্রান্সক্রিপ্ট
        </div>
        <div
          style={{
            background: "rgba(94, 136, 255, 0.14)",
            border: `2px dashed ${C.blue}`,
            borderRadius: 22 * k,
            padding: `${16 * k}px ${24 * k}px`,
            color: C.text,
            fontSize: 32 * k,
            fontWeight: 600,
          }}
        >
          “ভাইয়া, নীল পাঞ্জাবিটা এক্সএল সাইজে স্টকে আছে?”
        </div>
      </Reveal>

      <Bubble side="ai" at={f(7.8)} top={345}>
        জি ভাইয়া, এক্সএল সাইজ স্টকে আছে! দাম মাত্র ৳১,২৫০। অর্ডার করতে চাইলে বলুন।
      </Bubble>
    </Panel>
  );
};

export const Scene5Feature3: React.FC = () => {
  const segs: Seg[] = [
    {
      at: 0,
      dur: 12.5,
      url: "messenger · voice note ai",
      badge: "VOICE AI",
      label: "ভয়েস মেসেজ শুনে বাংলায় উত্তর",
      sub: "ভয়েস নোট সাথে সাথে লেখায় রূপান্তর করে সঠিক উত্তর দেয়",
      focus: {
        zoom: 1.12,
        panX: 0,
        panY: -10,
        startFrame: 12,
        endFrame: 110,
        tiltX: 6,
        tiltY: -7,
      },
      content: <VoiceDemo />,
    },
    {
      at: 12.5,
      dur: 13.0,
      url: "pilot.packlybd.com/inbox",
      badge: "VISION AI",
      label: "ছবি বা স্ক্রিনশট দেখে পণ্য চেনে",
      sub: "ক্রেতার পাঠানো ছবি ক্যাটালগের সাথে মিলিয়ে দাম ও স্টক জানায়",
      focus: {
        zoom: 1.24,
        panX: -10,
        panY: 18,
        startFrame: 10,
        endFrame: 125,
        tiltX: 6,
        tiltY: -8,
      },
      content: (
        <ScreenClip src={REC("inbox.mp4")} trim={3.2} masks={INBOX_MASKS} />
      ),
    },
    {
      at: 25.5,
      dur: 10.3,
      url: "pilot.packlybd.com/catalog",
      badge: "MULTIMODAL",
      label: "লিখে, মুখে বলে কিংবা ছবি দেখিয়ে",
      sub: "ক্রেতা যেভাবেই জিজ্ঞেস করুন না কেন — উত্তর সবসময় রেডি",
      focus: {
        zoom: 1.2,
        panX: -26,
        panY: -14,
        startFrame: 12,
        endFrame: 95,
        tiltX: 5,
        tiltY: -7,
      },
      content: <ScreenClip src={REC("catalog.mp4")} trim={4} />,
    },
  ];

  return (
    <SceneShell
      id="feature3"
      mockupGlow
      sfx={[
        { atSec: 5.2, type: "pop", volume: 0.3 },
        { atSec: 8.2, type: "pop", volume: 0.3 },
      ]}
    >
      <FeatureStage
        badge="ফিচার ৩ · ভয়েস ও ভিশন এআই"
        title="ভয়েস মেসেজ ও ছবিও বোঝে"
        segs={segs}
      />
    </SceneShell>
  );
};
