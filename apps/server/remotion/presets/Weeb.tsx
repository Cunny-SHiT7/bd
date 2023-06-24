import { Audio, Sequence, Video, staticFile } from 'remotion'
import { BaseComposition } from '../Composition'

export const WeebPreset = (props: { audioBuffer: string }) => {
  return (
    <BaseComposition
      audioBuffer={props.audioBuffer}
      anounceDelay={20}
      pictureDelay={20}
    >
      <Sequence from={20} className="z-10 scale-[2] tranform">
        <Video
          muted
          src={staticFile('rodhae.mp4')}
          className="z-10 w-full opacity-30"
        />
      </Sequence>
      <Audio src={staticFile('saiyor.mp3')} volume={0.4} />
    </BaseComposition>
  )
}
