import React from "react";
import "./TableAdminPanel.css";

export default function TableAdminPanel(props) {
    console.log(props);
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.mobileNo}</td>
            <td>{props.quantity}</td>
        </tr>
    )
}