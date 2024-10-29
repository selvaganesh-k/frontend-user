import React from "react";
import './LoginIcon.css';
export default function LoginIcon({icon}){
    const handleLogout=()=>{
        const confirmLogout=window.confirm('Are you sure ?');
        if(confirmLogout){
            localStorage.removeItem('LoginUser');
        window.location.href='/login';
        }
    }
        return(
            <a className="nav-link" id="loginicon" onClick={handleLogout}  href="#">{icon}</a>
        )
}