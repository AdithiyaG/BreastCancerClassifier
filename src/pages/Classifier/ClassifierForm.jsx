import {
    Flex, Box, FormControl,FormLabel,FormErrorMessage, Input, Stack, Button, Radio,RadioGroup, Heading, Container
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

const schema = yup.object().shape({
    MedicalId: yup.number().positive().integer().required('ID is required').typeError("ID is Required and must be Positive"),
    New_Patient:yup.string(),
    PatientName: yup.string().when("New_Patient",{is:(New_Patient)=>New_Patient!=='New',then:yup.string().nullable(true).transform((v, o) => o === '' ? null : v),else:yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")}).typeError('Name is required'),
    PatientAge: yup.number().when("New_Patient",{is:(New_Patient)=>New_Patient!=='New',then:yup.number().nullable(true).transform((v, o) => o === '' ? null : v),else:yup.number().required().positive()}).typeError("Age is Required and must be Positive"),
    PatientHeight: yup.number().when("New_Patient",{is:(New_Patient)=>New_Patient!=='New',then:yup.number().nullable(true).transform((v, o) => o === '' ? null : v),else:yup.number().required().positive()}).typeError("Height is Required and must be Positive"),
    PatientWeight: yup.number().when("New_Patient",{is:(New_Patient)=>New_Patient!=='New',then:yup.number().nullable(true).transform((v, o) => o === '' ? null : v),else:yup.number().required().positive()}).typeError("Weight is Required and must be Positive"),
});

const ClassifierForm=()=>{

    const { currentUser } = useAuth()
    console.log(currentUser.uid)
    const { setValues, data } = useData();
   

    const { register, handleSubmit, watch, formState :{errors} } = useForm({
      defaultValues: { 
        New_Patient:'',
        MedicalId: '', 
        PatientName: '',
        PatientAge: '' ,
        PatientWeight: '', 
        PatientHeight: '',
        PatientGender: '',
        PatientDOB:'' },
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




}

export default ClassifierForm