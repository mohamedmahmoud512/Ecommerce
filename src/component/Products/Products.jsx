import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query';
import Loading from '../loading/Loading';
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { context } from '../context/Context';
import { getCart } from '../cart/Cart';
import { getWhish } from '../whishList/WhishList';
export let notification = (not) => {
    toast.success(not, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
}
export function addToCart(productId, loud) {
    loud?.setCartLoud(true);
    // console.log(id);
    axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, { headers: { token: localStorage.getItem("token") } })
        .then(({ data }) => {
            notification(data.message);
            loud?.setCartLoud(false);
        })
        .catch(({ response }) => {
            console.log(response.data.message);
        })
}
export function addToWhishList(productId) {
    axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId: productId }, { headers: { token: localStorage.getItem("token") } })
        .then((response) => {
            notification(response.data.message);

            // console.log(response.data.status);
        }).catch((err) => { console.error(err); });
}
function Products() {
    let loud = useContext(context);
    getCart(loud);
    getWhish(loud);
    function GetProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }
    let { data, isLoading } = new useQuery("categories", GetProducts)
    if (isLoading) {
        return <Loading />
    } else {
        return (
            <>
                <div className="container mt-5">
                    <div className="row g-5">
                        {data?.data?.data.map((products) => {
                            // console.log(products);
                            return <div className="col-md-3 mb-3 p-5 product position-relative cursor-pointer" key={products._id}>
                                <Link to={`/products/${products._id}`} key={products._id}>
                                    <img src={products.imageCover} className='m-auto w-100' />
                                    <p className='text-main fw-bold'>{products.category?.name}</p>
                                    <h5 className=''>{products.title}</h5>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p>{products.price} EGP</p>
                                        <p><i className='fa-solid fa-star rating-color me-1'></i>{products.ratingsAverage}</p>
                                    </div>
                                </Link>
                                <button className='btn bg-main text-light w-100' onClick={() => { addToCart(products._id, loud) }}>{loud.cartLoud ? <i class="fa-solid fa-spinner fa-spin"></i> : "Add to Card"}</button>
                                <i className={`fa-solid fa-heart position-absolute`} onClick={() => { addToWhishList(products._id) }}></i>
                            </div>
                        })}
                    </div>
                </div>
            </>
        )
    }
}
export default Products