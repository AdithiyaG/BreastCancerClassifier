import { Heading, Container } from '@chakra-ui/react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Stack,
    Button,
    Radio,
    RadioGroup
} from '@chakra-ui/react';
import React from 'react'
import { useState } from "react";
import { Layout } from '../../components/Layout'
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext.js'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useData } from './DataContext';
import FormUploader from './uploader';

const schema = yup.object().shape({
    MedicalId: yup.number().positive().integer().required('ID is required').typeError("ID is Required and must be Positive"),
    New_Patient:yup.string(),
    PatientName: yup.string().when("New_Patient",{is:(New_Patient)=>New_Patient!=='New',then:yup.string().nullable(true).transform((v, o) => o === '' ? null : v),else:yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")}).typeError('Name is required'),
    PatientAge: yup.number().when("New_Patient",{is:(New_Patient)=>New_Patient!=='New',then:yup.number().nullable(true).transform((v, o) => o === '' ? null : v),else:yup.number().required().positive()}).typeError("Age is Required and must be Positive"),
    PatientHeight: yup.number().when("New_Patient",{is:(New_Patient)=>New_Patient!=='New',then:yup.number().nullable(true).transform((v, o) => o === '' ? null : v),else:yup.number().required().positive()}).typeError("Height is Required and must be Positive"),
    PatientWeight: yup.number().when("New_Patient",{is:(New_Patient)=>New_Patient!=='New',then:yup.number().nullable(true).transform((v, o) => o === '' ? null : v),else:yup.number().required().positive()}).typeError("Weight is Required and must be Positive"),
});

const Pdetails = () => {
    const { currentUser } = useAuth()
    console.log(currentUser.uid)
    const { setValues, data } = useData();
   

    const { register, handleSubmit, watch, formState :{errors} } = useForm({
      defaultValues: { 
        New_Patient:data.New_Patient,
        MedicalId: data.MedicalId, 
        PatientName: data.PatientName,
        PatientAge: data.PatientAge ,
        PatientWeight: data.PatientWeight, 
        PatientHeight: data.PatientHeight,
        PatientGender: data.PatientGender,
        PatientDOB:data.PatientDOB },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })
    const history = useHistory()
    const show = watch("New_Patient",'New');
    console.log(show)
    const onSubmit = (data) => {
        console.log(data)
        setValues(data);
        history.push('./confirm')
    }

    return (
        <Layout>
            <Stack ml={'5vw'} mr={'30%'} my='2%' >
                <Stack>
                    <Heading fontSize={'4xl'} textAlign={'left'} mb={'2vw'}>
                        Classifier
                    </Heading>
                    <Box spacing={10} borderRadius='lg' p={'3%'}  >
                        <form >
                            <FormControl>
                                <FormLabel htmlFor='New_Patient'>Patient Type</FormLabel>
                                <RadioGroup defaultValue={'New'}>
                                  <Stack direction='row'>
                                    <Radio value={'Old'} {...register('New_Patient')} >Exisiting Patient</Radio>
                                    <Radio value={'New'} {...register('New_Patient')} >New Patinet</Radio>
                                    
                                  </Stack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl isInvalid={errors.MedicalId} >
                                <FormLabel htmlFor='MedicalId'>Patient Id</FormLabel>
                                <Input
                                    type='number'
                                    {...register('MedicalId')}
                                />
                                <FormErrorMessage>
                                    {errors.MedicalId && errors.MedicalId.message}
                                </FormErrorMessage>
                             
                            </FormControl>
                            {show==='New' &&<> <FormControl isInvalid={errors.PatientName}>
                                <FormLabel htmlFor='name'>Patient Name</FormLabel>
                                <Input
                                    type='text'
                                    placeholder='Name'
                                    {...register('PatientName')}
                                />
                                <FormErrorMessage>
                                    {errors.PatientName && errors.PatientName.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.PatientAge}>
                                <FormLabel htmlFor='PatientAge'>Patient Age</FormLabel>
                                <Input
                                    
                                    type='number'
                                    {...register('PatientAge')}
                                />
                                <FormErrorMessage>
                                    {errors.PatientAge && errors.PatientAge.message}
                                </FormErrorMessage>
                            </FormControl>

                            
                            <FormControl >
                                <FormLabel htmlFor='PatientDOB'>Patient DOB</FormLabel>
                                <Input
                                    
                                    type='date'
                                    {...register('PatientDOB')}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor='PatientGender'>Patient Gender</FormLabel>
                                <RadioGroup>
                                    <Stack direction='row'>
                                        <Radio value='Male' {...register('PatientGender')}>Male</Radio>
                                        <Radio value='Female'{...register('PatientGender')}>Female</Radio>
                                        <Radio value='Others'{...register('PatientGender')}>Others</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>

                            <FormControl isInvalid={errors.PatientHeight}>
                                <FormLabel htmlFor='PatientHeight'>Patient Height</FormLabel>
                                <Input
                                    
                                    type='number'
                                    {...register('PatientHeight')}
                                />
                                <FormErrorMessage>
                                    {errors.PatientHeight && errors.PatientHeight.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.PatientWeight}>
                                <FormLabel htmlFor='PatientWeight'>Patient Weight </FormLabel>
                                <Input
                                    type='number'
                                    {...register('PatientWeight')}
                                />
                                <FormErrorMessage>
                                    {errors.PatientWeight && errors.PatientWeight.message}
                                </FormErrorMessage>
                            </FormControl></>}

                            
                            <FormUploader/>

                            <Button mt={4} colorScheme='teal' type='submit' onClick={handleSubmit(onSubmit)}>
                                Next
                            </Button>
                        </form>


                    </Box>
                    <Flex>
                    </Flex>

                </Stack>
            </Stack>
        </Layout>

    )

}

export default Pdetails
