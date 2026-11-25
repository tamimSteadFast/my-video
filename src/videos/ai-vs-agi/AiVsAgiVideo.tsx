import React from "react";
import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";
import { COLORS, FONTS, getLayoutMetrics } from "../../config/theme";
import {
  AUDIO_CONFIG,
  SCENE_AUDIO_FILES,
  SCENE_FRAMES,
  SCENE_SUBTITLES,
  SceneKey,
  TRANSITION_DURATION_FRAMES,
} from "../../config/timing";
import { ProgressBar } from "./components/ProgressBar";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Title } from "./scenes/Scene02Title";
import { Scene03WhatIsAi } from "./scenes/Scene03WhatIsAi";
import { Scene04NarrowAi } from "./scenes/Scene04NarrowAi";
import { Scene05WhatIsAgi } from "./scenes/Scene05WhatIsAgi";
import { Scene06Comparison } from "./scenes/Scene06Comparison";
import { Scene07DoesAgiExist } from "./scenes/Scene07DoesAgiExist";
import { Scene08WhyEngineers } from "./scenes/Scene08WhyEngineers";
import { Scene09Cta } from "./scenes/Scene09Cta";

export const aiVsAgiSchema = z.object({
  hasVoiceover: z.boolean().default(AUDIO_CONFIG.hasVoiceover),
  audioMode: z.enum(["per-scene", "single"]).default(AUDIO_CONFIG.audioMode),
  hasBgm: z.boolean().default(AUDIO_CONFIG.hasBgm),
  hasSfx: z.boolean().default(AUDIO_CONFIG.hasSfx),
  showSubtitles: z.boolean().default(AUDIO_CONFIG.showSubtitles),
});

export type AiVsAgiProps = z.infer<typeof aiVsAgiSchema>;

export const AI_VS_AGI_DEFAULT_PROPS: AiVsAgiProps = {
  hasVoiceover: AUDIO_CONFIG.hasVoiceover,
  audioMode: AUDIO_CONFIG.audioMode,
  hasBgm: AUDIO_CONFIG.hasBgm,
  hasSfx: AUDIO_CONFIG.hasSfx,
  showSubtitles: AUDIO_CONFIG.showSubtitles,
};

const SceneAudioAndSubtitle: React.FC<{
  sceneKey: SceneKey;
  hasVoiceover: boolean;
  audioMode: "per-scene" | "single";
  showSubtitles: boolean;
}> = ({ sceneKey, hasVoiceover, audioMode, showSubtitles }) => {
  const { width, height } = useVideoConfig();
  const metrics = getLayoutMetrics(width, height);
  const audioFile =
    sceneKey in SCENE_AUDIO_FILES
      ? SCENE_AUDIO_FILES[sceneKey as keyof typeof SCENE_AUDIO_FILES]
      : undefined;
  const subtitleText = SCENE_SUBTITLES[sceneKey];

  return (
    <>
      {hasVoiceover && audioMode === "per-scene" && audioFile ? (
        <Audio src={staticFile(audioFile)} volume={1} />
      ) : null}

      {showSubtitles && subtitleText ? (
        <div
          style={{
            position: "absolute",
            left: metrics.padX,
            right: metrics.padX,
            bottom: metrics.isVertical ? 92 : 28,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <div
            style={{
              maxWidth: metrics.isVertical ? 940 : 1480,
              padding: "12px 24px",
              borderRadius: 14,
              backgroundColor: "rgba(7, 11, 22, 0.86)",
              border: `1px solid ${COLORS.borderBright}`,
              fontFamily: FONTS.primary,
              fontSize: metrics.isVertical ? 26 : 24,
              fontWeight: 500,
              color: COLORS.textPrimary,
              textAlign: "center",
              lineHeight: 1.38,
              letterSpacing: 0,
            }}
          >
            {subtitleText}
          </div>
        </div>
      ) : null}
    </>
  );
};

export const AiVsAgiVideo: React.FC<AiVsAgiProps> = ({
  hasVoiceover,
  audioMode,
  hasBgm,
  hasSfx,
  showSubtitles,
}) => {
  const transitionTiming = linearTiming({ durationInFrames: TRANSITION_DURATION_FRAMES });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Optional single combined voiceover file at public/voiceover.mp3 */}
      {hasVoiceover && audioMode === "single" ? (
        <Audio src={staticFile(AUDIO_CONFIG.singleVoiceoverFile)} volume={1} />
      ) : null}

      {/* Optional background music at public/bgm.mp3 (volume 0.08) */}
      {hasBgm ? (
        <Audio src={staticFile(AUDIO_CONFIG.bgmFile)} volume={AUDIO_CONFIG.bgmVolume} loop />
      ) : null}

      <TransitionSeries>
        <TransitionSeries.Sequence name="01 Hook" durationInFrames={SCENE_FRAMES.hook}>
          <Scene01Hook hasSfx={hasSfx} />
          <SceneAudioAndSubtitle
            sceneKey="hook"
            hasVoiceover={hasVoiceover}
            audioMode={audioMode}
            showSubtitles={showSubtitles}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence name="02 Title Slam" durationInFrames={SCENE_FRAMES.title}>
          <Scene02Title hasSfx={hasSfx} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={transitionTiming}
        />

        <TransitionSeries.Sequence name="03 What is AI" durationInFrames={SCENE_FRAMES.whatIsAi}>
          <Scene03WhatIsAi hasSfx={hasSfx} />
          <SceneAudioAndSubtitle
            sceneKey="whatIsAi"
            hasVoiceover={hasVoiceover}
            audioMode={audioMode}
            showSubtitles={showSubtitles}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={transitionTiming}
        />

        <TransitionSeries.Sequence name="04 Narrow AI" durationInFrames={SCENE_FRAMES.narrowAi}>
          <Scene04NarrowAi hasSfx={hasSfx} />
          <SceneAudioAndSubtitle
            sceneKey="narrowAi"
            hasVoiceover={hasVoiceover}
            audioMode={audioMode}
            showSubtitles={showSubtitles}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence name="05 What is AGI" durationInFrames={SCENE_FRAMES.whatIsAgi}>
          <Scene05WhatIsAgi hasSfx={hasSfx} />
          <SceneAudioAndSubtitle
            sceneKey="whatIsAgi"
            hasVoiceover={hasVoiceover}
            audioMode={audioMode}
            showSubtitles={showSubtitles}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={transitionTiming}
        />

        <TransitionSeries.Sequence
          name="06 Key Differences"
          durationInFrames={SCENE_FRAMES.comparison}
        >
          <Scene06Comparison />
          <SceneAudioAndSubtitle
            sceneKey="comparison"
            hasVoiceover={hasVoiceover}
            audioMode={audioMode}
            showSubtitles={showSubtitles}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence
          name="07 Does AGI Exist"
          durationInFrames={SCENE_FRAMES.doesAgiExist}
        >
          <Scene07DoesAgiExist hasSfx={hasSfx} />
          <SceneAudioAndSubtitle
            sceneKey="doesAgiExist"
            hasVoiceover={hasVoiceover}
            audioMode={audioMode}
            showSubtitles={showSubtitles}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={transitionTiming}
        />

        <TransitionSeries.Sequence
          name="08 Why Engineers Care"
          durationInFrames={SCENE_FRAMES.whyEngineersCare}
        >
          <Scene08WhyEngineers hasSfx={hasSfx} />
          <SceneAudioAndSubtitle
            sceneKey="whyEngineersCare"
            hasVoiceover={hasVoiceover}
            audioMode={audioMode}
            showSubtitles={showSubtitles}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence name="09 Question + CTA" durationInFrames={SCENE_FRAMES.cta}>
          <Scene09Cta hasSfx={hasSfx} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <ProgressBar brandName="AI শিখি" />
    </AbsoluteFill>
  );
};
