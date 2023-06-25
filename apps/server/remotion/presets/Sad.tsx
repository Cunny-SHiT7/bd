import { Audio, Sequence, Video, staticFile } from 'remotion'
import { BaseComposition } from '../modules/Composition'
import { shuffleAndPickOne } from '../libs/stuff'

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
      <Sequence from={20}>
        <Video
          src={staticFile(
            `/presets/sad/video/${shuffleAndPickOne(
              Videos,
              props.randomSeed + '-video'
            )}`
          )}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 5,
          }}
        />
      </Sequence>
      <Audio
        src={staticFile(
          `/presets/sad/sound/${shuffleAndPickOne(
            Audios,
            props.randomSeed + '-audio'
          )}`
        )}
        volume={0.3}
      />
    </BaseComposition>
  )
}
