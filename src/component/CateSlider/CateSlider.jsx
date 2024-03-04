import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import Loading from '../loading/Loading';
import { context } from '../context/Context';
export default function CateSlider() {


    function GetData() {
        return axios.get("https://route-ecommerce.onrender.com/api/v1/categories");
    }




    let { data, isLoading, isFetching } = useQuery("prodImg", GetData);

    let LoadingPage = useContext(context);
    LoadingPage.setLoading(isLoading);
    // console.log(LoadingPage);
    // useEffect(() => {
    //     //call API

    // }, [])
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2700,
        pauseOnFocus: false,
        pauseOnHover: false,
    };
    if (isLoading) return <Loading />
    return (
        <Slider {...settings} className='mb-2'>
            {data?.data.data.map((image) => {
                return <img src={image.image} alt={image.name} className='w-100' height="200px" />
            })}
        </Slider>
    )
}