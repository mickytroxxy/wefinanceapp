import React from "react";
import { Grid, Paper, Typography, Box, Button, MenuItem , TableBody, TableCell, TableHead, TableRow,  } from '@material-ui/core';
import '../../App.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { AppContext } from '../../context/AppContext';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoIcon from '@mui/icons-material/Info';
import useFetch from "../../context/useFetch";
export default function Otp(props) {
    const {data:{phoneNumber,codeIsTrue}} = props;
    const {fetchData} = useFetch();
    const { setToastData, setDialogData } = React.useContext(AppContext);
    const [confirmationCode,setConfirmationCode]=React.useState(null);
    const [code,setCode]=React.useState(null);
    const confirmCode = () =>{
        if(parseInt(code) === parseInt(confirmationCode) && code !==null){
            codeIsTrue();
            //setDialogData({visible:false})
        }else{
            setToastData({visible:true,text:'Please enter the correct confirmation code!',severity:'error'})
        }
    }
    React.useEffect(()=>{
        const theCode = Math.floor(Math.random()*89999+10000);
        const text = "We Finance Group:\n Hello, your confirmation code is "+theCode;
        setCode(theCode);
        sendCode(phoneNoValidation(phoneNumber),text,()=>{});
    },[]);
    async function sendCode(phoneNo,msg,cb){
      const response = await fetchData({endPoint:'/sendsms',method:'POST',data:{to:phoneNo, email:'', accountType:'INDIVIDUAL',body:msg}});
      cb(true)
    }
    return (
        <Box textAlign='center'>
            <Typography>
                <p className="fontBold1" style={{fontSize:14,color:'#757575'}}>Enter confirmation code sent to {phoneNumber}!</p>
                <FormControl fullWidth style={{marginTop:10}}>
                    <TextField style={{marginTop:10}} id="outlined-start-adornment" onChange={(e)=>setConfirmationCode(e.target.value)} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="ENTER CONFIRMATION CODE" variant="outlined"/>
                    <div style={{marginTop:20}}><Button><CheckCircleOutlinedIcon style={{fill: "green",fontSize:100}} onClick={confirmCode} /></Button></div>
                </FormControl>
            </Typography>
        </Box>
    );
}
function phoneNoValidation(phone,countryCode){
    countryCode = "+27"
    var phoneNumber = phone.replace(/ /g, '');
    if ((phoneNumber.length < 16) && (phoneNumber.length > 7)) {
      if(phoneNumber[0]=="0" && phoneNumber[1]!="0"){
        phoneNumber = phoneNumber.slice(1,phoneNumber.length)
      }else if(phoneNumber[0]!="0"){
        phoneNumber = phoneNumber;
      }
      if(countryCode!=""){
        if(countryCode[0]=="+"){
          countryCode=countryCode.slice(1,countryCode.length)
        }else{
          if(countryCode[0]=="0" && countryCode[1]=="0"){
            countryCode=countryCode.slice(2,countryCode.length)
          }
        }
        return countryCode+phoneNumber;
      }else{
        return "Incorrect phone number";
      }
    }else{
      return "Incorrect phone number";
    }
  }