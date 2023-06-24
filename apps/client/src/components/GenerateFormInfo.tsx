import { useAtom } from "jotai"
import { nameAtom, promptAtom, voiceAtom } from "./model/UserAtom"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { getMessageFn } from "../functions/getMessage"
import { Link, useNavigate } from "react-router-dom"
import { Theme, themes } from "./presets/Preset"
import { useRef, useState } from "react"

interface GenerateMessageProps {
    name: string
    gender: 'MALE' | 'FEMALE'
}

const GenerateFormInfo = () => {

    const navigate = useNavigate()

    const [theme, setTheme] = useState<Theme | undefined>(themes[0])
    const Select = useRef<any>(null)

    const [name, setName] = useAtom(nameAtom)

    const { register, handleSubmit } = useForm<GenerateMessageProps>()

    const handleGenerate = async (data: GenerateMessageProps) => {
        if (!theme?.key) return
        setName(data.name)
        navigate(`/share/${theme?.key}/${data.name}?gender=${data.gender}`)
    }

    const handleSelect = () => {
        if (!Select?.current?.value) return
        setTheme(themes[Select.current.value])
    }

    return (
        <form onSubmit={handleSubmit(handleGenerate)}>
            <div className="flex flex-col justify-center gap-y-2">
                <div>
                    <h1>เลือกธีมของท่าน</h1>
                    <select className="w-full border-2 border-black px-1" ref={Select} onChange={handleSelect} >
                        {
                            themes.map((theme) => {
                                return (
                                    <option key={theme.key} value={theme.key}>{theme.display}</option>
                                )
                            })
                        }
                    </select>
                </div>
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
                <button className="p-1 rounded-md bg-blue-400 text-white text-center font-bold">
                    Generate
                </button>
            </div>
        </form>

    )
}

export default GenerateFormInfo