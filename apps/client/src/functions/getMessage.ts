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
  }>('http://localhost:4000/generate', {
    name: values.name,
    gender: values.gender,
    theme: values.theme,
  })

  return data.data
}
