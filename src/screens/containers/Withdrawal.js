import * as React from 'react';
import PropTypes from 'prop-types';
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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import { Doughnut } from 'react-chartjs-2';
import '../App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { AppContext } from '../context/AppContext';

const drawerWidth = 240;
const data = {
  labels: ['Loans', 'Investments'],
  datasets: [
    {
      label: 'Total amount',
      data: [12, 19],
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
function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const { mobileView, loggedUser } = React.useContext(AppContext);
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Dashboard', 'Loans', 'Investments', 'SME Funding','Billing','Withdraw'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText><div className="fontBold">{text}</div></ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText><div className="fontBold">{text}</div></ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );     
  const container = window !== undefined ? () => window().document.body : undefined;
  const firstFourCards = [{type:'Total Loan',value:20000,icon:''},{type:'Total Investments',value:29000,icon:''},{type:'Total Payout',value:20000,icon:''},{type:'Total Profit',value:20000,icon:''}]
  const renderFirstFourCardIcon = ({type}) => {
    if(type === "Total Loan"){
      return <AccountBalanceIcon style={{fill: "#bbc9f7",fontSize:80}} />
    }else if(type === "Total Investments"){
      return <MonetizationOnOutlinedIcon style={{fill: "#bbc9f7",fontSize:80}} />
    }else if(type === "Total Payout"){
      return <LocalAtmOutlinedIcon style={{fill: "#bbc9f7",fontSize:80}} />
    }else if(type === "Total Profit"){
      return <TrendingUpIcon style={{fill: "#bbc9f7",fontSize:80}} />
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{backgroundColor:'#fff'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap>
            <h4 className="fontBold">HELLO {loggedUser.fname.toUpperCase() +" "+ loggedUser.lname.toUpperCase()}</h4>
          </Typography>
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
        <Typography style={{background: "linear-gradient(to right, #bbc9f7, #c5fcb3, #acf7f4)",minHeight:250,borderRadius:10,padding:20}}>
          <Grid container spacing={2}>
            {firstFourCards.map((item,i) => {
              return(
                <Grid Key={i} item xs={12} sm={12} md={3} lg={3}>
                  <Paper elevation={0} style={{borderRadius:10,paddingTop:10,paddingBottom:10}}>
                    {renderFirstFourCardIcon(item)}
                    <h3 className="fontBold">R {item.value}</h3>
                    <h5 className="fontLight">{item.type}</h5>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Typography>
        <Typography style={{marginTop:20}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <h3 className="fontBold">TODAY'S STATISTICS</h3>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Card sx={{ minWidth: 275 }} style={{backgroundColor:'#bbc9f7',borderRadius:10}} elevation={0}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <CheckCircleOutlinedIcon style={{fill: "green",fontSize:100}}/>
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary" className="fontLight">
                        Current Interest is on 50%
                      </Typography>
                    </CardContent>
                    <CardActions style={{backgroundColor:'#fff',borderRadius:10,padding:5,margin:5}}>
                      <Button size="small" className="fontBold">TOTAL INVESTMENT R 6 500 675</Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Card sx={{ minWidth: 275 }} style={{backgroundColor:'#acf7f4',borderRadius:10}} elevation={0}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <DoNotDisturbAltOutlinedIcon style={{fill: "tomato",fontSize:100}}/>
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary" className="fontLight">
                        Current Interest is on 70%
                      </Typography>
                    </CardContent>
                    <CardActions style={{backgroundColor:'#fff',borderRadius:10,padding:5,margin:5}}>
                      <Button size="small" className="fontBold">TOTAL LOAN R 3 590 675</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
              <p><b className="fontLight">The above graph indicates that the if you invest your amount, you will get 50% of that amount within the chosen period & the loan interest is on 70%</b></p>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Doughnut data={data} options={{responsive: true,maintainAspectRatio: true}}/>
            </Grid>
          </Grid>
        </Typography>
        <Typography style={{marginTop:20}}>
            <h4 className="fontBold">MY INVESTMENT HISTORY</h4>
        </Typography>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
