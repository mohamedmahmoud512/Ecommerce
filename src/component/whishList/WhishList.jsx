import axios from 'axios'
import React, { useContext, useState } from 'react'
import { context } from '../context/Context';
import { NavLink } from 'react-router-dom';
import { notification } from '../Products/Products';
let arr = [];
export function getWhish(whish) {
    axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers: { token: localStorage.getItem('token') } })
        .then(function ({ data }) {
            whish.setWishList(data.count);
            data.data.map((x) => {
                arr.push(x);
            })
            // console.log(data.data);
        }).catch((err) => {
            console.error(err);
        })
}
export default function WhishList() {
    let [wishData, setWishData] = useState([]);
    let whish = useContext(context);
    axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers: { token: localStorage.getItem('token') } })
        .then(function ({ data }) {
            whish.setWishList(data.count);
            setWishData(data.data)
            // console.log(data.data);
        }).catch((err) => {
            console.error(err);
        })
    function removeFromWishlist(id) {
        axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: { token: localStorage.getItem('token') } })
            .then(({ data }) => {
                console.log(data);
                notification(data.message);
                setWishData(data.data)
            }).catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className='container mt-5 p-2'>
            <h1 className='mt-3'>My Wishlist</h1>
            <div className="row g-5">
                {wishData.map((item) => {
                    return <div className="col-md-4">
                        <img src={item.imageCover} alt="imageCover" className='w-100' />

                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className=' text-main'>{item.title}</h3>
                            <button className='btn w-25 btn-outline-danger' onClick={() => { removeFromWishlist(item.id) }} >remove</button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className='fs-5'>Price : {item.price}</p>
                            <p className='fw-bold'>rating : {item.ratingsAverage} <i class="fa-solid fa-star rating-color"></i> </p>
                        </div>
                    </div>
                })}
            </div>
        </div >
    )
}
