import * as React from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AtmIcon from '@mui/icons-material/Atm';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import { Doughnut } from 'react-chartjs-2';
import '../App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { AppContext } from '../context/AppContext';
import {getApprovedInvestments,getApprovedLoans,getMyWithdrawals} from "../context/api";
function MainDashboard(props) {
  const { setAccountBalance, loggedUser, currentInterests, formatToCurrency } = React.useContext(AppContext);     
  const [firstFourCards,setFirstFourCards] = React.useState([{type:'Total Loan',value:20000,icon:''},{type:'Total Investments',value:29000,icon:''},{type:'Total Payout',value:20000,icon:''},{type:'Total Profit',value:20000,icon:''}])
  const renderFirstFourCardIcon = ({type}) => {
    if(type === "Total Loan"){
      return <AccountBalanceIcon style={{fill: "#bbc9f7",fontSize:80}} />
    }else if(type === "Total Investments"){
      return <MonetizationOnOutlinedIcon style={{fill: "#bbc9f7",fontSize:80}} />
    }else if(type === "Total Withdrawals"){
      return <AtmIcon style={{fill: "#bbc9f7",fontSize:80}} />
    }else if(type === "Total Profit"){
      return <TrendingUpIcon style={{fill: "#bbc9f7",fontSize:80}} />
    }
  }
  const data = {
    labels: ['TOTAL LOAN ISSUED', 'TOTAL INVESTMENTS'],
    datasets: [
      {
        label: 'Total amount',
        data: [currentInterests.loanAmount, currentInterests.investmentAmount],
        backgroundColor: [
          '#acf7f4',
          '#bbc9f7',
        ],
        borderColor: [
          '#bbc9f7',
          '#acf7f4',
        ],
        borderWidth: 1,
      },
    ],
  };
  React.useEffect(()=>{
    loggedUser && getApprovedLoans(loggedUser.phoneNumber,(loanData)=>{
      getApprovedInvestments(loggedUser.phoneNumber,(investData)=>{
        getMyWithdrawals(loggedUser.phoneNumber,(withdrawalData)=>{
          let loanAmount = 0;
          let investAmount = 0;
          let withdrawalAmount = 0;
          let completedInv = 0;
          if(loanData.length > 0){loanAmount = loanData.reduce((total, obj) => parseFloat(obj.loanAmount) + total,0)}
          if(investData.length > 0){ 
            investAmount = investData.reduce((total, obj) => parseFloat(obj.amount) + total,0);
            completedInv = investData.filter(item => item.status !== "IN PROGRESS").reduce((total, obj) => parseFloat(obj.amount) + total,0)
          }
          if(withdrawalData.length > 0){ withdrawalAmount = withdrawalData.reduce((total, obj) => parseFloat(obj.grossAmount) + total,0)}
          const totalProfit = investData.filter(item => item.status !== "IN PROGRESS").reduce((total, obj) => parseFloat(obj.profit) + total,0);
          const balance = (totalProfit + completedInv) - withdrawalAmount;
          setFirstFourCards([{type:'Total Loan',value:loanAmount,icon:''},{type:'Total Investments',value:investAmount,icon:''},{type:'Total Withdrawals',value:withdrawalAmount,icon:''},{type:'Total Profit',value:totalProfit,icon:''}])
          setAccountBalance(balance)
        });
      });
    })
  },[loggedUser])
  return (
    <Typography>
        <Typography style={{background: "linear-gradient(to right, #bbc9f7, #c5fcb3, #acf7f4)",minHeight:250,borderRadius:10,padding:20}}>
            <Grid container spacing={2}>
            {firstFourCards.map((item,i) => {
                return(
                <Grid Key={i} item xs={12} sm={12} md={3} lg={3}>
                    <Paper elevation={0} style={{borderRadius:10,paddingTop:10,paddingBottom:10}}>
                    {renderFirstFourCardIcon(item)}
                    <h3 className="fontBold" style={{color:'#757575'}}>{formatToCurrency(item.value)}</h3>
                    <h5 className="fontBold" style={{color:'#757575'}}>{item.type}</h5>
                    </Paper>
                </Grid>
                )
            })}
            </Grid>
        </Typography>
        <Typography style={{marginTop:20}}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
                <Typography style={{backgroundColor:"#bbc9f7",padding:2,paddingLeft:30,paddingRight:30, borderRadius:10,borderBottomLeftRadius:150,borderTopRightRadius:150,marginBottom:15}}><h2 className="fontBold1" style={{color:"#fff",fontSize:15}}>CURRENT STATISTICS</h2></Typography>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card sx={{ minWidth: 275 }} style={{backgroundColor:'#bbc9f7',borderRadius:10}} elevation={0}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <CheckCircleOutlinedIcon style={{fill: "green",fontSize:100}}/>
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <div className="fontLight" style={{fontWeight:"bold"}}>Current Interest is on {currentInterests.currentInvestmentInterest.toFixed(2)}% / Week</div>
                        </Typography>
                    </CardContent>
                    <CardActions style={{backgroundColor:'#fff',borderRadius:10,padding:5,margin:5}}>
                        <Button style={{height:50}}>
                            <h5 className="fontBold1" style={{color:'#757575',fontSize:12}}>TOTAL INVESTMENTS {formatToCurrency(currentInterests.investmentAmount)}</h5>
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card sx={{ minWidth: 275 }} style={{backgroundColor:'#acf7f4',borderRadius:10}} elevation={0}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {currentInterests.canLoan ? (<CheckCircleOutlinedIcon style={{fill: "green",fontSize:100}}/>) : (<DoNotDisturbAltOutlinedIcon style={{fill: "tomato",fontSize:100}}/>)}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {currentInterests.canLoan ? (
                              <div className="fontLight" style={{fontWeight:"bold"}}>Current Interest is on {currentInterests.currentLoanInterest.toFixed(2)}% / Week</div>
                            ):(
                              <div className="fontLight" style={{fontWeight:"bold",color:"tomato"}}>Not available, check again later.</div>
                            )}
                        </Typography>
                    </CardContent>
                    <CardActions style={{backgroundColor:'#fff',borderRadius:10,padding:5,margin:5}}>
                        <Button style={{height:50}}>
                            <h5 className="fontBold1" style={{color:'#757575',fontSize:12}}>TOTAL LOAN {formatToCurrency(currentInterests.loanAmount)}</h5>
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
                </Grid>
                <p><b className="fontLight" style={{fontSize:13,fontWeight:'bold',color:'#757575'}}>The above graph indicates that the if you invest a certain amount, you will get {currentInterests.currentInvestmentInterest.toFixed(2)}% of that amount within the chosen period & the loan interest is on {currentInterests.currentLoanInterest.toFixed(2)}%</b></p>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <Doughnut data={data} options={{responsive: true,maintainAspectRatio: true}}/>
            </Grid>
            </Grid>
        </Typography>
        <Typography style={{marginTop:20}}>
            <Typography style={{backgroundColor:"#bbc9f7",padding:2,paddingLeft:30,paddingRight:30, borderRadius:10,borderBottomLeftRadius:150,borderTopRightRadius:150,marginBottom:15}}><h2 className="fontBold1" style={{color:"#fff",fontSize:15}}>INVESTMENT HISTORY</h2></Typography>
        </Typography>
    </Typography>
  );
}
export default MainDashboard;