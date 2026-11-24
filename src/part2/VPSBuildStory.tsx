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
import { COLORS } from "../theme";
import type { ResolvedSceneTiming } from "../narration";
import {
  PART2_DEFAULT_PROPS,
  PART2_SCENES_META,
  type VPSBuildStoryProps,
} from "./narration";
import { GrainOverlay } from "../components/GrainOverlay";
import { SceneTransition } from "../components/SceneTransition";
import { Scene01 } from "./Scene01";
import { Scene02 } from "./Scene02";
import { Scene03 } from "./Scene03";
import { Scene04 } from "./Scene04";
import { Scene05 } from "./Scene05";
import { Scene06 } from "./Scene06";
import { Scene07 } from "./Scene07";
import { Scene08 } from "./Scene08";
import { Scene09 } from "./Scene09";
import { Scene10 } from "./Scene10";

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
  COLORS.vps, // S1 -> S2
  COLORS.running, // S2 -> S3
  COLORS.fail, // S3 -> S4
  COLORS.runner, // S4 -> S5
  COLORS.vps, // S5 -> S6
  COLORS.runner, // S6 -> S7
  COLORS.step, // S7 -> S8
  COLORS.success, // S8 -> S9
  COLORS.warmAccent, // S9 -> S10
] as const;

const BASE_MUSIC_VOLUME = 0.12;

/**
 * Computes frame-based music ducking volume across all 10 scenes:
 * - Scene 03: drops to 0 when terminal begins freezing (~f(195))
 * - Scene 04: remains at 0 through panic & SSH freeze, returns softly near end (~f(348))
 * - Scene 10: fades smoothly to 0 over the final 60 frames
 */
function buildPart2MusicVolumeCallback(
  sceneStarts: readonly number[],
  timings: readonly ResolvedSceneTiming[],
  totalFrames: number,
) {
  const s3Start = sceneStarts[2] ?? 797;
  const s3Dur =
    timings[2]?.durationInFrames ?? PART2_SCENES_META[2].baseDurationFrames;
  const s3Ratio = s3Dur / PART2_SCENES_META[2].baseDurationFrames;
  const s3DropFrame = s3Start + Math.round(195 * s3Ratio);

  const s4Start = sceneStarts[3] ?? 1226;
  const s4Dur =
    timings[3]?.durationInFrames ?? PART2_SCENES_META[3].baseDurationFrames;
  const s4Ratio = s4Dur / PART2_SCENES_META[3].baseDurationFrames;
  const s4ReturnFrame = s4Start + Math.round(348 * s4Ratio);

  const fadeOutStart = Math.max(0, totalFrames - 60);

  return (globalFrame: number): number => {
    let vol = BASE_MUSIC_VOLUME;

    // Scene 03 terminal freeze drop -> silent through Scene 04 -> soft return at end of Scene 04
    if (globalFrame >= s3DropFrame - 8 && globalFrame < s4ReturnFrame + 24) {
      if (globalFrame < s3DropFrame) {
        vol = interpolate(
          globalFrame,
          [s3DropFrame - 8, s3DropFrame],
          [BASE_MUSIC_VOLUME, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
      } else if (globalFrame < s4ReturnFrame) {
        vol = 0;
      } else {
        vol = interpolate(
          globalFrame,
          [s4ReturnFrame, s4ReturnFrame + 24],
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

export const VPSBuildStory: React.FC<VPSBuildStoryProps> = ({
  sceneTimings = PART2_DEFAULT_PROPS.sceneTimings,
  hasBgMusic = false,
}) => {
  const { durationInFrames } = useVideoConfig();

  // Compute cumulative start frames for scene transitions and music ducking
  const sceneStarts: number[] = [];
  let cursor = 0;
  for (let i = 0; i < SCENE_COMPONENTS.length; i++) {
    sceneStarts.push(cursor);
    cursor +=
      sceneTimings[i]?.durationInFrames ??
      PART2_SCENES_META[i].defaultDurationFrames;
  }

  const musicVolume = buildPart2MusicVolumeCallback(
    sceneStarts,
    sceneTimings,
    durationInFrames,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Main 10-Scene Educational Story Sequence */}
      <Series>
        {SCENE_COMPONENTS.map((SceneComp, idx) => {
          const timing = sceneTimings[idx];
          const duration =
            timing?.durationInFrames ??
            PART2_SCENES_META[idx].defaultDurationFrames;
          const audioSrc = timing
            ? timing.audioSrc
            : PART2_SCENES_META[idx].audioFile;

          return (
            <Series.Sequence
              key={PART2_SCENES_META[idx].id}
              name={`${PART2_SCENES_META[idx].id} · ${PART2_SCENES_META[idx].title}`}
              durationInFrames={duration}
            >
              <SceneComp audioSrc={audioSrc} playAudio={Boolean(audioSrc)} />
            </Series.Sequence>
          );
        })}
      </Series>

      {/* 12-Frame Wipe Transitions between Scenes */}
      {sceneStarts.slice(1).map((cutFrame, i) => (
        <Sequence
          key={`p2-transition-${i + 1}`}
          name={`Transition S${i + 1}→S${i + 2}`}
          from={Math.max(0, cutFrame - 6)}
          durationInFrames={12}
        >
          <SceneTransition
            accentColor={TRANSITION_ACCENTS[i] ?? COLORS.vps}
            durationInFrames={12}
          />
        </Sequence>
      ))}

      {/* Background Music at 0.12 base volume with frame-based ducking (auto-active when public/music/bg.mp3 exists) */}
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
