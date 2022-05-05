import { Heading,FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import {
  Box,
  Input,
  Text, Image, Divider, Button,
  Flex, Center, GridItem, SimpleGrid
} from '@chakra-ui/react';
import { Layout } from '../components/Layout'
import medium from '../media/4.png'
import { useSelector } from 'react-redux'
import React, { useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { path } from '../components/apilink';

const Report = (props) => {
  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { register, handleSubmit } = useForm();
  

  let [specimen, setSpecimen] = React.useState('')
  let [remarks, setRemarks] = React.useState('')



  function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setSpecimen(inputValue)
  }

  let handleRemarkChange = (e) => {
    let inputValue = e.target.value
    setRemarks(inputValue)

  }
  const data = useSelector((state) => state.allFormdata.data)
  console.log(data)
  const onSubmit = async (values) =>{ 
    const postclassifierurl = path+`service1/classifier/?pid=${data[1].Id}`
    const formData = new FormData()
        formData.append("MedicalId", data[1].MedicalId)
        formData.append("ImagePath", data[0].files[0])
        formData.append("Class", data[1].Class)
        formData.append('UserId', data[1].UserId)
        formData.append('type',values.type)
        formData.append('remarks',values.remarks)

        const cresponse = await axios.put(postclassifierurl, formData).catch(err => console.log(err))
        if (cresponse.status == 201) {
          console.log("Result updated")
          axios
          ({
           url: path+`service1/report/?pid=${data[1].Id}`, //your url
           method: 'GET',
           responseType: 'blob', // important
       })
           .then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             const contentDisposition = response.headers['content-disposition'];
             link.setAttribute('download', contentDisposition+'.pdf'); //or any other extension
             document.body.appendChild(link);
             link.click();
         })
           .catch((err) => {
             console.log("Err: ", err);
           });
        }
      }
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
              <Box borderWidth={'thin'} borderColor={'black'} bgColor='teal.500' p={'2vh'}>
                <Heading size={'md'} align={'center'} textColor={'white'}>Predicted Result </Heading>
              </Box>
              <Box borderWidth={'thin'} borderColor={'black'} py={'3vh'}>
                <Heading size={'lg'} align={'center'} textColor={'teal.500'}>{data[1].Class}</Heading>
              </Box>
            </SimpleGrid>

            <SimpleGrid columns={6} my={'2vh'}>
              <GridItem colStart={1} colSpan={2}>
                <Text fontWeight={'bold'}>Specimen Image used:</Text>
              </GridItem>
              <GridItem colStart={2} colSpan={3}>
              
                 <img src={data[0].files[1]} alt={'im'} h={'150px'}/> 
                 
                


              </GridItem>

            </SimpleGrid>
            <FormControl my={'2vh'}>
              <FormLabel htmlFor='specimen'>Specimen:</FormLabel>
              <Text>{specimen}</Text>
            </FormControl>

            <FormControl my={'2vh'}>
              <FormLabel htmlFor='comments'>Remarks:</FormLabel>
              <Text id='comments'>{remarks}</Text>
            </FormControl>

            {data[1].Class == 'malignant' ?
            <FormControl>
              <FormLabel htmlFor='dose'>Prescribed Body Surface Area Dosing :</FormLabel>
              <Text id='dose'>{(Math.pow(parseInt(data[0].PatientHeight),0.725)*Math.pow(parseInt(data[0].PatientWeight),0.425)*0.007184 *1).toFixed(2)} mg</Text>
              </FormControl> : <></>}

              <Center my={'5vh'}> <Text>----End of Report----</Text></Center>
          </Box>
        </div>
        <Flex alignItems={'start'} direction={'column'} mx={'10vw'}>
        <Text>Specimen</Text>
        <Input
        {...register("type")}
        onChange={handleInputChange}
        placeholder='Here is a sample placeholder'
        size='sm'
      />
          
          <Text>Remarks</Text>
        <Textarea
        {...register("remarks")}
        onChange={handleRemarkChange}
        placeholder='Here is a sample placeholder'
        size='sm'
      />

        </Flex>
     

        <Button onClick={handleSubmit(onSubmit)} mx={'auto'} bgColor={'teal.200'} my={'2vh'}> Save as PDF </Button>
      </Flex>
    </Layout>



  )
}
export default Report;
