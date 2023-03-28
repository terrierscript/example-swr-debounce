import { Box, HStack, Stack } from "@chakra-ui/react"
import { FC, useState } from "react"
import useSWR from "swr"
import { useDebounce } from "usehooks-ts"

const useFibonacci = (value: number) => {
  const [apiCallCount, setApiCallCount] = useState(0)
  const result = useSWR(["fibonacch", value], async () => {
    const response = await fetch(`/api/fib?value=${value}`)
    const json = await response.json()
    setApiCallCount(num => num + 1)
    return json.fib
  }, {
    keepPreviousData: false
  })
  return {
    result,
    apiCallCount
  }
}

const useFibonacciWithDebounce1 = (value: number) => {
  const [apiCallCount, setApiCallCount] = useState(0)
  const debounceValue = useDebounce(value)
  const result = useSWR(["fibonacch_debounce_1", debounceValue], async () => {
    const response = await fetch(`/api/fib?value=${debounceValue}`)
    const json = await response.json()
    setApiCallCount(num => num + 1)
    return json.fib
  }, {
    keepPreviousData: false
  })
  return {
    result,
    apiCallCount
  }
}

const useFibonacciWithDebounce2 = (value: number) => {
  const [apiCallCount, setApiCallCount] = useState(0)
  const debounceValue = useDebounce(value)
  const isDebouncing = debounceValue !== value
  const result = useSWR(isDebouncing ? null : ["fibonacch_debounce_2", debounceValue],
    async () => {
      const response = await fetch(`/api/fib?value=${debounceValue}`)
      const json = await response.json()
      setApiCallCount(num => num + 1)
      return json.fib
    }, {
    keepPreviousData: false
  })
  return {
    result,
    apiCallCount
  }
}
const useFibonacciWithDebounce3 = (value: number) => {
  const [apiCallCount, setApiCallCount] = useState(0)
  const debounceValue = useDebounce(value)
  const isDebouncing = debounceValue !== value

  const result = useSWR(isDebouncing ? null : ["fibonacch_debounce_3", debounceValue],
    async () => {
      const response = await fetch(`/api/fib?value=${debounceValue}`)
      const json = await response.json()
      setApiCallCount(num => num + 1)
      return json.fib
    }, {
    keepPreviousData: false
  })
  return {
    result,
    apiCallCount
  }
}

const FibonacchResult: FC<{ value: number, isLoading: boolean, fibResult: number, apiCallCount: number }> = ({ value, isLoading, fibResult, apiCallCount }) => {

  if (isLoading) {
    return <div>
      <div>fib({value}) = Loading...</div>
      <div>API Call: {apiCallCount}</div>
    </div>
  }

  return <div>
    <div>fib({value}) = {fibResult}円</div>
    <div>API Call: {apiCallCount}</div>
  </div>
}

const NoDebounceFibonacch: FC<{ value: number }> = ({ value }) => {
  const { result, apiCallCount } = useFibonacci(value)
  return <FibonacchResult value={value}
    isLoading={result.isLoading}
    fibResult={result.data} apiCallCount={apiCallCount}
  />
}

const WithDebounceFibonacch1: FC<{ value: number }> = ({ value }) => {
  const { result, apiCallCount } = useFibonacciWithDebounce1(value)
  return <FibonacchResult value={value}
    isLoading={result.isLoading}
    fibResult={result.data} apiCallCount={apiCallCount}
  />
}
const WithDebounceFibonacch2: FC<{ value: number }> = ({ value }) => {
  const { result, apiCallCount } = useFibonacciWithDebounce2(value)
  return <FibonacchResult value={value}
    isLoading={result.isLoading}
    fibResult={result.data} apiCallCount={apiCallCount}
  />
}
const WithDebounceFibonacch3: FC<{ value: number }> = ({ value }) => {
  const { result, apiCallCount } = useFibonacciWithDebounce2(value)
  const isLoading = result.isLoading || result.data === undefined
  return <FibonacchResult value={value}
    isLoading={isLoading}
    fibResult={result.data} apiCallCount={apiCallCount}
  />
}

export const CalculateFib: FC<{}> = () => {
  const [value, setValue] = useState(3)
  return <div>
    <div>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          setValue(e.target.valueAsNumber)
        }} />
      <h6>No debounce</h6>
      <NoDebounceFibonacch value={value} />
      <h6>Debounce 1</h6>
      <WithDebounceFibonacch1 value={value} />

      <h6>Debounce 2</h6>
      <WithDebounceFibonacch2 value={value} />
      <h6>Debounce 3</h6>
      <WithDebounceFibonacch3 value={value} />
    </div>
  </div>
}