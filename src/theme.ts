import { loadFont as loadHindSiliguri } from "@remotion/google-fonts/HindSiliguri";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: hindSiliguriFamily } = loadHindSiliguri("normal", {
  weights: ["500", "600", "700"],
  subsets: ["bengali", "latin"],
});

const { fontFamily: interFamily } = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const { fontFamily: jetBrainsMonoFamily } = loadJetBrainsMono("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const FONTS = {
  bangla: `${hindSiliguriFamily}, sans-serif`,
  ui: `${interFamily}, ${hindSiliguriFamily}, sans-serif`,
  code: `${jetBrainsMonoFamily}, monospace`,
} as const;

export const COLORS = {
  // GitHub dark palette
  bg: "#0D1117",
  panel: "#161B22",
  panelElevated: "#1C2128",
  border: "#30363D",
  text: "#E6EDF3",
  muted: "#8B949E",

  // Status colors
  success: "#3FB950",
  fail: "#F85149",
  running: "#D29922",

  // Concept colors (consistent across all scenes)
  event: "#A371F7",
  job: "#2F81F7",
  runner: "#39C5CF",
  step: "#DB61A2",
  vps: "#F0883E",

  // Night & warm atmospheric scenes
  nightBg: "#0B1026",
  nightWindow: "#131C3E",
  warmBg: "#1F1713",
  warmAccent: "#F2994A",
  morningBg: "#F3F6FA",
} as const;

export const LAYOUT = {
  width: 1080,
  height: 1920,
  fps: 30,
  safeTop: 90,
  safeX: 48,
  subtitleSafeBottom: 160,
  stageBottom: 1730, // 190px clearance above bottom edge (> 160px subtitle zone)
  cardRadius: 24,
} as const;

export const LAYOUT_WIDE = {
  width: 1920,
  height: 1080,
  fps: 30,
  safeTop: 44,
  safeX: 64,
  subtitleSafeBottom: 160,
  stageBottom: 920, // 160px clearance above bottom edge for Subtitle pill
  cardRadius: 24,
} as const;

export const SHADOWS = {
  card: "0 20px 50px rgba(0, 0, 0, 0.48), 0 4px 14px rgba(0, 0, 0, 0.32)",
  soft: "0 12px 32px rgba(0, 0, 0, 0.35)",
  glow: (hex: string) => `0 0 28px ${hex}44, 0 8px 24px rgba(0, 0, 0, 0.45)`,
} as const;

export const SPRING_CONFIG = {
  snappy: { damping: 14, stiffness: 180, mass: 0.9 },
  smooth: { damping: 20, stiffness: 120, mass: 1 },
  bouncy: { damping: 10, stiffness: 170, mass: 0.8 },
  slam: { damping: 12, stiffness: 260, mass: 0.7 },
} as const;

export const CI_YML_LINES = [
  "name: CI",
  "on:",
  "  push:",
  "    branches: [main]",
  "  pull_request:",
  "    branches: [main]",
  "jobs:",
  "  build:",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - uses: actions/setup-node@v4",
  "        with:",
  "          node-version: 22",
  "          cache: npm",
  "      - run: npm ci",
  "      - run: npm test",
  "      - run: npm run build",
] as const;

export const CI_YML_FULL = CI_YML_LINES.join("\n");

export const DEPLOY_YML_LINES = [
  "name: Build & Deploy",
  "on:",
  "  push:",
  "    branches: [main]",
  "jobs:",
  "  deploy:",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - uses: actions/setup-node@v4",
  "        with:",
  "          node-version: 22",
  "          cache: npm",
  "      - run: npm ci",
  "      - run: npm run build",
  "      - name: Deploy to VPS",
  "        run: |",
  "          mkdir -p ~/.ssh",
  `          echo "\${{ secrets.VPS_SSH_KEY }}" > ~/.ssh/id_ed25519`,
  "          chmod 600 ~/.ssh/id_ed25519",
  `          ssh-keyscan -H \${{ secrets.VPS_HOST }} >> ~/.ssh/known_hosts`,
  `          rsync -avz --delete dist/ \${{ secrets.VPS_USER }}@\${{ secrets.VPS_HOST }}:/var/www/app/`,
] as const;

export const DEPLOY_YML_FULL = DEPLOY_YML_LINES.join("\n");
