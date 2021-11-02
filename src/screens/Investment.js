import React from "react";
import '../App.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import {getInvestments} from "../context/api";
import { AppContext } from '../context/AppContext';
import PaymentIcon from '@mui/icons-material/Payment';
import CachedIcon from '@mui/icons-material/Cached';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
const tableHeaders = ['DATE','AMOUNT','PROFIT','INTEREST','RETURNS','PERIOD','STATUS'];
export default function Investment({handleChange}) {
    const { loggedUser, formatToCurrency, setDialogData, mobileView } = React.useContext(AppContext);
    const [totalInvestments,setTotalInvestments] = React.useState(null);
    React.useEffect(()=>{
        getInvestments(loggedUser.phoneNumber, (response) => response.length > 0 && setTotalInvestments(response) )
    },[])
    return (
        <Typography>
            <h3 className="fontBold">INVESTMENT SECTION</h3>
            <p className="fontBold" style={{color:'tomato'}}>*NOTE: If your investment list still has a MAKE PAYMENT button. Please click on the button to make your payment for the investment process to start.</p>
            {mobileView?(
                <Box sx={{ minWidth: 275 }} textAlign='left'>
                    {totalInvestments && totalInvestments.map(({ date, amount, profit, interest, returns, period, status, docId },i) => (
                    <Card variant="outlined" style={{marginBottom:15}}>
                            <React.Fragment>
                                <CardContent style={{padding:0}}>
                                    <Grid container spacing={0} style={{backgroundColor:'#d9dbda',fontWeight:'bolder'}}>
                                        <Grid item xs={2} sm={2} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,marginTop:0,paddingTop:15,paddingLeft:5}}>ACTION</p></Grid>
                                        <Grid item xs={10} sm={10} md={6} lg={6} spacing={0}>
                                            <Box textAlign="right" style={{padding:5}}>
                                                {status === "MAKE PAYMENT" ? (
                                                    <Button variant="contained" onClick={()=>setDialogData({visible:true,title:'MAKE PAYMENT FOR YOUR INVESTMENT',data:{amount, docId }})} style={{backgroundColor:'tomato',color:'#fff'}}  component="label"startIcon={<PaymentIcon style={{fill: "#fff"}}/>}>
                                                        <span className="fontBold">{status}</span>
                                                    </Button>
                                                ):(
                                                    <Button variant="outlined"  component="label" startIcon={
                                                        status === "COMPLETED" ? <CheckCircleOutlinedIcon style={{fill: "green"}}/> : <CachedIcon style={{fill: "#f0e136"}}/>
                                                    }>
                                                        <span className="fontBold">{status}</span>
                                                    </Button>
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>DATE</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{moment(date).format("YYYY-MM-DD HH:mm:ss")}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>AMOUNT</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{formatToCurrency(parseFloat(amount))}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>PROFIT</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{formatToCurrency(parseFloat(profit))}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>INTEREST</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{parseFloat(interest).toFixed(2)}%</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>RETURNS</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{formatToCurrency(parseFloat(returns))}</p></Grid>
                                    </Grid>
                                    <Grid container spacing={0} style={{borderBottom: '1px solid #f2f8fb'}}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12,paddingLeft:5}}>PERIOD</p></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} spacing={0}><p className="fontBold" style={{fontSize:12}}>{period}</p></Grid>
                                    </Grid>
                                </CardContent>
                            </React.Fragment>
                        </Card>     
                    ))}
                </Box>
            ):(
                <>
                    {totalInvestments ? (
                        <Table style={{backgroundColor:'#f7f7f7'}}>
                            <TableHead style={{backgroundColor:'#d9dbda'}}>
                                <TableRow>
                                    {tableHeaders.map((item,i)=> <TableCell numeric Key={i}><h3 className="fontBold">{item}</h3></TableCell> )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {totalInvestments.map(({ date, amount, profit, interest, returns, period, status, docId },i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row"><span className="fontBold">{moment(date).format("YYYY-MM-DD HH:mm:ss")}</span></TableCell>
                                        <TableCell numeric><span className="fontBold">{formatToCurrency(parseFloat(amount))}</span></TableCell>
                                        <TableCell numeric><span className="fontBold">{formatToCurrency(parseFloat(profit))}</span></TableCell>
                                        <TableCell numeric><span className="fontBold">{interest.toFixed(2)}</span></TableCell>
                                        <TableCell numeric><span className="fontBold">{formatToCurrency(parseFloat(returns))}</span></TableCell>
                                        <TableCell numeric><span className="fontBold">{period}</span></TableCell>
                                        <TableCell numeric>
                                            {status === "MAKE PAYMENT" ? (
                                                <Button variant="contained" onClick={()=>setDialogData({visible:true,title:'MAKE PAYMENT FOR YOUR INVESTMENT',data:{amount, docId }})} style={{backgroundColor:'tomato',color:'#fff'}}  component="label"startIcon={<PaymentIcon style={{fill: "#fff"}}/>}>
                                                    <span className="fontBold">{status}</span>
                                                </Button>
                                            ):(
                                                <Button variant="outlined"  component="label" startIcon={
                                                    status === "COMPLETED" ? <CheckCircleOutlinedIcon style={{fill: "green"}}/> : <CachedIcon style={{fill: "#f0e136"}}/>
                                                }>
                                                    <span className="fontBold">{status}</span>
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <h2 className="fontBold">You do not have any previous investments under your account. To start investing please click on the green icon on your bottom right corner !</h2>
                    )}
                </>
            )}
            <Fab onClick={()=>setDialogData({visible:true,title:'ADD NEW INVESTMENT'})} color="primary" aria-label="add" style={{position: 'fixed',bottom: 16,right: 16,borderRadius:'100%',color:'#fff',backgroundColor:'#69d29e'}}>
                <AddIcon />
            </Fab>
        </Typography>
    );
}