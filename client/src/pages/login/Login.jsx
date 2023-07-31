import React , { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login(){

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [message , setMessage] = useState("");

    const handleLogin = async (e) => {
        try{
            await axios.post('http://localhost:5000/login' , {email , password})
            .then((response) => {
                console.log(response.data);
                setMessage(response.data.message);
                localStorage.setItem("token" , response.data.token);
                e.target.reset();
            })
        }catch(err){
            setMessage("Invalid username or password");
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <div class="box-login"> 
                    <div class="form">
                        <h2>LOGIN</h2>
                        <div class="inputBox">
                            <input 
                            type="email" 
                            required="required" 
                            id="email" 
                            name="email" 
                            autocomplete="off" 
                            onChange={(e)=> setEmail(e.target.value)}
                            autoFocus />
                            <span>Email</span>
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
                        <div class="links-login">
                            <a href="#">Forgot Password ?</a>
                            <a href="#">SignUp</a>
                        </div>
                        <div class="submit">
                            <button type="submit" >LOGIN</button>
                        </div>
                        <p class="message">{message}</p>
                    </div>
                </div>
            </form> 
        </>
    )
}