import { Heading, Container } from '@chakra-ui/react'
import {
  Box,
  Input,
  Spacer,
  Text,
  HStack,
  VStack
} from '@chakra-ui/react';



const Report = (props) => {
  return (
    <Container spacing={10}>
      <Heading align={'center'} fontSize={'4xl'} md={'5vh'}> Patient Report</Heading>
      <Box spacing={100} borderWidth='1px' borderRadius='lg' p={'3%'}  >
        <HStack>
          <Text fontSize={'xl'} fontWeight='semibold'>Patient ID:</Text>
          <Spacer />
          <Text fontSize={'xl'}>{props.pid}</Text>
        </HStack>
        <HStack>
          <Text fontSize={'xl'} fontWeight='semibold'>Patient Name:</Text>
          <Spacer />
          <Text fontSize={'xl'} >{props.pname}</Text>
        </HStack>
        <HStack>
          <Text fontSize={'xl'} fontWeight='semibold'>Patient Age:</Text>
          <Spacer />
          <Text fontSize={'xl'}>{props.age}</Text>
        </HStack>
        <HStack>
          <Text fontSize={'xl'} fontWeight='semibold'>Patient Height:</Text>
          <Spacer />
          <Text fontSize={'xl'}>{props.height}</Text>
        </HStack>
        <HStack>
          <Text fontSize={'xl'} fontWeight='semibold'>Patient Weight:</Text>
          <Spacer />
          <Text fontSize={'xl'}>{props.weight}</Text>
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

    </Container>




  )
}
  export default Report;
  