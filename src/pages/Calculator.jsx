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
  Text
} from '@chakra-ui/react';
import React from 'react'
import { useState,useEffect } from "react";
import { Layout } from '../components/Layout'
import Results from "../components/Results"
import {useAuth} from '../contexts/AuthContext.js'


const Calculator=()=>{
  
  const [age,setAge]=useState("");
  const [height,setHeight]=useState("");
  const [weight,setWeight]=useState("");
  const [dose,setDose]=useState(""); 
  const [showResults, setShowResults] = useState(false)

  const Calc=()=>{
    let result =Math.pow(parseInt(height)*0.725)*Math.pow(parseInt(weight)*0.425)*0.007184 *dose;
    console.log(result)
    return(
      <Text>
        ${result}
      </Text>
    )
  }
  


  const onSumbit= ()=>{
    setShowResults(true);
    console.log(showResults)
    
 
}

  const onPress=()=>{
    setAge('')
    setHeight('')
    setWeight('')
    setDose('')
    
  }

   return(
    <Layout>
     <Stack  ml={'5vw'} mr={'30%'} my='2%' >
      <Stack>
              <Heading fontSize={'4xl'} textAlign={'left'} mb={'2vw'}>
              BSA Dosage Calculator
            </Heading>
            <Box pd={'5vh'}>
            <Text fontSize={'sm'} > Body surface area (BSA) based dosing is a useful way to mitigate patient size variation in medication regimens. Using BSA may help prescriber's dose more optimally to improve drug efficacy, minimize drug toxicity, and account for some changes in pharmacokinetics depending on patient factors.</Text>
            </Box>
            
  
      <Box spacing={10} borderWidth='1px' borderRadius='lg' p={'3%'}  >  
                  <FormControl id="age" >
              <FormLabel>Patient Age</FormLabel>
                    <Input type="text" value={age} name="age" onChange={(e) => setAge(e.target.value)}/>
                  </FormControl>
                  <FormControl id="weight" >
                  <FormLabel>Patient weight(kgs)</FormLabel>
                    <Input type="text" value={weight} name="weight" onChange={(e) => setWeight(e.target.value)}/>
                  </FormControl>
                  
                  <FormControl id="height" >
              <FormLabel>Patient Height</FormLabel>
                    <Input type="text" value={height} name="height" onChange={(e) => setHeight(e.target.value)}/>
                  </FormControl>

                  <FormControl id="dose" >
              <FormLabel>BSA dosing</FormLabel>
                    <Input type="text" value={dose} name="dose" onChange={(e) => setDose(e.target.value)}/>
                  </FormControl>
                 
                  <Flex spacing={'5'} >
                  <Spacer/>
                  <Button  m={'2%'} onClick={onSumbit} loadingText="Submitting" size="lg" bg={'primary.100'} color={'white'}>Calculate</Button>
                  <Button  m={'2%'} onClick={onPress} loadingText="Submitting" size="lg" bg={'primary.100'} color={'white'}>Reset</Button>
                  </Flex>
          </Box>
          <Box>
                  { showResults ? <Calc /> : null }
                  </Box>
                  <Flex>
                  
                  </Flex>
         
      </Stack>
      </Stack>
      </Layout>
  );

}


export default Calculator;




