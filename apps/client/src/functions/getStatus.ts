import axios from 'axios'

export const getStatusFn = async (id: string) => {
  const response = await axios.get<{
    status: boolean
    videoURL?: string
  }>(`status/${id}`)

  return response.data
}
