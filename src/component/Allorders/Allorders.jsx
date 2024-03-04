import React from 'react'
import logo from "../../images/freshcart-logo.svg"
import { notification } from '../Products/Products'
import { useNavigate } from 'react-router-dom';
export default function Allorders() {
    let navigator = useNavigate();
    return (
        <div className='container d-flex align-items-center flex-column'>
            <h1 className='text-center text-main mt-3'>Done</h1>
            <img src={logo} alt="logo" className='w-50' />
            {notification("Done")}
            {setTimeout(() => {
                navigator("/Home")
            }, 3000)}
        </div>
    )
}