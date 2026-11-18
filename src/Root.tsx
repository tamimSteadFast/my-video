import { Composition, Folder } from "remotion";
import { PagePilotPromo } from "./videos/pagepilot-promo/PagePilotPromo";
import { TOTAL_FRAMES as PAGEPILOT_FRAMES } from "./videos/pagepilot-promo/narration";
import { LlmExplainer } from "./videos/llm-explainer/LlmExplainer";
import { LLM_TOTAL_FRAMES } from "./videos/llm-explainer/narration";
import { HelloWorld } from "./videos/hello-world/HelloWorld";
import { Logo } from "./videos/hello-world/Logo";
import { Title } from "./videos/hello-world/Title";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="PagePilot">
        <Composition
          id="PromoVertical"
          component={PagePilotPromo}
          durationInFrames={PAGEPILOT_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PromoWide"
          component={PagePilotPromo}
          durationInFrames={PAGEPILOT_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="LLM-Lesson-1">
        <Composition
          id="LlmExplainer"
          component={LlmExplainer}
          durationInFrames={LLM_TOTAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="LlmExplainerMobile"
          component={LlmExplainer}
          durationInFrames={LLM_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="Examples">
        <Composition
          id="HelloWorld"
          component={HelloWorld}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
    </>
  );
};
