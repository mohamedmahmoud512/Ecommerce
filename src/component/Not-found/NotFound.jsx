import React from 'react'
import img from "../../images/error.svg"
function NotFound() {
    return (
        <div className='container p-5'>
            <div className="row justify-content-center align-items-center">
                <img src={img} alt="Error" className='w-75' />
            </div>
        </div>
    )
}

export default NotFound