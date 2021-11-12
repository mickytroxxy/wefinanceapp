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
import Container from '@mui/material/Container';
import {getInvestments} from "../context/api";
import { makeStyles  } from '@material-ui/core';
import { AppContext } from '../context/AppContext';
import PaymentIcon from '@mui/icons-material/Payment';
import CachedIcon from '@mui/icons-material/Cached';
import {getApprovedInvestments,getApprovedLoans,getMyWithdrawals} from "../context/api";
function MainDashboard(props) {
  const classes = useStyles();
  const { setAccountBalance, loggedUser, currentInterests, formatToCurrency, mobileView, setDialogData } = React.useContext(AppContext);     
  const [firstFourCards,setFirstFourCards] = React.useState([{type:'Total Loan',value:0,icon:''},{type:'Total Investments',value:0,icon:''},{type:'Total Payout',value:0,icon:''},{type:'Total Profit',value:0,icon:''}])
  const [investmentData,setInvestmentData] = React.useState(null);
  const [readMore,setReadMore]=React.useState(false);
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
    labels: ['LOAN INTEREST', 'INVESTMENT INTEREST'],
    datasets: [
      {
        label: 'Total amount',
        data: [currentInterests.currentLoanInterest, currentInterests.currentInvestmentInterest],
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
          setAccountBalance(balance);
        });
      });
      getInvestments(loggedUser.phoneNumber, (response) => response.length > 0 && setInvestmentData(response) )
    })
  },[loggedUser])
  return (
    <Typography>
        <Typography style={{background: "linear-gradient(to right, #bbc9f7, #c5fcb3, #acf7f4)",minHeight:250,borderRadius:10,padding:20}}>
            <Grid container spacing={2}>
            {firstFourCards.map((item,i) => {
                return(
                <Grid Key={i} item xs={12} sm={12} md={3} lg={3}>
                    <Paper elevation={15} style={{borderRadius:10,paddingTop:10,paddingBottom:10}}>
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
                            <div className="fontBold1" style={{color:"#757575",fontSize:14}}>Interest is on {currentInterests.currentInvestmentInterest.toFixed(2)}% per Week</div>
                        </Typography>
                    </CardContent>
                    <CardActions style={{backgroundColor:'#fff',borderRadius:10,padding:5,margin:5}}>
                        <Button style={{height:50}}>
                            <h5 className="fontBold1" style={{color:'#757575',fontSize:12}}>CURRENT INVESTMENT STATUS</h5>
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
                              <div className="fontBold1" style={{color:"#757575",fontSize:14}}>Interest is on {currentInterests.currentLoanInterest.toFixed(2)}% per Week</div>
                            ):(
                              <div className="fontBold1" style={{color:"#757575"}}>Not available, check again later.</div>
                            )}
                        </Typography>
                    </CardContent>
                    <CardActions style={{backgroundColor:'#fff',borderRadius:10,padding:5,margin:5}}>
                        <Button style={{height:50}}>
                            <h5 className="fontBold1" style={{color:'#757575',fontSize:12}}>CURRENT LOAN STATUS</h5>
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
                </Grid>
                <p className="fontBold1" style={{fontSize:13,color:'#757575'}}>
                    Please note, current interests may change according to the amount of loan issued vs the amount of investments, your investment amount and the selected investment period
                </p>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <Doughnut data={data} options={{responsive: true,maintainAspectRatio: true}}/>
            </Grid>
            </Grid>
        </Typography>
        <Typography style={{marginTop:20}}>
            <Typography style={{backgroundColor:"#bbc9f7",padding:2,paddingLeft:30,paddingRight:30, borderRadius:10,borderBottomLeftRadius:150,borderTopRightRadius:150,marginBottom:15}}><h2 className="fontBold1" style={{color:"#fff",fontSize:15}}>INVESTMENT HISTORY</h2></Typography>
            <Typography>
              <div>
                  <Grid container spacing={1}>
                      {investmentData && investmentData.map((item,i) => {
                          let maxLength = 4;
                          readMore ? maxLength = investmentData.length : mobileView ? maxLength = 4 : maxLength = 4;
                          if(i < maxLength){
                              return(
                                  <Grid item key={i} xs={12} md={3}>
                                      <Card className={classes.card} elevation={0} style={{paddingBottom:10,borderRadius:10,backgroundColor:"#f7f7fb",border: '1px solid #bbc9f7'}}>
                                          <div style={{backgroundColor:"#bbc9f7"}}><h3 className="fontBold1" style={{fontSize:14,color:'#fff'}}>{formatToCurrency(parseFloat(item.amount))}</h3></div>
                                          <CardContent className={classes.cardContent}>
                                              <Typography gutterBottom variant="h5" component="h2">
                                                <span className="fontBold1" style={{fontSize:14,color:'#757575'}}>RETURNS</span>
                                              </Typography>
                                              <Typography>
                                                <span className="fontBold">{formatToCurrency(parseFloat(item.returns))}</span>
                                              </Typography>
                                              <Typography gutterBottom variant="h5" component="h2">
                                                <span className="fontBold1" style={{fontSize:14,color:'#757575'}}>PROFIT</span>
                                              </Typography>
                                              <Typography>
                                                <span className="fontBold">{formatToCurrency(parseFloat(item.profit))}</span>
                                              </Typography>
                                          </CardContent>
                                          <div>
                                            {item.status === "MAKE PAYMENT" ? (
                                                  <Button variant="contained" onClick={()=>setDialogData({visible:true,title:'MAKE PAYMENT FOR YOUR INVESTMENT',data:{amount:item.amount, docId:item.docId }})} style={{backgroundColor:'tomato',color:'#fff'}}  component="label"startIcon={<PaymentIcon style={{fill: "#fff"}}/>}>
                                                      <span className="fontBold">{item.status}</span>
                                                  </Button>
                                              ):(
                                                  <Button variant="outlined"  component="label" startIcon={
                                                      item.status === "COMPLETED" ? <CheckCircleOutlinedIcon style={{fill: "green"}}/> : <CachedIcon style={{fill: "#f0e136"}}/>
                                                  }>
                                                      <span className="fontBold">{item.status}</span>
                                                  </Button>
                                              )}
                                          </div>
                                      </Card>
                                  </Grid>
                              )
                          } 
                      })}
                  </Grid>
                <center><Button onClick={()=>setReadMore(!readMore)} variant="outlined" className={classes.button} style={{borderRadius:20}}>{readMore?(<span>Read Less</span>):(<span>Read More</span>)}</Button></center>
              </div>
          </Typography>
        </Typography>
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
  },
  root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden'
  },
  gridList: {
      flexWrap: 'nowrap'
  },
  icon: {
      marginRight: theme.spacing(2),
  },
  heroButtons: {
      marginTop: theme.spacing(4),
  },
  cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
  },
  card: {
      display: 'flex',
      flexDirection: 'column',
  },
      cardMedia: {
      paddingTop: '56.25%', // 16:9
  },
      cardContent: {
      flexGrow: 1,
  },
  button: {
      marginTop:15,borderColor:'#3488a7',color:'#3488a7',outline:'none',
      '&:hover': {
        backgroundColor: '#3488a7',
        color: '#fff',
      }
  },
  footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
  },
}));
export default MainDashboard;