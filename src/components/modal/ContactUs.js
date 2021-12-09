import React from "react";
import { Grid, Paper, Typography, Box, Button, MenuItem , TableBody, TableCell, TableHead, TableRow,  } from '@material-ui/core';
import '../../App.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { AppContext } from '../../context/AppContext';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoIcon from '@mui/icons-material/Info';
import {createData} from "../../context/api";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IconButton from '@mui/material/IconButton';
const issueTypes = ["ACCOUNT ACCESS","LOAN ISSUE","INVESTMENT ISSUE","WITHDRAWAL ISSUE","OTHER"];
export default function ContactUs() {
    const [contactStatus,setContactStatus]=React.useState(null);
    const [contactDetails,setContactDetails] = React.useState({issueType:'ACCOUNT ACCESS',fname:'',emailAddress:'',message:''})
    const [isError,setIsError]=React.useState(false);
    const {socialMedia} = React.useContext(AppContext);
    const contact_btn_clicked =()=>{
        if(contactDetails.fname.length > 2 && contactDetails.emailAddress!=="" && contactDetails.message!==""){
            const docId = contactDetails.emailAddress + Math.floor(Math.random()*89999+10000);
            createData("emails",docId,contactDetails) && setContactStatus("PASSED")
        }else{
            setIsError("Error! Note non of the fields should be blank!");
            setTimeout(() => setIsError(false) , 2000);
        }
    }
    return (
        <Box textAlign='center'>
            {!contactStatus ? (
                <Typography>
                    <Box textAlign="left" style={{border: '1px solid #ccc',borderRadius:7,marginBottom:20,padding:5,backgroundColor:'#f6f7fa'}}>
                        <Grid container onClick={()=>socialMedia("whatsApp")}>
                            <Grid item xs={2}>
                                <WhatsAppIcon style={{fill: "green",fontSize:28}} />
                            </Grid>
                            <Grid item xs={10}>
                                <span className="fontLight" style={{marginTop:6}}>+27 73 466 0029</span>
                            </Grid>
                        </Grid>
                        <Grid container onClick={()=>socialMedia("facebook")}>
                            <Grid item xs={2}>
                                <FacebookIcon style={{fill: "blue",fontSize:28}} />
                            </Grid>
                            <Grid item xs={10}>
                                <span className="fontLight" style={{marginTop:6}}>We Finance Group</span>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <EmailIcon style={{fill: "#bbc9f7",fontSize:28}} />
                            </Grid>
                            <Grid item xs={10}>
                                <span className="fontLight" style={{marginTop:6}}>info@wefinancegroup.org</span>
                            </Grid>
                        </Grid>
                        {/*<Grid container>
                            <Grid item xs={2}>
                                <PhoneIcon style={{fill: "#bbc9f7",fontSize:28}} />
                            </Grid>
                            <Grid item xs={10}>
                                <span className="fontLight" style={{marginTop:6}}>+27 10 335 0933</span>
                            </Grid>
                        </Grid>*/}
                        <Grid container>
                            <Grid item xs={2}>
                                <LocationOnIcon style={{fill: "#bbc9f7",fontSize:28}} />
                            </Grid>
                            <Grid item xs={10}>
                                <span className="fontLight" style={{marginTop:6}}>75 Maude St, Sandown, Sandton, 2146</span>
                            </Grid>
                        </Grid>
                    </Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">SELECT CATEGORY</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={contactDetails.issueType} label="SELECT CATEGORY">
                            {issueTypes.map((item) => (
                                <MenuItem key={item} onClick={()=>setContactDetails({...contactDetails,issueType:item})} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={{marginTop:10}}>
                        <TextField style={{marginTop:10}} id="outlined-start-adornment" onChange={(e)=>setContactDetails({...contactDetails,fname:e.target.value})} value={contactDetails.fname} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="FULL NAME" variant="outlined"/>
                        <TextField style={{marginTop:10}} id="outlined-start-adornment" onChange={(e)=>setContactDetails({...contactDetails,emailAddress:e.target.value})} value={contactDetails.emailAddress} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="EMAIL ADDRESS" variant="outlined"/>
                        <TextField style={{marginTop:10}} id="outlined-start-adornment" onChange={(e)=>setContactDetails({...contactDetails,message:e.target.value})} value={contactDetails.message} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="MESSAGE" variant="outlined"/>
                        {isError &&(
                            <div className="fontBold"><span style={{color:'tomato',fontSize:20}}>{isError}</span></div>
                        )}
                        <div style={{marginTop:20}}><Button><CheckCircleOutlinedIcon style={{fill: "green",fontSize:100}} onClick={contact_btn_clicked} /></Button></div>
                    </FormControl>
                </Typography>
            ):(
                <>
                    <CheckCircleOutlinedIcon style={{fill: "green",fontSize:220}}/>
                    <h5 className="fontBold">YOUR MESSAGE HAS BEEN SUBMITTED. WE WILL CONTACT YOU SOON!</h5> 
                </>
            )}
        </Box>
    );
}