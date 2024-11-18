import * as React from 'react';
import Box from '@mui/material/Box';
import { AppContext } from '../../context/AppContext';
import {getBankDetails,createData} from "../../context/api";
import '../../App.css';
import { Grid, Button } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import PublicIcon from '@mui/icons-material/Public';
import { Typography } from '@mui/material';
export default function MakePayment(props) {
    const {data:{amount,docId}} = props;
    const { loggedUser,formatToCurrency } = React.useContext(AppContext);
    const [bankDetails, setBankDetails] = React.useState(null);
    React.useEffect(()=>{
        //getBankDetails((response) => response.length > 0 && setBankDetails(response[0]) )
        //makeOnlinePayment();
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
    return (
        <Box>
            <Typography>
                Your loan investment of ZAR {amount} has been successfully submitted. Please complete the payment to activate the investment.
            </Typography>
            <Box textAlign="center">
                <Button 
                onClick={() => makeOnlinePayment()} 
                variant="contained" 
                style={{ backgroundColor: 'green', color: '#fff' }} 
                startIcon={<PublicIcon style={{ fill: "#fff" }} />}
                >
                <span className="fontBold">Pay via PayFast</span>
                </Button>
            </Box>
        </Box>

    )
    /*return (
        <>
            {bankDetails && (
                <Box>
                    <Box textAlign="center">
                        <p className="fontBold" style={{color:"orangered"}}>Please note bank transfers & direct deposits may take up to 6 hours to reflect on your account. Kindly whatsApp us your proof of payment on +27 73 466 0029</p>
                    </Box>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold1">BANK NAME</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{bankDetails.bankName}</p>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold1">ACCOUNT HOLDER NAME</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{bankDetails.accountHolder}</p>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold1">ACCOUNT NUMBER</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{bankDetails.accountNumber}</p>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold1">BRANCH CODE</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{bankDetails.branchCode}</p>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold1">REFERENCE</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{docId}</p>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontBold1">TOTAL AMOUNT</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <p className="fontLight">{formatToCurrency(parseFloat(amount))}</p>
                        </Grid>
                    </Grid>
                </Box>
            )}
            <Box textAlign='center'>
                <Button onClick={()=>makeOnlinePayment()} variant="contained" style={{backgroundColor:'green',color:'#fff'}}  component="label"startIcon={<PublicIcon style={{fill: "#fff"}}/>}>
                    <span className="fontBold">PAY VIA PAYFAST</span>
                </Button>
            </Box>
        </>
    );*/
}