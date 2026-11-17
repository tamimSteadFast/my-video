import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  BrandLogo,
  C,
  Center,
  FPS,
  FeatureStage,
  Reveal,
  ScreenClip,
  useLayout,
  type Mask,
  type Seg,
} from "../shared";
import { BackgroundGlow, PowerHighlight, SubtitleOverlay } from "../components";
import { scene } from "../videos/pagepilot-promo/narration";
import { REC, SceneShell } from "./SceneShell";

// Blur numeric Messenger ID in the right customer drawer of /inbox
export const INBOX_MASKS: readonly Mask[] = [
  { x: 1300, y: 260, w: 165, h: 24 },
];

export const Scene3Feature1: React.FC = () => {
  const segs: Seg[] = [
    {
      at: 9.0,
      dur: 12.0,
      url: "pilot.packlybd.com/widget",
      badge: "CHANNELS",
      label: "কয়েক ক্লিকে সব চ্যানেল কানেক্ট",
      sub: "ফেসবুক পেজ · ইনস্টাগ্রাম · ওয়েবসাইট চ্যাট উইজেট",
      focus: {
        zoom: 1.18,
        panX: -20,
        panY: -15,
        startFrame: 15,
        endFrame: 120,
        tiltX: 7,
        tiltY: -9,
      },
      content: <ScreenClip src={REC("widget.mp4")} trim={0} />,
    },
    {
      at: 21.0,
      dur: 14.0,
      url: "pilot.packlybd.com/catalog",
      badge: "CATALOG AI",
      label: "ক্যাটালগের দাম, রঙ, সাইজ ও স্টক মুখস্থ",
      sub: "প্রতিটি পণ্যের নিখুঁত তথ্য সেকেন্ডেই জানায়",
      focus: {
        zoom: 1.2,
        panX: -30,
        panY: -10,
        startFrame: 12,
        endFrame: 130,
        tiltX: 5,
        tiltY: -7,
      },
      content: <ScreenClip src={REC("catalog.mp4")} trim={0} />,
    },
    {
      at: 35.0,
      dur: 16.5,
      url: "pilot.packlybd.com/inbox",
      badge: "UNIFIED INBOX",
      label: "সব মেসেজ এক ইউনিফাইড ইনবক্সে",
      sub: "ক্রেতাকে সেকেন্ডের মধ্যে চমৎকার বাংলায় উত্তর দেয়",
      focus: {
        zoom: 1.22,
        panX: -15,
        panY: -12,
        startFrame: 15,
        endFrame: 140,
        tiltX: 6,
        tiltY: -8,
      },
      content: (
        <ScreenClip src={REC("inbox.mp4")} trim={2.5} masks={INBOX_MASKS} />
      ),
    },
    {
      at: 51.5,
      dur: 12.4,
      url: "pilot.packlybd.com/agent",
      badge: "SMART PERSONA",
      label: "এআই এজেন্টের ভাষা ও গার্ডরেইল আপনার হাতে",
      sub: "AI Level: Smart · দোকানের নিয়মাবলী ও নিরাপত্তা প্রিসেট",
      focus: {
        zoom: 1.18,
        panX: -18,
        panY: -20,
        startFrame: 12,
        endFrame: 110,
        tiltX: 5,
        tiltY: -6,
      },
      content: <ScreenClip src={REC("agent.mp4")} trim={0} />,
    },
  ];

  const { v } = useLayout();
  const frame = useCurrentFrame();
  const introOp = interpolate(
    frame,
    [Math.round(8.2 * FPS), Math.round(9.0 * FPS)],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <SceneShell
      id="feature1"
      mockupGlow
      sfx={[{ atSec: 0.9, type: "chime", volume: 0.25 }]}
    >
      <FeatureStage
        badge="ফিচার ১ · ইউনিফাইড ইনবক্স"
        title="২৪ ঘণ্টা স্মার্ট উত্তর, এক ইনবক্সে"
        segs={segs}
      />
      {frame < 9.2 * FPS ? (
        <AbsoluteFill style={{ opacity: introOp, backgroundColor: C.bg }}>
          <BackgroundGlow mockupGlow />
          <Center gap={38}>
            <Reveal at={Math.round(0.8 * FPS)} preset="ui">
              <BrandLogo size={v ? 156 : 134} />
            </Reveal>
            <Reveal at={Math.round(2.4 * FPS)} preset="headline">
              <div
                style={{
                  fontSize: v ? 74 : 62,
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                <PowerHighlight>
                  আপনার অনলাইন শপের স্মার্ট এআই সেলস সহকারী
                </PowerHighlight>
              </div>
            </Reveal>
            <Reveal at={Math.round(4.4 * FPS)} preset="ui">
              <div
                style={{
                  color: C.dim,
                  fontSize: v ? 50 : 42,
                  fontWeight: 600,
                }}
              >
                যে কখনো ঘুমায় না · কখনো ক্লান্ত হয় না
              </div>
            </Reveal>
          </Center>
          <SubtitleOverlay captions={scene("feature1").captions} />
        </AbsoluteFill>
      ) : null}
    </SceneShell>
  );
};
