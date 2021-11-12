import * as React from 'react';
import Box from '@mui/material/Box';
import { AppContext } from '../../context/AppContext';
import '../../App.css';
import { Button } from '@material-ui/core';
import AtmIcon from '@mui/icons-material/Atm';
export default function MakePayment(props) {
    const { loggedUser,formatToCurrency, referralBalance, mobileView, setDialogData, navigate, setToastData } = React.useContext(AppContext);
    const copyText = () =>{
        navigator.clipboard.writeText("https://wefinancegroup.org/referredBy/"+loggedUser.phoneNumber);
        setToastData({visible:true,text:'Referral link copied!',severity:'success'});
    }
    const withdraw_btn_clicked =()=>{
        if(!mobileView){
            setDialogData({visible:true,title:'WITHDRAW YOUR FUNDS',data:{isSuccess:false,amount:0}})
        }else{
            setDialogData({visible:false})
            navigate("mobile",{page:'WITHDRAW YOUR FUNDS',data:{isSuccess:false,amount:0}})
        }
    }
    return (
        <>
            <Box textAlign='center'>
                <h3 className="fontBold1">YOUR REFERRAL LINK</h3>
                <Button className="fontBold"  onClick={copyText} style={{textTransform: 'lowercase'}}>https://wefinancegroup.org/referredBy/{loggedUser.phoneNumber}</Button>
                <h1 className="fontBold1">{formatToCurrency(referralBalance)}</h1>
                <Button onClick={withdraw_btn_clicked} variant="contained" style={{backgroundColor:'green',color:'#fff'}}  component="label"startIcon={<AtmIcon style={{fill: "#fff"}}/>}>
                    <span className="fontBold">WITHDRAW</span>
                </Button>
            </Box>
        </>
    );
}