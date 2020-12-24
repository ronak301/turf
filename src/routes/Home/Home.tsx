import { Box, Text } from '@chakra-ui/core'
import React from 'react'
import BookSlot from './BookSlot'

export default function Home() {
  return (
    <Box d="flex" h="100vh" w="100vw" flex={1} alignItems="center" justifyContent="center" background="cyan">
      <Box maxW="700px">
        <BookSlot />
        </Box>
    </Box>
  )
}
