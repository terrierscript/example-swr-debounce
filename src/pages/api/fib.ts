import { NextApiHandler } from "next"

function fibonacci(n: number): number {
  if (n <= 1) {
    return n
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2)
  }
}

const handler: NextApiHandler = async (req, res) => {
  const { value } = req.query
  if (!value) {
    res.status(400).end()
    return
  }
  res.statusCode = 200
  res.json({
    fib: fibonacci(Number(value))
  })
}
export default handler
