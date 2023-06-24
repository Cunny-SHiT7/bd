import { Player } from "@remotion/player"
import { useForm } from "react-hook-form"
import PlaceholderPreset from "../components/presets/PlaceholderPreset"
import { nameAtom, promptAtom } from "../components/model/Atoms"
import { useAtom } from "jotai"

interface FormValue {
    name: string
}

const GenerateForm = () => {

    const { register, handleSubmit } = useForm<FormValue>()
    const [name, setName] = useAtom(nameAtom)
    const [prompt, setPrompt] = useAtom(promptAtom)

    const handleGenerate = (data: FormValue) => {
        console.log(data)
    }



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
                <input {...register('name')} type="text" placeholder="ชื่อของคุณ" className="p-1 border-2 border-black rounded-md"></input>
                <button className="p-1 border-2 border-gray-600 rounded-md">Submit</button>
            </form>
        </div>
    )
}

export default GenerateForm