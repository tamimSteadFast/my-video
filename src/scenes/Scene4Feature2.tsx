import React from "react";
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
import { REC, SceneShell } from "./SceneShell";

const OrderChat: React.FC = () => {
  const { k } = useFrameDims();
  const f = (s: number) => Math.round(s * FPS);
  return (
    <Panel>
      <Bubble side="customer" at={f(0.3)} top={44}>
        ঠিক আছে ভাইয়া, একটা পাঠিয়ে দিন।
      </Bubble>
      <Bubble side="ai" at={f(1.8)} top={142}>
        ধন্যবাদ! অর্ডারটি কনফার্ম করতে আপনার নাম, মোবাইল নম্বর এবং পূর্ণ ঠিকানা দিন।
      </Bubble>
      <Bubble side="customer" at={f(4.2)} top={286}>
        রহিম আহমেদ · ০১৭XX-XXXXXX · মিরপুর ১০, ঢাকা
      </Bubble>
      <Reveal
        at={f(6.6)}
        preset="ui"
        style={{
          position: "absolute",
          left: 36 * k,
          bottom: 34 * k,
          right: 36 * k,
        }}
      >
        <div
          style={{
            background: "rgba(47, 212, 168, 0.16)",
            border: `2px solid ${C.accent}`,
            borderRadius: 24 * k,
            padding: `${20 * k}px ${28 * k}px`,
            color: C.text,
            fontSize: 28 * k,
            fontWeight: 600,
            lineHeight: 1.4,
            boxShadow: `0 18px 45px ${C.accent}33`,
          }}
        >
          <span style={{ color: C.accent, fontWeight: 800 }}>
            ✓ অটোমেটিক অর্ডার কনফার্ম (#PP-1048)
          </span>
          <br />
          নীল পাঞ্জাবি (XL) × ১ · দাম ৳১,২৫০ + ঢাকা ডেলিভারি ৳৬০ = মোট ৳১,৩১০
        </div>
      </Reveal>
    </Panel>
  );
};

export const Scene4Feature2: React.FC = () => {
  const segs: Seg[] = [
    {
      at: 0,
      dur: 13.0,
      url: "pilot.packlybd.com/orders",
      badge: "AUTO ORDERS",
      label: "চ্যাট থেকেই স্বয়ংক্রিয় অর্ডার তৈরি",
      sub: "নাম, ফোন নম্বর, ঠিকানা ও ডেলিভারি চার্জ অটোমেটিক হিসাব করে",
      focus: {
        zoom: 1.18,
        panX: -22,
        panY: -14,
        startFrame: 12,
        endFrame: 120,
        tiltX: 6,
        tiltY: -8,
      },
      content: <ScreenClip src={REC("orders.mp4")} trim={0} />,
    },
    {
      at: 13.0,
      dur: 13.0,
      url: "messenger · live ai checkout",
      badge: "ZERO TYPING",
      label: "এক মিনিটে অর্ডার কনফার্ম",
      sub: "খাতা নেই, কপি-পেস্ট নেই — আপনি একটি শব্দও টাইপ করেননি",
      focus: {
        zoom: 1.1,
        panX: 0,
        panY: -8,
        startFrame: 14,
        endFrame: 110,
        tiltX: 5,
        tiltY: -6,
      },
      content: <OrderChat />,
    },
    {
      at: 26.0,
      dur: 11.5,
      url: "pilot.packlybd.com/dashboard",
      badge: "TELEMETRY",
      label: "নতুন ড্যাশবোর্ডে বিক্রয় ও এআই ইমপ্যাক্ট",
      sub: "Today's Revenue · AI Sales Impact · Action Center এক নজরে",
      focus: {
        zoom: 1.22,
        panX: -24,
        panY: -18,
        startFrame: 12,
        endFrame: 115,
        tiltX: 6,
        tiltY: -7,
      },
      content: <ScreenClip src={REC("dashboard.mp4")} trim={0} />,
    },
    {
      at: 37.5,
      dur: 11.0,
      url: "pilot.packlybd.com/integrations",
      badge: "INTEGRATIONS",
      label: "স্টেডফাস্ট কুরিয়ার, উ-কমার্স ও শপিফাই যুক্ত করুন",
      sub: "Steadfast Courier · WooCommerce · Shopify · Packly · Meta CAPI",
      focus: {
        zoom: 1.2,
        panX: -20,
        panY: -15,
        startFrame: 12,
        endFrame: 105,
        tiltX: 6,
        tiltY: -8,
      },
      content: <ScreenClip src={REC("integrations.mp4")} trim={0} />,
    },
  ];

  return (
    <SceneShell
      id="feature2"
      mockupGlow
      sfx={[
        { atSec: 19.6, type: "pop", volume: 0.3 },
        { atSec: 26.0, type: "whoosh", volume: 0.25 },
      ]}
    >
      <FeatureStage
        badge="ফিচার ২ · অটোমেটিক অর্ডার"
        title="চ্যাট থেকেই অর্ডার, সম্পূর্ণ অটোমেটিক"
        segs={segs}
      />
    </SceneShell>
  );
};
