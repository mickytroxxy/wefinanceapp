import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppStoreIcon from '@material-ui/icons/Apple'; // Placeholder for iOS icon
import PlayStoreIcon from '@material-ui/icons/Android'; // Placeholder for Android icon
import HuaweiIcon from '@material-ui/icons/PhoneAndroid'; // Placeholder for Huawei icon
import '../App.css';
import { colors } from "../context/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(135deg, ${colors.primary}, #2575FC)`,
    padding: "10px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    borderRadius: 15,
  },
  paper: {
    padding: theme.spacing(4),
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    color: "#333",
    width: "100%",
    maxWidth: "800px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  header: {
    background: `linear-gradient(90deg, ${colors.primary}, #2575FC)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    fontFamily: "'Aclonica', sans-serif",
    fontSize: "1.8rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  stepBox: {
    marginBottom: theme.spacing(3),
  },
  appStoreButtons: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  storeButton: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(1.5),
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#555",
    },
    fontSize: "0.9rem",
  },
}));

export default function Loan() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <Typography
          variant="h6"
          align="center"
          className={`${classes.header}`}
        >
          🤝 We Finance Group & Mrdocs Partnership
        </Typography>
        <Typography class="fontLight" variant="body1" align="left" paragraph>
          Apply for loans quickly and securely with our innovative partnership! Mrdocs ensures biometric security, document storage, and a seamless loan application process.
        </Typography>

        <Box textAlign={"left"} className={classes.stepBox}>
          <Typography class="fontBold1" variant="h5" gutterBottom>
            How to Apply for a Loan
          </Typography>
          <Typography variant="body1" paragraph>
            <div class="fontLight">1. Download the Mrdocs app.</div>
            <br />
            <div class="fontLight">
              2. Register and upload documents (ID, proof of address, payslips,
              and bank statements).
            </div>
            <br />
            <div class="fontLight">
              3. Click "Apply for Loan," select "We Finance Group," and complete
              the process.
            </div>
          </Typography>
        </Box>

        <Typography class="fontBold" variant="h6" align="center">
          Download the Mrdocs App
        </Typography>
        <Box className={classes.appStoreButtons}>
          <a target="_blank" href="https://apps.apple.com/us/app/mrdocs/id1666461949" className={classes.storeButton}>
            <AppStoreIcon /> App Store
          </a>
          <a target="_blank" href="https://play.google.com/store/apps/details?id=com.empiredigitals.doneDeal" className={classes.storeButton}>
            <PlayStoreIcon /> Google Play
          </a>
          <a target="_blank" href="https://play.google.com/store/apps/details?id=com.empiredigitals.doneDeal" className={classes.storeButton}>
            <HuaweiIcon /> Huawei AppGallery
          </a>
        </Box>
      </Paper>
    </Box>
  );
}
