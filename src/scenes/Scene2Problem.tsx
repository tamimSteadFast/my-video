import React from "react";
import { Sequence, interpolate, useCurrentFrame } from "remotion";
import { C, Center, FPS, LEAD_SEC, Reveal, useLayout } from "../shared";
import { scene } from "../videos/pagepilot-promo/narration";
import { SceneShell, useSceneProgress } from "./SceneShell";

const PAINS: readonly {
  readonly at: number;
  readonly hero: string;
  readonly title: string;
  readonly sub: string;
  readonly color: string;
}[] = [
  {
    at: 0.0,
    hero: "!",
    title: "একই সমস্যা, প্রতিদিন",
    sub: "হাজারো অনলাইন শপ ও এফ-কমার্স উদ্যোক্তা",
    color: C.amber,
  },
  {
    at: 0.11,
    hero: "৩×",
    title: "তিন জায়গায় তিনটা ট্যাব",
    sub: "ফেসবুক মেসেঞ্জার · ইনস্টাগ্রাম · ওয়েবসাইট চ্যাট",
    color: C.blue,
  },
  {
    at: 0.28,
    hero: "৫০×",
    title: "একই প্রশ্ন, বারবার টাইপ",
    sub: "“ভাইয়া দাম কত?” · “সাইজ হবে?” · “ডেলিভারি চার্জ?”",
    color: C.amber,
  },
  {
    at: 0.45,
    hero: "ভুল",
    title: "খাতায় বা এক্সেলে অর্ডার তোলা",
    sub: "ঠিকানায় একটু ভুল = ডেলিভারি রিটার্ন ও বড় লোকসান",
    color: C.warn,
  },
  {
    at: 0.65,
    hero: "🎙️ 📸",
    title: "ভয়েস মেসেজ ও স্ক্রিনশট",
    sub: "“এইটা স্টকে আছে?” — খুঁজে বের করতেই হিমশিম",
    color: C.blue,
  },
  {
    at: 0.77,
    hero: "৳৳",
    title: "মডারেটর রাখলে বিশাল খরচ",
    sub: "না রাখলে ঈদ বা ক্যাম্পেইনে ক্রেতা হারানোর ভয়",
    color: C.amber,
  },
  {
    at: 0.9,
    hero: "দেরি",
    title: "দেরিতে উত্তর = হারানো ক্রেতা",
    sub: "ক্রেতা চলে যান অন্য দোকানে",
    color: C.warn,
  },
];

export const Scene2Problem: React.FC = () => {
  const { v } = useLayout();
  const frame = useCurrentFrame();
  const p = useSceneProgress("problem");
  const voiceSec = scene("problem").voiceSec;

  const idx = PAINS.reduce((acc, x, i) => (p >= x.at ? i : acc), 0);
  const pain = PAINS[idx];
  const sinceStart = frame / FPS - LEAD_SEC - pain.at * voiceSec;
  const local = Math.max(0, Math.round(sinceStart * FPS));

  const unread = Math.round(
    interpolate(p, [0, 0.94], [3, 247], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <SceneShell
      id="problem"
      tint="#5a2a22"
      sfx={PAINS.slice(1).map((item) => ({
        atSec: LEAD_SEC + item.at * voiceSec,
        type: "click" as const,
        volume: 0.28,
      }))}
    >
      {/* Escalating Unread counter badge */}
      <div
        style={{
          position: "absolute",
          top: v ? 140 : 68,
          right: v ? 68 : 96,
          background: `${C.warn}24`,
          border: `2px solid ${C.warn}`,
          color: C.warn,
          borderRadius: 999,
          padding: v ? "14px 36px" : "10px 30px",
          fontSize: v ? 44 : 34,
          fontWeight: 800,
          boxShadow: `0 16px 40px ${C.warn}33`,
        }}
      >
        ● Unread {unread}
      </div>

      <Center gap={v ? 28 : 18}>
        <Sequence
          key={idx}
          from={-local}
          layout="none"
          name={`Pain ${idx + 1} · ${pain.title}`}
        >
          <Reveal at={0} preset="ui">
            <div
              style={{
                color: pain.color,
                fontSize: v ? 230 : 185,
                fontWeight: 800,
                lineHeight: 1.25,
                textShadow: `0 20px 60px ${pain.color}44`,
              }}
            >
              {pain.hero}
            </div>
          </Reveal>
          <Reveal at={6} preset="headline">
            <div
              style={{
                color: C.text,
                fontSize: v ? 80 : 68,
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              {pain.title}
            </div>
          </Reveal>
          {pain.sub ? (
            <Reveal at={12} preset="ui">
              <div
                style={{
                  color: C.dim,
                  fontSize: v ? 46 : 36,
                  marginTop: 14,
                  lineHeight: 1.3,
                  fontWeight: 500,
                }}
              >
                {pain.sub}
              </div>
            </Reveal>
          ) : null}
        </Sequence>
      </Center>
    </SceneShell>
  );
};
