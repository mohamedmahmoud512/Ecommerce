import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { addToCart, addToWhishList } from './Products';
import { context } from '../context/Context';
import { getCart } from '../cart/Cart';
import { getWhish } from '../whishList/WhishList';
export default function Product() {
    let loud = useContext(context);
    getCart(loud);
    getWhish(loud);
    let prams = useParams();
    let [product, setProduct] = React.useState([]);
    async function GetProductDetails(prams) {

        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${prams.id}`);
        setProduct(data);
    }
    useEffect(() => {
        GetProductDetails(prams)
    }, [])
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1600,
    };
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <Slider {...settings}>
                            {product?.data?.images.map((img) => {
                                return <img src={img} alt={`img-${Math.random().toString(36).slice(2)}`} className="w-100" />;
                            })}
                        </Slider>
                    </div>
                    <div className="col-md-8">
                        <h4 className='fs-4 fw-bold text-center mt-3'>{product?.data?.title}</h4>
                        <p className='text-center font-sm mt-3'>{product?.data?.description}</p>
                        <div className="d-flex justify-content-between align-items-center mt-5">
                            <p className='fw-light'>{product?.data?.category.name}</p>
                            <p><i className='fa-solid fa-star rating-color me-2'></i>{product?.data?.ratingsAverage}</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className=" d-inline-block">Price:</h4>
                            <h4 className='mt-2 d-inline-block ' >{product?.data?.price} EGP</h4>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <button className='btn text-white bg-main w-75 mt-5' onClick={() => { addToCart(prams.id, loud) }}>{loud.cartLoud ? <i class="fa-solid fa-spinner fa-spin"></i> : "Add to Card"}</button>
                            <button onClick={()=>{addToWhishList(prams.id)}} className='btn text-white bg-danger mt-5'>Add To WhishList</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
