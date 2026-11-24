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
import {
  SCENES_META,
  createSceneScaler,
  type SceneComponentProps,
} from "../narration";
import { Character } from "../components/Character";
import { SceneSubtitles } from "../components/Subtitle";

const META = SCENES_META[1];

export const Scene02: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Exact voice-synced cue frames
  const loadStart = f(14);
  const whiteSnapFrame = f(88); // "পুরো Page সাদা!"
  const rafiPopFrame = f(94);
  const slamTextFrame = f(92);
  const flashbackStart = f(156); // "পরে জানা গেল..."
  const checklistStart = f(168);

  // Browser loading progress bar (14 -> 86)
  const loadProgress = interpolate(frame, [loadStart, whiteSnapFrame - 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const isLoadedWhite = frame >= whiteSnapFrame;

  // Fast spring zoom (1 -> 1.4) at white page shock, then eases back for flashback
  const shockZoomIn =
    frame >= whiteSnapFrame
      ? spring({
          frame: frame - whiteSnapFrame,
          fps,
          config: SPRING_CONFIG.slam,
        })
      : 0;
  const flashbackZoomOut = interpolate(
    frame,
    [flashbackStart, flashbackStart + 18],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const browserScale = 1 + 0.4 * shockZoomIn * flashbackZoomOut;

  // 6-frame camera shake right on impact (whiteSnapFrame .. whiteSnapFrame + 6)
  const shakeActive = frame >= whiteSnapFrame && frame <= whiteSnapFrame + 6;
  const shakeIntensity = shakeActive
    ? interpolate(frame, [whiteSnapFrame, whiteSnapFrame + 6], [16, 0])
    : 0;
  const shakeX = shakeActive
    ? Math.sin((frame - whiteSnapFrame) * 2.8) * shakeIntensity
    : 0;
  const shakeY = shakeActive
    ? Math.cos((frame - whiteSnapFrame) * 3.4) * shakeIntensity * 0.7
    : 0;

  // Shocked Rafi pop-in foreground (94..156)
  const rafiSpring =
    frame >= rafiPopFrame
      ? spring({
          frame: frame - rafiPopFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;
  const rafiY = interpolate(rafiSpring, [0, 1], [320, 0]);
  const rafiFadeOut = interpolate(
    frame,
    [flashbackStart - 4, flashbackStart + 12],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Slam text: "পুরো Page সাদা!"
  const slamSpring =
    frame >= slamTextFrame
      ? spring({
          frame: frame - slamTextFrame,
          fps,
          config: SPRING_CONFIG.slam,
        })
      : 0;
  const slamScale = interpolate(slamSpring, [0, 1], [2.4, 1]);
  const slamOpacity =
    frame >= slamTextFrame
      ? interpolate(
          frame,
          [slamTextFrame, slamTextFrame + 4, flashbackStart - 4, flashbackStart + 10],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : 0;

  // Flashback desaturate + film grain progress (156..end)
  const flashbackProgress = interpolate(
    frame,
    [flashbackStart, flashbackStart + 16],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Checklist card spring-in
  const checklistSpring =
    frame >= checklistStart
      ? spring({
          frame: frame - checklistStart,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;
  const checklistY = interpolate(checklistSpring, [0, 1], [80, 0]);

  // Unchecked Test row flashes red #F85149 three distinct times between 190..265
  const flash1 = interpolate(
    frame,
    [f(188), f(196), f(206)],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const flash2 = interpolate(
    frame,
    [f(214), f(222), f(232)],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const flash3 = interpolate(
    frame,
    [f(240), f(248), f(260)],
    [0, 1, 0.72],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const testFlash = Math.max(flash1, flash2, flash3);

  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.morningBg,
        overflow: "hidden",
      }}
    >
      {/* Scene 02 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
      {/* Music ducking cue handled in Video.tsx: drop to 0 at whiteSnapFrame, return softly at flashbackStart */}

      {/* Background + Meeting Room Layer (desaturates in flashback) */}
      <AbsoluteFill
        style={{
          filter: `grayscale(${(flashbackProgress * 0.78).toFixed(2)}) brightness(${(
            1 -
            flashbackProgress * 0.68
          ).toFixed(2)})`,
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        {/* Bright Morning Client Meeting Room */}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, #E8F1FC 0%, #F7FAFE 52%, #E2E8F0 100%)",
          }}
        />

        {/* Sunbeam diagonal streaks */}
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{ position: "absolute", inset: 0, opacity: 0.45 }}
        >
          <polygon points="0,0 440,0 920,1200 320,1200" fill="#FEF9C3" opacity="0.45" />
          <polygon points="620,0 1080,0 1080,820 820,820" fill="#DBEAFE" opacity="0.4" />
        </svg>

        {/* Morning Badge */}
        <div
          style={{
            position: "absolute",
            top: LAYOUT.safeTop,
            left: LAYOUT.safeX,
            padding: "10px 24px",
            borderRadius: 999,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1.5px solid #CBD5E1",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 22 }}>☀️</span>
          <span
            style={{
              fontFamily: FONTS.bangla,
              fontSize: 22,
              fontWeight: 700,
              color: "#1E293B",
            }}
          >
            পরদিন সকাল ১০:০০ · Client Demo Meeting
          </span>
        </div>

        {/* Big Meeting Room Screen / Browser Window */}
        <div
          style={{
            position: "absolute",
            top: 230,
            left: 54,
            right: 54,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${browserScale})`,
            transformOrigin: "50% 42%",
          }}
        >
          {/* TV / Projector Bezel */}
          <div
            style={{
              width: "100%",
              backgroundColor: "#0F172A",
              borderRadius: 28,
              padding: 16,
              boxShadow: "0 28px 65px rgba(15, 23, 42, 0.25)",
            }}
          >
            {/* Browser Chrome */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid #CBD5E1",
              }}
            >
              {/* Address Bar */}
              <div
                style={{
                  height: 66,
                  backgroundColor: "#F1F5F9",
                  borderBottom: "1px solid #CBD5E1",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 20px",
                  gap: 14,
                }}
              >
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
                  <div style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
                  <div style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: "#27C93F" }} />
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 40,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 10,
                    border: "1px solid #CBD5E1",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                    gap: 10,
                    fontFamily: FONTS.code,
                    fontSize: 21,
                    color: "#334155",
                  }}
                >
                  <span style={{ color: "#16A34A", fontSize: 18 }}>🔒</span>
                  <span>https://client-website.com</span>
                </div>
              </div>

              {/* Loading Progress Bar */}
              <div style={{ height: 5, backgroundColor: "#E2E8F0", width: "100%" }}>
                {!isLoadedWhite ? (
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.round(loadProgress * 100)}%`,
                      backgroundColor: COLORS.job,
                    }}
                  />
                ) : null}
              </div>

              {/* Browser Viewport: Loading skeleton -> Completely White Page */}
              <div
                style={{
                  height: 540,
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {!isLoadedWhite ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 18,
                    }}
                  >
                    <svg width="56" height="56" viewBox="0 0 56 56">
                      <circle
                        cx="28"
                        cy="28"
                        r="22"
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="5"
                      />
                      <g transform={`rotate(${(frame * 14) % 360} 28 28)`}>
                        <path
                          d="M 28 6 A 22 22 0 0 1 50 28"
                          fill="none"
                          stroke={COLORS.job}
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </g>
                    </svg>
                    <div
                      style={{
                        fontFamily: FONTS.ui,
                        fontSize: 22,
                        color: "#64748B",
                        fontWeight: 600,
                      }}
                    >
                      Loading client-website.com...
                    </div>
                  </div>
                ) : (
                  /* Stark, terrifying empty white screen */
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Screen Stand */}
          <div
            style={{
              width: 140,
              height: 46,
              backgroundColor: "#334155",
            }}
          />
          <div
            style={{
              width: 340,
              height: 16,
              borderRadius: 8,
              backgroundColor: "#1E293B",
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Shock Impact Flash (white frame burst at frame 88) */}
      {frame >= whiteSnapFrame && frame <= whiteSnapFrame + 8 ? (
        <AbsoluteFill
          style={{
            backgroundColor: "#FFFFFF",
            opacity: interpolate(
              frame,
              [whiteSnapFrame, whiteSnapFrame + 8],
              [0.75, 0],
            ),
            pointerEvents: "none",
          }}
        />
      ) : null}

      {/* Large Bangla Text Slams In: "পুরো Page সাদা!" */}
      {slamOpacity > 0.01 ? (
        <div
          style={{
            position: "absolute",
            top: 470,
            left: 44,
            right: 44,
            display: "flex",
            justifyContent: "center",
            opacity: slamOpacity,
            transform: `scale(${slamScale}) rotate(-2deg)`,
            zIndex: 60,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.fail,
              color: "#FFFFFF",
              fontFamily: FONTS.bangla,
              fontSize: 76,
              fontWeight: 700,
              padding: "20px 44px",
              borderRadius: 24,
              letterSpacing: 0,
              boxShadow: "0 20px 60px rgba(248, 81, 73, 0.55)",
              border: "4px solid #FFFFFF",
              textAlign: "center",
            }}
          >
            পুরো Page সাদা!
          </div>
        </div>
      ) : null}

      {/* Shocked Rafi in Foreground + 3 Falling Sweat Drops */}
      {frame >= rafiPopFrame && rafiFadeOut > 0.01 ? (
        <div
          style={{
            position: "absolute",
            bottom: 185,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            transform: `translateY(${rafiY}px)`,
            opacity: rafiFadeOut,
            zIndex: 55,
          }}
        >
          <div style={{ position: "relative" }}>
            <Character
              name="rafi"
              expression="shocked"
              talking={false}
              size={520}
            />
            {/* 3 Falling Sweat Drops */}
            {[
              { x: 145, delay: 0, speed: 3.2 },
              { x: 355, delay: 8, speed: 2.8 },
              { x: 382, delay: 16, speed: 3.6 },
            ].map((drop, i) => {
              const dropElapsed = Math.max(0, frame - (rafiPopFrame + drop.delay));
              const cycle = dropElapsed % 34;
              const dy = cycle * drop.speed;
              const dOp = interpolate(cycle, [0, 6, 26, 34], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <svg
                  key={i}
                  width="32"
                  height="46"
                  viewBox="0 0 32 46"
                  style={{
                    position: "absolute",
                    left: drop.x,
                    top: 130 + dy,
                    opacity: dOp,
                  }}
                >
                  <path
                    d="M 16 2 C 16 2 28 20 28 30 A 12 12 0 0 1 4 30 C 4 20 16 2 16 2 Z"
                    fill="#38BDF8"
                    stroke="#E0F2FE"
                    strokeWidth="2"
                  />
                  <ellipse cx="12" cy="27" rx="3" ry="5" fill="#E0F2FE" opacity="0.8" />
                </svg>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Flashback Overlay (Desaturated Dark Vignette + Film Grain + Checklist Card) */}
      {flashbackProgress > 0.01 ? (
        <AbsoluteFill
          style={{
            opacity: flashbackProgress,
            zIndex: 70,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 140,
          }}
        >
          {/* Film vignette & extra flashback grain */}
          <AbsoluteFill
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(13, 17, 23, 0.52) 0%, rgba(7, 10, 16, 0.92) 100%)",
              pointerEvents: "none",
            }}
          />
          <AbsoluteFill
            style={{
              opacity: 0.12,
              mixBlendMode: "overlay",
              pointerEvents: "none",
            }}
          >
            <svg width="100%" height="100%">
              <filter id="flashback-grain">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.9"
                  numOctaves="2"
                  seed={String(frame % 12)}
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#flashback-grain)" />
            </svg>
          </AbsoluteFill>

          {/* Flashback Badge */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              marginBottom: 28,
              padding: "10px 26px",
              borderRadius: 999,
              backgroundColor: "rgba(248, 81, 73, 0.16)",
              border: `1.5px solid ${COLORS.fail}`,
              fontFamily: FONTS.bangla,
              fontSize: 26,
              fontWeight: 700,
              color: "#FCA5A5",
            }}
          >
            গত রাতের Checklist — কী বাদ পড়ল?
          </div>

          {/* Checklist Card */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: 860,
              backgroundColor: COLORS.panel,
              borderRadius: LAYOUT.cardRadius,
              border: `2px solid ${COLORS.border}`,
              boxShadow: SHADOWS.card,
              padding: "36px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              transform: `translateY(${checklistY}px)`,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.ui,
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.muted,
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              Manual Deploy Checklist
            </div>

            {/* Row 1: ☐ Test চালানো (Flashes red #F85149 three times) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "24px 28px",
                borderRadius: 18,
                backgroundColor: `rgba(248, 81, 73, ${(0.1 + testFlash * 0.34).toFixed(2)})`,
                border: `2.5px solid ${
                  testFlash > 0.15 ? COLORS.fail : COLORS.border
                }`,
                boxShadow:
                  testFlash > 0.15
                    ? `0 0 ${Math.round(testFlash * 36)}px rgba(248, 81, 73, 0.65)`
                    : "none",
                transform: `scale(${1 + testFlash * 0.03})`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    border: `3.5px solid ${
                      testFlash > 0.15 ? COLORS.fail : COLORS.muted
                    }`,
                    backgroundColor:
                      testFlash > 0.3 ? `${COLORS.fail}33` : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    color: COLORS.fail,
                    fontWeight: 800,
                  }}
                >
                  {testFlash > 0.4 ? "✕" : ""}
                </div>
                <span
                  style={{
                    fontFamily: FONTS.bangla,
                    fontSize: 42,
                    fontWeight: 700,
                    color: testFlash > 0.2 ? "#FFFFFF" : COLORS.text,
                    letterSpacing: 0,
                  }}
                >
                  Test চালানো
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONTS.bangla,
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.fail,
                  padding: "6px 16px",
                  borderRadius: 10,
                  backgroundColor: `${COLORS.fail}26`,
                  opacity: 0.4 + testFlash * 0.6,
                }}
              >
                ভুলে গেছে!
              </span>
            </div>

            {/* Row 2: ✓ Build */}
            <ChecklistDoneRow label="Build" />

            {/* Row 3: ✓ Deploy */}
            <ChecklistDoneRow label="Deploy" />
          </div>
        </AbsoluteFill>
      ) : null}

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};

const ChecklistDoneRow: React.FC<{ readonly label: string }> = ({ label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 22,
      padding: "22px 28px",
      borderRadius: 18,
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      border: `1.5px solid ${COLORS.border}`,
      opacity: 0.72,
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: `${COLORS.success}26`,
        border: `2.5px solid ${COLORS.success}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.success,
        fontSize: 28,
        fontWeight: 800,
      }}
    >
      ✓
    </div>
    <span
      style={{
        fontFamily: FONTS.ui,
        fontSize: 38,
        fontWeight: 700,
        color: COLORS.text,
      }}
    >
      {label}
    </span>
  </div>
);
