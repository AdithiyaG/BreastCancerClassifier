import {
  Box,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
  Image,
  Img,Link
} from '@chakra-ui/react'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import Navlink from './Navlink'
import {useAuth} from '../contexts/AuthContext'
import medium from '../media/4.png'

export function Navbar() {
  const { toggleColorMode } = useColorMode()
  const {currentUser,logout} =useAuth()

  return (
    <Box
      borderBottom='50px'
      borderBottomColor={useColorModeValue('gray.900', 'gray.700')}
      bg={'primary.100'}
      boxShadow={'lg'}
      mb={4}
    >
      <HStack py={4} justifyContent='end' mx={'2vw'} >
        <Link href='/'>
        <Image  
    src={medium}/>
        </Link>
     
        
        
        <Spacer />
        <Navlink to='/features' name='Features' />
        <Navlink to='/about' name='About' />
        <Navlink to='/contact' name='Contact' />
        {!currentUser && <Navlink to='/login' name='Login' />}
        {!currentUser && <Navlink to='/register' name='SignUp' />}
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
