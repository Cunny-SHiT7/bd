import { Audio, Sequence, Video, staticFile } from 'remotion'
import { BaseComposition } from '../Composition'

export const FamilyPreset = (props: { audioBuffer: string }) => {
  return (
    <BaseComposition
      audioBuffer={props.audioBuffer}
      voiceDelay={20}
      pictureDelay={20}
    >
      {/* <Audio src={staticFile('saiyor.mp3')} volume={0.1} /> */}
    </BaseComposition>
  )
}
