import { Heading, Container } from '@chakra-ui/react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Spacer,
  Text,
  HStack,
  VStack
} from '@chakra-ui/react';
import React from 'react'
import { useState} from "react";
import { Layout } from '../components/Layout'
import Results from "../components/Results"
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.js'
import Report from './report';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
  pname: yup.string().max().required("Patient Name is required ").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  pid: yup.number().positive().integer().required(),
  age: yup.number().positive().integer().required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});


const Model = () => {

  const [pname, setPname] = useState("");
  const [pid, setPid] = useState("");
  const [Image, setImage] = useState(null);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [dose, setDose] = useState("");
  const [weight, setWeight] = useState("");
  const [showResults, setShowResults] = useState(false)
  const [showdata, setShowData] = useState(true)
  const { currentUser } = useAuth()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const Report2 = () => {
    return (
      <Container spacing={10}>
        <Heading align={'center'} fontSize={'4xl'} md={'5vh'}> Patient Report</Heading>
        <Box spacing={100} borderWidth='1px' borderRadius='lg' p={'3%'}  >
          <HStack>
            <Text fontSize={'xl'} fontWeight='semibold'>Patient ID:</Text>
            <Spacer />
            <Text fontSize={'xl'}>{pid}</Text>
          </HStack>
          <HStack>
            <Text fontSize={'xl'} fontWeight='semibold'>Patient Name:</Text>
            <Spacer />
            <Text fontSize={'xl'} >{pname}</Text>
          </HStack>
          <HStack>
            <Text fontSize={'xl'} fontWeight='semibold'>Patient Age:</Text>
            <Spacer />
            <Text fontSize={'xl'}>{age}</Text>
          </HStack>
          <HStack>
            <Text fontSize={'xl'} fontWeight='semibold'>Patient Height:</Text>
            <Spacer />
            <Text fontSize={'xl'}>{height}</Text>
          </HStack>
          <HStack>
            <Text fontSize={'xl'} fontWeight='semibold'>Patient Weight:</Text>
            <Spacer />
            <Text fontSize={'xl'}>{weight}</Text>
          </HStack>
          <VStack align={'flex-start'}>
          <Text fontSize={'xl'} fontWeight='semibold'>Result Generated:</Text>
            <HStack pl={'3%'}>
              <Text fontSize={'lg'} fontWeight='normal'>
                Class:
              </Text>
              <Text fontSize={'lg'}>
                Benign
              </Text>
            </HStack>
            <HStack pl={'3%'}>
              <Text fontSize={'lg'} fontWeight='nomral'>
                Accuracy:
              </Text>
              <Text fontSize={'lg'}>
                97%
              </Text>
            </HStack>
          </VStack>
          <HStack>
            <Text fontSize={'xl'} fontWeight='semibold'>Remarks</Text>
            <Input type="textarea"  name="remarks" />
          </HStack>
          <Spacer />
        </Box>
        <Button onClick={OnReport3} loadingText="Submitting" size="lg" bg={'primary.100'} mt={'3vh'} >Back</Button>
      </Container>

    )
  }

  const OnReport = () => {
    setShowData(false)
  }

  const OnReport3 = () => {
    setShowData(true)
  }

  const onSumbit = () => {
    console.log(currentUser.uid)
    setShowResults(true);
    console.log(Image)
    let form_data = new FormData();
    form_data.append('Image', Image)
    form_data.append('pname', pname)
    form_data.append('pid', pid)
    
    for (var pair of form_data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }


    // currentUser.getIdTokenResult()
    //   .then(
    //     (res) => {
         // let token = res.token
          let url = "http://localhost:8000/model/posts/";
          axios
            .post(url, form_data, {
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => console.log(err));

      //   }


      // )

  }

  const onPress = (e) => {
    setPname('')
    setPid('')
    setWeight('')
    setImage(e.target.files = null)
    setShowResults(false)
    console.log(pname,pid,Image)
  }

  return (
    <Layout>
      {showdata ? 
      <Stack ml={'5vw'} mr={'30%'} my='2%' >
        <Stack>
          <Heading fontSize={'4xl'} textAlign={'left'} mb={'2vw'}>
            Classifier
          </Heading>
          <Box spacing={10}  borderRadius='lg' p={'3%'}  >
            <FormControl id="pname" >
              <FormLabel>Patient Name</FormLabel>
              <Input type="text" value={pname} name="pname" onChange={(e) => setPname(e.target.value)} />
            </FormControl>
            <FormControl id="pid" >
              <FormLabel>Patient ID</FormLabel>
              <Input type="text" value={pid} name="pid" onChange={(e) => setPid(e.target.value)} />
            </FormControl>

            <FormControl id="age" >
              <FormLabel>Patient Age</FormLabel>
              <Input type="text" value={age} name="age" onChange={(e) => setAge(e.target.value)} />
            </FormControl>

            <FormControl id="height" >
              <FormLabel>Patient Height(cms)</FormLabel>
              <Input type="text" value={height} name="height" onChange={(e) => setHeight(e.target.value)} />
            </FormControl>

            <FormControl id="weight" >
              <FormLabel>Patient weight(kgs)</FormLabel>
              <Input type="text" value={weight} name="weight" onChange={(e) => setWeight(e.target.value)} />
            </FormControl>


            <FormControl id="Image" >
              <FormLabel>Upload Image </FormLabel>
              <Input type="file" name='Image' accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.files[0])} />

            </FormControl>

            <Flex spacing={'5'} >
              <Spacer />
              <Button m={'2%'} onClick={onSumbit} loadingText="Submitting" size="lg" bg={'primary.100'} >Classify</Button>
              <Button m={'2%'} onClick={onPress} loadingText="Submitting" size="lg" bg={'primary.100'} >Reset</Button>
            </Flex>
          </Box>
          <Box>
            {showResults ? <Results /> : null}
          </Box>
          <Flex>
            <Spacer />
            <Button onClick={OnReport} loadingText="Submitting" size="lg" bg={'primary.100'} > Generate Report</Button>
          </Flex>

        </Stack>
      </Stack> : <Report2 />}
    </Layout>
  );

}


export default Model;




