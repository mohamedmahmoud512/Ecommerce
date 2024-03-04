import React from 'react'
import logo from "../../images/freshcart-logo.svg"
function Footer() {
    return (
        <div className="w-100 bg-main-light">
            <div className='container'>
                <h3 className='w-100'>Get the FreshCart app</h3>
                <p className="mt-5 w-100">We will send you a link. open it on your phone to download the app.</p>
                        <div className="d-flex justify-content-center align-items-center px-5">
                            <img src={logo} alt="logo" className='w-25 mt-5 ' />
                        </div>
                        <div className="container d-flex justify-content-evenly align-items-center">
                        <i class="cursor-pointer fa-brands fs-2 mt-5 fw-bold fa-facebook"></i>
                        <i class="cursor-pointer fa-brands fs-2 mt-5 fw-bold fa-instagram"></i>
                        <i class="cursor-pointer fa-brands fs-2 mt-5 fw-bold fa-whatsapp"></i>
                        <i class="cursor-pointer fa-brands fs-2 mt-5 fw-bold fa-telegram"></i>
                        <i class="cursor-pointer fa-brands fs-2 mt-5 fw-bold fa-linkedin"></i>
                        </div>
                    </div>
                </div>
    )
}

export default Footer