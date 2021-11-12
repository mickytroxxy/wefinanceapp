import * as React from 'react';
import Box from '@mui/material/Box';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom'
export default function ReferredBy() {
    const {setDialogData, mobileView, setReferredBy, navigate, loggedUser} = React.useContext(AppContext);
    const { phoneNumber } = useParams();
    React.useEffect(()=>{
        if(!loggedUser){
            setReferredBy(phoneNumber);
            if(!mobileView){
                setDialogData({visible:true,title:'GET STARTED'})
            }else{
                setDialogData({visible:false})
                navigate("mobile",{page:'GET STARTED'})
            }
        }else{
            navigate("Dashboard");
        } 
    },[phoneNumber])
    return (
        <Box textAlign="center"></Box>
    );
}