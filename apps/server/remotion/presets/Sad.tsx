import { BaseComposition, SimpleBase } from '../modules/Composition'

export const SadPreset = (props: { voiceData: string; randomSeed: string }) => {
  const Videos = [
    '1.webm',
    '2.webm',
    '3.webm',
    '4.webm',
    '5.webm',
    '6.webm',
    '7.webm',
  ]
  const Audios = ['1.opus', '2.opus', '3.opus']

  return (
    <BaseComposition
      audioBuffer={props.voiceData}
      voiceDelay={20}
      pictureDelay={20}
      randomSeed={props.randomSeed}
    >
      <SimpleBase
        prefix="sad"
        videos={Videos}
        audios={Audios}
        randomSeed={props.randomSeed}
      />
    </BaseComposition>
  )
}
