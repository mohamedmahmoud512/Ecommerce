import React from 'react'
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom';
export default function ProductUser({ children }) {
    try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        if(decoded.role == "user"){
            return children
        }
    } catch (error) {
        localStorage.clear();
        return <Navigate to="/log/login"/>
    }
}
