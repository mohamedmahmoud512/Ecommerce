import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
export default function Product() {
    let prams = useParams();
    let [oneCate, setOneCate] = React.useState({});
    async function GetOneCateDetails(prams) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${prams.id}`);
        setOneCate(data.data);
    }
    useEffect(() => {
        GetOneCateDetails(prams)
    }, [])
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date(oneCate.updatedAt);
    let month = months[date.getMonth()];
    let day = days[date.getDay()];
    let FullDate = date.getDate();
    let year = date.getFullYear();
    return (
        <>
            <div className="container mt-5 vh-100">
                <div className="row">
                    <div className="col-md-12 position-relative d-flex align-items-center">
                        <img src={oneCate.image} alt={oneCate.slug} className='w-50' height="400px" />
                        <h2 className='w-100 text-center bottom-0 '>{oneCate.name}</h2>
                    </div>
                </div>
                <p className='w-100 mt-5 text-center'>last Update at <span className='text-main fw-bold'>{day} {FullDate} {month} {year}</span> </p>
            </div>
        </>
    )
}
