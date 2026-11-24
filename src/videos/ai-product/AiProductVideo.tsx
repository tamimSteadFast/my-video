import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  AIP_C,
  AIP_FONT,
  getAipScene,
  getAipSceneStart,
  type AiProductProps,
} from "./narration";
import { Scene1IntelligentProduct } from "./Scene1IntelligentProduct";
import { Scene2TraditionalVsAi } from "./Scene2TraditionalVsAi";
import { Scene3AutomationLifecycle } from "./Scene3AutomationLifecycle";
import { Scene4DataDrivenDecisions } from "./Scene4DataDrivenDecisions";
import { Scene5PersonalizedUx } from "./Scene5PersonalizedUx";
import { Scene6PredictiveMaintenance } from "./Scene6PredictiveMaintenance";
import { Scene7ScalableFoundations } from "./Scene7ScalableFoundations";
import { Scene8EngineerImpact } from "./Scene8EngineerImpact";

export const AiProductVideo: React.FC<AiProductProps> = ({
  showSubtitles = true,
  showHud = true,
  cinematicGrain = true,
}) => (
  <AbsoluteFill style={{ backgroundColor: AIP_C.bg, fontFamily: AIP_FONT }}>
    {/* Scene 1: Intelligent, Faster & Personalized Software */}
    <Sequence
      name="1 · Intelligent, Faster & Personalized"
      from={getAipSceneStart("scene1")}
      durationInFrames={getAipScene("scene1").sceneFrames}
    >
      <Scene1IntelligentProduct showSubtitles={showSubtitles} showHud={showHud} />
    </Sequence>

    {/* Scene 2: Traditional Rules vs. AI Pattern Learning */}
    <Sequence
      name="2 · Rules vs. Learning Paradigm"
      from={getAipSceneStart("scene2")}
      durationInFrames={getAipScene("scene2").sceneFrames}
    >
      <Scene2TraditionalVsAi showSubtitles={showSubtitles} showHud={showHud} />
    </Sequence>

    {/* Scene 3: Impact 01 - Automation in Development Lifecycle */}
    <Sequence
      name="3 · Impact 01 - Automation"
      from={getAipSceneStart("scene3")}
      durationInFrames={getAipScene("scene3").sceneFrames}
    >
      <Scene3AutomationLifecycle showSubtitles={showSubtitles} showHud={showHud} />
    </Sequence>

    {/* Scene 4: Impact 02 - Data-Driven Decision Making */}
    <Sequence
      name="4 · Impact 02 - Data Decisions"
      from={getAipSceneStart("scene4")}
      durationInFrames={getAipScene("scene4").sceneFrames}
    >
      <Scene4DataDrivenDecisions showSubtitles={showSubtitles} showHud={showHud} />
    </Sequence>

    {/* Scene 5: Impact 03 - Personalized UX (Netflix & E-commerce) */}
    <Sequence
      name="5 · Impact 03 - Personalized UX"
      from={getAipSceneStart("scene5")}
      durationInFrames={getAipScene("scene5").sceneFrames}
    >
      <Scene5PersonalizedUx showSubtitles={showSubtitles} showHud={showHud} />
    </Sequence>

    {/* Scene 6: Impact 04 - Predictive Maintenance & Quality Control */}
    <Sequence
      name="6 · Impact 04 - Predictive QA"
      from={getAipSceneStart("scene6")}
      durationInFrames={getAipScene("scene6").sceneFrames}
    >
      <Scene6PredictiveMaintenance showSubtitles={showSubtitles} showHud={showHud} />
    </Sequence>

    {/* Scene 7: Foundations - Architecture, Data & Evaluation */}
    <Sequence
      name="7 · Architecture & Evaluation"
      from={getAipSceneStart("scene7")}
      durationInFrames={getAipScene("scene7").sceneFrames}
    >
      <Scene7ScalableFoundations showSubtitles={showSubtitles} showHud={showHud} />
    </Sequence>

    {/* Scene 8: The True Mission of an AI Engineer */}
    <Sequence
      name="8 · Real Impact & Finale"
      from={getAipSceneStart("scene8")}
      durationInFrames={getAipScene("scene8").sceneFrames}
    >
      <Scene8EngineerImpact showSubtitles={showSubtitles} showHud={showHud} />
    </Sequence>

    {/* Cinematic Vignette */}
    {cinematicGrain ? (
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 65%, rgba(0, 0, 0, 0.75) 100%)",
          zIndex: 80,
        }}
      />
    ) : null}
  </AbsoluteFill>
);
