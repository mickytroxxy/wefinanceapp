import React from "react";
import { Grid, Paper, Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow,  } from '@material-ui/core';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { AppContext } from '../context/AppContext';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import {createData} from "../context/api";
export default function NewInvestment() {
    const { investmentInterests, loggedUser, currentInterests, formatToCurrency, getCurrentInterests,setInvestmentInterests,getMilSecsByPeriod } = React.useContext(AppContext); 
    const [interestObj, setInterestObj] = React.useState(investmentInterests[0]);
    const [investmentAmount,setInvestmentAmount]=React.useState(1000);
    const [investmentReturns,setInvestmentReturns]=React.useState(null);
    const [investmentName,setInvestmentName]=React.useState("");

    const calculateReturns = (obj,amount) =>{
        const basicInterest = obj.interestArray.filter(item => item.selected === true)[0].interest;
        const {currentInvestmentInterest} = getCurrentInterests(currentInterests.loanAmount,currentInterests.investmentAmount,50,basicInterest,false);
        const profit = (currentInvestmentInterest / 100 ) * amount;
        const returns = parseFloat(amount) + parseFloat(profit);
        setInvestmentAmount(amount);
        setInterestObj(obj);
        const dueDate = getMilSecsByPeriod(obj.period);
        setInvestmentReturns({amount,profit,interest:currentInvestmentInterest,returns,dueDate,period:obj.period})
    }
    const getNewInterest = value => {
        let range = 2000;
        if(value < 2000){
            range = 2000;
        }else if(value > 2000 && value < 5000){
            range = 5000;
        }else if(value > 5000){
            range = 10000;
        }
        const interestArray = interestObj.interestArray.map(item => item.amountBelow !== range ? {...item,selected:false} : {...item,selected:true});
        setInvestmentInterests(investmentInterests.map(item => item.period !== interestObj.period ? item : {...interestObj,interestArray}));
        calculateReturns({period:interestObj.period,interestArray},value)
    }
    const invest_btn_clicked = () =>{
        const date = Date.now();
        const investmentNickname = investmentName === "" ? loggedUser.fname + Date.now() : investmentName;
        const docId = loggedUser.phoneNumber + Date.now();
        const totalInvestments = {...investmentReturns,date,investmentNickname,phoneNumber:loggedUser.phoneNumber,docId,status:'PENDING'};
        if(createData("investments",docId,totalInvestments)){
            alert("Done")
        }else{
            alert("Failed")
        }
    }
    React.useEffect(()=>{})
    return (
        <Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={2} lg={1}></Grid>
                <Grid item xs={12} sm={12} md={10} lg={10} style={{backgroundColor:'#f8faf9',borderRadius:10}}>
                    <div><h2 className="fontBold">ADD NEW INVESTMENT</h2></div>
                    <FormControl component="fieldset">
                        <div style={{borderColor:'#ccc',borderWidth:1}}>
                            <FormLabel component="legend">
                                <div className="fontBold" style={{fontSize:16}}>INVESTMENT PERIOD</div>
                            </FormLabel>
                            <RadioGroup row aria-label="INVESTMENT PERIOD" name="row-radio-buttons-group">
                                {investmentInterests.map((item,i) => (
                                    <FormControlLabel Key={i} value={item.period} control={<Radio />} label={item.period} onClick={()=>calculateReturns(item,investmentAmount)} />
                                ))}
                            </RadioGroup>
                        </div>
                    </FormControl>
                    <div style={{margin:30}}><TextField id="outlined-start-adornment" onKeyUp={(e)=>setInvestmentName(e.target.value)} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><LocalAtmOutlinedIcon style={{fill: "#b6b8b7",fontSize:25}} /></InputAdornment>}} label="Investment nickname" variant="outlined" style={{width:300}}/></div>
                    <div style={{margin:30}}><TextField id="outlined-start-adornment" onKeyUp={(e)=>{getNewInterest(e.target.value)}} placeholder={investmentAmount} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start">ZAR</InputAdornment>}} label="Enter Investment amount" variant="outlined" style={{width:300}}/></div>
                    <div style={{margin:30}}><Button><CheckCircleOutlinedIcon style={{fill: "green",fontSize:100}} onClick={invest_btn_clicked} /></Button></div>
                    {investmentReturns && (
                        <p className="fontBold">The current interest is on <span style={{color:'green',fontSize:20}}>{investmentReturns.interest.toFixed(2)}%</span> & may vary according to your investment amount & investment period. Your total return will be <span style={{color:'green',fontSize:20}}> {formatToCurrency(investmentReturns.returns)} </span></p>
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={1}></Grid>
            </Grid>
        </Typography>
    );
}