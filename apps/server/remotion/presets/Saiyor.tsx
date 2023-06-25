import { Audio, Sequence, Video, random, staticFile } from 'remotion'
import { BaseComposition } from '../Composition'

const sounds = [
  'Astronomia-Rodhae.opus',
  'Bruh-Rodhae.opus',
  'ConanE3.opus',
  'IDOL-Rodhae.mp3',
  'Maehang-Rodhae.opus',
  'saiyor.mp3',
  'UnwelcomeSchoolE3.opus',
  'YangDumb.opus',
]

export const SakoyPreset = (props: {
  voiceData: string
  randomSeed: string
}) => {
  return (
    <BaseComposition
      audioBuffer={props.voiceData}
      voiceDelay={40}
      pictureDelay={20}
      randomSeed={props.randomSeed}
    >
      <Sequence from={20} className="z-10 scale-[2] tranform">
        <Video
          volume={0.075}
          src={staticFile('presets/sakoy/video/Funeral1.webm')}
          className="z-10 w-full opacity-30"
        />
      </Sequence>
      <Audio
        src={staticFile(
          `/presets/sakoy/sound/${
            sounds[Math.floor(random(props.randomSeed) * sounds.length)]
          }`
        )}
        volume={0.3}
      />
    </BaseComposition>
  )
}
