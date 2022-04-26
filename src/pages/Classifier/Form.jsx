import React, { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ClassifierForm from "./ClassifierForm";
import { Button, Flex } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom'
import { Layout } from "../../components/Layout";
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthContext.js'
import axios from 'axios';
import { setPatient,setCount,GenerateReport,setResult } from "../../store/actions/patientActions";
import useLoader from "../../hooks/useLoader";
import { path } from "../../components/apilink";

const schema = yup.object().shape({
    MedicalId: yup.number().positive().integer().required('ID is required').typeError("ID is Required and must be Positive"),
    New_Patient:yup.string(),
    PatientName: yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    PatientAge: yup.number().positive().typeError("Age is Required and must be Positive"),
    PatientHeight: yup.number().positive().typeError("Height is Required and must be Positive"),
    PatientWeight: yup.number().positive().typeError("Weight is Required and must be Positive"),
    files: yup.mixed().required('File is required')
});


const FormUp = () => {
    const [loader,showLoader,Hideloader] =useLoader()
    const history = useHistory();
    const dispatch = useDispatch();
    const { currentUser } = useAuth()
    const fetchProducts = async () => {
      const response = await axios
        .get( path+`service1/patientdetails/?user=${currentUser.uid}`)
        .catch((err) => {
          console.log("Err: ", err);
        });
        const response2 = await axios
        .get(path+`service1/patientdetails/?count=1`)
        .catch((err) => {
          console.log("Err: ", err);
        });
        const response3=await axios
        .get(path+`service1/classifier/`)
        .catch((err) => {
          console.log("Err: ", err);
        });


    dispatch(setCount(response2.data))
      dispatch(setPatient(response.data));
      dispatch(setResult(response3.data))
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);

   
    const methods = useForm({
        defaultValues: {
        files: null,
        MedicalId: '', 
        PatientName: '',
        PatientAge: '' ,
        PatientWeight: '', 
        PatientHeight: '',
        PatientGender: '',
        PatientDOB:''
          },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })
    const onSubmit = methods.handleSubmit(async (data) => {
      console.log(data)
      const url=URL.createObjectURL(data.files[0])
      console.log(url,data.files)
      data.files.push(url)
      console.log(data.files)
        showLoader()
        const putpatienturl = path+`service1/patientdetails/`
        const postclassifierurl = path+`service1/classifier/`
        const postpatienturl = path+`service1/patientdetails/`
        const patientData = new FormData()
        const formData = new FormData()
        formData.append("MedicalId", data.MedicalId)
        formData.append("ImagePath", data.files[0])
        formData.append("Class", 'None')
        formData.append('UserId', currentUser.uid)

        patientData.append('MedicalId', data.MedicalId)
        patientData.append('PatientName', data.PatientName)
        patientData.append('PatientAge', data.PatientAge)
        patientData.append('PatientGender', data.PatientGender)
        patientData.append('PatientDOB', data.PatientDOB)
        patientData.append('PatientHeight', data.PatientHeight)
        patientData.append('PatientWeight', data.PatientWeight)
        patientData.append('UserId', currentUser.uid)

        if (data.New_Patient === 'New') {

            const ppresponse = await axios.post(postpatienturl,patientData).catch(err => console.log(err))
            if (ppresponse.status === 201) {
                console.log("New Patient Added")
                const cresponse = await axios.post(postclassifierurl, formData).catch(err => console.log(err))
                console.log(cresponse.data)
                dispatch(GenerateReport([data,cresponse.data]))
            }
        }

        else{
            if (data.New_Patient === 'Old') {
                const presponse = await axios.put(putpatienturl,patientData).catch(err => console.log(err))
                if (presponse.status == 201) {
                    console.log("Patient updated")
                    const cresponse = await axios.post(postclassifierurl, formData).catch(err => console.log(err))
                    console.log(cresponse.data)
                    dispatch(GenerateReport([data,cresponse.data]))
                    
                }
            }
        }
        Hideloader()

        history.push('/report')
      

    })

    return (
        <Layout>
        <FormProvider {...methods}>
            <Flex direction={'column'} mb={'5vh'}>
                    <ClassifierForm
                        accept="image/png, image/jpg, image/jpeg"
                        name="files"
                        label="Upload Specimen Image"
                    />
                    
                    <Button bgColor={'teal.200'} mx={'auto'} type='submit' onClick={onSubmit}> {loader} Analyze and Generate Report </Button>
                            </Flex>
                           
                
        </FormProvider>
        
        
        </Layout>
    )
}

export default FormUp