import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from "../../../images/freshcart-logo.svg";
function LogNav() {
    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="home"><img src={logo} alt="logo" /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse justify-content-end me-5" id="navbarSupportedContent">
                    <ul className="navbar-nav me-1 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/log/login">login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/log/signup">signup</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default LogNav