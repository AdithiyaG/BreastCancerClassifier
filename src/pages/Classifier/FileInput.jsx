import React, { useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { useFormContext } from "react-hook-form"
import { Box,FormControl,FormLabel,Input } from "@chakra-ui/react"

const FileInput = props => {
    const { name, label = name } = props
    const { register, unregister, setValue, watch } = useFormContext()
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
    return (
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
                    style={{ width: "500px", border: "black solid 2px" }}
                    className={" " + (isDragActive ? " " : " ")}
                >
                   { !files?.length && <p className=" ">Drop the files here ...</p>}

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
        </FormControl>
    )
}

export default FileInput