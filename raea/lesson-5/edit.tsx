import React from "react";
import { AbsoluteFill, Composition, Sequence, registerRoot } from "raea";
import {
  L5_C,
  L5_FPS,
  L5_HEIGHT,
  L5_TOTAL_FRAMES,
  L5_WIDTH,
  getL5Scene,
  getL5SceneStart,
} from "./narration";
import { Scene01ChatHook } from "./scenes/Scene01ChatHook";
import { Scene02WhatIsLlm } from "./scenes/Scene02WhatIsLlm";
import { Scene03Tokenization } from "./scenes/Scene03Tokenization";
import { Scene04Embeddings } from "./scenes/Scene04Embeddings";
import { Scene05TransformerAttention } from "./scenes/Scene05TransformerAttention";
import { Scene06ProbabilitiesDecoding } from "./scenes/Scene06ProbabilitiesDecoding";
import { Scene07NextTokenLoop } from "./scenes/Scene07NextTokenLoop";
import { Scene08TrainingVsInference } from "./scenes/Scene08TrainingVsInference";
import { Scene09AiEngineerToolkit } from "./scenes/Scene09AiEngineerToolkit";
import { Scene10RecapNextCta } from "./scenes/Scene10RecapNextCta";

const Lesson5HowLlmsWorkVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: L5_C.bg }}>
    <Sequence
      name="01 · How ChatGPT Answers (Hook)"
      from={getL5SceneStart("scene1")}
      durationInFrames={getL5Scene("scene1").sceneFrames}
    >
      <Scene01ChatHook />
    </Sequence>

    <Sequence
      name="02 · What Is an LLM?"
      from={getL5SceneStart("scene2")}
      durationInFrames={getL5Scene("scene2").sceneFrames}
    >
      <Scene02WhatIsLlm />
    </Sequence>

    <Sequence
      name="03 · Step 1 · Tokenization"
      from={getL5SceneStart("scene3")}
      durationInFrames={getL5Scene("scene3").sceneFrames}
    >
      <Scene03Tokenization />
    </Sequence>

    <Sequence
      name="04 · Step 2 · Embeddings"
      from={getL5SceneStart("scene4")}
      durationInFrames={getL5Scene("scene4").sceneFrames}
    >
      <Scene04Embeddings />
    </Sequence>

    <Sequence
      name="05 · Step 3 · Transformer & Self-Attention"
      from={getL5SceneStart("scene5")}
      durationInFrames={getL5Scene("scene5").sceneFrames}
    >
      <Scene05TransformerAttention />
    </Sequence>

    <Sequence
      name="06 · Step 4 · Probability & Decoding"
      from={getL5SceneStart("scene6")}
      durationInFrames={getL5Scene("scene6").sceneFrames}
    >
      <Scene06ProbabilitiesDecoding />
    </Sequence>

    <Sequence
      name="07 · Next Token Prediction Loop"
      from={getL5SceneStart("scene7")}
      durationInFrames={getL5Scene("scene7").sceneFrames}
    >
      <Scene07NextTokenLoop />
    </Sequence>

    <Sequence
      name="08 · Training vs Inference"
      from={getL5SceneStart("scene8")}
      durationInFrames={getL5Scene("scene8").sceneFrames}
    >
      <Scene08TrainingVsInference />
    </Sequence>

    <Sequence
      name="09 · AI Engineer Core Toolkit"
      from={getL5SceneStart("scene9")}
      durationInFrames={getL5Scene("scene9").sceneFrames}
    >
      <Scene09AiEngineerToolkit />
    </Sequence>

    <Sequence
      name="10 · Recap, Next Lesson & CTA"
      from={getL5SceneStart("scene10")}
      durationInFrames={getL5Scene("scene10").sceneFrames}
    >
      <Scene10RecapNextCta />
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
    id="AiLesson5Vertical"
    component={Lesson5HowLlmsWorkVideo}
    width={L5_WIDTH}
    height={L5_HEIGHT}
    fps={L5_FPS}
    durationInFrames={L5_TOTAL_FRAMES}
  />
));
