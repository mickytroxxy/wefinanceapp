import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Box
} from "@material-ui/core";
import { AppContext } from '../context/AppContext';
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import dashboard_logo from '../img/logo2.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#fff",
    paddingRight: "10px",
    paddingLeft: "20px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
    
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#757575",
    textAlign: "left",
  },
  logoIconCss: {
    alignItems:'center',
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

export default function Header() {
  const { header, logo,logoIconCss, menuButton, toolbar, drawerContainer } = useStyles();
  const { setDialogData, navigate } = React.useContext(AppContext);
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);
  const isLoanTermsAccepted = isAccepted => {setDialogData({visible:false})}
  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar} style={{padding:0,margin:0}}>
        {femmecubatorLogo}
        <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <IconButton onClick={()=>setDialogData({visible:true,title:'TERMS & CONDITIONS',data:{isLoanTermsAccepted}})}> <span style={{fontSize:14}}>TERMS & CONDITIONS</span></IconButton>
            <IconButton onClick={()=>setDialogData({visible:true,title:'CONTACT US'})}> <span style={{fontSize:14}}>CONTACT US</span></IconButton>
            <IconButton onClick={()=> !mobileView ? setDialogData({visible:true,title:'GET STARTED'}) : navigate("mobile",{page:'GET STARTED'})}>
              <span style={{fontSize:14}}>LOG IN</span>
              <ExitToAppIcon style={{fill: "green",fontSize:36}}/>
            </IconButton>
          </Box>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    return (
      <Toolbar className={toolbar}>
        <div className={toolbar}>
          <div style={{marginTop:8}}>{femmecubatorLogo}</div>
        </div>
        <Box textAlign="right">
          <IconButton onClick={()=> !mobileView ? setDialogData({visible:true,title:'GET STARTED'}) : navigate("mobile",{page:'GET STARTED'})}>
            <ExitToAppIcon style={{fill: "green",fontSize:36}}/>
          </IconButton>
        </Box>
      </Toolbar>
    );
  };

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      <img src={dashboard_logo} height="50" alt="" />
    </Typography>
  );
  return (
    <header>
      <AppBar className={header} elevation={0} style={{borderBottom: '1px solid #f2f8fb'}}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}