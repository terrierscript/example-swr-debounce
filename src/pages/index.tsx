import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { CalculateFib } from '../components/CalculateFib'

export default function Home() {
  return (
    <Box>
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <CalculateFib />
      </Container>
    </Box>
  )
}
