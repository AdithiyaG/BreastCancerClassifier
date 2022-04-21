import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useData } from "./DataContext";
import FileInput from "./FileInput"

const FormUploader = () => {
    const { setValues, data } = useData();
    const methods = useForm({
        defaultValues: {
            files: data.files,
          },
        mode: "onBlur",
    })
    const onSubmit = methods.handleSubmit(data => {
        console.log("values", data)
        setValues(data);
    })

    return (
        <FormProvider {...methods}>
            
                <div className="">
                    <FileInput
                        accept="image/png, image/jpg, image/jpeg"
                        name="files"
                        label="File Upload"
                    />
                    <button mt={4}  type='submit' onClick={onSubmit}>
                                Confirm 
                            </button>
                </div>
        </FormProvider>
    )
}

export default FormUploader