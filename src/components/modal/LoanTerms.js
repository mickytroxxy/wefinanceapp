import * as React from 'react';
import Box from '@mui/material/Box';
import '../../App.css';
import { Button } from '@material-ui/core';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { AppContext } from '../../context/AppContext';
export default function LoanTerms(props) {
    const {data:{isLoanTermsAccepted}} = props;
    const { setDialogData } = React.useContext(AppContext); 
    React.useEffect(()=>{},[])
    const isLoanAccepted =(status)=>{
        isLoanTermsAccepted(status);
        setDialogData({visible:false})
    }
    return (
        <Box textAlign='center'>
            <div className="fontBold">
                Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email 
                Investor documentation related to the predecessor African Bank, is available on request by sending an email
                Investor documentation related to the predecessor African Bank, is available on request by sending an email
                Investor documentation related to the predecessor African Bank, is available on request by sending an email
                Investor documentation related to the predecessor African Bank, is available on request by sending an email
                Investor documentation related to the predecessor African Bank, is available on request by sending an email
                Investor documentation related to the predecessor African Bank, is available on request by sending an email
                Investor documentation related to the predecessor African Bank, is available on request by sending an email
                Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email
                Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an emailInvestor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an emailInvestor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an emailv Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email Investor documentation related to the predecessor African Bank, is available on request by sending an email
            </div>
            <div>
                <Button variant="contained" onClick={()=>isLoanAccepted(false)} style={{backgroundColor:'tomato',color:'#fff',margin:5}}  component="label"startIcon={<CancelIcon style={{fill: "#fff"}}/>}>
                    <span className="fontBold">I DON'T AGREE</span>
                </Button>
                <Button variant="contained" onClick={()=>isLoanAccepted(true)} style={{backgroundColor:'green',color:'#fff',margin:5}}  component="label"startIcon={<CheckCircleOutlinedIcon style={{fill: "#fff"}}/>}>
                    <span className="fontBold">I AGREE</span>
                </Button>
            </div>
        </Box>
    );
}