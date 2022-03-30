import { Box, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const Card = props => (
  <Box
    bg={useColorModeValue('white', 'yellow.700')}
    py='8'
    px={{ base: '4', md: '10' }}
    boxShadow={'lg'}
    borderWidth='2px'
    borderColor='yellow.100'
    rounded={{ sm: 'xl' }}
    {...props}
  />
)
