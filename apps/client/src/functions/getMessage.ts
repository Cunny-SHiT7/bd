import axios from 'axios'
import { themes } from '../components/presets/Preset'

type GetMessageProps = {
  name: string
  gender: 'MALE' | 'FEMALE'
  theme: string
}

export const getVideoFn = async (values: GetMessageProps) => {
  const { data } = await axios.post<{
    data: {
      // // Video source URL
      // url: string
      // ID for fetching rendering status
      id: string
    }
  }>('http://localhost:4000/generate', {
    name: values.name,
    gender: values.gender,
    theme: values.theme,
  })

  return data.data
}
