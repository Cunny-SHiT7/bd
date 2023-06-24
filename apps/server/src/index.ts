import express from 'express'

import { birthdayWishes } from './constant'
import { generateVoice } from './utils'

//
(() => {
const app = express()
app.use(express.json())

app.post('/random', async (req, res) => {
const name = req.body?.name
const gender = req.body?.gender
if (!name) {
  res.status(400).json({ statusCode: 400, message: 'body "name" is required' })
}
if (!gender) {
  res.status(400).json({ statusCode: 400, message: 'body "gender" is required [MALE, FEMALE]' })
}
const randomMessage1 = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)].replace('_NAME_', name)
const randomMessage2 = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)].replace('_NAME_', name)
const randomMessage3 = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)].replace('_NAME_', name)
const randomMessage4 = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)].replace('_NAME_', name)
const randomMessage = `${randomMessage1} ` + `${randomMessage2} ` + `${randomMessage3} ` + `${randomMessage4}`

const voice = await generateVoice('ฮิฟูมินด็อตแอป เว็ปไซต์หาหนังโป๊เด็ก cunny ทับ c ทับ 9', gender)

res.status(200).json({ statusCode: 200, data: { message: randomMessage, voice } })
})

app.listen(4000, 'localhost', () => {
  console.log('Server running at http://localhost:4000')
})
})()

