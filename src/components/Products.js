import React from "react";
import Header from './Header';
import Footer from './MainPageFooter';
export default function Product() {
    return (
        <div>
            <Header/>
            <div style={{height:1000}}>
              <p style={{marginTop:100}}><h1>PRODUCT PAGE</h1></p>
            </div>
            <Footer/>
        </div>
    );
}