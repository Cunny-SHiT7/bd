import axios from 'axios'
import { env } from 'process'

type GetMessageProps = {
  name: string
  gender: 'MALE' | 'FEMALE'
  theme: string
}

export const getVideoFn = async (values: GetMessageProps) => {
  const { data } = await axios.post<{
    data: {
      id: string
    }
  }>(`abc.cunny.dev/generate`, {
    name: values.name,
    gender: values.gender,
    theme: values.theme,
  })

  return data.data
}
