import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { FPS, LEAD_SEC } from "../shared";
import { BackgroundGlow, SfxLayer, SubtitleOverlay, type SfxCue } from "../components";
import { scene, type SceneId } from "../videos/pagepilot-promo/narration";

export const REC = (name: string) => `pagepilot-promo/recordings/${name}`;

export const SceneShell: React.FC<{
  readonly id: SceneId;
  readonly tint?: string;
  readonly mockupGlow?: boolean;
  readonly sfx?: readonly SfxCue[];
  readonly children: React.ReactNode;
}> = ({ id, tint, mockupGlow = false, sfx = [], children }) => {
  const s = scene(id);
  return (
    <AbsoluteFill>
      <BackgroundGlow tint={tint} mockupGlow={mockupGlow} />
      {children}
      <SubtitleOverlay captions={s.captions} />
      <Sequence
        name={`Voiceover · ${id}`}
        from={Math.round(LEAD_SEC * FPS)}
        layout="none"
      >
        <Audio src={staticFile(s.file)} volume={1.0} />
      </Sequence>
      <SfxLayer
        cues={[
          { atSec: 0.05, type: "whoosh", volume: 0.25 },
          ...sfx,
        ]}
      />
    </AbsoluteFill>
  );
};

export const useSceneProgress = (id: SceneId) => {
  const frame = useCurrentFrame();
  return (frame / FPS - LEAD_SEC) / scene(id).voiceSec;
};
