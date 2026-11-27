import { Composition, Folder } from "remotion";
import { aiVsAgiSchema, AiVsAgiVideo } from "./videos/ai-vs-agi/AiVsAgiVideo";
import { FPS as AI_VS_AGI_FPS, TOTAL_DURATION_FRAMES as AI_VS_AGI_TOTAL_FRAMES } from "./config/timing";
import { ComponentTest } from "./ComponentTest";
import { ComponentTestPart2 } from "./part2/ComponentTestPart2";
import {
  PART2_DEFAULT_PROPS,
  PART2_DEFAULT_TOTAL_FRAMES,
  PART2_SCENES_META,
  calculateVPSBuildMetadata,
} from "./part2/narration";
import { VPSBuildStory } from "./part2/VPSBuildStory";
import { Scene01 as Part2Scene01 } from "./part2/Scene01";
import { Scene02 as Part2Scene02 } from "./part2/Scene02";
import { Scene03 as Part2Scene03 } from "./part2/Scene03";
import { Scene04 as Part2Scene04 } from "./part2/Scene04";
import { Scene05 as Part2Scene05 } from "./part2/Scene05";
import { Scene06 as Part2Scene06 } from "./part2/Scene06";
import { Scene07 as Part2Scene07 } from "./part2/Scene07";
import { Scene08 as Part2Scene08 } from "./part2/Scene08";
import { Scene09 as Part2Scene09 } from "./part2/Scene09";
import { Scene10 as Part2Scene10 } from "./part2/Scene10";
import {
  DEFAULT_TOTAL_FRAMES,
  DEFAULT_VIDEO_PROPS,
  SCENES_META,
  calculateGitHubActionsMetadata,
} from "./narration";
import { Video } from "./Video";
import { Scene01 } from "./scenes/Scene01";
import { Scene02 } from "./scenes/Scene02";
import { Scene03 } from "./scenes/Scene03";
import { Scene04 } from "./scenes/Scene04";
import { Scene05 } from "./scenes/Scene05";
import { Scene06 } from "./scenes/Scene06";
import { Scene07 } from "./scenes/Scene07";
import { Scene08 } from "./scenes/Scene08";
import { Scene09 } from "./scenes/Scene09";
import { Scene10 } from "./scenes/Scene10";
import { AiProductVideo } from "./videos/ai-product/AiProductVideo";
import {
  AIP_TOTAL_FRAMES,
  aiProductSchema,
} from "./videos/ai-product/narration";
import { AiEngineerVideo } from "./videos/ai-engineer/AiEngineerVideo";
import {
  AIE_TOTAL_FRAMES,
  aiEngineerSchema,
} from "./videos/ai-engineer/narration";
import { PagePilotPromo } from "./videos/pagepilot-promo/PagePilotPromo";
import { TOTAL_FRAMES as PAGEPILOT_FRAMES } from "./videos/pagepilot-promo/narration";
import { LlmExplainer } from "./videos/llm-explainer/LlmExplainer";
import { LLM_TOTAL_FRAMES } from "./videos/llm-explainer/narration";
import { SshStory, SSH_SCENE_COMPONENTS } from "./videos/ssh-story/SshStory";
import { SSH_FPS, SSH_SCENES, SSH_TOTAL_FRAMES } from "./videos/ssh-story/narration";
import { HelloWorld } from "./videos/hello-world/HelloWorld";
import { Logo } from "./videos/hello-world/Logo";
import { Title } from "./videos/hello-world/Title";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="AI-vs-AGI-Lesson-6">
        <Composition
          id="AIvsAGI-Landscape"
          component={AiVsAgiVideo}
          schema={aiVsAgiSchema}
          defaultProps={{
            hasVoiceover: true,
            audioMode: "per-scene",
            hasBgm: false,
            hasSfx: true,
            showSubtitles: false,
          }}
          durationInFrames={AI_VS_AGI_TOTAL_FRAMES}
          fps={AI_VS_AGI_FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="AIvsAGI-Vertical"
          component={AiVsAgiVideo}
          schema={aiVsAgiSchema}
          defaultProps={{
            hasVoiceover: true,
            audioMode: "per-scene",
            hasBgm: false,
            hasSfx: true,
            showSubtitles: false,
          }}
          durationInFrames={AI_VS_AGI_TOTAL_FRAMES}
          fps={AI_VS_AGI_FPS}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="VPS-Build-Story-Part2">
        <Composition
          id="VPSBuildStory"
          component={VPSBuildStory}
          durationInFrames={PART2_DEFAULT_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={PART2_DEFAULT_PROPS}
          calculateMetadata={calculateVPSBuildMetadata}
        />
        <Composition
          id="ComponentTestPart2"
          component={ComponentTestPart2}
          durationInFrames={240}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Part2Scene01"
          component={Part2Scene01}
          durationInFrames={PART2_SCENES_META[0].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Part2Scene02"
          component={Part2Scene02}
          durationInFrames={PART2_SCENES_META[1].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Part2Scene03"
          component={Part2Scene03}
          durationInFrames={PART2_SCENES_META[2].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Part2Scene04"
          component={Part2Scene04}
          durationInFrames={PART2_SCENES_META[3].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Part2Scene05"
          component={Part2Scene05}
          durationInFrames={PART2_SCENES_META[4].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Part2Scene06"
          component={Part2Scene06}
          durationInFrames={PART2_SCENES_META[5].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Part2Scene07"
          component={Part2Scene07}
          durationInFrames={PART2_SCENES_META[6].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Part2Scene08"
          component={Part2Scene08}
          durationInFrames={PART2_SCENES_META[7].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Part2Scene09"
          component={Part2Scene09}
          durationInFrames={PART2_SCENES_META[8].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Part2Scene10"
          component={Part2Scene10}
          durationInFrames={PART2_SCENES_META[9].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="GitHub-Actions-Story">
        <Composition
          id="GitHubActionsStory"
          component={Video}
          durationInFrames={DEFAULT_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={DEFAULT_VIDEO_PROPS}
          calculateMetadata={calculateGitHubActionsMetadata}
        />
        <Composition
          id="ComponentTest"
          component={ComponentTest}
          durationInFrames={240}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene01"
          component={Scene01}
          durationInFrames={SCENES_META[0].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene02"
          component={Scene02}
          durationInFrames={SCENES_META[1].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene03"
          component={Scene03}
          durationInFrames={SCENES_META[2].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene04"
          component={Scene04}
          durationInFrames={SCENES_META[3].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene05"
          component={Scene05}
          durationInFrames={SCENES_META[4].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene06"
          component={Scene06}
          durationInFrames={SCENES_META[5].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene07"
          component={Scene07}
          durationInFrames={SCENES_META[6].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene08"
          component={Scene08}
          durationInFrames={SCENES_META[7].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene09"
          component={Scene09}
          durationInFrames={SCENES_META[8].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene10"
          component={Scene10}
          durationInFrames={SCENES_META[9].baseDurationFrames}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="AI-Product-Lesson-3">
        <Composition
          id="AiProductLesson3Vertical"
          component={AiProductVideo}
          schema={aiProductSchema}
          defaultProps={{ showSubtitles: true, showHud: true, cinematicGrain: true }}
          durationInFrames={AIP_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="AiProductLesson3"
          component={AiProductVideo}
          schema={aiProductSchema}
          defaultProps={{ showSubtitles: true, showHud: true, cinematicGrain: true }}
          durationInFrames={AIP_TOTAL_FRAMES}
          fps={30}
          width={3840}
          height={2160}
        />
        <Composition
          id="AiProductLesson3-1080p"
          component={AiProductVideo}
          schema={aiProductSchema}
          defaultProps={{ showSubtitles: true, showHud: true, cinematicGrain: true }}
          durationInFrames={AIP_TOTAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="AI-Engineer-Lesson-1">
        <Composition
          id="AiEngineerLesson1"
          component={AiEngineerVideo}
          schema={aiEngineerSchema}
          defaultProps={{ showSubtitles: true }}
          durationInFrames={AIE_TOTAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

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

      <Folder name="SSH-Story">
        <Composition
          id="SshStory"
          component={SshStory}
          durationInFrames={SSH_TOTAL_FRAMES}
          fps={SSH_FPS}
          width={1080}
          height={1920}
        />
        {SSH_SCENES.map((sc, i) => (
          <Composition
            key={sc.id}
            id={`SshScene${String(sc.id).padStart(2, "0")}`}
            component={SSH_SCENE_COMPONENTS[i] as React.FC}
            durationInFrames={sc.frames}
            fps={SSH_FPS}
            width={1080}
            height={1920}
          />
        ))}
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
