import { Composition, continueRender, delayRender } from 'remotion'
import { useCallback, useEffect, useState } from 'react'
import { FamilyPreset } from './presets/Family'
import { JapanPreset } from './presets/Japan'
import { SadPreset } from './presets/Sad'
import { ThammaPreset } from './presets/Thamma'
import { WeebPreset } from './presets/Weeb'
import { audioBufferToDataUrl } from '@remotion/media-utils'
import { SakoyPreset } from './presets/SaiyorPreset'
import { data } from './test'
import './styles/style.css'

export const presets = {
  family: FamilyPreset, // finished
  japan: JapanPreset,
  sad: SadPreset,
  sakoy: SakoyPreset, // waiting source
  thamma: ThammaPreset,
  weeb: WeebPreset,
}

// const { voice } = getInputProps() as {
//   message: string
//   voice: string
// }

const voice = data.data.voice

export const RemotionRoot: React.FC = () => {
  const [handle] = useState(() => delayRender())
  const [audioData, setAudioData] = useState<{
    voiceData: string
    voiceDuration: number
  } | null>(null)

  const fetchData = useCallback(async () => {
    const arrayBuffer = Uint8Array.from(atob(voice), c => c.charCodeAt(0))
    const audioBuffer = await new AudioContext().decodeAudioData(
      arrayBuffer.buffer
    )
    setAudioData({
      voiceData: audioBufferToDataUrl(audioBuffer),
      voiceDuration: audioBuffer.duration,
    })
    continueRender(handle)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {audioData && (
        <Composition
          id="MyComposition"
          component={presets['sakoy']}
          durationInFrames={
            // parseInt((audioData.voiceDuration * 30).toFixed(0)) + 90,
            120
          }
          fps={30}
          width={360}
          height={360}
          defaultProps={{
            voiceData: audioData.voiceData,
            voiceDuration: audioData.voiceDuration,
          }}
        />
      )}
    </>
  )
}
