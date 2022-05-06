import React from "react";
import { Typography,Container,Toolbar, AppBar } from '@material-ui/core';
import logo_white from '../img/logo_white.png';
export default function Footer() {
    return (
        <AppBar position="static" style={{backgroundColor:'#7390ef'}}>
          <Container maxWidth="md">
            <Toolbar>
                <Typography><img src={logo_white} style={{width:35,height:35}}/></Typography>
                <Typography variant="body1" color="inherit" style={{marginLeft:50,fontWeight:'500'}}>
                    All rights reserved ©
                </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}