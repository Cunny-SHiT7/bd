import axios from 'axios'

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
