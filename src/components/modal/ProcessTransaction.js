import React from "react";
import { Grid, Paper, Typography, Box, Button, MenuItem , TableBody, TableCell, TableHead, TableRow,  } from '@material-ui/core';
import '../../App.css';
import { AppContext } from '../../context/AppContext';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import {getTransactionInProgress,updateTransaction,deleteData} from "../../context/api";
import CircularProgress from '@mui/material/CircularProgress';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import {createData} from "../../context/api";
export default function ProcessTransaction(props) {
    const {isSuccess} = props;
    const { loggedUser } = React.useContext(AppContext);
    const [paymentStatus,setPaymentStatus] = React.useState("LOADING");
    React.useEffect(()=>{
        if(loggedUser){
            getTransactionInProgress(loggedUser.phoneNumber,(response)=>{
                if(response.length > 0){
                    if(isSuccess){
                        if(updateTransaction("investments", response[0].transactionId, "IN PROGRESS")){
                            setPaymentStatus("SUCCESS");
                            deleteData("paymentInProgress",loggedUser.phoneNumber);
                            if(loggedUser.referredBy !==null && loggedUser.referredBy!==""){
                                const docId = loggedUser.phoneNumber + Date.now();
                                const date = Date.now();
                                const amount = 0.125 * parseFloat(response[0].amount);
                                const data = {phoneNumber:loggedUser.refferedBy,amount,status:"ADD",docId,date,transactionBy:loggedUser.phoneNumber}
                                createData("referrals",docId,data);
                            }
                        }else{
                            setPaymentStatus("ERROR");
                            deleteData("paymentInProgress",loggedUser.phoneNumber);
                        }
                    }else{
                        setPaymentStatus("FAILED");
                        deleteData("paymentInProgress",loggedUser.phoneNumber);
                    }
                }else{
                    setPaymentStatus("ERROR");
                    deleteData("paymentInProgress",loggedUser.phoneNumber);
                }
            })
        }
    },[loggedUser])
    if(paymentStatus === "LOADING"){
        return(
            <Box textAlign='center'>
                <CircularProgress size={50} style={{margin:20,color:"#ccc"}}></CircularProgress>
            </Box>
        )
    }else if(paymentStatus === "SUCCESS"){
        return (
            <Box textAlign='center'>
                <>
                    <CheckCircleOutlinedIcon style={{fill: "green",fontSize:220}}/>
                    <h5 className="fontBold">YOUR PAYMENT HAS BEEN SUCCESSFULLY RECEIVED!</h5> 
                </>
            </Box>
        );
    }else if(paymentStatus === "ERROR"){
        return (
            <Box textAlign='center'>
                <>
                    <DoNotDisturbAltOutlinedIcon style={{fill: "tomato",fontSize:220}}/>
                    <h5 className="fontBold">WE COULDN'T PROCESS YOUR PAYMENT PLEASE CONTACT US TO FIX THIS</h5> 
                </>
            </Box>
        );
    }else if(paymentStatus === "FAILED"){
        return (
            <Box textAlign='center'>
                <>
                    <DoNotDisturbAltOutlinedIcon style={{fill: "tomato",fontSize:220}}/>
                    <h5 className="fontBold">YOUR PAYMENT METHOD WAS DECLINED OR YOU CANCELLED THE TRANSACTION</h5> 
                </>
            </Box>
        );
    }
}