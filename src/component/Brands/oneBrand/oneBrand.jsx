import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
export default function OneBrand() {
    let prams = useParams();
    let [oneBrand, setOneBrand] = React.useState({});
    async function GetOneBrandDetails(prams) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${prams.id}`);
        // console.log(data);
        setOneBrand(data?.data);
    }
    useEffect(() => {
        GetOneBrandDetails(prams)
    }, [])
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date(oneBrand.updatedAt);
    let month = months[date.getMonth()];
    let day = days[date.getDay()];
    let FullDate = date.getDate();
    let year = date.getFullYear()
    console.log(month);
    console.log(day);
    console.log(FullDate);
    console.log(year);
    return (
        <>
            <div className="container d-flex align-items-center justify-content-center">
                <img src={oneBrand.image} alt={oneBrand.slug} className='w-25' />
            </div>
            <p className='w-100 text-center mt-5'>last Update at <span className='text-main fw-bold'>{day} {FullDate} {month} {year}</span></p>
        </>
    )
}