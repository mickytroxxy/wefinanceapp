import React,{useState} from 'react';
import history from '../components/history';
import CustomizedDialogs from "../components/CustomizedDialogs";
import ShowToast from "../components/Showtoast";
import {getTotalAmounts,getWithdrawals} from "./api";
export const AppContext = React.createContext();
export const AppProvider = (props) =>{
    const [loggedUser,setLoggedUser]=React.useState(null);
    const [mobileView, setMobileView] = useState(false);
    const [accountBalance,setAccountBalance]=useState(0);
    const [toastData,setToastData]=useState({visible:false,text:'Test text in here',severity:'success'})
    const [currentInterests,setCurrentInterests] = useState({loanAmount:0,investmentAmount:0,currentLoanInterest:0,currentInvestmentInterest:0,canLoan:false});
    const [investmentInterests, setInvestmentInterests] = useState([
        {period:'7 DAYS',interestArray:[{amountBelow:2000,interest:35,selected:true},{amountBelow:5000,interest:42,selected:false},{amountBelow:10000,interest:50.5,selected:false}]},
        {period:'14 DAYS',interestArray:[{amountBelow:2000,interest:42.5,selected:true},{amountBelow:5000,interest:52.7,selected:false},{amountBelow:10000,interest:66.1,selected:false}]},
        {period:'28 DAYS',interestArray:[{amountBelow:2000,interest:50,selected:true},{amountBelow:5000,interest:66.7,selected:false},{amountBelow:10000,interest:85.5,selected:false}]}
    ])
    const [loanInterests,setLoanInterests] = useState([
        {period:'7 DAYS',interestArray:[{amountBelow:2000,interest:40,selected:true},{amountBelow:5000,interest:48},{amountBelow:10000,interest:56}]},
        {period:'14 DAYS',interestArray:[{amountBelow:2000,interest:47.5,selected:true},{amountBelow:5000,interest:58},{amountBelow:10000,interest:71.5}]},
        {period:'28 DAYS',interestArray:[{amountBelow:2000,interest:52,selected:true},{amountBelow:5000,interest:72},{amountBelow:10000,interest:91.5}]},
        {period:'60 DAYS',interestArray:[{amountBelow:2000,interest:59,selected:true},{amountBelow:5000,interest:79},{amountBelow:10000,interest:94.5}]},
        {period:'90 DAYS',interestArray:[{amountBelow:2000,interest:65,selected:true},{amountBelow:5000,interest:84},{amountBelow:10000,interest:96.5}]}
    ]);
    const [dialogData,setDialogData] = React.useState({visible:false});
    React.useEffect(()=>{
        if(getLoggedUser()){
            setLoggedUser(JSON.parse(getLoggedUser()));
            navigate("Dashboard");
        }else{
            setLoggedUser(null);
            navigate("/");
        }
        const setResponsiveness = () =>  window.innerWidth < 900 ? setMobileView(true) : setMobileView(false) 
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
        getCurrentInterests(10,10,40,35,true);
        getTotalAmounts((obj)=>{
            getWithdrawals((withdrawalData)=>{
                let withdrawalAmount = 0;
                if(withdrawalData.length > 0){ withdrawalAmount = withdrawalData.reduce((total, obj) => parseFloat(obj.grossAmount) + total,0)}
                if(obj){
                    const {investmentData,loanData} = obj;
                    const totalInvestmentAmount = investmentData.reduce((total, obj) => parseFloat(obj.amount) + total,0) - withdrawalAmount;
                    const totalLoanAmount = loanData.reduce((total, obj) => parseFloat(obj.loanAmount) + total,0);
                    const loanInt = loanInterests[0].interestArray[0].interest;
                    const investInt = investmentInterests[0].interestArray[0].interest;
                    getCurrentInterests(totalLoanAmount,totalInvestmentAmount,loanInt,investInt,true);
                }
            })
        })
    },[]);
    const userHasLoggedIn = (userDetails,isRememberMe) => {
        setLoggedUser(userDetails);
        setDialogData({visible:false});
        navigate("Dashboard");
        isRememberMe && localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
    const signOutFn = async() => {
        localStorage.removeItem("userDetails");
        setLoggedUser(null);
        navigate("/");
    }
    const getLoggedUser = () => localStorage.getItem("userDetails");
    const getCurrentInterests = (loanAmount,investmentAmount,currentLoanInterest,currentInvestmentInterest,isInit) => isInit ? setCurrentInterests(calculateInterest(loanAmount,investmentAmount,currentLoanInterest,currentInvestmentInterest)) : calculateInterest(loanAmount,investmentAmount,currentLoanInterest,currentInvestmentInterest);
    
    return(
        <AppContext.Provider value={{loggedUser,setLoggedUser,setToastData,signOutFn,navigate,userHasLoggedIn,mobileView,currentInterests,formatToCurrency,investmentInterests,loanInterests,getCurrentInterests,setInvestmentInterests,setLoanInterests,getMilSecsByPeriod,setDialogData,accountBalance,setAccountBalance}}>
            {props.children}
            <CustomizedDialogs dialogData={dialogData} setDialogData={setDialogData}/>
            <ShowToast toastData={toastData} setToastData={setToastData}/>
        </AppContext.Provider>
    )
}
const navigate = location => history.push(location);
const formatToCurrency = (val) => {
    return "R " + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$& ");
};
const getMilSecsByPeriod = period => parseInt(period.split(" ")[0]) * (1000 * 60 * 60 * 24);

const calculateInterest = (loanAmount,investmentAmount,currentLoanInterest,currentInvestmentInterest) => {
    const investmentAmountIsGreator =  ((investmentAmount - loanAmount) / investmentAmount ) * 100;
    const loanAmountIsGreator =  ((loanAmount - investmentAmount) / loanAmount ) * 100;
    if(investmentAmount > loanAmount){
        let newRate = investmentAmountIsGreator, canLoan = true;
        if(investmentAmountIsGreator > 90){
            newRate = investmentAmountIsGreator / 1.5;
        }else if(investmentAmountIsGreator > 80 && investmentAmountIsGreator < 91){
            newRate = investmentAmountIsGreator / 2;
        }else if(investmentAmountIsGreator > 70 && investmentAmountIsGreator < 81){
            newRate = investmentAmountIsGreator / 2.3;
        }else if(investmentAmountIsGreator > 60 && investmentAmountIsGreator < 71){
            newRate = investmentAmountIsGreator / 2.7;
        }else if(investmentAmountIsGreator > 50 && investmentAmountIsGreator < 61){
            newRate = investmentAmountIsGreator / 3.2;
        }else if(investmentAmountIsGreator > 25 && investmentAmountIsGreator < 51){
            newRate = investmentAmountIsGreator / 3.6;
        }else{
            newRate = 0;
        }
        if(newRate >= currentInvestmentInterest ){
            //newRate = newRate - ((newRate - currentInvestmentInterest) + 3)
            newRate = Math.floor(Math.random()*3+5);
        }
        if(investmentAmountIsGreator > 1 && investmentAmountIsGreator < 3){
            canLoan = false
        }
        currentInvestmentInterest = currentInvestmentInterest - newRate;
        currentLoanInterest = currentLoanInterest - newRate;
        return {loanAmount,investmentAmount,currentLoanInterest,currentInvestmentInterest,canLoan}
    }else{
        let newRate = loanAmountIsGreator;
        if(loanAmountIsGreator > 90){
            newRate = loanAmountIsGreator / 1.5;
        }else if(loanAmountIsGreator > 80 && loanAmountIsGreator < 91){
            newRate = loanAmountIsGreator / 2;
        }else if(loanAmountIsGreator > 70 && loanAmountIsGreator < 81){
            newRate = loanAmountIsGreator / 2.3;
        }else if(loanAmountIsGreator > 60 && loanAmountIsGreator < 71){
            newRate = loanAmountIsGreator / 2.7;
        }else if(loanAmountIsGreator > 50 && loanAmountIsGreator < 61){
            newRate = loanAmountIsGreator / 3.2;
        }else if(loanAmountIsGreator > 40 && loanAmountIsGreator < 51){
            newRate = loanAmountIsGreator / 3.6;
        }else{
            newRate = loanAmountIsGreator / 3.9;
        }
        currentInvestmentInterest = currentInvestmentInterest + newRate;
        currentLoanInterest = currentLoanInterest + newRate;
        return {loanAmount,investmentAmount,currentLoanInterest,currentInvestmentInterest,canLoan:false}
    }
}