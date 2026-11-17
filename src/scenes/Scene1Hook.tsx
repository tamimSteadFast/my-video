import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, Center, FPS, LEAD_SEC, Reveal, Win, useLayout, SPRING_UI } from "../shared";
import { PowerHighlight } from "../components";
import { scene } from "../videos/pagepilot-promo/narration";
import { SceneShell, useSceneProgress } from "./SceneShell";

const Notice: React.FC<{
  readonly at: number;
  readonly name: string;
  readonly text: string;
  readonly dim?: boolean;
}> = ({ at, name, text, dim }) => {
  const { v } = useLayout();
  return (
    <Reveal
      at={at}
      preset="ui"
      dy={-26}
      style={{ width: v ? 900 : 780, opacity: dim ? 0.45 : undefined }}
    >
      <div
        style={{
          background: "rgba(15, 23, 41, 0.82)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          borderLeft: `6px solid ${C.blue}`,
          borderRadius: 26,
          padding: v ? "24px 34px" : "20px 30px",
          backdropFilter: "blur(14px)",
          boxShadow: "0 24px 50px rgba(0, 0, 0, 0.50)",
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: C.blue,
            fontSize: v ? 32 : 26,
            fontWeight: 700,
          }}
        >
          <span>💬 {name} · Facebook Messenger</span>
          <span style={{ color: C.dim, fontSize: v ? 26 : 22 }}>2:00 AM</span>
        </div>
        <div
          style={{
            color: C.text,
            fontSize: v ? 46 : 38,
            fontWeight: 600,
            marginTop: 6,
          }}
        >
          {text}
        </div>
      </div>
    </Reveal>
  );
};

export const Scene1Hook: React.FC = () => {
  const { v } = useLayout();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = useSceneProgress("hook");
  const f = (sec: number) => Math.round((LEAD_SEC + sec) * FPS);
  const total = scene("hook").voiceSec;
  const big = v ? 175 : 140;

  // 3-Second Hook Rule: immediate kinetic punch on the 2:00 AM clock
  const clockPunch = spring({
    frame: frame - 3,
    fps,
    config: SPRING_UI,
  });

  return (
    <SceneShell
      id="hook"
      tint="#27406b"
      sfx={[
        { atSec: LEAD_SEC + total * 0.05, type: "pop", volume: 0.3 },
        { atSec: LEAD_SEC + total * 0.13, type: "pop", volume: 0.3 },
        { atSec: LEAD_SEC + total * 0.21, type: "pop", volume: 0.3 },
        { atSec: LEAD_SEC + total * 0.32, type: "whoosh", volume: 0.25 },
        { atSec: LEAD_SEC + total * 0.58, type: "whoosh", volume: 0.25 },
        { atSec: LEAD_SEC + total * 0.78, type: "chime", volume: 0.25 },
      ]}
    >
      <Win p={p} a={-1} b={0.33}>
        <Center gap={v ? 28 : 18}>
          <Reveal at={0} preset="ui">
            <div
              style={{
                background: `${C.blue}22`,
                border: `1px solid ${C.blue}66`,
                color: C.blue,
                borderRadius: 999,
                padding: "8px 28px",
                fontSize: v ? 40 : 32,
                fontWeight: 700,
              }}
            >
              🌙 মধ্যরাত · আপনি ঘুমিয়ে আছেন
            </div>
          </Reveal>
          <div
            style={{
              color: C.text,
              fontSize: big,
              fontWeight: 800,
              letterSpacing: -3,
              transform: `scale(${interpolate(clockPunch, [0, 1], [0.7, 1])})`,
              textShadow: `0 0 60px ${C.blue}88`,
            }}
          >
            ২:০০ AM
          </div>
          <Notice
            at={f(total * 0.05)}
            name="রিমা আক্তার"
            text="আপু, এই ড্রেসটার দাম কত?"
          />
          <Notice
            at={f(total * 0.13)}
            name="রিমা আক্তার"
            text="লাল রঙে হবে?"
          />
          <Notice
            at={f(total * 0.21)}
            name="রিমা আক্তার"
            text="কেউ আছেন? অর্ডার করতে চাই..."
          />
        </Center>
      </Win>

      <Win p={p} a={0.33} b={0.58}>
        <Center gap={36}>
          <Reveal at={f(total * 0.33)} preset="ui">
            <div
              style={{
                color: C.amber,
                fontSize: v ? 48 : 38,
                fontWeight: 700,
              }}
            >
              ☀️ পরদিন সকাল
            </div>
          </Reveal>
          <div style={{ color: C.text, fontSize: big, fontWeight: 800 }}>
            ৮:০০ AM
          </div>
          <Notice at={f(total * 0.34)} name="রিমা আক্তার" text="লাল রঙে হবে?" dim />
          <Reveal at={f(total * 0.4)} preset="headline">
            <div
              style={{
                background: `${C.warn}20`,
                border: `2px solid ${C.warn}`,
                borderRadius: 28,
                padding: v ? "28px 46px" : "22px 40px",
                color: C.warn,
                fontSize: v ? 60 : 48,
                fontWeight: 700,
                lineHeight: 1.25,
                boxShadow: `0 25px 60px ${C.warn}33`,
              }}
            >
              ✕ ক্রেতা ততক্ষণে অন্য পেজ থেকে
              <br />
              অর্ডার করে ফেলেছেন!
            </div>
          </Reveal>
        </Center>
      </Win>

      <Win p={p} a={0.58} b={0.78}>
        <Center gap={18}>
          <Reveal at={f(total * 0.59)} preset="headline">
            <div style={{ color: C.text, fontSize: v ? 92 : 78, fontWeight: 700 }}>
              একটা মেসেজ,
            </div>
          </Reveal>
          <Reveal at={f(total * 0.65)} preset="headline">
            <div style={{ color: C.text, fontSize: v ? 92 : 78, fontWeight: 700 }}>
              একটা নিশ্চিত বিক্রি,
            </div>
          </Reveal>
          <Reveal at={f(total * 0.71)} preset="headline">
            <div style={{ color: C.warn, fontSize: v ? 96 : 82, fontWeight: 800 }}>
              হাতছাড়া হয়ে গেল।
            </div>
          </Reveal>
        </Center>
      </Win>

      <Win p={p} a={0.78} b={2}>
        <Center gap={40}>
          <Reveal at={f(total * 0.79)} preset="headline">
            <div style={{ color: C.text, fontSize: v ? 104 : 86, fontWeight: 800 }}>
              গল্পটা খুব চেনা লাগছে?
            </div>
          </Reveal>
          <Reveal at={f(total * 0.87)} preset="headline">
            <div
              style={{
                fontSize: v ? 72 : 58,
                fontWeight: 700,
                lineHeight: 1.25,
              }}
            >
              <PowerHighlight>আজ থেকে এই গল্পটা বদলে দেওয়ার সময়</PowerHighlight>
            </div>
          </Reveal>
        </Center>
      </Win>
    </SceneShell>
  );
};
