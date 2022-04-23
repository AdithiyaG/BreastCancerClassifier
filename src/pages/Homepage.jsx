import {
  Heading,
  Text,
  Image,Button,Container,Stack
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Layout } from '../components/Layout'
import {useAuth} from '../contexts/AuthContext.js'
import medium from '../media/4.png'
import { useDispatch } from 'react-redux'
export default function Homepage() {
  const dispatch = useDispatch();



  const { currentUser} =useAuth()


  console.log(currentUser)
  return (
    <Layout>

      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
             <Image src={medium} />
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
           Breast Cancer Classification{' '}
            <Text as={'span'} color={'primary.300'}>
              made easy
            </Text>
          </Heading>
          
          <Text color={'gray.500'} maxW={'3xl'}>
          The app focuses on helping the pathologist classify breast cancer images instantly. 
          The features of the app help them give a quick and crisp result after the analysis of the cell image
          </Text>
          
          <Stack spacing={6} direction={'row'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'pink'}
              bg={'primary.100'}
              _hover={{ bg: 'yellow.300' }}>
              Get started
            </Button>
            <Button rounded={'full'} px={6}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
     
    </Layout>
  )
}
