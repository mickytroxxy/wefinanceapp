import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AppContext } from '../../context/AppContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import {uploadFile,createData} from "../../context/api";
import BlockIcon from '@mui/icons-material/Block';

import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { MenuItem  } from '@material-ui/core';
const options = ['SELECT DOCUMENT TYPE', 'ID DOCUMENT', 'PASSPORT DOCUMENT', 'PERMIT DOCUMENT', 'PROOF OF RESIDENCE DOCUMENT', '3 MONTHS BANK STATEMENT', '3 MONTHS PAYSLIP'];

export default function UploadDocs() {
    const { loggedUser, mobileView } = React.useContext(AppContext);
    const [imageAsFile, setImageAsFile] = React.useState('')
    const [uploadStatus,setUploadStatus] = React.useState(null);
    const [selectedDocument,setSelectedDocument] = React.useState(options[0]);
    const processFile = () =>{
        setUploadStatus("UPLOADING")
        const path = "documents/"+loggedUser.fname+"/"+selectedDocument+"/"+Date.now();
        uploadFile(imageAsFile,path,(url)=>{
            if(url){
                const docId = loggedUser.fname + Date.now();
                const data = {url,status:'PENDING',date:Date.now(),documentType:selectedDocument,docId,phoneNumber:loggedUser.phoneNumber,isLoading:false}
                if(createData("documents",docId,data)){
                    setUploadStatus("PASSED")
                }else{
                    setUploadStatus("FAILED")
                }
            }else{
                setUploadStatus("FAILED");
            }
        })
    }
    return (
        <Box textAlign='center'>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">DOCUMENT TYPE</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedDocument} label="DOCUMENT TYPE">
                    {options.map((option) => (
                        <MenuItem key={option} onClick={()=>setSelectedDocument(option)} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {!uploadStatus ? (
                <div>
                    <Typography>
                        <Button component="label">
                            <CloudUploadIcon style={{fill: "green",fontSize:100}}/>
                            <input type="file" onChange={(e) => setImageAsFile(e.target.files[0])} hidden/>
                        </Button>
                    </Typography>
                    <Typography>
                        <Button variant="contained" component="label" onClick={()=>processFile()} disabled={(selectedDocument==="SELECT DOCUMENT TYPE" || imageAsFile==="") ? true : false}>
                            UPLOAD DOCUMENT
                        </Button>
                    </Typography>
                </div>
            ):(
                <Typography>
                    {uploadStatus === "PASSED" ? (
                        <div>
                            <p className="fontBold">Your file was uploaded successfully!</p>
                            <CheckCircleOutlinedIcon style={{fill: "green",fontSize:100}} />
                        </div>
                    ):(
                        <>
                            {uploadStatus === "UPLOADING" ? (
                                <CircularProgress size={50} style={{margin:20,color:"#ccc"}}></CircularProgress>
                            ):(
                                <div>
                                    <p className="fontBold" style={{color:'tomato'}}>File could not be uploaded</p>
                                    <BlockIcon style={{fill: "tomato",fontSize:100}} />
                                </div>
                            )}
                        </>
                    )}
                </Typography>
            )}
        </Box>
    );
}