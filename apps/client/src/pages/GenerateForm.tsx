import { Player } from "@remotion/player"
import { useForm } from "react-hook-form"
import PlaceholderPreset from "../components/presets/BasePreset"
import { nameAtom, promptAtom } from "../components/model/Atoms"
import { useAtom } from "jotai"
import { useMutation, useQuery } from "react-query"
import { fetchPrompt } from "../components/fetch/FetchPrompt"
import TestPreset from "../components/presets/TestPreset"

interface FormValue {
    name: string
}

const GenerateForm = () => {

    const { register, handleSubmit } = useForm<FormValue>()
    const [name, setName] = useAtom(nameAtom)
    const [prompt, setPrompt] = useAtom(promptAtom)

    const handleGenerate = async (data: FormValue) => {
        console.log(data)
        await handleFetch.mutateAsync(data.name)
    }

    const handleFetch = useMutation('prompt', fetchPrompt, {

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
                    <input {...register('name')} type="text" placeholder="ชื่อของคุณ" className="p-1 border-2 border-black rounded-md"></input>
                    <button className="p-1 border-2 border-gray-600 rounded-md">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default GenerateForm