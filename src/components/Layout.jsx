import React from 'react'
import { Container } from '@chakra-ui/react'
import Sidebar from './sidebar'
import AnimatedPage from '../AnimatedPage'



export function Layout(props) {
  return (
    <>
    
    <Sidebar/>
    <AnimatedPage>
    <Container maxW='container.lg'  > {props.children}</Container>
    </AnimatedPage>
      
    </>
  )
}
