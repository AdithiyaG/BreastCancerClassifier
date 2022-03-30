import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    LinkOverlay,LinkBox
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';
  import { BsPerson } from 'react-icons/bs';
  import { FiServer } from 'react-icons/fi';
  import { GoLocation } from 'react-icons/go';

import { Layout } from '../components/Layout';
  
  function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('yellow.500', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'}  fontSize={'2xl'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'sm'} fontWeight={'medium'} isTruncated >
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function BasicStatistics() {
    return (
        <Layout>
             <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          Features
        </chakra.h1>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <LinkBox as='article' maxW='lg' p='5' borderWidth='1px' rounded='md'>
        <LinkOverlay href='/features/classifier'>
        <StatsCard
            title={'Classifier'}
          />
        </LinkOverlay>
        </LinkBox>
        <LinkBox as='article' maxW='lg' p='5' borderWidth='1px' rounded='md'>
          <LinkOverlay href='/features/calculator'>
          <StatsCard
            title={'BSA Calculator'}
           
           
          />
          </LinkOverlay>
          </LinkBox>
         
      
        </SimpleGrid>
      </Box>
     
        </Layout>
     
    );
  }