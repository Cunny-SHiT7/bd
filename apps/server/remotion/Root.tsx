import {
  Composition,
  continueRender,
  delayRender,
  getInputProps,
} from 'remotion'
import { useCallback, useEffect, useState } from 'react'
import { FamilyPreset } from './presets/Family'
import { JapanPreset } from './presets/Japan'
import { SadPreset } from './presets/Sad'
import { ThammaPreset } from './presets/Thamma'
import { WeebPreset } from './presets/Weeb'
import { audioBufferToDataUrl } from '@remotion/media-utils'
import { SakoyPreset } from './presets/Saiyor'
import './styles/style.css'

export const presets = {
  family: FamilyPreset, // finished
  japan: JapanPreset,
  sad: SadPreset,
  sakoy: SakoyPreset, // waiting source
  thamma: ThammaPreset,
  weeb: WeebPreset, // waiting source
}

const { voice, randomSeed, theme } = getInputProps() as {
  message: string
  voice: string
  randomSeed: string
  theme: string
}

// const voice = data.data.voice
// const randomSeed = 'gaysextest'

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
          // @ts-ignore
          component={presets[theme]}
          durationInFrames={
            parseInt((audioData.voiceDuration * 30).toFixed(0)) + 90
          }
          fps={30}
          width={360}
          height={360}
          defaultProps={{
            voiceData: audioData.voiceData,
            voiceDuration: audioData.voiceDuration,
            randomSeed,
          }}
        />
      )}
    </>
  )
}
