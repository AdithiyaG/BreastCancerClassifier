import {HiExternalLink} from 'react-icons/hi';
import { IconButton,Link } from '@chakra-ui/react';


export const COLUMNS = [
  {
    Header: 'Medical Id',
    accessor: 'MedicalId',
  },
  {
    Header: 'Patient Name',
    accessor: 'PatientName',
  },
  {
    Header: 'Patient Age',
    accessor: 'PatientAge',
  },
  {
    Header: 'Date of Birth',
    accessor: 'PatientDOB',
  },
  {
    Header: 'Patient Height',
    accessor: 'PatientHeight'
  },
  {
    Header: 'Patient Weight',
    accessor: 'PatientWeight'
  },
  {
    Header: 'DateCreated',
    accessor: 'DateCreated'
  },
  {
    Header:'Actions',
    Cell:(props)=>{
      return(
        <Link href={`/table/${props.row.original.MedicalId}`}><IconButton  icon={<HiExternalLink />} ></IconButton></Link>
        )
    }
      
  }
  
]


export const COLUMNS2 = [
  {
    Header: 'Medical Id',
    accessor: 'MedicalId',
  },
  {
    Header: 'Class',
    accessor: 'Class',
  },
  {
    Header: 'Accuracy',
    accessor: 'Accuracy',
  },
  {
    Header: 'ImagePath',
    accessor: 'ImagePath',
  },
  {
    Header: 'Date',
    accessor: 'UsedDate'
  },]

