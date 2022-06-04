import type { NextApiRequest, NextApiResponse } from 'next'

type Data = string[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json([
    // '127.1.1.1',    // not ok
    '45.78.11.27',  // not ok
    'opmna640q.qnssl.com'
  ])
}
