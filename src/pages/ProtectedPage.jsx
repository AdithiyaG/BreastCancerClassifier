import { Heading, Container, Badge } from '@chakra-ui/react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Spacer,
  Link,
  HStack,
} from '@chakra-ui/react';
import React from 'react'
import { useState,useEffect } from "react";
import { Layout } from '../components/Layout'
import Results from "../components/Results"
import { auth } from '../utils/firebaseconfig'
import axios from 'axios';
import {useAuth} from '../contexts/AuthContext.js'


const Model=()=>{

  const [pname,setPname] =useState("");
  const [pid,setPid] =useState("");
  const [Image,setImage] =useState(null);
  const [showResults, setShowResults] = useState(false)
  const { currentUser} =useAuth()

  const onSumbit= ()=>{
    setShowResults(true);
    console.log(showResults)
    let form_data = new FormData();
    form_data.append('pname',pname)
    form_data.append('pid',pid)
    if(Image!=null){
      form_data.append('Image',Image)
    }
    for(var pair of form_data.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
   }

  
   currentUser.getIdTokenResult()
   .then(
     (res) =>{
       let token=res.token
       let url = "http://localhost:8000/model/posts/";
       axios
         .post(url, form_data, {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Token ${token}`,
           },
         })
         .then((res) => {
           console.log(res.data);
         })
         .catch((err) => console.log(err));

     }


   )

}

  const onPress=()=>{
    setPname('')
    setPid('')
    setShowResults(false)
  }

   return(
    <Layout>
     <Stack  ml={'5vw'} mr={'30%'} my='2%' >

      <Stack>
          <Flex>
              <Heading fontSize={'4xl'} textAlign={'left'} mb={'2vw'}>
              Classifier
            </Heading>
            <Spacer />
            <Link href='/table' alignItems={'self-end'}>Patient Database</Link>
          </Flex>


      <Box spacing={5} borderWidth='1px' borderRadius='lg' p={'3%'}  >  
              <FormControl id="pname" >
              <FormLabel>Patient Name</FormLabel>
              <Input type="text" value={pname} name="pname" onChange={(e) => setPname(e.target.value)}/>
                  </FormControl>
                  <FormControl id="pid" >
              <FormLabel>Patient ID</FormLabel>
                    <Input type="text" value={pid} name="pid" onChange={(e) => setPid(e.target.value)}/>
                  </FormControl>
                  <FormControl id="Image" >
              <FormLabel>Upload Image </FormLabel>
                    <Input type="file"   name='Image' accept="image/png, image/jpeg"  onChange={(e) => setImage(e.target.files[0])} />
                  </FormControl>
                 
                  <Flex spacing={'5'} >
                  <Spacer/>
                  <Button  m={'2%'} onClick={onSumbit} loadingText="Submitting" size="lg" bg={'primary.500'} color={'white'}>Classify</Button>
                  </Flex>
          </Box>
          <Box>
                  { showResults ? <Results /> : null }
                  </Box>
          <Button  m={'2%'} onClick={onPress} loadingText="Submitting" size="lg" bg={'primary.500'} color={'white'}>Redo</Button>
      </Stack>
      </Stack>
      </Layout>
  );

}


export default Model;




