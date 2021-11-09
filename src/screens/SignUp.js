import React,{useState} from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {createData} from "../context/api";
import { AppContext } from '../context/AppContext';
import "../App.css"
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import PhoneIcon from '@mui/icons-material/Phone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
const SignUp = () => {
    const { userHasLoggedIn,mobileView, setDialogData, setToastData, navigate } = React.useContext(AppContext);
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e',marginTop:15 }
    const btnstyle={margin:'8px 0'}
    const [userDetails,setUserDetails] = useState({fname:"",lname:"",phoneNumber:"",email:"",password:"",referredBy:""});
    const paperStyle={padding :!mobileView && 20,height:!mobileView && '73vh',width:!mobileView && 300, margin:"0 auto"}
    const [passwordVisible,setPasswordVisible]=useState(false);
    const [isRememberMe,setIsRememberMe]= React.useState(false);
    const sign_up_btn_clicked = () => {
      if(userDetails.fname!=="" && userDetails.lname!=="" && userDetails.email!=="" && userDetails.password!==""){
        setDialogData({visible:true,title:'TERMS & CONDITIONS',data:{isLoanTermsAccepted}})
      }else{
        setToastData({visible:true,text:'Please fill in all fields to proceed!',severity:'error'})
      }
    }
    const createAccount =()=>{
      if(createData("users",userDetails.email,userDetails)){
        userHasLoggedIn(userDetails,isRememberMe);
      }else{
        alert("Failed")
      }
    }
    const isLoanTermsAccepted = isAccepted => {
      if(isAccepted){ 
        if(!mobileView){
          setDialogData({visible:true,title:'ENTER CONFIRMATION CODE',data:{codeIsTrue,phoneNumber:userDetails.phoneNumber}})
        }else{
          setDialogData({visible:false});
          navigate("mobile",{page:'ENTER CONFIRMATION CODE',data:{codeIsTrue,phoneNumber:userDetails.phoneNumber}})
        }
      }
    }
    const codeIsTrue = () => {
      setDialogData({visible:false})
      createAccount();
    }
    return (
        <Grid>
            <div style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle} className="fontBold1">Sign Up</h2>
                    <Typography variant='caption' gutterBottom><span className="fontBold">Please fill this form to create an account !</span></Typography>
                </Grid>
                <FormControl fullWidth>
                  <TextField style={{marginTop:25}} id="outlined-start-adornment" required onChange={(e)=>setUserDetails({...userDetails,fname:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><AccountCircleIcon style={{fill: "#b6b8b7",fontSize:25}} /></InputAdornment>}} label="FIRST NAME" variant="outlined"/>
                  <TextField style={{marginTop:25}} id="outlined-start-adornment" required onChange={(e)=>setUserDetails({...userDetails,lname:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><AccountBoxIcon style={{fill: "#b6b8b7",fontSize:25}} /></InputAdornment>}} label="LAST NAME" variant="outlined"/>
                  <TextField style={{marginTop:25}} id="outlined-start-adornment" required onChange={(e)=>setUserDetails({...userDetails,phoneNumber:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon style={{fill: "#b6b8b7",fontSize:25}} /></InputAdornment>}} label="PHONE NUMBER" variant="outlined"/>
                  <TextField style={{marginTop:25}} id="outlined-start-adornment" required onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon style={{fill: "#b6b8b7",fontSize:25}} /></InputAdornment>}} label="EMAIL ADDRESS" variant="outlined"/>
                  <TextField style={{marginTop:25}} id="outlined-start-adornment" onChange={(e)=>setUserDetails({...userDetails,referredBy:e.target.value})} placeholder="Enter 10 digit phone number" sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon style={{fill: "#b6b8b7",fontSize:25}} /></InputAdornment>}} label="REFERRED BY" variant="outlined"/>
                  <TextField style={{marginTop:25}} id="outlined-start-adornment" required onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} type= {passwordVisible ? 'text' : 'password'} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><LockOpenIcon style={{fill: "#b6b8b7",fontSize:25}} /></InputAdornment>, endAdornment: <IconButton><InputAdornment position="end" onClick={()=>setPasswordVisible(!passwordVisible)}>{passwordVisible ? <VisibilityOffIcon style={{fill: "#b6b8b7",fontSize:25}} /> : <VisibilityIcon style={{fill: "#b6b8b7",fontSize:25}} />}</InputAdornment></IconButton>}} label="ENTER PASSWORD" variant="outlined"/>
                </FormControl>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                        checked={isRememberMe}
                        onChange={()=>setIsRememberMe(!isRememberMe)}
                    />
                    }
                    label="Remember me"
                 />
                <Button color='primary' variant="contained" style={btnstyle} fullWidth onClick={sign_up_btn_clicked}>ACCEPT TERMS & CONDITIONS</Button>
            </div>
        </Grid>
    )
}

export default SignUp;