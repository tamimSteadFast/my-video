import { FPS, LEAD_SEC, TAIL_SEC } from "./theme";

export type Caption = {
  readonly text: string;
  readonly startSec: number; // relative to the start of the voice
  readonly endSec: number;
};

export type RawSceneInput<TId extends string> = {
  readonly id: TId;
  readonly file: string;
  readonly seconds: number;
  readonly text: string;
  readonly extraTailSec?: number;
};

export type NarrationScene<TId extends string> = {
  readonly id: TId;
  readonly file: string;
  readonly voiceSec: number;
  readonly sceneFrames: number;
  readonly captions: Caption[];
};

const PAUSE_WEIGHT = 7; // extra "characters" of silence after each phrase

// Split narration into short phrases suitable for on-screen captions.
export const toPhrases = (text: string): string[] => {
  const merged: string[] = [];
  // Never merge across lines: each line of the script is a separate sentence group.
  for (const line of text.split("\n")) {
    const pieces = line
      .split(/(?<=[।?!]["”]?)\s+|(?<=—)\s+|(?<=,)\s+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const lineStart = merged.length;
    for (const piece of pieces) {
      const last = merged[merged.length - 1];
      if (
        merged.length > lineStart &&
        last !== undefined &&
        last.length < 26 &&
        last.length + piece.length < 72
      ) {
        merged[merged.length - 1] = `${last} ${piece}`;
      } else {
        merged.push(piece);
      }
    }
  }
  return merged;
};

export const buildCaptions = (text: string, seconds: number): Caption[] => {
  const phrases = toPhrases(text);
  const weights = phrases.map((p) => p.length + PAUSE_WEIGHT);
  const total = weights.reduce((a, b) => a + b, 0);
  let acc = 0;
  return phrases.map((p, i) => {
    const startSec = (acc / total) * seconds;
    acc += weights[i];
    return { text: p, startSec, endSec: (acc / total) * seconds };
  });
};

export const createNarrationTimeline = <TId extends string>(
  raw: readonly RawSceneInput<TId>[],
) => {
  const scenes: readonly NarrationScene<TId>[] = raw.map((s) => ({
    id: s.id,
    file: s.file,
    voiceSec: s.seconds,
    sceneFrames: Math.round(
      (LEAD_SEC + s.seconds + TAIL_SEC + (s.extraTailSec ?? 0)) * FPS,
    ),
    captions: buildCaptions(s.text, s.seconds),
  }));

  const sceneStart = (id: TId): number => {
    let from = 0;
    for (const s of scenes) {
      if (s.id === id) return from;
      from += s.sceneFrames;
    }
    throw new Error(`Unknown scene ${id}`);
  };

  const scene = (id: TId): NarrationScene<TId> => {
    const s = scenes.find((x) => x.id === id);
    if (!s) throw new Error(`Unknown scene ${id}`);
    return s;
  };

  const totalFrames = scenes.reduce((a, s) => a + s.sceneFrames, 0);

  return {
    SCENES: scenes,
    sceneStart,
    scene,
    TOTAL_FRAMES: totalFrames,
  };
};
