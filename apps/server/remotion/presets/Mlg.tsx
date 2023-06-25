import { Audio, Sequence, random, staticFile } from 'remotion'
import { BaseComposition, SimpleBase } from '../modules/Composition'
import { shuffleAndPickOne } from '../libs/stuff'

export const MlgPreset = (props: {
  voiceData: string
  randomSeed: string
  voiceDuration: number
}) => {
  const Videos = [
    '1.webm',
    '2.webm',
    '3.mkv',
    '4.webm',
    '5.webm',
    '6.webm',
    '7.webm',
    '8.webm',
    '9.webm',
    '10.webm',
  ]
  const Audios = ['1.mp3', '2.mp3', '3.mp3', '4.mp3']
  const Effects = ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3']

  const randomFrom = new Array(10).fill(true).map((_, i) => {
    return +(random(`random-x-${i}`) * props.voiceDuration * 100).toFixed(0)
  })

  return (
    <BaseComposition
      audioBuffer={props.voiceData}
      voiceDelay={20}
      pictureDelay={20}
      randomSeed={props.randomSeed}
    >
      <SimpleBase
        prefix="mlg"
        videos={Videos}
        audios={Audios}
        randomSeed={props.randomSeed}
      />
      {randomFrom.map(_ => (
        <Sequence from={_}>
          <Audio
            src={staticFile(
              `/presets/mlg/effect/${shuffleAndPickOne(Effects, `${_}`)}`
            )}
          />
        </Sequence>
      ))}
    </BaseComposition>
  )
}
