import fs from 'fs'
import path from 'path'
import { bundle } from '@remotion/bundler'
import { getCompositions, renderMedia } from '@remotion/renderer'
import express from 'express'
import { birthdayWishes } from './constant'
import { generateVoice, uploadToMirai, randomEE } from './utils'
import { createRender, getRender, updateRender } from './db'
// @ts-ignore
;import { random } from 'remotion'
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
      theme: string
    }
  >('/createRender', async (req, res) => {
    const { name, gender } = req.body
    try {
      const response = await randomEE(name, gender)
      console.log('RANDOM VOICE GOTTEM')
      const renderId = await createRender(req.body)

      const inputProps = {
        voice: response.data.voice,
        message: response.data.message,
        randomSeed: renderId,
        theme: req.body.theme,
      }
      const bundled = await bundle(path.join(__dirname, '../remotion/index.ts'), () => { return }, {
        outDir: path.join(__dirname, '../out'),
      })
      fs.writeFileSync(path.join(__dirname, '../out/bundled.txt'), bundled)
      console.log('FILE BUNDLED')
      // Extract all the compositions you have defined in your project
      // from the webpack bundle.
      const comps = await getCompositions(bundled, {
        inputProps,
      })
      // Select the composition you want to render.
      const composition = comps.find(c => c.id === compositionId)
      // Ensure the composition exists
      console.log('START COMPOSE')
      if (!composition) {
        throw new Error(`No composition with the ID ${compositionId} found`)
      }
      console.log('GOD DAMN SLOW')
      const outputLocation = `out/${compositionId}.mp4`
      new Promise(async resolve => {
        try {
          await renderMedia({
            composition,
            serveUrl: bundled,
            codec: 'h264',
            outputLocation,
            inputProps,
            onProgress: async p => {
              console.log(`Progress: ${p.progress * 100}%`)
              await updateRender(renderId, {
                process: p.progress * 100,
                url: null,
              })
            },
          })
          const readStream = fs.createReadStream(outputLocation)
          const url = await uploadToMirai(readStream)
          await updateRender(renderId, {
            process: 100,
            url,
          })
          console.log(await getRender(renderId))
        } catch (err) {
          console.error(err)
          await updateRender(renderId, {
            process: 100,
            isError: true,
          })
        } finally {
          resolve(null)
        }
      })
      res.json({
        id: renderId,
      })
    } catch (err) {
      console.error(err)
      res.json({
        error: err,
      })
    } finally {
    }
  })

  app.get('/getRender/:id', async (req, res) => {
    const renderId = req.params.id
    const render = await getRender(renderId)
    res.json(render)
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

  app.listen(4000, '0.0.0.0', () => {
    console.log('Server running at port 4000')
  })
})()
