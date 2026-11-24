import { type CalculateMetadataFunction, staticFile } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { LAYOUT } from "./theme";

export interface SubtitleCue {
  readonly text: string;
  /** Frame relative to scene's baseDurationFrames */
  readonly startFrame: number;
  /** Frame relative to scene's baseDurationFrames */
  readonly endFrame: number;
}

export interface SceneMetadata {
  readonly index: number;
  readonly id: string;
  readonly title: string;
  readonly audioFile: string;
  readonly fallbackAudioFile: string;
  readonly defaultDurationFrames: number;
  /** Measured duration from WAV file (+15 frames padding) used as choreography timeline */
  readonly baseDurationFrames: number;
  readonly subtitles: readonly SubtitleCue[];
}

export const AUDIO_PADDING_FRAMES = 15;

export const SCENES_META: readonly SceneMetadata[] = [
  {
    index: 1,
    id: "Scene01",
    title: "রাতের তাড়াহুড়ো",
    audioFile: "github-action/scene_01_tense_scene_1.wav",
    fallbackAudioFile: "vo/scene-01.mp3",
    defaultDurationFrames: 360,
    baseDurationFrames: 373,
    subtitles: [
      { text: "রাত তখন এগারোটা।", startFrame: 6, endFrame: 56 },
      {
        text: "ঢাকার একটি Startup-এ কাজ করে Developer রাফি।",
        startFrame: 58,
        endFrame: 146,
      },
      { text: "কাল সকালেই Client Demo।", startFrame: 148, endFrame: 202 },
      {
        text: "তাড়াহুড়ো করে সে Code Push করল, Server-এ Deploy করল,",
        startFrame: 204,
        endFrame: 312,
      },
      { text: "তারপর ঘুমাতে গেল।", startFrame: 314, endFrame: 362 },
    ],
  },
  {
    index: 2,
    id: "Scene02",
    title: "সাদা Page",
    audioFile: "github-action/scene_02_worried_scene_2.wav",
    fallbackAudioFile: "vo/scene-02.mp3",
    defaultDurationFrames: 360,
    baseDurationFrames: 296,
    subtitles: [
      {
        text: "সকালে Client Website খুলতেই দেখা গেল,",
        startFrame: 4,
        endFrame: 88,
      },
      { text: "পুরো Page সাদা!", startFrame: 92, endFrame: 148 },
      {
        text: "পরে জানা গেল, তাড়াহুড়োয় রাফি Test চালাতেই ভুলে গিয়েছিল।",
        startFrame: 156,
        endFrame: 282,
      },
    ],
  },
  {
    index: 3,
    id: "Scene03",
    title: "নাদিয়া আপুর পরামর্শ",
    audioFile: "github-action/scene_03_reflective_scene_3.wav",
    fallbackAudioFile: "vo/scene-03.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 422,
    subtitles: [
      {
        text: "সেদিন Senior Developer নাদিয়া আপু বললেন,",
        startFrame: 6,
        endFrame: 108,
      },
      { text: "“রাফি, মানুষ ভুল করবেই।”", startFrame: 112, endFrame: 184 },
      {
        text: "তাই যে কাজ প্রতিবার একইভাবে করতে হয়, সেটা Machine-কে দাও।",
        startFrame: 186,
        endFrame: 320,
      },
      {
        text: "চলো, তোমাকে GitHub Actions দেখাই।",
        startFrame: 324,
        endFrame: 408,
      },
    ],
  },
  {
    index: 4,
    id: "Scene04",
    title: "CI/CD কী",
    audioFile: "github-action/scene_04_explanatory_scene_4.wav",
    fallbackAudioFile: "vo/scene-04.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 523,
    subtitles: [
      {
        text: "GitHub Actions হলো GitHub-এর নিজস্ব Automation Tool।",
        startFrame: 6,
        endFrame: 132,
      },
      {
        text: "এটি দিয়ে তৈরি হয় CI/CD Pipeline।",
        startFrame: 136,
        endFrame: 224,
      },
      {
        text: "CI মানে Continuous Integration,",
        startFrame: 228,
        endFrame: 306,
      },
      {
        text: "আর CD মানে Continuous Deployment।",
        startFrame: 308,
        endFrame: 396,
      },
      {
        text: "আর সব নিয়ম লেখা থাকে একটি Workflow File-এ।",
        startFrame: 400,
        endFrame: 512,
      },
    ],
  },
  {
    index: 5,
    id: "Scene05",
    title: "Workflow File এবং Event",
    audioFile: "github-action/scene_05_engaging_scene_5.wav",
    fallbackAudioFile: "vo/scene-05.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 489,
    subtitles: [
      {
        text: "নাদিয়া আপু Project-এ খুললেন .github, তারপর workflows Folder।",
        startFrame: 6,
        endFrame: 138,
      },
      {
        text: "সেখানে তৈরি করলেন একটি YAML File।",
        startFrame: 142,
        endFrame: 222,
      },
      {
        text: "প্রথমেই লিখলেন on, অর্থাৎ কোন Event-এ Workflow চালু হবে।",
        startFrame: 226,
        endFrame: 368,
      },
      {
        text: "যেমন main Branch-এ Push বা Pull Request।",
        startFrame: 372,
        endFrame: 476,
      },
    ],
  },
  {
    index: 6,
    id: "Scene06",
    title: "Job এবং Runner",
    audioFile: "github-action/scene_06_curious_scene_6.wav",
    fallbackAudioFile: "vo/scene-06.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 443,
    subtitles: [
      {
        text: "তারপর লিখলেন build নামে একটি Job।",
        startFrame: 6,
        endFrame: 92,
      },
      {
        text: "এই Job চলবে একটি Runner-এ,",
        startFrame: 96,
        endFrame: 160,
      },
      {
        text: "মানে GitHub-এর দেওয়া একটি Virtual Machine, ubuntu-latest।",
        startFrame: 164,
        endFrame: 306,
      },
      {
        text: "রাফি অবাক হলো — নিজের কোনো Server ছাড়াই!",
        startFrame: 310,
        endFrame: 430,
      },
    ],
  },
  {
    index: 7,
    id: "Scene07",
    title: "Steps",
    audioFile: "github-action/scene_07_educational_scene_7.wav",
    fallbackAudioFile: "vo/scene-07.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 541,
    subtitles: [
      { text: "এরপর এলো Steps।", startFrame: 4, endFrame: 58 },
      {
        text: "প্রথমে actions/checkout দিয়ে Code নামানো,",
        startFrame: 62,
        endFrame: 168,
      },
      {
        text: "তারপর setup-node দিয়ে Node.js সেট করা,",
        startFrame: 172,
        endFrame: 296,
      },
      {
        text: "এরপর npm ci দিয়ে Dependency Install,",
        startFrame: 300,
        endFrame: 396,
      },
      {
        text: "তারপর npm test, আর শেষে npm run build।",
        startFrame: 400,
        endFrame: 528,
      },
    ],
  },
  {
    index: 8,
    id: "Scene08",
    title: "পরীক্ষা, এবং লাল Cross",
    audioFile: "github-action/scene_08_suspenseful_scene_8.wav",
    fallbackAudioFile: "vo/scene-08.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 502,
    subtitles: [
      { text: "এবার পরীক্ষার পালা।", startFrame: 6, endFrame: 66 },
      {
        text: "রাফি ইচ্ছে করে সেই আগের ভুলটাই আবার Push করল।",
        startFrame: 72,
        endFrame: 204,
      },
      {
        text: "কিছুক্ষণের মধ্যেই npm test Step লাল হয়ে গেল।",
        startFrame: 210,
        endFrame: 348,
      },
      {
        text: "Workflow সেখানেই থেমে গেল, ভুল Code আর Deploy হলো না।",
        startFrame: 354,
        endFrame: 490,
      },
    ],
  },
  {
    index: 9,
    id: "Scene09",
    title: "সবুজ Tick এবং Secrets",
    audioFile: "github-action/scene_09_relieved_scene_9.wav",
    fallbackAudioFile: "vo/scene-09.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 459,
    subtitles: [
      {
        text: "ভুল ঠিক করে আবার Push করতেই সব Step-এ সবুজ Tick।",
        startFrame: 6,
        endFrame: 142,
      },
      {
        text: "Pull Request-এ দেখা গেল All checks passed।",
        startFrame: 148,
        endFrame: 250,
      },
      {
        text: "নাদিয়া আপু মনে করিয়ে দিলেন, Password বা API Key সবসময় রাখতে হবে GitHub Secrets-এ।",
        startFrame: 256,
        endFrame: 446,
      },
    ],
  },
  {
    index: 10,
    id: "Scene10",
    title: "শেষ",
    audioFile: "github-action/scene_10_inspirational_scene_10.wav",
    fallbackAudioFile: "vo/scene-10.mp3",
    defaultDurationFrames: 390,
    baseDurationFrames: 385,
    subtitles: [
      {
        text: "সেদিনের পর রাফি আর কখনো ভয় নিয়ে Deploy করেনি।",
        startFrame: 6,
        endFrame: 130,
      },
      {
        text: "কারণ এখন প্রতিটি Push পাহারা দেয় GitHub Actions।",
        startFrame: 134,
        endFrame: 248,
      },
      {
        text: "আর তুমি? তোমার প্রথম Workflow কবে লিখছ?",
        startFrame: 254,
        endFrame: 372,
      },
    ],
  },
] as const;

export const DEFAULT_TOTAL_FRAMES = SCENES_META.reduce(
  (sum, s) => sum + s.baseDurationFrames,
  0,
);

export interface ResolvedSceneTiming {
  readonly index: number;
  readonly durationInFrames: number;
  readonly audioSrc: string | null;
}

export type GitHubActionsVideoProps = {
  readonly sceneTimings: readonly ResolvedSceneTiming[];
  readonly hasBgMusic: boolean;
};

export const DEFAULT_VIDEO_PROPS: GitHubActionsVideoProps = {
  sceneTimings: SCENES_META.map((s) => ({
    index: s.index,
    durationInFrames: s.baseDurationFrames,
    audioSrc: s.audioFile,
  })),
  hasBgMusic: false,
};

async function probeAudioDuration(
  filePath: string,
): Promise<number | null> {
  try {
    const src = staticFile(filePath);
    const sec = await getAudioDurationInSeconds(src);
    if (Number.isFinite(sec) && sec > 0) {
      return sec;
    }
    return null;
  } catch {
    return null;
  }
}

async function fileExistsInPublic(filePath: string): Promise<boolean> {
  try {
    const res = await fetch(staticFile(filePath), { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

export const calculateGitHubActionsMetadata: CalculateMetadataFunction<
  GitHubActionsVideoProps
> = async ({ props }) => {
  const resolved = await Promise.all(
    SCENES_META.map(async (scene): Promise<ResolvedSceneTiming> => {
      const primarySec = await probeAudioDuration(scene.audioFile);
      if (primarySec !== null) {
        return {
          index: scene.index,
          durationInFrames:
            Math.ceil(primarySec * LAYOUT.fps) + AUDIO_PADDING_FRAMES,
          audioSrc: scene.audioFile,
        };
      }
      const fallbackSec = await probeAudioDuration(scene.fallbackAudioFile);
      if (fallbackSec !== null) {
        return {
          index: scene.index,
          durationInFrames:
            Math.ceil(fallbackSec * LAYOUT.fps) + AUDIO_PADDING_FRAMES,
          audioSrc: scene.fallbackAudioFile,
        };
      }
      return {
        index: scene.index,
        durationInFrames: scene.defaultDurationFrames,
        audioSrc: null,
      };
    }),
  );

  const hasBgMusic = await fileExistsInPublic("music/bg.mp3");
  const totalFrames = resolved.reduce((sum, s) => sum + s.durationInFrames, 0);

  return {
    durationInFrames: totalFrames,
    fps: LAYOUT.fps,
    width: LAYOUT.width,
    height: LAYOUT.height,
    props: {
      ...props,
      sceneTimings: resolved,
      hasBgMusic,
    },
  };
};

/**
 * Scales a design-time frame number proportionally if the scene's actual
 * duration differs from its base choreography duration.
 */
export function createSceneScaler(
  actualDurationFrames: number,
  baseDurationFrames: number,
) {
  const ratio =
    baseDurationFrames > 0 ? actualDurationFrames / baseDurationFrames : 1;
  return {
    ratio,
    f: (designFrame: number) => Math.round(designFrame * ratio),
    subtitles: (cues: readonly SubtitleCue[]): SubtitleCue[] =>
      cues.map((c) => ({
        text: c.text,
        startFrame: Math.round(c.startFrame * ratio),
        endFrame: Math.round(c.endFrame * ratio),
      })),
  };
}

export interface SceneComponentProps {
  readonly audioSrc?: string | null;
  readonly playAudio?: boolean;
}
