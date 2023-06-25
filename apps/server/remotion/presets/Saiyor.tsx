import { Audio, Sequence, Video, staticFile } from 'remotion'
import { BaseComposition, SimpleBase } from '../modules/Composition'
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
      <SimpleBase
        prefix="sakoy"
        audios={Audios}
        videos={Videos}
        randomSeed={props.randomSeed}
      />
    </BaseComposition>
  )
}
