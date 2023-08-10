import React , { useState } from "react";
import "./Buy.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Buy(){

    const [name , setName] = useState("");
    const [mobileNo , setMobileNo] = useState("");
    const [bussinessName , setBussinessName] = useState("");
    const [quantity , setQuantity] = useState("");
    const [isBuyer , setIsBuyer] = useState(false);
    const [isSeller , setIsSeller] = useState(false);
    const [frequency , setFrequency] = useState("");
    const [message , setMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            isBuyer,
            isSeller,
            name,
            mobileNo,
            bussinessName,
            quantity,
            frequency
        }
        try{
        await axios.post('http://localhost:5000/buy', data)
        .then((response)=>{
            console.log(response.data.message);
            setMessage(response.data.message);
            e.target.reset();
            setTimeout(() => {
                navigate("/marketplace");
            },2000)
        })
        }catch(err){
            setMessage("Order Placed Failed");
        }
    }
    const handleCheckboxBuyer = async (e) => {
        // console.log(e);
        if(e.target.checked) {
            setIsBuyer(true);
        } else {
            setIsBuyer(false);
        }
    }
    const handleCheckboxSeller = async (e) => {
        // console.log(e);
        if(e.target.checked) {
            setIsSeller(true);
        } else {
            setIsSeller(false);
        }
    }
    const handleDropdown = async (e) => {
        // console.log(e.target.value);
        setFrequency(e.target.value);
    }
    
    return (
        <>
            <form onSubmit={handleSubmit} >
                <div class="box"> 
                    <div class="form" method="POST" >
                        <h2>Place Order</h2>
                        <div class="inputBox">
                            <span>Buyer</span>
                            <input 
                            type="checkbox" 
                            onChange={(e) => handleCheckboxBuyer(e)}
                            id="buy" 
                            name="buy" 
                            value="Buyer" />
                        </div>
                        <div class="inputBox">
                            <span>Seller</span>
                            <input 
                            type="checkbox" 
                            onChange={(e) => handleCheckboxSeller(e)}
                            id="sell" 
                            name="sell" 
                            value="Seller" />
                        </div>
                           
                        <div class="inputBox">
                            <input 
                            type="text" 
                            required="required" 
                            id="name" 
                            name="name" 
                            onChange={(e) => setName(e.target.value)}
                            autoFocus />
                            <span>Name</span>
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
                             />
                            <span>Mobile No</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input 
                            type="text" 
                            required="required" 
                            id="mobile-no" 
                            name="mobileNo" 
                            autocomplete="off" 
                            onChange={(e)=> setBussinessName(e.target.value)}
                             />
                            <span>Bussiness Name</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input 
                            type="text" 
                            required="required" 
                            id="mobile-no" 
                            name="mobileNo" 
                            autocomplete="off" 
                            onChange={(e)=> setQuantity(e.target.value)}
                             />
                            <span>Quantity</span>
                            <i></i>
                        </div>
                            <select name="select" onChange={(e)=>handleDropdown(e)}>
                                <option value="select">select</option>
                                <option value="Per Day">Per Day</option>
                                <option value="Per Week">Per Week</option>
                                <option value="Per Month">Per Month</option>
                            </select>
                        

                        <button type="submit">SUBMIT</button>
                        {message && <p class="message">{message}</p>}
                    </div>
                </div>
            </form>
        </>
    );
}