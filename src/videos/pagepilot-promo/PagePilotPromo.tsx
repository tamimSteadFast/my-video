import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { C, FONT } from "../../shared";
import { sceneStart, scene } from "./narration";
import {
  CtaScene,
  Feature1Scene,
  Feature2Scene,
  Feature3Scene,
  HookScene,
  ProblemScene,
  SetupScene,
} from "./scenes";

// Same markup for both aspect ratios: layout switches on the composition size.
export const PagePilotPromo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT }}>
    <Sequence
      name="Hook"
      from={sceneStart("hook")}
      durationInFrames={scene("hook").sceneFrames}
    >
      <HookScene />
    </Sequence>
    <Sequence
      name="Problem"
      from={sceneStart("problem")}
      durationInFrames={scene("problem").sceneFrames}
    >
      <ProblemScene />
    </Sequence>
    <Sequence
      name="Feature 1 - Inbox"
      from={sceneStart("feature1")}
      durationInFrames={scene("feature1").sceneFrames}
    >
      <Feature1Scene />
    </Sequence>
    <Sequence
      name="Feature 2 - Orders"
      from={sceneStart("feature2")}
      durationInFrames={scene("feature2").sceneFrames}
    >
      <Feature2Scene />
    </Sequence>
    <Sequence
      name="Feature 3 - Voice and photo"
      from={sceneStart("feature3")}
      durationInFrames={scene("feature3").sceneFrames}
    >
      <Feature3Scene />
    </Sequence>
    <Sequence
      name="Setup"
      from={sceneStart("setup")}
      durationInFrames={scene("setup").sceneFrames}
    >
      <SetupScene />
    </Sequence>
    <Sequence
      name="Call to action"
      from={sceneStart("cta")}
      durationInFrames={scene("cta").sceneFrames}
    >
      <CtaScene />
    </Sequence>
  </AbsoluteFill>
);
