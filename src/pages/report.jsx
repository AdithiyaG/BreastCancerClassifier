import { Heading, Container } from '@chakra-ui/react'
import {
  Box,
  Input,
  Spacer,
  Text,
  HStack,
  VStack, Image, Divider,Button,
  Flex, Center, Grid, GridItem, SimpleGrid
} from '@chakra-ui/react';
import { Layout } from '../components/Layout'
import medium from '../media/4.png'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import React,{useRef} from 'react'
import { useReactToPrint } from "react-to-print";



const Report = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  const data = useSelector((state) => state.allFormdata.data)
  console.log(data)
  const location = useLocation()
  console.log(location)
  return (
    <Layout>
      <Flex direction={'column'}>
       <div ref={componentRef} >
        <Box borderWidth={'thin'} mx={'5vw'} px={'5vw'} mt={'2vh'} backgroundColor='white'>
          
          <SimpleGrid columns={3} my={'1vh'} >
            <GridItem colSpan={2}>
              <Image src={medium} boxSize='max' objectFit='cover' />
            </GridItem>
            <GridItem colSpan={1} mt={'6vh'} ml={'3vw'}>
              <Heading size='sm'>{formatDate(data[1].UsedDate)}</Heading>
            </GridItem>
          </SimpleGrid>

          <Divider />
          
          <Heading size='md' my={'2vh'}>Oncogenomics Report for ID {data[0].MedicalId}</Heading>
          
          <Divider my={'1vh'} />
          
          <Box borderWidth={'thin'}>
            
            <SimpleGrid columns={6} ml={'2vw'} w='full'>
            
              <GridItem colStart={1} colSpan={3}>
               
                <SimpleGrid columns={5}>
                  <GridItem>
                    <Text fontWeight={'semibold'}>Name</Text>
                  </GridItem>
                  <GridItem colStart={2} colSpan={3}>
                    <Text>: {data[0].PatientName}</Text>
                  </GridItem>
                </SimpleGrid>
               
                <SimpleGrid columns={5}>
                  <GridItem>
                    <Text fontWeight={'semibold'}>Gender</Text>
                  </GridItem>
                  <GridItem colStart={2}>
                    <Text >: {data[0].PatientGender}</Text>
                  </GridItem>
                </SimpleGrid>
                <SimpleGrid columns={5}>
                  <GridItem>
                    <Text fontWeight={'semibold'}>Age</Text>
                  </GridItem>
                  <GridItem colStart={2}>
                    <Text>: {data[0].PatientAge} Y</Text>
                  </GridItem>
                </SimpleGrid>

              </GridItem>
              <GridItem colStart={4} colSpan={3}>
                <SimpleGrid columns={5}>
                  <GridItem colSpan={2}>
                    <Text fontWeight={'semibold'}>Date of Birth</Text>
                  </GridItem>
                  <GridItem colStart={3} colSpan={2}>
                    <Text>: {data[0].PatientDOB}</Text>
                  </GridItem>
                </SimpleGrid>
                <SimpleGrid columns={5}>
                  <GridItem>
                    <Text fontWeight={'semibold'}>Height</Text>
                  </GridItem>
                  <GridItem colStart={3}>
                    <Text >: {data[0].PatientHeight} cms</Text>
                  </GridItem>
                </SimpleGrid>
                <SimpleGrid columns={5}>
                  <GridItem>
                    <Text fontWeight={'semibold'}>Weight</Text>
                  </GridItem>
                  <GridItem colStart={3}>
                    <Text>: {data[0].PatientWeight} kgs</Text>
                  </GridItem>
                </SimpleGrid>

              </GridItem>
            </SimpleGrid>
          </Box>
          <Divider my={'2vh'} />
            <SimpleGrid mx={'10vw'}>
              <Box borderWidth={'thin'} borderColor={'black'}  bgColor='teal.500' p={'2vh'}>
                <Heading size={'md'} align={'center'} textColor={'white'}>Predicted Result </Heading>
              </Box>
              <Box borderWidth={'thin'} borderColor={'black'}  py={'3vh'}>
                <Heading size={'lg'} align={'center'} textColor={'teal.500'}>{data[1].Class}</Heading>
              </Box>
            </SimpleGrid>

            <SimpleGrid columns={6} my={'2vh'}>
              <GridItem colStart={1} colSpan={2}>
                <Text fontWeight={'bold'}>Specimen Image used:</Text>
              </GridItem>
              <GridItem colStart={2} colSpan={3}>

              {data[0].files && <>
                {data[0].files.map((f, index) => (
                    <>
                          <img src={URL.createObjectURL(f)}
                            alt={f.name}
                            style={{
                                height: "150px",
                            }} /> 
                    </>

                )
                )}
                </>
                }


              </GridItem>

            </SimpleGrid>
        </Box>
        </div>

        <Button onClick={handlePrint} mx={'auto'}> Save as PDF </Button> 
        </Flex>
    </Layout>



  )
}
export default Report;
