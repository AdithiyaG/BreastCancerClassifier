import {
  Box,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import Navlink from './Navlink'
import {useAuth} from '../contexts/AuthContext'

export function Navbar() {
  const { toggleColorMode } = useColorMode()
  const {currentUser,logout} =useAuth()

  return (
    <Box
      borderBottom='2px'
      borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
      mb={4}
    >
      <HStack py={4} justifyContent='end' mx={'2vw'} >
        <Navlink to='/' name='Firbase Authentication' size='lg' />
        <Spacer />
        {!currentUser && <Navlink to='/login' name='Login' />}
        {!currentUser && <Navlink to='/register' name='Register' />}
        {currentUser && <Navlink to='/profile' name='Profile' />}
        {currentUser && (
          <Navlink
            to='/logout'
            name='Logout'
            onClick={async e => {
              e.preventDefault()
              await logout()
            }}
          />
        )}
   
      </HStack>
    </Box>
  )
}
