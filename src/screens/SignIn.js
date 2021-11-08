import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {userLogin} from "../context/api";
import { AppContext } from '../context/AppContext';
import "../App.css"
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import PhoneIcon from '@mui/icons-material/Phone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
const SignIn=({handleChange})=>{
    const { userHasLoggedIn,mobileView,setToastData } = React.useContext(AppContext);
    const paperStyle={padding :!mobileView && 20,height:!mobileView && '73vh',width:!mobileView && 300, margin:"0 auto",borderRadius:15}
    const avatarStyle={backgroundColor:'#1bbd7e',marginTop:15}
    const btnstyle={margin:'8px 0'}
    const [loginDetails,setLoginDetails] = React.useState({phoneNumber:'',password:''});
    const [isRememberMe,setIsRememberMe]= React.useState(false);
    const login_btn_clicked = () => {
        if(loginDetails.phoneNumber !== "" && loginDetails.password !== ""){
            userLogin(loginDetails.phoneNumber, loginDetails.password, (response) => response.length > 0 ? userHasLoggedIn(response[0],isRememberMe) : setToastData({visible:true,text:'Invalid login credentials, try again!',severity:'error'}) )
        }else{
            setToastData({visible:true,text:'All fields are required to proceed!',severity:'error'})
        }
    }
    return(
        <Grid>
            <div  style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2 className="fontBold1">Sign In</h2>
                </Grid>
                <FormControl fullWidth>
                    <TextField style={{marginTop:25}} id="outlined-start-adornment" required onChange={(e)=>setLoginDetails({...loginDetails,phoneNumber:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon style={{fill: "#b6b8b7",fontSize:25}} /></InputAdornment>}} label="ENTER PHONE NUMBER" variant="outlined"/>
                    <TextField style={{marginTop:25}} id="outlined-start-adornment" required onChange={(e)=>setLoginDetails({...loginDetails,password:e.target.value})} type='password' sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><LockOpenIcon style={{fill: "#b6b8b7",fontSize:25}} /></InputAdornment>}} label="ENTER PASSWORD" variant="outlined"/>
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
                <Button color='primary' variant="contained" style={btnstyle} fullWidth onClick={()=>login_btn_clicked()}>Sign in</Button>
                <Typography >
                     <Link href="#" className="fontBold">
                        Forgot password?
                </Link>
                </Typography>
                <Typography className="fontBold">Do you have an account?
                     <Link href="#" onClick={()=>handleChange("event",1)} className="fontBold1">
                        Sign Up 
                </Link>
                </Typography>
            </div>
        </Grid>
    )
}

export default SignIn