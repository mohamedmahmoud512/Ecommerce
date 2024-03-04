import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Loading from '../loading/Loading';
import { Link } from 'react-router-dom';

export default function Categories() {
    function GetCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }
    let { data, isLoading } = new useQuery("categories", GetCategories);
    if (isLoading) {
        return <Loading />
    } else {
        return (
            <div className='container mt-5'>
                <div className="row g-5">
                    {data?.data.data.map((cate) => {
                        return <>

                            <div className="col-md-3 p-2" key={cate._id}>
                                <Link to={`/categories/${cate._id}/subcategories`}>
                                    <img src={cate.image} alt={cate.slug} className='w-100 rounded-2 cursor-pointer' height="300px" />
                                    <h5 className='text-center mt-2 cursor-pointer'>{cate.name}</h5>
                                </Link>
                            </div>
                        </>
                    })}
                </div>
            </div>
        )
    }
}