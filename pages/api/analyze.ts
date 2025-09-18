import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const config = { api: { bodyParser: false } }

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable()
  form.parse(req, async (err, fields, files) => {
    const file = files.file[0]
    const base64 = fs.readFileSync(file.filepath, { encoding: 'base64' })

    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })
    const result = await model.generateContent([
      "This is a yoga pose image. Identify the pose and provide posture feedback in simple language.",
      { inlineData: { mimeType: file.mimetype, data: base64 } }
    ])

    const text = result.response.text()
    res.status(200).json({ feedback: text })
  })
}
