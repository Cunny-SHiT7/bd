import { Composition, getInputProps } from 'remotion'
import { useEffect, useMemo, useState } from 'react'
import { FamilyPreset } from './presets/Family'
import './styles/style.css'
import { JapanPreset } from './presets/Japan'
import { SadPreset } from './presets/Sad'
import { SaiyorPreset } from './presets/Saiyor'
import { ThammaPreset } from './presets/Thamma'
import { WeebPreset } from './presets/Weeb'
import { audioBufferToDataUrl } from '@remotion/media-utils'
import axios from 'axios'

export const presets = {
  "family": FamilyPreset,
  "japan": JapanPreset,
  'sad': SadPreset,
  'saiyor': SaiyorPreset,
  'thamma': ThammaPreset,
  'weeb': WeebPreset
}

const { arrayBuffer } = getInputProps() as { audioBuffer: AudioBuffer, audioURL: string, arrayBuffer: Uint8Array }

export const RemotionRoot: React.FC = () => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | undefined>(undefined)

  useEffect(() => {
    const parse = async () => {

      const parsed = await new AudioContext().decodeAudioData(
        arrayBuffer.buffer
      )

      setAudioBuffer(parsed)
    }
    parse()
  }, [arrayBuffer])

  const audioURL = useMemo(() => {
    if (!audioBuffer) return
    return audioBufferToDataUrl(audioBuffer)
  }, [audioBuffer])

  const duration = useMemo(() => {
    return audioBuffer?.duration
  }, [audioBuffer])



  return (
    <>
      {duration && audioURL && (
        <Composition
          id="MyComposition"
          component={presets["family"]}
          durationInFrames={parseInt((duration * 30).toFixed(0)) + 90}
          fps={30}
          width={360}
          height={360}
          defaultProps={{
            audioBuffer: audioURL,
          }}
        />
      )}
    </>
  )
}
