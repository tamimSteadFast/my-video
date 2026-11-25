/**
 * Single source of truth for all scene durations, audio synchronization cues,
 * and media flags for "AI vs AGI" (AI শিখি — Lesson 6).
 *
 * Adjust any scene duration (in seconds) here to match your voiceover;
 * TOTAL_DURATION_FRAMES updates automatically across both Landscape and Vertical compositions.
 */

export const FPS = 30;

/** Overlap duration (in frames) for <TransitionSeries.Transition> between scenes */
export const TRANSITION_DURATION_FRAMES = 12; // 0.4s

export const AUDIO_CONFIG = {
  /** Enable voiceover playback (true by default for Lesson 6 synced WAVs) */
  hasVoiceover: true,
  /**
   * "per-scene" plays each scene's dedicated WAV inside its sequence so visuals stay
   * locked even when you adjust durations.
   * Switch to "single" to play a single combined track from public/voiceover.mp3.
   */
  audioMode: "per-scene" as "per-scene" | "single",
  /** Path inside public/ when audioMode === "single" */
  singleVoiceoverFile: "voiceover.mp3",
  /** Optional background music at public/bgm.mp3 */
  hasBgm: false,
  bgmFile: "bgm.mp3",
  bgmVolume: 0.08,
  /** Subtle motion SFX (whoosh, pop, chime) from public/audio/sfx/ */
  hasSfx: true,
  sfxVolume: 0.22,
  /** Optional bottom Bangla subtitle strip synced to each scene */
  showSubtitles: false,
} as const;

const AUDIO_BASE = "AI video audio/lesson 6 (ai vs agi)";

export const SCENE_AUDIO_FILES = {
  hook: `${AUDIO_BASE}/scene_01_curious_scene_1.wav`,
  whatIsAi: `${AUDIO_BASE}/scene_02_explanatory_scene_2.wav`,
  narrowAi: `${AUDIO_BASE}/scene_03_analytical_scene_3.wav`,
  whatIsAgi: `${AUDIO_BASE}/scene_04_educational_scene_4.wav`,
  comparison: `${AUDIO_BASE}/scene_05_comparative_scene_5.wav`,
  doesAgiExist: `${AUDIO_BASE}/scene_06_serious_scene_6.wav`,
  whyEngineersCare: `${AUDIO_BASE}/scene_07_inspirational_scene_7.wav`,
} as const;

export const SFX_FILES = {
  whoosh: "audio/sfx/whoosh.wav",
  pop: "audio/sfx/pop.wav",
  chime: "audio/sfx/chime.wav",
  click: "audio/sfx/click.wav",
  riser: "audio/sfx/riser.wav",
} as const;

/**
 * Editable scene durations in SECONDS.
 * Narrated scenes include ~0.45s tail padding to match the 0.4s scene transition
 * cleanly without clipping spoken syllables.
 */
export const SCENE_DURATIONS_SEC = {
  hook: 10.2, // scene_01 WAV = 9.76s
  title: 3.2, // Punchy "AI vs AGI" spring collision bumper
  whatIsAi: 15.4, // scene_02 WAV = 14.92s
  narrowAi: 15.8, // scene_03 WAV = 15.36s
  whatIsAgi: 15.7, // scene_04 WAV = 15.24s
  comparison: 13.3, // scene_05 WAV = 12.80s
  doesAgiExist: 12.0, // scene_06 WAV = 11.44s
  whyEngineersCare: 15.3, // scene_07 WAV = 14.80s
  cta: 5.5, // Engagement question + Comment/Save/Share + "AI শিখি" end card
} as const;

export type SceneKey = keyof typeof SCENE_DURATIONS_SEC;

export const SCENE_ORDER: readonly SceneKey[] = [
  "hook",
  "title",
  "whatIsAi",
  "narrowAi",
  "whatIsAgi",
  "comparison",
  "doesAgiExist",
  "whyEngineersCare",
  "cta",
] as const;

export const sec = (seconds: number): number => Math.round(seconds * FPS);

export const SCENE_FRAMES: Record<SceneKey, number> = {
  hook: sec(SCENE_DURATIONS_SEC.hook),
  title: sec(SCENE_DURATIONS_SEC.title),
  whatIsAi: sec(SCENE_DURATIONS_SEC.whatIsAi),
  narrowAi: sec(SCENE_DURATIONS_SEC.narrowAi),
  whatIsAgi: sec(SCENE_DURATIONS_SEC.whatIsAgi),
  comparison: sec(SCENE_DURATIONS_SEC.comparison),
  doesAgiExist: sec(SCENE_DURATIONS_SEC.doesAgiExist),
  whyEngineersCare: sec(SCENE_DURATIONS_SEC.whyEngineersCare),
  cta: sec(SCENE_DURATIONS_SEC.cta),
};

export const NUM_TRANSITIONS = SCENE_ORDER.length - 1;

/** Total frames accounting for TransitionSeries overlaps */
export const TOTAL_DURATION_FRAMES =
  SCENE_ORDER.reduce((sum, key) => sum + SCENE_FRAMES[key], 0) -
  NUM_TRANSITIONS * TRANSITION_DURATION_FRAMES;

/**
 * Exact speech-synced cue timestamps (in seconds, relative to each scene's start)
 * derived from the actual Lesson 6 WAV speech envelopes and narration_subtitles.srt.
 */
export const SCENE_CUES = {
  hook: {
    userPrompt: 0.2,
    chipChat: 1.0,
    chipImage: 2.5,
    chipCode: 4.1,
    aiTyping: 4.8,
    focusShift: 6.4,
    questionStart: 6.75,
  },
  title: {
    collideStart: 0.15,
    vsReveal: 0.75,
    subtitleReveal: 1.15,
  },
  whatIsAi: {
    heading: 0.2,
    defLine1: 1.4,
    defLine2: 6.1,
    cardsIntro: 10.2,
    cardPattern: 10.95,
    cardDecision: 12.25,
    cardLanguage: 13.35,
  },
  narrowAi: {
    heading: 0.2,
    boxesStart: 3.3,
    boxStagger: 0.55,
    focusImageModel: 7.0,
    detectCat: 9.2,
    detectDog: 10.3,
    bounceArrowStart: 12.1,
    bounceCaption: 12.6,
  },
  whatIsAgi: {
    heading: 0.2,
    theoreticalBadge: 3.5,
    coreIgnite: 4.4,
    nodeLearn: 8.3,
    nodeUnderstand: 9.65,
    nodeReasoning: 10.45,
    nodeTransfer: 11.6,
    crossLinks: 12.8,
  },
  comparison: {
    heading: 0.15,
    rowScope: 1.65,
    rowLearning: 3.1,
    focusAgiColumn: 4.75,
    rowNewSituation: 5.5,
    rowExistence: 8.1,
    summaryPill: 10.2,
  },
  doesAgiExist: {
    questionStart: 0.15,
    noPunch: 2.85,
    researchBadge: 3.85,
    powerfulStrip: 6.35,
    verdictPill: 8.0,
  },
  whyEngineersCare: {
    heading: 0.2,
    item1: 2.6,
    item2: 5.0,
    item3: 7.4,
    item4: 9.6,
    foundationBanner: 11.8,
  },
  cta: {
    questionStart: 0.2,
    actionIcons: 2.0,
    endCard: 3.1,
  },
} as const;

export const SCENE_SUBTITLES: Partial<Record<SceneKey, string>> = {
  hook: "আমরা প্রতিদিন ChatGPT, AI Image Generator এবং AI Coding Assistant ব্যবহার করছি। কিন্তু সব AI কি মানুষের মতো চিন্তা করতে পারে?",
  whatIsAi:
    "Artificial Intelligence বা AI হলো এমন একটি Technology, যার মাধ্যমে Computer System মানুষের বুদ্ধিমত্তার কিছু নির্দিষ্ট কাজ সম্পাদন করতে পারে।",
  narrowAi:
    "বর্তমানে আমরা মূলত Narrow AI ব্যবহার করি। যেমন একটি Image Recognition Model বিড়াল এবং কুকুর শনাক্ত করতে পারে — কিন্তু সব কাজ করতে পারে না।",
  whatIsAgi:
    "AGI হলো এমন একটি Theoretical Intelligence, যা মানুষের মতো শিখতে, বুঝতে, Reasoning করতে এবং নতুন পরিস্থিতিতে জ্ঞান প্রয়োগ করতে পারবে।",
  comparison:
    "Narrow AI নির্দিষ্ট কাজের জন্য তৈরি। কিন্তু AGI-এর লক্ষ্য হলো বিভিন্ন Intellectual Task সম্পাদন করতে সক্ষম General Intelligence তৈরি করা।",
  doesAgiExist:
    "তাহলে কি AGI ইতিমধ্যে তৈরি হয়েছে? না। AGI এখনো একটি Research Goal। Powerful AI-কে শুধু Capability দেখে AGI বলা যায় না।",
  whyEngineersCare:
    "একজন AI Engineer হিসেবে আমাদের কাজ হলো AI-এর Capability এবং Limitation বুঝে বাস্তব সমস্যার সমাধান তৈরি করা।",
};
