import React, { useState, useEffect } from "react";
import {
  Container, Button, Typography, Box, Grid, Card, CardContent,
  CardMedia, IconButton, Accordion, AccordionSummary, AccordionDetails,
  Divider, Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SecurityIcon from '@mui/icons-material/Security';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalculateIcon from '@mui/icons-material/Calculate';
import ArticleIcon from '@mui/icons-material/Article';
import ForumIcon from '@mui/icons-material/Forum';
import { AppContext } from '../context/AppContext';
import '../styles/Landing.css';

// Images
import loanImage from '../img/loan.png';
import fundsImage from '../img/funds.png';
import visionImage from '../img/vision.png';
import logo from '../img/logo-2.png';

// Client logos
import xbet from '../img/clients/1xbet.png';
import coinbase from '../img/clients/coinbase.jpg';
import hollywood from '../img/clients/TPla7Ehw_400x400.jpg';
import expert from '../img/clients/expert-option.png';

// Styled components
const HeroSection = styled('div')(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #283593 25%, #3949ab 50%, #5c6bc0 75%, #7986cb 100%)',
  color: '#fff',
  borderRadius: '0 0 50px 50px',
  padding: '120px 0 80px 0',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: '60px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  [theme.breakpoints.down('md')]: {
    padding: '100px 0 60px 0',
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF6B6B 0%, #FF8E53 50%, #FFA726 100%)',
  border: 0,
  borderRadius: '30px',
  boxShadow: '0 4px 10px rgba(255, 105, 135, .4)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(255, 105, 135, .5)',
    background: 'linear-gradient(45deg, #FF5252 0%, #FF7043 50%, #FF9800 100%)',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  border: '2px solid #fff',
  borderRadius: '30px',
  color: 'white',
  height: 48,
  padding: '0 30px',
  fontWeight: 'bold',
  marginLeft: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-3px)',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    marginTop: theme.spacing(2),
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
    background: 'linear-gradient(135deg, #ffffff 0%, #e8f0fe 100%)',
  },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(6),
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #1a237e, #3949ab)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '4px',
    background: 'linear-gradient(45deg, #FF5252 0%, #FF7043 50%, #FF9800 100%)',
    borderRadius: '2px',
  },
}));

// Client testimonials data
const clientsArray = [
  {name: "1xbet", logo: xbet, text: "Partnering up with we Finance group has been a game changer for our organization"},
  {name: "Hollywood Bets", logo: hollywood, text: "We Finance Group is coming in as an angel especially to us betting companies"},
  {name: "Coinbase", logo: coinbase, text: "We also now depend on We Finance Group when it comes to quick loans"},
  {name: "EXPERT OPTION", logo: expert, text: "Better than financial institutions, PERIOD!"},
];

// FAQ data
const faq = [
  {
    id: "panel1",
    question: "Who is eligible for a loan?",
    answer: "To qualify for a loan, you need a valid South African ID or passport with valid permit, a clean credit record (not blacklisted), and an active bank account in your name. We assess each application individually based on our risk assessment criteria."
  },
  {
    id: "panel2",
    question: "Who can invest with We Finance Group?",
    answer: "Anyone with a valid bank account can invest through our platform. We welcome individual investors, businesses, and financial institutions looking for better returns on their capital. There's no minimum investment amount to get started."
  },
  {
    id: "panel3",
    question: "How long does it take to access my investment returns?",
    answer: "You can choose investment periods of 7, 14, or 28 days based on your financial goals. Once your investment term ends, you can place a withdrawal request which typically processes within 48 hours. You also have the option to reinvest for another term."
  },
  {
    id: "panel4",
    question: "What fees do you charge?",
    answer: "Our platform is free to use. We only charge a 3.5% fee on withdrawals. There are no hidden charges, application fees, or monthly maintenance costs. This transparent fee structure ensures you know exactly what to expect."
  },
  {
    id: "panel5",
    question: "How are interest rates determined?",
    answer: "Interest rates fluctuate based on market demand. When demand for loans is high, interest rates for investors increase accordingly. You can check current rates before investing, and once your investment is placed, your rate is locked in for that term."
  },
  {
    id: "panel6",
    question: "How do you ensure the security of my funds?",
    answer: "We implement bank-level security protocols to protect all transactions. Additionally, we have a rigorous vetting process for borrowers and maintain a contingency fund to mitigate default risks. Your data and financial information are encrypted and protected at all times."
  },
];

// Features data
const features = [
  {
    title: "Market-Based Returns",
    description: "Our dynamic interest rates adjust based on market demand, ensuring optimal returns for investors and fair rates for borrowers.",
    icon: "trending_up"
  },
  {
    title: "Quick Approval Process",
    description: "Our streamlined verification system allows for loan approvals within hours, with funds disbursed directly to your account.",
    icon: "speed"
  },
  {
    title: "Flexible Investment Terms",
    description: "Choose investment periods from 7 to 28 days with the ability to reinvest or withdraw funds based on your financial goals.",
    icon: "calendar_today"
  },
  {
    title: "Bank-Level Security",
    description: "Your data and transactions are protected with advanced encryption and security protocols that meet financial industry standards.",
    icon: "security"
  },
];

export default function Landing() {
  const { setDialogData, navigate, socialMedia } = React.useContext(AppContext);
  const [expanded, setExpanded] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  // Investment calculator states
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [investmentPeriod, setInvestmentPeriod] = useState(7); // 7, 14, or 28 days
  const [calculatedReturns, setCalculatedReturns] = useState({
    totalReturn: 12500,
    interestEarned: 2500,
    rate: 25,
    projections: {
      twoWeeks: 13500,
      fourWeeks: 15000,
      threeMonths: 30000,
      sixMonths: 90000
    }
  });

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);

    return () => {
      window.removeEventListener("resize", setResponsiveness);
    };
  }, []);

  // Calculate returns whenever investment amount or period changes
  useEffect(() => {
    // Define the calculation function inside the effect to avoid dependency issues
    const calculate = () => {
      let rate = 0;
      let totalReturn = 0;
      let interestEarned = 0;

      // Apply interest rates based on investment period and amount
      if (investmentPeriod === 7) {
        rate = 25; // 25% for 7 days
      } else if (investmentPeriod === 14) {
        rate = 35; // 35% for 14 days
      } else if (investmentPeriod === 28) {
        rate = investmentAmount >= 15000 ? 50 : 35; // 50% for 28 days if amount >= 15000, otherwise 35%
      }

      // Calculate returns
      interestEarned = investmentAmount * (rate / 100);
      totalReturn = investmentAmount + interestEarned;

      // Calculate projections
      const twoWeeks = investmentAmount * 1.35; // 35% for 14 days
      const fourWeeks = investmentAmount >= 15000 ? investmentAmount * 1.5 : investmentAmount * 1.35; // 50% or 35%

      // Compound interest for longer periods (simplified calculation)
      const threeMonths = investmentAmount * Math.pow(1 + (rate/100), 3);
      const sixMonths = investmentAmount * Math.pow(1 + (rate/100), 6);

      setCalculatedReturns({
        totalReturn,
        interestEarned,
        rate,
        projections: {
          twoWeeks,
          fourWeeks,
          threeMonths,
          sixMonths
        }
      });
    };

    calculate();
  }, [investmentAmount, investmentPeriod]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleGetStarted = () => {
    !mobileView
      ? setDialogData({visible: true, title: 'GET STARTED'})
      : navigate("mobile", {page: 'GET STARTED'});
  };



  return (
    <div className="landing-page">
      {/* Modern Navigation */}
      <Box className="navbar">
        <Box className="header-gradient"></Box>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
            <Box display="flex" alignItems="center">
              <Box className="logo-container">
                <img src={logo} alt="We Finance Group Logo" height="60" />
              </Box>
            </Box>

            <Box display={{ xs: 'none', md: 'flex' }} alignItems="center" className="nav-links">
              <Button
                color="primary"
                onClick={() => setDialogData({visible: true, title: 'TERMS & CONDITIONS'})}
                sx={{
                  fontWeight: 'bold',
                  mx: 1,
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(26, 35, 126, 0.05)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Terms & Conditions
              </Button>
              <Button
                color="primary"
                onClick={() => setDialogData({visible: true, title: 'CONTACT US'})}
                sx={{
                  fontWeight: 'bold',
                  mx: 1,
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(26, 35, 126, 0.05)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Contact Us
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGetStarted}
                sx={{
                  borderRadius: '30px',
                  ml: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #FF6B6B 0%, #FF8E53 100%)',
                  boxShadow: '0 4px 10px rgba(255, 105, 135, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 15px rgba(255, 105, 135, 0.4)',
                    transform: 'translateY(-3px)'
                  }
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Log In
              </Button>
            </Box>

            {mobileView && (
              <IconButton
                color="primary"
                onClick={handleGetStarted}
                edge="end"
                sx={{
                  background: 'linear-gradient(45deg, #FF6B6B 0%, #FF8E53 100%)',
                  color: 'white',
                  boxShadow: '0 4px 10px rgba(255, 105, 135, 0.3)',
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            )}
          </Box>
        </Container>
        <Box className="header-divider"></Box>
      </Box>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom className="hero-title">
                Financial Freedom Through <span className="highlight">Smart Investments</span>
              </Typography>
              <Typography variant="h6" paragraph className="hero-subtitle">
                We Finance Group connects investors with borrowers, creating a marketplace where your money works harder for you. Invest based on market demand or get quick access to funds when you need them most.
              </Typography>
              <Typography variant="body1" paragraph className="hero-description">
                Our platform offers flexible investment options with competitive returns and streamlined loan applications with quick approvals. Join thousands of satisfied clients who have discovered a better way to grow and access capital.
              </Typography>
              <Box mt={4} display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
                <GradientButton
                  onClick={handleGetStarted}
                  endIcon={<ArrowForwardIcon />}
                  size="large"
                >
                  Get Started
                </GradientButton>
                <SecondaryButton
                  onClick={() => socialMedia("whatsApp")}
                  startIcon={<WhatsAppIcon />}
                  size="large"
                >
                  Contact Us
                </SecondaryButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="hero-image-container">
                <div className="finance-illustration">
                  <div className="finance-circle"></div>
                  <div className="finance-chart"></div>
                  <div className="finance-dollar">$</div>
                  <div className="finance-coins">
                    <div className="coin coin-1"></div>
                    <div className="coin coin-2"></div>
                    <div className="coin coin-3"></div>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box className="wave-shape"></Box>
      </HeroSection>

      {/* How It Works Section */}
      <Box sx={{ py: 10, position: 'relative', overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" align="center" gutterBottom>
            How It Works
          </SectionTitle>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
            Our platform makes investing and borrowing simple, transparent, and rewarding for everyone involved.
          </Typography>

          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box className="process-steps">
                <Box className="process-step">
                  <Box className="step-number">1</Box>
                  <Box className="step-content">
                    <Typography variant="h6" fontWeight="bold" gutterBottom>Create an Account</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sign up in minutes with your valid ID and banking details. Our verification process is quick and secure.
                    </Typography>
                  </Box>
                </Box>

                <Box className="process-step">
                  <Box className="step-number">2</Box>
                  <Box className="step-content">
                    <Typography variant="h6" fontWeight="bold" gutterBottom>Choose Your Path</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Decide whether you want to invest your funds or apply for a loan based on your financial needs.
                    </Typography>
                  </Box>
                </Box>

                <Box className="process-step">
                  <Box className="step-number">3</Box>
                  <Box className="step-content">
                    <Typography variant="h6" fontWeight="bold" gutterBottom>Invest or Borrow</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Investors: Select your investment amount and term. Borrowers: Complete your loan application.
                    </Typography>
                  </Box>
                </Box>

                <Box className="process-step">
                  <Box className="step-number">4</Box>
                  <Box className="step-content">
                    <Typography variant="h6" fontWeight="bold" gutterBottom>Enjoy the Benefits</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Investors earn competitive returns. Borrowers receive funds quickly with clear repayment terms.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="process-illustration" sx={{
                height: 400,
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}>
                <Box className="flow-diagram">
                  <Box className="flow-circle investor-circle">
                    <Typography variant="h6" fontWeight="bold">Investors</Typography>
                  </Box>
                  <Box className="flow-arrow"></Box>
                  <Box className="flow-circle platform-circle">
                    <Typography variant="h6" fontWeight="bold">Platform</Typography>
                  </Box>
                  <Box className="flow-arrow"></Box>
                  <Box className="flow-circle borrower-circle">
                    <Typography variant="h6" fontWeight="bold">Borrowers</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <SectionTitle variant="h3" align="center" gutterBottom>
          Why Choose Us
        </SectionTitle>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box className="feature-item">
                {feature.icon === "trending_up" && <TrendingUpIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />}
                {feature.icon === "speed" && <SpeedIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />}
                {feature.icon === "calendar_today" && <CalendarTodayIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />}
                {feature.icon === "security" && <SecurityIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Services Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8f0fe 100%)',
        py: 10,
        borderRadius: '50px 50px 0 0',
        boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%233949ab\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          opacity: 1,
        }
      }}>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" align="center" gutterBottom>
            Our Services
          </SectionTitle>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <FeatureCard>
                <CardMedia
                  component="img"
                  height="240"
                  image={loanImage}
                  alt="Loan In"
                  sx={{ objectFit: 'contain', bgcolor: '#f0f4ff', p: 2 }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                    BORROW FUNDS
                  </Typography>
                  <Typography paragraph>
                    Access quick short-term loans tailored to your needs, whether for business expansion, emergency expenses, or personal projects. Our streamlined application process ensures minimal paperwork and fast approvals.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Loan amounts from R 1,000 to R 30,000
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Flexible repayment terms
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • No hidden fees or charges
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Competitive interest rates based on market demand
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        borderRadius: '30px',
                        px: 3,
                        py: 1,
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                      onClick={handleGetStarted}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Apply Now
                    </Button>
                  </Box>
                </CardContent>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <FeatureCard>
                <CardMedia
                  component="img"
                  height="240"
                  image={fundsImage}
                  alt="Loan Out"
                  sx={{ objectFit: 'contain', bgcolor: '#f0f4ff', p: 2 }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                    INVEST FUNDS
                  </Typography>
                  <Typography paragraph>
                    Put your capital to work by investing in our loan marketplace. Your funds are distributed to carefully vetted borrowers, generating attractive returns while helping others access needed capital. Our platform makes investing simple and rewarding.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Investment periods of 7, 14, or 28 days
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Higher returns than traditional savings accounts
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Only 3.5% fee on withdrawals
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Reinvest or withdraw funds at your convenience
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        borderRadius: '30px',
                        px: 3,
                        py: 1,
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                      onClick={handleGetStarted}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Invest Now
                    </Button>
                  </Box>
                </CardContent>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Market Statistics Section */}
      <Box sx={{ py: 10, position: 'relative', background: 'linear-gradient(135deg, #f5f7fa 0%, #e8f0fe 100%)' }}>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" align="center" gutterBottom>
            Market Statistics
          </SectionTitle>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
            Our platform has been growing steadily, connecting investors and borrowers across South Africa.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 4 }}>
                <MonetizationOnIcon sx={{ fontSize: 50, color: '#1a237e', mb: 2 }} />
                <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                  R75M+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Transaction Volume
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 4 }}>
                <PeopleIcon sx={{ fontSize: 50, color: '#1a237e', mb: 2 }} />
                <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                  50,000+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Registered Investors
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 4 }}>
                <BarChartIcon sx={{ fontSize: 50, color: '#1a237e', mb: 2 }} />
                <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                  15-25%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Average Annual Returns
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 4 }}>
                <CheckCircleIcon sx={{ fontSize: 50, color: '#1a237e', mb: 2 }} />
                <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                  100%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Client Satisfaction Rate
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Market Demand Trends
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
              Our interest rates fluctuate based on real-time market demand, ensuring optimal returns for investors and fair rates for borrowers.
            </Typography>

            <Box className="market-chart" sx={{ height: 300, maxWidth: 800, mx: 'auto', position: 'relative', overflow: 'hidden' }}>
              <Box className="chart-bars">
                <Box className="chart-bar" sx={{ height: '60%', background: 'linear-gradient(to top, #1a237e, #3949ab)' }}>
                  <Typography variant="body2" color="white" sx={{ p: 1 }}>Jan</Typography>
                </Box>
                <Box className="chart-bar" sx={{ height: '75%', background: 'linear-gradient(to top, #1a237e, #3949ab)' }}>
                  <Typography variant="body2" color="white" sx={{ p: 1 }}>Feb</Typography>
                </Box>
                <Box className="chart-bar" sx={{ height: '65%', background: 'linear-gradient(to top, #1a237e, #3949ab)' }}>
                  <Typography variant="body2" color="white" sx={{ p: 1 }}>Mar</Typography>
                </Box>
                <Box className="chart-bar" sx={{ height: '80%', background: 'linear-gradient(to top, #1a237e, #3949ab)' }}>
                  <Typography variant="body2" color="white" sx={{ p: 1 }}>Apr</Typography>
                </Box>
                <Box className="chart-bar" sx={{ height: '90%', background: 'linear-gradient(to top, #1a237e, #3949ab)' }}>
                  <Typography variant="body2" color="white" sx={{ p: 1 }}>May</Typography>
                </Box>
                <Box className="chart-bar" sx={{ height: '70%', background: 'linear-gradient(to top, #1a237e, #3949ab)' }}>
                  <Typography variant="body2" color="white" sx={{ p: 1 }}>Jun</Typography>
                </Box>
              </Box>
              <Box className="chart-line" sx={{ position: 'absolute', top: '30%', left: 0, width: '100%', height: 2, background: 'rgba(255, 105, 135, 0.5)', zIndex: 2 }}></Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(to top, #1a237e, #3949ab)', mr: 1 }}></Box>
                <Typography variant="body2" color="text.secondary">Loan Demand</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 16, height: 2, background: 'rgba(255, 105, 135, 0.8)', mr: 1 }}></Box>
                <Typography variant="body2" color="text.secondary">Interest Rate Threshold</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Investment Calculator Section */}
      <Box sx={{ py: 10, position: 'relative' }}>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" align="center" gutterBottom>
            Investment Calculator
          </SectionTitle>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
            See how your investment can grow with We Finance Group's competitive returns.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className="calculator-form">
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Calculate Your Returns
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>Investment Amount (R)</Typography>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mb: 2
                  }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      mb: 1
                    }}>
                      <Typography variant="body1" sx={{ mr: 1 }}>R</Typography>
                      <Typography variant="h6">{investmentAmount.toLocaleString()}</Typography>
                    </Box>

                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      style={{ width: '100%', marginTop: '10px' }}
                    />

                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      px: 2,
                      mt: 1
                    }}>
                      <Typography variant="body2" color="text.secondary">R1,000</Typography>
                      <Typography variant="body2" color="text.secondary">R100,000</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>Investment Period</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Button
                        variant={investmentPeriod === 7 ? "contained" : "outlined"}
                        fullWidth
                        onClick={() => setInvestmentPeriod(7)}
                        sx={{
                          background: investmentPeriod === 7 ? 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)' : 'transparent',
                          borderRadius: 2,
                          py: 1,
                          borderColor: '#1a237e',
                          color: investmentPeriod === 7 ? 'white' : '#1a237e',
                          fontWeight: 'bold'
                        }}
                      >
                        7 Days
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant={investmentPeriod === 14 ? "contained" : "outlined"}
                        fullWidth
                        onClick={() => setInvestmentPeriod(14)}
                        sx={{
                          background: investmentPeriod === 14 ? 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)' : 'transparent',
                          borderRadius: 2,
                          py: 1,
                          borderColor: '#1a237e',
                          color: investmentPeriod === 14 ? 'white' : '#1a237e',
                          fontWeight: 'bold'
                        }}
                      >
                        14 Days
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant={investmentPeriod === 28 ? "contained" : "outlined"}
                        fullWidth
                        onClick={() => setInvestmentPeriod(28)}
                        sx={{
                          background: investmentPeriod === 28 ? 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)' : 'transparent',
                          borderRadius: 2,
                          py: 1,
                          borderColor: '#1a237e',
                          color: investmentPeriod === 28 ? 'white' : '#1a237e',
                          fontWeight: 'bold'
                        }}
                      >
                        28 Days
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>Current Interest Rates</Typography>
                  <Box sx={{
                    p: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight="bold">7 Days:</Typography>
                      <Typography variant="h6" color="primary" fontWeight="bold">25%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight="bold">14 Days:</Typography>
                      <Typography variant="h6" color="primary" fontWeight="bold">35%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight="bold">28 Days:</Typography>
                      <Typography variant="h6" color="primary" fontWeight="bold">50%</Typography>
                      <Typography variant="caption" color="text.secondary">(R15,000+ investments)</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: 'linear-gradient(45deg, #FF6B6B 0%, #FF8E53 100%)',
                      borderRadius: '30px',
                      py: 1.5,
                      px: 4,
                      fontWeight: 'bold',
                      boxShadow: '0 4px 10px rgba(255, 105, 135, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 6px 15px rgba(255, 105, 135, 0.4)'
                      }
                    }}
                    endIcon={<CalculateIcon />}
                  >
                    Investment Calculator
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="result-card">
                <Typography variant="h5" gutterBottom>
                  Your Estimated Returns
                </Typography>

                <Box sx={{ my: 4 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Return After {investmentPeriod} Days
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" sx={{ my: 1 }}>
                    R{calculatedReturns.totalReturn.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Interest Earned: R{calculatedReturns.interestEarned.toLocaleString()} ({calculatedReturns.rate}%)
                  </Typography>
                </Box>

                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />

                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>Potential Returns:</Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>14 Days</Typography>
                        <Typography variant="h6" fontWeight="bold">
                          R{Math.round(calculatedReturns.projections.twoWeeks).toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>35% Return</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>28 Days</Typography>
                        <Typography variant="h6" fontWeight="bold">
                          R{Math.round(calculatedReturns.projections.fourWeeks).toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          {investmentAmount >= 15000 ? '50%' : '35%'} Return
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>3 Months</Typography>
                        <Typography variant="h6" fontWeight="bold">
                          R{Math.round(calculatedReturns.projections.threeMonths).toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>Compounded</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>6 Months</Typography>
                        <Typography variant="h6" fontWeight="bold">
                          R{Math.round(calculatedReturns.projections.sixMonths).toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>Compounded</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  sx={{
                    mt: 4,
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255,255,255,0.1)'
                    }
                  }}
                  onClick={handleGetStarted}
                >
                  Start Investing Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 25%, #3949ab 50%, #5c6bc0 75%, #7986cb 100%)',
        color: 'white',
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          opacity: 0.5,
        }
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img src={visionImage} alt="About Us" style={{ maxWidth: '100%' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom fontWeight="bold">
                About We Finance Group
              </Typography>
              <Typography variant="body1" paragraph>
                <span style={{ color: "#86ef73", fontWeight: "bold" }}>We Finance Group</span> is a product under "Worldwide Capital (Pty) Ltd" registered as a FSP under the FAIS Act, FSP 16577 founded in 2000. With over two decades of experience in the financial sector, we've built a reputation for reliability, transparency, and innovation.
              </Typography>
              <Typography variant="body1" paragraph>
                Our platform connects investors seeking better returns with borrowers needing quick access to capital. We serve large financial institutions, small businesses, betting companies, and individual South African citizens with tailored financial solutions.
              </Typography>
              <Typography variant="body1" paragraph>
                We've successfully processed over R 75,000,000.00 within just 36 months, maintaining 100% client satisfaction and growing our user base to over 50,000 individual investors and numerous corporate partners.
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                Our mission is simple: <span style={{ color: "#86ef73" }}>"ALLOW YOUR MONEY TO WORK FOR YOU."</span>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 10, background: 'linear-gradient(135deg, #f5f7fa 0%, #e8f0fe 100%)' }}>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" align="center" gutterBottom>
            What Our Clients Say
          </SectionTitle>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
            Don't just take our word for it. Hear from our satisfied investors and borrowers.
          </Typography>

          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
            Corporate Partners
          </Typography>
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {clientsArray.map((client, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <TestimonialCard elevation={2}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={client.logo}
                    alt={client.name}
                    sx={{
                      objectFit: 'contain',
                      p: 2,
                      bgcolor: '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                      {client.name.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {client.text}
                    </Typography>
                  </CardContent>
                </TestimonialCard>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
            Individual Investors & Borrowers
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box className="user-testimonial">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: '#1a237e',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: 24,
                      mr: 2
                    }}
                  >
                    S
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">Sarah M.</Typography>
                    <Typography variant="body2" color="text.secondary">Investor since 2021</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                  "I've been investing with We Finance Group for over two years now. The returns are consistently better than what I was getting from my savings account. The platform is easy to use, and I love how transparent they are about where my money is going."
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Box key={star} sx={{ color: '#FFC107', mr: 0.5 }}>★</Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box className="user-testimonial">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: '#3949ab',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: 24,
                      mr: 2
                    }}
                  >
                    T
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">Thabo N.</Typography>
                    <Typography variant="body2" color="text.secondary">Borrower</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                  "When my business needed quick capital to fulfill a large order, traditional banks were too slow. We Finance Group approved my loan within hours, and the funds were in my account the next day. This literally saved my business opportunity."
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Box key={star} sx={{ color: '#FFC107', mr: 0.5 }}>★</Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box className="user-testimonial">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: '#5c6bc0',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: 24,
                      mr: 2
                    }}
                  >
                    L
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">Lerato K.</Typography>
                    <Typography variant="body2" color="text.secondary">Investor & Borrower</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                  "I've used We Finance Group both as an investor and a borrower. The dual perspective has shown me how well they balance the needs of both sides. Their customer service is exceptional, and I appreciate how they've created a true financial ecosystem."
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Box key={star} sx={{ color: '#FFC107', mr: 0.5 }}>★</Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Latest News Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <SectionTitle variant="h3" align="center" gutterBottom>
          Latest News & Updates
        </SectionTitle>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          Stay informed about market trends, investment opportunities, and company updates.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
              <Box sx={{ height: 200, bgcolor: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChartIcon sx={{ fontSize: 80, color: '#1a237e', opacity: 0.7 }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="overline" color="primary" fontWeight="bold">
                  MARKET ANALYSIS
                </Typography>
                <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                  Q2 2023 Investment Trends
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Our analysis shows increasing demand for short-term loans in the retail sector, creating excellent investment opportunities with returns averaging 22% annually.
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Published: June 15, 2023
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ borderRadius: '20px' }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
              <Box sx={{ height: 200, bgcolor: '#e8eaf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArticleIcon sx={{ fontSize: 80, color: '#1a237e', opacity: 0.7 }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="overline" color="primary" fontWeight="bold">
                  COMPANY NEWS
                </Typography>
                <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                  We Finance Group Expands to Cape Town
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  We're excited to announce the opening of our new office in Cape Town, bringing our innovative financial solutions to more South Africans.
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Published: May 28, 2023
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ borderRadius: '20px' }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
              <Box sx={{ height: 200, bgcolor: '#e1f5fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ForumIcon sx={{ fontSize: 80, color: '#1a237e', opacity: 0.7 }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="overline" color="primary" fontWeight="bold">
                  INVESTOR EDUCATION
                </Typography>
                <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                  Understanding Risk in P2P Lending
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Learn about the various risk factors in peer-to-peer lending and how We Finance Group's vetting process helps mitigate these risks for investors.
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Published: April 10, 2023
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ borderRadius: '20px' }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: '30px',
              px: 4,
              py: 1.5,
              background: 'linear-gradient(45deg, #1a237e 0%, #3949ab 100%)',
            }}
          >
            View All Articles
          </Button>
        </Box>
      </Container>

      {/* FAQ Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8f0fe 100%)',
        py: 10,
        borderRadius: '50px 50px 0 0',
        boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%233949ab\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          opacity: 1,
        }
      }}>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" align="center" gutterBottom>
            Frequently Asked Questions
          </SectionTitle>
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {faq.map((item) => (
              <Accordion
                key={item.id}
                expanded={expanded === item.id}
                onChange={handleChange(item.id)}
                sx={{
                  mb: 2,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  '&:before': { display: 'none' },
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${item.id}-content`}
                  id={`${item.id}-header`}
                  sx={{ bgcolor: '#f0f4ff' }}
                >
                  <Typography fontWeight="bold">{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 25%, #3949ab 50%, #5c6bc0 75%, #7986cb 100%)',
        color: 'white',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          opacity: 0.3,
        }
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" mb={2}>
                <img src={logo} alt="We Finance Group Logo" height="50" style={{ filter: 'brightness(0) invert(1)' }} />
              </Box>
              <Typography variant="body2" paragraph>
                Providing innovative financial solutions since 2000. Registered as a Financial Service Provider under the FAIS Act, FSP 16577.
              </Typography>
              <Typography variant="body2" paragraph>
                We connect investors and borrowers through our secure platform, creating a marketplace where both parties benefit from market-driven rates.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Our Services
              </Typography>
              <Typography variant="body2" component="div">
                <Box component="a" href="#" color="inherit" display="block" mb={1}>Investment Options</Box>
                <Box component="a" href="#" color="inherit" display="block" mb={1}>Loan Applications</Box>
                <Box component="a" href="#" color="inherit" display="block" mb={1}>Business Funding</Box>
                <Box component="a" href="#" color="inherit" display="block" mb={1}>Financial Advice</Box>
                <Box component="a" href="#" color="inherit" display="block" mb={1}>Market Analysis</Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" paragraph>
                Email: info@wefinancegroup.org
              </Typography>
              <Typography variant="body2" paragraph>
                Phone: +27 10 510 2699
              </Typography>
              <Typography variant="body2" paragraph>
                Office Hours: Monday-Friday, 9am-5pm
              </Typography>
              <Box display="flex" gap={2} mt={2}>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<WhatsAppIcon />}
                  onClick={() => socialMedia("whatsApp")}
                  sx={{ borderRadius: '20px' }}
                >
                  WhatsApp
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box mt={4} pt={3} borderTop="1px solid rgba(255,255,255,0.2)" textAlign="center">
            <Typography variant="body2">
              © {new Date().getFullYear()} We Finance Group | A product of Worldwide Capital (Pty) Ltd | FSP 16577 | All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, fontSize: '0.75rem', opacity: 0.7 }}>
              Investing involves risk. Past performance is not indicative of future results. Terms and conditions apply.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}