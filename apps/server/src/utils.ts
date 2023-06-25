import axios from 'axios'
import FormData from 'form-data'
import { ReadStream } from 'fs'
import { birthdayWishes } from './constant'

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

export const randomEE = async (name: string, gender: "MALE" | "FEMALE") => {
  const randomMessage1 = birthdayWishes[
    Math.floor(Math.random() * birthdayWishes.length)
  ].replace('_NAME_', name)
  const randomMessage2 = birthdayWishes[
    Math.floor(Math.random() * birthdayWishes.length)
  ].replace('_NAME_', name)
  const randomMessage3 = birthdayWishes[
    Math.floor(Math.random() * birthdayWishes.length)
  ].replace('_NAME_', name)
  const randomMessage4 = birthdayWishes[
    Math.floor(Math.random() * birthdayWishes.length)
  ].replace('_NAME_', name)
  const randomMessage =
    `${randomMessage1} ` +
    `${randomMessage2} ` +
    `${randomMessage3} ` +
    `${randomMessage4}`

  const voice = await generateVoice(randomMessage, gender)

  return { statusCode: 200, data: { message: randomMessage, voice } }
}