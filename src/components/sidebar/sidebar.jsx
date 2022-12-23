// import '../node_modules/react-toastify/dist/ReactToastify.css'
import '../../../node_modules/react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'
import React, { useContext, useState } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import "./sidebar.css"
import { toast } from 'react-toastify';
import { ContactContext } from '../Context/ContactContext';
toast.configure();

export default function Sidebar() {
    const { setcontactdata, seldash, setseldash } = useContext(ContactContext)
    const navigate = useNavigate();

    return (
        <div id='sidebar-wrap'>
            <div id='logo'>
                <img src="/logo.png" alt="" />
            </div>
            <div className='Sidebar-options' id={seldash ? "dashboard-cont-select" : "dashboard-cont"} onClick={() => { setseldash(true); }}>
                <img src="/dashboard.png" alt="dashboard" /><span onClick={() => { }}>Dashboard</span>
            </div>
            <div className='Sidebar-options' id={seldash ? "contact-cont" : "contact-cont-select"} onClick={() => { setseldash(false); }}>
                <img src="/Vector.png" alt="contact" /><span>Total contacts </span>
            </div>
            <div id='logout'>
                <img src="/logout.png" alt="logout" /><span onClick={() => {
                    window.localStorage.removeItem('jwt');
                    window.localStorage.removeItem('user_name');
                    sessionStorage.clear();
                    localStorage.clear();
                    setcontactdata([])
                    navigate('/');
                    setseldash(false)
                    toast.success("Logged Out", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }}>Logout</span>
            </div>
        </div>
    )
}
