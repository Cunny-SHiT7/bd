import { BaseComposition, SimpleBase } from '../modules/Composition'

export const WeebPreset = (props: {
  voiceData: string
  voiceDuration: number
  randomSeed: string
}) => {
  const Videos = ['1.webm', '2.webm', '3.webm']
  const Audios = [
    'IDOL[CUT].opus',
    'kuwaikute_gomen[CUT].opus',
    'Platinum Disco.opus',
    'Renai_Circulation.opus',
    'summertime.opus',
    'Tiny_Little_Adiantum.opus',
  ]

  return (
    <BaseComposition
      audioBuffer={props.voiceData}
      voiceDelay={20}
      pictureDelay={20}
      randomSeed={props.randomSeed}
    >
      <SimpleBase
        prefix="weeb_kawaii"
        videos={Videos}
        audios={Audios}
        randomSeed={props.randomSeed}
      />
    </BaseComposition>
  )
}
