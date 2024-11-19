import React, { useEffect } from "react";
import { Grid, Paper, Typography, Box, Button, MenuItem , TableBody, TableCell, TableHead, TableRow,  } from '@material-ui/core';
import '../../App.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { AppContext } from '../../context/AppContext';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoIcon from '@mui/icons-material/Info';
import {createData,getMyWithdrawals,setReferral} from "../../context/api";
const bankList = ["AFRICAN BANK","FNB","CAPITEC","ABSA","STANDARD BANK","NEDBANK","OLD MUTUAL"];
const accountTypes = ["CHEQUE ACCOUNT","TRANSIMITION ACCOUNT","SAVINGS ACCOUNT"];
const withdrawFromArray = ["INVESTMENTS","REFERRALS"];
export default function WithdrawFunds(props) {
    const {data:{isSuccess,amount}} = props;
    const { setDialogData, loggedUser, accountBalance, formatToCurrency, setToastData, setAccountBalance, navigate, mobileView, referralBalance, setReferralBalance} = React.useContext(AppContext); 
    const [withdrawalDetails,setWithdrawalDetails] = React.useState({bankName:'',accountNumber:'',accountHolder:'',accountType:'',branchCode:'',grossAmount:'',withdrawFrom:'INVESTMENTS'})
    const [isError,setIsError]=React.useState(false);

    React.useEffect(()=>{
        getMyWithdrawals(loggedUser.phoneNumber, (response) => response.length > 0 && setWithdrawalDetails(response.slice(-1)[0]) )
    },[loggedUser])

    const calculateWithdrawal = (amount) =>{
        if(accountBalance >= amount){
            const netAmount = parseFloat(amount) - ((3.5 / 100) * parseFloat(amount));
            const serviceFee = (3.5 / 100) * parseFloat(amount);
            setWithdrawalDetails({...withdrawalDetails,grossAmount:amount,netAmount,serviceFee});
        }else{
            setIsError("Please enter the amount which is equal to or less than "+formatToCurrency(accountBalance));
            setTimeout(() => setIsError(false) , 2000);
        }
    }
    const withdraw_btn_clicked =()=>{
        let availableAmount = accountBalance;
        if(availableAmount > 0){
            if(withdrawalDetails.withdrawFrom === "REFERRALS"){
                availableAmount = referralBalance
            }else if(withdrawalDetails.withdrawFrom === "INVESTMENTS"){
                availableAmount = accountBalance;
            }else{
                availableAmount = "NONE";
            }
            if(availableAmount === "NONE"){
                setToastData({visible:true,text:'Please select where you would like to withdraw from!',severity:'error'});
            }else{
                if(withdrawalDetails?.accountNumber !== ''){
                    if(withdrawalDetails?.bankName !== ''){
                        if(availableAmount >= withdrawalDetails.grossAmount){
                            !mobileView ? setDialogData({visible:true,title:'ENTER CONFIRMATION CODE',data:{codeIsTrue,phoneNumber:loggedUser.phoneNumber}}) : navigate("mobile",{page:'ENTER CONFIRMATION CODE',data:{codeIsTrue,phoneNumber:loggedUser.phoneNumber}});
                        }else{
                            setToastData({visible:true,text:'Please enter the amount which is equal to or less than '+formatToCurrency(availableAmount),severity:'error'});
                        }
                    }else{
                        setToastData({visible:true,text:`Please select your bank`,severity:'error'});
                    }
                }else{
                    setToastData({visible:true,text:`Please enter your account number`,severity:'error'});
                }
            }
        }else{
            setToastData({visible:true,text:`You do not have sufficient funds to withdraw at this moment`,severity:'error'});
        }
    }
    const withdraw_funds =()=>{
        if(withdrawalDetails.accountHolder!=="" && withdrawalDetails.accountNumber!=="" && withdrawalDetails.branchCode!=="" && withdrawalDetails.grossAmount!==""){
            const docId = loggedUser.phoneNumber + Date.now();
            const date = Date.now();
            if(withdrawalDetails.withdrawFrom === "INVESTMENTS"){
                const status = "PENDING";
                const withdrawalData = {...withdrawalDetails,docId,date,status,phoneNumber:loggedUser.phoneNumber};
                if(createData("withdrawals",docId,withdrawalData)){
                    setAccountBalance(accountBalance - withdrawalDetails.grossAmount);
                    setDialogData({visible:true,title:'WITHDRAW YOUR FUNDS',data:{isSuccess:true,amount:withdrawalDetails.grossAmount}})
                    setTimeout(() => setDialogData({visible:false}), 3000);
                }
            }else{
                const data = {phoneNumber:loggedUser.phoneNumber,amount:withdrawalDetails.grossAmount,status:"MINUS",docId,date,transactionBy:loggedUser.phoneNumber}
                if(createData("referrals",docId,data)){
                    setReferralBalance(referralBalance - withdrawalDetails.grossAmount);
                    setDialogData({visible:true,title:'WITHDRAW YOUR FUNDS',data:{isSuccess:true,amount:withdrawalDetails.grossAmount}})
                    setTimeout(() => setDialogData({visible:false}), 3000);
                }
            }
        }else{
            setIsError("All fields are supposed to be filled correctly!");
            setTimeout(() => setIsError(false) , 2000);
        }
    }
    const codeIsTrue = () => {
        withdraw_funds();
    };
    useEffect(() => {
        calculateWithdrawal(accountBalance)
    },[])
    return (
        <Box textAlign='center'>
            {!isSuccess ? (
                <Typography>
                    <FormControl fullWidth>
                        <div className="fontBold">Please note a <span style={{color:'green',fontSize:20}}>3.5%</span> service fee may apply</div>
                    </FormControl>
                    <FormControl fullWidth style={{marginTop:15}}>
                        <InputLabel id="demo-simple-select-label">WITHDRAW FROM</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={withdrawalDetails.withdrawFrom} label="WITHDRAW FROM">
                            {withdrawFromArray.map((item) => (
                                <MenuItem key={item} onClick={()=>setWithdrawalDetails({...withdrawalDetails,withdrawFrom:item})} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={{marginTop:20}}>
                        <InputLabel id="demo-simple-select-label">BANK NAME</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={withdrawalDetails.bankName} label="BANK NAME">
                            {bankList.map((item) => (
                                <MenuItem key={item} onClick={()=>setWithdrawalDetails({...withdrawalDetails,bankName:item})} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={{marginTop:20}}>
                        <InputLabel id="demo-simple-select-label">ACCOUNT TYPE</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={withdrawalDetails.accountType} label="ACCOUNT TYPE">
                            {accountTypes.map((item) => (
                                <MenuItem key={item} onClick={()=>setWithdrawalDetails({...withdrawalDetails,accountType:item})} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField style={{marginTop:20}} id="outlined-start-adornment" onChange={(e)=>setWithdrawalDetails({...withdrawalDetails,accountNumber:e.target.value})} value={withdrawalDetails.accountNumber} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="ENTER ACCOUNT NUMBER" variant="outlined"/>
                        <TextField style={{marginTop:20}} id="outlined-start-adornment" onChange={(e)=>setWithdrawalDetails({...withdrawalDetails,accountHolder:e.target.value})} value={withdrawalDetails.accountHolder} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="ACCOUNT HOLDER NAME" variant="outlined"/>
                        <TextField style={{marginTop:20}} id="outlined-start-adornment" onChange={(e)=>setWithdrawalDetails({...withdrawalDetails,branchCode:e.target.value})} value={withdrawalDetails.branchCode} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="ENTER BRANCH CODE" variant="outlined"/>
                        {/* <TextField style={{marginTop:20}} id="outlined-start-adornment" onChange={(e)=>calculateWithdrawal(e.target.value)} sx={{ m: 1, width: '25ch' }} value={withdrawalDetails.grossAmount} InputProps={{ startAdornment: <InputAdornment position="start">ZAR</InputAdornment>}} label="ENTER WITHDRAWAL AMOUNT" variant="outlined"/> */}
                        {isError &&(
                            <div className="fontBold"><span style={{color:'tomato',fontSize:20}}>{isError}</span></div>
                        )}
                        <div style={{marginTop:20}}><Button><CheckCircleOutlinedIcon style={{fill: "green",fontSize:100}} onClick={withdraw_btn_clicked} /></Button></div>
                    </FormControl>
                </Typography>
            ):(
                <>
                    <CheckCircleOutlinedIcon style={{fill: "green",fontSize:220}}/>
                    <h5 className="fontBold">YOUR WITHDRAWAL REQUEST OF {formatToCurrency(parseFloat(amount))} HAS BEEN LODGED SUCCESSFULLY. PLEASE NOTE THE TRANSACTION MAY TAKE UP TO 48 WORKING HOURS</h5> 
                </>
            )}
        </Box>
    );
}