import {
  Composition,
  continueRender,
  delayRender,
  getInputProps,
} from 'remotion'
import { useCallback, useEffect, useState } from 'react'
import { FamilyPreset } from '../presets/Family'
import { SadPreset } from '../presets/Sad'
import { ThammaPreset } from '../presets/Thamma'
import { WeebPreset } from '../presets/Weeb'
import { audioBufferToDataUrl } from '@remotion/media-utils'
import { SakoyPreset } from '../presets/Saiyor'
import { MinimalPreset } from '../presets/Minimal'
import '../styles/style.css'
import { WeebAccSao } from '../presets/WeebAccSao'
import { MlgPreset } from '../presets/Mlg'

export const presets = {
  family: FamilyPreset, // finished
  sad: SadPreset, // finished
  sakoi: SakoyPreset, // finished
  thamma: ThammaPreset, // finished
  weeb: WeebPreset, // finished
  minimal: MinimalPreset, // finished
  weeb_butiwanttoaccsao: WeebAccSao, // finished
  mlg: MlgPreset, // finished
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
    const voiceData = audioBufferToDataUrl(audioBuffer)

    setAudioData({
      voiceData: voiceData,
      voiceDuration: audioBuffer.duration,
    })

    continueRender(handle)
    console.log('fetched')
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
          fps={25}
          width={320}
          height={320}
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
