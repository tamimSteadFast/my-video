import { loadFont as loadNotoSansBengali } from "@remotion/google-fonts/NotoSansBengali";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { z } from "zod";
import { FPS } from "../../shared/theme";
import type { Caption } from "../../shared/captions";

const { fontFamily: bengaliFont } = loadNotoSansBengali("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
});

const { fontFamily: plusJakarta } = loadPlusJakartaSans("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

const { fontFamily: jetBrains } = loadJetBrainsMono("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const AIE_FONT = `${bengaliFont}, ${plusJakarta}, sans-serif`;
export const AIE_DISPLAY = `${plusJakarta}, ${bengaliFont}, sans-serif`;
export const AIE_MONO = `${jetBrains}, monospace`;

export const aiEngineerSchema = z.object({
  showSubtitles: z.boolean().default(true),
});

export type AiEngineerProps = z.infer<typeof aiEngineerSchema>;

// Documentary editorial pacing buffers around each scene's voiceover
export const AIE_LEAD_SEC = 0.25;
export const AIE_TAIL_SEC = 0.35;

// Dark Blue & Royal Purple Cinematic Tech Documentary Palette
export const AIE_C = {
  bg: "#040714",
  bgDeep: "#070B1E",
  panel: "rgba(10, 16, 38, 0.84)",
  panelSolid: "#0B122B",
  panelElevated: "rgba(18, 25, 58, 0.9)",
  borderBlue: "rgba(56, 189, 248, 0.28)",
  borderPurple: "rgba(168, 85, 247, 0.34)",
  borderSubtle: "rgba(148, 163, 184, 0.16)",
  blue: "#38BDF8",
  cyan: "#00E5FF",
  indigo: "#6366F1",
  purple: "#A855F7",
  violet: "#7C3AED",
  emerald: "#10B981",
  amber: "#F59E0B",
  rose: "#F43F5E",
  text: "#F8FAFC",
  textMuted: "#CBD5E1",
  textDim: "#94A3B8",
} as const;

export type AieSceneId =
  | "scene1"
  | "scene2"
  | "scene3"
  | "scene4"
  | "scene5"
  | "scene6"
  | "scene7"
  | "scene8";

export type AieTransition =
  | "fade"
  | "push-zoom"
  | "slide-left"
  | "light-sweep"
  | "cinematic-outro";

export type AieSceneMeta = {
  readonly id: AieSceneId;
  readonly number: number;
  readonly title: string;
  readonly badge: string;
  readonly transitionStyle: AieTransition;
  readonly file: string;
  readonly voiceSec: number;
  readonly sceneFrames: number;
  readonly captions: readonly Caption[];
};

const AUDIO_DIR = "AI video audio/lesson 1";

const RAW_SCENES: readonly {
  readonly id: AieSceneId;
  readonly number: number;
  readonly title: string;
  readonly badge: string;
  readonly transitionStyle: AieTransition;
  readonly file: string;
  readonly voiceSec: number;
  readonly extraTailSec?: number;
  readonly captions: readonly Caption[];
}[] = [
  {
    id: "scene1",
    number: 1,
    title: "The AI-Powered Digital World",
    badge: "ChatGPT • Image AI • Coding Assistants",
    transitionStyle: "fade",
    file: `${AUDIO_DIR}/scene_01_curious_scene_1.wav`,
    voiceSec: 15.8,
    captions: [
      {
        text: "আমরা প্রতিদিন ChatGPT ব্যবহার করছি,",
        startSec: 0.15,
        endSec: 2.65,
      },
      {
        text: "AI দিয়ে ছবি তৈরি করছি,",
        startSec: 2.7,
        endSec: 4.4,
      },
      {
        text: "এমনকি AI Coding Assistant দিয়ে Software Development-ও করছি।",
        startSec: 4.45,
        endSec: 8.55,
      },
      {
        text: "কিন্তু যারা এসব Intelligent System তৈরি করেন, তাদের আমরা কী বলি?",
        startSec: 8.9,
        endSec: 13.4,
      },
      {
        text: "তারা হলেন AI Engineer।",
        startSec: 13.75,
        endSec: 15.72,
      },
    ],
  },
  {
    id: "scene2",
    number: 2,
    title: "Who Is an AI Engineer?",
    badge: "Design • Develop • Integrate • Deploy",
    transitionStyle: "push-zoom",
    file: `${AUDIO_DIR}/scene_02_explanatory_scene_2.wav`,
    voiceSec: 16.44,
    captions: [
      {
        text: "AI Engineer হলেন একজন Software Professional,",
        startSec: 0.15,
        endSec: 2.95,
      },
      {
        text: "যিনি Artificial Intelligence ব্যবহার করে",
        startSec: 3.0,
        endSec: 5.45,
      },
      {
        text: "Intelligent Software System Design, Develop, Integrate এবং Deploy করেন।",
        startSec: 5.5,
        endSec: 10.15,
      },
      {
        text: "তাদের মূল লক্ষ্য হলো AI Technology ব্যবহার করে বাস্তব জীবনের সমস্যার কার্যকর সমাধান তৈরি করা।",
        startSec: 10.35,
        endSec: 16.25,
      },
    ],
  },
  {
    id: "scene3",
    number: 3,
    title: "Real-World Example: E-Commerce AI",
    badge: "Traditional Software + AI Intelligence",
    transitionStyle: "slide-left",
    file: `${AUDIO_DIR}/scene_03_analytical_scene_3.wav`,
    voiceSec: 17.4,
    captions: [
      {
        text: "ধরো, তুমি একটি E-commerce Application তৈরি করছ।",
        startSec: 0.05,
        endSec: 3.05,
      },
      {
        text: "একজন Traditional Software Engineer Product Management, Database, API এবং Payment System তৈরি করবেন।",
        startSec: 3.25,
        endSec: 10.1,
      },
      {
        text: "কিন্তু একজন AI Engineer এখানে Intelligent Product Recommendation",
        startSec: 10.35,
        endSec: 14.5,
      },
      {
        text: "এবং AI Customer Support System যুক্ত করতে পারেন।",
        startSec: 14.55,
        endSec: 17.28,
      },
    ],
  },
  {
    id: "scene4",
    number: 4,
    title: "Core Responsibilities",
    badge: "Prompts • RAG • Agents • APIs • Production",
    transitionStyle: "light-sweep",
    file: `${AUDIO_DIR}/scene_04_educational_scene_4.wav`,
    voiceSec: 12.96,
    captions: [
      {
        text: "একজন AI Engineer-এর গুরুত্বপূর্ণ কাজগুলোর মধ্যে রয়েছে",
        startSec: 0.15,
        endSec: 3.7,
      },
      {
        text: "AI Model Integration, Prompt Engineering,",
        startSec: 3.75,
        endSec: 6.6,
      },
      {
        text: "RAG Development, AI Agent তৈরি,",
        startSec: 6.65,
        endSec: 9.45,
      },
      {
        text: "Backend API Development এবং Production Deployment।",
        startSec: 9.55,
        endSec: 12.82,
      },
    ],
  },
  {
    id: "scene5",
    number: 5,
    title: "Modern AI Engineering Stack",
    badge: "Python • FastAPI • LLMs • Vector DB • Cloud",
    transitionStyle: "push-zoom",
    file: `${AUDIO_DIR}/scene_05_explanatory_scene_5.wav`,
    voiceSec: 11.44,
    captions: [
      {
        text: "এই কাজগুলো করার জন্য",
        startSec: 0.15,
        endSec: 1.72,
      },
      {
        text: "Python, JavaScript, FastAPI,",
        startSec: 1.75,
        endSec: 4.5,
      },
      {
        text: "Large Language Models, Vector Database, LangChain",
        startSec: 4.55,
        endSec: 7.85,
      },
      {
        text: "এবং Cloud Technologies-এর মতো বিভিন্ন Technology ব্যবহার করা হয়।",
        startSec: 7.9,
        endSec: 11.35,
      },
    ],
  },
  {
    id: "scene6",
    number: 6,
    title: "Pre-Trained Model Integration",
    badge: "Integrate Existing Models into Applications",
    transitionStyle: "slide-left",
    file: `${AUDIO_DIR}/scene_06_analytical_scene_6.wav`,
    voiceSec: 15.24,
    captions: [
      {
        text: "একটি বিষয় মনে রাখতে হবে।",
        startSec: 0.15,
        endSec: 1.65,
      },
      {
        text: "AI Engineer মানেই নিজে একটি AI Model তৈরি বা Train করা নয়।",
        startSec: 1.75,
        endSec: 6.15,
      },
      {
        text: "অনেক সময় Existing Pre-trained Model ব্যবহার করে",
        startSec: 6.4,
        endSec: 10.35,
      },
      {
        text: "সেটিকে Software Application-এর সঙ্গে Integrate করাই একজন AI Engineer-এর প্রধান কাজ।",
        startSec: 10.4,
        endSec: 15.12,
      },
    ],
  },
  {
    id: "scene7",
    number: 7,
    title: "Complete Intelligent Architecture",
    badge: "UI ↔ API ↔ Backend ↔ Database + AI Model",
    transitionStyle: "light-sweep",
    file: `${AUDIO_DIR}/scene_07_inspirational_scene_7.wav`,
    voiceSec: 13.0,
    captions: [
      {
        text: "একজন AI Engineer শুধু AI Model ব্যবহার করেন না।",
        startSec: 0.1,
        endSec: 3.75,
      },
      {
        text: "তিনি সেই Model-কে Database, Backend, API এবং User Interface-এর সঙ্গে যুক্ত করে",
        startSec: 3.9,
        endSec: 9.55,
      },
      {
        text: "একটি সম্পূর্ণ Intelligent Software System তৈরি করেন।",
        startSec: 9.6,
        endSec: 12.88,
      },
    ],
  },
  {
    id: "scene8",
    number: 8,
    title: "Your AI Engineering Journey",
    badge: "Next: AI Engineer vs ML Engineer",
    transitionStyle: "cinematic-outro",
    file: `${AUDIO_DIR}/scene_08_motivational_scene_8.wav`,
    voiceSec: 12.36,
    extraTailSec: 1.0,
    captions: [
      {
        text: "আমাদের এই Learning Journey-তে আমরা Step by Step AI Engineering শিখব",
        startSec: 0.15,
        endSec: 4.55,
      },
      {
        text: "এবং বাস্তব Project তৈরি করব।",
        startSec: 4.6,
        endSec: 6.6,
      },
      {
        text: "পরবর্তী Lesson-এ আমরা জানব AI Engineer এবং Machine Learning Engineer-এর মধ্যে পার্থক্য কী।",
        startSec: 6.9,
        endSec: 12.25,
      },
    ],
  },
];

export const AIE_SCENES: readonly AieSceneMeta[] = RAW_SCENES.map((s) => ({
  id: s.id,
  number: s.number,
  title: s.title,
  badge: s.badge,
  transitionStyle: s.transitionStyle,
  file: s.file,
  voiceSec: s.voiceSec,
  sceneFrames: Math.round(
    (AIE_LEAD_SEC + s.voiceSec + AIE_TAIL_SEC + (s.extraTailSec ?? 0)) * FPS,
  ),
  captions: s.captions,
}));

export const getAieScene = (id: AieSceneId): AieSceneMeta => {
  const found = AIE_SCENES.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown AI Engineer scene: ${id}`);
  return found;
};

export const getAieSceneStart = (id: AieSceneId): number => {
  let acc = 0;
  for (const s of AIE_SCENES) {
    if (s.id === id) return acc;
    acc += s.sceneFrames;
  }
  throw new Error(`Unknown AI Engineer scene: ${id}`);
};

export const AIE_TOTAL_FRAMES = AIE_SCENES.reduce(
  (sum, s) => sum + s.sceneFrames,
  0,
);
