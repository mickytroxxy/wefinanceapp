import * as React from 'react';
import Box from '@mui/material/Box';
import { AppContext } from '../context/AppContext';

export default function PaymentFailed() {
    const { setDialogData} = React.useContext(AppContext);
    React.useEffect(()=>{ 
        setDialogData({visible:true,title:'PAYMENT STATUS',data:false})
    },[])
    return (
        <Box textAlign="center"></Box>
    );
}