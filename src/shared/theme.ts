import { loadFont as loadNotoSansBengali } from "@remotion/google-fonts/NotoSansBengali";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily: bengaliFont } = loadNotoSansBengali("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
});

const { fontFamily: plusJakarta } = loadPlusJakartaSans("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

export const FONT = `${bengaliFont}, ${plusJakarta}, sans-serif`;
export const FONT_BN = `${bengaliFont}, ${plusJakarta}, sans-serif`;
export const FONT_EN = `${plusJakarta}, ${bengaliFont}, sans-serif`;

export const FPS = 30;
export const LEAD_SEC = 0.4; // 12-frame breathing buffer before voiceover starts
export const TAIL_SEC = 0.5; // 15-frame breathing buffer after voiceover ends

// Spring Physics Presets (Senior Video Editor Protocol §3)
export const SPRING_UI = {
  damping: 14,
  stiffness: 140,
  mass: 0.8,
} as const;

export const SPRING_HEADLINE = {
  damping: 18,
  stiffness: 100,
  mass: 1,
} as const;

export const C = {
  bg: "#070B14",
  surface: "#0F1729",
  surface2: "#17223A",
  line: "rgba(255,255,255,0.15)",
  text: "#F3F6FB",
  dim: "#9AA7BD",
  accent: "#2FD4A8",
  accentDeep: "#1F6B5E",
  blue: "#5E88FF",
  warn: "#FF7A59",
  amber: "#FFC857",
} as const;
