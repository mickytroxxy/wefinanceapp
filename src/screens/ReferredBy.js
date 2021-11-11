import * as React from 'react';
import Box from '@mui/material/Box';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom'
export default function ReferredBy() {
    const {setDialogData, mobileView, setReferredBy, navigate} = React.useContext(AppContext);
    const { phoneNumber } = useParams();
    React.useEffect(()=>{
        setReferredBy(phoneNumber);
        !mobileView ? setDialogData({visible:true,title:'GET STARTED'}) : navigate("mobile",{page:'GET STARTED'}) 
    },[phoneNumber])
    return (
        <Box textAlign="center"></Box>
    );
}