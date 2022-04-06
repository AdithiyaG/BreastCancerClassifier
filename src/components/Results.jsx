import {
    Button,
    Center,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    VStack,
    Text,
    Box,
  } from "@chakra-ui/react";

  const Results=()=>{
    return(
<Box>
<Text fontSize='3xl'>Result</Text>
  <HStack pl={'3%'}>
  <Text fontSize={'lg'} fontWeight='bold'>
  Class:
  </Text>
  <Text fontSize={'lg'}>
  Benign
  </Text>
  </HStack>
    
  <HStack  pl={'3%'}>
  <Text fontSize={'lg'} fontWeight='bold'>
  Accuracy:
  </Text>
  <Text fontSize={'lg'}>
  97%
  </Text>
  </HStack>

  
  </Box>
    );
    
  }

  export default Results;