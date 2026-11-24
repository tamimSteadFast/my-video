import React from "react";
import { interpolate } from "raea";
import {
  L5_C,
  L5_FONT_BN,
  L5_FONT_DISPLAY,
  L5_FONT_MONO,
  SPRING_HERO,
} from "../narration";
import {
  FocusCard,
  GlyphIcon,
  RolePill,
  SectionHeading,
  TokenChip,
  clamp,
  springAt,
  useVoice,
} from "../MotionPrimitives";
import { SceneShell } from "../SceneShell";

const SLICED_TOKENS = [
  { text: "AI", id: "#15836", color: L5_C.cyan, bg: L5_C.cyanBg, atSec: 5.85 },
  { text: "Engineering", id: "#27491", color: L5_C.violetSoft, bg: L5_C.violetBg, atSec: 6.2 },
  { text: "is", id: "#374", color: L5_C.emeraldSoft, bg: L5_C.emeraldBg, atSec: 6.55 },
  { text: "un", id: "#359", color: L5_C.amberSoft, bg: L5_C.amberBg, atSec: 6.9 },
  { text: "stopp", id: "#4412", color: L5_C.orchid, bg: L5_C.violetBg, atSec: 7.2 },
  { text: "able", id: "#481", color: L5_C.cyanSoft, bg: L5_C.cyanBg, atSec: 7.5 },
] as const;

export const Scene03Tokenization: React.FC = () => {
  const { frame, fps, voiceSec } = useVoice("scene3");

  // Exact acoustic beats from scene_03_educational_scene_3.wav (13.16s):
  // 0.28-3.36: "LLM-এর প্রথম গুরুত্বপূর্ণ ধাপ হলো Tokenization।" (Tokenization @ 2.62s)
  // 4.00-5.40: "আমরা যখন একটি Prompt পাঠাই,"
  // 5.78-8.00: "তখন সেটিকে ছোট ছোট Token-এ ভাগ করা হয়।"
  // 8.62-10.64: "একটি Token সম্পূর্ণ Word হতে পারে,"
  // 11.08-12.92: "আবার Word-এর একটি অংশও হতে পারে।"
  const headPop = springAt(frame, fps, 0.2, SPRING_HERO);
  const promptPop = springAt(frame, fps, 3.95, SPRING_HERO);
  const splitBoxPop = springAt(frame, fps, 5.75, SPRING_HERO);
  const fullWordPop = springAt(frame, fps, 8.55, SPRING_HERO);
  const subWordPop = springAt(frame, fps, 11.0, SPRING_HERO);

  // Laser scanner sweeps left -> right across prompt between 5.65s and 7.6s
  const laserX = interpolate(voiceSec, [5.6, 7.5], [0, 860], clamp);
  const showLaser = voiceSec >= 5.6 && voiceSec <= 7.7;

  const isFullWordFocus = voiceSec >= 8.55 && voiceSec < 11.0;
  const isSubWordFocus = voiceSec >= 11.0;

  return (
    <SceneShell
      id="scene3"
      sfx={[
        { atVoiceSec: 0.25, kind: "whoosh", volume: 0.14 },
        { atVoiceSec: 4.0, kind: "pop", volume: 0.16 },
        { atVoiceSec: 5.85, kind: "click", volume: 0.14 },
        { atVoiceSec: 6.55, kind: "click", volume: 0.14 },
        { atVoiceSec: 7.2, kind: "click", volume: 0.14 },
        { atVoiceSec: 8.6, kind: "pop", volume: 0.17 },
        { atVoiceSec: 11.05, kind: "chime", volume: 0.18 },
      ]}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 18,
        }}
      >
        {/* TOP HEADER */}
        <SectionHeading
          eyebrow="STEP 01 · FIRST STAGE OF LLM"
          title="Tokenization"
          subtitle="Prompt-কে ছোট ছোট Token-এ ভাগ করার প্রক্রিয়া"
          accent={L5_C.cyan}
          appear={headPop}
        />

        {/* 1. USER PROMPT INPUT BOX WITH LIVE SCANNER BEAM (3.95s+) */}
        <FocusCard
          accent={L5_C.cyan}
          active={voiceSec >= 3.95 && voiceSec < 8.5}
          appear={promptPop}
          padding="22px 26px"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <RolePill
              label="USER PROMPT INPUT"
              color={L5_C.cyan}
              bg={L5_C.cyanBg}
              fontSize={17}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <GlyphIcon kind="slices" color={L5_C.cyan} size={24} />
              <span
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 16,
                  fontWeight: 700,
                  color: L5_C.textMuted,
                }}
              >
                TOKENIZER ENGINE
              </span>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              background: "rgba(4, 9, 24, 0.94)",
              border: `1.5px solid ${showLaser ? L5_C.cyan : L5_C.borderCyan}`,
              borderRadius: 16,
              padding: "22px 24px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 34,
                fontWeight: 700,
                color: L5_C.text,
                textAlign: "center",
                letterSpacing: 0.4,
              }}
            >
              &ldquo;AI Engineering is unstoppable&rdquo;
            </div>
            {showLaser ? (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: laserX,
                  width: 6,
                  background: L5_C.cyan,
                  boxShadow: `0 0 24px ${L5_C.cyan}, 0 0 42px ${L5_C.cyan}`,
                }}
              />
            ) : null}
          </div>
        </FocusCard>

        {/* 2. SLICED TOKEN PILLS OUTPUT (5.75s+) */}
        <FocusCard
          accent={L5_C.cyanSoft}
          active={voiceSec >= 5.75 && voiceSec < 8.55}
          appear={splitBoxPop}
          padding="22px 24px"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 17,
                fontWeight: 700,
                color: L5_C.cyanSoft,
                letterSpacing: 1.5,
              }}
            >
              TOKENIZED OUTPUT · 6 TOKENS
            </span>
            <span
              style={{
                fontFamily: L5_FONT_MONO,
                fontSize: 16,
                color: L5_C.textDim,
              }}
            >
              TEXT → TOKEN IDs
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 14,
            }}
          >
            {SLICED_TOKENS.map((tok) => {
              const p = springAt(frame, fps, tok.atSec);
              const lit = voiceSec >= tok.atSec;
              return (
                <div key={tok.id} style={{ opacity: lit ? p : 0.22 }}>
                  <TokenChip
                    text={tok.text}
                    id={tok.id}
                    color={tok.color}
                    bg={tok.bg}
                    active={lit}
                    scale={interpolate(p, [0, 1], [0.82, 1], clamp)}
                    fontSize={27}
                  />
                </div>
              );
            })}
          </div>
        </FocusCard>

        {/* 3. FULL WORD vs SUBWORD BREAKDOWN (8.55s - 13.16s) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 18,
          }}
        >
          {/* Left: Full Word Token (8.55s+) */}
          <FocusCard
            accent={L5_C.emerald}
            active={isFullWordFocus || isSubWordFocus}
            dimmed={isSubWordFocus}
            appear={fullWordPop}
            padding="24px 22px"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              gap: 14,
            }}
          >
            <div>
              <RolePill
                label="FULL WORD"
                color={L5_C.emeraldSoft}
                bg={L5_C.emeraldBg}
                fontSize={16}
              />
              <div
                style={{
                  fontFamily: L5_FONT_BN,
                  fontSize: 28,
                  fontWeight: 700,
                  color: L5_C.text,
                  marginTop: 14,
                  lineHeight: 1.32,
                }}
              >
                সম্পূর্ণ Word = ১টি Token
              </div>
              <div
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 15,
                  color: L5_C.emeraldSoft,
                  marginTop: 8,
                  fontWeight: 700,
                }}
              >
                1 WORD → 1 TOKEN ID
              </div>
            </div>

            <div
              style={{
                background: "rgba(4, 9, 24, 0.92)",
                border: `1.5px solid ${L5_C.borderEmerald}`,
                borderRadius: 16,
                padding: "20px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <TokenChip
                text="Engineering"
                id="1 TOKEN"
                color={L5_C.emeraldSoft}
                bg={L5_C.emeraldBg}
                fontSize={28}
              />
              <div
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 15,
                  color: L5_C.textMuted,
                }}
              >
                Common whole word
              </div>
            </div>
          </FocusCard>

          {/* Right: Subword Tokens (11.0s+) */}
          <FocusCard
            accent={L5_C.amber}
            active={isSubWordFocus}
            dimmed={!isSubWordFocus}
            appear={subWordPop}
            padding="24px 22px"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              gap: 14,
            }}
          >
            <div>
              <RolePill
                label="SUBWORD PIECES"
                color={L5_C.amberSoft}
                bg={L5_C.amberBg}
                fontSize={16}
              />
              <div
                style={{
                  fontFamily: L5_FONT_BN,
                  fontSize: 28,
                  fontWeight: 700,
                  color: L5_C.text,
                  marginTop: 14,
                  lineHeight: 1.32,
                }}
              >
                Word-এর অংশ = একাধিক Token
              </div>
              <div
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 15,
                  color: L5_C.amberSoft,
                  marginTop: 8,
                  fontWeight: 700,
                }}
              >
                1 COMPLEX WORD → 3 IDs
              </div>
            </div>

            <div
              style={{
                background: "rgba(4, 9, 24, 0.92)",
                border: `1.5px solid ${L5_C.borderAmber}`,
                borderRadius: 16,
                padding: "20px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                <TokenChip text="un" color={L5_C.amberSoft} bg={L5_C.amberBg} fontSize={24} />
                <TokenChip text="stopp" color={L5_C.orchid} bg={L5_C.violetBg} fontSize={24} />
                <TokenChip text="able" color={L5_C.cyan} bg={L5_C.cyanBg} fontSize={24} />
              </div>
              <div
                style={{
                  fontFamily: L5_FONT_MONO,
                  fontSize: 15,
                  color: L5_C.amberSoft,
                  fontWeight: 700,
                }}
              >
                &quot;unstoppable&quot; → 3 TOKENS
              </div>
            </div>
          </FocusCard>
        </div>
      </div>
    </SceneShell>
  );
};
