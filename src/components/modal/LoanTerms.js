import * as React from 'react';
import Box from '@mui/material/Box';
import '../../App.css';
import { Button } from '@material-ui/core';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { AppContext } from '../../context/AppContext';
export default function LoanTerms(props) {
    const {data:{isLoanTermsAccepted}} = props;
    const { setDialogData } = React.useContext(AppContext); 
    React.useEffect(()=>{},[])
    const isLoanAccepted =(status)=>{
        isLoanTermsAccepted(status);
    }
    return (
        <Box textAlign='center'>
            <div className="fontBold">
            We Finance Group- Registration Number 2018/176899/06.
            Tel: 011 256 9000 Address: 59 16th Road, Midrand, South Africa Postal: Private Bag X170, Halfway House, 1685, South Africa
            Refer to the We Finance Group website for Directors and Company Secretary details: www.wefinancegroup.org
            NCR Registration number: NCRCP7638. We Finance Group is an Authorized Financial Services and Credit Provider. RDC91017/16
            534,009,717

            Version: 3.0.0
            Page 1 of 4
            TERMS AND CONDITIONS FOR YOUR USE OF WE FINANCE GROUP ONLINE
            TRANSACTIONS CHANNELS ("TERMS")
            1 INTRODUCTION
            1.1 These Terms apply to all persons who use any of the Online
            Transactions Channels (defined in clause 2.1.6 below) offered by We Finance Group(registration number: 2018/176899/06) ("We Finance group", "us", "we" or "our").
            1.2 If you are younger than 18, you need to get the consent of your
            legal guardian or parent to use our Online transactions Channels.
            1.3 You will be bound by these Terms when you: (i) accept these Terms
            in the format prescribed by We Finance Group; or (ii) register to use
            any Online Transactions Channel; or (iii) are able to access and use
            any Online Transactions Channels; or (iv) when you actually use any
            Online Transactions Channels.
            1.4 These Terms will apply regardless of the Device that you use to
            connect to the Online Transactions Channels. Unless otherwise stated,
            these Terms apply to the use of all Online Transactions Channels.
            However, some of these Terms apply only to certain Online
            Transactions Channels and different terms may apply depending on
            purpose for which you are accessing any of the Online Transactions
            Channels. In other words, if you do not use one of the Online
            Transactions Channels, the terms and conditions that apply only to that
            Online Transactions Channel will not apply to you and if you do not
            take up certain We Finance Group Products or services from We Finance Group, certain terms and conditions that apply to those We Finance Group
            Products or services will not apply to you.
            1.5 These Terms will be made available to you on our website: https://
            www.wefinancegroup.org ("Site"), on the Mobile Transactions Application
            or on request.
            1.6 These Terms form an agreement between you and us, so please
            make sure that you read them carefully and understand all of
            the terms and conditions set out below. Important clauses, which
            may limit We Finance Group responsibility or involve some risk for you,
            are reflected in bold. You agree to pay special attention to these
            clauses.
            1.7 Nothing in these Terms is intended to or must be understood to
            unlawfully restrict, limit or avoid any rights or obligations, as the
            case may be, created in terms of the Consumer Protection Act, 2008
            or Chapter VII of the Online Transactions and Communications
            Act, 2002, where such legislation is applicable.
            1.8 We may change these Terms from time to time (in accordance
            with clause 26) and the latest version will apply.
            2 DEFINITIONS
            2.1 In these Terms, unless the context indicates otherwise, the following
            capitalized words will have the meanings given to them –
            2.1.1 "Access Code" means your secret passwords that you use to access
            any of the Online Transactions Channels and includes examples
            such as your personal identification number (PIN), one-time PIN
            (OTP),card numbers, user names,
            passwords, and the Mobile Transactions Application digital identity code;
            2.1.2 "We Finance Group Product" means any product or service offered by
            We Finance Group to its customers from time to time (see Site for list
            of We Finance Group Products). Examples of these products are short term investments and loan;
            2.1.3 "App Store" means a mobile application store from which you can
            download the Mobile Transactions Application;
            2.1.4 "Customer" means an individual person that is a client of We Finance Group, including an investor;
            2.1.5 "Device" means the equipment (including operating software) that
            you use to access the Online Transactions Channels and includes
            examples such as a personal computer, laptop, cell phone, smart
            phone, tablet, smart television, or any other similar technology;
            2.1.6 "Online Transactions Channels" means any of the self-service remote
            transactions channels made available by We Finance Group to you from time
            to time, in terms of which you may access the We Finance Group Products
            through the use of your Device including examples such as USSD, the
            Mobile Transactions Application and Online Transactions;
            2.1.7 "Online Transactions" means the Internet transactions services made
            available to Customers by We Finance Group from time to time via the
            Site;
            2.1.8 "Mobile Transactions Application" means We Finance Group mobile transactions
            application that can be downloaded on your smart phone or tablet
            from App Stores;
            2.1.9 "Product Features" means, the rules and features of each We Finance Group Product, which can be accessed on the Site;
            2.1.10 "Product Terms" means the terms and conditions that apply to an
            We Finance Group Product, which can be accessed on the Site;
            2.1.11 "USSD" means Unstructured Supplementary Service Data, which is a
            form of communication technology in terms of which you can send
            text messages from your mobile phone to an application program in
            We Finance Group network;
            2.1.12 "Value-Added Services" means the facilitation by We Finance Group of the
            sale of certain products and services (for example, prepaid airtime),
            made available via the Online Transactions Channels from time to
            time;
            2.1.13 "Verification Mechanism" means a mechanism that will be used
            by We Finance Group to verify your identity when you: (i) access any
            Online Transactions Channels; and (ii) issue instructions to We Finance Group through Online Transactions Channels, and includes the use of
            Access Codes (for example, OTPs); and
            2.1.14 "you", "your", "yours" or "yourself" means the person reading this
            document and using any of the Online Transactions Channels and
            where applicable, includes a Customer
            3 PRODUCT TERMS AND OTHER TERMS THAT APPLY
            3.1 You understand that your access to and use of any of the Online
            Transactions Channels is provided subject to these Terms, and that in
            addition, your access to and use of any of the We Finance Group Products
            is subject to the applicable Product Terms.
            3.2 Some products and services made available to you on our Online
            Transactions Channels may be provided by third parties and may be
            subject to their own terms and conditions.
            3.3 These Terms apply together with any Product Terms and other terms
            and conditions that govern our services, products and relationship
            with you. You must read these Terms together with all these other
            relevant terms and conditions. If there is a conflict between these
            Terms and any Product Terms, the provisions of the Product Terms
            shall apply, except if the conflict relates to the use of an Online
            Transactions Channel, in which case these Terms will apply.
            4 REGISTER TO USE THE ONLINE TRANSACTIONS CHANNELS
            4.1 In order to use an Online Transactions Channel, you are required
            to complete the relevant registration process and provide the
            information and documentation required by We Finance Group from
            time to time. You may only access and use the Online Transactions
            Channels which you registered for.
            4.2 To register to use an Online Transactions Channel, you will be
            required to provide certain personal information which is protected
            by our Privacy Policy.
            4.3 If you have any questions or would like more information about
            our Online Transactions Channels and We Finance Group Products, please
            visit the Site or phone our Customer Contact Centre at the details
            provided in clause 32 (Customer Contact Information) below.
            5 FEES FOR USING THE ONLINE TRANSACTIONS CHANNELS
            The details of the fees you must pay for using the Online Transactions
            Channels and the We Finance Group Products are set out in our Pricing
            Brochure (as amended by We Finance Group from time to time). These
            fees may include a service fee for the use of the Online Transactions
            Channel and a transaction fee for the transactions you perform using
            the Online Transactions Channel. If you don’t pay the fees, we may
            refuse to give you access to the Online Transactions Channels.
            6 NO PROFESSIONAL ADVICE
            All content on the Online Transactions Channels is only an invitation
            for you to do business with us. Nothing contained on the Online
            Transactions Channels constitutes professional advice or an offer which
            is meant to get you to buy or sell something and is not to be relied
            on in making an investment or other decision. You should engage
            a financial planner and/or financial advisor to provide you with
            financial advice in respect of any financial decisions that you may
            take.
            7.1 Investor must provide correct information such as account number and up to date information about the state of the account whether active or inactive
            7.2 he/she alone is responsible for deciding what transactional
            authorities must be given to other people.
            7.3 We Finance Group will accept and process all instructions relating to
            the withdrawal (subject to any transacting
            rules in the Product Features and any transactional authorities/
            limitations which the investor has set in relation
            to the Account) irrespective of whether such instructions
            were issued without the knowledge of the investor
            7.4 there is risk involved in giving another person access to your
            account and this must be considered when setting limits or
            restrictions for Accounts;


            </div>
            <div>
                <Button variant="contained" onClick={()=>isLoanAccepted(false)} style={{backgroundColor:'tomato',color:'#fff',margin:5}}  component="label"startIcon={<CancelIcon style={{fill: "#fff"}}/>}>
                    <span className="fontBold">I DON'T AGREE</span>
                </Button>
                <Button variant="contained" onClick={()=>isLoanAccepted(true)} style={{backgroundColor:'green',color:'#fff',margin:5}}  component="label"startIcon={<CheckCircleOutlinedIcon style={{fill: "#fff"}}/>}>
                    <span className="fontBold">I AGREE</span>
                </Button>
            </div>
        </Box>
    );
}