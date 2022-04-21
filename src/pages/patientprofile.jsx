import { Heading, InputGroup, InputLeftAddon, IconButton, Button } from '@chakra-ui/react'
import {
    
    Box,
    FormControl,
    FormErrorMessage,
    Input,
    Stack,
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

const schema = yup.object().shape({
    PatientHeight: yup.number().positive().integer().required('Height is required').typeError("Height is Required and must be Positive"),
    PatientWeight: yup.number().positive().integer().required('Weight is required').typeError("Weight is Required and must be Positive"),
});

const Pdetails2 = () => {

    
  const [history,setHistory] = useState([])

  const { currentUser } = useAuth()
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
    const [eh,setEh]=useState(true)
    const [ew,setEw]=useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            MedicalId: MedicalId,
            PatientName: PatientName,
            PatientAge: PatientAge,
            PatientWeight: PatientWeight,
            PatientHeight: PatientHeight,
            PatientGender: PatientGender
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    
    const onSubmit = (data) => {
        console.log(data)

    }

    return (
        <Layout>
            <Stack ml={'5vw'} mr={'30%'} my='2%' >
                <Stack>
                    <Heading fontSize={'4xl'} textAlign={'left'} mb={'2vw'}>
                        Patient Profile
                    </Heading>
                    <Heading fontSize={'2xl'} pb={'2%'}>Basic Details</Heading>
                    <Box spacing={10} shadow='md' borderRadius='lg' p={'3%'}  >
                        <InputGroup mb={'2vh'}>
                            <InputLeftAddon children='Medical ID' />
                            <Input value={MedicalId} isReadOnly />
                        </InputGroup>
                        <InputGroup mb={'2vh'}>
                            <InputLeftAddon children='Patient Name' />
                            <Input value={PatientName} isReadOnly />
                        </InputGroup>
                        <InputGroup mb={'2vh'}>
                            <InputLeftAddon children='Patient Gender' />
                            <Input value={PatientGender} isReadOnly />
                        </InputGroup>
                        <InputGroup mb={'2vh'}>
                            <InputLeftAddon children='Patient DOB' />
                            <Input value={PatientDOB} isReadOnly />
                        </InputGroup>
                        <InputGroup mb={'2vh'}>
                            <InputLeftAddon children='Patient Age' />
                            <Input value={PatientAge} isReadOnly />
                        </InputGroup>
                    </Box>
                    <Heading fontSize={'2xl'} pb={'2%'}>Editable Details</Heading>
                    <Box spacing={10} shadow='md' borderRadius='lg' p={'3%'}  >
                            <form>
                            <FormControl isInvalid={errors.PatientHeight}>
                                <InputGroup mb={'2vh'}>
                                <InputLeftAddon children='Patient Height' />
                                <Input
                                    type='number' isReadOnly={eh}
                                    {...register('PatientHeight')}
                                />
                                <IconButton ml={'1vw'} icon={<BiEdit />} onClick={e=>setEh(false)}></IconButton>
                                <IconButton ml={'1vw'} icon={<AiOutlineClose />} onClick={e=>setEh(true)}></IconButton>
                                </InputGroup>
                             
                                <FormErrorMessage>
                                    {errors.PatientHeight && errors.PatientHeight.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.PatientWeight}>
                                <InputGroup mb={'2vh'}>
                                <InputLeftAddon children='Patient Weight' />
                                <Input
                                    type='number' isReadOnly={ew}
                                    {...register('PatientWeight')}
                                />
                                <IconButton ml={'1vw'} icon={<BiEdit />} onClick={e=>setEw(false)}></IconButton>
                                <IconButton ml={'1vw'} icon={<AiOutlineClose />} onClick={e=>setEw(true)}></IconButton>
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.PatientWeight && errors.PatientWeight.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Button onClick={handleSubmit(onSubmit)}>Save</Button>
                            </form>
                    </Box>
                    
                   <PatientResults id={MedicalId} details={history}/>
                </Stack>
            </Stack>
        </Layout>

    )

}

export default Pdetails2
