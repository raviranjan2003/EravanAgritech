import React from "react";
import "./TableAdminPanel.css";

export default function TableAdminPanel(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.mobileNo}</td>
        </tr>
    )
}