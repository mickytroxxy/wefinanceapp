import React from "react";
import '../App.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from '@material-ui/core';
import {getDocuments,deleteData} from "../context/api";
import { AppContext } from '../context/AppContext';
import moment from 'moment';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PendingIcon from '@mui/icons-material/Pending';
import BlockIcon from '@mui/icons-material/Block';
import HighlightOff from '@mui/icons-material/HighlightOff';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
const tableHeaders = ['DOCUMENT TYPE','DATE','STATUS','ACTION'];
export default function Documents({handleChange}) {
    const { loggedUser, mobileView, setDialogData } = React.useContext(AppContext);
    const [documents,setDocuments] = React.useState([]);
    React.useEffect(()=>{
        getDocuments(loggedUser.phoneNumber, (response) => response.length > 0 && setDocuments(response) )
    },[])
    const renderStatusIcon = (status) =>{
        if(status === "PENDING"){
            return <PendingIcon style={{fill: "yellow",fontSize:36}} />
        }else if(status === "APPROVED"){
            return <CheckCircleOutlinedIcon style={{fill: "green",fontSize:36}} />
        }else if(status === "REJECTED"){
            return <BlockIcon style={{fill: "tomato",fontSize:36}} />
        }
    }
    const deleteDocument = (docId) =>{
        deleteData("documents",docId) && setDocuments(documents.filter(item => item.docId !== docId));
    }
    return (
        <Typography>
            <h3 className="fontBold">DOCUMENT SECTION</h3>
            <p className="fontBold" style={{color:'tomato'}}>*NOTE: ID, proof of residence not older than 3 months, latest payslip and 3 months bank statement documents are required for loan processing. A proof of a bank account ownership may also be required for investments payout.</p>
            <Paper elevation={0} style={{border: '3px solid #f2f8fb',borderRadius:10,marginBottom:10}}>
                <Grid container spacing={1}>
                    <Grid item xs={4} sm={4} md={2} lg={4}>
                        <h4 className="fontLight">REJECTED</h4>
                        <BlockIcon style={{fill: "tomato",fontSize:50}} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={2} lg={4}>
                        <h4 className="fontLight">PENDING</h4>
                        <PendingIcon style={{fill: "yellow",fontSize:50}} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={2} lg={4}>
                        <h4 className="fontLight">APPROVED</h4>
                        <CheckCircleOutlinedIcon style={{fill: "green",fontSize:50}} />
                    </Grid>
                </Grid>
            </Paper>
            {mobileView?(
                <Box sx={{ minWidth: 275 }} textAlign='left'>
                    {documents.length > 0 && documents.map(({ date, documentType, status, docId },i) => (
                        <Card Key={i} variant="outlined" style={{marginBottom:15}}>
                            <React.Fragment>
                                <CardContent style={{padding:0}}>
                                    <Grid container spacing={0} style={{backgroundColor:'#d9dbda',fontWeight:'bolder'}}>
                                        <Grid item xs={2} sm={2} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,marginTop:0,paddingTop:15,paddingLeft:5}}>ACTION</p></Grid>
                                        <Grid item xs={10} sm={10} md={6} lg={6} spacing={0}>
                                            <Box textAlign="right" style={{padding:5}}>
                                                <Button variant="outlined" onClick={() => deleteDocument(docId)}  component="label"startIcon={<HighlightOff style={{fill: "tomato"}}/>}>
                                                    Delete document
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>DATE</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{moment(date).format("YYYY-MM-DD HH:mm:ss")}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>DOCUMENT TYPE</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{documentType}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>STATUS</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{renderStatusIcon(status)}</p></Grid>
                                    </Grid>
                                </CardContent>
                            </React.Fragment>
                        </Card>     
                    ))}
                </Box>
            ):(
                <Table style={{borderRadius:10,backgroundColor:'#f7f7f7'}}>
                    <TableHead style={{backgroundColor:'#d9dbda'}}>
                        <TableRow>
                            {tableHeaders.map((item,i)=> <TableCell numeric Key={i}><h3 className="fontBold">{item}</h3></TableCell> )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.length > 0 && documents.map(({ date, documentType, status, docId },i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row"><span className="fontBold">{documentType}</span></TableCell>
                                <TableCell numeric><span className="fontBold">{moment(date).format("YYYY-MM-DD HH:mm:ss")}</span></TableCell>
                                <TableCell numeric>{renderStatusIcon(status)}</TableCell>
                                <TableCell numeric>
                                    <Button variant="outlined" onClick={() => deleteDocument(docId)}  component="label"startIcon={<HighlightOff style={{fill: "tomato"}}/>}>
                                        Delete Doc
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {documents.length === 0 && ( <h4 className="fontBold">You do not have any document uploaded. Click on the green icon on your bottom right corner to upload a new document!</h4> )}
            <Fab onClick={()=>setDialogData({visible:true,title:'UPLOAD DOCUMENTS'})} color="primary" aria-label="add" style={{position: 'fixed',bottom: 16,right: 16,borderRadius:'100%',color:'#fff',backgroundColor:'#69d29e'}}>
                <AddIcon />
            </Fab>
        </Typography>
    );
}