import {
  Composition,
  continueRender,
  delayRender,
  getInputProps,
} from 'remotion'
import { useCallback, useEffect, useState } from 'react'
import { FamilyPreset } from './presets/Family'
import './styles/style.css'
import { JapanPreset } from './presets/Japan'
import { SadPreset } from './presets/Sad'
import { ThammaPreset } from './presets/Thamma'
import { WeebPreset } from './presets/Weeb'
import { audioBufferToDataUrl } from '@remotion/media-utils'
import { Sakoy1Preset, Sakoy2Preset, Sakoy3Preset } from './presets/SaiyorPreset'

export const presets = {
  family: FamilyPreset,
  japan: JapanPreset,
  sad: SadPreset,
  sakoy: [Sakoy1Preset, Sakoy2Preset, Sakoy3Preset],
  thamma: ThammaPreset,
  weeb: WeebPreset,
}

const { voice } = getInputProps() as {
  message: string
  voice: string
}

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
          component={presets['family']}
          durationInFrames={
            parseInt((audioData.voiceDuration * 30).toFixed(0)) + 90
          }
          fps={30}
          width={360}
          height={360}
          defaultProps={{
            voiceData: audioData.voiceData,
          }}
        />
      )}
    </>
  )
}
