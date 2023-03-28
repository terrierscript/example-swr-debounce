import { Box, HStack, Stack } from "@chakra-ui/react"
import { FC, useState } from "react"
import useSWR from "swr"

const useFibonacci = (value: number) => {
  const [apiCallCount, setApiCallCount] = useState(0)
  const result = useSWR(["fibonacch", value], async () => {
    const response = await fetch(`/api/fib?value=${value}`)
    const json = await response.json()
    setApiCallCount(num => num + 1)
    return json.fib
  })
  return {
    result,
    apiCallCount
  }
}

const FibonacchResult: FC<{ value: number }> = ({ value }) => {
  const { result, apiCallCount } = useFibonacci(value)
  if (result.isLoading) {
    return <div>Loading...</div>
  }
  return <div>
    <div>
      fib({value}) = {result.data}
    </div>
    <div>
      API Call: {apiCallCount}
    </div>
  </div>

}
export const NoDebounce: FC<{}> = () => {
  const [value, setValue] = useState(3)
  return <div>
    <div>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          setValue(e.target.valueAsNumber)
        }} />
      <FibonacchResult value={value} />
    </div>
  </div>
}