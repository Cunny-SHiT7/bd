import axios from 'axios'

export const uploadToMirai = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('uploadType', '0')
  const { data } = await axios.post("https://up.m1r.ai/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  if (!data.success || !data.data.url) {
    throw new Error('Failed to upload to Mirai: ' + data.message)
  }
  return data
}

export const generateVoice = async (
  message: string,
  gender: 'MALE' | 'FEMALE'
) => {
  const { data } = await axios.post(process.env.VOICE_ROTATE_URL, {
    audioFormat: 'ogg',
    paragraphChunks: [message],
    voiceParams: {
      name: gender === 'MALE' ? 'Niwat' : 'Achara',
      engine: 'azure',
      languageCode: 'th-TH',
    },
  })
  const audioStream: string = data.audioStream

  return audioStream
}
