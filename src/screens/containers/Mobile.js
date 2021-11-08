import React from "react";
import SignInOutContainer from './index';
import AddInvestment from '../../components/modal/AddInvestment';
import WithdrawFunds from '../../components/modal/WithdrawFunds';
import { useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
export default function Mobile() {
    const location = useLocation();
    return (
        <div>
            <AppBar
                position="fixed"
                elevation={0}
                style={{borderBottom: '1px solid #f2f8fb'}}
            >
                <Toolbar style={{backgroundColor:'#fff'}}>
        
                    <Typography noWrap>
                        <h4 className="fontBold" style={{color:"#757575"}}>{location.params.page}</h4>
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{padding:10,paddingTop:100}}>
                {location.params.page === "GET STARTED" && <SignInOutContainer/>}
                {location.params.page === "ADD NEW INVESTMENT" && <AddInvestment/>}
                {location.params.page === "WITHDRAW YOUR FUNDS" && <WithdrawFunds data={location.params.data}/>}
            </div>
        </div>
    );
}