import React , { useState } from "react";
import "./Register.css";
import axios from "axios";
// import { set } from "mongoose";

export default function Register(){

    const [userName , setUserName] = useState("");
    const [email , setEmail] = useState("");
    const [mobileNo , setMobileNo] = useState("");
    const [password , setPassword] = useState("");
    const [message , setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/register' , {userName , email , mobileNo , password})
            .then((response) => {
                setMessage(response.data.message);
                e.target.reset();
                // console.log(response);
                // console.log(response.data.message)
                // if (response.data.isError){
                //     setMessage(response.data.message);
                // }else{
                //     // setMessage(response.data.message);
                //     console.log(response.data.message);
                //     e.target.reset();
                // }
            })
        }catch(err){
            setMessage("Registration Failed");
        }
    }

    return (
        <>
            <form onSubmit={handleRegister} >
                <div class="box"> 
                    <div class="form" method="POST" >
                        <h2>Register With Us</h2>
                        <div class="inputBox">
                            <input 
                            type="text" 
                            required="required" 
                            id="name" 
                            name="name" 
                            onChange={(e) => setUserName(e.target.value)}
                            autoFocus />
                            <span>Name</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input 
                            type="email" 
                            required="required" 
                            id="email" 
                            name="email" 
                            autocomplete="off" 
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus />
                            <span>Email</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input 
                            type="text" 
                            required="required" 
                            id="mobile-no" 
                            name="mobileNo" 
                            autocomplete="off" 
                            onChange={(e)=> setMobileNo(e.target.value)}
                            autoFocus />
                            <span>Mobile No</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input 
                            type="password" 
                            required="required" 
                            id="password" 
                            name="password" 
                            autocomplete="off" 
                            onChange={(e)=> setPassword(e.target.value)}
                            autoFocus />
                            <span>Password</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input 
                            type="password" 
                            required="required" 
                            id="cpassword" 
                            name="cpassword" 
                            autocomplete="off" 
                            autoFocus />
                            <span>Confirm Password</span>
                            <i></i>
                        </div>

                        <div class="links">
                            <a href="#">Already have an account ?</a>
                            <a href="/login">SignIn</a>
                        </div>
                        <button type="submit">REGISTER</button>
                        <p class="message">{message}</p>
                    </div>
                </div>
            </form>
        </>
    )
}