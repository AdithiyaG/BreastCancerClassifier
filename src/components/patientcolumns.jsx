import {HiExternalLink} from 'react-icons/hi';
import { IconButton,Link } from '@chakra-ui/react';
import axios from 'axios';
import {path} from './apilink'

const fetchProducts = (data) => {
  console.log(data)
   axios
   ({
    url: path+`service1/report/?pid=${data}`, //your url
    method: 'GET',
    responseType: 'blob', // important
})
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); //or any other extension
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
    Header: 'ImagePath',
    accessor: 'ImagePath',
  },
  {
    Header: 'Date',
    accessor: 'UsedDate'
  },
  {
    Header:'Download',
    Cell:(props)=>{
      return(
        <IconButton bgColor={'teal.200'} icon={<HiExternalLink />} onClick={()=>fetchProducts(props.row.original.Id)}></IconButton>
        )
    }
  }
]

