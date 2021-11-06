import React from "react";
import '../App.css';
import { Grid, Box, Button, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { AppContext } from '../context/AppContext';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoIcon from '@mui/icons-material/Info';
import {createData} from "../context/api";
export default function AddLoan() {
    const { loanInterests, setLoanInterests, setDialogData, loggedUser, currentInterests, formatToCurrency, getCurrentInterests,getMilSecsByPeriod } = React.useContext(AppContext);
    const [loanDetails,setLoanDetails]=React.useState({fname:'',lname:'',phoneNumber:'',idNo:'',companyNumber:'',maritalStatus:'',physicalAddress:'',companyName:'',companyAddress:'',gender:'',employmentStatus:'EMPLOYED',position:'',netSalary:'',totalExpenses:1000,loanAmount:1000,debtReview:'NO',loanPeriod:'7 DAYS'})
    const [interestObj, setInterestObj] = React.useState(loanInterests[0]);
    const [loanRepayments,setLoanRepayments]=React.useState(null);
    const[loanSubmitted,setLoanSubmitted]=React.useState(false);
    const [fieldError,setFieldError] = React.useState(false);
    React.useEffect(() => {
        setLoanDetails({...setLoanDetails,fname:loggedUser.fname,lname:loggedUser.lname,phoneNumber:loggedUser.phoneNumber,loanAmount:1000,idNo:'',companyNumber:'',maritalStatus:'',physicalAddress:'',companyName:'',companyAddress:'',gender:'',employmentStatus:'EMPLOYED',position:'',netSalary:'',totalExpenses:1000,debtReview:'NO',loanPeriod:'1 WEEK'})
    },[])
    const calculateReturns = (obj,amount) =>{
        const basicInterest = obj.interestArray.filter(item => item.selected === true)[0].interest;
        const {currentLoanInterest} = getCurrentInterests(currentInterests.loanAmount,currentInterests.investmentAmount,basicInterest,0,false);
        const interestAmount = (currentLoanInterest / 100 ) * amount;
        const totalRepayments = parseFloat(amount) + parseFloat(interestAmount);
        setLoanDetails({...loanDetails,loanAmount:amount})
        setInterestObj(obj);
        const dueDate = getMilSecsByPeriod(obj.period);
        setLoanRepayments({amount,interestAmount,interest:currentLoanInterest,totalRepayments,dueDate,period:obj.period});
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
        setLoanInterests(loanInterests.map(item => item.period !== interestObj.period ? item : {...interestObj,interestArray}));
        calculateReturns({period:interestObj.period,interestArray},value)
    }
    const isLoanTermsAccepted = isAccepted =>{
        if(isAccepted){
            setDialogData({visible:false})
            const docId = loggedUser.phoneNumber + Date.now();
            const loanData = {...loanDetails,docId,phoneNumber:loggedUser.phoneNumber,date:Date.now(),status:"PENDING",interestAmount:loanRepayments.interestAmount,loanInterest:loanRepayments.interest,totalRepayments:loanRepayments.totalRepayments}
            createData("loans",docId,loanData) && setLoanSubmitted(true);
        }
    }
    const goToTerms =()=>{
        if(loanDetails.idNo.length === 13 && loanDetails.physicalAddress!=="" && loanDetails.companyName!=="" && loanDetails.totalExpenses!=="" && loanDetails.loanAmount!=="" && loanDetails.netSalary!=="" && loanDetails.gender!=="" && loanDetails.employmentStatus!==""){
            setDialogData({visible:true,title:'TERMS & CONDITIONS',data:{isLoanTermsAccepted}})
        }else{
            setFieldError(true);
            setTimeout(() => setFieldError(false) , 3000);
        }
    }
    if(!loanSubmitted){
        return (
            <div>
                <h3 className="fontBold">APPLY FOR A LOAN</h3>
                {!loanRepayments ? (
                    <p className="fontBold" style={{color:'tomato'}}>* NOTE: For you to qualify you must be a RSA citizen who is not blacklisted. For us to be able to review your application you must have submitted your documents like your ID, proof of residence not old than 3 months, 3 months latest payslip & 3 months bank statement</p>
                ):(
                    <p className="fontBold">Your loan amount is <span style={{fontWeight:'bold',color:'green'}}>{formatToCurrency(parseFloat(loanDetails.loanAmount))}</span>, your interest is <span style={{fontWeight:'bold',color:'green'}}>{parseFloat(loanRepayments.interest)}%</span>. You will have to repay <span style={{fontWeight:'bold',color:'green'}}>{formatToCurrency(parseFloat(loanRepayments.totalRepayments))}</span> with a period of {loanRepayments.period}</p>
                )}
                {fieldError && <p className="fontBold" style={{color:'tomato',fontWeight:'bold'}}>All fields are required to be filled properly. Please check your fields once!</p>}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <FormControl fullWidth>
                            <TextField id="outlined-start-adornment" value={loanDetails.fname} onChange={(e)=>setLoanDetails({...loanDetails,fname:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="FIRST NAME" variant="outlined"/>
                            <TextField style={{marginTop:20}} id="outlined-start-adornment" value={loanDetails.lname} onChange={(e)=>setLoanDetails({...loanDetails,lname:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="YOUR SURNAME" variant="outlined"/>
                            <TextField style={{marginTop:20}} id="outlined-start-adornment" value={loanDetails.idNo} onChange={(e)=>setLoanDetails({...loanDetails,idNo:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="ID NUMBER" variant="outlined"/>
                            <TextField style={{marginTop:20}} id="outlined-start-adornment" value={loanDetails.phoneNumber} onChange={(e)=>setLoanDetails({...loanDetails,phoneNumber:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="PHONE NUMBER" variant="outlined"/>
                            <TextField style={{marginTop:20}} id="outlined-start-adornment" value={loanDetails.physicalAddress} onChange={(e)=>setLoanDetails({...loanDetails,physicalAddress:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="PHYSICAL ADDRESS" variant="outlined"/>
                        </FormControl>
                        <FormControl fullWidth style={{marginTop:20}}>
                            <InputLabel id="demo-simple-select-label">GENDER</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={loanDetails.gender} label="GENDER">
                                {["FEMALE","MALE"].map((item) => (
                                    <MenuItem key={item} onClick={() => setLoanDetails({...loanDetails,gender:item})} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">MARITAL STATUS</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={loanDetails.maritalStatus} label="MARITAL STATUS">
                                {["MARRIED","SINGLE","DIVORCED","SEPARATED","COMPLICATED"].map((item) => (
                                    <MenuItem key={item} onClick={() => setLoanDetails({...loanDetails,maritalStatus:item})} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth style={{marginTop:20}}>
                            <InputLabel id="demo-simple-select-label">EMPLOYMENT STATUS</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={loanDetails.employmentStatus} label="EMPLOYMENT STATUS">
                                {["EMPLOYED","SELF EMPLOYED","UNEMPLOYED"].map((item) => (
                                    <MenuItem key={item} onClick={() => setLoanDetails({...loanDetails,employmentStatus:item})} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField style={{marginTop:20}} id="outlined-start-adornment" value={loanDetails.companyName} onChange={(e)=>setLoanDetails({...loanDetails,companyName:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="COMPANY NAME" variant="outlined"/>
                            <TextField style={{marginTop:20}} id="outlined-start-adornment" value={loanDetails.companyNumber} onChange={(e)=>setLoanDetails({...loanDetails,companyNumber:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="COMPANY NUMBER" variant="outlined"/>
                            <TextField style={{marginTop:20}} id="outlined-start-adornment" value={loanDetails.position} onChange={(e)=>setLoanDetails({...loanDetails,position:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="YOUR POSITION" variant="outlined"/>
                            <TextField style={{marginTop:20}} id="outlined-start-adornment" value={loanDetails.companyAddress} onChange={(e)=>setLoanDetails({...loanDetails,companyAddress:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="COMPANY ADDRESS" variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">ARE YOU UNDER DEBT REVIEW ?</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={loanDetails.debtReview} label="ARE YOU UNDER DEBT REVIEW ?">
                                {["NO","YES"].map((item) => (
                                    <MenuItem key={item} onClick={() => setLoanDetails({...loanDetails,debtReview:item})} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField style={{marginTop:20}} id="outlined-start-adornment" value={loanDetails.netSalary} onChange={(e)=>setLoanDetails({...loanDetails,netSalary:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="NET SALARY" variant="outlined"/>
                            <TextField style={{marginTop:20}} id="outlined-start-adornment" value={loanDetails.totalExpenses} onChange={(e)=>setLoanDetails({...loanDetails,totalExpenses:e.target.value})} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="TOTAL EXPENSES" variant="outlined"/>
                            <TextField style={{marginTop:20}} id="outlined-start-adornment" value={loanDetails.loanAmount} onChange={(e)=>getNewInterest(e.target.value)} sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start"><InfoIcon style={{fill: "#ade8f4",fontSize:20}} /></InputAdornment>}} label="LOAN AMOUNT" placeholder="From R 1 000.00 - R 15 000.00" variant="outlined"/>
                        </FormControl>
                        <FormControl fullWidth style={{marginTop:20}}>
                            <InputLabel id="demo-simple-select-label">LOAN PERIOD</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={interestObj.period} label="LOAN PERIOD">
                                {loanInterests.map((option) => (
                                    <MenuItem key={option.period} onClick={()=>calculateReturns(option,loanDetails.loanAmount)} value={option.period}>
                                        {option.period}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={()=>goToTerms()} style={{backgroundColor:'green',color:'#fff',marginTop:25,padding:15}}  component="label"startIcon={<CheckCircleOutlinedIcon style={{fill: "#fff"}}/>}>
                            <span className="fontBold">APPLY NOW</span>
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }else{
        return(
            <Box textAlign='center'>
                <CheckCircleOutlinedIcon style={{fill: "green",fontSize:220}}/>
                <h5 className="fontBold">YOUR LOAN APPLICATION HAS BEEN SUBMITTED. OUR AGENTS WILL CALL YOU WITHIN 24 HOURS TO FINALIZE EVERYTHING. <span style={{color:"tomato"}}>PLEASE MAKE SURE YOU HAVE SUBMITTED ALL THE LATEST NECESSARY DOCUMENTS FOR YOUR APPLICATION TO BE CONSIDERED</span>. THANK YOU!</h5>
            </Box>
        )
    }
}