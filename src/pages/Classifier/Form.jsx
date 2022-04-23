import React, { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ClassifierForm from "./ClassifierForm";
import { Button } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom'
import { Layout } from "../../components/Layout";
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthContext.js'
import axios from 'axios';
import { setPatient,setCount } from "../../store/actions/patientActions";

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
    const dispatch = useDispatch();
    const { currentUser } = useAuth()
    const fetchProducts = async () => {
      const response = await axios
        .get(`http://localhost:8000/service1/patientdetails/?user=${currentUser.uid}`)
        .catch((err) => {
          console.log("Err: ", err);
        });

        const response2 = await axios
        .get(`http://localhost:8000/service1/patientdetails/?count=1`)
        .catch((err) => {
          console.log("Err: ", err);
        });

        console.log('count',response2.data)

    dispatch(setCount(response2.data))
      dispatch(setPatient(response.data));
    };
  
    useEffect(() => {
      fetchProducts();
      console.log('I done')
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
        mode: "onChange",
        resolver: yupResolver(schema)
    })
    const onSubmit = methods.handleSubmit(async (data) => {
        const putpatienturl = `http://localhost:8000/service1/patientdetails/`
        const postclassifierurl = `http://localhost:8000/service1/classifier/`
        const postpatienturl = `http://localhost:8000/service1/patientdetails/`
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


        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        for (var pair of patientData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }


        if (data.New_Patient === 'New') {

            const ppresponse = await axios.post(postpatienturl,patientData).catch(err => console.log(err))
            if (ppresponse.status === 201) {
                console.log("New Patient Added")
                const cresponse = await axios.post(postclassifierurl, formData).catch(err => console.log(err))
                console.log(cresponse.data)
            }
        }

        else{
            if (data.New_Patient === 'Old') {
                const presponse = await axios.put(putpatienturl,patientData).catch(err => console.log(err))
                if (presponse.status == 201) {
                    console.log("Patient updated")
                    const cresponse = await axios.post(postclassifierurl, formData).catch(err => console.log(err))
                    console.log(cresponse.data)
                }
            }
        }
    })

    return (
        <Layout>
        <FormProvider {...methods}>
            
                
                    <ClassifierForm
                        accept="image/png, image/jpg, image/jpeg"
                        name="files"
                        label="Upload Specimen Image"
                    />
                    <Button  type='submit' onClick={onSubmit}>
                                Confirm 
                            </Button>
                
        </FormProvider>
        </Layout>
    )
}

export default FormUp