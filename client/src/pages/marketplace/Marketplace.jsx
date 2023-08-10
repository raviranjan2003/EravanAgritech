import React, { useEffect } from "react";
import "./Marketplace.css";
import Header from "../../components/header";
import CropCard from "../../components/CropCard";


export default function Marketplace(){

    const crops = [
        { cropName: 'Amaranthus Green', price: 10, imgUrl : "/marketplace_images/Amaranthus green.png" },
        { cropName: 'Amaranthus', price: 8,  imgUrl : "/marketplace_images/Amaranthus.png" },
        // Add more crop data as needed
      ];
    
      return (
        <>
            <Header />
            <div className="f_container">
                {crops.map((crop) => (
                    <CropCard 
                        cropName={crop.cropName} 
                        imgUrl = {crop.imgUrl}
                    />
                ))}
            </div>
        </>
      );

}