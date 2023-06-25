import { Audio, Sequence, Video, random, staticFile } from 'remotion'
import { BaseComposition } from '../Composition'

export const WeebPreset = (props: { voiceData: string }) => {
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
    >
      <Sequence from={20} className="z-10 scale-[2] tranform">
        <Video
          muted
          src={staticFile(
            `/presets/weeb_kawaii/video/${
              Videos[
                Math.floor(random(props.voiceData + '-video') * Videos.length)
              ]
            }`
          )}
          className="z-10 w-full opacity-30"
        />
      </Sequence>
      <Audio
        src={staticFile(
          `/presets/weeb_kawaii/sound/${
            Audios[
              Math.floor(random(props.voiceData + '-sound') * Audios.length)
            ]
          }`
        )}
        volume={0.4}
      />
    </BaseComposition>
  )
}
