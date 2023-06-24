import express from 'express'

import { birthdayWishes } from './constant'
import { generateVoice } from './utils'

//
;(() => {
  const app = express()
  app.use(express.json())

  app.use(async (_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

  app.post('/random', async (req, res) => {
    const name = req.body?.name
    const gender = req.body?.gender
    if (!name) {
      return res
        .status(400)
        .json({ statusCode: 400, message: 'body "name" is required' })
    }
    if (!gender) {
      return res.status(400).json({
        statusCode: 400,
        message: 'body "gender" is required [MALE, FEMALE]',
      })
    }
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

    return res
      .status(200)
      .json({ statusCode: 200, data: { message: randomMessage, voice } })
  })

  app.listen(4000, 'localhost', () => {
    console.log('Server running at http://localhost:4000')
  })
})()
