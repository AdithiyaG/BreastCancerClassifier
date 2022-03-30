import {
  Badge,
  chakra,
  Code,
  Heading,
  List,
  ListItem,
  OrderedList,
  Tag,
  Text,
  Image,Button,Container,Stack
} from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'
import { Link } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext.js'
import medium from '../media/4.png'

export default function Homepage() {
  const { currentUser} =useAuth()
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
           BreastCancer Classification{' '}
            <Text as={'span'} color={'primary.300'}>
              made easy
            </Text>
          </Heading>
          
          <Text color={'gray.500'} maxW={'3xl'}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! 
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
          {/* <Flex w={'full'}>
            <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            />
          </Flex> */}
        </Stack>
      </Container>
    </Layout>
  )
}
