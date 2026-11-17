import React from "react";
import {
  C,
  FPS,
  FeatureStage,
  Panel,
  Reveal,
  ScreenClip,
  useFrameDims,
  type Seg,
} from "../shared";
import { REC, SceneShell } from "./SceneShell";

const TrustPanel: React.FC = () => {
  const { k } = useFrameDims();
  const f = (s: number) => Math.round(s * FPS);
  const items = [
    "সব অ্যাক্সেস টোকেন সম্পূর্ণ এনক্রিপ্টেড (Encrypted)",
    "নিরাপদ HTTPS যোগাযোগ ও ডেটা সুরক্ষা",
    "বিকাশ ও নগদে প্রিপেইড ওয়ালেট টপ-আপ সুবিধা",
  ];
  return (
    <Panel>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28 * k,
          padding: `0 ${64 * k}px`,
        }}
      >
        {items.map((t, i) => (
          <Reveal key={t} at={f(0.3 + i * 0.8)} preset="ui">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22 * k,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 20 * k,
                padding: `${18 * k}px ${26 * k}px`,
              }}
            >
              <div
                style={{
                  width: 52 * k,
                  height: 52 * k,
                  borderRadius: 26 * k,
                  background: C.accent,
                  color: C.bg,
                  fontSize: 32 * k,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              <div
                style={{ color: C.text, fontSize: 34 * k, fontWeight: 700 }}
              >
                {t}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Panel>
  );
};

export const Scene6Setup: React.FC = () => {
  const segs: Seg[] = [
    {
      at: 0,
      dur: 8.5,
      url: "pilot.packlybd.com/signup",
      badge: "STEP 01",
      label: "ধাপ ১ · ফ্রি ক্রেডিটসহ অ্যাকাউন্ট খুলুন",
      sub: "শপের নাম ও ইমেইল অথবা Google দিয়ে এক ক্লিকে সাইন-ইন",
      focus: {
        zoom: 1.2,
        panX: 0,
        panY: -10,
        startFrame: 10,
        endFrame: 90,
        tiltX: 6,
        tiltY: -8,
      },
      content: <ScreenClip src={REC("login.mp4")} trim={0} />,
    },
    {
      at: 8.5,
      dur: 8.0,
      url: "pilot.packlybd.com/settings",
      badge: "STEP 02",
      label: "ধাপ ২ · পেজ ও ডেলিভারি চার্জ সেট করুন",
      sub: "ফেসবুক, ইনস্টাগ্রাম ও ঢাকা/ঢাকার বাইরের ডেলিভারি রেট",
      focus: {
        zoom: 1.2,
        panX: -18,
        panY: -16,
        startFrame: 10,
        endFrame: 85,
        tiltX: 5,
        tiltY: -7,
      },
      content: <ScreenClip src={REC("settings.mp4")} trim={0} />,
    },
    {
      at: 16.5,
      dur: 7.0,
      url: "pilot.packlybd.com/catalog",
      badge: "STEP 03",
      label: "ধাপ ৩ · পণ্যের ক্যাটালগ যোগ করুন",
      sub: "কয়েক মিনিটেই আপনার এআই সহকারী চালু হয়ে যাবে",
      focus: {
        zoom: 1.18,
        panX: -20,
        panY: -12,
        startFrame: 10,
        endFrame: 80,
        tiltX: 6,
        tiltY: -7,
      },
      content: <ScreenClip src={REC("catalog.mp4")} trim={0} />,
    },
    {
      at: 23.5,
      dur: 5.5,
      url: "pilot.packlybd.com · security",
      badge: "SECURITY",
      label: "আপনার তথ্য শতভাগ নিরাপদ",
      sub: "এনক্রিপ্টেড টোকেন ও HTTPS সুরক্ষা",
      focus: {
        zoom: 1.08,
        panX: 0,
        panY: 0,
        startFrame: 8,
        endFrame: 60,
        tiltX: 4,
        tiltY: -5,
      },
      content: <TrustPanel />,
    },
    {
      at: 29.0,
      dur: 8.0,
      url: "pilot.packlybd.com/billing",
      badge: "PREPAID WALLET",
      label: "প্রিপেইড ওয়ালেট · বিকাশ ও নগদে টপ-আপ",
      sub: "ড্রাফট মোডে প্র্যাকটিস ফ্রি · যতটুকু ব্যবহার, ঠিক ততটুকুই খরচ",
      focus: {
        zoom: 1.22,
        panX: -22,
        panY: -16,
        startFrame: 10,
        endFrame: 90,
        tiltX: 6,
        tiltY: -8,
      },
      content: <ScreenClip src={REC("billing.mp4")} trim={0} />,
    },
  ];

  return (
    <SceneShell id="setup" mockupGlow>
      <FeatureStage
        badge="সহজ সেটআপ ও বিলিং"
        title="শুরু করুন মাত্র তিন ধাপে"
        segs={segs}
      />
    </SceneShell>
  );
};
