import React, { useState , useEffect } from 'react';
import "./CropCard.css";
import { useNavigate } from 'react-router-dom';


const CropCard = ({ cropName, imgUrl }) => {
    // console.log(imgUrl)
    const [ isUserLoggedIn , setIsUserLoggedIn]= useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsUserLoggedIn(true);
        }

    },[])
    const navigate = useNavigate();

    const handleBuy = () => {
        isUserLoggedIn ? navigate("/buy") : navigate("/login");
    }
    const handleSell = () => {
        navigate("/login");
    }

  return (
    <>
        <div className="card">
            <img src={imgUrl} alt="eravan" />
            <div className="container">
                <h3><b>{cropName}</b></h3>
                <button className="hide" onClick={handleBuy}>Buy</button>
                <button className="hide" onClick={handleSell}>Sell</button>
            </div>
        </div>
    </>
  );
};

export default CropCard;