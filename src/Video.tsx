import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Series,
  interpolate,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { COLORS } from "./theme";
import {
  DEFAULT_VIDEO_PROPS,
  SCENES_META,
  type GitHubActionsVideoProps,
  type ResolvedSceneTiming,
} from "./narration";
import { GrainOverlay } from "./components/GrainOverlay";
import { SceneTransition } from "./components/SceneTransition";
import { Scene01 } from "./scenes/Scene01";
import { Scene02 } from "./scenes/Scene02";
import { Scene03 } from "./scenes/Scene03";
import { Scene04 } from "./scenes/Scene04";
import { Scene05 } from "./scenes/Scene05";
import { Scene06 } from "./scenes/Scene06";
import { Scene07 } from "./scenes/Scene07";
import { Scene08 } from "./scenes/Scene08";
import { Scene09 } from "./scenes/Scene09";
import { Scene10 } from "./scenes/Scene10";

const SCENE_COMPONENTS = [
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
  Scene08,
  Scene09,
  Scene10,
] as const;

const TRANSITION_ACCENTS = [
  COLORS.fail, // into S2 (hard cut — skipped)
  COLORS.warmAccent, // into S3
  COLORS.job, // into S4
  COLORS.event, // into S5
  COLORS.runner, // into S6
  COLORS.step, // into S7
  COLORS.running, // into S8
  COLORS.success, // into S9
  COLORS.runner, // into S10
] as const;

const BASE_MUSIC_VOLUME = 0.12;

/**
 * Computes frame-based music ducking volume across all 10 scenes:
 * - Scene 02: drops to 0 at white-page shock, returns softly at flashback
 * - Scene 08: cuts to 0 during npm test suspense, resumes when deploy is blocked
 * - Scene 10: fades smoothly to 0 over the final 60 frames
 */
function buildMusicVolumeCallback(
  sceneStarts: readonly number[],
  timings: readonly ResolvedSceneTiming[],
  totalFrames: number,
) {
  const s2Start = sceneStarts[1] ?? 360;
  const s2Dur = timings[1]?.durationInFrames ?? SCENES_META[1].baseDurationFrames;
  const s2Ratio = s2Dur / SCENES_META[1].baseDurationFrames;
  const s2DropFrame = s2Start + Math.round(88 * s2Ratio);
  const s2ReturnFrame = s2Start + Math.round(156 * s2Ratio);

  const s8Start = sceneStarts[7] ?? 3000;
  const s8Dur = timings[7]?.durationInFrames ?? SCENES_META[7].baseDurationFrames;
  const s8Ratio = s8Dur / SCENES_META[7].baseDurationFrames;
  const s8CutFrame = s8Start + Math.round(215 * s8Ratio);
  const s8ResumeFrame = s8Start + Math.round(356 * s8Ratio);

  const fadeOutStart = Math.max(0, totalFrames - 60);

  return (globalFrame: number): number => {
    // Scene 02 shock drop -> soft return
    let vol = BASE_MUSIC_VOLUME;

    if (globalFrame >= s2DropFrame - 4 && globalFrame < s2ReturnFrame + 24) {
      if (globalFrame < s2ReturnFrame) {
        vol = interpolate(
          globalFrame,
          [s2DropFrame - 4, s2DropFrame],
          [BASE_MUSIC_VOLUME, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
      } else {
        vol = interpolate(
          globalFrame,
          [s2ReturnFrame, s2ReturnFrame + 24],
          [0, BASE_MUSIC_VOLUME * 0.85],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
      }
    }

    // Scene 08 suspense cut -> resume when deploy lock card arrives
    if (globalFrame >= s8CutFrame - 4 && globalFrame < s8ResumeFrame + 20) {
      if (globalFrame < s8ResumeFrame) {
        vol = interpolate(
          globalFrame,
          [s8CutFrame - 4, s8CutFrame],
          [BASE_MUSIC_VOLUME, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
      } else {
        vol = interpolate(
          globalFrame,
          [s8ResumeFrame, s8ResumeFrame + 20],
          [0, BASE_MUSIC_VOLUME],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
      }
    }

    // Scene 10 final 60-frame fade out
    if (globalFrame >= fadeOutStart) {
      const endFade = interpolate(
        globalFrame,
        [fadeOutStart, totalFrames],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );
      vol *= endFade;
    }

    return Math.max(0, Math.min(1, vol));
  };
}

export const Video: React.FC<GitHubActionsVideoProps> = ({
  sceneTimings = DEFAULT_VIDEO_PROPS.sceneTimings,
  hasBgMusic = false,
}) => {
  const { durationInFrames } = useVideoConfig();

  // Calculate cumulative start frame for each scene
  const sceneStarts: number[] = [];
  let cursor = 0;
  for (let i = 0; i < SCENE_COMPONENTS.length; i++) {
    sceneStarts.push(cursor);
    cursor +=
      sceneTimings[i]?.durationInFrames ??
      SCENES_META[i].defaultDurationFrames;
  }

  const musicVolume = buildMusicVolumeCallback(
    sceneStarts,
    sceneTimings,
    durationInFrames,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Main 10-Scene Story Sequence */}
      <Series>
        {SCENE_COMPONENTS.map((SceneComp, idx) => {
          const timing = sceneTimings[idx];
          const duration =
            timing?.durationInFrames ?? SCENES_META[idx].defaultDurationFrames;
          const audioSrc = timing ? timing.audioSrc : SCENES_META[idx].audioFile;

          return (
            <Series.Sequence
              key={SCENES_META[idx].id}
              name={`${SCENES_META[idx].id} · ${SCENES_META[idx].title}`}
              durationInFrames={duration}
            >
              <SceneComp audioSrc={audioSrc} playAudio={Boolean(audioSrc)} />
            </Series.Sequence>
          );
        })}
      </Series>

      {/* 12-Frame Wipe Transitions between Scenes (skipping Scene01 -> Scene02 intentional hard cut!) */}
      {sceneStarts.slice(1).map((cutFrame, i) => {
        // i === 0 is the boundary between Scene 01 and Scene 02 (hard cut to bright morning)
        if (i === 0) return null;
        return (
          <Sequence
            key={`transition-${i + 1}`}
            name={`Transition S${i + 1}→S${i + 2}`}
            from={Math.max(0, cutFrame - 6)}
            durationInFrames={12}
          >
            <SceneTransition
              accentColor={TRANSITION_ACCENTS[i] ?? COLORS.job}
              durationInFrames={12}
            />
          </Sequence>
        );
      })}

      {/* Background Music at 0.12 base volume with dynamic ducking (auto-active when public/music/bg.mp3 exists) */}
      {hasBgMusic ? (
        <Audio
          src={staticFile("music/bg.mp3")}
          loop
          volume={musicVolume}
        />
      ) : null}

      {/* Global Subtle 4% Grain Overlay */}
      <GrainOverlay opacity={0.04} />
    </AbsoluteFill>
  );
};
