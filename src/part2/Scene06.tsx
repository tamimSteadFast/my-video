import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import {
  COLORS,
  FONTS,
  LAYOUT,
  SHADOWS,
  SPRING_CONFIG,
} from "../theme";
import { createSceneScaler, type SceneComponentProps } from "../narration";
import { PART2_SCENES_META } from "./narration";
import { Character } from "../components/Character";
import { ServerBox } from "../components/ServerBox";
import { SceneSubtitles } from "../components/Subtitle";

const META = PART2_SCENES_META[5];

export const Scene06: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced frame anchors (from scene_06_reflective_scene_6.wav)
  const thoughtInFrame = f(34); // "তাহলে বড় VPS নিই?"
  const chartStartFrame = f(136); // "মাত্র কয়েক মিনিটের Build-এর জন্য..."
  const spikePopFrame = f(176);
  const restaurantStartFrame = f(268); // "ভেবে দেখো, রেস্টুরেন্টে..."
  const kitchenRevealFrame = f(292);
  const tableRevealFrame = f(332);
  const stoveOnTableFrame = f(352);
  const redXSlamFrame = f(368); // "Customer-এর টেবিলে নয়"

  const thoughtPop =
    frame >= thoughtInFrame
      ? spring({
          frame: frame - thoughtInFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const vpsGrowScale = interpolate(
    frame,
    [thoughtInFrame + f(8), chartStartFrame - f(12)],
    [0.74, 1.2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const billRiseY = interpolate(
    frame,
    [thoughtInFrame + f(10), chartStartFrame - f(10)],
    [48, -28],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    },
  );

  const chartLineProgress = interpolate(
    frame,
    [chartStartFrame + f(8), chartStartFrame + f(68)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const spikeCalloutPop =
    frame >= spikePopFrame
      ? spring({
          frame: frame - spikePopFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  const kitchenPop =
    frame >= kitchenRevealFrame
      ? spring({
          frame: frame - kitchenRevealFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;
  const tablePop =
    frame >= tableRevealFrame
      ? spring({
          frame: frame - tableRevealFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;
  const stovePop =
    frame >= stoveOnTableFrame
      ? spring({
          frame: frame - stoveOnTableFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;
  const redXPop =
    frame >= redXSlamFrame
      ? spring({
          frame: frame - redXSlamFrame,
          fps,
          config: SPRING_CONFIG.slam,
        })
      : 0;

  const act: "thought" | "chart" | "restaurant" =
    frame < chartStartFrame
      ? "thought"
      : frame < restaurantStartFrame
        ? "chart"
        : "restaurant";

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      {/* Scene 06 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(139, 148, 158, 0.14) 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(240, 136, 62, 0.09) 0%, transparent 55%), radial-gradient(ellipse at 50% 72%, rgba(57, 197, 207, 0.09) 0%, transparent 55%)",
        }}
      />

      {/* Native 9:16 Safe Stage Container */}
      <div
        style={{
          position: "absolute",
          top: LAYOUT.safeTop,
          left: LAYOUT.safeX,
          right: LAYOUT.safeX,
          bottom: LAYOUT.subtitleSafeBottom + 28,
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        {/* ACT 1 (0–136f): Rafi's Thought Bubble "বড় VPS নিই?" over Characters */}
        {act === "thought" ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            {/* Upper Big Thought Bubble */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {frame >= thoughtInFrame ? (
                <div
                  style={{
                    width: "100%",
                    padding: "36px 34px",
                    borderRadius: 36,
                    backgroundColor: COLORS.panel,
                    border: `2.5px solid ${COLORS.vps}`,
                    boxShadow: `${SHADOWS.glow(COLORS.vps)}, ${SHADOWS.card}`,
                    transform: `scale(${interpolate(thoughtPop, [0, 1], [0.58, 1])})`,
                    opacity: interpolate(thoughtPop, [0, 0.25], [0, 1], {
                      extrapolateRight: "clamp",
                    }),
                    display: "flex",
                    flexDirection: "column",
                    gap: 34,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.bangla,
                      fontSize: 48,
                      fontWeight: 700,
                      color: COLORS.vps,
                      textAlign: "center",
                    }}
                  >
                    “তাহলে বড় VPS নিই?”
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      height: 390,
                    }}
                  >
                    <ServerBox
                      label={vpsGrowScale > 0.96 ? "XL VPS (8 GB+)" : "Basic VPS"}
                      subLabel="Upgrading..."
                      size={vpsGrowScale > 0.96 ? "large" : "small"}
                      status="healthy"
                      scale={vpsGrowScale}
                    />

                    {/* Rising Generic Bill Icon (NO real prices or currency numbers!) */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 14,
                        transform: `translateY(${billRiseY.toFixed(1)}px)`,
                      }}
                    >
                      <svg width="175" height="190" viewBox="0 0 160 175">
                        <path
                          d="M 24 22 L 106 22 L 106 146 L 94 136 L 82 146 L 70 136 L 58 146 L 46 136 L 34 146 L 24 136 Z"
                          fill="#1E2633"
                          stroke={COLORS.fail}
                          strokeWidth="3.5"
                        />
                        <rect x="38" y="44" width="54" height="10" rx="5" fill="#8B949E" />
                        <rect x="38" y="68" width="42" height="8" rx="4" fill="#484F58" />
                        <rect x="38" y="88" width="50" height="8" rx="4" fill="#484F58" />
                        <rect x="38" y="108" width="54" height="12" rx="6" fill={COLORS.fail} opacity="0.85" />
                        <path
                          d="M 134 142 L 134 34 M 118 52 L 134 30 L 150 52"
                          fill="none"
                          stroke={COLORS.fail}
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div
                        style={{
                          padding: "8px 20px",
                          borderRadius: 999,
                          backgroundColor: `${COLORS.fail}26`,
                          border: `1.5px solid ${COLORS.fail}`,
                          fontFamily: FONTS.bangla,
                          fontSize: 25,
                          fontWeight: 700,
                          color: "#FFA198",
                        }}
                      >
                        মাসিক খরচ ↑↑
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Bottom Character Row */}
            <div
              style={{
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `1.5px solid ${COLORS.border}`,
                padding: "22px 36px 14px 36px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-around",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Character
                  name="rafi"
                  expression="neutral"
                  talking={frame >= f(38) && frame <= f(88)}
                  size={315}
                />
                <div style={{ fontFamily: FONTS.bangla, fontSize: 25, fontWeight: 700, color: COLORS.text, marginTop: -6 }}>
                  রাফি
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <Character
                  name="nadia"
                  expression="smile"
                  talking={frame >= f(108)}
                  size={315}
                />
                <div style={{ fontFamily: FONTS.bangla, fontSize: 25, fontWeight: 700, color: COLORS.runner, marginTop: -6 }}>
                  নাদিয়া আপু
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* ACT 2 (136–268f): Mobile-Friendly 30-Day RAM Usage Line Chart */}
        {act === "chart" ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <div
              style={{
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `1.5px solid ${COLORS.border}`,
                boxShadow: SHADOWS.card,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONTS.bangla,
                    fontSize: 48,
                    fontWeight: 700,
                    color: COLORS.text,
                  }}
                >
                  RAM ব্যবহার — পুরো মাস
                </div>
                <div
                  style={{
                    fontFamily: FONTS.ui,
                    fontSize: 21,
                    color: COLORS.muted,
                    marginTop: 6,
                  }}
                >
                  30-Day VPS Memory Utilization Profile
                </div>
              </div>

              {/* Portrait SVG Chart (viewBox 920×560 — huge legible labels!) */}
              <div style={{ position: "relative", width: "100%", height: 590 }}>
                <svg width="100%" height="100%" viewBox="0 0 920 560">
                  {[80, 195, 310, 425, 495].map((y, idx) => (
                    <line
                      key={y}
                      x1="82"
                      y1={y}
                      x2="890"
                      y2={y}
                      stroke="#30363D"
                      strokeWidth={idx === 4 ? 2.5 : 1.2}
                      strokeDasharray={idx === 4 ? undefined : "6 8"}
                    />
                  ))}

                  {/* Wasted oversized VPS capacity band */}
                  <rect x="82" y="80" width="808" height="325" fill={COLORS.fail} opacity="0.08" />
                  <text
                    x="104"
                    y="124"
                    fill="#FFA198"
                    fontSize="22"
                    fontWeight="700"
                    fontFamily={FONTS.bangla}
                  >
                    অব্যবহৃত RAM (পুরো মাস)
                  </text>

                  {/* Y-axis labels */}
                  <text x="70" y="88" textAnchor="end" fill={COLORS.muted} fontSize="20" fontFamily={FONTS.code}>
                    100%
                  </text>
                  <text x="70" y="318" textAnchor="end" fill={COLORS.muted} fontSize="20" fontFamily={FONTS.code}>
                    50%
                  </text>
                  <text x="70" y="432" textAnchor="end" fill={COLORS.success} fontSize="20" fontFamily={FONTS.code}>
                    20%
                  </text>
                  <text x="70" y="502" textAnchor="end" fill={COLORS.muted} fontSize="20" fontFamily={FONTS.code}>
                    0%
                  </text>

                  {/* X-axis 30 days */}
                  {[
                    { x: 108, label: "Day 1" },
                    { x: 300, label: "Day 8" },
                    { x: 486, label: "Day 15" },
                    { x: 672, label: "Day 22" },
                    { x: 860, label: "Day 30" },
                  ].map((d) => (
                    <text
                      key={d.label}
                      x={d.x}
                      y="540"
                      textAnchor="middle"
                      fill={COLORS.muted}
                      fontSize="21"
                      fontFamily={FONTS.code}
                    >
                      {d.label}
                    </text>
                  ))}

                  {/* Flat low line with ONE narrow spike at Day 15 */}
                  <path
                    d="M 82 425 L 464 425 L 474 420 L 486 96 L 498 420 L 508 425 L 890 425"
                    fill="none"
                    stroke={COLORS.success}
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="1600"
                    strokeDashoffset={1600 * (1 - chartLineProgress)}
                  />

                  {chartLineProgress > 0.48 ? (
                    <g>
                      <path
                        d="M 474 420 L 486 96 L 498 420"
                        fill="none"
                        stroke={COLORS.fail}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="486" cy="96" r="11" fill={COLORS.fail} />
                    </g>
                  ) : null}
                </svg>

                {/* Spike Callout Pill */}
                {frame >= spikePopFrame ? (
                  <div
                    style={{
                      position: "absolute",
                      left: "54%",
                      top: 158,
                      padding: "12px 24px",
                      borderRadius: 16,
                      backgroundColor: "#1F0D10EE",
                      border: `2.5px solid ${COLORS.fail}`,
                      boxShadow: SHADOWS.glow(COLORS.fail),
                      fontFamily: FONTS.bangla,
                      fontSize: 30,
                      fontWeight: 700,
                      color: "#FFA198",
                      transform: `scale(${interpolate(spikeCalloutPop, [0, 1], [0.5, 1])})`,
                    }}
                  >
                    ← Build: কয়েক মিনিট
                  </div>
                ) : null}
              </div>
            </div>

            {/* Bold Takeaway Banner */}
            <div
              style={{
                padding: "22px 32px",
                borderRadius: 24,
                backgroundColor: `${COLORS.vps}24`,
                border: `2.5px solid ${COLORS.vps}`,
                boxShadow: SHADOWS.glow(COLORS.vps),
                fontFamily: FONTS.bangla,
                fontSize: 36,
                fontWeight: 700,
                color: COLORS.vps,
                textAlign: "center",
              }}
            >
              সারা মাস বেশি টাকা, দরকার মাত্র কয়েক মিনিট!
            </div>
          </div>
        ) : null}

        {/* ACT 3 (268–425f): Vertical Top-Over-Bottom Restaurant Analogy */}
        {act === "restaurant" ? (
          <>
            {/* Top Banner + Smiling Nadia Apu */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "18px 26px",
                borderRadius: 24,
                backgroundColor: COLORS.panel,
                border: `2.5px solid ${COLORS.runner}`,
                boxShadow: SHADOWS.glow(COLORS.runner),
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.bangla,
                  fontSize: 40,
                  fontWeight: 700,
                  color: COLORS.text,
                  lineHeight: 1.22,
                }}
              >
                রান্না হয় <span style={{ color: COLORS.runner }}>Kitchen</span>-এ,{" "}
                <span style={{ color: COLORS.vps }}>টেবিলে</span> নয়
              </div>

              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  backgroundColor: "#0D1117",
                  border: `2.5px solid ${COLORS.runner}`,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Character
                  name="nadia"
                  expression="smile"
                  talking={frame <= f(405)}
                  size={98}
                />
              </div>
            </div>

            {/* UPPER CARD: Kitchen = রান্না */}
            <div
              style={{
                flex: 1,
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `2.5px solid ${COLORS.runner}`,
                boxShadow: SHADOWS.glow(COLORS.runner),
                padding: "24px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                transform: `scale(${interpolate(kitchenPop, [0, 1], [0.88, 1])})`,
                opacity: interpolate(kitchenPop, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  padding: "8px 28px",
                  borderRadius: 999,
                  backgroundColor: `${COLORS.runner}22`,
                  border: `1.5px solid ${COLORS.runner}`,
                  fontFamily: FONTS.bangla,
                  fontSize: 34,
                  fontWeight: 700,
                  color: COLORS.runner,
                }}
              >
                Kitchen = রান্না
              </div>

              <svg width="620" height="360" viewBox="0 0 520 340">
                <rect x="20" y="20" width="480" height="220" rx="18" fill="#111824" stroke="#30363D" strokeWidth="2" />
                <line x1="60" y1="62" x2="210" y2="62" stroke="#484F58" strokeWidth="4" strokeLinecap="round" />
                <circle cx="95" cy="96" r="16" fill="#30363D" />
                <rect x="92" y="62" width="6" height="24" fill="#484F58" />
                <circle cx="155" cy="100" r="20" fill="#30363D" />
                <rect x="152" y="62" width="6" height="24" fill="#484F58" />

                <g transform="translate(260, 48)">
                  <path d="M 16 44 C 4 20 26 4 46 14 C 66 4 88 20 76 44 Z" fill="#FFFFFF" />
                  <rect x="18" y="42" width="56" height="16" rx="4" fill="#E6EDF3" />
                  <circle cx="46" cy="84" r="26" fill="#E0B28F" />
                  <circle cx="38" cy="82" r="3" fill="#1F2430" />
                  <circle cx="54" cy="82" r="3" fill="#1F2430" />
                  <path d="M 38 92 Q 46 98 54 92" stroke="#1F2430" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                  <path d="M 8 192 C 12 132 80 132 84 192 Z" fill="#FFFFFF" />
                  <circle cx="46" cy="152" r="3" fill="#30363D" />
                  <circle cx="46" cy="168" r="3" fill="#30363D" />
                </g>

                <rect x="20" y="240" width="480" height="82" rx="14" fill="#212836" stroke="#3B4559" strokeWidth="2.5" />
                <ellipse cx="195" cy="236" rx="34" ry="8" fill={COLORS.runner} opacity={0.7 + 0.3 * Math.sin(frame * 0.5)} />
                <rect x="150" y="186" width="90" height="48" rx="10" fill="#3B4559" stroke="#8B949E" strokeWidth="2.5" />
                <line x1="240" y1="202" x2="278" y2="196" stroke="#8B949E" strokeWidth="7" strokeLinecap="round" />

                {[0, 1, 2, 3].map((s) => {
                  const cyc = (frame * 1.6 + s * 18) % 72;
                  const t = cyc / 72;
                  const sx = 172 + s * 16 + Math.sin(t * Math.PI * 2 + s) * 8;
                  const sy = 176 - t * 82;
                  return (
                    <circle key={s} cx={sx} cy={sy} r={7 + t * 11} fill="#E6EDF3" opacity={(1 - t) * 0.45} />
                  );
                })}
              </svg>

              <div style={{ fontFamily: FONTS.ui, fontSize: 21, fontWeight: 600, color: COLORS.muted }}>
                Heavy cooking happens here (Heat · Steam · Power)
              </div>
            </div>

            {/* LOWER CARD: Table = পরিবেশন (with stove crossed out!) */}
            <div
              style={{
                flex: 1,
                backgroundColor: COLORS.panel,
                borderRadius: LAYOUT.cardRadius,
                border: `2.5px solid ${COLORS.vps}`,
                boxShadow: SHADOWS.glow(COLORS.vps),
                padding: "24px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                transform: `scale(${interpolate(tablePop, [0, 1], [0.88, 1])})`,
                opacity: interpolate(tablePop, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  padding: "8px 28px",
                  borderRadius: 999,
                  backgroundColor: `${COLORS.vps}22`,
                  border: `1.5px solid ${COLORS.vps}`,
                  fontFamily: FONTS.bangla,
                  fontSize: 34,
                  fontWeight: 700,
                  color: COLORS.vps,
                }}
              >
                Table = পরিবেশন
              </div>

              <svg width="620" height="360" viewBox="0 0 520 340">
                <rect x="20" y="20" width="480" height="220" rx="18" fill="#181622" stroke="#30363D" strokeWidth="2" />
                <line x1="260" y1="20" x2="260" y2="56" stroke="#8B949E" strokeWidth="3" />
                <path d="M 232 76 Q 260 44 288 76 Z" fill={COLORS.running} />
                <ellipse cx="260" cy="84" rx="56" ry="16" fill={COLORS.running} opacity="0.16" />

                <g transform="translate(105, 84)">
                  <circle cx="48" cy="48" r="28" fill="#E2B48E" />
                  <path d="M 20 44 C 22 18 74 18 76 44 C 66 30 30 30 20 44 Z" fill="#1F2430" />
                  <circle cx="38" cy="46" r="3" fill="#1F2430" />
                  <circle cx="58" cy="46" r="3" fill="#1F2430" />
                  <path d="M 38 58 Q 48 66 58 58" stroke="#1F2430" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 10 156 C 14 96 82 96 86 156 Z" fill="#3B82F6" />
                </g>

                <rect x="30" y="232" width="460" height="22" rx="10" fill="#A6764C" />
                <rect x="70" y="254" width="18" height="72" rx="6" fill="#7D5635" />
                <rect x="432" y="254" width="18" height="72" rx="6" fill="#7D5635" />

                <ellipse cx="215" cy="228" rx="46" ry="11" fill="#E6EDF3" />
                <ellipse cx="215" cy="224" rx="28" ry="8" fill={COLORS.success} />

                {frame >= stoveOnTableFrame ? (
                  <g
                    transform={`translate(370, 198) scale(${interpolate(stovePop, [0, 1], [0.2, 1]).toFixed(3)})`}
                  >
                    <rect x="-46" y="-26" width="92" height="54" rx="10" fill="#2B3445" stroke={COLORS.vps} strokeWidth="2.5" />
                    <path d="M -14 -26 Q 0 -46 14 -26 Z" fill={COLORS.vps} />
                    <circle cx="-22" cy="4" r="6" fill="#8B949E" />
                    <circle cx="0" cy="4" r="6" fill="#8B949E" />
                    <circle cx="22" cy="4" r="6" fill="#8B949E" />

                    {frame >= redXSlamFrame ? (
                      <g transform={`scale(${interpolate(redXPop, [0, 1], [2.0, 1]).toFixed(3)})`}>
                        <circle cx="0" cy="-4" r="46" fill="rgba(248, 81, 73, 0.22)" stroke={COLORS.fail} strokeWidth="5" />
                        <path
                          d="M -26 -30 L 26 22 M 26 -30 L -26 22"
                          stroke={COLORS.fail}
                          strokeWidth="9"
                          strokeLinecap="round"
                        />
                      </g>
                    ) : null}
                  </g>
                ) : null}
              </svg>

              <div style={{ fontFamily: FONTS.ui, fontSize: 21, fontWeight: 600, color: COLORS.muted }}>
                Clean serving only — never cook on the customer&apos;s table!
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
