import fs from 'fs'
import path from 'path'
import { bundle } from '@remotion/bundler'
import { getCompositions, renderMedia } from '@remotion/renderer'
import express from 'express'

import { birthdayWishes } from './constant'
import { generateVoice } from './utils'

import axios from 'axios'

(() => {
  const app = express()
  app.use(
    express.json({
      limit: '50mb',
    })
  )

  const compositionId = 'MyComposition'

  app.use(async (_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

  app.post('/mirror', (req, res) => {
    console.log(req.body.test)
    res.send()
  })

  app.post<
    string,
    undefined,
    any,
    {
      name: string
      gender: 'MALE' | 'FEMALE'
    }
  >('/generate', async (req, res) => {
    const sendFile = (file: string) => {
      fs.createReadStream(file)
        .pipe(res)
        .on('close', () => {
          res.end()
        })
    }

    const { name, gender } = req.body

    try {
      const response = (
        await axios.post<{
          data: {
            voice: string
            message: string
          }
        }>('http://localhost:4000/random', {
          name,
          gender,
        })
      ).data
      const inputProps = {
        voice: response.data.voice,
        message: response.data.message,
      }

      const bundled = await bundle(path.join(__dirname, '../remotion/index.ts'))
      // Extract all the compositions you have defined in your project
      // from the webpack bundle.
      const comps = await getCompositions(bundled, {
        inputProps
      })

      // Select the composition you want to render.
      const composition = comps.find(c => c.id === compositionId)

      // Ensure the composition exists
      if (!composition) {
        throw new Error(`No composition with the ID ${compositionId} found`)
      }

      const outputLocation = `out/${compositionId}.mp4`
      await renderMedia({
        composition,
        serveUrl: bundled,
        codec: 'h264',
        outputLocation,
        inputProps
      })



      sendFile(outputLocation)
    } catch (err) {
      console.error(err)
      res.json({
        error: err,
      })
    }
  })

  app.post('/random', async (req, res) => {
    const name = req.body?.name
    const gender = req.body?.gender

    console.log('random router')
    console.log(req.body)

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
