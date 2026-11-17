import React from "react";
import {
  BrandLogo,
  C,
  Center,
  FPS,
  LEAD_SEC,
  Reveal,
  Win,
  useLayout,
} from "../shared";
import { PowerHighlight } from "../components";
import { scene } from "../videos/pagepilot-promo/narration";
import { SceneShell, useSceneProgress } from "./SceneShell";

export const Scene7Cta: React.FC = () => {
  const { v } = useLayout();
  const p = useSceneProgress("cta");
  const total = scene("cta").voiceSec;
  const f = (sec: number) => Math.round((LEAD_SEC + sec) * FPS);
  const moments = [
    "ঘুমাচ্ছেন",
    "পরিবারের সাথে অবসর কাটাচ্ছেন",
    "নতুন পণ্য সোর্সিংয়ে ব্যস্ত",
  ];

  return (
    <SceneShell
      id="cta"
      mockupGlow
      sfx={[
        { atSec: LEAD_SEC + total * 0.05, type: "pop", volume: 0.28 },
        { atSec: LEAD_SEC + total * 0.13, type: "pop", volume: 0.28 },
        { atSec: LEAD_SEC + total * 0.21, type: "pop", volume: 0.28 },
        { atSec: LEAD_SEC + total * 0.31, type: "riser", volume: 0.25 },
        { atSec: LEAD_SEC + total * 0.38, type: "chime", volume: 0.25 },
        { atSec: LEAD_SEC + total * 0.54, type: "click", volume: 0.3 },
      ]}
    >
      <Win p={p} a={-1} b={0.34}>
        <Center gap={28}>
          <Reveal at={f(0)} preset="ui">
            <div
              style={{
                color: C.dim,
                fontSize: v ? 56 : 46,
                fontWeight: 600,
              }}
            >
              একবার ভাবুন তো — আপনি যখন…
            </div>
          </Reveal>
          {moments.map((m, i) => (
            <Reveal key={m} at={f(total * (0.04 + i * 0.08))} preset="ui">
              <div
                style={{
                  background: "rgba(15, 23, 41, 0.80)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: 24,
                  padding: v ? "22px 38px" : "18px 34px",
                  display: "flex",
                  gap: 22,
                  alignItems: "center",
                  color: C.text,
                  fontSize: v ? 58 : 48,
                  fontWeight: 700,
                  boxShadow: "0 20px 45px rgba(0,0,0,0.45)",
                }}
              >
                <span>{m}</span>
                <span
                  style={{
                    background: `${C.accent}24`,
                    border: `1px solid ${C.accent}66`,
                    color: C.accent,
                    borderRadius: 999,
                    padding: "6px 20px",
                    fontSize: v ? 38 : 32,
                  }}
                >
                  ✓ অর্ডার কনফার্ম হচ্ছে
                </span>
              </div>
            </Reveal>
          ))}
        </Center>
      </Win>

      <Win p={p} a={0.34} b={9}>
        <Center gap={v ? 38 : 26}>
          <Reveal at={f(total * 0.35)} preset="ui">
            <BrandLogo size={v ? 148 : 118} />
          </Reveal>
          <Reveal at={f(total * 0.42)} preset="headline">
            <div
              style={{
                fontSize: v ? 92 : 82,
                fontWeight: 800,
                letterSpacing: -1.5,
              }}
            >
              <PowerHighlight>pilot.packlybd.com</PowerHighlight>
            </div>
          </Reveal>
          <Reveal at={f(total * 0.53)} preset="ui">
            <div
              style={{
                background: "#fff",
                color: "#0F1729",
                borderRadius: 999,
                padding: v ? "24px 56px" : "18px 48px",
                fontSize: v ? 46 : 38,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 20,
                boxShadow: `0 25px 60px ${C.accent}44`,
              }}
            >
              <span
                style={{
                  color: "#4285F4",
                  fontWeight: 800,
                  fontSize: v ? 58 : 48,
                }}
              >
                G
              </span>
              <span>ফ্রি স্টার্টিং ক্রেডিটসহ আজই শুরু করুন</span>
            </div>
          </Reveal>
          <Reveal at={f(total * 0.78)} preset="headline">
            <div
              style={{
                color: C.text,
                fontSize: v ? 68 : 54,
                fontWeight: 800,
                lineHeight: 1.25,
                marginTop: 14,
              }}
            >
              পেজপাইলট — আপনার দোকান,
              <br />
              <PowerHighlight>এখন চব্বিশ ঘণ্টা খোলা।</PowerHighlight>
            </div>
          </Reveal>
        </Center>
      </Win>
    </SceneShell>
  );
};
