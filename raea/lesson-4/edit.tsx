import React from "react";
import { AbsoluteFill, Composition, Sequence, registerRoot } from "raea";
import {
  L4_C,
  L4_FPS,
  L4_HEIGHT,
  L4_TOTAL_FRAMES,
  L4_WIDTH,
  getL4Scene,
  getL4SceneStart,
} from "./narration";
import { Scene01HookFaceOff } from "./scenes/Scene01HookFaceOff";
import { Scene02AiEngineerHub } from "./scenes/Scene02AiEngineerHub";
import { Scene03ChatbotRag } from "./scenes/Scene03ChatbotRag";
import { Scene04MlPipeline } from "./scenes/Scene04MlPipeline";
import { Scene05EcommerceRecs } from "./scenes/Scene05EcommerceRecs";
import { Scene06CoreDifference } from "./scenes/Scene06CoreDifference";
import { Scene07BlurredBoundaries } from "./scenes/Scene07BlurredBoundaries";
import { Scene08WebDevRoadmap } from "./scenes/Scene08WebDevRoadmap";
import { Scene09MissionCtaNext } from "./scenes/Scene09MissionCtaNext";

const Lesson4AiVsMlVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: L4_C.bg }}>
    <Sequence
      name="01 · AI vs ML Hook"
      from={getL4SceneStart("scene1")}
      durationInFrames={getL4Scene("scene1").sceneFrames}
    >
      <Scene01HookFaceOff />
    </Sequence>

    <Sequence
      name="02 · AI Engineer Stack"
      from={getL4SceneStart("scene2")}
      durationInFrames={getL4Scene("scene2").sceneFrames}
    >
      <Scene02AiEngineerHub />
    </Sequence>

    <Sequence
      name="03 · AI Chatbot + RAG"
      from={getL4SceneStart("scene3")}
      durationInFrames={getL4Scene("scene3").sceneFrames}
    >
      <Scene03ChatbotRag />
    </Sequence>

    <Sequence
      name="04 · ML Engineer Pipeline"
      from={getL4SceneStart("scene4")}
      durationInFrames={getL4Scene("scene4").sceneFrames}
    >
      <Scene04MlPipeline />
    </Sequence>

    <Sequence
      name="05 · E-Commerce RecSys"
      from={getL4SceneStart("scene5")}
      durationInFrames={getL4Scene("scene5").sceneFrames}
    >
      <Scene05EcommerceRecs />
    </Sequence>

    <Sequence
      name="06 · Core Difference"
      from={getL4SceneStart("scene6")}
      durationInFrames={getL4Scene("scene6").sceneFrames}
    >
      <Scene06CoreDifference />
    </Sequence>

    <Sequence
      name="07 · Blurred Boundaries"
      from={getL4SceneStart("scene7")}
      durationInFrames={getL4Scene("scene7").sceneFrames}
    >
      <Scene07BlurredBoundaries />
    </Sequence>

    <Sequence
      name="08 · Web Dev to AI Roadmap"
      from={getL4SceneStart("scene8")}
      durationInFrames={getL4Scene("scene8").sceneFrames}
    >
      <Scene08WebDevRoadmap />
    </Sequence>

    <Sequence
      name="09 · Mission, CTA & Next Lesson"
      from={getL4SceneStart("scene9")}
      durationInFrames={getL4Scene("scene9").sceneFrames}
    >
      <Scene09MissionCtaNext />
    </Sequence>

    {/* Subtle Editorial Vignette */}
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        backgroundImage:
          "radial-gradient(ellipse at center, transparent 62%, rgba(0, 0, 0, 0.58) 100%)",
        zIndex: 90,
      }}
    />
  </AbsoluteFill>
);

registerRoot(() => (
  <Composition
    id="AiLesson4Vertical"
    component={Lesson4AiVsMlVideo}
    width={L4_WIDTH}
    height={L4_HEIGHT}
    fps={L4_FPS}
    durationInFrames={L4_TOTAL_FRAMES}
  />
));
