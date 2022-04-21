import React from 'react'
import { Container } from '@chakra-ui/react'
import Sidebar from './sidebar'


export function Layout(props) {
  return (
    <>
    <Sidebar/>
      <Container maxW='container.lg'> {props.children}</Container>
    </>
  )
}
