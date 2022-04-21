import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
     Button, TableContainer
} from '@chakra-ui/react'
import { Layout } from '../../components/Layout'
import { useData } from './DataContext'
import React from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'

const Result = () => {
    const { data } = useData()
    const entries = Object.entries(data).filter(entry => entry[0] !== "files").filter(entry => entry[1] !== null)
    const { files } = data;
    console.log(files)
    const { currentUser } = useAuth()
    console.log(currentUser.uid)


    const onSubmit = async () => {
        const getpatienturl = `http://localhost:8000/service1/patientdetails/?user=${currentUser.uid}&id=${data.MedicalId}`
        const postclassifierurl = `http://localhost:8000/service1/classifier/`
        const postpatienturl = `http://localhost:8000/service1/patientdetails/`
        const patientData = new FormData()
        const formData = new FormData()
        formData.append("MedicalId", data.MedicalId)
        formData.append("ImagePath", files[0])
        formData.append("Class", 'None')
        formData.append('Accuracy', 'None')
        formData.append('UserId', currentUser.uid)



        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        if (data.New_Patient === 'Old') {
            const presponse = await axios.get(getpatienturl).catch(err => console.log(err))
            if (presponse.status == 200) {
                console.log("PatientFound")
                const cresponse = await axios.post(postclassifierurl, formData).catch(err => console.log(err))
                console.log(cresponse.data)
            }
            else {
                console.log("You dont have permission or No patient Found")
            }
        }

        if (data.New_Patient === 'New') {

            patientData.append('MedicalId', data.MedicalId)
            patientData.append('PatientName', data.PatientName)
            patientData.append('PatientAge', data.PatientAge)
            patientData.append('PatientGender', data.PatientGender)
            patientData.append('PatientDOB', data.PatientDOB)
            patientData.append('PatientHeight', data.PatientHeight)
            patientData.append('PatientWeight', data.PatientWeight)
            patientData.append('UserId', currentUser.uid)

            const ppresponse = await axios.post(postpatienturl,patientData).catch(err => console.log(err))
            if (ppresponse.status === 201) {
                console.log("New Patient Added")
                const cresponse = await axios.post(postclassifierurl, formData).catch(err => console.log(err))
                console.log(cresponse.data)
            }
        }
    }

    return (
        <Layout>
            <TableContainer>


                <Table >
                    <Thead>
                        <Tr>
                            <Th>Feild</Th>
                            <Th>Value</Th>
                        </Tr>

                    </Thead>
                    <Tbody>
                        {
                            entries.map(entry => (
                                <Tr key={entry[0]}>
                                    <Td>{entry[0]}</Td>
                                    <Td>{entry[1].toString()}</Td>
                                </Tr>
                            ))
                        }

                    </Tbody>
                </Table>
            </TableContainer>
            {files && <>
                {files.map((f, index) => (
                    <>
                        <>{f.name}</>
                        <img src={URL.createObjectURL(f)}
                            alt={f.name}
                            style={{
                                height: "200px",
                            }} />
                    </>

                )
                )}
            </>}
            <Button onClick={onSubmit}>Submit</Button>

        </Layout>

    )
}

export default Result