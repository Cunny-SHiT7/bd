import { Audio, Sequence, Video, staticFile } from 'remotion'
import { BaseComposition } from '../Composition'

export const Sakoy1Preset = (props: { voiceData: string }) => {
  return (
    <BaseComposition
      audioBuffer={props.voiceData}
      voiceDelay={20}
      pictureDelay={20}
    >
      <Sequence from={20} className="z-10 scale-[2] tranform">
        <Video
          volume={0.075}
          src={staticFile('presets/sakoy/video/Funeral1.webm')}
          className="z-10 w-full opacity-30"
        />
      </Sequence>
      <Audio src={staticFile('presets/sakoy/sound/saiyor.mp3')} volume={0.2} />
    </BaseComposition>
  )
}

export const Sakoy2Preset = (props: { voiceData: string }) => {
  return (
    <BaseComposition
      audioBuffer={props.voiceData}
      voiceDelay={20}
      pictureDelay={20}
    >
      <Sequence from={20} className="z-10 scale-[2] tranform">
        <Video
          volume={0.075}
          src={staticFile('presets/sakoy/video/Racing0.webm')}
          className="z-10 w-full opacity-30"
        />
      </Sequence>
      <Audio src={staticFile('presets/sakoy/sound/UnwelcomeSchoolE3.mp3')} volume={0.2} />
    </BaseComposition>
  )
}

export const Sakoy3Preset = (props: { voiceData: string }) => {
  return (
    <BaseComposition
      audioBuffer={props.voiceData}
      voiceDelay={20}
      pictureDelay={20}
    >
      <Sequence from={20} className="z-10 scale-[2] tranform">
        <Video
          volume={0.075}
          src={staticFile('presets/sakoy/video/Racing1.webm')}
          className="z-10 w-full opacity-30"
        />
      </Sequence>
      <Audio src={staticFile('presets/sakoy/sound/IDOL-Rodhae.mp3')} volume={0.2} />
    </BaseComposition>
  )
}