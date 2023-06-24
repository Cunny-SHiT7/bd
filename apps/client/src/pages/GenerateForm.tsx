import { useForm } from "react-hook-form"

interface FormValue {
    theme: "1" | "2" | "3"
}

const GenerateForm = () => {

    const { register, handleSubmit } = useForm<FormValue>()

    const handleGenerate = (data: FormValue) => {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleGenerate)}>
                <select {...register("theme")}>
                    <option value="1">Theme 1</option>
                    <option value="2">Theme 2</option>
                    <option value="3">Theme 3</option>
                </select>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default GenerateForm