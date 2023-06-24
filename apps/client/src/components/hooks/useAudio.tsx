import { useAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import {
  audioBufferAtom,
  audioDataURLAtom,
  promptAtom,
  voiceAtom,
} from '../model/UserAtom'
import { audioBufferToDataUrl } from '@remotion/media-utils'

const useAudio = () => {
  const [voice] = useAtom(voiceAtom)

  const [audioBuffer, setAudioBuffer] = useAtom(audioBufferAtom)
  const [audioDataURL, setAudioDataURL] = useAtom(audioDataURLAtom)

  useEffect(() => {
    const parse = async () => {
      if (!voice) return
      const parsedIntArray = Uint8Array.from(atob(voice), c => c.charCodeAt(0))

      const audioBuffer = await new AudioContext().decodeAudioData(
        parsedIntArray.buffer
      )
      setAudioBuffer(audioBuffer)
    }
    parse()
  }, [voice])

  useEffect(() => {
    if (!audioBuffer) return
    setAudioDataURL(audioBufferToDataUrl(audioBuffer))
  }, [audioBuffer])

  const duration = useMemo(() => {
    if (!audioBuffer?.duration) return
    return audioBuffer?.duration
  }, [audioBuffer])

  return {
    audioBuffer,
    audioDataURL,
    duration,
  }
}

export default useAudio
