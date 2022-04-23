import {
    Flex, Box, FormControl, FormLabel, FormErrorMessage, Input, Stack, Radio, RadioGroup, Heading, useToast, Text
} from '@chakra-ui/react';
import { useDropzone } from "react-dropzone"
import { useFormContext, Controller } from "react-hook-form"
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ClassifierForm = (props) => {
    const details = useSelector((state) => state.allPatients)
    const { name, label = name } = props
    const { register, unregister, setValue, getFieldState, watch, setError, clearErrors, formState: { errors } } = useFormContext()
    const  [state,setState]=useState(false)
    const toast = useToast()

    const files = watch(name)

    const onDrop = useCallback(
        droppedFiles => {
            setValue(name, droppedFiles, { shouldValidate: true })
        },
        [setValue, name]
    )
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: props.accept,
    })

    useEffect(() => {
        register(name)
        return () => {
            unregister(name)
        }
    }, [register, unregister, name])

    const toastIdRef = React.useRef()

    function update() {
        if (toastIdRef.current) {
            toast.update(toastIdRef.current, {
                title: 'Removed Autofilled Values',
                description: "Id not found",
                status: 'error',
                duration: 7000,
                isClosable: true,
                position: 'top-right'
            })
        }
        else{
             toast({
                title: 'Please Enter Valid ID',
                description: "Id not found",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        }
    }

    function addToast() {
        toastIdRef.current = toast({
            title: 'Autofilled Values',
            description: "We've filled some values for you",
            status: 'success',
            duration: 7000,
            isClosable: true,
            position: 'top-right'
        })
    }

    const id = watch('MedicalId')
    const type = watch('New_Patient')
    const pname=watch('PatientName')

    useEffect(()=>{
        if (type == 'New'){
            setState(false)
            clearErrors()
            setValue('MedicalId',100+(details.count))
            setValue('PatientName', '')
            setValue('PatientAge', '')
            setValue('PatientHeight', '')
            setValue('PatientWeight', '')
            setValue('PatientHeight', '')
            setValue('PatientGender', '')
            setValue('PatientDOB', '')
        }
        else if(type =='Old'){
            setState(true)
        }
    },[type])


    useEffect(() => {
        let valid = getFieldState('MedicalId').invalid
        console.log(id, type)
        if (id != '' && !valid && type == 'Old') {
        console.log('Inside')
        let a = details.tabledata.filter(item => item.MedicalId == id)
        console.log(a)
        if (a.length === 0) {
            console.log('Error')
            setError('MedicalId', { type: 'custom', message: 'ID not Found' })
            setValue('PatientName', '')
            setValue('PatientAge', '')
            setValue('PatientHeight', '')
            setValue('PatientWeight', '')
            setValue('PatientHeight', '')
            setValue('PatientGender', '')
            setValue('PatientDOB', '')
            update()
        }
        else {
            // clearErrors('MedicalId')
            console.log(1, a)
            setValue('PatientName', a[0].PatientName,{ shouldValidate: true })
            setValue('PatientAge', a[0].PatientAge,{ shouldValidate: true })
            setValue('PatientHeight', a[0].PatientHeight,{ shouldValidate: true })
            setValue('PatientWeight', a[0].PatientWeight,{ shouldValidate: true })
            setValue('PatientHeight', a[0].PatientHeight,{ shouldValidate: true })
            setValue('PatientGender', a[0].PatientGender)
            setValue('PatientDOB', a[0].PatientDOB)
            addToast()
            
        }
    }
}, [id,type])

return (

    <>
        <Stack ml={'5vw'} mr={'30%'} my='2%' >
            <Stack>
                <Heading fontSize={'4xl'} textAlign={'left'} mb={'2vw'}>
                    Classifier
                </Heading>
                
                <Box spacing={10} borderRadius='lg' p={'3%'}  >
                    <FormControl>
                        <FormLabel htmlFor='New_Patient'>Type</FormLabel>
                        <RadioGroup >
                            <Stack direction='row'>
                                <Radio value={'Old'} {...register('New_Patient')} >Exisiting </Radio>
                                <Radio value={'New'} {...register('New_Patient')} >New</Radio>

                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl isInvalid={errors.MedicalId} >
                        <FormLabel htmlFor='MedicalId'>Id</FormLabel>
                        <Input
                            type='number'
                            {...register('MedicalId')} isReadOnly={!state}
                        />
                        <FormErrorMessage>
                            {errors.MedicalId && errors.MedicalId.message}
                            
                        </FormErrorMessage>
                        { (pname =='' &&  type=='Old') &&<Text color={'red'}> Please Enter Valid Medical ID</Text>}

                    </FormControl>

                    <FormControl isInvalid={errors.PatientName}>
                        <FormLabel htmlFor='PatientName'>Name</FormLabel>
                        <Input
                            type='text'
                            placeholder='Name'
                            {...register('PatientName')} isReadOnly={state}
                        />
                        <FormErrorMessage>
                            {errors.PatientName && errors.PatientName.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.PatientAge}>
                        <FormLabel htmlFor='PatientAge'>Age</FormLabel>
                        <Input

                            type='number'
                            {...register('PatientAge')} isReadOnly={state}
                        />
                        <FormErrorMessage>
                            {errors.PatientAge && errors.PatientAge.message}
                        </FormErrorMessage>
                    </FormControl>


                    <FormControl >
                        <FormLabel htmlFor='PatientDOB'>Date of Birth</FormLabel>
                        <Input

                            type='date'
                            {...register('PatientDOB')} isReadOnly={state}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='PatientGender'>Gender</FormLabel>
                        <Stack direction='row' spacing={5}>
                            <Stack direction='row'>
                                <input {...register("PatientGender", { required: true })} type="radio" value="Male" id='male'  />
                                <label htmlFor="male">
                                    <Text>Male</Text></label>
                            </Stack>
                            <input {...register("PatientGender", { required: true })} type="radio" value="Female" id='female' />
                            <label htmlFor="female">Female</label>
                            <input {...register("PatientGender", { required: true })} type="radio" value="Others" id='others'/>
                            <label htmlFor="others">Others</label>
                        </Stack >
                    </FormControl>

                    <FormControl isInvalid={errors.PatientHeight}>
                        <FormLabel htmlFor='PatientHeight'>Height(cm)</FormLabel>
                        <Input

                            type='number'
                            {...register('PatientHeight')}
                        />
                        <FormErrorMessage>
                            {errors.PatientHeight && errors.PatientHeight.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.PatientWeight}>
                        <FormLabel htmlFor='PatientWeight'>Weight(kg) </FormLabel>
                        <Input
                            type='number'
                            {...register('PatientWeight')}
                        />
                        <FormErrorMessage>
                            {errors.PatientWeight && errors.PatientWeight.message}
                        </FormErrorMessage>
                    </FormControl>


                    <FormControl>
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <Box
                            {...getRootProps()}
                            type="file"
                            role="button"
                            aria-label="File Upload"
                            id={name}
                        >
                            <Input {...props} {...getInputProps()} />
                            <div
                    className={" " + (isDragActive ? " " : " ")}
                >
                                {!files?.length && <p className=" ">Drop the files here ...</p>}

                                {!!files?.length && (
                                    <div className=" ">
                                        {files.map(file => {
                                            return (
                                                <div key={file.name}>
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={file.name}
                                                        style={{
                                                            height: "200px",
                                                        }}
                                                    />
                                                    {file.name}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </Box>
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                        
                    </FormControl>



                </Box>
                <Flex>
                </Flex>

            </Stack>
        </Stack>
    </>
)

}

export default ClassifierForm