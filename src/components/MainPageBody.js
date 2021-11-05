import React,{useState,useEffect} from "react";
import { Button, Box,Typography,Container,makeStyles, Card, CardContent, CardMedia,Snackbar  } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import img1 from '../img/image1.png';
import img2 from '../img/img2.png';
import funds from '../img/funds.png';
import loan from '../img/loan.png';
import { AppContext } from '../context/AppContext';
import xbet from '../img/clients/1xbet.png';
import betway from '../img/clients/betway logo.png';
import coinbase from '../img/clients/coinbase.jpg';
import hollywood from '../img/clients/TPla7Ehw_400x400.jpg';
import expert from '../img/clients/expert-option.png';
import betxchange from '../img/clients/betxchange.webp';
import plus500 from '../img/clients/plus500_logo.png';
import iqoption from '../img/clients/iqoption-logo.jpg';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Grid from '@mui/material/Grid';
import "../App.css"
const clientsArray = [
    {name:"1xbet",text:"Partnering up with we Finance group has been a game changer for our organization"},
    {name:"Hollywood Bets",text:"We Finance Group is coming in as an angel especially to us betting companies"},
    {name:"Coinbase",text:"We also now depend on We Finance Group when it comes to quick loans"},
    {name:"EXPERT OPTION",text:"Better than financial institutions, PERIOD!"},
    {name:"Bet Exchange",text:"We never lacking fincially nowadays because of you team!"},
    {name:"Bet Way",text:"Bet with us without any fear now. Visit www.betway.co.za for more"},
    {name:"IQ OPTION",text:"We Finance Group has positively impacted how our clients trade. Thanks to you team!"},
    {name:"Plus500",text:"I like how easy and smart the team is. Professionalism at its best!"},
]
const renderClient = client =>{
    if(client === "1xbet"){
        return xbet;
    }else if(client === "Hollywood Bets"){
        return hollywood;
    }else if(client === "Coinbase"){
        return coinbase;
    }else if(client === "EXPERT OPTION"){
        return expert;
    }else if(client === "Bet Exchange"){
        return betxchange;
    }else if(client === "Bet Way"){
        return betway;
    }else if(client === "IQ OPTION"){
        return iqoption;
    }else if(client === "Plus500"){
        return plus500;
    }
}
const faq = [
    {header:"WHO IS ELIGIBLE FOR A LOAN",text:"A client should have a valid South African ID, valid passport & a valid permit, You should not be blackListed. You should also have a bank account in your name",panel:"panel1",controls:"panel1bh-content"},
    {header:"WHO CAN INVEST ?",text:"Anyone with a bank account can loan out or invest",panel:"panel2",controls:"panel2bh-content"},
    {header:"HOW LONG DOES IT TAKE TO GET MY INVESTMENTS",text:"You can choose your investment period from 7,14,28 days then place a withdrawal request which can take up to 48 hours",panel:"panel5",controls:"panel5bh-content"},
    {header:"IS THIS FREE",text:"We only charge you 3.5% on every withdrawal made",panel:"panel3",controls:"panel3bh-content"},
    {header:"ARE INTEREST RATES STABLE",text:"Interest rates may vary according to demand, You can check before investing",panel:"panel4",controls:"panel4bh-content"},
]
export default function Body() {
    const classes = useStyles();
    const [state, setState] = useState({mobileView: false});
    
    const [readMore,setReadMore]=useState(false);
    const { setDialogData,navigate } = React.useContext(AppContext);
    const { mobileView } = state;
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
            ? setState((prevState) => ({ ...prevState, mobileView: true }))
            : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, []);
    const isLoanTermsAccepted = isAccepted => {}
    return (
        <Container maxWidth="xl" component="main" className={classes.heroContent}>
            <div className={classes.root}>
                <Grid container style={{marginTop:50}}>
                    <Grid item xs={12} sm={6}>
                        <div style={{paddingLeft:50,paddingRight:50,paddingBottom:30}}>
                            <center><h1 style={{color:'#3f4750',fontWeight:"bolder",fontSize:36}} className="fontBold1">AN EASY WAY TO BECOME <span style={{color:"#bbc9f7"}}>A LOAN SHARK</span></h1></center>
                            <center><p style={{color:'#757575'}} className="fontBold">Easily apply for a quick loan or loan out your funds to our trusted clients all over the nation. Invest your money wisely and allow it to work for you and earn a massive interest within a short period of time! Loan in at low rate and loan out at high rate. Scroll down for more info</p></center>
                            <center><Button onClick={()=> !mobileView ? setDialogData({visible:true,title:'GET STARTED'}) : navigate("login")} style={{borderTopRightRadius:30,borderBottomLeftRadius:30}} className={classes.button} variant="outlined">GET STARTED</Button></center>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <center><img src={img1} style={{maxWidth:'90%',borderRadius:50}} alt="" /></center>
                    </Grid>
                </Grid>
                <Typography style={{backgroundColor:'#bbc9f7',borderTopLeftRadius:1200,paddingBottom:15,borderBottomLeftRadius:100,borderBottomRightRadius:100,marginTop:15}}>
                    <div  style={{color: !mobileView ? '#fff' : "#3488a7",marginTop:50}} className="fontBold1"><h2>ABOUT US</h2></div>
                    <Grid container style={{marginTop:50}} >
                        <Grid item xs={12} sm={6} >
                            <Box display={{ xs: 'none', md: 'block' }} m={1}>
                                <center><img src={img2} style={{maxWidth:'75%'}} alt=""/></center>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div>
                                <center><h3 style={{color:'#737a81'}} className="fontBold1">How would you proceed before knowing us ?</h3></center>
                                <center>
                                    <p style={{color:'#757575',paddingTop:20,paddingLeft:50,paddingRight:50}} className="fontBold">
                                        <span style={{color:"#3488a7"}} className="fontBold1">We Finance Group Pty Ltd</span> is a registered financial service provider founded in 2018. We aim to provide short-term loans to large financial institute, betting companies and South African citizens.
                                        We have managed to process over R 75 000 000.00 within 36 months with 100% client satisfaction. We have managed to aquire over 50 000 individual investors and few large organizations.
                                    </p>
                                    <p style={{paddingTop:10,paddingLeft:50,paddingRight:50,color:'#757575'}} className="fontBold">We believe in our moto which is <span className="fontBold1" style={{color:"#3488a7"}}>"ALLOW YOUR MONEY TO WORK FOR YOU"</span></p>
                                </center>
                                <center><Button onClick={()=> !mobileView ? setDialogData({visible:true,title:'GET STARTED'}) : navigate("login")} variant="outlined" className={classes.button} style={{borderRadius:20}}>I'M CURIOUS ALREADY</Button></center>
                            </div>
                        </Grid>
                    </Grid>
                </Typography>
                <Typography style={{background: "linear-gradient(to right, #effcfc, #fceff8, #eff2fc)",marginTop:20,borderRadius:50}} justify="flex-start">
                    <Grid container >
                        <Grid item xs={12} sm={6} style={{padding:50}} order={{ xs: 2, lg: 1 }}>
                            <div>
                                <center><h3 style={{color:'#737a81'}} className="fontBold1">VISION & MISSION</h3></center>
                                <center>
                                    <p style={{color:'#757575'}} className="fontBold">
                                        <span style={{color:"#bbc9f7"}} className="fontBold1">We Finance Group Pty Ltd</span> was founded to help people and organization in urgent need of financial services. We believe our lives are powered up by funds and this is why our loan application is easy and the payout is within hours.
                                        We also believe in unity as a nation, when you loan out your funds to someone you are actually impacting their lives positively and you deserve to be rewarded for your good deed and because of that, our loan out interest are slightly high.
                                    </p>
                                    <p style={{color:'#757575'}} className="fontBold">Our vision is to be able to<span className="fontBold1" style={{color:"#bbc9f7"}}>" help as many people as we can financially"</span></p>
                                </center>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} order={{ xs: 1, lg: 1 }}>
                            <Box display={{ xs: 'block' }} m={1}>
                                <center><img src={img2} style={{maxWidth:'75%'}} alt=""/></center>
                            </Box>
                        </Grid>
                    </Grid>
                </Typography>
                <Typography style={{width:'100%'}}>
                    <center><h3 style={{color:'#737a81'}} className="fontBold1">OUR SERVICES</h3></center>
                    <Grid container >
                        <Grid item xs={12} md={6}>
                            <h5 style={{color:'#737a81'}} className="fontBold1">LOAN IN</h5>
                            <center><img src={loan} style={{maxWidth:160}} alt=""/></center>
                            <p className="fontBold" style={{color:'#757575',padding:25}}>This is a quick short-term loan service allowing you to borrow money from us, It could be for your business needs, emergency or anything you want. Our team is always available 9am-5pm for you. Our loan amount starts from R 1 000.00 - R 30 000. Please note, interest rate may vary according to demand</p>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <h5 style={{color:'#737a81'}} className="fontBold1">LOAN OUT</h5>
                            <center><img src={funds} style={{maxWidth:160}} alt=""/></center>
                            <p className="fontBold" style={{color:'#757575',padding:25}}>
                                This is when you give in your funds for profit. You funds will be then be given out to our trusted clients as loans. Why would you keep your money without it making you profit? You can easily become a loan shark in minutes. Interest rate may also vary according to demand. Scroll down to read more about how this system works
                            </p>
                        </Grid>
                    </Grid>
                </Typography>
                <Typography style={{backgroundColor:"#bbc9f7",paddingLeft:30,paddingRight:30, borderRadius:10,borderBottomLeftRadius:150,borderTopRightRadius:150}}><h3 className="fontBold1" style={{color:"#fff",fontSize:15}}>WHAT OUR PARTNERS SAY</h3></Typography>
                <Typography style={{padding:10,backgroundColor:'#eef1f4',width:'100%',marginTop:15}}>
                    <div className={classes.root}>
                        <ScrollMenu
                            data={clientsArray.map(({name}, i) => (
                                <div key={name} style={{height:50,padding:10,width:'100%'}}>
                                    <img src={renderClient(name)} alt={name} style={{height:50}} />            
                                </div>
                            ))}
                        />
                    </div>
                </Typography>
                <Typography>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={3}>
                            {clientsArray.map((item,i) => {
                                let maxLength = 4;
                                readMore ? maxLength = clientsArray.length : mobileView ? maxLength = 2 : maxLength = 4;
                                if(i < maxLength){
                                    return(
                                        <Grid item key={i} xs={12} md={3}>
                                            <Card className={classes.card} elevation={1} style={{minHeight:mobileView ? 0 : 330}}>
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image={renderClient(item.name)}
                                                    title={item.name}
                                                />
                                                <CardContent className={classes.cardContent}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        <span className="fontBold1">{item.name.toUpperCase()}</span>
                                                    </Typography>
                                                    <Typography>
                                                        <span className="fontBold">{item.text}</span>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                } 
                            })}
                        </Grid>
                        <center><Button onClick={()=>setReadMore(!readMore)} variant="outlined" className={classes.button} style={{borderRadius:20}}>{readMore?(<span>Read Less</span>):(<span>Read More</span>)}</Button></center>
                    </Container>
                </Typography>
                <Typography>
                    <center>
                        <Typography style={{backgroundColor:"#bbc9f7",padding:2,paddingLeft:30,paddingRight:30, borderRadius:10,borderBottomLeftRadius:150,borderTopRightRadius:150,width:'76%',marginBottom:30}}><h3 className="fontBold1" style={{color:"#fff",fontSize:15}}>FREQUENTLY ASKED QUESTIONS</h3></Typography>
                    </center>
                    <Box textAlign="left">
                        {faq.map(({header,text,panel,control})=>(
                            <Accordion expanded={expanded === panel} onChange={handleChange(panel)} elevation={0} sx={{ borderRadius:0 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={control} id={panel}>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }}><span className="fontBold1" style={{fontSize:13}}>{header}</span></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography><span className="fontBold">{text}</span></Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </Typography>
                {mobileView && (
                    <Grid container style={{marginTop:20}}>
                        <Grid item xs={12} sm={12}>
                            <Button variant="outlined" onClick={()=>setDialogData({visible:true,title:'TERMS & CONDITIONS',data:{isLoanTermsAccepted}})} style={{borderTopRightRadius:30,borderBottomLeftRadius:30}}  component="label"startIcon={<PrivacyTipIcon style={{fill: "#bbc9f7",fontSize:24}}/>}>TERMS & CONDITIONS</Button>
                        </Grid>
                        <Grid item xs={12} sm={12} style={{marginTop:30}}>
                            <Button variant="outlined" onClick={()=>setDialogData({visible:true,title:'CONTACT US'})} style={{borderTopRightRadius:30,borderBottomLeftRadius:30}}  component="label"startIcon={<ContactPhoneIcon style={{fill: "#bbc9f7",fontSize:24}}/>}>CONTACT US</Button>
                        </Grid>
                    </Grid>
                )}
            </div>
        </Container>
    )
}
const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    gridList: {
        flexWrap: 'nowrap'
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
    },
        cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
        cardContent: {
        flexGrow: 1,
    },
    button: {
        marginTop:15,borderColor:'#3488a7',color:'#3488a7',outline:'none',
        '&:hover': {
          backgroundColor: '#3488a7',
          color: '#fff',
        }
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));