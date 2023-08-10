import React from "react";
import "./AdminPanel.css";
import TableAdminPanel from "../../components/TableAdminPanel";

export default function AdminPanel() {
    return (
        <>
            <h1>Admin Panel</h1> 
            <div className="parent">
            <div className="container">
                <button>AkshyaPatra</button>
            </div>
            <div className="container">
                <button>Buyers</button>
            </div>
            <div className="container">
                <button>Sellers</button>
            </div>
            </div>
            <div className="table-container">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                </tr>
                <TableAdminPanel 
                    name = "Ravi"
                    email = "ravi@gmail.com"
                    mobileNo = "123456" 
                />
            </table>
            </div>
        </>
    )
}