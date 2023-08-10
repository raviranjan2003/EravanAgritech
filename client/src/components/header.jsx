import { React, useEffect, useState } from "react";
import "./header.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {

    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    const getuser = async (id) => {
        await axios
            .get(`http://localhost:5000/getuserbyid/${id}`)
            .then((res) => {
                setUsername(res.data.userName);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            getuser(decoded.id);
        }
    }, []);

     
    const toggleMenu = ()=>{
        // console.log(subMenu);
        document.getElementById("subMenu").classList.toggle("open-menu");
        
    }
    const styles = {
        color: "#ffffff",
        width: "80px"
    }
    return (
        <>
            <div class="head1">
                <div className="headimg"><img src="./image/logo.png" alt="logo" style={{ width: styles.width }} /></div>
                <div className="eravanhead">EraVAN</div>
                <div className="phone"><a href="#"> <i class="fa-solid fa-phone fa-fade" style={{ color: styles.color }}></i>  7424953939 </a></div>
                <div className="mail"><a href="#"> <i class="fa-solid fa-envelope fa-bounce" style={{ color: styles.color }}></i> <span class="mailshow"> <span class="_cf_email_" data-cfemail="fc95929a93bc998e9d8a9d92d29592">info@eravan.in</span></span> </a></div>
                <div className="mail">
                    <a href="#"> <i class="fa-solid fa-envelope" style={{ color: styles.color }}></i>   info@eravan.in </a>
                </div>

                <div class="place">
                    <a href="#"> <i class="fa-sharp fa-solid fa-location-dot fa-fade" style={{ color: styles.color }}></i>Jaipur, Banglore, Pune</a>
                </div>
            </div>
            <div class="head2">
                <div className="head2headings1"><a href="/">HOME</a></div>
                <div className="head2headings2"><a href="/akshyapatra">GET AKSHAY-PATRA</a></div>
                <div className="head2headings"><a href="/margdarshak">MARG-DARSHAK </a></div>
                <div className="head2headings"><a href="/marketplace">MARKET-PLACE</a></div>
                <div className="head2headings"><a href="/pricetrend">PRICE TREND</a></div>
                {/* <button onClick={toggleMenu}> toggle</button> */}
                {
                    username ?
                        <>
                            <div class="head2headings5" ><a id="register-link" href="#" onClick={toggleMenu}>{username}</a></div>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                        :
                        <div class="head2headings5" ><a id="register-link" href="/register">REGISTER</a></div>
                }
                <div className="sub-menu-wrap" id="subMenu">
                    <div className="sub-menu">
                        <div className="user-info">
                        <h3>{username}</h3>
                        {/* <h3>hello</h3> */}
                        </div>
                        <hr />
                        <a href="#" className="sub-menu-link">
                            <p>Edit Profile</p> 
                            <span> {">"} </span>
                        </a>
                        <a href="#" className="sub-menu-link">
                            <p>Settings & Privacy</p> 
                            <span> {">"} </span>
                        </a>
                        <a href="#" className="sub-menu-link">
                            <p>Help & Support</p> 
                            <span> {">"} </span>
                        </a>
                        <a href="#" className="sub-menu-link">
                            <p>Logout</p> 
                            <span> {">"} </span>
                        </a>
                    </div>
                </div>
                </div>
        </>
    )
}
export default Header;