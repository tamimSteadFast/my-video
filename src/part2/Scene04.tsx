import React from "react";
import {
  AbsoluteFill,
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
import { PhoneCall } from "../components/PhoneCall";
import { Character } from "../components/Character";
import { HtopMonitor } from "../components/HtopMonitor";
import { Terminal } from "../components/Terminal";
import { SceneSubtitles } from "../components/Subtitle";

const META = PART2_SCENES_META[3];

export const Scene04: React.FC<SceneComponentProps> = ({
  audioSrc = META.audioFile,
  playAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scale = createSceneScaler(durationInFrames, META.baseDurationFrames);
  const f = scale.f;

  // Voice-synced frame anchors (from scene_04_shocked_scene_4.wav)
  const htopInFrame = f(92);
  const memPeakFrame = f(176); // "RAM একশো শতাংশ"
  const cpuPeakFrame = f(220); // "CPU-ও একশো শতাংশ"
  const sshInsetFrame = f(268); // "SSH পর্যন্ত Freeze হয়ে যাচ্ছে"
  const sshFreezeFrame = f(316);

  // Heartbeat red ambient pulse (music stays off; heartbeat SFX cue)
  const heartbeat = Math.pow(Math.max(0, Math.sin(frame * 0.28)), 4) * 0.16;

  const phoneIn = spring({
    frame,
    fps,
    config: SPRING_CONFIG.snappy,
  });

  const htopPop =
    frame >= htopInFrame
      ? spring({
          frame: frame - htopInFrame,
          fps,
          config: SPRING_CONFIG.snappy,
        })
      : 0;

  const insetPop =
    frame >= sshInsetFrame
      ? spring({
          frame: frame - sshInsetFrame,
          fps,
          config: SPRING_CONFIG.bouncy,
        })
      : 0;

  const sweatY = (frame * 1.4) % 24;
  const subtitles = scale.subtitles(META.subtitles);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0D14", overflow: "hidden" }}>
      {/* Scene 04 Voiceover */}
      {playAudio && audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
      {/* SFX cue: phone vibration buzz (0–92f) */}
      {/* SFX cue: tense heartbeat pulse (0–345f); bg music returns softly at f(348) */}

      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(248, 81, 73, 0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 42%, rgba(248, 81, 73, ${(
            0.14 + heartbeat
          ).toFixed(3)}) 100%)`,
          pointerEvents: "none",
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
          justifyContent: "center",
        }}
      >
        {/* ACT 1 (0–92f): Vibrating Client PhoneCall + 3 Alerts over Shocked Rafi */}
        {frame < htopInFrame ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              transform: `scale(${interpolate(phoneIn, [0, 1], [0.92, 1])})`,
            }}
          >
            <PhoneCall
              caller="Client"
              scale={1.18}
              notifications={[
                { text: "সাইট খুলছে না!", startFrame: f(10), accent: COLORS.fail },
                { text: "জরুরি!", startFrame: f(34), accent: COLORS.vps },
                { text: "Missed call (3)", startFrame: f(58), accent: COLORS.fail },
              ]}
            />

            {/* Shocked Rafi */}
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
              <svg
                width="38"
                height="50"
                viewBox="0 0 36 48"
                style={{
                  position: "absolute",
                  right: 52,
                  top: 76 + sweatY,
                  opacity: 1 - sweatY / 28,
                  zIndex: 10,
                }}
              >
                <path
                  d="M 18 4 C 18 4 30 22 30 31 C 30 38 24.6 44 18 44 C 11.4 44 6 38 6 31 C 6 22 18 4 18 4 Z"
                  fill="#60A5FA"
                />
              </svg>

              <Character
                name="rafi"
                expression="shocked"
                talking={false}
                size={380}
              />

              <div
                style={{
                  padding: "12px 30px",
                  borderRadius: 999,
                  backgroundColor: `${COLORS.fail}24`,
                  border: `2px solid ${COLORS.fail}`,
                  fontFamily: FONTS.bangla,
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#FFA198",
                  boxShadow: SHADOWS.glow(COLORS.fail),
                }}
              >
                কী হলো Server-এ?!
              </div>
            </div>
          </div>
        ) : null}

        {/* ACT 2 & 3 (92–360f): Portrait HtopMonitor + Dedicated Lower Lagging SSH Terminal */}
        {frame >= htopInFrame ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 32,
              transform: `scale(${interpolate(htopPop, [0, 1], [0.94, 1])})`,
              opacity: interpolate(htopPop, [0, 0.3], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            {/* Header + RAM/CPU 100% Danger Counters */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 30,
                  fontWeight: 800,
                  color: COLORS.text,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    backgroundColor: COLORS.fail,
                    boxShadow: `0 0 14px ${COLORS.fail}`,
                  }}
                />
                htop — Live VPS Resource Monitor
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div
                  style={{
                    padding: "14px 24px",
                    borderRadius: 18,
                    backgroundColor: `${COLORS.fail}26`,
                    border: `2px solid ${COLORS.fail}`,
                    fontFamily: FONTS.code,
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#FFA198",
                    textAlign: "center",
                  }}
                >
                  RAM:{" "}
                  {Math.round(
                    interpolate(frame, [htopInFrame, memPeakFrame], [30, 99], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  )}
                  %
                </div>
                <div
                  style={{
                    padding: "14px 24px",
                    borderRadius: 18,
                    backgroundColor: `${COLORS.fail}26`,
                    border: `2px solid ${COLORS.fail}`,
                    fontFamily: FONTS.code,
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#FFA198",
                    textAlign: "center",
                  }}
                >
                  CPU:{" "}
                  {Math.round(
                    interpolate(frame, [htopInFrame, cpuPeakFrame], [35, 100], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  )}
                  %
                </div>
              </div>
            </div>

            {/* Full-Width Portrait-Optimized HtopMonitor */}
            <HtopMonitor
              cpu={(fr) =>
                interpolate(fr, [htopInFrame, cpuPeakFrame], [35, 100], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              }
              mem={(fr) =>
                interpolate(fr, [htopInFrame, memPeakFrame], [30, 99], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              }
              memTotal="1.0G"
              swpLabel="0K/0K"
              processes={[
                {
                  pid: 2841,
                  user: "rafi",
                  name: "node (vite build)",
                  cpu: (fr) =>
                    interpolate(fr, [htopInFrame, cpuPeakFrame], [31, 92], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  mem: (fr) =>
                    interpolate(fr, [htopInFrame, memPeakFrame], [24, 81], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                },
                {
                  pid: 1120,
                  user: "www-data",
                  name: "nginx: worker",
                  cpu: 3.1,
                  mem: 5.4,
                },
                {
                  pid: 1408,
                  user: "rafi",
                  name: "node (site)",
                  cpu: 4.9,
                  mem: 12.6,
                },
              ]}
            />

            {/* ACT 3 (268–360f): Dedicated Lower Slot for Lagging SSH Terminal */}
            <div style={{ minHeight: 330 }}>
              {frame >= sshInsetFrame ? (
                <div
                  style={{
                    transform: `translateY(${interpolate(insetPop, [0, 1], [36, 0])}px) scale(${interpolate(insetPop, [0, 1], [0.85, 1])})`,
                    opacity: interpolate(insetPop, [0, 0.25], [0, 1], {
                      extrapolateRight: "clamp",
                    }),
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      alignSelf: "center",
                      padding: "10px 28px",
                      borderRadius: 999,
                      backgroundColor: COLORS.fail,
                      color: "#FFFFFF",
                      fontFamily: FONTS.bangla,
                      fontSize: 30,
                      fontWeight: 700,
                      boxShadow: SHADOWS.glow(COLORS.fail),
                    }}
                  >
                    SSH পর্যন্ত Freeze!
                  </div>
                  <Terminal
                    title="ssh rafi@client-vps (lagging)"
                    prompt="rafi@vps:~$ "
                    width="100%"
                    fontSize={27}
                    frozen={frame >= sshFreezeFrame}
                    frozenStartFrame={sshFreezeFrame}
                    frozenLabel="connection not responding"
                    lines={[
                      {
                        text: "sudo reboot",
                        startFrame: sshInsetFrame + 6,
                        typeSpeed: 1 / 12,
                      },
                    ]}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      {/* Bangla Subtitle Bar (bottom 160px safe zone) */}
      <SceneSubtitles cues={subtitles} />
    </AbsoluteFill>
  );
};
