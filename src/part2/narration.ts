import { type CalculateMetadataFunction, staticFile } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { LAYOUT } from "../theme";
import type { ResolvedSceneTiming, SubtitleCue } from "../narration";

export interface Part2SceneMetadata {
  readonly index: number;
  readonly id: string;
  readonly title: string;
  readonly audioFile: string;
  readonly fallbackAudioFile: string;
  readonly defaultDurationFrames: number;
  /** Exact measured duration from public/vps-deploy/*.wav (+15 frames padding) */
  readonly baseDurationFrames: number;
  readonly subtitles: readonly SubtitleCue[];
}

export const PART2_AUDIO_PADDING_FRAMES = 15;

export const PART2_SCENES_META: readonly Part2SceneMetadata[] = [
  {
    index: 1,
    id: "Scene01",
    title: "কম খরচের VPS",
    audioFile: "vps-deploy/scene_01_happy_scene_1.wav",
    fallbackAudioFile: "vo-part2/scene-01.mp3",
    defaultDurationFrames: 360,
    baseDurationFrames: 411, // 13.200s (396f) + 15f
    subtitles: [
      {
        text: "আগের সেই ভুলের পর রাফি এখন অনেক সাবধান।",
        startFrame: 6,
        endFrame: 108,
      },
      {
        text: "নতুন Client-এর জন্য সে কম খরচে একটি VPS নিল।",
        startFrame: 114,
        endFrame: 222,
      },
      {
        text: "মাত্র 1 GB RAM আর 1 Core CPU।",
        startFrame: 228,
        endFrame: 322,
      },
      {
        text: "খরচ কম, Client-ও খুশি।",
        startFrame: 328,
        endFrame: 396,
      },
    ],
  },
  {
    index: 2,
    id: "Scene02",
    title: "সরাসরি Server-এ Build",
    audioFile: "vps-deploy/scene_02_confident_scene_2.wav",
    fallbackAudioFile: "vo-part2/scene-02.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 386, // 12.360s (371f) + 15f
    subtitles: [
      {
        text: "প্রতিবার Update দিতে রাফি SSH দিয়ে Server-এ ঢোকে।",
        startFrame: 8,
        endFrame: 128,
      },
      {
        text: "তারপর git pull, npm install, আর npm run build।",
        startFrame: 134,
        endFrame: 268,
      },
      {
        text: "প্রথম কয়েক সপ্তাহ সবকিছু ঠিকঠাকই চলছিল।",
        startFrame: 274,
        endFrame: 372,
      },
    ],
  },
  {
    index: 3,
    id: "Scene03",
    title: "Killed",
    audioFile: "vps-deploy/scene_03_tense_scene_3.wav",
    fallbackAudioFile: "vo-part2/scene-03.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 429, // 13.800s (414f) + 15f
    subtitles: [
      {
        text: "কিন্তু Project বড় হতে থাকল।",
        startFrame: 4,
        endFrame: 76,
      },
      {
        text: "একদিন Build চালাতেই Terminal আটকে গেল।",
        startFrame: 84,
        endFrame: 170,
      },
      {
        text: "কয়েক মিনিট পর Screen-এ শুধু একটি শব্দ — Killed।",
        startFrame: 178,
        endFrame: 308,
      },
      {
        text: "আর ঠিক তখনই Live Website বন্ধ হয়ে গেল।",
        startFrame: 316,
        endFrame: 414,
      },
    ],
  },
  {
    index: 4,
    id: "Scene04",
    title: "RAM 100%, CPU 100%",
    audioFile: "vps-deploy/scene_04_shocked_scene_4.wav",
    fallbackAudioFile: "vo-part2/scene-04.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 360, // 11.480s (345f) + 15f
    subtitles: [
      {
        text: "একটার পর একটা Client-এর ফোন আসতে থাকল।",
        startFrame: 4,
        endFrame: 84,
      },
      {
        text: "রাফি htop খুলে দেখল, RAM একশো শতাংশ, CPU-ও একশো শতাংশ।",
        startFrame: 92,
        endFrame: 262,
      },
      {
        text: "SSH পর্যন্ত Freeze হয়ে যাচ্ছে।",
        startFrame: 268,
        endFrame: 346,
      },
    ],
  },
  {
    index: 5,
    id: "Scene05",
    title: "OOM Killer কী",
    audioFile: "vps-deploy/scene_05_explanatory_scene_5.wav",
    fallbackAudioFile: "vo-part2/scene-05.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 458, // 14.760s (443f) + 15f
    subtitles: [
      {
        text: "নাদিয়া আপু বুঝিয়ে বললেন, npm install আর Build চলার সময় অনেক RAM লাগে।",
        startFrame: 6,
        endFrame: 186,
      },
      {
        text: "RAM শেষ হলে Linux-এর Out of Memory Killer Process-টাকেই বন্ধ করে দেয়।",
        startFrame: 194,
        endFrame: 344,
      },
      {
        text: "আর একই Server-এ চলা Website-ও আটকে যায়।",
        startFrame: 350,
        endFrame: 444,
      },
    ],
  },
  {
    index: 6,
    id: "Scene06",
    title: "বড় VPS? না, Kitchen!",
    audioFile: "vps-deploy/scene_06_reflective_scene_6.wav",
    fallbackAudioFile: "vo-part2/scene-06.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 425, // 13.640s (410f) + 15f
    subtitles: [
      {
        text: "রাফি বলল, “তাহলে বড় VPS নিই?”",
        startFrame: 6,
        endFrame: 96,
      },
      {
        text: "আপু হেসে বললেন, মাত্র কয়েক মিনিটের Build-এর জন্য প্রতি মাসে বেশি টাকা দেবে?",
        startFrame: 108,
        endFrame: 264,
      },
      {
        text: "ভেবে দেখো, রেস্টুরেন্টে রান্না হয় Kitchen-এ, Customer-এর টেবিলে নয়।",
        startFrame: 268,
        endFrame: 410,
      },
    ],
  },
  {
    index: 7,
    id: "Scene07",
    title: "Runner = Kitchen",
    audioFile: "vps-deploy/scene_07_engaging_scene_7.wav",
    fallbackAudioFile: "vo-part2/scene-07.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 422, // 13.560s (407f) + 15f
    subtitles: [
      {
        text: "আমাদের Kitchen হবে GitHub Actions-এর Runner,",
        startFrame: 6,
        endFrame: 90,
      },
      {
        text: "যেখানে VPS-এর চেয়ে অনেক বেশি RAM আর CPU আছে।",
        startFrame: 94,
        endFrame: 196,
      },
      {
        text: "Code Push করলেই Runner-এ npm ci আর npm run build চলবে।",
        startFrame: 204,
        endFrame: 330,
      },
      {
        text: "VPS-এর ওপর কোনো চাপই পড়বে না।",
        startFrame: 336,
        endFrame: 406,
      },
    ],
  },
  {
    index: 8,
    id: "Scene08",
    title: "dist Folder এবং rsync",
    audioFile: "vps-deploy/scene_08_educational_scene_8.wav",
    fallbackAudioFile: "vo-part2/scene-08.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 444, // 14.280s (429f) + 15f
    subtitles: [
      {
        text: "Build শেষে তৈরি হয় একটি dist Folder।",
        startFrame: 6,
        endFrame: 100,
      },
      {
        text: "Deploy Step-এ rsync দিয়ে শুধু এই Folder পাঠানো হয় VPS-এ।",
        startFrame: 106,
        endFrame: 258,
      },
      {
        text: "আর Server-এ ঢোকার SSH Key নিরাপদে রাখা থাকে GitHub Secrets-এ।",
        startFrame: 266,
        endFrame: 428,
      },
    ],
  },
  {
    index: 9,
    id: "Scene09",
    title: "নতুন Version Live",
    audioFile: "vps-deploy/scene_09_relieved_scene_9.wav",
    fallbackAudioFile: "vo-part2/scene-09.mp3",
    defaultDurationFrames: 450,
    baseDurationFrames: 420, // 13.480s (405f) + 15f
    subtitles: [
      {
        text: "এবার রাফি Push করল। কয়েক মিনিটেই নতুন Version Live।",
        startFrame: 6,
        endFrame: 126,
      },
      {
        text: "htop-এ RAM একদম শান্ত, Website একবারও বন্ধ হয়নি।",
        startFrame: 134,
        endFrame: 266,
      },
      {
        text: "আর Build Fail করলে কিছুই Deploy হয় না, পুরনো Site চলতেই থাকে।",
        startFrame: 274,
        endFrame: 404,
      },
    ],
  },
  {
    index: 10,
    id: "Scene10",
    title: "শিক্ষা",
    audioFile: "vps-deploy/scene_10_inspirational_scene_10.wav",
    fallbackAudioFile: "vo-part2/scene-10.mp3",
    defaultDurationFrames: 390,
    baseDurationFrames: 360, // 11.480s (345f) + 15f
    subtitles: [
      {
        text: "সেদিন রাফি একটি দামি কথা শিখল।",
        startFrame: 6,
        endFrame: 92,
      },
      {
        text: "Server-এর কাজ Serve করা, Build করা নয়।",
        startFrame: 98,
        endFrame: 206,
      },
      {
        text: "আর তোমার Server-এ কি এখনো Build চলছে? Comment-এ জানাও।",
        startFrame: 216,
        endFrame: 348,
      },
    ],
  },
] as const;

export const PART2_DEFAULT_TOTAL_FRAMES = PART2_SCENES_META.reduce(
  (sum, s) => sum + s.baseDurationFrames,
  0,
);

export type VPSBuildStoryProps = {
  readonly sceneTimings: readonly ResolvedSceneTiming[];
  readonly hasBgMusic: boolean;
};

export const PART2_DEFAULT_PROPS: VPSBuildStoryProps = {
  sceneTimings: PART2_SCENES_META.map((s) => ({
    index: s.index,
    durationInFrames: s.baseDurationFrames,
    audioSrc: s.audioFile,
  })),
  hasBgMusic: false,
};

async function probeAudioDuration(filePath: string): Promise<number | null> {
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

export const calculateVPSBuildMetadata: CalculateMetadataFunction<
  VPSBuildStoryProps
> = async ({ props }) => {
  const resolved = await Promise.all(
    PART2_SCENES_META.map(async (scene): Promise<ResolvedSceneTiming> => {
      const primarySec = await probeAudioDuration(scene.audioFile);
      if (primarySec !== null) {
        return {
          index: scene.index,
          durationInFrames:
            Math.ceil(primarySec * LAYOUT.fps) + PART2_AUDIO_PADDING_FRAMES,
          audioSrc: scene.audioFile,
        };
      }
      const fallbackSec = await probeAudioDuration(scene.fallbackAudioFile);
      if (fallbackSec !== null) {
        return {
          index: scene.index,
          durationInFrames:
            Math.ceil(fallbackSec * LAYOUT.fps) + PART2_AUDIO_PADDING_FRAMES,
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
