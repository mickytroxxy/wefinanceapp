import React from "react";
import '../App.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from '@material-ui/core';
import {getMyWithdrawals} from "../context/api";
import { AppContext } from '../context/AppContext';
import moment from 'moment';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PendingIcon from '@mui/icons-material/Pending';
import BlockIcon from '@mui/icons-material/Block';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
const tableHeaders = ['DATE','GROSS AMOUNT','NET AMOUNT','SERVICE FEE','STATUS'];
export default function Withdrawal({handleChange}) {
    const { loggedUser, formatToCurrency, setDialogData, mobileView } = React.useContext(AppContext);
    const [withdrawals,setWithdrawals] = React.useState([]);
    React.useEffect(()=>{
        getMyWithdrawals(loggedUser.phoneNumber, (response) => response.length > 0 && setWithdrawals(response) )
    },[loggedUser])
    const renderStatusIcon = (status) =>{
        if(status === "PENDING"){
            return <PendingIcon style={{fill: "yellow",fontSize:36}} />
        }else if(status === "APPROVED"){
            return <CheckCircleOutlinedIcon style={{fill: "green",fontSize:36}} />
        }else if(status === "REJECTED"){
            return <BlockIcon style={{fill: "tomato",fontSize:36}} />
        }
    }
    return (
        <Typography>
            <h3 className="fontBold">WITHDRAWAL SECTION</h3>
            <p className="fontBold" style={{color:'tomato'}}>*NOTE: For your loan to be processed, you should be a south African citizen with legit documents. Your documents should also be clear!</p>
            <Paper elevation={0} style={{border: '3px solid #f2f8fb',borderRadius:10,marginBottom:10}}>
                <Grid container spacing={1}>
                    <Grid item xs={4} sm={4} md={2} lg={4}>
                        <h4 className="fontLight">FAILED</h4>
                        <BlockIcon style={{fill: "tomato",fontSize:50}} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={2} lg={4}>
                        <h4 className="fontLight">PENDING</h4>
                        <PendingIcon style={{fill: "yellow",fontSize:50}} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={2} lg={4}>
                        <h4 className="fontLight">COMPLETED</h4>
                        <CheckCircleOutlinedIcon style={{fill: "green",fontSize:50}} />
                    </Grid>
                </Grid>
            </Paper>
            {mobileView ? (
                <Box sx={{ minWidth: 275 }} textAlign='left'>
                    {withdrawals.length > 0 && withdrawals.map(({ date, grossAmount, status, netAmount, serviceFee },i) => (
                        <Card Key={i} variant="outlined" style={{marginBottom:15}}>
                            <React.Fragment>
                                <CardContent style={{padding:0}}>
                                    <Grid container spacing={0} style={{backgroundColor:'#d9dbda',fontWeight:'bolder'}}>
                                        <Grid item xs={2} sm={2} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,marginTop:0,paddingTop:15,paddingLeft:5}}>ACTION</p></Grid>
                                        <Grid item xs={10} sm={10} md={6} lg={6} spacing={0}>
                                            <Box textAlign="right" style={{padding:5}}>
                                                {renderStatusIcon(status)}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>DATE</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{moment(date).format("YYYY-MM-DD HH:mm:ss")}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>GROSS AMOUNT</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{formatToCurrency(parseFloat(grossAmount))}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>NET AMOUNT</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{formatToCurrency(parseFloat(netAmount))}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>SERVICE FEE</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{formatToCurrency(parseFloat(serviceFee))}</p></Grid>
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
                            {tableHeaders.map((item,i)=> <TableCell numeric Key={i}><span className="fontBold" style={{fontWeight:'bold',fontSize:12}}>{item}</span></TableCell> )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {withdrawals.length > 0 && withdrawals.map(({ date, grossAmount, status, netAmount, serviceFee },i) => (
                            <TableRow key={i}> 
                                <TableCell component="th" scope="row"><span className="fontBold">{moment(date).format("YYYY-MM-DD HH:mm:ss")}</span></TableCell>
                                <TableCell numeric><span className="fontBold">{formatToCurrency(parseFloat(grossAmount))}</span></TableCell>
                                <TableCell numeric><span className="fontBold">{formatToCurrency(parseFloat(netAmount))}</span></TableCell>
                                <TableCell numeric><span className="fontBold">{formatToCurrency(parseFloat(serviceFee))}</span></TableCell>
                                <TableCell numeric>{renderStatusIcon(status)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {withdrawals.length === 0 && ( <h4 className="fontBold">YOU HAVE NOT MADE ANY WITHDRAWAL REQUEST YET. YOU CAN LODGE A REQUEST BT CLICKING THE FLOAT GREEN BUTTON ON YOUR BOTTOM RIGHT!</h4> )}
            <Fab onClick={()=>setDialogData({visible:true,title:'WITHDRAW YOUR FUNDS'})} color="primary" aria-label="add" style={{position: 'fixed',bottom: 16,right: 16,borderRadius:'100%',color:'#fff',backgroundColor:'#69d29e'}}>
                <AddIcon />
            </Fab>
        </Typography>
    );
}