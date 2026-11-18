import { loadFont as loadNotoSansBengali } from "@remotion/google-fonts/NotoSansBengali";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
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

export const LLM_FONT = `${bengaliFont}, ${plusJakarta}, sans-serif`;
export const LLM_MONO = `${jetBrains}, monospace`;

// Timing buffers per scene so transitions & breathing room feel like a senior documentary edit
export const LLM_LEAD_SEC = 0.25;
export const LLM_TAIL_SEC = 0.35;

// Global Instruction 1: Maintain a consistent dark navy and cyan technology visual identity.
export const LLM_C = {
  bg: "#040814",
  navy: "#081026",
  panel: "#0B1631",
  panelElevated: "#101F42",
  border: "rgba(0, 229, 255, 0.22)",
  borderSubtle: "rgba(148, 163, 184, 0.16)",
  cyan: "#00E5FF",
  cyanSoft: "#38BDF8",
  cyanDeep: "#0284C7",
  indigo: "#6366F1",
  emerald: "#10B981",
  amber: "#F59E0B",
  rose: "#F43F5E",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  textDim: "#64748B",
} as const;

export type LlmSceneId =
  | "scene1"
  | "scene2"
  | "scene3"
  | "scene4"
  | "scene5"
  | "scene6"
  | "scene7"
  | "scene8";

export type LlmSceneMeta = {
  readonly id: LlmSceneId;
  readonly number: number;
  readonly title: string;
  readonly onScreenText: string;
  readonly transitionType: string;
  readonly file: string;
  readonly voiceSec: number;
  readonly sceneFrames: number;
  readonly captions: readonly Caption[];
};

const RAW_SCENES: readonly {
  readonly id: LlmSceneId;
  readonly number: number;
  readonly title: string;
  readonly onScreenText: string;
  readonly transitionType: string;
  readonly file: string;
  readonly voiceSec: number;
  readonly extraTailSec?: number;
  readonly captions: readonly Caption[];
}[] = [
  {
    id: "scene1",
    number: 1,
    title: "LLM Introduction",
    onScreenText: "How Do Large Language Models Work?",
    transitionType: "Smooth fade in",
    file: "AI video audio/lesson1/scene_01_curious_scene_1.wav",
    voiceSec: 13.64,
    captions: [
      {
        text: "তুমি যখন ChatGPT-কে একটি প্রশ্ন করো,",
        startSec: 0.15,
        endSec: 2.7,
      },
      {
        text: "তখন কীভাবে সে এত দ্রুত উত্তর তৈরি করে?",
        startSec: 2.7,
        endSec: 5.85,
      },
      {
        text: "এর পেছনে কাজ করে Large Language Model, সংক্ষেপে LLM।",
        startSec: 5.85,
        endSec: 10.3,
      },
      {
        text: "আজ আমরা জানব, এই Model আসলে কীভাবে কাজ করে।",
        startSec: 10.3,
        endSec: 13.5,
      },
    ],
  },
  {
    id: "scene2",
    number: 2,
    title: "Tokenization",
    onScreenText: "Text → Tokens → Token IDs",
    transitionType: "Segmented slide",
    file: "AI video audio/lesson1/scene_02_explanatory_scene_2.wav",
    voiceSec: 13.8,
    captions: [
      {
        text: "প্রথমে Model-এর কাছে পাঠানো Text-কে ছোট ছোট অংশে ভাগ করা হয়।",
        startSec: 0.15,
        endSec: 4.15,
      },
      {
        text: "এই অংশগুলোকে বলা হয় Token।",
        startSec: 4.15,
        endSec: 6.4,
      },
      {
        text: "আর Text-কে Token-এ ভাগ করার Process-এর নাম Tokenization।",
        startSec: 6.4,
        endSec: 10.2,
      },
      {
        text: "প্রতিটি Token-এর সঙ্গে একটি Numeric ID যুক্ত থাকে।",
        startSec: 10.2,
        endSec: 13.6,
      },
    ],
  },
  {
    id: "scene3",
    number: 3,
    title: "Embeddings",
    onScreenText: "Token IDs → Embeddings",
    transitionType: "Morph transition",
    file: "AI video audio/lesson1/scene_03_educational_scene_3.wav",
    voiceSec: 13.8,
    captions: [
      {
        text: "এরপর Token ID-গুলো Embedding-এর মাধ্যমে",
        startSec: 0.2,
        endSec: 3.9,
      },
      {
        text: "Numerical Vector-এ রূপান্তরিত হয়।",
        startSec: 3.9,
        endSec: 6.65,
      },
      {
        text: "এই Vector ব্যবহার করে Neural Network Language-এর",
        startSec: 6.65,
        endSec: 10.1,
      },
      {
        text: "বিভিন্ন Pattern এবং Context Process করতে পারে।",
        startSec: 10.1,
        endSec: 13.65,
      },
    ],
  },
  {
    id: "scene4",
    number: 4,
    title: "Transformer Architecture",
    onScreenText: "Transformer = Attention + Neural Network Layers",
    transitionType: "Technical zoom",
    file: "AI video audio/lesson1/scene_04_analytical_scene_4.wav",
    voiceSec: 14.6,
    captions: [
      {
        text: "আধুনিক অধিকাংশ General-purpose LLM-এর ভিত্তি হলো Transformer Architecture।",
        startSec: 0.2,
        endSec: 5.25,
      },
      {
        text: "এর একটি গুরুত্বপূর্ণ অংশ হলো Self-Attention।",
        startSec: 5.25,
        endSec: 8.25,
      },
      {
        text: "এর মাধ্যমে Model Context-এর বিভিন্ন Token-এর মধ্যে সম্পর্ক বুঝে",
        startSec: 8.25,
        endSec: 11.7,
      },
      {
        text: "Relevant Information ব্যবহার করতে পারে।",
        startSec: 11.7,
        endSec: 14.4,
      },
    ],
  },
  {
    id: "scene5",
    number: 5,
    title: "Self-Attention",
    onScreenText: "Query • Key • Value",
    transitionType: "Light sweep",
    file: "AI video audio/lesson1/scene_05_explanatory_scene_5.wav",
    voiceSec: 19.84,
    captions: [
      {
        text: "Self-Attention বুঝতে Query, Key এবং Value জানতে হবে।",
        startSec: 0.2,
        endSec: 4.75,
      },
      {
        text: "Query হলো কী Information খোঁজা হচ্ছে,",
        startSec: 4.75,
        endSec: 7.9,
      },
      {
        text: "Key হলো অন্য Token-এর পরিচিতি,",
        startSec: 7.9,
        endSec: 10.45,
      },
      {
        text: "এবং Value হলো সেই Token থেকে পাওয়া Information।",
        startSec: 10.45,
        endSec: 14.35,
      },
      {
        text: "এই প্রক্রিয়ায় Model Context অনুযায়ী গুরুত্বপূর্ণ Token-গুলোকে বেশি গুরুত্ব দিতে পারে।",
        startSec: 14.35,
        endSec: 19.65,
      },
    ],
  },
  {
    id: "scene6",
    number: 6,
    title: "Next Token Prediction",
    onScreenText: "Predict → Append → Predict Again",
    transitionType: "Sequential text reveal",
    file: "AI video audio/lesson1/scene_06_engaging_scene_6.wav",
    voiceSec: 14.76,
    captions: [
      {
        text: "LLM সাধারণত একবারে পুরো উত্তর তৈরি করে না।",
        startSec: 0.15,
        endSec: 3.65,
      },
      {
        text: "এটি পরবর্তী Token Predict করে।",
        startSec: 3.65,
        endSec: 5.8,
      },
      {
        text: "তারপর সেই Token-কে আগের Context-এর সঙ্গে যুক্ত করে আবার পরবর্তী Token Predict করে।",
        startSec: 5.8,
        endSec: 11.6,
      },
      {
        text: "এভাবে ধাপে ধাপে সম্পূর্ণ উত্তর তৈরি হয়।",
        startSec: 11.6,
        endSec: 14.55,
      },
    ],
  },
  {
    id: "scene7",
    number: 7,
    title: "Training and Inference",
    onScreenText: "Training ≠ Inference",
    transitionType: "Split-screen fade",
    file: "AI video audio/lesson1/scene_07_analytical_scene_7.wav",
    voiceSec: 12.56,
    captions: [
      {
        text: "Training-এর সময় Model Data থেকে শেখে এবং তার Weights Update হয়।",
        startSec: 0.2,
        endSec: 4.9,
      },
      {
        text: "কিন্তু Inference-এর সময় Model আগে শেখা Weights ব্যবহার করে নতুন উত্তর তৈরি করে।",
        startSec: 4.9,
        endSec: 10.55,
      },
      {
        text: "এই দুটি Process এক নয়।",
        startSec: 10.55,
        endSec: 12.4,
      },
    ],
  },
  {
    id: "scene8",
    number: 8,
    title: "LLM Engineering",
    onScreenText: "Understand the Model. Engineer the System.",
    transitionType: "Cinematic fade out",
    file: "AI video audio/lesson1/scene_08_inspirational_scene_8.wav",
    voiceSec: 19.28,
    extraTailSec: 1.0,
    captions: [
      {
        text: "একজন AI Engineer হিসেবে শুধু LLM ব্যবহার করলেই হবে না।",
        startSec: 0.2,
        endSec: 4.5,
      },
      {
        text: "Token Cost, Context Window, Latency,",
        startSec: 4.5,
        endSec: 8.6,
      },
      {
        text: "Hallucination এবং Response Quality বুঝতে হবে।",
        startSec: 8.6,
        endSec: 12.6,
      },
      {
        text: "কারণ একটি ভালো AI Application তৈরি করতে",
        startSec: 12.6,
        endSec: 15.65,
      },
      {
        text: "Model-এর পাশাপাশি পুরো System-কে Engineer করতে হয়।",
        startSec: 15.65,
        endSec: 19.1,
      },
    ],
  },
];

export const LLM_SCENES: readonly LlmSceneMeta[] = RAW_SCENES.map((s) => ({
  id: s.id,
  number: s.number,
  title: s.title,
  onScreenText: s.onScreenText,
  transitionType: s.transitionType,
  file: s.file,
  voiceSec: s.voiceSec,
  sceneFrames: Math.round(
    (LLM_LEAD_SEC + s.voiceSec + LLM_TAIL_SEC + (s.extraTailSec ?? 0)) * FPS,
  ),
  captions: s.captions,
}));

export const getLlmScene = (id: LlmSceneId): LlmSceneMeta => {
  const found = LLM_SCENES.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown LLM scene: ${id}`);
  return found;
};

export const getLlmSceneStart = (id: LlmSceneId): number => {
  let acc = 0;
  for (const s of LLM_SCENES) {
    if (s.id === id) return acc;
    acc += s.sceneFrames;
  }
  throw new Error(`Unknown LLM scene: ${id}`);
};

export const LLM_TOTAL_FRAMES = LLM_SCENES.reduce(
  (sum, s) => sum + s.sceneFrames,
  0,
);
