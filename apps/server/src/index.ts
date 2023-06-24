import http from 'http'
import express from 'express'
import { ChatGPTUnofficialProxyAPI } from 'chatgpt'
//
(async () => {
  const app = express()
  const api = new ChatGPTUnofficialProxyAPI({
    accessToken: process.env.OPENAI_ACCESS_TOKEN,
    apiReverseProxyUrl: 'https://your-example-server.com/api/conversation'
  })

app.use(express.json())

app.get('/', (_req, res) => { 
  res.send('OK')
})

app.post('/randomMessage', (_req, res) => {

})

http.createServer(app).listen(4000, 'localhost', () => {
  console.log('Server running at http://localhost:4000')
})
})()

