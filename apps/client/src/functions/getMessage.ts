import axios from 'axios'

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
  }>(`https://abc.cunny.dev/generate`, {
    name: values.name,
    gender: values.gender,
    theme: values.theme,
  }, { timeout: 600000 })

  return data.data
}
