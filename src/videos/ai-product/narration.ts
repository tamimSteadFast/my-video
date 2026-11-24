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

export const AIP_FONT = `${bengaliFont}, ${plusJakarta}, sans-serif`;
export const AIP_DISPLAY = `${plusJakarta}, ${bengaliFont}, sans-serif`;
export const AIP_MONO = `${jetBrains}, monospace`;

export const aiProductSchema = z.object({
  showSubtitles: z.boolean().default(true),
  showHud: z.boolean().default(true),
  cinematicGrain: z.boolean().default(true),
});

export type AiProductProps = z.infer<typeof aiProductSchema>;

// Cinematic editorial buffer so transitions have breathing room
export const AIP_LEAD_SEC = 0.25;
export const AIP_TAIL_SEC = 0.35;

// Premium 3D Isometric Visual Palette: Dark Navy Blue + Electric Cyan & Vivid Purple
export const AIP_C = {
  bg: "#020617",
  bgDeep: "#040A21",
  navy: "#070E28",
  navyCard: "rgba(8, 16, 42, 0.88)",
  navyElevated: "rgba(14, 25, 62, 0.94)",
  panelBorderCyan: "rgba(0, 229, 255, 0.32)",
  panelBorderPurple: "rgba(168, 85, 247, 0.38)",
  borderSubtle: "rgba(148, 163, 184, 0.16)",
  cyan: "#00E5FF",
  cyanSoft: "#38BDF8",
  cyanGlow: "rgba(0, 229, 255, 0.5)",
  purple: "#A855F7",
  purpleSoft: "#C084FC",
  purpleGlow: "rgba(168, 85, 247, 0.5)",
  violet: "#7C3AED",
  indigo: "#6366F1",
  emerald: "#10B981",
  amber: "#F59E0B",
  rose: "#F43F5E",
  text: "#F8FAFC",
  textMuted: "#CBD5E1",
  textDim: "#94A3B8",
} as const;

export type AipSceneId =
  | "scene1"
  | "scene2"
  | "scene3"
  | "scene4"
  | "scene5"
  | "scene6"
  | "scene7"
  | "scene8";

export type AipSceneMeta = {
  readonly id: AipSceneId;
  readonly number: number;
  readonly title: string;
  readonly subtitle: string;
  readonly onScreenMetric: string;
  readonly file: string;
  readonly voiceSec: number;
  readonly sceneFrames: number;
  readonly backdropImage?: string;
  readonly captions: readonly Caption[];
};

const RAW_SCENES: readonly {
  readonly id: AipSceneId;
  readonly number: number;
  readonly title: string;
  readonly subtitle: string;
  readonly onScreenMetric: string;
  readonly file: string;
  readonly voiceSec: number;
  readonly backdropImage?: string;
  readonly captions: readonly Caption[];
}[] = [
  {
    id: "scene1",
    number: 1,
    title: "AI In Product Development",
    subtitle: "Intelligent, Faster & Personalized Software",
    onScreenMetric: "AI ENGINE · NEXT-GEN PRODUCT",
    file: "AI video audio/lesson 3/scene_01_curious_scene_1.wav",
    voiceSec: 11.32,
    captions: [
      {
        text: "একটি Software Product কীভাবে আরও Intelligent, Faster এবং Personalized হতে পারে?",
        startSec: 0.0,
        endSec: 5.75,
      },
      {
        text: "এর পেছনে গুরুত্বপূর্ণ ভূমিকা রাখছে Artificial Intelligence এবং AI Engineering।",
        startSec: 5.75,
        endSec: 11.32,
      },
    ],
  },
  {
    id: "scene2",
    number: 2,
    title: "Logic vs Learning Paradigm",
    subtitle: "Hardcoded Rules to Adaptive Data Neural Networks",
    onScreenMetric: "PARADIGM SHIFT · RULES → PATTERNS",
    file: "AI video audio/lesson 3/scene_02_explanatory_scene_2.wav",
    voiceSec: 12.96,
    captions: [
      {
        text: "Traditional Software Development-এ Developer নির্দিষ্ট Business Rules এবং Logic লিখে দেন।",
        startSec: 0.15,
        endSec: 5.05,
      },
      {
        text: "কিন্তু AI-powered Software Data থেকে Pattern শিখতে পারে, Prediction তৈরি করতে পারে এবং Intelligent Decision নিতে সাহায্য করে।",
        startSec: 5.05,
        endSec: 12.96,
      },
    ],
  },
  {
    id: "scene3",
    number: 3,
    title: "Impact 01 · Development Automation",
    subtitle: "Support, Data Processing & Autonomous Testing",
    onScreenMetric: "PIPELINE AUTOMATION · VELOCITY +340%",
    file: "AI video audio/lesson 3/scene_03_educational_scene_3.wav",
    voiceSec: 11.84,
    captions: [
      {
        text: "প্রথমত, AI Product Development-এ Automation নিয়ে আসে।",
        startSec: 0.0,
        endSec: 3.8,
      },
      {
        text: "Customer Support, Data Processing এবং Software Testing-এর মতো Repetitive Task Automate করে Development Process আরও Efficient করা সম্ভব।",
        startSec: 3.8,
        endSec: 11.84,
      },
    ],
  },
  {
    id: "scene4",
    number: 4,
    title: "Impact 02 · Data-Driven Decision Making",
    subtitle: "Synthesizing Big Data into Strategic Intelligence",
    onScreenMetric: "DATA INTELLIGENCE · BEHAVIOR & TRENDS",
    file: "AI video audio/lesson 3/scene_04_analytical_scene_4.wav",
    voiceSec: 12.24,
    captions: [
      {
        text: "দ্বিতীয়ত, AI Data-driven Decision Making সহজ করে।",
        startSec: 0.0,
        endSec: 4.0,
      },
      {
        text: "বিপুল পরিমাণ Data Analyze করে Customer Behaviour, Product Performance এবং Business Trends সম্পর্কে Useful Insights দিতে পারে।",
        startSec: 4.0,
        endSec: 12.24,
      },
    ],
  },
  {
    id: "scene5",
    number: 5,
    title: "Impact 03 · Hyper-Personalized UX",
    subtitle: "Dynamic Content Curation & Real-Time Recommendations",
    onScreenMetric: "DYNAMIC EMBEDDING · AFFINITY 98.7%",
    file: "AI video audio/lesson 3/scene_05_engaging_scene_5.wav",
    voiceSec: 11.96,
    captions: [
      {
        text: "তৃতীয়ত, AI Personalized User Experience তৈরি করে।",
        startSec: 0.2,
        endSec: 3.65,
      },
      {
        text: "যেমন Netflix তোমার Viewing History Analyze করে Movie Recommend করে।",
        startSec: 3.65,
        endSec: 7.6,
      },
      {
        text: "আবার E-commerce Platform তোমার পছন্দ অনুযায়ী Product Suggest করতে পারে।",
        startSec: 7.6,
        endSec: 11.96,
      },
    ],
  },
  {
    id: "scene6",
    number: 6,
    title: "Impact 04 · Predictive Maintenance & QA",
    subtitle: "Sensor Analytics, Proactive Fault Prevention & Zero Downtime",
    onScreenMetric: "TELEMETRY AUDIT · DOWNTIME PREVENTION 99.9%",
    file: "AI video audio/lesson 3/scene_06_explanatory_scene_6.wav",
    voiceSec: 14.2,
    captions: [
      {
        text: "চতুর্থত, Predictive Maintenance এবং Quality Control।",
        startSec: 0.0,
        endSec: 3.75,
      },
      {
        text: "AI Sensor Data এবং Historical Data Analyze করে সম্ভাব্য সমস্যা আগে থেকেই শনাক্ত করতে পারে।",
        startSec: 3.75,
        endSec: 10.05,
      },
      {
        text: "এতে Unexpected Downtime এবং Operational Cost কমানো সম্ভব।",
        startSec: 10.05,
        endSec: 14.2,
      },
    ],
  },
  {
    id: "scene7",
    number: 7,
    title: "Engineering Foundations",
    subtitle: "Scalable Architecture, Reliable Data & Proper Evaluation",
    onScreenMetric: "FOUNDATIONS · ARCHITECTURE + DATA + EVAL",
    file: "AI video audio/lesson 3/scene_07_inspirational_scene_7.wav",
    voiceSec: 13.24,
    captions: [
      {
        text: "সবশেষে, AI Development Cycle দ্রুত করতে, Innovation বাড়াতে এবং Product Quality উন্নত করতে সাহায্য করে।",
        startSec: 0.0,
        endSec: 7.5,
      },
      {
        text: "তবে এর জন্য প্রয়োজন সঠিক Architecture, Reliable Data এবং Proper Evaluation।",
        startSec: 7.5,
        endSec: 13.24,
      },
    ],
  },
  {
    id: "scene8",
    number: 8,
    title: "The True Mission of an AI Engineer",
    subtitle: "Solving Real Business Problems with Intelligent Software",
    onScreenMetric: "AI ENGINEERING · PRODUCTION VALUE & IMPACT",
    file: "AI video audio/lesson 3/scene_08_motivational_scene_8.wav",
    voiceSec: 14.0,
    captions: [
      {
        text: "একজন AI Engineer হিসেবে আমাদের কাজ শুধু AI Model Integrate করা নয়।",
        startSec: 0.2,
        endSec: 5.05,
      },
      {
        text: "বরং বাস্তব Business Problem বুঝে Intelligent এবং Reliable Software Product তৈরি করা।",
        startSec: 5.05,
        endSec: 11.0,
      },
      {
        text: "এটাই AI Engineering-এর আসল Impact।",
        startSec: 11.0,
        endSec: 14.0,
      },
    ],
  },
] as const;

export const AIP_SCENES: readonly AipSceneMeta[] = RAW_SCENES.map((s) => ({
  ...s,
  sceneFrames: Math.round((AIP_LEAD_SEC + s.voiceSec + AIP_TAIL_SEC) * FPS),
}));

export const AIP_TOTAL_FRAMES = AIP_SCENES.reduce(
  (acc, s) => acc + s.sceneFrames,
  0,
);

export const getAipScene = (id: AipSceneId): AipSceneMeta => {
  const found = AIP_SCENES.find((s) => s.id === id);
  if (!found) {
    throw new Error(`Scene not found: ${id}`);
  }
  return found;
};

export const getAipSceneStart = (id: AipSceneId): number => {
  let start = 0;
  for (const s of AIP_SCENES) {
    if (s.id === id) return start;
    start += s.sceneFrames;
  }
  return start;
};
