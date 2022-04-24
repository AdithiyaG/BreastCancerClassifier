
import '../App.css'
import React from 'react'
import { Spinner,Image, Flex } from '@chakra-ui/react'
import LSpinner from '../media/Infinity-1.8s-173px.gif'
const Loader = () => {
  return (
      <Image src={LSpinner}  alt='loading' h={90}/>

        
  )
}

export default Loader