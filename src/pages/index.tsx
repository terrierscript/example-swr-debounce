import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { NoDebounce } from '../components/NoDebounce'

export default function Home() {
  return (
    <Box>
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <NoDebounce />
      </Container>
    </Box>
  )
}
