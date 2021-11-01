import React from "react";
import '../App.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box, Button } from '@material-ui/core';
import {getLoans} from "../context/api";
import { AppContext } from '../context/AppContext';
import moment from 'moment';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PendingIcon from '@mui/icons-material/Pending';
import BlockIcon from '@mui/icons-material/Block';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const tableHeaders = ['DATE','LOAN AMOUNT','LOAN INTEREST','AMOUNT INTEREST','TOTAL REPAYMENT','PERIOD','STATUS'];
export default function Documents({handleChange}) {
    const { loggedUser, formatToCurrency, currentInterests, mobileView } = React.useContext(AppContext);
    const [loans,setLoans] = React.useState([]);
    const [isLoanAvailable,setIsLoanAvailable]=React.useState(true);
    React.useEffect(()=>{
        getLoans(loggedUser.phoneNumber, (response) => response.length > 0 && setLoans(response) )
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
    const goToLoanPage = () =>{
        if(currentInterests.canLoan){
            handleChange("event",7)
        }else{
            setIsLoanAvailable(false);
            setTimeout(() => {
                setIsLoanAvailable(true);
            }, 3000);
        }
    }
    return (
        <Typography>
            <h3 className="fontBold">LOAN SECTION</h3>
            {isLoanAvailable?(
                <p className="fontBold" style={{color:'tomato'}}>*NOTE: For your loan to be processed, you should be a south African citizen with legit documents. Your documents should also be clear!</p>
            ):(
                <p className="fontBold" style={{color:'tomato',fontWeight:"bold"}}>We do not currently offer loans. Please try again in few minutes</p>
            )}
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
            {mobileView ? (
                <Box sx={{ minWidth: 275 }} textAlign='left'>
                    {loans.length > 0 && loans.map(({ date, totalRepayments, status, loanAmount, loanInterest, loanPeriod, interestAmount },i) => (
                       <Card variant="outlined" style={{marginBottom:15}}>
                            <React.Fragment>
                                <CardContent style={{padding:0}}>
                                    <Grid container spacing={0} style={{backgroundColor:'#d9dbda',fontWeight:'bolder'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,marginTop:0,paddingTop:15,paddingLeft:5}}>STATUS</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><Box textAlign="right" style={{padding:5}}>{renderStatusIcon(status)}</Box></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>DATE</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{moment(date).format("YYYY-MM-DD HH:mm:ss")}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>LOAN AMOUNT</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{formatToCurrency(parseFloat(loanAmount))}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>LOAN INTEREST</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{parseFloat(loanInterest).toFixed(2)}%</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>AMOUNT INTEREST</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{formatToCurrency(parseFloat(interestAmount))}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>TOTAL REPAYMENT</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{formatToCurrency(parseFloat(totalRepayments))}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>PERIOD</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{loanPeriod}</p></Grid>
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
                        {loans.length > 0 && loans.map(({ date, totalRepayments, status, loanAmount, loanInterest, loanPeriod, interestAmount },i) => (
                            <TableRow key={i}> 
                                <TableCell component="th" scope="row"><span className="fontBold">{moment(date).format("YYYY-MM-DD HH:mm:ss")}</span></TableCell>
                                <TableCell numeric><span className="fontBold">{formatToCurrency(parseFloat(loanAmount))}</span></TableCell>
                                <TableCell numeric><span className="fontBold">{parseFloat(loanInterest).toFixed(2)}%</span></TableCell>
                                <TableCell numeric><span className="fontBold">{formatToCurrency(parseFloat(interestAmount))}</span></TableCell>
                                <TableCell numeric><span className="fontBold">{formatToCurrency(parseFloat(totalRepayments))}</span></TableCell>
                                <TableCell numeric><span className="fontBold">{loanPeriod}</span></TableCell>
                                <TableCell numeric>{renderStatusIcon(status)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {loans.length === 0 && ( <h4 className="fontBold">You have not applied for any short-term loan. To apply please click on the button below. T&C apply.</h4> )}
            <Fab onClick={()=>goToLoanPage()} color="primary" aria-label="add" style={{position: 'fixed',bottom: 16,right: 16,borderRadius:'100%',color:'#fff',backgroundColor:'#69d29e'}}>
                <AddIcon />
            </Fab>
        </Typography>
    );
}