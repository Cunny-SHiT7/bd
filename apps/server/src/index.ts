import express from 'express'

import { birthdayWishes } from './constant'

//
(() => {
const app = express()
app.use(express.json())

app.post('/random', (req, res) => {
const name = req.body?.name
if (!name) {
  res.status(400).json({ statusCode: 400, message: 'body "name" is required' })
}
const randomMessage1 = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)].replace('_NAME_', name)
const randomMessage2 = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)].replace('_NAME_', name)
const randomMessage3 = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)].replace('_NAME_', name)
const randomMessage4 = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)].replace('_NAME_', name)
const randomMessage = `${randomMessage1} ` + `${randomMessage2} ` + `${randomMessage3} ` + `${randomMessage4}`

res.status(200).json({ statusCode: 200, data: { message: randomMessage } })
})

app.listen(4000, 'localhost', () => {
  console.log('Server running at http://localhost:4000')
})
})()

