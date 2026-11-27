import { loadFont as loadHindSiliguri } from "@remotion/google-fonts/HindSiliguri";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { buildCaptions, type Caption } from "../../shared/captions";
import { SSH_RAW } from "./scenes";

const { fontFamily: hind } = loadHindSiliguri("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
});
const { fontFamily: inter } = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: mono } = loadJetBrainsMono("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

export const F_BN = `${hind}, ${inter}, sans-serif`;
export const F_EN = `${inter}, ${hind}, sans-serif`;
export const F_MONO = `${mono}, monospace`;

export const SSH_FPS = 60;
export const SSH_LEAD_SEC = 0.4; // breathing room before the voice starts
export const SSH_TAIL_SEC = 0.6; // breathing room after the voice ends

export const K = {
  bg: "#0B1020",
  bg2: "#111830",
  panel: "#131B36",
  primary: "#6366F1",
  accent: "#06B6D4",
  text: "#F8FAFC",
  muted: "#94A3B8",
  warn: "#F59E0B",
  ok: "#22C55E",
  err: "#EF4444",
} as const;

export type SshSceneId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type SshScene = {
  readonly id: SshSceneId;
  readonly file: string;
  readonly text: string;
  readonly voiceSec: number;
  readonly frames: number;
  readonly captions: readonly Caption[];
};

const lastTailExtra = 0.8; // the ending fades out slowly

export const SSH_SCENES: readonly SshScene[] = SSH_RAW.map((s) => ({
  id: s.n as SshSceneId,
  file: `ssh/${s.file}`,
  text: s.text,
  voiceSec: s.sec,
  frames: Math.round(
    (SSH_LEAD_SEC + s.sec + SSH_TAIL_SEC + (s.n === 10 ? lastTailExtra : 0)) *
      SSH_FPS,
  ),
  captions: buildCaptions(s.text, s.sec),
}));

export const SSH_TOTAL_FRAMES = SSH_SCENES.reduce((a, s) => a + s.frames, 0);

export const getSshScene = (id: SshSceneId): SshScene =>
  SSH_SCENES[id - 1] as SshScene;

export const getSshSceneStart = (id: SshSceneId): number =>
  SSH_SCENES.slice(0, id - 1).reduce((a, s) => a + s.frames, 0);

/**
 * Scene-local time (seconds) at which the caption phrase containing `needle`
 * starts being spoken. Visual beats use this so animation follows the narration.
 * Returns a fraction-of-voice fallback if the needle is absent.
 */
export const cue = (id: SshSceneId, needle: string, fallback = 0): number => {
  const s = getSshScene(id);
  const hit = s.captions.find((c) => c.text.includes(needle));
  return SSH_LEAD_SEC + (hit ? hit.startSec : fallback * s.voiceSec);
};
