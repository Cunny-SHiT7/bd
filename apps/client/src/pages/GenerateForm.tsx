import { Player } from "@remotion/player"
import { useForm } from "react-hook-form"
import PlaceholderPreset from "../components/presets/BasePreset"
import { nameAtom, promptAtom } from "../components/model/Atoms"
import { useAtom } from "jotai"
import { useMutation, useQuery } from "react-query"
import { fetchPrompt } from "../components/fetch/FetchPrompt"
import TestPreset from "../components/presets/TestPreset"
import { getMessageFn } from "../functions/getMessage"

interface GenerateMessageProps {
    name: string
    gender: "MALE" | "FEMALE"
}

const GenerateForm = () => {
    const { register, handleSubmit } = useForm<GenerateMessageProps>()

    const handleGenerate = async (data: GenerateMessageProps) => {
        await handleFetch.mutateAsync({
            name: data.name,
            gender: data.gender
        })
    }

    const handleFetch = useMutation('prompt', getMessageFn, {
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.error(error)
        }
    })

    return (
        <div className="grid place-items-center min-h-screen">
            <div>
                <Player
                    component={TestPreset}
                    durationInFrames={120}
                    compositionHeight={360}
                    compositionWidth={360}
                    fps={30}
                />
            </div>
            <form onSubmit={handleSubmit(handleGenerate)}>
                <div className="flex justify-center gap-x-2">
                    <input {...register('name')} type="text" placeholder="ชื่อของคุณ" className="p-1 border-2 border-black rounded-md" />
                    <select {...register('gender')}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                    <button className="p-1 border-2 border-gray-600 rounded-md">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default GenerateForm