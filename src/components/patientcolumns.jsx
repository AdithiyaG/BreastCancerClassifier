import {HiExternalLink} from 'react-icons/hi';
import {FaFileDownload} from 'react-icons/fa'
import { IconButton,Link } from '@chakra-ui/react';
import axios from 'axios';
import {path} from './apilink'

const fetchProducts = (data) => {
  console.log(data)
   axios
   ({
    url: path+`service1/report/?pid=${data}`, 
    method: 'GET',
    responseType: 'blob', // important
})
    .then((response) => {
      console.log(response)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      const contentDisposition = response.headers['content-disposition'];
      console.log(contentDisposition,'Content')
      link.href = url;
      link.setAttribute('download', contentDisposition+'.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
  })
    .catch((err) => {
      console.log("Err: ", err);
    });
};


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
    Header: 'DateCreated',
    accessor: 'DateCreated'
  },
  {
    Header:'Actions',
    Cell:(props)=>{
      return(
        <Link href={`/table/${props.row.original.MedicalId}`}><IconButton bgColor={'teal.200'} icon={<HiExternalLink />} ></IconButton></Link>
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
    Header: 'Date',
    accessor: 'UsedDate'
  },
  {
    Header:'Download Report',
    Cell:(props)=>{
      return(
        <IconButton bgColor={'teal.200'} icon={<FaFileDownload />} onClick={()=>fetchProducts(props.row.original.Id)}></IconButton>
        )
    }
  }
]

