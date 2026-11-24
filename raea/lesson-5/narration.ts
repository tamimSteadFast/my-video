export const L5_FPS = 30;
export const L5_WIDTH = 1080;
export const L5_HEIGHT = 1920;

// Clean editorial breathing room per scene — guarantees 0.000s cumulative drift
export const L5_LEAD_SEC = 0.2;
export const L5_TAIL_SEC = 0.3;

export const AUDIO_BASE =
  "/home/tamim/Documents/my-video/public/AI video audio/lesson 5";
export const SFX_BASE = "/home/tamim/Documents/my-video/public/audio/sfx";

// Verified Linux system font stacks (Noto Sans Bengali + Noto Sans + DejaVu Sans Mono)
export const L5_FONT_BN = "'Noto Sans Bengali', 'Noto Sans', sans-serif";
export const L5_FONT_DISPLAY = "'Noto Sans', 'Noto Sans Bengali', sans-serif";
export const L5_FONT_MONO = "'DejaVu Sans Mono', monospace";

// Semantic Color Architecture (Series continuity with Lesson 4 + LLM pipeline roles):
// Electric Cyan = Tokens / Prompt / Inference
// Vivid Violet = Embeddings / Transformer / Training
// Amber = Attention / Probability / Decoding
// Emerald = Complete Response / Production-Ready
export const L5_C = {
  bg: "#040814",
  bgDeep: "#060D22",
  surface: "rgba(9, 17, 40, 0.92)",
  surfaceStrong: "rgba(13, 23, 54, 0.96)",
  surfaceSoft: "rgba(15, 25, 58, 0.72)",
  borderSubtle: "rgba(148, 163, 184, 0.22)",
  borderCyan: "rgba(0, 229, 255, 0.48)",
  borderViolet: "rgba(168, 85, 247, 0.52)",
  borderEmerald: "rgba(16, 185, 129, 0.52)",
  borderAmber: "rgba(245, 158, 11, 0.52)",
  borderRose: "rgba(244, 63, 94, 0.52)",
  cyan: "#00E5FF",
  cyanSoft: "#38BDF8",
  cyanBg: "rgba(0, 229, 255, 0.13)",
  violet: "#A855F7",
  violetSoft: "#C084FC",
  orchid: "#E879F9",
  violetBg: "rgba(168, 85, 247, 0.15)",
  emerald: "#10B981",
  emeraldSoft: "#34D399",
  emeraldBg: "rgba(16, 185, 129, 0.14)",
  amber: "#F59E0B",
  amberSoft: "#FBBF24",
  amberBg: "rgba(245, 158, 11, 0.14)",
  rose: "#F43F5E",
  roseBg: "rgba(244, 63, 94, 0.13)",
  text: "#F8FAFC",
  textMuted: "#CBD5E1",
  textDim: "#94A3B8",
} as const;

export const SPRING_SNAPPY = { damping: 20, stiffness: 210, mass: 0.9 };
export const SPRING_HERO = { damping: 18, stiffness: 165, mass: 1.0 };
export const SPRING_GENTLE = { damping: 22, stiffness: 125, mass: 1.0 };

export type L5Caption = {
  readonly text: string;
  readonly startSec: number;
  readonly endSec: number;
};

export type L5Mood = "dual" | "cyan" | "violet" | "amber" | "emerald";

export type L5SceneId =
  | "scene1"
  | "scene2"
  | "scene3"
  | "scene4"
  | "scene5"
  | "scene6"
  | "scene7"
  | "scene8"
  | "scene9"
  | "scene10";

export type L5SceneMeta = {
  readonly id: L5SceneId;
  readonly number: number;
  readonly title: string;
  readonly badge: string;
  readonly mood: L5Mood;
  readonly file: string;
  readonly voiceSec: number;
  readonly sceneFrames: number;
  readonly captions: readonly L5Caption[];
};

const RAW_SCENES: readonly Omit<L5SceneMeta, "sceneFrames">[] = [
  {
    id: "scene1",
    number: 1,
    title: "How ChatGPT Answers",
    badge: "LESSON 05 · INTRO",
    mood: "dual",
    file: `${AUDIO_BASE}/scene_01_curious_scene_1.wav`,
    voiceSec: 13.64,
    captions: [
      {
        text: "তুমি যখন ChatGPT-কে একটি প্রশ্ন করো,",
        startSec: 0.28,
        endSec: 2.55,
      },
      {
        text: "তখন কয়েক সেকেন্ডের মধ্যেই কীভাবে সে এত সুন্দর উত্তর তৈরি করে?",
        startSec: 2.58,
        endSec: 6.9,
      },
      {
        text: "এর পেছনে রয়েছে একটি Powerful AI Technology,",
        startSec: 7.05,
        endSec: 10.18,
      },
      {
        text: "যার নাম Large Language Model বা LLM।",
        startSec: 10.2,
        endSec: 13.55,
      },
    ],
  },
  {
    id: "scene2",
    number: 2,
    title: "What Is an LLM?",
    badge: "LLM · CORE IDEA",
    mood: "cyan",
    file: `${AUDIO_BASE}/scene_02_explanatory_scene_2.wav`,
    voiceSec: 13.88,
    captions: [
      {
        text: "Large Language Model হলো এমন একটি AI Model,",
        startSec: 0.25,
        endSec: 3.45,
      },
      {
        text: "যেটি বিশাল পরিমাণ Text Data থেকে Language-এর Pattern শেখে",
        startSec: 3.5,
        endSec: 7.05,
      },
      {
        text: "এবং শব্দের গভীর সম্পর্ক বুঝতে শেখে।",
        startSec: 7.08,
        endSec: 9.0,
      },
      {
        text: "এর মূল কাজ হলো Context বুঝে পরবর্তী সম্ভাব্য Token Predict করা।",
        startSec: 9.15,
        endSec: 13.78,
      },
    ],
  },
  {
    id: "scene3",
    number: 3,
    title: "Step 1 · Tokenization",
    badge: "PIPELINE · 01",
    mood: "cyan",
    file: `${AUDIO_BASE}/scene_03_educational_scene_3.wav`,
    voiceSec: 13.16,
    captions: [
      {
        text: "LLM-এর প্রথম গুরুত্বপূর্ণ ধাপ হলো Tokenization।",
        startSec: 0.2,
        endSec: 3.7,
      },
      {
        text: "আমরা যখন একটি Prompt পাঠাই,",
        startSec: 3.9,
        endSec: 5.65,
      },
      {
        text: "তখন সেটিকে ছোট ছোট Token-এ ভাগ করা হয়।",
        startSec: 5.68,
        endSec: 8.35,
      },
      {
        text: "একটি Token সম্পূর্ণ Word হতে পারে,",
        startSec: 8.5,
        endSec: 10.9,
      },
      {
        text: "আবার Word-এর একটি অংশও হতে পারে।",
        startSec: 10.95,
        endSec: 13.08,
      },
    ],
  },
  {
    id: "scene4",
    number: 4,
    title: "Step 2 · Embeddings",
    badge: "PIPELINE · 02",
    mood: "violet",
    file: `${AUDIO_BASE}/scene_04_analytical_scene_4.wav`,
    voiceSec: 14.64,
    captions: [
      {
        text: "এরপর প্রতিটি Token-কে Numerical Vector বা Embedding-এ Convert করা হয়।",
        startSec: 0.18,
        endSec: 4.85,
      },
      {
        text: "কারণ Neural Network সরাসরি Text নিয়ে কাজ করে না।",
        startSec: 5.05,
        endSec: 8.3,
      },
      {
        text: "Numerical Representation ব্যবহার করে Model শব্দের সম্পর্ক",
        startSec: 8.5,
        endSec: 12.78,
      },
      {
        text: "এবং Context Process করতে পারে।",
        startSec: 12.82,
        endSec: 14.55,
      },
    ],
  },
  {
    id: "scene5",
    number: 5,
    title: "Transformer & Attention",
    badge: "PIPELINE · 03",
    mood: "violet",
    file: `${AUDIO_BASE}/scene_05_engaging_scene_5.wav`,
    voiceSec: 18.0,
    captions: [
      {
        text: "এরপর এই Data প্রবেশ করে Transformer Architecture-এ।",
        startSec: 0.16,
        endSec: 3.85,
      },
      {
        text: "Transformer-এর একটি গুরুত্বপূর্ণ Component হলো Self-Attention।",
        startSec: 4.15,
        endSec: 8.25,
      },
      {
        text: "এটি Sentence-এর বিভিন্ন Token-এর মধ্যে সম্পর্ক বিশ্লেষণ করে",
        startSec: 8.4,
        endSec: 12.3,
      },
      {
        text: "এবং কোন Token কোন Context-এ বেশি গুরুত্বপূর্ণ,",
        startSec: 12.35,
        endSec: 16.05,
      },
      {
        text: "তা নির্ধারণ করতে সাহায্য করে।",
        startSec: 16.08,
        endSec: 17.85,
      },
    ],
  },
  {
    id: "scene6",
    number: 6,
    title: "Probability & Decoding",
    badge: "PIPELINE · 04",
    mood: "amber",
    file: `${AUDIO_BASE}/scene_06_explanatory_scene_6.wav`,
    voiceSec: 13.8,
    captions: [
      {
        text: "Transformer Processing-এর পর Model প্রতিটি Token-এর জন্য",
        startSec: 0.25,
        endSec: 4.9,
      },
      {
        text: "Probability Score তৈরি করে।",
        startSec: 4.92,
        endSec: 6.65,
      },
      {
        text: "এরপর Decoding Strategy ব্যবহার করে পরবর্তী Token নির্বাচন করা হয়।",
        startSec: 6.85,
        endSec: 11.2,
      },
      {
        text: "এই প্রক্রিয়াটি বারবার চলতে থাকে।",
        startSec: 11.45,
        endSec: 13.7,
      },
    ],
  },
  {
    id: "scene7",
    number: 7,
    title: "Next Token Prediction",
    badge: "AUTOREGRESSIVE LOOP",
    mood: "cyan",
    file: `${AUDIO_BASE}/scene_07_analytical_scene_7.wav`,
    voiceSec: 14.28,
    captions: [
      {
        text: "এই পুরো প্রক্রিয়াকে আমরা Next Token Prediction বলতে পারি।",
        startSec: 0.2,
        endSec: 3.8,
      },
      {
        text: "অর্থাৎ Model একটি Token Generate করে,",
        startSec: 3.88,
        endSec: 6.42,
      },
      {
        text: "সেটিকে Context-এর সঙ্গে যুক্ত করে",
        startSec: 6.48,
        endSec: 8.52,
      },
      {
        text: "এবং আবার পরবর্তী Token Predict করে।",
        startSec: 8.58,
        endSec: 11.0,
      },
      {
        text: "এভাবেই ধীরে ধীরে একটি সম্পূর্ণ Response তৈরি হয়।",
        startSec: 11.15,
        endSec: 14.1,
      },
    ],
  },
  {
    id: "scene8",
    number: 8,
    title: "Training vs Inference",
    badge: "CORE COMPARISON",
    mood: "dual",
    file: `${AUDIO_BASE}/scene_08_educational_scene_8.wav`,
    voiceSec: 14.48,
    captions: [
      {
        text: "LLM বোঝার জন্য Training এবং Inference-এর পার্থক্য জানা জরুরি।",
        startSec: 0.22,
        endSec: 4.15,
      },
      {
        text: "Training-এর সময় Model বিশাল Data থেকে শেখে ও Parameters Update হয়।",
        startSec: 4.3,
        endSec: 8.72,
      },
      {
        text: "অন্যদিকে Inference-এর সময় Trained Model ব্যবহার করে",
        startSec: 8.85,
        endSec: 12.42,
      },
      {
        text: "User-এর Prompt অনুযায়ী Response Generate করে।",
        startSec: 12.45,
        endSec: 14.35,
      },
    ],
  },
  {
    id: "scene9",
    number: 9,
    title: "AI Engineer Toolkit",
    badge: "PRODUCTION SKILLS",
    mood: "emerald",
    file: `${AUDIO_BASE}/scene_09_professional_scene_9.wav`,
    voiceSec: 15.36,
    captions: [
      {
        text: "একজন AI Engineer হিসেবে আমাদের Tokenization, Embedding,",
        startSec: 0.2,
        endSec: 5.3,
      },
      {
        text: "Transformer, Context Window, Token Usage এবং Inference",
        startSec: 5.32,
        endSec: 9.0,
      },
      {
        text: "সম্পর্কে পরিষ্কার ধারণা থাকতে হবে।",
        startSec: 9.02,
        endSec: 10.35,
      },
      {
        text: "কারণ এগুলো দিয়েই আমরা Efficient ও Production-ready AI App তৈরি করি।",
        startSec: 10.45,
        endSec: 15.22,
      },
    ],
  },
  {
    id: "scene10",
    number: 10,
    title: "Recap & Next Lesson",
    badge: "LESSON 05 · OUTRO",
    mood: "dual",
    file: `${AUDIO_BASE}/scene_10_inspirational_scene_10.wav`,
    voiceSec: 11.84,
    captions: [
      {
        text: "এখন তুমি জানো একটি LLM কীভাবে কাজ করে।",
        startSec: 0.2,
        endSec: 3.12,
      },
      {
        text: "পরবর্তী ধাপে আমরা আরও গভীরে গিয়ে",
        startSec: 3.22,
        endSec: 5.58,
      },
      {
        text: "Tokenization এবং Embedding নিয়ে শিখব।",
        startSec: 5.6,
        endSec: 8.0,
      },
      {
        text: "AI Engineering শেখার এই Journey-তে আমাদের সঙ্গে থাকো।",
        startSec: 8.12,
        endSec: 11.74,
      },
    ],
  },
];

export const L5_SCENES: readonly L5SceneMeta[] = RAW_SCENES.map((s) => ({
  ...s,
  sceneFrames: Math.ceil((L5_LEAD_SEC + s.voiceSec + L5_TAIL_SEC) * L5_FPS),
}));

export const L5_TOTAL_FRAMES = L5_SCENES.reduce(
  (sum, s) => sum + s.sceneFrames,
  0,
);

export const getL5Scene = (id: L5SceneId): L5SceneMeta => {
  const found = L5_SCENES.find((s) => s.id === id);
  if (!found) throw new Error(`Lesson 5 scene not found: ${id}`);
  return found;
};

export const getL5SceneStart = (id: L5SceneId): number => {
  let acc = 0;
  for (const s of L5_SCENES) {
    if (s.id === id) return acc;
    acc += s.sceneFrames;
  }
  return acc;
};
