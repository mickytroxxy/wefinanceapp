import * as React from 'react';
import Box from '@mui/material/Box';
import { AppContext } from '../../context/AppContext';
import {getBankDetails,createData} from "../../context/api";
import '../../App.css';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import PublicIcon from '@mui/icons-material/Public';
export default function MakePayment(props) {
    const {data:{amount,docId}} = props;
    const { loggedUser,formatToCurrency } = React.useContext(AppContext);
    const [bankDetails, setBankDetails] = React.useState(null);
    React.useEffect(()=>{
        //getBankDetails((response) => response.length > 0 && setBankDetails(response[0]) )
        makeOnlinePayment();
    },[]);
    const makeOnlinePayment =()=>{
        const id = loggedUser.phoneNumber;
        createData("paymentInProgress",id,{amount,transactionId:docId,phoneNumber:id});
        const return_url = encodeURIComponent('https://wefinancegroup.org/PaymentSuccess');
        const cancel_url = encodeURIComponent('https://wefinancegroup.org/PaymentFailed');
        const mechantId = 15759218;
        const baseUrl = "https://www.payfast.co.za/eng/process?cmd=_paynow&receiver="+mechantId+"&item_name=Investments&item_description=paying for my loan out&amount="+amount+"&return_url="+return_url+"&cancel_url="+cancel_url+""
        window.open(baseUrl, '_blank');
    }
    return(
        <></>
    )
    /*return (
        <>
            {bankDetails && (
                <>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold">BANK NAME</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{bankDetails.bankName}</p>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold">ACCOUNT HOLDER NAME</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{bankDetails.accountHolder}</p>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold">ACCOUNT NUMBER</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{bankDetails.accountNumber}</p>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold">BRANCH CODE</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{bankDetails.branchCode}</p>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold">REFERENCE</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{docId}</p>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold">TOTAL AMOUNT</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{formatToCurrency(parseFloat(amount))}</p>
                        </Grid>
                    </Grid>
                </>
            )}
            <Box textAlign='center'>
                <Button onClick={()=>makeOnlinePayment()} variant="contained" style={{backgroundColor:'green',color:'#fff'}}  component="label"startIcon={<PublicIcon style={{fill: "#fff"}}/>}>
                    <span className="fontBold">PAY VIA PAYFAST</span>
                </Button>
            </Box>
        </>
    );*/
}