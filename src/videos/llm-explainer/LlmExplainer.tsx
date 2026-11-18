import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { LLM_C, LLM_FONT, getLlmScene, getLlmSceneStart } from "./narration";
import { Scene1Intro } from "./Scene1Intro";
import { Scene2Tokenization } from "./Scene2Tokenization";
import { Scene3Embeddings } from "./Scene3Embeddings";
import { Scene4Transformer } from "./Scene4Transformer";
import { Scene5Attention } from "./Scene5Attention";
import { Scene6Prediction } from "./Scene6Prediction";
import { Scene7TrainInfer } from "./Scene7TrainInfer";
import { Scene8Engineering } from "./Scene8Engineering";

export const LlmExplainer: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: LLM_C.bg, fontFamily: LLM_FONT }}>
    <Sequence name="1 · LLM Introduction" from={getLlmSceneStart("scene1")} durationInFrames={getLlmScene("scene1").sceneFrames}>
      <Scene1Intro />
    </Sequence>
    <Sequence name="2 · Tokenization" from={getLlmSceneStart("scene2")} durationInFrames={getLlmScene("scene2").sceneFrames}>
      <Scene2Tokenization />
    </Sequence>
    <Sequence name="3 · Embeddings" from={getLlmSceneStart("scene3")} durationInFrames={getLlmScene("scene3").sceneFrames}>
      <Scene3Embeddings />
    </Sequence>
    <Sequence name="4 · Transformer" from={getLlmSceneStart("scene4")} durationInFrames={getLlmScene("scene4").sceneFrames}>
      <Scene4Transformer />
    </Sequence>
    <Sequence name="5 · Self-Attention" from={getLlmSceneStart("scene5")} durationInFrames={getLlmScene("scene5").sceneFrames}>
      <Scene5Attention />
    </Sequence>
    <Sequence name="6 · Next Token Prediction" from={getLlmSceneStart("scene6")} durationInFrames={getLlmScene("scene6").sceneFrames}>
      <Scene6Prediction />
    </Sequence>
    <Sequence name="7 · Training vs Inference" from={getLlmSceneStart("scene7")} durationInFrames={getLlmScene("scene7").sceneFrames}>
      <Scene7TrainInfer />
    </Sequence>
    <Sequence name="8 · LLM Engineering" from={getLlmSceneStart("scene8")} durationInFrames={getLlmScene("scene8").sceneFrames}>
      <Scene8Engineering />
    </Sequence>
  </AbsoluteFill>
);
