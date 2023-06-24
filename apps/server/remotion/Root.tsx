import { Composition, continueRender, delayRender, getInputProps } from 'remotion'
import { useCallback, useEffect, useState } from 'react'
import { audioBufferToDataUrl } from '@remotion/media-utils'
import { FamilyPreset } from './presets/Family'
import './styles/style.css'
import { JapanPreset } from './presets/Japan'
import { SadPreset } from './presets/Sad'
import { SaiyorPreset } from './presets/Saiyor'
import { ThammaPreset } from './presets/Thamma'
import { WeebPreset } from './presets/Weeb'
import axios from 'axios'

export const presets = {
  "family": FamilyPreset,
  "japan": JapanPreset,
  'sad': SadPreset,
  'saiyor': SaiyorPreset,
  'thamma': ThammaPreset,
  'weeb': WeebPreset
}

const { name, gender } = getInputProps()
const preset = getInputProps().preset as keyof typeof presets

export const RemotionRoot: React.FC = () => {
  const [audioBuffer, setAudioBuffer] = useState<string | null>(null)
  const [duration, setDuration] = useState<number>(0)
  const [handle] = useState(() => delayRender())

  const fetchData = useCallback(async () => {

    const response = await axios.post<{
      data: {
        voice: string,
        message: string
      }
    }>("http://localhost:4000/random", {
      name,
      gender
    })

    await axios.post('http://localhost:4000/mirror', {
      test: preset
    })

    // Parse base64 to ArrayBuffer
    const arrayBuffer = Uint8Array.from(atob(response.data.data.voice), c =>
      c.charCodeAt(0)
    )
    const audioBuffer = await new AudioContext().decodeAudioData(
      arrayBuffer.buffer
    )

    setDuration(audioBuffer.duration)

    // Load from remotion
    setAudioBuffer(audioBufferToDataUrl(audioBuffer))

    continueRender(handle)
  }, [handle])

  useEffect(() => {
    console.log('bruh')
    fetchData()
  }, [fetchData])

  console.log('hello owrld')

  return (
    <>
      {duration && (
        <Composition
          id="MyComposition"
          component={presets[preset ? preset : "family"]}
          durationInFrames={parseInt((duration * 30).toFixed(0)) + 90}
          fps={30}
          width={360}
          height={360}
          defaultProps={{
            audioBuffer: audioBuffer as string,
          }}
        />
      )}
    </>
  )
}
