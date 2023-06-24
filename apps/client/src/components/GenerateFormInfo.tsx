import { useAtom } from "jotai"
import { nameAtom, promptAtom, voiceAtom } from "./model/UserAtom"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { getMessageFn } from "../functions/getMessage"

interface GenerateMessageProps {
    name: string
    gender: 'MALE' | 'FEMALE'
}

const GenerateFormInfo = () => {
    const [, setPrompt] = useAtom(promptAtom)
    const [, setName] = useAtom(nameAtom)
    const [, setVoice] = useAtom(voiceAtom)

    const { register, handleSubmit } = useForm<GenerateMessageProps>()

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


    return (
        <form onSubmit={handleSubmit(handleGenerate)}>
            <div className="flex flex-col justify-center gap-y-2">
                <input
                    {...register('name', {
                        required: true
                    })}
                    required
                    type="text"
                    placeholder="ชื่อของคุณ"
                    className="p-1 border-2 border-black rounded-md"
                />
                <select className="border-2 border-black rounded-md p-1.5" {...register('gender')}>
                    <option value="MALE">เสียงบรรยายผู้ชาย</option>
                    <option value="FEMALE">เสียงบรรยายผู้หญิง</option>
                </select>
                <button className="p-1 border-2 border-gray-600 rounded-md">
                    Submit
                </button>
            </div>
        </form>

    )
}

export default GenerateFormInfo