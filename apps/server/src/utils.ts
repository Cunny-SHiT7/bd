import axios from 'axios'
import FormData from 'form-data'
import { ReadStream } from 'fs'

export const uploadToMirai = async (file: ReadStream) => {
  try {
    const netImageFormData = new FormData()
    netImageFormData.append('file', file)
    netImageFormData.append('uploadType', '0')
    const { data } = await axios.post(
      'https://up.m1r.ai/upload',
      netImageFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    if (!data.url) {
      throw new Error('Failed to upload to Mirai: ' + data.message)
    }
    return data.url as string
  } catch (e: any) {
    console.log(e)
    throw new Error('Failed to upload to Mirai: ' + e.message)
  }
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
