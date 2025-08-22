import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AppContext } from '../context/AppContext';

const Content = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  minHeight: '70vh'
}));

export default function Privacy() {
  const { navigate, mobileView } = React.useContext(AppContext);
  return (
    <Container maxWidth="md">
      <Content>
        <Typography variant="h3" component="h1" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="body2" color="textSecondary" paragraph>
          Last updated: August 22, 2025
        </Typography>

        <Typography variant="h6" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          We Finance Group ("we", "us", "our") provides financial marketplace services that connect investors and borrowers. This Privacy Policy explains what information we collect, how we use it, who we share it with, and the choices you have regarding your personal information.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Information we collect
        </Typography>
        <Typography variant="body1" paragraph>
          We collect information you provide directly (for account creation, loan or investment applications, verification documents, payment details, and communications) and information collected automatically when you use our services (device identifiers, IP addresses, usage data, and cookies).
        </Typography>

        <Typography variant="h6" gutterBottom>
          Cookies and similar technologies
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies and similar tracking technologies to operate and improve our services, remember preferences, perform analytics, and deliver personalized content. You can control cookie preferences through your browser settings, but disabling certain cookies may affect functionality.
        </Typography>

        <Typography variant="h6" gutterBottom>
          How we use your information
        </Typography>
        <Typography variant="body1" paragraph>
          We use personal information to provide and improve our services, process transactions, verify identities, prevent fraud, send service-related notices, and comply with legal obligations. We may also use aggregated or de-identified data for analytics and research.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Sharing and disclosure
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell personal data. We may share data with third-party service providers who perform services for us (payment processors, identity verification, hosting, analytics providers), with counterparties as needed to complete transactions, or if required by law. We require service providers to protect user data and limit their use to authorized purposes.
        </Typography>

        <Typography variant="h6" gutterBottom>
          International transfers
        </Typography>
        <Typography variant="body1" paragraph>
          Your data may be stored, processed, or transferred between countries where we or our service providers operate. We take reasonable steps to ensure an adequate level of protection in accordance with applicable law.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Data retention
        </Typography>
        <Typography variant="body1" paragraph>
          We retain personal data as needed to provide services, comply with legal obligations, resolve disputes, and enforce agreements. Retention periods vary depending on the type of data and legal requirements.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement administrative, technical, and physical safeguards to protect personal data. Access to personal data is limited to authorized personnel. While we strive to protect your information, no system is completely secure.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Children
        </Typography>
        <Typography variant="body1" paragraph>
          Our services are not directed to children under the age of 13. We do not knowingly collect personal data from children. If we become aware of such collection, we will take steps to delete the information.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Your rights and choices
        </Typography>
        <Typography variant="body1" paragraph>
          Depending on your jurisdiction, you may have rights to access, correct, delete, restrict or object to processing, and data portability. To exercise these rights, or for questions about this policy, contact us using the information below.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Contact us
        </Typography>
        <Typography variant="body1" paragraph>
          For privacy-related requests or questions, please use the app's Contact page or email us at privacy@wefinance.example (replace with your official contact address). When contacting us, include enough information to allow us to verify your identity and respond to your request.
        </Typography>

        <Typography variant="body2" color="textSecondary" paragraph>
          This policy may be updated from time to time. We will post changes on this page with a revised "Last updated" date.
        </Typography>

        <Box mt={4}>
          <Button 
            onClick={() => !mobileView ? navigate("") : navigate("mobile", {page: 'Home'})}
            variant="contained"
            color="primary"
            style={{marginTop: 16}}
          >
            Back to Home
          </Button>
        </Box>
      </Content>
    </Container>
  );
}
