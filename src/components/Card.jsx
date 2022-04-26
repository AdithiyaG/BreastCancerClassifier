import { Box, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const Card = props => (
  <Box
    bg={useColorModeValue('white', 'teal.700')}
    py='8'
    px={{ base: '4', md: '10' }}
    boxShadow={'xl'}
    borderWidth='0.5px'
    borderColor='teal.100'
    rounded={{ sm: 'xl' }}
    {...props}
  />
)
