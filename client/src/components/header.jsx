import { React, useEffect } from "react";
import "./header.css";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Header(){

    useEffect(async()=>{
        const token = localStorage.getItem('token');
        console.log(token);
        const decoded = jwt_decode(token);
        console.log(decoded);
        await axios.post("http://localhost:5000/getuserbyid" , {id:decoded.id})
        .then((response) => {
            console.log(response);
        })
    },[])    

    const styles = {
        color: "#ffffff",
        width: "80px"
    }
    return(
        <>
            <div class="head1">
                <div class="headimg"><img src="./image/logo.png" alt="logo" style={{width:styles.width}} /></div>
                <div class="eravanhead">EraVAN</div>
                <div class="phone"><a href="#"> <i class="fa-solid fa-phone fa-fade" style={{color:styles.color}}></i>  7424953939 </a></div>
                <div class="mail"><a href="#"> <i class="fa-solid fa-envelope fa-bounce" style={{color:styles.color}}></i> <span class="mailshow"> <span class="__cf_email__" data-cfemail="fc95929a93bc998e9d8a9d92d29592">info@eravan.in</span></span> </a></div>
                <div class="mail">
                    <a href="#"> <i class="fa-solid fa-envelope" style={{color:styles.color}}></i>   info@eravan.in </a>
                </div> 
    
                <div class="place">
                    <a href="#"> <i class="fa-sharp fa-solid fa-location-dot fa-fade" style={{color:styles.color}}></i>Jaipur, Banglore, Pune</a>
                </div>
            </div>
            <div class="head2">
                <div class="head2headings1"><a href="/">HOME</a></div>
                <div class="head2headings2"><a href="/akshayapatra">GET AKSHAY-PATRA</a></div>
                <div class="head2headings"><a href="/margdarshak">MARG-DARSHAK </a></div>
                <div class="head2headings"><a href="/marketplace">MARKET-PLACE</a></div>
                <div class="head2headings"><a href="/pricetrend">PRICE TREND</a></div>
                <div class="head2headings5" ><a id="register-link" href="/register">REGISTER</a></div>
                {/* <div class="head2headings5"><a href="/login">LOGIN</a></div>  */}
            </div>
      </>
    )
}
export default Header;