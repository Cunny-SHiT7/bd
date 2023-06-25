import { Audio, Sequence, Video, staticFile } from 'remotion'
import { BaseComposition } from '../modules/Composition'
import { shuffleAndPickOne } from '../libs/stuff'

const Audios = [
  'Astronomia-Rodhae.opus',
  'Bruh-Rodhae.opus',
  'ConanE3.opus',
  'IDOL-Rodhae.mp3',
  'Maehang-Rodhae.opus',
  'saiyor.mp3',
  'UnwelcomeSchoolE3.opus',
  'YangDumb.opus',
]

const Videos = [
  'dancing1.webm',
  'dancing2.webm',
  'dancing3.webm',
  'dancing4.webm',
  'dancing5.webm',
  'dancing6.webm',
  'dancing7.webm',
  'dancing8.webm',
  'Funeral0.webm',
  'Funeral1.webm',
  'Racing0.webm',
  'Racing1.webm',
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
          src={staticFile(
            `/presets/sakoy/video/${shuffleAndPickOne(
              Videos,
              props.randomSeed + '-video'
            )}}`
          )}
          className="z-10 w-full opacity-30"
        />
      </Sequence>
      <Audio
        src={staticFile(
          `/presets/sakoy/sound/${shuffleAndPickOne(
            Audios,
            props.randomSeed + '-audio'
          )}`
        )}
        volume={0.3}
      />
    </BaseComposition>
  )
}
