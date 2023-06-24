import { Audio, staticFile } from 'remotion'
import { BaseComposition } from '../Composition'

export const FamilyPreset = (props: { voiceData: string }) => {
  return (
    <BaseComposition
      audioBuffer={props.voiceData}
      voiceDelay={20}
      pictureDelay={20}
    >
      <Audio src={staticFile('saiyor.mp3')} volume={0.1} />
    </BaseComposition>
  )
}
