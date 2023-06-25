import { Audio, Sequence, Video, staticFile } from 'remotion'
import { BaseComposition, RandomNoise } from '../Composition'
import { shuffleAndPickOne } from '../libs/stuff'

export const WeebPreset = (props: {
  voiceData: string
  voiceDuration: number
  randomSeed: string
}) => {
  const Videos = [
    'byou.webm',
    'hornymiya.webm',
    'WeebCat_0.mp4',
    'WeebCat_1.mp4',
  ]
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
      <Sequence from={20} className="z-10 scale-[2] tranform">
        <Video
          muted
          src={staticFile(
            `/presets/weeb_kawaii/video/${shuffleAndPickOne(
              Videos,
              props.randomSeed + '-video'
            )}`
          )}
          className="z-10 w-full opacity-30"
        />
      </Sequence>
      <Audio
        src={staticFile(
          `/presets/weeb_kawaii/sound/${shuffleAndPickOne(
            Audios,
            props.randomSeed + '-audio'
          )}`
        )}
        volume={0.4}
      />
      <RandomNoise
        seed={props.randomSeed}
        durationLength={props.voiceDuration}
      />
    </BaseComposition>
  )
}
