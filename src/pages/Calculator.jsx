import { Heading} from '@chakra-ui/react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Spacer,
  Text
} from '@chakra-ui/react';
import React from 'react'
import { useState } from "react";
import { Layout } from '../components/Layout'



const Calculator=()=>{
  
  
  const [height,setHeight]=useState('');
  const [weight,setWeight]=useState("");
  const [dose,setDose]=useState(""); 
  const [showResults, setShowResults] = useState(false)

  const Calc=()=>{
    let result =(Math.pow(parseInt(height),0.725)*Math.pow(parseInt(weight),0.425)*0.007184 *dose).toFixed(2);
    console.log(result)
    return(
      <Text p={'3%'} fontSize={'lg'}>
        Recommended Dose to be taken: {result} g
      </Text>
    )
  }
  


  const onSumbit= ()=>{
    setShowResults(true);
    console.log(showResults)
}

  const onPress=()=>{
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
                  <FormControl id="weight" >
                  <FormLabel>weight(kgs)</FormLabel>
                    <Input type="text" value={weight} name="weight" onChange={(e) => setWeight(e.target.value)}/>
                  </FormControl>
                  
                  <FormControl id="height" >
              <FormLabel>Height(cms)</FormLabel>
                    <Input type="text" value={height} name="height" onChange={(e) => setHeight(e.target.value)}/>
                  </FormControl>

                  <FormControl id="dose" >
              <FormLabel>BSA dosing(mg/m^2)</FormLabel>
                    <Input type="text" value={dose} name="dose" onChange={(e) => setDose(e.target.value)}/>
                  </FormControl>
                 
                  <Flex spacing={'5'} >
                  <Spacer/>
                  <Button  m={'2%'} onClick={onSumbit} loadingText="Submitting" size="lg" bg={'teal.200'} color={'black'}>Calculate</Button>
                  <Button  m={'2%'} onClick={onPress} loadingText="Submitting" size="lg" bg={'teal.200'} color={'black'}>Reset</Button>
                  </Flex>
          </Box>
          <Box>
                  { showResults ? <Calc />: null }
                  </Box>
                  <Flex>
                  
                  </Flex>
         
      </Stack>
      </Stack>
      </Layout>
  );

}


export default Calculator;




