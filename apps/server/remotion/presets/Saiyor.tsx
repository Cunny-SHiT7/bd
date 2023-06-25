import { Audio, Sequence, Video, staticFile } from 'remotion'
import { BaseComposition } from '../modules/Composition'
import { shuffleAndPickOne } from '../libs/stuff'

export const SakoyPreset = (props: {
  voiceData: string
  randomSeed: string
}) => {
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
    '1.webm',
    '2.webm',
    '3.webm',
    '4.webm',
    '5.webm',
    '6.webm',
    '7.webm',
    '8.webm',
    '9.webm',
  ]

  return (
    <BaseComposition
      audioBuffer={props.voiceData}
      voiceDelay={40}
      pictureDelay={20}
      randomSeed={props.randomSeed}
    >
      <Sequence from={20} className="z-10 scale-[2] tranform">
        <Video
          src={staticFile(
            `/presets/sakoy/video/${shuffleAndPickOne(
              Videos,
              props.randomSeed + '-video'
            )}`
          )}
          className="absolute w-full h-full"
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
