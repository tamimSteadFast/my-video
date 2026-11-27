import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { GrainOverlay } from "../../components/GrainOverlay";
import { K, SSH_SCENES, getSshSceneStart, type SshSceneId } from "./narration";
import { Scene01, Scene02, Scene03 } from "./ScenesA";
import { Scene04, Scene05, Scene06 } from "./ScenesB";
import { Scene07, Scene08, Scene09, Scene10 } from "./ScenesC";

export const SSH_SCENE_COMPONENTS: readonly React.FC[] = [
  Scene01, Scene02, Scene03, Scene04, Scene05,
  Scene06, Scene07, Scene08, Scene09, Scene10,
];

const TITLES = [
  "The Hook", "The Problem", "The Reveal", "How SSH Works", "Encryption",
  "Authentication", "Terminal Demo", "Developer's World", "Security", "Ending",
];

/** Light sweep across the cut between two scenes. */
const CutSweep: React.FC<{ readonly dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, dur], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(p, [0, 1], [-200, 2100]);
  const o = Math.sin(p * Math.PI);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: o }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: 1080,
          top: y,
          height: 160,
          background: `linear-gradient(180deg, transparent, ${K.accent}55, transparent)`,
          filter: "blur(10px)",
        }}
      />
    </AbsoluteFill>
  );
};

export const SshStory: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: K.bg }}>
    {SSH_SCENES.map((s, i) => {
      const Comp = SSH_SCENE_COMPONENTS[i] as React.FC;
      return (
        <Sequence
          key={s.id}
          name={`${s.id} · ${TITLES[i]}`}
          from={getSshSceneStart(s.id as SshSceneId)}
          durationInFrames={s.frames}
        >
          <Comp />
        </Sequence>
      );
    })}
    {SSH_SCENES.slice(1).map((s) => (
      <Sequence
        key={`cut-${s.id}`}
        name={`Cut → ${s.id}`}
        from={getSshSceneStart(s.id as SshSceneId) - 8}
        durationInFrames={20}
      >
        <CutSweep dur={20} />
      </Sequence>
    ))}
    <GrainOverlay opacity={0.04} />
  </AbsoluteFill>
);
