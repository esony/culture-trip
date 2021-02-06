import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      'http://open-api.myhelsinki.fi/v1/places/?language_filter=en&tags_filter=matko1:228'
    )
    const { data } = await response.json()

    res.status(200).json(data)
  } catch (error) {
    res.status(500).end()
  }
}
