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
import dashboard_logo from "../img/logo2.png";
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
  const { loggedUser,accountBalance,formatToCurrency,signOutFn,mobileView, setToastData, setDialogData} = React.useContext(AppContext);
  const [value,setValue]=React.useState(0)
  const handleChange = (event, newValue) => setValue(newValue);
  const [sideBarElem,setSideBarElem] = React.useState([
    {name:'Dashboard',selected:true,index:0},
    {name:'Loans',selected:false,index:1},
    {name:'Investments',selected:false,index:2},
    {name:'Transfers',selected:false,index:3},
    {name:'Documents',selected:false,index:4},
    {name:'Withdraw',selected:false,index:5},
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
    }
  }
  const changeTabs = (index) =>{
    if(index !== 3 && index!==6){
      setMobileOpen(false)
      handleChange("event",index)
      setSideBarElem(sideBarElem.map(item => item.index !== index ? {...item,selected:false} : {...item,selected:true}))
    }else if(index === 3){
      setToastData({visible:true,text:'Your account is not yet verified for transfers',severity:'error'})
    }else if(index === 6){
      setDialogData({visible:true,title:'CONTACT US'})
    }
  }
  const drawer = (
    <div>
      <img src={dashboard_logo} style={{width:"96%",marginBottom:10}} alt=""/>
      <List>
        {sideBarElem.map(({name,selected,index}, i) => (
          <ListItem button key={name} onClick={() => changeTabs(index)} style={{background: selected ? "#bbc9f7" : "none",margin:5,padding:5,borderRadius:10,width:'90%'}} >
            <ListItemIcon style={{color: selected ? "#fff" : "#787b79"}}>
              {renderDashboardIcons(name)}
            </ListItemIcon>
            <ListItemText><div className="fontBold" style={{color: selected ? "#fff" : "#787b79"}}>{name}</div></ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['SIGN OUT'].map((text, index) => (
          <ListItem button key={text} style={{margin:5,paddingTop:15,paddingBottom:15,paddingLeft:10,borderRadius:10,width:'90%',border: '2px solid tomato',marginTop:100}} onClick={signOutFn}>
            <ListItemIcon style={{color: "tomato",fontSize:50}}>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText><div className="fontBold" style={{color: "tomato",fontWeight:'bold'}}>{text}</div></ListItemText>
          </ListItem>
        ))}
      </List>
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
        style={{borderBottom: '1px solid #f2f8fb'}}
      >
        <Toolbar style={{backgroundColor:'#fff'}}>
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
            <h4 className="fontBold1" style={{color:"#757575"}}>Hi, {loggedUser.fname.toUpperCase()}</h4>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <p style={{fontWeight:'bold', border: '1px solid #bbc9f7',borderRadius:7,padding:3,paddingLeft:12,paddingRight:12,backgroundColor:'#f6fafb',color:'tomato'}}  className="fontBold">{formatToCurrency(accountBalance)}</p>
              {!mobileView && (
                <IconButton>
                  <AccountBalanceWalletIcon style={{fill: "#bbc9f7",fontSize:36}}/>
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