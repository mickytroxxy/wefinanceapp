import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Grid, Paper, Avatar, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import SendIcon from '@mui/icons-material/Send';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AtmIcon from '@mui/icons-material/Atm';
import '../App.css';
import { AppContext } from '../context/AppContext';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MainDashboard from './Main'
import Loan from './Loan'
import Investment from './Investment'
import Withdrawal from './Withdrawal'
import Documents from './Documents'
import AddLoan from '../components/AddLoan'
import dashboard_logo from "../img/logo-2.png";
import {getReferrals} from "../context/api";
import { colors } from '../context/colors';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
          {value === index && (
          <Box>
              <Typography>{children}</Typography>
          </Box>
          )}
      </div>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  rightAlign: {
    textAlign:'left',
    alignContent:"left",
    alignItems: "flex-start"
  }
}));
function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const { loggedUser,accountBalance,formatToCurrency,signOutFn,mobileView, setToastData, setDialogData, navigate, setReferralBalance, referralBalance} = React.useContext(AppContext);
  const [value,setValue]=React.useState(0)
  const handleChange = (event, newValue) => setValue(newValue);
  const [sideBarElem,setSideBarElem] = React.useState([
    {name:'Dashboard',selected:true,index:0},
    {name:'Loans',selected:false,index:1},
    {name:'Investments',selected:false,index:2},
    {name:'Transfers',selected:false,index:3},
    {name:'Documents',selected:false,index:4},
    {name:'Withdraw',selected:false,index:5},
    {name:'Referral Info',selected:false,index:8},
    {name:'Contact Us',selected:false,index:6},
  ]);
  const renderDashboardIcons = name =>{
    if(name === "Dashboard"){
      return <DashboardIcon />
    }else if(name === "Loans"){
      return <AccountBalanceIcon />
    }else if(name === "Investments"){
      return <MonetizationOnOutlinedIcon />
    }else if(name === "Transfers"){
      return <SendIcon />
    }else if(name === "Documents"){
      return <DescriptionIcon />
    }else if(name === "Withdraw"){
      return <AtmIcon />
    }else if(name === "Contact Us"){
      return <MailIcon />
    }else if(name === "Referral Info"){
      return <LocalOfferIcon />
    }
  }
  const changeTabs = (index) =>{
    setSideBarElem(sideBarElem.map(item => item.index !== index ? {...item,selected:false} : {...item,selected:true}))
    setMobileOpen(false)
    if(index !== 3 && index!==6 && index!==8){
      handleChange("event",index)
    }else if(index === 3){
      setToastData({visible:true,text:'Your account is not yet verified for transfers',severity:'success'});
      handleChange("event",0)
    }else if(index === 6){
      !mobileView ? setDialogData({visible:true,title:'CONTACT US'}) : navigate("mobile",{page:'CONTACT US'})
    }else if(index === 8){
      setDialogData({visible:true,title:'REFERRALS INFO'})
    }
  }
  React.useEffect(() => {
    loggedUser && getReferrals(loggedUser.phoneNumber,(response)=>{
      if (response.length > 0) {
        const addedAmount = response.filter(item => item.status === "ADD").reduce((total, obj) => parseFloat(obj.amount) + total,0);
        const minusAmount = response.filter(item => item.status === "MINUS").reduce((total, obj) => parseFloat(obj.amount) + total,0);
        setReferralBalance(addedAmount - minusAmount);
      }
    });
  }, [])
  const drawer = (
    <div>
      <img src={dashboard_logo} style={{width:"90%",marginBottom:10}} alt=""/>
      <List>
        {sideBarElem.map(({name,selected,index}, i) => (
          <ListItem button key={name} onClick={() => changeTabs(index)} style={{background: selected ? colors.primary : "none",margin:5,padding:5,borderRadius:10,width:'90%'}} >
            <ListItemIcon style={{color: selected ? "#fff" : "#787b79"}}>
              {renderDashboardIcons(name)}
            </ListItemIcon>
            <ListItemText>
              <div className="fontBold" style={{color: selected ? "#fff" : "#787b79"}}>
                {name!=="Referral Info" ? name : (
                  <div>
                    <div>{name}</div>
                    <div className="fontBold1" style={{color:"green"}}>{formatToCurrency(referralBalance)}</div>
                  </div>
                )}
              </div>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box textAlign="center">
      <Button variant="outlined" onClick={signOutFn} style={{borderTopRightRadius:30,borderBottomLeftRadius:30,border: '2px solid tomato',marginTop:36,padding:20,color:"tomato"}} className="fontBold1"  component="label"startIcon={<LockOpenIcon style={{fill: "tomato",fontSize:24}}/>}>LOGOUT</Button>
      </Box>
    </div>
  );     
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        elevation={0}
        style={{borderBottom: '3px solid '+colors.orange}}
      >
        <Toolbar style={{backgroundColor:colors.primary}}>
          <IconButton
            style={{color:'#757575'}}
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap>
            <h4 className="fontBold1" style={{color:colors.white}}>Hi, {loggedUser && loggedUser.fname.toUpperCase()}</h4>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <p style={{fontWeight:'bold', border: '2px solid '+colors.orange,borderRadius:5,padding:3,paddingLeft:12,paddingRight:12,backgroundColor:'#f6fafb',color:'green'}}  className="fontBold">{formatToCurrency(accountBalance)}</p>
              {!mobileView && (
                <IconButton>
                  <AccountBalanceWalletIcon style={{fill: colors.white,fontSize:36}}/>
                </IconButton>
              )}
            </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <TabPanel value={value} index={0}><MainDashboard handleChange={handleChange} /></TabPanel>
        <TabPanel value={value} index={1}> <Loan handleChange={handleChange} /> </TabPanel>
        <TabPanel value={value} index={2}> <Investment handleChange={handleChange} /> </TabPanel>
        <TabPanel value={value} index={4}> <Documents handleChange={handleChange} /> </TabPanel>
        <TabPanel value={value} index={7}> <AddLoan handleChange={handleChange} /> </TabPanel>
        <TabPanel value={value} index={5}> <Withdrawal handleChange={handleChange} /> </TabPanel>
      </Box>
    </Box>
  );
}
export default Dashboard;