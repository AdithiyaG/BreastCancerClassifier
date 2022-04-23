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
           
        </Layout>

    )

}

export default Pdetails2
