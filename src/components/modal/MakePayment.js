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
        getBankDetails((response) => response.length > 0 && setBankDetails(response[0]) )
    },[])
    return (
        <>
            {bankDetails && (
                <>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontBold">BANK NAME</h3>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontLight">{bankDetails.bankName}</h3>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontBold">ACCOUNT HOLDER NAME</h3>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontLight">{bankDetails.accountHolder}</h3>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontBold">ACCOUNT NUMBER</h3>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontLight">{bankDetails.accountNumber}</h3>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontBold">BRANCH CODE</h3>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontLight">{bankDetails.branchCode}</h3>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontBold">REFERENCE</h3>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontLight">{docId}</h3>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontBold">AMOUNT TO BE PAID</h3>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h3 className="fontLight">{formatToCurrency(parseFloat(amount))}</h3>
                        </Grid>
                    </Grid>
                </>
            )}
            <Box textAlign='center'>
                <Button variant="contained" style={{backgroundColor:'green',color:'#fff'}}  component="label"startIcon={<PublicIcon style={{fill: "#fff"}}/>}>
                    <span className="fontBold">MAKE AN ONLINE PAYMENT SECURELY</span>
                </Button>
            </Box>
        </>
    );
}