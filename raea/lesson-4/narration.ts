export const L4_FPS = 30;
export const L4_WIDTH = 1080;
export const L4_HEIGHT = 1920;

// Clean editorial breathing room per scene — guarantees 0 cumulative drift
export const L4_LEAD_SEC = 0.2;
export const L4_TAIL_SEC = 0.3;

export const AUDIO_BASE =
  "/home/tamim/Documents/my-video/public/AI video audio/lesson 4";
export const SFX_BASE = "/home/tamim/Documents/my-video/public/audio/sfx";

// Local system fonts verified on Linux (NotoSansBengali + NotoSans + DejaVu Sans Mono)
export const L4_FONT_BN = "'Noto Sans Bengali', 'Noto Sans', sans-serif";
export const L4_FONT_DISPLAY = "'Noto Sans', 'Noto Sans Bengali', sans-serif";
export const L4_FONT_MONO = "'DejaVu Sans Mono', monospace";

// Semantic Color Architecture:
// Electric Cyan = AI Engineer | Vivid Violet = ML Engineer
// Emerald = Production / Launch | Amber = Data / Metrics
export const L4_C = {
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
  cyan: "#00E5FF",
  cyanSoft: "#38BDF8",
  cyanBg: "rgba(0, 229, 255, 0.13)",
  violet: "#A855F7",
  violetSoft: "#C084FC",
  orchid: "#E879F9",
  violetBg: "rgba(168, 85, 247, 0.14)",
  emerald: "#10B981",
  emeraldSoft: "#34D399",
  emeraldBg: "rgba(16, 185, 129, 0.14)",
  amber: "#F59E0B",
  amberSoft: "#FBBF24",
  amberBg: "rgba(245, 158, 11, 0.14)",
  rose: "#F43F5E",
  text: "#F8FAFC",
  textMuted: "#CBD5E1",
  textDim: "#94A3B8",
} as const;

export const SPRING_SNAPPY = { damping: 20, stiffness: 210, mass: 0.9 };
export const SPRING_HERO = { damping: 18, stiffness: 165, mass: 1.0 };
export const SPRING_GENTLE = { damping: 22, stiffness: 125, mass: 1.0 };

export type L4Caption = {
  readonly text: string;
  readonly startSec: number;
  readonly endSec: number;
};

export type L4RoleMood = "dual" | "ai" | "ml" | "emerald";

export type L4SceneId =
  | "scene1"
  | "scene2"
  | "scene3"
  | "scene4"
  | "scene5"
  | "scene6"
  | "scene7"
  | "scene8"
  | "scene9";

export type L4SceneMeta = {
  readonly id: L4SceneId;
  readonly number: number;
  readonly title: string;
  readonly badge: string;
  readonly mood: L4RoleMood;
  readonly file: string;
  readonly voiceSec: number;
  readonly sceneFrames: number;
  readonly captions: readonly L4Caption[];
};

const RAW_SCENES: readonly Omit<L4SceneMeta, "sceneFrames">[] = [
  {
    id: "scene1",
    number: 1,
    title: "AI vs ML Engineer",
    badge: "LESSON 04 · INTRO",
    mood: "dual",
    file: `${AUDIO_BASE}/scene_01_curious_scene_1.wav`,
    voiceSec: 10.96,
    captions: [
      {
        text: "তুমি যদি AI Engineering শিখতে চাও,",
        startSec: 0.15,
        endSec: 2.25,
      },
      {
        text: "তাহলে প্রথমেই একটি বিষয় পরিষ্কারভাবে জানা দরকার।",
        startSec: 2.25,
        endSec: 5.1,
      },
      {
        text: "AI Engineer এবং ML Engineer কি একই কাজ করেন?",
        startSec: 5.35,
        endSec: 8.55,
      },
      {
        text: "নাকি তাদের মধ্যে রয়েছে গুরুত্বপূর্ণ পার্থক্য?",
        startSec: 8.55,
        endSec: 10.96,
      },
    ],
  },
  {
    id: "scene2",
    number: 2,
    title: "What AI Engineers Build",
    badge: "AI ENGINEER · STACK",
    mood: "ai",
    file: `${AUDIO_BASE}/scene_02_explanatory_scene_2.wav`,
    voiceSec: 14.72,
    captions: [
      {
        text: "একজন AI Engineer মূলত Existing ও Pre-trained AI Model ব্যবহার করে",
        startSec: 0.2,
        endSec: 4.15,
      },
      {
        text: "বাস্তব Software Application তৈরি করেন।",
        startSec: 4.15,
        endSec: 8.5,
      },
      {
        text: "তিনি AI Model-কে Backend, API,",
        startSec: 8.75,
        endSec: 11.5,
      },
      {
        text: "Database এবং Frontend-এর সঙ্গে Integrate করেন।",
        startSec: 11.5,
        endSec: 14.72,
      },
    ],
  },
  {
    id: "scene3",
    number: 3,
    title: "AI Support Chatbot + RAG",
    badge: "AI EXAMPLE · CHATBOT",
    mood: "ai",
    file: `${AUDIO_BASE}/scene_03_practical_scene_3.wav`,
    voiceSec: 17.32,
    captions: [
      {
        text: "ধরো, তুমি একটি AI Customer Support Chatbot তৈরি করতে চাও।",
        startSec: 0.15,
        endSec: 4.45,
      },
      {
        text: "একজন AI Engineer OpenAI বা Gemini API ব্যবহার করে Chatbot তৈরি করতে পারেন।",
        startSec: 4.75,
        endSec: 10.2,
      },
      {
        text: "পাশাপাশি RAG এবং Vector Database ব্যবহার করে",
        startSec: 10.45,
        endSec: 14.0,
      },
      {
        text: "Company-এর নিজস্ব Document থেকে উত্তর দেওয়ার ব্যবস্থা করতে পারেন।",
        startSec: 14.0,
        endSec: 17.32,
      },
    ],
  },
  {
    id: "scene4",
    number: 4,
    title: "ML Engineer Pipeline",
    badge: "ML ENGINEER · WORKFLOW",
    mood: "ml",
    file: `${AUDIO_BASE}/scene_04_analytical_scene_4.wav`,
    voiceSec: 14.6,
    captions: [
      {
        text: "অন্যদিকে, একজন ML Engineer মূলত Data ও Machine Learning Model নিয়ে কাজ করেন।",
        startSec: 0.15,
        endSec: 6.25,
      },
      {
        text: "তিনি Data Preprocessing, Feature Engineering,",
        startSec: 6.25,
        endSec: 9.25,
      },
      {
        text: "Model Training, Fine-tuning, Evaluation",
        startSec: 9.25,
        endSec: 12.35,
      },
      {
        text: "এবং Model Deployment-এর মতো কাজ করেন।",
        startSec: 12.35,
        endSec: 14.6,
      },
    ],
  },
  {
    id: "scene5",
    number: 5,
    title: "E-Commerce Recommendations",
    badge: "ML EXAMPLE · RECSYS",
    mood: "ml",
    file: `${AUDIO_BASE}/scene_05_explanatory_scene_5.wav`,
    voiceSec: 15.28,
    captions: [
      {
        text: "ধরো, একটি E-commerce Website তার Customer-দের জন্য Product Recommendation System তৈরি করতে চায়।",
        startSec: 0.15,
        endSec: 6.2,
      },
      {
        text: "একজন ML Engineer Customer-এর পুরোনো Activity ও Purchase History বিশ্লেষণ করে",
        startSec: 6.35,
        endSec: 12.2,
      },
      {
        text: "Recommendation Model তৈরি ও Train করতে পারেন।",
        startSec: 12.2,
        endSec: 15.28,
      },
    ],
  },
  {
    id: "scene6",
    number: 6,
    title: "The Core Difference",
    badge: "CORE COMPARISON",
    mood: "dual",
    file: `${AUDIO_BASE}/scene_06_educational_scene_6.wav`,
    voiceSec: 14.88,
    captions: [
      {
        text: "তাহলে মূল পার্থক্যটা কোথায়?",
        startSec: 0.2,
        endSec: 2.35,
      },
      {
        text: "AI Engineer-এর Focus হলো AI Model ব্যবহার করে Intelligent Application তৈরি করা।",
        startSec: 2.65,
        endSec: 8.1,
      },
      {
        text: "আর ML Engineer-এর Focus হলো Data থেকে Model তৈরি, Train, Optimize ও Deploy করা।",
        startSec: 8.25,
        endSec: 14.88,
      },
    ],
  },
  {
    id: "scene7",
    number: 7,
    title: "Where Both Roles Overlap",
    badge: "SHARED BOUNDARY",
    mood: "dual",
    file: `${AUDIO_BASE}/scene_07_analytical_scene_7.wav`,
    voiceSec: 12.2,
    captions: [
      {
        text: "তবে মনে রাখবে, এই দুই Role-এর মধ্যে সবসময় কঠোর সীমারেখা থাকে না।",
        startSec: 0.15,
        endSec: 4.7,
      },
      {
        text: "একজন AI Engineer-ও Model Fine-tuning করতে পারেন।",
        startSec: 4.85,
        endSec: 8.2,
      },
      {
        text: "আবার একজন ML Engineer-ও Pre-trained Model ব্যবহার করতে পারেন।",
        startSec: 8.25,
        endSec: 12.2,
      },
    ],
  },
  {
    id: "scene8",
    number: 8,
    title: "Web Dev → AI Roadmap",
    badge: "START ROADMAP",
    mood: "emerald",
    file: `${AUDIO_BASE}/scene_08_inspirational_scene_8.wav`,
    voiceSec: 17.12,
    captions: [
      {
        text: "তুমি যদি Web Developer হও, তাহলে AI Engineering দিয়ে শুরু করা Practical Approach হতে পারে।",
        startSec: 0.2,
        endSec: 6.25,
      },
      {
        text: "প্রথমে Python, LLM API, Prompt Engineering,",
        startSec: 6.45,
        endSec: 10.4,
      },
      {
        text: "Embeddings, Vector Database এবং RAG শেখো।",
        startSec: 10.4,
        endSec: 13.6,
      },
      {
        text: "এরপর নিজের AI-powered Application তৈরি করো।",
        startSec: 13.8,
        endSec: 17.12,
      },
    ],
  },
  {
    id: "scene9",
    number: 9,
    title: "Build Real Apps · Next Up",
    badge: "MISSION & NEXT",
    mood: "dual",
    file: `${AUDIO_BASE}/scene_09_energetic_scene_9.wav`,
    voiceSec: 14.8,
    captions: [
      {
        text: "আমাদের লক্ষ্য শুধু AI জানা নয়, বরং Step by Step বাস্তব AI Application তৈরি করা।",
        startSec: 0.2,
        endSec: 6.75,
      },
      {
        text: "তুমি কি AI Engineer হতে চাও? কমেন্টে জানাও।",
        startSec: 6.95,
        endSec: 9.75,
      },
      {
        text: "পরবর্তী Lesson-এ আমরা জানব, Large Language Model বা LLM আসলে কী!",
        startSec: 9.85,
        endSec: 14.8,
      },
    ],
  },
];

export const L4_SCENES: readonly L4SceneMeta[] = RAW_SCENES.map((s) => ({
  ...s,
  sceneFrames: Math.ceil((L4_LEAD_SEC + s.voiceSec + L4_TAIL_SEC) * L4_FPS),
}));

export const L4_TOTAL_FRAMES = L4_SCENES.reduce(
  (sum, s) => sum + s.sceneFrames,
  0,
);

export const getL4Scene = (id: L4SceneId): L4SceneMeta => {
  const found = L4_SCENES.find((s) => s.id === id);
  if (!found) throw new Error(`Lesson 4 scene not found: ${id}`);
  return found;
};

export const getL4SceneStart = (id: L4SceneId): number => {
  let acc = 0;
  for (const s of L4_SCENES) {
    if (s.id === id) return acc;
    acc += s.sceneFrames;
  }
  return acc;
};
