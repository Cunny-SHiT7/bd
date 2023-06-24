import { Player } from "@remotion/player"
import { useForm } from "react-hook-form"
import PlaceholderPreset from "../components/presets/PlaceholderPreset"
import { useMutation } from "react-query"
import { getMessageFn } from "../functions/getMessage"

interface FormValue {
    name: string
}

const GenerateForm = () => {
    const { register, handleSubmit } = useForm<FormValue>()


    const handleGenerate = async (data: FormValue) => {
        await handleFetch.mutateAsync({
            name: data.name,
            gender: 'MALE'
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
                    component={PlaceholderPreset}
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