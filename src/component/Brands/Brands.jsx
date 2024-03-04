import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import Loading from '../loading/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getCart } from '../cart/Cart';
import { context } from '../context/Context';
function Brands() {
    let cart = useContext(context);
    getCart(cart);
    function GetBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands?limit=80");
    }
    let { data, isLoading } = new useQuery("Brands", GetBrands);
    if (isLoading) {
        return <Loading />
    } else {
        return <>
            <div className="container">
                <div className="row">
                    {data?.data.data.map((brand) => {
                        return <>
                            <div className="col-md-3">
                                <Link to={`/brands/${brand._id}`}>
                                    <img src={brand.image} alt={brand.slug} />
                                    <h3 className='w-100 text-center'>{brand.name}</h3>
                                </Link>
                            </div>
                        </>
                    })}
                </div>
            </div>
        </>
    }
}

export default Brands