# Remotion Video Workspace

Multi-video Remotion workspace with shared UI primitives, Bengali/Latin typography, auto-timed narration captions, and Playwright screen-recording utilities.

## Folder Structure

```text
my-video/
├── public/                        # Static assets loaded via staticFile("<video-slug>/...")
│   └── pagepilot-promo/
│       ├── recordings/            # Playwright screen recordings (.mp4)
│       └── voiceover/             # Narration audio files (.mp3)
├── scripts/                       # Video scripts & storyboards (Markdown)
│   └── pagepilot-promo.md
├── tools/                         # Automation & screen-recording utilities
│   └── recorder/
│       ├── login.mjs              # Save authenticated browser session (.auth/state.json)
│       ├── explore.mjs            # Crawl & screenshot app pages
│       └── pagepilot-clips.mjs    # Record PagePilot feature clips -> public/pagepilot-promo/recordings
├── src/
│   ├── index.ts                   # Remotion entry point
│   ├── Root.tsx                   # All <Folder> and <Composition> registrations
│   ├── shared/                    # Reusable design system & helpers across videos
│   │   ├── index.ts               # Barrel exports
│   │   ├── theme.ts               # Fonts (Hind Siliguri), color palette (C), FPS constants
│   │   ├── captions.ts            # createNarrationTimeline(), buildCaptions(), toPhrases()
│   │   ├── primitives.tsx         # useLayout, Reveal, Win, Backdrop, Center, CaptionBar, BrandLogo
│   │   └── stage.tsx              # BrowserFrame, ScreenClip, Panel, FeatureStage, Bubble
│   └── videos/                    # Individual video projects (one folder per video)
│       ├── pagepilot-promo/
│       │   ├── PagePilotPromo.tsx # Main composition component (vertical + wide responsive)
│       │   ├── narration.ts       # Voiceover scene durations & caption timeline
│       │   └── scenes.tsx         # Scene components (Hook, Problem, Features, Setup, CTA)
│       └── hello-world/           # Starter example composition
└── out/                           # Rendered MP4 outputs (gitignored)
    └── pagepilot-promo/
        ├── pagepilot-promo-1080x1920.mp4
        └── pagepilot-promo-1920x1080.mp4
```

## How to Add a New Video

1. **Draft the script** in `scripts/<new-video>.md`.
2. **Add assets** under `public/<new-video>/voiceover/` and `public/<new-video>/recordings/`.
3. **Create the video module** in `src/videos/<new-video>/`:
   - `narration.ts` — pass your voiceover files and script text into `createNarrationTimeline()` from `../../shared`.
   - `scenes.tsx` — build scenes using `Backdrop`, `Center`, `FeatureStage`, `ScreenClip`, `CaptionBar`, etc. from `../../shared`.
   - `<NewVideo>.tsx` — sequence your scenes.
4. **Register compositions** inside a `<Folder name="...">` in `src/Root.tsx`.

## Commands

```bash
# Preview in Remotion Studio
npm run dev

# Lint & typecheck
npm run lint

# Record Playwright screen clips
npm run record:login
npm run record:pagepilot

# Render PagePilot promo (1080x1920 and 1920x1080)
npm run render:pagepilot
```
