import React from "react";
import { Grid, Paper, Typography, Box, Button, MenuItem , TableBody, TableCell, TableHead, TableRow,  } from '@material-ui/core';
import '../../App.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { AppContext } from '../../context/AppContext';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import {createData} from "../../context/api";
export default function AddInvestment() {
    const { investmentInterests, setToastData, setDialogData, loggedUser, currentInterests, setAccountBalance, formatToCurrency, getCurrentInterests,setInvestmentInterests,getMilSecsByPeriod, accountBalance } = React.useContext(AppContext); 
    const [interestObj, setInterestObj] = React.useState(investmentInterests[0]);
    const [investmentAmount,setInvestmentAmount]=React.useState('');
    const [investmentReturns,setInvestmentReturns]=React.useState(null);
    const [investmentName,setInvestmentName]=React.useState("");
    const [fromBalance,setFromBalance] = React.useState("NO");
    const calculateReturns = (obj,amount) =>{
        const basicInterest = obj.interestArray.filter(item => item.selected === true)[0].interest;
        const {currentInvestmentInterest} = getCurrentInterests(currentInterests.loanAmount,currentInterests.investmentAmount,50,basicInterest,false);
        //alert(JSON.stringify(currentInvestmentInterest))
        const profit = (currentInvestmentInterest / 100 ) * amount;
        const returns = parseFloat(amount) + parseFloat(profit);
        setInvestmentAmount(amount);
        setInterestObj(obj);
        const dueDate = getMilSecsByPeriod(obj.period);
        setInvestmentReturns({amount,profit,interest:currentInvestmentInterest,returns,dueDate,period:obj.period})
    }
    const getNewInterest = value => {
        if(isNumeric(value) || value === ''){
            let range = 2000;
            if(value < 2000){
                range = 2000;
            }else if(value > 2000 && value < 5000){
                range = 5000;
            }else if(value > 5000){
                range = 10000;
            }
            if(value < 100001){
                const interestArray = interestObj.interestArray.map(item => item.amountBelow !== range ? {...item,selected:false} : {...item,selected:true});
                setInvestmentInterests(investmentInterests.map(item => item.period !== interestObj.period ? item : {...interestObj,interestArray}));
                calculateReturns({period:interestObj.period,interestArray},value);
            }else{
                setToastData({visible:true,text:'The investment max amount is ZAR 100 000.00',severity:'error'});
            }
            if(value < 100){
                setToastData({visible:true,text:'The investment min amount is ZAR 100.00',severity:'error'});
            }
        }
    }
    const invest_btn_clicked = () =>{
        if(investmentAmount > 99){
            let canContinue = true;
            let status = "MAKE PAYMENT";
            if(fromBalance === "YES"){
                if(accountBalance < investmentAmount){
                    canContinue = false;
                }
                status = "IN PROGRESS";
            }
            if(canContinue){
                const date = Date.now();
                const investmentNickname = investmentName === "" ? loggedUser.fname + Date.now() : investmentName;
                const docId = loggedUser.fname[0] + loggedUser.lname[0] + Math.floor(Math.random()*899999+100000);;
                const totalInvestments = {...investmentReturns,date,investmentNickname,phoneNumber:loggedUser.phoneNumber,docId,status,paidOn:date,fromBalance};
                if(createData("investments",docId,totalInvestments)){
                    if(fromBalance === "NO"){
                        setDialogData({visible:true,title:'LOAN OUT PAYMENT',data:{amount:investmentAmount, docId }})
                    }else{
                        setDialogData({visible:false});
                        setAccountBalance(accountBalance - investmentAmount);
                        setToastData({visible:true,text:'You have successfully funded your investment!',severity:'success'});
                    }
                }else{
                    setToastData({visible:true,text:'Sorry there was an error while trying to process your request',severity:'error'})
                }
            }else{
                setToastData({visible:true,text:'You do not have enough balance to fund this investment!',severity:'error'});
            }
        }else{
            setToastData({visible:true,text:'The investment min amount is R100.00',severity:'error'});
        }
    }
    React.useEffect(()=>{})
    return (
        <Box textAlign='center'>
            <Typography>
                <FormControl fullWidth>
                    {investmentReturns && (
                        <div className="fontBold">The current interest is on <span style={{color:'green',fontSize:20}}>{investmentReturns.interest.toFixed(2)}%</span> & may vary according to your investment amount & investment period. Your total return will be <span style={{color:'green',fontSize:20}}> {formatToCurrency(investmentReturns?.returns || 0)} </span></div>
                    )}
                </FormControl>
                {/* <FormControl fullWidth style={{marginTop:24}}>
                    <InputLabel id="demo-simple-select-label">INVEST FROM YOUR BALANCE</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={fromBalance} label="INVEST FROM YOUR BALANCE">
                        <MenuItem value="NO" onClick={()=>setFromBalance("NO")}>NO</MenuItem>
                        {['YES'].map((option) => (
                            <MenuItem key={option} onClick={()=>setFromBalance(option)} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}
                <FormControl fullWidth  style={{marginTop:25}}>
                    <InputLabel id="demo-simple-select-label">INVESTMENT PERIOD</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={interestObj.period} label="INVESTMENT PERIOD">
                        <MenuItem value="SELECT PERIOD">SELECT PERIOD</MenuItem>
                        {investmentInterests.map((option) => (
                            <MenuItem key={option.period} onClick={()=>calculateReturns(option,investmentAmount)} value={option.period}>
                                {option.period}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField style={{marginTop:25}} id="outlined-start-adornment" onChange={(e)=>setInvestmentName(e.target.value)} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><LocalAtmOutlinedIcon style={{fill: "#b6b8b7",fontSize:25}} /></InputAdornment>}} label="INVESTMENT NICKNAME" variant="outlined"/>
                    <TextField style={{marginTop:25}} id="outlined-start-adornment" value={investmentAmount} onChange={(e)=>{getNewInterest(e.target.value)}} placeholder={investmentAmount} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start">ZAR</InputAdornment>}} label="ENTER INVESTMENT AMOUNT" variant="outlined"/>
                    <div style={{marginTop:25}}><Button><CheckCircleOutlinedIcon style={{fill: "green",fontSize:100}} onClick={invest_btn_clicked} /></Button></div>
                </FormControl>
            </Typography>
        </Box>
    );
}
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}