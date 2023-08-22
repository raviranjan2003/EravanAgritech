import React , { useState }from "react";
import "./AdminPanel.css";
import TableAdminPanel from "../../components/TableAdminPanel";
import axios from "axios";
// import { set } from "mongoose";

export default function AdminPanel() {

    const [akshyapatra , setAkshyapatra] = useState(null);
    const [value , setValue] = useState(null);
    // const [sellers , setSellers] = useState(null);

    // const handleAkshyapatra = async () => {
    //     try {
    //         await axios.post("http://localhost:5000/adminpanel", { type : "Akshyapatra" })
    //         .then((response) => {
    //             // console.log(response.data.users);
    //             setAkshyapatra(response.data.users);
    //             // setValue(null); 
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleClick = async (e, type) => {
        try {
            if(type === "Akshyapatra") {
                await axios.post("http://localhost:5000/adminpanel", { type })
                .then((response) => {
                // console.log(response.data.users);
                setAkshyapatra(response.data.users);
                setValue(null);
            })
            }else{
                await axios.post("http://localhost:5000/adminpanel", { type })
                .then((response) => {
                // console.log(response.data.users);
                setAkshyapatra(null);
                setValue(response.data.users);
                // setValue(null);
            })
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    // const handleSellers = async () => {
    //     try {
    //         await axios.post("http://localhost:5000/adminpanel", { type : "Seller" })
    //         .then((response) => {
    //             // console.log(response.data.users);
    //             setAkshyapatra(null);
    //             setValue(response.data.users);
    //             // setValue(null);
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>
            <h1>Admin Panel</h1> 
            <div className="parent">
                <div className="container">
                    <button onClick={ (e) => handleClick(e, "Akshyapatra") }>AkshyaPatra</button>
                </div>
                <div className="container">
                    <button onClick={ (e) => handleClick(e, "Buyer") }>Buyers</button>
                </div>
                <div className="container">
                    <button onClick={ (e) => handleClick(e, "Seller") }>Sellers</button>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Mobile No</th>
                        <th>Quantity</th>
                    </tr>
                    {/* {  buyers?.map( buyer => {
                            <TableAdminPanel 
                            name={buyer.name}
                            mobileNo={buyer.mobileNo}
                            quantity={buyer.quantity}
                            />
                    }) } */}
                        {/* { buyers ? buyers.map( buyer => {
                            return (
                                <tr>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.mobileNo}</td>
                                    <td>{buyer.quantity}</td>
                                </tr>
                            )
                        }) : sellers.map( seller => {
                            return (
                                <tr>
                                    <td>{seller.name}</td>
                                    <td>{seller.mobileNo}</td>
                                    <td>{seller.quantity}</td>
                                </tr>
                            )
                        }) } */}
                        { value && value.map(( user ) => {
                            return(
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.mobileNo}</td>
                                    <td>{user.quantity}</td>
                                </tr>
                            )
                        })}
                        { akshyapatra && akshyapatra.map(( user ) => {
                            return (
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.mobileNo}</td>
                                    <td>{user.quantity}</td>
                                </tr>
                            )
                        })}
                </table>
            </div>
        </>
    )
}



