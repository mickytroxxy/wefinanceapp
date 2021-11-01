import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import UploadDocs from "./modal/UploadDocs";
import AddInvestment from "./modal/AddInvestment";
import MakePayment from "./modal/MakePayment";
import LoanTerms from "./modal/LoanTerms";
import Typography from '@mui/material/Typography';
import WithdrawFunds from "./modal/WithdrawFunds";
import SignInOutContainer from '../screens/containers/index';
import "../App.css"
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs(props) {
  const {dialogData,setDialogData} = props;
  const handleClose = () => setDialogData({visible:false});
  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={dialogData.visible}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{backgroundColor:'#ebeceb'}}><div className="fontBold" style={{fontSize:28,fontWeight:'bold'}}>{dialogData.title}</div></DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {dialogData.title === "UPLOAD DOCUMENTS" && (<UploadDocs />)}
            {dialogData.title === "ADD NEW INVESTMENT" && (<AddInvestment />)}
            {dialogData.title === "MAKE PAYMENT FOR YOUR INVESTMENT" && (<MakePayment data={dialogData.data}/>)}
            {dialogData.title === "TERMS & CONDITIONS" && (<LoanTerms data={dialogData.data}/>)}
            {dialogData.title === "WITHDRAW YOUR FUNDS" && (<WithdrawFunds/>)}
            {dialogData.title === "ACCESS YOUR ACCOUNT" && (<SignInOutContainer/>)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            CLOSE
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
