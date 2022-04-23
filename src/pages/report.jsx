import { Heading, Container } from '@chakra-ui/react'
import {
  Box,
  Input,
  Spacer,
  Text,
  HStack,
  VStack,Image,Divider,
  Flex,Center,Grid
} from '@chakra-ui/react';
import {Layout} from '../components/Layout'
import medium from '../media/4.png'


const Report = (props) => {
  return (
    <Layout>
      <Box borderWidth={'thin'} m={'2%'}>
        <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        <Image src={medium} objectFit='contain'/>
        </Grid>
      
    
    <Divider/>
    <Heading size='lg'>Oncogenomics Report for Patient ID </Heading>
    <Divider/>
      </Box>
       

    </Layout>



  )
}
  export default Report;
  