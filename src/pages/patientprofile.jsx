import { Heading, InputGroup, InputLeftAddon, IconButton, Button, HStack, Text, Container } from '@chakra-ui/react'
import {
    
    Box,
    FormControl,
    FormErrorMessage,
    Input,
    Stack,SimpleGrid,GridItem
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {BiEdit} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import PatientResults from './patientprofilehistory';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';



const Pdetails2 = () => {

    
  const [history,setHistory] = useState([])

  const fetchProducts = async () => {
    const response = await axios
      .get(`http://localhost:8000/service1/classifier/?id=${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    setHistory(response.data)
    console.log(response.data)

  };

  useEffect(() => {
    fetchProducts();
  }, []);

    const { id } = useParams();
    console.log(id);

    const details = useSelector((state) => state.allPatients.tabledata)
    console.log(details)
    const pdetails = details.filter((item) => item.MedicalId == id)
    const { MedicalId, PatientName, PatientAge, PatientWeight, PatientGender, PatientHeight, PatientDOB } = pdetails[0]

    return (
        <Layout>
          <Box my={'2vh'}>
          <Heading size={'lg'} color={'teal'}>Patient Profile for ID {MedicalId}</Heading>
          <SimpleGrid columns={2} my={'5vh'} spacing={20} ml={'2vw'}>
            <GridItem colSpan={1}>
              <SimpleGrid columns={6} my={'2vh'} >
                <Text>Name:</Text>
                <GridItem  colStart={2} colSpan={3}>
                <Input value={PatientName} isReadOnly variant={'filled'} bgColor={'teal.100'} size={'md'}/>
                </GridItem>
              </SimpleGrid>
              <SimpleGrid columns={6} my={'2vh'}>
                <Text>Age:</Text>
                <GridItem  colStart={2} colSpan={3}>
                <Input value={PatientAge} isReadOnly variant={'filled'} bgColor={'teal.100'} size={'md'}/>
                </GridItem>
              </SimpleGrid>
              <SimpleGrid columns={6} my={'2vh'}>
                <Text>Gender:</Text>
                <GridItem  colStart={2} colSpan={3}>
                <Input value={PatientGender} isReadOnly variant={'filled'} bgColor={'teal.100'} size={'md'}/>
                </GridItem>
              </SimpleGrid>
            </GridItem>

            <GridItem colSpan={1}>
              <SimpleGrid columns={6} my={'2vh'} >
                <Text>Birth Date:</Text>
                <GridItem  colStart={3} colSpan={3}>
                <Input value={PatientDOB} isReadOnly variant={'filled'} bgColor={'teal.100'} size={'md'}/>
                </GridItem>
              </SimpleGrid>
              <SimpleGrid columns={6} my={'2vh'}>
                <Text>Height:</Text>
                <GridItem  colStart={3} colSpan={3}>
                <Input value={PatientHeight} isReadOnly variant={'filled'} bgColor={'teal.100'} size={'md'}/>
                </GridItem>
              </SimpleGrid>
              <SimpleGrid columns={6} my={'2vh'}>
                <Text>Weight:</Text>
                <GridItem  colStart={3} colSpan={3}>
                <Input value={PatientWeight} isReadOnly variant={'filled'} bgColor={'teal.100'} size={'md'}/>
                </GridItem>
              </SimpleGrid>
            </GridItem>
          </SimpleGrid>
          </Box>
           <PatientResults id={id} details={history}/>
        </Layout>

    )

}

export default Pdetails2
