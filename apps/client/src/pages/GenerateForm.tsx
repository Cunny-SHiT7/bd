import { Player } from '@remotion/player'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import TestPreset from '../components/presets/TestPreset'
import { getMessageFn } from '../functions/getMessage'
import { nameAtom, promptAtom, voiceAtom } from '../components/model/UserAtom'
import { useAtom } from 'jotai'
import useAudio from '../components/hooks/useAudio'
import { VIDEO_FRAMES_PER_SECOND } from '../components/model/VideoMetaAtom'

interface GenerateMessageProps {
  name: string
  gender: 'MALE' | 'FEMALE'
}

const GenerateForm = () => {
  const { register, handleSubmit } = useForm<GenerateMessageProps>()

  const [, setPrompt] = useAtom(promptAtom)
  const [, setName] = useAtom(nameAtom)
  const [, setVoice] = useAtom(voiceAtom)

  const handleGenerate = async (data: GenerateMessageProps) => {
    await handleFetch.mutateAsync({
      name: data.name,
      gender: data.gender,
    })
    setName(data.name)
  }

  const handleFetch = useMutation('prompt', getMessageFn, {
    onSuccess: data => {
      setPrompt(data.message)
      setVoice(data.voice)
    },
    onError: error => {
      console.error(error)
    },
  })

  const { duration } = useAudio()

  return (
    <div className="grid min-h-screen place-items-center">
      <div>
        <Player
          controls={duration ? true : false}
          component={TestPreset}
          durationInFrames={Math.floor(
            (duration ?? 1) * VIDEO_FRAMES_PER_SECOND
          )}
          compositionHeight={360}
          compositionWidth={360}
          fps={VIDEO_FRAMES_PER_SECOND}
        />
      </div>
      <form onSubmit={handleSubmit(handleGenerate)}>
        <div className="flex justify-center gap-x-2">
          <input
            {...register('name')}
            type="text"
            placeholder="ชื่อของคุณ"
            className="p-1 border-2 border-black rounded-md"
          />
          <select {...register('gender')}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <button className="p-1 border-2 border-gray-600 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default GenerateForm
