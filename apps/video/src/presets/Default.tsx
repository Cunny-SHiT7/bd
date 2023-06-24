import { BaseComposition } from "../modules/Composition";

export const DefaultPreset = (props: { audioBuffer: string }) => {
  return (
    <BaseComposition audioBuffer={props.audioBuffer}>
      <h1 className="text-white">Default Preset</h1>
    </BaseComposition>
  );
};
