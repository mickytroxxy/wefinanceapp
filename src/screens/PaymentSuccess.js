import * as React from 'react';
import Box from '@mui/material/Box';
import { AppContext } from '../context/AppContext';

export default function PaymentSuccess() {
    const { setDialogData} = React.useContext(AppContext);
    React.useEffect(()=>{ 
        setDialogData({visible:true,title:'PAYMENT STATUS',data:true})
    },[])
    return (
        <Box textAlign="center"></Box>
    );
}