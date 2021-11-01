import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import { Alert } from '@material-ui/lab';

export default function Showtoast (props) {
  const {toastData,setToastData} = props;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastData({visible:false});
  };
  return (
    <Box textAlign="center">
      <Snackbar open={toastData.visible} autoHideDuration={4000} onClose={handleClose} style={{position:'fixed',marginBottom:50}} 
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
      >
        <Alert onClose={handleClose} severity={toastData.severity}>{toastData.text}</Alert>
      </Snackbar>
    </Box>
  );
}
