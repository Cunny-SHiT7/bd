import { useForm } from 'react-hook-form'
import { themes } from '../../libs/config'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { env } from 'process'

interface GenerateMessageProps {
  name: string
  gender: 'MALE' | 'FEMALE'
  theme: string
}

const GenerateFormInfo = () => {
  const { register, handleSubmit } = useForm<GenerateMessageProps>()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: values => {
      return axios.post(`abc.cunny.dev/createRender`, values)
    },
  })

  const createRender = async (values: any) => {
    console.log(values)
    const data = await mutation.mutateAsync(values)
    console.log(data)
    navigate(`/${data.data.id}`)
  }

  return (
    <form onSubmit={handleSubmit(createRender)}>
      <div className=" justify-center gap-y-2">
        <div>
          <h1>เลือกธีมของท่าน</h1>
          <select
            id="theme"
            defaultValue=""
            {...register('theme', { required: true })}
          >
            <option value="" disabled>
              เลือกธีม
            </option>
            {themes.map(theme => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
        <input
          {...register('name', {
            required: true,
          })}
          required
          type="text"
          placeholder="ชื่อของคุณ"
          className="p-1 border-2 border-black rounded-md"
        />
        <select
          className="border-2 border-black rounded-md p-1.5"
          {...register('gender')}
        >
          <option value="MALE">เสียงบรรยายผู้ชาย</option>
          <option value="FEMALE">เสียงบรรยายผู้หญิง</option>
        </select>
        <button className="border-2 border-black " disabled={mutation.isLoading}>
          {mutation.isLoading ? 'กำลังสร้าง' : 'สร้าง'}
        </button>
      </div>
    </form>
  )
}

export default GenerateFormInfo
