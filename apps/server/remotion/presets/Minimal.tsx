import { AbsoluteFill } from 'remotion'
import { BaseComposition } from '../modules/Composition'

export const MinimalPreset = (props: {
  voiceData: string
  randomSeed: string
}) => {
  return (
    <BaseComposition
      randomSeed={props.randomSeed}
      audioBuffer={props.voiceData}
      voiceDelay={20}
      pictureDelay={20}
      hideOverlay
    >
      <AbsoluteFill
        style={{
          background: 'white',
        }}
      >
        <div className="marquee">
          <p>Happy birthday</p>
        </div>
      </AbsoluteFill>
    </BaseComposition>
  )
}
