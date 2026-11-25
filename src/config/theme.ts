import { loadFont as loadHindSiliguri } from "@remotion/google-fonts/HindSiliguri";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const hindSiliguri = loadHindSiliguri("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
});

const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const FONTS = {
  bangla: hindSiliguri.fontFamily,
  english: inter.fontFamily,
  /** Primary stack: Hind Siliguri handles Bangla cleanly with Inter fallback for Latin numerals/punctuation */
  primary: `${hindSiliguri.fontFamily}, ${inter.fontFamily}, sans-serif`,
  display: `${inter.fontFamily}, ${hindSiliguri.fontFamily}, sans-serif`,
} as const;

export const COLORS = {
  bg: "#0B1020",
  bgDeep: "#070B16",
  surface: "rgba(17, 25, 48, 0.80)",
  surfaceSolid: "#111930",
  surfaceElevated: "rgba(24, 35, 66, 0.88)",
  border: "rgba(148, 163, 184, 0.18)",
  borderBright: "rgba(148, 163, 184, 0.34)",

  ai: "#22D3EE",
  aiSoft: "rgba(34, 211, 238, 0.14)",
  aiBorder: "rgba(34, 211, 238, 0.42)",
  aiGlow: "rgba(34, 211, 238, 0.38)",

  agi: "#A78BFA",
  agiSoft: "rgba(167, 139, 250, 0.14)",
  agiBorder: "rgba(167, 139, 250, 0.45)",
  agiGlow: "rgba(167, 139, 250, 0.40)",

  amber: "#FBBF24",
  amberSoft: "rgba(251, 191, 36, 0.15)",
  amberBorder: "rgba(251, 191, 36, 0.45)",

  green: "#34D399",
  greenSoft: "rgba(52, 211, 153, 0.15)",
  greenBorder: "rgba(52, 211, 153, 0.42)",

  danger: "#FB7185",
  dangerSoft: "rgba(251, 113, 133, 0.16)",
  dangerBorder: "rgba(251, 113, 133, 0.48)",

  textPrimary: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",
} as const;

export const SPRING_CONFIGS = {
  snappy: { damping: 18, stiffness: 190, mass: 0.8 },
  smooth: { damping: 24, stiffness: 120, mass: 0.9 },
  bouncy: { damping: 12, stiffness: 165, mass: 0.85 },
  impact: { damping: 14, stiffness: 210, mass: 0.95 },
} as const;

export interface LayoutMetrics {
  isVertical: boolean;
  padX: number;
  padTop: number;
  padBottom: number;
  heroSize: number;
  headingSize: number;
  subHeadingSize: number;
  bodySize: number;
  cardTitleSize: number;
  cardSubSize: number;
  captionSize: number;
  badgeSize: number;
}

export const getLayoutMetrics = (width: number, height: number): LayoutMetrics => {
  const isVertical = height > width;
  if (isVertical) {
    return {
      isVertical: true,
      padX: 64,
      padTop: 168, // Reels-safe top clearance
      padBottom: 220, // Reels-safe bottom clearance
      heroSize: 78,
      headingSize: 64, // >= 64px requirement on vertical
      subHeadingSize: 40,
      bodySize: 36,
      cardTitleSize: 34,
      cardSubSize: 24,
      captionSize: 30,
      badgeSize: 22,
    };
  }
  return {
    isVertical: false,
    padX: 112,
    padTop: 78,
    padBottom: 92,
    heroSize: 88,
    headingSize: 60, // >= 56px requirement on landscape
    subHeadingSize: 38,
    bodySize: 34,
    cardTitleSize: 30,
    cardSubSize: 22,
    captionSize: 28,
    badgeSize: 20,
  };
};
