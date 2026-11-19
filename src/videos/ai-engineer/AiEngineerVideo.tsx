import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  AIE_C,
  AIE_FONT,
  getAieScene,
  getAieSceneStart,
  type AiEngineerProps,
} from "./narration";
import { Scene1DigitalWorld } from "./Scene1DigitalWorld";
import { Scene2EngineerRole } from "./Scene2EngineerRole";
import { Scene3EcommerceApp } from "./Scene3EcommerceApp";
import { Scene4CoreComponents } from "./Scene4CoreComponents";
import { Scene5TechStack } from "./Scene5TechStack";
import { Scene6PretrainedIntegration } from "./Scene6PretrainedIntegration";
import { Scene7FullArchitecture } from "./Scene7FullArchitecture";
import { Scene8ConfidentOutro } from "./Scene8ConfidentOutro";

export const AiEngineerVideo: React.FC<AiEngineerProps> = ({
  showSubtitles = true,
}) => (
  <AbsoluteFill style={{ backgroundColor: AIE_C.bg, fontFamily: AIE_FONT }}>
    <Sequence
      name="1 · AI-Powered Digital World"
      from={getAieSceneStart("scene1")}
      durationInFrames={getAieScene("scene1").sceneFrames}
    >
      <Scene1DigitalWorld showSubtitles={showSubtitles} />
    </Sequence>
    <Sequence
      name="2 · Who Is an AI Engineer?"
      from={getAieSceneStart("scene2")}
      durationInFrames={getAieScene("scene2").sceneFrames}
    >
      <Scene2EngineerRole showSubtitles={showSubtitles} />
    </Sequence>
    <Sequence
      name="3 · E-Commerce AI Example"
      from={getAieSceneStart("scene3")}
      durationInFrames={getAieScene("scene3").sceneFrames}
    >
      <Scene3EcommerceApp showSubtitles={showSubtitles} />
    </Sequence>
    <Sequence
      name="4 · Core AI Engineer Components"
      from={getAieSceneStart("scene4")}
      durationInFrames={getAieScene("scene4").sceneFrames}
    >
      <Scene4CoreComponents showSubtitles={showSubtitles} />
    </Sequence>
    <Sequence
      name="5 · Modern AI Engineering Stack"
      from={getAieSceneStart("scene5")}
      durationInFrames={getAieScene("scene5").sceneFrames}
    >
      <Scene5TechStack showSubtitles={showSubtitles} />
    </Sequence>
    <Sequence
      name="6 · Pre-Trained Model Integration"
      from={getAieSceneStart("scene6")}
      durationInFrames={getAieScene("scene6").sceneFrames}
    >
      <Scene6PretrainedIntegration showSubtitles={showSubtitles} />
    </Sequence>
    <Sequence
      name="7 · Complete Software Architecture"
      from={getAieSceneStart("scene7")}
      durationInFrames={getAieScene("scene7").sceneFrames}
    >
      <Scene7FullArchitecture showSubtitles={showSubtitles} />
    </Sequence>
    <Sequence
      name="8 · Confident Outro & Next Lesson"
      from={getAieSceneStart("scene8")}
      durationInFrames={getAieScene("scene8").sceneFrames}
    >
      <Scene8ConfidentOutro showSubtitles={showSubtitles} />
    </Sequence>
  </AbsoluteFill>
);
