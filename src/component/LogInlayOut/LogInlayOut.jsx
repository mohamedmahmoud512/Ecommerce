import React from 'react'
import { Outlet } from 'react-router-dom'
import LogNav from '../Navbar/logNav/LogNav'
import Footer from '../Footer/Footer'

function LogInlayOut() {
    return (
        <>
            <LogNav />
            <Outlet />
            <Footer />
        </>
    )
}

export default LogInlayOut