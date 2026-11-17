import React from "react";
import { Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { FPS } from "../shared/theme";

export type SfxType = "whoosh" | "click" | "pop" | "chime" | "riser";

export type SfxCue = {
  readonly atSec: number;
  readonly type: SfxType;
  readonly volume?: number;
};

const DEFAULT_VOL: Record<SfxType, number> = {
  whoosh: 0.25,
  click: 0.3,
  pop: 0.3,
  chime: 0.25,
  riser: 0.25,
};

export const SfxLayer: React.FC<{
  readonly cues: readonly SfxCue[];
}> = ({ cues }) => (
  <>
    {cues.map((cue, idx) => (
      <Sequence
        key={`${cue.type}-${idx}-${cue.atSec}`}
        name={`SFX · ${cue.type}`}
        from={Math.max(0, Math.round(cue.atSec * FPS))}
        durationInFrames={35}
        layout="none"
      >
        <Audio
          src={staticFile(`audio/sfx/${cue.type}.wav`)}
          volume={cue.volume ?? DEFAULT_VOL[cue.type]}
        />
      </Sequence>
    ))}
  </>
);
