import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SignIn from '../SignIn'
import SignUp from '../SignUp' 
import { styled } from '@mui/material/styles';
import banner_background from '../../img/white-curved.jpeg';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Grid from '@mui/material/Grid'
const SignInOutContainer=()=>{
    const [value,setValue]=useState(0)
    const handleChange = (event, newValue) => setValue(newValue);
    const paperStyle={width:340,margin:"20px auto"}
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
                )}
            </div>
        );
    }
    return (
        <div>
            <Box textAlign="center">
                <Grid container>
                    <Grid item xs={6} sm={6}>
                        <Button variant="outlined" onClick={()=>handleChange("event",0)} style={{borderTopRightRadius:30,borderBottomLeftRadius:30}}  component="label"startIcon={<VpnKeyIcon style={{fill: "#bbc9f7",fontSize:24}}/>}>SIGN IN</Button>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button variant="outlined" onClick={()=>handleChange("event",1)} style={{borderTopRightRadius:30,borderBottomLeftRadius:30}}  component="label"startIcon={<ExitToAppIcon style={{fill: "#bbc9f7",fontSize:24}}/>}>SIGN UP</Button>
                    </Grid>
                </Grid>
            </Box>
            <TabPanel value={value} index={0}>
                <SignIn handleChange={handleChange}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SignUp/>
            </TabPanel>
        </div>
    )
}
export default SignInOutContainer;