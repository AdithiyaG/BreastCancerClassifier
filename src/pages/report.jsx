
import { Button,Text } from "@chakra-ui/react";


const Report = ({ pname, pid, weight,height,age }) => {
    const registerNewUser =  () => {
     console.log(pname,pid,weight,height,age)
    };
    return <Button  onClick={registerNewUser} loadingText="Submitting" size="lg" bg={'primary.100'} >Report</Button>;
  };
  
  export default Report;
  