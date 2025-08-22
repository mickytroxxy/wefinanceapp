import React from "react";
import { Typography, Container, Toolbar, AppBar, Button, Box } from '@material-ui/core';
import { AppContext } from '../context/AppContext';
import logo_white from '../img/logo_white.png';

export default function Footer() {
    const { navigate, setDialogData, mobileView } = React.useContext(AppContext);
    return (
        <AppBar position="static" style={{backgroundColor:'#7390ef'}}>
          <Container maxWidth="md">
            <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                <Box display="flex" alignItems="center">
                  <Typography><img src={logo_white} style={{width:35,height:35}} alt="logo"/></Typography>
                  <Typography variant="body1" color="inherit" style={{marginLeft:12,fontWeight:'500'}}>
                      All rights reserved ©
                  </Typography>
                </Box>

                <Box>
                  <Button 
                    color="inherit"
                    onClick={() => !mobileView ? navigate("Privacy") : navigate("mobile", {page: 'Privacy'})}
                    style={{marginRight: 8}}
                  >
                    Privacy Policy
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => !mobileView ? setDialogData({visible:true,title:'CONTACT US'}) : navigate("mobile",{page:'CONTACT US'})}
                  >
                    Contact Us
                  </Button>
                </Box>
            </Toolbar>
          </Container>
        </AppBar>
    )
}